import axiosClient from "./axios-client"
import type { Project, ProjectFormData, Tag } from "@/src/types/projects.types"
import type { ApiResponse } from "@/src/types/api.types"

export const projectsService = {
  // Projects endpoints
  async getAll(params?: { featured?: boolean; tagId?: number }): Promise<ApiResponse<Project[]>> {
    const response = await axiosClient.get("/projects", { params })
    return response.data
  },

  async getById(id: number): Promise<ApiResponse<Project>> {
    const response = await axiosClient.get(`/projects/${id}`)
    return response.data
  },

  async create(data: ProjectFormData): Promise<ApiResponse<Project>> {
    const response = await axiosClient.post("/projects", data)
    return response.data
  },

  async update(id: number, data: Partial<ProjectFormData>): Promise<ApiResponse<Project>> {
    const response = await axiosClient.put(`/projects/${id}`, data)
    return response.data
  },

  async delete(id: number): Promise<ApiResponse<null>> {
    const response = await axiosClient.delete(`/projects/${id}`)
    return response.data
  },

  // Tags endpoints
  async getAllTags(): Promise<ApiResponse<Tag[]>> {
    const response = await axiosClient.get("/tags")
    return response.data
  },

  async getTagById(id: number): Promise<ApiResponse<Tag>> {
    const response = await axiosClient.get(`/tags/${id}`)
    return response.data
  },

  async createTag(name: string): Promise<ApiResponse<Tag>> {
    const response = await axiosClient.post("/tags", { name })
    return response.data
  },

  async updateTag(id: number, name: string): Promise<ApiResponse<Tag>> {
    const response = await axiosClient.put(`/tags/${id}`, { name })
    return response.data
  },

  async deleteTag(id: number): Promise<ApiResponse<null>> {
    const response = await axiosClient.delete(`/tags/${id}`)
    return response.data
  },
}
