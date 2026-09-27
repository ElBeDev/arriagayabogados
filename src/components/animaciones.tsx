"use client";

import { animate, LazyMotion, m, MotionConfig, useInView, useMotionValue, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

// Las funciones de animación se descargan aparte (no bloquean el primer render).
const cargarFunciones = () => import("./motion-funciones").then((r) => r.default);

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={cargarFunciones} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}

/** Aparición suave al entrar en pantalla (fade + 16px). */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section";
}) {
  const Comp = m[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Comp>
  );
}

/** Número que cuenta hacia arriba al entrar en pantalla (valores de Motion, sin re-render por cuadro). */
export function Contador({ valor, sufijo = "" }: { valor: number; sufijo?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const enVista = useInView(ref, { once: true, margin: "-40px" });
  const reducido = useReducedMotion();
  const mv = useMotionValue(0);
  const texto = useTransform(mv, (v) => `${Math.round(v).toLocaleString("es-MX")}${sufijo}`);

  useEffect(() => {
    if (!enVista) return;
    if (reducido) {
      mv.set(valor);
      return;
    }
    const control = animate(mv, valor, { duration: 1.6, ease: [0.22, 1, 0.36, 1] });
    return () => control.stop();
  }, [enVista, reducido, valor, mv]);

  return (
    <span ref={ref} className="tabular-nums">
      <m.span aria-hidden>{texto}</m.span>
      {/* Valor final para lectores de pantalla y buscadores */}
      <span className="sr-only">
        {valor.toLocaleString("es-MX")}
        {sufijo}
      </span>
    </span>
  );
}

function Palabra({
  texto,
  progreso,
  rango,
}: {
  texto: string;
  progreso: MotionValue<number>;
  rango: [number, number];
}) {
  // Opacidad 0.5 → 1 sobre el color del texto: a 0.5 el contraste sigue siendo ≥ 3:1 en ambos modos.
  const opacity = useTransform(progreso, rango, [0.5, 1]);
  return (
    <m.span style={{ opacity }} className="inline">
      {texto}{" "}
    </m.span>
  );
}

/** Texto que se revela palabra por palabra (de tenue a pleno) conforme se hace scroll. */
export function TextoRevelado({ texto, className }: { texto: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reducido = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const palabras = texto.split(" ");

  if (reducido) {
    return (
      <p ref={ref} className={className}>
        {texto}
      </p>
    );
  }

  return (
    <p ref={ref} className={className}>
      {palabras.map((p, i) => (
        <Palabra
          key={i}
          texto={p}
          progreso={scrollYProgress}
          rango={[i / palabras.length, (i + 1) / palabras.length]}
        />
      ))}
    </p>
  );
}

/** Palabra gigante del hero con parallax leve. */
export function PalabraFantasma({ children }: { children: ReactNode }) {
  const reducido = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 120]);
  return (
    <m.div
      aria-hidden
      style={reducido ? undefined : { y }}
      className="pointer-events-none absolute inset-x-0 bottom-[6%] select-none text-center leading-none font-bold tracking-[-0.04em] whitespace-nowrap text-fantasma [mask-image:linear-gradient(to_bottom,black_25%,transparent_95%)]"
    >
      {children}
    </m.div>
  );
}
