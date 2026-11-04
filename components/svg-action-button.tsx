import Link from "next/link";
import { AppointmentButtonArtwork } from "./appointment-button-artwork";

type SvgActionButtonProps = {
  href: string;
  label: string;
  ariaLabel?: string;
  className?: string;
};

export function SvgActionButton({
  href,
  label,
  ariaLabel = label,
  className = "",
}: SvgActionButtonProps) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={`group block w-full max-w-[281px] focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#536ba2] ${className}`}
    >
      <AppointmentButtonArtwork label={label} />
    </Link>
  );
}
