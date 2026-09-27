import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { marked } from "marked";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { Integrante } from "@/content/equipo";
import { getAjustes, getAreas } from "@/lib/contenido";
import { FormularioConsulta } from "./FormularioConsulta";
import { SelloMuesca } from "./decoracion";
import { EncabezadoSeccion } from "./ui";

/** Hero de páginas interiores: breadcrumb + encabezado apilado con H1. */
export async function HeroInterior({
  migas,
  eyebrow,
  titulo,
  texto,
  accion,
}: {
  migas: { href?: string; label: string }[];
  eyebrow: string;
  titulo: ReactNode;
  texto?: ReactNode;
  accion?: ReactNode;
}) {
  const t = await getTranslations("comun");
  return (
    <section className="contenedor pt-10 pb-16 md:pt-14 lg:pb-24">
      <nav aria-label={t("ruta")} className="mb-10 text-[13px] text-piedra md:mb-14">
        <ol className="flex flex-wrap items-center gap-1.5">
          {[{ href: "/", label: t("inicio") }, ...migas].map((m, i, arr) => (
            <li key={m.label} className="flex items-center gap-1.5">
              {m.href && i < arr.length - 1 ? (
                <Link href={m.href} className="hover:text-tinta">
                  {m.label}
                </Link>
              ) : (
                <span aria-current="page" className="text-tinta">
                  {m.label}
                </span>
              )}
              {i < arr.length - 1 && <CaretRight aria-hidden size={10} />}
            </li>
          ))}
        </ol>
      </nav>
      <EncabezadoSeccion nivel="h1" eyebrow={eyebrow} titulo={titulo} texto={texto} accion={accion} />
    </section>
  );
}

/** Foto a todo el ancho con muesca curva arriba y el sello de la marca encajado. */
export function FotoConMuesca({
  src,
  alt,
  alto = "h-[340px] md:h-[520px] lg:h-[640px]",
}: {
  src: string;
  alt: string;
  alto?: string;
}) {
  return (
    <div className="relative">
      <div
        className={`relative w-full overflow-hidden ${alto} [mask-image:radial-gradient(circle_at_50%_0,transparent_84px,black_85px)] md:[mask-image:radial-gradient(circle_at_50%_0,transparent_96px,black_97px)]`}
      >
        <Image src={src} alt={alt} fill sizes="100vw" className="object-cover" />
      </div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <SelloMuesca />
      </div>
    </div>
  );
}

export async function TarjetaEquipo({ persona, oscuro = false }: { persona: Integrante; oscuro?: boolean }) {
  const t = await getTranslations("comun");
  return (
    <Link
      href={`/equipo/${persona.slug}`}
      className={`group block border p-3 transition-colors ${
        oscuro ? "border-crema/30 hover:border-crema" : "border-linea hover:border-nogal"
      }`}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-nogal-hover">
        <Image
          src={persona.foto}
          alt={t("retrato", { nombre: persona.nombre })}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 82vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="px-1 pt-4 pb-1">
        <p className="text-lg leading-snug">{persona.nombre}</p>
        <p className={`mt-1 text-[13px] ${oscuro ? "text-crema-suave" : "text-piedra"}`}>{persona.cargo}</p>
      </div>
    </Link>
  );
}

/** Bloque "Agenda una consulta": formulario a la izquierda, foto a la derecha. */
export async function BloqueAgenda({ titulo, areaInicial }: { titulo?: string; areaInicial?: string }) {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("agenda");
  const tm = await getTranslations("movil");
  const ajustes = await getAjustes();
  const areas = getAreas(locale).map((a) => ({ slug: a.slug, nombre: a.nombre }));
  return (
    <section id="agenda" className="contenedor seccion scroll-mt-20">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <h2 className="max-w-[18ch] text-[30px] leading-[1.2] md:text-[44px]">{titulo ?? t("titulo")}</h2>
          <p className="mt-5 max-w-[54ch] leading-relaxed text-piedra">{t("texto")}</p>
          <div className="mt-12">
            <FormularioConsulta
              areas={areas}
              areaInicial={areaInicial}
              locale={locale}
              whatsapp={ajustes.whatsapp}
              mensajeWhatsapp={tm("mensajeWhatsapp")}
              turnstileSiteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
            />
          </div>
        </div>
        <div className="relative hidden min-h-[520px] lg:col-span-5 lg:block">
          <Image src="/img/consulta.jpg" alt={t("fotoAlt")} fill sizes="40vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}

const clasesProsa =
  "max-w-[72ch] space-y-5 text-[17px] leading-[1.7] text-tinta [&_a]:underline [&_a]:underline-offset-2 [&_h2]:pt-6 [&_h2]:text-[26px] [&_h2]:leading-tight [&_h3]:pt-4 [&_h3]:text-xl [&_li]:pl-1 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5 [&_p]:text-tinta/85 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_ul]:text-tinta/85";

export function Prosa({ children }: { children: ReactNode }) {
  return <div className={clasesProsa}>{children}</div>;
}

/** Cuerpo de artículo en Markdown (lo escribe el equipo desde /admin). */
export function Markdown({ texto }: { texto: string }) {
  const html = marked.parse(texto, { async: false, gfm: true }) as string;
  return <div className={clasesProsa} dangerouslySetInnerHTML={{ __html: html }} />;
}
