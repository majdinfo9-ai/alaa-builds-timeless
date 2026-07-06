import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import heroVilla from "@/assets/hero-villa.jpg";
import { MagneticButton } from "./MagneticButton";
import { Counter } from "./Counter";
import { SplitLines } from "./Reveal";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // scroll-driven
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.12]);
  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);
  const contentOp = useTransform(scrollYProgress, [0, 0.9], [1, 0.4]);

  // mouse parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 20, mass: 0.6 });
  const smy = useSpring(my, { stiffness: 60, damping: 20, mass: 0.6 });
  const bgX = useTransform(smx, (v) => `${v * -14}px`);
  const bgY = useTransform(smy, (v) => `${v * -14}px`);
  const midX = useTransform(smx, (v) => `${v * -26}px`);
  const midY = useTransform(smy, (v) => `${v * -26}px`);
  const txtX = useTransform(smx, (v) => `${v * 8}px`);
  const txtY = useTransform(smy, (v) => `${v * 8}px`);

  useEffect(() => {
    if (reduce) return;
    function onMove(e: MouseEvent) {
      const w = window.innerWidth;
      const h = window.innerHeight;
      mx.set((e.clientX / w - 0.5) * 2);
      my.set((e.clientY / h - 0.5) * 2);
    }
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my, reduce]);

  return (
    <section id="hero" ref={ref} className="relative min-h-screen w-full overflow-hidden bg-[#0d0d0d]">
      {/* image with mouse + scroll parallax */}
      <motion.div
        aria-hidden
        style={reduce ? undefined : { y: imgY, scale: imgScale, x: bgX, translateY: bgY }}
        className="absolute -inset-8"
      >
        <img
          src={heroVilla}
          alt=""
          width={1920}
          height={1280}
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* soft base darkening for legibility floor */}
      <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,10,10,0.35) 0%, rgba(10,10,10,0.15) 40%, rgba(10,10,10,0.55) 100%)" }} />

      {/* blueprint grid — subtle, slow parallax with scroll and mouse */}
      <motion.div
        aria-hidden
        style={reduce ? undefined : { y: gridY, x: midX, translateY: midY }}
        className="absolute -inset-10 blueprint-grid opacity-[0.18]"
      />

      {/* radial gradient behind text only */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 62% 55% at 30% 62%, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0) 75%)",
        }}
      />

      {/* thin architectural draw lines */}
      <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <motion.line x1="0" y1="22%" x2="100%" y2="22%" stroke="#A98A5A" strokeWidth="0.5" strokeOpacity="0.35"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.4, ease: [0.7,0,.2,1], delay: 0.6 }} />
        <motion.line x1="82%" y1="0" x2="82%" y2="100%" stroke="#A98A5A" strokeWidth="0.5" strokeOpacity="0.22"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.6, ease: [0.7,0,.2,1], delay: 1.0 }} />
      </svg>

      {/* content */}
      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOp, x: txtX, translateY: txtY }}
        className="container-x relative z-10 mx-auto flex min-h-screen max-w-[1440px] flex-col justify-between pt-36 pb-16 text-white"
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
            <span className="block text-[12vw] leading-[1.05] text-white md:text-[8vw] lg:text-[7rem]">
              <SplitLines text="نبني المستقبل" delay={0.2} immediate />
            </span>
            <span className="mt-8 block text-[12vw] leading-[1.05] md:mt-10 md:text-[8vw] lg:mt-14 lg:text-[7rem]" style={{ color: "#A98A5A" }}>
              <SplitLines text="بأيادٍ خبيرة" delay={0.55} immediate />
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: [0.2,0.8,0.2,1], delay: 1.1 }}
            className="mt-14 max-w-lg text-[1.02rem] leading-[2.15] md:text-[1.08rem]"
            style={{ color: "rgba(255,255,255,0.90)" }}
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
    { n: 1000, s: "+", l: "مشروع منفَّذ" },
    { n: 20000, s: "+", l: "عميل" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 1.7 }}
      className="mt-24 grid grid-cols-1 gap-y-10 border-t border-white/15 pt-10 sm:grid-cols-3 sm:gap-x-16"
    >
      {items.map((it, i) => (
        <div key={i} className="flex flex-col gap-3">
          <span className="text-[2.6rem] font-bold leading-none text-white md:text-[3.4rem]">
            <Counter to={it.n} suffix={it.s} />
          </span>
          <span className="text-[0.72rem] tracking-[0.3em]" style={{ color: "rgba(255,255,255,0.75)" }}>{it.l}</span>
        </div>
      ))}
    </motion.div>
  );
}
