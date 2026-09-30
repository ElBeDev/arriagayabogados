# BRIEF DE DESARROLLO WEB | ARRIAGA & ABOGADOS

> **Nota importante:** el nombre **Arriaga & Abogados** y el dominio `arriagayabogados.com` son definitivos (el dominio ya está comprado). Los integrantes, las biografías, la dirección, los teléfonos, las cifras, los testimonios y las fotos del sitio son **provisionales**: sirven de punto de partida y hay que reemplazarlos por los datos reales del cliente antes de promocionar el sitio. Las cédulas profesionales, sobre todo, **tienen que ser reales y verificables**. Ver [Información pendiente del cliente](#-información-pendiente-del-cliente).

---

## 📍 ESTADO ACTUAL (2026-09-27)

| | |
|---|---|
| **Sitio en línea** | **https://arriagayabogados.com** (HTTPS activo; `www` redirige al dominio principal) · también en https://arriagayabogados.vercel.app |
| **Panel** | `/admin` (usuario `admin`; contraseña en las variables de entorno de Vercel) |
| **Repositorio** | https://github.com/ElBeDev/arriagayabogados (cada push a `main` publica) |
| **Idiomas** | Español (`/`) e inglés (`/en`) completos |
| **Contenido** | De ejemplo (equipo, cifras, testimonios y fotos de stock) |

**Terminado:** marca y logo, diseño, 16 páginas en dos idiomas, panel de administración, base de datos, formulario con asignación automática, SEO técnico, seguridad, pruebas de punta a punta y publicación en Vercel.

**Pendiente:**
1. Cuentas y llaves reales: Resend (correo), Google Analytics 4, Cloudflare Turnstile y Cal.com.
2. Contenido real del cliente: equipo, cédulas, fotos, cifras, testimonios autorizados y datos de contacto.
3. Revisión del inglés por un socio bilingüe y validación de los textos legales por la firma.
4. Google Search Console y Google Business Profile.

---

## 📋 INFORMACIÓN GENERAL DEL PROYECTO

**Cliente:** Arriaga & Abogados, S.C.
**Giro:** Firma de abogados de servicio integral (despacho con socios y asociados)
**Ubicación:** Guadalajara, Jalisco (Zona Metropolitana: Guadalajara, Zapopan, Tlaquepaque, Tonalá, Tlajomulco)
**Dominio:** `arriagayabogados.com` ✅ comprado (Hostinger). Libres para proteger la marca (recomendado comprarlos y redirigirlos): `arriagayabogados.mx` y `arriagayabogados.com.mx`.
**Fundación:** 2006
**Idiomas del sitio:** Español (principal) + Inglés (para empresas extranjeras con operación en Jalisco: manufactura, tecnología, agroindustria)

**Objetivo del sitio:**
1. Transmitir **solidez, experiencia y confianza**: que un director de empresa o una familia sientan que están en buenas manos antes de llamar.
2. **Generar consultas calificadas** (formulario, WhatsApp, agenda de cita) y medir de dónde vienen.
3. **Posicionar en Google** para búsquedas locales ("abogados en Guadalajara", "abogado laboral Zapopan", "amparo Guadalajara", etc.).
4. Presentar al **equipo** (socios y asociados) con perfiles individuales que refuercen la autoridad de la firma.
5. Tener un canal de **contenido propio** (análisis, reformas, guías) que demuestre conocimiento y alimente el SEO.

**Tono y percepción:** Sobrio, profesional, cercano sin ser informal. Serio pero no frío. Que se sienta como una firma **tapatía con alcance nacional**: con raíz local y estándares de firma grande.

**Público objetivo:**

| Segmento | Qué busca | Qué necesita ver en el sitio |
|----------|-----------|------------------------------|
| **Empresas medianas y grandes** (directores, gerentes de RH, CFOs) | Asesoría corporativa, laboral patronal, fiscal, contratos | Áreas de práctica claras, experiencia sectorial, equipo senior, versión en inglés |
| **Empresas extranjeras con operación en Jalisco** | Constitución de sociedades, cumplimiento, laboral | Sitio en inglés, socios bilingües, contacto directo |
| **Emprendedores y PyMEs** | Constituir empresa, contratos, registro de marca | Proceso sencillo, primera consulta clara |
| **Personas físicas y familias** | Divorcio, pensiones, sucesiones, inmuebles, defensa penal, amparo | Lenguaje claro, confidencialidad, respuesta rápida, WhatsApp |

---

## 🏛️ IDENTIDAD DE LA FIRMA (contenido provisional)

### Nombre
**Arriaga & Abogados**
- Isotipo: **A&**
- Razón social: Arriaga & Abogados, S.C.
- Dominio: `arriagayabogados.com`

**Por qué funciona:** dice a primera vista que es una firma de abogados, y el apellido le da el peso de una firma tradicional. Tiene una historia propia: *Arriaga*, por su fundadora, y *Abogados*, por cada persona del equipo que respalda cada asunto. Arriaga no lleva ñ ni acentos, así que el dominio se lee igual que el nombre.

> ⚠️ Antes de promocionar el sitio, buscar "Arriaga & Abogados" en el IMPI para confirmar que no esté registrada como marca en la clase 45 (servicios jurídicos), y valorar registrarla.

### Slogan
- **Español:** "Criterio que protege lo que has construido." (en uso)
- **Inglés:** "Judgment that protects what you have built." (en uso)
- Alternativas: "Estrategia legal con raíz en Jalisco." · "Defensa sólida. Asesoría clara."

### Historia (página "La Firma")
> Arriaga & Abogados nació en 2006 en Guadalajara, cuando la Lic. Mariana Arriaga Cortés, junto con el Lic. Ricardo Villaseñor Ochoa, después de casi una década litigando en firmas de la Ciudad de México y Monterrey, decidió regresar a Jalisco con una idea clara: que las empresas y familias de Occidente tuvieran acceso a asesoría legal del mismo nivel que las grandes firmas nacionales, pero con trato directo con los socios.
>
> El nombre lo dice todo: Arriaga, por su fundadora, y Abogados, por cada una de las personas que respaldan cada asunto. La firma nunca ha sido de una sola persona, sino de un equipo.
>
> Empezamos con una oficina de tres personas en la colonia Americana. Hoy somos un equipo de más de 20 profesionales entre socios, asociados, pasantes y personal de apoyo, con oficinas en Providencia y asuntos en tribunales de todo el país.
>
> Más de 20 años después, seguimos creyendo lo mismo: **cada asunto merece la atención de alguien que conozca el caso a fondo**, que hable claro sobre los riesgos y que responda cuando el cliente lo necesita.

Los textos de la firma (historia, misión, visión, valores, diferenciadores y pasos del proceso) están en español e inglés en `src/content/firma.ts`.

### Misión
Proteger el patrimonio, la operación y la tranquilidad de nuestros clientes con asesoría legal estratégica, honesta y oportuna.

### Visión
Ser la firma de referencia en el Occidente de México por la calidad técnica de nuestro trabajo y la confianza de nuestros clientes.

### Valores
| Valor | Descripción para el sitio |
|-------|---------------------------|
| **Integridad** | Decimos lo que el cliente necesita escuchar, no lo que quiere escuchar. |
| **Confidencialidad** | El secreto profesional es la base de nuestra relación con cada cliente. |
| **Rigor técnico** | Cada estrategia se sustenta en estudio, jurisprudencia y experiencia. |
| **Cercanía** | Los socios participan directamente en cada asunto. |
| **Oportunidad** | Respondemos a tiempo, porque en derecho los plazos lo son todo. |

### Diferenciadores (acordeón de la home)
Trato directo con socios · Visión integral · Comunicación clara · Raíz local, alcance nacional.

### Cifras (editables en `/admin/configuracion`)
- **20+** años de trayectoria · **2,500+** asuntos atendidos · **9** áreas de práctica · **300+** empresas asesoradas

> ⚠️ **No publicar "% de casos ganados" ni prometer resultados.** Va contra el Código de Ética de la Barra Mexicana, Colegio de Abogados, y puede generar problemas con PROFECO por publicidad engañosa. Las cifras deben ser de volumen y experiencia, nunca de resultado. Las actuales son provisionales.

### Datos de contacto (provisionales, editables en `/admin/configuracion`)
- **Dirección:** Av. Pablo Neruda 2890, Piso 9, Col. Providencia 4a. Sección, C.P. 44639, Guadalajara, Jalisco
- **Teléfono:** (33) 0000 0000 · **WhatsApp:** 52 33 0000 0000
- **Correo:** contacto@arriagayabogados.com
- **Horario:** Lunes a viernes 9:00 a 19:00 h · Sábados 10:00 a 14:00 h (con cita)
- **Por confirmar con el cliente:** si ofrecen atención urgente 24/7 (penal / detenciones)
- **Redes:** LinkedIn (prioridad), Facebook, Instagram (enlaces genéricos por ahora en `src/content/firma.ts`)

---

## 👥 EQUIPO (contenido provisional)

> Cada integrante tiene su **página de perfil** (`/equipo/[slug]`) con foto, cargo, áreas, biografía, formación, idiomas, cédula profesional (con enlace de verificación al RNP), correo, sus publicaciones y el formulario de consulta con su área preseleccionada. Todo en español e inglés, editable en `/admin/equipo`.

### Socios

#### Lic. Mariana Arriaga Cortés, Socia Directora · Fundadora
- **Áreas:** Litigio Civil y Mercantil, Amparo y Constitucional
- **Formación:** Licenciatura en Derecho, ITESO · Especialidad en Amparo, Escuela Libre de Derecho · Maestría en Derecho Procesal Constitucional
- **Idiomas:** Español, Inglés
- **Bio:** Fundadora y Socia Directora. Litigante con más de 22 años de experiencia ante tribunales locales y federales. Ha dirigido juicios mercantiles de alta cuantía y amparos en materia administrativa y fiscal ante Tribunales Colegiados y la SCJN.

#### Lic. Ricardo Villaseñor Ochoa, Socio Fundador
- **Áreas:** Corporativo y Mercantil
- **Formación:** Licenciatura en Derecho, Universidad de Guadalajara · Maestría en Derecho Corporativo, Universidad Panamericana · LL.M., University of Texas at Austin
- **Idiomas:** Español, Inglés
- **Bio:** Más de 25 años asesorando a empresas nacionales y extranjeras en su estructura corporativa, compraventa de empresas, contratos comerciales y gobierno corporativo. Cofundador; coordina la práctica corporativa y la relación con clientes internacionales.

#### Lic. Eduardo Navarro Lomelí, Socio
- **Áreas:** Laboral (patronal)
- **Formación:** Licenciatura en Derecho, Universidad Autónoma de Guadalajara · Maestría en Derecho del Trabajo, UNAM
- **Bio:** Relaciones laborales, reestructuras de plantilla, contratos colectivos, REPSE y defensa ante Centros de Conciliación y Tribunales Laborales.

#### C.P. y Lic. Daniela Fregoso Ruvalcaba, Socia
- **Áreas:** Fiscal y Administrativo
- **Formación:** Contaduría Pública y Licenciatura en Derecho, Tecnológico de Monterrey, Campus Guadalajara · Maestría en Impuestos, ITAM
- **Bio:** Defensa en auditorías del SAT, recursos administrativos y juicios ante el TFJA; planeación fiscal preventiva y comercio exterior.

### Of Counsel
#### Mtro. Héctor Zepeda Barba, Of Counsel
- **Áreas:** Penal, Compliance Penal Corporativo · Más de 30 años en el sistema de justicia penal.

### Asociados

| Nombre | Cargo | Área principal |
|--------|-------|----------------|
| Lic. Luis Fernando Gómez Plascencia | Asociado Senior | Litigio Civil y Mercantil |
| Lic. Andrea Camarena Robles | Asociada Senior | Familiar y Sucesiones |
| Lic. Jorge Iván Partida Núñez | Asociado | Penal |
| Lic. Sofía Anaya Delgadillo | Asociada | Inmobiliario |
| Lic. Emilio Cervantes Topete | Asociado | Propiedad Intelectual |
| Lic. Valeria Orozco Hernández | Asociada | Laboral |

**Orden del listado en `/equipo`:** Socios → Of Counsel → Asociados Senior → Asociados, con filtro por área de práctica. Las cédulas aparecen como "Por confirmar" hasta cargarlas en el panel.

---

## ⚖️ ÁREAS DE PRÁCTICA

Las 9 áreas viven en código (`src/content/areas.ts` y `areas.en.ts`) porque su contenido es estructurado (servicios, escenarios y preguntas frecuentes) y cambia poco. Cada una tiene su página (`/areas/[slug]`):
1. Hero con el resumen del área, su descripción corta y botón "Agenda una consulta"
2. "¿En qué te ayudamos?": introducción y lista de servicios en dos columnas
3. "¿Cuándo necesitas un abogado de [área]?": escenarios reales en acordeón
4. Equipo responsable (franja café con las tarjetas de los abogados del área)
5. Preguntas frecuentes (acordeón, con datos estructurados `FAQPage`)
6. Artículos relacionados
7. Formulario de consulta con el área ya seleccionada

| Área | Slug |
|------|------|
| Corporativo y Mercantil | `corporativo-y-mercantil` |
| Litigio Civil y Mercantil | `litigio-civil-y-mercantil` |
| Amparo y Constitucional | `amparo-y-constitucional` |
| Laboral (patronal) | `laboral` |
| Fiscal y Administrativo | `fiscal-y-administrativo` |
| Familiar y Sucesiones | `familiar-y-sucesiones` |
| Penal | `penal` |
| Inmobiliario | `inmobiliario` |
| Propiedad Intelectual | `propiedad-intelectual` |

**Servicios por área (resumen):**
- **Corporativo y Mercantil:** constitución de sociedades (S.A. de C.V., S.A.P.I., S. de R.L., S.A.S.), asambleas, contratos comerciales, acuerdos entre socios, fusiones y adquisiciones, due diligence, gobierno corporativo, franquicias.
- **Litigio Civil y Mercantil:** juicios ordinarios, ejecutivos y orales mercantiles, cobranza, incumplimiento de contratos, arrendamiento, medios alternativos, arbitraje.
- **Amparo y Constitucional:** amparo directo e indirecto, contra leyes, en materia fiscal, administrativa y penal, suspensiones urgentes, recursos ante Tribunales Colegiados y la SCJN.
- **Laboral:** asesoría preventiva, contratos, reglamentos, terminaciones y reestructuras, conciliación, juicios laborales, NOM-035, REPSE.
- **Fiscal y Administrativo:** auditorías del SAT, recursos de revocación, juicio de nulidad (TFJA), devoluciones de IVA, planeación fiscal, créditos fiscales, licencias, clausuras y multas.
- **Familiar y Sucesiones:** divorcio, pensión alimenticia, custodia y convivencias, testamentos, juicios sucesorios, protección patrimonial.
- **Penal:** defensa en el sistema acusatorio, asesoría a víctimas, delitos patrimoniales y fiscales, responsabilidad penal de personas morales, compliance penal.
- **Inmobiliario:** compraventas, revisión de títulos y gravámenes, regularización, condominios, contratos de obra, fideicomisos, uso de suelo.
- **Propiedad Intelectual:** marcas ante el IMPI, oposiciones, derechos de autor, contratos de software, avisos de privacidad, términos y condiciones.

---

## 🗺️ MAPA DEL SITIO

```
/                                  Inicio
/la-firma                          Historia, cifras, misión y visión, valores, oficinas
/areas                             Índice de áreas (lista con panel de detalle)
/areas/[slug]                      Página por área (9)
/equipo                            Equipo completo (con filtro por área)
/equipo/[slug]                     Perfil individual (11)
/publicaciones                     Artículos (uno destacado + el resto)
/publicaciones/[slug]              Artículo (6 por idioma)
/contacto                          Datos, formulario, calendario (Cal.com, si está configurado) y mapa
/carreras                          Programa de pasantes, asociados y personal de apoyo
/aviso-de-privacidad               Aviso de Privacidad integral (LFPDPPP)
/terminos                          Términos de uso
/aviso-legal                       La información no constituye asesoría legal
/logos                             Kit de logos para el equipo: todas las versiones en SVG/PNG, ZIP, colores y tipografías (no indexada; /marca redirige aquí)
/agendar                           Redirige a /contacto#agenda
/en/...                            Versión en inglés de todo lo anterior
/admin                             Panel (resumen, prospectos, publicaciones, testimonios, equipo, configuración)
/admin/prospectos-csv              Exportación de prospectos a CSV
/api/cron/limpiar-prospectos       Tarea diaria de conservación de datos (protegida)
/sitemap.xml · /robots.txt         Generados automáticamente
```

- **Menú principal:** Inicio · La Firma · Áreas (mega-menú con las 9) · Equipo · Publicaciones · Contacto · selector ES/EN · botón **Agenda una consulta**.
- **Footer:** logo y descripción · Enlaces (incluye Carreras) · Áreas · Contacto y redes · logotipo gigante · Aviso de Privacidad, Términos, Aviso legal y Preferencias de cookies · © Arriaga & Abogados, S.C.
- **Móvil:** menú a pantalla completa y barra fija inferior con **Llamar** y **WhatsApp**.
- **Fase 2:** página de sectores (industrias que atendemos).

---

## 🎯 PÁGINA DE INICIO (como está construida)

> El diseño parte de una plantilla editorial de referencia (tipo "LexCore") y se afinó con la skill **design-taste-frontend** en modo Preservar: se conservó la marca y el hero, y se quitaron patrones genéricos (encabezados divididos, etiquetas en todas las secciones, numeración decorativa, indicador de scroll).

1. **Hero** (centrado): etiqueta "Firma de abogados en Guadalajara · Desde 2006", H1 en mayúsculas "Criterio que protege lo que has construido", subtítulo de menos de 20 palabras y botón **Agenda una consulta**. Debajo, la escultura de la Justicia en bronce dentro de un marco de 1px, con la palabra gigante "ABOGADOS" ("LAWYERS" en inglés) detrás. La entrada se anima con CSS, sin esperar JavaScript.
2. **Manifiesto:** texto grande que se revela palabra por palabra al hacer scroll (de tenue a pleno).
3. **Cifras + foto a todo lo ancho:** 4 cifras con contador animado y una foto de biblioteca con una **muesca curva** donde se encaja el **sello de la marca**.
4. **La Firma:** etiqueta, título, texto y botón **Conócenos**; foto de la balanza y acordeón de los 4 diferenciadores.
5. **Áreas de práctica:** lista de las 9 áreas con **panel de detalle** (la fila activa se rellena de café) y botón **Todas las áreas**. En móvil, lista con descripción.
6. **Cómo trabajamos:** línea de tiempo con 4 pasos con icono: Escuchamos, Evaluamos, Proponemos, Acompañamos.
7. **Equipo** (el único bloque café de la página): carrusel de socios y Of Counsel, botón **Conoce al equipo**.
8. **Testimonios:** selector por iniciales y tarjeta café con la cita (máximo 3 líneas), autor y detalle.
9. **Publicaciones:** un artículo destacado grande y dos más pequeños, botón **Ver todas**.
10. **Agenda una consulta:** formulario a la izquierda y foto a la derecha.

**Páginas interiores:** hero con ruta de navegación, etiqueta, H1 en mayúsculas (máximo 2 líneas en escritorio), texto y botón apilados. La Firma usa la foto con muesca y sello; Carreras y Valores usan filas con título y texto; el artículo usa una columna de lectura de 720px y cierra con un bloque café para agendar.

---

## 📝 PUBLICACIONES / BLOG

**Publicados (español e inglés, con el mismo slug):**
1. Qué hacer si el SAT te envía una carta invitación
2. Cómo constituir una empresa en Guadalajara: pasos, costos y tiempos
3. Terminar una relación laboral: lo que debe saber el patrón
4. Divorcio en Jalisco: cómo funciona y cuánto tarda
5. Qué es un amparo y cuándo conviene promoverlo
6. Cómo registrar una marca ante el IMPI paso a paso

**Ideas para los siguientes:** intestado en Jalisco · compraventa de casa en Zapopan · la reforma judicial para quien litiga en Jalisco · REPSE: obligaciones vigentes.

**Cómo se publica:** desde `/admin/publicaciones`, en Markdown con vista previa, portada (subida a Vercel Blob), área, autor, fecha, minutos de lectura e idioma; borrador o publicado. El botón "Crear versión EN/ES" arranca la traducción. Si un artículo no tiene versión en inglés, `/en/...` muestra la versión en español.

**Formato de cada artículo:** autor enlazado a su perfil, área, fecha, minutos de lectura, aviso "Este contenido es informativo y no constituye asesoría legal" y bloque final para agendar. Objetivo: 2 artículos al mes.

---

## 🎨 IDENTIDAD VISUAL

### Concepto: "Nogal y cantera"
Cálido, editorial y sobrio: **fondo crema** con **café nogal** profundo, mucho espacio en blanco, **esquinas rectas**, líneas finas de 1px y fotografía de tonos cálidos. El café y el crema recuerdan la madera y la cantera del Centro de Guadalajara.

**Tema único claro:** el sitio siempre se ve con fondo crema, aunque el visitante tenga su sistema en modo oscuro (decisión del cliente). Las franjas café (equipo, footer, bloque final de artículos, menú móvil) son parte del diseño.

### Paleta
| Token | Nombre | HEX | Uso |
|-------|--------|-----|-----|
| `--nogal` | **Café Nogal** (primario) | `#412F0C` | Botones, franja de equipo, footer, fila o tarjeta activa |
| `--nogal-hover` | Nogal Profundo | `#2E2108` | Hover de botones |
| `--tinta` | **Espresso** | `#1E1304` | Títulos y texto principal |
| `--crema` | **Crema** | `#F8F4EB` | Fondo general y texto sobre café |
| `--crema-claro` | Crema Claro | `#FCF8F1` | Tarjetas, panel de áreas, aviso de cookies |
| `--crema-suave` | Crema Suave | `#C9BFA8` | Texto secundario sobre café |
| `--linea` | Línea | `#E8E4DB` | Bordes y divisores de 1px |
| `--fantasma` | Fantasma | `#E8E4D9` | Palabra gigante del hero |
| `--piedra` | **Gris Piedra** | `#6B665F` | Texto secundario, etiquetas, placeholders |
| `--revelado` | Gris Revelado | `#8C877E` | Texto aún no revelado (reserva) |
| `--arena` | Arena | `#8D8269` | Logotipo gigante del footer, comillas decorativas |
| `--laton` | **Latón** | `#A3895B` | El & del logo, iconos y detalles |
| `--error` | Error | `#B3261E` | Mensajes de error |
| — | Oro Claro | `#D4B98A` | El & del logo sobre café |

**Contraste (WCAG) verificado:** Espresso/crema 16.6:1 · Nogal/crema 11.7:1 · Crema suave/nogal 7.0:1 · Gris Piedra/crema 5.2:1. Latón y Arena solo en elementos decorativos o grandes.

### Tipografía
**DM Sans** en todo el sitio (cargada con `next/font`, autoalojada). **Instrument Serif Italic** solo para el & del logo.

| Elemento | Estilo | Tamaño (escritorio → móvil) |
|----------|--------|-----------------------------|
| H1 hero | Bold, MAYÚSCULAS, interlineado 1.05 | 60px → 36px |
| H1 interiores | Bold, MAYÚSCULAS | 48px → 32px |
| H1 artículo | Bold, MAYÚSCULAS | 40px → 28px |
| H2 de sección | Regular, interlineado 1.2 | 44px → 30px |
| Manifiesto | Regular | 40px → 26px |
| Cifras | Regular | 48px → 36px |
| Cuerpo | Regular, interlineado 1.6 | 16 a 18px (nunca menos de 16px) |
| Etiquetas (`// Sección`) | Regular | 13px |
| Botones | Medium | 14px |

> En español los H2 van en **tipo oración** ("Agenda una consulta con nuestro equipo"), no en *Title Case*. Las MAYÚSCULAS se reservan para los H1.

### Logo ✅
El isotipo **A&** une la **A** de Arriaga (DM Sans Bold) con el **&** de "& Abogados" (Instrument Serif Italic), que muerde la pierna de la A con un corte fino: la fundadora y el equipo, juntos. Evita los clichés del sector (balanzas, martillos, columnas).

| Pieza | Uso |
|-------|-----|
| Logo horizontal (isotipo + filete + logotipo) | Header, firmas de correo, documentos |
| Logo vertical (con "FIRMA LEGAL · GUADALAJARA") | Portadas, papelería, presentaciones |
| Isotipo A& | Favicon, redes sociales, marca de agua |
| Logotipo "Arriaga & Abogados" | Footer gigante |
| Sello circular ("ARRIAGA & ABOGADOS · GUADALAJARA · MMVI") | Muesca de la home, documentos, constancias |

- **Colores:** A en espresso y & en latón sobre claro; A en crema y & en oro claro sobre café.
- **Archivos:** `public/marca/` (SVG en trazos y PNG, versión normal y "-crema"), favicon `src/app/icon.svg`, `apple-icon.png`, imagen para redes 1200×630. Componentes React en `src/components/marca.tsx`.
- **Kit de logos:** `/logos` (https://arriagayabogados.com/logos). Cada pieza (horizontal, vertical, isotipo, logotipo y sello) en 4 versiones (color, fondo oscuro, negro y blanco), en SVG y PNG transparente; íconos 1080/512/180 px, imagen para redes, logo para firma de correo, colores con botón de copiar, tipografías, reglas y **ZIP con todo** (incluye `LEEME.txt`). Los archivos están en `public/logos/` y se regeneran con `npm run logos` a partir de los maestros de `public/marca/`.

### Reglas de diseño (skill design-taste-frontend)
- Encabezados de sección **apilados** (etiqueta opcional, título, texto de 65 caracteres máximo y botón), sin párrafo flotando a la derecha.
- Máximo **una etiqueta `//` cada 3 secciones**.
- Sin numeración decorativa, sin paginación tipo "1 / 3", sin indicadores de scroll, sin guiones largos (—).
- Un solo bloque de color café deliberado por página, más el footer.
- Hero: título de 2 líneas como máximo, subtítulo de 20 palabras como máximo, un solo botón.
- Esquinas rectas en todo (excepto el sello y los iconos de redes).

### Componentes
| Componente | Especificación |
|------------|----------------|
| **Botón** | Fondo nogal, texto crema, 14px, esquinas rectas, flecha ↗ que se mueve en hover y leve hundimiento al presionar. Versión crema sobre fondos café. |
| **Encabezado de sección** | Apilado: etiqueta opcional, título, texto y acción. |
| **Lista de áreas** | Filas grandes con icono; la activa se rellena de nogal y un panel lateral muestra descripción, 4 servicios y botón **Ver área**. |
| **Tarjeta de artículo** | Borde de 1px, imagen, área y fecha, título, extracto y botón **Leer**; se rellena de nogal al pasar el mouse. La primera puede ir destacada (doble tamaño). |
| **Tarjeta de equipo** | Marco de 1px con foto 4:5, nombre y cargo; zoom leve en hover. |
| **Cifra** | Borde izquierdo de 1px, número grande con contador y etiqueta. |
| **Línea de tiempo** | Íconos en cuadros de 1px unidos por una línea horizontal. |
| **Acordeón de barra** | Barra vertical que se desliza al ítem activo. |
| **Acordeón FAQ** | Filas con línea inferior e icono + / −. |
| **Input** | Solo línea inferior; etiqueta arriba; error en rojo debajo. |
| **Sello en muesca** | Sello de la marca estático en un círculo café, encajado en la curva de la foto. |
| **Tarjeta de testimonio** | Fondo café, comillas decorativas y ficha crema con autor y detalle. |

### Estilo fotográfico
- **Retratos del equipo:** mismo fondo de estudio oscuro, misma luz cálida y mismo encuadre de medio cuerpo. La sesión de fotos real es indispensable (las actuales son de stock).
- **Ambiente:** biblioteca, expedientes, reuniones con clientes, balanza o escultura; tonos cálidos y cafés.
- **Hero:** escultura de bronce sobre fondo blanco, fundida con el crema (`mix-blend-multiply`). Lo ideal es fotografiar una escultura real de la oficina.
- **Créditos y licencias:** `public/img/CREDITS.md`. La foto de la Catedral (CC BY-SA 4.0) lleva su crédito visible en La Firma.

### Iconografía
Phosphor Icons en peso regular/light. Un icono por área de práctica; la flecha `ArrowUpRight` en todos los botones.

### Movimiento
Solo animaciones con propósito, todas desactivadas con `prefers-reduced-motion`:
- Entrada del hero en CSS.
- Revelado del manifiesto con el scroll.
- Contadores de cifras.
- Parallax leve de la palabra fantasma.
- Aparición suave de secciones.
- Relleno de tarjetas y filas en hover.
- Barra del acordeón que se desliza.
- Header con desenfoque al hacer scroll.

Motion se carga de forma diferida (`LazyMotion`) para no bloquear el primer render.

---

## 🏗️ ARQUITECTURA Y STACK

| Pieza | Elegido |
|-------|---------|
| **Framework** | Next.js 16.3 (App Router) + React 19.2 + TypeScript |
| **Estilos** | Tailwind CSS 4.3 con tokens en variables CSS (`src/app/globals.css`) |
| **Idiomas** | next-intl 4.14: español sin prefijo, inglés en `/en`, **sin redirección automática** por navegador o cookie (la URL manda el idioma). Textos de interfaz en `messages/es.json` y `messages/en.json` |
| **Animación** | Motion 13 (`motion/react`) con `LazyMotion` |
| **Base de datos** | Postgres (Neon en producción, Postgres local en desarrollo) + Drizzle ORM 0.45 |
| **Validación** | zod 4 |
| **Contenido** | Semilla en `src/content/`; capa de lectura en `src/lib/contenido.ts` (usa la base si existe, si no la semilla) |
| **Panel** | `/admin` propio (ver abajo) |
| **Imágenes** | `next/image` + Vercel Blob para lo que se sube desde el panel |
| **Correo** | Resend (API REST) |
| **Anti-spam** | Cloudflare Turnstile + campo trampa + límite por IP |
| **Agenda** | Cal.com (iframe en `/contacto`) |
| **Analítica** | Google Analytics 4 con consentimiento |
| **Iconos** | Phosphor Icons |
| **Hosting** | Vercel (despliegue automático desde GitHub) |
| **Pruebas** | Playwright (capturas, auditorías y flujos de punta a punta) y Lighthouse |

### Modelo de datos ✅
Esquema en `src/db/schema.ts`, migraciones en `drizzle/` (se aplican solas en cada despliegue con `scripts/migrar.mjs`), semilla en `scripts/semilla.ts`.
- `leads`: nombre, apellido, correo, teléfono, tipo, empresa, área, fecha preferida, urgencia, mensaje, idioma, origen, UTM, consentimiento, estado (nuevo / contactado / se volvió cliente / cerrado), asignado a, notas internas, fechas.
- `equipo`: slug, nombre, nivel, orden, áreas, foto, correo, cédula y, en español e inglés, cargo, biografía, formación e idiomas; visible sí/no.
- `publicaciones`: slug + idioma, título, extracto, cuerpo en Markdown, área, autor, portada, fecha, minutos de lectura, borrador/publicado.
- `testimonios`: iniciales y, en ambos idiomas, cita, autor y detalle; autorización por escrito (sí/no + fecha), visible, orden.
- `ajustes`: teléfonos, WhatsApp, correo, dirección, horario (ES/EN) y cifras de la home.

### Panel `/admin` ✅
- **Acceso:** usuario y contraseña en variables de entorno (`ADMIN_*` y, opcional, `EDITOR_*`), sesión con cookie firmada de 12 horas, límite de intentos por IP. Fase 2: cuentas individuales en base de datos con 2FA.
- **Resumen:** prospectos sin atender, del mes, nuevos clientes y últimos prospectos.
- **Prospectos:** búsqueda, filtros por estado y área, detalle con UTM, estado, asignación, notas internas, WhatsApp directo, eliminar y exportar CSV (compatible con Excel).
- **Publicaciones:** editor Markdown con vista previa, portada, idioma, borrador/publicado y "Crear versión EN/ES".
- **Testimonios:** no deja publicar uno sin autorización por escrito; cita de 160 caracteres como máximo.
- **Equipo:** textos en ambos idiomas, foto, áreas, cédula y visibilidad.
- **Configuración:** contacto, dirección, horario y cifras.
- **Roles:** Admin (todo) y Editor (solo publicaciones). Al guardar, el sitio público se regenera solo.

---

## 📬 FORMULARIOS Y CONVERSIÓN

### Formulario de consulta (home, contacto, cada área y cada perfil)
Campos: Nombre* · Apellido* · Correo* · Teléfono/WhatsApp* · Soy persona física o empresa (con nombre de la empresa) · Área de interés* (9 áreas + "No estoy seguro") · Fecha preferida · Urgencia (plazo o audiencia próxima / próximas semanas / solo información) · Mensaje* · Aceptación del Aviso de Privacidad*.

Al enviarse:
1. Se valida en el servidor (zod); los errores aparecen bajo cada campo en el idioma del visitante.
2. Se revisan el campo trampa, el límite de 5 envíos cada 10 minutos por IP y Turnstile (si está configurado).
3. Se guarda en `leads` con idioma y UTM de la visita.
4. Se **asigna al socio del área** (o al primer integrante del área).
5. **Resend** avisa al responsable (o a `LEADS_TO`) y manda un acuse al cliente en su idioma. Si el correo falla, el prospecto igual queda guardado.
6. Mensaje de éxito: "Gracias. Un abogado de nuestro equipo te contactará en menos de 24 horas hábiles."

### Otros canales
- **WhatsApp:** barra fija en móvil (Llamar / WhatsApp) y enlace de texto junto al botón del formulario en escritorio, con mensaje prellenado.
- **Teléfono:** todos los números con `tel:`.
- **Agenda en línea:** calendario de Cal.com en `/contacto` cuando se configura `NEXT_PUBLIC_CALCOM_URL`. `/agendar` lleva al formulario.
- **Por definir con el cliente:** si la primera consulta tiene costo (fase 2: cobro en línea).

---

## 🔍 SEO

### Implementado ✅
- Títulos y descripciones por página e idioma; plantilla "%s | Arriaga & Abogados".
- `canonical` y `hreflang` (es-MX, en, x-default) en todas las páginas.
- `sitemap.xml` con las dos versiones de cada página y `robots.txt` (bloquea `/admin`).
- Open Graph y Twitter con imagen de marca 1200×630.
- **Datos estructurados:** `LegalService` (firma, dirección, horario, zona de servicio, idiomas), `Service` y `FAQPage` en cada área, `Person` en cada perfil y `Article` en cada publicación.
- URLs limpias: `/areas/laboral`, `/equipo/mariana-arriaga-cortes`, `/en/areas/laboral`.
- Imágenes optimizadas (WebP/AVIF) con texto alternativo en ambos idiomas.

### Pendiente
- Dar de alta **Google Search Console** y enviar el sitemap cuando el dominio esté activo.
- **Google Business Profile** con categoría "Bufete de abogados", fotos, horario y servicios; mismos datos (nombre, dirección, teléfono) en el sitio, Google y directorios.
- Datos estructurados `BreadcrumbList` y `alumniOf` (mejora menor).
- Directorios: Barra Mexicana (capítulo Jalisco), colegios de abogados de Jalisco, directorios jurídicos.

### Palabras clave objetivo
| Página | Keyword principal | Secundarias |
|--------|-------------------|-------------|
| Home | abogados en Guadalajara | despacho de abogados Guadalajara, firma de abogados Jalisco |
| Laboral | abogado laboral para empresas Guadalajara | despido, conciliación laboral Jalisco |
| Familiar | abogado de divorcios Guadalajara | pensión alimenticia Jalisco, custodia |
| Penal | abogado penalista Guadalajara | defensa penal Zapopan |
| Amparo | abogado de amparo Guadalajara | juicio de amparo Jalisco |
| Fiscal | abogado fiscal Guadalajara | defensa SAT, auditoría SAT |
| Corporativo | abogado corporativo Guadalajara | constituir empresa Guadalajara |
| Inmobiliario | abogado inmobiliario Zapopan | compraventa de inmuebles Guadalajara |
| PI | registro de marca Guadalajara | abogado de propiedad intelectual |

---

## 🔒 PRIVACIDAD, LEGAL Y SEGURIDAD

### Implementado ✅
- **Aviso de Privacidad integral** (ES/EN) conforme a la LFPDPPP: responsable, datos, finalidades primarias y secundarias, transferencias, derechos ARCO, cookies, conservación y cambios. **Texto provisional: lo valida la firma.**
- **Aviso simplificado** junto al formulario, con enlace al aviso completo.
- **Aviso de cookies:** GA4 solo se carga si el visitante acepta (Consent Mode v2). Se puede cambiar la elección desde el footer. Sin ID de GA4 configurado, no aparece.
- **Aviso legal:** la información no constituye asesoría legal y enviar un formulario no crea una relación abogado-cliente.
- **Conservación de datos:** tarea diaria de Vercel Cron que borra los prospectos de más de 12 meses que no se volvieron clientes.
- **Ética:** sin porcentajes de éxito ni promesas; testimonios solo con autorización por escrito; cédula con enlace al Registro Nacional de Profesionistas.
- **Seguridad:** HTTPS, CSP limitada a los servicios usados, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy, límites por IP en formulario y acceso al panel, cookie de sesión firmada, secretos solo en variables de entorno.

### Pendiente
- Validación final de los tres textos legales por la firma.
- Definir con el cliente si 12 meses es el plazo de conservación correcto.

---

## ♿ ACCESIBILIDAD ✅

- **WCAG 2.2 AA:** Lighthouse Accesibilidad **100** en todas las páginas probadas.
- Contraste validado en toda la paleta; foco visible (contorno de 2px); navegación con teclado; enlace "Saltar al contenido".
- Etiquetas en todos los campos y errores asociados (`aria-invalid`, `aria-describedby`).
- Un solo H1 por página; `lang` según el idioma.
- Texto mínimo de 16px en párrafos; movimiento reducido respetado.

---

## 📱 RESPONSIVE ✅

| Dispositivo | Cómo se ve |
|-------------|------------|
| **Móvil (< 768px)** | Menú a pantalla completa, barra fija con Llamar y WhatsApp, hero de 36px, cifras en 2×2 con el sello debajo, lista de áreas con descripción, carrusel de equipo con swipe, formulario en una columna, footer apilado |
| **Tablet** | Carruseles con 2 a 3 tarjetas visibles, cifras en 2×2 |
| **Escritorio** | Mega-menú, lista de áreas con panel, formulario junto a la foto |

Verificado sin desbordamiento horizontal en todas las rutas a 390px de ancho.

---

## ⚡ RENDIMIENTO

- **Lighthouse escritorio:** Rendimiento **100**, Accesibilidad **100**, Buenas prácticas **100**; LCP de 0.6 a 0.8 s; CLS 0.
- **Lighthouse móvil (4G lento simulado):** Rendimiento de 87 a 95 según la página, con CLS 0. La carga real medida en la home es de unos 60 ms. En la simulación pesa sobre todo el JavaScript base de React, Next y las animaciones.
- Páginas estáticas que se regeneran al editar en el panel; fuentes autoalojadas; mapa y calendario con carga diferida.
- **Siguiente mejora posible:** reducir animaciones en la home para subir el rendimiento móvil a 95.

---

## 📊 ANALÍTICA Y MEDICIÓN

- **Listo:** GA4 con consentimiento (falta el ID real), UTM guardados en cada prospecto y bandeja con estados para medir cuántos se vuelven clientes.
- **Pendiente:** eventos de conversión en GA4 (envío del formulario por área, clic en WhatsApp, clic en teléfono, cita agendada) y tablero mensual para el cliente.

---

## 🚀 DESPLIEGUE Y OPERACIÓN

### Dónde vive todo
| Recurso | Detalle |
|---------|---------|
| **Repositorio** | https://github.com/ElBeDev/arriagayabogados (rama `main`) |
| **Vercel** | Proyecto `arriagayabogados` (cuenta elbedev). Preset Next.js y build con migraciones fijados en `vercel.json` |
| **URL de Vercel** | https://arriagayabogados.vercel.app |
| **Base de datos** | Neon Postgres `arriaga-db` (región iad1, plan gratuito), conectada vía integración de Vercel |
| **Imágenes** | Vercel Blob `arriaga-imagenes` (público) |
| **Cron** | `/api/cron/limpiar-prospectos` todos los días a las 9:00 UTC |
| **Dominio** | `arriagayabogados.com` (Hostinger) ✅ activo con HTTPS; `www` redirige al dominio principal (regla en `next.config.ts`) |

### Flujo de trabajo
1. Cambios en el código → `git push` a `main` → Vercel aplica migraciones, compila y publica (unos 35 s).
2. Cambios de contenido → desde `/admin`; el sitio se actualiza solo, sin desplegar.
3. **Desarrollo local:** `npm run dev` con Postgres local (`.env.local` apunta a la base local, nunca a producción). Pasos en el `README.md`.

> ⚠️ Los comandos `vercel link`, `vercel env pull` y las integraciones de Vercel reescriben `.env.local` con las variables de producción. Después de usarlos, hay que restaurar la configuración local.

### Variables de entorno en producción
- **Cargadas:** `DATABASE_URL` y demás de Neon, `BLOB_READ_WRITE_TOKEN`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `SESSION_SECRET`, `CRON_SECRET`.
- **Por cargar cuando existan las cuentas:** `RESEND_API_KEY`, `RESEND_FROM`, `LEADS_TO`, `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`, `NEXT_PUBLIC_CALCOM_URL`. Opcional: `EDITOR_USERNAME` y `EDITOR_PASSWORD`.
- Referencia completa en `.env.example`.

### DNS (Hostinger)
| Tipo | Nombre | Valor |
|------|--------|-------|
| A | `@` | `216.198.79.1` |
| CNAME | `www` | `27c812ae6063f9bd.vercel-dns-017.com` |

Son los registros que Vercel recomienda. Los anteriores (`76.76.21.21` y `cname.vercel-dns.com`) siguen funcionando para el público, pero la red de la oficina de desarrollo no alcanza la IP antigua. **Estado:** ✅ publicados y verificados. Resend pedirá además registros SPF, DKIM y DMARC.

### Verificación hecha en producción
- Formulario → prospecto guardado y asignado al socio del área.
- Login del panel y cambio de estado del prospecto.
- Cambio de teléfono en configuración reflejado en el sitio.
- Artículo con portada en Blob publicado y luego eliminado.
- Todos los cambios de prueba se deshicieron desde el panel.
- Integraciones probadas con llaves de prueba: GA4 solo tras aceptar, Turnstile, Cal.com, Resend con llave inválida sin romper el formulario, CSP sin bloqueos.

---

## 🗓️ PLAN DE TRABAJO

### Fase 0: Descubrimiento
- [ ] Reunión de arranque con los socios
- [ ] Validar nombre, áreas de práctica, equipo y tono
- [ ] Recopilar la información pendiente (ver lista abajo)
- [ ] Análisis de 3 a 5 despachos competidores en Guadalajara

### Fase 1: Identidad y diseño
- [x] Logo (isotipo A&, logotipo, versiones horizontal y vertical, sello) y kit de logos descargable en `/logos`
- [x] Diseño de la home y páginas interiores (escritorio y móvil)
- [x] Rediseño con la skill design-taste-frontend (modo Preservar)
- [ ] Sesión de fotos del equipo y de la oficina
- [ ] Aprobación del cliente

### Fase 2: Desarrollo base
- [x] Repo: Next.js, Tailwind, next-intl, Drizzle
- [x] Sistema de diseño y componentes
- [x] Header con mega-menú, footer, menú móvil y barra de llamada/WhatsApp
- [x] Páginas: Home, La Firma, Áreas, Equipo, Publicaciones, Contacto, Carreras, legales, logos y 404

### Fase 3: Panel y funcionalidad
- [x] Autenticación del panel con roles
- [x] Prospectos, publicaciones, testimonios, equipo y configuración
- [x] Formulario con Resend, Turnstile, UTM y asignación automática (faltan las llaves reales)
- [x] Cal.com (falta la URL real del calendario)
- [x] WhatsApp y click-to-call

### Fase 4: Contenido y SEO
- [x] Versión en inglés completa (falta la revisión de un socio bilingüe)
- [x] 6 artículos en español e inglés
- [x] Metadatos, datos estructurados, sitemap y hreflang
- [x] Aviso de cookies y GA4 con consentimiento (falta el ID real)
- [ ] Textos finales del cliente
- [ ] Eventos de conversión en GA4
- [ ] Google Search Console y Google Business Profile

### Fase 5: QA y lanzamiento
- [x] Auditoría de accesibilidad, diseño y Lighthouse
- [x] Pruebas de punta a punta en local y en producción
- [x] Publicación en Vercel con Neon y Blob
- [x] DNS de `arriagayabogados.com` activo con HTTPS
- [ ] Pruebas en Safari, Firefox, iOS y Android reales
- [ ] Revisión final de textos por el cliente
- [ ] Correo de Resend con SPF, DKIM y DMARC
- [ ] Capacitación de 1 hora al equipo del despacho para usar el panel

### Fase 6: Post-lanzamiento (continuo)
- Soporte y ajustes durante 30 días · 2 artículos al mes · reporte mensual de analítica y SEO · mejoras de fase 2.

---

## 🔮 FASE 2 (ideas a futuro)

- **Portal de clientes:** estado del asunto, documentos y próximas audiencias.
- **Cuentas individuales del panel** con contraseña cifrada y 2FA.
- **Pago en línea** de la primera consulta o de honorarios (Stripe / Mercado Pago).
- **Página de sectores** con experiencia por industria.
- **Newsletter** mensual con reformas (Resend Audiences).
- **Recursos descargables** a cambio del correo (guías PDF).
- **Chat de preatención** que dirija la consulta al área correcta (sin dar asesoría).
- **Calculadoras:** finiquito y liquidación, pensión alimenticia estimada.
- **Edición de áreas de práctica desde el panel**, si el cliente lo necesita.

---

## 📦 INFORMACIÓN PENDIENTE DEL CLIENTE

- [x] Nombre de la firma y dominio (`arriagayabogados.com`, comprado; DNS configurado en Hostinger)
- [ ] Lista del equipo real: nombre, cargo, áreas, formación, idiomas, **cédula profesional**, LinkedIn y correo
- [ ] Fotografías profesionales (o agendar una sesión)
- [ ] Áreas de práctica que realmente ofrecen (confirmar o ajustar las 9)
- [ ] Dirección exacta, teléfonos, WhatsApp, horario y si ofrecen atención urgente 24/7
- [ ] Historia real y cifras reales (años, asuntos, clientes)
- [ ] Testimonios autorizados por escrito (si los hay)
- [ ] Si la primera consulta tiene costo y cuánto
- [ ] Correo que recibe los prospectos de cada área
- [ ] Validación del Aviso de Privacidad, Términos y Aviso legal
- [ ] Membresías, certificaciones y rankings reales
- [ ] Redes sociales reales (LinkedIn, Facebook, Instagram)
- [ ] Cuentas: Resend, Google Analytics 4, Cloudflare Turnstile, Cal.com, Google Business Profile, Search Console
- [ ] Quién del despacho administrará el panel y quién publicará artículos

---

## ✅ AVANCE DEL PROYECTO

| Fecha | Avance |
|-------|--------|
| 2026-09-27 | Brief inicial creado (este documento) |
| 2026-09-27 | Diseño actualizado según la referencia estilo "LexCore": paleta nogal/crema, DM Sans y layout de la home sección por sección |
| 2026-09-27 | **v1 del sitio construida** (Next.js 16 + Tailwind 4 + Motion): home completa según la referencia, La Firma, Áreas (índice + 9 páginas), Equipo (filtro por área + 11 perfiles), Publicaciones (6 artículos), Contacto con formulario validado (server action + zod), Carreras, páginas legales, 404, sitemap, robots y JSON-LD. Fotos de stock provisionales en `public/img/` (créditos en `CREDITS.md`). **Pendiente:** inglés (`/en`), panel `/admin` + Postgres, envío de leads con Resend, Cal.com, banner de cookies/GA4 y fotos reales del equipo |
| 2026-09-27 | **Rebranding a Arriaga & Abogados** (`arriagayabogados.com`): logo nuevo (isotipo A&, logotipo, horizontal, vertical, sello), favicon, imagen para redes, guía de marca en `/marca` y el nombre actualizado en todo el sitio. Mariana Arriaga pasa a Socia Directora |
| 2026-09-27 | **Rediseño con la skill design-taste-frontend (modo Preservar).** Encabezados de sección apilados (sin columna derecha), máx. 1 etiqueta `//` cada 3 secciones, hero con etiqueta "Desde 2006" y subtítulo de ≤20 palabras, sello estático en la muesca (se quita "Desliza"), índice de áreas con panel de detalle, publicaciones con una destacada, proceso con íconos y verbos (sin números), testimonios sin paginación, **modo oscuro automático** (variables CSS; las franjas nogal se quedan oscuras), scroll y contadores con Motion (sin listeners ni estado por cuadro), texto legal "abogado-cliente" con guion normal (aprobado). URLs, menú, campos del formulario, anclas y logo sin cambios |
| 2026-09-27 | **Fase 3 completa (lo que faltaba del brief).** Versión en **inglés** en `/en` (textos, áreas, equipo, 6 artículos, legales, metadatos y `hreflang`). **Postgres + Drizzle** con semilla. **Panel `/admin`** (prospectos, publicaciones, testimonios, equipo, configuración; roles admin/editor). **Formulario**: guarda el prospecto, lo asigna al socio del área, avisa por **Resend** y manda acuse en el idioma del cliente; UTM, **Turnstile**, límite por IP. **Cookies + GA4** con consentimiento, **Cal.com** en contacto, **CSP** y cabeceras de seguridad, **cron** que borra prospectos de más de 12 meses. Pruebas de punta a punta en producción: panel, regeneración de páginas, integraciones con llaves de prueba. Lighthouse escritorio 100 / 100 / 100; móvil simulado 87 a 95 en rendimiento y 100 en accesibilidad. Pendiente: llaves reales (Resend, GA4, Turnstile, Cal.com), Neon + Blob en Vercel, contenido y fotos reales |
| 2026-09-27 | **Se quita el modo oscuro automático** a pedido del cliente: el sitio siempre usa el fondo crema claro, aunque el sistema del visitante esté en modo oscuro. Las franjas café (equipo, footer) se mantienen como parte del diseño |
| 2026-09-27 | **Publicado en Vercel** (proyecto `arriagayabogados`, equipo de elbedev): repo `github.com/ElBeDev/arriagayabogados` conectado (cada push a `main` despliega), Neon Postgres (`arriaga-db`, iad1, plan gratuito) con tablas y contenido de ejemplo, Blob (`arriaga-imagenes`), variables de producción cargadas, preset Next.js y migraciones automáticas en `vercel.json`. En línea en `arriagayabogados.vercel.app`; prueba de punta a punta en producción superada. Dominio `arriagayabogados.com` y `www` agregados; **falta el DNS en Hostinger** (A `@` → 76.76.21.21, CNAME `www` → cname.vercel-dns.com). `www` redirige al dominio principal |
| 2026-09-27 | **DNS actualizado a los registros nuevos de Vercel** en Hostinger (A `@` → `216.198.79.1`, CNAME `www` → `27c812ae6063f9bd.vercel-dns-017.com`). El dominio ya respondía con HTTPS desde el exterior con los registros anteriores; el cambio es para que funcione también desde redes que no alcanzan la IP antigua |
| 2026-09-27 | **Brief reescrito con el estado real:** estado actual, home y componentes tal como están construidos, stack con versiones, SEO/seguridad/analítica separados en implementado y pendiente, sección nueva de despliegue y operación, plan y pendientes al día |
| 2026-09-27 | **Dominio activo:** `arriagayabogados.com` con HTTPS. Se corrigió la redirección de `www`: la regla de `vercel.json` solo alcanzaba los archivos y la página en `www` quedaba sin estilos (la CSP bloqueaba sus CSS, JS e imágenes). Ahora la redirección está en `next.config.ts` y cubre todo; verificado con 0 errores en el navegador |
| 2026-09-30 | **Kit de logos en `/logos`** para el equipo: 5 piezas × 4 versiones (color, fondo oscuro, negro, blanco) en SVG y PNG, íconos, imagen para redes, firma de correo, colores copiables, tipografías, reglas y ZIP con todo. Generado con `npm run logos` (`scripts/generar-logos.mjs`). `/marca` redirige a `/logos` |
