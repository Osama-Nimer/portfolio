import axiosClient from "./axios-client"
import type { Message, MessageFormData } from "@/src/types/messages.types"
import type { ApiResponse } from "@/src/types/api.types"

export const messagesService = {
  async getAll(unread?: boolean): Promise<ApiResponse<Message[]>> {
    const params = typeof unread === "boolean" ? { unread } : {}
    const response = await axiosClient.get("/messages", { params })
    return response.data
  },

  async getById(id: number): Promise<ApiResponse<Message>> {
    const response = await axiosClient.get(`/messages/${id}`)
    return response.data
  },

  async create(data: MessageFormData): Promise<ApiResponse<Message>> {
    const response = await axiosClient.post("/messages", data)
    return response.data
  },

  async markAsRead(id: number): Promise<ApiResponse<Message>> {
    const response = await axiosClient.put(`/messages/${id}`, { read: true })
    return response.data
  },

  async delete(id: number): Promise<ApiResponse<null>> {
    const response = await axiosClient.delete(`/messages/${id}`)
    return response.data
  },
}
