import axiosClient from "./axios-client"
import type { About, AboutFormData, SocialLink, SocialLinkFormData } from "@/src/types/about.types"
import type { ApiResponse } from "@/src/types/api.types"

export const aboutService = {
  // About endpoints
  async getAll(): Promise<ApiResponse<About[]>> {
    const response = await axiosClient.get("/about")
    return response.data
  },

  async getById(id: number): Promise<ApiResponse<About>> {
    const response = await axiosClient.get(`/about/${id}`)
    return response.data
  },

  async create(data: AboutFormData): Promise<ApiResponse<About>> {
    const response = await axiosClient.post("/about", data)
    return response.data
  },

  async update(id: number, data: Partial<AboutFormData>): Promise<ApiResponse<About>> {
    const response = await axiosClient.put(`/about/${id}`, data)
    return response.data
  },

  async delete(id: number): Promise<ApiResponse<null>> {
    const response = await axiosClient.delete(`/about/${id}`)
    return response.data
  },

  // Social Links endpoints
  async getAllSocialLinks(): Promise<ApiResponse<SocialLink[]>> {
    const response = await axiosClient.get("/social-links")
    return response.data
  },

  async getSocialLinkById(id: number): Promise<ApiResponse<SocialLink>> {
    const response = await axiosClient.get(`/social-links/${id}`)
    return response.data
  },

  async createSocialLink(data: SocialLinkFormData): Promise<ApiResponse<SocialLink>> {
    const response = await axiosClient.post("/social-links", data)
    return response.data
  },

  async updateSocialLink(id: number, data: Partial<SocialLinkFormData>): Promise<ApiResponse<SocialLink>> {
    const response = await axiosClient.put(`/social-links/${id}`, data)
    return response.data
  },

  async deleteSocialLink(id: number): Promise<ApiResponse<null>> {
    const response = await axiosClient.delete(`/social-links/${id}`)
    return response.data
  },
}
