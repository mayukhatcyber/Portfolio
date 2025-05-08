"use client"

import { type ReactNode, useEffect, useState } from "react"
import { motion } from "framer-motion"

interface SectionRevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

export default function SectionReveal({ children, className = "", delay = 0 }: SectionRevealProps) {
  const [scope, setScope] = useState<HTMLDivElement | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (!scope) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(scope)
    return () => observer.disconnect()
  }, [scope])

  return (
    <motion.div
      ref={setScope}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
