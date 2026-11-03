import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
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

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 12h15m-6-6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AppointmentLink({ compact = false }: { compact?: boolean }) {
  return (
    <a
      href="/appointment"
      className={`appointment-clip group inline-flex items-center justify-center gap-3 bg-[#dce2ff] font-semibold text-[#071b50] transition duration-200 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white active:scale-[0.98] ${
        compact
          ? "min-h-12 px-6 text-sm sm:text-base"
          : "min-h-[60px] w-full max-w-[340px] px-5 text-[15px] sm:min-h-[68px] sm:px-8 sm:text-[17px]"
      }`}
    >
      <span className="transition-transform duration-200 group-hover:translate-x-1">
        <ArrowIcon />
      </span>
      <span>{compact ? "Appointment" : "Book an Appointment"}</span>
    </a>
  );
}

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
        <section className="relative isolate flex min-h-[620px] items-center overflow-hidden bg-[#07152e] md:min-h-[680px]">
          <Image
            src="/images/medical-team.avif"
            alt="Medical professionals reviewing diagnostic results with a patient"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#031027]/90 via-[#07152e]/65 to-[#07152e]/30" />
          <div className="absolute inset-0 bg-[#06142d]/15" />

          <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pb-16 pt-36 sm:px-10 sm:pt-40 md:px-12 md:pb-20 md:pt-44 lg:px-[7%]">
            <div className="max-w-[900px]">
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#cbd5ff] sm:text-xs">
                Trusted diagnostics in Nigeria
              </p>
              <h1 className="max-w-[920px] text-[36px] font-semibold leading-[1.12] text-white sm:text-[48px] md:text-[58px] lg:text-[62px]">
                Accurate Diagnosis. Better
                <br className="hidden sm:block" />
                {"Health. "}
                <span className="font-light italic">A Healthier Tomorrow.</span>
              </h1>
              <p className="mt-6 max-w-[580px] text-[16px] leading-relaxed text-white/90 sm:mt-7 sm:text-[19px]">
                Your trusted medical laboratory and diagnostic centre in
                Nigeria.
              </p>
              <div className="mt-9 sm:mt-11">
                <AppointmentLink />
              </div>
              <p className="mt-6 text-xs font-medium text-white/75 sm:mt-8 sm:text-[13px]">
                Tests and medical reports by certified specialists.
              </p>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="absolute bottom-10 right-[7%] hidden h-12 w-12 bg-white md:block"
          />
        </section>

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
