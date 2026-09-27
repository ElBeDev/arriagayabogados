import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Ear, FileText, Handshake, MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import type { Locale } from "@/i18n/routing";
import { formatoFecha } from "@/content/publicaciones";
import { imagenes } from "@/content/imagenes";
import { getAjustes, getAreas, getEquipo, getPublicaciones, getTestimonios, getTextos } from "@/lib/contenido";
import { alternates } from "@/lib/seo";
import { Contador, PalabraFantasma, Reveal, TextoRevelado } from "@/components/animaciones";
import { AcordeonBarra, Carrusel, TarjetasActivas, Testimonios } from "@/components/interactivos";
import { ListaAreas } from "@/components/ListaAreas";
import { EstatuaHero } from "@/components/EstatuaHero";
import { BloqueAgenda, FotoConMuesca, TarjetaEquipo } from "@/components/secciones";
import { Boton, EncabezadoSeccion, Eyebrow, IconoArea } from "@/components/ui";

const iconosPasos = [Ear, MagnifyingGlass, FileText, Handshake];

export async function generateMetadata(props: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await props.params;
  return { alternates: alternates("/", locale as Locale) };
}

export default async function Inicio(props: PageProps<"/[locale]">) {
  const locale = (await props.params).locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations("inicio");
  const tc = await getTranslations("comun");
  const tn = await getTranslations("nav");

  const [ajustes, equipo, publicaciones, testimonios] = await Promise.all([
    getAjustes(),
    getEquipo(locale),
    getPublicaciones(locale),
    getTestimonios(locale),
  ]);
  const areas = getAreas(locale);
  const textos = getTextos(locale);
  const socios = equipo.filter((p) => p.nivel === "socio" || p.nivel === "of-counsel");
  const nombresArea = Object.fromEntries(areas.map((a) => [a.slug, a.nombre]));

  return (
    <>
      {/* 1. Hero: se conserva la composición centrada con la escultura y la palabra "ABOGADOS". */}
      <section className="relative overflow-hidden">
        <div className="contenedor pt-14 text-center md:pt-20">
          <div className="entrada">
            <Eyebrow>{t("eyebrow")}</Eyebrow>
          </div>
          <h1
            className="entrada mx-auto mt-5 max-w-[20ch] text-[36px] leading-[1.05] font-bold tracking-[-0.01em] uppercase [animation-delay:60ms] sm:text-5xl lg:text-6xl"
          >
            {t("titulo")}
          </h1>
          <p className="entrada mx-auto mt-6 max-w-[52ch] text-base leading-relaxed text-piedra [animation-delay:120ms]">
            {t("subtitulo")}
          </p>
          <div className="entrada mt-8 [animation-delay:180ms]">
            <Boton href="/contacto#agenda">{tn("agenda")}</Boton>
          </div>
        </div>

        <div className="contenedor @container relative mt-12 md:mt-16">
          <PalabraFantasma>
            <span className="text-[17cqw]">{locale === "en" ? "LAWYERS" : "ABOGADOS"}</span>
          </PalabraFantasma>

          <div className="relative mx-auto h-[400px] w-full max-w-[400px] md:h-[560px] md:max-w-[460px]">
            <div aria-hidden className="absolute inset-x-[12%] top-[8%] bottom-0 border border-linea" />
            <EstatuaHero src={imagenes.heroJusticia} alt={t("estatuaAlt")} />
            <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-b from-transparent to-crema" />
          </div>
        </div>
      </section>

      {/* 2. Manifiesto: el revelado guía la lectura palabra por palabra. */}
      <section className="contenedor seccion">
        <TextoRevelado
          texto={textos.manifiesto}
          className="mx-auto max-w-[30ch] text-center text-[26px] leading-[1.3] md:text-[40px]"
        />
      </section>

      {/* 3. Cifras + foto a todo lo ancho con el sello en la muesca */}
      <section aria-label={t("cifrasAria")}>
        <div className="contenedor">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-10 pb-24 md:grid-cols-[1fr_1fr_170px_1fr_1fr] md:pb-20">
            {ajustes.cifras.map((c, i) => (
              <div key={c.es} className={`border-l border-linea pl-4 ${i === 2 ? "md:col-start-4" : ""}`}>
                <dd className="text-[36px] leading-none md:text-[48px]">
                  <Contador valor={c.valor} sufijo={c.sufijo} />
                </dd>
                <dt className="mt-3 text-[13px] text-piedra">{c[locale]}</dt>
              </div>
            ))}
          </dl>
        </div>
        <FotoConMuesca src="/img/banda-abogado.jpg" alt={t("bandaAlt")} />
      </section>

      {/* 4. La Firma + diferenciadores (imagen + acordeón) */}
      <section id="siguiente" className="contenedor seccion scroll-mt-16">
        <EncabezadoSeccion
          eyebrow={t("firmaEyebrow")}
          titulo={t("firmaTitulo")}
          texto={t("firmaTexto")}
          accion={<Boton href="/la-firma">{t("conocenos")}</Boton>}
        />
        <div className="mt-14 grid items-center gap-10 md:grid-cols-2 lg:mt-20 lg:gap-20">
          <Reveal className="relative aspect-[4/5] max-h-[560px] w-full overflow-hidden">
            <Image
              src="/img/nosotros-balanza.jpg"
              alt={t("balanzaAlt")}
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover"
            />
          </Reveal>
          <AcordeonBarra items={textos.diferenciadores} />
        </div>
      </section>

      {/* 5. Áreas de práctica (índice + panel de detalle) */}
      <section className="contenedor pb-18 lg:pb-30">
        <EncabezadoSeccion titulo={t("areasTitulo")} texto={t("areasTexto")} />
        <div className="mt-12 lg:mt-16">
          <ListaAreas
            items={areas.map((a) => ({
              href: `/areas/${a.slug}`,
              nombre: a.nombre,
              texto: a.tarjeta,
              servicios: a.servicios,
              icono: <IconoArea icono={a.icono} size={28} />,
            }))}
          />
        </div>
        <div className="mt-10">
          <Boton href="/areas">{tc("todasLasAreas")}</Boton>
        </div>
      </section>

      {/* 6. Cómo trabajamos (línea de tiempo con íconos) */}
      <section className="contenedor pb-18 lg:pb-30">
        <EncabezadoSeccion titulo={t("procesoTitulo")} texto={t("procesoTexto")} />
        <ol className="relative mt-12 grid gap-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-8">
          <span aria-hidden className="absolute top-6 right-0 left-0 hidden h-px bg-linea lg:block" />
          {textos.pasos.map((p, i) => {
            const Icono = iconosPasos[i];
            return (
              <Reveal as="li" key={p.titulo} delay={i * 0.06} className="relative">
                <span className="relative flex size-12 items-center justify-center border border-linea bg-crema">
                  <Icono aria-hidden size={22} weight="light" />
                </span>
                <h3 className="mt-6 text-xl font-medium">{p.titulo}</h3>
                <p className="mt-2 max-w-[32ch] text-[15px] leading-relaxed text-piedra">{p.texto}</p>
              </Reveal>
            );
          })}
        </ol>
      </section>

      {/* 7. Equipo: el único bloque de color deliberado de la página */}
      <section className="sobre-oscuro bg-nogal text-crema">
        <div className="contenedor seccion">
          <EncabezadoSeccion
            oscuro
            eyebrow={t("equipoEyebrow")}
            titulo={t("equipoTitulo")}
            texto={t("equipoTexto")}
            accion={
              <Boton href="/equipo" variante="claro">
                {t("conoceEquipo")}
              </Boton>
            }
          />
          <div className="mt-12 lg:mt-16">
            <Carrusel
              oscuro
              etiqueta={t("sociosAria")}
              anchoItem="basis-[78%] sm:basis-[44%] lg:basis-[calc((100%-48px)/3.25)]"
            >
              {socios.map((p) => (
                <TarjetaEquipo key={p.slug} persona={p} oscuro />
              ))}
            </Carrusel>
          </div>
        </div>
      </section>

      {/* 8. Testimonios */}
      {testimonios.length > 0 && (
        <section className="contenedor seccion">
          <EncabezadoSeccion titulo={t("testimoniosTitulo")} texto={t("testimoniosTexto")} />
          <div className="mt-12 lg:mt-16">
            <Testimonios items={testimonios} />
          </div>
        </section>
      )}

      {/* 9. Publicaciones (una destacada + dos) */}
      {publicaciones.length > 0 && (
        <section className="contenedor pb-18 lg:pb-30">
          <EncabezadoSeccion titulo={t("publicacionesTitulo")} accion={<Boton href="/publicaciones">{tc("verTodas")}</Boton>} />
          <div className="mt-12 lg:mt-16">
            <TarjetasActivas
              carrusel={false}
              destacada
              etiqueta={t("publicacionesAria")}
              tarjetas={publicaciones.slice(0, 3).map((p) => ({
                href: `/publicaciones/${p.slug}`,
                titulo: p.titulo,
                texto: p.extracto,
                imagen: p.portada,
                meta: `${nombresArea[p.area] ?? ""} · ${formatoFecha(p.fecha, locale)}`,
                cta: tc("leer"),
              }))}
            />
          </div>
        </section>
      )}

      {/* 10. Agenda */}
      <div className="border-t border-linea">
        <BloqueAgenda />
      </div>
    </>
  );
}
