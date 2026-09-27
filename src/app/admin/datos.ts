import { areas } from "@/content/areas";

export const nombreArea = (slug: string) =>
  slug === "no-estoy-seguro" ? "No está seguro" : (areas.find((a) => a.slug === slug)?.nombre ?? slug);

export const estadosLead = [
  { valor: "nuevo", etiqueta: "Nuevo" },
  { valor: "contactado", etiqueta: "Contactado" },
  { valor: "cliente", etiqueta: "Se volvió cliente" },
  { valor: "cerrado", etiqueta: "Cerrado sin contratar" },
] as const;

export const urgencias: Record<string, string> = {
  plazo: "Plazo o audiencia próxima",
  semanas: "Próximas semanas",
  informacion: "Solo información",
};

export const fechaCorta = (d: Date) =>
  d.toLocaleString("es-MX", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", timeZone: "America/Mexico_City" });
