import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

export function Counter({ to, suffix = "", duration = 2200 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [n, setN] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduce) { setN(to); return; }
    const start = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduce]);

  return (
    <span ref={ref} className="tabular-nums">
      {n.toLocaleString("ar-EG")}
      {suffix}
    </span>
  );
}
