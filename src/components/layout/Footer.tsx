import Link from "next/link"
import { Container } from "@/components/layout/Container"
import { navigationItems } from "@/data/navigation"
import { siteConfig } from "@/config/site"
import { BrandLogo } from "@/components/brand/BrandLogo"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-surface py-12 md:py-16">
      <Container>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[2fr_1fr]">
          <div className="flex flex-col gap-6">
            <BrandLogo />
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              {siteConfig.brand.descriptor}. {siteConfig.brand.tagline}
            </p>
            <p className="text-sm text-muted-foreground">
              {new URL(siteConfig.url).hostname}
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Studio
            </h4>
            <ul className="flex flex-col gap-4">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground transition-colors hover:text-accent"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 md:flex-row">
          <p className="text-xs text-muted-foreground">
            © {currentYear} BITMIND STUDIO
          </p>
          <p className="text-xs text-muted-foreground">
            Located in Indonesia
          </p>
        </div>
      </Container>
    </footer>
  )
}
