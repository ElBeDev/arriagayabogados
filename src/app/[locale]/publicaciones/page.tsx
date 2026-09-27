import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { formatoFecha } from "@/content/publicaciones";
import { getAreas, getPublicaciones } from "@/lib/contenido";
import { alternates } from "@/lib/seo";
import { TarjetasActivas } from "@/components/interactivos";
import { HeroInterior } from "@/components/secciones";

export async function generateMetadata(props: PageProps<"/[locale]/publicaciones">): Promise<Metadata> {
  const locale = (await props.params).locale as Locale;
  const t = await getTranslations({ locale, namespace: "publicaciones" });
  return { title: t("metaTitulo"), description: t("metaDescripcion"), alternates: alternates("/publicaciones", locale) };
}

export default async function Publicaciones(props: PageProps<"/[locale]/publicaciones">) {
  const locale = (await props.params).locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations("publicaciones");
  const tc = await getTranslations("comun");
  const publicaciones = await getPublicaciones(locale);
  const nombresArea = Object.fromEntries(getAreas(locale).map((a) => [a.slug, a.nombre]));

  return (
    <>
      <HeroInterior migas={[{ label: t("metaTitulo") }]} eyebrow={t("eyebrow")} titulo={t("titulo")} texto={t("texto")} />
      <section className="contenedor pb-18 lg:pb-30">
        {publicaciones.length === 0 ? (
          <p role="status" className="border-l-2 border-linea pl-4 text-piedra">
            {t("vacio")}
          </p>
        ) : (
          <TarjetasActivas
            carrusel={false}
            destacada
            etiqueta={t("metaTitulo")}
            tarjetas={publicaciones.map((p) => ({
              href: `/publicaciones/${p.slug}`,
              titulo: p.titulo,
              texto: p.extracto,
              imagen: p.portada,
              meta: `${nombresArea[p.area] ?? ""} · ${formatoFecha(p.fecha, locale)}`,
              cta: tc("leer"),
            }))}
          />
        )}
      </section>
    </>
  );
}
