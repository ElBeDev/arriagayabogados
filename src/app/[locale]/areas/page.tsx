import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getAreas } from "@/lib/contenido";
import { alternates } from "@/lib/seo";
import { ListaAreas } from "@/components/ListaAreas";
import { BloqueAgenda, HeroInterior } from "@/components/secciones";
import { IconoArea } from "@/components/ui";

export async function generateMetadata(props: PageProps<"/[locale]/areas">): Promise<Metadata> {
  const locale = (await props.params).locale as Locale;
  const t = await getTranslations({ locale, namespace: "areas" });
  return { title: t("metaTitulo"), description: t("metaDescripcion"), alternates: alternates("/areas", locale) };
}

export default async function Areas(props: PageProps<"/[locale]/areas">) {
  const locale = (await props.params).locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations("areas");
  return (
    <>
      <HeroInterior migas={[{ label: t("eyebrow") }]} eyebrow={t("eyebrow")} titulo={t("titulo")} texto={t("texto")} />
      <section className="contenedor pb-18 lg:pb-30">
        <ListaAreas
          items={getAreas(locale).map((a) => ({
            href: `/areas/${a.slug}`,
            nombre: a.nombre,
            texto: a.tarjeta,
            servicios: a.servicios,
            icono: <IconoArea icono={a.icono} size={28} />,
          }))}
        />
      </section>
      <div className="border-t border-linea">
        <BloqueAgenda />
      </div>
    </>
  );
}
