import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const items = ['UX/UI Design','◆','AI Research','◆','E-Commerce','◆','Product Design','◆','Interaction Design','◆','LLM Applications','◆','Dropshipping','◆','Visual Design','◆']
const doubled = [...items, ...items]

export default function Ticker() {
  const trackRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    // Seamless loop: doubled array = track is 2× content width.
    // xPercent -50 lands exactly where it started (invisible jump).
    const tween = gsap.to(track, {
      xPercent: -50,
      ease: 'none',
      duration: 20,
      repeat: -1,
    })

    // Velocity-driven speed: fast scroll → fast ticker, slow → normal
    let targetScale = 1

    const st = ScrollTrigger.create({
      onUpdate(self) {
        const vel = Math.abs(self.getVelocity()) / 600
        targetScale = gsap.utils.clamp(1, 6, 1 + vel)
      },
    })

    // Smooth lerp toward target each frame — silky deceleration
    const tick = () => {
      targetScale = 1 + (targetScale - 1) * 0.88
      tween.timeScale(targetScale)
    }
    gsap.ticker.add(tick)

    return () => {
      tween.kill()
      st.kill()
      gsap.ticker.remove(tick)
    }
  }, [])

  return (
    <div style={{
      borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)',
      overflow: 'hidden', padding: '20px 0', whiteSpace: 'nowrap', background: 'var(--black)',
    }} aria-hidden="true">
      <div ref={trackRef} style={{ display: 'inline-flex', gap: 28, willChange: 'transform' }}>
        {doubled.map((item, i) => (
          <span key={i} style={{
            fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase',
            color: item === '◆' ? 'var(--accent)' : 'var(--grey)',
          }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
