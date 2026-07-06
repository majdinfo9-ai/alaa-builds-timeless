import { motion, useMotionValue, useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { useRef, type MouseEvent } from "react";
import companyImg from "@/assets/company.jpg";
import { Reveal } from "./Reveal";

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const numOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.05, 0.1, 0.04]);
  const numX = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 100, damping: 20 });
  const sry = useSpring(ry, { stiffness: 100, damping: 20 });

  function handleTilt(e: MouseEvent<HTMLDivElement>) {
    if (reduce || !cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 9);
    rx.set(-py * 9);
  }
  function resetTilt() { rx.set(0); ry.set(0); }

  return (
    <section id="about" ref={ref} className="relative overflow-hidden border-t border-hairline bg-background py-32 md:py-48">
      <motion.span
        aria-hidden
        style={reduce ? { opacity: 0.06 } : { opacity: numOpacity, x: numX }}
        className="pointer-events-none absolute -top-10 right-[-4vw] select-none font-bold leading-none text-ink"
      >
        <span className="block text-[38vw] md:text-[26vw]">2010</span>
      </motion.span>

      <div className="container-x relative z-10 mx-auto max-w-[1440px]">
        <div className="grid gap-16 md:grid-cols-12 md:gap-24">
          <div className="md:col-span-6">
            <Reveal kind="up">
              <p className="text-[0.72rem] tracking-[0.4em] text-accent">من نحن</p>
              <h2 className="mt-5 text-[2.4rem] font-bold leading-[1.15] text-ink md:text-[3.5rem]">
                خمسة عشر عاماً <br /> من بناء ما يبقى.
              </h2>
            </Reveal>

            <div className="mt-10 space-y-7 text-[1rem] leading-[2.05] text-ink-soft md:text-[1.05rem]">
              <Reveal kind="blur" delay={0.1}>
                <p>
                  نحن فريق من المهندسين والمصممين والمنفذين نجمع بين حرفية التصميم وصرامة الهندسة.
                  انطلقنا عام <span className="text-ink">2010</span> برؤية بسيطة: أن نبني بجودة تُشعِر أصحابها بالفخر بعد عقود.
                </p>
              </Reveal>
              <Reveal kind="blur" delay={0.2}>
                <p>
                  ننفّذ الفلل السكنية الفاخرة، المباني التجارية، والمنشآت الحكومية بمعايير تصميم مدروسة،
                  وحلول إنشائية تُختار بعناية، وإدارة موقع دقيقة تحترم الوقت والميزانية.
                </p>
              </Reveal>
              <Reveal kind="blur" delay={0.3}>
                <p>
                  لا نتعامل مع أي مشروع كصفقة، بل كأثرٍ سيُقرأ لاحقاً في المكان الذي نبنيه.
                </p>
              </Reveal>
            </div>

            <Reveal kind="up" delay={0.2}>
              <div className="mt-14 grid grid-cols-2 gap-8 border-t border-hairline pt-8 text-sm">
                <div>
                  <p className="text-[0.7rem] tracking-[0.3em] text-muted-foreground">التخصص</p>
                  <p className="mt-2 text-ink">مقاولات · هندسة · تصميم</p>
                </div>
                <div>
                  <p className="text-[0.7rem] tracking-[0.3em] text-muted-foreground">المقر</p>
                  <p className="mt-2 text-ink">الرياض · السعودية</p>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="relative md:col-span-6">
            <motion.div
              ref={cardRef}
              onMouseMove={handleTilt}
              onMouseLeave={resetTilt}
              style={reduce ? undefined : { rotateX: srx, rotateY: sry, transformPerspective: 1200 }}
              className="relative aspect-[4/5] w-full overflow-hidden bg-muted shadow-lift"
            >
              <motion.img
                src={companyImg}
                alt="مقر الشركة"
                loading="lazy"
                style={reduce ? undefined : { scale: imgScale }}
                className="h-full w-full object-cover"
              />
              <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 55%, rgba(23,23,23,0.28) 100%)" }} />
              <div aria-hidden className="absolute inset-4 border border-white/20" />
            </motion.div>
            <div aria-hidden className="absolute -bottom-6 -left-6 hidden h-24 w-24 border border-accent md:block" />
          </div>
        </div>
      </div>
    </section>
  );
}
