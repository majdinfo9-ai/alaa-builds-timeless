import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroVilla from "@/assets/hero-villa.jpg";
import { HeroScene } from "./HeroScene";
import { MagneticButton } from "./MagneticButton";
import { Counter } from "./Counter";
import { SplitLines } from "./Reveal";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);
  const overlayOp = useTransform(scrollYProgress, [0, 1], [0.35, 0.6]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);

  return (
    <section ref={ref} className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* image */}
      <motion.div
        aria-hidden
        style={reduce ? undefined : { y: imgY, scale: imgScale }}
        className="absolute inset-0"
      >
        <img
          src={heroVilla}
          alt=""
          width={1920}
          height={1280}
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* warm overlay */}
      <motion.div
        aria-hidden
        style={reduce ? { opacity: 0.35 } : { opacity: overlayOp }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(247,244,239,0.15) 0%, rgba(247,244,239,0.55) 60%, #F7F4EF 100%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 30%, rgba(169,138,90,0.10), transparent 60%)" }} />
      </motion.div>

      {/* blueprint grid */}
      <div aria-hidden className="absolute inset-0 blueprint-grid opacity-70" />

      {/* animated construction lines */}
      <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <motion.line x1="0" y1="20%" x2="100%" y2="20%" stroke="#A98A5A" strokeWidth="0.5" strokeOpacity="0.35"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.4, ease: [0.7,0,.2,1], delay: 0.6 }} />
        <motion.line x1="18%" y1="0" x2="18%" y2="100%" stroke="#A98A5A" strokeWidth="0.5" strokeOpacity="0.25"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.6, ease: [0.7,0,.2,1], delay: 0.9 }} />
        <motion.line x1="82%" y1="0" x2="82%" y2="100%" stroke="#A98A5A" strokeWidth="0.5" strokeOpacity="0.25"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.6, ease: [0.7,0,.2,1], delay: 1.1 }} />
      </svg>

      {/* 3D scene */}
      <div className="pointer-events-none absolute inset-0 opacity-70 mix-blend-multiply">
        <HeroScene />
      </div>

      {/* content */}
      <motion.div
        style={reduce ? undefined : { y: contentY }}
        className="container-x relative z-10 mx-auto flex min-h-screen max-w-[1440px] flex-col justify-between pt-32 pb-14"
      >
        <div className="flex items-center gap-4">
          <motion.span
            className="h-px w-16 bg-accent origin-right"
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.2, ease: [0.7,0,.2,1], delay: 0.4 }}
          />
          <motion.span
            className="text-[0.72rem] font-semibold tracking-[0.4em] text-accent"
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }}
          >
            EST · 2010 · مقاولات · هندسة · تصميم
          </motion.span>
        </div>

        <div className="max-w-4xl">
          <h1 className="text-[13vw] font-bold leading-[0.95] tracking-tight text-ink md:text-[8.5vw] lg:text-[7.2rem]">
            <span className="block">
              <SplitLines text="نبني المستقبل" delay={0.2} immediate />
            </span>
            <span className="mt-3 block text-accent">
              <SplitLines text="بأيادٍ خبيرة" delay={0.55} immediate />
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: [0.2,0.8,0.2,1], delay: 1.1 }}
            className="mt-10 max-w-xl text-[1.02rem] leading-[2.1] text-ink-soft md:text-[1.1rem]"
          >
            نبني مشاريع تجمع بين الدقة الهندسية، جودة التنفيذ، والتصميم المدروس منذ أكثر من خمسة عشر عاماً.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.4 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton href="/#projects">استعرض مشاريعنا</MagneticButton>
            <MagneticButton href="/#contact" variant="ghost">تواصل معنا</MagneticButton>
          </motion.div>
        </div>

        <Stats />
      </motion.div>
    </section>
  );
}

function Stats() {
  const items = [
    { n: 15, s: "+", l: "عاماً من الخبرة" },
    { n: 1000, s: "+", l: "مشروع منفَّذ" },
    { n: 20000, s: "+", l: "عميل" },
    { n: 98, s: "%", l: "رضا العملاء" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 1.7 }}
      className="mt-24 grid grid-cols-2 gap-y-10 border-t border-hairline/70 pt-10 md:grid-cols-4"
    >
      {items.map((it, i) => (
        <div key={i} className="flex flex-col gap-2">
          <span className="text-[2.5rem] font-bold leading-none text-ink md:text-[3.2rem]">
            <Counter to={it.n} suffix={it.s} />
          </span>
          <span className="text-[0.75rem] tracking-[0.25em] text-muted-foreground">{it.l}</span>
        </div>
      ))}
    </motion.div>
  );
}
