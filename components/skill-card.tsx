"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface SkillCardProps {
  icon: ReactNode
  title: string
  skills: string[]
  index: number
}

export default function SkillCard({ icon, title, skills, index }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
    >
      <Card className="bg-zinc-900 border-zinc-800 hover:border-emerald-500/50 transition-colors h-full">
        <CardHeader className="flex flex-row items-center space-x-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
            viewport={{ once: true }}
            className="text-emerald-500"
          >
            {icon}
          </motion.div>
          <div>
            <CardTitle>{title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-zinc-400">
            {skills.map((skill, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.3 }}
                viewport={{ once: true }}
              >
                • {skill}
              </motion.li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  )
}
