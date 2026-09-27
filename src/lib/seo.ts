import type { Locale } from "@/i18n/routing";

/** URL relativa de una ruta en un idioma (español sin prefijo, inglés con /en). */
export function rutaLocal(ruta: string, locale: Locale) {
  if (locale === "es") return ruta;
  return ruta === "/" ? "/en" : `/en${ruta}`;
}

/** Canonical + hreflang para `metadata.alternates`. */
export function alternates(ruta: string, locale: Locale) {
  return {
    canonical: rutaLocal(ruta, locale),
    languages: {
      "es-MX": rutaLocal(ruta, "es"),
      en: rutaLocal(ruta, "en"),
      "x-default": rutaLocal(ruta, "es"),
    },
  };
}
