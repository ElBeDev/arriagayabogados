import Link from "next/link";
import { asc, desc } from "drizzle-orm";
import { db } from "@/db";
import { publicaciones } from "@/db/schema";
import { Etiqueta, SinBaseDeDatos, Titulo, claseBoton } from "../../ui";
import { nombreArea } from "../../datos";

export default async function PublicacionesAdmin() {
  if (!db) return <SinBaseDeDatos />;
  const filas = await db.select().from(publicaciones).orderBy(desc(publicaciones.fecha), asc(publicaciones.locale));

  return (
    <>
      <Titulo
        accion={
          <Link href="/admin/publicaciones/nueva" className={claseBoton}>
            Nueva publicación
          </Link>
        }
      >
        Publicaciones
      </Titulo>
      <p className="mb-6 max-w-[70ch] text-[14px] text-piedra">
        Cada artículo puede existir en español y en inglés con el mismo slug; así el selector de idioma lleva de una versión a la otra.
      </p>
      {filas.length === 0 ? (
        <p className="text-piedra">Aún no hay publicaciones.</p>
      ) : (
        <ul className="divide-y divide-linea border-y border-linea">
          {filas.map((p) => (
            <li key={p.id}>
              <Link href={`/admin/publicaciones/${p.id}`} className="flex flex-wrap items-center justify-between gap-3 py-4 hover:bg-crema-claro">
                <span className="min-w-0">
                  <span className="block font-medium">{p.titulo}</span>
                  <span className="text-[13px] text-piedra">
                    {nombreArea(p.area)} · {p.fecha}
                  </span>
                </span>
                <span className="flex gap-2">
                  <Etiqueta>{p.locale.toUpperCase()}</Etiqueta>
                  <Etiqueta tono={p.estado === "publicado" ? "ok" : "apagado"}>{p.estado === "publicado" ? "Publicado" : "Borrador"}</Etiqueta>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
