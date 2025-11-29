export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  SKILLS: "/skills",
  PROJECTS: "/projects",
  SERVICES: "/services",
  CONTACT: "/contact",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  ADMIN_ABOUT: "/dashboard/about",
  ADMIN_SKILLS: "/dashboard/skills",
  ADMIN_PROJECTS: "/dashboard/projects",
  ADMIN_SERVICES: "/dashboard/services",
  ADMIN_MESSAGES: "/dashboard/messages",
  ADMIN_EXPERIENCE: "/dashboard/experience",
  ADMIN_CERTIFICATES: "/dashboard/certificates",
} as const

export const SKILL_LEVELS = {
  beginner: { label: "Beginner", percentage: 25 },
  intermediate: { label: "Intermediate", percentage: 50 },
  advanced: { label: "Advanced", percentage: 75 },
  expert: { label: "Expert", percentage: 100 },
} as const

export const SOCIAL_ICONS = [
  "github",
  "linkedin",
  "twitter",
  "instagram",
  "facebook",
  "youtube",
  "dribbble",
  "behance",
  "medium",
  "dev",
] as const

export const SERVICE_ICONS = ["code", "mobile", "design", "database", "cloud", "security", "ai", "analytics"] as const

export const TOKEN_KEY = "portfolio_access_token"
export const USER_KEY = "portfolio_user"
