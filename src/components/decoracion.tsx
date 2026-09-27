import Image from "next/image";

/** Sello de la marca (estático) que se encaja en la muesca de la foto a todo lo ancho. */
export function SelloMuesca() {
  return (
    <div
      aria-hidden
      className="sobre-oscuro flex size-[128px] items-center justify-center rounded-full bg-nogal md:size-[150px]"
    >
      <Image src="/marca/sello-crema.svg" alt="" width={150} height={150} className="size-[88%]" />
    </div>
  );
}
