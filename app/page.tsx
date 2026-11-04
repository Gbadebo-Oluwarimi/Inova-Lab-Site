import { SiteHeader } from "@/components/site-header";
import { HomeHero } from "@/components/home-hero";
import { BusinessSolutions } from "@/components/business-solutions";
import { InsuranceLogoCarousel } from "@/components/insurance-logo-carousel";
import ImpactSection from "@/components/impact-section";
import InteractiveGallery from "@/components/interactive-gallery";
import { FaqSection } from "@/components/faq-section";
import { BlogSection } from "@/components/blog-section";
import { LocationSection } from "@/components/location-section";
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

      <main>
        <HomeHero />
        <InsuranceLogoCarousel />
        <BusinessSolutions />
        <ImpactSection />
        <InteractiveGallery />
        <FaqSection />
        <BlogSection />
        <LocationSection />
      </main>
    </>
  );
}
