import axiosClient from "./axios-client"
import type { Skill, SkillFormData, SkillCategory, SkillCategoryFormData } from "@/src/types/skills.types"
import type { ApiResponse } from "@/src/types/api.types"

export const skillsService = {
  // Skills endpoints
  async getAll(categoryId?: number): Promise<ApiResponse<Skill[]>> {
    const params = categoryId ? { categoryId } : {}
    const response = await axiosClient.get("/skills", { params })
    return response.data
  },

  async getById(id: number): Promise<ApiResponse<Skill>> {
    const response = await axiosClient.get(`/skills/${id}`)
    return response.data
  },

  async create(data: SkillFormData): Promise<ApiResponse<Skill>> {
    const response = await axiosClient.post("/skills", data)
    return response.data
  },

  async update(id: number, data: Partial<SkillFormData>): Promise<ApiResponse<Skill>> {
    const response = await axiosClient.put(`/skills/${id}`, data)
    return response.data
  },

  async delete(id: number): Promise<ApiResponse<null>> {
    const response = await axiosClient.delete(`/skills/${id}`)
    return response.data
  },

  // Skill Categories endpoints
  async getAllCategories(): Promise<ApiResponse<SkillCategory[]>> {
    const response = await axiosClient.get("/skill-categories")
    return response.data
  },

  async getCategoryById(id: number): Promise<ApiResponse<SkillCategory>> {
    const response = await axiosClient.get(`/skill-categories/${id}`)
    return response.data
  },

  async createCategory(data: SkillCategoryFormData): Promise<ApiResponse<SkillCategory>> {
    const response = await axiosClient.post("/skill-categories", data)
    return response.data
  },

  async updateCategory(id: number, data: Partial<SkillCategoryFormData>): Promise<ApiResponse<SkillCategory>> {
    const response = await axiosClient.put(`/skill-categories/${id}`, data)
    return response.data
  },

  async deleteCategory(id: number): Promise<ApiResponse<null>> {
    const response = await axiosClient.delete(`/skill-categories/${id}`)
    return response.data
  },
}
