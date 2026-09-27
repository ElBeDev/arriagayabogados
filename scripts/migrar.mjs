// Aplica las migraciones de drizzle/ antes del build en Vercel (script "vercel-build").
// Sin DATABASE_URL no hace nada: el sitio se construye con el contenido semilla.
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";

const url = process.env.DATABASE_URL;
if (!url) {
  console.log("Sin DATABASE_URL: se omiten las migraciones.");
  process.exit(0);
}
const cliente = postgres(url, { max: 1, onnotice: () => {} });
await migrate(drizzle(cliente), { migrationsFolder: "drizzle" });
await cliente.end();
console.log("Migraciones aplicadas.");
