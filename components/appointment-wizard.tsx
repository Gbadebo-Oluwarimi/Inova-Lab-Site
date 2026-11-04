"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check, ChevronDown, Mail } from "lucide-react";

const services = [
  "Laboratory testing",
  "Diagnostic imaging",
  "Health screening",
  "Corporate services",
  "I’m not sure yet",
];

export function AppointmentWizard() {
  const [emailHref, setEmailHref] = useState<string | null>(null);

  const prepareEmailRequest = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const firstName = String(formData.get("firstName") ?? "").trim();
    const lastName = String(formData.get("lastName") ?? "").trim();
    const service = String(formData.get("service") ?? "");
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const body = [
      `Name: ${firstName} ${lastName}`.trim(),
      `Service: ${service}`,
      `Phone: ${phone || "Not provided"}`,
      `Email: ${email}`,
    ].join("\n");

    setEmailHref(
      `mailto:info@inovamedlab.com?subject=${encodeURIComponent("Appointment enquiry")}&body=${encodeURIComponent(body)}`,
    );
  };

  if (emailHref) {
    return (
      <div className="flex min-h-[360px] flex-col justify-center py-8 md:min-h-[430px]">
        <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#eef2ff] text-[#14274e]">
          <Check className="h-5 w-5" aria-hidden="true" />
        </span>
        <p className="text-[10px] font-semibold uppercase tracking-[1.8px] text-[#52617e]">Enquiry prepared</p>
        <h3 className="mt-2 text-[27px] font-semibold tracking-[-0.04em] text-[#111827] sm:text-[34px]">One last step.</h3>
        <p className="mt-2 max-w-[440px] text-[13px] leading-relaxed text-[#667085]">
          Open your email draft and send it to our team. We’ll get back to you to confirm your appointment.
        </p>
        <a href={emailHref} className="mt-7 inline-flex min-h-12 w-fit items-center gap-8 rounded-lg bg-[#111827] px-5 text-[12px] font-semibold text-white transition-colors hover:bg-[#26354f] focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14274e]">
          Open email draft <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
        <button type="button" onClick={() => setEmailHref(null)} className="mt-4 w-fit text-[11px] text-[#667085] underline underline-offset-4">Edit enquiry</button>
      </div>
    );
  }

  return (
    <form onSubmit={prepareEmailRequest} className="flex flex-1 flex-col">
      <div>
        <p className="text-[9px] font-semibold uppercase tracking-[1.7px] text-[#53617b] md:hidden">/ Book a visit</p>
        <h3 className="mt-0.5 text-[21px] font-semibold tracking-[-0.04em] text-[#111827] sm:text-[25px] md:mt-0 md:text-[28px]">How can we help you?</h3>
        <p className="mt-1.5 text-[11px] leading-relaxed text-[#667085] sm:text-[12px]">Tell us a little about yourself and the appointment you need.</p>

        <div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-3 sm:mt-6 sm:gap-x-4 sm:gap-y-4">
          <label className="block text-[9px] font-medium text-[#364152] sm:text-[10px]">First name
            <input name="firstName" autoComplete="given-name" required placeholder="Your first name" className="mt-1.5 h-10 w-full rounded-md border border-[#d8dde5] bg-white px-2.5 text-[12px] font-normal text-[#111827] outline-none placeholder:text-[#9aa2af] focus:border-[#14274e] focus:ring-2 focus:ring-[#14274e]/10 sm:h-11 sm:px-3" />
          </label>
          <label className="block text-[9px] font-medium text-[#364152] sm:text-[10px]">Last name
            <input name="lastName" autoComplete="family-name" required placeholder="Your last name" className="mt-1.5 h-10 w-full rounded-md border border-[#d8dde5] bg-white px-2.5 text-[12px] font-normal text-[#111827] outline-none placeholder:text-[#9aa2af] focus:border-[#14274e] focus:ring-2 focus:ring-[#14274e]/10 sm:h-11 sm:px-3" />
          </label>
          <label className="col-span-2 block text-[9px] font-medium text-[#364152] sm:text-[10px]">Service required
            <span className="relative mt-1.5 flex items-center">
              <select name="service" required defaultValue="" className="h-10 w-full appearance-none rounded-md border border-[#d8dde5] bg-white px-2.5 pr-8 text-[12px] font-normal text-[#111827] outline-none focus:border-[#14274e] focus:ring-2 focus:ring-[#14274e]/10 sm:h-11 sm:px-3">
                <option value="" disabled>Select a service</option>
                {services.map((service) => <option key={service} value={service}>{service}</option>)}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 h-4 w-4 text-[#687386]" aria-hidden="true" />
            </span>
          </label>
          <label className="col-span-2 block text-[9px] font-medium text-[#364152] sm:text-[10px]">Email address
            <span className="relative mt-1.5 flex items-center">
              <Mail className="pointer-events-none absolute left-3 h-3.5 w-3.5 text-[#687386]" aria-hidden="true" />
              <input name="email" type="email" autoComplete="email" required placeholder="you@example.com" className="h-10 w-full rounded-md border border-[#d8dde5] bg-white pl-9 pr-3 text-[12px] font-normal text-[#111827] outline-none placeholder:text-[#9aa2af] focus:border-[#14274e] focus:ring-2 focus:ring-[#14274e]/10 sm:h-11" />
            </span>
          </label>
          <label className="col-span-2 block text-[9px] font-medium text-[#364152] sm:text-[10px]">Phone number <span className="font-normal text-[#8a93a1]">(optional)</span>
            <input name="phone" type="tel" autoComplete="tel" placeholder="+234" className="mt-1.5 h-10 w-full rounded-md border border-[#d8dde5] bg-white px-2.5 text-[12px] font-normal text-[#111827] outline-none placeholder:text-[#9aa2af] focus:border-[#14274e] focus:ring-2 focus:ring-[#14274e]/10 sm:h-11 sm:px-3" />
          </label>
        </div>

        <label className="mt-4 flex cursor-pointer items-start gap-2 text-[10px] leading-relaxed text-[#667085]">
          <input name="consent" type="checkbox" required className="mt-0.5 h-4 w-4 shrink-0 accent-[#14274e]" />
          <span>I agree to be contacted by Inova about this appointment request.</span>
        </label>

        <button type="submit" className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-[#111827] px-4 text-[11px] font-semibold text-white transition-colors hover:bg-[#26354f] focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14274e] sm:mt-5 sm:min-h-12">
          Request an appointment <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
        <p className="mt-2 text-center text-[9px] leading-relaxed text-[#818a99]">Our team will follow up to confirm a suitable time.</p>
      </div>
    </form>
  );
}
