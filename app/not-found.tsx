"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import SpecularButton from "@/components/SpecularButton";
import ParticleText from "@/components/ParticleText";

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#0A0D16] select-none"
    >
      {/* Full Screen Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/404_boy.jpg"
          alt="Background Illustration"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Dark Editorial Vignette and Blur Overlay for Text Legibility */}
        <div className="absolute inset-0 bg-[#0A0D16]/65 backdrop-blur-[3px] pointer-events-none" />
        <div className="absolute inset-y-0 left-0 w-full md:w-[70%] bg-gradient-to-r from-[#0A0D16] via-[#0A0D16]/95 via-[#0A0D16]/75 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#0A0D16] to-transparent pointer-events-none" />
      </div>

      {/* Grid overlay lines (subtle sci-fi look) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-start justify-center px-5 sm:px-8 md:px-24 w-full max-w-6xl py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl"
        >
          {/* Holographic Error Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md shadow-sm mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#65C4EC] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#65C4EC]"></span>
            </span>
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase font-bold text-[#65C4EC]">
              SYSTEM_ERROR // 404
            </span>
          </div>

          {/* Interactive Particle Text for 404 (White/Light on Dark Background) */}
          <div className="relative w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[400px] md:max-w-[420px] h-[140px] sm:h-[200px] md:h-[220px] mb-4 pointer-events-auto">
            <ParticleText
              text="404"
              particleSize={2.8}
              density={3}
              color="#FFFFFF"
              highlightColor="#65C4EC"
              scatter={160}
              gatherDuration={1400}
              stagger={250}
              pointerRepel={30}
              repelRadius={90}
              idleDrift={0.5}
              trigger="mount"
              fontSize="clamp(6rem, 12vw, 11rem)"
              fontWeight={900}
              fontFamily="inherit"
              glow={true}
              className="w-full h-full"
            />
          </div>

          <h2 className="font-display text-2xl md:text-4xl font-extrabold text-white mb-4 leading-tight tracking-tight">
            Even our AI can&apos;t find this page.
          </h2>
          
          <p className="text-[#8193A3] text-base md:text-lg leading-relaxed mb-10 max-w-md font-medium">
            You&apos;ve wandered completely off the syllabus. This page was
            either deleted, expelled, or our AI student simulators hid it from us to skip class.
          </p>

          <Link href="/">
            <SpecularButton
              baseColor="#1D222D"
              lineColor="#65C4EC"
              speed={1.5}
            >
              Take Me Back
            </SpecularButton>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
