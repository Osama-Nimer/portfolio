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

const colors = {
  success: "border-green-500 bg-green-50 dark:bg-green-950",
  error: "border-destructive bg-red-50 dark:bg-red-950",
  warning: "border-yellow-500 bg-yellow-50 dark:bg-yellow-950",
  info: "border-main bg-main/10",
}

const iconColors = {
  success: "text-green-500",
  error: "text-destructive",
  warning: "text-yellow-500",
  info: "text-main",
}

export function ToastContainer() {
  const { toasts, removeToast } = useUIStore()

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
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
      className={cn("flex w-80 items-start gap-3 rounded-lg border-l-4 p-4 shadow-lg animate-slide-up", colors[type])}
    >
      <Icon className={cn("h-5 w-5 flex-shrink-0", iconColors[type])} />
      <div className="flex-1">
        <p className="font-medium text-foreground">{title}</p>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
