import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Check } from "@phosphor-icons/react/dist/ssr";
import type { Locale } from "@/i18n/routing";
import { firma } from "@/content/firma";
import { formatoFecha } from "@/content/publicaciones";
import { areas as areasEs } from "@/content/areas";
import { getArea, getEquipo, getPublicaciones } from "@/lib/contenido";
import { alternates } from "@/lib/seo";
import { Reveal } from "@/components/animaciones";
import { AcordeonBarra, AcordeonFaq, TarjetasActivas } from "@/components/interactivos";
import { BloqueAgenda, HeroInterior, TarjetaEquipo } from "@/components/secciones";
import { Boton, EncabezadoSeccion, IconoArea } from "@/components/ui";

export function generateStaticParams() {
  return areasEs.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata(props: PageProps<"/[locale]/areas/[slug]">): Promise<Metadata> {
  const { locale, slug } = (await props.params) as { locale: Locale; slug: string };
  const area = getArea(locale, slug);
  if (!area) return {};
  const t = await getTranslations({ locale, namespace: "areas" });
  return {
    title: t("metaArea", { area: area.nombre }),
    description: `${area.resumen} ${area.tarjeta}`,
    alternates: alternates(`/areas/${slug}`, locale),
  };
}

export default async function AreaPage(props: PageProps<"/[locale]/areas/[slug]">) {
  const { locale, slug } = (await props.params) as { locale: Locale; slug: string };
  setRequestLocale(locale);
  const area = getArea(locale, slug);
  if (!area) notFound();

  const t = await getTranslations("areas");
  const tn = await getTranslations("nav");
  const tc = await getTranslations("comun");
  const ta = await getTranslations("agenda");
  const [equipo, publicaciones] = await Promise.all([getEquipo(locale), getPublicaciones(locale)]);
  const responsables = equipo.filter((p) => p.areas.includes(area.slug));
  const articulos = publicaciones.filter((p) => p.area === area.slug);
  const nombreMinuscula = locale === "es" ? area.nombre.toLowerCase() : area.nombre;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: area.nombre,
      description: area.intro,
      provider: { "@type": "LegalService", name: firma.nombre },
      areaServed: "Guadalajara, Jalisco",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: area.faqs.map((f) => ({
        "@type": "Question",
        name: f.pregunta,
        acceptedAnswer: { "@type": "Answer", text: f.respuesta },
      })),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <HeroInterior
        migas={[{ href: "/areas", label: t("eyebrow") }, { label: area.nombre }]}
        eyebrow={area.nombre}
        titulo={area.resumen.replace(/\.$/, "")}
        texto={area.tarjeta}
        accion={<Boton href="#agenda">{tn("agenda")}</Boton>}
      />

      <section className="contenedor pb-18 lg:pb-30">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <IconoArea icono={area.icono} size={40} />
            <h2 className="mt-6 text-[30px] leading-[1.2] md:text-[40px]">{t("ayudamos")}</h2>
            <p className="mt-5 max-w-[60ch] leading-relaxed text-piedra">{area.intro}</p>
          </div>
          <ul className="grid content-start gap-x-10 gap-y-5 sm:grid-cols-2 lg:col-span-7 lg:pt-2">
            {area.servicios.map((s, i) => (
              <Reveal as="li" key={s} delay={(i % 4) * 0.05} className="flex items-start gap-3 text-[17px] leading-snug">
                <Check aria-hidden size={18} className="mt-1 shrink-0 text-laton" />
                {s}
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="contenedor pb-18 lg:pb-30">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="text-[30px] leading-[1.2] md:text-[44px]">{t("cuando", { area: nombreMinuscula })}</h2>
          </div>
          <div className="lg:col-span-7 lg:pt-2">
            <AcordeonBarra items={area.escenarios} />
          </div>
        </div>
      </section>

      {responsables.length > 0 && (
        <section className="sobre-oscuro bg-nogal text-crema">
          <div className="contenedor seccion">
            <EncabezadoSeccion
              oscuro
              eyebrow={t("equipoEyebrow")}
              titulo={t("equipoTitulo")}
              accion={
                <Boton href="/equipo" variante="claro">
                  {t("todoEquipo")}
                </Boton>
              }
            />
            <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {responsables.map((p) => (
                <li key={p.slug}>
                  <TarjetaEquipo persona={p} oscuro />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="contenedor seccion">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <h2 className="text-[30px] leading-[1.2] md:text-[44px]">{t("faq")}</h2>
          </div>
          <div className="lg:col-span-8">
            <AcordeonFaq items={area.faqs} />
          </div>
        </div>
      </section>

      {articulos.length > 0 && (
        <section className="contenedor pb-18 lg:pb-30">
          <EncabezadoSeccion titulo={t("relacionados")} />
          <div className="mt-12">
            <TarjetasActivas
              carrusel={false}
              etiqueta={t("relacionados")}
              tarjetas={articulos.map((p) => ({
                href: `/publicaciones/${p.slug}`,
                titulo: p.titulo,
                texto: p.extracto,
                imagen: p.portada,
                meta: formatoFecha(p.fecha, locale),
                cta: tc("leer"),
              }))}
            />
          </div>
        </section>
      )}

      <div className="border-t border-linea">
        <BloqueAgenda titulo={ta("tituloArea", { area: nombreMinuscula })} areaInicial={area.slug} />
      </div>
    </>
  );
}
