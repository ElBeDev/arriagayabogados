import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { equipo, leads } from "@/db/schema";
import { whatsappHref } from "@/content/firma";
import { BotonEliminar, FormularioAdmin } from "../../../FormularioAdmin";
import { Campo, SinBaseDeDatos, Titulo, claseBotonSecundario, claseInput } from "../../../ui";
import { estadosLead, fechaCorta, nombreArea, urgencias } from "../../../datos";
import { actualizarLead, eliminarLead } from "../../acciones";

export default async function Prospecto(props: { params: Promise<{ id: string }> }) {
  if (!db) return <SinBaseDeDatos />;
  const id = Number((await props.params).id);
  const [l] = Number.isInteger(id) ? await db.select().from(leads).where(eq(leads.id, id)) : [];
  if (!l) notFound();
  const integrantes = await db.select({ slug: equipo.slug, nombre: equipo.nombre }).from(equipo).orderBy(equipo.orden);
  const telefono = l.telefono.replace(/\D/g, "");

  const datos: [string, React.ReactNode][] = [
    ["Correo", <a key="e" href={`mailto:${l.email}`} className="underline">{l.email}</a>],
    ["Teléfono", <a key="t" href={`tel:${l.telefono}`} className="underline">{l.telefono}</a>],
    ["Tipo", l.tipo === "empresa" ? `Empresa${l.empresa ? `: ${l.empresa}` : ""}` : "Persona física"],
    ["Área", nombreArea(l.area)],
    ["Urgencia", urgencias[l.urgencia] ?? l.urgencia],
    ["Fecha preferida", l.fecha ?? "Sin preferencia"],
    ["Idioma", l.locale === "en" ? "Inglés" : "Español"],
    ["Recibido", fechaCorta(l.creadoEn)],
    ["Origen", l.utm ? Object.entries(l.utm).map(([k, v]) => `${k}: ${v}`).join(", ") : "Directo o sin UTM"],
  ];

  return (
    <>
      <p className="mb-4 text-[13px]">
        <Link href="/admin/prospectos" className="text-piedra hover:text-tinta">
          ← Prospectos
        </Link>
      </p>
      <Titulo
        accion={
          <div className="flex flex-wrap gap-2">
            <a
              href={whatsappHref(telefono.length === 10 ? `52${telefono}` : telefono, `Hola ${l.nombre}, te escribimos de Arriaga & Abogados sobre tu solicitud de consulta.`)}
              target="_blank"
              rel="noopener noreferrer"
              className={claseBotonSecundario}
            >
              WhatsApp
            </a>
            <BotonEliminar accion={eliminarLead.bind(null, l.id)} pregunta="¿Eliminar este prospecto? No se puede deshacer." />
          </div>
        }
      >
        {l.nombre} {l.apellido}
      </Titulo>

      <div className="grid gap-12 xl:grid-cols-[1fr_380px]">
        <div>
          <dl className="divide-y divide-linea border-y border-linea">
            {datos.map(([k, v]) => (
              <div key={k} className="grid gap-1 py-3 sm:grid-cols-[160px_1fr]">
                <dt className="text-[13px] text-piedra">{k}</dt>
                <dd className="text-[15px]">{v}</dd>
              </div>
            ))}
          </dl>
          <h2 className="mt-8 text-[13px] text-piedra">Mensaje</h2>
          <p className="mt-2 max-w-[70ch] leading-relaxed whitespace-pre-wrap">{l.mensaje}</p>
        </div>

        <FormularioAdmin accion={actualizarLead.bind(null, l.id)}>
          <Campo etiqueta="Estado">
            <select name="estado" defaultValue={l.estado} className={claseInput}>
              {estadosLead.map((e) => (
                <option key={e.valor} value={e.valor}>
                  {e.etiqueta}
                </option>
              ))}
            </select>
          </Campo>
          <Campo etiqueta="Asignado a">
            <select name="asignadoA" defaultValue={l.asignadoA ?? ""} className={claseInput}>
              <option value="">Sin asignar</option>
              {integrantes.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.nombre}
                </option>
              ))}
            </select>
          </Campo>
          <Campo etiqueta="Notas internas" ayuda="Solo las ve el equipo. No se envían al cliente.">
            <textarea name="notas" rows={6} defaultValue={l.notas ?? ""} className={claseInput} />
          </Campo>
        </FormularioAdmin>
      </div>
    </>
  );
}
