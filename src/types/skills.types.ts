export type SkillLevel = "beginner" | "intermediate" | "advanced" | "expert"

export interface Skill {
  id: number
  name: string
  level: SkillLevel
  categoryId: number
  icon?: string
  order: number
  createdAt?: string
  updatedAt?: string
}

export interface SkillFormData {
  name: string
  level: SkillLevel
  categoryId: number
  icon?: string
  order?: number
}

export interface SkillCategory {
  id: number
  name: string
  description?: string
  order: number
  createdAt?: string
  updatedAt?: string
}

export interface SkillCategoryFormData {
  name: string
  description?: string
  order?: number
}
