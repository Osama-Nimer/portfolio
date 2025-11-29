"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Moon, Sun, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "@/src/hooks/use-theme"
import { useAuthStore } from "@/src/stores/auth/auth.store"
import { Container } from "@/src/components/ui/container"
import { Button } from "@/components/ui/button"
import { ROUTES } from "@/src/utils/constants"

const navLinks = [
  { href: ROUTES.HOME, label: "Home" },
  { href: ROUTES.ABOUT, label: "About" },
  { href: ROUTES.SKILLS, label: "Skills" },
  { href: ROUTES.PROJECTS, label: "Projects" },
  { href: ROUTES.SERVICES, label: "Services" },
  { href: ROUTES.CONTACT, label: "Contact" },
]

export function Navbar() {
  const pathname = usePathname()
  const { theme, setTheme, isDark } = useTheme()
  const { isLoggedIn, user } = useAuthStore()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent",
      )}
    >
      <Container>
        <nav className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href={ROUTES.HOME} className="flex items-center gap-2">
            <span className="text-2xl font-bold text-main">Osama Nimer</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-main",
                  pathname === link.href ? "text-main" : "text-muted-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Theme toggle */}
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Auth */}
            {isLoggedIn ? (
              <Link href={ROUTES.DASHBOARD}>
                <Button variant="outline" size="sm" className="hidden sm:inline-flex bg-transparent">
                  <User className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link href={ROUTES.LOGIN}>
                <Button size="sm" className="hidden bg-main text-foreground hover:bg-main-dark sm:inline-flex">
                  Login
                </Button>
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors md:hidden"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </Container>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <Container>
            <div className="flex flex-col gap-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-main",
                    pathname === link.href ? "text-main" : "text-muted-foreground",
                  )}
                >
                  {link.label}
                </Link>
              ))}

              <div className="mt-2 pt-4 border-t border-border">
                {isLoggedIn ? (
                  <Link href={ROUTES.DASHBOARD}>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      <User className="mr-2 h-4 w-4" />
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <Link href={ROUTES.LOGIN}>
                    <Button size="sm" className="w-full bg-main text-foreground hover:bg-main-dark">
                      Login
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </Container>
        </div>
      )}
    </header>
  )
}
