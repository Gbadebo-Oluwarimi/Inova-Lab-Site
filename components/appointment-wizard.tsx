"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { AppointmentButtonArtwork } from "./appointment-button-artwork";

export type ContactMethod = "in-house" | "video" | "chat" | "email";

type WizardStep = "method" | "schedule" | "name" | "contact" | "details";

type AppointmentDetails = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  notes: string;
};

const contactMethods: {
  id: ContactMethod;
  label: string;
  detail: string;
}[] = [
  { id: "in-house", label: "In-house", detail: "Visit our centre" },
  { id: "video", label: "Video meet", detail: "Meet remotely" },
  { id: "chat", label: "Chat", detail: "Talk with our team" },
  { id: "email", label: "Email", detail: "Get a reply by email" },
];

const questions: Record<WizardStep, { title: string; description: string }> = {
  method: {
    title: "How would you like to connect?",
    description: "Choose the option that works best for you.",
  },
  schedule: {
    title: "When would you like to meet?",
    description: "Choose a preferred date and time. Our team will confirm availability.",
  },
  name: {
    title: "What should we call you?",
    description: "Share your name so our team can address you properly.",
  },
  contact: {
    title: "How can we reach you?",
    description: "We’ll use your email to follow up on your request.",
  },
  details: {
    title: "Anything else we should know?",
    description: "Add a note for our team, or send your request as it is.",
  },
};

