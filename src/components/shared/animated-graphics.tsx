"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

// ─── Animated Particle Grid ─────────────────────────────────────────
// A subtle grid of floating dots that animate in the background
interface ParticleGridProps {
  className?: string
  particleCount?: number
}

export function ParticleGrid({ className, particleCount = 40 }: ParticleGridProps) {
  const particles = Array.from({ length: particleCount }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 4,
  }))

  return (
    <div className={className}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-main/20"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

// ─── Spinning Geometric Shapes ──────────────────────────────────────
// Decorative shapes that slowly rotate and float
interface GeometricShapesProps {
  className?: string
}

export function GeometricShapes({ className }: GeometricShapesProps) {
  return (
    <div className={className}>
      {/* Rotating ring */}
      <motion.div
        className="absolute top-20 right-[15%] w-20 h-20 rounded-full border-2 border-main/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Pulsing dot */}
      <motion.div
        className="absolute top-[40%] left-[8%] w-3 h-3 rounded-full bg-main/30"
        animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Rotating square */}
      <motion.div
        className="absolute bottom-[30%] right-[10%] w-12 h-12 border-2 border-main/15 rounded-md"
        animate={{ rotate: -360, y: [0, -15, 0] }}
        transition={{ rotate: { duration: 25, repeat: Infinity, ease: "linear" }, y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
      />

      {/* Small diamond */}
      <motion.div
        className="absolute top-[60%] left-[20%] w-6 h-6 border border-main/20 rotate-45"
        animate={{ y: [0, -20, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Cross / Plus */}
      <motion.div
        className="absolute top-[25%] left-[75%]"
        animate={{ rotate: 180, scale: [1, 1.2, 1] }}
        transition={{ rotate: { duration: 15, repeat: Infinity, ease: "linear" }, scale: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
      >
        <div className="relative w-5 h-5">
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-main/20 -translate-y-1/2" />
          <div className="absolute left-1/2 top-0 h-full w-[2px] bg-main/20 -translate-x-1/2" />
        </div>
      </motion.div>

      {/* Dotted arc */}
      <motion.div
        className="absolute bottom-[15%] left-[40%] w-32 h-32 rounded-full border-2 border-dashed border-main/10"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
    </div>
  )
}

// ─── Animated Code Block ────────────────────────────────────────────
// A decorative code snippet that types itself out
interface AnimatedCodeBlockProps {
  className?: string
}

const codeLines = [
  { indent: 0, text: "const developer = {", color: "text-main" },
  { indent: 1, text: 'name: "Osama",', color: "text-green-400" },
  { indent: 1, text: "skills: [", color: "text-main" },
  { indent: 2, text: '"React", "Next.js",', color: "text-amber-400" },
  { indent: 2, text: '"TypeScript", "Node.js"', color: "text-amber-400" },
  { indent: 1, text: "],", color: "text-main" },
  { indent: 1, text: "passion: true,", color: "text-blue-400" },
  { indent: 0, text: "};", color: "text-main" },
]

export function AnimatedCodeBlock({ className }: AnimatedCodeBlockProps) {
  return (
    <motion.div
      className={`rounded-xl border border-border bg-card/80 backdrop-blur-sm p-5 font-mono text-xs sm:text-sm ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      {/* Window dots */}
      <div className="flex gap-1.5 mb-4">
        <div className="w-3 h-3 rounded-full bg-red-500/60" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
        <div className="w-3 h-3 rounded-full bg-green-500/60" />
      </div>

      {/* Code lines */}
      <div className="space-y-1">
        {codeLines.map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + index * 0.15, duration: 0.3 }}
            style={{ paddingLeft: `${line.indent * 1.25}rem` }}
          >
            <span className={line.color}>{line.text}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

// ─── Gradient Orb ───────────────────────────────────────────────────
// An animated gradient blob
interface GradientOrbProps {
  className?: string
  size?: string
}

export function GradientOrb({ className, size = "w-64 h-64" }: GradientOrbProps) {
  return (
    <motion.div
      className={`${size} rounded-full blur-3xl ${className}`}
      style={{
        background: "radial-gradient(circle, var(--main) 0%, transparent 70%)",
        opacity: 0.15,
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.1, 0.2, 0.1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  )
}
