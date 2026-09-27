import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getAjustes } from "@/lib/contenido";
import { alternates } from "@/lib/seo";
import { HeroInterior } from "@/components/secciones";
import { clasesBoton, FlechaBoton } from "@/components/ui";

export async function generateMetadata(props: PageProps<"/[locale]/carreras">): Promise<Metadata> {
  const locale = (await props.params).locale as Locale;
  const t = await getTranslations({ locale, namespace: "carreras" });
  return { title: t("metaTitulo"), description: t("metaDescripcion"), alternates: alternates("/carreras", locale) };
}

export default async function Carreras(props: PageProps<"/[locale]/carreras">) {
  const locale = (await props.params).locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations("carreras");
  const programas = t.raw("programas") as { titulo: string; texto: string }[];
  const ajustes = await getAjustes();
  return (
    <>
      <HeroInterior
        migas={[{ label: t("metaTitulo") }]}
        eyebrow={t("eyebrow")}
        titulo={t("titulo")}
        texto={t("texto")}
        accion={
          <a href={`mailto:${ajustes.email}?subject=${encodeURIComponent(t("asunto"))}`} className={clasesBoton()}>
            {t("enviaCv")}
            <FlechaBoton />
          </a>
        }
      />
      <section className="contenedor pb-18 lg:pb-30">
        <ul className="divide-y divide-linea border-t border-linea">
          {programas.map((p) => (
            <li key={p.titulo} className="grid gap-3 py-8 md:grid-cols-12 md:gap-10 lg:py-10">
              <h2 className="text-2xl md:col-span-4 md:text-[28px]">{p.titulo}</h2>
              <p className="max-w-[60ch] leading-relaxed text-piedra md:col-span-8">{p.texto}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
