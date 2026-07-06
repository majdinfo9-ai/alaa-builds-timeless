import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const nav = [
  { to: "/", label: "الرئيسية" },
  { to: "/#about", label: "من نحن" },
  { to: "/#services", label: "خدماتنا" },
  { to: "/#projects", label: "المشاريع" },
  { to: "/#contact", label: "تواصل" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const light = !scrolled;
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "backdrop-blur-md bg-background/80 border-b border-hairline/60" : "bg-transparent"
      }`}
    >
      <div className="container-x mx-auto flex h-20 max-w-[1440px] items-center justify-between">
        <Link to="/" className="flex flex-col leading-none">
          <span className={`text-[1.05rem] font-bold tracking-tight ${light ? "text-white" : "text-ink"}`}>آلاء البناء</span>
          <span className={`mt-1 text-[0.65rem] tracking-[0.3em] ${light ? "text-white/70" : "text-muted-foreground"}`}>ALAA · EST 2010</span>
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {nav.map((n) => {
            const active = n.to === path;
            return (
              <a
                key={n.to}
                href={n.to}
                className={`text-[0.85rem] tracking-wide transition-colors duration-300 ${
                  light
                    ? active ? "text-white" : "text-white/75 hover:text-white"
                    : active ? "text-ink" : "text-ink-soft hover:text-ink"
                }`}
              >
                {n.label}
              </a>
            );
          })}
        </nav>

        <a
          href="/#contact"
          className={`group hidden items-center gap-2 text-[0.8rem] font-semibold tracking-widest md:inline-flex ${light ? "text-white" : "text-ink"}`}
        >
          <span className="h-px w-6 bg-accent transition-all duration-500 group-hover:w-10" />
          احجز استشارة
        </a>
      </div>
    </header>
  );
}
