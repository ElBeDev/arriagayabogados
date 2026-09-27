// Carga el contenido semilla (src/content) en la base de datos. Idempotente:
// solo inserta lo que falta, nunca sobrescribe lo editado desde /admin.
// Uso: npm run db:semilla
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { sql } from "drizzle-orm";
import * as schema from "../src/db/schema.ts";
import { equipoSemilla } from "../src/content/equipo.ts";
import { publicacionesSemilla } from "../src/content/publicaciones.ts";
import { testimoniosSemilla } from "../src/content/testimonios.ts";
import { ajustesPorDefecto } from "../src/content/firma.ts";

const url = process.env.DATABASE_URL;
if (!url) throw new Error("Falta DATABASE_URL");
const cliente = postgres(url, { max: 1 });
const db = drizzle(cliente, { schema });

await db
  .insert(schema.equipo)
  .values(
    equipoSemilla.map((p) => ({
      slug: p.slug,
      nombre: p.nombre,
      nivel: p.nivel,
      orden: p.orden,
      areas: p.areas,
      foto: p.foto,
      email: p.email,
      cedula: p.cedula,
      cargoEs: p.es.cargo,
      cargoEn: p.en.cargo,
      bioEs: p.es.bio.join("\n\n"),
      bioEn: p.en.bio.join("\n\n"),
      formacionEs: p.es.formacion.join("\n"),
      formacionEn: p.en.formacion.join("\n"),
      idiomasEs: p.es.idiomas.join(", "),
      idiomasEn: p.en.idiomas.join(", "),
    })),
  )
  .onConflictDoNothing({ target: schema.equipo.slug });

await db
  .insert(schema.publicaciones)
  .values(publicacionesSemilla.map((p) => ({ ...p, estado: "publicado" })))
  .onConflictDoNothing();

const [{ total }] = await db.select({ total: sql<number>`count(*)::int` }).from(schema.testimonios);
if (total === 0) {
  await db.insert(schema.testimonios).values(
    testimoniosSemilla.map((t, i) => ({
      iniciales: t.iniciales,
      citaEs: t.es.cita,
      citaEn: t.en.cita,
      autorEs: t.es.autor,
      autorEn: t.en.autor,
      detalleEs: t.es.detalle,
      detalleEn: t.en.detalle,
      autorizado: false,
      visible: true,
      orden: i + 1,
    })),
  );
}

await db.insert(schema.ajustes).values({ clave: "general", valor: ajustesPorDefecto }).onConflictDoNothing();

console.log("Semilla cargada.");
await cliente.end();
