"use client";

import { useMemo, useState } from "react";
import {
  CalendarDays,
  CircleHelp,
  FileCheck2,
  FlaskConical,
  Mail,
  MapPin,
  Search,
  ShieldCheck,
  Timer,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type FaqCategory = "General FAQs" | "Appointments & tests" | "Results & billing";

const categories: FaqCategory[] = [
  "General FAQs",
  "Appointments & tests",
  "Results & billing",
];

const questions: {
  category: FaqCategory;
  question: string;
  answer: string;
  icon: LucideIcon;
}[] = [
  {
    category: "General FAQs",
    question: "Where is Inova Medical Laboratory located?",
    answer: "Our centre is at 1 Petrosyn Drive, Gwarinpa, Abuja. Contact our team if you need help finding us.",
    icon: CircleHelp,
  },
  {
    category: "General FAQs",
    question: "Can I speak with someone before visiting?",
    answer: "Yes. Call or email our team and we can help you choose the right service and prepare for your visit.",
    icon: Mail,
  },
  {
    category: "General FAQs",
    question: "Do I need a referral to use your services?",
    answer: "Many services are available without a referral. Some investigations may require a clinician’s request, so please check with us first.",
    icon: ShieldCheck,
  },
  {
    category: "General FAQs",
    question: "What should I bring to my appointment?",
    answer: "Bring any clinician’s request, relevant medical information, and a form of identification. We’ll let you know if your test needs anything else.",
    icon: FileCheck2,
  },
  {
    category: "General FAQs",
    question: "How can I contact the Inova team?",
    answer: "Email info@inovamedlab.com or use the contact form on our website. We’ll direct your question to the right team.",
    icon: Mail,
  },
  {
    category: "General FAQs",
    question: "Do you provide services for organisations?",
    answer: "We work with healthcare providers and organisations. Contact us to discuss your diagnostic and laboratory service needs.",
    icon: ShieldCheck,
  },
  {
    category: "General FAQs",
    question: "Can I ask a question before I book?",
    answer: "Of course. Send us your question and our team can help you understand the next steps before you make an appointment.",
    icon: CircleHelp,
  },
  {
    category: "Appointments & tests",
    question: "How do I book an appointment?",
    answer: "Use the Book an Appointment button to send us a quick request. Our team will contact you to confirm the details.",
    icon: CalendarDays,
  },
  {
    category: "Appointments & tests",
    question: "Do I need to fast before a test?",
    answer: "Preparation depends on the test. Please check the instructions from your clinician or contact us before your visit.",
    icon: Timer,
  },
  {
    category: "Appointments & tests",
    question: "Which laboratory and diagnostic services do you offer?",
    answer: "We provide laboratory testing and diagnostic services. Visit Our Services or contact us for help with a specific investigation.",
    icon: FlaskConical,
  },
  {
    category: "Appointments & tests",
    question: "Can I change or cancel my appointment?",
    answer: "Yes. Please contact our team as early as possible so we can help update your appointment.",
    icon: CalendarDays,
  },
  {
    category: "Appointments & tests",
    question: "Can you help me choose the right test?",
    answer: "Share the test name or your clinician’s request with our team. We can explain the available services and help you plan your visit.",
    icon: FlaskConical,
  },
  {
    category: "Appointments & tests",
    question: "Do you offer home sample collection?",
    answer: "Ask our team to confirm whether home collection is available for your location and requested investigation.",
    icon: MapPin,
  },
  {
    category: "Appointments & tests",
    question: "Can I book for a family member?",
    answer: "You can enquire on someone’s behalf. Please have their details and any clinician’s request ready when you contact us.",
    icon: CalendarDays,
  },
  {
    category: "Results & billing",
    question: "When will my results be ready?",
    answer: "Timing varies by investigation. Our team can provide an estimate when you book or when your sample is collected.",
    icon: Timer,
  },
  {
    category: "Results & billing",
    question: "How will I receive my results?",
    answer: "Our team will explain the available options for receiving your results when you visit or speak with us.",
    icon: FileCheck2,
  },
  {
    category: "Results & billing",
    question: "Do you accept health insurance?",
    answer: "We work with a range of health insurance providers. Contact us with your provider details so we can confirm coverage.",
    icon: ShieldCheck,
  },
  {
    category: "Results & billing",
    question: "How can I ask about the cost of a test?",
    answer: "Contact our team with the test name or clinician’s request and we’ll help with current pricing information.",
    icon: CircleHelp,
  },
  {
    category: "Results & billing",
    question: "Can my clinician receive a copy of my results?",
    answer: "Contact us to discuss result delivery options and any consent or documentation needed to share results with your clinician.",
    icon: Mail,
  },
  {
    category: "Results & billing",
    question: "Who can explain my test results?",
    answer: "Your clinician is best placed to interpret results in the context of your health. Contact our team if you need help accessing your report.",
    icon: CircleHelp,
  },
  {
    category: "Results & billing",
    question: "Can I confirm insurance coverage before my visit?",
    answer: "Yes. Share your insurer and plan details with our team so we can help check the applicable coverage before your appointment.",
    icon: ShieldCheck,
  },
];

export function FaqSection() {
  const [category, setCategory] = useState<FaqCategory>(categories[0]);
  const [search, setSearch] = useState("");

  const visibleQuestions = useMemo(() => {
    const query = search.trim().toLowerCase();
    return questions.filter((item) => {
      const matchesCategory = item.category === category;
      const matchesQuery = !query || `${item.question} ${item.answer}`.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });
  }, [category, search]);

  return (
    <section aria-labelledby="faq-heading" className="bg-white py-16 text-[#111827] sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
        <h2 id="faq-heading" className="text-[27px] font-semibold tracking-[-0.04em] sm:text-[34px]">
          Frequently Asked Questions
        </h2>
        <p className="mt-2 text-[12px] text-[#737780]">
          Can’t find what you’re looking for? <a className="underline underline-offset-2" href="/contact">Contact our team.</a>
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div role="group" aria-label="Filter questions by category" className="flex w-full gap-1 overflow-x-auto rounded-lg bg-[#f5f6f7] p-1 sm:w-auto">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                aria-pressed={category === item}
                className={`shrink-0 rounded-md px-3 py-2 text-[10px] font-medium transition-colors sm:text-[11px] ${category === item ? "bg-white text-[#111827] shadow-sm" : "text-[#666b73] hover:text-[#111827]"}`}
              >
                {item}
              </button>
            ))}
          </div>
          <label className="flex h-10 w-full items-center gap-2 rounded-md border border-[#e1e3e6] px-3 text-[#757b83] focus-within:border-[#949ba5] sm:max-w-[260px]">
            <Search className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="sr-only">Search questions</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search"
              className="min-w-0 flex-1 bg-transparent text-[11px] text-[#17191d] outline-none placeholder:text-[#92969d]"
            />
          </label>
        </div>

        {visibleQuestions.length ? (
          <div className="mt-9 grid grid-cols-1 gap-x-10 gap-y-7 sm:grid-cols-2 sm:gap-y-9">
            {visibleQuestions.map(({ question, answer, icon: Icon }) => (
              <article key={question} className="flex gap-3.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[#e4e6e9] text-[#505761]">
                  <Icon className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-[12px] font-semibold leading-snug text-[#17191d] sm:text-[13px]">{question}</h3>
                  <p className="mt-1.5 text-[10px] leading-[1.65] text-[#777c84] sm:text-[11px]">{answer}</p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="mt-10 rounded-lg border border-dashed border-[#dfe2e6] px-4 py-8 text-center text-[12px] text-[#737780]">
            No questions match that search. Try another term or contact our team.
          </p>
        )}
      </div>
    </section>
  );
}
