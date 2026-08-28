"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"

type Theme = "light" | "dark" | "system"

interface ThemeContextType {
  theme: Theme
  resolvedTheme: "light" | "dark"
  mounted: boolean
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "system"
  return (localStorage.getItem("theme") as Theme) ?? "system"
}

function getResolvedTheme(theme: Theme): "light" | "dark" {
  if (typeof window === "undefined") return "light"
  if (theme === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  }
  return theme
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("system")
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light")
  const [mounted, setMounted] = useState(false)

  // Mount: read actual theme and sync state + DOM
  useEffect(() => {
    const initial = getInitialTheme()
    const resolved = getResolvedTheme(initial)
    setTheme(initial)
    setResolvedTheme(resolved)
    setMounted(true)
    document.documentElement.classList.remove("light", "dark")
    document.documentElement.classList.add(resolved)
    localStorage.setItem("theme", initial)
  }, [])

  // Persist theme changes
  useEffect(() => {
    if (!mounted) return
    document.documentElement.classList.remove("light", "dark")
    document.documentElement.classList.add(resolvedTheme)
    localStorage.setItem("theme", theme)
  }, [theme, resolvedTheme, mounted])

  // Listen for system preference changes when theme is "system"
  useEffect(() => {
    if (!mounted || theme !== "system") return

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = (e: MediaQueryListEvent) => {
      const resolved = e.matches ? "dark" : "light"
      setResolvedTheme(resolved)
      document.documentElement.classList.remove("light", "dark")
      document.documentElement.classList.add(resolved)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [theme, mounted])

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme)
    const resolved = getResolvedTheme(newTheme)
    setResolvedTheme(resolved)
  }

  return (
    <ThemeContext.Provider
      value={{ theme, resolvedTheme, mounted, setTheme: handleSetTheme }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}