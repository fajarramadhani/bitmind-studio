"use client"

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react"
import { cn } from "@/lib/utils"

type ToastTone = "success" | "error"

type ToastItem = {
  id: string
  message: string
  tone: ToastTone
}

type ToastContextValue = {
  pushToast: (toast: Omit<ToastItem, "id">) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function useAdminToast() {
  const context = useContext(ToastContext)
  if (!context) throw new Error("useAdminToast must be used within AdminToastProvider.")
  return context
}

export function AdminToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const seenRef = useRef(new Set<string>())

  const dismissToast = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const pushToast = useCallback((toast: Omit<ToastItem, "id">) => {
    const key = `${toast.tone}:${toast.message}`
    if (seenRef.current.has(key)) return
    seenRef.current.add(key)
    const id = crypto.randomUUID()
    setToasts((current) => [...current, { ...toast, id }])
    window.setTimeout(() => {
      dismissToast(id)
      seenRef.current.delete(key)
    }, 4000)
  }, [dismissToast])

  const value = useMemo(() => ({ pushToast }), [pushToast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="pointer-events-none fixed inset-x-4 top-4 z-[120] flex flex-col items-center gap-3 sm:left-auto sm:right-4 sm:w-full sm:max-w-sm"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cn(
              "pointer-events-auto w-full rounded-xl border px-4 py-3 shadow-lg backdrop-blur-sm transition-all",
              toast.tone === "success"
                ? "border-brand-primary/15 bg-surface text-foreground"
                : "border-red-200 bg-red-50 text-red-900"
            )}
            role={toast.tone === "error" ? "alert" : "status"}
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm font-medium leading-6">{toast.message}</p>
              <button
                type="button"
                onClick={() => dismissToast(toast.id)}
                className="rounded-md p-1 text-xs text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Dismiss notification"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
