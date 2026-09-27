"use client";

import Script from "next/script";
import { useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { clasesBoton } from "./ui";

// Consentimiento de cookies de analítica. GA4 solo se carga si el usuario acepta.
// La elección se guarda en el navegador de cada visitante (es una preferencia personal).

type Eleccion = "aceptado" | "rechazado" | null;
const CLAVE = "arriaga-consentimiento";
const EVENTO = "arriaga:preferencias-cookies";

function leer(): Eleccion {
  try {
    const v = localStorage.getItem(CLAVE);
    return v === "aceptado" || v === "rechazado" ? v : null;
  } catch {
    return null;
  }
}

function suscribir(cb: () => void) {
  window.addEventListener("storage", cb);
  window.addEventListener(EVENTO, cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener(EVENTO, cb);
  };
}

function guardar(v: Eleccion) {
  try {
    if (v) localStorage.setItem(CLAVE, v);
    else localStorage.removeItem(CLAVE);
  } catch {
    // Almacenamiento bloqueado: la elección vale solo para esta visita.
  }
  window.dispatchEvent(new Event(EVENTO));
}

/** Botón del footer para volver a mostrar el aviso. */
export function BotonPreferenciasCookies({ etiqueta }: { etiqueta: string }) {
  if (!process.env.NEXT_PUBLIC_GA_ID) return null;
  return (
    <button type="button" onClick={() => guardar(null)} className="hover:text-crema">
      {etiqueta}
    </button>
  );
}

export function AvisoCookies({ gaId }: { gaId?: string }) {
  const t = useTranslations("cookies");
  // En el servidor se asume "rechazado": el aviso aparece solo tras hidratar, sin parpadeo.
  const eleccion = useSyncExternalStore(suscribir, leer, () => "rechazado" as Eleccion);

  if (!gaId) return null;

  return (
    <>
      {eleccion === "aceptado" && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'granted'});
gtag('js',new Date());gtag('config','${gaId}',{anonymize_ip:true});`}
          </Script>
        </>
      )}
      {eleccion === null && (
        <div
          role="region"
          aria-label="Cookies"
          className="fixed inset-x-3 bottom-20 z-50 border border-linea bg-crema-claro p-5 shadow-[0_12px_40px_rgb(65_47_12/0.18)] md:inset-x-auto md:right-6 md:bottom-6 md:max-w-[420px] lg:bottom-6"
        >
          <p className="text-[14px] leading-relaxed text-tinta">
            {t("texto")}{" "}
            <Link href="/aviso-de-privacidad" className="underline underline-offset-2">
              {t("mas")}
            </Link>
          </p>
          <div className="mt-4 flex gap-2">
            <button type="button" onClick={() => guardar("aceptado")} className={clasesBoton("oscuro")}>
              {t("aceptar")}
            </button>
            <button
              type="button"
              onClick={() => guardar("rechazado")}
              className="border border-linea px-[18px] py-[11px] text-sm font-medium transition-colors hover:border-nogal active:scale-[0.98]"
            >
              {t("rechazar")}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
