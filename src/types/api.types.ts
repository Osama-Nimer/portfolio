export interface ApiResponse<T> {
  success: boolean
  message?: string
  data: T
  error?: string
}

export interface ApiError {
  success: false
  error: string
}

export interface PaginationParams {
  page?: number
  limit?: number
}
