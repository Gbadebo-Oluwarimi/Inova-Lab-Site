"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import advancedTestingImage from "../inova-comps/ultrasound.png";
import specialistImage from "../inova-comps/cardiologist.jpg";
import patientCareImage from "../inova-comps/family-consultation.png";
import laboratoryImage from "../inova-comps/doctor girk.jpg";
import { AppointmentButton } from "@/components/appointment-button";
import { BackgroundMotif } from "@/components/background-motif";

const galleryItems = [
  {
    id: 1,
    image: advancedTestingImage,
    title: "Advanced Laboratory Testing",
    description:
      "Modern diagnostic technology supporting accurate healthcare decisions.",
    href: "/services",
    alt: "Clinician performing an ultrasound examination",
  },
  {
    id: 2,
    image: specialistImage,
    title: "Expert Medical Team",
    description: "Professional expertise you can trust.",
    href: "/about/our-team",
    alt: "Medical specialist reviewing a diagnostic image",
  },
  {
    id: 3,
    image: patientCareImage,
    title: "Patient-centred Care",
    description: "Healthcare professionals dedicated to your wellbeing.",
    href: "/about",
    alt: "Doctor speaking with a patient during a consultation",
  },
  {
    id: 4,
    image: laboratoryImage,
    title: "Laboratory Expertise",
    description: "Committed to reliable and accurate healthcare.",
    href: "/departments",
    alt: "Laboratory scientist examining a sample through a microscope",
  },
  {
    id: 5,
    image: "/images/gallery-cardio.avif",
    title: "Collaborative Care",
    description: "Specialists working together to support better outcomes.",
    href: "/services",
    alt: "Medical professionals collaborating on patient care",
  },
  {
    id: 6,
    image: "/images/gallery-consultation.avif",
    title: "Diagnostic Consultation",
    description: "Clear explanations to help guide informed decisions.",
    href: "/services/diagnostics",
    alt: "Care team discussing diagnostic results with a patient",
  },
  {
    id: 7,
    image: "/images/gallery-surgery.avif",
    title: "Your Health Comes First",
    description: "A welcoming experience built around patient needs.",
    href: "/patient-care",
    alt: "Doctor consulting with a patient",
  },
  {
    id: 8,
    image: "/images/medical-team.avif",
    title: "Quality in Every Detail",
    description: "Advanced clinical teams focused on dependable care.",
    href: "/about/quality",
    alt: "Surgical team working together in a clinical environment",
  },
];

