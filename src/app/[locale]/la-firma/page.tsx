import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { firma, direccionCompleta } from "@/content/firma";
import { getAjustes, getTextos } from "@/lib/contenido";
import { alternates } from "@/lib/seo";
import { Contador, Reveal } from "@/components/animaciones";
import { BloqueAgenda, FotoConMuesca, HeroInterior } from "@/components/secciones";
import { Boton, EncabezadoSeccion } from "@/components/ui";

export async function generateMetadata(props: PageProps<"/[locale]/la-firma">): Promise<Metadata> {
  const locale = (await props.params).locale as Locale;
  const t = await getTranslations({ locale, namespace: "firma" });
  const tn = await getTranslations({ locale, namespace: "nav" });
  return { title: tn("firma"), description: t("metaDescripcion"), alternates: alternates("/la-firma", locale) };
}

export default async function LaFirma(props: PageProps<"/[locale]/la-firma">) {
  const locale = (await props.params).locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations("firma");
  const tn = await getTranslations("nav");
  const ti = await getTranslations("inicio");
  const textos = getTextos(locale);
  const ajustes = await getAjustes();
  const horario = locale === "en" ? ajustes.horarioEn : ajustes.horarioEs;

  return (
    <>
      <HeroInterior
        migas={[{ label: tn("firma") }]}
        eyebrow={t("eyebrow")}
        titulo={t("titulo")}
        texto={t("texto")}
        accion={<Boton href="/equipo">{ti("conoceEquipo")}</Boton>}
      />

      <FotoConMuesca src="/img/oficina.jpg" alt={t("fotoAlt")} />

      <section id="siguiente" className="contenedor seccion scroll-mt-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="text-[30px] leading-[1.2] md:text-[44px]">{t("historiaTitulo", { anio: firma.fundacion })}</h2>
          </div>
          <div className="space-y-6 text-[17px] leading-[1.7] text-tinta/85 lg:col-span-7">
            {textos.historia.map((p, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="contenedor pb-18 lg:pb-30">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {ajustes.cifras.map((c) => (
            <div key={c.es} className="border-l border-linea pl-4">
              <dd className="text-[36px] leading-none md:text-[48px]">
                <Contador valor={c.valor} sufijo={c.sufijo} />
              </dd>
              <dt className="mt-3 text-[13px] text-piedra">{c[locale]}</dt>
            </div>
          ))}
        </dl>
      </section>

      <section className="contenedor">
        <div className="grid gap-12 border-y border-linea py-16 md:grid-cols-2 lg:gap-20 lg:py-24">
          <div>
            <h2 className="text-lg font-medium">{t("mision")}</h2>
            <p className="mt-4 text-[26px] leading-[1.3] md:text-[34px]">{textos.mision}</p>
          </div>
          <div>
            <h2 className="text-lg font-medium">{t("vision")}</h2>
            <p className="mt-4 text-[26px] leading-[1.3] md:text-[34px]">{textos.vision}</p>
          </div>
        </div>
      </section>

      <section className="contenedor seccion">
        <EncabezadoSeccion eyebrow={t("valoresEyebrow")} titulo={t("valoresTitulo")} texto={t("valoresTexto")} />
        <ul className="mt-12 divide-y divide-linea border-t border-linea lg:mt-16">
          {textos.valores.map((v, i) => (
            <Reveal as="li" key={v.titulo} delay={i * 0.05} className="grid gap-2 py-6 md:grid-cols-12 md:gap-10 lg:py-8">
              <h3 className="text-2xl md:col-span-4">{v.titulo}</h3>
              <p className="max-w-[60ch] leading-relaxed text-piedra md:col-span-8 md:pt-1.5">{v.texto}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="contenedor pb-18 lg:pb-30">
        <div className="grid items-center gap-10 md:grid-cols-2 lg:gap-20">
          <figure>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image src="/img/guadalajara.jpg" alt={t("catedralAlt")} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            </div>
            <figcaption className="mt-2 text-[12px] text-piedra">{t("credito")}</figcaption>
          </figure>
          <div>
            <h2 className="text-[30px] leading-[1.2] md:text-[44px]">{t("oficinasTitulo")}</h2>
            <p className="mt-5 max-w-[46ch] leading-relaxed text-piedra">{direccionCompleta(ajustes)}</p>
            <ul className="mt-6 space-y-1 text-[15px]">
              {horario.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            <div className="mt-8">
              <Boton href="/contacto">{t("comoLlegar")}</Boton>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-linea">
        <BloqueAgenda />
      </div>
    </>
  );
}
