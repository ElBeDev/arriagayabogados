"use client";

import { useState } from "react";
import { Check, Copy } from "@phosphor-icons/react";

/** Botón que copia un valor (HEX o RGB) al portapapeles. */
export function CopiarColor({ valor }: { valor: string }) {
  const [copiado, setCopiado] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(valor);
        } catch {
          // Navegadores sin permiso de portapapeles: copia con un campo temporal.
          const campo = document.createElement("textarea");
          campo.value = valor;
          document.body.appendChild(campo);
          campo.select();
          document.execCommand("copy");
          campo.remove();
        }
        setCopiado(true);
        setTimeout(() => setCopiado(false), 1500);
      }}
      className="inline-flex items-center gap-1.5 font-mono text-[13px] text-piedra hover:text-tinta"
      aria-label={`Copiar ${valor}`}
    >
      {valor}
      {copiado ? <Check aria-hidden size={13} /> : <Copy aria-hidden size={13} />}
    </button>
  );
}