export default function InteractiveGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const mobileGalleryRef = useRef<HTMLDivElement>(null);

  const updateMobileIndex = () => {
    const gallery = mobileGalleryRef.current;
    if (!gallery) return;
    const cards = Array.from(gallery.children) as HTMLElement[];
    const center = gallery.scrollLeft + gallery.clientWidth / 2;
    const nearest = cards.reduce((bestIndex, card, index) => {
      const best = cards[bestIndex];
      return Math.abs(card.offsetLeft + card.offsetWidth / 2 - center) <
        Math.abs(best.offsetLeft + best.offsetWidth / 2 - center)
        ? index
        : bestIndex;
    }, 0);
    setActiveIndex(nearest);
  };

  return (
    <section
      aria-labelledby="gallery-heading"
      className="relative isolate overflow-hidden bg-[#f6f8fb] py-16 sm:py-20 lg:py-24"
    >
      <BackgroundMotif color="#daddff" className="-right-24 top-0 h-[320px] w-[275px] rotate-12 opacity-20 sm:h-[440px] sm:w-[380px]" />
      <div className="relative z-10 mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="mb-10 max-w-[650px] sm:mb-12">
          <span className="mb-3 block text-[10px] font-semibold uppercase tracking-[2px] text-[#50658b]">
            THE INOVA EXPERIENCE
          </span>
          <h2
            id="gallery-heading"
            className="text-[25px] font-medium leading-[1.2] tracking-[-0.04em] text-[#10182c] sm:text-[36px]"
          >
            Healthcare designed around you. {" "}
            <span className="text-[#586d9c]">
              Precision in every diagnosis.
            </span>
          </h2>
        </div>

        <div
          className="hidden h-[360px] gap-2 overflow-hidden rounded-2xl md:flex lg:h-[440px]"
          onMouseLeave={() => setActiveIndex(0)}
        >
          {galleryItems.map((item, index) => {
            const isActive = activeIndex === index;

            return (
              <Link
                key={item.id}
                href={item.href}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                aria-label={`Explore ${item.title}`}
                className="group relative min-w-0 overflow-hidden rounded-xl bg-[#dce2e8] outline-none focus-visible:ring-2 focus-visible:ring-[#536ba2]"
                style={{
                  flex: isActive ? "4 1 0%" : "0.8 1 0%",
                  transition: "flex 650ms cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 1024px) 30vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div
                  className={`absolute inset-0 transition-colors duration-500 ${
                    isActive
                      ? "bg-gradient-to-t from-[#07152e]/85 via-[#07152e]/10 to-transparent"
                      : "bg-[#07152e]/25"
                  }`}
                />
                <div
                  aria-hidden={!isActive}
                  className={`absolute inset-x-0 bottom-0 p-5 transition-all duration-500 lg:p-7 ${
                    isActive
                      ? "translate-y-0 opacity-100"
                      : "translate-y-5 opacity-0"
                  }`}
                >
                  <p className="mb-2 text-[9px] font-semibold uppercase tracking-[2px] text-[#dce2ff]">
                    INOVA MEDICAL
                  </p>
                  <h3 className="max-w-[260px] text-[19px] font-semibold leading-tight text-white lg:text-[24px]">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-[260px] text-[11px] leading-[1.7] text-white/80">
                    {item.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-3 text-[11px] font-semibold text-white">
                    Explore more
                    <span className="transition-transform duration-300 group-hover:translate-x-2">
                      &rarr;
                    </span>
                  </span>
                </div>
                {!isActive && (
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-5 flex justify-center"
                  >
                    <span className="rotate-180 text-[9px] font-semibold uppercase tracking-[1.5px] text-white [writing-mode:vertical-rl]">
                      {item.title}
                    </span>
                  </div>
                )}
              </Link>
            );
          })}
        </div>

        <div
          ref={mobileGalleryRef}
          onScroll={updateMobileIndex}
          className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-3 md:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Swipe horizontally to explore Inova services"
        >
          {galleryItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group relative aspect-[1.12/1] w-[84vw] max-w-[390px] shrink-0 snap-center overflow-hidden rounded-2xl bg-[#dce2e8] shadow-[0_12px_32px_rgba(16,24,40,0.12)] first:ml-0 last:mr-5"
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="84vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07152e]/90 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="mb-2 text-[9px] font-semibold uppercase tracking-[1.8px] text-[#dce2ff]">INOVA MEDICAL · 0{item.id}</p>
                <h3 className="max-w-[290px] text-[21px] font-semibold leading-tight text-white">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-[290px] text-[12px] leading-relaxed text-white/80">{item.description}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold text-white">
                  Explore more <span aria-hidden="true">&rarr;</span>
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between">
          <p className="text-[10px] font-medium uppercase tracking-[1.5px] text-[#667085]">
            <span className="md:hidden">Swipe to explore</span><span className="hidden md:inline">Explore our expertise</span>
          </p>
          <span className="text-[11px] text-[#667085]">
            {String(activeIndex + 1).padStart(2, "0")} &mdash; 08
          </span>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-6 sm:mt-12 md:flex-row md:items-center">
          <div className="max-w-[570px]">
            <p className="text-[13px] leading-[1.8] text-[#343d4b]">
              At Inova, we bring together medical expertise, advanced
              diagnostic technology and a commitment to patient care. Every
              test, every result and every interaction is guided by our
              dedication to better healthcare.
            </p>
            <Link
              href="/about"
              className="mt-3 inline-block text-[12px] font-semibold text-[#273d75] underline underline-offset-4 transition-colors hover:text-blue-600"
            >
              Learn more about Inova
            </Link>
          </div>
          <AppointmentButton compact />
        </div>
      </div>
    </section>
  );
}
