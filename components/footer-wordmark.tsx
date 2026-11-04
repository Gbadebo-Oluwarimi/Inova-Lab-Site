"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function FooterWordmark() {
  const containerRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<SVGSVGElement>(null);
  const wordmarkRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const targets = [markRef.current, wordmarkRef.current].filter(
          (target): target is SVGSVGElement => target !== null,
        );
        if (!targets.length) return;

        gsap.fromTo(
          targets,
          { autoAlpha: 0, y: 32, scaleX: 0.96, filter: "blur(8px)" },
          {
            autoAlpha: 1,
            y: 0,
            scaleX: 1,
            filter: "blur(0px)",
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 90%",
              end: "top 55%",
              scrub: 0.7,
            },
          },
        );
      });
    }, containerRef);

    return () => {
      context.revert();
      media.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label="Inova Labs Diagnostic"
      className="flex w-full min-w-0 items-center gap-2.5 sm:gap-5"
    >
      <svg ref={markRef} viewBox="0 0 52 52" className="h-8 w-8 shrink-0 sm:h-12 sm:w-12" fill="none" aria-hidden="true">
        <path d="M47.94 18.34c1.32 0 2.39 1.07 2.39 2.39v8.72c0 1.32-1.07 2.39-2.39 2.39H34.34c-1.32 0-2.39 1.07-2.39 2.39v13.65c0 1.32-1.07 2.39-2.39 2.39h-8.77c-1.32 0-2.39-1.07-2.39-2.39V34.23c0-1.32-1.07-2.39-2.39-2.39H2.39C1.07 31.84 0 30.77 0 29.45v-8.72c0-1.32 1.07-2.39 2.39-2.39H16c1.32 0 2.39-1.07 2.39-2.39V2.39C18.39 1.07 19.46 0 20.78 0h8.77c1.32 0 2.39 1.07 2.39 2.39v13.56c0 1.32 1.07 2.39 2.39 2.39z" fill="#536ba2" />
        <circle cx="46" cy="6" r="5" fill="#aebaff" />
      </svg>
      <svg
        ref={wordmarkRef}
        viewBox="0 0 1200 140"
        preserveAspectRatio="none"
        className="h-auto min-w-0 flex-1 overflow-visible"
        role="img"
        aria-hidden="true"
      >
        <text
          x="0"
          y="108"
          textLength="1190"
          lengthAdjust="spacingAndGlyphs"
          fill="#101b2a"
          fontFamily="var(--font-gellix), sans-serif"
          fontSize="108"
          fontWeight="600"
          letterSpacing="-5"
        >
          INOVA LABS DIAGNOSTIC
        </text>
      </svg>
    </div>
  );
}
