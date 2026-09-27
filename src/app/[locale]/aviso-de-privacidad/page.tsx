import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { direccionCompleta, firma } from "@/content/firma";
import { getAjustes } from "@/lib/contenido";
import { alternates } from "@/lib/seo";
import { PaginaLegal } from "@/components/PaginaLegal";

export async function generateMetadata(props: PageProps<"/[locale]/aviso-de-privacidad">): Promise<Metadata> {
  const locale = (await props.params).locale as Locale;
  const t = await getTranslations({ locale, namespace: "legal" });
  return { title: t("privacidad"), alternates: alternates("/aviso-de-privacidad", locale) };
}

export default async function AvisoPrivacidad(props: PageProps<"/[locale]/aviso-de-privacidad">) {
  const locale = (await props.params).locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations("legal");
  const a = await getAjustes();
  const dir = direccionCompleta(a);

  if (locale === "en") {
    return (
      <PaginaLegal titulo={t("privacidad")} actualizacion="September 27, 2026">
        <h2>Data controller</h2>
        <p>
          {firma.razonSocial}, with offices at {dir}, is responsible for processing your personal data under Mexico&apos;s
          Federal Law on the Protection of Personal Data Held by Private Parties.
        </p>
        <h2>Data we collect</h2>
        <p>
          Name, email, phone number, company (if applicable), area of interest and the general description of the matter
          you share through our forms, WhatsApp or email.
        </p>
        <h2>Purposes</h2>
        <p>Primary purposes, needed to handle your request:</p>
        <ul>
          <li>Contacting you to follow up on your consultation request.</li>
          <li>Scheduling and confirming appointments.</li>
          <li>Assessing whether we can take your matter and preparing a service proposal.</li>
        </ul>
        <p>Secondary purposes (you may object by writing to us):</p>
        <ul>
          <li>Sending you insights and legal updates.</li>
          <li>Producing internal statistics about how the site is used.</li>
        </ul>
        <h2>Transfers</h2>
        <p>
          We do not transfer your data to third parties without your consent, except as provided by law. We use technology
          providers (hosting, email) that process data on our behalf.
        </p>
        <h2>ARCO rights</h2>
        <p>
          You may access, rectify, cancel or object to the processing of your data, and revoke your consent, by writing to{" "}
          {a.email} with your name, a contact method, an ID and a description of your request.
        </p>
        <h2>Cookies</h2>
        <p>
          This site uses analytics cookies only if you accept them in the cookie notice. You can change your choice at any
          time from the link in the footer.
        </p>
        <h2>Retention</h2>
        <p>Data from prospective clients who do not become clients is deleted after 12 months.</p>
        <h2>Changes to this notice</h2>
        <p>Any change to this Privacy Notice will be published on this page.</p>
      </PaginaLegal>
    );
  }

  return (
    <PaginaLegal titulo={t("privacidad")} actualizacion="27 de septiembre de 2026">
      <h2>Responsable</h2>
      <p>
        {firma.razonSocial}, con domicilio en {dir}, es responsable del tratamiento de tus datos personales conforme a la
        Ley Federal de Protección de Datos Personales en Posesión de los Particulares.
      </p>
      <h2>Datos que recabamos</h2>
      <p>
        Nombre, correo electrónico, teléfono, empresa (en su caso), área de interés y la descripción general del asunto que
        nos compartes a través de nuestros formularios, WhatsApp o correo.
      </p>
      <h2>Finalidades</h2>
      <p>Finalidades primarias, necesarias para atender tu solicitud:</p>
      <ul>
        <li>Contactarte para dar seguimiento a tu solicitud de consulta.</li>
        <li>Agendar y confirmar citas.</li>
        <li>Evaluar si podemos atender tu asunto y preparar una propuesta de servicios.</li>
      </ul>
      <p>Finalidades secundarias (puedes negarte a ellas escribiéndonos):</p>
      <ul>
        <li>Enviarte publicaciones y novedades legales.</li>
        <li>Elaborar estadísticas internas sobre el uso del sitio.</li>
      </ul>
      <h2>Transferencias</h2>
      <p>
        No transferimos tus datos a terceros sin tu consentimiento, salvo en los casos previstos por la ley. Utilizamos
        proveedores de servicios tecnológicos (alojamiento, correo) que tratan los datos por cuenta nuestra.
      </p>
      <h2>Derechos ARCO</h2>
      <p>
        Puedes acceder, rectificar, cancelar u oponerte al tratamiento de tus datos, así como revocar tu consentimiento,
        enviando una solicitud a {a.email} con tu nombre, un medio de contacto, una identificación y la descripción de lo
        que solicitas.
      </p>
      <h2>Cookies</h2>
      <p>
        Este sitio usa cookies de analítica solo si las aceptas en el aviso de cookies. Puedes cambiar tu elección en
        cualquier momento desde el enlace del pie de página.
      </p>
      <h2>Conservación</h2>
      <p>Los datos de prospectos que no se convierten en clientes se eliminan a los 12 meses.</p>
      <h2>Cambios a este aviso</h2>
      <p>Cualquier cambio a este Aviso de Privacidad se publicará en esta página.</p>
    </PaginaLegal>
  );
}
