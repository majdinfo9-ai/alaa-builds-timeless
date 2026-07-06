import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { services } from "@/components/Services";
import { Reveal, SplitLines } from "@/components/Reveal";
import { MagneticButton } from "@/components/MagneticButton";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const s = services.find((x) => x.slug === params.slug);
    if (!s) throw notFound();
    return { service: s };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "الخدمة غير موجودة — آلاء البناء" }, { name: "robots", content: "noindex" }] };
    }
    return {
      meta: [
        { title: `${loaderData.service.title} — آلاء البناء` },
        { name: "description", content: loaderData.service.short },
        { property: "og:title", content: `${loaderData.service.title} — آلاء البناء` },
        { property: "og:description", content: loaderData.service.short },
        { property: "og:image", content: loaderData.service.cover },
      ],
    };
  },
  component: ServicePage,
  notFoundComponent: () => (
    <div className="container-x mx-auto max-w-3xl py-40 text-center">
      <h1 className="text-3xl font-bold text-ink">الخدمة غير موجودة</h1>
      <Link to="/" className="mt-6 inline-block text-accent">الرئيسية</Link>
    </div>
  ),
});

function ServicePage() {
  const { service } = Route.useLoaderData();
  const heroRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);

  const gal = service.gallery;
  const overview = gal[Math.floor(gal.length / 2)];
  const process = [
    { k: "01", t: "دراسة", d: "نستمع، نزور الموقع، ونحلّل المتطلبات قبل أي خطوة." },
    { k: "02", t: "تصميم", d: "نقترح حلولاً هندسية ومعمارية مدعومة بجداول واضحة." },
    { k: "03", t: "تنفيذ", d: "فريق ميداني مؤهّل، رقابة يومية، ومواد مطابقة للمواصفات." },
    { k: "04", t: "تسليم", d: "فحص شامل، وثائق كاملة، وضمان تشغيلي بعد التسليم." },
  ];

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="relative h-[85vh] overflow-hidden bg-muted">
        <motion.img
          src={service.cover}
          alt={service.title}
          style={reduce ? undefined : { y, scale }}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(23,23,23,0.15) 0%, rgba(23,23,23,0.35) 55%, rgba(247,244,239,0.9) 100%)" }} />
        <div aria-hidden className="absolute inset-0 blueprint-grid opacity-40" />
        <div className="container-x relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-end pb-16 md:pb-24">
          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="text-[0.7rem] tracking-[0.4em] text-accent"
          >
            {service.en}
          </motion.p>
          <h1 className="mt-4 text-[3rem] font-bold leading-[1.05] text-white md:text-[6rem]">
            <SplitLines text={service.title} delay={0.4} />
          </h1>
        </div>
      </section>

      {/* Overview */}
      <section className="border-t border-hairline bg-background py-24 md:py-32">
        <div className="container-x mx-auto grid max-w-[1440px] gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal kind="up">
              <p className="text-[0.72rem] tracking-[0.4em] text-accent">نظرة عامة</p>
              <h2 className="mt-4 text-[2rem] font-bold leading-tight text-ink md:text-[2.6rem]">
                جودةٌ تُقاس بالتفاصيل.
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-7">
            <div className="space-y-6 text-[1rem] leading-[2.05] text-ink-soft">
              <Reveal kind="blur"><p>{service.short}</p></Reveal>
              <Reveal kind="blur" delay={0.1}>
                <p>
                  نتعامل مع كل عنصر باعتباره جزءاً من كلٍّ أكبر. من اختيار المواد إلى تنفيذ أدق التفاصيل، نلتزم بمعايير مهنية صارمة لضمان جودة نهائية تليق باسم آلاء البناء.
                </p>
              </Reveal>
              <Reveal kind="blur" delay={0.2}>
                <p>
                  نعمل بشفافية كاملة مع العميل عبر تقارير دورية، ونقاط تسليم واضحة، وإدارة ميدانية دقيقة تحترم الجدول الزمني.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Wide image */}
      <section className="bg-background pb-16">
        <div className="container-x mx-auto max-w-[1600px]">
          <Reveal kind="scale">
            <div className="relative aspect-[16/8] overflow-hidden bg-muted shadow-soft">
              <img src={overview} alt="" loading="lazy" className="h-full w-full object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section className="border-t border-hairline bg-surface py-24 md:py-32">
        <div className="container-x mx-auto max-w-[1440px]">
          <Reveal kind="up">
            <p className="text-[0.72rem] tracking-[0.4em] text-accent">منهجيّتنا</p>
            <h2 className="mt-4 text-[2rem] font-bold leading-tight text-ink md:text-[2.8rem]">
              أربع مراحل. لا اختصارات.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-4">
            {process.map((p, i) => (
              <Reveal key={p.k} kind="up" delay={i * 0.08}>
                <div className="group flex h-full flex-col border border-hairline bg-card p-8 transition-all duration-500 hover:border-accent/40 hover:shadow-soft">
                  <span className="text-[0.7rem] tracking-[0.35em] text-accent">{p.k}</span>
                  <h3 className="mt-6 text-xl font-bold text-ink">{p.t}</h3>
                  <p className="mt-4 text-[0.92rem] leading-7 text-ink-soft">{p.d}</p>
                  <span className="mt-8 h-px w-8 bg-accent transition-all duration-500 group-hover:w-full" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery — masonry */}
      <section className="border-t border-hairline bg-background py-24 md:py-32">
        <div className="container-x mx-auto max-w-[1600px]">
          <div className="flex items-end justify-between">
            <Reveal kind="up">
              <p className="text-[0.72rem] tracking-[0.4em] text-accent">من الميدان</p>
              <h2 className="mt-4 text-[2rem] font-bold leading-tight text-ink md:text-[2.8rem]">صور من داخل التنفيذ.</h2>
            </Reveal>
          </div>

          <div className="mt-12 columns-1 gap-4 sm:columns-2 md:columns-3 md:gap-5 lg:columns-4">
            {gal.slice(0, 18).map((src: string, i: number) => (
              <Reveal key={i} kind="up" delay={(i % 4) * 0.05}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.8, ease: [0.2,0.8,0.2,1] }}
                  className="mb-4 break-inside-avoid overflow-hidden bg-muted shadow-soft md:mb-5"
                >
                  <img src={src} alt="" loading="lazy" className="w-full object-cover" />
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-hairline bg-background py-24 md:py-32">
        <div className="container-x mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="text-[0.72rem] tracking-[0.4em] text-accent">جاهزون؟</p>
            <h3 className="mt-4 text-[1.8rem] font-bold text-ink md:text-[2.4rem]">لنبدأ بمشروعك التالي.</h3>
          </div>
          <div className="flex gap-3">
            <MagneticButton href="mailto:info@alaa-bg.com">تواصل معنا</MagneticButton>
            <MagneticButton to="/" variant="ghost">كل الخدمات</MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
}
