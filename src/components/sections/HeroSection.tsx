"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import { Container } from "@/components/layout/Container"
import { Button } from "@/components/ui/Button"
import { BrowserFrame, DeviceFrame } from "@/components/ui/BrowserFrame"
import type { Project } from "@/types"

export function HeroSection({ project }: { project: Project | null }) {
  const reduceMotion = useReducedMotion()
  const previewImage = project?.coverImage ?? project?.thumbnail
  const projectHref = project ? `/work/${project.slug}` : "/work"

  const initial = reduceMotion ? false : { opacity: 0, y: 22 }
  const transition = {
    duration: reduceMotion ? 0 : 0.65,
    ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number],
  }

  return (
    <section className="border-b border-border bg-background">
      <Container>
        <div className="grid min-h-[calc(100svh-72px)] min-w-0 content-center gap-12 py-12 md:py-16 xl:grid-cols-12 xl:items-center xl:gap-12 xl:py-12">
          <motion.div
            className="flex min-w-0 max-w-3xl flex-col gap-6 xl:col-span-7"
            initial={initial}
            animate={{ opacity: 1, y: 0 }}
            transition={transition}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Web & Digital Product Studio
            </p>

            <h1 className="text-[clamp(2.6rem,8.7vw,4.5rem)] font-semibold leading-[0.94] tracking-[-0.035em] text-foreground sm:text-[clamp(3.4rem,7vw,5rem)] xl:text-[clamp(3.8rem,5vw,5.75rem)]">
              <span className="block xl:whitespace-nowrap">We design and build</span>
              <span className="block text-[#6A6A6A] xl:whitespace-nowrap">
                digital experiences
              </span>
              <span className="block">that work.</span>
            </h1>

            <p className="max-w-[38rem] text-base leading-relaxed text-muted-foreground sm:text-lg">
              Websites and digital products crafted to help modern businesses look
              better, work smarter, and move forward.
            </p>

            <div className="flex flex-col gap-3 min-[390px]:flex-row min-[390px]:flex-wrap">
              <Button href="/contact" size="lg" className="w-full min-[390px]:w-auto">
                Start a Project
              </Button>
              <Button
                href="/work"
                variant="secondary"
                size="lg"
                className="w-full min-[390px]:w-auto"
              >
                View Our Work
              </Button>
            </div>

            <p className="text-sm text-muted-foreground">
              Based in Indonesia · Available for selected projects.
            </p>
          </motion.div>

          <motion.div
            className="relative mx-auto min-w-0 w-full max-w-2xl xl:col-span-5 xl:max-w-none"
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: reduceMotion ? 0 : 0.14 }}
          >
            <BrowserFrame url={project?.liveUrl ?? projectHref}>
              <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                {previewImage ? (
                  <Image
                    src={previewImage}
                    alt={`${project?.title ?? "BITMIND STUDIO"} project preview`}
                    fill
                    preload
                    sizes="(max-width: 1279px) 100vw, 42vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full flex-col justify-between p-6 sm:p-8">
                    <div>
                      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-accent">
                        {project?.category ?? "Digital Experience"}
                      </p>
                      <h2 className="mt-3 max-w-sm text-2xl font-semibold tracking-tight sm:text-3xl">
                        {project?.title ?? "Work crafted with clarity and purpose."}
                      </h2>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <span className="h-16 rounded-md bg-brand-primary-soft" />
                      <span className="h-16 rounded-md bg-muted" />
                      <span className="h-16 rounded-md bg-muted" />
                    </div>
                  </div>
                )}
              </div>
            </BrowserFrame>

            <div className="absolute -bottom-7 right-4 hidden w-28 md:block xl:-bottom-10 xl:-right-5 xl:w-32">
              <DeviceFrame className="border-2 shadow-md">
                <div className="flex h-full flex-col gap-2 p-3">
                  <span className="h-2 w-2/3 rounded-full bg-brand-primary" />
                  <span className="h-12 rounded-md bg-brand-primary-soft" />
                  <span className="h-2 rounded-full bg-border" />
                  <span className="h-2 w-3/4 rounded-full bg-border" />
                  <span className="mt-auto h-8 rounded-md bg-foreground" />
                </div>
              </DeviceFrame>
            </div>

            <Link
              href={projectHref}
              className="group mt-5 inline-flex items-center gap-2 text-sm font-medium text-foreground xl:mt-6"
            >
              {project ? `View ${project.title}` : "View Our Work"}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
