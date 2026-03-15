import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const items = ['UX/UI Design','//','AI Research','//','E-Commerce','//','Product Design','//','Interaction Design','//','LLM Applications','//','Dropshipping','//','Visual Design','//']
const doubled = [...items, ...items]

export default function Ticker() {
  const trackRef = useRef(null)
  useEffect(() => {
    const track = trackRef.current; if (!track) return
    const tween = gsap.to(track, { xPercent: -50, ease: 'none', duration: 18, repeat: -1 })
    let targetScale = 1
    const st = ScrollTrigger.create({ onUpdate(self) {
      const vel = Math.abs(self.getVelocity()) / 600
      targetScale = gsap.utils.clamp(1, 6, 1 + vel)
    }})
    const tick = () => { targetScale = 1 + (targetScale - 1) * 0.88; tween.timeScale(targetScale) }
    gsap.ticker.add(tick)
    return () => { tween.kill(); st.kill(); gsap.ticker.remove(tick) }
  }, [])

  return (
    <div style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)',
      overflow: 'hidden', padding: '18px 0', whiteSpace: 'nowrap',
      background: 'var(--bg-2)', position: 'relative' }} aria-hidden="true">
      {/* Neon line accent */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, var(--accent), transparent)', opacity: 0.3 }} />
      <div ref={trackRef} style={{ display: 'inline-flex', gap: 32, willChange: 'transform' }}>
        {doubled.map((item, i) => (
          <span key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: 10,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: item === '//' ? 'var(--accent)' : 'var(--text-dim)',
            textShadow: item === '//' ? '0 0 8px var(--accent)' : 'none' }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
