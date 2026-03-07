import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springX = useSpring(cursorX, { stiffness: 500, damping: 40 })
  const springY = useSpring(cursorY, { stiffness: 500, damping: 40 })

  const followerX = useSpring(cursorX, { stiffness: 120, damping: 20 })
  const followerY = useSpring(cursorY, { stiffness: 120, damping: 20 })

  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const move = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }
    window.addEventListener('mousemove', move)

    const hoverEls = document.querySelectorAll('a, button, [data-cursor]')
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', () => {
        dotRef.current?.style.setProperty('background', 'var(--accent)')
        dotRef.current?.style.setProperty('transform', 'translate(-50%,-50%) scale(2)')
        ringRef.current?.style.setProperty('border-color', 'var(--accent)')
        ringRef.current?.style.setProperty('width', '52px')
        ringRef.current?.style.setProperty('height', '52px')
      })
      el.addEventListener('mouseleave', () => {
        dotRef.current?.style.setProperty('background', 'var(--white)')
        dotRef.current?.style.setProperty('transform', 'translate(-50%,-50%) scale(1)')
        ringRef.current?.style.setProperty('border-color', 'rgba(255,255,255,0.4)')
        ringRef.current?.style.setProperty('width', '36px')
        ringRef.current?.style.setProperty('height', '36px')
      })
    })

    return () => window.removeEventListener('mousemove', move)
  }, [cursorX, cursorY])

  return (
    <>
      <motion.div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed', top: 0, left: 0, pointerEvents: 'none',
          zIndex: 9999, width: 8, height: 8, borderRadius: '50%',
          background: 'var(--white)', transform: 'translate(-50%,-50%)',
          transition: 'background 0.2s, transform 0.1s',
          x: springX, y: springY,
        }}
      />
      <motion.div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: 'fixed', top: 0, left: 0, pointerEvents: 'none',
          zIndex: 9998, width: 36, height: 36, borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.4)',
          transform: 'translate(-50%,-50%)',
          transition: 'width 0.3s, height 0.3s, border-color 0.2s',
          x: followerX, y: followerY,
        }}
      />
    </>
  )
}
