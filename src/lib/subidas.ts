import "server-only";
import { put } from "@vercel/blob";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const TIPOS = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const MAX_BYTES = 5 * 1024 * 1024;

/**
 * Guarda la imagen subida y devuelve su URL. Con BLOB_READ_WRITE_TOKEN usa Vercel Blob;
 * sin él (desarrollo local) la escribe en public/subidas. Si no se subió archivo,
 * devuelve la URL escrita a mano o la que ya existía.
 */
export async function resolverImagen(formData: FormData, campoArchivo: string, campoUrl: string, actual: string | null, carpeta: string) {
  const archivo = formData.get(campoArchivo);
  if (archivo instanceof File && archivo.size > 0) {
    if (!TIPOS.includes(archivo.type)) throw new Error("Formato de imagen no permitido (usa JPG, PNG, WebP o AVIF).");
    if (archivo.size > MAX_BYTES) throw new Error("La imagen pesa más de 5 MB.");
    const nombre = `${Date.now()}-${archivo.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-")}`;
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const blob = await put(`${carpeta}/${nombre}`, archivo, { access: "public" });
      return blob.url;
    }
    if (process.env.VERCEL) throw new Error("Falta BLOB_READ_WRITE_TOKEN para subir imágenes en producción.");
    const dir = path.join(process.cwd(), "public", "subidas", carpeta);
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, nombre), Buffer.from(await archivo.arrayBuffer()));
    return `/subidas/${carpeta}/${nombre}`;
  }
  const escrita = String(formData.get(campoUrl) ?? "").trim();
  return escrita || actual;
}
