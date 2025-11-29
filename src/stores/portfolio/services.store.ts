import { create } from "zustand"
import { servicesService } from "@/src/services/api/services.service"
import type { Service, ServiceFormData } from "@/src/types/services.types"

interface ServicesState {
  services: Service[]
  isLoading: boolean
  error: string | null

  fetchServices: () => Promise<void>
  createService: (data: ServiceFormData) => Promise<void>
  updateService: (id: number, data: Partial<ServiceFormData>) => Promise<void>
  deleteService: (id: number) => Promise<void>

  clearError: () => void
}

export const useServicesStore = create<ServicesState>((set) => ({
  services: [],
  isLoading: false,
  error: null,

  fetchServices: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await servicesService.getAll()
      if (response.success) {
        set({ services: response.data, isLoading: false })
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch services",
        isLoading: false,
      })
    }
  },

  createService: async (data: ServiceFormData) => {
    set({ isLoading: true, error: null })
    try {
      const response = await servicesService.create(data)
      if (response.success) {
        set((state) => ({
          services: [...state.services, response.data],
          isLoading: false,
        }))
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to create service",
        isLoading: false,
      })
      throw error
    }
  },

  updateService: async (id: number, data: Partial<ServiceFormData>) => {
    set({ isLoading: true, error: null })
    try {
      const response = await servicesService.update(id, data)
      if (response.success) {
        set((state) => ({
          services: state.services.map((item) => (item.id === id ? { ...item, ...response.data } : item)),
          isLoading: false,
        }))
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to update service",
        isLoading: false,
      })
      throw error
    }
  },

  deleteService: async (id: number) => {
    set({ isLoading: true, error: null })
    try {
      await servicesService.delete(id)
      set((state) => ({
        services: state.services.filter((item) => item.id !== id),
        isLoading: false,
      }))
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to delete service",
        isLoading: false,
      })
      throw error
    }
  },

  clearError: () => set({ error: null }),
}))
