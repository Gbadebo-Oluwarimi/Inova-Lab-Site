"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import consultationImage from "../inova-comps/doctor girk.jpg";
import { AppointmentWizard, type ContactMethod } from "./appointment-wizard";

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
  const [initialMethod, setInitialMethod] = useState<ContactMethod | null>(null);

  const openDialog = (method: ContactMethod | null = null) => {
    setInitialMethod(method);
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
        className="m-auto max-h-[calc(100dvh-1rem)] w-[calc(100%-1rem)] max-w-[960px] overflow-y-auto rounded-[22px] border-0 bg-white p-0 text-[#101828] shadow-[0_28px_90px_rgba(3,10,30,0.35)] backdrop:bg-[#06142d]/70 sm:max-h-[calc(100dvh-2rem)] sm:w-[calc(100%-2rem)] sm:rounded-[28px]"
      >
        <h2 id="appointment-dialog-title" className="sr-only">
          Book an appointment with Inova
        </h2>
        <div className="grid min-h-[min(650px,calc(100dvh-16px))] md:grid-cols-[1.04fr_0.96fr]">
          <div className="relative p-5 pt-14 sm:p-7 sm:pt-14 lg:p-9 lg:pt-14">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close appointment form"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#f4f6fa] text-[#475467] transition-colors hover:bg-[#e9edf5] focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#344054] sm:right-5 sm:top-5"
            >
              <CloseIcon />
            </button>
            {isOpen && (
              <AppointmentWizard
                key={initialMethod ?? "choose-method"}
                initialMethod={initialMethod}
              />
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
