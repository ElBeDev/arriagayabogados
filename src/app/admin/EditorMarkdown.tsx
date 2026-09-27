"use client";

import { useState } from "react";
import { marked } from "marked";
import { claseInput } from "./ui";

/** Área de texto Markdown con pestaña de vista previa. */
export function EditorMarkdown({ nombre, inicial }: { nombre: string; inicial: string }) {
  const [texto, setTexto] = useState(inicial);
  const [vista, setVista] = useState(false);
  const pestana = (activa: boolean) =>
    `px-3 py-1.5 text-[13px] border-b-2 ${activa ? "border-nogal text-tinta" : "border-transparent text-piedra hover:text-tinta"}`;
  return (
    <div>
      <div role="tablist" className="mb-2 flex gap-2">
        <button type="button" role="tab" aria-selected={!vista} onClick={() => setVista(false)} className={pestana(!vista)}>
          Escribir
        </button>
        <button type="button" role="tab" aria-selected={vista} onClick={() => setVista(true)} className={pestana(vista)}>
          Vista previa
        </button>
      </div>
      <textarea
        name={nombre}
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        rows={22}
        className={`${claseInput} font-mono text-[14px] leading-relaxed ${vista ? "hidden" : ""}`}
      />
      {vista && (
        <div
          className="min-h-[300px] border border-linea bg-crema-claro p-6 text-[16px] leading-[1.7] [&_h2]:mt-6 [&_h2]:text-2xl [&_li]:ml-5 [&_ol]:list-decimal [&_p]:mt-4 [&_ul]:mt-3 [&_ul]:list-disc"
          dangerouslySetInnerHTML={{ __html: marked.parse(texto, { async: false }) as string }}
        />
      )}
      <p className="mt-1 text-[12px] text-piedra">
        Formato: <code>## Subtítulo</code>, <code>- punto de lista</code>, <code>**negritas**</code>, <code>[enlace](https://…)</code>. Deja una línea
        en blanco entre párrafos.
      </p>
    </div>
  );
}
