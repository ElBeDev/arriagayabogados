"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, m } from "motion/react";
import { useTranslations } from "next-intl";

type Grupo = {
  titulo: string;
  personas: { slug: string; areas: string[]; tarjeta: ReactNode }[];
};

export function FiltroEquipo({ areas, grupos }: { areas: { slug: string; nombre: string }[]; grupos: Grupo[] }) {
  const t = useTranslations("equipo");
  const [filtro, setFiltro] = useState<string | null>(null);

  const visibles = grupos
    .map((g) => ({ ...g, personas: g.personas.filter((p) => !filtro || p.areas.includes(filtro)) }))
    .filter((g) => g.personas.length > 0);

  const claseFiltro = (activo: boolean) =>
    `border px-3.5 py-2 text-[13px] transition-colors ${
      activo ? "border-nogal bg-nogal text-crema" : "border-linea hover:border-nogal"
    }`;

  return (
    <div>
      <div role="group" aria-label={t("filtro")} className="flex flex-wrap gap-2">
        <button type="button" aria-pressed={!filtro} onClick={() => setFiltro(null)} className={claseFiltro(!filtro)}>
          {t("todas")}
        </button>
        {areas.map((a) => (
          <button
            key={a.slug}
            type="button"
            aria-pressed={filtro === a.slug}
            onClick={() => setFiltro(a.slug)}
            className={claseFiltro(filtro === a.slug)}
          >
            {a.nombre}
          </button>
        ))}
      </div>

      <div className="mt-14 space-y-16">
        {visibles.length === 0 && (
          <p role="status" className="border-l-2 border-linea pl-4 text-piedra">
            {t("vacio")}
          </p>
        )}
        {visibles.map((g) => (
          <section key={g.titulo}>
            <h2 className="border-b border-linea pb-4 text-[26px] md:text-[32px]">{g.titulo}</h2>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <AnimatePresence mode="popLayout">
                {g.personas.map((p) => (
                  <m.li
                    key={p.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.25 }}
                  >
                    {p.tarjeta}
                  </m.li>
                ))}
              </AnimatePresence>
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
