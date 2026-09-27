"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import * as t from "@/db/schema";
import { cerrarSesion, rolActual, type Rol } from "@/lib/auth";
import { resolverImagen } from "@/lib/subidas";
import type { Ajustes } from "@/content/firma";

export type EstadoGuardado = { error?: string; ok?: boolean };

async function requerir(rolMinimo: Rol = "admin") {
  const rol = await rolActual();
  if (!rol) redirect("/admin/login");
  if (rolMinimo === "admin" && rol !== "admin") throw new Error("No tienes permiso para esta acción.");
  if (!db) throw new Error("No hay base de datos configurada.");
  return db;
}

/** Refresca todas las páginas públicas que dependen del contenido editado. */
function refrescarSitio() {
  revalidatePath("/", "layout");
}

const texto = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();
const mensaje = (e: unknown) =>
  e instanceof z.ZodError ? e.issues.map((i) => i.message).join(" ") : e instanceof Error ? e.message : "Error desconocido.";

export async function salir() {
  await cerrarSesion();
  redirect("/admin/login");
}

/* ------------------------------------------------------------ prospectos */

export async function actualizarLead(id: number, _prev: EstadoGuardado, fd: FormData): Promise<EstadoGuardado> {
  try {
    const db = await requerir();
    const datos = z
      .object({
        estado: z.enum(["nuevo", "contactado", "cliente", "cerrado"]),
        asignadoA: z.string().nullable(),
        notas: z.string().max(5000),
      })
      .parse({ estado: texto(fd, "estado"), asignadoA: texto(fd, "asignadoA") || null, notas: texto(fd, "notas") });
    await db.update(t.leads).set({ ...datos, actualizadoEn: new Date() }).where(eq(t.leads.id, id));
    revalidatePath("/admin", "layout");
    return { ok: true };
  } catch (e) {
    return { error: mensaje(e) };
  }
}

export async function eliminarLead(id: number) {
  const db = await requerir();
  await db.delete(t.leads).where(eq(t.leads.id, id));
  revalidatePath("/admin", "layout");
  redirect("/admin/prospectos");
}

/* --------------------------------------------------------- publicaciones */

const esquemaPublicacion = z.object({
  slug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "El slug solo admite minúsculas, números y guiones (sin acentos)."),
  locale: z.enum(["es", "en"]),
  titulo: z.string().min(5, "Escribe un título."),
  extracto: z.string().min(10, "Escribe un extracto.").max(300, "El extracto debe tener 300 caracteres o menos."),
  cuerpo: z.string().min(20, "El artículo está vacío."),
  area: z.string().min(1),
  autor: z.string().min(1),
  fecha: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Fecha inválida."),
  lectura: z.coerce.number().int().min(1).max(60),
  estado: z.enum(["borrador", "publicado"]),
});

export async function guardarPublicacion(id: number | null, _prev: EstadoGuardado, fd: FormData): Promise<EstadoGuardado> {
  let nuevoId = id;
  try {
    const db = await requerir("editor");
    const actual = id ? (await db.select().from(t.publicaciones).where(eq(t.publicaciones.id, id)))[0] : null;
    const portada = await resolverImagen(fd, "portadaArchivo", "portada", actual?.portada ?? null, "publicaciones");
    if (!portada) return { error: "Agrega una imagen de portada." };
    const datos = esquemaPublicacion.parse({
      slug: texto(fd, "slug"),
      locale: texto(fd, "locale"),
      titulo: texto(fd, "titulo"),
      extracto: texto(fd, "extracto"),
      cuerpo: texto(fd, "cuerpo"),
      area: texto(fd, "area"),
      autor: texto(fd, "autor"),
      fecha: texto(fd, "fecha"),
      lectura: texto(fd, "lectura"),
      estado: texto(fd, "estado"),
    });
    if (id) {
      await db.update(t.publicaciones).set({ ...datos, portada, actualizadoEn: new Date() }).where(eq(t.publicaciones.id, id));
    } else {
      const [fila] = await db.insert(t.publicaciones).values({ ...datos, portada }).returning({ id: t.publicaciones.id });
      nuevoId = fila.id;
    }
    refrescarSitio();
  } catch (e) {
    const m = mensaje(e);
    return { error: m.includes("publicaciones_slug_locale") ? "Ya existe un artículo con ese slug en ese idioma." : m };
  }
  redirect(`/admin/publicaciones/${nuevoId}?guardado=1`);
}

