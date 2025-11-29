"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/src/stores/auth/auth.store"
import { PageLoader } from "@/src/components/shared/loading-spinner"
import { ROUTES } from "@/src/utils/constants"

interface AuthGuardProps {
  children: React.ReactNode
  requireAdmin?: boolean
}

export function AuthGuard({ children, requireAdmin = false }: AuthGuardProps) {
  const router = useRouter()
  const { isLoggedIn, user, isLoading } = useAuthStore()

  useEffect(() => {
    if (!isLoading) {
      if (!isLoggedIn) {
        router.push(ROUTES.LOGIN)
      } else if (requireAdmin && user?.role !== "admin") {
        router.push(ROUTES.HOME)
      }
    }
  }, [isLoggedIn, user, isLoading, requireAdmin, router])

  if (isLoading) {
    return <PageLoader />
  }

  if (!isLoggedIn) {
    return <PageLoader />
  }

  if (requireAdmin && user?.role !== "admin") {
    return <PageLoader />
  }

  return <>{children}</>
}
