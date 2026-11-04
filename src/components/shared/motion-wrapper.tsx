"use client"

import { type ReactNode } from "react"
import { motion, useReducedMotion, type Variants } from "framer-motion"

// Short, quiet reveals: a small rise and a fade, on the brand's ease-out curve.
const viewport = { once: true, amount: 0.2 }
const EASE = [0.22, 1, 0.36, 1] as const

// ─── FadeIn ─────────────────────────────────────────────────────────
type Direction = "up" | "down" | "left" | "right"

interface FadeInProps {
  children: ReactNode
  direction?: Direction
  delay?: number
  duration?: number
  className?: string
}

const directionOffset: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 16 },
  down: { x: 0, y: -16 },
  left: { x: 16, y: 0 },
  right: { x: -16, y: 0 },
}

export function FadeIn({ children, direction = "up", delay = 0, duration = 0.6, className }: FadeInProps) {
  const reduce = useReducedMotion()
  const offset = directionOffset[direction]
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={viewport}
      transition={{ duration, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── ScaleIn ────────────────────────────────────────────────────────
interface ScaleInProps {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
}

export function ScaleIn({ children, delay = 0, duration = 0.5, className }: ScaleInProps) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={viewport}
      transition={{ duration, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── Stagger Container + Item ───────────────────────────────────────
interface StaggerContainerProps {
  children: ReactNode
  staggerDelay?: number
  className?: string
}

const containerVariants = (staggerDelay: number): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: staggerDelay } },
})

export function StaggerContainer({ children, staggerDelay = 0.08, className }: StaggerContainerProps) {
  return (
    <motion.div
      variants={containerVariants(staggerDelay)}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface StaggerItemProps {
  children: ReactNode
  direction?: Direction
  className?: string
}

const itemVariants = (direction: Direction, reduce: boolean): Variants => {
  const offset = directionOffset[direction]
  return {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, x: offset.x, y: offset.y },
    visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.6, ease: EASE } },
  }
}

export function StaggerItem({ children, direction = "up", className }: StaggerItemProps) {
  const reduce = useReducedMotion() ?? false
  return (
    <motion.div variants={itemVariants(direction, reduce)} className={className}>
      {children}
    </motion.div>
  )
}
