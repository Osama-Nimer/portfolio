"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  User,
  Wrench,
  FolderKanban,
  Briefcase,
  MessageSquare,
  Award,
  Building2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useUIStore } from "@/src/stores/ui/ui.store"
import { ROUTES } from "@/src/utils/constants"

const sidebarLinks = [
  { href: ROUTES.DASHBOARD, label: "Dashboard", icon: LayoutDashboard },
  { href: ROUTES.ADMIN_ABOUT, label: "About", icon: User },
  { href: ROUTES.ADMIN_SKILLS, label: "Skills", icon: Wrench },
  { href: ROUTES.ADMIN_PROJECTS, label: "Projects", icon: FolderKanban },
  { href: ROUTES.ADMIN_SERVICES, label: "Services", icon: Briefcase },
  { href: ROUTES.ADMIN_MESSAGES, label: "Messages", icon: MessageSquare },
  { href: ROUTES.ADMIN_EXPERIENCE, label: "Experience", icon: Building2 },
  { href: ROUTES.ADMIN_CERTIFICATES, label: "Certificates", icon: Award },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const { isSidebarOpen, toggleSidebar } = useUIStore()

  return (
    <aside
      className={cn(
        "relative flex flex-col border-r border-border bg-card transition-all duration-300",
        isSidebarOpen ? "w-64" : "w-16",
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-center border-b border-border px-4">
        <Link href={ROUTES.HOME} className="flex items-center gap-2">
          <span className={cn("text-xl font-bold text-main", !isSidebarOpen && "hidden")}>Portfolio</span>
          {!isSidebarOpen && <span className="text-xl font-bold text-main">P</span>}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive ? "bg-main text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <link.icon className="h-5 w-5 flex-shrink-0" />
              {isSidebarOpen && <span>{link.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Toggle button */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:text-foreground shadow-sm"
      >
        {isSidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </button>
    </aside>
  )
}
