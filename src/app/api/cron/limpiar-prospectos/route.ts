import { and, lt, ne, sql } from "drizzle-orm";
import { db } from "@/db";
import { leads } from "@/db/schema";

// Conservación de datos (Aviso de Privacidad): los prospectos que no se volvieron
// clientes se eliminan a los 12 meses. Vercel Cron llama esta ruta a diario (vercel.json).
export async function GET(request: Request) {
  const secreto = process.env.CRON_SECRET;
  if (!secreto || request.headers.get("authorization") !== `Bearer ${secreto}`) {
    return new Response("No autorizado", { status: 401 });
  }
  if (!db) return Response.json({ eliminados: 0, motivo: "sin base de datos" });
  const borrados = await db
    .delete(leads)
    .where(and(ne(leads.estado, "cliente"), lt(leads.creadoEn, sql`now() - interval '12 months'`)))
    .returning({ id: leads.id });
  return Response.json({ eliminados: borrados.length });
}
