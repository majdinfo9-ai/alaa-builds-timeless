import { motion, useMotionValue, useSpring, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef, type MouseEvent } from "react";
import { Reveal } from "./Reveal";
import { concreteImages, woodImages } from "@/lib/images";

type P = { title: string; loc: string; year: string; img: string; span: "sm"|"md"|"lg"|"xl" };

const projects: P[] = [
  { title: "فيلا الأثير",        loc: "الرياض · حي حطين",   year: "2024", img: woodImages[10], span: "xl" },
  { title: "مجمّع الرواق",       loc: "الرياض · العليا",     year: "2023", img: concreteImages[4], span: "md" },
  { title: "دار المهيدب",       loc: "الرياض · النرجس",     year: "2023", img: woodImages[24], span: "lg" },
  { title: "مبنى إداري — أ",     loc: "الخبر",              year: "2022", img: concreteImages[8], span: "sm" },
  { title: "فيلا الواحة",        loc: "الرياض · الملقا",     year: "2024", img: woodImages[40], span: "md" },
  { title: "برج تجاري",          loc: "جدة",                year: "2022", img: concreteImages[12], span: "xl" },
  { title: "منشأة حكومية",       loc: "الرياض",             year: "2021", img: concreteImages[16], span: "lg" },
  { title: "فيلا اليمامة",       loc: "الرياض · اليمامة",   year: "2024", img: woodImages[60], span: "md" },
];

const spanClass: Record<P["span"], string> = {
  sm: "md:col-span-3 md:row-span-4",
  md: "md:col-span-4 md:row-span-5",
  lg: "md:col-span-5 md:row-span-6",
  xl: "md:col-span-6 md:row-span-7",
};

export function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const reduce = useReducedMotion();
  const yA = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const yB = useTransform(scrollYProgress, [0, 1], ["0%", "-16%"]);
  const yC = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);

  return (
    <section id="projects" ref={ref} className="relative border-t border-hairline bg-background py-28 md:py-40">
      <div className="container-x mx-auto max-w-[1600px]">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal kind="up">
              <p className="text-[0.72rem] tracking-[0.4em] text-accent">مشاريع مختارة</p>
              <h2 className="mt-4 text-[2.2rem] font-bold leading-[1.1] text-ink md:text-[3.5rem]">
                أثرٌ نتركه <br /> على الأرض.
              </h2>
            </Reveal>
          </div>
          <Reveal kind="up" delay={0.1}>
            <p className="max-w-md text-[1rem] leading-[2] text-ink-soft">
              عيّنة من المشاريع التي أنجزناها في مختلف مدن المملكة، ما بين الفلل الفاخرة والمنشآت الحكومية والتجارية.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid auto-rows-[42px] grid-cols-1 gap-4 md:mt-24 md:grid-cols-12 md:gap-5">
          {projects.map((p, i) => {
            const y = reduce ? undefined : i % 3 === 0 ? yA : i % 3 === 1 ? yB : yC;
            return (
              <motion.div key={i} style={y ? { y } : undefined} className={`relative ${spanClass[p.span]}`}>
                <ProjectCard p={p} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ p }: { p: P }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 120, damping: 18 });
  const sry = useSpring(ry, { stiffness: 120, damping: 18 });

  function move(e: MouseEvent<HTMLDivElement>) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 5);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 5);
  }
  function leave() { rx.set(0); ry.set(0); }

  return (
    <motion.div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={leave}
      style={reduce ? undefined : { rotateX: srx, rotateY: sry, transformPerspective: 1200 }}
      className="group relative h-full min-h-[280px] w-full overflow-hidden bg-muted shadow-soft transition-shadow duration-700 hover:shadow-lift"
    >
      <motion.img
        src={p.img}
        alt={p.title}
        loading="lazy"
        whileHover={{ scale: 1.08 }}
        transition={{ duration: 1.6, ease: [0.2,0.8,0.2,1] }}
        className="h-full w-full object-cover"
      />
      <div aria-hidden className="absolute inset-0 transition-opacity duration-500" style={{ background: "linear-gradient(180deg, transparent 45%, rgba(23,23,23,0.7) 100%)" }} />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-white md:p-7">
        <div>
          <p className="text-[0.6rem] tracking-[0.3em] opacity-80">{p.year} · {p.loc}</p>
          <p className="mt-1 text-lg font-bold md:text-2xl">{p.title}</p>
        </div>
        <motion.span whileHover={{ y: -4 }} className="text-accent">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M4 14 L14 4 M6 4 L14 4 L14 12" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </motion.span>
      </div>
      <div aria-hidden className="absolute inset-3 border border-white/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </motion.div>
  );
}
