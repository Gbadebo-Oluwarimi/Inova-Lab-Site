import Link from "next/link";
import { AppointmentButtonArtwork } from "./appointment-button-artwork";

type AppointmentButtonProps = {
  compact?: boolean;
  mobileCompact?: boolean;
};

export function AppointmentButton({
  compact = false,
  mobileCompact = false,
}: AppointmentButtonProps) {
  return (
    <Link
      href="/appointment"
      aria-label="Book an appointment"
      className={`group block w-full focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${
        compact
          ? "max-w-[164px] sm:max-w-[180px] lg:w-[180px]"
          : mobileCompact
            ? "max-w-[164px] md:max-w-[281px]"
          : "max-w-[281px]"
      }`}
    >
      <AppointmentButtonArtwork label="Book an Appointment" />
    </Link>
  );
}