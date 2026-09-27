import Image from "next/image";

/** Escultura del hero (LCP de la home): JPG con fondo blanco fundido con el crema por multiply. */
export function EstatuaHero({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(min-width: 768px) 460px, 90vw"
      loading="eager"
      fetchPriority="high"
      className="object-contain object-bottom mix-blend-multiply"
    />
  );
}
