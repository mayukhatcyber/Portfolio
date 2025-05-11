"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface GlitchTextProps {
  text: string
  className?: string
  glitchIntensity?: number
  glitchProbability?: number
}

export default function GlitchText({
  text,
  className = "",
  glitchIntensity = 3,
  glitchProbability = 0.03,
}: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(text)
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    if (isGlitching) return

    const glitchInterval = setInterval(() => {
      if (Math.random() < glitchProbability) {
        setIsGlitching(true)

        let glitchCount = 0
        const maxGlitches = glitchIntensity

        const glitchEffect = setInterval(() => {
          const glitchedText = text
            .split("")
            .map((char) => {
              if (Math.random() < 0.3 && char !== " ") {
                const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?/\\~`"
                return glitchChars[Math.floor(Math.random() * glitchChars.length)]
              }
              return char
            })
            .join("")

          setDisplayText(glitchedText)
          glitchCount++

          if (glitchCount >= maxGlitches) {
            clearInterval(glitchEffect)
            setDisplayText(text)
            setIsGlitching(false)
          }
        }, 100)

        return () => clearInterval(glitchEffect)
      }
    }, 2000)

    return () => clearInterval(glitchInterval)
  }, [text, isGlitching, glitchIntensity, glitchProbability])

  return (
    <motion.span
      className={`inline-block ${className}`}
      animate={{
        x: isGlitching ? [0, -2, 3, -1, 0] : 0,
        y: isGlitching ? [0, 1, -1, 2, 0] : 0,
      }}
      transition={{ duration: 0.2 }}
    >
      {displayText}
    </motion.span>
  )
}
