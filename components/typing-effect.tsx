"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface TypingEffectProps {
  text: string
  className?: string
  typingSpeed?: number
  delayStart?: number
  cursorColor?: string
}

export default function TypingEffect({
  text,
  className = "",
  typingSpeed = 50,
  delayStart = 0,
  cursorColor = "#10b981",
}: TypingEffectProps) {
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showCursor, setShowCursor] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!inView) return

    let timeout: NodeJS.Timeout

    // Start typing after delay
    timeout = setTimeout(() => {
      setIsTyping(true)
      let currentIndex = 0

      const typingInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayText(text.substring(0, currentIndex + 1))
          currentIndex++
        } else {
          clearInterval(typingInterval)
          setIsTyping(false)
        }
      }, typingSpeed)

      return () => clearInterval(typingInterval)
    }, delayStart)

    return () => clearTimeout(timeout)
  }, [text, typingSpeed, delayStart, inView])

  // Blinking cursor effect
  useEffect(() => {
    if (!isTyping && displayText === text) {
      const cursorInterval = setInterval(() => {
        setShowCursor((prev) => !prev)
      }, 500)

      return () => clearInterval(cursorInterval)
    }
  }, [isTyping, displayText, text])

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      <span>{displayText}</span>
      {inView && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: showCursor ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ color: cursorColor }}
          className="absolute -right-[0.1em] font-bold"
        >
          |
        </motion.span>
      )}
    </div>
  )
}
