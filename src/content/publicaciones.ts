// Artículos (semilla de la tabla `publicaciones`). Cuerpo en Markdown.
// Cada artículo existe en español e inglés con el mismo slug.

import type { Locale } from "@/i18n/routing";

export type Publicacion = {
  slug: string;
  locale: Locale;
  titulo: string;
  extracto: string;
  area: string;
  autor: string;
  fecha: string; // ISO (AAAA-MM-DD)
  lectura: number; // minutos
  portada: string;
  cuerpo: string; // Markdown
};

export const publicacionesSemilla: Publicacion[] = [
  {
    slug: "que-hacer-si-el-sat-te-envia-una-carta-invitacion",
    locale: "es",
    titulo: "Qué hacer si el SAT te envía una carta invitación",
    extracto: "No es una auditoría, pero tampoco conviene ignorarla. Te explicamos qué significa y cómo responder.",
    area: "fiscal-y-administrativo",
    autor: "daniela-fregoso-ruvalcaba",
    fecha: "2026-09-15",
    lectura: 5,
    portada: "/img/blog-sat.jpg",
    cuerpo: "Las cartas invitación son comunicados que el SAT envía cuando detecta una posible diferencia entre lo que declaraste y la información que tiene de terceros: facturas emitidas y recibidas, depósitos bancarios o retenciones.\n\n## ¿Es una auditoría?\n\nNo. Una carta invitación no es el inicio de facultades de comprobación. Es una oportunidad para aclarar o corregir tu situación antes de que la autoridad inicie una revisión formal.\n\n## Qué hacer al recibirla\n\n- Revisa con calma qué periodo y qué contribución menciona.\n- Compara la información del SAT con tu contabilidad y tus declaraciones.\n- Si hay un error del SAT, prepara la aclaración con documentos que lo sustenten.\n- Si la diferencia es real, valora presentar declaraciones complementarias.\n\nIgnorar la carta aumenta la probabilidad de una revisión posterior. Responder con información ordenada suele cerrar el tema.",
  },
  {
    slug: "que-hacer-si-el-sat-te-envia-una-carta-invitacion",
    locale: "en",
    titulo: "What to do if the SAT sends you an invitation letter",
    extracto: "It is not an audit, but it is not wise to ignore it either. We explain what it means and how to respond.",
    area: "fiscal-y-administrativo",
    autor: "daniela-fregoso-ruvalcaba",
    fecha: "2026-09-15",
    lectura: 5,
    portada: "/img/blog-sat.jpg",
    cuerpo: "Invitation letters are notices the SAT (Mexico's tax authority) sends when it detects a possible difference between what you reported and the information it has from third parties: invoices issued and received, bank deposits or withholdings.\n\n## Is it an audit?\n\nNo. An invitation letter does not start an audit. It is an opportunity to clarify or correct your situation before the authority begins a formal review.\n\n## What to do when you receive one\n\n- Calmly review which period and which tax it refers to.\n- Compare the SAT's information with your accounting and your tax returns.\n- If the SAT made a mistake, prepare the clarification with supporting documents.\n- If the difference is real, consider filing amended returns.\n\nIgnoring the letter increases the chances of a later review. Responding with organized information usually closes the matter.",
  },
  {
    slug: "como-constituir-una-empresa-en-guadalajara",
    locale: "es",
    titulo: "Cómo constituir una empresa en Guadalajara: pasos, costos y tiempos",
    extracto: "S.A.S., S.A. de C.V. o S.A.P.I.: qué tipo de sociedad elegir y qué pasos seguir para arrancar en orden.",
    area: "corporativo-y-mercantil",
    autor: "ricardo-villasenor-ochoa",
    fecha: "2026-09-02",
    lectura: 7,
    portada: "/img/blog-empresa.jpg",
    cuerpo: "Elegir la estructura correcta desde el inicio evita conflictos entre socios, problemas fiscales y costos de reestructura más adelante.\n\n## 1. Elige el tipo de sociedad\n\nLa S.A.S. permite constituir una empresa en línea, incluso con un solo accionista, aunque tiene un límite de ingresos anuales. La S.A. de C.V. y la S.A.P.I. se constituyen ante notario o corredor público y ofrecen más flexibilidad para crecer y recibir inversión.\n\n## 2. Define los acuerdos entre socios\n\nAportaciones, reparto de utilidades, toma de decisiones y reglas de salida. Estos acuerdos se reflejan en los estatutos y, idealmente, en un convenio entre accionistas.\n\n## 3. Trámites posteriores\n\n- Inscripción en el Registro Público de Comercio.\n- Alta en el RFC y obtención de la e.firma de la sociedad.\n- Licencia municipal de giro, según la actividad y el domicilio.\n- Registro patronal ante el IMSS si vas a contratar personal.",
  },
  {
    slug: "como-constituir-una-empresa-en-guadalajara",
    locale: "en",
    titulo: "How to set up a company in Guadalajara: steps, costs and timelines",
    extracto: "S.A.S., S.A. de C.V. or S.A.P.I.: which type of company to choose and which steps to follow to start in good order.",
    area: "corporativo-y-mercantil",
    autor: "ricardo-villasenor-ochoa",
    fecha: "2026-09-02",
    lectura: 7,
    portada: "/img/blog-empresa.jpg",
    cuerpo: "Choosing the right structure from the start prevents disputes between partners, tax problems and restructuring costs later on.\n\n## 1. Choose the type of company\n\nAn S.A.S. can be set up online, even with a single shareholder, although it has an annual revenue cap. An S.A. de C.V. or S.A.P.I. is formed before a notary or commercial broker and offers more flexibility to grow and raise capital.\n\n## 2. Agree on the partnership terms\n\nContributions, profit sharing, decision-making and exit rules. These agreements are reflected in the bylaws and, ideally, in a shareholders' agreement.\n\n## 3. Follow-up procedures\n\n- Registration with the Public Registry of Commerce.\n- Tax ID (RFC) registration and the company's e.firma.\n- Municipal business license, depending on the activity and address.\n- Employer registration with the IMSS if you will hire staff.",
  },
  {
    slug: "despido-lo-que-debe-saber-el-patron",
    locale: "es",
    titulo: "Terminar una relación laboral: lo que debe saber el patrón",
    extracto: "Los errores más comunes al despedir a un trabajador y cómo evitar que se conviertan en un juicio.",
    area: "laboral",
    autor: "eduardo-navarro-lomeli",
    fecha: "2026-08-20",
    lectura: 6,
    portada: "/img/blog-laboral.jpg",
    cuerpo: "La mayoría de los juicios laborales que pierden las empresas no se pierden por el fondo del asunto, sino por errores de forma al terminar la relación.\n\n## Rescisión con causa justificada\n\nSi existe una causa prevista en la Ley Federal del Trabajo, el patrón debe entregar un aviso por escrito que señale claramente la conducta y la fecha en que ocurrió. Sin ese aviso, el despido se presume injustificado.\n\n## Terminación sin causa\n\nCuando no hay causa, lo recomendable es negociar la terminación y pagar lo que corresponde conforme a la ley, formalizando el convenio para darle certeza a ambas partes.\n\n## La etapa de conciliación\n\nAntes de llegar a un tribunal, las partes deben acudir a la conciliación prejudicial. Llegar preparado a esa audiencia es la mejor oportunidad para cerrar el asunto con un costo razonable.",
  },
  {
    slug: "despido-lo-que-debe-saber-el-patron",
    locale: "en",
    titulo: "Ending an employment relationship: what employers should know",
    extracto: "The most common mistakes when dismissing an employee and how to keep them from turning into a lawsuit.",
    area: "laboral",
    autor: "eduardo-navarro-lomeli",
    fecha: "2026-08-20",
    lectura: 6,
    portada: "/img/blog-laboral.jpg",
    cuerpo: "Most labor lawsuits that companies lose are not lost on the merits, but because of procedural mistakes when ending the relationship.\n\n## Termination for cause\n\nIf there is a cause provided by the Federal Labor Law, the employer must deliver a written notice that clearly states the conduct and the date it occurred. Without that notice, the dismissal is presumed unjustified.\n\n## Termination without cause\n\nWhen there is no cause, the recommended route is to negotiate the termination and pay what the law requires, formalizing the settlement to give both parties certainty.\n\n## The conciliation stage\n\nBefore reaching a court, the parties must attend pre-trial conciliation. Arriving well prepared at that hearing is the best opportunity to close the matter at a reasonable cost.",
  },
  {
    slug: "divorcio-en-jalisco-guia",
    locale: "es",
    titulo: "Divorcio en Jalisco: cómo funciona y cuánto tarda",
    extracto: "Qué es el divorcio incausado, qué se discute en el juicio y cómo proteger a tus hijos y tu patrimonio.",
    area: "familiar-y-sucesiones",
    autor: "andrea-camarena-robles",
    fecha: "2026-08-05",
    lectura: 6,
    portada: "/img/blog-divorcio.jpg",
    cuerpo: "Hoy basta con la voluntad de uno de los cónyuges para solicitar el divorcio. No es necesario demostrar una causa ni obtener el consentimiento del otro.\n\n## Qué se resuelve en el juicio\n\n- Guarda y custodia de los hijos menores.\n- Régimen de convivencias.\n- Pensión alimenticia.\n- Liquidación de la sociedad conyugal, si existe.\n\n## ¿Cuánto tarda?\n\nSi hay acuerdo sobre las consecuencias, el proceso puede ser relativamente ágil. Cuando hay desacuerdo en custodia, alimentos o bienes, esos temas se discuten en un procedimiento que puede extenderse varios meses.\n\nUn buen convenio, negociado con asesoría, suele ser el camino más rápido y menos desgastante para todos.",
  },
  {
    slug: "divorcio-en-jalisco-guia",
    locale: "en",
    titulo: "Divorce in Jalisco: how it works and how long it takes",
    extracto: "What no-fault divorce is, what is decided in court and how to protect your children and your assets.",
    area: "familiar-y-sucesiones",
    autor: "andrea-camarena-robles",
    fecha: "2026-08-05",
    lectura: 6,
    portada: "/img/blog-divorcio.jpg",
    cuerpo: "Today the will of one spouse is enough to request a divorce. There is no need to prove a cause or obtain the other spouse's consent.\n\n## What the court decides\n\n- Custody of minor children.\n- Visitation arrangements.\n- Child and spousal support.\n- Division of marital property, if applicable.\n\n## How long does it take?\n\nIf there is agreement on these points, the process can be relatively quick. When there is disagreement on custody, support or property, those issues are decided in a proceeding that can take several months.\n\nA good settlement, negotiated with advice, is usually the fastest and least draining path for everyone.",
  },
  {
    slug: "que-es-un-amparo-y-cuando-conviene",
    locale: "es",
    titulo: "Qué es un amparo y cuándo conviene promoverlo",
    extracto: "La herramienta más poderosa frente a actos de autoridad, explicada sin tecnicismos.",
    area: "amparo-y-constitucional",
    autor: "mariana-arriaga-cortes",
    fecha: "2026-07-22",
    lectura: 5,
    portada: "/img/blog-amparo.jpg",
    cuerpo: "El juicio de amparo protege a las personas frente a actos de autoridad que violan sus derechos humanos o sus garantías. Puede promoverse contra leyes, resoluciones administrativas, sentencias y otros actos.\n\n## Amparo indirecto y directo\n\nEl amparo indirecto se promueve ante un Juez de Distrito, por ejemplo contra una clausura o una ley. El amparo directo se promueve contra sentencias definitivas y lo resuelve un Tribunal Colegiado.\n\n## La suspensión\n\nUna de sus ventajas es la suspensión, que detiene temporalmente los efectos del acto mientras se resuelve el juicio. En asuntos urgentes, puede ser decisiva.\n\n## Los plazos importan\n\nEl plazo general para promoverlo es de 15 días hábiles, con excepciones. Consultar a tiempo es fundamental.",
  },
  {
    slug: "que-es-un-amparo-y-cuando-conviene",
    locale: "en",
    titulo: "What an amparo is and when to file one",
    extracto: "The most powerful tool against government actions, explained without jargon.",
    area: "amparo-y-constitucional",
    autor: "mariana-arriaga-cortes",
    fecha: "2026-07-22",
    lectura: 5,
    portada: "/img/blog-amparo.jpg",
    cuerpo: "The amparo lawsuit protects people against government actions that violate their human rights or constitutional guarantees. It can be filed against laws, administrative rulings, judgments and other acts.\n\n## Indirect and direct amparo\n\nIndirect amparo is filed before a District Judge, for example against a closure order or a law. Direct amparo is filed against final judgments and is decided by a Collegiate Court.\n\n## The suspension\n\nOne of its advantages is the suspension, which temporarily stops the effects of the act while the case is decided. In urgent matters it can be decisive.\n\n## Deadlines matter\n\nThe general deadline to file is 15 business days, with exceptions. Consulting in time is essential.",
  },
  {
    slug: "como-registrar-una-marca-ante-el-impi",
    locale: "es",
    titulo: "Cómo registrar una marca ante el IMPI paso a paso",
    extracto: "Antes de invertir en tu marca, asegúrate de que sea tuya. Los pasos para registrarla en México.",
    area: "propiedad-intelectual",
    autor: "emilio-cervantes-topete",
    fecha: "2026-07-08",
    lectura: 4,
    portada: "/img/blog-marca.jpg",
    cuerpo: "Usar una marca no te da derechos exclusivos sobre ella. En México, la protección se obtiene con el registro ante el Instituto Mexicano de la Propiedad Industrial (IMPI).\n\n## Pasos básicos\n\n- Búsqueda de anterioridades para confirmar que la marca está disponible.\n- Definir las clases de productos o servicios que vas a proteger.\n- Presentar la solicitud y pagar los derechos.\n- Atender el examen de forma y de fondo, y en su caso las oposiciones.\n\nEl registro tiene una vigencia de 10 años, renovable, y exige demostrar el uso de la marca en los plazos que marca la ley.",
  },
  {
    slug: "como-registrar-una-marca-ante-el-impi",
    locale: "en",
    titulo: "How to register a trademark with IMPI, step by step",
    extracto: "Before investing in your brand, make sure it is yours. The steps to register it in Mexico.",
    area: "propiedad-intelectual",
    autor: "emilio-cervantes-topete",
    fecha: "2026-07-08",
    lectura: 4,
    portada: "/img/blog-marca.jpg",
    cuerpo: "Using a brand does not give you exclusive rights to it. In Mexico, protection comes from registration with the Mexican Institute of Industrial Property (IMPI).\n\n## Basic steps\n\n- Clearance search to confirm the brand is available.\n- Define the classes of goods or services you will protect.\n- File the application and pay the fees.\n- Respond to the formal and substantive examination and, if any, oppositions.\n\nThe registration lasts 10 years, is renewable, and requires proof of use within the periods set by law.",
  },
];

export function formatoFecha(iso: string, locale: Locale = "es") {
  return new Date(iso + "T12:00:00").toLocaleDateString(locale === "en" ? "en-US" : "es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
