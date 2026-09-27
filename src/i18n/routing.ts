import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  // Español sin prefijo (las URLs actuales no cambian); inglés en /en.
  localePrefix: "as-needed",
  // Sin redirecciones automáticas por navegador o cookie: la URL manda el idioma.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
