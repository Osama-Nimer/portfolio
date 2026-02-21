"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion } from "framer-motion"

interface TypeWriterProps {
  words: string[]
  typingSpeed?: number
  deletingSpeed?: number
  pauseDuration?: number
  className?: string
}

export function TypeWriter({
  words,
  typingSpeed = 100,
  deletingSpeed = 60,
  pauseDuration = 2000,
  className,
}: TypeWriterProps) {
  const [displayedText, setDisplayedText] = useState("")
  const wordIndexRef = useRef(0)
  const charIndexRef = useRef(0)
  const isDeletingRef = useRef(false)
  const isPausedRef = useRef(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const tick = useCallback(() => {
    const currentWord = words[wordIndexRef.current]

    if (isPausedRef.current) {
      isPausedRef.current = false
      isDeletingRef.current = true
      timerRef.current = setTimeout(tick, deletingSpeed)
      return
    }

    if (!isDeletingRef.current) {
      // Typing forward
      charIndexRef.current += 1
      setDisplayedText(currentWord.slice(0, charIndexRef.current))

      if (charIndexRef.current >= currentWord.length) {
        // Done typing — pause before deleting
        isPausedRef.current = true
        timerRef.current = setTimeout(tick, pauseDuration)
        return
      }

      timerRef.current = setTimeout(tick, typingSpeed)
    } else {
      // Deleting
      charIndexRef.current -= 1
      setDisplayedText(currentWord.slice(0, charIndexRef.current))

      if (charIndexRef.current <= 0) {
        // Done deleting — move to next word
        isDeletingRef.current = false
        wordIndexRef.current = (wordIndexRef.current + 1) % words.length
        timerRef.current = setTimeout(tick, typingSpeed)
        return
      }

      timerRef.current = setTimeout(tick, deletingSpeed)
    }
  }, [words, typingSpeed, deletingSpeed, pauseDuration])

  useEffect(() => {
    timerRef.current = setTimeout(tick, typingSpeed)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [tick, typingSpeed])

  return (
    <span className={className}>
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="inline-block w-[3px] h-[1em] bg-main ml-0.5 align-middle"
      />
    </span>
  )
}
