import { redirect } from "next/navigation";
import { rolActual } from "@/lib/auth";
import { Isotipo } from "@/components/marca";
import { FormularioLogin } from "./Formulario";

export default async function Login() {
  if (await rolActual()) redirect("/admin");
  const configurado = Boolean(process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD);
  return (
    <main className="flex min-h-dvh items-center justify-center p-6">
      <div className="w-full max-w-sm border border-linea bg-crema-claro p-8">
        <Isotipo className="h-12 w-auto" />
        <h1 className="mt-6 text-2xl">Panel de administración</h1>
        <p className="mt-1 text-[14px] text-piedra">Arriaga &amp; Abogados</p>
        <div className="mt-8">
          {configurado ? (
            <FormularioLogin />
          ) : (
            <p role="alert" className="text-[14px] text-error">
              Falta configurar ADMIN_USERNAME y ADMIN_PASSWORD en las variables de entorno.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
