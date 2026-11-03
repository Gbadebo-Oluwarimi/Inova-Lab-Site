import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
import { HomeHero } from "@/components/home-hero";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Medical Laboratory & Diagnostics in Nigeria",
  description:
    "Your trusted medical laboratory and diagnostic centre in Nigeria. Book an appointment with Inova.",
  path: "/",
  keywords: ["medical laboratory", "diagnostic centre", "Nigeria"],
});

const insurancePartners = [
  { name: "Bupa", src: "/images/partners/bupa.svg", width: 40 },
  { name: "Hygeia HMO", src: "/images/partners/hygeia.png", width: 112 },
  { name: "MetLife", src: "/images/partners/metlife.png", width: 126 },
];

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

        <section
          aria-labelledby="insurance-heading"
          className="bg-[#080d20] text-white"
        >
          <div className="mx-auto flex max-w-[1440px] flex-col gap-7 px-6 py-9 sm:px-10 md:flex-row md:items-center md:gap-10 md:px-12 md:py-10 lg:px-[9.5%]">
            <h2
              id="insurance-heading"
              className="max-w-[210px] shrink-0 text-[19px] font-medium leading-[1.3] sm:text-[21px]"
            >
              Insured by the following companies
            </h2>
            <div className="hidden h-[72px] w-px shrink-0 bg-white/35 md:block" />
            <div className="flex min-h-12 flex-wrap items-center gap-x-8 gap-y-5 sm:gap-x-10 md:gap-x-12">
              {insurancePartners.map((partner) => (
                <div
                  key={partner.name}
                  className="flex h-10 min-w-20 items-center justify-center"
                >
                  <Image
                    src={partner.src}
                    alt={partner.name}
                    width={partner.width}
                    height={40}
                    className="max-h-8 w-auto object-contain brightness-0 invert opacity-85"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
