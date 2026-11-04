"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import businessPhoto from "../inova-comps/doctor girk.jpg";
import { AppointmentButton } from "./appointment-button";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type ScrollRevealTextProps = {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  start?: string;
};

function ScrollRevealText({
  text,
  className = "",
  delay = 0,
  stagger = 0.055,
  duration = 0.8,
  start = "top 85%",
}: ScrollRevealTextProps) {
  const container = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const words = gsap.utils.toArray<HTMLElement>(
        ".reveal-word",
        container.current ?? undefined,
      );
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          words,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration,
            delay,
            stagger,
            ease: "power3.out",
            scrollTrigger: {
              trigger: container.current,
              start,
              once: true,
            },
          },
        );
      });

      return () => media.revert();
    },
    {
      scope: container,
      dependencies: [text, delay, stagger, duration, start],
    },
  );

  return (
    <span ref={container} className={`inline ${className}`}>
      {text.split(" ").map((word, index, words) => (
        <span key={`${word}-${index}`}>
          <span className="inline-block overflow-hidden align-bottom">
            <span className="reveal-word inline-block will-change-transform">
              {word}
            </span>
          </span>
          {index < words.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
}

export function BusinessSolutions() {
  return (
    <section
      aria-labelledby="business-solutions-heading"
      className="relative isolate overflow-hidden bg-[#f8f8fa] py-16 sm:py-20 lg:min-h-[650px] lg:py-24"
    >
      <svg
        viewBox="0 0 581 675"
        className="pointer-events-none absolute -right-1 -top-40 -z-10 h-[360px] w-[310px] rotate-12 opacity-100"
        aria-hidden="true"
      >
        <path
          d="M658.729 421.408C674.522 431.005 679.546 451.588 669.95 467.381L606.6 571.642C597.004 587.435 576.421 592.459 560.627 582.863L397.981 484.037C382.188 474.441 361.605 479.465 352.009 495.258L252.821 658.5C243.225 674.294 222.642 679.318 206.848 669.721L101.992 606.01C86.1986 596.413 81.1747 575.831 90.7712 560.037L189.958 396.795C199.555 381.001 194.531 360.419 178.737 350.822L16.0912 251.997C0.297499 242.401-4.72645 221.818 4.86998 206.024L68.2195 101.764C77.816 85.9702 98.3792 80.9343 114.173 90.5307C171.384 125.293 239.309 166.565 276.867 189.386C292.661 198.982 313.196 193.972 322.793 178.178C345.551 140.723 386.652 73.0786 421.287 16.0768C430.883 0.28309 451.454-4.7211 467.248 4.87533L572.104 68.5869C587.897 78.1833 592.921 98.7661 583.325 114.56L484.862 276.61C475.265 292.404 480.289 312.987 496.083 322.583L658.729 421.408Z"
          fill="#DADDFF"
        />
      </svg>

      <svg
        viewBox="0 0 581 675"
        className="pointer-events-none absolute -bottom-48 -left-36 -z-10 h-[430px] w-[370px] rotate-12 opacity-100"
        aria-hidden="true"
      >
        <path
          d="M658.729 421.408C674.522 431.005 679.546 451.588 669.95 467.381L606.6 571.642C597.004 587.435 576.421 592.459 560.627 582.863L397.981 484.037C382.188 474.441 361.605 479.465 352.009 495.258L252.821 658.5C243.225 674.294 222.642 679.318 206.848 669.721L101.992 606.01C86.1986 596.413 81.1747 575.831 90.7712 560.037L189.958 396.795C199.555 381.001 194.531 360.419 178.737 350.822L16.0912 251.997C0.297499 242.401-4.72645 221.818 4.86998 206.024L68.2195 101.764C77.816 85.9702 98.3792 80.9343 114.173 90.5307C171.384 125.293 239.309 166.565 276.867 189.386C292.661 198.982 313.196 193.972 322.793 178.178C345.551 140.723 386.652 73.0786 421.287 16.0768C430.883 0.28309 451.454-4.7211 467.248 4.87533L572.104 68.5869C587.897 78.1833 592.921 98.7661 583.325 114.56L484.862 276.61C475.265 292.404 480.289 312.987 496.083 322.583L658.729 421.408Z"
          fill="#DADDFF"
        />
      </svg>

      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
        <div className="mb-10 flex flex-col justify-between gap-7 sm:mb-12 sm:flex-row sm:items-start lg:mb-14">
          <div className="max-w-[640px]">
            <h2
              id="business-solutions-heading"
              className="text-[17px] font-semibold leading-[1.2] text-[#34394c] sm:text-[26px]"
            >
              <ScrollRevealText
                className="block"
                text="Flexible solutions for every business model. Grow your business with a comprehensive set of payments and financial tools, designed to work individually or together."
              />
            </h2>
          </div>

          <AppointmentButton compact />
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-[1.65fr_1fr] lg:grid-cols-[1.8fr_1fr]">
          <div className="group relative min-h-[250px] overflow-hidden bg-[#182b35] sm:min-h-[310px] lg:min-h-[340px]">
            <Image
              src={businessPhoto}
              alt="Laboratory scientist examining samples through a microscope"
              fill
              sizes="(max-width: 768px) 100vw, 65vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050b13]/70 via-[#050b13]/10 to-transparent" />
            <div className="absolute bottom-0 left-0 max-w-[390px] p-6 sm:p-8">
              <p className="text-[14px] font-medium leading-[1.45] text-white sm:text-[16px]">
                <ScrollRevealText
                  className="block"
                  text="Run intricate cases, documentation, processing, and billing in one connected system."
                  stagger={0.04}
                  duration={0.65}
                  start="bottom 92%"
                />
              </p>
            </div>
          </div>

          <div className="relative flex min-h-[250px] flex-col justify-between overflow-hidden bg-[#080d20] p-6 text-white sm:min-h-[310px] sm:p-8 lg:min-h-[340px]">
            <div className="flex justify-end">
              <svg
                viewBox="0 0 40 40"
                className="h-8 w-8"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M16 3C19 1 23 3 23 7V15H31C35 15 37 18 35 22C34 24 32 25 29 25H23V32C23 36 20 38 16 37C13 36 12 34 12 31V25H6C2 25 0 22 2 18C3 16 5 15 8 15H12V8C12 6 13 4 16 3Z"
                  fill="#DADDFF"
                />
              </svg>
            </div>

            <div className="mt-4">
              <span className="mb-3 block text-[32px] font-semibold leading-none">
                “
              </span>
              <p className="max-w-[280px] text-[13px] leading-[1.7] text-white/90 sm:text-[14px]">
                <ScrollRevealText
                  className="block"
                  text="AllCare built us an exceptional product, with a great technology business model."
                  stagger={0.045}
                />
              </p>
              <div className="mt-5">
                <p className="text-[12px] font-semibold text-white">
                  Anonymous Customer
                </p>
                <p className="mt-1 text-[10px] text-white/60">
                  Healthcare Services, Nigeria
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}