import { notFound } from "next/navigation";

// Cualquier ruta desconocida muestra el 404 del idioma correspondiente.
export default function RutaDesconocida() {
  notFound();
}
