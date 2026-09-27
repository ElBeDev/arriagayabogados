import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const url = process.env.DATABASE_URL;

// Sin DATABASE_URL el sitio funciona con el contenido semilla de src/content y el
// panel /admin avisa que falta la base de datos. Quien llame debe manejar `null`.
const globalParaDb = globalThis as unknown as { sqlArriaga?: ReturnType<typeof postgres> };

const sql = url ? (globalParaDb.sqlArriaga ??= postgres(url, { prepare: false, max: 5 })) : null;

export const db = sql ? drizzle(sql, { schema }) : null;
