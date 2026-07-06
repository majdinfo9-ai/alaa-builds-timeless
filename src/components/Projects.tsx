import { motion, useScroll, useTransform, useReducedMotion, useSpring } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "./Reveal";
import { concreteImages, woodImages, constructionImages } from "@/lib/images";

// Curated mix — Woodworks & Interior featured most (visually strongest),
// balanced with Concrete Works and General Construction.
// Rhythm: wood, construction, wood, concrete, wood, wood, construction, concrete, wood, wood
type P = { img: string; ratio: string };

function pick(arr: string[], i: number) {
  if (!arr.length) return "";
  return arr[i % arr.length];
}

const projects: P[] = [
  { img: pick(woodImages, 10),        ratio: "aspect-[3/4]" },
  { img: pick(constructionImages, 3), ratio: "aspect-[4/5]" },
  { img: pick(woodImages, 24),        ratio: "aspect-[4/5]" },
  { img: pick(concreteImages, 4),     ratio: "aspect-[3/4]" },
  { img: pick(woodImages, 40),        ratio: "aspect-[4/5]" },
  { img: pick(woodImages, 55),        ratio: "aspect-[3/4]" },
  { img: pick(constructionImages, 14),ratio: "aspect-[4/5]" },
  { img: pick(concreteImages, 12),    ratio: "aspect-[3/4]" },
  { img: pick(woodImages, 70),        ratio: "aspect-[4/5]" },
  { img: pick(woodImages, 85),        ratio: "aspect-[3/4]" },
];

export function Projects() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  // Fraction of the horizontal track that must travel past the viewport.
  // 88% covers the track width (~200vw) minus the visible pane.
  const xRaw = useTransform(scrollYProgress, [0, 1], ["0%", "-62%"]);
  const x = useSpring(xRaw, { stiffness: 90, damping: 24, mass: 0.4 });

  // Outer height controls how long the pin lasts. ~300vh feels cinematic.
  const outerHeight = "h-[320vh]";

  return (
    <section id="projects" className="relative border-t border-hairline bg-background">
      {/* Intro header — sits above the pinned track */}
      <div className="container-x mx-auto max-w-[1440px] pt-28 md:pt-40">
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
      </div>

      {reduce ? (
        // Reduced motion: simple responsive grid, no pinning
        <div className="container-x mx-auto mt-16 grid max-w-[1440px] grid-cols-1 gap-8 pb-28 sm:grid-cols-2 lg:grid-cols-3 md:pb-40">
          {projects.map((p, i) => (
            <div key={i} className={`relative overflow-hidden bg-muted ${p.ratio}`}>
              <img src={p.img} alt="" loading="lazy" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      ) : (
        <div ref={wrapRef} className={`relative ${outerHeight}`}>
          <div className="sticky top-0 flex h-screen items-center overflow-hidden">
            {/* Direction is LTR here so translating negatively moves rightward images off to the left,
                which visually reads as "sliding from right to left" for our RTL viewer. */}
            <motion.div
              dir="ltr"
              style={{ x }}
              className="flex items-center gap-8 pl-[8vw] pr-[8vw] md:gap-12"
            >
              {projects.map((p, i) => (
                <ProjectFrame key={i} p={p} index={i} total={projects.length} />
              ))}
            </motion.div>

            {/* Progress hint bottom-left */}
            <ScrollHint progress={scrollYProgress} />
          </div>
        </div>
      )}
    </section>
  );
}

function ProjectFrame({ p, index, total }: { p: P; index: number; total: number }) {
  // Alternating vertical offset for editorial rhythm
  const offset = index % 2 === 0 ? "mt-0" : "mt-16";
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
      className={`relative shrink-0 ${offset}`}
      style={{ width: "clamp(260px, 32vw, 520px)" }}
    >
      <div className={`relative overflow-hidden bg-muted shadow-soft ${p.ratio}`}>
        <img
          src={p.img}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(.2,.8,.2,1)] hover:scale-[1.04]"
        />
      </div>
      <div className="mt-4 flex items-center justify-between text-[0.6rem] tracking-[0.4em] text-muted-foreground">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <span>{String(total).padStart(2, "0")}</span>
      </div>
    </motion.div>
  );
}

function ScrollHint({ progress }: { progress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const w = useTransform(progress, [0, 1], ["0%", "100%"]);
  return (
    <div className="pointer-events-none absolute bottom-10 left-1/2 z-10 -translate-x-1/2">
      <div className="flex items-center gap-4">
        <span className="text-[0.6rem] tracking-[0.35em] text-muted-foreground">SCROLL</span>
        <div className="relative h-px w-40 bg-hairline">
          <motion.div style={{ width: w }} className="absolute inset-y-0 left-0 bg-accent" />
        </div>
      </div>
    </div>
  );
}
