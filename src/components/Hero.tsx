import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroVilla from "@/assets/hero-villa.jpg";
import { MagneticButton } from "./MagneticButton";
import { Counter } from "./Counter";
import { SplitLines } from "./Reveal";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // gentle scroll-only parallax
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.10]);
  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-4%"]);
  const contentOp = useTransform(scrollYProgress, [0, 0.9], [1, 0.5]);

  return (
    <section id="hero" ref={ref} className="relative min-h-screen w-full overflow-hidden bg-[#0d0d0d]">
      {/* image with scroll parallax + very slow ambient drift */}
      <motion.div
        aria-hidden
        style={reduce ? undefined : { y: imgY, scale: imgScale }}
        className="absolute -inset-6"
      >
        <motion.img
          src={heroVilla}
          alt=""
          width={1920}
          height={1280}
          className="h-full w-full object-cover"
          initial={reduce ? undefined : { x: 0 }}
          animate={reduce ? undefined : { x: [0, -14, 0] }}
          transition={{ duration: 28, ease: "easeInOut", repeat: Infinity }}
        />
      </motion.div>

      {/* base darkening floor for consistent legibility */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,10,10,0.35) 0%, rgba(10,10,10,0.18) 45%, rgba(10,10,10,0.55) 100%)",
        }}
      />

      {/* directional gradient anchoring the text side (RTL: right) */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(270deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.35) 35%, rgba(0,0,0,0.05) 65%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* blueprint grid — subtle, slow scroll parallax only */}
      <motion.div
        aria-hidden
        style={reduce ? undefined : { y: gridY }}
        className="absolute -inset-10 blueprint-grid opacity-[0.14]"
      />

      {/* thin architectural draw lines */}
      <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <motion.line x1="0" y1="22%" x2="100%" y2="22%" stroke="#C9A55C" strokeWidth="0.5" strokeOpacity="0.4"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.4, ease: [0.7,0,.2,1], delay: 0.6 }} />
        <motion.line x1="82%" y1="0" x2="82%" y2="100%" stroke="#C9A55C" strokeWidth="0.5" strokeOpacity="0.25"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.6, ease: [0.7,0,.2,1], delay: 1.0 }} />
      </svg>

      {/* content */}
      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOp }}
        className="container-x relative z-10 mx-auto flex min-h-screen max-w-[1440px] flex-col justify-between pt-44 pb-16 md:pt-52 text-white"
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
          <h1 className="font-bold tracking-tight">
            <span className="block text-[13vw] leading-[1.02] text-white md:text-[8.4vw] lg:text-[7.2rem]">
              <SplitLines text="نبني المستقبل" delay={0.2} immediate />
            </span>
            <span
              className="mt-14 block text-[13vw] leading-[1.02] md:mt-20 md:text-[8.4vw] lg:mt-24 lg:text-[7.2rem]"
              style={{ color: "#D4B26A" }}
            >
              <SplitLines text="بأيادٍ خبيرة" delay={0.6} immediate />
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: [0.2,0.8,0.2,1], delay: 1.15 }}
            className="mt-16 max-w-lg text-[1.02rem] leading-[2.15] md:text-[1.08rem]"
            style={{ color: "rgba(255,255,255,0.92)" }}
          >
            نبني مشاريع تجمع بين الدقة الهندسية، جودة التنفيذ، والتصميم المدروس منذ أكثر من خمسة عشر عاماً.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.4 }}
            className="mt-12 flex flex-wrap items-center gap-4"
          >
            <MagneticButton href="/#projects" variant="dark-solid">استعرض مشاريعنا</MagneticButton>
            <MagneticButton href="/#contact" variant="glass">تواصل معنا</MagneticButton>
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
    { n: 1000, s: "+", l: "مشروع" },
    { n: 20000, s: "+", l: "عميل" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 1.7 }}
      className="mt-24 grid grid-cols-1 gap-y-12 border-t border-white/15 pt-12 sm:grid-cols-3 sm:gap-x-20"
    >
      {items.map((it, i) => (
        <div key={i} className="flex flex-col items-start gap-4">
          <span className="text-[2.8rem] font-bold leading-none tracking-tight text-white md:text-[3.6rem]">
            <Counter to={it.n} suffix={it.s} />
          </span>
          <span className="text-[0.72rem] tracking-[0.32em] uppercase" style={{ color: "rgba(255,255,255,0.78)" }}>
            {it.l}
          </span>
        </div>
      ))}
    </motion.div>
  );
}