export function AppointmentWizard({
  initialMethod,
}: {
  initialMethod: ContactMethod | null;
}) {
  const [contactMethod, setContactMethod] = useState<ContactMethod | null>(initialMethod);
  const [stepIndex, setStepIndex] = useState(0);
  const [emailHref, setEmailHref] = useState<string | null>(null);
  const [details, setDetails] = useState<AppointmentDetails>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    notes: "",
  });
  const formRef = useRef<HTMLFormElement>(null);
  const questionRef = useRef<HTMLHeadingElement>(null);
  const requiresSchedule = contactMethod === "in-house" || contactMethod === "video";
  const steps: WizardStep[] = [
    "method",
    ...(requiresSchedule ? (["schedule"] as const) : []),
    "name",
    "contact",
    "details",
  ];
  const currentStep = steps[Math.min(stepIndex, steps.length - 1)];
  const question = questions[currentStep];
  const stepCount = steps.length;
  const remainingSteps = stepCount - stepIndex - 1;
  const progress = ((stepIndex + 1) / stepCount) * 100;

  useEffect(() => {
    if (stepIndex > 0) questionRef.current?.focus({ preventScroll: true });
  }, [stepIndex]);

  const updateDetail = (
    field: keyof AppointmentDetails,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setDetails((current) => ({ ...current, [field]: event.target.value }));
  };

  const chooseMethod = (method: ContactMethod) => {
    setContactMethod(method);
    setStepIndex(1);
  };

  const goBack = () => {
    setStepIndex((current) => Math.max(current - 1, 0));
  };

  const continueToNextStep = () => {
    if (!formRef.current?.reportValidity()) return;
    setStepIndex((current) => Math.min(current + 1, stepCount - 1));
  };

  const prepareEmailRequest = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const methodLabel = contactMethods.find((method) => method.id === contactMethod)?.label;
    const body = [
      "Appointment request",
      `Name: ${details.firstName.trim()} ${details.lastName.trim()}`,
      `Email: ${details.email.trim()}`,
      `Phone: ${details.phone.trim() || "Not provided"}`,
      `Preferred contact: ${methodLabel}`,
      `Preferred date: ${details.date || "To be arranged"}`,
      `Preferred time: ${details.time || "To be arranged"}`,
      `Notes: ${details.notes.trim() || "None"}`,
    ].join("\n");

    setEmailHref(
      `mailto:info@inovamedlab.com?subject=${encodeURIComponent(
        `${methodLabel} appointment request`,
      )}&body=${encodeURIComponent(body)}`,
    );
  };

  if (emailHref) {
    return (
      <div className="flex min-h-[420px] flex-col justify-center">
        <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#ecfdf3] text-[#027a48]">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
            <path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h3 className="text-[24px] font-semibold text-[#101828]">Your request is ready</h3>
        <p className="mt-2 max-w-[390px] text-[13px] leading-relaxed text-[#667085]">
          Open the prefilled email and send it to our team. We will follow up to confirm the details.
        </p>
        <a
          href={emailHref}
          aria-label="Open email draft"
          className="group mt-6 block w-full max-w-[200px] focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#344054]"
        >
          <AppointmentButtonArtwork label="Open email draft" />
        </a>
        <button
          type="button"
          onClick={() => setEmailHref(null)}
          className="mt-3 h-10 text-[12px] font-semibold text-[#344054] underline underline-offset-4"
        >
          Edit request
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={prepareEmailRequest}
      className="flex min-h-[min(650px,calc(100dvh-80px))] flex-col"
    >
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between gap-3 text-[10px] font-medium text-[#667085]">
          <span>Step {stepIndex + 1} of {stepCount}</span>
          <span>{remainingSteps === 0 ? "Last step" : `${remainingSteps} steps remaining`}</span>
        </div>
        <div
          className="h-1 overflow-hidden rounded-full bg-[#eaecf0]"
          role="progressbar"
          aria-label="Appointment form progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress)}
        >
          <div
            className="h-full rounded-full bg-[#536ba2] transition-[width] duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mb-5" aria-live="polite">
        <h3
          ref={questionRef}
          tabIndex={-1}
          className="text-[20px] font-semibold leading-tight text-[#101828] outline-none sm:text-[22px]"
        >
          {question.title}
        </h3>
        <p className="mt-1.5 text-[12px] leading-relaxed text-[#667085]">
          {question.description}
        </p>
      </div>

      <div className="flex-1">
        {currentStep === "method" && (
          <div className="grid grid-cols-2 gap-2">
            {contactMethods.map((method) => {
              const selected = contactMethod === method.id;

              return (
                <button
                  key={method.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => chooseMethod(method.id)}
                  className={`flex min-h-[70px] items-center gap-2.5 rounded-md border px-3 text-left transition-colors focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#344054] ${
                    selected
                      ? "border-[#506ca8] bg-[#f1f4fb]"
                      : "border-[#e4e7ec] hover:border-[#98a8ca]"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`h-3.5 w-3.5 shrink-0 rounded-full border ${
                      selected ? "border-[4px] border-[#536ba2]" : "border-[#98a2b3]"
                    }`}
                  />
                  <span className="min-w-0">
                    <span className="block text-[12px] font-semibold text-[#1d2939]">
                      {method.label}
                    </span>
                    <span className="mt-0.5 block text-[10px] text-[#667085]">
                      {method.detail}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {currentStep === "schedule" && (
          <div className="grid grid-cols-2 gap-3">
            <label className="block text-[10px] font-semibold text-[#344054]">
              Preferred date
              <input
                name="date"
                type="date"
                value={details.date}
                onChange={(event) => updateDetail("date", event)}
                required
                className="mt-1.5 h-10 w-full rounded-md border border-[#d0d5dd] px-3 text-[12px] font-normal text-[#101828] outline-none transition focus:border-[#536ba2] focus:ring-2 focus:ring-[#dce5f6]"
              />
            </label>
            <label className="block text-[10px] font-semibold text-[#344054]">
              Preferred time
              <input
                name="time"
                type="time"
                value={details.time}
                onChange={(event) => updateDetail("time", event)}
                required
                className="mt-1.5 h-10 w-full rounded-md border border-[#d0d5dd] px-3 text-[12px] font-normal text-[#101828] outline-none transition focus:border-[#536ba2] focus:ring-2 focus:ring-[#dce5f6]"
              />
            </label>
          </div>
        )}

        {currentStep === "name" && (
          <div className="grid grid-cols-2 gap-3">
            <label className="block text-[10px] font-semibold text-[#344054]">
              First name
              <input
                name="firstName"
                autoComplete="given-name"
                value={details.firstName}
                onChange={(event) => updateDetail("firstName", event)}
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
                value={details.lastName}
                onChange={(event) => updateDetail("lastName", event)}
                required
                placeholder="Last name"
                className="mt-1.5 h-10 w-full rounded-md border border-[#d0d5dd] px-3 text-[12px] font-normal text-[#101828] outline-none transition focus:border-[#536ba2] focus:ring-2 focus:ring-[#dce5f6]"
              />
            </label>
          </div>
        )}

        {currentStep === "contact" && (
          <div className="space-y-3">
            <label className="block text-[10px] font-semibold text-[#344054]">
              Email address
              <input
                name="email"
                type="email"
                autoComplete="email"
                value={details.email}
                onChange={(event) => updateDetail("email", event)}
                required
                autoFocus
                placeholder="you@example.com"
                className="mt-1.5 h-10 w-full rounded-md border border-[#d0d5dd] px-3 text-[12px] font-normal text-[#101828] outline-none transition focus:border-[#536ba2] focus:ring-2 focus:ring-[#dce5f6]"
              />
            </label>
            <label className="block text-[10px] font-semibold text-[#344054]">
              Phone number <span className="font-normal text-[#98a2b3]">(optional)</span>
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                value={details.phone}
                onChange={(event) => updateDetail("phone", event)}
                placeholder="Phone number"
                className="mt-1.5 h-10 w-full rounded-md border border-[#d0d5dd] px-3 text-[12px] font-normal text-[#101828] outline-none transition focus:border-[#536ba2] focus:ring-2 focus:ring-[#dce5f6]"
              />
            </label>
          </div>
        )}

        {currentStep === "details" && (
          <label className="block text-[10px] font-semibold text-[#344054]">
            Appointment details <span className="font-normal text-[#98a2b3]">(optional)</span>
            <textarea
              name="notes"
              rows={4}
              value={details.notes}
              onChange={(event) => updateDetail("notes", event)}
              autoFocus
              placeholder="Share anything that will help us prepare"
              className="mt-1.5 block w-full resize-y rounded-md border border-[#d0d5dd] px-3 py-2 text-[12px] font-normal text-[#101828] outline-none transition placeholder:text-[#98a2b3] focus:border-[#536ba2] focus:ring-2 focus:ring-[#dce5f6]"
            />
          </label>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between gap-3 border-t border-[#eaecf0] pt-4">
        {stepIndex > 0 ? (
          <button
            type="button"
            onClick={goBack}
            className="h-10 px-2 text-[12px] font-semibold text-[#475467] underline underline-offset-4"
          >
            Back
          </button>
        ) : (
          <span className="text-[10px] text-[#667085]">Choose an option to continue</span>
        )}

        {currentStep !== "method" && currentStep !== "details" && (
          <button
            type="button"
            onClick={continueToNextStep}
            aria-label="Continue to next step"
            className="group block w-full max-w-[164px] focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#344054] sm:max-w-[180px]"
          >
            <AppointmentButtonArtwork label="Continue" />
          </button>
        )}

        {currentStep === "details" && (
          <button
            type="submit"
            aria-label="Prepare email request"
            className="group block w-full max-w-[200px] focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#344054]"
          >
            <AppointmentButtonArtwork label="Send Request" />
          </button>
        )}
      </div>
    </form>
  );
}
