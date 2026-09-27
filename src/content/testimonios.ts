// Testimonios de ejemplo (semilla de la tabla `testimonios`). Antes de publicar:
// solo testimonios reales, autorizados por escrito, y anónimos si el cliente lo prefiere.

export type TestimonioSemilla = {
  iniciales: string;
  es: { cita: string; autor: string; detalle: string };
  en: { cita: string; autor: string; detalle: string };
};

export type Testimonio = { iniciales: string; cita: string; autor: string; detalle: string };

export const testimoniosSemilla: TestimonioSemilla[] = [
  {
    iniciales: "DG",
    es: {
      cita: "Nos acompañaron en una reestructura laboral compleja sin un solo conflicto.",
      autor: "Director General",
      detalle: "Empresa de manufactura · El Salto, Jal.",
    },
    en: {
      cita: "They guided us through a complex workforce restructuring without a single dispute.",
      autor: "Chief Executive Officer",
      detalle: "Manufacturing company · El Salto, Jalisco",
    },
  },
  {
    iniciales: "MR",
    es: {
      cita: "Claridad total en un momento familiar muy difícil.",
      autor: "Cliente particular",
      detalle: "Juicio sucesorio · Zapopan, Jal.",
    },
    en: {
      cita: "Complete clarity at a very difficult time for our family.",
      autor: "Private client",
      detalle: "Probate proceeding · Zapopan, Jalisco",
    },
  },
  {
    iniciales: "CF",
    es: {
      cita: "Un equipo que entiende el negocio, no solo la ley.",
      autor: "Socio fundador",
      detalle: "Empresa de tecnología · Guadalajara, Jal.",
    },
    en: {
      cita: "A team that understands the business, not just the law.",
      autor: "Founding partner",
      detalle: "Technology company · Guadalajara, Jalisco",
    },
  },
];
