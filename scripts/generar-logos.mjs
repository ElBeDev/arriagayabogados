// Genera el kit de logos descargable (public/logos/) a partir de los SVG maestros de public/marca/.
// Por cada pieza: color, fondo oscuro, negro y blanco, en SVG y PNG transparente; más íconos,
// imagen para redes, logo para firma de correo, un LEEME.txt y el ZIP con todo.
// Uso: npm run logos
import { chromium } from "playwright";
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, rmSync, writeFileSync, copyFileSync } from "node:fs";
import path from "node:path";

const MARCA = "public/marca";
const SALIDA = "public/logos";
const PREFIJO = "arriaga-abogados";

// Colores de marca en los SVG maestros
const ESPRESSO = "#1E1304";
const LATON = "#A3895B";
const CREMA = "#F8F4EB";
const ORO = "#D4B98A";

const piezas = [
  { id: "horizontal", maestro: "logo-horizontal", ancho: 2400 },
  { id: "vertical", maestro: "logo-vertical", ancho: 1600 },
  { id: "isotipo", maestro: "isotipo", ancho: 1600 },
  { id: "logotipo", maestro: "logotipo", ancho: 2400 },
  { id: "sello", maestro: "sello", ancho: 1600 },
];

// Solo se reemplazan colores de 6 dígitos: las máscaras usan #fff / #000 y no se tocan.
const variantes = {
  color: (claro) => claro,
  "fondo-oscuro": (_claro, crema) => crema,
  negro: (claro) => claro.replaceAll(ESPRESSO, "#000000").replaceAll(LATON, "#000000"),
  blanco: (_claro, crema) => crema.replaceAll(CREMA, "#FFFFFF").replaceAll(ORO, "#FFFFFF"),
};

rmSync(SALIDA, { recursive: true, force: true });
mkdirSync(SALIDA, { recursive: true });

const navegador = await chromium.launch();

async function png(svg, destino, ancho, fondo = null) {
  const vb = svg.match(/viewBox="([^"]+)"/)[1].split(/\s+/).map(Number);
  const alto = Math.round((ancho * vb[3]) / vb[2]);
  const pagina = await navegador.newPage({ viewport: { width: ancho, height: alto } });
  const ajustado = svg.replace(/width="[^"]+" height="[^"]+"/, `width="${ancho}" height="${alto}"`);
  await pagina.setContent(`<html><body style="margin:0;background:${fondo ?? "transparent"}">${ajustado}</body></html>`);
  await pagina.screenshot({ path: destino, omitBackground: !fondo });
  await pagina.close();
}

for (const pieza of piezas) {
  const dir = path.join(SALIDA, pieza.id);
  mkdirSync(dir, { recursive: true });
  const claro = readFileSync(path.join(MARCA, `${pieza.maestro}.svg`), "utf8");
  const crema = readFileSync(path.join(MARCA, `${pieza.maestro}-crema.svg`), "utf8");
  for (const [nombre, derivar] of Object.entries(variantes)) {
    const svg = derivar(claro, crema);
    const base = path.join(dir, `${PREFIJO}-${pieza.id}-${nombre}`);
    writeFileSync(`${base}.svg`, svg);
    await png(svg, `${base}.png`, pieza.ancho);
  }
}

// Íconos (isotipo sobre nogal, cuadrado) para perfiles, WhatsApp y favicon
const dirIconos = path.join(SALIDA, "iconos");
mkdirSync(dirIconos, { recursive: true });
const icono = readFileSync(path.join(MARCA, "icono.svg"), "utf8");
writeFileSync(path.join(dirIconos, `${PREFIJO}-icono.svg`), icono);
for (const lado of [1080, 512, 180]) await png(icono, path.join(dirIconos, `${PREFIJO}-icono-${lado}.png`), lado);

// Redes y correo
const dirRedes = path.join(SALIDA, "redes-y-correo");
mkdirSync(dirRedes, { recursive: true });
copyFileSync(path.join(MARCA, "redes-1200x630.png"), path.join(dirRedes, `${PREFIJO}-portada-1200x630.png`));
const horizontal = readFileSync(path.join(MARCA, "logo-horizontal.svg"), "utf8");
await png(horizontal, path.join(dirRedes, `${PREFIJO}-firma-correo-600.png`), 600, CREMA);

await navegador.close();

writeFileSync(
  path.join(SALIDA, "LEEME.txt"),
  `ARRIAGA & ABOGADOS · KIT DE LOGOS
=================================

Carpetas
  horizontal/      Logo completo en una línea (isotipo + nombre). Uso principal: web, correo, documentos.
  vertical/        Logo completo apilado, con "FIRMA LEGAL · GUADALAJARA". Portadas y papelería.
  isotipo/         Solo el símbolo A&. Espacios reducidos, marca de agua, redes.
  logotipo/        Solo las letras "Arriaga & Abogados".
  sello/           Sello circular institucional. Documentos y constancias.
  iconos/          Símbolo sobre fondo café, cuadrado: foto de perfil, WhatsApp, favicon.
  redes-y-correo/  Imagen para compartir en redes (1200x630) y logo para firma de correo.

Versiones de cada logo
  color          Sobre fondos claros (crema o blanco).
  fondo-oscuro   Sobre café, negro o fotos oscuras.
  negro          Una sola tinta negra: grabados, sellos de goma, fax, impresión a una tinta.
  blanco         Una sola tinta blanca: sobre fotos o colores oscuros.

Formatos
  SVG  Vectorial: se escala sin perder calidad. Para imprenta, diseño y web.
  PNG  Fondo transparente, alta resolución. Para Word, PowerPoint, redes y correo.

Colores
  Café Nogal   #412F0C   RGB 65 47 12
  Espresso     #1E1304   RGB 30 19 4
  Latón        #A3895B   RGB 163 137 91
  Oro Claro    #D4B98A   RGB 212 185 138
  Crema        #F8F4EB   RGB 248 244 235

Tipografías (gratuitas, Google Fonts)
  DM Sans                   Textos, títulos y el nombre.  https://fonts.google.com/specimen/DM+Sans
  Instrument Serif Italic   Solo el "&" del logo.        https://fonts.google.com/specimen/Instrument+Serif

Reglas
  - Deja alrededor del logo un espacio libre igual a la altura del "&".
  - Tamaño mínimo: logo horizontal 120 px (30 mm impreso); isotipo 16 px.
  - No estirar, rotar, cambiar colores ni separar la A del "&".
  - Sobre fotos, usar la versión blanca o fondo-oscuro, o poner el logo sobre una franja café.

Versión en línea: https://arriagayabogados.com/logos
`,
);

// ZIP con todo (usa el zip del sistema)
const zip = `${PREFIJO}-logos.zip`;
execFileSync("zip", ["-rq", zip, ".", "-x", ".*"], { cwd: SALIDA });
console.log(`Kit generado en ${SALIDA}/ (${zip})`);
