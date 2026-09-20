import type { Metadata } from "next";
import { Fraunces, Instrument_Sans } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "../components/SmoothScroll";
import { FilmGrain } from "../components/FilmGrain";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["opsz"],
  style: ["normal", "italic"]
});

const instrumentSans = Instrument_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"]
});

export const metadata: Metadata = {
  title: "Sentosa – The Coffee Unit",
  description: "Cozy, contemporary space made for good coffee, great food, and even better moments.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${instrumentSans.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col font-body bg-[var(--color-ivory)] text-[var(--color-espresso)] overflow-x-hidden">
        <FilmGrain />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
