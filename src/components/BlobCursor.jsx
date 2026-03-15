import { useRef, useEffect, useState, useCallback } from 'react'
import gsap from 'gsap'
import './BlobCursor.css'

/**
 * Organic morphing blob cursor
 * • Blob aura  : lags behind with lerp, morphs border-radius organically
 * • Inner dot  : snaps to exact cursor position
 * • Gooey SVG filter makes both elements feel connected / liquid
 * • On hover   : blob expands with elastic spring, dot shrinks
 * • mixBlendMode: multiply for premium warm blending
 */

const BLOB_SHAPES = [
  '62% 38% 46% 54% / 60% 44% 56% 40%',
  '38% 62% 58% 42% / 48% 58% 42% 52%',
  '54% 46% 38% 62% / 56% 40% 60% 44%',
  '44% 56% 66% 34% / 38% 56% 44% 62%',
  '58% 42% 42% 58% / 66% 34% 66% 34%',
  '46% 54% 54% 46% / 44% 64% 36% 56%',
]

export default function BlobCursor({
  color    = '#ff2d78',
  size     = 44,
  dotSize  = 6,
  lerpEase = 0.09,
  zIndex   = 9999,
}) {
  const [isTouch, setIsTouch] = useState(false)
  const blobRef  = useRef(null)
  const dotRef   = useRef(null)
  const wrapRef  = useRef(null)
  const pos      = useRef({ x: -400, y: -400 })
  const blobPos  = useRef({ x: -400, y: -400 })
  const rafId    = useRef(null)
  const morphTimer = useRef(null)
  const hovering = useRef(false)
  const shapeIdx = useRef(0)

  const setVisible = useCallback((v) => {
    if (wrapRef.current) wrapRef.current.style.opacity = v ? '1' : '0'
  }, [])

  /* ── Organic morph loop ─────────────────────────── */
  useEffect(() => {
    const morph = () => {
      if (!blobRef.current) return
      shapeIdx.current = (shapeIdx.current + 1) % BLOB_SHAPES.length
      blobRef.current.style.borderRadius = BLOB_SHAPES[shapeIdx.current]
      morphTimer.current = setTimeout(morph, 480 + Math.random() * 380)
    }
    morph()
    return () => clearTimeout(morphTimer.current)
  }, [])

  /* ── Mouse move handler ─────────────────────────── */
  const onMove = useCallback((e) => {
    pos.current = { x: e.clientX, y: e.clientY }

    // Dot snaps instantly
    if (dotRef.current) {
      dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
    }

    // Hover over interactive elements
    const over = e.target?.closest('a, button, [role="button"], input, textarea, select, .work-card')
    if (over && !hovering.current) {
      hovering.current = true
      gsap.to(blobRef.current, {
        scale: 2.8,
        opacity: 0.22,
        duration: 0.55,
        ease: 'power3.out',
      })
      gsap.to(dotRef.current, {
        scale: 0,
        duration: 0.25,
        ease: 'power2.out',
      })
    } else if (!over && hovering.current) {
      hovering.current = false
      gsap.to(blobRef.current, {
        scale: 1,
        opacity: 0.55,
        duration: 0.7,
        ease: 'elastic.out(1, 0.45)',
      })
      gsap.to(dotRef.current, {
        scale: 1,
        duration: 0.35,
        ease: 'back.out(2)',
      })
    }

    setVisible(true)
  }, [setVisible])

  /* ── RAF lerp loop ──────────────────────────────── */
  useEffect(() => {
    const tick = () => {
      blobPos.current.x += (pos.current.x - blobPos.current.x) * lerpEase
      blobPos.current.y += (pos.current.y - blobPos.current.y) * lerpEase
      if (blobRef.current) {
        blobRef.current.style.left = `${blobPos.current.x - size / 2}px`
        blobRef.current.style.top  = `${blobPos.current.y - size / 2}px`
      }
      rafId.current = requestAnimationFrame(tick)
    }
    rafId.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId.current)
  }, [lerpEase, size])

  /* ── Touch / event setup ────────────────────────── */
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true)
      return
    }
    const onLeave = () => setVisible(false)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [onMove, setVisible])

  if (isTouch) return null

  return (
    <>
      {/* Gooey SVG filter — makes blob + dot feel liquid/connected */}
      <svg
        style={{ position: 'fixed', width: 0, height: 0, zIndex: -1 }}
        aria-hidden="true"
      >
        <defs>
          <filter id="blob-goo" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <div
        ref={wrapRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '100vw', height: '100vh',
          pointerEvents: 'none',
          overflow: 'hidden',
          zIndex,
          opacity: 0,
          transition: 'opacity 0.25s',
          filter: 'url(#blob-goo)',
        }}
      >
        {/* Organic blob aura — lags behind cursor */}
        <div
          ref={blobRef}
          style={{
            position: 'absolute',
            width: size,
            height: size,
            background: color,
            opacity: 0.55,
            borderRadius: BLOB_SHAPES[0],
            transition: 'border-radius 0.52s cubic-bezier(0.16, 1, 0.3, 1)',
            willChange: 'left, top, border-radius',
            mixBlendMode: 'screen',
          }}
        />

        {/* Precise dot — snaps to exact cursor */}
        <div
          ref={dotRef}
          style={{
            position: 'absolute',
            top: -(dotSize / 2),
            left: -(dotSize / 2),
            width: dotSize,
            height: dotSize,
            borderRadius: '50%',
            background: color,
            willChange: 'transform',
          }}
        />
      </div>
    </>
  )
}
