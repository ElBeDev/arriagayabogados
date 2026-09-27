import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link, redirect } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { firma } from "@/content/firma";
import { formatoFecha, publicacionesSemilla } from "@/content/publicaciones";
import { getArea, getIntegrante, getPublicacion } from "@/lib/contenido";
import { alternates } from "@/lib/seo";
import { Markdown } from "@/components/secciones";
import { Boton, Eyebrow } from "@/components/ui";

export function generateStaticParams() {
  return [...new Set(publicacionesSemilla.map((p) => p.slug))].map((slug) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/[locale]/publicaciones/[slug]">): Promise<Metadata> {
  const { locale, slug } = (await props.params) as { locale: Locale; slug: string };
  const p = await getPublicacion(locale, slug);
  if (!p) return {};
  return {
    title: p.titulo,
    description: p.extracto,
    alternates: alternates(`/publicaciones/${slug}`, locale),
    openGraph: { type: "article", images: [p.portada] },
  };
}

export default async function Articulo(props: PageProps<"/[locale]/publicaciones/[slug]">) {
  const { locale, slug } = (await props.params) as { locale: Locale; slug: string };
  setRequestLocale(locale);
  const p = await getPublicacion(locale, slug);
  if (!p) {
    // Si el artículo aún no tiene traducción, se muestra la versión que sí existe.
    if (locale === "en" && (await getPublicacion("es", slug))) redirect({ href: `/publicaciones/${slug}`, locale: "es" });
    notFound();
  }

  const t = await getTranslations("publicaciones");
  const tn = await getTranslations("nav");
  const tc = await getTranslations("comun");
  const autor = await getIntegrante(locale, p.autor);
  const area = getArea(locale, p.area);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: p.titulo,
    description: p.extracto,
    datePublished: p.fecha,
    inLanguage: locale,
    image: `${firma.url}${p.portada}`,
    author: autor ? { "@type": "Person", name: autor.nombre } : undefined,
    publisher: { "@type": "LegalService", name: firma.nombre },
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <header className="contenedor pt-10 md:pt-14">
        <div className="mx-auto max-w-[880px]">
          <nav aria-label={tc("ruta")} className="text-[13px] text-piedra">
            <Link href="/publicaciones" className="hover:text-tinta">
              {t("volver")}
            </Link>
          </nav>
          <h1 className="mt-10 text-[28px] leading-[1.08] font-bold tracking-[-0.01em] uppercase md:text-[40px]">{p.titulo}</h1>
          <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-4 text-[13px]">
            {autor && (
              <div className="border-l border-linea pl-3">
                <dt className="text-piedra">{t("autor")}</dt>
                <dd className="mt-1">
                  <Link href={`/equipo/${autor.slug}`} className="hover:underline">
                    {autor.nombre}
                  </Link>
                </dd>
              </div>
            )}
            {area && (
              <div className="border-l border-linea pl-3">
                <dt className="text-piedra">{t("area")}</dt>
                <dd className="mt-1">
                  <Link href={`/areas/${area.slug}`} className="hover:underline">
                    {area.nombre}
                  </Link>
                </dd>
              </div>
            )}
            <div className="border-l border-linea pl-3">
              <dt className="text-piedra">{t("fecha")}</dt>
              <dd className="mt-1">
                <time dateTime={p.fecha}>{formatoFecha(p.fecha, locale)}</time>
              </dd>
            </div>
            <div className="border-l border-linea pl-3">
              <dt className="text-piedra">{t("lectura")}</dt>
              <dd className="mt-1">{t("minutos", { min: p.lectura })}</dd>
            </div>
          </dl>
        </div>
        <div className="relative mx-auto mt-12 aspect-[16/8] max-w-[1200px] overflow-hidden">
          <Image src={p.portada} alt="" fill preload sizes="(min-width: 1360px) 1200px, 100vw" className="object-cover" />
        </div>
      </header>

      <div className="contenedor seccion">
        <div className="mx-auto max-w-[720px]">
          <Markdown texto={p.cuerpo} />

          <p className="mt-12 border-l-2 border-linea pl-4 text-[14px] leading-relaxed text-piedra">{t("aviso")}</p>

          <aside className="sobre-oscuro mt-12 bg-nogal p-8 text-crema md:p-10">
            <Eyebrow oscuro>{t("ctaEyebrow")}</Eyebrow>
            <p className="mt-3 text-2xl leading-snug md:text-[28px]">{t("ctaTitulo")}</p>
            <div className="mt-8">
              <Boton href={`/contacto?area=${p.area}#agenda`} variante="claro">
                {tn("agenda")}
              </Boton>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
