"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import advancedTestingImage from "../inova-comps/ultrasound.png";
import specialistImage from "../inova-comps/cardiologist.jpg";
import patientCareImage from "../inova-comps/family-consultation.png";
import qualityImage from "../inova-comps/doctor girk.jpg";

const stories = [
  {
    id: 1,
    image: advancedTestingImage,
    category: "OUR SERVICES",
    title: "Advanced Laboratory Testing",
    description:
      "Accurate laboratory investigations supported by modern diagnostic technology.",
    href: "/services",
  },
  {
    id: 2,
    image: specialistImage,
    category: "OUR SPECIALISTS",
    title: "Expertise You Can Trust",
    description:
      "Our dedicated professionals are committed to delivering reliable results.",
    href: "/about/our-team",
  },
  {
    id: 3,
    image: patientCareImage,
    category: "PATIENT CARE",
    title: "Your Health Comes First",
    description:
      "A welcoming environment designed around your comfort and healthcare needs.",
    href: "/patient-care",
  },
  {
    id: 4,
    image: qualityImage,
    category: "QUALITY ASSURANCE",
    title: "Committed to Excellence",
    description:
      "Quality-driven processes that support accurate and dependable diagnosis.",
    href: "/about/quality",
  },
];

const statistics = [
  {
    number: "XX+",
    title: "Laboratory Investigations",
    description:
      "A growing range of diagnostic investigations across multiple laboratory departments.",
  },
  {
    number: "XX%",
    title: "Commitment to Quality",
    description:
      "Our commitment to accurate testing, professional standards and dependable results.",
  },
  {
    number: "XX+",
    title: "Patients Served",
    description:
      "Supporting individuals, families and healthcare providers with diagnostic services.",
  },
];

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {direction === "left" ? (
        <path d="M19 12H5m7 7-7-7 7-7" />
      ) : (
        <path d="M5 12h14m-7-7 7 7-7 7" />
      )}
    </svg>
  );
}

export default function ImpactSection() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const slide = (direction: "left" | "right") => {
    const container = sliderRef.current;
    if (!container) return;

    container.scrollBy({
      left: direction === "right" ? container.clientWidth * 0.8 : -container.clientWidth * 0.8,
      behavior: "smooth",
    });
  };

  const goToSlide = (index: number) => {
    const container = sliderRef.current;
    const card = container?.children.item(index);
    if (!container || !(card instanceof HTMLElement)) return;

    container.scrollBy({
      left: card.getBoundingClientRect().left - container.getBoundingClientRect().left,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const container = sliderRef.current;
    if (!container) return;

    let frame = 0;
    const updateActiveSlide = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const containerLeft = container.getBoundingClientRect().left;
        let closestIndex = 0;
        let closestDistance = Number.POSITIVE_INFINITY;

        Array.from(container.children).forEach((card, index) => {
          const distance = Math.abs(card.getBoundingClientRect().left - containerLeft);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        });

        setActiveSlide(closestIndex);
      });
    };

    container.addEventListener("scroll", updateActiveSlide, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      container.removeEventListener("scroll", updateActiveSlide);
    };
  }, []);

  return (
    <section
      aria-labelledby="impact-heading"
      className="relative overflow-hidden bg-[#050711] py-20 text-white sm:py-24 lg:py-28"
    >
      <h2 id="impact-heading" className="sr-only">
        Inova impact
      </h2>
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="mb-12 flex flex-col justify-between gap-8 md:mb-14 md:flex-row md:items-start">
          <div className="flex max-w-[440px] flex-col justify-between gap-6 md:ml-auto md:items-end md:text-right">
            <p className="text-[14px] leading-[1.8] text-white/65 md:text-right">
              Discover how Inova is committed to advancing healthcare through
              reliable diagnostic services, modern laboratory technology and
              professional medical expertise.
            </p>
            <div className="flex items-center gap-3 lg:hidden">
              <button
                type="button"
                onClick={() => slide("left")}
                aria-label="Previous stories"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-[#cbd3ff] hover:bg-[#dce0ff] hover:text-[#071b50] focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <ArrowIcon direction="left" />
              </button>
              <button
                type="button"
                onClick={() => slide("right")}
                aria-label="Next stories"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-[#cbd3ff] hover:bg-[#dce0ff] hover:text-[#071b50] focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <ArrowIcon direction="right" />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={sliderRef}
          aria-label="Inova stories"
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-5 lg:grid lg:grid-cols-4 lg:gap-4 lg:overflow-visible lg:pb-0"
        >
          {stories.map((story, index) => (
            <Link
              key={story.id}
              href={story.href}
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${stories.length}: ${story.title}`}
              className="group min-w-[82%] snap-start sm:min-w-[45%] lg:min-w-0"
            >
              <div className="relative aspect-[0.82] overflow-hidden rounded-sm bg-[#101522]">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  sizes="(max-width: 640px) 82vw, (max-width: 1024px) 45vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="pt-3">
                <span className="text-[8px] font-semibold uppercase tracking-[1.2px] text-[#aebfff]">
                  {story.category}
                </span>
                <h3 className="mt-1 text-[13px] font-semibold leading-snug text-white sm:text-[14px]">
                  {story.title}
                </h3>
                <p className="mt-1.5 text-[10px] leading-[1.55] text-white/60">
                  {story.description}
                </p>
                <div className="mt-2 flex items-center gap-1.5 text-[10px] font-semibold text-[#dce0ff]">
                  Explore more
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowIcon direction="right" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-2 flex items-center justify-between">
          <p className="text-[10px] tracking-wide text-white/40">
            DISCOVER MORE ABOUT INOVA
          </p>
          <div className="flex items-center gap-2 lg:hidden" aria-label="Select story">
            {stories.map((story, index) => (
              <button
                key={story.id}
                type="button"
                onClick={() => goToSlide(index)}
                aria-label={`Go to story ${index + 1}: ${story.title}`}
                aria-current={activeSlide === index ? "true" : undefined}
                className={`h-1 rounded-full transition-all ${
                  activeSlide === index ? "w-8 bg-[#cbd3ff]" : "w-3 bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 border-t border-white/10 pt-12 sm:grid-cols-3 sm:gap-8 lg:mt-20 lg:pt-16">
          {statistics.map((stat) => (
            <div key={stat.title} className="max-w-[310px]">
              <p className="text-[34px] font-semibold text-[#b6c9ff] sm:text-[38px]">
                {stat.number}
              </p>
              <h3 className="mt-3 text-[14px] font-semibold text-white">
                {stat.title}
              </h3>
              <p className="mt-3 text-[11px] leading-[1.8] text-white/55">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}