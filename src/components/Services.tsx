import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import {
  constructionImages,
  concreteImages,
  woodImages,
  constructionHero,
  concreteHero,
  woodHero,
} from "@/lib/images";

export const services = [
  {
    slug: "construction",
    title: "مقاولات عامة",
    en: "GENERAL CONSTRUCTION",
    short: "تنفيذ مشاريع سكنية وتجارية وحكومية من الأساسات حتى التسليم النهائي.",
    cover: constructionHero,
    gallery: constructionImages.slice(0, 24),
  },
  {
    slug: "concrete",
    title: "أعمال الخرسانة",
    en: "CONCRETE WORKS",
    short: "تسليح، صبّ، ومعالجة خرسانية بمواصفات هندسية دقيقة لكل عنصر إنشائي.",
    cover: concreteHero,
    gallery: concreteImages,
  },
  {
    slug: "woodworks",
    title: "الخشبيات والديكور",
    en: "WOODWORKS & INTERIORS",
    short: "خزائن، تشطيبات، ووحدات خشبية مصنّعة بحرفية عالية وتصميم مدروس.",
    cover: woodHero,
    gallery: woodImages,
  },
] as const;

export function Services() {
  return (
    <section id="services" className="relative border-t border-hairline bg-background py-28 md:py-40">
      <div className="container-x mx-auto max-w-[1440px]">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal kind="up">
              <p className="text-[0.72rem] tracking-[0.4em] text-accent">خدماتنا</p>
              <h2 className="mt-4 text-[2.2rem] font-bold leading-[1.1] text-ink md:text-[3.2rem]">
                ثلاث ممارسات <br /> تحت مظلة واحدة.
              </h2>
            </Reveal>
          </div>
          <Reveal kind="up" delay={0.1}>
            <p className="max-w-md text-[1rem] leading-[2] text-ink-soft">
              كل ممارسة تُقاد بفريق مستقل يجمع الهندسة والتصميم والتنفيذ في نسيجٍ واحد.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 md:mt-24 md:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.slug} kind="up" delay={i * 0.1}>
              <Link
                to="/services/$slug"
                params={{ slug: s.slug }}
                resetScroll
                className="group relative flex h-full flex-col overflow-hidden border border-hairline bg-card shadow-soft transition-all duration-700 hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                  <motion.img
                    src={s.cover}
                    alt={s.title}
                    loading="lazy"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 1.6, ease: [0.2,0.8,0.2,1] }}
                    className="h-full w-full object-cover"
                  />
                  <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 55%, rgba(23,23,23,0.55) 100%)" }} />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-white">
                    <span className="text-[0.62rem] tracking-[0.4em] opacity-80">{s.en}</span>
                    <span className="text-[0.7rem] tracking-[0.3em]">0{i + 1}</span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-between p-7 md:p-9">
                  <div>
                    <h3 className="text-[1.6rem] font-bold text-ink">{s.title}</h3>
                    <p className="mt-4 text-[0.95rem] leading-8 text-ink-soft">{s.short}</p>
                  </div>
                  <div className="mt-8 flex items-center justify-between">
                    <span className="text-[0.78rem] font-semibold tracking-[0.25em] text-ink">تعرّف أكثر</span>
                    <span className="flex items-center gap-2 text-accent">
                      <span className="h-px w-8 bg-accent transition-all duration-500 group-hover:w-16" />
                      <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
                        <path d="M11 1 L17 6 L11 11 M17 6 L1 6" stroke="currentColor" strokeWidth="1.4" />
                      </svg>
                    </span>
                  </div>
                </div>
                <span aria-hidden className="pointer-events-none absolute inset-0 border border-transparent transition-colors duration-700 group-hover:border-accent/30" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
