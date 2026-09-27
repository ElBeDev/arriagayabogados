"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useId, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, m } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Minus, Plus, Quotes } from "@phosphor-icons/react";

/* ------------------------------------------------------------------ */
/* Acordeón de barra vertical (diferenciadores / escenarios)           */
/* ------------------------------------------------------------------ */

export function AcordeonBarra({ items }: { items: { titulo: string; texto: string }[] }) {
  const [activo, setActivo] = useState(0);
  const idBarra = useId();
  return (
    <ul className="relative border-l border-linea">
      {items.map((item, i) => {
        const esActivo = i === activo;
        return (
          <li key={item.titulo} className="relative">
            {esActivo && (
              <m.span
                layoutId={idBarra}
                className="absolute top-0 -left-px h-full w-[2px] bg-nogal"
                transition={{ type: "spring", stiffness: 400, damping: 36 }}
              />
            )}
            <button
              type="button"
              aria-expanded={esActivo}
              onClick={() => setActivo(i)}
              className={`w-full py-4 pl-6 text-left text-[22px] leading-tight transition-colors md:text-2xl ${
                esActivo ? "text-tinta" : "text-piedra hover:text-tinta"
              }`}
            >
              {item.titulo}
            </button>
            <AnimatePresence initial={false}>
              {esActivo && (
                <m.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-[52ch] pb-5 pl-6 text-[15px] leading-relaxed text-piedra">{item.texto}</p>
                </m.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/* Acordeón de preguntas frecuentes                                    */
/* ------------------------------------------------------------------ */

export function AcordeonFaq({ items }: { items: { pregunta: string; respuesta: string }[] }) {
  const [abierto, setAbierto] = useState<number | null>(0);
  return (
    <ul className="border-t border-linea">
      {items.map((item, i) => {
        const esAbierto = abierto === i;
        return (
          <li key={item.pregunta} className="border-b border-linea">
            <button
              type="button"
              aria-expanded={esAbierto}
              onClick={() => setAbierto(esAbierto ? null : i)}
              className="flex w-full items-center justify-between gap-6 py-5 text-left text-lg"
            >
              {item.pregunta}
              {esAbierto ? <Minus aria-hidden size={18} className="shrink-0" /> : <Plus aria-hidden size={18} className="shrink-0" />}
            </button>
            <AnimatePresence initial={false}>
              {esAbierto && (
                <m.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="max-w-[70ch] pb-6 leading-relaxed text-piedra">{item.respuesta}</p>
                </m.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/* Carrusel con scroll-snap y flechas                                  */
/* ------------------------------------------------------------------ */

export function Carrusel({
  children,
  etiqueta,
  oscuro = false,
  anchoItem = "basis-[82%] sm:basis-[45%] lg:basis-[calc((100%-72px)/4)]",
}: {
  children: ReactNode[];
  etiqueta: string;
  oscuro?: boolean;
  anchoItem?: string;
}) {
  const t = useTranslations("comun");
  const pista = useRef<HTMLUListElement>(null);

  const mover = (dir: 1 | -1) => {
    const el = pista.current;
    if (!el) return;
    const item = el.querySelector("li");
    const paso = item ? item.getBoundingClientRect().width + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * paso, behavior: "smooth" });
  };

  const claseFlecha = `flex size-11 items-center justify-center border transition-colors ${
    oscuro
      ? "border-crema/30 hover:border-crema hover:bg-crema hover:text-nogal"
      : "border-linea hover:border-nogal hover:bg-nogal hover:text-crema"
  }`;

  return (
    <div>
      <ul
        ref={pista}
        aria-label={etiqueta}
        className="sin-scrollbar -mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-px-5 px-5 md:mx-0 md:scroll-px-0 md:px-0"
      >
        {children.map((hijo, i) => (
          <li key={i} className={`shrink-0 snap-start ${anchoItem}`}>
            {hijo}
          </li>
        ))}
      </ul>
      <div className="mt-8 flex gap-2">
        <button type="button" aria-label={t("anterior")} onClick={() => mover(-1)} className={claseFlecha}>
          <ArrowLeft aria-hidden size={18} />
        </button>
        <button type="button" aria-label={t("siguiente")} onClick={() => mover(1)} className={claseFlecha}>
          <ArrowRight aria-hidden size={18} />
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Grupo de tarjetas con estado activo (la primera arranca activa)     */
/* ------------------------------------------------------------------ */

export type DatosTarjeta = {
  href: string;
  titulo: string;
  texto: string;
  icono?: ReactNode;
  imagen?: string;
  meta?: string;
  cta: string;
};

export function TarjetasActivas({
  tarjetas,
  carrusel = true,
  destacada = false,
  etiqueta,
}: {
  tarjetas: DatosTarjeta[];
  carrusel?: boolean;
  /** La primera tarjeta ocupa dos columnas y dos filas; las demás se acomodan a su lado. */
  destacada?: boolean;
  etiqueta: string;
}) {
  const [activa, setActiva] = useState(0);

  const nodos = tarjetas.map((t, i) => (
    <Tarjeta
      key={t.href}
      datos={t}
      activa={i === activa}
      grande={destacada && i === 0}
      onActivar={() => setActiva(i)}
    />
  ));

  if (carrusel) return <Carrusel etiqueta={etiqueta}>{nodos}</Carrusel>;

  return (
    <ul aria-label={etiqueta} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {nodos.map((n, i) => (
        <li key={i} className={destacada && i === 0 ? "sm:col-span-2 lg:row-span-2" : undefined}>
          {n}
        </li>
      ))}
    </ul>
  );
}

function Tarjeta({
  datos,
  activa,
  grande = false,
  onActivar,
}: {
  datos: DatosTarjeta;
  activa: boolean;
  grande?: boolean;
  onActivar: () => void;
}) {
  return (
    <Link
      href={datos.href}
      onMouseEnter={onActivar}
      onFocus={onActivar}
      className={`group flex h-full flex-col border p-6 transition-[background-color,border-color,transform] duration-300 ease-out active:scale-[0.99] ${
        activa ? "border-nogal bg-nogal text-crema" : "border-linea bg-transparent text-tinta"
      }`}
    >
      {datos.imagen && (
        <div
          className={`relative -mx-6 -mt-6 mb-6 overflow-hidden ${grande ? "aspect-[16/10] lg:aspect-auto lg:min-h-[340px] lg:flex-1" : "aspect-[16/10]"}`}
        >
          <Image
            src={datos.imagen}
            alt=""
            fill
            sizes={grande ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      )}
      {datos.icono && <div className="mb-8">{datos.icono}</div>}
      {datos.meta && (
        <p className={`mb-3 text-[13px] ${activa ? "text-crema-suave" : "text-piedra"}`}>{datos.meta}</p>
      )}
      <h3 className={`leading-snug font-medium ${grande ? "text-2xl md:text-[30px]" : "text-xl"}`}>{datos.titulo}</h3>
      <p
        className={`mt-3 text-[15px] leading-relaxed ${grande ? "" : "flex-1"} ${activa ? "text-crema-suave" : "text-piedra"}`}
      >
        {datos.texto}
      </p>
      <span
        className={`mt-8 inline-flex w-fit items-center gap-2 px-4 py-2.5 text-[13px] font-medium transition-colors ${
          activa ? "bg-crema text-nogal" : "bg-nogal text-crema"
        }`}
      >
        {datos.cta}
        <ArrowUpRight aria-hidden size={13} weight="bold" />
      </span>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Testimonios                                                         */
/* ------------------------------------------------------------------ */

type Testimonio = { iniciales: string; cita: string; autor: string; detalle: string };

export function Testimonios({ items }: { items: Testimonio[] }) {
  const [activo, setActivo] = useState(0);
  const tr = useTranslations("comun");
  const t = items[activo];

  return (
    <div className="grid gap-6 md:grid-cols-12 md:gap-8">
      <div role="tablist" aria-label={tr("testimonios")} className="flex gap-3 md:col-span-3 md:flex-col md:items-end lg:col-span-2 lg:col-start-2">
        {items.map((item, i) => {
          const esActivo = i === activo;
          return (
            <button
              key={item.iniciales}
              type="button"
              role="tab"
              aria-selected={esActivo}
              aria-label={`${item.iniciales}: ${item.autor}, ${item.detalle}`}
              onClick={() => setActivo(i)}
              className={`flex items-center justify-center text-2xl font-medium transition-all duration-300 md:text-3xl ${
                esActivo
                  ? "size-24 bg-nogal text-crema md:h-[180px] md:w-full"
                  : "size-16 bg-linea text-piedra hover:bg-fantasma md:h-[110px] md:w-[80%]"
              }`}
            >
              {item.iniciales}
            </button>
          );
        })}
      </div>

      <div className="md:col-span-9 lg:col-span-8">
        <AnimatePresence mode="wait">
          <m.figure
            key={activo}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="sobre-oscuro relative overflow-hidden bg-nogal p-4 text-crema md:p-6"
          >
            <Quotes
              aria-hidden
              weight="fill"
              className="pointer-events-none absolute -top-6 right-2 size-28 text-arena/25 md:-top-14 md:size-64"
            />
            <div className="relative px-4 pt-6 pb-10 md:px-6 md:pt-8 md:pb-14">
              <blockquote>
                <p className="max-w-[28ch] text-2xl leading-snug md:text-[34px]">“{t.cita}”</p>
              </blockquote>
            </div>
            <figcaption className="relative bg-crema-claro px-6 py-5 text-tinta">
              <p className="text-lg">{t.autor}</p>
              <p className="text-[13px] text-piedra">{t.detalle}</p>
            </figcaption>
          </m.figure>
        </AnimatePresence>
      </div>
    </div>
  );
}
