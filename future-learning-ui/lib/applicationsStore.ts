import fs from "fs";
import path from "path";

export interface CandidateApplication {
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

export interface ContactInquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  submittedAt: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const APPLICATIONS_FILE = path.join(DATA_DIR, "applications.json");
const INQUIRIES_FILE = path.join(DATA_DIR, "inquiries.json");

function ensureFiles() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(APPLICATIONS_FILE)) {
    fs.writeFileSync(APPLICATIONS_FILE, JSON.stringify([], null, 2), "utf-8");
  }
  if (!fs.existsSync(INQUIRIES_FILE)) {
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify([], null, 2), "utf-8");
  }
}

export function getApplications(): CandidateApplication[] {
  try {
    ensureFiles();
    const data = fs.readFileSync(APPLICATIONS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading applications:", err);
    return [];
  }
}

export function saveApplication(appData: Omit<CandidateApplication, "id" | "status" | "submittedAt">): CandidateApplication {
  const apps = getApplications();
  const newApp: CandidateApplication = {
    ...appData,
    id: "app-" + Date.now().toString() + "-" + Math.floor(Math.random() * 1000).toString(),
    status: "New",
    submittedAt: new Date().toISOString(),
  };
  apps.unshift(newApp);
  try {
    ensureFiles();
    fs.writeFileSync(APPLICATIONS_FILE, JSON.stringify(apps, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing application:", err);
  }
  return newApp;
}

export function updateApplicationStatus(id: string, status: CandidateApplication["status"]): boolean {
  const apps = getApplications();
  const idx = apps.findIndex((a) => a.id === id);
  if (idx !== -1) {
    apps[idx].status = status;
    fs.writeFileSync(APPLICATIONS_FILE, JSON.stringify(apps, null, 2), "utf-8");
    return true;
  }
  return false;
}

export function getInquiries(): ContactInquiry[] {
  try {
    ensureFiles();
    const data = fs.readFileSync(INQUIRIES_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading inquiries:", err);
    return [];
  }
}

export function saveInquiry(inquiryData: Omit<ContactInquiry, "id" | "submittedAt">): ContactInquiry {
  const inquiries = getInquiries();
  const newInquiry: ContactInquiry = {
    ...inquiryData,
    id: "inq-" + Date.now().toString(),
    submittedAt: new Date().toISOString(),
  };
  inquiries.unshift(newInquiry);
  try {
    ensureFiles();
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing inquiry:", err);
  }
  return newInquiry;
}
