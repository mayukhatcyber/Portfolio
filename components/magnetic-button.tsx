"use client"

import type React from "react"

import { useState, useRef, type ReactNode } from "react"
import { motion } from "framer-motion"

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  strength?: number
  radius?: number
  as?: "button" | "div" | "a"
  href?: string
  onClick?: () => void
}

export default function MagneticButton({
  children,
  className = "",
  strength = 30,
  radius = 150,
  as = "button",
  href,
  onClick,
}: MagneticButtonProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return

    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current.getBoundingClientRect()

    const x = clientX - (left + width / 2)
    const y = clientY - (top + height / 2)
    const distance = Math.sqrt(x * x + y * y)

    // Only apply magnetic effect within radius
    if (distance < radius) {
      // Scale effect based on distance from center
      const scale = 1 - distance / radius
      setPosition({
        x: (x * scale * strength) / 10,
        y: (y * scale * strength) / 10,
      })
    } else {
      setPosition({ x: 0, y: 0 })
    }
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  const Component = as === "a" ? motion.a : motion.button

  return (
    <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className="inline-block">
      <Component
        href={href}
        onClick={onClick}
        className={className}
        animate={{
          x: position.x,
          y: position.y,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.1,
        }}
      >
        {children}
      </Component>
    </div>
  )
}
