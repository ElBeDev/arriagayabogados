import Link from "next/link";
import { notFound } from "next/navigation";
import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { equipo, publicaciones } from "@/db/schema";
import { areas } from "@/content/areas";
import { BotonEliminar, FormularioAdmin } from "../../../FormularioAdmin";
import { EditorMarkdown } from "../../../EditorMarkdown";
import { Campo, SinBaseDeDatos, Titulo, claseInput } from "../../../ui";
import { eliminarPublicacion, guardarPublicacion } from "../../acciones";

export default async function EditarPublicacion(props: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ guardado?: string; traducir?: string }>;
}) {
  if (!db) return <SinBaseDeDatos />;
  const { id: idTexto } = await props.params;
  const { guardado, traducir } = await props.searchParams;
  const nueva = idTexto === "nueva";
  const id = Number(idTexto);
  const [p] = nueva ? [null] : Number.isInteger(id) ? await db.select().from(publicaciones).where(eq(publicaciones.id, id)) : [];
  if (!nueva && !p) notFound();

  // "Traducir": crea la versión en el otro idioma partiendo de la actual.
  const [base] = nueva && traducir ? await db.select().from(publicaciones).where(eq(publicaciones.id, Number(traducir))) : [null];
  const v = p ?? (base ? { ...base, locale: base.locale === "es" ? "en" : "es", estado: "borrador" } : null);
  const autores = await db.select({ slug: equipo.slug, nombre: equipo.nombre }).from(equipo).orderBy(asc(equipo.orden));
  const hoy = new Date().toISOString().slice(0, 10);

  const otra = p ? (await db.select().from(publicaciones).where(eq(publicaciones.slug, p.slug))).find((x) => x.locale !== p.locale) : undefined;

  return (
    <>
      <p className="mb-4 text-[13px]">
        <Link href="/admin/publicaciones" className="text-piedra hover:text-tinta">
          ← Publicaciones
        </Link>
      </p>
      <Titulo
        accion={
          p && (
            <div className="flex flex-wrap gap-2">
              {otra ? (
                <Link href={`/admin/publicaciones/${otra.id}`} className="border border-linea px-4 py-2.5 text-sm hover:border-nogal">
                  Ver versión {otra.locale.toUpperCase()}
                </Link>
              ) : (
                <Link href={`/admin/publicaciones/nueva?traducir=${p.id}`} className="border border-linea px-4 py-2.5 text-sm hover:border-nogal">
                  Crear versión {p.locale === "es" ? "EN" : "ES"}
                </Link>
              )}
              {p.estado === "publicado" && (
                <a
                  href={`${p.locale === "en" ? "/en" : ""}/publicaciones/${p.slug}`}
                  target="_blank"
                  className="border border-linea px-4 py-2.5 text-sm hover:border-nogal"
                >
                  Ver en el sitio ↗
                </a>
              )}
              <BotonEliminar accion={eliminarPublicacion.bind(null, p.id)} pregunta="¿Eliminar esta publicación?" />
            </div>
          )
        }
      >
        {nueva ? "Nueva publicación" : "Editar publicación"}
      </Titulo>

      <FormularioAdmin accion={guardarPublicacion.bind(null, p?.id ?? null)} guardadoInicial={guardado === "1"} className="max-w-4xl">
        <div className="grid gap-5 md:grid-cols-2">
          <Campo etiqueta="Título" className="md:col-span-2">
            <input name="titulo" defaultValue={v?.titulo} required className={claseInput} />
          </Campo>
          <Campo etiqueta="Slug (URL)" ayuda="Igual en ambos idiomas. Ej.: como-registrar-una-marca">
            <input name="slug" defaultValue={v?.slug} required pattern="[a-z0-9]+(-[a-z0-9]+)*" className={claseInput} />
          </Campo>
          <Campo etiqueta="Idioma">
            <select name="locale" defaultValue={v?.locale ?? "es"} className={claseInput}>
              <option value="es">Español</option>
              <option value="en">Inglés</option>
            </select>
          </Campo>
          <Campo etiqueta="Extracto" ayuda="Una o dos frases; aparece en las tarjetas y en Google." className="md:col-span-2">
            <textarea name="extracto" defaultValue={v?.extracto} rows={2} maxLength={300} required className={claseInput} />
          </Campo>
          <Campo etiqueta="Área">
            <select name="area" defaultValue={v?.area ?? areas[0].slug} className={claseInput}>
              {areas.map((a) => (
                <option key={a.slug} value={a.slug}>
                  {a.nombre}
                </option>
              ))}
            </select>
          </Campo>
          <Campo etiqueta="Autor">
            <select name="autor" defaultValue={v?.autor ?? autores[0]?.slug} className={claseInput}>
              {autores.map((a) => (
                <option key={a.slug} value={a.slug}>
                  {a.nombre}
                </option>
              ))}
            </select>
          </Campo>
          <Campo etiqueta="Fecha">
            <input name="fecha" type="date" defaultValue={v?.fecha ?? hoy} required className={claseInput} />
          </Campo>
          <Campo etiqueta="Minutos de lectura">
            <input name="lectura" type="number" min={1} max={60} defaultValue={v?.lectura ?? 5} className={claseInput} />
          </Campo>
          <Campo etiqueta="Portada (subir imagen)" ayuda="JPG, PNG, WebP o AVIF, máximo 5 MB. Horizontal, 1800 px de ancho.">
            <input name="portadaArchivo" type="file" accept="image/jpeg,image/png,image/webp,image/avif" className={claseInput} />
          </Campo>
          <Campo etiqueta="…o URL de la portada">
            <input name="portada" defaultValue={v?.portada ?? ""} className={claseInput} />
          </Campo>
          <Campo etiqueta="Estado">
            <select name="estado" defaultValue={v?.estado ?? "borrador"} className={claseInput}>
              <option value="borrador">Borrador (no se ve en el sitio)</option>
              <option value="publicado">Publicado</option>
            </select>
          </Campo>
        </div>
        <div>
          <span className="block text-[13px] font-medium">Contenido</span>
          <div className="mt-1.5">
            <EditorMarkdown nombre="cuerpo" inicial={v?.cuerpo ?? ""} />
          </div>
        </div>
      </FormularioAdmin>
    </>
  );
}
