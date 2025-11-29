"use client"

import { useRouter } from "next/navigation"
import { LogOut, Moon, Sun, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/src/stores/auth/auth.store"
import { useTheme } from "@/src/hooks/use-theme"
import { useUIStore } from "@/src/stores/ui/ui.store"
import { ROUTES } from "@/src/utils/constants"

export function DashboardHeader() {
  const router = useRouter()
  const { user, logout } = useAuthStore()
  const { isDark, setTheme } = useTheme()
  const { addToast } = useUIStore()

  const handleLogout = async () => {
    await logout()
    addToast({
      title: "Logged out",
      description: "You have been successfully logged out.",
      type: "info",
    })
    router.push(ROUTES.LOGIN)
  }

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6">
      <div>
        <h1 className="text-lg font-semibold text-foreground">Admin Dashboard</h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Theme toggle */}
        <button
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>

        {/* User info */}
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-main text-foreground">
            <User className="h-4 w-4" />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-foreground">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
        </div>

        {/* Logout */}
        <Button variant="ghost" size="sm" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </header>
  )
}
