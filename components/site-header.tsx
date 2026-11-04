
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDownUp,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Atom,
  BookOpen,
  Check,
  Circle,
  CircleHelp,
  CircleDot,
  ChevronDown,
  FlaskConical,
  Heart,
  Mail,
  MapPin,
  Pencil,
  Plus,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AppointmentButton } from "@/components/appointment-button";

// ==========================================
// NAVIGATION STRUCTURE
// ==========================================

const navigation = [
  { name: "Home", href: "/" },
  { name: "Our Services", href: "/services" },
  { name: "Departments", href: "/departments" },
  { name: "CheckLab", href: "/checklab" },
  { name: "Blog", href: "/blog" },
  { name: "Contact Us", href: "/contact" },
];

// ==========================================
// MEGA MENU DATA
// ==========================================

type MenuLink = {
  title: string;
  description: string;
  href: string;
  icon: string;
};

type MenuGroup = {
  heading: string;
  links: {
    title: string;
    href: string;
  }[];
};

type MenuData = {
  featured: MenuLink[];
  groups: MenuGroup[];
};

const menuData: Record<string, MenuData> = {
  Home: {
    featured: [
      {
        title: "Welcome to Inova",
        description:
          "Discover trusted medical laboratory and diagnostic services.",
        href: "/",
        icon: "✚",
      },
      {
        title: "Why Choose Inova",
        description:
          "Learn about our commitment to quality and accuracy.",
        href: "/about",
        icon: "✦",
      },
      {
        title: "Our Commitment",
        description:
          "Better diagnostics and patient-centred healthcare.",
        href: "/about/quality",
        icon: "✓",
      },
    ],
    groups: [
      {
        heading: "DISCOVER INOVA",
        links: [
          { title: "About Us", href: "/about" },
          { title: "Our Mission", href: "/about#mission" },
          { title: "Our Vision", href: "/about#vision" },
          { title: "Our Team", href: "/about/our-team" },
        ],
      },
      {
        heading: "GET STARTED",
        links: [
          { title: "Book an Appointment", href: "/appointment" },
          { title: "Contact Us", href: "/contact" },
        ],
      },
    ],
  },

  "Our Services": {
    featured: [
      {
        title: "Laboratory Testing",
        description:
          "Reliable laboratory investigations and accurate results.",
        href: "/services/laboratory-testing",
        icon: "⌕",
      },
      {
        title: "Diagnostic Services",
        description:
          "Modern diagnostic solutions for better health decisions.",
        href: "/services/diagnostics",
        icon: "✚",
      },
      {
        title: "Health Screening",
        description:
          "Preventive health checks and comprehensive screening.",
        href: "/services/health-screening",
        icon: "♡",
      },
    ],
    groups: [
      {
        heading: "POPULAR SERVICES",
        links: [
          {
            title: "Full Blood Count",
            href: "/services/full-blood-count",
          },
          {
            title: "Malaria Test",
            href: "/services/malaria-test",
          },
          {
            title: "Hormonal Tests",
            href: "/services/hormonal-tests",
          },
          {
            title: "Urinalysis",
            href: "/services/urinalysis",
          },
        ],
      },
      {
        heading: "PATIENT SERVICES",
        links: [
          { title: "Book a Test", href: "/appointment" },
          {
            title: "Home Sample Collection",
            href: "/services/home-collection",
          },
        ],
      },
    ],
  },

  Departments: {
    featured: [
      {
        title: "Haematology",
        description:
          "Laboratory investigations involving blood and blood disorders.",
        href: "/departments/haematology",
        icon: "◉",
      },
      {
        title: "Microbiology",
        description:
          "Identification and investigation of microorganisms.",
        href: "/departments/microbiology",
        icon: "⌬",
      },
      {
        title: "Chemical Pathology",
        description:
          "Advanced biochemical testing and laboratory analysis.",
        href: "/departments/chemical-pathology",
        icon: "⚗",
      },
    ],
    groups: [
      {
        heading: "LABORATORY DEPARTMENTS",
        links: [
          {
            title: "Histopathology",
            href: "/departments/histopathology",
          },
          {
            title: "Immunology",
            href: "/departments/immunology",
          },
          {
            title: "Serology",
            href: "/departments/serology",
          },
          {
            title: "Parasitology",
            href: "/departments/parasitology",
          },
        ],
      },
      {
        heading: "MORE INFORMATION",
        links: [
          { title: "All Departments", href: "/departments" },
          {
            title: "Our Laboratory",
            href: "/about/our-laboratory",
          },
        ],
      },
    ],
  },

  CheckLab: {
    featured: [
      {
        title: "Check Your Results",
        description:
          "Access your laboratory results through our online platform.",
        href: "/checklab",
        icon: "✓",
      },
      {
        title: "Patient Portal",
        description:
          "Convenient access to your diagnostic information.",
        href: "/checklab",
        icon: "◎",
      },
      {
        title: "Result Assistance",
        description:
          "Get help with accessing your laboratory report.",
        href: "/contact",
        icon: "?",
      },
    ],
    groups: [
      {
        heading: "CHECKLAB",
        links: [
          { title: "View Results", href: "/checklab" },
          { title: "Patient Login", href: "/checklab" },
        ],
      },
      {
        heading: "NEED HELP?",
        links: [
          { title: "Contact Support", href: "/contact" },
          { title: "Book a Test", href: "/appointment" },
        ],
      },
    ],
  },

  Blog: {
    featured: [
      {
        title: "Health Articles",
        description:
          "Explore useful health and diagnostic information.",
        href: "/blog",
        icon: "✎",
      },
      {
        title: "Health Education",
        description:
          "Understand common medical tests and their importance.",
        href: "/blog/category/health-education",
        icon: "▤",
      },
      {
        title: "Latest Updates",
        description:
          "Stay informed about Inova and our healthcare services.",
        href: "/blog",
        icon: "↗",
      },
    ],
    groups: [
      {
        heading: "EXPLORE ARTICLES",
        links: [
          { title: "All Articles", href: "/blog" },
          {
            title: "Laboratory Tests",
            href: "/blog/category/laboratory-tests",
          },
          {
            title: "Health Tips",
            href: "/blog/category/health-tips",
          },
        ],
      },
      {
        heading: "STAY INFORMED",
        links: [
          { title: "About Inova", href: "/about" },
          { title: "Contact Us", href: "/contact" },
        ],
      },
    ],
  },

  "Contact Us": {
    featured: [
      {
        title: "Get in Touch",
        description:
          "Speak with our team about your healthcare needs.",
        href: "/contact",
        icon: "✉",
      },
      {
        title: "Visit Our Centre",
        description:
          "Find our diagnostic centre in Gwarinpa, Abuja.",
        href: "/contact#location",
        icon: "⌖",
      },
      {
        title: "Book an Appointment",
        description:
          "Schedule your laboratory test or diagnostic visit.",
        href: "/appointment",
        icon: "→",
      },
    ],
    groups: [
      {
        heading: "CONTACT INFORMATION",
        links: [
          { title: "Our Location", href: "/contact#location" },
          { title: "Send an Enquiry", href: "/contact" },
          {
            title: "Email Us",
            href: "mailto:info@inovamedlab.com",
          },
        ],
      },
      {
        heading: "QUICK ACTIONS",
        links: [
          {
            title: "Book an Appointment",
            href: "/appointment",
          },
          { title: "CheckLab", href: "/checklab" },
        ],
      },
    ],
  },
};

