"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Shield, Lock, Code, Server, Database } from "lucide-react"

export default function FloatingIcons() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const icons = [
    { Icon: Shield, delay: 0, x: "10%", y: "20%" },
    { Icon: Lock, delay: 1.2, x: "85%", y: "15%" },
    { Icon: Code, delay: 0.5, x: "75%", y: "60%" },
    { Icon: Server, delay: 1.8, x: "15%", y: "70%" },
    { Icon: Database, delay: 2.3, x: "50%", y: "85%" },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-20 overflow-hidden">
      {icons.map((item, index) => {
        const { Icon, delay, x, y } = item
        return (
          <motion.div
            key={index}
            className="absolute text-emerald-500"
            style={{ left: x, top: y }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0.8, 1, 0],
              scale: [0, 1, 1.2, 1, 0],
              rotate: [0, 10, -10, 5, 0],
            }}
            transition={{
              duration: 8,
              delay,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: Math.random() * 5 + 10,
            }}
          >
            <Icon size={24} />
          </motion.div>
        )
      })}
    </div>
  )
}
