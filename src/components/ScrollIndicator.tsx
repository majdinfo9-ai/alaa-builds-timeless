import { useRouterState } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

const sections = [
  { id: "hero", label: "الرئيسية" },
  { id: "about", label: "من نحن" },
  { id: "values", label: "قِيَمنا" },
  { id: "services", label: "خدماتنا" },
  { id: "projects", label: "المشاريع" },
  { id: "team", label: "الفريق" },
  { id: "contact", label: "تواصل" },
];

export function ScrollIndicator() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);
  const enabled = pathname === "/";

  // Reset progress + active whenever we navigate — avoids stale state
  // when returning from a service page to the home page.
  useEffect(() => {
    setProgress(0);
    setActive(0);
  }, [pathname]);

  useEffect(() => {
    if (!enabled) return;
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    // Delay one frame so layout is measured after navigation
    const raf = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [enabled, pathname]);

  // Active-section detection, computed directly from each section's position
  // on every scroll tick. Unlike IntersectionObserver, this can never get
  // "stuck" after a route change — there's no reliance on intersection state
  // transitions firing correctly right after the DOM re-mounts.
  useEffect(() => {
    if (!enabled) return;

    const els = sections.map((s) => document.getElementById(s.id));

    const onScroll = () => {
      const line = window.innerHeight * 0.45;
      let current = 0;
      els.forEach((el, i) => {
        if (!el) return;
        if (el.getBoundingClientRect().top <= line) current = i;
      });
      setActive(current);
    };

    // Run once on mount/navigation (after layout settles), then on every scroll/resize
    const raf = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [enabled, pathname]);

  const dots = useMemo(() => sections, []);
  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
      style={{ height: "44vh" }}
    >
      <div className="relative h-full w-px bg-white/15">
        <div
          className="absolute inset-x-0 top-0 bg-[#A98A5A] transition-[height] duration-200 ease-out"
          style={{ height: `${progress * 100}%` }}
        />
        {dots.map((s, i) => {
          const top = (i / (dots.length - 1)) * 100;
          const isActive = i === active;
          return (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="pointer-events-auto group absolute -left-2 flex items-center gap-3"
              style={{ top: `${top}%`, transform: "translateY(-50%)" }}
            >
              <span
                className={`block rounded-full transition-all duration-500 ${
                  isActive ? "h-2.5 w-2.5 bg-[#A98A5A] shadow-[0_0_0_4px_rgba(169,138,90,0.15)]" : "h-1.5 w-1.5 bg-white/40 group-hover:bg-white/80"
                }`}
              />
              <span
                className={`whitespace-nowrap text-[0.7rem] tracking-[0.28em] transition-all duration-500 ${
                  isActive ? "opacity-100 text-[#A98A5A]" : "opacity-0 -translate-x-1 text-white/70 group-hover:opacity-100 group-hover:translate-x-0"
                }`}
              >
                {s.label}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}