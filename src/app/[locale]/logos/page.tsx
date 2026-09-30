import type { Metadata } from "next";
import Image from "next/image";
import { statSync } from "node:fs";
import path from "node:path";
import { setRequestLocale } from "next-intl/server";
import { DownloadSimple } from "@phosphor-icons/react/dist/ssr";
import { HeroInterior } from "@/components/secciones";
import { CopiarColor } from "@/components/CopiarColor";
import { clasesBoton } from "@/components/ui";

// Kit de logos para el equipo. Los archivos se generan con `npm run logos` (public/logos/).

export const metadata: Metadata = {
  title: "Logos",
  description: "Kit de logos de Arriaga & Abogados: todas las versiones en SVG y PNG.",
  robots: { index: false, follow: false },
};

const BASE = "/logos";
const P = "arriaga-abogados";

function peso(ruta: string) {
  try {
    const bytes = statSync(path.join(process.cwd(), "public", ruta)).size;
    return bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
  } catch {
    return "";
  }
}

const piezas = [
  { id: "horizontal", titulo: "Logo horizontal", uso: "El logo completo en una línea. Es el principal: web, correo, documentos y presentaciones.", alto: "h-12" },
  { id: "vertical", titulo: "Logo vertical", uso: "El logo completo apilado. Para portadas, papelería y espacios cuadrados.", alto: "h-28" },
  { id: "isotipo", titulo: "Isotipo A&", uso: "Solo el símbolo. Para espacios reducidos, marcas de agua y redes.", alto: "h-24" },
  { id: "logotipo", titulo: "Logotipo", uso: "Solo las letras \"Arriaga & Abogados\".", alto: "h-9" },
  { id: "sello", titulo: "Sello", uso: "Versión institucional circular. Para documentos, constancias y sellos.", alto: "h-32" },
];

const variantes = [
  { id: "color", nombre: "Color", uso: "Sobre fondos claros", fondo: "bg-crema-claro border border-linea" },
  { id: "fondo-oscuro", nombre: "Fondo oscuro", uso: "Sobre café, negro o fotos oscuras", fondo: "bg-[#412F0C]" },
  { id: "negro", nombre: "Negro", uso: "Una tinta: grabados, sellos, impresión", fondo: "bg-white border border-linea" },
  { id: "blanco", nombre: "Blanco", uso: "Una tinta sobre fotos o colores oscuros", fondo: "bg-[#3A3834]" },
];

const extras = [
  { titulo: "Ícono 1080 px", uso: "Foto de perfil en redes y WhatsApp", archivo: `iconos/${P}-icono-1080.png`, vista: `iconos/${P}-icono-512.png`, ancho: "w-28" },
  { titulo: "Ícono 512 px", uso: "Apps y directorios", archivo: `iconos/${P}-icono-512.png`, vista: `iconos/${P}-icono-512.png`, ancho: "w-20" },
  { titulo: "Ícono 180 px", uso: "Favicon y accesos directos", archivo: `iconos/${P}-icono-180.png`, vista: `iconos/${P}-icono-180.png`, ancho: "w-12" },
  { titulo: "Ícono vectorial", uso: "SVG para cualquier tamaño", archivo: `iconos/${P}-icono.svg`, vista: `iconos/${P}-icono.svg`, ancho: "w-20" },
  { titulo: "Imagen para redes", uso: "1200 × 630, al compartir el sitio", archivo: `redes-y-correo/${P}-portada-1200x630.png`, vista: `redes-y-correo/${P}-portada-1200x630.png`, ancho: "w-full" },
  { titulo: "Firma de correo", uso: "600 px de ancho, fondo crema", archivo: `redes-y-correo/${P}-firma-correo-600.png`, vista: `redes-y-correo/${P}-firma-correo-600.png`, ancho: "w-4/5" },
];

const colores = [
  { nombre: "Café Nogal", hex: "#412F0C", rgb: "65, 47, 12", claro: false },
  { nombre: "Espresso", hex: "#1E1304", rgb: "30, 19, 4", claro: false },
  { nombre: "Latón", hex: "#A3895B", rgb: "163, 137, 91", claro: false },
  { nombre: "Oro Claro", hex: "#D4B98A", rgb: "212, 185, 138", claro: true },
  { nombre: "Crema", hex: "#F8F4EB", rgb: "248, 244, 235", claro: true },
];

function BotonArchivo({ ruta, etiqueta }: { ruta: string; etiqueta: string }) {
  return (
    <a
      href={`${BASE}/${ruta}`}
      download
      className="inline-flex items-center gap-1.5 border border-linea px-3 py-2 text-[13px] font-medium transition-colors hover:border-nogal hover:bg-nogal hover:text-crema"
    >
      <DownloadSimple aria-hidden size={14} />
      {etiqueta}
      <span className="font-normal opacity-60">{peso(`${BASE}/${ruta}`)}</span>
    </a>
  );
}

