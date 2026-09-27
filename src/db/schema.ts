import { boolean, integer, jsonb, pgTable, serial, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";

/** Solicitudes de consulta que llegan por el formulario. */
export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  nombre: text("nombre").notNull(),
  apellido: text("apellido").notNull(),
  email: text("email").notNull(),
  telefono: text("telefono").notNull(),
  tipo: text("tipo").notNull(), // persona | empresa
  empresa: text("empresa"),
  area: text("area").notNull(),
  fecha: text("fecha"), // fecha preferida (AAAA-MM-DD)
  urgencia: text("urgencia").notNull(),
  mensaje: text("mensaje").notNull(),
  locale: text("locale").notNull().default("es"),
  origen: text("origen").notNull().default("formulario"),
  utm: jsonb("utm").$type<Record<string, string>>(),
  consentimiento: boolean("consentimiento").notNull().default(true),
  estado: text("estado").notNull().default("nuevo"), // nuevo | contactado | cliente | cerrado
  asignadoA: text("asignado_a"), // slug del integrante
  notas: text("notas"),
  creadoEn: timestamp("creado_en", { withTimezone: true }).defaultNow().notNull(),
  actualizadoEn: timestamp("actualizado_en", { withTimezone: true }).defaultNow().notNull(),
});

export const equipo = pgTable("equipo", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  nombre: text("nombre").notNull(),
  nivel: text("nivel").notNull(), // socio | of-counsel | asociado-senior | asociado
  orden: integer("orden").notNull().default(0),
  areas: text("areas").array().notNull().default([]),
  foto: text("foto").notNull(),
  email: text("email").notNull(),
  cedula: text("cedula"),
  cargoEs: text("cargo_es").notNull(),
  cargoEn: text("cargo_en").notNull(),
  bioEs: text("bio_es").notNull(), // párrafos separados por línea en blanco
  bioEn: text("bio_en").notNull(),
  formacionEs: text("formacion_es").notNull(), // una línea por grado
  formacionEn: text("formacion_en").notNull(),
  idiomasEs: text("idiomas_es").notNull(), // separados por coma
  idiomasEn: text("idiomas_en").notNull(),
  activo: boolean("activo").notNull().default(true),
  actualizadoEn: timestamp("actualizado_en", { withTimezone: true }).defaultNow().notNull(),
});

export const publicaciones = pgTable(
  "publicaciones",
  {
    id: serial("id").primaryKey(),
    slug: text("slug").notNull(),
    locale: text("locale").notNull().default("es"),
    titulo: text("titulo").notNull(),
    extracto: text("extracto").notNull(),
    cuerpo: text("cuerpo").notNull(), // Markdown
    area: text("area").notNull(),
    autor: text("autor").notNull(), // slug del integrante
    portada: text("portada").notNull(),
    fecha: text("fecha").notNull(), // AAAA-MM-DD
    lectura: integer("lectura").notNull().default(5),
    estado: text("estado").notNull().default("borrador"), // borrador | publicado
    actualizadoEn: timestamp("actualizado_en", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [uniqueIndex("publicaciones_slug_locale").on(t.slug, t.locale)],
);

export const testimonios = pgTable("testimonios", {
  id: serial("id").primaryKey(),
  iniciales: text("iniciales").notNull(),
  citaEs: text("cita_es").notNull(),
  citaEn: text("cita_en").notNull(),
  autorEs: text("autor_es").notNull(),
  autorEn: text("autor_en").notNull(),
  detalleEs: text("detalle_es").notNull(),
  detalleEn: text("detalle_en").notNull(),
  autorizado: boolean("autorizado").notNull().default(false),
  fechaAutorizacion: text("fecha_autorizacion"),
  visible: boolean("visible").notNull().default(true),
  orden: integer("orden").notNull().default(0),
});

/** Configuración editable del sitio (contacto, horario, cifras) como JSON por clave. */
export const ajustes = pgTable("ajustes", {
  clave: text("clave").primaryKey(),
  valor: jsonb("valor").notNull(),
});
