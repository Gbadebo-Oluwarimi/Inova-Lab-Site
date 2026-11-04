import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { SvgActionButton } from "@/components/svg-action-button";

const address = "1 Petrosyn Drive, Gwarinpa, Abuja, Nigeria";
const mapQuery = encodeURIComponent(address);

export function LocationSection() {
  return (
    <section
      aria-labelledby="location-heading"
      className="relative isolate overflow-hidden bg-[#eaf0ff] py-14 sm:py-18 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full border-[32px] border-white/40 sm:h-96 sm:w-96"
      />
      <div className="relative mx-auto grid max-w-[1440px] gap-5 px-5 sm:px-8 lg:grid-cols-[1.25fr_0.75fr] lg:gap-7 lg:px-12">
        <div className="relative min-h-[300px] overflow-hidden rounded-2xl border border-white/80 bg-[#d8e2f4] shadow-[0_20px_55px_rgba(29,52,92,0.12)] sm:min-h-[380px] lg:min-h-[430px]">
          <iframe
            title="Map to Inova Labs Diagnostic in Gwarinpa, Abuja"
            src={`https://maps.google.com/maps?q=${mapQuery}&z=15&output=embed`}
            className="absolute inset-0 h-full w-full border-0 grayscale-[0.15]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
            target="_blank"
            rel="noreferrer"
            className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-lg bg-white px-3.5 py-2.5 text-[11px] font-semibold text-[#172e5b] shadow-md transition-colors hover:bg-[#f5f7ff] focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#536ba2]"
          >
            Open in Maps <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>

        <div className="relative flex min-h-[330px] flex-col justify-center overflow-hidden rounded-2xl bg-[#10234b] p-6 text-white shadow-[0_20px_55px_rgba(29,52,92,0.14)] sm:p-9 lg:min-h-[430px] lg:p-11">
          <div aria-hidden="true" className="absolute -right-14 -top-14 h-40 w-40 rounded-full border-[20px] border-[#cbd3ff]/10" />
          <div className="relative">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[2px] text-[#cbd3ff]">
              FIND INOVA
            </p>
            <h2
              id="location-heading"
              className="max-w-[440px] text-[30px] font-semibold leading-[1.08] tracking-[-0.04em] sm:text-[38px]"
            >
              Visit our diagnostic centre in Abuja.
            </h2>
            <p className="mt-5 flex items-start gap-2.5 text-[12px] leading-[1.75] text-white/75 sm:text-[13px]">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#cbd3ff]" aria-hidden="true" />
              <span>{address}</span>
            </p>
            <p className="mt-3 max-w-[370px] text-[12px] leading-[1.75] text-white/65 sm:text-[13px]">
              Get in touch with our team for directions, service information, or help planning your visit.
            </p>
            <a
              href="mailto:info@inovamedlab.com"
              className="mt-5 inline-flex items-center gap-2 text-[12px] font-medium text-[#dce4ff] underline decoration-[#8297d0] underline-offset-4 transition-colors hover:text-white"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              info@inovamedlab.com
            </a>
            <div className="mt-7">
              <SvgActionButton
                href="/appointment"
                label="Book an Appointment"
                ariaLabel="Book an appointment"
                className="max-w-[240px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
