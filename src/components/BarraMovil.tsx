import { getTranslations } from "next-intl/server";
import { Phone, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import type { Locale } from "@/i18n/routing";
import { whatsappHref } from "@/content/firma";
import { getAjustes } from "@/lib/contenido";

/** Barra fija inferior en móvil: llamar y WhatsApp. */
export async function BarraMovil({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "movil" });
  const ajustes = await getAjustes();
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-nogal/20 bg-crema/95 backdrop-blur-md lg:hidden">
      <a href={`tel:${ajustes.telefonoHref}`} className="flex items-center justify-center gap-2 py-4 text-sm font-medium">
        <Phone aria-hidden size={18} /> {t("llamar")}
      </a>
      <a
        href={whatsappHref(ajustes.whatsapp, t("mensajeWhatsapp"))}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 bg-nogal py-4 text-sm font-medium text-crema"
      >
        <WhatsappLogo aria-hidden size={18} /> {t("whatsapp")}
      </a>
    </div>
  );
}
