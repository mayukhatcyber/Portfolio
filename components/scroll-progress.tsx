"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"

export default function ScrollProgress() {
  const [mounted, setMounted] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const rotate = useSpring(useTransform(scrollYProgress, [0, 1], [0, 360]))

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-emerald-500 origin-left z-50" style={{ scaleX }} />
      <motion.div
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-emerald-500 font-mono text-sm z-50"
        style={{
          opacity: scrollYProgress,
        }}
      >
        <motion.div style={{ rotate: rotate }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 5V19M12 5L6 11M12 5L18 11"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.div>
    </>
  )
}
