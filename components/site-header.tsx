
"use client";

import { useState } from "react";
import Link from "next/link";
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

// ==========================================
// DROPDOWN ICON
// ==========================================

function DropdownIcon({ icon }: { icon: string }) {
  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#071b35] text-[20px] font-semibold text-[#69dfff] transition duration-300 group-hover:scale-105 group-hover:bg-[#123d69]">
      {icon}
    </div>
  );
}

// ==========================================
// CHEVRON ICON
// ==========================================

function Chevron({ open = false }: { open?: boolean }) {
  return (
    <svg
      viewBox="0 0 12 12"
      className={`h-3 w-3 transition-transform duration-200 ${
        open ? "rotate-180" : ""
      }`}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m2 4 4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ==========================================
// MEGA DROPDOWN COMPONENT
// ==========================================

function MegaDropdown({
  data,
  close,
}: {
  data: MenuData;
  close: () => void;
}) {
  return (
    <div className="grid grid-cols-[1.35fr_0.9fr] overflow-hidden rounded-[3px] bg-white text-[#09233d] shadow-[0_18px_55px_rgba(0,0,0,0.16)]">

      {/* LEFT COLUMN */}
      <div className="space-y-5 p-6 lg:p-8">
        {data.featured.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            onClick={close}
            className="group flex items-start gap-4 rounded-md"
          >
            <DropdownIcon icon={item.icon} />

            <div className="pt-0.5">
              <h3 className="text-[15px] font-semibold text-[#071b35] transition-colors group-hover:text-[#2563eb]">
                {item.title}
              </h3>

              <p className="mt-1 max-w-[250px] text-[13px] leading-[1.65] text-[#526174]">
                {item.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* RIGHT COLUMN */}
      <div className="space-y-7 bg-[#f6f9fb] p-6 lg:p-8">
        {data.groups.map((group) => (
          <div key={group.heading}>
            <p className="mb-3 text-[10px] font-bold tracking-[1.2px] text-[#60758a]">
              {group.heading}
            </p>

            <div className="space-y-2.5">
              {group.links.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  onClick={close}
                  className="block text-[13px] font-semibold text-[#102b46] transition-colors hover:text-[#2873df]"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
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

  return (
    <header
      className="absolute inset-x-0 top-8 z-50"
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
          className="flex h-12 w-12 shrink-0 items-center justify-center border border-white/25 bg-white/5 text-white shadow-lg transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:hidden"
        >
          <span className="flex w-7 flex-col gap-[6px]">
            <span
              className={`h-[2px] w-full bg-current transition-transform ${
                mobileMenuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />

            <span
              className={`h-[2px] w-full bg-current transition-opacity ${
                mobileMenuOpen ? "opacity-0" : ""
              }`}
            />

            <span
              className={`h-[2px] w-full bg-current transition-transform ${
                mobileMenuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {/* DESKTOP MEGA DROPDOWN */}
      {activeMenu && (
        <div
          id="desktop-mega-dropdown"
          className="absolute left-1/2 top-full hidden w-[min(850px,calc(100vw-48px))] -translate-x-1/2 pt-2 lg:block"
        >
          <div className="inova-dropdown-animation">
            <MegaDropdown
              data={menuData[activeMenu]}
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
          className="absolute left-0 top-full max-h-[80vh] w-full overflow-y-auto border-t border-white/10 bg-[#07152e]/[0.98] px-5 py-5 shadow-2xl backdrop-blur-xl lg:hidden"
        >
          <div className="mx-auto flex max-w-[1440px] flex-col">

            {navigation.map((item) => {
              const isOpen = mobileActiveMenu === item.name;
              const data = menuData[item.name];

              return (
                <div
                  key={item.name}
                  className="border-b border-white/10"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setMobileActiveMenu(
                        isOpen ? null : item.name
                      )
                    }
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between py-4 text-left text-[15px] font-medium text-white"
                  >
                    {item.name}
                    <Chevron open={isOpen} />
                  </button>

                  {isOpen && (
                    <div className="space-y-5 pb-5 pl-2">

                      {/* MOBILE FEATURED LINKS */}
                      {data.featured.map((link) => (
                        <Link
                          key={link.title}
                          href={link.href}
                          onClick={closeMenus}
                          className="flex items-start gap-3"
                        >
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#9ee7ff]">
                            {link.icon}
                          </span>

                          <span>
                            <span className="block text-[13px] font-semibold text-white">
                              {link.title}
                            </span>

                            <span className="mt-1 block text-[11px] leading-relaxed text-white/60">
                              {link.description}
                            </span>
                          </span>
                        </Link>
                      ))}

                      {/* MOBILE LINK GROUPS */}
                      {data.groups.map((group) => (
                        <div key={group.heading}>
                          <p className="mb-3 text-[10px] font-bold tracking-widest text-[#aabbd0]">
                            {group.heading}
                          </p>

                          <div className="grid grid-cols-2 gap-3">
                            {group.links.map((link) => (
                              <Link
                                key={link.title}
                                href={link.href}
                                onClick={closeMenus}
                                className="text-[12px] text-white/85 transition-colors hover:text-[#9ee7ff]"
                              >
                                {link.title}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* MOBILE APPOINTMENT BUTTON */}
            <div className="pt-5">
              <AppointmentButton compact />
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
