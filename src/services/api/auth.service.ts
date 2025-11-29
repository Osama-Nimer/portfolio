import axiosClient from "./axios-client"
import type { AuthResponse, LoginCredentials, RegisterCredentials, RefreshResponse, User } from "@/src/types/auth.types"
import type { ApiResponse } from "@/src/types/api.types"

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await axiosClient.post<AuthResponse>("/auth/login", credentials)
    return response.data
  },

  async register(
    credentials: RegisterCredentials,
  ): Promise<ApiResponse<{ user: User; emailVerificationToken: string }>> {
    const response = await axiosClient.post("/auth/register", credentials)
    return response.data
  },

  async logout(): Promise<ApiResponse<null>> {
    const response = await axiosClient.post("/auth/logout")
    return response.data
  },

  async refreshToken(): Promise<RefreshResponse> {
    const response = await axiosClient.post<RefreshResponse>("/auth/refresh")
    return response.data
  },

  async verifyEmail(token: string): Promise<ApiResponse<null>> {
    const response = await axiosClient.post("/auth/verify-email", { token })
    return response.data
  },

  async resendVerification(email: string): Promise<ApiResponse<null>> {
    const response = await axiosClient.post("/auth/resend-verification", { email })
    return response.data
  },
}
