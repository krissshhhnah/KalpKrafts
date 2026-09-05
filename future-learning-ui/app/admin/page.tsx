"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  KeyRound,
  LogOut,
  Briefcase,
  Users,
  MessageSquare,
  BarChart2,
  Plus,
  Trash2,
  Edit,
  Eye,
  EyeOff,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
  Search,
  Filter,
  RefreshCw,
  FileText,
  Github,
  Linkedin,
  Globe,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

interface Role {
  id: string;
  title: string;
  dept: string;
  type: string;
  location: string;
  exp: string;
  desc: string;
  aboutKalpKrafts: string;
  aboutRole: string;
  responsibilities: string[];
  qualifications: string[];
  skills: string[];
  active?: boolean;
  postedAt?: string;
}

interface Application {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  university: string;
  degree: string;
  gradYear: string;
  github: string;
  linkedin: string;
  portfolio: string;
  startDate: string;
  commitment: string;
  remotePreference: string;
  resumeLink: string;
  fileName?: string;
  fileSize?: string;
  projectsOverview: string;
  whyKalpKrafts: string;
  referralSource: string;
  roleTitle: string;
  dept: string;
  status: "New" | "Reviewing" | "Shortlisted" | "Rejected";
  submittedAt: string;
}

interface Inquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  submittedAt: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Dashboard Data State
  const [activeTab, setActiveTab] = useState<"overview" | "jobs" | "applications" | "inquiries">("overview");
  const [stats, setStats] = useState({
    totalRoles: 0,
    activeRoles: 0,
    totalApplications: 0,
    newApplications: 0,
    totalInquiries: 0,
  });
  const [roles, setRoles] = useState<Role[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  // Job Modal Form State
  const [showJobModal, setShowJobModal] = useState(false);
  const [editingRoleId, setEditingRoleId] = useState<string | null>(null);
  const [jobForm, setJobForm] = useState({
    title: "",
    dept: "AI Research & Engineering",
    type: "Internship / Full-Time Contributor",
    location: "Remote-Friendly",
    exp: "Students & Freshers",
    desc: "",
    aboutKalpKrafts: "KalpKrafts is an AI-first EdTech research startup building high-performance foundation intelligence models.",
    aboutRole: "",
    responsibilities: "",
    qualifications: "",
    skills: "",
  });
  const [jobFormSubmitting, setJobFormSubmitting] = useState(false);

  // Filters & Search
  const [appSearch, setAppSearch] = useState("");
  const [appFilterStatus, setAppFilterStatus] = useState("All");

  // Candidate Details Modal & Drag-and-Drop State
  const [selectedCandidate, setSelectedCandidate] = useState<Application | null>(null);
  const [draggedAppId, setDraggedAppId] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedAppId(id);
    e.dataTransfer.setData("text/plain", id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = async (e: React.DragEvent, targetStatus: Application["status"]) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain") || draggedAppId;
    if (!id) return;

    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: targetStatus } : app))
    );
    setDraggedAppId(null);
    await updateAppStatus(id, targetStatus);
  };

  // Check Session on Load
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const res = await fetch("/api/admin/login");
      const data = await res.json();
      if (data.authenticated) {
        setIsAuthenticated(true);
        fetchDashboardData();
      } else {
        setIsAuthenticated(false);
      }
    } catch {
      setIsAuthenticated(false);
    }
  };

  const fetchDashboardData = async () => {
    setLoadingData(true);
    try {
      const res = await fetch("/api/admin/data");
      const data = await res.json();
      if (data.success) {
        setStats(data.stats);
        setRoles(data.roles);
        setApplications(data.applications);
        setInquiries(data.inquiries);
      }
    } catch (err) {
      console.error("Failed to load admin data:", err);
    } finally {
      setLoadingData(false);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        setPassword("");
        fetchDashboardData();
      } else {
        setAuthError(data.error || "Authentication failed.");
      }
    } catch {
      setAuthError("Network error. Please try again.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    setIsAuthenticated(false);
  };

  const handleCreateOrUpdateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    setJobFormSubmitting(true);

    const payload = {
      title: jobForm.title,
      dept: jobForm.dept,
      type: jobForm.type,
      location: jobForm.location,
      exp: jobForm.exp,
      desc: jobForm.desc,
      aboutKalpKrafts: jobForm.aboutKalpKrafts,
      aboutRole: jobForm.aboutRole,
      responsibilities: jobForm.responsibilities.split("\n").filter((line) => line.trim().length > 0),
      qualifications: jobForm.qualifications.split("\n").filter((line) => line.trim().length > 0),
      skills: jobForm.skills.split(",").map((s) => s.trim()).filter(Boolean),
    };

    try {
      let res;
      if (editingRoleId) {
        res = await fetch("/api/admin/roles", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingRoleId, ...payload }),
        });
      } else {
        res = await fetch("/api/admin/roles", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      const data = await res.json();
      if (data.success) {
        setShowJobModal(false);
        resetJobForm();
        fetchDashboardData();
      } else {
        alert(data.error || "Failed to save job posting.");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving job position.");
    } finally {
      setJobFormSubmitting(false);
    }
  };

  const toggleRoleActive = async (id: string, currentActive?: boolean) => {
    try {
      const res = await fetch("/api/admin/roles", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, active: !currentActive }),
      });
      const data = await res.json();
      if (data.success) {
        fetchDashboardData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteRole = async (id: string) => {
    if (!confirm("Are you sure you want to delete this job posting?")) return;
    try {
      const res = await fetch(`/api/admin/roles?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        fetchDashboardData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateAppStatus = async (id: string, newStatus: Application["status"]) => {
    try {
      const res = await fetch("/api/admin/data", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        fetchDashboardData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const resetJobForm = () => {
    setEditingRoleId(null);
    setJobForm({
      title: "",
      dept: "AI Research & Engineering",
      type: "Internship / Full-Time Contributor",
      location: "Remote-Friendly",
      exp: "Students & Freshers",
      desc: "",
      aboutKalpKrafts: "KalpKrafts is an AI-first EdTech research startup building high-performance foundation intelligence models.",
      aboutRole: "",
      responsibilities: "",
      qualifications: "",
      skills: "",
    });
  };

  const openEditModal = (role: Role) => {
    setEditingRoleId(role.id);
    setJobForm({
      title: role.title,
      dept: role.dept,
      type: role.type,
      location: role.location,
      exp: role.exp,
      desc: role.desc,
      aboutKalpKrafts: role.aboutKalpKrafts,
      aboutRole: role.aboutRole,
      responsibilities: role.responsibilities.join("\n"),
      qualifications: role.qualifications.join("\n"),
      skills: role.skills.join(", "),
    });
    setShowJobModal(true);
  };

  // Filtered Candidate Applications
  const filteredApps = applications.filter((app) => {
    const matchesSearch =
      app.fullName.toLowerCase().includes(appSearch.toLowerCase()) ||
      app.roleTitle.toLowerCase().includes(appSearch.toLowerCase()) ||
      app.email.toLowerCase().includes(appSearch.toLowerCase()) ||
      app.university.toLowerCase().includes(appSearch.toLowerCase());

    const matchesStatus = appFilterStatus === "All" || app.status === appFilterStatus;
    return matchesSearch && matchesStatus;
  });

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#151A23] text-white">
        <div className="flex items-center gap-3">
          <RefreshCw className="h-6 w-6 animate-spin text-[#2687E8]" />
          <span className="text-sm font-semibold">Authenticating Admin Session...</span>
        </div>
      </div>
    );
  }

  // ─── 1. LOGIN SCREEN (UNAUTHENTICATED) ───
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen relative flex items-center justify-center bg-[#151A23] p-4 text-white overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[650px] rounded-full bg-gradient-to-tr from-[#007BFF]/30 to-purple-600/20 blur-[130px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 w-full max-w-md rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-3xl shadow-2xl shadow-black/40"
        >
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-5">
              <div className="rounded-2xl bg-white px-5 py-2.5 shadow-xl border border-[#2687E8]/30 backdrop-blur-md hover:scale-105 transition-all">
                <Image
                  src="/kalpkrafts_logo.png"
                  alt="KalpKrafts Logo"
                  width={180}
                  height={55}
                  priority
                  unoptimized
                  className="h-8 w-auto mx-auto object-contain"
                />
              </div>
            </Link>
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[#007BFF]/25 px-3.5 py-1 text-[11px] font-extrabold text-[#38BDF8] uppercase tracking-wider mb-3 border border-[#2687E8]/40 shadow-sm">
                <Lock className="h-3 w-3" /> RESTRICTED ACCESS
              </div>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">Admin Control Portal</h1>
            <p className="text-xs text-slate-300 mt-1.5 font-medium">
              Enter your founder security key to access Careers & Operations.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1.5">
                Admin Security Password
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Enter admin password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-white/25 bg-[#151A23]/90 pl-10 pr-10 py-3 text-xs text-white placeholder-slate-400 focus:border-[#2687E8] focus:bg-[#151A23] focus:outline-none transition-all shadow-inner"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {authError && (
              <div className="rounded-xl border border-rose-500/40 bg-rose-500/20 p-3 text-center text-xs font-semibold text-rose-200">
                {authError}
              </div>
            )}

            <button
              type="submit"
              disabled={authLoading}
              className="gradient-pill-btn w-full rounded-xl py-3.5 text-xs font-bold text-white shadow-lg shadow-[#007BFF]/30 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              {authLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" /> Authenticating...
                </>
              ) : (
                <>Enter Admin Portal</>
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-[11px] text-slate-400 border-t border-white/10 pt-4">
            Authorized KalpKrafts Personnel Only • Encrypted Session
          </div>
        </motion.div>
      </div>
    );
  }

  // ─── 2. AUTHENTICATED ADMIN DASHBOARD ───
  return (
    <div className="min-h-screen bg-[#F5FBFD] text-[#1D222D] font-poppins selection:bg-[#007BFF]/20">
      {/* Admin Header */}
      <header className="sticky top-0 z-40 border-b border-[#D8EAF1] bg-white/90 backdrop-blur-xl shadow-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Image
                src="/kalpkrafts_logo.png"
                alt="KalpKrafts Logo"
                width={160}
                height={50}
                unoptimized
                className="h-8 w-auto object-contain"
              />
            </Link>
            <span className="hidden sm:inline-block rounded-full bg-[#007BFF]/10 border border-[#2687E8]/30 px-3 py-0.5 text-[10px] font-black uppercase text-[#2687E8] tracking-wider">
              ADMIN PORTAL
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchDashboardData}
              title="Refresh Data"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D8EAF1] bg-white text-[#526579] hover:bg-[#F5FBFD] transition-all"
            >
              <RefreshCw className={`h-4 w-4 ${loadingData ? "animate-spin text-[#2687E8]" : ""}`} />
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-100 transition-all"
            >
              <LogOut className="h-3.5 w-3.5" /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Container */}
      <main className="mx-auto max-w-7xl px-6 py-8">
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[#D8EAF1] pb-4 mb-8">
          <button
            onClick={() => setActiveTab("overview")}
            className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-extrabold transition-all ${
              activeTab === "overview"
                ? "bg-[#007BFF] text-white shadow-md shadow-[#007BFF]/20"
                : "bg-white text-[#526579] border border-[#D8EAF1] hover:bg-[#F5FBFD]"
            }`}
          >
            <BarChart2 className="h-4 w-4" /> Overview Analytics
          </button>

          <button
            onClick={() => setActiveTab("jobs")}
            className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-extrabold transition-all ${
              activeTab === "jobs"
                ? "bg-[#007BFF] text-white shadow-md shadow-[#007BFF]/20"
                : "bg-white text-[#526579] border border-[#D8EAF1] hover:bg-[#F5FBFD]"
            }`}
          >
            <Briefcase className="h-4 w-4" /> Job Postings ({stats.activeRoles})
          </button>

          <button
            onClick={() => setActiveTab("applications")}
            className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-extrabold transition-all ${
              activeTab === "applications"
                ? "bg-[#007BFF] text-white shadow-md shadow-[#007BFF]/20"
                : "bg-white text-[#526579] border border-[#D8EAF1] hover:bg-[#F5FBFD]"
            }`}
          >
            <Users className="h-4 w-4" /> Candidate Applications ({stats.totalApplications})
            {stats.newApplications > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-black text-white">
                {stats.newApplications}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("inquiries")}
            className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-extrabold transition-all ${
              activeTab === "inquiries"
                ? "bg-[#007BFF] text-white shadow-md shadow-[#007BFF]/20"
                : "bg-white text-[#526579] border border-[#D8EAF1] hover:bg-[#F5FBFD]"
            }`}
          >
            <MessageSquare className="h-4 w-4" /> Website Inquiries ({stats.totalInquiries})
          </button>
        </div>

        {/* TAB 1: OVERVIEW ANALYTICS */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Stats Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="rounded-3xl border border-[#D8EAF1] bg-white p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#526579]">Active Postings</span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#EDF8FB] text-[#2687E8]">
                    <Briefcase className="h-5 w-5" />
                  </div>
                </div>
                <div className="text-3xl font-extrabold text-[#1D222D]">{stats.activeRoles}</div>
                <p className="text-[11px] text-[#526579] mt-1">Total {stats.totalRoles} roles in directory</p>
              </div>

              <div className="rounded-3xl border border-[#D8EAF1] bg-white p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#526579]">Applications Received</span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                    <Users className="h-5 w-5" />
                  </div>
                </div>
                <div className="text-3xl font-extrabold text-[#1D222D]">{stats.totalApplications}</div>
                <p className="text-[11px] text-emerald-600 font-semibold mt-1">{stats.newApplications} new unreviewed</p>
              </div>

              <div className="rounded-3xl border border-[#D8EAF1] bg-white p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#526579]">Partner Inquiries</span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-purple-100 text-purple-600">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                </div>
                <div className="text-3xl font-extrabold text-[#1D222D]">{stats.totalInquiries}</div>
                <p className="text-[11px] text-[#526579] mt-1">Received from homepage</p>
              </div>

              <div className="rounded-3xl border border-[#D8EAF1] bg-white p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#526579]">Email Service</span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
                    <Sparkles className="h-5 w-5" />
                  </div>
                </div>
                <div className="text-sm font-extrabold text-[#1D222D]">Gmail SMTP Active</div>
                <p className="text-[11px] text-[#526579] mt-1">Delivering to kalpkrafts@gmail.com</p>
              </div>
            </div>

            {/* Quick Action Banner */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 rounded-3xl border border-[#D8EAF1] bg-white p-8 shadow-xl">
              <div>
                <h3 className="text-xl font-extrabold text-[#1D222D]">Need to post a new opening?</h3>
                <p className="text-xs text-[#526579] mt-1">
                  Create a new job posting that instantly displays on the public Careers page.
                </p>
              </div>
              <button
                onClick={() => {
                  resetJobForm();
                  setShowJobModal(true);
                }}
                className="gradient-pill-btn inline-flex items-center gap-2 rounded-full px-7 py-3 text-xs font-bold text-white shadow-md hover:shadow-lg shrink-0"
              >
                <Plus className="h-4 w-4" /> Post New Job Opening
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: JOB POSTINGS MANAGER */}
        {activeTab === "jobs" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-[#1D222D]">Manage Open Job Positions</h2>
                <p className="text-xs text-[#526579]">Changes made here instantly update the public `/careers` directory.</p>
              </div>
              <button
                onClick={() => {
                  resetJobForm();
                  setShowJobModal(true);
                }}
                className="gradient-pill-btn inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-xs font-bold text-white shadow-md hover:shadow-lg"
              >
                <Plus className="h-4 w-4" /> Post New Job
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {roles.map((role) => (
                <div
                  key={role.id}
                  className={`rounded-2xl border bg-white p-6 shadow-xl transition-all ${
                    role.active === false ? "border-slate-300 opacity-60" : "border-[#D8EAF1]"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="rounded-full bg-[#EDF8FB] px-3 py-0.5 text-[10px] font-extrabold uppercase text-[#2687E8]">
                          {role.dept}
                        </span>
                        {role.active === false ? (
                          <span className="rounded-full bg-slate-100 border border-slate-300 px-2.5 py-0.5 text-[10px] font-bold text-slate-500">
                            Draft / Inactive
                          </span>
                        ) : (
                          <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-bold text-emerald-600">
                            Live Listing ✓
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-extrabold text-[#1D222D]">{role.title}</h3>
                      <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-[#526579] font-medium">
                        <span>📍 {role.location}</span>
                        <span>•</span>
                        <span>⏱️ {role.type}</span>
                        <span>•</span>
                        <span>🎓 {role.exp}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => toggleRoleActive(role.id, role.active)}
                        className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all border ${
                          role.active === false
                            ? "bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100"
                            : "bg-amber-50 text-amber-600 border-amber-200 hover:bg-amber-100"
                        }`}
                      >
                        {role.active === false ? "Publish Role" : "Unpublish"}
                      </button>

                      <button
                        onClick={() => openEditModal(role)}
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#D8EAF1] bg-white text-[#2687E8] hover:bg-[#F5FBFD]"
                        title="Edit Job Posting"
                      >
                        <Edit className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() => handleDeleteRole(role.id)}
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-rose-200 bg-white text-rose-600 hover:bg-rose-50"
                        title="Delete Role"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: CANDIDATE APPLICATIONS KANBAN BOARD */}
        {activeTab === "applications" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-[#1D222D] tracking-tight">Candidate Pipeline (Drag & Drop)</h2>
                <p className="text-xs text-[#526579] font-medium mt-0.5">
                  Drag applicant cards between columns to update status • Click any card for full candidate details.
                </p>
              </div>

              {/* Search Filter */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-[#526579]" />
                  <input
                    type="text"
                    placeholder="Search candidate name or role..."
                    value={appSearch}
                    onChange={(e) => setAppSearch(e.target.value)}
                    className="rounded-xl border border-[#D8EAF1] bg-white pl-10 pr-4 py-2 text-xs text-[#1D222D] focus:border-[#2687E8] focus:outline-none shadow-xs"
                  />
                </div>
              </div>
            </div>

            {/* 4-COLUMN KANBAN BOARD */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-start">
              {[
                { status: "New", title: "New Applications", icon: Clock, color: "emerald" },
                { status: "Reviewing", title: "Under Review", icon: Search, color: "amber" },
                { status: "Shortlisted", title: "Accepted / Shortlisted ★", icon: CheckCircle2, color: "blue" },
                { status: "Rejected", title: "Rejected", icon: Trash2, color: "rose" },
              ].map((col) => {
                const colApps = filteredApps.filter((a) => a.status === col.status);
                const IconComponent = col.icon;

                return (
                  <div
                    key={col.status}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, col.status as Application["status"])}
                    className={`rounded-3xl border p-4 transition-all min-h-[500px] flex flex-col ${
                      col.color === "emerald"
                        ? "bg-emerald-50/40 border-emerald-200/80"
                        : col.color === "amber"
                        ? "bg-amber-50/40 border-amber-200/80"
                        : col.color === "blue"
                        ? "bg-blue-50/40 border-blue-200/80"
                        : "bg-rose-50/40 border-rose-200/80"
                    }`}
                  >
                    {/* Column Header */}
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/80 px-1">
                      <div className="flex items-center gap-2">
                        <IconComponent
                          className={`h-4 w-4 ${
                            col.color === "emerald"
                              ? "text-emerald-600"
                              : col.color === "amber"
                              ? "text-amber-600"
                              : col.color === "blue"
                              ? "text-[#2687E8]"
                              : "text-rose-600"
                          }`}
                        />
                        <h3 className="text-xs font-black uppercase tracking-wider text-[#1D222D]">
                          {col.title}
                        </h3>
                      </div>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[11px] font-black ${
                          col.color === "emerald"
                            ? "bg-emerald-100 text-emerald-700"
                            : col.color === "amber"
                            ? "bg-amber-100 text-amber-700"
                            : col.color === "blue"
                            ? "bg-[#007BFF] text-white"
                            : "bg-rose-100 text-rose-700"
                        }`}
                      >
                        {colApps.length}
                      </span>
                    </div>

                    {/* Column Cards Drop Area */}
                    <div className="space-y-3 flex-1">
                      {colApps.length === 0 ? (
                        <div className="h-36 rounded-2xl border-2 border-dashed border-slate-300/70 flex flex-col items-center justify-center p-4 text-center text-slate-400">
                          <p className="text-[11px] font-bold">Drop Candidate Card Here</p>
                          <p className="text-[10px] mt-0.5 text-slate-400">Drag to move status</p>
                        </div>
                      ) : (
                        colApps.map((app) => (
                          <div
                            key={app.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, app.id)}
                            onClick={() => setSelectedCandidate(app)}
                            className="group relative cursor-grab active:cursor-grabbing rounded-2xl border border-[#D8EAF1] bg-white p-4 shadow-md hover:shadow-xl hover:border-[#2687E8] transition-all transform hover:-translate-y-0.5"
                          >
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <span className="rounded-full bg-[#EDF8FB] px-2.5 py-0.5 text-[9px] font-extrabold uppercase text-[#2687E8] tracking-wider truncate max-w-[140px]">
                                {app.dept}
                              </span>
                              <span className="text-[10px] font-bold text-slate-400 shrink-0">
                                {new Date(app.submittedAt).toLocaleDateString("en-IN", {
                                  day: "numeric",
                                  month: "short",
                                })}
                              </span>
                            </div>

                            <h4 className="text-sm font-black text-[#1D222D] group-hover:text-[#2687E8] transition-colors leading-snug">
                              {app.fullName}
                            </h4>
                            <p className="text-xs font-bold text-[#2687E8] mt-0.5 truncate">{app.roleTitle}</p>

                            <div className="mt-2.5 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                              <span className="truncate max-w-[130px]">🎓 {app.university}</span>
                              <span className="font-bold text-[#2687E8] group-hover:underline flex items-center gap-0.5 text-[10px] shrink-0">
                                Details →
                              </span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: INBOUND WEBSITE INQUIRIES */}
        {activeTab === "inquiries" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-extrabold text-[#1D222D]">Inbound Website Partnership Inquiries</h2>
              <p className="text-xs text-[#526579]">Institutional partnerships and inquiry messages sent from the website homepage.</p>
            </div>

            {inquiries.length === 0 ? (
              <div className="rounded-3xl border border-[#D8EAF1] bg-white p-12 text-center text-[#526579]">
                <MessageSquare className="h-10 w-10 mx-auto text-[#2687E8] mb-3 opacity-60" />
                <h4 className="text-lg font-extrabold text-[#1D222D]">No Inbound Messages Received Yet</h4>
                <p className="text-xs mt-1">Messages sent via homepage "Partner With Us" form will display here.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {inquiries.map((inq) => (
                  <div key={inq.id} className="rounded-3xl border border-[#D8EAF1] bg-white p-6 shadow-xl">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D8EAF1] pb-3 mb-3">
                      <div>
                        <span className="rounded-full bg-[#EDF8FB] px-3 py-0.5 text-[10px] font-extrabold uppercase text-[#2687E8]">
                          {inq.subject}
                        </span>
                        <h3 className="text-base font-extrabold text-[#1D222D] mt-1">{inq.fullName}</h3>
                      </div>
                      <span className="text-xs text-[#526579] font-medium">
                        {new Date(inq.submittedAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#526579] mb-3">
                      <p><strong>Email:</strong> <a href={`mailto:${inq.email}`} className="text-[#2687E8] underline">{inq.email}</a></p>
                      <p><strong>Organization / Phone:</strong> {inq.phone}</p>
                    </div>

                    <div className="bg-[#F5FBFD]/60 p-4 rounded-xl border border-[#D8EAF1]/60 text-xs text-[#1D222D] leading-relaxed whitespace-pre-wrap">
                      {inq.message}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* ─── CREATE / EDIT JOB POSTING MODAL ─── */}
      <AnimatePresence>
        {showJobModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl rounded-3xl border border-[#D8EAF1] bg-white p-6 sm:p-8 shadow-2xl my-8 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-[#D8EAF1] pb-4 mb-6">
                <div>
                  <h3 className="text-xl font-extrabold text-[#1D222D]">
                    {editingRoleId ? "Edit Job Posting" : "Post New Job Opening"}
                  </h3>
                  <p className="text-xs text-[#526579]">Position will immediately reflect live on `/careers`.</p>
                </div>
                <button
                  onClick={() => setShowJobModal(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateOrUpdateJob} className="space-y-4 text-xs text-[#1D222D]">
                <div>
                  <label className="block font-bold mb-1">Job Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lead AI Architect"
                    value={jobForm.title}
                    onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                    className="w-full rounded-xl border border-[#D8EAF1] bg-white px-4 py-2.5 text-xs text-[#1D222D] focus:border-[#2687E8] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold mb-1">Department *</label>
                    <select
                      value={jobForm.dept}
                      onChange={(e) => setJobForm({ ...jobForm, dept: e.target.value })}
                      className="w-full rounded-xl border border-[#D8EAF1] bg-white px-4 py-2.5 text-xs text-[#1D222D] focus:border-[#2687E8] focus:outline-none"
                    >
                      <option value="AI Research & Engineering">AI Research & Engineering</option>
                      <option value="Platform Engineering">Platform Engineering</option>
                      <option value="Product Engineering">Product Engineering</option>
                      <option value="Design & Creative">Design & Creative</option>
                      <option value="Product & Learning">Product & Learning</option>
                      <option value="Cloud Infrastructure & Security">Cloud Infrastructure & Security</option>
                      <option value="Data & Analytics">Data & Analytics</option>
                      <option value="Quality Assurance">Quality Assurance</option>
                      <option value="Growth & Community">Growth & Community</option>
                      <option value="Business Operations">Business Operations</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Work Type *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Full-Time / Internship"
                      value={jobForm.type}
                      onChange={(e) => setJobForm({ ...jobForm, type: e.target.value })}
                      className="w-full rounded-xl border border-[#D8EAF1] bg-white px-4 py-2.5 text-xs text-[#1D222D] focus:border-[#2687E8] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Location *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Remote-Friendly"
                      value={jobForm.location}
                      onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                      className="w-full rounded-xl border border-[#D8EAF1] bg-white px-4 py-2.5 text-xs text-[#1D222D] focus:border-[#2687E8] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Target Experience *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Students & Freshers"
                      value={jobForm.exp}
                      onChange={(e) => setJobForm({ ...jobForm, exp: e.target.value })}
                      className="w-full rounded-xl border border-[#D8EAF1] bg-white px-4 py-2.5 text-xs text-[#1D222D] focus:border-[#2687E8] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold mb-1">Short Description Summary *</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Brief 1-2 sentence overview of the role..."
                    value={jobForm.desc}
                    onChange={(e) => setJobForm({ ...jobForm, desc: e.target.value })}
                    className="w-full rounded-xl border border-[#D8EAF1] bg-white px-4 py-2.5 text-xs text-[#1D222D] focus:border-[#2687E8] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1">About the Role *</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Detailed introduction to what the candidate will work on..."
                    value={jobForm.aboutRole}
                    onChange={(e) => setJobForm({ ...jobForm, aboutRole: e.target.value })}
                    className="w-full rounded-xl border border-[#D8EAF1] bg-white px-4 py-2.5 text-xs text-[#1D222D] focus:border-[#2687E8] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1">Responsibilities (One bullet per line) *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Build production RAG pipelines&#10;Deploy FastAPI microservices&#10;Write unit tests..."
                    value={jobForm.responsibilities}
                    onChange={(e) => setJobForm({ ...jobForm, responsibilities: e.target.value })}
                    className="w-full rounded-xl border border-[#D8EAF1] bg-white px-4 py-2.5 text-xs text-[#1D222D] focus:border-[#2687E8] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1">Qualifications & Requirements (One bullet per line) *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Strong Python programming skills&#10;Familiarity with PyTorch / Transformers&#10;Hands-on Git experience..."
                    value={jobForm.qualifications}
                    onChange={(e) => setJobForm({ ...jobForm, qualifications: e.target.value })}
                    className="w-full rounded-xl border border-[#D8EAF1] bg-white px-4 py-2.5 text-xs text-[#1D222D] focus:border-[#2687E8] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1">Tech Stack & Tools (Comma separated) *</label>
                  <input
                    type="text"
                    required
                    placeholder="Python, PyTorch, LLMs, LangChain, FastAPI, Docker"
                    value={jobForm.skills}
                    onChange={(e) => setJobForm({ ...jobForm, skills: e.target.value })}
                    className="w-full rounded-xl border border-[#D8EAF1] bg-white px-4 py-2.5 text-xs text-[#1D222D] focus:border-[#2687E8] focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#D8EAF1]">
                  <button
                    type="button"
                    onClick={() => setShowJobModal(false)}
                    className="rounded-full px-5 py-2.5 text-xs font-bold text-[#526579] border border-[#D8EAF1] hover:bg-[#F5FBFD]"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={jobFormSubmitting}
                    className="gradient-pill-btn rounded-full px-7 py-2.5 text-xs font-bold text-white shadow-md hover:shadow-lg"
                  >
                    {jobFormSubmitting ? "Publishing..." : editingRoleId ? "Save Changes" : "Publish Job Opening"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── CANDIDATE DETAILS MODAL ─── */}
      <AnimatePresence>
        {selectedCandidate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-3xl rounded-3xl border border-[#D8EAF1] bg-white p-6 sm:p-8 shadow-2xl my-8 max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D8EAF1] pb-5 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="rounded-full bg-[#EDF8FB] px-3 py-0.5 text-[10px] font-extrabold uppercase text-[#2687E8]">
                      {selectedCandidate.dept}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold">
                      Submitted on {new Date(selectedCandidate.submittedAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <h2 className="text-2xl font-black text-[#1D222D]">{selectedCandidate.fullName}</h2>
                  <p className="text-sm font-bold text-[#2687E8]">{selectedCandidate.roleTitle}</p>
                </div>

                <div className="flex items-center gap-3">
                  <select
                    value={selectedCandidate.status}
                    onChange={(e) => {
                      const newStatus = e.target.value as Application["status"];
                      updateAppStatus(selectedCandidate.id, newStatus);
                      setSelectedCandidate({ ...selectedCandidate, status: newStatus });
                    }}
                    className={`rounded-xl border px-3.5 py-2 text-xs font-extrabold focus:outline-none ${
                      selectedCandidate.status === "New"
                        ? "bg-emerald-50 text-emerald-600 border-emerald-300"
                        : selectedCandidate.status === "Shortlisted"
                        ? "bg-[#007BFF] text-white border-[#2687E8]"
                        : selectedCandidate.status === "Reviewing"
                        ? "bg-amber-50 text-amber-600 border-amber-300"
                        : "bg-rose-50 text-rose-600 border-rose-300"
                    }`}
                  >
                    <option value="New">Status: New</option>
                    <option value="Reviewing">Status: Under Review</option>
                    <option value="Shortlisted">Status: Accepted / Shortlisted ★</option>
                    <option value="Rejected">Status: Rejected</option>
                  </select>

                  <button
                    onClick={() => setSelectedCandidate(null)}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="space-y-6 text-xs text-[#1D222D]">
                {/* Contact & Academic Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-2xl bg-[#F5FBFD] p-5 border border-[#D8EAF1]">
                  <div>
                    <h4 className="font-extrabold uppercase text-[#2687E8] text-[10px] tracking-wider mb-2">Contact Info</h4>
                    <p className="py-0.5"><strong>Email:</strong> <a href={`mailto:${selectedCandidate.email}`} className="text-[#2687E8] underline font-semibold">{selectedCandidate.email}</a></p>
                    <p className="py-0.5"><strong>Phone / WhatsApp:</strong> {selectedCandidate.phone}</p>
                    <p className="py-0.5"><strong>Location:</strong> {selectedCandidate.location}</p>
                  </div>

                  <div>
                    <h4 className="font-extrabold uppercase text-[#2687E8] text-[10px] tracking-wider mb-2">Academic Profile</h4>
                    <p className="py-0.5"><strong>University:</strong> {selectedCandidate.university}</p>
                    <p className="py-0.5"><strong>Degree:</strong> {selectedCandidate.degree}</p>
                    <p className="py-0.5"><strong>Graduation Year:</strong> {selectedCandidate.gradYear}</p>
                  </div>
                </div>

                {/* Availability & Work Terms */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 rounded-2xl bg-[#F5FBFD] p-5 border border-[#D8EAF1]">
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Available Start</span>
                    <p className="font-bold text-[#1D222D]">{selectedCandidate.startDate || "Immediate"}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Commitment</span>
                    <p className="font-bold text-[#1D222D]">{selectedCandidate.commitment}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Remote Comfort</span>
                    <p className="font-bold text-[#1D222D]">{selectedCandidate.remotePreference}</p>
                  </div>
                </div>

                {/* Portfolios & Online Links */}
                <div className="space-y-2">
                  <h4 className="font-extrabold uppercase text-[#2687E8] text-[10px] tracking-wider">Candidate Links & Attachments</h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedCandidate.github && (
                      <a
                        href={selectedCandidate.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-[#D8EAF1] bg-white px-4 py-2 text-xs font-bold text-[#1D222D] hover:border-[#2687E8] shadow-xs"
                      >
                        <Github className="h-4 w-4 text-[#2687E8]" /> GitHub Profile <ExternalLink className="h-3 w-3" />
                      </a>
                    )}

                    {selectedCandidate.linkedin && (
                      <a
                        href={selectedCandidate.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-[#D8EAF1] bg-white px-4 py-2 text-xs font-bold text-[#1D222D] hover:border-[#2687E8] shadow-xs"
                      >
                        <Linkedin className="h-4 w-4 text-[#2687E8]" /> LinkedIn Profile <ExternalLink className="h-3 w-3" />
                      </a>
                    )}

                    {selectedCandidate.portfolio && (
                      <a
                        href={selectedCandidate.portfolio}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-[#D8EAF1] bg-white px-4 py-2 text-xs font-bold text-[#1D222D] hover:border-[#2687E8] shadow-xs"
                      >
                        <Globe className="h-4 w-4 text-[#2687E8]" /> Portfolio / Demo Website <ExternalLink className="h-3 w-3" />
                      </a>
                    )}

                    {selectedCandidate.resumeLink && (
                      <a
                        href={selectedCandidate.resumeLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-700 hover:bg-emerald-100 shadow-xs"
                      >
                        <FileText className="h-4 w-4" /> Open Cloud Resume Link <ExternalLink className="h-3 w-3" />
                      </a>
                    )}

                    {selectedCandidate.fileName && (
                      <span className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-bold text-[#2687E8]">
                        📁 Attached File: {selectedCandidate.fileName} ({selectedCandidate.fileSize})
                      </span>
                    )}
                  </div>
                </div>

                {/* Candidate Statements */}
                <div className="space-y-4 pt-2">
                  <div>
                    <h4 className="font-extrabold uppercase text-[#2687E8] text-[10px] tracking-wider mb-1">
                      Projects & Achievements Overview
                    </h4>
                    <p className="bg-[#F5FBFD] p-4 rounded-2xl border border-[#D8EAF1] text-xs leading-relaxed whitespace-pre-wrap">
                      {selectedCandidate.projectsOverview}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-extrabold uppercase text-[#2687E8] text-[10px] tracking-wider mb-1">
                      Why KalpKrafts
                    </h4>
                    <p className="bg-[#F5FBFD] p-4 rounded-2xl border border-[#D8EAF1] text-xs leading-relaxed whitespace-pre-wrap">
                      {selectedCandidate.whyKalpKrafts}
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Footer Quick Actions */}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-3 pt-5 border-t border-[#D8EAF1]">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      updateAppStatus(selectedCandidate.id, "Reviewing");
                      setSelectedCandidate({ ...selectedCandidate, status: "Reviewing" });
                    }}
                    className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-2 text-xs font-bold text-amber-700 hover:bg-amber-100"
                  >
                    Move to Under Review
                  </button>

                  <button
                    onClick={() => {
                      updateAppStatus(selectedCandidate.id, "Shortlisted");
                      setSelectedCandidate({ ...selectedCandidate, status: "Shortlisted" });
                    }}
                    className="rounded-xl bg-[#007BFF] px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-[#0056b3]"
                  >
                    Shortlist Candidate ★
                  </button>

                  <button
                    onClick={() => {
                      updateAppStatus(selectedCandidate.id, "Rejected");
                      setSelectedCandidate({ ...selectedCandidate, status: "Rejected" });
                    }}
                    className="rounded-xl border border-rose-300 bg-rose-50 px-4 py-2 text-xs font-bold text-rose-700 hover:bg-rose-100"
                  >
                    Reject Application
                  </button>
                </div>

                <button
                  onClick={() => setSelectedCandidate(null)}
                  className="rounded-xl border border-[#D8EAF1] bg-white px-5 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Close Window
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
