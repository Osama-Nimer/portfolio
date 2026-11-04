"use client"

import { useCallback, useEffect, useSyncExternalStore } from "react"

/**
 * Light / dark theme, the same model as the FixApi site: the visitor picks
 * light, dark or device. Device (also what they get before picking anything)
 * follows the system setting and keeps following it while the page is open.
 * The class on <html> is set before first paint by THEME_SCRIPT (app/layout.tsx).
 */

export type ThemeChoice = "light" | "dark" | "system"
export type ResolvedTheme = "light" | "dark"

export const THEME_KEY = "theme"
const CHOICE_EVENT = "portfolio:theme-choice"
const LIGHT_QUERY = "(prefers-color-scheme: light)"

/** Runs inline in <head>, dependency-free; storage can throw, then the system setting decides. */
export const THEME_SCRIPT = `(function(){var t=null;try{t=localStorage.getItem(${JSON.stringify(
  THEME_KEY,
)})}catch(e){}if(t!=="light"&&t!=="dark"){t=window.matchMedia&&window.matchMedia("${LIGHT_QUERY}").matches?"light":"dark"}var r=document.documentElement;r.classList.remove("light","dark");r.classList.add(t);r.style.colorScheme=t})();`

function readChoice(): ThemeChoice {
  let saved: string | null = null
  try {
    saved = localStorage.getItem(THEME_KEY)
  } catch {
    // Storage blocked: fall through to the system setting.
  }
  return saved === "light" || saved === "dark" ? saved : "system"
}

function resolve(choice: ThemeChoice): ResolvedTheme {
  if (choice !== "system") return choice
  return window.matchMedia?.(LIGHT_QUERY).matches ? "light" : "dark"
}

function apply(theme: ResolvedTheme) {
  const root = document.documentElement
  if (root.classList.contains(theme)) return
  const swap = () => {
    root.classList.remove("light", "dark")
    root.classList.add(theme)
    root.style.colorScheme = theme
  }
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  if (!reduce && typeof document.startViewTransition === "function") {
    document.startViewTransition(swap)
  } else {
    swap()
  }
}

function subscribe(onChange: () => void) {
  const media = window.matchMedia?.(LIGHT_QUERY)
  const onStorage = (e: StorageEvent) => {
    if (e.key === THEME_KEY || e.key === null) onChange()
  }
  window.addEventListener(CHOICE_EVENT, onChange)
  window.addEventListener("storage", onStorage)
  media?.addEventListener("change", onChange)
  return () => {
    window.removeEventListener(CHOICE_EVENT, onChange)
    window.removeEventListener("storage", onStorage)
    media?.removeEventListener("change", onChange)
  }
}

export function useTheme() {
  const theme = useSyncExternalStore<ThemeChoice>(subscribe, readChoice, () => "system")
  const resolvedTheme = useSyncExternalStore<ResolvedTheme>(
    subscribe,
    () => resolve(readChoice()),
    () => "dark",
  )

  // Keep <html> in step with the choice (also when the device flips while on "system").
  useEffect(() => {
    apply(resolvedTheme)
  }, [resolvedTheme])

  const setTheme = useCallback((choice: ThemeChoice) => {
    try {
      localStorage.setItem(THEME_KEY, choice)
    } catch {
      // Storage blocked: the choice still applies for this visit.
    }
    window.dispatchEvent(new Event(CHOICE_EVENT))
  }, [])

  /** Light → dark → device, the order the theme button steps through. */
  const cycleTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : theme === "dark" ? "system" : "light")
  }, [theme, setTheme])

  return { theme, setTheme, cycleTheme, resolvedTheme, isDark: resolvedTheme === "dark" }
}
