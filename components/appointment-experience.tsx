"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type FormEvent } from "react";
import consultationImage from "../inova-comps/doctor girk.jpg";

type ContactMethod = "in-house" | "video" | "chat" | "email";

const contactMethods: { id: ContactMethod; label: string; detail: string }[] = [
  { id: "in-house", label: "In-house", detail: "Visit our centre" },
  { id: "video", label: "Video meet", detail: "Meet remotely" },
  { id: "chat", label: "Chat", detail: "Talk with our team" },
  { id: "email", label: "Email", detail: "Get a reply by email" },
];

function ChatIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H5l1.7-3.1A7.5 7.5 0 1 1 20 11.5Z" />
      <path d="M8.5 11.5h.01M12.5 11.5h.01M16.5 11.5h.01" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

export function AppointmentExperience() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [contactMethod, setContactMethod] = useState<ContactMethod>("in-house");
  const [emailHref, setEmailHref] = useState<string | null>(null);
  const requiresSchedule = contactMethod === "in-house" || contactMethod === "video";

  const openDialog = (method: ContactMethod = "in-house") => {
    setContactMethod(method);
    setEmailHref(null);
    setIsOpen(true);
  };

  useEffect(() => {
    const handleAppointmentLink = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest<HTMLAnchorElement>("a[href]");
      if (!link || new URL(link.href).pathname !== "/appointment") return;
      if (link.target === "_blank" || link.hasAttribute("download")) return;

      event.preventDefault();
      event.stopPropagation();
      openDialog();
    };

    document.addEventListener("click", handleAppointmentLink, true);
    return () => document.removeEventListener("click", handleAppointmentLink, true);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const methodLabel = contactMethods.find((method) => method.id === contactMethod)?.label;
    const body = [
      "Appointment request",
      `Name: ${values.get("firstName")} ${values.get("lastName")}`,
      `Email: ${values.get("email")}`,
      `Phone: ${values.get("phone") || "Not provided"}`,
      `Preferred contact: ${methodLabel}`,
      `Preferred date: ${values.get("date") || "To be arranged"}`,
      `Preferred time: ${values.get("time") || "To be arranged"}`,
      `Notes: ${values.get("notes") || "None"}`,
    ].join("\n");

    setEmailHref(
      `mailto:info@inovamedlab.com?subject=${encodeURIComponent(
        `${methodLabel} appointment request`,
      )}&body=${encodeURIComponent(body)}`,
    );
  };

  return (
    <>
      <button
        type="button"
        onClick={() => openDialog("chat")}
        aria-label="Chat with Inova"
        title="Chat with Inova"
        className="fixed bottom-5 right-5 z-[70] flex h-12 w-12 items-center justify-center rounded-full bg-[#dce0ff] text-[#071b50] shadow-[0_8px_24px_rgba(2,8,23,0.28)] transition-transform hover:scale-105 focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#071b50] sm:bottom-6 sm:right-6 sm:h-14 sm:w-14"
      >
        <ChatIcon />
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="appointment-dialog-title"
        onClose={() => setIsOpen(false)}
        onClick={(event) => {
          if (event.target === dialogRef.current) setIsOpen(false);
        }}
        className="m-auto max-h-[calc(100dvh-1.5rem)] w-[calc(100%-1.5rem)] max-w-[1020px] overflow-y-auto rounded-lg border-0 bg-white p-0 text-[#101828] shadow-2xl backdrop:bg-[#06142d]/75"
      >
        <div className="grid min-h-[min(690px,calc(100dvh-24px))] md:grid-cols-[1.08fr_0.92fr]">
          <div className="relative p-5 sm:p-8 lg:p-10">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close appointment form"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-[#475467] transition-colors hover:bg-[#f2f4f7] focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#344054]"
            >
              <CloseIcon />
            </button>

            {!emailHref ? (
              <>
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[1.8px] text-[#50658b]">
                  INOVA MEDICAL
                </p>
                <h2
                  id="appointment-dialog-title"
                  className="pr-9 text-[24px] font-semibold leading-tight text-[#101828] sm:text-[28px]"
                >
                  Book an appointment
                </h2>
                <p className="mt-2 max-w-[430px] text-[13px] leading-relaxed text-[#667085]">
                  Tell us how you would like to meet and our team will help arrange your visit.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <fieldset>
                    <legend className="mb-2 text-[11px] font-semibold text-[#344054]">
                      How would you like to connect?
                    </legend>
                    <div className="grid grid-cols-2 gap-2">
                      {contactMethods.map((method) => {
                        const selected = contactMethod === method.id;

                        return (
                          <label
                            key={method.id}
                            className={`flex min-h-[56px] cursor-pointer items-center gap-2.5 rounded-md border px-3 py-2 transition-colors ${
                              selected
                                ? "border-[#506ca8] bg-[#f1f4fb]"
                                : "border-[#e4e7ec] hover:border-[#98a8ca]"
                            }`}
                          >
                            <input
                              type="radio"
                              name="contactMethod"
                              value={method.id}
                              checked={selected}
                              onChange={() => setContactMethod(method.id)}
                              className="h-3.5 w-3.5 accent-[#314b83]"
                            />
                            <span className="min-w-0">
                              <span className="block text-[12px] font-semibold text-[#1d2939]">
                                {method.label}
                              </span>
                              <span className="mt-0.5 block text-[10px] text-[#667085]">
                                {method.detail}
                              </span>
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>

                  <div className="grid grid-cols-2 gap-3">
                    <label className="block text-[10px] font-semibold text-[#344054]">
                      First name
                      <input
                        name="firstName"
                        autoComplete="given-name"
                        required
                        autoFocus
                        placeholder="First name"
                        className="mt-1.5 h-10 w-full rounded-md border border-[#d0d5dd] px-3 text-[12px] font-normal text-[#101828] outline-none transition focus:border-[#536ba2] focus:ring-2 focus:ring-[#dce5f6]"
                      />
                    </label>
                    <label className="block text-[10px] font-semibold text-[#344054]">
                      Last name
                      <input
                        name="lastName"
                        autoComplete="family-name"
                        required
                        placeholder="Last name"
                        className="mt-1.5 h-10 w-full rounded-md border border-[#d0d5dd] px-3 text-[12px] font-normal text-[#101828] outline-none transition focus:border-[#536ba2] focus:ring-2 focus:ring-[#dce5f6]"
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <label className="block text-[10px] font-semibold text-[#344054]">
                      Work email
                      <input
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        placeholder="you@example.com"
                        className="mt-1.5 h-10 w-full rounded-md border border-[#d0d5dd] px-3 text-[12px] font-normal text-[#101828] outline-none transition focus:border-[#536ba2] focus:ring-2 focus:ring-[#dce5f6]"
                      />
                    </label>
                    <label className="block text-[10px] font-semibold text-[#344054]">
                      Phone number
                      <input
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="Optional"
                        className="mt-1.5 h-10 w-full rounded-md border border-[#d0d5dd] px-3 text-[12px] font-normal text-[#101828] outline-none transition focus:border-[#536ba2] focus:ring-2 focus:ring-[#dce5f6]"
                      />
                    </label>
                  </div>

                  {requiresSchedule && (
                    <div className="grid grid-cols-2 gap-3">
                      <label className="block text-[10px] font-semibold text-[#344054]">
                        Preferred date
                        <input
                          name="date"
                          type="date"
                          required
                          className="mt-1.5 h-10 w-full rounded-md border border-[#d0d5dd] px-3 text-[12px] font-normal text-[#101828] outline-none transition focus:border-[#536ba2] focus:ring-2 focus:ring-[#dce5f6]"
                        />
                      </label>
                      <label className="block text-[10px] font-semibold text-[#344054]">
                        Preferred time
                        <input
                          name="time"
                          type="time"
                          required
                          className="mt-1.5 h-10 w-full rounded-md border border-[#d0d5dd] px-3 text-[12px] font-normal text-[#101828] outline-none transition focus:border-[#536ba2] focus:ring-2 focus:ring-[#dce5f6]"
                        />
                      </label>
                    </div>
                  )}

                  <label className="block text-[10px] font-semibold text-[#344054]">
                    What can we help with? <span className="font-normal text-[#98a2b3]">(optional)</span>
                    <textarea
                      name="notes"
                      rows={2}
                      placeholder="Share a few details about the appointment"
                      className="mt-1.5 block w-full resize-y rounded-md border border-[#d0d5dd] px-3 py-2 text-[12px] font-normal text-[#101828] outline-none transition placeholder:text-[#98a2b3] focus:border-[#536ba2] focus:ring-2 focus:ring-[#dce5f6]"
                    />
                  </label>

                  <button
                    type="submit"
                    className="flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#f47721] px-4 text-[12px] font-semibold text-white transition-colors hover:bg-[#df6412] focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#344054]"
                  >
                    Request an appointment
                    <span aria-hidden="true">&rarr;</span>
                  </button>
                  <p className="text-[10px] leading-relaxed text-[#667085]">
                    Your email app will open with this request ready to send. Our team will confirm availability.
                  </p>
                </form>
              </>
            ) : (
              <div className="flex min-h-[420px] flex-col justify-center">
                <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#ecfdf3] text-[#027a48]">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                    <path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <h2 id="appointment-dialog-title" className="text-[24px] font-semibold text-[#101828]">
                  Your request is ready
                </h2>
                <p className="mt-2 max-w-[390px] text-[13px] leading-relaxed text-[#667085]">
                  Open the prefilled email and send it to our team. We will follow up to confirm the details.
                </p>
                <a
                  href={emailHref}
                  className="mt-6 flex h-11 items-center justify-center gap-2 rounded-md bg-[#f47721] px-4 text-[12px] font-semibold text-white transition-colors hover:bg-[#df6412]"
                >
                  Open email draft
                  <span aria-hidden="true">&rarr;</span>
                </a>
                <button
                  type="button"
                  onClick={() => setEmailHref(null)}
                  className="mt-3 h-10 text-[12px] font-semibold text-[#344054] underline underline-offset-4"
                >
                  Edit request
                </button>
              </div>
            )}
          </div>

          <div className="relative hidden min-h-full overflow-hidden bg-[#101828] md:block">
            <Image
              src={consultationImage}
              alt="Inova laboratory specialist examining a sample through a microscope"
              fill
              sizes="(max-width: 1024px) 40vw, 460px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030711]/90 via-[#030711]/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-7 lg:p-9">
              <p className="max-w-[360px] text-[17px] font-medium leading-[1.55] text-white">
                Personal care. Precise results. Better decisions for your health.
              </p>
              <p className="mt-3 text-[10px] font-semibold uppercase tracking-[1.5px] text-white/65">
                Inova Medical Laboratory
              </p>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}