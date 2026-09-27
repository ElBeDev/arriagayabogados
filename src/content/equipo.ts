// Integrantes provisionales (semilla de la tabla `equipo`). Las cédulas profesionales
// deben ser reales y verificables en el Registro Nacional de Profesionistas antes de publicar.

export type Nivel = "socio" | "of-counsel" | "asociado-senior" | "asociado";

type TextosIntegrante = { cargo: string; formacion: string[]; idiomas: string[]; bio: string[] };

export type IntegranteSemilla = {
  slug: string;
  nombre: string;
  nivel: Nivel;
  orden: number;
  areas: string[];
  foto: string;
  email: string;
  cedula: string | null;
  es: TextosIntegrante;
  en: TextosIntegrante;
};

/** Integrante ya resuelto en un idioma: es lo que consumen las páginas. */
export type Integrante = Omit<IntegranteSemilla, "es" | "en" | "orden"> & TextosIntegrante;

export const RNP_URL = "https://www.cedulaprofesional.sep.gob.mx/";

export const ordenNiveles: Nivel[] = ["socio", "of-counsel", "asociado-senior", "asociado"];

export const equipoSemilla: IntegranteSemilla[] = [
  {
    slug: "mariana-arriaga-cortes",
    nombre: "Lic. Mariana Arriaga Cortés",
    nivel: "socio",
    orden: 1,
    areas: ["litigio-civil-y-mercantil", "amparo-y-constitucional"],
    foto: "/img/equipo-mariana.jpg",
    email: "marriaga@arriagayabogados.com",
    cedula: null,
    es: {
      cargo: "Socia Directora · Fundadora",
      formacion: ["Licenciatura en Derecho · ITESO", "Especialidad en Amparo · Escuela Libre de Derecho", "Maestría en Derecho Procesal Constitucional"],
      idiomas: ["Español", "Inglés"],
      bio: ["Fundadora y Socia Directora de Arriaga & Abogados. Litigante con más de 22 años de experiencia ante tribunales locales y federales.", "Ha dirigido juicios mercantiles de alta cuantía y amparos en materia administrativa y fiscal ante Tribunales Colegiados y la Suprema Corte de Justicia de la Nación."],
    },
    en: {
      cargo: "Managing Partner · Founder",
      formacion: ["Law degree · ITESO", "Specialization in Amparo · Escuela Libre de Derecho", "Master's in Constitutional Procedural Law"],
      idiomas: ["Spanish", "English"],
      bio: ["Founder and Managing Partner of Arriaga & Abogados. Litigator with more than 22 years of experience before local and federal courts.", "She has led high-value commercial lawsuits and amparo proceedings in administrative and tax matters before Collegiate Courts and Mexico's Supreme Court."],
    },
  },
  {
    slug: "ricardo-villasenor-ochoa",
    nombre: "Lic. Ricardo Villaseñor Ochoa",
    nivel: "socio",
    orden: 2,
    areas: ["corporativo-y-mercantil"],
    foto: "/img/equipo-ricardo.jpg",
    email: "rvillasenor@arriagayabogados.com",
    cedula: null,
    es: {
      cargo: "Socio Fundador",
      formacion: ["Licenciatura en Derecho · Universidad de Guadalajara", "Maestría en Derecho Corporativo · Universidad Panamericana", "LL.M. · University of Texas at Austin"],
      idiomas: ["Español", "Inglés"],
      bio: ["Más de 25 años asesorando a empresas nacionales y extranjeras en su estructura corporativa, operaciones de compraventa de empresas, contratos comerciales y gobierno corporativo.", "Antes de fundar la firma trabajó en el área corporativa de una firma internacional en la Ciudad de México. Cofundador de la firma, coordina la práctica corporativa y la relación con clientes internacionales."],
    },
    en: {
      cargo: "Founding Partner",
      formacion: ["Law degree · Universidad de Guadalajara", "Master's in Corporate Law · Universidad Panamericana", "LL.M. · University of Texas at Austin"],
      idiomas: ["Spanish", "English"],
      bio: ["More than 25 years advising Mexican and foreign companies on corporate structure, company acquisitions, commercial contracts and corporate governance.", "Before co-founding the firm he worked in the corporate practice of an international firm in Mexico City. He leads the corporate practice and the relationship with international clients."],
    },
  },
  {
    slug: "eduardo-navarro-lomeli",
    nombre: "Lic. Eduardo Navarro Lomelí",
    nivel: "socio",
    orden: 3,
    areas: ["laboral"],
    foto: "/img/equipo-eduardo.jpg",
    email: "enavarro@arriagayabogados.com",
    cedula: null,
    es: {
      cargo: "Socio",
      formacion: ["Licenciatura en Derecho · Universidad Autónoma de Guadalajara", "Maestría en Derecho del Trabajo · UNAM"],
      idiomas: ["Español", "Inglés"],
      bio: ["Asesora a empresas de manufactura, tecnología y servicios en relaciones laborales, reestructuras de plantilla y contratos colectivos.", "Lleva la defensa patronal ante los Centros de Conciliación y los Tribunales Laborales, y el cumplimiento en materia de subcontratación (REPSE)."],
    },
    en: {
      cargo: "Partner",
      formacion: ["Law degree · Universidad Autónoma de Guadalajara", "Master's in Labor Law · UNAM"],
      idiomas: ["Spanish", "English"],
      bio: ["He advises manufacturing, technology and service companies on labor relations, workforce restructuring and collective agreements.", "He leads employer defense before Conciliation Centers and Labor Courts, and outsourcing compliance (REPSE)."],
    },
  },
  {
    slug: "daniela-fregoso-ruvalcaba",
    nombre: "C.P. y Lic. Daniela Fregoso Ruvalcaba",
    nivel: "socio",
    orden: 4,
    areas: ["fiscal-y-administrativo"],
    foto: "/img/equipo-daniela.jpg",
    email: "dfregoso@arriagayabogados.com",
    cedula: null,
    es: {
      cargo: "Socia",
      formacion: ["Contaduría Pública y Licenciatura en Derecho · Tecnológico de Monterrey, Campus Guadalajara", "Maestría en Impuestos · ITAM"],
      idiomas: ["Español", "Inglés"],
      bio: ["Combina la visión contable y la jurídica para defender a empresas en auditorías del SAT, recursos administrativos y juicios ante el Tribunal Federal de Justicia Administrativa.", "Diseña esquemas de planeación fiscal preventiva y acompaña a empresas con operaciones de comercio exterior."],
    },
    en: {
      cargo: "Partner",
      formacion: ["Public Accounting and Law degrees · Tecnológico de Monterrey, Guadalajara campus", "Master's in Taxation · ITAM"],
      idiomas: ["Spanish", "English"],
      bio: ["She combines accounting and legal expertise to defend companies in SAT audits, administrative appeals and trials before the Federal Administrative Court.", "She designs preventive tax planning and supports companies with foreign trade operations."],
    },
  },
  {
    slug: "hector-zepeda-barba",
    nombre: "Mtro. Héctor Zepeda Barba",
    nivel: "of-counsel",
    orden: 5,
    areas: ["penal"],
    foto: "/img/equipo-hector.jpg",
    email: "hzepeda@arriagayabogados.com",
    cedula: null,
    es: {
      cargo: "Of Counsel",
      formacion: ["Licenciatura en Derecho · Universidad de Guadalajara", "Maestría en Ciencias Penales"],
      idiomas: ["Español"],
      bio: ["Más de 30 años de trayectoria en el sistema de justicia penal.", "Coordina la defensa penal de la firma y los programas de prevención de responsabilidad penal de personas morales."],
    },
    en: {
      cargo: "Of Counsel",
      formacion: ["Law degree · Universidad de Guadalajara", "Master's in Criminal Sciences"],
      idiomas: ["Spanish"],
      bio: ["More than 30 years of experience in the criminal justice system.", "He coordinates the firm's criminal defense and the corporate criminal liability prevention programs."],
    },
  },
  {
    slug: "luis-fernando-gomez-plascencia",
    nombre: "Lic. Luis Fernando Gómez Plascencia",
    nivel: "asociado-senior",
    orden: 6,
    areas: ["litigio-civil-y-mercantil"],
    foto: "/img/equipo-luis.jpg",
    email: "lgomez@arriagayabogados.com",
    cedula: null,
    es: {
      cargo: "Asociado Senior",
      formacion: ["Licenciatura en Derecho · Universidad de Guadalajara", "Maestría en Derecho Procesal"],
      idiomas: ["Español", "Inglés"],
      bio: ["Litiga juicios civiles y mercantiles, con énfasis en cobranza judicial y controversias contractuales."],
    },
    en: {
      cargo: "Senior Associate",
      formacion: ["Law degree · Universidad de Guadalajara", "Master's in Procedural Law"],
      idiomas: ["Spanish", "English"],
      bio: ["He litigates civil and commercial cases, with a focus on judicial collections and contract disputes."],
    },
  },
  {
    slug: "andrea-camarena-robles",
    nombre: "Lic. Andrea Camarena Robles",
    nivel: "asociado-senior",
    orden: 7,
    areas: ["familiar-y-sucesiones"],
    foto: "/img/equipo-andrea.jpg",
    email: "acamarena@arriagayabogados.com",
    cedula: null,
    es: {
      cargo: "Asociada Senior",
      formacion: ["Licenciatura en Derecho · ITESO", "Especialidad en Derecho Familiar"],
      idiomas: ["Español"],
      bio: ["Lleva asuntos de divorcio, custodia, alimentos y sucesiones, buscando siempre acuerdos que protejan a la familia."],
    },
    en: {
      cargo: "Senior Associate",
      formacion: ["Law degree · ITESO", "Specialization in Family Law"],
      idiomas: ["Spanish"],
      bio: ["She handles divorce, custody, support and probate matters, always seeking agreements that protect the family."],
    },
  },
  {
    slug: "jorge-ivan-partida-nunez",
    nombre: "Lic. Jorge Iván Partida Núñez",
    nivel: "asociado",
    orden: 8,
    areas: ["penal"],
    foto: "/img/equipo-jorge.jpg",
    email: "jpartida@arriagayabogados.com",
    cedula: null,
    es: {
      cargo: "Asociado",
      formacion: ["Licenciatura en Derecho · Universidad Autónoma de Guadalajara", "Especialidad en Sistema Penal Acusatorio"],
      idiomas: ["Español"],
      bio: ["Participa en la defensa penal y la asesoría a víctimas en audiencias del sistema acusatorio."],
    },
    en: {
      cargo: "Associate",
      formacion: ["Law degree · Universidad Autónoma de Guadalajara", "Specialization in the Accusatory Criminal System"],
      idiomas: ["Spanish"],
      bio: ["He takes part in criminal defense and victim representation in accusatory system hearings."],
    },
  },
  {
    slug: "sofia-anaya-delgadillo",
    nombre: "Lic. Sofía Anaya Delgadillo",
    nivel: "asociado",
    orden: 9,
    areas: ["inmobiliario"],
    foto: "/img/equipo-sofia.jpg",
    email: "sanaya@arriagayabogados.com",
    cedula: null,
    es: {
      cargo: "Asociada",
      formacion: ["Licenciatura en Derecho · Universidad Panamericana"],
      idiomas: ["Español", "Inglés"],
      bio: ["Asesora operaciones inmobiliarias, revisión de títulos y trámites de uso de suelo en la zona metropolitana."],
    },
    en: {
      cargo: "Associate",
      formacion: ["Law degree · Universidad Panamericana"],
      idiomas: ["Spanish", "English"],
      bio: ["She advises on real estate transactions, title review and land-use procedures across the metropolitan area."],
    },
  },
  {
    slug: "emilio-cervantes-topete",
    nombre: "Lic. Emilio Cervantes Topete",
    nivel: "asociado",
    orden: 10,
    areas: ["propiedad-intelectual"],
    foto: "/img/equipo-emilio.jpg",
    email: "ecervantes@arriagayabogados.com",
    cedula: null,
    es: {
      cargo: "Asociado",
      formacion: ["Licenciatura en Derecho · Tecnológico de Monterrey", "Diplomado en Protección de Datos Personales"],
      idiomas: ["Español", "Inglés"],
      bio: ["Registra y defiende marcas, y redacta contratos de software, avisos de privacidad y términos de uso."],
    },
    en: {
      cargo: "Associate",
      formacion: ["Law degree · Tecnológico de Monterrey", "Diploma in Personal Data Protection"],
      idiomas: ["Spanish", "English"],
      bio: ["He registers and enforces trademarks, and drafts software contracts, privacy notices and terms of use."],
    },
  },
  {
    slug: "valeria-orozco-hernandez",
    nombre: "Lic. Valeria Orozco Hernández",
    nivel: "asociado",
    orden: 11,
    areas: ["laboral"],
    foto: "/img/equipo-valeria.jpg",
    email: "vorozco@arriagayabogados.com",
    cedula: null,
    es: {
      cargo: "Asociada",
      formacion: ["Licenciatura en Derecho · Universidad de Guadalajara"],
      idiomas: ["Español"],
      bio: ["Apoya la práctica laboral en contratos, reglamentos, conciliaciones y cumplimiento de NOM-035."],
    },
    en: {
      cargo: "Associate",
      formacion: ["Law degree · Universidad de Guadalajara"],
      idiomas: ["Spanish"],
      bio: ["She supports the employment practice with contracts, internal regulations, conciliation and NOM-035 compliance."],
    },
  },
];

export function nombreCorto(p: { nombre: string }) {
  // "Lic. Ricardo Villaseñor Ochoa" → "Ricardo"
  return p.nombre.replace(/^(Lic\.|Mtro\.|C\.P\. y Lic\.)\s+/, "").split(" ")[0];
}
