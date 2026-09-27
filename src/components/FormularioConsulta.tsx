"use client";

import Script from "next/script";
import { useActionState, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { CalendarBlank, CaretDown, CheckCircle, WhatsappLogo } from "@phosphor-icons/react";
import { Link } from "@/i18n/navigation";
import { enviarConsulta, type EstadoFormulario } from "@/lib/acciones";
import { whatsappHref } from "@/content/firma";
import { FlechaBoton, clasesBoton } from "./ui";

const inicial: EstadoFormulario = { ok: false };
const CAMPOS_UTM = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

const claseInput =
  "peer w-full border-0 border-b border-linea bg-transparent px-0 pt-1 pb-3 text-base text-tinta outline-none transition-colors placeholder:text-piedra focus:border-b-2 focus:border-nogal focus-visible:outline-none aria-[invalid=true]:border-error";

function Campo({
  id,
  etiqueta,
  error,
  children,
  className = "",
}: {
  id: string;
  etiqueta: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-[13px] text-piedra">
        {etiqueta}
      </label>
      <div className="relative mt-2">{children}</div>
      {error && (
        <p id={`${id}-error`} className="mt-2 text-[13px] text-error">
          {error}
        </p>
      )}
    </div>
  );
}

export function FormularioConsulta({
  areas,
  areaInicial = "",
  locale,
  whatsapp,
  mensajeWhatsapp,
  turnstileSiteKey,
}: {
  areas: { slug: string; nombre: string }[];
  areaInicial?: string;
  locale: string;
  whatsapp: string;
  mensajeWhatsapp: string;
  turnstileSiteKey?: string;
}) {
  const t = useTranslations("form");
  const [estado, accion, enviando] = useActionState(enviarConsulta, inicial);
  const [tipo, setTipo] = useState<"persona" | "empresa">("persona");
  const formulario = useRef<HTMLFormElement>(null);
  const v = estado.valores ?? {};
  const hoy = new Date().toISOString().slice(0, 10);

  // Conserva los UTM de la visita para saber de dónde llegan los prospectos.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    for (const k of CAMPOS_UTM) {
      const input = formulario.current?.elements.namedItem(k) as HTMLInputElement | null;
      if (input && params.get(k)) input.value = params.get(k)!;
    }
  }, [estado]);

  type Clave = keyof NonNullable<EstadoFormulario["errores"]>;
  const error = (campo: Clave) => (estado.errores?.[campo] ? t(`errores.${campo}`) : undefined);
  const aria = (campo: Clave) => ({
    "aria-invalid": estado.errores?.[campo] ? true : undefined,
    "aria-describedby": estado.errores?.[campo] ? `${campo}-error` : undefined,
  });

  if (estado.ok) {
    return (
      <div role="status" className="border border-linea bg-crema-claro p-8">
        <CheckCircle aria-hidden size={36} weight="light" className="text-laton" />
        <p className="mt-4 text-2xl">{t("exitoTitulo")}</p>
        <p className="mt-2 text-piedra">{t("exitoTexto")}</p>
      </div>
    );
  }

  return (
    <form ref={formulario} action={accion} noValidate className="relative grid gap-x-8 gap-y-7 sm:grid-cols-2">
      <input type="hidden" name="locale" value={locale} />
      {CAMPOS_UTM.map((k) => (
        <input key={k} type="hidden" name={k} defaultValue={v[k]} />
      ))}

      <Campo id="nombre" etiqueta={t("nombre")} error={error("nombre")}>
        <input id="nombre" name="nombre" autoComplete="given-name" defaultValue={v.nombre} className={claseInput} {...aria("nombre")} />
      </Campo>
      <Campo id="apellido" etiqueta={t("apellido")} error={error("apellido")}>
        <input id="apellido" name="apellido" autoComplete="family-name" defaultValue={v.apellido} className={claseInput} {...aria("apellido")} />
      </Campo>
      <Campo id="email" etiqueta={t("email")} error={error("email")}>
        <input id="email" name="email" type="email" autoComplete="email" defaultValue={v.email} className={claseInput} {...aria("email")} />
      </Campo>
      <Campo id="telefono" etiqueta={t("telefono")} error={error("telefono")}>
        <input id="telefono" name="telefono" type="tel" autoComplete="tel" defaultValue={v.telefono} className={claseInput} {...aria("telefono")} />
      </Campo>

      <fieldset className="sm:col-span-2">
        <legend className="text-[13px] text-piedra">{t("soy")}</legend>
        <div className="mt-3 flex gap-6">
          {(["persona", "empresa"] as const).map((opcion) => (
            <label key={opcion} className="flex cursor-pointer items-center gap-2 text-[15px]">
              <input
                type="radio"
                name="tipo"
                value={opcion}
                checked={tipo === opcion}
                onChange={() => setTipo(opcion)}
                className="size-4 accent-nogal"
              />
              {t(opcion)}
            </label>
          ))}
        </div>
      </fieldset>

      {tipo === "empresa" && (
        <Campo id="empresa" etiqueta={t("nombreEmpresa")} className="sm:col-span-2">
          <input id="empresa" name="empresa" autoComplete="organization" defaultValue={v.empresa} className={claseInput} />
        </Campo>
      )}

      <Campo id="area" etiqueta={t("area")} error={error("area")}>
        <select
          id="area"
          name="area"
          defaultValue={v.area ?? areaInicial}
          className={`${claseInput} appearance-none pr-8`}
          {...aria("area")}
        >
          <option value="" disabled>
            {t("seleccionaArea")}
          </option>
          {areas.map((a) => (
            <option key={a.slug} value={a.slug}>
              {a.nombre}
            </option>
          ))}
          <option value="no-estoy-seguro">{t("noSeguro")}</option>
        </select>
        <CaretDown aria-hidden size={14} className="pointer-events-none absolute top-2 right-0 text-piedra" />
      </Campo>
      <Campo id="fecha" etiqueta={t("fecha")}>
        <input
          id="fecha"
          name="fecha"
          type="date"
          min={hoy}
          defaultValue={v.fecha}
          className={`${claseInput} [&::-webkit-calendar-picker-indicator]:opacity-0`}
        />
        <CalendarBlank aria-hidden size={16} className="pointer-events-none absolute top-1.5 right-0 text-piedra" />
      </Campo>

      <fieldset className="sm:col-span-2">
        <legend className="text-[13px] text-piedra">{t("urgencia")}</legend>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-6">
          {(
            [
              ["plazo", t("urgPlazo")],
              ["semanas", t("urgSemanas")],
              ["informacion", t("urgInfo")],
            ] as const
          ).map(([valor, texto]) => (
            <label key={valor} className="flex cursor-pointer items-center gap-2 text-[15px]">
              <input
                type="radio"
                name="urgencia"
                value={valor}
                defaultChecked={(v.urgencia ?? "semanas") === valor}
                className="size-4 accent-nogal"
              />
              {texto}
            </label>
          ))}
        </div>
      </fieldset>

      <Campo id="mensaje" etiqueta={t("mensaje")} error={error("mensaje")} className="sm:col-span-2">
        <textarea
          id="mensaje"
          name="mensaje"
          rows={4}
          defaultValue={v.mensaje}
          placeholder={t("mensajePlaceholder")}
          className={`${claseInput} resize-none`}
          {...aria("mensaje")}
        />
      </Campo>

      {/* Honeypot anti-spam */}
      <div aria-hidden className="absolute -left-[9999px]">
        <label>
          {t("sitioWeb")}
          <input name="sitio" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="sm:col-span-2">
        <label className="flex cursor-pointer items-start gap-3 text-[14px] leading-snug text-piedra">
          <input
            type="checkbox"
            name="privacidad"
            defaultChecked={v.privacidad === "on"}
            className="mt-0.5 size-4 shrink-0 accent-nogal"
            {...aria("privacidad")}
          />
          <span>
            {t("privacidadAntes")}{" "}
            <Link href="/aviso-de-privacidad" className="text-tinta underline underline-offset-2">
              {t("privacidadLink")}
            </Link>
            {t("privacidadDespues")}
          </span>
        </label>
        {error("privacidad") && (
          <p id="privacidad-error" className="mt-2 text-[13px] text-error">
            {error("privacidad")}
          </p>
        )}
      </div>

      {turnstileSiteKey && (
        <div className="sm:col-span-2">
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
          <div className="cf-turnstile" data-sitekey={turnstileSiteKey} data-language={locale} />
        </div>
      )}

      {estado.error && (
        <p role="alert" className="border-l-2 border-error pl-3 text-[14px] text-error sm:col-span-2">
          {t(`errores.${estado.error}`)}
        </p>
      )}

      <div className="flex flex-col items-start gap-5 sm:col-span-2 sm:flex-row sm:items-center">
        <button type="submit" disabled={enviando} className={clasesBoton("oscuro", "disabled:opacity-60")}>
          {enviando ? t("enviando") : t("enviar")}
          <FlechaBoton />
        </button>
        <a
          href={whatsappHref(whatsapp, mensajeWhatsapp)}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-2 text-[14px] text-piedra underline-offset-4 hover:text-tinta hover:underline lg:inline-flex"
        >
          <WhatsappLogo aria-hidden size={16} /> {t("whatsapp")}
        </a>
      </div>
    </form>
  );
}
