"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import HalftoneReveal from "@/components/HalftoneReveal";
import WarpText from "@/components/WarpText";
import MagicBento from "@/components/MagicBento";
import BorderGlow from "@/components/BorderGlow";
import {
  ArrowRight,
  ArrowLeft,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  Send,
  ChevronLeft,
  Building,
  GraduationCap,
  Brain,
  Search,
  Filter,
  UploadCloud,
  FileText,
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
}

const openRoles: Role[] = [
  // ─── 1. AI RESEARCH & ENGINEERING ───
  {
    id: "ai-engineer-intern",
    title: "AI Engineer Intern",
    dept: "AI Research & Engineering",
    type: "Internship / Contributor",
    location: "Remote / Hybrid",
    exp: "Students & Freshers",
    desc: "Deploy RAG architectures, LLM reasoning pipelines, and real-time streaming AI agents powering KalpKrafts' educational suite.",
    aboutKalpKrafts: "KalpKrafts is an AI-first EdTech company building foundational intelligence, voice reasoning companions, and institutional infrastructure for modern education in India.",
    aboutRole: "As an AI Engineer Intern, you will work on productionizing LLMs, building Retrieval-Augmented Generation (RAG) pipelines, and integrating real-time AI capabilities into student and institutional workflows.",
    responsibilities: [
      "Design and optimize Retrieval-Augmented Generation (RAG) pipelines using LangChain, LlamaIndex, and Vector DBs.",
      "Integrate fine-tuned open-source LLMs (Llama 3, Qwen, Mistral) into high-throughput API endpoints.",
      "Benchmark response latency, prompt topology, and token streaming performance.",
      "Collaborate with backend engineers to connect vector databases with PostgreSQL relational stores."
    ],
    qualifications: [
      "Strong proficiency in Python, PyTorch, Hugging Face, or LLM orchestration tools.",
      "Understanding of vector embeddings, semantic search, and prompt engineering.",
      "Passion for building AI systems that solve real educational challenges."
    ],
    skills: ["Python", "LangChain", "RAG", "Vector DBs", "PyTorch", "FastAPI", "LLMs"]
  },
  {
    id: "ai-research-intern",
    title: "AI Research Intern",
    dept: "AI Research & Engineering",
    type: "Internship / Research Fellow",
    location: "Remote-Friendly",
    exp: "Students & Researchers",
    desc: "Conduct exploratory research on student cognitive load modeling, knowledge graphs, and personalized adaptive tutoring.",
    aboutKalpKrafts: "KalpKrafts conducts research at the intersection of cognitive science and generative artificial intelligence.",
    aboutRole: "As an AI Research Intern, you will formulate and evaluate novel learning algorithms, construct domain knowledge graphs, and co-author research whitepapers alongside our founders.",
    responsibilities: [
      "Investigate cognitive load modeling algorithms and adaptive assessment frameworks.",
      "Construct multi-relational knowledge graphs for STEM concepts and prerequisite dependencies.",
      "Evaluate model hallucination rates and safety guardrails in educational Q&A context.",
      "Prepare whitepapers and technical blog posts summarizing experimental findings."
    ],
    qualifications: [
      "Background or active studies in Computer Science, AI, or Data Science.",
      "Experience with Python data science stacks (NumPy, Pandas, PyTorch).",
      "Analytical rigor and enthusiasm for academic research."
    ],
    skills: ["AI Research", "Knowledge Graphs", "Python", "Cognitive Modeling", "PyTorch", "Whitepapers"]
  },
  {
    id: "ml-intern",
    title: "Machine Learning Intern",
    dept: "AI Research & Engineering",
    type: "Internship",
    location: "Remote / Hybrid",
    exp: "Students & Freshers",
    desc: "Train, evaluate, and compress machine learning models for predictive learning analytics and speech-to-text student assessment.",
    aboutKalpKrafts: "KalpKrafts leverages specialized ML models to analyze student telemetry and provide instant diagnostic feedback.",
    aboutRole: "You will prepare training datasets, train classification & regression models, and optimize ML model quantizations for edge and cloud deployment.",
    responsibilities: [
      "Clean, annotate, and augment tabular and audio datasets for machine learning pipelines.",
      "Train classification and sequence-to-sequence models for student performance prediction.",
      "Apply model quantization (ONNX / TensorRT) to reduce inference latency.",
      "Monitor model drift and retrain pipelines using automated telemetry."
    ],
    qualifications: [
      "Proficiency in Python, Scikit-Learn, PyTorch or TensorFlow.",
      "Familiarity with data preprocessing, feature engineering, and model evaluation metrics.",
      "Solid foundation in linear algebra, statistics, and probability."
    ],
    skills: ["Machine Learning", "Python", "PyTorch", "Scikit-Learn", "ONNX", "Data Engineering"]
  },

  // ─── 2. PLATFORM ENGINEERING ───
  {
    id: "fullstack-intern",
    title: "Full Stack Developer Intern",
    dept: "Platform Engineering",
    type: "Internship / Contributor",
    location: "Remote / Hybrid",
    exp: "Students & Freshers",
    desc: "Build responsive Next.js frontend interfaces and high-throughput Node.js microservices for institutional platforms.",
    aboutKalpKrafts: "KalpKrafts builds high-speed, interactive web platforms used by thousands of students, teachers, and school administrators.",
    aboutRole: "As a Full Stack Intern, you will build end-to-end features across Next.js 15, Node.js microservices, PostgreSQL, and REST/WebSocket APIs.",
    responsibilities: [
      "Develop responsive UI components in Next.js, React, and TailwindCSS with Framer Motion animations.",
      "Architect RESTful and WebSocket API endpoints in Node.js / TypeScript.",
      "Design database schemas and optimize query performance in PostgreSQL / Prisma.",
      "Participate in code reviews, unit testing, and continuous integration workflows."
    ],
    qualifications: [
      "Proficiency in React, Next.js, TypeScript, and Node.js.",
      "Understanding of state management, database ORMs, and Git workflows.",
      "Eye for clean visual layout and sub-second web performance."
    ],
    skills: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "TailwindCSS", "Prisma"]
  },
  {
    id: "backend-intern",
    title: "Backend Developer Intern",
    dept: "Platform Engineering",
    type: "Internship",
    location: "Remote / Hybrid",
    exp: "Students & Freshers",
    desc: "Architect low-latency API gateways, authentication services, and scalable database architecture for institutional ERP.",
    aboutKalpKrafts: "KalpKrafts' backend infrastructure handles real-time student interaction telemetry, assessment scoring, and institutional data.",
    aboutRole: "You will build robust server-side microservices, implement JWT/OAuth authentication, and optimize database indexing and caching.",
    responsibilities: [
      "Design and deploy scalable microservices in Node.js / Express or Python / FastAPI.",
      "Implement secure authentication, role-based access control (RBAC), and rate limiting.",
      "Optimize SQL query execution plans and Redis caching strategies.",
      "Write comprehensive API documentation (Swagger/OpenAPI) and integration tests."
    ],
    qualifications: [
      "Solid knowledge of Node.js or Python, relational databases, and REST standards.",
      "Familiarity with Docker, Redis, and database normalization.",
      "Strong algorithmic problem-solving ability."
    ],
    skills: ["Node.js", "FastAPI", "PostgreSQL", "Redis", "Docker", "TypeScript", "REST APIs"]
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
    aboutRole: "You will work alongside UI designers to transform Figma wireframes into interactive, production-ready React web components.",
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
    skills: ["React", "Next.js", "TypeScript", "TailwindCSS", "Framer Motion", "HTML/CSS"]
  },

  // ─── 3. PRODUCT ENGINEERING ───
  {
    id: "mobile-dev-intern",
    title: "Mobile App Developer Intern",
    dept: "Product Engineering",
    type: "Internship",
    location: "Remote-Friendly",
    exp: "Students & Freshers",
    desc: "Build cross-platform Flutter / React Native mobile applications for offline-first learning and AI student companion apps.",
    aboutKalpKrafts: "KalpKrafts mobile tools enable students across India to access AI learning companions anywhere, even in low-bandwidth regions.",
    aboutRole: "As a Mobile App Intern, you will build native and cross-platform mobile apps featuring offline caching, push notifications, and AI audio streaming.",
    responsibilities: [
      "Develop mobile application features in React Native or Flutter.",
      "Integrate local SQLite storage for offline learning access and sync.",
      "Implement real-time audio playback, voice recording, and push notifications.",
      "Test app builds on Android & iOS devices for responsiveness and battery efficiency."
    ],
    qualifications: [
      "Experience with React Native, Flutter, or native Android (Kotlin) / iOS (Swift).",
      "Knowledge of REST API integration and mobile state management.",
      "Enthusiasm for building mobile apps that impact millions of students."
    ],
    skills: ["React Native", "Flutter", "TypeScript", "Mobile UI", "SQLite", "REST APIs"]
  },
  {
    id: "threejs-dev-intern",
    title: "Three.js / WebGL Developer Intern",
    dept: "Product Engineering",
    type: "Internship / Contributor",
    location: "Remote-Friendly",
    exp: "Students & Freshers",
    desc: "Create interactive 3D learning simulations, virtual robotics labs, and WebGL visualizations in the browser.",
    aboutKalpKrafts: "KalpKrafts builds immersive 3D simulation tools (like Dhruva R&D Lab) to allow students to experiment with virtual lab gear.",
    aboutRole: "You will build interactive 3D WebGL scenes, custom shader materials, and physics-driven interactive models using Three.js and React Three Fiber.",
    responsibilities: [
      "Build 3D interactive models and WebGL canvas scenes using Three.js / React Three Fiber.",
      "Optimize 3D mesh geometry, textures, and draw calls for 60 FPS browser rendering.",
      "Implement camera controls, raycasting interaction, and light reflection shaders.",
      "Collaborate with 3D artists to import GLTF/GLB models and animations."
    ],
    qualifications: [
      "Knowledge of JavaScript/TypeScript, WebGL concepts, and 3D graphics math.",
      "Experience with Three.js, React Three Fiber, or Babylon.js.",
      "Passion for 3D web graphics, physics engines, and visual storytelling."
    ],
    skills: ["Three.js", "React Three Fiber", "WebGL", "GLSL Shaders", "TypeScript", "Blender/GLTF"]
  },
  {
    id: "iot-dev-intern",
    title: "IoT & Hardware AI Integration Intern",
    dept: "Product Engineering",
    type: "Internship / Contributor",
    location: "Remote / Hybrid",
    exp: "Students & Freshers",
    desc: "Interface embedded microcontrollers (ESP32 / Raspberry Pi) with KalpKrafts AI servers for hardware robotics labs.",
    aboutKalpKrafts: "KalpKrafts bridges software AI intelligence with real-world physical engineering labs and hardware kits.",
    aboutRole: "You will program microcontrollers, set up MQTT/WebSocket telemetry streams, and connect hardware sensor feeds to our cloud AI scoring engines.",
    responsibilities: [
      "Write embedded C++/Python firmware for ESP32 and Raspberry Pi microcontrollers.",
      "Implement MQTT and WebSocket protocols for low-latency hardware sensor telemetry.",
      "Interface sensors (ultrasonic, IMU, camera) with local AI edge processing.",
      "Build diagnostic dashboards for monitoring connected hardware devices."
    ],
    qualifications: [
      "Background in Electronics, Computer Engineering, or Mechatronics.",
      "Proficiency in Embedded C/C++ or MicroPython.",
      "Understanding of hardware protocols (I2C, SPI, UART, MQTT)."
    ],
    skills: ["Embedded C++", "ESP32", "Raspberry Pi", "MQTT", "Python", "IoT Systems"]
  },

  // ─── 4. DESIGN & CREATIVE ───
  {
    id: "uiux-designer",
    title: "UI/UX Designer",
    dept: "Design & Creative",
    type: "Internship / Contributor",
    location: "Remote-Friendly",
    exp: "Students & Freshers",
    desc: "Craft modern Figma design tokens, user experience flows, and glassmorphism interface components for KalpKrafts' platforms.",
    aboutKalpKrafts: "KalpKrafts combines cutting-edge AI technology with state-of-the-art visual design to build interfaces users love.",
    aboutRole: "As a UI/UX Designer, you will create high-fidelity UI mockups, interactive Figma prototypes, and user journey maps for web and mobile platforms.",
    responsibilities: [
      "Design clean, intuitive user interfaces in Figma following KalpKrafts' visual brand guidelines.",
      "Create interactive motion prototypes, wireframes, and component design systems.",
      "Conduct user testing sessions and gather feedback to refine interface usability.",
      "Collaborate closely with frontend engineers to ensure design precision in code."
    ],
    qualifications: [
      "Proficiency in Figma, layout composition, typography, and color harmony.",
      "Strong portfolio showcasing web/mobile UI design concepts.",
      "Eye for modern design aesthetics, micro-animations, and visual balance."
    ],
    skills: ["Figma", "UI/UX Design", "Wireframing", "Prototyping", "Design Systems", "User Research"]
  },
  {
    id: "graphic-designer",
    title: "Graphic Designer",
    dept: "Design & Creative",
    type: "Internship",
    location: "Remote-Friendly",
    exp: "Students & Freshers",
    desc: "Produce compelling brand artwork, social media graphics, editorial illustrations, and marketing assets.",
    aboutKalpKrafts: "KalpKrafts' brand represents scientific innovation, modern education, and high aesthetic elegance.",
    aboutRole: "You will design vector illustrations, presentation decks, social media visual assets, and brand media that showcase KalpKrafts to institutions.",
    responsibilities: [
      "Design vector visual assets, hero banners, and infographics in Illustrator / Photoshop / Figma.",
      "Craft visually stunning pitch decks, whitepaper covers, and educational media.",
      "Maintain visual brand consistency across digital platforms and print collateral.",
      "Create motion graphics and short promotional video animations."
    ],
    qualifications: [
      "Proficiency in Adobe Illustrator, Photoshop, Figma, or After Effects.",
      "Creative eye for typography, visual hierarchy, and brand storytelling.",
      "Portfolio displaying graphic design, branding, or illustration work."
    ],
    skills: ["Adobe Illustrator", "Figma", "Photoshop", "Graphic Design", "Branding", "Vector Art"]
  },

  // ─── 5. PRODUCT & LEARNING ───
  {
    id: "product-manager-intern",
    title: "Product Management Intern",
    dept: "Product & Learning",
    type: "Internship",
    location: "Remote-Friendly",
    exp: "Students & Freshers",
    desc: "Define product feature specifications, user stories, and feature prioritization roadmaps for Veda and Pragati platforms.",
    aboutKalpKrafts: "KalpKrafts builds institutional AI tools that solve real operational and pedagogical bottlenecks for schools and universities.",
    aboutRole: "As a Product Management Intern, you will analyze user feedback, write technical feature specs, track product usage metrics, and coordinate sprint delivery.",
    responsibilities: [
      "Translate user feedback and institutional requests into detailed product specifications (PRDs).",
      "Prioritize sprint backlogs and coordinate delivery timelines with engineering squads.",
      "Analyze platform analytics (Mixpanel / PostHog) to measure feature adoption.",
      "Conduct competitive analysis and present product enhancement proposals."
    ],
    qualifications: [
      "Strong analytical thinking, organizational skills, and communication ability.",
      "Interest in EdTech, AI products, and software product management.",
      "Familiarity with Agile tools (Jira, Notion, Trello, Figma)."
    ],
    skills: ["Product Management", "PRDs", "User Stories", "Analytics", "Agile", "Roadmapping"]
  },
  {
    id: "instructional-content-intern",
    title: "Instructional Content Intern",
    dept: "Product & Learning",
    type: "Internship / Contributor",
    location: "Remote-Friendly",
    exp: "Open to All",
    desc: "Develop adaptive STEM learning modules, problem rubrics, and educational content for Veda AI tutoring engines.",
    aboutKalpKrafts: "KalpKrafts' AI tutoring engine (Veda) requires accurately structured STEM curriculum, step-by-step solutions, and diagnostic question banks.",
    aboutRole: "You will author interactive STEM problem sets, review AI-generated lesson content for accuracy, and design cognitive learning path rubrics.",
    responsibilities: [
      "Author structured STEM question banks with detailed step-by-step solution logic.",
      "Audit and refine AI model generated explanations for factual and pedagogical accuracy.",
      "Define difficulty progression rubrics for adaptive diagnostic assessments.",
      "Collaborate with AI engineers to align prompt instructions with academic standards."
    ],
    qualifications: [
      "Strong background or academic studies in Mathematics, Physics, Chemistry, or CS.",
      "Excellent written communication skills and educational clarity.",
      "Passion for making complex STEM concepts easy for students to master."
    ],
    skills: ["Content Writing", "STEM Pedagogy", "Curriculum Design", "Problem Solving", "EdTech"]
  },

  // ─── 6. CLOUD INFRASTRUCTURE & SECURITY ───
  {
    id: "devops-intern",
    title: "Cloud & DevOps Intern",
    dept: "Cloud Infrastructure & Security",
    type: "Internship",
    location: "Remote-Friendly",
    exp: "Students & Freshers",
    desc: "Manage AWS/GCP cloud deployments, Kubernetes cluster orchestration, and automated CI/CD build pipelines.",
    aboutKalpKrafts: "KalpKrafts infrastructure runs high-availability cloud servers to deliver sub-second latency across India.",
    aboutRole: "As a Cloud & DevOps Intern, you will configure containerized deployments, set up automated CI/CD pipelines, and monitor server cluster health.",
    responsibilities: [
      "Configure Docker containerization and Kubernetes / ECS deployment manifests.",
      "Set up GitHub Actions CI/CD workflows for automated build, test, and deployment.",
      "Monitor server health, network latency, and uptime using Prometheus & Grafana.",
      "Manage cloud infrastructure provisioning using Terraform / AWS CDK."
    ],
    qualifications: [
      "Familiarity with Linux command line, Docker containers, and Git.",
      "Knowledge of cloud platforms (AWS, GCP, Vercel) and CI/CD concepts.",
      "Interest in infrastructure automation and site reliability engineering."
    ],
    skills: ["Docker", "AWS", "Kubernetes", "CI/CD", "Linux", "Terraform", "GitHub Actions"]
  },
  {
    id: "cybersecurity-intern",
    title: "Cybersecurity Intern",
    dept: "Cloud Infrastructure & Security",
    type: "Internship",
    location: "Remote-Friendly",
    exp: "Students & Freshers",
    desc: "Conduct vulnerability assessments, API security audits, and data privacy compliance verification for student data protection.",
    aboutKalpKrafts: "KalpKrafts protects sensitive student academic records and institutional telemetry with enterprise-grade security.",
    aboutRole: "You will perform web application penetration testing, audit API endpoints for OWASP Top 10 vulnerabilities, and enforce data encryption standard policies.",
    responsibilities: [
      "Perform web application vulnerability scans and API security assessments.",
      "Audit authentication mechanisms, JWT validation, and CORS policies.",
      "Review codebase dependencies for security advisories and CVE patches.",
      "Formulate data privacy compliance documentation and security best practices."
    ],
    qualifications: [
      "Understanding of web security fundamentals, OWASP Top 10, and cryptography basics.",
      "Familiarity with security testing tools (Burp Suite, OWASP ZAP, Nmap).",
      "Methodical cybersecurity mindset and passion for ethical hacking."
    ],
    skills: ["Cybersecurity", "OWASP Top 10", "Web Security", "Penetration Testing", "API Security", "Linux"]
  },

  // ─── 7. DATA & ANALYTICS ───
  {
    id: "data-science-intern",
    title: "Data Science Intern",
    dept: "Data & Analytics",
    type: "Internship",
    location: "Remote-Friendly",
    exp: "Students & Freshers",
    desc: "Analyze large-scale student learning telemetry, build predictive comprehension models, and design recommendation algorithms.",
    aboutKalpKrafts: "KalpKrafts leverages telemetry data to personalize learning paths and predict student concept mastery.",
    aboutRole: "As a Data Science Intern, you will clean student engagement datasets, build predictive statistical models, and generate actionable insights for institution dashboards.",
    responsibilities: [
      "Extract and clean telemetry data from PostgreSQL and data lake repositories.",
      "Build statistical models to measure concept retention velocity and burnout indicators.",
      "Design A/B testing frameworks to measure feature impact on student engagement.",
      "Create interactive data visualizations and executive insight reports."
    ],
    qualifications: [
      "Proficiency in Python, SQL, and data libraries (Pandas, NumPy, Scipy, Seaborn).",
      "Knowledge of probability, hypothesis testing, and statistical modeling.",
      "Ability to translate complex data findings into clear visual stories."
    ],
    skills: ["Python", "SQL", "Pandas", "Data Science", "Statistics", "Machine Learning", "Data Viz"]
  },
  {
    id: "data-analyst-intern",
    title: "Data Analyst Intern",
    dept: "Data & Analytics",
    type: "Internship",
    location: "Remote-Friendly",
    exp: "Students & Freshers",
    desc: "Create automated BI dashboards, track key product KPIs, and deliver institutional data reporting.",
    aboutKalpKrafts: "KalpKrafts empowers school administrators with real-time operational and academic analytics.",
    aboutRole: "You will write SQL queries, build business intelligence dashboards, and monitor core user metrics across Veda and Pragati.",
    responsibilities: [
      "Write complex SQL queries to generate daily/weekly user retention and usage reports.",
      "Build interactive dashboard visualizations in Metabase, Tableau, or Power BI.",
      "Track platform usage KPIs (DAU, MAU, session duration, completion rates).",
      "Assist in automated data pipeline testing and data hygiene validation."
    ],
    qualifications: [
      "Strong proficiency in SQL queries, joins, aggregations, and window functions.",
      "Experience with Excel/Google Sheets, Python, or BI dashboarding tools.",
      "Keen attention to data accuracy and detail."
    ],
    skills: ["SQL", "Data Analysis", "Metabase", "Excel", "Python", "Business Intelligence"]
  },

  // ─── 8. QUALITY ASSURANCE ───
  {
    id: "qa-testing-intern",
    title: "QA & Software Testing Intern",
    dept: "Quality Assurance",
    type: "Internship",
    location: "Remote-Friendly",
    exp: "Students & Freshers",
    desc: "Design end-to-end automated test suites, execute manual regression tests, and ensure bug-free releases for KalpKrafts products.",
    aboutKalpKrafts: "KalpKrafts insists on high platform reliability and flawless user experience across web and mobile platforms.",
    aboutRole: "As a QA & Software Testing Intern, you will author test plans, write automated Cypress/Playwright web tests, and track bug resolution in sprint backlogs.",
    responsibilities: [
      "Author detailed test plans, test cases, and edge-case testing matrices.",
      "Execute manual exploratory, functional, and regression testing across browsers.",
      "Write automated end-to-end (E2E) test scripts using Playwright or Cypress.",
      "Log, track, and verify bug fixes in collaboration with engineering squads."
    ],
    qualifications: [
      "Basic knowledge of web technologies (HTML, CSS, JavaScript) and testing methodologies.",
      "Familiarity with automated testing frameworks (Playwright, Cypress, or Selenium).",
      "Meticulous eye for detail and bug reproduction steps."
    ],
    skills: ["QA Testing", "Playwright", "Cypress", "Manual Testing", "Bug Tracking", "JavaScript"]
  },

  // ─── 9. GROWTH & COMMUNITY ───
  {
    id: "tech-content-writer",
    title: "Technical Content Writer",
    dept: "Growth & Community",
    type: "Internship / Contributor",
    location: "Remote-Friendly",
    exp: "Open to All",
    desc: "Author technical blog posts, AI engineering documentation, whitepaper summaries, and product announcement articles.",
    aboutKalpKrafts: "KalpKrafts shares its research advancements and engineering insights with the broader AI and EdTech community.",
    aboutRole: "You will work directly with our engineering founders to translate technical AI concepts into engaging blog posts, developer docs, and social posts.",
    responsibilities: [
      "Write high-quality technical blog posts explaining LLM fine-tuning, RAG architectures, and EdTech AI.",
      "Create clear developer documentation, API guides, and product onboarding tutorials.",
      "Craft engaging posts for LinkedIn and Twitter highlighting engineering milestones.",
      "Proofread whitepapers, case studies, and institutional partnership decks."
    ],
    qualifications: [
      "Exceptional technical writing ability in English.",
      "Ability to understand software engineering and AI concepts.",
      "Portfolio of written articles, blogs, or documentation samples."
    ],
    skills: ["Technical Writing", "Blogging", "Documentation", "Copywriting", "SEO", "Developer Relations"]
  },
  {
    id: "digital-marketing-intern",
    title: "Digital Marketing & Community Intern",
    dept: "Growth & Community",
    type: "Internship",
    location: "Remote-Friendly",
    exp: "Students & Freshers",
    desc: "Drive social media growth, execute digital outreach campaigns, and manage student builder community programs.",
    aboutKalpKrafts: "KalpKrafts fosters an active community of student builders, researchers, and institutional partners across India.",
    aboutRole: "You will create social media campaigns, engage with student developer communities, organize hackathons, and analyze marketing funnel metrics.",
    responsibilities: [
      "Plan and execute content campaigns on LinkedIn, Instagram, X/Twitter, and YouTube.",
      "Manage community channels (Discord/Telegram) and student builder programs.",
      "Coordinate student campus ambassador outreach and hackathon sponsorships.",
      "Track marketing analytics and campaign conversion metrics."
    ],
    qualifications: [
      "Strong communication, social media fluency, and creative writing skills.",
      "Enthusiasm for community building, hackathons, and EdTech growth.",
      "Basic graphic design or video editing ability is a plus."
    ],
    skills: ["Digital Marketing", "Social Media", "Community Management", "Growth", "Content Strategy"]
  },

  // ─── 10. BUSINESS OPERATIONS ───
  {
    id: "biz-dev-intern",
    title: "Business Development Intern",
    dept: "Business Operations",
    type: "Internship",
    location: "Remote / Hybrid",
    exp: "Students & Freshers",
    desc: "Engage school networks and higher-education institutions for Pragati ERP & Veda AI platform adoption.",
    aboutKalpKrafts: "KalpKrafts partners with K-12 school networks, engineering colleges, and universities across India to modernize their IT infrastructure.",
    aboutRole: "As a Business Development Intern, you will research institutional leads, prepare proposal presentations, and schedule pilot demo meetings with decision makers.",
    responsibilities: [
      "Identify and qualify target school networks, engineering colleges, and universities.",
      "Draft custom partnership emails, proposal decks, and ROI models.",
      "Schedule and assist founders during institutional product demo presentations.",
      "Maintain lead pipelines in CRM software and follow up on pilot agreements."
    ],
    qualifications: [
      "Excellent verbal and written communication skills in English and regional languages.",
      "Interest in B2B sales, institutional partnerships, and business strategy.",
      "Self-driven personality with strong follow-through mindset."
    ],
    skills: ["Business Development", "Institutional Sales", "Outreach", "CRM", "Presentations", "B2B"]
  },
  {
    id: "hr-talent-intern",
    title: "HR & Talent Acquisition Intern",
    dept: "Business Operations",
    type: "Internship",
    location: "Remote-Friendly",
    exp: "Students & Freshers",
    desc: "Source top student developer talent, manage contributor onboarding, and coordinate team culture initiatives.",
    aboutKalpKrafts: "KalpKrafts' success relies on attracting ambitious student engineers, researchers, and creators across India.",
    aboutRole: "You will manage candidate pipelines, schedule founder interview rounds, assist with student contributor onboarding, and foster team culture.",
    responsibilities: [
      "Source candidate profiles across LinkedIn, GitHub, and campus placement networks.",
      "Screen applications, schedule candidate interview rounds, and maintain ATS records.",
      "Assist with onboarding documentation, offer letters, and welcome packages.",
      "Organize virtual team building events and internal feedback surveys."
    ],
    qualifications: [
      "Strong interpersonal skills, empathy, and organizational knack.",
      "Interest in tech recruitment, talent acquisition, and HR management.",
      "Professional written and verbal communication."
    ],
    skills: ["Talent Acquisition", "HR Operations", "Recruitment", "Sourcing", "Communication", "Onboarding"]
  }
];

