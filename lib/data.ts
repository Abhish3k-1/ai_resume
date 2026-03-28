import type { DashboardResumeItem, TemplatePreview } from "@/lib/types";
import { resumeDefaultValues, type ResumeFormSchema } from "@/lib/schemas";

export const dashboardItems: DashboardResumeItem[] = [
  {
    id: "1",
    title: "Senior Product Designer Resume",
    role: "Design Leadership",
    updatedAt: "2m ago",
    score: 94,
    template: "Aurora",
    status: "Ready",
  },
  {
    id: "2",
    title: "UX Research Manager Resume",
    role: "User Research",
    updatedAt: "18m ago",
    score: 88,
    template: "Executive",
    status: "Review",
  },
  {
    id: "3",
    title: "Growth Product Manager Resume",
    role: "Growth",
    updatedAt: "1h ago",
    score: 91,
    template: "Slate",
    status: "Draft",
  },
  {
    id: "4",
    title: "Frontend Engineer Resume",
    role: "Engineering",
    updatedAt: "Yesterday",
    score: 86,
    template: "Aurora",
    status: "Ready",
  },
];

export const templatePreviews: TemplatePreview[] = [
  /* ── Modern ── */
  {
    id: "aurora",
    name: "Aurora",
    tone: "Bold + modern",
    category: "modern",
    description: "Gradient-led header with refined spacing and premium depth.",
  },
  {
    id: "neon",
    name: "Neon",
    tone: "Vibrant + edgy",
    category: "modern",
    description: "Neon accent bars with a clean dark-mode inspired layout.",
  },
  {
    id: "gradient",
    name: "Gradient",
    tone: "Colorful + fresh",
    category: "modern",
    description: "Smooth gradient sections for maximum visual impact.",
  },
  {
    id: "metro",
    name: "Metro",
    tone: "Urban + sleek",
    category: "modern",
    description: "Flat-design blocks inspired by metro UI principles.",
  },

  /* ── Minimal ── */
  {
    id: "clean",
    name: "Clean",
    tone: "Simple + elegant",
    category: "minimal",
    description: "Whitespace-first design with understated typography.",
  },
  {
    id: "mercury",
    name: "Mercury",
    tone: "Light + airy",
    category: "minimal",
    description: "Ultra-light layout with subtle gray dividers.",
  },
  {
    id: "nordic",
    name: "Nordic",
    tone: "Calm + balanced",
    category: "minimal",
    description: "Scandinavian-inspired design with muted colors.",
  },
  {
    id: "zen",
    name: "Zen",
    tone: "Peaceful + focused",
    category: "minimal",
    description: "Maximally distraction-free with generous spacing.",
  },

  /* ── Corporate ── */
  {
    id: "executive",
    name: "Executive",
    tone: "Classic + polished",
    category: "corporate",
    description: "Timeless editorial style for senior leadership resumes.",
  },
  {
    id: "prestige",
    name: "Prestige",
    tone: "Formal + refined",
    category: "corporate",
    description: "Gold accents with serif typography for C-suite profiles.",
  },
  {
    id: "boardroom",
    name: "Boardroom",
    tone: "Traditional + authoritative",
    category: "corporate",
    description: "Conservative layout optimized for board-level applications.",
  },
  {
    id: "harbor",
    name: "Harbor",
    tone: "Professional + trustworthy",
    category: "corporate",
    description: "Blue-toned corporate design with structured sections.",
  },

  /* ── Creative ── */
  {
    id: "mosaic",
    name: "Mosaic",
    tone: "Artistic + dynamic",
    category: "creative",
    description: "Grid-based layout with colorful section blocks.",
  },
  {
    id: "canvas",
    name: "Canvas",
    tone: "Expressive + unique",
    category: "creative",
    description: "Freeform design with asymmetric elements.",
  },
  {
    id: "prism",
    name: "Prism",
    tone: "Geometric + bold",
    category: "creative",
    description: "Angular shapes with rainbow accent highlights.",
  },
  {
    id: "origami",
    name: "Origami",
    tone: "Elegant + crafted",
    category: "creative",
    description: "Folded-paper aesthetic with layered depth effects.",
  },

  /* ── ATS-Friendly ── */
  {
    id: "slate",
    name: "Slate",
    tone: "Structured + analytical",
    category: "ats",
    description: "Two-column layout designed for data-heavy roles.",
  },
  {
    id: "classic",
    name: "Classic",
    tone: "Standard + reliable",
    category: "ats",
    description: "Industry-standard format that every ATS can parse.",
  },
  {
    id: "standard",
    name: "Standard",
    tone: "Plain + scannable",
    category: "ats",
    description: "Optimized for applicant tracking with zero formatting risk.",
  },
  {
    id: "foundation",
    name: "Foundation",
    tone: "Basic + proven",
    category: "ats",
    description: "Tried-and-true layout with maximum keyword visibility.",
  },
];

