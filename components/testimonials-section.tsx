import Image, { type StaticImageData } from "next/image";
import { ArrowRight, MessageCircle, Quote } from "lucide-react";
import familyConsultation from "../inova-comps/family-consultation.png";
import specialistImage from "../inova-comps/cardiologist.jpg";
import laboratoryImage from "../inova-comps/doctor girk.jpg";

type Testimonial = {
  quote: string;
  image: StaticImageData;
  imageAlt: string;
  location: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "The team made my visit feel easy. They explained each step clearly and treated me with kindness.",
    image: familyConsultation,
    imageAlt: "Black patient speaking with a doctor",
    location: "Gwarinpa, Abuja",
  },
  {
    quote:
      "Booking my test was straightforward, and everyone I met was patient, welcoming, and helpful.",
    image: specialistImage,
    imageAlt: "Black patient talking with a medical specialist",
    location: "Abuja",
  },
  {
    quote:
      "I felt welcomed from the moment I arrived. The staff were professional and kept me informed.",
    image: laboratoryImage,
    imageAlt: "Black laboratory professional at work",
    location: "Abuja",
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-[#eaf0ff] px-4 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-[1440px] rounded-[28px] bg-white px-5 py-10 shadow-[0_24px_70px_rgba(29,52,92,0.08)] sm:rounded-[32px] sm:px-10 sm:py-14 lg:px-16 lg:py-16">
        <div className="mx-auto max-w-[600px] text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e2e7f1] px-3 py-1 text-[9px] font-medium text-[#53617b]">
            <MessageCircle className="h-3 w-3" aria-hidden="true" />
            Patient testimonials
          </span>
          <h2 className="mt-4 text-[28px] font-semibold leading-tight tracking-[-0.04em] text-[#101b2a] sm:text-[38px]">
            What our patients are saying
          </h2>
          <p className="mx-auto mt-3 max-w-[500px] text-[12px] leading-[1.8] text-[#667085] sm:text-[13px]">
            Sample testimonials and illustrative portraits are shown for layout
            purposes. Replace them with approved patient feedback before publishing.
          </p>
        </div>

        <div className="mx-auto mt-9 grid max-w-[1060px] gap-3 sm:mt-11 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <article
              key={testimonial.quote}
              className="flex min-h-[220px] flex-col justify-between rounded-2xl border border-[#e5e8ed] bg-white p-5 transition-transform duration-300 hover:-translate-y-1 sm:p-6"
            >
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <Quote className="h-5 w-5 fill-[#dce4ff] text-[#536ba2]" aria-hidden="true" />
                  <span className="text-[9px] font-medium uppercase tracking-[1px] text-[#8791a2]">
                    Sample {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="text-[13px] leading-[1.75] text-[#293241] sm:text-[14px]">
                  “{testimonial.quote}”
                </p>
              </div>
              <div className="mt-6 flex items-center gap-3 border-t border-[#edf0f4] pt-4">
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-[#e6ebf3] ring-2 ring-[#eaf0ff]">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.imageAlt}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold text-[#172033]">
                    Sample patient
                  </p>
                  <p className="mt-0.5 text-[10px] text-[#7b8492]">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex justify-center sm:mt-10">
          <a
            href="mailto:info@inovamedlab.com?subject=Patient%20feedback"
            className="group inline-flex min-h-10 items-center gap-2 rounded-lg border border-[#dfe4ed] px-4 text-[11px] font-semibold text-[#273d75] transition-colors hover:border-[#c6d2eb] hover:bg-[#f7f9ff] focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#536ba2]"
          >
            Share your feedback
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
