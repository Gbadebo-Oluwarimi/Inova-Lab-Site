"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, MessageCircle, X } from "lucide-react";
import { AppointmentWizard } from "./appointment-wizard";
import appointmentImage from "../inova-comps/family-consultation.png";

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
        className="m-auto max-h-[calc(100dvh-1rem)] w-[calc(100%-1rem)] max-w-[1040px] overflow-y-auto rounded-[18px] border-0 bg-white p-0 text-[#111827] shadow-[0_28px_90px_rgba(3,10,30,0.4)] backdrop:bg-[#07152e]/70 sm:max-h-[calc(100dvh-2rem)] sm:w-[calc(100%-2rem)] sm:rounded-[24px]"
      >
        <h2 id="appointment-dialog-title" className="sr-only">
          Book an appointment with Inova
        </h2>
        <div className="relative grid min-h-[min(620px,calc(100dvh-16px))] md:grid-cols-[0.94fr_1.06fr]">
          <div className="relative order-2 flex min-w-0 flex-col px-5 pb-5 pt-6 sm:px-9 sm:pb-7 sm:pt-8 md:order-1 md:px-10 md:py-9 lg:px-12">
            <div className="mb-8 flex items-center justify-between pr-11 md:mb-10">
              <a href="/" aria-label="Inova Labs home" className="flex items-center gap-2 text-[12px] font-semibold tracking-[-0.02em] text-[#101827]">
                <span className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#14274e] text-[7px] font-bold text-[#14274e]">I</span>
                INOVA LABS
              </a>
              <span className="flex items-center gap-1.5 text-[10px] font-medium text-[#505967] sm:text-[11px]">
                Appointment <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
            </div>
            {isOpen && <AppointmentWizard />}
            <div className="mt-auto hidden grid-cols-3 gap-2 pt-8 md:grid" aria-label="Appointment steps">
              <span className="border-t-2 border-[#14274e] pt-2 text-[9px] font-medium text-[#14274e]">Your details</span>
              <span className="border-t-2 border-[#d9dee7] pt-2 text-[9px] text-[#788190]">Requested service</span>
              <span className="border-t-2 border-[#d9dee7] pt-2 text-[9px] text-[#788190]">Confirmation</span>
            </div>
          </div>

          <div className="relative order-1 h-[190px] overflow-hidden bg-[#14274e] sm:h-[230px] md:order-2 md:h-full md:min-h-[620px]">
            <Image
              src={appointmentImage}
              alt="Patient speaking with a clinician at Inova"
              fill
              priority
              sizes="(max-width: 767px) 100vw, 52vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07152e]/85 via-[#07152e]/10 to-[#07152e]/10" />
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close appointment form"
              className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#14274e] transition-colors hover:bg-white focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:right-5 md:top-5"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="absolute inset-x-5 bottom-4 text-white sm:inset-x-7 sm:bottom-6 md:inset-x-8 md:bottom-8 lg:inset-x-10 lg:bottom-10">
              <p className="text-[9px] font-semibold uppercase tracking-[1.8px] text-[#dce4ff] sm:text-[10px]">Diagnostic care, made easier</p>
              <h3 className="mt-1.5 max-w-[400px] text-[20px] font-semibold leading-tight tracking-[-0.035em] sm:text-[25px] md:text-[30px]">Let’s find the right care for you.</h3>
              <p className="mt-2 hidden max-w-[360px] text-[12px] leading-[1.7] text-white/80 sm:block">Share a few details and our team will help arrange your visit at our Gwarinpa centre.</p>
              <p className="mt-2 text-[10px] text-white/80 sm:mt-4 sm:text-[11px]">1 Petrosyn Drive · Gwarinpa, Abuja</p>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
