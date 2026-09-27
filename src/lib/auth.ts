import "server-only";
import { cookies } from "next/headers";
import crypto from "node:crypto";

// Sesión del panel /admin: cookie httpOnly firmada con HMAC. Dos roles:
// "admin" (todo) y "editor" (solo publicaciones). Credenciales en variables de entorno.

export type Rol = "admin" | "editor";
const COOKIE = "arriaga_admin";
const DURACION_S = 60 * 60 * 12; // 12 horas

function secreto() {
  const s = process.env.SESSION_SECRET;
  if (!s && process.env.NODE_ENV === "production") throw new Error("Falta SESSION_SECRET");
  return s ?? "dev-secreto-cambiar";
}

function firmar(valor: string) {
  return crypto.createHmac("sha256", secreto()).update(valor).digest("hex");
}

function iguales(a: string, b: string) {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && crypto.timingSafeEqual(x, y);
}

export async function crearSesion(rol: Rol) {
  const expira = Math.floor(Date.now() / 1000) + DURACION_S;
  const valor = `${rol}.${expira}`;
  (await cookies()).set(COOKIE, `${valor}.${firmar(valor)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: DURACION_S,
  });
}

export async function cerrarSesion() {
  (await cookies()).delete({ name: COOKIE, path: "/admin" });
}

export async function rolActual(): Promise<Rol | null> {
  const crudo = (await cookies()).get(COOKIE)?.value;
  if (!crudo) return null;
  const [rol, expira, firma] = crudo.split(".");
  if (!rol || !expira || !firma) return null;
  if (!iguales(firma, firmar(`${rol}.${expira}`))) return null;
  if (Number(expira) < Date.now() / 1000) return null;
  return rol === "admin" || rol === "editor" ? rol : null;
}

export function verificarCredenciales(usuario: string, clave: string): Rol | null {
  const cuentas: [Rol, string | undefined, string | undefined][] = [
    ["admin", process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD],
    ["editor", process.env.EDITOR_USERNAME, process.env.EDITOR_PASSWORD],
  ];
  for (const [rol, u, c] of cuentas) {
    if (u && c && iguales(usuario, u) && iguales(clave, c)) return rol;
  }
  return null;
}
