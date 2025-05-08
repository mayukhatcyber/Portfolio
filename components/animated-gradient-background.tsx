"use client"

import { useEffect, useRef } from "react"

export default function AnimatedGradientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Create gradient points
    const points: { x: number; y: number; vx: number; vy: number; radius: number; color: string }[] = []

    const colors = ["#10b981", "#06b6d4", "#0ea5e9", "#0f766e"]

    for (let i = 0; i < 8; i++) {
      points.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 200 + 100,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    // Animation loop
    const animate = () => {
      // Clear canvas with a semi-transparent black to create trail effect
      ctx.fillStyle = "rgba(9, 9, 11, 0.97)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw points
      for (const point of points) {
        // Move points
        point.x += point.vx
        point.y += point.vy

        // Bounce off edges
        if (point.x < 0 || point.x > canvas.width) point.vx *= -1
        if (point.y < 0 || point.y > canvas.height) point.vy *= -1

        // Draw gradient
        const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, point.radius)

        gradient.addColorStop(0, `${point.color}20`) // Very transparent
        gradient.addColorStop(1, "transparent")

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2)
        ctx.fill()
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 opacity-30" />
}
