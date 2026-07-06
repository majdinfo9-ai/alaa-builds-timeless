import { Reveal, SplitLines } from "./Reveal";

export function Trust() {
  return (
    <section className="relative border-t border-hairline bg-background py-32 md:py-48">
      <div className="container-x mx-auto max-w-[1200px] text-center">
        <Reveal kind="up">
          <p className="text-[0.72rem] tracking-[0.4em] text-accent">ثقةٌ. تُبنى.</p>
        </Reveal>
        <h2 className="mx-auto mt-8 max-w-4xl text-[2.4rem] font-bold leading-[1.2] text-ink md:text-[4.5rem]">
          <SplitLines text="ثقةٌ تُبنى مع كل مشروع." />
        </h2>
        <Reveal kind="blur" delay={0.3}>
          <p className="mx-auto mt-10 max-w-2xl text-[1.02rem] leading-[2.1] text-ink-soft">
            نتعامل مع كل عميل باعتباره شريكاً طويل الأمد. كل مشروع نُنجزه هو تعهّد مكتوب بين ما وعدنا به وما سلّمناه فعلاً.
          </p>
        </Reveal>
        <Reveal kind="up" delay={0.4}>
          <div className="mx-auto mt-14 flex flex-wrap items-center justify-center gap-x-14 gap-y-6 text-[0.72rem] tracking-[0.35em] text-muted-foreground">
            <span>ISO · 9001</span>
            <span>SCE · مسجّلة</span>
            <span>سلامة · OSHA</span>
            <span>تصنيف · مقاولين</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
