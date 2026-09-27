// Datos generales de la firma. Todo es contenido provisional (ver el brief):
// dirección, teléfonos y cifras se reemplazan por los reales antes de publicar.
// Los datos de contacto de aquí son los valores por defecto: en producción se
// editan desde /admin/configuracion (tabla `ajustes`).

import type { Locale } from "@/i18n/routing";

export const firma = {
  nombre: "Arriaga & Abogados",
  razonSocial: "Arriaga & Abogados, S.C.",
  fundacion: 2006,
  url: "https://arriagayabogados.com",
  redes: {
    linkedin: "https://www.linkedin.com/",
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
  },
} as const;

export type Ajustes = {
  telefono: string;
  telefonoHref: string;
  whatsapp: string;
  email: string;
  calle: string;
  colonia: string;
  cp: string;
  ciudad: string;
  estado: string;
  horarioEs: string[];
  horarioEn: string[];
  cifras: { valor: number; sufijo: string; es: string; en: string }[];
};

export const ajustesPorDefecto: Ajustes = {
  telefono: "(33) 0000 0000",
  telefonoHref: "+523300000000",
  whatsapp: "523300000000",
  email: "contacto@arriagayabogados.com",
  calle: "Av. Pablo Neruda 2890, Piso 9",
  colonia: "Col. Providencia 4a. Sección",
  cp: "44639",
  ciudad: "Guadalajara",
  estado: "Jalisco",
  horarioEs: ["Lunes a viernes · 9:00 a 19:00 h", "Sábados · 10:00 a 14:00 h (con cita)"],
  horarioEn: ["Monday to Friday · 9:00 am to 7:00 pm", "Saturday · 10:00 am to 2:00 pm (by appointment)"],
  cifras: [
    { valor: 20, sufijo: "+", es: "Años de trayectoria", en: "Years of practice" },
    { valor: 2500, sufijo: "+", es: "Asuntos atendidos", en: "Matters handled" },
    { valor: 9, sufijo: "", es: "Áreas de práctica", en: "Practice areas" },
    { valor: 300, sufijo: "+", es: "Empresas asesoradas", en: "Companies advised" },
  ],
};

export function direccionCompleta(a: Ajustes) {
  return `${a.calle}, ${a.colonia}, C.P. ${a.cp}, ${a.ciudad}, ${a.estado}`;
}

export function mapaEmbed(a: Ajustes) {
  return `https://www.google.com/maps?q=${encodeURIComponent(`${a.calle}, ${a.colonia}, ${a.ciudad}, ${a.estado}`)}&output=embed`;
}

export function whatsappHref(numero: string, mensaje: string) {
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
}

type Bloque = { titulo: string; texto: string };

export type Textos = {
  slogan: string;
  descripcion: string;
  manifiesto: string;
  diferenciadores: Bloque[];
  valores: Bloque[];
  pasos: Bloque[];
  historia: string[];
  mision: string;
  vision: string;
};

