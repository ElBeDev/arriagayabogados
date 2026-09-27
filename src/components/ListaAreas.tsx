"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useState, type ReactNode } from "react";
import { AnimatePresence, m } from "motion/react";
import { ArrowUpRight, Check } from "@phosphor-icons/react";
import { clasesBoton, FlechaBoton } from "./ui";

export type ItemArea = {
  href: string;
  nombre: string;
  texto: string;
  servicios: string[];
  icono: ReactNode;
};

/**
 * Índice de áreas: filas grandes a la izquierda y panel de detalle a la derecha.
 * La fila activa se rellena de nogal (el mismo gesto que las tarjetas del sitio).
 * En móvil el panel se omite y cada fila muestra su descripción corta.
 */
export function ListaAreas({ items }: { items: ItemArea[] }) {
  const [activa, setActiva] = useState(0);
  const t = useTranslations("comun");
  const a = items[activa];

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      <ul className="divide-y divide-linea border-y border-linea lg:col-span-7">
        {items.map((item, i) => {
          const esActiva = i === activa;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                onMouseEnter={() => setActiva(i)}
                onFocus={() => setActiva(i)}
                aria-current={esActiva ? "true" : undefined}
                className={`group flex items-center justify-between gap-6 py-5 transition-[background-color,color,padding] duration-300 ease-out active:scale-[0.995] lg:py-6 ${
                  esActiva ? "lg:bg-nogal lg:px-6 lg:text-crema" : "lg:px-0"
                }`}
              >
                <span className="flex items-start gap-4 lg:items-center">
                  <span aria-hidden className="mt-1 shrink-0 lg:mt-0">
                    {item.icono}
                  </span>
                  <span>
                    <span className="block text-[22px] leading-tight md:text-[26px]">{item.nombre}</span>
                    <span className="mt-1.5 block text-[15px] leading-relaxed text-piedra lg:hidden">{item.texto}</span>
                  </span>
                </span>
                <ArrowUpRight
                  aria-hidden
                  size={20}
                  className={`shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                    esActiva ? "lg:opacity-100" : "lg:opacity-40"
                  }`}
                />
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="hidden lg:col-span-5 lg:block">
        <div className="sticky top-28 border border-linea bg-crema-claro p-8">
          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={a.href}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              aria-live="polite"
            >
              <div aria-hidden className="text-laton">
                {a.icono}
              </div>
              <h3 className="mt-6 text-[28px] leading-tight">{a.nombre}</h3>
              <p className="mt-3 leading-relaxed text-piedra">{a.texto}</p>
              <ul className="mt-6 space-y-2.5">
                {a.servicios.slice(0, 4).map((s) => (
                  <li key={s} className="flex items-start gap-2.5 text-[15px]">
                    <Check aria-hidden size={16} className="mt-1 shrink-0 text-laton" />
                    {s}
                  </li>
                ))}
              </ul>
              <Link href={a.href} className={clasesBoton("oscuro", "mt-8")}>
                {t("verArea")}
                <FlechaBoton />
              </Link>
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
