/**
 * siteConfig.ts — single place to edit your identity, links, featured repos,
 * accent color and content. Everything in the portfolio reads from here.
 */

export interface SiteConfig {
  name: string;
  shortName: string;
  role: string;
  tagline: string;
  githubUsername: string;
  bio: string;
  heroLine1: string;
  heroLine2: string;
  availability: string;
  location: string;
  languages: string;
  startedCodingYear: number;
  links: {
    email: string;
    github: string;
    linkedin: string;
    x: string;
    resume: string;
    gallery: string;
  };
  featured: string[];
  exclude: string[];
  accent: string;
  galleryPreviews: string[];
  skills: Record<string, string[]>;
  techMarquee: string[];
  experience: Array<{
    company: string;
    role: string;
    period: string;
    points: string[];
  }>;
  education: Array<{
    degree: string;
    school: string;
    period: string;
    note: string;
  }>;
  achievements: Array<{ label: string; detail: string }>;
}

export const siteConfig: SiteConfig = {
  name: "Md. Athaher Sayem Fahim",
  shortName: "Sayem",
  role: "Full-Stack Software Engineer",
  tagline: "React · TypeScript · Django · Applied AI",
  githubUsername: "Athaher-Sayem",
  bio: `I design and build full-stack products where clean interfaces meet
    reliable backends — and where thoughtful AI features stay practical.
    Currently a CSE student at Daffodil International University, shipping
    real applications while teaching others what I learn.`,
  heroLine1: "Thoughtful code,",
  heroLine2: "useful software.",
  availability: "Available for internships & freelance",
  location: "Dhaka, Bangladesh",
  languages: "Bangla & English",
  startedCodingYear: 2023,
  links: {
    email: "athahersayem336@gmail.com",
    github: "https://github.com/Athaher-Sayem",
    linkedin: "https://www.linkedin.com/in/athaher-sayem-3656671b8/",
    x: "",
    resume: "/resume",
    gallery: "https://athaher-sayem.github.io/Showcase-Design-Gallery/",
  },
  /** Repos to pin first, regardless of stars/update time. */
  featured: ["E-COM_Store", "Phimart", "AI_News_Scraper"],
  /** Repos to always hide (e.g. the portfolio itself or archives). */
  exclude: ["Portfolio"],
  /** Accent (electric lime). Swap hex values here and the whole site follows. */
  accent: "#D4FF4F",
  /** Repos that also have a public design-preview page in the gallery. */
  galleryPreviews: [
    "AI_Health_Checkup",
    "architecture-overview",
    "Athaher-Sayem",
    "Auto_Backup_System",
    "Bank-Managemnt-Project",
    "CNN_CIFAR_10",
    "Drinks",
    "Dynamic-Programming",
    "Elden_RING",
    "Event-Management",
    "Library-Management",
    "ML-Train",
    "Phimart",
    "Phitron",
    "Port",
    "Portfolio",
    "Some-Random",
    "Student_Management",
  ],
  skills: {
    Languages: ["TypeScript", "JavaScript", "Python", "C", "C++", "Java", "SQL"],
    Frontend: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "HTML/CSS", "DaisyUI"],
    Backend: ["Django / DRF", "FastAPI", "Flask", "REST APIs", "PostgreSQL", "Redis"],
    "AI & ML": ["LangChain", "RAG", "PyTorch", "scikit-learn", "Sentence-BERT", "Ollama"],
    Tools: ["Git/GitHub", "Docker", "Linux", "Bash", "Playwright", "Vercel", "Supabase", "Cloudinary"],
  },
  techMarquee: [
    "TypeScript", "React", "Next.js", "Tailwind CSS", "Python", "Django",
    "FastAPI", "PostgreSQL", "Redis", "Docker", "LangChain", "PyTorch",
    "Framer Motion", "Vercel", "Git", "REST APIs", "scikit-learn", "Playwright",
  ],
  experience: [
    {
      company: "Daffodil International University",
      role: "Lab Teaching Assistant",
      period: "Oct 2025 — Dec 2025",
      points: [
        "Supported CSE lab sessions in programming, networking and algorithms.",
        "Bridged lecture concepts and hands-on implementation for students.",
      ],
    },
    {
      company: "Bhola Zila Student Forum",
      role: "General Secretary",
      period: "Aug 2024 — Feb 2025",
      points: [
        "Owned public communications and press activity for the organization.",
        "Coordinated outreach programs for the regional student community.",
      ],
    },
  ],
  education: [
    {
      degree: "BSc in Computer Science & Engineering",
      school: "Daffodil International University",
      period: "2023 — Present",
      note: "CGPA 3.83 / 4.0 (previous semester)",
    },
    {
      degree: "Higher Secondary Certificate",
      school: "Adamjee Cantonment College",
      period: "2020 — 2022",
      note: "GPA 5.00 / 5.00 — Science",
    },
    {
      degree: "Secondary School Certificate",
      school: "Bhola Government High School",
      period: "2018 — 2020",
      note: "GPA 5.00 / 5.00 — Science",
    },
  ],
  achievements: [
    { label: "CodeChef 2-star coder", detail: "September 2025" },
    { label: "Algorithm competition finalist", detail: "Take Off 34 · Unlock 36" },
    { label: "Talentpool Scholarship", detail: "HSC & SSC GPA 5.00" },
  ],
};

/** Preferred semantic colors per language (fallback: subdued gray). */
export const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Jupyter: "#DA5B0B",
};
