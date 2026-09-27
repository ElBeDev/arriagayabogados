import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { equipoSemilla, nombreCorto, RNP_URL } from "@/content/equipo";
import { firma } from "@/content/firma";
import { formatoFecha } from "@/content/publicaciones";
import { getAreas, getIntegrante, getPublicaciones } from "@/lib/contenido";
import { alternates } from "@/lib/seo";
import { TarjetasActivas } from "@/components/interactivos";
import { BloqueAgenda } from "@/components/secciones";
import { Boton, Eyebrow } from "@/components/ui";

export function generateStaticParams() {
  return equipoSemilla.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/[locale]/equipo/[slug]">): Promise<Metadata> {
  const { locale, slug } = (await props.params) as { locale: Locale; slug: string };
  const p = await getIntegrante(locale, slug);
  if (!p) return {};
  return { title: `${p.nombre} · ${p.cargo}`, description: p.bio[0], alternates: alternates(`/equipo/${slug}`, locale) };
}

function Dato({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-2 border-t border-linea py-5 sm:grid-cols-[180px_1fr] sm:gap-6">
      <dt className="text-[13px] text-piedra">{titulo}</dt>
      <dd className="text-[15px] leading-relaxed">{children}</dd>
    </div>
  );
}

export default async function Perfil(props: PageProps<"/[locale]/equipo/[slug]">) {
  const { locale, slug } = (await props.params) as { locale: Locale; slug: string };
  setRequestLocale(locale);
  const p = await getIntegrante(locale, slug);
  if (!p) notFound();

  const t = await getTranslations("perfil");
  const tn = await getTranslations("nav");
  const tc = await getTranslations("comun");
  const ta = await getTranslations("agenda");
  const areasPersona = getAreas(locale).filter((a) => p.areas.includes(a.slug));
  const articulos = (await getPublicaciones(locale)).filter((a) => a.autor === p.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: p.nombre,
    jobTitle: p.cargo,
    worksFor: { "@type": "LegalService", name: firma.nombre },
    knowsLanguage: p.idiomas,
    email: p.email,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <section className="contenedor pt-10 pb-18 md:pt-14 lg:pb-30">
        <nav aria-label={tc("ruta")} className="mb-10 text-[13px] text-piedra md:mb-14">
          <Link href="/equipo" className="hover:text-tinta">
            {t("volver")}
          </Link>
        </nav>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="border border-linea p-3 lg:sticky lg:top-24">
              <div className="relative aspect-[4/5] overflow-hidden bg-nogal-hover">
                <Image
                  src={p.foto}
                  alt={tc("retrato", { nombre: p.nombre })}
                  fill
                  preload
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
          <div className="lg:col-span-7">
            <Eyebrow>{p.cargo}</Eyebrow>
            <h1 className="mt-4 text-[34px] leading-[1.05] font-bold tracking-[-0.01em] uppercase md:text-[52px]">{p.nombre}</h1>
            <ul className="mt-6 flex flex-wrap gap-2">
              {areasPersona.map((a) => (
                <li key={a.slug}>
                  <Link href={`/areas/${a.slug}`} className="block border border-linea px-3 py-1.5 text-[12px] hover:border-nogal">
                    {a.nombre}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-10 space-y-5 text-[17px] leading-[1.7] text-tinta/85">
              {p.bio.map((b, i) => (
                <p key={i}>{b}</p>
              ))}
            </div>

            <dl className="mt-10 border-b border-linea">
              <Dato titulo={t("formacion")}>
                <ul className="space-y-1.5">
                  {p.formacion.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </Dato>
              <Dato titulo={t("idiomas")}>{p.idiomas.join(", ")}</Dato>
              {p.cedula && (
                <Dato titulo={t("cedula")}>
                  {p.cedula}.{" "}
                  <a href={RNP_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                    {t("verificar")}
                  </a>
                </Dato>
              )}
              <Dato titulo={t("correo")}>
                <a href={`mailto:${p.email}`} className="inline-flex items-center gap-2 hover:underline">
                  <EnvelopeSimple aria-hidden size={16} /> {p.email}
                </a>
              </Dato>
            </dl>

            <div className="mt-10">
              <Boton href="#agenda">{tn("agenda")}</Boton>
            </div>
          </div>
        </div>
      </section>

      {articulos.length > 0 && (
        <section className="contenedor pb-18 lg:pb-30">
          <h2 className="mb-10 text-[30px] leading-[1.2] md:text-[40px]">{t("publicacionesDe", { nombre: nombreCorto(p) })}</h2>
          <TarjetasActivas
            carrusel={false}
            etiqueta={t("publicacionesDe", { nombre: nombreCorto(p) })}
            tarjetas={articulos.map((a) => ({
              href: `/publicaciones/${a.slug}`,
              titulo: a.titulo,
              texto: a.extracto,
              imagen: a.portada,
              meta: formatoFecha(a.fecha, locale),
              cta: tc("leer"),
            }))}
          />
        </section>
      )}

      <div className="border-t border-linea">
        <BloqueAgenda titulo={ta("tituloPersona", { nombre: nombreCorto(p) })} areaInicial={p.areas[0]} />
      </div>
    </>
  );
}
