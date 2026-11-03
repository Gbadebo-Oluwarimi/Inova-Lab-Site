import Link from "next/link";

type AppointmentButtonProps = {
  compact?: boolean;
};

export function AppointmentButton({
  compact = false,
}: AppointmentButtonProps) {
  return (
    <Link
      href="/appointment"
      aria-label="Book an appointment"
      className={`group block w-full focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${
        compact ? "max-w-[281px] lg:w-[180px]" : "max-w-[281px]"
      }`}
    >
      <svg
        viewBox="0 0 281 64"
        className="h-auto w-full transition-transform duration-200 group-hover:-translate-y-0.5"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M25.8838 9.68648C28.7039 3.76892 34.675 0 41.2302 0H256.289C268.208 0 276.427 11.9466 272.166 23.0777L260.681 53.0777C258.163 59.6561 251.849 64 244.805 64H26.9333C14.436 64 6.21049 50.9682 11.5869 39.6865L25.8838 9.68648Z"
          fill="#CFD6FF"
        />
        <text
          x="92"
          y="39"
          fill="black"
          fontFamily="var(--font-gellix), sans-serif"
          fontSize="16"
          fontWeight="600"
        >
          Book an Appointment
        </text>
        <path
          d="M37 32V33H74V32V31H37V32ZM74.7071 32.7071C75.0976 32.3166 75.0976 31.6834 74.7071 31.2929L68.3431 24.9289C67.9526 24.5384 67.3195 24.5384 66.9289 24.9289C66.5384 25.3195 66.5384 25.9526 66.9289 26.3431L72.5858 32L66.9289 37.6569C66.5384 38.0474 66.5384 38.6805 66.9289 39.0711C67.3195 39.4616 67.9526 39.4616 68.3431 39.0711L74.7071 32.7071Z"
          fill="black"
        />
      </svg>
    </Link>
  );
}