export default async function Logos(props: PageProps<"/[locale]/logos">) {
  setRequestLocale((await props.params).locale);
  const zip = `${BASE}/${P}-logos.zip`;

  return (
    <>
      <HeroInterior
        migas={[{ label: "Logos" }]}
        eyebrow="Kit de marca"
        titulo="Logos de Arriaga & Abogados"
        texto="Todas las versiones del logo en SVG (vectorial) y PNG (fondo transparente), listas para usar."
        accion={
          <a href={zip} download className={clasesBoton()}>
            <DownloadSimple aria-hidden size={16} weight="bold" />
            Descargar todo · ZIP {peso(zip)}
          </a>
        }
      />

      <div className="contenedor pb-18 lg:pb-30">
        {piezas.map((p) => (
          <section key={p.id} className="border-t border-linea py-12 lg:py-16">
            <h2 className="text-[28px] leading-tight md:text-[34px]">{p.titulo}</h2>
            <p className="mt-2 max-w-[65ch] text-piedra">{p.uso}</p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {variantes.map((v) => {
                const archivo = `${p.id}/${P}-${p.id}-${v.id}`;
                return (
                  <li key={v.id} className="flex flex-col border border-linea">
                    <div className={`flex aspect-[4/3] items-center justify-center p-6 ${v.fondo}`}>
                      <Image
                        src={`${BASE}/${archivo}.svg`}
                        alt={`${p.titulo}, versión ${v.nombre.toLowerCase()}`}
                        width={400}
                        height={200}
                        unoptimized
                        className={`${p.alto} w-auto max-w-full`}
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-4 p-4">
                      <div>
                        <p className="font-medium">{v.nombre}</p>
                        <p className="text-[13px] text-piedra">{v.uso}</p>
                      </div>
                      <div className="mt-auto flex flex-wrap gap-2">
                        <BotonArchivo ruta={`${archivo}.svg`} etiqueta="SVG" />
                        <BotonArchivo ruta={`${archivo}.png`} etiqueta="PNG" />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}

        <section className="border-t border-linea py-12 lg:py-16">
          <h2 className="text-[28px] leading-tight md:text-[34px]">Íconos, redes y correo</h2>
          <p className="mt-2 max-w-[65ch] text-piedra">El símbolo sobre fondo café, la imagen que aparece al compartir el sitio y el logo para la firma de correo.</p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {extras.map((e) => (
              <li key={e.archivo} className="flex flex-col border border-linea">
                <div className="flex aspect-[16/9] items-center justify-center bg-crema-claro p-6">
                  <Image src={`${BASE}/${e.vista}`} alt={e.titulo} width={600} height={340} unoptimized className={`${e.ancho} h-auto max-h-full`} />
                </div>
                <div className="flex flex-1 items-end justify-between gap-4 p-4">
                  <div>
                    <p className="font-medium">{e.titulo}</p>
                    <p className="text-[13px] text-piedra">{e.uso}</p>
                  </div>
                  <BotonArchivo ruta={e.archivo} etiqueta={e.archivo.endsWith(".svg") ? "SVG" : "PNG"} />
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="border-t border-linea py-12 lg:py-16">
          <h2 className="text-[28px] leading-tight md:text-[34px]">Colores</h2>
          <p className="mt-2 max-w-[65ch] text-piedra">Haz clic en un valor para copiarlo.</p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3 xl:grid-cols-5">
            {colores.map((c) => (
              <li key={c.hex} className="border border-linea">
                <div className={`h-28 ${c.claro ? "border-b border-linea" : ""}`} style={{ background: c.hex }} />
                <div className="space-y-1 p-4">
                  <p className="font-medium">{c.nombre}</p>
                  <CopiarColor valor={c.hex} />
                  <br />
                  <CopiarColor valor={`RGB ${c.rgb}`} />
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="border-t border-linea py-12 lg:py-16">
          <h2 className="text-[28px] leading-tight md:text-[34px]">Tipografías</h2>
          <p className="mt-2 max-w-[65ch] text-piedra">Las dos son gratuitas. Instálalas para que Word y PowerPoint se vean igual que el sitio.</p>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            <li className="border border-linea p-6">
              <p className="text-[13px] text-piedra">Textos, títulos y el nombre</p>
              <p className="mt-3 text-[40px] leading-tight font-semibold">DM Sans</p>
              <p className="mt-1 text-lg">Criterio que protege lo que has construido.</p>
              <a
                href="https://fonts.google.com/specimen/DM+Sans"
                target="_blank"
                rel="noopener noreferrer"
                className={clasesBoton("oscuro", "mt-6")}
              >
                <DownloadSimple aria-hidden size={16} weight="bold" />
                Descargar en Google Fonts
              </a>
            </li>
            <li className="border border-linea p-6">
              <p className="text-[13px] text-piedra">Solo el &amp; del logo</p>
              <p className="mt-3 flex items-baseline gap-3 text-[40px] leading-tight font-semibold">
                Instrument Serif
                <Image src={`${BASE}/isotipo/${P}-isotipo-color.svg`} alt="" width={60} height={60} unoptimized className="h-10 w-auto" />
              </p>
              <p className="mt-1 text-lg">Se usa únicamente en el símbolo &amp; de la marca.</p>
              <a
                href="https://fonts.google.com/specimen/Instrument+Serif"
                target="_blank"
                rel="noopener noreferrer"
                className={clasesBoton("oscuro", "mt-6")}
              >
                <DownloadSimple aria-hidden size={16} weight="bold" />
                Descargar en Google Fonts
              </a>
            </li>
          </ul>
        </section>

        <section className="border-t border-linea py-12 lg:py-16">
          <h2 className="text-[28px] leading-tight md:text-[34px]">Reglas de uso</h2>
          <ul className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {[
              ["Espacio libre", "Deja alrededor del logo un espacio igual a la altura del &."],
              ["Tamaño mínimo", "Logo horizontal: 120 px en pantalla o 30 mm impreso. Isotipo: 16 px."],
              ["Sin cambios", "No estirar, rotar, cambiar colores ni separar la A del &."],
              ["Sobre fotos", "Usa la versión blanca o de fondo oscuro, o coloca el logo sobre una franja café."],
            ].map(([t, d]) => (
              <li key={t} className="border-l border-linea pl-5">
                <p className="font-medium">{t}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-piedra">{d}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