import SpecularButton from "@/components/SpecularButton";
import { ChevronDown as ChevronDownIcon } from "lucide-react";

function CustomSelect({
  value,
  onChange,
  options
}: {
  value: string;
  onChange: (val: string) => void;
  options: string[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full min-h-[44px] sm:min-h-0 items-center justify-between rounded-xl border border-[#D8EAF1] bg-[#F5FBFD] px-4 py-2.5 text-sm sm:text-xs text-[#1D222D] shadow-inner transition-all duration-300 hover:bg-white focus:border-[#2687E8] focus:bg-white focus:shadow-[0_0_0_4px_rgba(38,135,232,0.1)] focus:outline-none"
      >
        <span>{value}</span>
        <ChevronDownIcon className={`h-4 w-4 text-[#526579] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 top-full mt-2 z-50 max-h-60 overflow-y-auto rounded-xl border border-[#D8EAF1] bg-white shadow-[0_20px_40px_-10px_rgba(38,135,232,0.15)]"
          >
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt);
                  setIsOpen(false);
                }}
                className={`block w-full px-4 py-3 sm:py-2.5 text-left text-sm sm:text-xs transition-colors ${
                  value === opt 
                    ? "bg-[#F5FBFD] text-[#2687E8] font-bold" 
                    : "text-[#526579] hover:bg-[#F5FBFD] hover:text-[#1D222D]"
                }`}
              >
                {opt}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65 } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

export default function CareersPage() {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [expandedDepts, setExpandedDepts] = useState<Record<string, boolean>>({});
  const [dynamicRoles, setDynamicRoles] = useState<Role[]>(openRoles);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    fetch("/api/admin/roles?activeOnly=true")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.roles) && data.roles.length > 0) {
          setDynamicRoles(data.roles);
        }
      })
      .catch((err) => console.error("Error loading dynamic roles:", err));
  }, []);

  // Application Form State
  const [applyForm, setApplyForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    university: "",
    degree: "",
    gradYear: "2026",
    linkedin: "",
    github: "",
    portfolio: "",
    startDate: "",
    commitment: "Full-Time Internship (40 hrs/wk)",
    remotePreference: "Yes, fully comfortable remote",
    resumeFile: null as File | null,
    fileName: "",
    fileSize: "",
    resumeLink: "",
    projectsOverview: "",
    whyKalpKrafts: "",
    referralSource: "LinkedIn",
    agreeTerms: false,
  });
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const toggleDept = (dept: string) => {
    setExpandedDepts((prev) => ({ ...prev, [dept]: !prev[dept] }));
  };

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyForm.fullName || !applyForm.email) return;
    setLoading(true);

    try {
      const fd = new FormData();
      fd.append("fullName", applyForm.fullName);
      fd.append("email", applyForm.email);
      fd.append("phone", applyForm.phone);
      fd.append("location", applyForm.location);
      fd.append("university", applyForm.university);
      fd.append("degree", applyForm.degree);
      fd.append("gradYear", applyForm.gradYear);
      fd.append("github", applyForm.github);
      fd.append("linkedin", applyForm.linkedin);
      fd.append("portfolio", applyForm.portfolio);
      fd.append("startDate", applyForm.startDate);
      fd.append("commitment", applyForm.commitment);
      fd.append("remotePreference", applyForm.remotePreference);
      fd.append("resumeLink", applyForm.resumeLink);
      fd.append("projectsOverview", applyForm.projectsOverview);
      fd.append("whyKalpKrafts", applyForm.whyKalpKrafts);
      fd.append("referralSource", applyForm.referralSource);
      fd.append("roleTitle", selectedRole?.title || "General Role");
      fd.append("dept", selectedRole?.dept || "Engineering");

      if (applyForm.resumeFile) {
        fd.append("resumeFile", applyForm.resumeFile);
      }

      const res = await fetch("/api/careers/apply", {
        method: "POST",
        body: fd,
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        alert(data.error || "Failed to submit application. Please try again.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("Error submitting application. Please check your network connection.");
    } finally {
      setLoading(false);
    }
  };

  // Group open roles by department
  const groupedRoles: Record<string, Role[]> = {};
  dynamicRoles.forEach((role) => {
    if (!groupedRoles[role.dept]) {
      groupedRoles[role.dept] = [];
    }
    groupedRoles[role.dept].push(role);
  });

  return (
    <div className="relative min-h-screen w-full bg-[#F5FBFD] text-[#1D222D] overflow-x-hidden selection:bg-[#2687E8]/20">
      
      {/* ─── SINGLE JOB DETAIL VIEW ─── */}
      {selectedRole ? (
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8 sm:py-12 pt-24 sm:pt-28">
          
          {/* Top Bar Navigation (Floating Pill) */}
          <motion.header
            initial={{ y: -56, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
          >
            <div className="mx-auto flex w-full max-w-[90rem] items-center justify-between px-4 sm:px-6 py-4 sm:py-6 lg:px-8 pointer-events-auto">
              {/* Left: Independent Logo */}
              <Link 
                href="/" 
                className="shrink-0 flex items-center rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-all duration-300 bg-white/90 backdrop-blur-xl border border-[#D8EAF1] shadow-lg shadow-[#D8EAF1]/50"
              >
                <Image
                  src="/kalpkrafts_logo.png"
                  alt="KalpKrafts"
                  width={200}
                  height={64}
                  priority
                  unoptimized
                  className="h-7 sm:h-8 lg:h-9 w-auto object-contain"
                />
              </Link>

              {/* Right: Floating Nav Pill */}
              <div className="flex items-center gap-2 rounded-full p-1 sm:p-1.5 transition-all duration-300 bg-white/90 backdrop-blur-xl border border-[#D8EAF1] shadow-lg shadow-[#D8EAF1]/50">
                <button
                  onClick={() => {
                    setSelectedRole(null);
                    setSubmitted(false);
                  }}
                  className="inline-flex items-center justify-center rounded-full bg-[#1D222D] px-4 sm:px-6 py-2 sm:py-2.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-white transition-all hover:bg-[#2687E8] hover:shadow-md gap-1.5 sm:gap-2"
                >
                  <ChevronLeft size={14} /> Directory
                </button>
              </div>
            </div>
          </motion.header>

          {/* Job Title & Header Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 rounded-3xl border border-[#D8EAF1] bg-white p-5 sm:p-8 shadow-xl shadow-[#007BFF]/10">
            <div>
              <span className="inline-block rounded-full border border-[#2687E8]/30 bg-[#EDF8FB] px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#2687E8] mb-3">
                {selectedRole.dept}
              </span>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#1D222D] tracking-tight leading-tight">
                {selectedRole.title}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-semibold text-[#526579]">
                <MapPin size={14} className="text-[#2687E8]" />
                <span>{selectedRole.location}</span>
                <span>•</span>
                <span>{selectedRole.type}</span>
              </div>
            </div>

            <SpecularButton
              href="#apply-form"
              size="md"
              className="shrink-0 w-full sm:w-auto text-center"
            >
              Apply Position
            </SpecularButton>
          </div>

          {/* Editorial Job Content */}
          <div className="py-8 sm:py-10 space-y-8 sm:space-y-10 text-sm text-[#526579] leading-relaxed">
            <div>
              <h2 className="text-xl font-extrabold text-[#1D222D] mb-3">About KalpKrafts</h2>
              <p>{selectedRole.aboutKalpKrafts}</p>
            </div>

            <div>
              <h2 className="text-xl font-extrabold text-[#1D222D] mb-3">About the Role</h2>
              <p>{selectedRole.aboutRole}</p>
            </div>

            <div>
              <h2 className="text-xl font-extrabold text-[#1D222D] mb-3">Responsibilities</h2>
              <ul className="list-disc pl-5 space-y-2.5 text-[#526579]">
                {selectedRole.responsibilities.map((resp, idx) => (
                  <li key={idx}>{resp}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-extrabold text-[#1D222D] mb-3">Qualifications & Skills</h2>
              <ul className="list-disc pl-5 space-y-2.5 text-[#526579]">
                {selectedRole.qualifications.map((qual, idx) => (
                  <li key={idx}>{qual}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-extrabold text-[#1D222D] mb-3">Tech Stack & Tools</h2>
              <div className="flex flex-wrap gap-2">
                {selectedRole.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="rounded-xl border border-[#D8EAF1] bg-white px-3.5 py-1 text-xs font-bold text-[#1D222D] shadow-xs"
                  >
                    ✦ {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Embedded Application Form */}
            <div id="apply-form" className="border-t border-[#D8EAF1] pt-10 mt-12">
              <div className="rounded-3xl border border-[#D8EAF1] bg-white p-5 sm:p-10 shadow-2xl shadow-[#007BFF]/15 transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-5 w-5 text-[#2687E8]" />
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#1D222D]">
                    Apply for this position
                  </h3>
                </div>
                <p className="text-xs text-[#526579] mb-8">
                  Submit your application details below. Our founders review all submissions directly within 48 hours.
                </p>

                {submitted ? (
                  <div className="rounded-2xl border border-emerald-300 bg-emerald-50/90 p-6 sm:p-8 text-center">
                    <CheckCircle2 size={44} className="mx-auto text-emerald-600 mb-4" />
                    <h4 className="text-xl sm:text-2xl font-extrabold text-[#1D222D]">Application Received!</h4>
                    <p className="text-xs sm:text-sm text-[#526579] mt-3 max-w-lg mx-auto leading-relaxed">
                      Thank you <span className="font-bold text-[#1D222D]">{applyForm.fullName}</span>. We have received your official application for <span className="font-bold text-[#2687E8]">{selectedRole.title}</span>. Our team will review your profile and reach out to <span className="font-bold text-[#1D222D]">{applyForm.email}</span>.
                    </p>
                    <div className="mt-6 p-4 rounded-xl bg-white border border-emerald-200 max-w-md mx-auto text-left text-xs space-y-1 text-[#526579]">
                      <div><span className="font-bold text-[#1D222D]">Applicant:</span> {applyForm.fullName} ({applyForm.university})</div>
                      <div><span className="font-bold text-[#1D222D]">Role:</span> {selectedRole.title}</div>
                      <div><span className="font-bold text-[#1D222D]">Start Date:</span> {applyForm.startDate || "As soon as possible"}</div>
                    </div>
                    <div className="mt-6 flex justify-center">
                      <SpecularButton
                        onClick={() => {
                          setSelectedRole(null);
                          setSubmitted(false);
                        }}
                        size="md"
                        className="w-full sm:w-auto"
                      >
                        Back to All Open Positions
                      </SpecularButton>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleApplySubmit} className="space-y-8">
                    
                    {/* SECTION 1: PERSONAL DETAILS */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 border-b border-[#D8EAF1] pb-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#EDF8FB] text-[11px] font-black text-[#2687E8]">1</span>
                        <h4 className="text-sm font-extrabold text-[#1D222D] uppercase tracking-wider">
                          Personal & Contact Details
                        </h4>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-[#1D222D] mb-1">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Krishnendu Ray"
                            value={applyForm.fullName}
                            onChange={(e) => setApplyForm({ ...applyForm, fullName: e.target.value })}
                            className="w-full rounded-xl border border-[#D8EAF1] bg-white px-4 py-3 sm:py-2.5 text-base sm:text-xs text-[#1D222D] focus:border-[#2687E8] focus:outline-none shadow-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#1D222D] mb-1">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="you@example.com"
                            value={applyForm.email}
                            onChange={(e) => setApplyForm({ ...applyForm, email: e.target.value })}
                            className="w-full rounded-xl border border-[#D8EAF1] bg-white px-4 py-3 sm:py-2.5 text-base sm:text-xs text-[#1D222D] focus:border-[#2687E8] focus:outline-none shadow-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#1D222D] mb-1">
                            Phone Number (with WhatsApp) *
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="+91 98765 43210"
                            value={applyForm.phone}
                            onChange={(e) => setApplyForm({ ...applyForm, phone: e.target.value })}
                            className="w-full rounded-xl border border-[#D8EAF1] bg-white px-4 py-3 sm:py-2.5 text-base sm:text-xs text-[#1D222D] focus:border-[#2687E8] focus:outline-none shadow-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#1D222D] mb-1">
                            Current Location / City *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. New Delhi, India"
                            value={applyForm.location}
                            onChange={(e) => setApplyForm({ ...applyForm, location: e.target.value })}
                            className="w-full rounded-xl border border-[#D8EAF1] bg-white px-4 py-3 sm:py-2.5 text-base sm:text-xs text-[#1D222D] focus:border-[#2687E8] focus:outline-none shadow-xs"
                          />
                        </div>
                      </div>
                    </div>

                    {/* SECTION 2: ACADEMIC & PROFILES */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 border-b border-[#D8EAF1] pb-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#EDF8FB] text-[11px] font-black text-[#2687E8]">2</span>
                        <h4 className="text-sm font-extrabold text-[#1D222D] uppercase tracking-wider">
                          Academic Profile & Online Links
                        </h4>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-[#1D222D] mb-1">
                            University / College / School *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. IIT Kharagpur / NIT Surathkal"
                            value={applyForm.university}
                            onChange={(e) => setApplyForm({ ...applyForm, university: e.target.value })}
                            className="w-full rounded-xl border border-[#D8EAF1] bg-white px-4 py-3 sm:py-2.5 text-base sm:text-xs text-[#1D222D] focus:border-[#2687E8] focus:outline-none shadow-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#1D222D] mb-1">
                            Degree & Branch / Major *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. B.Tech Computer Science & Engineering"
                            value={applyForm.degree}
                            onChange={(e) => setApplyForm({ ...applyForm, degree: e.target.value })}
                            className="w-full rounded-xl border border-[#D8EAF1] bg-white px-4 py-3 sm:py-2.5 text-base sm:text-xs text-[#1D222D] focus:border-[#2687E8] focus:outline-none shadow-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#1D222D] mb-1">
                            Expected Graduation Year *
                          </label>
                          <CustomSelect
                            value={applyForm.gradYear}
                            onChange={(val) => setApplyForm({ ...applyForm, gradYear: val })}
                            options={["2024", "2025", "2026", "2027", "2028", "Already Graduated"]}
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#1D222D] mb-1">
                            GitHub Profile Link *
                          </label>
                          <input
                            type="url"
                            required
                            placeholder="https://github.com/yourusername"
                            value={applyForm.github}
                            onChange={(e) => setApplyForm({ ...applyForm, github: e.target.value })}
                            className="w-full rounded-xl border border-[#D8EAF1] bg-white px-4 py-3 sm:py-2.5 text-base sm:text-xs text-[#1D222D] focus:border-[#2687E8] focus:outline-none shadow-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#1D222D] mb-1">
                            LinkedIn Profile Link *
                          </label>
                          <input
                            type="url"
                            required
                            placeholder="https://linkedin.com/in/yourprofile"
                            value={applyForm.linkedin}
                            onChange={(e) => setApplyForm({ ...applyForm, linkedin: e.target.value })}
                            className="w-full rounded-xl border border-[#D8EAF1] bg-white px-4 py-3 sm:py-2.5 text-base sm:text-xs text-[#1D222D] focus:border-[#2687E8] focus:outline-none shadow-xs"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-bold text-[#1D222D] mb-1">
                            Portfolio / Personal Website / Demo Link
                          </label>
                          <input
                            type="url"
                            placeholder="https://yourportfolio.com or demo link"
                            value={applyForm.portfolio}
                            onChange={(e) => setApplyForm({ ...applyForm, portfolio: e.target.value })}
                            className="w-full rounded-xl border border-[#D8EAF1] bg-white px-4 py-3 sm:py-2.5 text-base sm:text-xs text-[#1D222D] focus:border-[#2687E8] focus:outline-none shadow-xs"
                          />
                        </div>
                      </div>
                    </div>

                    {/* SECTION 3: AVAILABILITY & WORK PREFERENCE */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 border-b border-[#D8EAF1] pb-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#EDF8FB] text-[11px] font-black text-[#2687E8]">3</span>
                        <h4 className="text-sm font-extrabold text-[#1D222D] uppercase tracking-wider">
                          Availability & Work Preference
                        </h4>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-[#1D222D] mb-1">
                            Earliest Available Start Date *
                          </label>
                          <input
                            type="date"
                            required
                            value={applyForm.startDate}
                            onChange={(e) => setApplyForm({ ...applyForm, startDate: e.target.value })}
                            className="w-full min-h-[44px] sm:min-h-0 rounded-xl border border-[#D8EAF1] bg-white px-4 py-3 sm:py-2.5 text-base sm:text-xs text-[#1D222D] focus:border-[#2687E8] focus:outline-none shadow-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#1D222D] mb-1">
                            Preferred Work Commitment *
                          </label>
                          <CustomSelect
                            value={applyForm.commitment}
                            onChange={(val) => setApplyForm({ ...applyForm, commitment: val })}
                            options={[
                              "Full-Time Internship (40 hrs/wk)",
                              "Part-Time Contributor (15-20 hrs/wk)",
                              "Research Fellow"
                            ]}
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#1D222D] mb-1">
                            Remote / Hybrid Comfort *
                          </label>
                          <CustomSelect
                            value={applyForm.remotePreference}
                            onChange={(val) => setApplyForm({ ...applyForm, remotePreference: val })}
                            options={[
                              "Yes, fully comfortable remote",
                              "Prefer hybrid mode"
                            ]}
                          />
                        </div>
                      </div>
                    </div>

                    {/* SECTION 4: RESUME & TECHNICAL STATEMENTS */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 border-b border-[#D8EAF1] pb-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#EDF8FB] text-[11px] font-black text-[#2687E8]">4</span>
                        <h4 className="text-sm font-extrabold text-[#1D222D] uppercase tracking-wider">
                          Resume & Technical Statements
                        </h4>
                      </div>

                      {/* Interactive File Drag & Drop Resume Uploader */}
                      <div>
                        <label className="block text-xs font-bold text-[#1D222D] mb-1.5">
                          Upload Resume / CV (.pdf, .doc, .docx) *
                        </label>
                        
                        <div className="relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#2687E8]/40 bg-white p-6 text-center transition-all hover:border-[#2687E8] shadow-xs">
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            required={!applyForm.fileName && !applyForm.resumeLink}
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                setApplyForm({
                                  ...applyForm,
                                  resumeFile: file,
                                  fileName: file.name,
                                  fileSize: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
                                });
                              }
                            }}
                            className="absolute inset-0 z-10 w-full h-full opacity-0 cursor-pointer"
                          />

                          {applyForm.fileName ? (
                            <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-xl border border-emerald-300 shadow-xs z-0">
                              <FileText className="h-6 w-6 text-[#2687E8]" />
                              <div className="text-left">
                                <p className="text-xs font-extrabold text-[#1D222D]">{applyForm.fileName}</p>
                                <p className="text-[10px] text-emerald-600 font-semibold">{applyForm.fileSize} • Upload Ready ✓</p>
                              </div>
                            </div>
                          ) : (
                            <div className="z-0">
                              <UploadCloud className="h-8 w-8 text-[#2687E8] mx-auto mb-2" />
                              <p className="text-xs font-bold text-[#1D222D]">
                                Drag & Drop your Resume file here, or <span className="text-[#2687E8] underline">Browse File</span>
                              </p>
                              <p className="text-[10px] text-[#526579] mt-1">
                                Supports PDF, DOC, DOCX (Max 10MB)
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Optional Cloud Link Input */}
                        <div className="mt-3">
                          <label className="block text-[11px] font-semibold text-[#526579] mb-1">
                            Or paste Google Drive / Dropbox Resume Link:
                          </label>
                          <input
                            type="url"
                            placeholder="https://drive.google.com/file/d/your-resume-link"
                            value={applyForm.resumeLink}
                            onChange={(e) => setApplyForm({ ...applyForm, resumeLink: e.target.value })}
                            className="w-full rounded-xl border border-[#D8EAF1] bg-white px-4 py-3 sm:py-2 text-base sm:text-xs text-[#1D222D] focus:border-[#2687E8] focus:outline-none shadow-xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#1D222D] mb-1">
                          Key Projects & Technical Achievements *
                        </label>
                        <textarea
                          rows={3}
                          required
                          placeholder="Highlight 1-2 major projects, research papers, repositories, or technical systems you've built..."
                          value={applyForm.projectsOverview}
                          onChange={(e) => setApplyForm({ ...applyForm, projectsOverview: e.target.value })}
                          className="w-full rounded-xl border border-[#D8EAF1] bg-white px-4 py-3 sm:py-2.5 text-base sm:text-xs text-[#1D222D] focus:border-[#2687E8] focus:outline-none shadow-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#1D222D] mb-1">
                          Why do you want to join KalpKrafts? *
                        </label>
                        <textarea
                          rows={3}
                          required
                          placeholder="What excites you about building AI systems for modern education in India?"
                          value={applyForm.whyKalpKrafts}
                          onChange={(e) => setApplyForm({ ...applyForm, whyKalpKrafts: e.target.value })}
                          className="w-full rounded-xl border border-[#D8EAF1] bg-white px-4 py-3 sm:py-2.5 text-base sm:text-xs text-[#1D222D] focus:border-[#2687E8] focus:outline-none shadow-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#1D222D] mb-1">
                          How did you hear about KalpKrafts? *
                        </label>
                        <CustomSelect
                          value={applyForm.referralSource}
                          onChange={(val) => setApplyForm({ ...applyForm, referralSource: val })}
                          options={[
                            "LinkedIn",
                            "Campus Outreach / Placement Cell",
                            "Twitter / X",
                            "GitHub / Open Source",
                            "Founder Referral",
                            "Direct Website Search"
                          ]}
                        />
                      </div>
                    </div>

                    {/* Terms Checkbox */}
                    <div className="flex items-start gap-2.5 pt-2">
                      <input
                        type="checkbox"
                        id="agreeTerms"
                        required
                        checked={applyForm.agreeTerms}
                        onChange={(e) => setApplyForm({ ...applyForm, agreeTerms: e.target.checked })}
                        className="mt-0.5 h-5 w-5 sm:h-4 sm:w-4 rounded border-[#D8EAF1] text-[#2687E8] focus:ring-[#007BFF]"
                      />
                      <label htmlFor="agreeTerms" className="text-xs text-[#526579] leading-relaxed cursor-pointer select-none">
                        I confirm that all details provided are accurate and agree to KalpKrafts' talent recruitment data processing terms.
                      </label>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4 flex justify-end">
                      <SpecularButton
                        type="submit"
                        disabled={loading}
                        size="lg"
                        className="w-full sm:w-auto"
                      >
                        {loading ? "Submitting..." : "Submit Application"}
                      </SpecularButton>
                    </div>

                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      ) : (
        
        /* ─── DIRECTORY & HERO VIEW ─── */
        <div>
          {/* Floating Pill Navbar */}
          <motion.header
            initial={{ y: -56, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
          >
            <div className="mx-auto flex w-full max-w-[90rem] items-center justify-between px-4 sm:px-6 py-4 sm:py-6 lg:px-8 pointer-events-auto">
              {/* Left: Independent Logo */}
              <Link 
                href="/" 
                className="shrink-0 flex items-center rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-all duration-300 bg-white/75 backdrop-blur-md border border-white/40 shadow-sm"
              >
                <Image
                  src="/kalpkrafts_logo.png"
                  alt="KalpKrafts"
                  width={200}
                  height={64}
                  priority
                  unoptimized
                  className="h-7 sm:h-8 lg:h-9 w-auto object-contain"
                />
              </Link>

              {/* Right: Floating Nav Pill */}
              <div className="flex items-center gap-2 rounded-full p-1 sm:p-1.5 transition-all duration-300 bg-white/75 backdrop-blur-md border border-white/40 shadow-sm">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-full bg-[#1D222D] px-4 sm:px-6 py-2 sm:py-2.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-white transition-all hover:bg-[#2687E8] hover:shadow-md gap-1.5 sm:gap-2"
                >
                  <ArrowLeft size={14} /> Main Site
                </Link>
              </div>
            </div>
          </motion.header>

          {/* ─── FULL-STRETCH HERO ─── */}
          <section
            id="careers-hero"
            className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-[#F5FBFD] py-24 sm:py-0"
          >
            {/* Full-Page Halftone Pattern (Static) */}
            <div className="absolute inset-0 z-0 bg-[#F5FBFD]">
              <HalftoneReveal
                src="/career_new.jpg"
                inkColor="#1D222D"
                paperColor="#F5FBFD"
                mode="color"
                dotDensity={isMobile ? 80 : 160}
                angle={45}
                contrast={1.15}
                idleReveal={0}
                trigger="off"
                className="w-full h-full opacity-100 saturate-[1.2]"
              />
              {/* Bottom Gradient Shadow */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[40vh] bg-gradient-to-t from-[#0A0C10]/80 via-[#0A0C10]/30 to-transparent" />
            </div>

            {/* Typography overlay (centered) */}
            <div className="relative z-10 w-full max-w-[90rem] px-4 sm:px-6 lg:px-12 text-center">
              <motion.div
                variants={stagger}
                initial="hidden"
                animate="visible"
                className="flex flex-col items-center"
              >
                <motion.div variants={fadeUp} className="mb-4 sm:mb-6">
                  <span className="inline-block rounded-full border border-white/40 bg-black/50 backdrop-blur-md px-4 sm:px-5 py-1.5 sm:py-2 text-[10px] font-extrabold uppercase tracking-[0.25em] text-white shadow-2xl">
                    CAREERS & INTERNSHIPS
                  </span>
                </motion.div>
                
                <motion.div
                  variants={fadeUp}
                  className="w-full max-w-[70rem] mx-auto drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)] h-[180px] sm:h-[280px] md:h-[340px] lg:h-[420px] flex items-center justify-center"
                >
                  <WarpText
                    text={`Build AI systems that\nredefine how India learns.`}
                    color="#ffffff"
                    warpStrength={0.08}
                    warpScale={1.7}
                    speed={0.55}
                    pointerInfluence={0.42}
                    pointerStrength={0.38}
                    refraction={0.018}
                    className="font-display text-3xl sm:text-6xl md:text-7xl lg:text-[8.5rem] font-extrabold leading-[1.08] tracking-[-0.03em] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
                  />
                </motion.div>
                
                <motion.div variants={fadeUp} className="relative mt-6 sm:mt-8 max-w-3xl mx-auto py-2">
                  <div className="absolute inset-0 bg-black/40 blur-3xl rounded-full pointer-events-none" />
                  <p className="relative z-10 text-sm sm:text-lg text-white/95 leading-relaxed font-sans font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] text-center px-4">
                    We are an ambitious AI research and engineering company building foundational intelligence, voice reasoning agents, and institutional infrastructure for modern education.
                  </p>
                </motion.div>
                
              </motion.div>
            </div>
          </section>
          {/* ─── CANDIDATE RESOURCES & CULTURE ─── */}
          <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 pb-16 pt-8 sm:pt-12">
            {/* ─── THE KALPKRAFTS ADVANTAGE (MagicBento) ─── */}
            <div className="mb-8 border-b border-[#D8EAF1] pb-6">
              <span className="text-[11px] font-extrabold uppercase font-mono-tag tracking-widest text-[#2687E8]">
                THE KALPKRAFTS ADVANTAGE
              </span>
              <h2 className="mt-2 text-2xl font-extrabold text-[#1D222D] sm:text-3xl tracking-tight">
                Why you should join
              </h2>
            </div>
            
            <div className="mb-16 sm:mb-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 w-full">
              {[
                {
                  title: "Learn by Building",
                  description: "The best way to learn is to create. Work on real products, real problems, and real challenges.",
                  label: "GROWTH",
                  image: "/perk-1-v2.jpg",
                  span: "md:col-span-2 lg:col-span-2"
                },
                {
                  title: "Own Your Ideas",
                  description: "Got an idea? Bring it to the table. We value people who question, experiment, and take initiative.",
                  label: "AUTONOMY",
                  image: "/perk-2-v2.jpg",
                  span: "col-span-1"
                },
                {
                  title: "Work Across Disciplines",
                  description: "Designers, developers, AI enthusiasts, educators, and creators work together. You'll learn far beyond your role.",
                  label: "COLLABORATION",
                  image: "/perk-3-v2.jpg",
                  span: "col-span-1"
                },
                {
                  title: "Make an Impact",
                  description: "Your work can reach students, educators, institutions, and aspiring engineers. Build things that have a purpose.",
                  label: "IMPACT",
                  image: "/perk-4-v2.jpg",
                  span: "col-span-1"
                },
                {
                  title: "Grow With Us",
                  description: "We're growing, and that means you grow with us. Take responsibility, build your skills, and discover what you're capable of.",
                  label: "FUTURE",
                  image: "/perk-5-v2.jpg",
                  span: "col-span-1"
                }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`group relative overflow-hidden rounded-[2rem] bg-[#151A23] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-15px_rgba(38,135,232,0.4)] min-h-[320px] sm:min-h-[360px] lg:min-h-[400px] ${item.span}`}
                >
                  {/* Full Background Image */}
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Halftone Image Overlay (Only on desktop to preserve mobile WebGL contexts) */}
                  {!isMobile && (
                    <div className="absolute inset-0 opacity-0 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-105 pointer-events-none hidden md:block">
                      <HalftoneReveal
                        src={item.image}
                        trigger="off"
                        mode="color"
                        inkColor="#1D222D"
                        paperColor="#F5FBFD"
                        dotDensity={120}
                        angle={45}
                        contrast={1.15}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}

                  {/* Base Gradient Overlay (Always visible for name legibility) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14]/90 via-[#0B0E14]/30 via-35% to-transparent to-60% pointer-events-none" />

                  {/* Darker Gradient Overlay (Deepens on hover for description legibility) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14]/95 via-[#0B0E14]/70 via-40% to-transparent to-70% opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />

                  {/* Content Container (Anchored to bottom, expands upward on hover) */}
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 flex flex-col justify-end pointer-events-none">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <p className="mb-1.5 sm:mb-2 font-mono-tag text-[10px] font-extrabold uppercase tracking-widest text-[#65C4EC]">
                          {item.label}
                        </p>
                        <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-[-0.02em]">
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    {/* Description (Visible on mobile, expands on hover on desktop) */}
                    <div className="grid grid-rows-[1fr] md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr] transition-all duration-500 ease-out mt-3 md:mt-0 md:group-hover:mt-6">
                      <div className="overflow-hidden">
                        <div className="border-t border-white/20 pt-3 md:pt-5">
                          <p className={`text-xs sm:text-[14px] leading-relaxed text-[#B7C4D1] opacity-100 md:opacity-0 transition-opacity duration-700 delay-100 md:group-hover:opacity-100 ${item.span.includes('col-span-2') ? 'max-w-xl' : ''}`}>
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ─── IDEAS & PRINCIPLES (BorderGlow) ─── */}
            <div className="mb-8 border-b border-[#D8EAF1] pb-6 mt-12">
              <span className="text-[11px] font-extrabold uppercase font-mono-tag tracking-widest text-[#2687E8]">
                OPERATING SYSTEM
              </span>
              <h2 className="mt-2 text-2xl font-extrabold text-[#1D222D] sm:text-3xl tracking-tight">
                Our Ideas & Principles
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-16">
              <BorderGlow animated={true} glowColor="205 82% 54%" glowRadius={80} backgroundColor="#121822" borderRadius={24}>
                <div className="p-6 sm:p-8 h-full flex flex-col">
                  <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-[#2687E8]/10 text-[#2687E8] flex items-center justify-center mb-5 sm:mb-6 shadow-inner">
                    <Brain size={26} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">Curious minds.</h3>
                  <p className="text-[#94A3B8] text-xs sm:text-sm leading-relaxed mt-auto">
                    We believe great work happens when people have the freedom to explore. You don't need to know everything, we care more about how curious you are.
                  </p>
                </div>
              </BorderGlow>
              
              <BorderGlow animated={true} glowColor="38 92% 50%" glowRadius={80} backgroundColor="#1A150F" borderRadius={24}>
                <div className="p-6 sm:p-8 h-full flex flex-col">
                  <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-[#F59E0B]/10 text-[#F59E0B] flex items-center justify-center mb-5 sm:mb-6 shadow-inner">
                    <GraduationCap size={26} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">Bold ideas.</h3>
                  <p className="text-[#94A3B8] text-xs sm:text-sm leading-relaxed mt-auto">
                    There are no stupid questions here. There are only ideas waiting to be challenged, improved, and turned into something better.
                  </p>
                </div>
              </BorderGlow>
              
              <BorderGlow animated={true} glowColor="250 84% 65%" glowRadius={80} backgroundColor="#15121E" borderRadius={24}>
                <div className="p-6 sm:p-8 h-full flex flex-col">
                  <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-[#8B5CF6]/10 text-[#8B5CF6] flex items-center justify-center mb-5 sm:mb-6 shadow-inner">
                    <Building size={26} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">Real ownership.</h3>
                  <p className="text-[#94A3B8] text-xs sm:text-sm leading-relaxed mt-auto">
                    Instead of spending your internship watching others work, you'll contribute to real projects. Your portfolio doesn't need to be perfect, it just needs to show that you build.
                  </p>
                </div>
              </BorderGlow>
            </div>
          </section>

          {/* ─── WHAT WE LOOK FOR ─── */}
          <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 pb-16 sm:pb-24 pt-4 sm:pt-6">
            <div className="rounded-[2rem] sm:rounded-[2.5rem] bg-[#1D222D] p-6 sm:p-10 md:p-16 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#2687E8]/20 blur-[100px] pointer-events-none" />
              
              <div className="relative z-10 max-w-3xl">
                <span className="text-[11px] font-extrabold uppercase font-mono-tag tracking-widest text-[#65C4EC] mb-3 sm:mb-4 block">
                  WHAT WE LOOK FOR
                </span>
                
                <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-6 sm:mb-8">
                  You don't need to know everything.
                </h2>
                
                <p className="text-[#B7C4D1] text-sm sm:text-lg mb-6 sm:mb-8 leading-relaxed">
                  We care more about how you think, how curious you are, and what you do when you don't know something. We look for people who:
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-8 sm:mb-10">
                  {[
                    "Think beyond the obvious",
                    "Learn quickly",
                    "Take initiative",
                    "Are comfortable experimenting",
                    "Care about quality",
                    "Communicate openly",
                    "Take ownership",
                    "Are excited about technology and education"
                  ].map((trait, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-[#2687E8]/20 text-[#65C4EC] shrink-0">
                        <CheckCircle2 size={13} />
                      </div>
                      <span className="text-white font-medium text-xs sm:text-base">{trait}</span>
                    </div>
                  ))}
                </div>
                
                <div className="p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm inline-block">
                  <p className="text-white font-bold text-base sm:text-xl">
                    Your portfolio doesn't need to be perfect.
                  </p>
                  <p className="text-[#65C4EC] font-medium text-xs sm:text-base mt-1">
                    It just needs to show that you build.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ─── DIRECT OPEN POSITIONS DIRECTORY ─── */}
          <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 pb-16 sm:pb-24 pt-4 sm:pt-6">
            
            {/* Header */}
            <div className="border-b border-[#D8EAF1] pb-6 mb-8">
              <span className="text-[11px] font-extrabold uppercase font-mono-tag tracking-widest text-[#2687E8]">
                OPEN POSITIONS DIRECTORY
              </span>
              <h2 className="mt-2 text-2xl font-extrabold text-[#1D222D] sm:text-3xl tracking-tight">
                Explore Active Tracks & Roles
              </h2>
              <p className="mt-1 text-xs text-[#526579]">
                Click on any department below to view active roles and submit an instant application.
              </p>
            </div>

            {/* Department Accordion List or Empty State */}
            {dynamicRoles.length === 0 ? (
              <div className="relative mt-4 flex flex-col items-center justify-center overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-[#1D222D] px-6 py-20 text-center sm:py-32 lg:px-8 shadow-2xl">
                {/* Subtle background glow */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <div className="h-[400px] w-[400px] rounded-full bg-[#2687E8]/20 blur-[120px]" />
                </div>
                
                <div className="relative z-10 max-w-3xl">
                  <h2 className="font-display text-[clamp(1.75rem,4vw,3.5rem)] font-black leading-[1.05] tracking-[-0.03em] text-white uppercase">
                    Unfortunately There's No <br className="hidden sm:block" />
                    <span className="text-[#8193A3]">Open Roles For Now</span>
                  </h2>
                  <p className="mx-auto mt-6 max-w-xl text-xs sm:text-base leading-relaxed text-[#B7C4D1]">
                    At KalpKrafts, the world's most talented engineers, researchers, and designers are shaping the future of education. We aren't actively hiring at this exact moment, but great talent never goes unnoticed.
                  </p>
                  <div className="mt-8 sm:mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Link
                      href="/"
                      className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-xs sm:text-sm font-bold text-[#1D222D] transition-all hover:bg-[#EDF8FB] hover:scale-105"
                    >
                      SEE OUR STORY <ArrowRight size={14} className="ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="border-t border-[#D8EAF1]">
              {Object.entries(groupedRoles).map(([deptName, roles]) => {
                const isExpanded = expandedDepts[deptName] ?? false;
                return (
                  <div key={deptName} className="border-b border-[#D8EAF1]">
                    
                    {/* Department Row Header */}
                    <button
                      onClick={() => toggleDept(deptName)}
                      className="group flex w-full items-center justify-between py-5 sm:py-6 text-left transition-colors"
                    >
                      <h3 className="text-lg sm:text-2xl font-semibold text-[#1D222D] group-hover:text-[#2687E8] transition-colors tracking-tight pr-3">
                        {deptName}
                      </h3>
                      <div className="flex items-center gap-2.5 sm:gap-4 text-xs font-semibold text-[#526579] shrink-0">
                        <span className="text-[11px] sm:text-xs">{roles.length} Role{roles.length !== 1 ? "s" : ""}</span>
                        
                        {/* Smooth SVG Rotational Plus-to-Minus Morphing Icon */}
                        <div className="text-[#1D222D] group-hover:text-[#2687E8] transition-colors">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="shrink-0 sm:w-[22px] sm:h-[22px]"
                          >
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <motion.line
                              x1="12"
                              y1="5"
                              x2="12"
                              y2="19"
                              animate={{
                                rotate: isExpanded ? 90 : 0,
                                scale: isExpanded ? 0 : 1,
                                opacity: isExpanded ? 0 : 1,
                              }}
                              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                              style={{ transformOrigin: "12px 12px" }}
                            />
                          </svg>
                        </div>
                      </div>
                    </button>

                    {/* Sub-Roles Accordion Content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden pb-6"
                        >
                          <div className="space-y-3 pl-0 sm:pl-4">
                            {roles.map((role) => (
                              <div
                                key={role.id}
                                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-[#D8EAF1] bg-white p-4 sm:p-6 shadow-xs transition-all hover:border-[#2687E8] hover:shadow-md"
                              >
                                <div>
                                  <h4 className="text-base font-semibold text-[#1D222D] group-hover:text-[#2687E8] transition-colors">
                                    {role.title}
                                  </h4>
                                  <p className="text-xs text-[#526579] mt-1.5 flex flex-wrap items-center gap-2 font-medium">
                                    <span className="inline-flex items-center gap-1">
                                      <MapPin size={13} className="text-[#2687E8]" /> {role.location}
                                    </span>
                                    <span>•</span>
                                    <span className="rounded-full bg-[#EDF8FB] px-2.5 py-0.5 text-[11px] font-bold text-[#2687E8]">
                                      {role.type}
                                    </span>
                                  </p>
                                </div>

                                <button
                                  onClick={() => {
                                    setSelectedRole(role);
                                    setSubmitted(false);
                                    window.scrollTo({ top: 0, behavior: "smooth" });
                                  }}
                                  className="gradient-pill-btn inline-flex items-center justify-center rounded-full px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-[#007BFF]/20 hover:shadow-lg transition-all w-full sm:w-auto shrink-0"
                                >
                                  Apply Position <ArrowRight size={13} className="ml-1.5 transition-transform group-hover:translate-x-1" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
              </div>
            )}
          </section>

          {/* ─── STAY CONNECTED / TALENT NETWORK ─── */}
          <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 pb-16 sm:pb-24">
            <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-[#1D222D] px-6 py-12 sm:px-12 sm:py-20 lg:px-16 text-center lg:text-left flex flex-col lg:flex-row lg:items-center justify-between gap-8 sm:gap-10 shadow-2xl border border-[#D8EAF1]/10">
              <div className="absolute top-0 right-0 h-64 w-64 bg-[#2687E8]/20 blur-[80px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 h-40 w-40 bg-[#65C4EC]/10 blur-[60px] pointer-events-none" />
              
              <div className="relative z-10 max-w-2xl">
                <span className="text-[11px] font-extrabold uppercase font-mono-tag tracking-widest text-[#65C4EC]">
                  TALENT NETWORK
                </span>
                <h2 className="mt-3 sm:mt-4 text-2xl sm:text-3xl font-extrabold text-white lg:text-4xl tracking-tight">
                  Don't see a perfect fit right now?
                </h2>
                <p className="mt-3 sm:mt-4 text-xs sm:text-base text-[#B7C4D1] leading-relaxed">
                  Join the KalpKrafts Talent Network. We'll keep you in the loop on new engineering roles, research breakthroughs, and exclusive company updates.
                </p>
              </div>

              <div className="relative z-10 w-full lg:w-auto shrink-0 flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="rounded-full bg-white/10 px-5 py-3.5 sm:px-6 sm:py-4 text-sm text-white placeholder-white/50 border border-white/20 outline-none focus:border-[#65C4EC] focus:ring-1 focus:ring-[#65C4EC] transition-all w-full sm:min-w-[260px]"
                />
                <button className="gradient-pill-btn rounded-full px-8 py-3.5 sm:py-4 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105 inline-flex justify-center items-center gap-2 w-full sm:w-auto">
                  <Send size={16} /> Connect
                </button>
              </div>
            </div>
          </section>

        </div>
      )}

      {/* ─── FOOTER ─── */}
      <footer className="relative overflow-hidden border-t border-[#2687E8]/20 bg-[#151A23] pt-12 sm:pt-16 pb-0 text-slate-400">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 pb-12 sm:pb-16">
            {/* Left: Brand Logo + Copyright */}
            <div className="flex flex-col items-start lg:col-span-4">
              <Link href="/" className="flex items-center shrink-0">
                <Image
                  src="/kalpkrafts_logo.png"
                  alt="KalpKrafts Logo"
                  width={260}
                  height={80}
                  unoptimized
                  className="h-8 sm:h-10 w-auto object-contain transition-transform duration-300 hover:scale-105 filter brightness-0 invert"
                />
              </Link>

              <p className="mt-4 sm:mt-6 text-xs leading-relaxed text-slate-400 max-w-xs">
                © copyright KalpKrafts 2025. All rights reserved.
              </p>
            </div>

            {/* Right: 4 Navigation Columns */}
            <div className="grid grid-cols-2 gap-6 sm:gap-8 sm:grid-cols-3 lg:col-span-7 lg:col-start-6">
              {[
                {
                  title: "Pages",
                  links: [
                    { name: "All Products", href: "/#products" },
                    { name: "Our Purpose", href: "/#about" },
                    { name: "Careers", href: "/careers" },
                    { name: "Contact", href: "/#contact" },
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
                  <h3 className="mb-4 text-sm font-bold text-white tracking-wide">
                    {col.title}
                  </h3>
                  <ul className="space-y-3 text-xs">
                    {col.links.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-slate-400 transition-colors hover:text-white"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Duplicated White Footer Image Banner along bottom line */}
        <div className="relative w-full overflow-hidden select-none pointer-events-none h-24 sm:h-32 mt-6">
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-0 opacity-30 sm:opacity-45 h-full w-full"
            style={{
              backgroundImage: "url('/footer.png')",
              backgroundRepeat: "repeat-x",
              backgroundPosition: "bottom left",
              backgroundSize: "auto 100%",
              filter: "brightness(0) invert(1)"
            }}
          />
        </div>
      </footer>

    </div>
  );
}
