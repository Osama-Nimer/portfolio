import { API_BASE_URL, KEEP_ALIVE_PATH } from "@/src/utils/constants"

// Always run on request: a cached response would never reach the backend.
export const dynamic = "force-dynamic"
// Render's cold start can take up to a minute.
export const maxDuration = 60

/**
 * GET /api/keep-alive pings the backend from the server and reports whether
 * it answered. Any external scheduler (cron-job.org, UptimeRobot, Vercel
 * Cron) can call this URL to keep the Render service awake.
 */
export async function GET() {
  const started = Date.now()
  try {
    const res = await fetch(`${API_BASE_URL}${KEEP_ALIVE_PATH}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(55_000),
    })
    return Response.json(
      { ok: res.ok, status: res.status, ms: Date.now() - started },
      { status: res.ok ? 200 : 502, headers: { "Cache-Control": "no-store" } },
    )
  } catch (error) {
    return Response.json(
      { ok: false, error: error instanceof Error ? error.message : "Request failed", ms: Date.now() - started },
      { status: 502, headers: { "Cache-Control": "no-store" } },
    )
  }
}
