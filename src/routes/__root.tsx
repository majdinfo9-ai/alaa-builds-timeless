import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="text-[0.7rem] tracking-[0.4em] text-accent">404</p>
        <h1 className="mt-4 text-3xl font-bold text-ink">الصفحة غير موجودة</h1>
        <p className="mt-3 text-sm text-ink-soft">الصفحة التي تبحث عنها لم تعد متاحة.</p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 border border-hairline px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink"
          >
            العودة إلى الرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-bold text-ink">تعذّر تحميل الصفحة</h1>
        <p className="mt-2 text-sm text-ink-soft">حدث خطأ غير متوقع. يمكنك المحاولة مجدداً.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="border border-ink bg-ink px-5 py-3 text-sm font-semibold text-background"
          >
            حاول مرة أخرى
          </button>
          <a href="/" className="border border-hairline px-5 py-3 text-sm font-semibold text-ink">
            الرئيسية
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "شركة آلاء البناء — مقاولات · هندسة · تصميم" },
      { name: "description", content: "شركة آلاء البناء: خمسة عشر عاماً من تنفيذ مشاريع البناء الفاخرة في المملكة العربية السعودية — مقاولات عامة، أعمال خرسانية، وخشبيات وديكور." },
      { name: "author", content: "Alaa Al-Binaa" },
      { property: "og:title", content: "شركة آلاء البناء — نبني المستقبل بأيادٍ خبيرة" },
      { property: "og:description", content: "مقاولات عامة · هندسة · تصميم. أكثر من 1000 مشروع منفَّذ منذ 2010." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Alexandria:wght@300;400;500;600;700;800&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <SmoothScroll />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </QueryClientProvider>
  );
}
