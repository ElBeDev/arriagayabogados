import Link from "next/link";
import { redirect } from "next/navigation";
import { rolActual } from "@/lib/auth";
import { Isotipo } from "@/components/marca";
import { salir } from "./acciones";

const enlaces = [
  { href: "/admin", label: "Resumen", rol: "admin" },
  { href: "/admin/prospectos", label: "Prospectos", rol: "admin" },
  { href: "/admin/publicaciones", label: "Publicaciones", rol: "editor" },
  { href: "/admin/testimonios", label: "Testimonios", rol: "admin" },
  { href: "/admin/equipo", label: "Equipo", rol: "admin" },
  { href: "/admin/configuracion", label: "Configuración", rol: "admin" },
] as const;

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const rol = await rolActual();
  if (!rol) redirect("/admin/login");
  const visibles = enlaces.filter((e) => rol === "admin" || e.rol === "editor");

  return (
    <div className="lg:grid lg:min-h-dvh lg:grid-cols-[240px_1fr]">
      <aside className="sobre-oscuro bg-nogal text-crema lg:sticky lg:top-0 lg:h-dvh">
        <div className="flex items-center justify-between gap-4 p-5 lg:block lg:p-8">
          <Link href="/admin" className="flex items-center gap-3">
            <Isotipo tono="oscuro" className="h-9 w-auto" />
            <span className="text-[15px] font-medium">Panel</span>
          </Link>
          <p className="text-[12px] text-crema-suave lg:mt-2">{rol === "admin" ? "Administrador" : "Editor"}</p>
        </div>
        <nav aria-label="Panel" className="overflow-x-auto px-5 pb-4 lg:px-8">
          <ul className="flex gap-5 text-[14px] whitespace-nowrap lg:block lg:space-y-3">
            {visibles.map((e) => (
              <li key={e.href}>
                <Link href={e.href} className="text-crema-suave hover:text-crema">
                  {e.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="hidden space-y-3 px-8 pt-6 text-[14px] lg:block">
          <a href="/" target="_blank" className="block text-crema-suave hover:text-crema">
            Ver sitio ↗
          </a>
          <form action={salir}>
            <button type="submit" className="text-crema-suave hover:text-crema">
              Cerrar sesión
            </button>
          </form>
        </div>
      </aside>
      <main className="min-w-0 p-5 md:p-10">{children}</main>
    </div>
  );
}
