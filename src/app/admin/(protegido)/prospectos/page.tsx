import Link from "next/link";
import { and, desc, eq, ilike, or, type SQL } from "drizzle-orm";
import { db } from "@/db";
import { leads } from "@/db/schema";
import { areas } from "@/content/areas";
import { Etiqueta, SinBaseDeDatos, Titulo, claseBotonSecundario, claseInput } from "../../ui";
import { estadosLead, fechaCorta, nombreArea, urgencias } from "../../datos";

export default async function Prospectos(props: { searchParams: Promise<Record<string, string | undefined>> }) {
  if (!db) return <SinBaseDeDatos />;
  const { estado, area, q } = await props.searchParams;

  const filtros: SQL[] = [];
  if (estado) filtros.push(eq(leads.estado, estado));
  if (area) filtros.push(eq(leads.area, area));
  if (q) filtros.push(or(ilike(leads.nombre, `%${q}%`), ilike(leads.apellido, `%${q}%`), ilike(leads.email, `%${q}%`), ilike(leads.empresa, `%${q}%`))!);
  const filas = await db
    .select()
    .from(leads)
    .where(filtros.length ? and(...filtros) : undefined)
    .orderBy(desc(leads.creadoEn))
    .limit(300);

  const exportar = `/admin/prospectos-csv?${new URLSearchParams(Object.entries({ estado, area, q }).filter(([, v]) => v) as [string, string][])}`;

  return (
    <>
      <Titulo
        accion={
          <a href={exportar} className={claseBotonSecundario}>
            Exportar CSV
          </a>
        }
      >
        Prospectos
      </Titulo>

      <form className="mb-8 grid gap-3 sm:grid-cols-[1fr_200px_220px_auto]" role="search">
        <input name="q" defaultValue={q} placeholder="Buscar por nombre, correo o empresa" className={claseInput} aria-label="Buscar" />
        <select name="estado" defaultValue={estado ?? ""} className={claseInput} aria-label="Estado">
          <option value="">Todos los estados</option>
          {estadosLead.map((e) => (
            <option key={e.valor} value={e.valor}>
              {e.etiqueta}
            </option>
          ))}
        </select>
        <select name="area" defaultValue={area ?? ""} className={claseInput} aria-label="Área">
          <option value="">Todas las áreas</option>
          {areas.map((a) => (
            <option key={a.slug} value={a.slug}>
              {a.nombre}
            </option>
          ))}
        </select>
        <button type="submit" className={claseBotonSecundario}>
          Filtrar
        </button>
      </form>

      {filas.length === 0 ? (
        <p className="border-l-2 border-linea pl-4 text-piedra">No hay prospectos con estos filtros.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-[14px]">
            <thead className="text-[12px] text-piedra">
              <tr className="border-b border-linea">
                <th className="py-3 pr-4 font-normal">Recibido</th>
                <th className="py-3 pr-4 font-normal">Nombre</th>
                <th className="py-3 pr-4 font-normal">Área</th>
                <th className="py-3 pr-4 font-normal">Urgencia</th>
                <th className="py-3 pr-4 font-normal">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-linea">
              {filas.map((l) => (
                <tr key={l.id} className="hover:bg-crema-claro">
                  <td className="py-3 pr-4 whitespace-nowrap text-piedra">{fechaCorta(l.creadoEn)}</td>
                  <td className="py-3 pr-4">
                    <Link href={`/admin/prospectos/${l.id}`} className="font-medium underline-offset-2 hover:underline">
                      {l.nombre} {l.apellido}
                    </Link>
                    {l.empresa && <span className="block text-[12px] text-piedra">{l.empresa}</span>}
                  </td>
                  <td className="py-3 pr-4">{nombreArea(l.area)}</td>
                  <td className="py-3 pr-4">{urgencias[l.urgencia] ?? l.urgencia}</td>
                  <td className="py-3 pr-4">
                    <Etiqueta tono={l.estado === "nuevo" ? "nuevo" : l.estado === "cliente" ? "ok" : "apagado"}>
                      {estadosLead.find((e) => e.valor === l.estado)?.etiqueta ?? l.estado}
                    </Etiqueta>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
