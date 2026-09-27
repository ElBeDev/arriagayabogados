import "server-only";
import { cache } from "react";
import { and, asc, desc, eq } from "drizzle-orm";
import { db } from "@/db";
import * as t from "@/db/schema";
import type { Locale } from "@/i18n/routing";
import { areas as areasEs, type Area } from "@/content/areas";
import { areasEn } from "@/content/areas.en";
import { ajustesPorDefecto, textos, type Ajustes, type Textos } from "@/content/firma";
import { equipoSemilla, ordenNiveles, type Integrante } from "@/content/equipo";
import { publicacionesSemilla, type Publicacion } from "@/content/publicaciones";
import { testimoniosSemilla, type Testimonio } from "@/content/testimonios";

// Capa de contenido: lee de Postgres cuando hay DATABASE_URL y, si no, usa la semilla
// de src/content. Así el sitio se ve igual con o sin base de datos.
// Las lecturas se deduplican por petición con `cache` de React.

async function intentar<T>(consulta: () => Promise<T>, respaldo: () => T): Promise<T> {
  if (!db) return respaldo();
  try {
    return await consulta();
  } catch (e) {
    console.error("[contenido] falló la consulta, se usa la semilla:", e);
    return respaldo();
  }
}

/* --------------------------------------------------------------- textos */

export function getTextos(locale: Locale): Textos {
  return textos[locale];
}

/* ---------------------------------------------------------------- áreas */

export function getAreas(locale: Locale): Area[] {
  return locale === "en" ? areasEn : areasEs;
}

export function getArea(locale: Locale, slug: string) {
  return getAreas(locale).find((a) => a.slug === slug);
}

/* -------------------------------------------------------------- ajustes */

export const getAjustes = cache(async (): Promise<Ajustes> =>
  intentar(
    async () => {
      const [fila] = await db!.select().from(t.ajustes).where(eq(t.ajustes.clave, "general"));
      return { ...ajustesPorDefecto, ...((fila?.valor as Partial<Ajustes>) ?? {}) };
    },
    () => ajustesPorDefecto,
  ),
);

/* --------------------------------------------------------------- equipo */

const lineas = (s: string) => s.split("\n").map((l) => l.trim()).filter(Boolean);
const parrafos = (s: string) => s.split(/\n\s*\n/).map((l) => l.trim()).filter(Boolean);
const lista = (s: string) => s.split(",").map((l) => l.trim()).filter(Boolean);

function ordenar(a: Integrante & { orden: number }, b: Integrante & { orden: number }) {
  return ordenNiveles.indexOf(a.nivel) - ordenNiveles.indexOf(b.nivel) || a.orden - b.orden;
}

export const getEquipo = cache(async (locale: Locale): Promise<Integrante[]> =>
  intentar(
    async () => {
      const filas = await db!.select().from(t.equipo).where(eq(t.equipo.activo, true));
      return filas
        .map((f) => ({
          slug: f.slug,
          nombre: f.nombre,
          nivel: f.nivel as Integrante["nivel"],
          orden: f.orden,
          areas: f.areas,
          foto: f.foto,
          email: f.email,
          cedula: f.cedula,
          cargo: locale === "en" ? f.cargoEn : f.cargoEs,
          bio: parrafos(locale === "en" ? f.bioEn : f.bioEs),
          formacion: lineas(locale === "en" ? f.formacionEn : f.formacionEs),
          idiomas: lista(locale === "en" ? f.idiomasEn : f.idiomasEs),
        }))
        .sort(ordenar);
    },
    () =>
      equipoSemilla
        .map(({ es, en, ...p }) => ({ ...p, ...(locale === "en" ? en : es) }))
        .sort(ordenar),
  ),
);

export async function getIntegrante(locale: Locale, slug: string) {
  return (await getEquipo(locale)).find((p) => p.slug === slug);
}

/* -------------------------------------------------------- publicaciones */

export const getPublicaciones = cache(async (locale: Locale): Promise<Publicacion[]> =>
  intentar(
    async () => {
      const filas = await db!
        .select()
        .from(t.publicaciones)
        .where(and(eq(t.publicaciones.locale, locale), eq(t.publicaciones.estado, "publicado")))
        .orderBy(desc(t.publicaciones.fecha));
      return filas.map((f) => ({
        slug: f.slug,
        locale: f.locale as Locale,
        titulo: f.titulo,
        extracto: f.extracto,
        area: f.area,
        autor: f.autor,
        fecha: f.fecha,
        lectura: f.lectura,
        portada: f.portada,
        cuerpo: f.cuerpo,
      }));
    },
    () =>
      publicacionesSemilla
        .filter((p) => p.locale === locale)
        .sort((a, b) => b.fecha.localeCompare(a.fecha)),
  ),
);

export async function getPublicacion(locale: Locale, slug: string) {
  return (await getPublicaciones(locale)).find((p) => p.slug === slug);
}

/* ---------------------------------------------------------- testimonios */

export const getTestimonios = cache(async (locale: Locale): Promise<Testimonio[]> =>
  intentar(
    async () => {
      const filas = await db!
        .select()
        .from(t.testimonios)
        .where(eq(t.testimonios.visible, true))
        .orderBy(asc(t.testimonios.orden));
      return filas.map((f) => ({
        iniciales: f.iniciales,
        cita: locale === "en" ? f.citaEn : f.citaEs,
        autor: locale === "en" ? f.autorEn : f.autorEs,
        detalle: locale === "en" ? f.detalleEn : f.detalleEs,
      }));
    },
    () => testimoniosSemilla.map((s) => ({ iniciales: s.iniciales, ...(locale === "en" ? s.en : s.es) })),
  ),
);
