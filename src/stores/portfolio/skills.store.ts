import { create } from "zustand"
import { skillsService } from "@/src/services/api/skills.service"
import type { Skill, SkillFormData, SkillCategory, SkillCategoryFormData } from "@/src/types/skills.types"

interface SkillsState {
  skills: Skill[]
  categories: SkillCategory[]
  isLoading: boolean
  error: string | null

  // Skills actions
  fetchSkills: (categoryId?: number) => Promise<void>
  createSkill: (data: SkillFormData) => Promise<void>
  updateSkill: (id: number, data: Partial<SkillFormData>) => Promise<void>
  deleteSkill: (id: number) => Promise<void>

  // Categories actions
  fetchCategories: () => Promise<void>
  createCategory: (data: SkillCategoryFormData) => Promise<void>
  updateCategory: (id: number, data: Partial<SkillCategoryFormData>) => Promise<void>
  deleteCategory: (id: number) => Promise<void>

  clearError: () => void
}

export const useSkillsStore = create<SkillsState>((set) => ({
  skills: [],
  categories: [],
  isLoading: false,
  error: null,

  fetchSkills: async (categoryId?: number) => {
    set({ isLoading: true, error: null })
    try {
      const response = await skillsService.getAll(categoryId)
      if (response.success) {
        set({ skills: response.data, isLoading: false })
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch skills",
        isLoading: false,
      })
    }
  },

  createSkill: async (data: SkillFormData) => {
    set({ isLoading: true, error: null })
    try {
      const response = await skillsService.create(data)
      if (response.success) {
        set((state) => ({
          skills: [...state.skills, response.data],
          isLoading: false,
        }))
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to create skill",
        isLoading: false,
      })
      throw error
    }
  },

  updateSkill: async (id: number, data: Partial<SkillFormData>) => {
    set({ isLoading: true, error: null })
    try {
      const response = await skillsService.update(id, data)
      if (response.success) {
        set((state) => ({
          skills: state.skills.map((item) => (item.id === id ? { ...item, ...response.data } : item)),
          isLoading: false,
        }))
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to update skill",
        isLoading: false,
      })
      throw error
    }
  },

  deleteSkill: async (id: number) => {
    set({ isLoading: true, error: null })
    try {
      await skillsService.delete(id)
      set((state) => ({
        skills: state.skills.filter((item) => item.id !== id),
        isLoading: false,
      }))
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to delete skill",
        isLoading: false,
      })
      throw error
    }
  },

  fetchCategories: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await skillsService.getAllCategories()
      if (response.success) {
        set({ categories: response.data, isLoading: false })
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch categories",
        isLoading: false,
      })
    }
  },

  createCategory: async (data: SkillCategoryFormData) => {
    set({ isLoading: true, error: null })
    try {
      const response = await skillsService.createCategory(data)
      if (response.success) {
        set((state) => ({
          categories: [...state.categories, response.data],
          isLoading: false,
        }))
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to create category",
        isLoading: false,
      })
      throw error
    }
  },

  updateCategory: async (id: number, data: Partial<SkillCategoryFormData>) => {
    set({ isLoading: true, error: null })
    try {
      const response = await skillsService.updateCategory(id, data)
      if (response.success) {
        set((state) => ({
          categories: state.categories.map((item) => (item.id === id ? { ...item, ...response.data } : item)),
          isLoading: false,
        }))
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to update category",
        isLoading: false,
      })
      throw error
    }
  },

  deleteCategory: async (id: number) => {
    set({ isLoading: true, error: null })
    try {
      await skillsService.deleteCategory(id)
      set((state) => ({
        categories: state.categories.filter((item) => item.id !== id),
        isLoading: false,
      }))
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to delete category",
        isLoading: false,
      })
      throw error
    }
  },

  clearError: () => set({ error: null }),
}))
