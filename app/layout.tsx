import type { Metadata } from "next";
import localFont from "next/font/local";
import { JsonLd } from "@/components/seo/json-ld";
import {
  generateOrganizationJsonLd,
  generateWebsiteJsonLd,
} from "@/lib/seo/structured-data";
import { createDefaultMetadata } from "@/lib/seo/metadata";
import { SmoothScroll } from "@/components/smooth-scroll";
import "./globals.css";

const gellix = localFont({
  src: [
    { path: "../fonts/gellix/Gellix-Regular.woff2", weight: "400" },
    { path: "../fonts/gellix/Gellix-Medium.woff2", weight: "500" },
    { path: "../fonts/gellix/Gellix-SemiBold.woff2", weight: "600" },
    { path: "../fonts/gellix/Gellix-Bold.woff2", weight: "700" },
  ],
  variable: "--font-gellix",
  display: "swap",
});

export const metadata: Metadata = createDefaultMetadata();

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className={gellix.className}>
        <JsonLd data={generateOrganizationJsonLd()} />
        <JsonLd data={generateWebsiteJsonLd()} />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
