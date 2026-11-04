"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BackgroundMotif } from "@/components/background-motif";
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
    number: "1,000+",
    title: "Lives saved",
    description:
      "Timely diagnostic services help patients and care teams make informed decisions and take meaningful steps toward better health.",
  },
  {
    number: "800+",
    title: "Lives saved",
    description:
      "We are committed to compassionate patient care and dependable results that support people through important moments in their health journey.",
  },
  {
    number: "30+",
    title: "Years of experience",
    description:
      "For more than three decades, our team has supported patients and healthcare professionals with diagnostic services in Abuja.",
  },
];

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  const Icon = direction === "left" ? ArrowLeft : ArrowRight;
  return <Icon className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />;
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
      className="relative isolate overflow-hidden bg-[#050711] py-20 text-white sm:py-24 lg:py-28"
    >
      <BackgroundMotif color="#8795eb" className="-left-32 top-20 h-[380px] w-[330px] -rotate-12 opacity-[0.09] sm:h-[500px] sm:w-[430px]" />
      <div className="relative z-10 mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="mb-12 grid gap-7 md:mb-14 md:grid-cols-[1fr_0.8fr] md:items-end md:gap-12">
          <div className="max-w-[580px]">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[2px] text-[#b6c9ff]">INOVA IN FOCUS</p>
            <h2 id="impact-heading" className="text-[32px] font-semibold leading-[1.05] tracking-[-0.045em] text-white sm:text-[42px] lg:text-[52px]">
              Better insight.<br className="hidden sm:block" /> Better care.
            </h2>
          </div>
          <div className="flex max-w-[460px] flex-col justify-between gap-6 md:ml-auto md:items-end md:text-right">
            <p className="text-[13px] leading-[1.8] text-white/65 md:text-right sm:text-[14px]">
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

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6 lg:mt-20 lg:gap-10">
          {statistics.map((stat) => (
            <div key={stat.title} className="py-1 sm:pr-4 lg:pr-8">
              <p className="text-[36px] font-semibold tracking-[-0.04em] text-[#cbd3ff] sm:text-[42px]">
                {stat.number}
              </p>
              <h3 className="mt-2 text-[13px] font-semibold text-white sm:text-[14px]">
                {stat.title}
              </h3>
              <p className="mt-2 max-w-[380px] text-[12px] leading-[1.8] text-white/60 sm:text-[11px] lg:text-[12px]">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
