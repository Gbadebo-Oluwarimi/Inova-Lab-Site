"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check, ChevronDown } from "lucide-react";

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
    const name = String(formData.get("name") ?? "").trim();
    const service = String(formData.get("service") ?? "");
    const email = String(formData.get("email") ?? "").trim();
    const body = [`Name: ${name}`, `Service: ${service}`, `Email: ${email}`].join("\n");

    setEmailHref(
      `mailto:info@inovamedlab.com?subject=${encodeURIComponent("Appointment enquiry")}&body=${encodeURIComponent(body)}`,
    );
  };

  if (emailHref) {
    return (
      <div className="flex min-h-[420px] flex-col justify-center py-10">
        <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#171717]">
          <Check className="h-5 w-5" aria-hidden="true" />
        </span>
        <p className="text-[10px] font-semibold uppercase tracking-[1.8px] text-[#66615a]">Enquiry prepared</p>
        <h3 className="mt-2 text-[27px] font-semibold tracking-[-0.04em] text-[#151515] sm:text-[34px]">One last step.</h3>
        <p className="mt-2 max-w-[440px] text-[13px] leading-relaxed text-[#625f59]">
          Open your email draft and send it to our team. We’ll get back to you to confirm your appointment.
        </p>
        <a href={emailHref} className="mt-7 inline-flex min-h-12 w-fit items-center gap-8 rounded-md bg-black px-5 text-[12px] font-semibold text-white transition-colors hover:bg-[#292929] focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
          Open email draft <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
        <button type="button" onClick={() => setEmailHref(null)} className="mt-4 w-fit text-[11px] text-[#625f59] underline underline-offset-4">Edit enquiry</button>
      </div>
    );
  }

  return (
    <form onSubmit={prepareEmailRequest} className="flex min-h-[min(560px,calc(100dvh-100px))] flex-col justify-between">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[1.8px] text-[#69645d]">/ Get in touch</p>
        <h3 className="mt-2 text-[28px] font-semibold tracking-[-0.045em] text-[#151515] sm:text-[36px]">Schedule an appointment</h3>

        <div className="mt-8 space-y-5 sm:mt-10 sm:space-y-6">
          <label className="block text-[17px] leading-relaxed text-[#191919] sm:text-[21px]">
            <span className="sr-only">Your name</span>
            <span className="mr-2">Hi, my name is</span>
            <input
              name="name"
              autoComplete="name"
              required
              placeholder="Type your name"
              className="inline-block w-full border-0 border-b border-[#77736d] bg-transparent px-1 py-1 text-[16px] text-[#111] outline-none placeholder:text-[#aaa49a] focus:border-black sm:ml-1 sm:w-[230px] sm:text-[18px]"
            />
          </label>

          <label className="block text-[17px] leading-relaxed text-[#191919] sm:text-[21px]">
            <span className="sr-only">What service are you looking for?</span>
            <span className="mr-2">I’m looking for</span>
            <span className="relative inline-flex w-full items-center border-b border-[#77736d] sm:ml-1 sm:w-[300px]">
              <select name="service" required defaultValue="" className="h-10 w-full appearance-none bg-transparent px-1 pr-8 text-[14px] text-[#625f59] outline-none focus:border-black sm:text-[16px]">
                <option value="" disabled>Select a service</option>
                {services.map((service) => <option key={service} value={service}>{service}</option>)}
              </select>
              <ChevronDown className="pointer-events-none absolute right-1 h-4 w-4 text-[#625f59]" aria-hidden="true" />
            </span>
          </label>

          <label className="block text-[17px] leading-relaxed text-[#191919] sm:text-[21px]">
            <span className="sr-only">Email address</span>
            <span className="mr-2">Get in touch with me at</span>
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Your email address"
              className="mt-2 block w-full border-0 border-b border-[#77736d] bg-transparent px-1 py-1 text-[15px] text-[#111] outline-none placeholder:text-[#aaa49a] focus:border-black sm:mt-0 sm:inline-block sm:ml-1 sm:w-[300px] sm:text-[17px]"
            />
          </label>
        </div>

        <label className="mt-7 flex cursor-pointer items-start gap-2.5 text-[11px] leading-relaxed text-[#5f5b55] sm:mt-8">
          <input name="consent" type="checkbox" required className="mt-0.5 h-4 w-4 shrink-0 accent-black" />
          <span>I agree to be contacted by Inova about this appointment enquiry.</span>
        </label>

        <button type="submit" className="mt-6 inline-flex min-h-12 items-center gap-8 rounded-md bg-black px-5 text-[12px] font-semibold text-white transition-colors hover:bg-[#292929] focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
          Send enquiry <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
        <p className="mt-2 text-[10px] text-[#79736b]">Your email app will open with the enquiry ready to send.</p>
      </div>

      <div className="mt-9 grid grid-cols-1 gap-3 border-t border-[#ded8ce] pt-4 text-[10px] text-[#625f59] sm:grid-cols-2 sm:gap-5">
        <a href="mailto:info@inovamedlab.com" className="underline underline-offset-2">info@inovamedlab.com</a>
        <span>1 Petrosyn Drive, Gwarinpa, Abuja</span>
      </div>
    </form>
  );
}
