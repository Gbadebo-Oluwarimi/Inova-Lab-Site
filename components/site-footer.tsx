import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, MessageCircle } from "lucide-react";
import { FooterWordmark } from "./footer-wordmark";

const footerGroups = [
  {
    heading: "Services",
    links: [
      { label: "Laboratory testing", href: "/services" },
      { label: "Diagnostic services", href: "/services/diagnostics" },
      { label: "Departments", href: "/departments" },
      { label: "CheckLab", href: "/checklab" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Inova", href: "/about" },
      { label: "Our team", href: "/about/our-team" },
      { label: "Quality and care", href: "/about/quality" },
      { label: "Contact us", href: "/contact" },
    ],
  },
  {
    heading: "Patient support",
    links: [
      { label: "Book an appointment", href: "/appointment" },
      { label: "Frequently asked questions", href: "/#faq-heading" },
      { label: "Insurance partners", href: "/#insurance-heading" },
      { label: "Patient care", href: "/patient-care" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="overflow-hidden bg-[#f5f6f7] text-[#101b2a]">
      <div className="mx-auto max-w-[1440px] px-5 pb-10 pt-14 sm:px-8 sm:pt-16 lg:px-12 lg:pt-20">
        <div className="grid grid-cols-2 gap-x-6 gap-y-9 md:grid-cols-4 md:gap-8">
          {footerGroups.map((group) => (
            <div key={group.heading}>
              <h2 className="text-[13px] font-semibold">{group.heading}</h2>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="group inline-flex items-center gap-1 text-[11px] text-[#5e6570] transition-colors hover:text-[#172e5b]">
                      <span aria-hidden="true">·</span>{link.label}
                      <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-2 md:col-span-1">
            <h2 className="text-[13px] font-semibold">Get in touch</h2>
            <ul className="mt-4 space-y-3 text-[11px] text-[#5e6570]">
              <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" /><span>1 Petrosyn Drive, Gwarinpa,<br />Abuja, Nigeria</span></li>
              <li><a className="flex items-center gap-2 transition-colors hover:text-[#172e5b]" href="mailto:info@inovamedlab.com"><Mail className="h-3.5 w-3.5" aria-hidden="true" />info@inovamedlab.com</a></li>
              <li><Link className="flex items-center gap-2 transition-colors hover:text-[#172e5b]" href="/contact"><MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />Talk to our team</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-[#dfe2e6] pt-8 sm:mt-16 sm:pt-10">
          <FooterWordmark />
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-[#dfe2e6] pt-5 text-[10px] text-[#777e87] sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Inova Diagnostic Lab. All rights reserved.</p>
          <p>Abuja, Nigeria</p>
        </div>
      </div>
    </footer>
  );
}
