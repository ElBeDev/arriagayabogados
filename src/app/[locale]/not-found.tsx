import { getTranslations } from "next-intl/server";
import { Boton, Eyebrow } from "@/components/ui";

export default async function NoEncontrado() {
  const t = await getTranslations("noEncontrado");
  return (
    <section className="contenedor flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <Eyebrow>{t("eyebrow")}</Eyebrow>
      <h1 className="mt-4 text-[38px] leading-[1.05] font-bold uppercase md:text-[64px]">{t("titulo")}</h1>
      <p className="mt-5 max-w-[46ch] text-piedra">{t("texto")}</p>
      <div className="mt-8">
        <Boton href="/">{t("volver")}</Boton>
      </div>
    </section>
  );
}
