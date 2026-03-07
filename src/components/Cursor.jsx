import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  // Detect touch device — all hooks must come before any early return
  const [isTouch, setIsTouch] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springX = useSpring(cursorX, { stiffness: 500, damping: 40 })
  const springY = useSpring(cursorY, { stiffness: 500, damping: 40 })

  const followerX = useSpring(cursorX, { stiffness: 120, damping: 20 })
  const followerY = useSpring(cursorY, { stiffness: 120, damping: 20 })

  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    // Hide on touch / mobile — no mouse to track
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true)
      return
    }

    const move = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      // Hide cursor inside work cards (cursor-follow VIEW badge takes over)
      const overCard = !!e.target.closest('.work-card')
      if (dotRef.current)  dotRef.current.style.opacity  = overCard ? '0' : '1'
      if (ringRef.current) ringRef.current.style.opacity = overCard ? '0' : '1'
    }
    window.addEventListener('mousemove', move)

    const hoverEls = document.querySelectorAll('a, button, [data-cursor]')
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', () => {
        if (!dotRef.current || !ringRef.current) return
        dotRef.current.style.background  = 'var(--accent)'
        dotRef.current.style.width       = '14px'
        dotRef.current.style.height      = '14px'
        dotRef.current.style.marginLeft  = '-7px'
        dotRef.current.style.marginTop   = '-7px'
        ringRef.current.style.borderColor = 'var(--accent)'
        ringRef.current.style.width      = '52px'
        ringRef.current.style.height     = '52px'
        ringRef.current.style.marginLeft = '-26px'
        ringRef.current.style.marginTop  = '-26px'
      })
      el.addEventListener('mouseleave', () => {
        if (!dotRef.current || !ringRef.current) return
        dotRef.current.style.background  = 'var(--white)'
        dotRef.current.style.width       = '8px'
        dotRef.current.style.height      = '8px'
        dotRef.current.style.marginLeft  = '-4px'
        dotRef.current.style.marginTop   = '-4px'
        ringRef.current.style.borderColor = 'rgba(255,255,255,0.4)'
        ringRef.current.style.width      = '36px'
        ringRef.current.style.height     = '36px'
        ringRef.current.style.marginLeft = '-18px'
        ringRef.current.style.marginTop  = '-18px'
      })
    })

    return () => window.removeEventListener('mousemove', move)
  }, [cursorX, cursorY])

  // Don't render on touch/mobile
  if (isTouch) return null

  return (
    <>
      {/* Dot — centred via margin, NOT transform (transform is owned by Framer Motion x/y) */}
      <motion.div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed', top: 0, left: 0, pointerEvents: 'none',
          zIndex: 9999, width: 8, height: 8, borderRadius: '50%',
          background: 'var(--white)',
          marginLeft: '-4px', marginTop: '-4px',
          transition: 'background 0.2s, width 0.15s, height 0.15s, margin 0.15s',
          x: springX, y: springY,
        }}
      />
      {/* Ring */}
      <motion.div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: 'fixed', top: 0, left: 0, pointerEvents: 'none',
          zIndex: 9998, width: 36, height: 36, borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.4)',
          marginLeft: '-18px', marginTop: '-18px',
          transition: 'width 0.3s, height 0.3s, border-color 0.2s, margin 0.3s',
          x: followerX, y: followerY,
        }}
      />
    </>
  )
}
