'use client'

import { useEffect, useRef } from 'react'

type Singularity = {
  x: number
  y: number
  bornAt: number
  life: number
  radius: number
  spin: number
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let animationId = 0
    let pointerX = 0
    let pointerY = 0
    let targetX = 0
    let targetY = 0
    let nextSingularityAt = 0
    const singularities: Singularity[] = []

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      targetX = pointerX = width * 0.5
      targetY = pointerY = height * 0.48
    }

    const onPointerMove = (event: PointerEvent) => {
      targetX = event.clientX
      targetY = event.clientY
    }

    const addSingularity = (time: number) => {
      singularities.push({
        x: width * (0.18 + Math.random() * 0.64),
        y: height * (0.18 + Math.random() * 0.64),
        bornAt: time,
        life: 4200 + Math.random() * 2600,
        radius: 72 + Math.random() * 92,
        spin: Math.random() > 0.5 ? 1 : -1,
      })
    }

    const drawFabric = (time: number) => {
      const gap = width < 768 ? 34 : 42
      const warpRadius = Math.max(width, height) * 0.42
      const rows = Math.ceil(height / gap) + 2
      const cols = Math.ceil(width / gap) + 2

      ctx.lineWidth = 1

      for (let row = -1; row < rows; row++) {
        ctx.beginPath()
        for (let col = -1; col < cols; col++) {
          const baseX = col * gap
          const baseY = row * gap
          const dx = baseX - pointerX
          const dy = baseY - pointerY
          const distance = Math.max(Math.sqrt(dx * dx + dy * dy), 1)
          const pointerPull = Math.max(0, 1 - distance / warpRadius)
          let x = baseX - (dx / distance) * pointerPull * 22
          let y = baseY - (dy / distance) * pointerPull * 22

          singularities.forEach((hole) => {
            const hx = x - hole.x
            const hy = y - hole.y
            const hd = Math.max(Math.sqrt(hx * hx + hy * hy), 1)
            const age = time - hole.bornAt
            const fadeIn = Math.min(age / 900, 1)
            const fadeOut = Math.max(0, 1 - (age - hole.life * 0.68) / (hole.life * 0.32))
            const strength = Math.max(0, 1 - hd / (hole.radius * 2.3)) * fadeIn * fadeOut
            const tangentX = -hy / hd
            const tangentY = hx / hd
            x -= (hx / hd) * strength * 44
            y -= (hy / hd) * strength * 44
            x += tangentX * strength * 20 * hole.spin
            y += tangentY * strength * 20 * hole.spin
          })

          y += Math.sin(col * 0.65 + time * 0.0011) * 4
          x += Math.cos(row * 0.6 + time * 0.001) * 4

          if (col === -1) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        const alpha = row % 3 === 0 ? 0.16 : 0.09
        ctx.strokeStyle = `rgba(185, 232, 255, ${alpha})`
        ctx.stroke()
      }

      for (let col = -1; col < cols; col++) {
        ctx.beginPath()
        for (let row = -1; row < rows; row++) {
          const baseX = col * gap
          const baseY = row * gap
          const dx = baseX - pointerX
          const dy = baseY - pointerY
          const distance = Math.max(Math.sqrt(dx * dx + dy * dy), 1)
          const pointerPull = Math.max(0, 1 - distance / warpRadius)
          const x = baseX - (dx / distance) * pointerPull * 18 + Math.cos(row * 0.6 + time * 0.001) * 4
          const y = baseY - (dy / distance) * pointerPull * 18 + Math.sin(col * 0.65 + time * 0.0011) * 4

          if (row === -1) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.strokeStyle = 'rgba(255, 179, 103, 0.08)'
        ctx.stroke()
      }
    }

    const drawSingularities = (time: number) => {
      for (let index = singularities.length - 1; index >= 0; index--) {
        const hole = singularities[index]
        const age = time - hole.bornAt
        if (age > hole.life) {
          singularities.splice(index, 1)
          continue
        }

        const fadeIn = Math.min(age / 900, 1)
        const fadeOut = Math.max(0, 1 - (age - hole.life * 0.72) / (hole.life * 0.28))
        const alpha = fadeIn * fadeOut
        const pulse = Math.sin(time * 0.004 + index) * 0.08 + 1
        const radius = hole.radius * pulse

        const glow = ctx.createRadialGradient(hole.x, hole.y, radius * 0.12, hole.x, hole.y, radius)
        glow.addColorStop(0, `rgba(0, 0, 0, ${0.95 * alpha})`)
        glow.addColorStop(0.42, `rgba(9, 10, 13, ${0.78 * alpha})`)
        glow.addColorStop(0.58, `rgba(255, 133, 64, ${0.18 * alpha})`)
        glow.addColorStop(1, 'rgba(255, 133, 64, 0)')

        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(hole.x, hole.y, radius, 0, Math.PI * 2)
        ctx.fill()

        ctx.save()
        ctx.translate(hole.x, hole.y)
        ctx.rotate(time * 0.0008 * hole.spin)
        ctx.strokeStyle = `rgba(185, 232, 255, ${0.24 * alpha})`
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.ellipse(0, 0, radius * 0.72, radius * 0.28, 0, 0, Math.PI * 2)
        ctx.stroke()
        ctx.restore()
      }
    }

    const drawLight = () => {
      const radius = width < 768 ? 92 : 128
      const glow = ctx.createRadialGradient(pointerX, pointerY, 0, pointerX, pointerY, radius)
      glow.addColorStop(0, 'rgba(255, 238, 184, 0.22)')
      glow.addColorStop(0.34, 'rgba(255, 184, 95, 0.12)')
      glow.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = glow
      ctx.fillRect(pointerX - radius, pointerY - radius, radius * 2, radius * 2)
    }

    const drawDust = (time: number) => {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.42)'
      for (let i = 0; i < 90; i++) {
        const x = (Math.sin(i * 89.7 + time * 0.00009) * 0.5 + 0.5) * width
        const y = (Math.cos(i * 43.2 + time * 0.00011) * 0.5 + 0.5) * height
        const size = i % 7 === 0 ? 1.5 : 0.7
        ctx.globalAlpha = i % 5 === 0 ? 0.35 : 0.16
        ctx.fillRect(x, y, size, size)
      }
      ctx.globalAlpha = 1
    }

    const animate = (time: number) => {
      pointerX += (targetX - pointerX) * 0.07
      pointerY += (targetY - pointerY) * 0.07

      if (time > nextSingularityAt && singularities.length < 3) {
        addSingularity(time)
        nextSingularityAt = time + 2800 + Math.random() * 2600
      }

      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = '#050507'
      ctx.fillRect(0, 0, width, height)

      drawLight()
      drawFabric(time)
      drawSingularities(time)
      drawDust(time)

      animationId = requestAnimationFrame(animate)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointerMove)
    animationId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 bg-[#050507]"
    />
  )
}
