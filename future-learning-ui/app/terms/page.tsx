"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="relative min-h-screen w-full bg-[#F0F7FF] text-[#0A2540] selection:bg-[#0099FF]/30">
      <header className="fixed top-3 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/80 bg-white/75 px-5 py-2.5 backdrop-blur-2xl shadow-lg shadow-[#007BFF]/10">
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/kalpkrafts_logo.png"
              alt="KalpKrafts Logo"
              width={260}
              height={80}
              unoptimized
              className="h-8 sm:h-9 w-auto object-contain"
            />
          </Link>
          <Link href="/" className="gradient-pill-btn px-5 py-2 text-xs font-semibold inline-flex items-center gap-1.5">
            <ArrowLeft size={14} /> Back to Main Site
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 pt-32 pb-24">
        <div className="rounded-3xl border border-[#BEE3F8] bg-white p-8 sm:p-12 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <FileText size={28} className="text-[#007BFF]" />
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#007BFF]">LEGAL & TERMS</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#0A2540] sm:text-4xl">Terms of Service</h1>
          <p className="mt-2 text-xs text-[#334E68]">Last updated: January 2025</p>

          <div className="mt-8 space-y-6 text-sm leading-relaxed text-[#334E68]">
            <section>
              <h2 className="text-lg font-bold text-[#0A2540] mb-2">1. Institutional Software License</h2>
              <p>
                By accessing or subscribing to KalpKrafts platforms (including Pragati, Project V, and Project D), institutions and individual users agree to abide by these terms. Subscriptions grant non-exclusive, revocable licenses for educational usage.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#0A2540] mb-2">2. Platform Usage & Acceptable Conduct</h2>
              <p>
                Users agree not to reverse engineer, disrupt platform infrastructure, or utilize AI companions for unauthorized commercial exploitation. Institutions remain responsible for administrative credential security.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#0A2540] mb-2">3. Service Level Agreements & Reliability</h2>
              <p>
                KalpKrafts targets 99.9% uptime for core enterprise and school ERP services. Scheduled maintenance windows are communicated to administrative leaders in advance.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#0A2540] mb-2">4. Governance & Support Contact</h2>
              <p>
                For legal inquiries or master service agreements (MSA), contact <span className="font-semibold text-[#007BFF]">legal@kalpkrafts.com</span>.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
