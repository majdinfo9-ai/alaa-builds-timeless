import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Kind = "up" | "blur" | "scale" | "line";

const easing = [0.2, 0.8, 0.2, 1] as const;

export function Reveal({
  children,
  kind = "up",
  delay = 0,
  className,
  amount = 0.3,
}: {
  children: ReactNode;
  kind?: Kind;
  delay?: number;
  className?: string;
  amount?: number;
}) {
  const reduce = useReducedMotion();
  const variants: Record<Kind, Variants> = {
    up: {
      hidden: { opacity: 0, y: 32 },
      show: { opacity: 1, y: 0, transition: { duration: 1.1, ease: easing, delay } },
    },
    blur: {
      hidden: { opacity: 0, filter: "blur(14px)", y: 16 },
      show: {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        transition: { duration: 1.4, ease: easing, delay },
      },
    },
    scale: {
      hidden: { opacity: 0, scale: 1.06 },
      show: { opacity: 1, scale: 1, transition: { duration: 1.6, ease: easing, delay } },
    },
    line: {
      hidden: { scaleX: 0 },
      show: { scaleX: 1, transition: { duration: 1.2, ease: easing, delay } },
    },
  };
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      style={kind === "line" ? { transformOrigin: "right" } : undefined}
      variants={variants[kind]}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  );
}

export function SplitLines({
  text,
  className,
  delay = 0,
  immediate = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  immediate?: boolean;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  if (reduce) return <span className={className}>{text}</span>;
  const anim = immediate
    ? { animate: { y: 0, opacity: 1, filter: "blur(0px)" } }
    : {
        whileInView: { y: 0, opacity: 1, filter: "blur(0px)" },
        viewport: { once: true, amount: 0.3 } as const,
      };
  return (
    <span className={className} style={{ display: "inline" }}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          style={{ display: "inline-block", willChange: "transform, opacity" }}
          initial={{ y: 40, opacity: 0, filter: "blur(8px)" }}
          {...anim}
          transition={{ duration: 1.1, ease: easing, delay: delay + i * 0.07 }}
        >
          {w}
          {i < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </span>
  );
}
