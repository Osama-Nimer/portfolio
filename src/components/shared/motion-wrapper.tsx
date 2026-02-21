"use client"

import { type ReactNode } from "react"
import { motion, type Variants } from "framer-motion"

// ─── Shared viewport config ─────────────────────────────────────────
const viewport = { once: true, amount: 0.2 }

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
  up: { x: 0, y: 40 },
  down: { x: 0, y: -40 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
}

export function FadeIn({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  className,
}: FadeInProps) {
  const offset = directionOffset[direction]
  return (
    <motion.div
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={viewport}
      transition={{ duration, delay, ease: "easeOut" }}
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
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={viewport}
      transition={{ duration, delay, ease: "easeOut" }}
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
  visible: {
    transition: {
      staggerChildren: staggerDelay,
    },
  },
})

export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  className,
}: StaggerContainerProps) {
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

const itemVariants = (direction: Direction): Variants => {
  const offset = directionOffset[direction]
  return {
    hidden: { opacity: 0, x: offset.x, y: offset.y },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }
}

export function StaggerItem({ children, direction = "up", className }: StaggerItemProps) {
  return (
    <motion.div variants={itemVariants(direction)} className={className}>
      {children}
    </motion.div>
  )
}

// ─── Float (subtle infinite bob for decorative elements) ────────────
interface FloatProps {
  children: ReactNode
  className?: string
  yRange?: number
  duration?: number
}

export function Float({ children, className, yRange = 20, duration = 6 }: FloatProps) {
  return (
    <motion.div
      animate={{ y: [0, -yRange, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
