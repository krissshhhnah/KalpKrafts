import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Manrope, DM_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { Suspense } from "react";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KalpKrafts — Beyond Learning | AI-Powered Education Ecosystem",
  description:
    "KalpKrafts is an AI-first EdTech company building the infrastructure for the next generation of education — intelligent platforms, AI companions, and engineering simulation experiences.",
  openGraph: {
    title: "KalpKrafts — AI-Powered Education Ecosystem",
    description: "Engineering the future of learning.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#F5FBFD",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${manrope.variable} ${dmMono.variable}`}
    >
      <head>
        {/* Preload hero background image so WebGL shader has it ready immediately */}
        <link rel="preload" as="image" href="/hero_bg_new.webp" type="image/webp" />
        <link rel="preload" as="image" href="/hero_bg_new.jpg" media="not all and (min-resolution:0.001dpcm)" />
      </head>
      <body className="font-sans antialiased bg-[#F5FBFD] text-[#1D222D]">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
