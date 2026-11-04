import { SiteHeader } from "@/components/site-header";
import { HomeHero } from "@/components/home-hero";
import { BusinessSolutions } from "@/components/business-solutions";
import { InsuranceLogoCarousel } from "@/components/insurance-logo-carousel";
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
      <div className="relative z-50 bg-[#f7f8fc] text-[#122247]">
        <div className="mx-auto flex h-8 max-w-[1440px] items-center justify-end gap-3 px-4 text-[10px] font-medium sm:px-6 sm:text-[11px] md:gap-6 md:px-10">
          <a
            href="mailto:info@inovamedlab.com"
            className="truncate transition-colors hover:text-[#2864d7]"
          >
            info@inovamedlab.com
          </a>
          <span className="hidden h-3 w-px bg-[#9aa4b9] sm:block" />
          <span className="hidden sm:block">
            1 Petrosyn Drive, Gwarinpa, Abuja, Nigeria
          </span>
        </div>
      </div>

      <SiteHeader />

      <main>
        <HomeHero />
        <InsuranceLogoCarousel />
        <BusinessSolutions />

       
      </main>
    </>
  );
}
