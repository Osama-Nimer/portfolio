import { create } from "zustand"
import { projectsService } from "@/src/services/api/projects.service"
import type { Project, ProjectFormData, Tag } from "@/src/types/projects.types"

interface ProjectsState {
  projects: Project[]
  tags: Tag[]
  isLoading: boolean
  error: string | null

  // Projects actions
  fetchProjects: (params?: { featured?: boolean; tagId?: number }) => Promise<void>
  createProject: (data: ProjectFormData) => Promise<void>
  updateProject: (id: number, data: Partial<ProjectFormData>) => Promise<void>
  deleteProject: (id: number) => Promise<void>

  // Tags actions
  fetchTags: () => Promise<void>
  createTag: (name: string) => Promise<void>
  deleteTag: (id: number) => Promise<void>

  clearError: () => void
}

export const useProjectsStore = create<ProjectsState>((set) => ({
  projects: [],
  tags: [],
  isLoading: false,
  error: null,

  fetchProjects: async (params?: { featured?: boolean; tagId?: number }) => {
    set({ isLoading: true, error: null })
    try {
      const response = await projectsService.getAll(params)
      if (response.success) {
        set({ projects: response.data, isLoading: false })
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch projects",
        isLoading: false,
      })
    }
  },

  createProject: async (data: ProjectFormData) => {
    set({ isLoading: true, error: null })
    try {
      const response = await projectsService.create(data)
      if (response.success) {
        set((state) => ({
          projects: [...state.projects, response.data],
          isLoading: false,
        }))
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to create project",
        isLoading: false,
      })
      throw error
    }
  },

  updateProject: async (id: number, data: Partial<ProjectFormData>) => {
    set({ isLoading: true, error: null })
    try {
      const response = await projectsService.update(id, data)
      if (response.success) {
        set((state) => ({
          projects: state.projects.map((item) => (item.id === id ? { ...item, ...response.data } : item)),
          isLoading: false,
        }))
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to update project",
        isLoading: false,
      })
      throw error
    }
  },

  deleteProject: async (id: number) => {
    set({ isLoading: true, error: null })
    try {
      await projectsService.delete(id)
      set((state) => ({
        projects: state.projects.filter((item) => item.id !== id),
        isLoading: false,
      }))
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to delete project",
        isLoading: false,
      })
      throw error
    }
  },

  fetchTags: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await projectsService.getAllTags()
      if (response.success) {
        set({ tags: response.data, isLoading: false })
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch tags",
        isLoading: false,
      })
    }
  },

  createTag: async (name: string) => {
    set({ isLoading: true, error: null })
    try {
      const response = await projectsService.createTag(name)
      if (response.success) {
        set((state) => ({
          tags: [...state.tags, response.data],
          isLoading: false,
        }))
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to create tag",
        isLoading: false,
      })
      throw error
    }
  },

  deleteTag: async (id: number) => {
    set({ isLoading: true, error: null })
    try {
      await projectsService.deleteTag(id)
      set((state) => ({
        tags: state.tags.filter((item) => item.id !== id),
        isLoading: false,
      }))
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to delete tag",
        isLoading: false,
      })
      throw error
    }
  },

  clearError: () => set({ error: null }),
}))
