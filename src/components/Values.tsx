import { useState } from "react";
import { motion } from "framer-motion";
import concrete from "@/assets/material-concrete.jpg";
import steel from "@/assets/material-steel.jpg";
import wood from "@/assets/material-wood.jpg";
import stone from "@/assets/material-stone.jpg";
import { Reveal } from "./Reveal";

const materials = [
  { name: "الخرسانة", en: "CONCRETE", d: "قوة صامتة تحمل كل ما نبنيه.", img: concrete },
  { name: "الحديد", en: "STEEL", d: "هيكل يُحاكي الطموح.", img: steel },
  { name: "الخشب", en: "WOOD", d: "دفء الحرفة اليدوية.", img: wood },
  { name: "الحجر", en: "STONE", d: "ذاكرة عمرها آلاف السنين.", img: stone },
];

export function Values() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <section id="values" className="relative border-t border-hairline bg-surface py-28 md:py-40">
      <div className="container-x mx-auto max-w-[1440px]">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div>
            <Reveal kind="up">
              <p className="text-[0.72rem] tracking-[0.4em] text-accent">قيمنا</p>
              <h2 className="mt-4 text-[2.2rem] font-bold leading-[1.1] text-ink md:text-[3.2rem]">
                مواد لا شعارات.
              </h2>
            </Reveal>
          </div>
          <Reveal kind="up" delay={0.1}>
            <p className="max-w-md text-[1rem] leading-[2] text-ink-soft">
              نؤمن بالمادة التي نلمسها أكثر من الكلام عنها. اختيارنا للمواد هو أول قرار في أي مشروع.
            </p>
          </Reveal>
        </div>

        <div
          className="mt-16 grid grid-cols-1 gap-4 md:mt-24 md:grid-cols-4"
          onMouseLeave={() => setActive(null)}
        >
          {materials.map((m, i) => {
            const isDim = active !== null && active !== i;
            return (
              <Reveal key={m.en} kind="up" delay={i * 0.08}>
                <motion.div
                  onMouseEnter={() => setActive(i)}
                  animate={{ filter: isDim ? "grayscale(0.8) brightness(0.85)" : "grayscale(0) brightness(1)", opacity: isDim ? 0.65 : 1 }}
                  transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
                  className="group relative aspect-[3/4] overflow-hidden bg-muted"
                >
                  <motion.img
                    src={m.img}
                    alt={m.name}
                    loading="lazy"
                    animate={{ scale: active === i ? 1.12 : 1.02 }}
                    transition={{ duration: 1.6, ease: [0.2, 0.8, 0.2, 1] }}
                    className="h-full w-full object-cover"
                  />
                  <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(23,23,23,0.05) 40%, rgba(23,23,23,0.65) 100%)" }} />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <p className="text-[0.65rem] tracking-[0.4em] opacity-80">{m.en}</p>
                    <p className="mt-2 text-2xl font-bold">{m.name}</p>
                    <motion.p
                      initial={false}
                      animate={{ opacity: active === i ? 1 : 0, y: active === i ? 0 : 8 }}
                      transition={{ duration: 0.5 }}
                      className="mt-3 text-[0.85rem] leading-6 text-white/85"
                    >
                      {m.d}
                    </motion.p>
                  </div>
                  <div aria-hidden className="absolute inset-3 border border-white/15" />
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
