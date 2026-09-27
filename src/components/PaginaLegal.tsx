import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { HeroInterior, Prosa } from "./secciones";

export async function PaginaLegal({ titulo, actualizacion, children }: { titulo: string; actualizacion: string; children: ReactNode }) {
  const t = await getTranslations("legal");
  return (
    <>
      <HeroInterior
        migas={[{ label: titulo }]}
        eyebrow={t("eyebrow")}
        titulo={titulo}
        texto={t("actualizacion", { fecha: actualizacion })}
      />
      <section className="contenedor pb-18 lg:pb-30">
        <div className="border-t border-linea pt-12">
          <Prosa>{children}</Prosa>
        </div>
      </section>
    </>
  );
}
