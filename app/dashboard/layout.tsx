import type React from "react"
import { AuthGuard } from "@/src/components/auth/auth-guard"
import { DashboardSidebar } from "@/src/components/dashboard/dashboard-sidebar"
import { DashboardHeader } from "@/src/components/dashboard/dashboard-header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard requireAdmin>
      <div className="flex min-h-screen">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 p-6 bg-secondary/30">{children}</main>
        </div>
      </div>
    </AuthGuard>
  )
}
