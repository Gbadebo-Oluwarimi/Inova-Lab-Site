"use client";

import { useState } from "react";
import Link from "next/link";
import { AppointmentButton } from "@/components/appointment-button";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Our Services", href: "/services" },
  { name: "Departments", href: "/departments" },
  { name: "CheckLab", href: "/checklab" },
];

function InovaLogo() {
  return (
    <Link href="/" className="flex shrink-0 items-center gap-2" aria-label="Inova home">
      <svg
        viewBox="0 0 52 52"
        className="h-9 w-9 sm:h-10 sm:w-10"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M23 5C25 2 30 1 33 4C35 6 35 9 34 12L31 21H43C47 21 49 24 48 28C47 31 45 33 41 33H27L23 46C22 50 18 52 14 50C11 49 10 46 11 43L14 33H6C2 33 0 30 1 26C2 23 4 21 8 21H17L20 9C20 7 21 6 23 5Z"
          fill="url(#inova-mark-gradient)"
        />
        <defs>
          <linearGradient
            id="inova-mark-gradient"
            x1="5"
            y1="4"
            x2="43"
            y2="48"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#78d7ff" />
            <stop offset="1" stopColor="#dce2ff" />
          </linearGradient>
        </defs>
      </svg>
      <span className="text-[27px] font-semibold leading-none text-white sm:text-[30px]">
        inova
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-8 z-40 bg-[#06142d]/20 backdrop-blur-[2px]">
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between gap-5 px-5 sm:px-8 md:h-[86px] md:px-10 lg:px-12">
        <InovaLogo />

        <nav aria-label="Main navigation" className="hidden items-center gap-6 lg:flex xl:gap-9">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="whitespace-nowrap text-[14px] font-medium text-white/90 transition-colors hover:text-white xl:text-[15px]"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <AppointmentButton compact />
        </div>

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-11 w-11 shrink-0 items-center justify-center text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:hidden"
        >
          <span className="flex w-7 flex-col gap-[6px]">
            <span
              className={`h-[2px] w-full bg-current transition-transform ${
                menuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`h-[2px] w-full bg-current transition-opacity ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-[2px] w-full bg-current transition-transform ${
                menuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="absolute left-0 top-full w-full border-t border-white/10  px-6 py-6 shadow-2xl lg:hidden"
        >
          <div className="flex flex-col gap-5">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="py-1 text-[16px] font-medium text-white/90 transition-colors hover:text-white"
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-1">
              <AppointmentButton compact />
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}