const menuIconMap: Record<string, LucideIcon> = {
  "✚": Plus,
  "✦": Sparkles,
  "✓": Check,
  "⌕": Search,
  "♡": Heart,
  "◉": CircleDot,
  "⌬": Atom,
  "⚗": FlaskConical,
  "◎": Circle,
  "?": CircleHelp,
  "✎": Pencil,
  "▤": BookOpen,
  "↗": ArrowUpRight,
  "✉": Mail,
  "⌖": MapPin,
  "→": ArrowRight,
};

// ==========================================
// INOVA LOGO
// ==========================================

function InovaLogo() {
  return (
    <Link
      href="/"
      className="flex shrink-0 items-center gap-2"
      aria-label="Inova home"
    >
      <Image
        src="/inova-logo.svg"
        alt="Inova"
        width={151}
        height={51}
        priority
        unoptimized
        className="h-auto w-[105px] sm:w-[118px]"
      />
    </Link>
  );
}

// ==========================================
// DROPDOWN ICON
// ==========================================

function DropdownIcon({ icon, compact = false }: { icon: string; compact?: boolean }) {
  const Icon = menuIconMap[icon] ?? ArrowDownUp;
  return (
    <span className={`flex shrink-0 items-center justify-center rounded-full transition duration-300 group-hover:scale-105 ${compact ? "h-9 w-9 bg-[#eaf3fb] text-[#147aa8]" : "h-11 w-11 bg-[#071b35] text-[#69dfff] group-hover:bg-[#123d69]"}`}>
      <Icon className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
    </span>
  );
}

// ==========================================
// CHEVRON ICON
// ==========================================

function Chevron({ open = false }: { open?: boolean }) {
  return (
    <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} aria-hidden="true" />
  );
}

