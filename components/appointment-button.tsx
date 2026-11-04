import { SvgActionButton } from "./svg-action-button";

type AppointmentButtonProps = {
  compact?: boolean;
  mobileCompact?: boolean;
};

export function AppointmentButton({
  compact = false,
  mobileCompact = false,
}: AppointmentButtonProps) {
  const sizeClass = compact
    ? "max-w-[164px] sm:max-w-[180px] lg:w-[180px]"
    : mobileCompact
      ? "max-w-[164px] md:max-w-[281px]"
      : "max-w-[281px]";

  return (
    <SvgActionButton
      href="/appointment"
      label="Book an Appointment"
      ariaLabel="Book an appointment"
      className={`focus-visible:outline-white ${sizeClass}`}
    />
  );
}
