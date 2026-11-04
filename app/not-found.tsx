import type { Metadata } from "next";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SvgActionButton } from "@/components/svg-action-button";

export const metadata: Metadata = {
  title: "Page not found | Inova Labs Diagnostic",
  description: "The page you’re looking for could not be found.",
};

export default function NotFound() {
  return (
    <>
      <div className="relative z-[60] border-b border-white/10 bg-[#07152e] text-white">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 items-center gap-x-2 gap-y-1 px-3 py-2 text-[9px] sm:h-10 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:gap-2 sm:px-8 sm:py-0 sm:text-[11px] lg:px-12">
          <a
            href="mailto:info@inovamedlab.com"
            className="col-start-1 row-start-1 flex min-w-0 items-center gap-1.5 whitespace-nowrap transition-colors hover:text-[#daddff] sm:gap-2.5"
          >
            <Mail className="h-3 w-3 shrink-0 text-[#cbd3ff] sm:h-3.5 sm:w-3.5" aria-hidden="true" />
            info@inovamedlab.com
          </a>
          <p className="col-start-2 row-start-1 whitespace-nowrap text-right text-[8px] font-semibold uppercase tracking-[0.03em] text-[#dce4ff] sm:col-start-2 sm:text-center sm:text-[10px] sm:tracking-[0.08em]">
            Nigeria&apos;s No. 1 Diagnostic Lab
          </p>
          <span className="col-span-2 row-start-2 flex items-center justify-center gap-1.5 whitespace-nowrap text-[8px] text-white/75 sm:col-span-1 sm:col-start-3 sm:row-start-1 sm:justify-self-end sm:gap-2 sm:text-[11px]">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-[#cbd3ff]" aria-hidden="true" />
            1 Petrosyn Drive, Gwarinpa, Abuja, Nigeria
          </span>
        </div>
      </div>
      <SiteHeader />
      <main className="relative isolate overflow-hidden bg-[#eaf0ff]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[132px] bg-[#07152e] sm:h-[148px]" />
        <section className="relative mx-auto flex min-h-[calc(68svh+132px)] items-center overflow-hidden px-5 pb-16 pt-[132px] sm:min-h-[calc(68svh+148px)] sm:px-8 sm:pb-20 sm:pt-[148px] lg:px-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-28 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full border-[52px] border-white/50 sm:h-[620px] sm:w-[620px] sm:border-[72px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-[#cbd3ff]/35 blur-2xl sm:h-80 sm:w-80"
          />
          <div className="relative mx-auto w-full max-w-[1440px]">
          <div className="max-w-[680px]">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[2px] text-[#536ba2]">
              INOVA LABS DIAGNOSTIC
            </p>
            <p className="text-[clamp(88px,20vw,190px)] font-semibold leading-[0.78] tracking-[-0.09em] text-[#10234b]">
              404
            </p>
            <h1 className="mt-8 text-[28px] font-semibold leading-tight tracking-[-0.04em] text-[#101b2a] sm:text-[38px]">
              We can&apos;t find that page.
            </h1>
            <p className="mt-3 max-w-[480px] text-[13px] leading-[1.8] text-[#566273] sm:text-[14px]">
              The link may be out of date, or the page may have moved. Let&apos;s
              help you get back to the information you need.
            </p>
            <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
              <SvgActionButton href="/" label="Back to Home" />
              <a
                href="mailto:info@inovamedlab.com"
                className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#273d75] transition-colors hover:text-[#536ba2] focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#536ba2]"
              >
                Contact our team
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
          </div>
        </section>
      </main>
    </>
  );
}
