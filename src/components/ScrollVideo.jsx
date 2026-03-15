import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%'

function useScramble(text, delay = 600) {
  const [display, setDisplay] = useState(text)
  useEffect(() => {
    let frame = 0; const chars = text.split('')
    const total = 30; let timer
    const start = () => {
      const interval = setInterval(() => {
        setDisplay(chars.map((ch, i) => {
          if (ch === ' ' || ch === ',' || ch === '.') return ch
          if (i / chars.length < frame / total) return ch
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        }).join(''))
        frame++
        if (frame > total) { clearInterval(interval); setDisplay(text) }
      }, 35)
    }
    timer = setTimeout(start, delay)
    return () => clearTimeout(timer)
  }, [text, delay])
  return display
}

export default function Hero() {
  const name = useScramble('Shameem', 400)
  const progressRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight)
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${pct})`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section id="home" style={{
      height: '100vh', width: '100%', position: 'relative',
      display: 'flex', flexDirection: 'column', overflow: 'hidden',
      background: 'var(--bg)',
    }}>

      {/* Grid overlay */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      {/* Accent glow orbs */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.2, 0.12] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: '-20%', left: '-10%',
            width: 600, height: 600, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,245,212,0.18) 0%, transparent 70%)' }} />
        <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.16, 0.1] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          style={{ position: 'absolute', bottom: '0%', right: '-5%',
            width: 500, height: 500, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)' }} />
      </div>

      {/* Top row */}
      <div style={{ padding: '100px 60px 40px', display: 'flex', justifyContent: 'space-between',
        alignItems: 'flex-start', flex: 1, position: 'relative', zIndex: 2 }} className="hero-top">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em',
            color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 12 }}>
            // 001 — PORTFOLIO
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(14px,1.6vw,18px)',
            fontWeight: 300, lineHeight: 1.7, maxWidth: 380, color: 'var(--text-muted)',
            whiteSpace: 'pre-line' }}>
            {'Designing Experiences,\nResearching Intelligence,\nBuilding Commerce.'}
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{ width: 'clamp(80px,9vw,110px)', height: 'clamp(80px,9vw,110px)',
            border: '1px solid var(--border-accent)', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            background: 'rgba(0,245,212,0.04)', backdropFilter: 'blur(8px)' }}>
          <span style={{ fontSize: 9, letterSpacing: '0.12em', textAlign: 'center',
            color: 'var(--accent)', textTransform: 'uppercase', lineHeight: 1.7,
            fontFamily: 'var(--font-mono)' }}>
            Available<br />for work
          </span>
        </motion.div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: 'var(--border)', position: 'relative', zIndex: 2,
        boxShadow: '0 0 8px rgba(0,245,212,0.1)' }} />

      {/* Giant name */}
      <div style={{ overflow: 'hidden', padding: '0 30px', position: 'relative', zIndex: 2 }}>
        <motion.h1 initial={{ y: '120%' }} animate={{ y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: 'var(--font-display)', fontWeight: 900,
            fontSize: 'clamp(80px,16vw,220px)', lineHeight: 0.88,
            letterSpacing: '-0.03em', color: 'var(--text)',
            textTransform: 'uppercase' }}>
          {name}
        </motion.h1>
      </div>

      {/* Bottom bar */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '18px 60px', borderTop: '1px solid var(--border)',
          position: 'relative', zIndex: 2 }} className="hero-bottom">
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--text-muted)',
          animation: 'pulse 2s ease-in-out infinite' }}>
          Scroll to explore ↓
        </span>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }} className="hero-roles">
          {['UX/UI Designer', 'AI Researcher', 'Digital Nomad'].map((role, i) => (
            <span key={role} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              {i > 0 && <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--accent)', opacity: 0.5 }} />}
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10,
                letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                {role}
              </span>
            </span>
          ))}
        </div>
      </motion.div>

      {/* Progress bar */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 3 }}>
        <div style={{ height: 1.5, background: 'transparent', overflow: 'hidden', position: 'relative' }}>
          <div ref={progressRef} style={{ position: 'absolute', inset: 0,
            background: 'var(--accent)', transformOrigin: 'left', transform: 'scaleX(0)',
            boxShadow: '0 0 8px var(--accent)' }} />
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:0.3} 50%{opacity:1} }
        @media (max-width:600px){
          .hero-top{padding:80px 20px 28px !important;flex-wrap:wrap;gap:20px}
          .hero-bottom{padding:14px 20px !important;flex-direction:column;align-items:flex-start;gap:8px}
          .hero-roles{flex-wrap:wrap;gap:8px !important}
        }
      `}</style>
    </section>
  )
}
