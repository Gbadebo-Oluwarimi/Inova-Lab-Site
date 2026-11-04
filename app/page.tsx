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
        <div className="mx-auto flex h-10 max-w-[1440px] items-center justify-between gap-3 px-5 text-[10px] sm:px-8 sm:text-[11px] lg:px-12">
          <a
            href="mailto:info@inovamedlab.com"
            className="flex min-w-0 items-center gap-2.5 transition-colors hover:text-[#daddff]"
          >
            <Mail className="h-3.5 w-3.5 shrink-0 text-[#cbd3ff]" aria-hidden="true" />
            info@inovamedlab.com
          </a>
          <span className="hidden items-center gap-2 text-white/75 sm:flex">
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
