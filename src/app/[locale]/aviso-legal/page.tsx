import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { alternates } from "@/lib/seo";
import { PaginaLegal } from "@/components/PaginaLegal";

export async function generateMetadata(props: PageProps<"/[locale]/aviso-legal">): Promise<Metadata> {
  const locale = (await props.params).locale as Locale;
  const t = await getTranslations({ locale, namespace: "legal" });
  return { title: t("avisoLegal"), alternates: alternates("/aviso-legal", locale) };
}

export default async function AvisoLegal(props: PageProps<"/[locale]/aviso-legal">) {
  const locale = (await props.params).locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations("legal");

  if (locale === "en") {
    return (
      <PaginaLegal titulo={t("avisoLegal")} actualizacion="September 27, 2026">
        <p>
          The information on this site is general and informative and is not legal advice. Every matter requires its own
          analysis of the facts and documents.
        </p>
        <p>
          Sending a form, an email or a WhatsApp message does not create an attorney-client relationship. That relationship
          is only established when the firm expressly accepts the matter and a service proposal is signed.
        </p>
        <p>Results obtained in past matters do not guarantee similar results in future matters.</p>
      </PaginaLegal>
    );
  }

  return (
    <PaginaLegal titulo={t("avisoLegal")} actualizacion="27 de septiembre de 2026">
      <p>
        La información publicada en este sitio es de carácter general e informativo y no constituye asesoría legal. Cada
        asunto requiere un análisis particular de sus hechos y documentos.
      </p>
      <p>
        El envío de un formulario, un correo o un mensaje de WhatsApp no crea una relación abogado-cliente. Esa relación solo
        se establece mediante la aceptación expresa de la firma y la firma de una propuesta de servicios.
      </p>
      <p>Los resultados obtenidos en asuntos anteriores no garantizan resultados similares en asuntos futuros.</p>
    </PaginaLegal>
  );
}