export async function eliminarPublicacion(id: number) {
  const db = await requerir("editor");
  await db.delete(t.publicaciones).where(eq(t.publicaciones.id, id));
  refrescarSitio();
  redirect("/admin/publicaciones");
}

/* ----------------------------------------------------------- testimonios */

export async function guardarTestimonio(id: number | null, _prev: EstadoGuardado, fd: FormData): Promise<EstadoGuardado> {
  let nuevoId = id;
  try {
    const db = await requerir();
    const datos = z
      .object({
        iniciales: z.string().min(1).max(3, "Máximo 3 letras en las iniciales."),
        citaEs: z.string().min(5).max(160, "La cita debe caber en 3 líneas (160 caracteres)."),
        citaEn: z.string().min(5).max(160, "The quote must fit in 3 lines (160 characters)."),
        autorEs: z.string().min(2),
        autorEn: z.string().min(2),
        detalleEs: z.string().min(2),
        detalleEn: z.string().min(2),
        autorizado: z.boolean(),
        fechaAutorizacion: z.string().nullable(),
        visible: z.boolean(),
        orden: z.coerce.number().int(),
      })
      .parse({
        iniciales: texto(fd, "iniciales").toUpperCase(),
        citaEs: texto(fd, "citaEs"),
        citaEn: texto(fd, "citaEn"),
        autorEs: texto(fd, "autorEs"),
        autorEn: texto(fd, "autorEn"),
        detalleEs: texto(fd, "detalleEs"),
        detalleEn: texto(fd, "detalleEn"),
        autorizado: fd.get("autorizado") === "on",
        fechaAutorizacion: texto(fd, "fechaAutorizacion") || null,
        visible: fd.get("visible") === "on",
        orden: texto(fd, "orden") || "0",
      });
    if (datos.visible && !datos.autorizado) {
      return { error: "Solo se pueden mostrar testimonios con autorización por escrito del cliente." };
    }
    if (id) await db.update(t.testimonios).set(datos).where(eq(t.testimonios.id, id));
    else nuevoId = (await db.insert(t.testimonios).values(datos).returning({ id: t.testimonios.id }))[0].id;
    refrescarSitio();
  } catch (e) {
    return { error: mensaje(e) };
  }
  redirect(`/admin/testimonios/${nuevoId}?guardado=1`);
}

export async function eliminarTestimonio(id: number) {
  const db = await requerir();
  await db.delete(t.testimonios).where(eq(t.testimonios.id, id));
  refrescarSitio();
  redirect("/admin/testimonios");
}

/* ---------------------------------------------------------------- equipo */

