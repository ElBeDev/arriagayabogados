import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { testimonios } from "@/db/schema";
import { BotonEliminar, FormularioAdmin } from "../../../FormularioAdmin";
import { Campo, SinBaseDeDatos, Titulo, claseInput } from "../../../ui";
import { eliminarTestimonio, guardarTestimonio } from "../../acciones";

export default async function EditarTestimonio(props: { params: Promise<{ id: string }>; searchParams: Promise<{ guardado?: string }> }) {
  if (!db) return <SinBaseDeDatos />;
  const { id: idTexto } = await props.params;
  const nuevo = idTexto === "nuevo";
  const [f] = nuevo ? [null] : await db.select().from(testimonios).where(eq(testimonios.id, Number(idTexto)));
  if (!nuevo && !f) notFound();

  return (
    <>
      <p className="mb-4 text-[13px]">
        <Link href="/admin/testimonios" className="text-piedra hover:text-tinta">
          ← Testimonios
        </Link>
      </p>
      <Titulo accion={f && <BotonEliminar accion={eliminarTestimonio.bind(null, f.id)} pregunta="¿Eliminar este testimonio?" />}>
        {nuevo ? "Nuevo testimonio" : "Editar testimonio"}
      </Titulo>
      <FormularioAdmin accion={guardarTestimonio.bind(null, f?.id ?? null)} guardadoInicial={(await props.searchParams).guardado === "1"} className="max-w-4xl">
        <div className="grid gap-5 md:grid-cols-2">
          <Campo etiqueta="Cita (español)" ayuda="Máximo 160 caracteres para que quepa en 3 líneas.">
            <textarea name="citaEs" defaultValue={f?.citaEs} maxLength={160} rows={3} required className={claseInput} />
          </Campo>
          <Campo etiqueta="Cita (inglés)">
            <textarea name="citaEn" defaultValue={f?.citaEn} maxLength={160} rows={3} required className={claseInput} />
          </Campo>
          <Campo etiqueta="Autor (español)" ayuda="Cargo o descripción, p. ej. Director General. Evita el nombre si el cliente prefiere anonimato.">
            <input name="autorEs" defaultValue={f?.autorEs} required className={claseInput} />
          </Campo>
          <Campo etiqueta="Autor (inglés)">
            <input name="autorEn" defaultValue={f?.autorEn} required className={claseInput} />
          </Campo>
          <Campo etiqueta="Detalle (español)" ayuda="Tipo de asunto o empresa y ciudad.">
            <input name="detalleEs" defaultValue={f?.detalleEs} required className={claseInput} />
          </Campo>
          <Campo etiqueta="Detalle (inglés)">
            <input name="detalleEn" defaultValue={f?.detalleEn} required className={claseInput} />
          </Campo>
          <Campo etiqueta="Iniciales" ayuda="Se muestran en el selector, en lugar de una foto.">
            <input name="iniciales" defaultValue={f?.iniciales} maxLength={3} required className={claseInput} />
          </Campo>
          <Campo etiqueta="Orden">
            <input name="orden" type="number" defaultValue={f?.orden ?? 0} className={claseInput} />
          </Campo>
          <Campo etiqueta="Fecha de la autorización por escrito">
            <input name="fechaAutorizacion" type="date" defaultValue={f?.fechaAutorizacion ?? ""} className={claseInput} />
          </Campo>
          <div className="flex flex-col justify-end gap-3 pb-1 text-[14px]">
            <label className="flex items-center gap-2">
              <input type="checkbox" name="autorizado" defaultChecked={f?.autorizado} className="size-4 accent-nogal" />
              El cliente autorizó por escrito su publicación
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="visible" defaultChecked={f?.visible ?? false} className="size-4 accent-nogal" />
              Mostrar en el sitio
            </label>
          </div>
        </div>
      </FormularioAdmin>
    </>
  );
}
