import Image from "next/image";
import type { StaticImageData } from "next/image";
import cerbaLancetLogo from "../inova-comps/cerba-lancet.png";
import relianceHealthLogo from "../inova-comps/header_reliance-health_mono-dark-1.svg";

type InsurerLogo = {
  type: "image";
  name: string;
  src: string | StaticImageData;
  width: number;
  height: number;
} | {
  type: "henner";
  name: "Henner";
};

const insurers: InsurerLogo[] = [
  { type: "image", name: "Bupa", src: "/images/partners/bupa.svg", width: 40, height: 40 },
  {
    type: "image",
    name: "Hygeia HMO",
    src: "/images/partners/hygeia.png",
    width: 112,
    height: 40,
  },
  {
    type: "image",
    name: "MetLife",
    src: "/images/partners/metlife.png",
    width: 126,
    height: 40,
  },
  { type: "image", name: "Cerba Lancet", src: cerbaLancetLogo, width: 86, height: 54 },
  { type: "henner", name: "Henner" },
  {
    type: "image",
    name: "Reliance Health",
    src: relianceHealthLogo,
    width: 130,
    height: 32,
  },
];

function HennerLogo() {
  return (
    <svg
      viewBox="0 0 180 52"
      className="insurer-henner h-6 w-[84px] md:h-8 md:w-[110px]"
      role="img"
      aria-label="Henner"
    >
      <text x="1" y="29" fontSize="25" fontWeight="500" fontFamily="Arial, sans-serif">
        Henner
      </text>
      <text x="2" y="45" fontSize="11" fontWeight="600" fontFamily="Arial, sans-serif">
        Here to care
      </text>
    </svg>
  );
}

function InsurerLogoImage({
  insurer,
}: {
  insurer: Extract<InsurerLogo, { type: "image" }>;
}) {
  return (
    <Image
      src={insurer.src}
      alt={insurer.name}
      width={insurer.width}
      height={insurer.height}
      className="insurer-logo h-auto max-h-6 w-auto max-w-[90px] object-contain md:max-h-8 md:max-w-[130px]"
    />
  );
}

export function InsuranceLogoCarousel() {
  return (
    <section
      aria-labelledby="insurance-heading"
      className="bg-[#080d20] text-white"
    >
      <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-4 py-6 sm:gap-6 sm:px-8 sm:py-8 md:flex-row md:items-center md:gap-10 md:px-12 md:py-10 lg:px-[9.5%]">
        <h2
          id="insurance-heading"
          className="max-w-full shrink-0 text-center text-[15px] font-medium leading-[1.3] sm:text-[17px] md:max-w-[210px] md:text-left md:text-[19px]"
        >
          Health insurance providers we work with
        </h2>
        <div className="hidden h-[72px] w-px shrink-0 bg-white/35 md:block" />
        <div
          className="insurer-marquee w-full min-w-0 md:flex-1"
          role="region"
          aria-label="Health insurance provider logos"
        >
          <div className="insurer-track">
            {[0, 1].map((copy) => (
              <div
                key={copy}
                className="insurer-group"
                aria-hidden={copy === 1}
              >
                {insurers.map((insurer) => (
                  <div key={insurer.name} className="insurer-logo-slot">
                    {insurer.type === "henner" ? (
                      <HennerLogo />
                    ) : (
                      <InsurerLogoImage insurer={insurer} />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
