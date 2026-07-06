import { Reveal } from "./Reveal";

export function VisionMission() {
  const cards = [
    {
      k: "01",
      t: "الرؤية",
      d: "أن نكون المرجع الأول في المملكة لمشاريع البناء التي تجمع بين الجمال المعماري والدقة الإنشائية، وأن يُقاس عملنا بأثره الذي يبقى لعقود.",
      i: "M6 26 L26 26 L26 8 L20 8 L20 14 L14 14 L14 20 L6 20 Z",
    },
    {
      k: "02",
      t: "الرسالة",
      d: "نبني بمنهجية هندسية واضحة، بمواد مختارة، وبفريقٍ يحترم الوقت والميزانية والوعد. نسلّم عميلنا مشروعاً يفوق ما توقّعه.",
      i: "M4 28 L28 28 M16 4 L16 28 M8 16 L24 16 M10 22 L22 22",
    },
  ];
  return (
    <section className="relative border-t border-hairline bg-background py-28 md:py-40">
      <div className="container-x mx-auto max-w-[1440px]">
        <Reveal kind="up">
          <p className="text-[0.72rem] tracking-[0.4em] text-accent">مبادؤنا</p>
          <h2 className="mt-4 max-w-3xl text-[2.2rem] font-bold leading-[1.15] text-ink md:text-[3rem]">
            نعمل وفق مبادئ لا تتغيّر مع تغيّر السوق.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-6 md:mt-24 md:grid-cols-2 md:gap-10">
          {cards.map((c, i) => (
            <Reveal key={c.k} kind="up" delay={i * 0.1}>
              <div className="group relative overflow-hidden border border-hairline bg-card p-8 shadow-soft transition-all duration-700 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lift md:p-14">
                <div className="flex items-start justify-between">
                  <span className="text-[0.7rem] tracking-[0.35em] text-muted-foreground">{c.k}</span>
                  <svg width="52" height="52" viewBox="0 0 32 32" fill="none" className="text-accent transition-transform duration-700 group-hover:rotate-6">
                    <path d={c.i} stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                </div>
                <h3 className="mt-10 text-[2rem] font-bold text-ink md:text-[2.5rem]">{c.t}</h3>
                <p className="mt-6 max-w-lg text-[1rem] leading-[2] text-ink-soft">{c.d}</p>
                <div className="mt-12 h-px w-10 bg-accent transition-all duration-700 group-hover:w-full" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
