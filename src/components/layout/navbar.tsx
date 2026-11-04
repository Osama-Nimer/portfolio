"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowRight, Menu, Monitor, Moon, Sun, X } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useTheme } from "@/src/hooks/use-theme"
import { ROUTES } from "@/src/utils/constants"
import { BrandWordmark } from "@/src/components/shared/brand"
import { pillClass } from "@/src/components/shared/motif"

const navLinks = [
  { href: ROUTES.HOME, label: "Home" },
  { href: ROUTES.ABOUT, label: "About" },
  { href: ROUTES.SKILLS, label: "Skills" },
  { href: ROUTES.PROJECTS, label: "Projects" },
  { href: ROUTES.SERVICES, label: "Services" },
  { href: ROUTES.CONTACT, label: "Contact" },
]

const FOCUS_RING =
  "outline-none focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"

function isActive(pathname: string, href: string) {
  return href === ROUTES.HOME ? pathname === href : pathname === href || pathname.startsWith(`${href}/`)
}

const THEME_LABEL = { light: "Light", dark: "Dark", system: "Device" } as const

/** Shows the visitor's choice (sun, moon or monitor for "Device"); a click steps to the next one. */
function ThemeToggle() {
  const { theme, cycleTheme } = useTheme()
  const Icon = theme === "light" ? Sun : theme === "dark" ? Moon : Monitor
  return (
    <button
      type="button"
      onClick={cycleTheme}
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground",
        FOCUS_RING,
      )}
      aria-label={`Theme: ${THEME_LABEL[theme]}. Switch theme`}
      title={`Theme: ${THEME_LABEL[theme]}`}
    >
      <Icon className="size-[18px]" />
    </button>
  )
}

/**
 * One floating capsule: solid and hairlined from the first paint, sticky in
 * the flow. Once the page moves, the hairline steps up one shade to separate
 * it from the content passing under it.
 */
export function Navbar() {
  const pathname = usePathname()
  const reduceMotion = useReducedMotion()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close the mobile menu on route change.
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <header
      className={cn(
        "sticky top-3 z-50 mx-auto mt-3 w-[calc(100%-1.5rem)] max-w-6xl rounded-full border bg-background p-2 pl-5 transition-[border-color] duration-300 ease-out sm:top-4 sm:mt-4 sm:w-[calc(100%-2rem)] sm:pl-6",
        scrolled || open ? "border-line-strong" : "border-line",
      )}
    >
      <div className="grid grid-cols-[1fr_auto] items-center gap-3 lg:grid-cols-[1fr_auto_1fr]">
        <Link href={ROUTES.HOME} aria-label="Osama Nimer, home" className={cn("-m-1 justify-self-start rounded-md p-1", FOCUS_RING)}>
          <BrandWordmark />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {navLinks.map((link) => {
              const active = isActive(pathname, link.href)
              return (
                <li key={link.href} className="relative">
                  {active && (
                    <motion.span
                      layoutId="nav-highlight"
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full bg-foreground/[0.07]"
                      transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 36 }}
                    />
                  )}
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative block whitespace-nowrap rounded-full px-4 py-2 text-sm transition-colors duration-200",
                      active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                      FOCUS_RING,
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5 justify-self-end sm:gap-2">
          <ThemeToggle />
          <Link href={ROUTES.CONTACT} className={pillClass({ size: "sm", className: "group max-sm:hidden" })}>
            Let&apos;s talk
            <ArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "inline-flex size-9 items-center justify-center rounded-full border border-line-strong text-foreground transition-colors hover:bg-foreground/[0.06] lg:hidden",
              FOCUS_RING,
            )}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? <X className="size-[18px]" /> : <Menu className="size-[18px]" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Main"
            initial={reduceMotion ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-[calc(100%+0.5rem)] rounded-3xl border border-line-strong bg-background p-2 lg:hidden"
          >
            <ul className="flex flex-col">
              {navLinks.map((link) => {
                const active = isActive(pathname, link.href)
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center justify-between rounded-2xl px-4 py-3 text-[15px] transition-colors",
                        active
                          ? "bg-foreground/[0.07] text-foreground"
                          : "text-muted-foreground hover:bg-foreground/[0.04] hover:text-foreground",
                        FOCUS_RING,
                      )}
                    >
                      {link.label}
                      {active && <span aria-hidden="true" className="size-1.5 rounded-full bg-foreground" />}
                    </Link>
                  </li>
                )
              })}
            </ul>
            <div className="mt-2 border-t border-line p-2 pt-4">
              <Link href={ROUTES.CONTACT} className={pillClass({ className: "w-full" })}>
                Let&apos;s talk
                <ArrowRight />
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
