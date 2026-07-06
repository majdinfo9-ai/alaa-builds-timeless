import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { Link } from "@tanstack/react-router";

type Variant = "solid" | "ghost" | "dark-solid" | "glass";

type Props = {
  children: ReactNode;
  to?: string;
  href?: string;
  variant?: Variant;
  onClick?: () => void;
  className?: string;
};

const VARIANTS: Record<Variant, string> = {
  solid: "bg-ink text-background hover:bg-accent",
  ghost: "border border-hairline text-ink hover:border-ink",
  "dark-solid": "bg-[#0d0d0d] text-white hover:bg-[#1f1f1f]",
  glass:
    "border border-white/40 text-white backdrop-blur-md bg-white/5 hover:bg-white hover:text-[#0d0d0d] hover:border-white",
};

export function MagneticButton({ children, to, href, variant = "solid", onClick, className = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 150, damping: 15, mass: 0.4 });

  function handleMove(e: MouseEvent<HTMLElement>) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    x.set(dx * 0.2);
    y.set(dy * 0.2);
  }
  function reset() { x.set(0); y.set(0); }

  const base =
    "relative inline-flex items-center justify-center gap-3 px-8 py-4 text-[0.92rem] font-semibold tracking-wide select-none transition-colors duration-500";

  const inner = (
    <motion.span ref={ref} style={{ x: sx, y: sy, display: "inline-block" }} className={`${base} ${VARIANTS[variant]} ${className}`}>
      <span className="relative z-10">{children}</span>
      <span aria-hidden className="relative z-10 inline-block h-px w-6 bg-current opacity-70" />
    </motion.span>
  );

  if (to) {
    return (
      <Link to={to} onMouseMove={handleMove} onMouseLeave={reset} onClick={onClick} className="inline-block">
        {inner}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} onMouseMove={handleMove} onMouseLeave={reset} onClick={onClick} className="inline-block">
        {inner}
      </a>
    );
  }
  return (
    <button type="button" onMouseMove={handleMove} onMouseLeave={reset} onClick={onClick} className="inline-block">
      {inner}
    </button>
  );
}
