import axiosClient from "./axios-client"
import type { Experience, ExperienceFormData, Certificate, CertificateFormData } from "@/src/types/experience.types"
import type { ApiResponse } from "@/src/types/api.types"

export const experienceService = {
  // Experience endpoints
  async getAll(): Promise<ApiResponse<Experience[]>> {
    const response = await axiosClient.get("/experience")
    return response.data
  },

  async getById(id: number): Promise<ApiResponse<Experience>> {
    const response = await axiosClient.get(`/experience/${id}`)
    return response.data
  },

  async create(data: ExperienceFormData): Promise<ApiResponse<Experience>> {
    const response = await axiosClient.post("/experience", data)
    return response.data
  },

  async update(id: number, data: Partial<ExperienceFormData>): Promise<ApiResponse<Experience>> {
    const response = await axiosClient.put(`/experience/${id}`, data)
    return response.data
  },

  async delete(id: number): Promise<ApiResponse<null>> {
    const response = await axiosClient.delete(`/experience/${id}`)
    return response.data
  },

  // Certificates endpoints
  async getAllCertificates(): Promise<ApiResponse<Certificate[]>> {
    const response = await axiosClient.get("/certificates")
    return response.data
  },

  async getCertificateById(id: number): Promise<ApiResponse<Certificate>> {
    const response = await axiosClient.get(`/certificates/${id}`)
    return response.data
  },

  async createCertificate(data: CertificateFormData): Promise<ApiResponse<Certificate>> {
    const response = await axiosClient.post("/certificates", data)
    return response.data
  },

  async updateCertificate(id: number, data: Partial<CertificateFormData>): Promise<ApiResponse<Certificate>> {
    const response = await axiosClient.put(`/certificates/${id}`, data)
    return response.data
  },

  async deleteCertificate(id: number): Promise<ApiResponse<null>> {
    const response = await axiosClient.delete(`/certificates/${id}`)
    return response.data
  },
}
