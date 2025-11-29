export interface User {
  id: number
  email: string
  firstName: string
  lastName: string
  role: "user" | "admin"
  isEmailVerified: boolean
  createdAt?: string
  updatedAt?: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface AuthResponse {
  success: boolean
  message: string
  data: {
    accessToken: string
    user: User
  }
}

export interface RefreshResponse {
  success: boolean
  data: {
    accessToken: string
  }
}

export interface AuthState {
  user: User | null
  accessToken: string | null
  isLoggedIn: boolean
  isLoading: boolean
  error: string | null
  login: (credentials: LoginCredentials) => Promise<void>
  register: (credentials: RegisterCredentials) => Promise<void>
  logout: () => Promise<void>
  refreshToken: () => Promise<string | null>
  setUser: (user: User | null) => void
  clearError: () => void
}
