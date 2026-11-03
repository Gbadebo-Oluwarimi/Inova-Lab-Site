"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AppointmentButton } from "@/components/appointment-button";
import cardiologistImage from "../inova-comps/cardiologist.jpg";

const heroSlides = [
  {
    image: "/images/medical-team.avif",
    heading: "Accurate Diagnosis. Better",
    secondLine: "Health.",
    emphasis: "A Healthier Tomorrow.",
    description:
      "Your trusted medical laboratory and diagnostic centre in Nigeria.",
  },
  {
    image: cardiologistImage,
    heading: "Trusted Diagnostics.",
    secondLine: "Confident Decisions.",
    emphasis: "Care You Can Count On.",
    description:
      "Clear answers from certified specialists, with your health in focus.",
  },
];

export function HomeHero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const slide = heroSlides[activeSlide];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let revealTimeout: number | undefined;
    const interval = window.setInterval(() => {
      setIsVisible(false);
      revealTimeout = window.setTimeout(() => {
        setActiveSlide((current) => (current + 1) % heroSlides.length);
        setIsVisible(true);
      }, 450);
    }, 6500);

    return () => {
      window.clearInterval(interval);
      if (revealTimeout !== undefined) {
        window.clearTimeout(revealTimeout);
      }
    };
  }, []);

  return (
    <section className="relative isolate flex min-h-[620px] items-center overflow-hidden bg-[#07152e] md:min-h-[680px]">
      {heroSlides.map((item, index) => (
        <Image
          key={item.heading}
          src={item.image}
          alt=""
          aria-hidden="true"
          fill
          priority={index === 0}
          sizes="100vw"
          className={`object-cover object-center transition-opacity duration-500 ${
            index === activeSlide && isVisible ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-[#031027]/90 via-[#07152e]/65 to-[#07152e]/30" />
      <div className="absolute inset-0 bg-[#06142d]/15" />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pb-16 pt-36 sm:px-10 sm:pt-40 md:px-12 md:pb-20 md:pt-44 lg:px-[7%]">
        <div className="max-w-[900px]">
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#cbd5ff] sm:text-xs">
            Trusted diagnostics in Nigeria
          </p>
          <div
            aria-live="polite"
            aria-atomic="true"
            className={`max-w-[920px] transition-all duration-500 ease-out motion-reduce:transition-none ${
              isVisible
                ? "translate-y-0 scale-100 opacity-100"
                : "translate-y-2 scale-[0.98] opacity-0"
            }`}
          >
            <h1 className="text-[36px] font-semibold leading-[1.12] text-white sm:text-[48px] md:text-[58px] lg:text-[62px]">
              {slide.heading}
              <br className="hidden sm:block" />
              {slide.secondLine} {" "}
              <span className="font-light italic">{slide.emphasis}</span>
            </h1>
            <p className="mt-6 max-w-[580px] text-[16px] leading-relaxed text-white/90 sm:mt-7 sm:text-[19px]">
              {slide.description}
            </p>
          </div>
          <div className="mt-9 sm:mt-11">
            <AppointmentButton />
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
  );
}