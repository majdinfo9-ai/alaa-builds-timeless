// ============================================================
// CONTACT DETAILS — edit here to update site-wide contact info.
// ============================================================
const CONTACT = {
  phone: "+966 53 380 6932",
  phoneRaw: "966533806932",
  email: "M.satilah@hotmail.com",
  addressLine1: "الرياض — المملكة العربية السعودية",
  // Replace the src below with the real Google Maps embed URL when available.
  mapEmbed: "",
  instagram: "#",
  linkedin: "#",
  x: "#",
};

export function Footer() {
  const waHref = `https://wa.me/${CONTACT.phoneRaw}`;
  const telHref = `tel:+${CONTACT.phoneRaw}`;

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

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={waHref}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 border border-hairline bg-ink px-5 py-3 text-[0.78rem] font-semibold tracking-[0.2em] text-background transition-colors hover:bg-accent hover:border-accent"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M20.52 3.48A11.86 11.86 0 0 0 12.05 0C5.5 0 .2 5.3.2 11.85c0 2.08.54 4.11 1.58 5.9L0 24l6.42-1.68a11.83 11.83 0 0 0 5.63 1.43h.01c6.55 0 11.85-5.3 11.85-11.85 0-3.16-1.23-6.13-3.39-8.42ZM12.06 21.6h-.01a9.75 9.75 0 0 1-4.97-1.36l-.36-.21-3.81 1 1.02-3.71-.23-.38a9.74 9.74 0 0 1-1.5-5.19c0-5.4 4.4-9.8 9.86-9.8 2.63 0 5.1 1.03 6.96 2.89a9.77 9.77 0 0 1 2.88 6.96c0 5.42-4.4 9.8-9.85 9.8Zm5.4-7.34c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.64-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.48 1.7.62.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Z" />
                </svg>
                واتساب
              </a>
              <a
                href={telHref}
                className="inline-flex items-center gap-2 border border-hairline px-5 py-3 text-[0.78rem] font-semibold tracking-[0.2em] text-ink transition-colors hover:border-ink"
              >
                اتصل بنا
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <p className="text-[0.7rem] tracking-[0.3em] text-muted-foreground">تواصل</p>
            <ul className="mt-6 space-y-4 text-[0.95rem] text-ink">
              <li className="flex items-center gap-3">
                <span className="text-[0.65rem] tracking-[0.3em] text-muted-foreground">هاتف</span>
                <a href={telHref} className="gold-line" dir="ltr">
                  {CONTACT.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[0.65rem] tracking-[0.3em] text-muted-foreground">بريد</span>
                <a href={`mailto:${CONTACT.email}`} className="gold-line" dir="ltr">
                  {CONTACT.email}
                </a>
              </li>
            </ul>

            <p className="mt-8 text-[0.7rem] tracking-[0.3em] text-muted-foreground">العنوان</p>
            <address className="mt-4 not-italic text-[0.95rem] leading-8 text-ink">
              {CONTACT.addressLine1}
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

        {/* Google Maps placeholder — replace src with real embed URL later */}
        <div className="mt-16">
          <p className="text-[0.7rem] tracking-[0.3em] text-muted-foreground">الموقع على الخريطة</p>
          <div className="relative mt-4 aspect-[16/6] w-full overflow-hidden border border-hairline bg-muted">
            {CONTACT.mapEmbed ? (
              <iframe
                src={CONTACT.mapEmbed}
                title="Google Maps"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-[0.7rem] tracking-[0.35em] text-accent">GOOGLE MAPS</p>
                  <p className="mt-3 text-sm text-ink-soft">سيتم إضافة الموقع قريباً</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-hairline pt-8 md:flex-row md:items-center">
          <p className="text-xs tracking-widest text-muted-foreground">
            © {new Date().getFullYear()} شركة آلاء البناء. جميع الحقوق محفوظة.
          </p>
          <p className="text-xs tracking-[0.35em] text-muted-foreground">مقاولات · هندسة · تصميم</p>
        </div>
      </div>
    </footer>
  );
}
