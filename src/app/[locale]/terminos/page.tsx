import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { firma } from "@/content/firma";
import { alternates } from "@/lib/seo";
import { PaginaLegal } from "@/components/PaginaLegal";

export async function generateMetadata(props: PageProps<"/[locale]/terminos">): Promise<Metadata> {
  const locale = (await props.params).locale as Locale;
  const t = await getTranslations({ locale, namespace: "legal" });
  return { title: t("terminos"), alternates: alternates("/terminos", locale) };
}

export default async function Terminos(props: PageProps<"/[locale]/terminos">) {
  const locale = (await props.params).locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations("legal");

  if (locale === "en") {
    return (
      <PaginaLegal titulo={t("terminos")} actualizacion="September 27, 2026">
        <h2>Use of the site</h2>
        <p>
          By using this site you accept these terms. The site belongs to {firma.razonSocial} and is intended to inform about
          the firm&apos;s services.
        </p>
        <h2>Intellectual property</h2>
        <p>
          The texts, logos, images and design of this site are protected. They may not be reproduced without written
          permission, except for brief quotations that cite the source.
        </p>
        <h2>External links</h2>
        <p>We are not responsible for the content of third-party sites linked from this page.</p>
        <h2>Governing law</h2>
        <p>
          These terms are governed by the laws of the United Mexican States. Any dispute will be submitted to the competent
          courts of Guadalajara, Jalisco.
        </p>
      </PaginaLegal>
    );
  }

  return (
    <PaginaLegal titulo={t("terminos")} actualizacion="27 de septiembre de 2026">
      <h2>Uso del sitio</h2>
      <p>
        Al utilizar este sitio aceptas estos términos. El sitio es propiedad de {firma.razonSocial} y tiene fines
        informativos sobre los servicios de la firma.
      </p>
      <h2>Propiedad intelectual</h2>
      <p>
        Los textos, logotipos, imágenes y diseño de este sitio están protegidos. No pueden reproducirse sin autorización por
        escrito, salvo citas breves con mención de la fuente.
      </p>
      <h2>Enlaces externos</h2>
      <p>No somos responsables del contenido de sitios de terceros enlazados desde esta página.</p>
      <h2>Legislación aplicable</h2>
      <p>
        Estos términos se rigen por las leyes de los Estados Unidos Mexicanos. Cualquier controversia se someterá a los
        tribunales competentes de Guadalajara, Jalisco.
      </p>
    </PaginaLegal>
  );
}
