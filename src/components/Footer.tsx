// ============================================================
// CONTACT DETAILS — edit here to update site-wide contact info.
// ============================================================
const CONTACT = {
  // Phones (WhatsApp available on both). Replace freely.
  phonePrimary: "+966 50 525 9544",
  phoneSecondary: "+966 55 469 3331",
  // Address
  addressLine1: "الرياض — حي عكاظ — شارع دمنهور",
  addressLine2: "المملكة العربية السعودية",
  cr: "101078928", // السجل التجاري
  postalCode: "14723",
  // Social — replace # with real URLs when ready
  instagram: "#",
  linkedin: "#",
  x: "#",
  // Optional email (kept internal reference; not shown in footer per spec)
  email: "info@alaa-bg.com",
};

function digitsOnly(v: string) {
  return v.replace(/[^\d+]/g, "");
}

export function Footer() {
  const waPrimary = `https://wa.me/${digitsOnly(CONTACT.phonePrimary).replace(/^\+/, "")}`;
  const waSecondary = `https://wa.me/${digitsOnly(CONTACT.phoneSecondary).replace(/^\+/, "")}`;

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

          {/* Contact */}
          <div className="md:col-span-4">
            <p className="text-[0.7rem] tracking-[0.3em] text-muted-foreground">تواصل</p>
            <ul className="mt-6 space-y-3 text-[0.95rem] text-ink">
              <li className="flex flex-wrap items-center gap-3">
                <a href={`tel:${digitsOnly(CONTACT.phonePrimary)}`} className="gold-line" dir="ltr">
                  {CONTACT.phonePrimary}
                </a>
                <a
                  href={waPrimary}
                  target="_blank"
                  rel="noopener"
                  className="text-[0.7rem] tracking-[0.25em] text-accent"
                >
                  واتساب
                </a>
              </li>
              <li className="flex flex-wrap items-center gap-3">
                <a href={`tel:${digitsOnly(CONTACT.phoneSecondary)}`} className="gold-line" dir="ltr">
                  {CONTACT.phoneSecondary}
                </a>
                <a
                  href={waSecondary}
                  target="_blank"
                  rel="noopener"
                  className="text-[0.7rem] tracking-[0.25em] text-accent"
                >
                  واتساب
                </a>
              </li>
            </ul>

            <p className="mt-8 text-[0.7rem] tracking-[0.3em] text-muted-foreground">العنوان</p>
            <address className="mt-4 not-italic text-[0.95rem] leading-8 text-ink">
              {CONTACT.addressLine1}
              <br />
              <span className="text-ink-soft">
                س.ت: <span dir="ltr">{CONTACT.cr}</span> · الرمز البريدي:{" "}
                <span dir="ltr">{CONTACT.postalCode}</span>
              </span>
            </address>
          </div>

          {/* Social */}
          <div className="md:col-span-3">
            <p className="text-[0.7rem] tracking-[0.3em] text-muted-foreground">تابعنا</p>
            <ul className="mt-6 space-y-3 text-[0.95rem] text-ink">
              <li>
                <a href={CONTACT.instagram} target="_blank" rel="noopener" className="gold-line">
                  إنستجرام
                </a>
              </li>
              <li>
                <a href={CONTACT.linkedin} target="_blank" rel="noopener" className="gold-line">
                  لينكدإن
                </a>
              </li>
              <li>
                <a href={CONTACT.x} target="_blank" rel="noopener" className="gold-line">
                  إكس
                </a>
              </li>
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
