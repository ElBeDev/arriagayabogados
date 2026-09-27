import { and, desc, eq, ilike, or, type SQL } from "drizzle-orm";
import { db } from "@/db";
import { leads } from "@/db/schema";
import { rolActual } from "@/lib/auth";
import { nombreArea, urgencias } from "../datos";

const celda = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;

export async function GET(request: Request) {
  if ((await rolActual()) !== "admin") return new Response("No autorizado", { status: 401 });
  if (!db) return new Response("Sin base de datos", { status: 503 });

  const p = new URL(request.url).searchParams;
  const filtros: SQL[] = [];
  if (p.get("estado")) filtros.push(eq(leads.estado, p.get("estado")!));
  if (p.get("area")) filtros.push(eq(leads.area, p.get("area")!));
  const q = p.get("q");
  if (q) filtros.push(or(ilike(leads.nombre, `%${q}%`), ilike(leads.apellido, `%${q}%`), ilike(leads.email, `%${q}%`))!);

  const filas = await db.select().from(leads).where(filtros.length ? and(...filtros) : undefined).orderBy(desc(leads.creadoEn));
  const encabezado = ["Recibido", "Nombre", "Apellido", "Correo", "Teléfono", "Tipo", "Empresa", "Área", "Urgencia", "Fecha preferida", "Estado", "Asignado a", "Idioma", "Mensaje", "Notas"];
  const cuerpo = filas.map((l) =>
    [l.creadoEn.toISOString(), l.nombre, l.apellido, l.email, l.telefono, l.tipo, l.empresa, nombreArea(l.area), urgencias[l.urgencia] ?? l.urgencia, l.fecha, l.estado, l.asignadoA, l.locale, l.mensaje, l.notas]
      .map(celda)
      .join(","),
  );
  // BOM para que Excel abra los acentos correctamente.
  const csv = "﻿" + [encabezado.map(celda).join(","), ...cuerpo].join("\r\n");
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="prospectos-${new Date().toISOString().slice(0, 10)}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
