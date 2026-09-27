import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { equipo } from "@/db/schema";
import { areas } from "@/content/areas";
import { FormularioAdmin } from "../../../FormularioAdmin";
import { Campo, SinBaseDeDatos, Titulo, claseInput } from "../../../ui";
import { guardarIntegrante } from "../../acciones";

export default async function EditarIntegrante(props: { params: Promise<{ id: string }>; searchParams: Promise<{ guardado?: string }> }) {
  if (!db) return <SinBaseDeDatos />;
  const { id: idTexto } = await props.params;
  const nuevo = idTexto === "nuevo";
  const [p] = nuevo ? [null] : await db.select().from(equipo).where(eq(equipo.id, Number(idTexto)));
  if (!nuevo && !p) notFound();

  return (
    <>
      <p className="mb-4 text-[13px]">
        <Link href="/admin/equipo" className="text-piedra hover:text-tinta">
          ← Equipo
        </Link>
      </p>
      <Titulo>{nuevo ? "Nuevo integrante" : p!.nombre}</Titulo>
      <FormularioAdmin accion={guardarIntegrante.bind(null, p?.id ?? null)} guardadoInicial={(await props.searchParams).guardado === "1"} className="max-w-4xl">
        <div className="grid gap-5 md:grid-cols-2">
          <Campo etiqueta="Nombre completo con título" ayuda="Ej.: Lic. Mariana Arriaga Cortés">
            <input name="nombre" defaultValue={p?.nombre} required className={claseInput} />
          </Campo>
          <Campo etiqueta="Slug (URL del perfil)" ayuda="Ej.: mariana-arriaga-cortes">
            <input name="slug" defaultValue={p?.slug} required pattern="[a-z0-9]+(-[a-z0-9]+)*" className={claseInput} />
          </Campo>
          <Campo etiqueta="Nivel">
            <select name="nivel" defaultValue={p?.nivel ?? "asociado"} className={claseInput}>
              <option value="socio">Socio</option>
              <option value="of-counsel">Of Counsel</option>
              <option value="asociado-senior">Asociado Senior</option>
              <option value="asociado">Asociado</option>
            </select>
          </Campo>
          <Campo etiqueta="Orden dentro de su nivel">
            <input name="orden" type="number" defaultValue={p?.orden ?? 0} className={claseInput} />
          </Campo>
          <Campo etiqueta="Cargo (español)">
            <input name="cargoEs" defaultValue={p?.cargoEs} required className={claseInput} />
          </Campo>
          <Campo etiqueta="Cargo (inglés)">
            <input name="cargoEn" defaultValue={p?.cargoEn} required className={claseInput} />
          </Campo>
          <Campo etiqueta="Correo">
            <input name="email" type="email" defaultValue={p?.email} required className={claseInput} />
          </Campo>
          <Campo etiqueta="Cédula profesional" ayuda="Debe ser real y verificable en el Registro Nacional de Profesionistas.">
            <input name="cedula" defaultValue={p?.cedula ?? ""} className={claseInput} />
          </Campo>
          <fieldset className="md:col-span-2">
            <legend className="text-[13px] font-medium">Áreas de práctica</legend>
            <div className="mt-2 grid gap-2 sm:grid-cols-3">
              {areas.map((a) => (
                <label key={a.slug} className="flex items-center gap-2 text-[14px]">
                  <input type="checkbox" name="areas" value={a.slug} defaultChecked={p?.areas.includes(a.slug)} className="size-4 accent-nogal" />
                  {a.nombre}
                </label>
              ))}
            </div>
          </fieldset>
          <Campo etiqueta="Biografía (español)" ayuda="Separa los párrafos con una línea en blanco.">
            <textarea name="bioEs" defaultValue={p?.bioEs} rows={7} required className={claseInput} />
          </Campo>
          <Campo etiqueta="Biografía (inglés)">
            <textarea name="bioEn" defaultValue={p?.bioEn} rows={7} required className={claseInput} />
          </Campo>
          <Campo etiqueta="Formación (español)" ayuda="Un grado por línea.">
            <textarea name="formacionEs" defaultValue={p?.formacionEs} rows={4} required className={claseInput} />
          </Campo>
          <Campo etiqueta="Formación (inglés)">
            <textarea name="formacionEn" defaultValue={p?.formacionEn} rows={4} required className={claseInput} />
          </Campo>
          <Campo etiqueta="Idiomas (español)" ayuda="Separados por coma.">
            <input name="idiomasEs" defaultValue={p?.idiomasEs ?? "Español"} required className={claseInput} />
          </Campo>
          <Campo etiqueta="Idiomas (inglés)">
            <input name="idiomasEn" defaultValue={p?.idiomasEn ?? "Spanish"} required className={claseInput} />
          </Campo>
          <div className="flex items-end gap-4 md:col-span-2">
            {p?.foto && (
              <span className="relative size-24 shrink-0 overflow-hidden bg-linea">
                <Image src={p.foto} alt="" fill sizes="96px" className="object-cover" />
              </span>
            )}
            <Campo etiqueta="Fotografía (subir)" ayuda="Retrato vertical 4:5, fondo oscuro, máximo 5 MB." className="flex-1">
              <input name="fotoArchivo" type="file" accept="image/jpeg,image/png,image/webp,image/avif" className={claseInput} />
            </Campo>
            <Campo etiqueta="…o URL" className="flex-1">
              <input name="foto" defaultValue={p?.foto ?? ""} className={claseInput} />
            </Campo>
          </div>
          <label className="flex items-center gap-2 text-[14px]">
            <input type="checkbox" name="activo" defaultChecked={p?.activo ?? true} className="size-4 accent-nogal" />
            Mostrar en el sitio
          </label>
        </div>
      </FormularioAdmin>
    </>
  );
}
