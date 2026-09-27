import Image from "next/image";
import Link from "next/link";
import { asc } from "drizzle-orm";
import { db } from "@/db";
import { equipo } from "@/db/schema";
import { Etiqueta, SinBaseDeDatos, Titulo, claseBoton } from "../../ui";

const niveles: Record<string, string> = { socio: "Socio", "of-counsel": "Of Counsel", "asociado-senior": "Asociado Senior", asociado: "Asociado" };

export default async function EquipoAdmin() {
  if (!db) return <SinBaseDeDatos />;
  const filas = await db.select().from(equipo).orderBy(asc(equipo.orden));
  return (
    <>
      <Titulo
        accion={
          <Link href="/admin/equipo/nuevo" className={claseBoton}>
            Nuevo integrante
          </Link>
        }
      >
        Equipo
      </Titulo>
      <ul className="divide-y divide-linea border-y border-linea">
        {filas.map((p) => (
          <li key={p.id}>
            <Link href={`/admin/equipo/${p.id}`} className="flex items-center gap-4 py-3 hover:bg-crema-claro">
              <span className="relative size-14 shrink-0 overflow-hidden bg-linea">
                <Image src={p.foto} alt="" fill sizes="56px" className="object-cover" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-medium">{p.nombre}</span>
                <span className="text-[13px] text-piedra">{p.cargoEs}</span>
              </span>
              <span className="flex gap-2">
                <Etiqueta>{niveles[p.nivel] ?? p.nivel}</Etiqueta>
                {!p.cedula && <Etiqueta tono="apagado">Falta cédula</Etiqueta>}
                {!p.activo && <Etiqueta tono="apagado">Oculto</Etiqueta>}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
