"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, m, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUpRight, CaretDown, List, X } from "@phosphor-icons/react";
import { Link, usePathname } from "@/i18n/navigation";
import { clasesBoton, FlechaBoton } from "./ui";
import { LogoHorizontal } from "./marca";

type AreaMenu = { slug: string; nombre: string; resumen: string };

function esActivo(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Logo({ tono = "claro" }: { tono?: "claro" | "oscuro" }) {
  const t = useTranslations("nav");
  return (
    <Link href="/" aria-label={t("inicioAria")} className="flex h-9 shrink-0 items-center md:h-10">
      <LogoHorizontal tono={tono} className="h-full" />
    </Link>
  );
}

/** Cambia al otro idioma conservando la página actual. */
function SelectorIdioma({ className = "" }: { className?: string }) {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const otro = locale === "es" ? "en" : "es";
  return (
    <Link
      href={pathname}
      locale={otro}
      hrefLang={otro}
      aria-label={t("otroIdiomaAria")}
      className={`text-[13px] font-medium underline-offset-4 hover:underline ${className}`}
    >
      {otro.toUpperCase()}
    </Link>
  );
}

export function Header({ areas, telefono, email }: { areas: AreaMenu[]; telefono: string; email: string }) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [conScroll, setConScroll] = useState(false);
  // Los menús guardan la ruta en la que se abrieron: al navegar se cierran solos.
  const [rutaMenu, setRutaMenu] = useState<string | null>(null);
  const [rutaMega, setRutaMega] = useState<string | null>(null);
  const menuAbierto = rutaMenu === pathname;
  const megaAbierto = rutaMega === pathname;
  const setMenuAbierto = (abierto: boolean) => setRutaMenu(abierto ? pathname : null);
  const setMegaAbierto = (abierto: boolean) => setRutaMega(abierto ? pathname : null);

  const navegacion = [
    { href: "/", label: t("inicio") },
    { href: "/la-firma", label: t("firma") },
    { href: "/areas", label: t("areas") },
    { href: "/equipo", label: t("equipo") },
    { href: "/publicaciones", label: t("publicaciones") },
    { href: "/contacto", label: t("contacto") },
  ];

  // Motion agrupa las lecturas de scroll; solo cambia el estado al cruzar el umbral.
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    const pasado = y > 8;
    if (pasado !== conScroll) setConScroll(pasado);
  });

  useEffect(() => {
    document.body.style.overflow = menuAbierto ? "hidden" : "";
  }, [menuAbierto]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        conScroll ? "border-linea bg-crema/90 backdrop-blur-md" : "border-linea bg-crema"
      }`}
      onMouseLeave={() => setMegaAbierto(false)}
    >
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:bg-nogal focus:px-4 focus:py-2 focus:text-crema"
      >
        {t("saltar")}
      </a>
      <div className="contenedor flex h-[72px] items-center justify-between gap-6">
        <Logo />

        <nav aria-label={t("principal")} className="hidden lg:block">
          <ul className="flex items-center gap-7 text-sm xl:gap-8">
            {navegacion.map((item) => {
              const activo = esActivo(pathname, item.href);
              const esAreas = item.href === "/areas";
              return (
                <li key={item.href} onMouseEnter={() => setMegaAbierto(esAreas)}>
                  <Link
                    href={item.href}
                    aria-current={activo ? "page" : undefined}
                    className="flex items-center gap-1.5 py-2 whitespace-nowrap transition-opacity hover:opacity-70"
                    onFocus={() => setMegaAbierto(esAreas)}
                  >
                    {activo && <span aria-hidden className="size-1 rounded-full bg-tinta" />}
                    {item.label}
                    {esAreas && <CaretDown aria-hidden size={11} />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <SelectorIdioma className="hidden lg:inline" />
          <div className="hidden sm:block">
            <Link href="/contacto#agenda" className={clasesBoton("oscuro")}>
              {t("agenda")}
              <FlechaBoton />
            </Link>
          </div>
          <button
            type="button"
            className="-mr-2 p-2 lg:hidden"
            aria-label={t("abrirMenu")}
            aria-expanded={menuAbierto}
            onClick={() => setMenuAbierto(true)}
          >
            <List size={26} />
          </button>
        </div>
      </div>

      {/* Mega-menú de áreas */}
      <AnimatePresence>
        {megaAbierto && (
          <m.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-0 top-full hidden border-b border-linea bg-crema lg:block"
          >
            <div className="contenedor grid grid-cols-3 gap-x-10 gap-y-1 py-8">
              {areas.map((a) => (
                <Link
                  key={a.slug}
                  href={`/areas/${a.slug}`}
                  className="group border-l border-linea py-3 pl-5 transition-colors hover:border-nogal"
                >
                  <span className="flex items-center gap-2 font-medium">
                    {a.nombre}
                    <ArrowUpRight size={12} className="opacity-0 transition-opacity group-hover:opacity-100" />
                  </span>
                  <span className="mt-1 block text-[13px] leading-snug text-piedra">{a.resumen}</span>
                </Link>
              ))}
            </div>
          </m.div>
        )}
      </AnimatePresence>

      {/* Menú móvil */}
      <AnimatePresence>
        {menuAbierto && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="sobre-oscuro fixed inset-0 z-50 flex flex-col bg-nogal text-crema lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label={t("menu")}
          >
            <div className="contenedor flex h-[72px] items-center justify-between">
              <Logo tono="oscuro" />
              <button type="button" className="-mr-2 p-2" aria-label={t("cerrarMenu")} onClick={() => setMenuAbierto(false)}>
                <X size={26} />
              </button>
            </div>
            <nav aria-label={t("movil")} className="contenedor flex-1 overflow-y-auto pt-8">
              <ul className="space-y-1">
                {navegacion.map((item, i) => (
                  <m.li
                    key={item.href}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 * i }}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center justify-between border-b border-crema/15 py-4 text-[28px]"
                      aria-current={esActivo(pathname, item.href) ? "page" : undefined}
                    >
                      {item.label}
                      <ArrowUpRight size={20} />
                    </Link>
                  </m.li>
                ))}
              </ul>
              <div className="mt-10 flex items-end justify-between gap-6 text-sm text-crema-suave">
                <div className="space-y-1">
                  <p>{telefono}</p>
                  <p>{email}</p>
                </div>
                <SelectorIdioma className="text-crema" />
              </div>
            </nav>
            <div className="contenedor pb-8">
              <Link href="/contacto#agenda" className={clasesBoton("claro", "w-full justify-center")}>
                {t("agenda")}
                <FlechaBoton />
              </Link>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
