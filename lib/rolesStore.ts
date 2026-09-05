import fs from "fs";
import path from "path";

export interface Role {
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

const DATA_DIR = path.join(process.cwd(), "data");
const ROLES_FILE = path.join(DATA_DIR, "roles.json");

const SEEDED_ROLES: Role[] = [
  {
    id: "ai-engineer-intern",
    title: "AI Engineer Intern",
    dept: "AI Research & Engineering",
    type: "Internship / Full-Time Contributor",
    location: "Remote-Friendly / Bengaluru",
    exp: "Students & Freshers",
    desc: "Build, evaluate, and fine-tune large language models and multi-agent AI systems powering interactive educational mentors.",
    aboutKalpKrafts: "KalpKrafts is an AI-first EdTech research startup building high-performance foundation intelligence models (Veda, Pragati, Dhruva) to revolutionize education across India.",
    aboutRole: "As an AI Engineer Intern, you will work directly with our core AI engineering team on prompt architecture, fine-tuning open-source LLMs (Llama 3, Mistral, Qwen), building RAG pipelines, and deploying low-latency AI microservices.",
    responsibilities: [
      "Design and deploy production Retrieval-Augmented Generation (RAG) workflows using vector databases (Qdrant / Milvus / Pinecone).",
      "Benchmark, evaluate, and fine-tune open-weights LLMs for specialized domain knowledge in STEM & regional Indian languages.",
      "Integrate LLM streaming endpoints into Next.js/Python backends using LangChain, LlamaIndex, or native API calls.",
      "Implement structured evaluation matrices for hallucinations, response accuracy, and latency optimizations."
    ],
    qualifications: [
      "Strong proficiency in Python, PyTorch / Transformers, and RESTful/gRPC API development.",
      "Hands-on experience with LLM orchestration (LangChain, LlamaIndex, LiteLLM) and vector search engines.",
      "Familiarity with Git, Linux environments, and Docker containerization."
    ],
    skills: ["Python", "PyTorch", "LLMs", "RAG", "Vector DBs", "LangChain", "FastAPI", "Docker"],
    active: true,
    postedAt: "2026-07-28"
  },
  {
    id: "ai-research-intern",
    title: "AI Research Intern",
    dept: "AI Research & Engineering",
    type: "Internship / Research Fellowship",
    location: "Remote-Friendly",
    exp: "Students & Researchers",
    desc: "Conduct applied research on multi-agent reasoning, cognitive learning models, and automated curriculum generation.",
    aboutKalpKrafts: "KalpKrafts conducts cutting-edge research at the intersection of cognitive science, LLM reasoning, and adaptive pedagogy.",
    aboutRole: "Join our research lab to experiment with novelty-driven agentic architectures, tree-of-thought prompt reasoning, and automated assessment scoring.",
    responsibilities: [
      "Investigate novel agentic reasoning framework benchmarks for step-by-step problem solving.",
      "Publish technical research findings and open-source benchmarks.",
      "Collaborate on dataset curation, synthetic data generation, and RLHF alignment strategies."
    ],
    qualifications: [
      "Solid mathematical foundation in linear algebra, probability, and deep learning.",
      "Demonstrated experience reading and implementing ML research papers in PyTorch.",
      "Strong writing skills for technical reports and academic papers."
    ],
    skills: ["PyTorch", "Deep Learning", "RLHF", "Synthetic Data", "Paper Reproduction", "Python"],
    active: true,
    postedAt: "2026-07-28"
  },
  {
    id: "fullstack-dev-intern",
    title: "Full Stack Developer Intern",
    dept: "Platform Engineering",
    type: "Internship",
    location: "Remote-Friendly",
    exp: "Students & Freshers",
    desc: "Develop modern web applications, high-throughput REST/GraphQL APIs, and real-time interactive learning dashboards.",
    aboutKalpKrafts: "Our platform engineering team builds the scalable web infrastructure powering KalpKrafts products used by schools and students across India.",
    aboutRole: "You will build user-facing Next.js features, connect database schemas (PostgreSQL / Redis), and optimize real-time WebSockets for collaborative learning.",
    responsibilities: [
      "Develop responsive front-end components using React, Next.js, and TailwindCSS.",
      "Build secure RESTful microservices and WebSockets in Node.js / Python.",
      "Write unit/integration tests and manage deployment pipelines on Vercel & AWS."
    ],
    qualifications: [
      "Proficiency in TypeScript, React, Next.js, and Node.js.",
      "Understanding of relational databases (PostgreSQL/MySQL) and ORMs (Prisma/Drizzle).",
      "Good understanding of web performance, caching, and state management."
    ],
    skills: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "TailwindCSS", "AWS"],
    active: true,
    postedAt: "2026-07-28"
  },
  {
    id: "backend-dev-intern",
    title: "Backend Developer Intern",
    dept: "Platform Engineering",
    type: "Internship",
    location: "Remote-Friendly",
    exp: "Students & Freshers",
    desc: "Design scalable microservices, manage PostgreSQL/Redis databases, and optimize real-time streaming data pipelines.",
    aboutKalpKrafts: "KalpKrafts backend infrastructure handles multi-tenant school network traffic, real-time telemetry, and LLM inference streaming.",
    aboutRole: "You will work on backend service architecture, cache invalidation strategies, database indexing, and async task processing.",
    responsibilities: [
      "Implement REST and gRPC API endpoints in Python (FastAPI) or Node.js.",
      "Manage PostgreSQL migrations, query optimization, and Redis caching layers.",
      "Set up Celery/RabbitMQ async task queues for heavy AI processing jobs.",
      "Write comprehensive API documentation and integration tests."
    ],
    qualifications: [
      "Solid knowledge of Node.js or Python, relational databases, and REST standards.",
      "Familiarity with Docker, Redis, and database normalization.",
      "Strong algorithmic problem-solving ability."
    ],
    skills: ["Node.js", "FastAPI", "PostgreSQL", "Redis", "Docker", "TypeScript", "REST APIs"],
    active: true,
    postedAt: "2026-07-28"
  },
  {
    id: "frontend-intern",
    title: "Frontend Developer Intern",
    dept: "Platform Engineering",
    type: "Internship",
    location: "Remote-Friendly",
    exp: "Students & Freshers",
    desc: "Craft pixel-perfect, accessible, and ultra-fast web user interfaces using Next.js, TailwindCSS, and Framer Motion.",
    aboutKalpKrafts: "KalpKrafts prioritizes visual excellence and smooth user experience across all web applications.",
    aboutRole: "You will work alongside UI designers to transform wireframes into interactive, production-ready React web components.",
    responsibilities: [
      "Implement responsive web layouts using React, Next.js, and TailwindCSS.",
      "Add subtle micro-animations and page transitions with Framer Motion.",
      "Ensure web accessibility (WCAG) compliance and cross-browser consistency.",
      "Optimize bundle size, image rendering, and Core Web Vitals performance."
    ],
    qualifications: [
      "Strong command of HTML5, CSS3, JavaScript (ES6+), and TypeScript.",
      "Hands-on experience with React / Next.js and utility-first CSS.",
      "Attention to design detail, micro-interactions, and smooth UI flow."
    ],
    skills: ["React", "Next.js", "TypeScript", "TailwindCSS", "Framer Motion", "HTML/CSS"],
    active: true,
    postedAt: "2026-07-28"
  },
  {
    id: "ui-ux-designer-intern",
    title: "UI/UX Designer Intern",
    dept: "Design & Creative",
    type: "Internship",
    location: "Remote-Friendly",
    exp: "Students & Freshers",
    desc: "Design intuitive user interfaces, design systems, and visual component libraries for AI education apps.",
    aboutKalpKrafts: "Our design team crafts elegant, clean, and delight-inducing visual experiences that make learning engaging.",
    aboutRole: "Work on design tokens, Figma component systems, student usability testing, and interactive prototype animations.",
    responsibilities: [
      "Design wireframes, high-fidelity UI mockups, and interactive Figma prototypes.",
      "Maintain and expand the KalpKrafts Design System component library.",
      "Conduct user research and usability testing with students and educators."
    ],
    qualifications: [
      "Proficiency in Figma, auto-layout, design systems, and typography.",
      "Strong portfolio demonstrating UI visual polish and UX problem-solving.",
      "Basic understanding of HTML/CSS web layout constraints."
    ],
    skills: ["Figma", "Design Systems", "UI Design", "UX Research", "Prototyping", "Typography"],
    active: true,
    postedAt: "2026-07-28"
  }
];

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(ROLES_FILE)) {
    fs.writeFileSync(ROLES_FILE, JSON.stringify(SEEDED_ROLES, null, 2), "utf-8");
  }
}

