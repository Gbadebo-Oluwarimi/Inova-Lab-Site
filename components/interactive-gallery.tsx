"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import advancedTestingImage from "../inova-comps/ultrasound.png";
import specialistImage from "../inova-comps/cardiologist.jpg";
import patientCareImage from "../inova-comps/family-consultation.png";
import laboratoryImage from "../inova-comps/doctor girk.jpg";
import { AppointmentButton } from "@/components/appointment-button";

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

  return (
    <section
      aria-labelledby="gallery-heading"
      className="overflow-hidden bg-[#f3f5f7] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="mb-10 max-w-[650px] sm:mb-12">
          <span className="mb-3 block text-[10px] font-semibold uppercase tracking-[2px] text-[#50658b]">
            THE INOVA EXPERIENCE
          </span>
          <h2
            id="gallery-heading"
            className="text-[25px] font-medium leading-[1.35] text-[#10182c] sm:text-[30px]"
          >
            Healthcare designed around you. {" "}
            <span className="text-[#586d9c]">
              Precision in every diagnosis.
            </span>
          </h2>
        </div>

        <div
          className="hidden h-[340px] gap-[7px] overflow-hidden md:flex lg:h-[400px]"
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
                className="group relative min-w-0 overflow-hidden bg-[#dce2e8] outline-none focus-visible:ring-2 focus-visible:ring-[#536ba2]"
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

        <div className="grid grid-cols-2 gap-3 md:hidden">
          {galleryItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group relative aspect-[4/5] overflow-hidden bg-[#dce2e8]"
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07152e]/90 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3">
                <h3 className="text-sm font-semibold text-white">
                  {item.title}
                </h3>
                <span className="mt-2 inline-block text-[11px] font-medium text-[#dce2ff]">
                  Explore &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between">
          <p className="text-[10px] font-medium uppercase tracking-[1.5px] text-[#667085]">
            Explore our expertise
          </p>
          <span className="text-[11px] text-[#667085]">
            08 &mdash; 08
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