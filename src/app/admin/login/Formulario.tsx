"use client";

import { useActionState } from "react";
import { iniciarSesion } from "./acciones";
import { Campo, claseBoton, claseInput } from "../ui";

export function FormularioLogin() {
  const [estado, accion, enviando] = useActionState(iniciarSesion, {});
  return (
    <form action={accion} className="space-y-5">
      <Campo etiqueta="Usuario">
        <input name="usuario" autoComplete="username" required defaultValue={estado.usuario} className={claseInput} />
      </Campo>
      <Campo etiqueta="Contraseña">
        <input name="clave" type="password" autoComplete="current-password" required className={claseInput} />
      </Campo>
      {estado.error && (
        <p role="alert" className="text-[14px] text-error">
          {estado.error}
        </p>
      )}
      <button type="submit" disabled={enviando} className={`${claseBoton} w-full justify-center`}>
        {enviando ? "Entrando…" : "Entrar"}
      </button>
    </form>
  );
}
