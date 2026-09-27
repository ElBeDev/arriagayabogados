import Link from "next/link";
import { asc } from "drizzle-orm";
import { db } from "@/db";
import { testimonios } from "@/db/schema";
import { Etiqueta, SinBaseDeDatos, Titulo, claseBoton } from "../../ui";

export default async function TestimoniosAdmin() {
  if (!db) return <SinBaseDeDatos />;
  const filas = await db.select().from(testimonios).orderBy(asc(testimonios.orden));
  return (
    <>
      <Titulo
        accion={
          <Link href="/admin/testimonios/nuevo" className={claseBoton}>
            Nuevo testimonio
          </Link>
        }
      >
        Testimonios
      </Titulo>
      <p className="mb-6 max-w-[70ch] text-[14px] text-piedra">
        Solo se muestran en el sitio los testimonios marcados como visibles y con autorización por escrito del cliente.
      </p>
      <ul className="divide-y divide-linea border-y border-linea">
        {filas.map((f) => (
          <li key={f.id}>
            <Link href={`/admin/testimonios/${f.id}`} className="flex flex-wrap items-center justify-between gap-3 py-4 hover:bg-crema-claro">
              <span>
                <span className="block">“{f.citaEs}”</span>
                <span className="text-[13px] text-piedra">
                  {f.autorEs} · {f.detalleEs}
                </span>
              </span>
              <span className="flex gap-2">
                {!f.autorizado && <Etiqueta tono="apagado">Sin autorización</Etiqueta>}
                <Etiqueta tono={f.visible ? "ok" : "apagado"}>{f.visible ? "Visible" : "Oculto"}</Etiqueta>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
