import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

export default function PanelIndicator({ panels }) {
  const [active, setActive] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 768px)')
    setIsMobile(mql.matches)
    const h = (e) => setIsMobile(e.matches)
    mql.addEventListener('change', h)
    return () => mql.removeEventListener('change', h)
  }, [])

  useEffect(() => {
    const handler = (e) => setActive(e.detail.index)
    window.addEventListener('panelchange', handler)
    return () => window.removeEventListener('panelchange', handler)
  }, [])

  const scrollToPanel = (index) => {
    const st = ScrollTrigger.getById('horizontal-main')
    if (!st) return
    const targetProgress = index / (panels.length - 1)
    const targetScroll = st.start + targetProgress * (st.end - st.start)
    gsap.to(window, {
      scrollTo: { y: targetScroll },
      duration: 1.2,
      ease: 'power2.inOut',
    })
  }

  if (isMobile) return null

  return (
    <div style={{
      position: 'fixed', right: 32, top: '50%', transform: 'translateY(-50%)',
      display: 'flex', flexDirection: 'column', gap: 16, zIndex: 100,
    }}>
      {panels.map((panel, i) => (
        <button
          key={panel.id}
          onClick={() => scrollToPanel(i)}
          aria-label={`Go to ${panel.label}`}
          style={{
            width: active === i ? 12 : 8,
            height: active === i ? 12 : 8,
            borderRadius: '50%',
            background: active === i ? 'var(--magenta)' : 'var(--text-dim)',
            border: 'none',
            cursor: 'none',
            boxShadow: active === i ? '0 0 12px var(--magenta), 0 0 24px var(--magenta-glow)' : 'none',
            transition: 'all 0.3s',
            padding: 0,
          }}
        />
      ))}
    </div>
  )
}
