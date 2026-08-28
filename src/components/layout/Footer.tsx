import Link from "next/link"
import { Container } from "@/components/layout/Container"
import { navigationItems } from "@/data/navigation"
import { siteConfig } from "@/config/site"
import { BrandLogo } from "@/components/brand/BrandLogo"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-surface py-14 md:py-18">
      <Container>
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr]">
          <div className="flex flex-col gap-6">
            <BrandLogo />
            <p className="max-w-sm text-[0.95rem] leading-relaxed text-muted-foreground">
              {siteConfig.brand.descriptor}. {siteConfig.brand.tagline}
            </p>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {new URL(siteConfig.url).hostname}
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-foreground">
              Explore
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
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-foreground">
              Contact
            </h4>
            <ul className="flex flex-col gap-4">
              <li>
                <Link
                  href="/contact"
                  className="inline-flex items-center text-sm text-muted-foreground transition-all duration-200 hover:translate-x-1 hover:text-accent"
                >
                  Start a Project
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="inline-flex items-center text-sm text-muted-foreground transition-all duration-200 hover:translate-x-1 hover:text-accent"
                >
                  BITMIND Products
                </Link>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">Located in Indonesia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 md:flex-row">
          <p className="text-xs text-muted-foreground">© {currentYear} BITMIND STUDIO</p>
          <p className="text-xs text-muted-foreground">Independent studio for digital products and experiences</p>
        </div>
      </Container>
    </footer>
  )
}
