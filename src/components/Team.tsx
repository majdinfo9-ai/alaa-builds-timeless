import { Reveal } from "./Reveal";

const team = [
  { name: "م. عبدالله آلاء", role: "المؤسس · مدير عام" },
  { name: "م. سلمان الحربي", role: "مدير الهندسة الإنشائية" },
  { name: "م. نورة العتيبي", role: "مديرة التصميم المعماري" },
  { name: "م. فيصل الغامدي", role: "مدير التنفيذ والمواقع" },
  { name: "م. ريان القحطاني", role: "مدير الجودة والسلامة" },
  { name: "أ. لمى الشمري",   role: "مديرة إدارة المشاريع" },
];

export function Team() {
  return (
    <section id="team" className="relative border-t border-hairline bg-surface py-28 md:py-40">
      <div className="container-x mx-auto max-w-[1440px]">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-4">
            <Reveal kind="up">
              <p className="text-[0.72rem] tracking-[0.4em] text-accent">الفريق</p>
              <h2 className="mt-4 text-[2rem] font-bold leading-[1.15] text-ink md:text-[2.6rem]">
                أسماء تبني بصمت.
              </h2>
              <p className="mt-6 max-w-sm text-[0.98rem] leading-[2] text-ink-soft">
                نُقدّم عملنا لا وجوهنا. هؤلاء الأشخاص هم الذين يُشرفون على كل تفصيلة قبل أن تصل إليك.
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-8">
            <ul>
              {team.map((m, i) => (
                <Reveal key={m.name} kind="up" delay={i * 0.05}>
                  <li className="group flex items-baseline justify-between gap-6 border-b border-hairline py-7 transition-colors duration-500 hover:border-ink">
                    <span className="text-[1.5rem] font-bold text-ink transition-transform duration-500 group-hover:-translate-x-1 md:text-[2rem]">
                      {m.name}
                    </span>
                    <span className="text-[0.78rem] tracking-[0.25em] text-muted-foreground">
                      {m.role}
                    </span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
