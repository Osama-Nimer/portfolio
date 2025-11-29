import axios, { type AxiosError, type InternalAxiosRequestConfig, type AxiosResponse } from "axios"
import { API_BASE_URL, TOKEN_KEY } from "@/src/utils/constants"

// Create axios instance
const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // For refresh token cookie
})

// Request interceptor to add auth token
axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem(TOKEN_KEY)
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

// Response interceptor for error handling and token refresh
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

    // Handle 401 errors (token expired)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // Try to refresh the token
        const refreshResponse = await axios.post(`${API_BASE_URL}/auth/refresh`, {}, { withCredentials: true })

        if (refreshResponse.data.success) {
          const newToken = refreshResponse.data.data.accessToken

          // Store new token
          if (typeof window !== "undefined") {
            localStorage.setItem(TOKEN_KEY, newToken)
          }

          // Retry original request with new token
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newToken}`
          }

          return axiosClient(originalRequest)
        }
      } catch (refreshError) {
        // Refresh failed, clear auth data
        if (typeof window !== "undefined") {
          localStorage.removeItem(TOKEN_KEY)
          window.location.href = "/login"
        }
        return Promise.reject(refreshError)
      }
    }

    // Format error message
    const errorMessage =
      (error.response?.data as { error?: string })?.error || error.message || "An unexpected error occurred"

    return Promise.reject(new Error(errorMessage))
  },
)

export default axiosClient
