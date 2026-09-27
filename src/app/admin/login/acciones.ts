"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { crearSesion, verificarCredenciales } from "@/lib/auth";

const intentos = new Map<string, number[]>();

export async function iniciarSesion(
  _prev: { error?: string; usuario?: string },
  formData: FormData,
): Promise<{ error?: string; usuario?: string }> {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const ahora = Date.now();
  const recientes = (intentos.get(ip) ?? []).filter((t) => ahora - t < 15 * 60 * 1000);
  const usuario = String(formData.get("usuario") ?? "");
  if (recientes.length >= 8) return { error: "Demasiados intentos. Espera 15 minutos.", usuario };

  const rol = verificarCredenciales(usuario, String(formData.get("clave") ?? ""));
  if (!rol) {
    intentos.set(ip, [...recientes, ahora]);
    // Se devuelve el usuario para que no se borre del campo al reintentar.
    return { error: "Usuario o contraseña incorrectos.", usuario };
  }
  intentos.delete(ip);
  await crearSesion(rol);
  redirect(rol === "editor" ? "/admin/publicaciones" : "/admin");
}
