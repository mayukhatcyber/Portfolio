"use client"

import type React from "react"

import { motion } from "framer-motion"
import CircularProgress from "./circular-progress"
import ThreeDCard from "./3d-card"

interface SkillCategory {
  category: string
  skills: {
    name: string
    percentage: number
    icon?: React.ReactNode
  }[]
}

interface SkillProgressGridProps {
  skillCategories: SkillCategory[]
}

export default function SkillProgressGrid({ skillCategories }: SkillProgressGridProps) {
  return (
    <div className="space-y-12">
      {skillCategories.map((category, categoryIndex) => (
        <motion.div
          key={category.category}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-6"
        >
          <h3 className="text-2xl font-semibold text-center md:text-left">
            <span className="text-emerald-500">{category.category}</span> Proficiency
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {category.skills.map((skill, index) => (
              <ThreeDCard
                key={skill.name}
                className="bg-zinc-900/60 backdrop-blur-sm rounded-xl p-4 h-full"
                glareIntensity={0.2}
                tiltDegree={8}
                borderGlow={false}
              >
                <div className="flex flex-col items-center justify-center h-full">
                  {skill.icon && (
                    <motion.div
                      className="mb-3 text-emerald-500"
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
                      viewport={{ once: true }}
                    >
                      {skill.icon}
                    </motion.div>
                  )}
                  <CircularProgress
                    percentage={skill.percentage}
                    size={100}
                    strokeWidth={8}
                    duration={1.5}
                    delay={0.3 + index * 0.1}
                    color={
                      skill.percentage >= 90
                        ? "#10b981" // emerald-500
                        : skill.percentage >= 75
                          ? "#06b6d4" // cyan-500
                          : skill.percentage >= 60
                            ? "#0ea5e9" // light blue-500
                            : "#0f766e" // teal-700
                    }
                    label={skill.name}
                  />
                </div>
              </ThreeDCard>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
