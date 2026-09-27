import { eq } from "drizzle-orm";
import { db } from "@/db";
import { ajustes as tablaAjustes } from "@/db/schema";
import { ajustesPorDefecto, type Ajustes } from "@/content/firma";
import { FormularioAdmin } from "../../FormularioAdmin";
import { Campo, SinBaseDeDatos, Titulo, claseInput } from "../../ui";
import { guardarAjustes } from "../acciones";

export default async function Configuracion() {
  if (!db) return <SinBaseDeDatos />;
  const [fila] = await db.select().from(tablaAjustes).where(eq(tablaAjustes.clave, "general"));
  const a: Ajustes = { ...ajustesPorDefecto, ...((fila?.valor as Partial<Ajustes>) ?? {}) };

  return (
    <>
      <Titulo>Configuración</Titulo>
      <FormularioAdmin accion={guardarAjustes} className="max-w-4xl">
        <h2 className="text-lg">Contacto</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <Campo etiqueta="Teléfono (como se muestra)" ayuda="Ej.: (33) 3615 2040">
            <input name="telefono" defaultValue={a.telefono} required className={claseInput} />
          </Campo>
          <Campo etiqueta="Teléfono para marcar" ayuda="Con + y lada de país: +523336152040">
            <input name="telefonoHref" defaultValue={a.telefonoHref} required className={claseInput} />
          </Campo>
          <Campo etiqueta="WhatsApp" ayuda="Solo números con lada de país: 523336152040">
            <input name="whatsapp" defaultValue={a.whatsapp} required className={claseInput} />
          </Campo>
          <Campo etiqueta="Correo de contacto">
            <input name="email" type="email" defaultValue={a.email} required className={claseInput} />
          </Campo>
        </div>

        <h2 className="pt-4 text-lg">Dirección</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <Campo etiqueta="Calle, número y piso">
            <input name="calle" defaultValue={a.calle} required className={claseInput} />
          </Campo>
          <Campo etiqueta="Colonia">
            <input name="colonia" defaultValue={a.colonia} required className={claseInput} />
          </Campo>
          <Campo etiqueta="C.P.">
            <input name="cp" defaultValue={a.cp} required className={claseInput} />
          </Campo>
          <Campo etiqueta="Ciudad">
            <input name="ciudad" defaultValue={a.ciudad} required className={claseInput} />
          </Campo>
          <Campo etiqueta="Estado">
            <input name="estado" defaultValue={a.estado} required className={claseInput} />
          </Campo>
        </div>

        <h2 className="pt-4 text-lg">Horario</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <Campo etiqueta="Horario (español)" ayuda="Una línea por renglón.">
            <textarea name="horarioEs" defaultValue={a.horarioEs.join("\n")} rows={3} className={claseInput} />
          </Campo>
          <Campo etiqueta="Horario (inglés)">
            <textarea name="horarioEn" defaultValue={a.horarioEn.join("\n")} rows={3} className={claseInput} />
          </Campo>
        </div>

        <h2 className="pt-4 text-lg">Cifras de la página de inicio</h2>
        <p className="text-[13px] text-piedra">Solo cifras reales y comprobables. No publiques porcentajes de casos ganados.</p>
        <div className="space-y-4">
          {a.cifras.map((c, i) => (
            <div key={i} className="grid gap-3 border-l border-linea pl-4 sm:grid-cols-[110px_80px_1fr_1fr]">
              <Campo etiqueta="Valor">
                <input name={`cifra${i}valor`} type="number" min={0} defaultValue={c.valor} className={claseInput} />
              </Campo>
              <Campo etiqueta="Sufijo">
                <input name={`cifra${i}sufijo`} defaultValue={c.sufijo} maxLength={3} className={claseInput} />
              </Campo>
              <Campo etiqueta="Etiqueta (español)">
                <input name={`cifra${i}es`} defaultValue={c.es} className={claseInput} />
              </Campo>
              <Campo etiqueta="Etiqueta (inglés)">
                <input name={`cifra${i}en`} defaultValue={c.en} className={claseInput} />
              </Campo>
            </div>
          ))}
        </div>
      </FormularioAdmin>
    </>
  );
}
