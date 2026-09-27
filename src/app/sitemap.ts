import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { areas } from "@/content/areas";
import { firma } from "@/content/firma";
import { getEquipo, getPublicaciones } from "@/lib/contenido";
import { rutaLocal } from "@/lib/seo";

function entrada(ruta: string, prioridad: number, extra: Partial<MetadataRoute.Sitemap[number]> = {}) {
  return routing.locales.map((locale) => ({
    url: `${firma.url}${rutaLocal(ruta, locale)}`,
    priority: prioridad,
    alternates: {
      languages: Object.fromEntries(routing.locales.map((l) => [l, `${firma.url}${rutaLocal(ruta, l)}`])),
    },
    ...extra,
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const estaticas = ["/", "/la-firma", "/areas", "/equipo", "/publicaciones", "/contacto", "/carreras", "/aviso-de-privacidad", "/terminos", "/aviso-legal"];
  const [equipo, publicacionesEs] = await Promise.all([getEquipo("es"), getPublicaciones("es")]);
  return [
    ...estaticas.flatMap((r) => entrada(r, r === "/" ? 1 : 0.7, { changeFrequency: "monthly" })),
    ...areas.flatMap((a) => entrada(`/areas/${a.slug}`, 0.9, { changeFrequency: "monthly" })),
    ...equipo.flatMap((p) => entrada(`/equipo/${p.slug}`, 0.6, { changeFrequency: "yearly" })),
    ...publicacionesEs.flatMap((p) => entrada(`/publicaciones/${p.slug}`, 0.6, { lastModified: p.fecha })),
  ];
}
