export function Footer() {
  return (
    <footer id="contact" className="border-t border-hairline bg-background">
      <div className="container-x mx-auto max-w-[1440px] py-20">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="text-[0.7rem] tracking-[0.35em] text-accent">آلاء البناء</p>
            <h3 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-4xl">
              نبني علاقات <br /> قبل أن نبني منشآت.
            </h3>
            <p className="mt-6 max-w-md text-[0.95rem] leading-8 text-ink-soft">
              فريقنا جاهز لدراسة مشروعك واقتراح الحلول الأنسب هندسياً وتنفيذياً.
            </p>
          </div>
          <div className="md:col-span-3">
            <p className="text-[0.7rem] tracking-[0.3em] text-muted-foreground">تواصل</p>
            <ul className="mt-6 space-y-3 text-[0.95rem] text-ink">
              <li><a href="tel:+966500000000" className="gold-line">‎+966 50 000 0000</a></li>
              <li><a href="mailto:info@alaa-bg.com" className="gold-line">info@alaa-bg.com</a></li>
              <li className="text-ink-soft">الرياض · المملكة العربية السعودية</li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <p className="text-[0.7rem] tracking-[0.3em] text-muted-foreground">تابعنا</p>
            <ul className="mt-6 space-y-3 text-[0.95rem] text-ink">
              <li><a href="#" className="gold-line">إنستجرام</a></li>
              <li><a href="#" className="gold-line">لينكدإن</a></li>
              <li><a href="#" className="gold-line">إكس</a></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <p className="text-[0.7rem] tracking-[0.3em] text-muted-foreground">ساعات العمل</p>
            <ul className="mt-6 space-y-3 text-[0.95rem] text-ink">
              <li>الأحد — الخميس</li>
              <li className="text-ink-soft">٩:٠٠ ص — ٦:٠٠ م</li>
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-hairline pt-8 md:flex-row md:items-center">
          <p className="text-xs tracking-widest text-muted-foreground">
            © {new Date().getFullYear()} شركة آلاء البناء. جميع الحقوق محفوظة.
          </p>
          <p className="text-xs tracking-[0.35em] text-muted-foreground">مقاولات · هندسة · تصميم</p>
        </div>
      </div>
    </footer>
  );
}
