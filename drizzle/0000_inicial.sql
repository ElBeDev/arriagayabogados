CREATE TABLE "ajustes" (
	"clave" text PRIMARY KEY NOT NULL,
	"valor" jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE "equipo" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"nombre" text NOT NULL,
	"nivel" text NOT NULL,
	"orden" integer DEFAULT 0 NOT NULL,
	"areas" text[] DEFAULT '{}' NOT NULL,
	"foto" text NOT NULL,
	"email" text NOT NULL,
	"cedula" text,
	"cargo_es" text NOT NULL,
	"cargo_en" text NOT NULL,
	"bio_es" text NOT NULL,
	"bio_en" text NOT NULL,
	"formacion_es" text NOT NULL,
	"formacion_en" text NOT NULL,
	"idiomas_es" text NOT NULL,
	"idiomas_en" text NOT NULL,
	"activo" boolean DEFAULT true NOT NULL,
	"actualizado_en" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "equipo_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "leads" (
	"id" serial PRIMARY KEY NOT NULL,
	"nombre" text NOT NULL,
	"apellido" text NOT NULL,
	"email" text NOT NULL,
	"telefono" text NOT NULL,
	"tipo" text NOT NULL,
	"empresa" text,
	"area" text NOT NULL,
	"fecha" text,
	"urgencia" text NOT NULL,
	"mensaje" text NOT NULL,
	"locale" text DEFAULT 'es' NOT NULL,
	"origen" text DEFAULT 'formulario' NOT NULL,
	"utm" jsonb,
	"consentimiento" boolean DEFAULT true NOT NULL,
	"estado" text DEFAULT 'nuevo' NOT NULL,
	"asignado_a" text,
	"notas" text,
	"creado_en" timestamp with time zone DEFAULT now() NOT NULL,
	"actualizado_en" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "publicaciones" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"locale" text DEFAULT 'es' NOT NULL,
	"titulo" text NOT NULL,
	"extracto" text NOT NULL,
	"cuerpo" text NOT NULL,
	"area" text NOT NULL,
	"autor" text NOT NULL,
	"portada" text NOT NULL,
	"fecha" text NOT NULL,
	"lectura" integer DEFAULT 5 NOT NULL,
	"estado" text DEFAULT 'borrador' NOT NULL,
	"actualizado_en" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "testimonios" (
	"id" serial PRIMARY KEY NOT NULL,
	"iniciales" text NOT NULL,
	"cita_es" text NOT NULL,
	"cita_en" text NOT NULL,
	"autor_es" text NOT NULL,
	"autor_en" text NOT NULL,
	"detalle_es" text NOT NULL,
	"detalle_en" text NOT NULL,
	"autorizado" boolean DEFAULT false NOT NULL,
	"fecha_autorizacion" text,
	"visible" boolean DEFAULT true NOT NULL,
	"orden" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "publicaciones_slug_locale" ON "publicaciones" USING btree ("slug","locale");