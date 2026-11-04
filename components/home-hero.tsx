"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { AppointmentButton } from "@/components/appointment-button";

const heroSlides = [
  {
    heading: "Accurate Diagnosis. Better",
    secondLine: "Health.",
    emphasis: "A Healthier Tomorrow.",
    description:
      "Your trusted medical laboratory and diagnostic centre in Nigeria.",
  },
  {
    heading: "Trusted Diagnostics.",
    secondLine: "Confident Decisions.",
    emphasis: "Care You Can Count On.",
    description:
      "Clear answers from certified specialists, with your health in focus.",
  },
];

export function HomeHero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const copyRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([null, null]);
  const slide = heroSlides[activeSlide];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ repeat: -1 });
      timeline
        .to(copyRef.current, {
          autoAlpha: 0,
          y: 8,
          duration: 0.45,
          ease: "power1.out",
        }, "+=5.5")
        .call(() => {
          setActiveSlide((current) => (current + 1) % heroSlides.length);
        })
        .set(copyRef.current, { y: -8 })
        .to(copyRef.current, {
          autoAlpha: 1,
          y: 0,
          duration: 0.55,
          ease: "power2.out",
        });
    }, copyRef);

    return () => context.revert();
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const [firstVideo, secondVideo] = videoRefs.current;
    if (!firstVideo || !secondVideo) return;

    const videos = [firstVideo, secondVideo];
    let activeVideo = 0;
    let transitioning = false;

    const switchVideo = (currentIndex: number) => {
      if (currentIndex !== activeVideo || transitioning) return;

      const outgoing = videos[currentIndex];
      const nextIndex = (currentIndex + 1) % videos.length;
      const incoming = videos[nextIndex];
      transitioning = true;
      incoming.currentTime = 0;

      void incoming
        .play()
        .then(() => {
          gsap.to(incoming, {
            autoAlpha: 1,
            duration: 0.9,
            ease: "power1.inOut",
          });
          gsap.to(outgoing, {
            autoAlpha: 0,
            duration: 0.9,
            ease: "power1.inOut",
            onComplete: () => {
              outgoing.pause();
              outgoing.currentTime = 0;
              activeVideo = nextIndex;
              transitioning = false;
            },
          });
        })
        .catch(() => {
          transitioning = false;
          outgoing.currentTime = 0;
          void outgoing.play().catch(() => undefined);
        });
    };

    const handlers = videos.map((_, index) => () => switchVideo(index));
    videos.forEach((video, index) => {
      video.addEventListener("ended", handlers[index]);
    });
    void firstVideo.play().catch(() => undefined);

    return () => {
      videos.forEach((video, index) => {
        video.removeEventListener("ended", handlers[index]);
        video.pause();
      });
    };
  }, []);

  return (
    <section className="relative isolate flex min-h-[620px] items-center overflow-hidden bg-[#07152e] md:min-h-[680px]">
      <video
        ref={(element) => {
          videoRefs.current[0] = element;
        }}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ opacity: 1 }}
        muted
        playsInline
        preload="auto"
        poster="/images/medical-team.avif"
      >
        <source src="/videos/lab-analyzers.mp4" type="video/mp4" />
      </video>
      <video
        ref={(element) => {
          videoRefs.current[1] = element;
        }}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ opacity: 0 }}
        muted
        playsInline
        preload="auto"
        poster="/images/medical-team.avif"
      >
        <source src="/videos/lab-scientist.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-r from-[#031027]/90 via-[#07152e]/65 to-[#07152e]/30" />
      <div className="absolute inset-0 bg-[#06142d]/15" />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pb-16 pt-36 sm:px-10 sm:pt-40 md:px-12 md:pb-20 md:pt-44 lg:px-[7%]">
        <div className="max-w-[900px]">
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#cbd5ff] sm:text-xs">
            Trusted diagnostics in Nigeria
          </p>
          <div
            ref={copyRef}
            aria-live="polite"
            aria-atomic="true"
            className="max-w-[920px]"
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