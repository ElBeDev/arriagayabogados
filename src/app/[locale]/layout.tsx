import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BarraMovil } from "@/components/BarraMovil";
import { MotionProvider } from "@/components/animaciones";
import { AvisoCookies } from "@/components/AvisoCookies";
import { firma, direccionCompleta } from "@/content/firma";
import { getAjustes, getAreas, getTextos } from "@/lib/contenido";
import { alternates } from "@/lib/seo";
import "../globals.css";

function pick<T extends Record<string, unknown>>(obj: T, claves: string[]) {
  return Object.fromEntries(claves.map((k) => [k, obj[k]]));
}

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await props.params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    metadataBase: new URL(firma.url),
    title: { default: t("tituloPorDefecto"), template: t("plantilla") },
    description: t("descripcion"),
    alternates: alternates("/", locale),
    openGraph: {
      type: "website",
      locale: locale === "en" ? "en_US" : "es_MX",
      siteName: firma.nombre,
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#f8f4eb",
};

export default async function LocaleLayout(props: LayoutProps<"/[locale]">) {
  const { locale } = await props.params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const ajustes = await getAjustes();
  const areas = getAreas(locale);
  const textos = getTextos(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: firma.nombre,
    description: textos.descripcion,
    url: firma.url,
    logo: `${firma.url}/marca/isotipo.png`,
    image: `${firma.url}/marca/redes-1200x630.png`,
    telephone: ajustes.telefonoHref,
    email: ajustes.email,
    foundingDate: String(firma.fundacion),
    address: {
      "@type": "PostalAddress",
      streetAddress: ajustes.calle,
      addressLocality: ajustes.ciudad,
      addressRegion: ajustes.estado,
      postalCode: ajustes.cp,
      addressCountry: "MX",
    },
    areaServed: ["Guadalajara", "Zapopan", "Tlaquepaque", "Tonalá", "Tlajomulco", "Jalisco"].map((name) => ({
      "@type": "City",
      name,
    })),
    knowsAbout: areas.map((a) => a.nombre),
    knowsLanguage: ["es", "en"],
    openingHours: ["Mo-Fr 09:00-19:00", "Sa 10:00-14:00"],
    hasMap: `https://www.google.com/maps?q=${encodeURIComponent(direccionCompleta(ajustes))}`,
  };

  return (
    <html lang={locale === "en" ? "en" : "es-MX"} data-scroll-behavior="smooth" className={`${dmSans.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        {/* Al cliente solo viajan los textos que usan sus componentes. */}
        <NextIntlClientProvider messages={pick(await getMessages(), ["nav", "comun", "form", "equipo", "cookies"])}>
          <MotionProvider>
            <Header
              areas={areas.map((a) => ({ slug: a.slug, nombre: a.nombre, resumen: a.resumen }))}
              telefono={ajustes.telefono}
              email={ajustes.email}
            />
            <main id="contenido" className="flex-1">
              {props.children}
            </main>
            <Footer locale={locale} />
            <BarraMovil locale={locale} />
          </MotionProvider>
          <AvisoCookies gaId={process.env.NEXT_PUBLIC_GA_ID} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
