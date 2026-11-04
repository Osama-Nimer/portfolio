import type { ReactNode } from "react"

export function EmptyState({ children }: { children: ReactNode }) {
  return (
    <div className="fx-dots rounded-xl border border-dashed border-line-strong py-16 text-center">
      <p className="text-sm text-muted-foreground">{children}</p>
    </div>
  )
}
