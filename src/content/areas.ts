export type AreaIcono =
  | "corporativo"
  | "litigio"
  | "amparo"
  | "laboral"
  | "fiscal"
  | "familiar"
  | "penal"
  | "inmobiliario"
  | "pi";

export type Area = {
  slug: string;
  nombre: string;
  icono: AreaIcono;
  resumen: string;
  tarjeta: string;
  intro: string;
  servicios: string[];
  escenarios: { titulo: string; texto: string }[];
  faqs: { pregunta: string; respuesta: string }[];
};

export const areas: Area[] = [
  {
    slug: "corporativo-y-mercantil",
    nombre: "Corporativo y Mercantil",
    icono: "corporativo",
    resumen: "Estructura legal sólida para que tu empresa crezca sin sorpresas.",
    tarjeta:
      "Constitución de sociedades, contratos comerciales, acuerdos entre socios, fusiones y adquisiciones.",
    intro:
      "Acompañamos a empresas nacionales y extranjeras en cada etapa de su vida corporativa: desde la constitución y el gobierno corporativo hasta la entrada de inversionistas, la compraventa de empresas y los contratos que sostienen su operación diaria.",
    servicios: [
      "Constitución de sociedades (S.A. de C.V., S.A.P.I., S. de R.L., S.A.S.)",
      "Asambleas, actas y libros corporativos",
      "Contratos comerciales y de distribución",
      "Acuerdos entre socios y accionistas",
      "Fusiones, escisiones y adquisiciones",
      "Due diligence legal",
      "Gobierno corporativo",
      "Franquicias",
    ],
    escenarios: [
      { titulo: "Vas a iniciar un negocio con socios", texto: "Definir desde el inicio aportaciones, control y salida evita los conflictos más costosos." },
      { titulo: "Entra un inversionista", texto: "Negociamos la ronda y cuidamos tus derechos de voto, dilución y salida." },
      { titulo: "Vas a comprar o vender una empresa", texto: "Revisamos contingencias antes de firmar y estructuramos la operación." },
    ],
    faqs: [
      { pregunta: "¿Qué tipo de sociedad me conviene?", respuesta: "Depende del número de socios, del plan de inversión y de cómo se van a tomar decisiones. La S.A.S. es ágil para empresas pequeñas; la S.A. de C.V. y la S.A.P.I. dan más flexibilidad para crecer y recibir inversión. Lo definimos contigo en la primera consulta." },
      { pregunta: "¿Cuánto tarda constituir una empresa?", respuesta: "Una S.A.S. puede constituirse en pocos días en línea. Una S.A. de C.V. ante notario o corredor público suele tomar de una a tres semanas, según la disponibilidad de documentos." },
      { pregunta: "¿Pueden llevar los libros corporativos de mi empresa?", respuesta: "Sí. Llevamos asambleas anuales, libros de registro de accionistas y actas, para que la empresa esté siempre en orden ante bancos, auditores e inversionistas." },
    ],
  },
  {
    slug: "litigio-civil-y-mercantil",
    nombre: "Litigio Civil y Mercantil",
    icono: "litigio",
    resumen: "Estrategia procesal para defender tus intereses ante los tribunales.",
    tarjeta:
      "Juicios ordinarios y ejecutivos, cobranza, incumplimiento de contratos, arrendamiento y arbitraje.",
    intro:
      "Diseñamos cada juicio como una estrategia, no como un trámite. Evaluamos primero si conviene negociar, conciliar o litigar, y cuando vamos a juicio lo hacemos con preparación rigurosa en tribunales locales y federales.",
    servicios: [
      "Juicios ordinarios y ejecutivos mercantiles",
      "Juicios orales mercantiles",
      "Cobranza judicial y extrajudicial",
      "Incumplimiento de contratos",
      "Controversias de arrendamiento",
      "Medios alternativos de solución de controversias",
      "Arbitraje comercial",
    ],
    escenarios: [
      { titulo: "Un cliente no te paga", texto: "Revisamos tus títulos y contratos para elegir la vía de cobro más rápida." },
      { titulo: "Te demandaron", texto: "Los plazos para contestar son cortos; actuar el primer día cambia el resultado." },
      { titulo: "Un contrato se incumplió", texto: "Analizamos si conviene exigir el cumplimiento, rescindir o negociar." },
    ],
    faqs: [
      { pregunta: "¿Cuánto dura un juicio mercantil?", respuesta: "Varía mucho según la vía, el tribunal y la actitud de la contraparte. Un juicio oral mercantil puede resolverse en meses; un ordinario con apelación y amparo puede tomar más de un año. En el diagnóstico te damos un estimado realista." },
      { pregunta: "¿Siempre es necesario ir a juicio?", respuesta: "No. Muchos asuntos se resuelven con una negociación bien planteada o mediante conciliación. Recomendamos el juicio cuando es la mejor herramienta, no por defecto." },
      { pregunta: "¿Cómo cobran los juicios?", respuesta: "Según el asunto: por etapas procesales, por iguala o con un componente de éxito. Siempre te entregamos la propuesta por escrito antes de iniciar." },
    ],
  },
  {
    slug: "amparo-y-constitucional",
    nombre: "Amparo y Constitucional",
    icono: "amparo",
    resumen: "Defensa de tus derechos frente a actos de autoridad.",
    tarjeta:
      "Amparo directo e indirecto, amparo contra leyes, suspensiones urgentes y recursos ante la SCJN.",
    intro:
      "El juicio de amparo es la herramienta más poderosa para defenderte de un acto de autoridad que viola tus derechos. Lo promovemos en materia administrativa, fiscal, penal y civil, con especial atención a las suspensiones urgentes.",
    servicios: [
      "Amparo indirecto y directo",
      "Amparo contra leyes",
      "Amparo en materia fiscal y administrativa",
      "Amparo en materia penal",
      "Suspensiones urgentes",
      "Recursos ante Tribunales Colegiados y la SCJN",
    ],
    escenarios: [
      { titulo: "Una autoridad clausuró tu negocio", texto: "Una suspensión a tiempo puede permitirte seguir operando mientras se resuelve." },
      { titulo: "Una ley nueva te afecta", texto: "El amparo contra leyes tiene plazos específicos desde su entrada en vigor." },
      { titulo: "Perdiste un juicio y crees que hubo violaciones", texto: "El amparo directo permite revisar la sentencia definitiva." },
    ],
    faqs: [
      { pregunta: "¿Cuánto tiempo tengo para promover un amparo?", respuesta: "El plazo general es de 15 días hábiles, aunque hay excepciones y plazos distintos según el acto reclamado. Por eso conviene consultar de inmediato." },
      { pregunta: "¿Qué es la suspensión?", respuesta: "Es una medida que detiene temporalmente los efectos del acto de autoridad mientras se resuelve el amparo, para evitar daños difíciles de reparar." },
    ],
  },
  {
    slug: "laboral",
    nombre: "Laboral",
    icono: "laboral",
    resumen: "Relaciones laborales en orden y defensa patronal con estrategia.",
    tarjeta:
      "Asesoría preventiva, contratos, terminaciones, conciliación y juicios ante Tribunales Laborales.",
    intro:
      "Asesoramos a empresas de manufactura, tecnología y servicios en todo el ciclo de la relación laboral. Nuestro enfoque es preventivo: contratos, reglamentos y procesos claros reducen los conflictos, y cuando llegan, los enfrentamos con estrategia.",
    servicios: [
      "Asesoría laboral preventiva",
      "Contratos individuales y colectivos",
      "Reglamentos interiores de trabajo",
      "Terminaciones y reestructuras de plantilla",
      "Conciliación ante los Centros de Conciliación",
      "Juicios ante Tribunales Laborales",
      "NOM-035 y cumplimiento",
      "REPSE y servicios especializados",
    ],
    escenarios: [
      { titulo: "Necesitas terminar una relación laboral", texto: "Te ayudamos a hacerlo correctamente y a documentar cada paso." },
      { titulo: "Recibiste un citatorio de conciliación", texto: "La etapa de conciliación es la mejor oportunidad para cerrar el asunto." },
      { titulo: "Vas a reestructurar tu plantilla", texto: "Planeamos el proceso por etapas para reducir riesgos y costos." },
    ],
    faqs: [
      { pregunta: "¿Es obligatoria la conciliación?", respuesta: "Por regla general, sí: antes de acudir al Tribunal Laboral, las partes deben agotar la etapa de conciliación prejudicial ante el Centro de Conciliación correspondiente, salvo excepciones previstas en la ley." },
      { pregunta: "¿Atienden a trabajadores?", respuesta: "Nuestra práctica laboral está enfocada en empresas (lado patronal). Si eres trabajador, con gusto te orientamos sobre a quién acudir." },
    ],
  },
  {
    slug: "fiscal-y-administrativo",
    nombre: "Fiscal y Administrativo",
    icono: "fiscal",
    resumen: "Defensa ante el SAT y autoridades, con visión contable y jurídica.",
    tarjeta:
      "Auditorías del SAT, recursos, juicios ante el TFJA, devoluciones y planeación fiscal.",
    intro:
      "Combinamos la visión contable y la jurídica para defender a empresas y personas frente al SAT y a las autoridades estatales y municipales, y para planear con anticipación y evitar contingencias.",
    servicios: [
      "Defensa en auditorías y revisiones del SAT",
      "Recursos de revocación",
      "Juicio contencioso administrativo (TFJA)",
      "Devoluciones de IVA",
      "Planeación fiscal",
      "Créditos fiscales",
      "Licencias, clausuras y multas municipales y estatales",
    ],
    escenarios: [
      { titulo: "El SAT te envió una carta invitación", texto: "Responder bien a tiempo puede evitar una auditoría formal." },
      { titulo: "Te determinaron un crédito fiscal", texto: "Hay plazos cortos para impugnarlo; revisamos cada fundamento." },
      { titulo: "Te negaron una devolución", texto: "Analizamos la resolución y la vía para recuperar tu saldo a favor." },
    ],
    faqs: [
      { pregunta: "¿Qué hago si me llega una carta invitación del SAT?", respuesta: "No la ignores. No es una auditoría, pero sí una señal de que el SAT detectó una posible diferencia. Revisamos tu información y te ayudamos a aclararla o corregirla." },
      { pregunta: "¿Cuánto tiempo tengo para impugnar una resolución del SAT?", respuesta: "Depende del medio de defensa; en general los plazos van de 30 días hábiles para el juicio de nulidad a los señalados para el recurso de revocación. Consulta lo antes posible." },
    ],
  },
  {
    slug: "familiar-y-sucesiones",
    nombre: "Familiar y Sucesiones",
    icono: "familiar",
    resumen: "Acompañamiento sensible y firme en los momentos más personales.",
    tarjeta:
      "Divorcios, pensión alimenticia, guarda y custodia, testamentos y juicios sucesorios.",
    intro:
      "Los asuntos familiares requieren conocimiento técnico y sensibilidad. Buscamos acuerdos que protejan a la familia, especialmente a los hijos, y cuando no es posible, defendemos tus derechos con firmeza.",
    servicios: [
      "Divorcio incausado y por mutuo acuerdo",
      "Pensión alimenticia",
      "Guarda, custodia y convivencias",
      "Testamentos",
      "Juicios sucesorios (testamentarios e intestamentarios)",
      "Protección patrimonial familiar",
    ],
    escenarios: [
      { titulo: "Estás considerando divorciarte", texto: "Te explicamos opciones, tiempos y cómo proteger a tus hijos y tu patrimonio." },
      { titulo: "Falleció un familiar sin testamento", texto: "Te guiamos en el juicio sucesorio para regularizar los bienes." },
      { titulo: "Quieres ordenar tu patrimonio", texto: "Un testamento bien hecho evita conflictos entre tus herederos." },
    ],
    faqs: [
      { pregunta: "¿Necesito el consentimiento de mi pareja para divorciarme?", respuesta: "No. Basta con la voluntad de uno de los cónyuges para solicitar el divorcio. Lo que se discute en el juicio son las consecuencias: custodia, alimentos y bienes." },
      { pregunta: "¿Qué pasa si alguien fallece sin testamento?", respuesta: "Se tramita un juicio sucesorio intestamentario, en el que la ley define quiénes heredan. Puede llevarse ante juez o, en algunos casos, ante notario." },
    ],
  },
  {
    slug: "penal",
    nombre: "Penal",
    icono: "penal",
    resumen: "Defensa penal y asesoría a víctimas en el sistema acusatorio.",
    tarjeta:
      "Defensa penal, asesoría a víctimas, delitos patrimoniales y fiscales, y compliance penal.",
    intro:
      "Brindamos defensa técnica y asesoría a víctimas en el sistema penal acusatorio, con especial experiencia en delitos patrimoniales, fiscales y aquellos que involucran a empresas. También diseñamos programas de compliance penal corporativo.",
    servicios: [
      "Defensa penal en el sistema acusatorio",
      "Asesoría jurídica a víctimas",
      "Delitos patrimoniales",
      "Delitos fiscales",
      "Responsabilidad penal de personas morales",
      "Compliance penal corporativo",
    ],
    escenarios: [
      { titulo: "Recibiste un citatorio del Ministerio Público", texto: "No acudas sin asesoría; lo que declares puede usarse en el proceso." },
      { titulo: "Fuiste víctima de un fraude", texto: "Presentamos la denuncia y damos seguimiento para buscar la reparación del daño." },
      { titulo: "Tu empresa quiere prevenir riesgos penales", texto: "Implementamos controles para reducir la responsabilidad penal corporativa." },
    ],
    faqs: [
      { pregunta: "¿Atienden urgencias?", respuesta: "Sí, contamos con atención para asuntos penales urgentes. Llámanos directamente para que un abogado del área te atienda." },
      { pregunta: "¿Qué es el compliance penal?", respuesta: "Es un conjunto de controles internos que ayudan a prevenir delitos dentro de la empresa y que pueden atenuar su responsabilidad penal." },
    ],
  },
  {
    slug: "inmobiliario",
    nombre: "Inmobiliario",
    icono: "inmobiliario",
    resumen: "Seguridad jurídica en cada operación inmobiliaria.",
    tarjeta:
      "Compraventas, revisión de títulos, regularización de predios, condominios y fideicomisos.",
    intro:
      "Revisamos cada inmueble antes de que firmes. Asesoramos a particulares, desarrolladores e inversionistas en compraventas, desarrollos, condominios y trámites de uso de suelo en Guadalajara, Zapopan y toda la zona metropolitana.",
    servicios: [
      "Compraventa de inmuebles",
      "Revisión de títulos y gravámenes",
      "Regularización de predios",
      "Régimen de condominio",
      "Contratos de obra",
      "Fideicomisos inmobiliarios",
      "Uso de suelo y licencias",
    ],
    escenarios: [
      { titulo: "Vas a comprar una casa o terreno", texto: "Revisamos la escritura, gravámenes y adeudos antes de que pagues." },
      { titulo: "Estás desarrollando un proyecto", texto: "Te acompañamos en licencias, régimen de condominio y ventas." },
      { titulo: "Tu propiedad no está regularizada", texto: "Buscamos la vía para darte certeza jurídica sobre tu patrimonio." },
    ],
    faqs: [
      { pregunta: "¿Qué documentos debo revisar antes de comprar?", respuesta: "Como mínimo: escritura, certificado de libertad de gravámenes, pagos de predial y agua, y la identidad y capacidad del vendedor. En condominios, también el reglamento y las cuotas." },
    ],
  },
  {
    slug: "propiedad-intelectual",
    nombre: "Propiedad Intelectual",
    icono: "pi",
    resumen: "Protege tu marca, tu software y tus ideas.",
    tarjeta:
      "Registro de marcas ante el IMPI, derechos de autor, contratos de software y protección de datos.",
    intro:
      "Ayudamos a empresas y creadores a proteger sus activos intangibles: marcas, obras, software y datos. También redactamos los contratos y documentos legales que necesita una empresa digital.",
    servicios: [
      "Registro de marcas ante el IMPI",
      "Oposiciones y defensa de marcas",
      "Derechos de autor (INDAUTOR)",
      "Contratos de licencia y desarrollo de software",
      "Avisos de privacidad y protección de datos",
      "Términos y condiciones para plataformas digitales",
    ],
    escenarios: [
      { titulo: "Estás lanzando una marca", texto: "Verificamos que esté disponible antes de invertir en ella." },
      { titulo: "Alguien usa tu marca sin permiso", texto: "Evaluamos las acciones ante el IMPI para detener el uso." },
      { titulo: "Contratas desarrollo de software", texto: "Aseguramos que el código y los derechos queden a tu nombre." },
    ],
    faqs: [
      { pregunta: "¿Cuánto tiempo protege el registro de una marca?", respuesta: "El registro tiene una vigencia de 10 años y puede renovarse por periodos iguales, siempre que se cumplan las obligaciones de uso." },
    ],
  },
];

export function getArea(slug: string) {
  return areas.find((a) => a.slug === slug);
}
