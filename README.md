# Arriaga & Abogados · sitio web

Sitio de la firma en `arriagayabogados.com`. El brief completo (marca, contenido, diseño y avance) está en
[`DESARROLLO_WEB_ARRIAGA_ABOGADOS.md`](DESARROLLO_WEB_ARRIAGA_ABOGADOS.md).

**Stack:** Next.js 16 (App Router) · Tailwind CSS 4 · Motion · next-intl (español e inglés) · Postgres + Drizzle ·
Resend · Vercel Blob · Cloudflare Turnstile · GA4 con consentimiento · Cal.com.

## Desarrollo local

```bash
npm install
cp .env.example .env.local     # y completa DATABASE_URL, ADMIN_*, SESSION_SECRET
npm run db:migrar              # crea las tablas
npm run db:semilla             # carga el contenido de ejemplo (idempotente)
npm run dev                    # http://localhost:3000
```

Sin `DATABASE_URL` el sitio funciona igual con el contenido de `src/content/`, pero el panel `/admin` avisa que falta
la base de datos y los prospectos solo se registran en el log del servidor.

Scripts útiles: `npm run build`, `npm run lint`, `npm run db:generar` (nueva migración tras cambiar `src/db/schema.ts`).

## Idiomas

- Español sin prefijo (`/contacto`), inglés con `/en` (`/en/contacto`). La URL manda: no hay redirecciones por navegador.
- Textos de interfaz: `messages/es.json` y `messages/en.json` (mismas claves).
- Contenido fijo por idioma: `src/content/areas.ts` / `areas.en.ts` y `src/content/firma.ts` (historia, valores, etc.).
- Si un artículo no tiene versión en inglés, `/en/publicaciones/…` redirige a la versión en español.

## Panel `/admin`

| Sección | Qué se hace |
|---|---|
| Resumen | Prospectos sin atender, del mes, nuevos clientes y últimos prospectos |
| Prospectos | Bandeja con filtros, detalle, estado, asignación, notas internas, WhatsApp directo y exportar CSV |
| Publicaciones | Artículos en Markdown con vista previa, portada, idioma, borrador/publicado y "Crear versión EN/ES" |
| Testimonios | Solo se publican si están marcados con autorización por escrito |
| Equipo | Integrantes con textos en ambos idiomas, foto, áreas, cédula y visibilidad |
| Configuración | Teléfonos, WhatsApp, correo, dirección, horario y cifras de la home |

- Cuentas en variables de entorno: `ADMIN_*` (todo) y, opcional, `EDITOR_*` (solo publicaciones).
- Al guardar, las páginas públicas se regeneran solas.
- Las áreas de práctica viven en código (`src/content/areas*.ts`) porque su contenido es estructurado y cambia poco.

## Integraciones (todas opcionales; sin llave se omiten)

| Variable | Efecto |
|---|---|
| `RESEND_API_KEY`, `RESEND_FROM`, `LEADS_TO` | Aviso de cada prospecto al socio del área + acuse al cliente en su idioma |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | Captcha invisible en el formulario |
| `NEXT_PUBLIC_GA_ID` | Banner de cookies; GA4 solo carga si el visitante acepta |
| `NEXT_PUBLIC_CALCOM_URL` | Calendario de citas en `/contacto` |
| `BLOB_READ_WRITE_TOKEN` | Subida de imágenes desde el panel (obligatorio en Vercel) |
| `CRON_SECRET` | Borrado diario de prospectos de más de 12 meses que no se volvieron clientes (`vercel.json`) |

## Publicar en Vercel

1. Importar el repo en Vercel.
2. Storage: agregar **Neon (Postgres)** y **Blob**. Eso crea `DATABASE_URL` y `BLOB_READ_WRITE_TOKEN`.
3. Cargar el resto de variables de `.env.example` (mínimo `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `SESSION_SECRET`, `CRON_SECRET`).
4. Ejecutar una vez `npm run db:migrar` y `npm run db:semilla` contra la base de Neon.
5. Dominio: apuntar `arriagayabogados.com` a Vercel. Para Resend, verificar el dominio (registros SPF, DKIM y DMARC).

## Seguridad

Cabeceras en `next.config.ts` (CSP limitada a los servicios que se usan, HSTS, X-Frame-Options, Referrer-Policy,
Permissions-Policy), sesión del panel con cookie firmada de 12 horas, límite de intentos de acceso y de envíos del
formulario por IP, campo trampa contra bots y Turnstile opcional.

## Imágenes

Las fotos actuales son de stock provisionales (licencias en `public/img/CREDITS.md`) y se reemplazan con la sesión
de fotos real. Los archivos de marca (logo, sello, íconos) están en `public/marca/` y la guía en `/marca`.
