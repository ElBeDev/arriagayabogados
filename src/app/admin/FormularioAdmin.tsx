"use client";

import { startTransition, useActionState, type ReactNode } from "react";
import type { EstadoGuardado } from "./(protegido)/acciones";
import { claseBoton, claseBotonPeligro } from "./ui";

export function FormularioAdmin({
  accion,
  children,
  textoBoton = "Guardar",
  guardadoInicial = false,
  className = "",
}: {
  accion: (prev: EstadoGuardado, fd: FormData) => Promise<EstadoGuardado>;
  children: ReactNode;
  textoBoton?: string;
  guardadoInicial?: boolean;
  className?: string;
}) {
  const [estado, act, enviando] = useActionState(accion, guardadoInicial ? { ok: true } : {});
  return (
    <form
      // Envío manual (sin `action`): así React no reinicia los campos y se ve lo guardado.
      onSubmit={(e) => {
        e.preventDefault();
        const datos = new FormData(e.currentTarget);
        startTransition(() => act(datos));
      }}
      className={`space-y-6 ${className}`}
    >
      {children}
      <div className="sticky bottom-0 -mx-1 flex flex-wrap items-center gap-4 border-t border-linea bg-crema px-1 py-4">
        <button type="submit" disabled={enviando} className={claseBoton}>
          {enviando ? "Guardando…" : textoBoton}
        </button>
        {estado.error && (
          <p role="alert" className="text-[14px] text-error">
            {estado.error}
          </p>
        )}
        {estado.ok && !enviando && (
          <p role="status" className="text-[14px] text-piedra">
            Cambios guardados.
          </p>
        )}
      </div>
    </form>
  );
}

export function BotonEliminar({ accion, pregunta }: { accion: () => Promise<void>; pregunta: string }) {
  return (
    <form
      action={accion}
      onSubmit={(e) => {
        if (!confirm(pregunta)) e.preventDefault();
      }}
    >
      <button type="submit" className={claseBotonPeligro}>
        Eliminar
      </button>
    </form>
  );
}
