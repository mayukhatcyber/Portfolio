"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"

interface CircularProgressProps {
  percentage: number
  size?: number
  strokeWidth?: number
  duration?: number
  color?: string
  trailColor?: string
  label?: string
  delay?: number
}

export default function CircularProgress({
  percentage,
  size = 120,
  strokeWidth = 8,
  duration = 1.5,
  color = "#10b981",
  trailColor = "rgba(255, 255, 255, 0.1)",
  label,
  delay = 0,
}: CircularProgressProps) {
  const [progress, setProgress] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  // Calculate radius and circumference
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius

  // Calculate stroke-dashoffset
  const strokeDashoffset = circumference - (progress / 100) * circumference

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setProgress(percentage)
      }, delay * 1000)
      return () => clearTimeout(timer)
    }
    return undefined
  }, [isInView, percentage, delay])

  return (
    <div ref={ref} className="flex flex-col items-center justify-center">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Background circle */}
        <svg width={size} height={size} className="rotate-[-90deg]">
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={trailColor} strokeWidth={strokeWidth} />
          {/* Progress circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: isInView ? strokeDashoffset : circumference }}
            transition={{ duration, delay, ease: "easeOut" }}
            strokeLinecap="round"
          />
        </svg>
        {/* Percentage text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ duration: 0.5, delay: delay + duration / 2 }}
            className="text-center"
          >
            <motion.span
              initial={{ counter: 0 }}
              animate={{ counter: isInView ? percentage : 0 }}
              transition={{ duration, delay, ease: "easeOut" }}
              className="text-xl font-bold"
            >
              {Math.round(progress)}%
            </motion.span>
          </motion.div>
        </div>
      </div>
      {label && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
          transition={{ duration: 0.5, delay: delay + duration / 2 }}
          className="mt-3 text-center text-sm text-zinc-300 font-medium"
        >
          {label}
        </motion.p>
      )}
    </div>
  )
}
