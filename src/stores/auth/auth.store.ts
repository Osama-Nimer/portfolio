import { create } from "zustand"
import { persist } from "zustand/middleware"
import { authService } from "@/src/services/api/auth.service"
import type { AuthState, LoginCredentials, RegisterCredentials, User } from "@/src/types/auth.types"
import { TOKEN_KEY } from "@/src/utils/constants"

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      isLoggedIn: false,
      isLoading: false,
      error: null,

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null })
        try {
          const response = await authService.login(credentials)

          if (response.success) {
            const { accessToken, user } = response.data

            // Store token in localStorage
            if (typeof window !== "undefined") {
              localStorage.setItem(TOKEN_KEY, accessToken)
            }

            set({
              user,
              accessToken,
              isLoggedIn: true,
              isLoading: false,
              error: null,
            })
          } else {
            throw new Error("Login failed")
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : "Login failed"
          set({ isLoading: false, error: errorMessage })
          throw error
        }
      },

      register: async (credentials: RegisterCredentials) => {
        set({ isLoading: true, error: null })
        try {
          const response = await authService.register(credentials)

          if (response.success) {
            set({ isLoading: false, error: null })
          } else {
            throw new Error("Registration failed")
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : "Registration failed"
          set({ isLoading: false, error: errorMessage })
          throw error
        }
      },

      logout: async () => {
        set({ isLoading: true })
        try {
          await authService.logout()
        } catch {
          // Continue with logout even if API call fails
        } finally {
          // Clear local storage
          if (typeof window !== "undefined") {
            localStorage.removeItem(TOKEN_KEY)
          }

          set({
            user: null,
            accessToken: null,
            isLoggedIn: false,
            isLoading: false,
            error: null,
          })
        }
      },

      refreshToken: async () => {
        try {
          const response = await authService.refreshToken()

          if (response.success) {
            const { accessToken } = response.data

            if (typeof window !== "undefined") {
              localStorage.setItem(TOKEN_KEY, accessToken)
            }

            set({ accessToken })
            return accessToken
          }
          return null
        } catch {
          // Token refresh failed, logout
          get().logout()
          return null
        }
      },

      setUser: (user: User | null) => {
        set({ user, isLoggedIn: !!user })
      },

      clearError: () => {
        set({ error: null })
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        isLoggedIn: state.isLoggedIn,
      }),
    },
  ),
)
