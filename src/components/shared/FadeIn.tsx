"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

/** Shared motion language for the BITMIND visual system. */
export const MOTION = {
  ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number],
  duration: 0.5,
  stagger: 0.08,
  y: 24,
  inViewMargin: "-60px",
} as const

type FadeInProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  y?: number
}

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = MOTION.duration,
  y = MOTION.y,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: MOTION.inViewMargin })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration, delay, ease: MOTION.ease }}
    >
      {children}
    </motion.div>
  )
}

type StaggerProps = {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
}

export function Stagger({
  children,
  className,
  staggerDelay = MOTION.stagger,
}: StaggerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: MOTION.inViewMargin })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        visible: { transition: { staggerChildren: staggerDelay } },
        hidden: {},
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: MOTION.y },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: MOTION.duration, ease: MOTION.ease },
        },
      }}
    >
      {children}
    </motion.div>
  )
}
