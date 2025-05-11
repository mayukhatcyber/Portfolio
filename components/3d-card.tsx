"use client"

import type React from "react"

import { useState, useRef, type ReactNode } from "react"
import { motion } from "framer-motion"

interface ThreeDCardProps {
  children: ReactNode
  className?: string
  glareIntensity?: number
  tiltDegree?: number
  perspective?: number
  glareColor?: string
  glarePosition?: { x: number; y: number }
  borderGlow?: boolean
}

export default function ThreeDCard({
  children,
  className = "",
  glareIntensity = 0.5,
  tiltDegree = 10,
  perspective = 1000,
  glareColor = "rgba(255, 255, 255, 0.5)",
  glarePosition = { x: 0, y: 0 },
  borderGlow = true,
}: ThreeDCardProps) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [glarePos, setGlarePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()

    // Calculate mouse position relative to card center (in -1 to 1 range)
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    // Set rotation based on mouse position
    setRotation({
      x: -y * tiltDegree, // Inverted for natural feel
      y: x * tiltDegree,
    })

    // Set glare position
    setGlarePos({ x, y })
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setRotation({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden ${className} ${borderGlow ? "border border-transparent" : ""}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: `${perspective}px`,
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateX: rotation.x,
        rotateY: rotation.y,
        boxShadow:
          isHovered && borderGlow
            ? "0 0 20px rgba(16, 185, 129, 0.5), 0 0 30px rgba(16, 185, 129, 0.2)"
            : "0 0 0 rgba(0, 0, 0, 0)",
      }}
      transition={{
        rotateX: { duration: 0.1, ease: "easeOut" },
        rotateY: { duration: 0.1, ease: "easeOut" },
        boxShadow: { duration: 0.3 },
      }}
    >
      {/* Glare effect */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${(glarePos.x + 0.5) * 100}% ${
              (glarePos.y + 0.5) * 100
            }%, ${glareColor}, transparent)`,
            opacity: glareIntensity,
            mixBlendMode: "overlay",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: glareIntensity }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}

      {/* Content with 3D effect */}
      <motion.div
        style={{
          transform: "translateZ(20px)",
          transformStyle: "preserve-3d",
        }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
