import { Link } from "@/i18n/navigation";
import {
  ArrowUpRight,
  Briefcase,
  Buildings,
  Copyright,
  Fingerprint,
  Gavel,
  HouseLine,
  Receipt,
  Scales,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import type { ComponentProps, ReactNode } from "react";
import type { AreaIcono } from "@/content/areas";

type Variante = "oscuro" | "claro";

const variantes: Record<Variante, string> = {
  oscuro: "bg-nogal text-crema hover:bg-nogal-hover",
  claro: "bg-crema text-nogal hover:bg-crema-claro",
};

export function clasesBoton(variante: Variante = "oscuro", extra = "") {
  return `group/boton inline-flex items-center gap-2 whitespace-nowrap px-[18px] py-[11px] text-sm font-medium transition-[background-color,transform] duration-200 active:scale-[0.98] ${variantes[variante]} ${extra}`;
}

export function FlechaBoton() {
  return (
    <ArrowUpRight
      aria-hidden
      size={14}
      weight="bold"
      className="transition-transform duration-200 group-hover/boton:translate-x-0.5 group-hover/boton:-translate-y-0.5"
    />
  );
}

export function Boton({
  href,
  children,
  variante = "oscuro",
  className = "",
  ...rest
}: {
  href: string;
  children: ReactNode;
  variante?: Variante;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className">) {
  return (
    <Link href={href} className={clasesBoton(variante, className)} {...rest}>
      {children}
      <FlechaBoton />
    </Link>
  );
}

export function Eyebrow({ children, oscuro = false }: { children: ReactNode; oscuro?: boolean }) {
  return (
    <p className={`text-[13px] ${oscuro ? "text-crema-suave" : "text-piedra"}`}>
      <span aria-hidden>{"// "}</span>
      {children}
    </p>
  );
}

/** Encabezado de sección apilado: etiqueta opcional, título, texto (máx. 65ch) y acción debajo. */
export function EncabezadoSeccion({
  eyebrow,
  titulo,
  texto,
  accion,
  oscuro = false,
  nivel = "h2",
}: {
  eyebrow?: string;
  titulo: ReactNode;
  texto?: ReactNode;
  accion?: ReactNode;
  oscuro?: boolean;
  nivel?: "h1" | "h2";
}) {
  const Titulo = nivel;
  return (
    <div className={nivel === "h1" ? "max-w-[1100px]" : "max-w-[820px]"}>
      {eyebrow && <Eyebrow oscuro={oscuro}>{eyebrow}</Eyebrow>}
      <Titulo
        className={`${eyebrow ? "mt-4" : ""} ${
          nivel === "h1"
            ? "text-[32px] leading-[1.05] font-bold tracking-[-0.01em] uppercase md:text-[40px] lg:text-5xl"
            : "max-w-[20ch] text-[30px] leading-[1.2] md:text-[44px]"
        }`}
      >
        {titulo}
      </Titulo>
      {texto && (
        <div className={`mt-5 max-w-[65ch] text-base leading-relaxed ${oscuro ? "text-crema-suave" : "text-piedra"}`}>
          {texto}
        </div>
      )}
      {accion && <div className="mt-7">{accion}</div>}
    </div>
  );
}

const iconos = {
  corporativo: Briefcase,
  litigio: Gavel,
  amparo: Scales,
  laboral: UsersThree,
  fiscal: Receipt,
  familiar: HouseLine,
  penal: Fingerprint,
  inmobiliario: Buildings,
  pi: Copyright,
} satisfies Record<AreaIcono, unknown>;

export function IconoArea({ icono, size = 32, className }: { icono: AreaIcono; size?: number; className?: string }) {
  const Icono = iconos[icono];
  return <Icono aria-hidden size={size} weight="light" className={className} />;
}
