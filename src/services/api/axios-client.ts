import axios, { type AxiosError, type AxiosResponse } from "axios"
import { API_BASE_URL } from "@/src/utils/constants"

// Create axios instance
const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
})

// Response interceptor for error handling
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    // Format error message
    const errorMessage =
      (error.response?.data as { error?: string })?.error || error.message || "An unexpected error occurred"

    return Promise.reject(new Error(errorMessage))
  },
)

export default axiosClient
