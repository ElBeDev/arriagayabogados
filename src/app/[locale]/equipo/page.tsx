import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { ordenNiveles } from "@/content/equipo";
import { getAreas, getEquipo } from "@/lib/contenido";
import { alternates } from "@/lib/seo";
import { FiltroEquipo } from "@/components/FiltroEquipo";
import { BloqueAgenda, HeroInterior, TarjetaEquipo } from "@/components/secciones";

export async function generateMetadata(props: PageProps<"/[locale]/equipo">): Promise<Metadata> {
  const locale = (await props.params).locale as Locale;
  const t = await getTranslations({ locale, namespace: "equipo" });
  return { title: t("metaTitulo"), description: t("metaDescripcion"), alternates: alternates("/equipo", locale) };
}

export default async function Equipo(props: PageProps<"/[locale]/equipo">) {
  const locale = (await props.params).locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations("equipo");
  const equipo = await getEquipo(locale);

  const grupos = ordenNiveles
    .map((nivel) => ({ titulo: t(`niveles.${nivel}`), personas: equipo.filter((p) => p.nivel === nivel) }))
    .filter((g) => g.personas.length > 0);

  return (
    <>
      <HeroInterior migas={[{ label: t("metaTitulo") }]} eyebrow={t("eyebrow")} titulo={t("titulo")} texto={t("texto")} />
      <section className="contenedor pb-18 lg:pb-30">
        <FiltroEquipo
          areas={getAreas(locale).map((a) => ({ slug: a.slug, nombre: a.nombre }))}
          grupos={grupos.map((g) => ({
            titulo: g.titulo,
            personas: g.personas.map((p) => ({
              slug: p.slug,
              areas: p.areas,
              tarjeta: <TarjetaEquipo persona={p} />,
            })),
          }))}
        />
      </section>
      <div className="border-t border-linea">
        <BloqueAgenda />
      </div>
    </>
  );
}
