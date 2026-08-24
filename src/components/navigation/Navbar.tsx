"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ArrowRight, Menu, X } from "lucide-react"
import { Container } from "@/components/layout/Container"
import { BrandLogo } from "@/components/brand/BrandLogo"
import { Button } from "@/components/ui/Button"
import { navigationItems } from "@/data/navigation"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const [lastPathname, setLastPathname] = useState(pathname)
  const reduceMotion = useReducedMotion()

  // Close the drawer whenever the active route changes (e.g. back/forward
  // navigation). Adjusting state during render is the React-recommended
  // alternative to syncing state inside an effect.
  if (lastPathname !== pathname) {
    setLastPathname(pathname)
    setIsOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Lock background scrolling while the mobile navigation is open.
  useEffect(() => {
    if (!isOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  const drawerRef = useRef<HTMLDivElement>(null)

  // Close the drawer on Escape key press.
  useEffect(() => {
    if (!isOpen) return
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false)
    }
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen])

  // Focus trap: keep Tab cycling through focusable elements inside the drawer.
  useEffect(() => {
    if (!isOpen) return
    const drawer = drawerRef.current
    if (!drawer) return

    // Focus the first focusable element when the drawer opens.
    const firstLink = drawer.querySelector<HTMLElement>("a, button")
    firstLink?.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return
      const focusable = drawer.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isOpen || scrolled
          ? "border-b border-border bg-background/95 py-3 shadow-[0_16px_40px_-28px_rgba(17,17,17,0.35)] backdrop-blur-md"
          : "bg-background/88 py-3 backdrop-blur-sm"
      )}
    >
      <Container>
        <nav className="flex items-center justify-between gap-6">
          <BrandLogo preload size="sm" />

          <div className="hidden items-center gap-8 md:flex">
            <ul className="flex items-center gap-7">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "relative text-sm font-medium transition-colors after:absolute after:-bottom-2 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-accent after:transition-transform",
                      pathname === item.href
                        ? "text-accent after:scale-x-100"
                        : "text-muted-foreground hover:text-foreground hover:after:scale-x-100"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Button href="/contact" size="sm">
              Start a Project
            </Button>
          </div>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </Container>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={drawerRef}
            id="mobile-navigation"
            initial={{ opacity: 0, y: reduceMotion ? 0 : -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : -10 }}
            transition={{ duration: reduceMotion ? 0 : 0.24 }}
            className="absolute inset-x-0 top-full min-h-dvh overflow-y-auto border-t border-border bg-surface/95 backdrop-blur-md md:hidden"
          >
            <Container className="py-8">
              <ul className="flex flex-col">
                {navigationItems.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: reduceMotion ? 0 : 0.06 + index * 0.05,
                      duration: reduceMotion ? 0 : 0.35,
                      ease: [0.21, 0.47, 0.32, 0.98],
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center justify-between border-b border-border/70 py-4 text-2xl font-semibold tracking-tight transition-colors",
                        pathname === item.href
                          ? "text-accent"
                          : "text-foreground hover:text-accent"
                      )}
                    >
                      {item.label}
                      <ArrowRight
                        aria-hidden
                        className={cn(
                          "h-5 w-5 transition-colors",
                          pathname === item.href
                            ? "text-accent"
                            : "text-muted-foreground"
                        )}
                      />
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: reduceMotion
                    ? 0
                    : 0.06 + navigationItems.length * 0.05,
                  duration: reduceMotion ? 0 : 0.35,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                className="pt-6"
              >
                <Button
                  href="/contact"
                  size="lg"
                  className="w-full text-lg"
                  linkOnClick={() => setIsOpen(false)}
                >
                  Start a Project
                </Button>
              </motion.div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
