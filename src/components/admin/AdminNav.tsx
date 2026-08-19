"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const adminLinks = [
  ["Overview", "/admin"],
  ["Projects", "/admin/projects"],
  ["Products", "/admin/products"],
] as const

export function AdminNav() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Admin navigation"
      className="mt-7 flex gap-2 overflow-x-auto lg:flex-col"
    >
      {adminLinks.map(([label, href]) => {
        const active =
          href === "/admin" ? pathname === href : pathname.startsWith(href)
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              active
                ? "bg-brand-primary-soft text-brand-primary-dark"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
