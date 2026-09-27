import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { DownloadSimple } from "@phosphor-icons/react/dist/ssr";
import { Isotipo, LogoHorizontal, Logotipo } from "@/components/marca";
import { HeroInterior } from "@/components/secciones";

export const metadata: Metadata = {
  title: "Guía de marca",
  description: "Logotipo, colores y tipografía de Arriaga & Abogados.",
  robots: { index: false, follow: false },
};

const colores = [
  { nombre: "Café Nogal", hex: "#412F0C", uso: "Primario: secciones oscuras, botones, papelería", claro: false },
  { nombre: "Espresso", hex: "#1E1304", uso: "Texto y la A del isotipo", claro: false },
  { nombre: "Latón", hex: "#A3895B", uso: "El & sobre fondos claros, detalles", claro: false },
  { nombre: "Oro Claro", hex: "#D4B98A", uso: "El & sobre fondos oscuros", claro: true },
  { nombre: "Crema", hex: "#F8F4EB", uso: "Fondo principal, texto sobre nogal", claro: true },
  { nombre: "Arena", hex: "#8D8269", uso: "Logotipo gigante, elementos decorativos", claro: false },
];

const descargas = [
  { titulo: "Logo horizontal", archivo: "logo-horizontal" },
  { titulo: "Logo vertical", archivo: "logo-vertical" },
  { titulo: "Isotipo A&", archivo: "isotipo" },
  { titulo: "Logotipo", archivo: "logotipo" },
  { titulo: "Sello", archivo: "sello" },
];

function Seccion({ eyebrow, titulo, children }: { eyebrow: string; titulo: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-linea py-16 lg:py-24">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 className="text-[28px] leading-[1.2] md:text-[36px]">{titulo}</h2>
          <p className="mt-2 text-[13px] text-piedra">{eyebrow}</p>
        </div>
        <div className="lg:col-span-8">{children}</div>
      </div>
    </section>
  );
}

export default async function Marca(props: PageProps<"/[locale]/marca">) {
  setRequestLocale((await props.params).locale);
  return (
    <>
      <HeroInterior
        migas={[{ label: "Guía de marca" }]}
        eyebrow="Guía de marca"
        titulo="Arriaga & Abogados"
        texto="Arriaga, por su fundadora; Abogados, por el equipo que respalda cada asunto. El isotipo A& une ambas partes."
      />

      <div className="contenedor pb-18 lg:pb-30">
        <Seccion eyebrow="Logotipo" titulo="Versión principal">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex h-56 items-center justify-center border border-linea bg-crema-claro px-8">
              <LogoHorizontal className="h-10 sm:h-16" />
            </div>
            <div className="flex h-56 items-center justify-center bg-nogal px-8">
              <LogoHorizontal tono="oscuro" className="h-10 sm:h-16" />
            </div>
          </div>
          <p className="mt-6 max-w-[62ch] leading-relaxed text-piedra">
            La versión horizontal se usa en el sitio, firmas de correo y documentos. Sobre fondos claros, la A va en
            espresso y el & en latón; sobre nogal, la A en crema y el & en oro claro.
          </p>
        </Seccion>

        <Seccion eyebrow="Isotipo" titulo="A&">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="flex aspect-square items-center justify-center border border-linea bg-crema-claro p-8">
              <Isotipo className="h-full w-full" />
            </div>
            <div className="flex aspect-square items-center justify-center bg-nogal p-8">
              <Isotipo tono="oscuro" className="h-full w-full" />
            </div>
            <div className="flex aspect-square flex-col items-center justify-center gap-4 border border-linea p-6">
              <Image src="/marca/icono-512.png" alt="Ícono de la app" width={96} height={96} />
              <span className="text-[12px] text-piedra">Ícono / favicon</span>
            </div>
            <div className="flex aspect-square flex-col items-center justify-center gap-4 border border-linea p-6">
              <Image src="/marca/sello.svg" alt="Sello de Arriaga & Abogados" width={140} height={140} />
              <span className="text-[12px] text-piedra">Sello</span>
            </div>
          </div>
          <p className="mt-6 max-w-[62ch] leading-relaxed text-piedra">
            El isotipo funciona solo en espacios reducidos: favicon, redes sociales, sellos y marcas de agua. El sello
            circular es la versión institucional para documentos, papelería y constancias.
          </p>
        </Seccion>

        <Seccion eyebrow="Color" titulo="Paleta">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {colores.map((c) => (
              <li key={c.hex} className="border border-linea">
                <div className="h-28" style={{ background: c.hex }} />
                <div className="p-4">
                  <p className="font-medium">{c.nombre}</p>
                  <p className="mt-1 font-mono text-[13px] text-piedra">{c.hex}</p>
                  <p className="mt-2 text-[13px] leading-snug text-piedra">{c.uso}</p>
                </div>
              </li>
            ))}
          </ul>
        </Seccion>

        <Seccion eyebrow="Tipografía" titulo="DM Sans + Instrument Serif">
          <div className="space-y-8">
            <div className="border-l border-linea pl-6">
              <p className="text-[13px] text-piedra">DM Sans · textos, títulos y logotipo</p>
              <p className="mt-3 text-[40px] leading-tight font-bold uppercase">Criterio que protege</p>
              <p className="mt-2 text-2xl">Asesoría legal de confianza, con integridad y precisión.</p>
            </div>
            <div className="border-l border-linea pl-6">
              <p className="text-[13px] text-piedra">Instrument Serif Italic · solo el &amp;</p>
              <Logotipo className="mt-4 h-auto w-full max-w-[440px]" />
              <p className="mt-4 max-w-[56ch] text-[15px] leading-relaxed text-piedra">
                La cursiva serif se reserva para el &amp; de la marca. Es el único acento tipográfico: no se usa en
                títulos ni en textos.
              </p>
            </div>
          </div>
        </Seccion>

        <Seccion eyebrow="Uso" titulo="Reglas básicas">
          <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {[
              ["Área de protección", "Deja alrededor del logo un espacio libre igual a la altura del &."],
              ["Tamaño mínimo", "Logo horizontal: 120 px de ancho en pantalla o 30 mm impreso. Isotipo: 16 px."],
              ["No deformar", "No estirar, rotar, cambiar colores ni separar la A del &."],
              ["Fondos", "Usar solo sobre crema, blanco o nogal. Sobre fotos, colocar sobre una franja de nogal."],
            ].map(([t, d]) => (
              <li key={t} className="border-l border-linea pl-5">
                <p className="font-medium">{t}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-piedra">{d}</p>
              </li>
            ))}
          </ul>
        </Seccion>

        <Seccion eyebrow="Descargas" titulo="Archivos de marca">
          <ul className="border-t border-linea">
            {descargas.map((d) => (
              <li key={d.archivo} className="flex flex-wrap items-center justify-between gap-3 border-b border-linea py-4">
                <span className="text-lg">{d.titulo}</span>
                <span className="flex flex-wrap gap-2 text-[13px]">
                  {[
                    ["SVG", `${d.archivo}.svg`],
                    ["PNG", `${d.archivo}.png`],
                    ["SVG crema", `${d.archivo}-crema.svg`],
                    ["PNG crema", `${d.archivo}-crema.png`],
                  ].map(([etq, f]) => (
                    <a
                      key={f}
                      href={`/marca/${f}`}
                      download
                      className="inline-flex items-center gap-1.5 border border-linea px-3 py-1.5 hover:border-nogal"
                    >
                      <DownloadSimple aria-hidden size={14} /> {etq}
                    </a>
                  ))}
                </span>
              </li>
            ))}
          </ul>
        </Seccion>
      </div>
    </>
  );
}
