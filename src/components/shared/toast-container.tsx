"use client"

import { useEffect } from "react"
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import { useUIStore } from "@/src/stores/ui/ui.store"

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
}

const iconColors = {
  success: "text-success",
  error: "text-danger",
  warning: "text-warning",
  info: "text-foreground",
}

export function ToastContainer() {
  const { toasts, removeToast } = useUIStore()

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2" role="status" aria-live="polite">
      {toasts.map((toast) => {
        const Icon = icons[toast.type]

        return (
          <ToastItem
            key={toast.id}
            id={toast.id}
            title={toast.title}
            description={toast.description}
            type={toast.type}
            Icon={Icon}
            onClose={() => removeToast(toast.id)}
          />
        )
      })}
    </div>
  )
}

interface ToastItemProps {
  id: string
  title: string
  description?: string
  type: "success" | "error" | "warning" | "info"
  Icon: typeof CheckCircle
  onClose: () => void
}

function ToastItem({ id, title, description, type, Icon, onClose }: ToastItemProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 5000)

    return () => clearTimeout(timer)
  }, [id, onClose])

  return (
    <div
      className="flex w-[min(20rem,calc(100vw-2rem))] items-start gap-3 rounded-xl border border-line-strong bg-popover p-4 animate-slide-up"
    >
      <Icon className={cn("mt-0.5 size-[18px] shrink-0", iconColors[type])} />
      <div className="flex-1">
        <p className="text-sm font-medium text-foreground">{title}</p>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      <button onClick={onClose} aria-label="Dismiss" className="rounded-full p-0.5 text-subtle transition-colors hover:text-foreground">
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
