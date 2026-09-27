import Link from "next/link";
import { redirect } from "next/navigation";
import { and, count, desc, eq, gte, sql } from "drizzle-orm";
import { db } from "@/db";
import { leads, publicaciones } from "@/db/schema";
import { rolActual } from "@/lib/auth";
import { Etiqueta, SinBaseDeDatos, Titulo } from "../ui";
import { fechaCorta, nombreArea } from "../datos";

export default async function Resumen() {
  if ((await rolActual()) === "editor") redirect("/admin/publicaciones");
  if (!db) return <SinBaseDeDatos />;

  const hace30 = sql`now() - interval '30 days'`;
  const [[nuevos], [mes], [clientes], [pubs], recientes] = await Promise.all([
    db.select({ n: count() }).from(leads).where(eq(leads.estado, "nuevo")),
    db.select({ n: count() }).from(leads).where(gte(leads.creadoEn, hace30)),
    db.select({ n: count() }).from(leads).where(and(eq(leads.estado, "cliente"), gte(leads.creadoEn, hace30))),
    db.select({ n: count() }).from(publicaciones).where(eq(publicaciones.estado, "publicado")),
    db.select().from(leads).orderBy(desc(leads.creadoEn)).limit(6),
  ]);

  const tarjetas = [
    { etiqueta: "Prospectos sin atender", valor: nuevos.n, href: "/admin/prospectos?estado=nuevo" },
    { etiqueta: "Prospectos (30 días)", valor: mes.n, href: "/admin/prospectos" },
    { etiqueta: "Nuevos clientes (30 días)", valor: clientes.n, href: "/admin/prospectos?estado=cliente" },
    { etiqueta: "Publicaciones activas", valor: pubs.n, href: "/admin/publicaciones" },
  ];

  return (
    <>
      <Titulo>Resumen</Titulo>
      <dl className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {tarjetas.map((c) => (
          <Link key={c.etiqueta} href={c.href} className="border-l border-linea pl-4 hover:border-nogal">
            <dd className="text-[40px] leading-none tabular-nums">{c.valor}</dd>
            <dt className="mt-2 text-[13px] text-piedra">{c.etiqueta}</dt>
          </Link>
        ))}
      </dl>

      <h2 className="mt-14 mb-4 text-xl">Últimos prospectos</h2>
      {recientes.length === 0 ? (
        <p className="text-piedra">Todavía no llega ninguna solicitud por el formulario.</p>
      ) : (
        <ul className="divide-y divide-linea border-y border-linea">
          {recientes.map((l) => (
            <li key={l.id}>
              <Link href={`/admin/prospectos/${l.id}`} className="flex flex-wrap items-center justify-between gap-3 py-4 hover:bg-crema-claro">
                <span>
                  <span className="font-medium">
                    {l.nombre} {l.apellido}
                  </span>
                  <span className="ml-3 text-[13px] text-piedra">{nombreArea(l.area)}</span>
                </span>
                <span className="flex items-center gap-3 text-[13px] text-piedra">
                  {fechaCorta(l.creadoEn)}
                  {l.estado === "nuevo" && <Etiqueta tono="nuevo">Nuevo</Etiqueta>}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