export const textos: Record<Locale, Textos> = {
  es: {
    slogan: "Criterio que protege lo que has construido.",
    descripcion:
      "Firma de abogados en Guadalajara con más de 20 años asesorando a empresas y familias en materia corporativa, litigio, laboral, fiscal y más.",
    manifiesto:
      "En Arriaga & Abogados combinamos rigor técnico, visión de negocio y trato directo con los socios. Protegemos tu patrimonio, tu empresa y tu familia con estrategia, honestidad y oportunidad, en cada etapa del camino.",
    diferenciadores: [
      {
        titulo: "Trato directo con socios",
        texto:
          "Tu asunto no se pierde en una pirámide de pasantes. Un socio conoce tu caso, define la estrategia y responde por ella.",
      },
      {
        titulo: "Visión integral",
        texto:
          "Litigio, fiscal, laboral y corporativo trabajan juntos en el mismo asunto, para que ninguna decisión legal genere un problema en otra área.",
      },
      {
        titulo: "Comunicación clara",
        texto:
          "Reportes periódicos del estado de tu asunto, sin tecnicismos innecesarios. Siempre sabes qué sigue, cuánto cuesta y qué riesgos existen.",
      },
      {
        titulo: "Raíz local, alcance nacional",
        texto:
          "Conocemos a fondo los tribunales y autoridades de Jalisco, y litigamos ante tribunales federales y locales en todo el país.",
      },
    ],
    valores: [
      { titulo: "Integridad", texto: "Decimos lo que el cliente necesita escuchar, no lo que quiere escuchar." },
      { titulo: "Confidencialidad", texto: "El secreto profesional es la base de nuestra relación con cada cliente." },
      { titulo: "Rigor técnico", texto: "Cada estrategia se sustenta en estudio, jurisprudencia y experiencia." },
      { titulo: "Cercanía", texto: "Los socios participan directamente en cada asunto." },
      { titulo: "Oportunidad", texto: "Respondemos a tiempo, porque en derecho los plazos lo son todo." },
    ],
    pasos: [
      { titulo: "Escuchamos", texto: "Una primera consulta con calma, en nuestra oficina o por videollamada." },
      { titulo: "Evaluamos", texto: "Revisamos documentos, riesgos, opciones y tiempos de tu asunto." },
      { titulo: "Proponemos", texto: "Te entregamos una estrategia y una propuesta de honorarios clara y por escrito." },
      { titulo: "Acompañamos", texto: "Ejecutamos la estrategia y te mantenemos informado en cada etapa." },
    ],
    historia: [
      "Arriaga & Abogados nació en 2006 en Guadalajara, cuando la Lic. Mariana Arriaga Cortés, junto con el Lic. Ricardo Villaseñor Ochoa, después de casi una década litigando en firmas de la Ciudad de México y Monterrey, decidió regresar a Jalisco con una idea clara: que las empresas y familias de Occidente tuvieran acceso a asesoría legal del mismo nivel que las grandes firmas nacionales, pero con trato directo con los socios.",
      "El nombre lo dice todo: Arriaga, por su fundadora, y Abogados, por cada una de las personas que respaldan cada asunto. La firma nunca ha sido de una sola persona, sino de un equipo.",
      "Empezamos con una oficina de tres personas en la colonia Americana. Hoy somos un equipo de más de 20 profesionales entre socios, asociados, pasantes y personal de apoyo, con oficinas en Providencia y asuntos en tribunales de todo el país.",
      "Más de 20 años después, seguimos creyendo lo mismo: cada asunto merece la atención de alguien que conozca el caso a fondo, que hable claro sobre los riesgos y que responda cuando el cliente lo necesita.",
    ],
    mision:
      "Proteger el patrimonio, la operación y la tranquilidad de nuestros clientes con asesoría legal estratégica, honesta y oportuna.",
    vision:
      "Ser la firma de referencia en el Occidente de México por la calidad técnica de nuestro trabajo y la confianza de nuestros clientes.",
  },
  en: {
    slogan: "Judgment that protects what you have built.",
    descripcion:
      "Law firm in Guadalajara with more than 20 years advising companies and families on corporate, litigation, employment, tax matters and more.",
    manifiesto:
      "At Arriaga & Abogados we combine technical rigor, business sense and direct access to the partners. We protect your assets, your company and your family with strategy, honesty and timeliness, at every step of the way.",
    diferenciadores: [
      {
        titulo: "Direct access to partners",
        texto:
          "Your matter does not get lost in a pyramid of interns. A partner knows your case, sets the strategy and answers for it.",
      },
      {
        titulo: "A complete view",
        texto:
          "Litigation, tax, employment and corporate work together on the same matter, so no legal decision creates a problem in another area.",
      },
      {
        titulo: "Clear communication",
        texto:
          "Regular updates on your matter, without unnecessary jargon. You always know what comes next, what it costs and what the risks are.",
      },
      {
        titulo: "Local roots, national reach",
        texto:
          "We know the courts and authorities of Jalisco in depth, and we litigate before federal and local courts across Mexico.",
      },
    ],
    valores: [
      { titulo: "Integrity", texto: "We tell clients what they need to hear, not what they want to hear." },
      { titulo: "Confidentiality", texto: "Attorney-client privilege is the foundation of every client relationship." },
      { titulo: "Technical rigor", texto: "Every strategy rests on research, case law and experience." },
      { titulo: "Closeness", texto: "Partners are directly involved in every matter." },
      { titulo: "Timeliness", texto: "We respond on time, because in law deadlines are everything." },
    ],
    pasos: [
      { titulo: "We listen", texto: "An unhurried first consultation, at our office or by video call." },
      { titulo: "We assess", texto: "We review the documents, risks, options and timelines of your matter." },
      { titulo: "We propose", texto: "You receive a strategy and a clear fee proposal in writing." },
      { titulo: "We stay with you", texto: "We carry out the strategy and keep you informed at every stage." },
    ],
    historia: [
      "Arriaga & Abogados was founded in Guadalajara in 2006, when Mariana Arriaga Cortés, together with Ricardo Villaseñor Ochoa, returned to Jalisco after almost a decade litigating at firms in Mexico City and Monterrey. The idea was clear: companies and families in western Mexico deserved legal advice at the level of the large national firms, with direct access to the partners.",
      "The name says it all: Arriaga, after its founder, and Abogados (lawyers), for each of the people who stand behind every matter. The firm has never belonged to one person; it belongs to a team.",
      "We started with a three-person office in Colonia Americana. Today we are a team of more than 20 professionals, including partners, associates, trainees and support staff, with offices in Providencia and cases before courts across the country.",
      "More than 20 years later, we still believe the same thing: every matter deserves someone who knows the case in depth, speaks clearly about the risks and responds when the client needs it.",
    ],
    mision:
      "To protect our clients' assets, operations and peace of mind with strategic, honest and timely legal advice.",
    vision:
      "To be the reference firm in western Mexico for the technical quality of our work and the trust of our clients.",
  },
};