export const landingFeatures = [
  {
    title: "AI-Powered Rewrites",
    description:
      "Turn plain bullet points into high-impact language tuned for ATS and hiring teams.",
    icon: "Sparkles",
  },
  {
    title: "Premium Templates",
    description:
      "Switch between recruiter-tested templates with instant visual transitions.",
    icon: "LayoutTemplate",
  },
  {
    title: "Real-Time Preview",
    description:
      "Edit once and see production-grade resume output update in milliseconds.",
    icon: "PanelLeft",
  },
  {
    title: "Smart Content Scoring",
    description:
      "Get confidence scores and quick suggestions before each application.",
    icon: "Gauge",
  },
  {
    title: "Version History",
    description:
      "Keep multiple role-tailored variants without duplicating manual effort.",
    icon: "History",
  },
  {
    title: "Collaborative Share",
    description:
      "Send a private feedback link to mentors and teammates with one click.",
    icon: "Share2",
  },
] as const;

export const storyBlocks = [
  {
    eyebrow: "Signal",
    title: "Craft resumes that read like product narratives",
    description:
      "Every section is built for storytelling clarity: what you shipped, why it mattered, and how it moved outcomes.",
  },
  {
    eyebrow: "Velocity",
    title: "Go from blank page to polished draft in minutes",
    description:
      "Pre-filled suggestions and AI guidance reduce writing friction while keeping your voice authentic.",
  },
  {
    eyebrow: "Confidence",
    title: "Ship role-specific versions without duplicated work",
    description:
      "Clone a base resume, adapt tone and highlights, and keep every version synchronized from one dashboard.",
  },
] as const;

export const dummyResumeData: ResumeFormSchema = {
  ...resumeDefaultValues,
  firstName: "Jane",
  lastName: "Doe",
  headline: "Senior Product Developer",
  email: "jane.doe@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  summary:
    "Design-minded software engineer focusing on building scalable, beautiful web applications. 5+ years of experience leading frontend teams and delivering high-impact user experiences.",
  experience: [
    {
      id: "exp-1",
      role: "Frontend Lead",
      company: "Acme Corp",
      startDate: "Jan 2021",
      endDate: "Present",
      description: "Leading the core UI team across three product lines.",
      achievements: [
        "Architected a new React component library adopted by 40+ engineers.",
        "Reduced initial load time by 45% using Server Components.",
      ],
    },
    {
      id: "exp-2",
      role: "Software Engineer",
      company: "Startup Inc",
      startDate: "Mar 2018",
      endDate: "Dec 2020",
      description: "Built the MVP web app from scratch to $1M ARR.",
      achievements: [
        "Implemented secure payment processing integration.",
        "Set up the initial CI/CD pipeline using GitHub Actions.",
      ],
    },
  ],
  education: [
    {
      id: "edu-1",
      institution: "State University",
      degree: "B.S.",
      field: "Computer Science",
      startYear: "2014",
      endYear: "2018",
      markType: "cgpa",
      markValue: "3.8",
    },
  ],
  technicalSkills:
    "React, Next.js, TypeScript, Node.js, Tailwind CSS, GraphQL, PostgreSQL",
  softSkills: "Mentorship, Cross-functional Communication, Agile Leadership",
  projects: [
    {
      id: "proj-1",
      title: "Open Source UI Library",
      techStack: "React, Storybook",
      description: "Created and maintain a popular UI component set with 5K+ stars.",
      link: "https://github.com",
    },
  ],
  certifications: [],
  volunteer: [],
  languages: "",
  hobbies: "",
  customSections: [],
};

/* ── Section navigation for the builder ── */

export const builderSections = [
  { id: "personal", label: "Personal Info", icon: "User" },
  { id: "summary", label: "Summary", icon: "FileText" },
  { id: "experience", label: "Experience", icon: "Briefcase" },
  { id: "education", label: "Education", icon: "GraduationCap" },
  { id: "skills", label: "Skills", icon: "Wrench" },
  { id: "projects", label: "Projects", icon: "FolderGit2" },
  { id: "certifications", label: "Certifications", icon: "Award" },
  { id: "languages", label: "Languages", icon: "Globe" },
  { id: "hobbies", label: "Hobbies & Interests", icon: "Heart" },
  { id: "volunteer", label: "Volunteer Work", icon: "HandHeart" },
  { id: "custom", label: "Custom Sections", icon: "Plus" },
] as const;
