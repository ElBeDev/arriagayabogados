import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Clock, EnvelopeSimple, MapPin, Phone } from "@phosphor-icons/react/dist/ssr";
import type { Locale } from "@/i18n/routing";
import { direccionCompleta, mapaEmbed } from "@/content/firma";
import { getAjustes, getAreas } from "@/lib/contenido";
import { alternates } from "@/lib/seo";
import { BloqueAgenda, HeroInterior } from "@/components/secciones";

export async function generateMetadata(props: PageProps<"/[locale]/contacto">): Promise<Metadata> {
  const locale = (await props.params).locale as Locale;
  const t = await getTranslations({ locale, namespace: "contacto" });
  const ajustes = await getAjustes();
  return {
    title: t("metaTitulo"),
    description: `${t("texto")} ${direccionCompleta(ajustes)}. Tel. ${ajustes.telefono}.`,
    alternates: alternates("/contacto", locale),
  };
}

export default async function Contacto(props: PageProps<"/[locale]/contacto">) {
  const locale = (await props.params).locale as Locale;
  setRequestLocale(locale);
  const { area } = await props.searchParams;
  const areaInicial = typeof area === "string" && getAreas(locale).some((a) => a.slug === area) ? area : undefined;
  const t = await getTranslations("contacto");
  const ta = await getTranslations("agenda");
  const ajustes = await getAjustes();
  const horario = locale === "en" ? ajustes.horarioEn : ajustes.horarioEs;
  const calcom = process.env.NEXT_PUBLIC_CALCOM_URL;

  const datos = [
    {
      Icono: Phone,
      titulo: t("telefono"),
      contenido: (
        <a href={`tel:${ajustes.telefonoHref}`} className="hover:underline">
          {ajustes.telefono}
        </a>
      ),
    },
    {
      Icono: EnvelopeSimple,
      titulo: t("correo"),
      contenido: (
        <a href={`mailto:${ajustes.email}`} className="break-all hover:underline">
          {ajustes.email}
        </a>
      ),
    },
    { Icono: MapPin, titulo: t("oficina"), contenido: direccionCompleta(ajustes) },
    {
      Icono: Clock,
      titulo: t("horario"),
      contenido: (
        <ul>
          {horario.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <>
      <HeroInterior migas={[{ label: t("metaTitulo") }]} eyebrow={t("eyebrow")} titulo={t("titulo")} texto={t("texto")} />

      <section className="contenedor">
        <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {datos.map(({ Icono, titulo, contenido }) => (
            <li key={titulo} className="border-l border-linea pl-4">
              <Icono aria-hidden size={24} weight="light" />
              <p className="mt-5 text-[13px] text-piedra">{titulo}</p>
              <div className="mt-1 text-[15px] leading-relaxed">{contenido}</div>
            </li>
          ))}
        </ul>
      </section>

      <BloqueAgenda areaInicial={areaInicial} />

      {/* Agenda en línea (Cal.com): aparece solo si está configurada. */}
      {calcom && (
        <section id="calendario" className="contenedor scroll-mt-20 pb-18 lg:pb-30">
          <h2 className="text-[30px] leading-[1.2] md:text-[44px]">{ta("enLinea")}</h2>
          <p className="mt-4 max-w-[60ch] leading-relaxed text-piedra">{ta("enLineaTexto")}</p>
          <div className="mt-10 border border-linea">
            <iframe
              title={ta("enLineaTitulo")}
              src={`${calcom}${calcom.includes("?") ? "&" : "?"}embed=true&locale=${locale}`}
              loading="lazy"
              className="h-[720px] w-full"
            />
          </div>
        </section>
      )}

      <section className="contenedor pb-18 lg:pb-30">
        <div className="relative aspect-[4/3] overflow-hidden border border-linea md:aspect-[21/8]">
          <iframe
            title={t("mapa", { direccion: direccionCompleta(ajustes) })}
            src={mapaEmbed(ajustes)}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 size-full [filter:grayscale(1)_sepia(0.25)_contrast(0.95)]"
          />
        </div>
      </section>
    </>
  );
}
