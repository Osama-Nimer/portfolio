import { create } from "zustand"
import { aboutService } from "@/src/services/api/about.service"
import type { About, AboutFormData, SocialLink, SocialLinkFormData } from "@/src/types/about.types"

interface AboutState {
  about: About[]
  socialLinks: SocialLink[]
  isLoading: boolean
  error: string | null

  // About actions
  fetchAbout: () => Promise<void>
  createAbout: (data: AboutFormData) => Promise<void>
  updateAbout: (id: number, data: Partial<AboutFormData>) => Promise<void>
  deleteAbout: (id: number) => Promise<void>

  // Social Links actions
  fetchSocialLinks: () => Promise<void>
  createSocialLink: (data: SocialLinkFormData) => Promise<void>
  updateSocialLink: (id: number, data: Partial<SocialLinkFormData>) => Promise<void>
  deleteSocialLink: (id: number) => Promise<void>

  clearError: () => void
}

export const useAboutStore = create<AboutState>((set) => ({
  about: [],
  socialLinks: [],
  isLoading: false,
  error: null,

  fetchAbout: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await aboutService.getAll()
      if (response.success) {
        set({ about: response.data, isLoading: false })
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch about data",
        isLoading: false,
      })
    }
  },

  createAbout: async (data: AboutFormData) => {
    set({ isLoading: true, error: null })
    try {
      const response = await aboutService.create(data)
      if (response.success) {
        set((state) => ({
          about: [...state.about, response.data],
          isLoading: false,
        }))
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to create about entry",
        isLoading: false,
      })
      throw error
    }
  },

  updateAbout: async (id: number, data: Partial<AboutFormData>) => {
    set({ isLoading: true, error: null })
    try {
      const response = await aboutService.update(id, data)
      if (response.success) {
        set((state) => ({
          about: state.about.map((item) => (item.id === id ? { ...item, ...response.data } : item)),
          isLoading: false,
        }))
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to update about entry",
        isLoading: false,
      })
      throw error
    }
  },

  deleteAbout: async (id: number) => {
    set({ isLoading: true, error: null })
    try {
      await aboutService.delete(id)
      set((state) => ({
        about: state.about.filter((item) => item.id !== id),
        isLoading: false,
      }))
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to delete about entry",
        isLoading: false,
      })
      throw error
    }
  },

  fetchSocialLinks: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await aboutService.getAllSocialLinks()
      if (response.success) {
        set({ socialLinks: response.data, isLoading: false })
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch social links",
        isLoading: false,
      })
    }
  },

  createSocialLink: async (data: SocialLinkFormData) => {
    set({ isLoading: true, error: null })
    try {
      const response = await aboutService.createSocialLink(data)
      if (response.success) {
        set((state) => ({
          socialLinks: [...state.socialLinks, response.data],
          isLoading: false,
        }))
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to create social link",
        isLoading: false,
      })
      throw error
    }
  },

  updateSocialLink: async (id: number, data: Partial<SocialLinkFormData>) => {
    set({ isLoading: true, error: null })
    try {
      const response = await aboutService.updateSocialLink(id, data)
      if (response.success) {
        set((state) => ({
          socialLinks: state.socialLinks.map((item) => (item.id === id ? { ...item, ...response.data } : item)),
          isLoading: false,
        }))
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to update social link",
        isLoading: false,
      })
      throw error
    }
  },

  deleteSocialLink: async (id: number) => {
    set({ isLoading: true, error: null })
    try {
      await aboutService.deleteSocialLink(id)
      set((state) => ({
        socialLinks: state.socialLinks.filter((item) => item.id !== id),
        isLoading: false,
      }))
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to delete social link",
        isLoading: false,
      })
      throw error
    }
  },

  clearError: () => set({ error: null }),
}))
