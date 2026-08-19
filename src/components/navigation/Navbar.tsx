"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Container } from "@/components/layout/Container"
import { BrandLogo } from "@/components/brand/BrandLogo"
import { Button } from "@/components/ui/Button"
import { navigationItems } from "@/data/navigation"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isOpen
          ? "border-b border-border bg-background py-3"
          : scrolled
          ? "border-b border-border bg-background/95 py-3 backdrop-blur-sm"
          : "bg-background/90 py-3 backdrop-blur-sm"
      )}
    >
      <Container>
        <nav className="flex items-center justify-between">
          <BrandLogo preload size="sm" />

          <div className="hidden items-center gap-8 md:flex">
            <ul className="flex items-center gap-8">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "relative text-sm font-medium transition-colors hover:text-accent",
                      pathname === item.href
                        ? "text-accent"
                        : "text-muted-foreground"
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
            className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </Container>

      {isOpen && (
        <div
          id="mobile-navigation"
          className="absolute inset-x-0 top-full min-h-dvh overflow-y-auto border-t border-border bg-background md:hidden"
        >
          <Container className="py-8">
            <ul className="flex flex-col gap-6">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "text-2xl font-semibold transition-colors",
                      pathname === item.href ? "text-accent" : "text-foreground"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-4">
                <Button
                  href="/contact"
                  className="w-full text-lg"
                  linkOnClick={() => setIsOpen(false)}
                >
                  Start a Project
                </Button>
              </li>
            </ul>
          </Container>
        </div>
      )}
    </header>
  )
}
