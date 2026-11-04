"use client"

import { useEffect } from "react"
import { API_BASE_URL, KEEP_ALIVE_INTERVAL_MS, KEEP_ALIVE_PATH } from "@/src/utils/constants"

/**
 * Pings the backend every 10 minutes while the site is open, so a visitor who
 * lingers never hits a cold start. Skips pings while the tab is hidden and
 * catches up as soon as it is visible again. Renders nothing.
 *
 * This only runs while someone has the site open; the scheduled GitHub
 * Actions workflow (.github/workflows/keep-backend-awake.yml) covers the
 * hours with no visitors.
 */
export function KeepAlive() {
  useEffect(() => {
    let last = 0

    const ping = () => {
      if (document.visibilityState !== "visible") return
      if (Date.now() - last < KEEP_ALIVE_INTERVAL_MS - 5_000) return
      last = Date.now()
      // Fire and forget: a failed ping must never surface to the visitor.
      fetch(`${API_BASE_URL}${KEEP_ALIVE_PATH}`, { cache: "no-store", credentials: "omit" }).catch(() => {})
    }

    // The page's own data requests wake the backend on load; start counting from now.
    last = Date.now()
    const timer = window.setInterval(ping, KEEP_ALIVE_INTERVAL_MS)
    document.addEventListener("visibilitychange", ping)
    return () => {
      window.clearInterval(timer)
      document.removeEventListener("visibilitychange", ping)
    }
  }, [])

  return null
}
