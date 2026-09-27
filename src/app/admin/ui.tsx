import type { ReactNode } from "react";

// Piezas de formulario del panel. Mismo sistema visual del sitio, más compacto.

export const claseInput =
  "w-full border border-linea bg-crema-claro px-3 py-2.5 text-[15px] text-tinta outline-none transition-colors placeholder:text-piedra focus:border-nogal";

export function Campo({
  etiqueta,
  ayuda,
  children,
  className = "",
}: {
  etiqueta: string;
  ayuda?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-[13px] font-medium">{etiqueta}</span>
      <span className="mt-1.5 block">{children}</span>
      {ayuda && <span className="mt-1 block text-[12px] text-piedra">{ayuda}</span>}
    </label>
  );
}

export function Titulo({ children, accion }: { children: ReactNode; accion?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
      <h1 className="text-[28px] leading-tight">{children}</h1>
      {accion}
    </div>
  );
}

export const claseBoton =
  "inline-flex items-center gap-2 bg-nogal px-4 py-2.5 text-sm font-medium text-crema transition-[background-color,transform] hover:bg-nogal-hover active:scale-[0.98] disabled:opacity-60";
export const claseBotonSecundario =
  "inline-flex items-center gap-2 border border-linea px-4 py-2.5 text-sm font-medium transition-colors hover:border-nogal";
export const claseBotonPeligro =
  "inline-flex items-center gap-2 border border-error/40 px-4 py-2.5 text-sm font-medium text-error transition-colors hover:bg-error hover:text-crema";

export function SinBaseDeDatos() {
  return (
    <div role="alert" className="border-l-2 border-error bg-crema-claro p-5 text-[15px] leading-relaxed">
      <p className="font-medium">No hay base de datos configurada.</p>
      <p className="mt-1 text-piedra">
        Agrega <code>DATABASE_URL</code> en las variables de entorno y ejecuta <code>npm run db:migrar</code> y{" "}
        <code>npm run db:semilla</code>. Mientras tanto, el sitio muestra el contenido de ejemplo.
      </p>
    </div>
  );
}

export function Etiqueta({ children, tono = "neutro" }: { children: ReactNode; tono?: "neutro" | "nuevo" | "ok" | "apagado" }) {
  const tonos = {
    neutro: "border-linea text-tinta",
    nuevo: "border-nogal bg-nogal text-crema",
    ok: "border-laton text-tinta",
    apagado: "border-linea text-piedra",
  };
  return <span className={`inline-block border px-2 py-0.5 text-[12px] whitespace-nowrap ${tonos[tono]}`}>{children}</span>;
}
