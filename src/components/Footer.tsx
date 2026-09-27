import { getTranslations } from "next-intl/server";
import {
  EnvelopeSimple,
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  MapPin,
  Phone,
} from "@phosphor-icons/react/dist/ssr";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { firma } from "@/content/firma";
import { getAjustes, getAreas } from "@/lib/contenido";
import { LogoHorizontal, Logotipo } from "./marca";
import { BotonPreferenciasCookies } from "./AvisoCookies";

function Columna({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-[15px] font-medium">{titulo}</h2>
      <div className="mt-4 text-[14px] text-crema-suave">{children}</div>
    </div>
  );
}

export async function Footer({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "footer" });
  const tn = await getTranslations({ locale, namespace: "nav" });
  const ajustes = await getAjustes();
  const areas = getAreas(locale);

  const navegacion = [
    { href: "/", label: tn("inicio") },
    { href: "/la-firma", label: tn("firma") },
    { href: "/areas", label: tn("areas") },
    { href: "/equipo", label: tn("equipo") },
    { href: "/publicaciones", label: tn("publicaciones") },
    { href: "/contacto", label: tn("contacto") },
    { href: "/carreras", label: tn("carreras") },
  ];
  const redes = [
    { href: firma.redes.linkedin, label: "LinkedIn", Icono: LinkedinLogo },
    { href: firma.redes.instagram, label: "Instagram", Icono: InstagramLogo },
    { href: firma.redes.facebook, label: "Facebook", Icono: FacebookLogo },
  ];

  return (
    <footer className="sobre-oscuro overflow-hidden bg-nogal pb-20 text-crema lg:pb-0">
      <div className="contenedor pt-16 lg:pt-24">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" aria-label={tn("inicioAria")} className="inline-flex h-11">
              <LogoHorizontal tono="oscuro" className="h-full" />
            </Link>
            <p className="mt-4 max-w-[34ch] text-[14px] leading-relaxed text-crema-suave">{t("descripcion")}</p>
          </div>

          <div className="lg:col-span-2">
            <Columna titulo={t("enlaces")}>
              <ul className="space-y-2">
                {navegacion.map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} className="hover:text-crema">
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Columna>
          </div>

          <div className="lg:col-span-3">
            <Columna titulo={t("areas")}>
              <ul className="space-y-2">
                {areas.map((a) => (
                  <li key={a.slug}>
                    <Link href={`/areas/${a.slug}`} className="hover:text-crema">
                      {a.nombre}
                    </Link>
                  </li>
                ))}
              </ul>
            </Columna>
          </div>

          <div className="lg:col-span-3">
            <Columna titulo={t("contacto")}>
              <ul className="space-y-3">
                <li>
                  <a href={`tel:${ajustes.telefonoHref}`} className="flex items-start gap-2 hover:text-crema">
                    <Phone aria-hidden size={16} className="mt-0.5 shrink-0" /> {ajustes.telefono}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${ajustes.email}`} className="flex items-start gap-2 break-all hover:text-crema">
                    <EnvelopeSimple aria-hidden size={16} className="mt-0.5 shrink-0" /> {ajustes.email}
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin aria-hidden size={16} className="mt-0.5 shrink-0" />
                  <span>
                    {ajustes.calle}, {ajustes.colonia}, {ajustes.ciudad}, Jal.
                  </span>
                </li>
              </ul>
            </Columna>
            <h2 className="mt-8 text-[15px] font-medium">{t("redes")}</h2>
            <ul className="mt-3 flex gap-2">
              {redes.map(({ href, label, Icono }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex size-9 items-center justify-center rounded-full border border-crema/30 transition-colors hover:border-crema hover:bg-crema hover:text-nogal"
                  >
                    <Icono aria-hidden size={16} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Logotipo gigante en trazos: ocupa exactamente el ancho del contenedor. */}
        <div aria-hidden className="mt-16 pb-4 select-none lg:mt-20 lg:pb-6">
          <Logotipo tono="oscuro" texto="#8D8269" amp="#D4B98A" className="block h-auto w-full" />
        </div>

        <div className="flex flex-col gap-3 border-t border-crema/15 py-6 text-[13px] text-crema-suave md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li>
              <Link href="/aviso-de-privacidad" className="hover:text-crema">
                {t("privacidad")}
              </Link>
            </li>
            <li>
              <Link href="/terminos" className="hover:text-crema">
                {t("terminos")}
              </Link>
            </li>
            <li>
              <Link href="/aviso-legal" className="hover:text-crema">
                {t("avisoLegal")}
              </Link>
            </li>
            <li>
              <BotonPreferenciasCookies etiqueta={t("cookies")} />
            </li>
          </ul>
          <p>
            © {new Date().getFullYear()} {firma.razonSocial}
          </p>
        </div>
      </div>
    </footer>
  );
}
