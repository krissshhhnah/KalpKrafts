"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import HalftoneReveal from "@/components/HalftoneReveal";
import WarpText from "@/components/WarpText";
import FlowingMenu from "@/components/FlowingMenu";
import BorderGlow from "@/components/BorderGlow";
import SpecularButton from "@/components/SpecularButton";
import MagicBento from "@/components/MagicBento";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Brain,
  Cpu,
  GraduationCap,
  Sparkles,
  ChevronDown,
  CheckCircle2,
  Send,
  Mail,
  User,
  Building,
  Menu,
  X,
  Linkedin,
  Github,
  BookOpen,
  Award,
  Building2,
  Landmark,
  ShieldCheck,
  Layers,
  Target,
  Zap,
  Atom,
  Globe2,
  MapPin,
  Clock,
  Twitter,
  Instagram,
  Star,
} from "lucide-react";

/* ─── DATA ─── */
const testimonials = [
  {
    id: 1,
    name: "Dr. Anil K. Mathur, Director",
    handle: "@anilmathur_edu",
    platform: "twitter",
    text: "Pragati is legitimately the most reliable institutional ERP we've integrated. The automation saved our staff weeks of administrative overhead.",
    avatar: "https://randomuser.me/api/portraits/men/43.jpg",
  },
  {
    id: 2,
    name: "Prof. Sunita Reddy, Dean of Academics",
    handle: "@sunitareddy",
    platform: "twitter",
    text: "KalpKrafts understands the complex needs of higher education. Pragati seamlessly unified our attendance and fee management systems.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 3,
    name: "Dr. Marcus Vance, IT Director",
    handle: "EdTech Reviews",
    platform: "star",
    text: "The smoothest onboarding experience our university has ever seen. Pragati's architecture handles our scale effortlessly without any downtime.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 4,
    name: "Prof. R. K. Narayan, HOD Computer Science",
    handle: "@narayan_admin",
    platform: "twitter",
    text: "KalpKrafts is building the backbone of modern education. Pragati's API-first approach is exactly what our campus IT infrastructure needed.",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
  },
  {
    id: 5,
    name: "Dr. Meera Desai, Vice-Chancellor",
    handle: "G2 Crowd",
    platform: "star",
    text: "Incredible UI and UX. Pragati makes institutional governance feel effortless. KalpKrafts has completely modernized how our campuses operate.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
];
const faqs = [
  {
    q: "What types of institutions does KalpKrafts support?",
    a: "We build tailored AI infrastructure and software platforms for K-12 school networks, engineering colleges, higher-education universities, skill institutes, and corporate L&D enterprise teams.",
  },
  {
    q: "How does Pragati integrate with our existing school ERP or IT systems?",
    a: "Pragati is designed as a modular, API-first platform. It seamlessly syncs with legacy databases, attendance hardware, biometric systems, and communication gateways with zero downtime.",
  },
  {
    q: "How does KalpKrafts ensure student data privacy & AI model security?",
    a: "Privacy and algorithmic safety are embedded into our core architecture. All student interactions are encrypted, anonymized, and processed strictly within secure enterprise environments following global privacy standards.",
  },
  {
    q: "Can our university or engineering college partner for Project D / Project V R&D labs?",
    a: "Yes! We run early-access institutional partnership programs. Partner institutions receive early sandbox access, customized simulation labs, and co-development opportunities for specialized curriculums.",
  },
  {
    q: "What is the typical onboarding timeline for an institution?",
    a: "Institutional onboarding takes between 3 to 10 business days. Our dedicated technical integration team handles data migration, staff training, and platform customization end-to-end.",
  },
];

const products = [
  {
    id: "01",
    name: "Pragati",
    tagline: "Simplify Schools. Empower Education.",
    subtitle: "Institutional Management Platform",
    description:
      "A next-generation school ERP that unifies academic governance, attendance, fee management, and parent communication into one intelligent, API-first platform.",
    status: "Live",
    url: "pragati.kalpkrafts.com",
    image: "/product_pragati.png",
    features: [
      "Unified academic, fee & attendance management",
      "Predictive student performance analytics",
      "Instant multi-channel parent communication",
    ],
    accent: "#2687E8",
    domain: "INSTITUTIONAL TECHNOLOGY",
  },
  {
    id: "02",
    name: "Project V",
    tagline: "Learn Better. Grow Brighter.",
    subtitle: "AI Learning Companion",
    description:
      "An ambitious AI learning companion that makes studies personal, adaptive, and genuinely fun for the next generation of learners.",
    status: "In Development",
    url: "project-v.kalpkrafts.com",
    image: "/product_veda.png",
    features: [
      "Voice-interactive AI learning companion",
      "Adaptive math, science & literacy experiences",
      "Parent progress reporting & safe environment",
    ],
    accent: "#65C4EC",
    domain: "AI COMPANION",
  },
  {
    id: "03",
    name: "Project D",
    tagline: "Simulate Real Engineering. Build Real You.",
    subtitle: "Engineering Simulation Platform",
    description:
      "An immersive engineering simulator that recreates real-world projects, corporate workflows, and technical environments for students preparing for industry.",
    status: "In Development",
    url: "project-d.kalpkrafts.com",
    image: "/product_dhruva.jpg",
    features: [
      "Industry-grade project & cloud simulation labs",
      "Real-time code evaluation & skill radar",
      "Portfolio project builder for career readiness",
    ],
    accent: "#1D222D",
    domain: "SIMULATION",
  },
];

const builtForSectors = [
  { name: "Schools", desc: "K-12 & Academy Networks", icon: <BookOpen className="h-4 w-4" /> },
  { name: "Engineering Colleges", desc: "Technical & STEM Hubs", icon: <Cpu className="h-4 w-4" /> },
  { name: "Universities", desc: "Higher Ed Institutions", icon: <GraduationCap className="h-4 w-4" /> },
  { name: "Training Institutes", desc: "Skill & Vocational Labs", icon: <Award className="h-4 w-4" /> },
  { name: "Corporations", desc: "Enterprise & L&D Teams", icon: <Building2 className="h-4 w-4" /> },
  { name: "Government Programs", desc: "Public Ed Initiatives", icon: <Landmark className="h-4 w-4" /> },
];

const principles = [
  {
    num: "01",
    title: "AI-First Infrastructure",
    description: "We engineer deep AI architectures and scalable intelligence systems that power long-term institutional growth.",
  },
  {
    num: "02",
    title: "Ethical & Trustworthy AI",
    description: "Every model and agent is designed with strict data privacy, algorithmic transparency, and human oversight.",
  },
  {
    num: "03",
    title: "Adaptive Personalization",
    description: "Our systems dynamically adjust to individual learning speeds, cognitive models, and domain mastery goals.",
  },
  {
    num: "04",
    title: "Institutional Augmentation",
    description: "Technology should empower educators and administrators, reducing friction so leaders focus on inspiring.",
  },
  {
    num: "05",
    title: "Deep Research Rigor",
    description: "We bridge cutting-edge academic research with production engineering to deliver true technological breakthroughs.",
  },
  {
    num: "06",
    title: "Universal Accessibility",
    description: "Building inclusive, multi-lingual, and low-latency platforms accessible to learners across the globe.",
  },
];

const teamMembers = [
  {
    name: "Krishnendu Prasanth",
    subtitle: "Founder, KalpKrafts",
    image: "/krish kk.png",
    linkedin: "https://www.linkedin.com/in/krishnendu-prasanth/",
    github: "https://github.com/krissshhhnah",
    desc: "Krishnendu Prasanth is the Founder of KalpKrafts, leading the company's vision to redefine education through artificial intelligence and technology. An AI engineer and full-stack developer, he specializes in Generative AI, intelligent learning systems, RAG architectures, and scalable software development.",
    tags: ["Generative AI", "RAG Architecture", "Learning Systems", "Full-Stack"],
  },
  {
    name: "Rudranarayan",
    subtitle: "Co-Founder, KalpKrafts",
    image: "/rudra kk.png",
    linkedin: "https://www.linkedin.com/in/rudranarayan18/",
    github: "https://github.com/Leviiiz18",
    desc: "Rudranarayan is the Co-Founder of KalpKrafts, driven by a passion for building intelligent systems that merge artificial intelligence with real-world applications. With experience spanning AI, game development, reinforcement learning, RAG architectures, and full-stack engineering.",
    tags: ["Game Development", "Reinforcement Learning", "RAG Architecture", "Full-Stack"],
  },
];

/* ─── ANIMATION VARIANTS ─── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65 } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

/* ─── REUSABLE COMPONENTS ─── */
function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-mono-tag text-[10px] tracking-[0.18em] uppercase font-medium ${
        light ? "text-[#B9E7F1]/70" : "text-[#2687E8]"
      }`}
    >
      {children}
    </span>
  );
}

function SectionHeading({
  children,
  className = "",
  light = false,
}: {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <h2
      className={`font-display font-extrabold leading-[1.08] tracking-[-0.03em] ${
        light ? "text-white" : "text-[#1D222D]"
      } ${className}`}
    >
      {children}
    </h2>
  );
}

/* ─── MAIN COMPONENT ─── */
export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    org: "",
    type: "K-12 School Network",
    message: "",
  });
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);
  const [cursor, setCursor] = useState<{ x: number; y: number; show: boolean; label: string }>({
    x: 0, y: 0, show: false, label: "",
  });
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // ─── EXACT BACKEND CONTRACT PRESERVED ───
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email) return;
    setContactLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: contactForm.name,
          email: contactForm.email,
          phone: "N/A",
          subject: contactForm.type,
          message: contactForm.message || `Institution: ${contactForm.org || "N/A"}`,
        }),
      });
      if (res.ok) setContactSubmitted(true);
    } catch {
      // silent fail — UX handled gracefully
    } finally {
      setContactLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#F5FBFD] text-[#1D222D] overflow-x-hidden selection:bg-[#2687E8]/20">

      {/* ─── NAVBAR (FLOATING PILL) ─── */}
      <motion.header
        initial={{ y: -56, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
      >
        <div className="mx-auto flex w-full max-w-[90rem] items-center justify-between px-6 py-6 lg:px-8 pointer-events-auto">
          {/* Left: Independent Logo */}
          <a 
            href="#" 
            className={`shrink-0 flex items-center rounded-full px-4 py-2 transition-all duration-300 ${
              scrolled 
                ? "bg-white/90 backdrop-blur-xl border border-[#D8EAF1] shadow-lg shadow-[#D8EAF1]/50" 
                : "bg-white/60 backdrop-blur-md border border-white/40 shadow-sm"
            }`}
          >
            <Image
              src="/kalpkrafts_logo.png"
              alt="KalpKrafts"
              width={200}
              height={64}
              priority
              unoptimized
              className="h-8 lg:h-9 w-auto object-contain"
            />
          </a>

          {/* Right: Floating Nav Pill */}
          <div className={`flex items-center gap-2 rounded-full p-1.5 transition-all duration-300 ${
            scrolled 
              ? "bg-white/90 backdrop-blur-xl border border-[#D8EAF1] shadow-lg shadow-[#D8EAF1]/50" 
              : "bg-white/60 backdrop-blur-md border border-white/40 shadow-sm"
          }`}>
            {/* Desktop Nav */}
            <nav className="hidden items-center gap-1 md:flex px-2">
              {["Products", "Company", "Careers"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-[#526579] transition-colors duration-200 hover:bg-[#EDF8FB] hover:text-[#1D222D]"
                >
                  {item}
                </a>
              ))}
            </nav>

            <SpecularButton
              href="#contact"
              size="sm"
              className="hidden md:inline-flex"
            >
              Partner With Us
            </SpecularButton>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1D222D] text-white md:hidden transition-transform active:scale-95"
              aria-label="Menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu (Floating Bubble) */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-auto absolute right-6 top-24 w-64 origin-top-right rounded-3xl border border-[#D8EAF1] bg-white/95 p-4 shadow-2xl backdrop-blur-xl md:hidden"
            >
              <div className="flex flex-col gap-1">
                {["Products", "Company", "Careers", "Contact"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-2xl px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#1D222D] transition-colors hover:bg-[#EDF8FB]"
                  >
                    {item}
                  </a>
                ))}
                <SpecularButton
                  href="#contact"
                  size="md"
                  className="mt-2 w-full"
                >
                  Partner With Us <ArrowUpRight size={14} />
                </SpecularButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <main className="relative z-10">

        {/* ─── 01 HERO ─── */}
        <section
          id="hero"
          className="relative flex min-h-screen flex-col items-center justify-end pb-12 sm:pb-16 overflow-hidden bg-[#F5FBFD]"
        >
          {/* Full-Page Halftone Pattern (Static) */}
          <div className="absolute inset-0 z-0 bg-[#F5FBFD]">
            <HalftoneReveal
              src="/hero_bg_new.jpg"
              inkColor="#1D222D"
              paperColor="#F5FBFD"
              mode="color"
              dotDensity={160}
              angle={45}
              contrast={1.15}
              idleReveal={0}
              trigger="off"
              className="w-full h-full opacity-100 saturate-[1.2]"
            />
            {/* Bottom Gradient Shadow */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[60vh] bg-gradient-to-t from-[#0A0C10]/90 via-[#0A0C10]/50 to-transparent" />
          </div>

          {/* Typography overlay (pushed to bottom by justify-end) */}
          <div className="relative z-10 w-full max-w-[90rem] px-6 lg:px-12 text-left sm:text-center">
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-start sm:items-center"
            >
              <motion.div
                variants={fadeUp}
                className="w-full max-w-[70rem] mx-auto drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]"
              >
                <WarpText
                  text={`Engineering\nthe future of\nlearning.`}
                  color="#ffffff"
                  warpStrength={0.08}
                  warpScale={1.7}
                  speed={0.55}
                  pointerInfluence={0.42}
                  pointerStrength={0.38}
                  refraction={0.018}
                  ripple={true}
                  fontSize={180}
                  fontWeight={800}
                  style={{ height: '500px', width: '100%' }}
                />
              </motion.div>

              <motion.p
                variants={fadeUp}
                className="-mt-2 sm:-mt-4 max-w-2xl text-[1.125rem] leading-[1.6] text-white font-medium sm:mx-auto drop-shadow-[0_6px_10px_rgba(0,0,0,0.6)] relative z-20 pointer-events-none"
              >
                Building intelligent educational platforms, adaptive AI companions, and real-world engineering experiences for modern institutions.
              </motion.p>

              <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center sm:justify-center gap-4 drop-shadow-[0_6px_10px_rgba(0,0,0,0.4)]">
                <SpecularButton
                  href="#products"
                  size="lg"
                  className="shadow-2xl hover:shadow-[#2687E8]/20"
                >
                  Explore Ecosystem <ArrowRight size={15} />
                </SpecularButton>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ─── 02 ACKNOWLEDGED BY STRIP ─── */}
        <section className="border-y border-[#D8EAF1] bg-white">
          <div className="mx-auto max-w-7xl px-6 py-5 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
              <span className="font-mono-tag text-[12px] font-extrabold tracking-widest text-[#526579] uppercase">
                Acknowledged By
              </span>
              <div className="h-6 w-px bg-[#D8EAF1] hidden md:block" />
              <div className="flex items-center justify-center opacity-60 grayscale contrast-125 transition-all duration-300 hover:grayscale-0 hover:opacity-100 hover:contrast-100">
                <Image
                  src="/nipe_logo-v2.jpg"
                  alt="Nitte Institute of Professional Education"
                  width={350}
                  height={120}
                  unoptimized
                  className="h-10 sm:h-12 w-auto object-contain scale-110 sm:scale-125 origin-center"
                />
              </div>
            </div>
          </div>
        </section>


        {/* ─── 04 PURPOSE / ABOUT ─── */}
        <section id="about" className="py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">

              {/* Left — Manifesto */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="lg:col-span-5"
              >
                <SectionLabel>OUR PURPOSE</SectionLabel>
                <div className="mt-6 space-y-2">
                  {["LEARNING", "SHOULDN'T", "END AT", "THEORY."].map((word, i) => (
                    <motion.div
                      key={word}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.08 }}
                      className="font-display text-[clamp(2.5rem,5.5vw,4.5rem)] font-extrabold leading-[1.0] tracking-[-0.04em] text-[#1D222D]"
                    >
                      {word === "THEORY." ? (
                        <span className="bg-gradient-to-r from-[#2687E8] to-[#65C4EC] bg-clip-text text-transparent">
                          {word}
                        </span>
                      ) : (
                        word
                      )}
                    </motion.div>
                  ))}
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                  className="mt-8 max-w-md text-base leading-relaxed text-[#526579]"
                >
                  We build technology that helps people experiment, simulate, create and understand. Education must adapt to the learner — not the other way around.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                  className="mt-8 border-l-2 border-[#2687E8] pl-5"
                >
                  <p className="text-sm font-medium text-[#1D222D] italic">
                    "Technology must adapt to the learner and the institution."
                  </p>
                  <p className="mt-1.5 font-mono-tag text-[10px] tracking-wider text-[#8193A3]">
                    — KALPKRAFTS ENGINEERING PHILOSOPHY
                  </p>
                </motion.div>
              </motion.div>

              {/* Right — 3 Pillars */}
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-col justify-center space-y-0 divide-y divide-[#D8EAF1] lg:col-span-6 lg:col-start-7"
              >
                {[
                  {
                    n: "01",
                    title: "Institutional Transformation",
                    desc: "Building digital-first infrastructure that streamlines governance, administration, and learning for modern educational institutions.",
                  },
                  {
                    n: "02",
                    title: "AI-First Pedagogy",
                    desc: "Pioneering research-backed artificial intelligence models designed to make learning personal, accessible, and genuinely engaging.",
                  },
                  {
                    n: "03",
                    title: "Future-Ready Ecosystem",
                    desc: "Bridging the gap between foundational education and industry readiness through meaningful technology and deep research.",
                  },
                ].map((pillar) => (
                  <motion.div
                    key={pillar.n}
                    variants={fadeUp}
                    className="group flex gap-6 py-8 transition-all duration-200 hover:pl-2"
                  >
                    <span className="font-mono-tag mt-0.5 shrink-0 text-xs text-[#2687E8]">
                      {pillar.n}
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-bold text-[#1D222D] tracking-[-0.02em] group-hover:text-[#2687E8] transition-colors">
                        {pillar.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#526579]">{pillar.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── 05 CAPABILITY / TRUST ─── */}
        <section className="bg-[#1D222D] py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-14 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <SectionLabel light>BUILT FOR REAL-WORLD LEARNING</SectionLabel>
                <SectionHeading light className="mt-4 text-[clamp(1.75rem,3.5vw,2.5rem)]">
                  One company. Four pillars.
                  <br />
                  <span className="text-[#65C4EC]">Infinite institutional impact.</span>
                </SectionHeading>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-[#B7C4D1]">
                KalpKrafts operates at the intersection of AI engineering, simulation technology, and institutional software.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "AI", sublabel: "Generative & Adaptive Intelligence", icon: <Brain className="h-5 w-5" /> },
                { label: "ENGINEERING", sublabel: "Simulation & Systems Architecture", icon: <Cpu className="h-5 w-5" /> },
                { label: "SIMULATION", sublabel: "Real-World Practice Environments", icon: <Layers className="h-5 w-5" /> },
                {
                  label: "INSTITUTIONAL TECH",
                  sublabel: "ERP, LMS & Administrative Platforms",
                  icon: <Building2 className="h-5 w-5" />,
                },
              ].map((cap, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="h-full"
                >
                  <BorderGlow
                    className="h-full"
                    backgroundColor="#141820"
                    glowColor="210 80 53"
                    colors={['#2687E8', '#65C4EC', '#ffffff']}
                    borderRadius={24}
                  >
                    <div className="group flex h-full flex-col gap-4 p-8">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-[#65C4EC] group-hover:border-[#2687E8]/30 group-hover:text-[#2687E8] transition-colors">
                        {cap.icon}
                      </div>
                      <div>
                        <p className="font-display text-xl font-extrabold text-white tracking-[-0.02em]">
                          {cap.label}
                        </p>
                        <p className="mt-1.5 text-xs leading-relaxed text-[#B7C4D1]">{cap.sublabel}</p>
                      </div>
                    </div>
                  </BorderGlow>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── INTERACTIVE VISION ─── */}
        <section className="relative w-full aspect-video overflow-hidden bg-white">
          {/* Full bleed Halftone Background maintaining 16:9 */}
          <div className="absolute inset-0 z-0">
            <HalftoneReveal
              src="/halftone_group.jpg"
              inkColor="#1D222D"
              paperColor="#F5FBFD"
              mode="color"
              dotDensity={150}
              angle={28}
              revealRadius={0.25}
              borderRadius="0px"
            />
          </div>
          
          {/* Small text at the bottom */}
          <div className="pointer-events-none absolute bottom-4 left-0 right-0 z-10 flex justify-center px-4 md:bottom-8">
            <div className="rounded-full border border-white/20 bg-white/60 px-4 py-1.5 shadow-sm backdrop-blur-md">
              <span className="font-mono-tag tracking-widest text-[10px] text-[#1D222D] md:text-xs">
                INTERACTIVE VISION — HOVER TO REVEAL
              </span>
            </div>
          </div>
        </section>

        {/* ─── 06 PRODUCTS (FLOWING MENU) ─── */}
        <section id="products" className="py-24 lg:py-32 bg-[#F5FBFD]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-16">
            <SectionLabel>OUR ECOSYSTEM</SectionLabel>
            <SectionHeading className="mt-4 text-[clamp(2.5rem,5vw,4.5rem)] leading-tight">
              Technology that turns
              <br />
              <span className="bg-gradient-to-r from-[#2687E8] to-[#65C4EC] bg-clip-text text-transparent">
                learning into doing.
              </span>
            </SectionHeading>
          </div>
          <div style={{ height: '70vh', position: 'relative' }}>
            <FlowingMenu 
              items={products.map(p => ({
                link: '#',
                text: p.name,
                image: p.image,
                isLive: p.status === 'Live'
              }))} 
              speed={15}
              bgColor="#F5FBFD"
              textColor="#1D222D"
              marqueeBgColor="#2687E8"
              marqueeTextColor="#ffffff"
              borderColor="#D8EAF1"
            />
          </div>
        </section>

        {/* ─── 06 BUILT FOR ─── */}
        <section className="border-t border-[#D8EAF1] bg-white py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-14 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-end">
              <div>
                <SectionLabel>INSTITUTIONAL COVERAGE</SectionLabel>
                <SectionHeading className="mt-4 text-[clamp(1.75rem,3.5vw,2.75rem)]">
                  Built for every stage
                  <br />
                  of education.
                </SectionHeading>
              </div>
              <p className="text-base leading-relaxed text-[#526579]">
                Engineered to support learners and institutions at every milestone — from K-12 classrooms to university campuses and government initiatives.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {builtForSectors.map((sector, i) => (
                <motion.div
                  key={sector.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.07 }}
                  className="group flex flex-col gap-3 rounded-2xl border border-[#D8EAF1] bg-[#F5FBFD] p-5 transition-all duration-200 hover:-translate-y-1 hover:border-[#2687E8] hover:bg-white hover:shadow-md"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#D8EAF1] bg-white text-[#2687E8] group-hover:bg-[#2687E8] group-hover:text-white transition-colors">
                    {sector.icon}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#1D222D]">{sector.name}</p>
                    <p className="mt-0.5 text-[11px] text-[#8193A3]">{sector.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 07 ENGINEERING PRINCIPLES DARK SECTION ─── */}
        <section
          id="company"
          className="overflow-hidden bg-[#151A23] py-24 lg:py-32"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div>
                <SectionLabel light>COMPANY PRINCIPLES</SectionLabel>
                <SectionHeading
                  light
                  className="mt-4 text-[clamp(1.75rem,3.5vw,2.75rem)]"
                >
                  The beliefs that shape
                  <br />
                  <span className="text-[#65C4EC]">how we build.</span>
                </SectionHeading>
              </div>
              <p className="flex items-center text-sm leading-relaxed text-[#B7C4D1]">
                KalpKrafts is built on a set of deeply held engineering and research principles that guide every product, every decision, and every line of code.
              </p>
            </div>

            <div className="mt-8">
              <MagicBento 
                items={principles.map(p => ({
                  label: `PRINCIPLE ${p.num}`,
                  title: p.title,
                  description: p.description
                }))}
                textAutoHide={false}
                enableStars={true}
                enableSpotlight={true}
                enableBorderGlow={true}
                enableTilt={true}
                enableMagnetism={true}
                clickEffect={true}
                spotlightRadius={300}
                particleCount={12}
                glowColor="38, 135, 232"
              />
            </div>
          </div>
        </section>

        {/* ─── 08 TESTIMONIALS (EDITORIAL CROSSFADE) ─── */}
        <section className="relative bg-white py-24 lg:py-32 overflow-hidden border-y border-[#D8EAF1]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col items-center text-center">
              <SectionLabel>WALL OF LOVE</SectionLabel>
              
              <div className="relative mt-16 w-full max-w-4xl min-h-[320px] md:min-h-[260px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTestimonial}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="flex flex-col items-center w-full"
                  >
                    <p className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-[#1D222D] leading-[1.3] tracking-[-0.01em]">
                      "{testimonials[activeTestimonial].text}"
                    </p>
                    
                    <div className="mt-10 flex items-center gap-4">
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-[#D8EAF1]">
                        <Image 
                          src={testimonials[activeTestimonial].avatar} 
                          alt={testimonials[activeTestimonial].name} 
                          fill 
                          unoptimized 
                          className="object-cover" 
                        />
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-[#1D222D]">{testimonials[activeTestimonial].name}</p>
                        <div className="flex items-center gap-1.5 text-xs text-[#526579] mt-0.5">
                          {testimonials[activeTestimonial].platform === "twitter" && <Twitter size={12} className="text-[#2687E8]" />}
                          {testimonials[activeTestimonial].platform === "instagram" && <Instagram size={12} className="text-[#F05F62]" />}
                          {testimonials[activeTestimonial].platform === "star" && <Star size={12} className="fill-[#F05F62] text-[#F05F62]" />}
                          <span>{testimonials[activeTestimonial].handle}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Indicators */}
              <div className="mt-12 flex items-center justify-center gap-3">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTestimonial(idx)}
                    className={`h-2 transition-all duration-300 rounded-full ${
                      idx === activeTestimonial ? "w-8 bg-[#2687E8]" : "w-2 bg-[#D8EAF1] hover:bg-[#8193A3]"
                    }`}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── 09 LEADERSHIP ─── */}
        <section id="leadership" className="py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
              className="mb-16"
            >
              <SectionLabel>OUR TEAM</SectionLabel>
              <SectionHeading className="mt-4 text-[clamp(1.75rem,3.5vw,2.75rem)]">
                The people building
                <br />
                KalpKrafts.
              </SectionHeading>
            </motion.div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {teamMembers.map((member, i) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  className="group relative overflow-hidden rounded-[2rem] aspect-square bg-[#151A23] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-15px_rgba(38,135,232,0.4)]"
                >
                  {/* Full Background Image */}
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Halftone Image Overlay (Fades in on hover, no glass reveal) */}
                  <div className="absolute inset-0 opacity-0 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-105">
                    <HalftoneReveal
                      src={member.image}
                      trigger="off"
                      mode="color"
                      inkColor="#1D222D"
                      paperColor="#F5FBFD"
                      dotDensity={160}
                      angle={45}
                      contrast={1.15}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Base Gradient Overlay (Always visible for name legibility) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14]/90 via-[#0B0E14]/10 via-25% to-transparent to-50%" />

                  {/* Darker Gradient Overlay (Deepens on hover for description legibility) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14]/95 via-[#0B0E14]/60 via-35% to-transparent to-60% opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Content Container (Anchored to bottom, expands upward on hover) */}
                  <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <h3 className="font-display text-3xl font-bold text-white tracking-[-0.02em]">
                          {member.name}
                        </h3>
                        <p className="mt-1 font-mono-tag text-xs tracking-wider text-[#65C4EC]">
                          {member.subtitle.toUpperCase()}
                        </p>
                      </div>
                      
                      {/* Socials (Fades in on hover) */}
                      <div className="flex items-center gap-2 shrink-0 mb-1 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:bg-[#2687E8] hover:text-white"
                          aria-label={`${member.name} LinkedIn`}
                        >
                          <Linkedin size={16} />
                        </a>
                        <a
                          href={member.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-[#1D222D]"
                          aria-label={`${member.name} GitHub`}
                        >
                          <Github size={16} />
                        </a>
                      </div>
                    </div>

                    {/* Description (Height expands from 0 to auto on hover) */}
                    <div className="grid grid-rows-[0fr] transition-all duration-500 ease-out group-hover:grid-rows-[1fr] mt-0 group-hover:mt-6">
                      <div className="overflow-hidden">
                        <div className="border-t border-white/20 pt-5">
                          <p className="text-[15px] leading-relaxed text-[#B7C4D1] opacity-0 transition-opacity duration-700 delay-100 group-hover:opacity-100">
                            {member.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 10 CAREERS CTA ─── */}
        <section id="careers" className="relative flex flex-col lg:flex-row overflow-hidden bg-[#1D222D] min-h-[60vh] lg:min-h-[70vh] items-center">
          {/* Left — Text */}
          <div className="relative z-10 flex w-full flex-col justify-center px-6 py-20 lg:w-1/2 lg:px-12 xl:px-20 lg:py-28">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mx-auto w-full max-w-xl lg:mx-0"
            >
              <SectionLabel light>INTERNSHIPS & CONTRIBUTORS</SectionLabel>
              <SectionHeading light className="mt-4 text-[clamp(1.75rem,3.5vw,2.5rem)]">
                Contribute & build the
                <br />
                future of education.
              </SectionHeading>
              <p className="mt-5 max-w-md text-base leading-relaxed text-[#B7C4D1]">
                We're inviting passionate student researchers, intern developers, and open-source contributors to work directly with our founders on core AI initiatives.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="/careers"
                  className="inline-flex items-center gap-2 rounded-full bg-[#2687E8] px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#1476D2] hover:shadow-lg hover:shadow-[#2687E8]/30"
                >
                  View Open Roles <ArrowRight size={14} />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-white/80 transition-all hover:border-white/30 hover:text-white"
                >
                  Talk to Us
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right — Full Bleed Image with Blur Transition */}
          <div className="relative w-full h-[50vh] lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="absolute inset-0"
            >
              {/* Soft gradient stretch blending into the dark text half */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-full bg-gradient-to-t lg:bg-gradient-to-r from-[#1D222D] via-[#1D222D]/80 to-transparent lg:w-48 z-10" />
              
              <Image
                src="/internship.jpg"
                alt="KalpKrafts Internships and Contributors"
                fill
                unoptimized
                className="object-cover object-center lg:object-left"
              />
            </motion.div>
          </div>
        </section>

        {/* ─── 11 FAQ ─── */}
        <section id="faq" className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <SectionLabel>FAQ</SectionLabel>
                <SectionHeading className="mt-4 text-[clamp(2rem,4vw,3rem)]">
                  Everything
                  <br />
                  you need
                  <br />
                  to know.
                </SectionHeading>
                <p className="mt-5 text-sm leading-relaxed text-[#526579]">
                  Have questions about implementation, security, or platform capabilities?
                </p>
              </div>

              <div className="divide-y divide-[#D8EAF1] lg:col-span-8">
                {faqs.map((faq, fIdx) => {
                  const isOpen = openFaq === fIdx;
                  return (
                    <div key={fIdx}>
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : fIdx)}
                        className="flex w-full items-start justify-between gap-6 py-6 text-left"
                      >
                        <span className="text-base font-semibold text-[#1D222D] leading-snug">
                          {faq.q}
                        </span>
                        <div
                          className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${
                            isOpen
                              ? "rotate-180 border-[#2687E8] bg-[#2687E8] text-white"
                              : "border-[#D8EAF1] bg-white text-[#526579]"
                          }`}
                        >
                          <ChevronDown size={15} />
                        </div>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.28 }}
                            className="overflow-hidden"
                          >
                            <p className="pb-6 text-sm leading-relaxed text-[#526579]">
                              {faq.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>



        {/* ─── 12 CONTACT FORM ─── */}
        <section id="contact" className="py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65 }}
              >
                <SectionLabel>GET IN TOUCH</SectionLabel>
                <SectionHeading className="mt-4 text-[clamp(1.75rem,3.5vw,2.75rem)]">
                  Let's give your institution
                  <br />
                  <span className="bg-gradient-to-r from-[#2687E8] to-[#65C4EC] bg-clip-text text-transparent">
                    infinite AI capability.
                  </span>
                </SectionHeading>
                <p className="mt-5 max-w-md text-base leading-relaxed text-[#526579]">
                  Ready to deploy Pragati, explore R&D simulator labs, or build custom AI learning infrastructure? Submit your inquiry below and our team will respond within 24 hours.
                </p>

              </motion.div>

              {/* Form */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.1 }}
              >
                <AnimatePresence mode="wait">
                  {contactSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center rounded-2xl border border-emerald-200 bg-emerald-50 p-12 text-center"
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                        <CheckCircle2 size={28} />
                      </div>
                      <h3 className="font-display mt-4 text-xl font-bold text-[#1D222D]">
                        Inquiry Received
                      </h3>
                      <p className="mt-2 text-sm text-[#526579]">
                        Our team will respond within 24 hours.
                      </p>
                      <button
                        onClick={() => setContactSubmitted(false)}
                        className="mt-6 rounded-full border border-[#D8EAF1] bg-white px-6 py-2.5 text-sm font-medium text-[#526579] hover:border-[#2687E8] hover:text-[#2687E8] transition-colors"
                      >
                        Submit Another Inquiry
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      onSubmit={handleContactSubmit}
                      className="group relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#2687E8] to-[#1476D2] p-10 shadow-[0_40px_80px_-20px_rgba(38,135,232,0.4)]"
                    >
                      {/* Decorative Background Elements */}
                      <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[#65C4EC] blur-[80px] opacity-50 transition-transform duration-700 group-hover:scale-110" />
                      <div className="pointer-events-none absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />

                      <div className="relative z-10 space-y-7">
                        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                          <div>
                            <label className="mb-2.5 block font-mono-tag text-[11px] font-semibold tracking-[0.08em] text-white/80">
                              YOUR NAME <span className="text-white">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Dr. Rajesh Sharma"
                              value={contactForm.name}
                              onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                              className="w-full rounded-[1.25rem] border border-white/20 bg-white/10 px-5 py-4 text-[15px] text-white placeholder-white/60 shadow-sm transition-all duration-300 hover:bg-white/20 focus:border-white focus:bg-white/20 focus:shadow-[0_0_0_4px_rgba(255,255,255,0.2)] focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="mb-2.5 block font-mono-tag text-[11px] font-semibold tracking-[0.08em] text-white/80">
                              EMAIL ADDRESS <span className="text-white">*</span>
                            </label>
                            <input
                              type="email"
                              required
                              placeholder="rajesh@institution.edu"
                              value={contactForm.email}
                              onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                              className="w-full rounded-[1.25rem] border border-white/20 bg-white/10 px-5 py-4 text-[15px] text-white placeholder-white/60 shadow-sm transition-all duration-300 hover:bg-white/20 focus:border-white focus:bg-white/20 focus:shadow-[0_0_0_4px_rgba(255,255,255,0.2)] focus:outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="mb-2.5 block font-mono-tag text-[11px] font-semibold tracking-[0.08em] text-white/80">
                            INSTITUTION / COMPANY
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Apex Institute of Technology"
                            value={contactForm.org}
                            onChange={(e) => setContactForm({ ...contactForm, org: e.target.value })}
                            className="w-full rounded-[1.25rem] border border-white/20 bg-white/10 px-5 py-4 text-[15px] text-white placeholder-white/60 shadow-sm transition-all duration-300 hover:bg-white/20 focus:border-white focus:bg-white/20 focus:shadow-[0_0_0_4px_rgba(255,255,255,0.2)] focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="mb-2.5 block font-mono-tag text-[11px] font-semibold tracking-[0.08em] text-white/80">
                            INSTITUTION TYPE
                          </label>
                          <div className="relative">
                            <button
                              type="button"
                              onClick={() => setIsSelectOpen(!isSelectOpen)}
                              className="flex w-full items-center justify-between rounded-[1.25rem] border border-white/20 bg-white/10 px-5 py-4 text-left text-[15px] text-white shadow-sm transition-all duration-300 hover:bg-white/20 focus:border-white focus:bg-white/20 focus:shadow-[0_0_0_4px_rgba(255,255,255,0.2)] focus:outline-none"
                            >
                              <span>{contactForm.type}</span>
                              <ChevronDown className={`h-4 w-4 text-white/70 transition-transform duration-300 ${isSelectOpen ? "rotate-180" : ""}`} />
                            </button>
                            
                            <AnimatePresence>
                              {isSelectOpen && (
                                <motion.div
                                  initial={{ opacity: 0, y: -10, scale: 0.98 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                                  transition={{ duration: 0.2 }}
                                  className="absolute left-0 right-0 top-full mt-2 z-50 overflow-hidden rounded-[1.25rem] border border-white/20 bg-[#1D222D]/95 backdrop-blur-xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]"
                                >
                                  {[
                                    "K-12 School Network",
                                    "Engineering College / STEM Hub",
                                    "University / Higher Ed",
                                    "Training & Skill Institute",
                                    "Enterprise / L&D Department",
                                    "Government & Public Initiative"
                                  ].map((type) => (
                                    <button
                                      key={type}
                                      type="button"
                                      onClick={() => {
                                        setContactForm({ ...contactForm, type });
                                        setIsSelectOpen(false);
                                      }}
                                      className={`block w-full px-5 py-3.5 text-left text-[14px] transition-colors ${
                                        contactForm.type === type 
                                          ? "bg-[#2687E8]/40 text-white font-medium" 
                                          : "text-white/70 hover:bg-white/10 hover:text-white"
                                      }`}
                                    >
                                      {type}
                                    </button>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>

                        <div>
                          <label className="mb-2.5 block font-mono-tag text-[11px] font-semibold tracking-[0.08em] text-white/80">
                            PROJECT / INQUIRY DETAILS
                          </label>
                          <textarea
                            rows={4}
                            placeholder="Tell us about your institution's goals..."
                            value={contactForm.message}
                            onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                            className="w-full resize-none rounded-[1.25rem] border border-white/20 bg-white/10 px-5 py-4 text-[15px] text-white placeholder-white/60 shadow-sm transition-all duration-300 hover:bg-white/20 focus:border-white focus:bg-white/20 focus:shadow-[0_0_0_4px_rgba(255,255,255,0.2)] focus:outline-none"
                          />
                        </div>

                        <div className="pt-2">
                          <button
                            type="submit"
                            disabled={contactLoading}
                            className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-[#2687E8] shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl hover:bg-white/90 focus:outline-none disabled:opacity-70 disabled:hover:scale-100"
                          >
                            {contactLoading ? "Sending..." : "Send Partnership Inquiry"}
                            {!contactLoading && <Send size={15} />}
                          </button>
                        </div>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </section>

      </main>

      {/* ─── FOOTER (PRESERVED) ─── */}
      <footer className="relative overflow-hidden border-t border-[#2687E8]/20 bg-[#151A23] pt-16 pb-0 text-slate-400">
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 pb-16">
            <div className="flex flex-col items-start lg:col-span-4">
              <a href="#" className="flex items-center shrink-0">
                <Image
                  src="/kalpkrafts_logo.png"
                  alt="KalpKrafts Logo"
                  width={260}
                  height={80}
                  unoptimized
                  className="h-9 sm:h-10 w-auto object-contain transition-transform duration-300 hover:scale-105 filter brightness-0 invert"
                />
              </a>
              <p className="mt-6 text-xs leading-relaxed text-slate-400 max-w-xs">
                © copyright KalpKrafts 2025. All rights reserved.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7 lg:col-start-6">
              {[
                {
                  title: "Pages",
                  links: [
                    { name: "All Products", href: "#products" },
                    { name: "Our Purpose", href: "#about" },
                    { name: "Careers", href: "/careers" },
                    { name: "Contact", href: "#contact" },
                  ],
                },
                {
                  title: "Socials",
                  links: [
                    { name: "Facebook", href: "#" },
                    { name: "Instagram", href: "#" },
                    { name: "Twitter", href: "#" },
                    { name: "LinkedIn", href: "https://www.linkedin.com/company/kalpkrafts/" },
                  ],
                },
                {
                  title: "Legal",
                  links: [
                    { name: "Privacy Policy", href: "/privacy" },
                    { name: "Terms of Service", href: "/terms" },
                    { name: "Cookie Policy", href: "/privacy" },
                  ],
                },
              ].map((col) => (
                <div key={col.title}>
                  <h3 className="mb-4 text-sm font-bold text-white tracking-wide">{col.title}</h3>
                  <ul className="space-y-3 text-xs">
                    {col.links.map((link) => (
                      <li key={link.name}>
                        <a href={link.href} className="text-slate-400 transition-colors hover:text-white">
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="relative w-full overflow-hidden select-none pointer-events-none h-24 sm:h-32 mt-6">
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-0 opacity-30 sm:opacity-45 h-full w-full"
            style={{
              backgroundImage: "url('/footer.png')",
              backgroundRepeat: "repeat-x",
              backgroundPosition: "bottom left",
              backgroundSize: "auto 100%",
              filter: "brightness(0) invert(1)",
            }}
          />
        </div>
      </footer>

      {/* ─── CURSOR TOOLTIP ─── */}
      <AnimatePresence>
        {cursor.show && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="pointer-events-none fixed z-[9999] rounded-full border border-[#D8EAF1] bg-white px-4 py-2 text-xs font-semibold text-[#1D222D] shadow-lg"
            style={{ left: cursor.x + 14, top: cursor.y + 14 }}
          >
            {cursor.label}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
