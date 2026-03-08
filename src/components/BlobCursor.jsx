import { useRef, useEffect, useCallback, useState } from 'react'
import gsap from 'gsap'
import './BlobCursor.css'

export default function BlobCursor({
  blobType              = 'circle',
  fillColor             = 'rgba(255,255,255,0.9)',
  trailCount            = 3,
  sizes                 = [28, 60, 40],
  innerSizes            = [8, 16, 10],
  innerColor            = 'rgba(255,255,255,1)',
  opacities             = [0.7, 0.5, 0.4],
  shadowColor           = 'rgba(255,255,255,0.15)',
  shadowBlur            = 8,
  shadowOffsetX         = 0,
  shadowOffsetY         = 0,
  filterId              = 'blob',
  filterStdDeviation    = 12,
  filterColorMatrixValues = '1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 28 -8',
  useFilter             = true,
  fastDuration          = 0.08,
  slowDuration          = 0.4,
  fastEase              = 'power3.out',
  slowEase              = 'power1.out',
  zIndex                = 9999,
}) {
  const [isTouch, setIsTouch] = useState(false)
  const [filterUrl, setFilterUrl] = useState(`url(#${filterId})`)
  const blobsRef    = useRef([])
  const wrapperRef  = useRef(null)
  const lastPos     = useRef({ x: -200, y: -200 })

  const setVisibility = useCallback((visible) => {
    if (!wrapperRef.current) return
    wrapperRef.current.style.opacity = visible ? '1' : '0'
  }, [])

  const handleMove = useCallback((e) => {
    const x = 'clientX' in e ? e.clientX : e.touches[0].clientX
    const y = 'clientY' in e ? e.clientY : e.touches[0].clientY
    lastPos.current = { x, y }

    // Hide blob over work cards — VIEW badge takes over
    setVisibility(!e.target?.closest('.work-card'))

    blobsRef.current.forEach((el, i) => {
      if (!el) return
      gsap.to(el, {
        x,
        y,
        duration: i === 0 ? fastDuration : slowDuration,
        ease:     i === 0 ? fastEase     : slowEase,
      })
    })
  }, [fastDuration, slowDuration, fastEase, slowEase, setVisibility])

  // Fix: SVG filter url(#id) breaks when URL contains a hash fragment (Chromium bug).
  // Keep the filter reference absolute so hash-based navigation doesn't break it.
  useEffect(() => {
    const update = () => {
      const base = window.location.href.split('#')[0]
      setFilterUrl(`url(${base}#${filterId})`)
    }
    update()
    window.addEventListener('hashchange', update)
    return () => window.removeEventListener('hashchange', update)
  }, [filterId])

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true)
      return
    }

    // Recheck visibility on scroll (card may scroll under/away from cursor)
    const onScroll = () => {
      const el = document.elementFromPoint(lastPos.current.x, lastPos.current.y)
      setVisibility(!el?.closest('.work-card'))
    }

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('scroll',    onScroll, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('scroll',    onScroll)
    }
  }, [handleMove, setVisibility])

  if (isTouch) return null

  return (
    <div
      ref={wrapperRef}
      style={{
        position:      'fixed',
        top:           0,
        left:          0,
        width:         '100vw',
        height:        '100vh',
        pointerEvents: 'none',
        overflow:      'hidden',
        zIndex,
        transition:    'opacity 0.15s',
      }}
    >
      {useFilter && (
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <filter id={filterId}>
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation={filterStdDeviation} />
            <feColorMatrix in="blur" values={filterColorMatrixValues} />
          </filter>
        </svg>
      )}

      <div
        className="blob-main"
        style={{ filter: useFilter ? filterUrl : undefined }}
      >
        {Array.from({ length: trailCount }).map((_, i) => (
          <div
            key={i}
            ref={(el) => (blobsRef.current[i] = el)}
            className="blob"
            style={{
              width:           sizes[i],
              height:          sizes[i],
              borderRadius:    blobType === 'circle' ? '50%' : '0%',
              backgroundColor: fillColor,
              opacity:         opacities[i],
              boxShadow:       `${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px 0 ${shadowColor}`,
            }}
          >
            <div
              className="inner-dot"
              style={{
                width:           innerSizes[i],
                height:          innerSizes[i],
                top:             (sizes[i] - innerSizes[i]) / 2,
                left:            (sizes[i] - innerSizes[i]) / 2,
                backgroundColor: innerColor,
                borderRadius:    blobType === 'circle' ? '50%' : '0%',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
