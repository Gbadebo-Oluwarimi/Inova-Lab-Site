"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { AppointmentWizard } from "./appointment-wizard";

export function AppointmentExperience() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const openDialog = () => {
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
        onClick={openDialog}
        aria-label="Chat with Inova"
        title="Chat with Inova"
        className="fixed bottom-5 right-5 z-[70] flex h-12 w-12 items-center justify-center rounded-full bg-[#dce0ff] text-[#071b50] shadow-[0_8px_24px_rgba(2,8,23,0.28)] transition-transform hover:scale-105 focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#071b50] sm:bottom-6 sm:right-6 sm:h-14 sm:w-14"
      >
        <MessageCircle className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="appointment-dialog-title"
        onClose={() => setIsOpen(false)}
        onClick={(event) => {
          if (event.target === dialogRef.current) setIsOpen(false);
        }}
        className="m-auto max-h-[calc(100dvh-1rem)] w-[calc(100%-1rem)] max-w-[880px] overflow-y-auto rounded-[18px] border-0 bg-[#f4ecdd] p-0 text-[#151515] shadow-[0_28px_90px_rgba(3,10,30,0.4)] backdrop:bg-black/80 sm:max-h-[calc(100dvh-2rem)] sm:w-[calc(100%-2rem)] sm:rounded-[22px]"
      >
        <h2 id="appointment-dialog-title" className="sr-only">
          Book an appointment with Inova
        </h2>
        <div className="relative min-h-[min(600px,calc(100dvh-16px))]">
          <div className="relative p-6 pt-16 sm:p-10 sm:pt-16 lg:p-12 lg:pt-16">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close appointment form"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full text-[#45413b] transition-colors hover:bg-black/5 focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black sm:right-6 sm:top-6"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
            {isOpen && <AppointmentWizard />}
          </div>
        </div>
      </dialog>
    </>
  );
}
