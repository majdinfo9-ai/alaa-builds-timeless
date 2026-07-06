import { motion } from "framer-motion";
import { MagneticButton } from "./MagneticButton";
import { Reveal } from "./Reveal";

export function CTA() {
  return (
    <section className="relative overflow-hidden border-t border-hairline" style={{ backgroundColor: "#181818" }}>
      <div aria-hidden className="absolute inset-0 blueprint-grid-dark" />
      <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full">
        <motion.line x1="0" y1="35%" x2="100%" y2="35%" stroke="#A98A5A" strokeOpacity="0.25" strokeWidth="0.5"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2.4, ease: [0.7,0,.2,1] }} />
        <motion.line x1="0" y1="72%" x2="100%" y2="72%" stroke="#A98A5A" strokeOpacity="0.15" strokeWidth="0.5"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2.4, delay: 0.3, ease: [0.7,0,.2,1] }} />
        <motion.line x1="18%" y1="0" x2="18%" y2="100%" stroke="#A98A5A" strokeOpacity="0.15" strokeWidth="0.5"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2.6, ease: [0.7,0,.2,1] }} />
        <motion.line x1="82%" y1="0" x2="82%" y2="100%" stroke="#A98A5A" strokeOpacity="0.15" strokeWidth="0.5"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2.6, delay: 0.2, ease: [0.7,0,.2,1] }} />
      </svg>

      <div className="container-x relative z-10 mx-auto max-w-[1440px] py-32 md:py-48">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <Reveal kind="up">
              <p className="text-[0.72rem] tracking-[0.4em] text-accent">لنبدأ الحوار</p>
            </Reveal>
            <Reveal kind="blur" delay={0.1}>
              <h2 className="mt-6 text-[2.6rem] font-bold leading-[1.05] text-white md:text-[5.5rem]">
                جاهزون <br /> لبناء مشروعكم؟
              </h2>
            </Reveal>
            <Reveal kind="up" delay={0.2}>
              <p className="mt-8 max-w-xl text-[1rem] leading-[2.1] text-white/70">
                شاركنا فكرتك في أسطر قليلة، وسيرد عليك أحد مديري المشاريع خلال يوم عمل.
              </p>
            </Reveal>
          </div>
          <div className="flex flex-col items-start gap-6 md:col-span-4 md:items-end">
            <Reveal kind="up" delay={0.3}>
              <MagneticButtonDark />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function MagneticButtonDark() {
  return (
    <MagneticButton
      href="mailto:info@alaa-bg.com"
      variant="ghost"
      className="!border-white/25 !text-white hover:!border-accent hover:!bg-accent"
    >
      ابدأ مشروعك
    </MagneticButton>
  );
}
