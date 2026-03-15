import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HorizontalScrollContext from './HorizontalScrollContext'

gsap.registerPlugin(ScrollTrigger)

export default function HorizontalScroll({ panels }) {
  const triggerRef = useRef(null)
  const trackRef = useRef(null)
  const tweenRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  // Mobile detection
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 768px)')
    setIsMobile(mql.matches)
    const handler = (e) => setIsMobile(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  // GSAP horizontal scroll
  useEffect(() => {
    if (isMobile) return

    const track = trackRef.current
    const trigger = triggerRef.current
    if (!track || !trigger) return

    const panelCount = panels.length

    // Small delay to ensure DOM is ready
    const initTimer = setTimeout(() => {
      const ctx = gsap.context(() => {
        const tween = gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: 'none',
          scrollTrigger: {
            id: 'horizontal-main',
            trigger,
            pin: true,
            scrub: 1,
            end: () => `+=${track.scrollWidth - window.innerWidth}`,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const idx = Math.round(self.progress * (panelCount - 1))
              window.dispatchEvent(new CustomEvent('panelchange', {
                detail: { index: idx, progress: self.progress },
              }))
            },
          },
        })
        tweenRef.current = tween
      })

      // Store context for cleanup
      triggerRef._gsapCtx = ctx
      setTimeout(() => ScrollTrigger.refresh(), 100)
    }, 100)

    return () => {
      clearTimeout(initTimer)
      if (triggerRef._gsapCtx) {
        triggerRef._gsapCtx.revert()
        triggerRef._gsapCtx = null
      }
      tweenRef.current = null
    }
  }, [panels, isMobile])

  if (isMobile) {
    return (
      <div>
        {panels.map(({ id, Component }) => (
          <section key={id} id={id} className="mobile-section">
            <Component />
          </section>
        ))}
      </div>
    )
  }

  return (
    <HorizontalScrollContext.Provider value={tweenRef}>
      <div ref={triggerRef}>
        <div className="hs-pin-container">
          <div ref={trackRef} className="hs-track">
            {panels.map(({ id, Component }) => (
              <section key={id} id={id} className="hs-panel">
                <Component />
              </section>
            ))}
          </div>
        </div>
      </div>
    </HorizontalScrollContext.Provider>
  )
}
