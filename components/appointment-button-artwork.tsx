import { ArrowRight } from "lucide-react";

export function AppointmentButtonArtwork({ label }: { label: string }) {
  return (
    <span className="relative block">
      <svg viewBox="0 0 281 64" className="h-auto w-full transition-transform duration-200 group-hover:-translate-y-0.5" aria-hidden="true" focusable="false">
        <path d="M25.8838 9.68648C28.7039 3.76892 34.675 0 41.2302 0H256.289C268.208 0 276.427 11.9466 272.166 23.0777L260.681 53.0777C258.163 59.6561 251.849 64 244.805 64H26.9333C14.436 64 6.21049 50.9682 11.5869 39.6865L25.8838 9.68648Z" fill="#CFD6FF" />
        <text x="92" y="39" fill="black" fontFamily="var(--font-gellix), sans-serif" fontSize="16" fontWeight="600">{label}</text>
      </svg>
      <ArrowRight className="pointer-events-none absolute left-[13%] top-1/2 h-[19%] w-[7%] -translate-y-1/2 text-black" strokeWidth={1.7} aria-hidden="true" />
    </span>
  );
}