export function getAllRoles(): Role[] {
  try {
    ensureDataFile();
    const fileData = fs.readFileSync(ROLES_FILE, "utf-8");
    return JSON.parse(fileData);
  } catch (err) {
    console.error("Error reading roles file:", err);
    return SEEDED_ROLES;
  }
}

export function getActiveRoles(): Role[] {
  return getAllRoles().filter((r) => r.active !== false);
}

export function saveRoles(roles: Role[]) {
  try {
    ensureDataFile();
    fs.writeFileSync(ROLES_FILE, JSON.stringify(roles, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing roles file:", err);
  }
}

export function addRole(newRole: Omit<Role, "id" | "postedAt">): Role {
  const roles = getAllRoles();
  const id = newRole.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + "-" + Date.now().toString().slice(-4);
  const created: Role = {
    ...newRole,
    id,
    active: true,
    postedAt: new Date().toISOString().split("T")[0],
  };
  roles.unshift(created);
  saveRoles(roles);
  return created;
}

export function updateRole(id: string, updatedFields: Partial<Role>): Role | null {
  const roles = getAllRoles();
  const idx = roles.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  roles[idx] = { ...roles[idx], ...updatedFields };
  saveRoles(roles);
  return roles[idx];
}

export function deleteRole(id: string): boolean {
  let roles = getAllRoles();
  const initialLen = roles.length;
  roles = roles.filter((r) => r.id !== id);
  if (roles.length !== initialLen) {
    saveRoles(roles);
    return true;
  }
  return false;
}
