"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { FadeIn } from "@/components/shared/FadeIn"
import { cn } from "@/lib/utils"
import type { FAQ } from "@/data/faqs"

function FAQItem({ item, index }: { item: FAQ; index: number }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-border">
      <button
        id={`faq-heading-${index}`}
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-4 rounded-lg py-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
        aria-expanded={isOpen}
        aria-controls={`faq-${index}`}
      >
        <h3 className="text-lg font-medium text-foreground pr-4">
          {item.question}
        </h3>
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <div
        id={`faq-${index}`}
        role="region"
        aria-labelledby={`faq-heading-${index}`}
        aria-hidden={!isOpen}
        className={cn(
          "overflow-hidden transition-all duration-300",
          isOpen ? "max-h-96 pb-6" : "max-h-0"
        )}
      >
        <p className="text-base leading-relaxed text-muted-foreground">
          {item.answer}
        </p>
      </div>
    </div>
  )
}

export function FAQSection({ items }: { items: FAQ[] }) {
  if (!items || items.length === 0) return null

  return (
    <Section className="bg-surface border-t border-border">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-24">
          <FadeIn>
            <div className="flex flex-col gap-4 mb-8 lg:mb-0">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                FAQ
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                Frequently Asked Questions
              </h2>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex flex-col">
              {items.map((item, i) => (
                <FAQItem key={i} item={item} index={i} />
              ))}
            </div>
          </FadeIn>
        </div>
      </Container>
    </Section>
  )
}
