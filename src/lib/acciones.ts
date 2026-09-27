"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { db } from "@/db";
import { leads } from "@/db/schema";
import { routing, type Locale } from "@/i18n/routing";
import { areas as areasEs } from "@/content/areas";
import { getAjustes, getArea, getEquipo } from "@/lib/contenido";

const slugsArea = [...areasEs.map((a) => a.slug), "no-estoy-seguro"] as const;

// Los mensajes de error son claves de traducción (form.errores.*): el cliente los traduce.
const esquema = z.object({
  nombre: z.string().trim().min(2, "nombre"),
  apellido: z.string().trim().min(2, "apellido"),
  email: z.email("email"),
  telefono: z
    .string()
    .trim()
    .regex(/^[\d\s()+-]{10,20}$/, "telefono"),
  tipo: z.enum(["persona", "empresa"]),
  empresa: z.string().trim().max(200).optional(),
  area: z.enum(slugsArea, "area"),
  fecha: z.string().max(10).optional(),
  urgencia: z.enum(["plazo", "semanas", "informacion"]),
  mensaje: z.string().trim().min(10, "mensaje").max(2000, "mensaje"),
  privacidad: z.literal("on", "privacidad"),
  locale: z.enum(routing.locales).catch("es"),
  // Honeypot: los humanos no lo ven; si trae algo, es spam.
  sitio: z.string().max(0).optional(),
});

type Campo = "nombre" | "apellido" | "email" | "telefono" | "area" | "mensaje" | "privacidad";

export type EstadoFormulario = {
  ok: boolean;
  error?: "captcha" | "limite" | "general";
  errores?: Partial<Record<Campo, string>>;
  valores?: Record<string, string>;
};

/* ---------- límite de envíos por IP (por instancia del servidor; mejor esfuerzo) ---------- */
const VENTANA_MS = 10 * 60 * 1000;
const MAX_ENVIOS = 5;
const envios = new Map<string, number[]>();

function excedeLimite(ip: string) {
  const ahora = Date.now();
  const recientes = (envios.get(ip) ?? []).filter((t) => ahora - t < VENTANA_MS);
  recientes.push(ahora);
  envios.set(ip, recientes);
  return recientes.length > MAX_ENVIOS;
}

/* ---------- Cloudflare Turnstile ---------- */
async function captchaValido(token: string | null, ip: string) {
  const secreto = process.env.TURNSTILE_SECRET_KEY;
  if (!secreto) return true; // Sin llave configurada no se exige captcha.
  if (!token) return false;
  const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: new URLSearchParams({ secret: secreto, response: token, remoteip: ip }),
  });
  const datos = (await r.json()) as { success: boolean };
  return datos.success;
}

/* ---------- correo (Resend) ---------- */
const escapar = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

async function enviarCorreo(para: string, asunto: string, html: string, responderA?: string) {
  const llave = process.env.RESEND_API_KEY;
  const de = process.env.RESEND_FROM;
  if (!llave || !de) return;
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${llave}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: de, to: [para], subject: asunto, html, reply_to: responderA }),
  });
  if (!r.ok) console.error("[resend]", r.status, await r.text());
}

const textosAcuse: Record<Locale, { asunto: string; cuerpo: (nombre: string) => string }> = {
  es: {
    asunto: "Recibimos tu solicitud · Arriaga & Abogados",
    cuerpo: (n) =>
      `<p>Hola ${n}:</p><p>Recibimos tu solicitud de consulta. Un abogado de nuestro equipo te contactará en menos de 24 horas hábiles.</p><p>Si tu asunto tiene un plazo o una audiencia próxima, llámanos directamente.</p><p>Arriaga &amp; Abogados</p>`,
  },
  en: {
    asunto: "We received your request · Arriaga & Abogados",
    cuerpo: (n) =>
      `<p>Hello ${n},</p><p>We received your consultation request. A lawyer from our team will contact you within 24 business hours.</p><p>If your matter has an upcoming deadline or hearing, please call us directly.</p><p>Arriaga &amp; Abogados</p>`,
  },
};

export async function enviarConsulta(_prev: EstadoFormulario, formData: FormData): Promise<EstadoFormulario> {
  const valores = Object.fromEntries(
    [...formData.entries()].filter(([k, v]) => typeof v === "string" && !k.startsWith("cf-")),
  ) as Record<string, string>;

  const resultado = esquema.safeParse(valores);
  if (!resultado.success) {
    const errores: EstadoFormulario["errores"] = {};
    for (const issue of resultado.error.issues) {
      const campo = issue.path[0] as Campo;
      if (campo && !errores[campo]) errores[campo] = campo;
    }
    return { ok: false, errores, valores };
  }
  const d = resultado.data;
  if (d.sitio) return { ok: true };

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "local";
  if (excedeLimite(ip)) return { ok: false, error: "limite", valores };
  if (!(await captchaValido(formData.get("cf-turnstile-response") as string | null, ip))) {
    return { ok: false, error: "captcha", valores };
  }

  // Se asigna al socio del área (o al primer integrante del área).
  const equipo = await getEquipo("es");
  const delArea = equipo.filter((p) => p.areas.includes(d.area));
  const responsable = delArea.find((p) => p.nivel === "socio") ?? delArea[0];

  const utm = Object.fromEntries(
    ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]
      .map((k) => [k, valores[k]])
      .filter(([, v]) => v),
  );

  try {
    if (db) {
      await db.insert(leads).values({
        nombre: d.nombre,
        apellido: d.apellido,
        email: d.email,
        telefono: d.telefono,
        tipo: d.tipo,
        empresa: d.tipo === "empresa" ? d.empresa || null : null,
        area: d.area,
        fecha: d.fecha || null,
        urgencia: d.urgencia,
        mensaje: d.mensaje,
        locale: d.locale,
        utm: Object.keys(utm).length ? utm : null,
        asignadoA: responsable?.slug ?? null,
      });
    } else {
      console.info("[lead] (sin base de datos)", { ...d, sitio: undefined, recibido: new Date().toISOString() });
    }

    const ajustes = await getAjustes();
    const nombreArea = getArea("es", d.area)?.nombre ?? "Por definir";
    const urgencias = { plazo: "Plazo o audiencia próxima", semanas: "Próximas semanas", informacion: "Solo información" };
    const destino = responsable?.email ?? process.env.LEADS_TO ?? ajustes.email;
    const filas: [string, string][] = [
      ["Nombre", `${d.nombre} ${d.apellido}`],
      ["Correo", d.email],
      ["Teléfono", d.telefono],
      ["Tipo", d.tipo === "empresa" ? `Empresa: ${d.empresa ?? ""}` : "Persona física"],
      ["Área", nombreArea],
      ["Urgencia", urgencias[d.urgencia]],
      ["Fecha preferida", d.fecha || "Sin preferencia"],
      ["Idioma", d.locale === "en" ? "Inglés" : "Español"],
    ];
    const html = `<h2>Nueva solicitud de consulta</h2><table>${filas
      .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#6b665f">${k}</td><td>${escapar(v)}</td></tr>`)
      .join("")}</table><p style="white-space:pre-wrap">${escapar(d.mensaje)}</p>`;

    await Promise.allSettled([
      enviarCorreo(destino, `Nueva consulta: ${nombreArea} (${d.nombre} ${d.apellido})`, html, d.email),
      enviarCorreo(d.email, textosAcuse[d.locale].asunto, textosAcuse[d.locale].cuerpo(escapar(d.nombre))),
    ]);
  } catch (e) {
    console.error("[lead] no se pudo guardar", e);
    return { ok: false, error: "general", valores };
  }

  return { ok: true };
}
