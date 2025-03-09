'use client'

import React, { useRef, useEffect } from 'react'

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  color: string
  growth: number
  rotationSpeed: number
  angle: number
  mass: number
  energy: number
}

interface StarParticle {
  x: number
  y: number
  z: number
  size: number
  speed: number
  color: string
}

interface ExplosionCenter {
  x: number
  y: number
  active: boolean
  lastTrigger: number
}

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const explosionRef = useRef<ExplosionCenter[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      
      // Initialize explosion centers after canvas resize
      explosionRef.current = [
        { x: canvas.width / 2, y: canvas.height / 2, active: false, lastTrigger: 0 },
        { x: canvas.width * 0.25, y: canvas.height * 0.25, active: false, lastTrigger: 1000 },
        { x: canvas.width * 0.75, y: canvas.height * 0.75, active: false, lastTrigger: 2000 }
      ]
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Original particles from your code
    const particles: Particle[] = []
    
    // New star field particles for the space travel effect
    const stars: StarParticle[] = []
    
    const equations = [
      "E = mc²",
      "F = G(m₁m₂)/r²",
      "∇ × B = μ₀J + μ₀ε₀∂E/∂t",
      "ψ(r,t) = |ψ(r,t)|e^(iS(r,t)/ℏ)",
    ]

    const createParticle = (x: number, y: number, explosive = false): Particle => ({
      x,
      y,
      size: Math.random() * 3 + (explosive ? 4 : 1),
      speedX: (Math.random() - 0.5) * (explosive ? 15 : 2),
      speedY: (Math.random() - 0.5) * (explosive ? 15 : 2),
      opacity: 1,
      color: `hsla(152, 95%, 58%, ${explosive ? '0.8' : '0.4'})`,
      growth: explosive ? 1.02 : 1,
      rotationSpeed: (Math.random() - 0.5) * 0.1,
      angle: Math.random() * Math.PI * 2,
      mass: explosive ? Math.random() * 5 + 5 : 1,
      energy: explosive ? 1 : 0.5
    })

    // Function to create a star for the space travel effect
    const createStar = (): StarParticle => {
      // Random position across the screen, but with z at the far distance
      const x = Math.random() * canvas.width - canvas.width / 2
      const y = Math.random() * canvas.height - canvas.height / 2
      // Increased z range for more depth
      const z = Math.random() * 2000 + 1000
      
      // Different speeds for parallax effect (reduced for smoother appearance)
      const speed = Math.random() * 6 + 2
      
      // Different star colors (mostly white with hints of blue/yellow)
      const colorValue = Math.random()
      let color
      if (colorValue < 0.7) {
        color = 'rgba(248, 209, 209, 0.6)' // White, most common, with reduced opacity
      } else if (colorValue < 0.85) {
        color = 'rgba(135, 175, 245, 0.6)' // Blueish
      } else {
        color = 'rgba(251, 251, 169, 0.6)' // Yellowish
      }
      
      return {
        x,
        y,
        z,
        // Reduced size for more subtle effect
        size: Math.random() * 1.2 + 0.2,
        speed,
        color
      }
    }

    const init = () => {
      // Original particles
      for (let i = 0; i < 550; i++) {
        particles.push(createParticle(Math.random() * canvas.width, Math.random() * canvas.height))
      }
      
      // Increased number of stars for a more rich effect
      for (let i = 0; i < 1000; i++) {
        stars.push(createStar())
      }
    }

    const triggerExplosion = (center: ExplosionCenter) => {
      center.active = true
      for (let i = 0; i < 150; i++) {
        particles.push(createParticle(center.x, center.y, true))
      }
      setTimeout(() => {
        center.active = false
      }, 1000)
    }

    const drawEquation = (equation: string, x: number, y: number, opacity: number) => {
      ctx.font = '20px "Space Mono"'
      ctx.fillStyle = `hsla(152, 95%, 58%, ${opacity})`
      ctx.fillText(equation, x, y)
    }

    // Track mouse position for interactive effect
    let mouseX = 0
    let mouseY = 0
    let targetMouseX = 0
    let targetMouseY = 0

    canvas.addEventListener('mousemove', (e) => {
      targetMouseX = e.clientX - canvas.width / 2
      targetMouseY = e.clientY - canvas.height / 2
    })

    // Previous frame buffers for motion blur
    let prevFrameBuffer: ImageData | null = null
    
    const animate = () => {
      // Smooth mouse movement
      mouseX += (targetMouseX - mouseX) * 0.05
      mouseY += (targetMouseY - mouseY) * 0.05
      
      // Apply motion blur by blending previous frame
      if (prevFrameBuffer) {
        ctx.putImageData(prevFrameBuffer, 0, 0)
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)' // Higher alpha for less trail
      } else {
        ctx.fillStyle = 'rgba(0, 0, 0, 1)'
      }
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Draw and update stars for space travel effect
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      
      // Add slight offset based on mouse position for interactive feel
      const offsetX = mouseX * 0.05
      const offsetY = mouseY * 0.05
      
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i]
        
        // Move the star closer (decreasing z)
        star.z -= star.speed
        
        // If the star is too close, reset it to the far distance
        if (star.z <= 0) {
          stars[i] = createStar()
          continue
        }
        
        // Project 3D position to 2D screen space with mouse influence
        const projectedX = centerX + ((star.x + offsetX * (1000 / star.z)) / star.z) * 1000
        const projectedY = centerY + ((star.y + offsetY * (1000 / star.z)) / star.z) * 1000
        
        // Calculate size based on distance (closer = bigger, but keep it smaller overall)
        const projectedSize = (star.size * 800) / star.z
        
        // Calculate opacity based on distance
        const opacity = Math.min(0.8, 800 / star.z)
        
        // Draw the star with subtle trail effect
        if (star.z < 300) {
          // Very subtle trail for closest stars
          const trailLength = (300 - star.z) / 30
          
          // Draw the star with subtle elongation for closest stars
          ctx.beginPath()
          ctx.ellipse(
            projectedX, 
            projectedY, 
            projectedSize + trailLength, 
            projectedSize, 
            Math.atan2(projectedY - centerY, projectedX - centerX), 
            0, 
            Math.PI * 2
          )
          ctx.fillStyle = star.color.replace(/[\d.]+\)$/, `${opacity})`);
          ctx.fill()
        } else {
          // Normal star for further stars
          ctx.beginPath()
          ctx.arc(projectedX, projectedY, projectedSize, 0, Math.PI * 2)
          ctx.fillStyle = star.color.replace(/[\d.]+\)$/, `${opacity})`);
          ctx.fill()
        }
      }

      // Draw floating equations
      equations.forEach((eq, i) => {
        const time = Date.now() / 2000
        const x = canvas.width / 2 + Math.cos(time + i * Math.PI / 2) * 200
        const y = canvas.height / 2 + Math.sin(time + i * Math.PI / 2) * 200
        const opacity = (Math.sin(time * 2 + i) + 1) / 2 * 0.5
        drawEquation(eq, x, y, opacity)
      })

      // Check and trigger explosions
      const currentTime = Date.now()
      explosionRef.current.forEach(center => {
        if (!center.active && currentTime - center.lastTrigger > 5000) {
          triggerExplosion(center)
          center.lastTrigger = currentTime
        }
      })

      // Update and draw original particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]

        // Calculate forces from all explosion centers
        let totalForceX = 0
        let totalForceY = 0

        explosionRef.current.forEach(center => {
          const dx = center.x - p.x
          const dy = center.y - p.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const force = center.active ? -0.5 : 0.1
          
          totalForceX += (dx / distance) * force
          totalForceY += (dy / distance) * force
        })

        // Apply combined forces
        p.speedX += totalForceX / explosionRef.current.length
        p.speedY += totalForceY / explosionRef.current.length

        p.x += p.speedX
        p.y += p.speedY
        p.size *= p.growth
        p.angle += p.rotationSpeed
        p.opacity *= 0.99

        if (p.opacity < 0.01 || p.size > 20) {
          particles.splice(i, 1)
          continue
        }

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.angle)
        ctx.fillStyle = p.color
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size)
        ctx.restore()
      }

      // Add new particles
      while (particles.length < 150) {
        const randomCenter = explosionRef.current[Math.floor(Math.random() * explosionRef.current.length)]
        particles.push(createParticle(
          randomCenter.x + (Math.random() - 0.5) * canvas.width * 0.5,
          randomCenter.y + (Math.random() - 0.5) * canvas.height * 0.5
        ))
      }
      
      // Store current frame for motion blur effect
      prevFrameBuffer = ctx.getImageData(0, 0, canvas.width, canvas.height)
      
      requestAnimationFrame(animate)
    }

    init()
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10" />
}

export default ParticleBackground