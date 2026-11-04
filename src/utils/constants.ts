export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  SKILLS: "/skills",
  PROJECTS: "/projects",
  SERVICES: "/services",
  CONTACT: "/contact",
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

/**
 * Keep-alive for the backend on Render's free tier, which spins the service
 * down after ~15 minutes without traffic. A cheap GET every 10 minutes keeps
 * it warm. Point KEEP_ALIVE_PATH at a health endpoint if the backend has one.
 */
export const KEEP_ALIVE_PATH = "/skills"
export const KEEP_ALIVE_INTERVAL_MS = 10 * 60 * 1000
