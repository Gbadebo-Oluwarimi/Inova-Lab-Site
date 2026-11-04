"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus } from "lucide-react";
import businessPhoto from "../inova-comps/doctor girk.jpg";
import teamPhoto from "../inova-comps/inova huge img.jpg";
import consultationPhoto from "../inova-comps/family-consultation.png";
import ultrasoundPhoto from "../inova-comps/ultrasound.png";
import specialistPhoto from "../inova-comps/cardiologist.jpg";
import { AppointmentButton } from "./appointment-button";

const businessSlides = [
  {
    image: businessPhoto,
    alt: "Laboratory scientist examining a sample through a microscope",
    title: "Careful work at every stage.",
    description:
      "Our laboratory team uses modern diagnostic tools and careful processes to deliver dependable answers that support the next step in each patient’s care.",
  },
  {
    image: teamPhoto,
    alt: "Inova clinical team working together",
    title: "Specialists working together.",
    description:
      "Our clinicians and laboratory professionals share knowledge across each case, helping connect patients with thoughtful guidance and clear results.",
  },
  {
    image: consultationPhoto,
    alt: "Doctor speaking with a patient during a consultation",
    title: "A more personal experience.",
    description:
      "From the first conversation to follow-up, we take time to listen, explain what comes next, and help each person feel supported throughout their visit.",
  },
  {
    image: ultrasoundPhoto,
    alt: "Clinician performing an ultrasound examination",
    title: "Clear insight for better decisions.",
    description:
      "Diagnostic imaging and laboratory services work together to give patients and clinicians useful information for informed healthcare decisions.",
  },
  {
    image: specialistPhoto,
    alt: "Medical specialists discussing a patient’s care",
    title: "Expertise with compassion.",
    description:
      "Our care teams combine professional expertise with respectful, patient-centred service at every stage of the diagnostic journey.",
  },
];

export function BusinessSolutions() {
  const sectionRef = useRef<HTMLElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = businessSlides[activeSlide];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % businessSlides.length);
    }, 7000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const elements = slideRef.current?.querySelectorAll<HTMLElement>("[data-slide-reveal]");
    if (!elements?.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.fromTo(
      elements,
      { autoAlpha: 0.35, y: 12 },
      { autoAlpha: 1, y: 0, duration: 0.65, stagger: 0.08, ease: "power2.out" },
    );
  }, [activeSlide]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-text-reveal]").forEach((text) => {
          gsap.fromTo(
            text,
            { autoAlpha: 0.18, filter: "blur(6px)", y: 16 },
            {
              autoAlpha: 1,
              filter: "blur(0px)",
              y: 0,
              ease: "none",
              scrollTrigger: {
                trigger: text,
                start: "top 92%",
                end: "top 62%",
                scrub: 0.65,
              },
            },
          );
        });
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
      aria-labelledby="business-solutions-heading"
      className="relative isolate overflow-hidden bg-[#f8f8fa] py-16 sm:py-20 lg:min-h-[650px] lg:py-24"
    >
      <svg
        viewBox="0 0 581 675"
        className="pointer-events-none absolute -right-24 -top-28 -z-10 h-[360px] w-[310px] rotate-12 opacity-100"
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
        <div className="mb-10 flex flex-col justify-between gap-7 sm:mb-12 sm:flex-row sm:items-end lg:mb-14">
          <div className="max-w-[680px]">
            <p data-text-reveal className="mb-3 text-[10px] font-semibold uppercase tracking-[2px] text-[#536ba2]">OUR APPROACH</p>
            <h2
              id="business-solutions-heading"
              data-text-reveal
              className="text-[28px] font-semibold leading-[1.08] tracking-[-0.045em] text-[#202637] sm:text-[38px]"
            >
              Diagnostic care that helps you make confident decisions.
            </h2>
            <p data-text-reveal className="mt-4 max-w-[600px] text-[13px] leading-[1.75] text-[#626a78] sm:text-[14px]">
              From routine testing to specialist investigations, our experienced team combines trusted laboratory practice with clear communication for patients and clinicians.
            </p>
          </div>

          <AppointmentButton compact />
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-[1.65fr_1fr] lg:grid-cols-[1.8fr_1fr]">
          <div ref={slideRef} className="group relative min-h-[330px] overflow-hidden rounded-2xl bg-[#182b35] shadow-[0_18px_48px_rgba(17,24,39,0.16)] sm:min-h-[390px] lg:min-h-[440px]">
            <Image
              key={slide.alt}
              src={slide.image}
              alt={slide.alt}
              fill
              sizes="(max-width: 768px) 100vw, 65vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050b13]/70 via-[#050b13]/10 to-transparent" />
            <div className="absolute bottom-0 left-0 max-w-[520px] p-6 sm:p-8">
              <p data-text-reveal data-slide-reveal className="mb-2 text-[9px] font-semibold uppercase tracking-[1.8px] text-[#dce2ff]">
                Inova Medical · 0{activeSlide + 1}
              </p>
              <h3 data-text-reveal data-slide-reveal className="max-w-[440px] text-[23px] font-semibold leading-tight tracking-[-0.03em] text-white sm:text-[30px]">
                {slide.title}
              </h3>
              <p data-text-reveal data-slide-reveal className="mt-3 max-w-[480px] text-[12px] leading-[1.7] text-white/85 sm:text-[14px]">
                {slide.description}
              </p>
              <div className="mt-5 flex items-center gap-2" aria-label={`Slide ${activeSlide + 1} of ${businessSlides.length}`}>
                {businessSlides.map((item, index) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => setActiveSlide(index)}
                    aria-label={`Show slide ${index + 1}: ${item.title}`}
                    aria-current={index === activeSlide ? "true" : undefined}
                    className={`h-1.5 rounded-full transition-all ${index === activeSlide ? "w-7 bg-white" : "w-1.5 bg-white/55 hover:bg-white/80"}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="relative flex min-h-[250px] flex-col justify-between overflow-hidden rounded-2xl bg-[#080d20] p-6 text-white shadow-[0_18px_48px_rgba(17,24,39,0.12)] sm:min-h-[310px] sm:p-8 lg:min-h-[340px]">
            <div className="flex justify-end">
              <Plus className="h-8 w-8 text-[#daddff]" strokeWidth={1.5} aria-hidden="true" />
            </div>

            <div data-text-reveal className="mt-4">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[1.8px] text-[#cfd6ff]">
                What guides our work
              </p>
              <h3 className="max-w-[300px] text-[22px] font-semibold leading-tight tracking-[-0.03em] sm:text-[26px]">
                Better care starts with dependable answers.
              </h3>
              <p className="mt-3 max-w-[310px] text-[12px] leading-[1.7] text-white/75 sm:text-[13px]">
                We value clinical accuracy, respectful service, and timely
                support. These principles shape each interaction, from the
                first conversation through to sharing results with the people
                who need them.
              </p>
              <div className="mt-5 flex flex-wrap gap-2" aria-label="Inova values">
                {["Accuracy", "Compassion", "Trust"].map((value) => (
                  <span key={value} className="rounded-full border border-white/20 px-3 py-1.5 text-[10px] font-medium text-white/90">
                    {value}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
