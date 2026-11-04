"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import businessPhoto from "../inova-comps/inova huge img.jpg";

const partners = ["TESLA", "G Pay", "stripe", "enif"];

export function BusinessSolutions() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-business-reveal]",
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 78%",
              once: true,
            },
          },
        );
      });
    }, sectionRef);

    return () => {
      context.revert();
      media.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-[#f8f8fa] py-16 sm:py-20 lg:min-h-[650px] lg:py-24"
    >
      <svg
        viewBox="0 0 581 675"
        className="pointer-events-none absolute -right-16 -top-28 -z-10 h-[360px] w-[310px] rotate-12 opacity-100"
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
        <div
          data-business-reveal
          className="mb-10 flex flex-col justify-between gap-7 sm:mb-12 sm:flex-row sm:items-start lg:mb-14"
        >
          <div className="max-w-[390px]">
            <h2 className="text-[17px] font-medium leading-[1.6] text-[#34394c] sm:text-[19px]">
              Flexible solutions for every business model. Grow your business
              with a comprehensive set of payments and financial tools,
              designed to work individually or together.
            </h2>
          </div>

          <Link
            href="/appointment"
            className="group inline-flex w-fit items-center gap-3 bg-[#dcdfff] px-6 py-3 text-[12px] font-medium text-[#071b50] transition-all duration-300 hover:bg-[#cbd0ff] hover:shadow-md"
            style={{ clipPath: "polygon(14% 0, 100% 0, 86% 100%, 0 100%)" }}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
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
            Appointment
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-[1.65fr_1fr] lg:grid-cols-[1.8fr_1fr]">
          <div
            data-business-reveal
            className="group relative min-h-[250px] overflow-hidden bg-[#182b35] sm:min-h-[310px] lg:min-h-[340px]"
          >
            <Image
              src={businessPhoto}
              alt="Scientist examining a sample through a microscope"
              fill
              sizes="(max-width: 768px) 100vw, 65vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050b13]/90 via-[#050b13]/20 to-transparent" />
            <div className="absolute bottom-0 left-0 max-w-[390px] p-6 sm:p-8">
              <p className="text-[14px] font-medium leading-[1.45] text-white sm:text-[16px]">
                Run intricate cases, documentation, processing, and billing in
                one connected system.
              </p>
            </div>
          </div>

          <div
            data-business-reveal
            className="relative flex min-h-[250px] flex-col justify-between overflow-hidden bg-[#080d20] p-6 text-white sm:min-h-[310px] sm:p-8 lg:min-h-[340px]"
          >
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
                AllCare built us an exceptional product, with a great technology
                business model.
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

        <div
          data-business-reveal
          className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 border-t border-[#e8e8ee] pt-8 sm:mt-16 sm:justify-end sm:gap-x-12"
        >
          {partners.map((partner) => (
            <span
              key={partner}
              className="text-[13px] font-bold text-[#171923]/75 sm:text-[15px]"
            >
              {partner}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}