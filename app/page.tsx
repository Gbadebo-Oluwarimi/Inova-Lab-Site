import { SiteHeader } from "@/components/site-header";
import { HomeHero } from "@/components/home-hero";
import { BusinessSolutions } from "@/components/business-solutions";
import { InsuranceLogoCarousel } from "@/components/insurance-logo-carousel";
import ImpactSection from "@/components/impact-section";
import InteractiveGallery from "@/components/interactive-gallery";
import { FaqSection } from "@/components/faq-section";
import { Mail, MapPin } from "lucide-react";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Medical Laboratory & Diagnostics in Nigeria",
  description:
    "Your trusted medical laboratory and diagnostic centre in Nigeria. Book an appointment with Inova.",
  path: "/",
  keywords: ["medical laboratory", "diagnostic centre", "Nigeria"],
});

export default function Home() {
  return (
    <>
      <div className="relative z-[60] border-b border-white/10 bg-[#07152e] text-white">
        <div className="mx-auto grid h-10 max-w-[1440px] grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 px-3 text-[9px] sm:px-8 sm:text-[11px] lg:px-12">
          <a
            href="mailto:info@inovamedlab.com"
            className="flex min-w-0 items-center gap-1.5 whitespace-nowrap transition-colors hover:text-[#daddff] sm:gap-2.5"
          >
            <Mail className="h-3 w-3 shrink-0 text-[#cbd3ff] sm:h-3.5 sm:w-3.5" aria-hidden="true" />
            info@inovamedlab.com
          </a>
          <p className="whitespace-nowrap text-center text-[8px] font-semibold uppercase tracking-[0.04em] text-[#dce4ff] sm:text-[10px] sm:tracking-[0.08em]">
            Nigeria&apos;s No. 1 Diagnostic Lab
          </p>
          <span className="hidden items-center justify-self-end gap-2 text-white/75 sm:flex">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-[#cbd3ff]" aria-hidden="true" />
            1 Petrosyn Drive, Gwarinpa, Abuja, Nigeria
          </span>
        </div>
      </div>

      <SiteHeader />

      <main>
        <HomeHero />
        <InsuranceLogoCarousel />
        <BusinessSolutions />
        <ImpactSection />
        <InteractiveGallery />
        <FaqSection />
      </main>
    </>
  );
}
