import axiosClient from "./axios-client"
import type { Service, ServiceFormData } from "@/src/types/services.types"
import type { ApiResponse } from "@/src/types/api.types"

export const servicesService = {
  async getAll(): Promise<ApiResponse<Service[]>> {
    const response = await axiosClient.get("/services")
    return response.data
  },

  async getById(id: number): Promise<ApiResponse<Service>> {
    const response = await axiosClient.get(`/services/${id}`)
    return response.data
  },

  async create(data: ServiceFormData): Promise<ApiResponse<Service>> {
    const response = await axiosClient.post("/services", data)
    return response.data
  },

  async update(id: number, data: Partial<ServiceFormData>): Promise<ApiResponse<Service>> {
    const response = await axiosClient.put(`/services/${id}`, data)
    return response.data
  },

  async delete(id: number): Promise<ApiResponse<null>> {
    const response = await axiosClient.delete(`/services/${id}`)
    return response.data
  },
}
