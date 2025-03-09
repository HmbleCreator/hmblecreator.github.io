'use client'

import { useEffect, useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'

export function Spaceship() {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref)

  useEffect(() => {
    if (isInView) {
      controls.start({
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        rotate: 0,
        transition: {
          type: "spring",
          stiffness: 50,
          damping: 20,
          duration: 1.5
        }
      })
    }
  }, [isInView, controls])

  return (
    <motion.div
      ref={ref}
      initial={{ x: -300, y: 100, opacity: 0, scale: 0.5, rotate: -45 }}
      animate={controls}
      className="w-64 h-64 relative text-black"
    >
      {/* Glow effect (mint-green glow around the spaceship) */}
      <div className="absolute inset-0 bg-mint-green/20 blur-3xl rounded-full animate-pulse" />
      
      {/* Spaceship */}
      <motion.div
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative"
      >
        <svg
          viewBox="0 0 24 24"
          className="w-full h-full text-black filter drop-shadow-[0_0_15px_rgba(74,222,128,0.5)]"
          fill="currentColor"
        >
          <path d="M12 2L4 7l8 5 8-5-8-5zM4 12l8 5 8-5M4 17l8 5 8-5" />
        </svg>
        
        {/* Engine glow */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-12 bg-mint-green/50 blur-xl animate-pulse" />
      </motion.div>
    </motion.div>
  )
}