// ==========================================
// MEGA DROPDOWN COMPONENT
// ==========================================

function MegaDropdown({
  data,
  title,
  close,
}: {
  data: MenuData;
  title: string;
  close: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#dce5ed] bg-white text-[#09233d] shadow-[0_24px_70px_rgba(3,20,40,0.24)]">
      <div className="border-b border-[#e7edf2] px-7 py-5 lg:px-8">
      
        <h2 className="mt-1 text-[20px] font-semibold tracking-[-0.02em] text-[#09233d]">{title}</h2>
      </div>
      <div className="grid grid-cols-[1.35fr_0.9fr]">

      {/* LEFT COLUMN */}
      <div className="space-y-2 p-5 lg:p-6">
        {data.featured.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            onClick={close}
            className="group flex items-start gap-4 rounded-xl border border-transparent p-3 transition-colors hover:border-[#dcecf5] hover:bg-[#f4faff] focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#168bc0]"
          >
            <DropdownIcon icon={item.icon} />

            <div className="min-w-0 flex-1 pt-0.5">
              <h3 className="text-[15px] font-semibold text-[#071b35] transition-colors group-hover:text-[#0879aa]">
                {item.title}
              </h3>

              <p className="mt-1 max-w-[300px] text-[13px] leading-[1.55] text-[#526174]">
                {item.description}
              </p>
            </div>
            <ArrowUpRight className="mt-1 h-4 w-4 text-[#92a5b5] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#0879aa]" aria-hidden="true" />
          </Link>
        ))}
      </div>

      {/* RIGHT COLUMN */}
      <div className="space-y-6 border-l border-[#e7edf2] bg-[#f7fafc] p-5 lg:p-6">
        {data.groups.map((group) => (
          <div key={group.heading}>
            <p className="mb-2 px-3 text-[10px] font-bold tracking-[1.2px] text-[#60758a]">
              {group.heading}
            </p>

            <div className="space-y-1">
              {group.links.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  onClick={close}
                  className="group flex min-h-10 items-center justify-between gap-3 rounded-lg px-3 text-[13px] font-semibold text-[#102b46] transition-colors hover:bg-white hover:text-[#0879aa] focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-[#168bc0]"
                >
                  {link.title}
                  <ArrowUpRight className="h-4 w-4 text-[#92a5b5] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#0879aa]" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}

// ==========================================
// MAIN SITE HEADER
// ==========================================

export function SiteHeader() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileActiveMenu, setMobileActiveMenu] = useState<string | null>(
    null
  );

  const closeMenus = () => {
    setActiveMenu(null);
    setMobileActiveMenu(null);
    setMobileMenuOpen(false);
  };
  const activeMobileData = mobileActiveMenu
    ? menuData[mobileActiveMenu]
    : null;

  return (
    <header
      className="absolute inset-x-0 top-10 z-50"
      onMouseLeave={() => setActiveMenu(null)}
    >
      {/* HEADER CONTENT */}
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between gap-5 px-5 sm:px-8 md:h-[86px] md:px-10 lg:px-12">

        <InovaLogo />

        {/* DESKTOP NAVIGATION */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-6 lg:flex xl:gap-9"
        >
          {navigation.map((item) => {
            const isOpen = activeMenu === item.name;

            return (
              <button
                key={item.name}
                type="button"
                aria-expanded={isOpen}
                aria-haspopup="true"
                aria-controls="desktop-mega-dropdown"
                onMouseEnter={() => setActiveMenu(item.name)}
                onFocus={() => setActiveMenu(item.name)}
                onClick={() => setActiveMenu(item.name)}
                className={`flex items-center gap-2 whitespace-nowrap text-[14px] font-medium transition-colors xl:text-[15px] ${
                  isOpen
                    ? "text-white"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {item.name}
                <Chevron open={isOpen} />
              </button>
            );
          })}
        </nav>

        {/* APPOINTMENT BUTTON */}
        <div className="hidden lg:block">
          <AppointmentButton compact />
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMobileMenuOpen((open) => !open)}
          className="flex h-11 w-11 shrink-0 items-center justify-center border border-white/25 bg-white/5 text-white shadow-lg transition-colors hover:bg-white/10 focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:hidden"
        >
          <span className="flex w-5 flex-col gap-[5px]">
            <span
              className={`h-[2px] w-full bg-current transition-transform ${
                mobileMenuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />

            <span
              className={`h-[2px] w-full bg-current transition-opacity ${
                mobileMenuOpen ? "opacity-0" : ""
              }`}
            />

            <span
              className={`h-[2px] w-full bg-current transition-transform ${
                mobileMenuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {/* DESKTOP MEGA DROPDOWN */}
      {activeMenu && (
        <div
          id="desktop-mega-dropdown"
          className="absolute left-[max(24px,calc((100vw-1440px)/2+230px))] top-full hidden w-[min(850px,calc(100vw-48px))] pt-2 lg:block"
        >
          <div className="inova-dropdown-animation">
            <MegaDropdown
              data={menuData[activeMenu]}
              title={activeMenu}
              close={() => setActiveMenu(null)}
            />
          </div>
        </div>
      )}

      {/* MOBILE NAVIGATION */}
      {mobileMenuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="fixed inset-0 z-[60] flex h-[100dvh] w-full flex-col overflow-y-auto bg-[#f7f8fc] px-6 pb-8 pt-5 text-[#10234b] lg:hidden"
        >
          <div className="mx-auto flex w-full max-w-[420px] items-center justify-between">
            <div className="rounded-lg bg-[#07152e] px-2 py-1.5">
              <Image
                src="/inova-logo.svg"
                alt="Inova"
                width={151}
                height={51}
                unoptimized
                className="h-auto w-[108px]"
              />
            </div>
            <button
              type="button"
              onClick={closeMenus}
              aria-label="Close navigation"
              className="flex h-10 w-10 items-center justify-center rounded-full text-[#344054] transition-colors hover:bg-[#e9edf5] focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#344054]"
            >
              <X className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
            </button>
          </div>

          <div className="mx-auto mt-8 flex w-full max-w-[420px] min-h-0 flex-1 flex-col">
            {activeMobileData ? (
              <div className="flex min-h-0 flex-1 flex-col">
                <button
                  type="button"
                  onClick={() => setMobileActiveMenu(null)}
                  className="flex min-h-11 items-center gap-2 self-start rounded-lg px-3 text-[13px] font-semibold text-[#31518e] transition-colors hover:bg-[#e9f0fa]"
                >
                  <ArrowLeft className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
                  All sections
                </button>

                <div className="flex min-h-0 flex-1 flex-col overflow-y-auto py-4 text-left" aria-live="polite">
                  <h2 className="mb-4 px-1 text-[21px] font-semibold text-[#14264a]">
                    {mobileActiveMenu}
                  </h2>

                  <div className="w-full space-y-6">
                    <div className="space-y-2">
                      {activeMobileData.featured.map((link) => (
                        <Link
                          key={link.title}
                          href={link.href}
                          onClick={closeMenus}
                          className="group flex min-h-[68px] items-center gap-3 rounded-xl border border-[#dfe7f0] bg-white px-4 py-3 shadow-[0_2px_8px_rgba(16,35,75,0.04)] transition-colors hover:border-[#b8d7e8] hover:bg-[#f7fbff] focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-[#31518e]"
                        >
                          <DropdownIcon icon={link.icon} compact />
                          <span className="min-w-0 flex-1">
                            <span className="block text-[14px] font-semibold text-[#1d2939]">{link.title}</span>
                            <span className="mt-1 block text-[12px] leading-relaxed text-[#667085]">{link.description}</span>
                          </span>
                          <ArrowUpRight className="h-4 w-4 text-[#8b9bad] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                        </Link>
                      ))}
                    </div>

                    {activeMobileData.groups.map((group) => (
                      <div key={group.heading} className="border-t border-[#e1e7ef] pt-4">
                        <p className="mb-2 px-1 text-[10px] font-bold tracking-[1.2px] text-[#667085]">
                          {group.heading}
                        </p>
                        <div className="space-y-1">
                          {group.links.map((link) => (
                            <Link
                              key={link.title}
                              href={link.href}
                              onClick={closeMenus}
                              className="group flex min-h-11 items-center justify-between rounded-lg px-3 text-[14px] font-medium text-[#344054] transition-colors hover:bg-white hover:text-[#31518e] focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-[#31518e]"
                            >
                              {link.title}
                              <ArrowUpRight className="h-4 w-4 text-[#8b9bad] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <nav aria-label="Mobile menu sections" className="flex flex-1 flex-col justify-center">
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setMobileActiveMenu(item.name)}
                    aria-expanded={false}
                    className="group flex min-h-[60px] w-full items-center justify-between border-b border-[#e4eaf2] px-3 text-left text-[18px] font-semibold text-[#14264a] transition-colors hover:bg-white hover:text-[#31518e]"
                  >
                    {item.name}
                    <span className="text-[#667085] transition-transform group-hover:translate-x-1">
                      <Chevron />
                    </span>
                  </button>
                ))}
              </nav>
            )}

            <div className="flex justify-center pt-5">
              <AppointmentButton compact />
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