export async function guardarIntegrante(id: number | null, _prev: EstadoGuardado, fd: FormData): Promise<EstadoGuardado> {
  let nuevoId = id;
  try {
    const db = await requerir();
    const actual = id ? (await db.select().from(t.equipo).where(eq(t.equipo.id, id)))[0] : null;
    const foto = await resolverImagen(fd, "fotoArchivo", "foto", actual?.foto ?? null, "equipo");
    if (!foto) return { error: "Agrega una fotografía." };
    const datos = z
      .object({
        slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "El slug solo admite minúsculas, números y guiones."),
        nombre: z.string().min(3),
        nivel: z.enum(["socio", "of-counsel", "asociado-senior", "asociado"]),
        orden: z.coerce.number().int(),
        areas: z.array(z.string()).min(1, "Elige al menos un área."),
        email: z.email("Correo inválido."),
        cedula: z.string().nullable(),
        cargoEs: z.string().min(2),
        cargoEn: z.string().min(2),
        bioEs: z.string().min(10),
        bioEn: z.string().min(10),
        formacionEs: z.string().min(3),
        formacionEn: z.string().min(3),
        idiomasEs: z.string().min(2),
        idiomasEn: z.string().min(2),
        activo: z.boolean(),
      })
      .parse({
        slug: texto(fd, "slug"),
        nombre: texto(fd, "nombre"),
        nivel: texto(fd, "nivel"),
        orden: texto(fd, "orden") || "0",
        areas: fd.getAll("areas").map(String),
        email: texto(fd, "email"),
        cedula: texto(fd, "cedula") || null,
        cargoEs: texto(fd, "cargoEs"),
        cargoEn: texto(fd, "cargoEn"),
        bioEs: texto(fd, "bioEs"),
        bioEn: texto(fd, "bioEn"),
        formacionEs: texto(fd, "formacionEs"),
        formacionEn: texto(fd, "formacionEn"),
        idiomasEs: texto(fd, "idiomasEs"),
        idiomasEn: texto(fd, "idiomasEn"),
        activo: fd.get("activo") === "on",
      });
    if (id) await db.update(t.equipo).set({ ...datos, foto, actualizadoEn: new Date() }).where(eq(t.equipo.id, id));
    else nuevoId = (await db.insert(t.equipo).values({ ...datos, foto }).returning({ id: t.equipo.id }))[0].id;
    refrescarSitio();
  } catch (e) {
    const m = mensaje(e);
    return { error: m.includes("equipo_slug_unique") ? "Ya existe un integrante con ese slug." : m };
  }
  redirect(`/admin/equipo/${nuevoId}?guardado=1`);
}

/* --------------------------------------------------------- configuración */

export async function guardarAjustes(_prev: EstadoGuardado, fd: FormData): Promise<EstadoGuardado> {
  try {
    const db = await requerir();
    const lineas = (k: string) => texto(fd, k).split("\n").map((l) => l.trim()).filter(Boolean);
    const cifras = [0, 1, 2, 3].map((i) => ({
      valor: Number(texto(fd, `cifra${i}valor`)),
      sufijo: texto(fd, `cifra${i}sufijo`),
      es: texto(fd, `cifra${i}es`),
      en: texto(fd, `cifra${i}en`),
    }));
    const valor: Ajustes = z
      .object({
        telefono: z.string().min(8),
        telefonoHref: z.string().regex(/^\+\d{10,15}$/, "El teléfono para marcar debe verse como +523300000000."),
        whatsapp: z.string().regex(/^\d{10,15}$/, "El WhatsApp debe ser solo números con lada, p. ej. 523300000000."),
        email: z.email("Correo inválido."),
        calle: z.string().min(3),
        colonia: z.string().min(3),
        cp: z.string().regex(/^\d{5}$/, "El C.P. debe tener 5 dígitos."),
        ciudad: z.string().min(2),
        estado: z.string().min(2),
        horarioEs: z.array(z.string()).min(1),
        horarioEn: z.array(z.string()).min(1),
        cifras: z
          .array(z.object({ valor: z.number().int().min(0), sufijo: z.string().max(3), es: z.string().min(2), en: z.string().min(2) }))
          .length(4),
      })
      .parse({
        telefono: texto(fd, "telefono"),
        telefonoHref: texto(fd, "telefonoHref"),
        whatsapp: texto(fd, "whatsapp"),
        email: texto(fd, "email"),
        calle: texto(fd, "calle"),
        colonia: texto(fd, "colonia"),
        cp: texto(fd, "cp"),
        ciudad: texto(fd, "ciudad"),
        estado: texto(fd, "estado"),
        horarioEs: lineas("horarioEs"),
        horarioEn: lineas("horarioEn"),
        cifras,
      });
    await db
      .insert(t.ajustes)
      .values({ clave: "general", valor })
      .onConflictDoUpdate({ target: t.ajustes.clave, set: { valor } });
    refrescarSitio();
    return { ok: true };
  } catch (e) {
    return { error: mensaje(e) };
  }
}
