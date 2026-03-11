import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%&'

function useScramble(text, delay = 800) {
  const [display, setDisplay] = useState(text)
  useEffect(() => {
    let frame = 0
    const chars = text.split('')
    const totalFrames = 35
    let timer
    const start = () => {
      const interval = setInterval(() => {
        setDisplay(chars.map((ch, i) => {
          if (ch === ' ' || ch === ',' || ch === '.') return ch
          if (i / chars.length < frame / totalFrames) return ch
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        }).join(''))
        frame++
        if (frame > totalFrames) {
          clearInterval(interval)
          setDisplay(text)
        }
      }, 40)
    }
    timer = setTimeout(start, delay)
    return () => { clearTimeout(timer) }
  }, [text, delay])
  return display
}

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  const tagline = useScramble('Designing Experiences,\nResearching Intelligence,\nBuilding Commerce.', 1000)

  return (
    <section id="home" ref={ref} style={{ paddingTop: 80, minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      {/* Animated gradient background */}
      <div className="hero-gradient-bg" aria-hidden="true" />
      {/* Radial glow — top right */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '-10%', right: '-5%',
        width: '55vw', height: '55vw', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />
      {/* Radial glow — bottom left */}
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: '5%', left: '-5%',
        width: '40vw', height: '40vw', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />
      {/* Top row */}
      <div className="hero-top-row" style={{ padding: '60px 40px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flex: 1, position: 'relative', zIndex: 1 }}>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(18px,2.5vw,28px)', fontWeight: 300, lineHeight: 1.5, whiteSpace: 'pre-line', maxWidth: 420 }}
        >
          {tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: 'clamp(80px,10vw,130px)', height: 'clamp(80px,10vw,130px)',
            border: '1px solid rgba(255,255,255,0.25)', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: 9, letterSpacing: '0.08em', textAlign: 'center', color: 'var(--grey)', textTransform: 'uppercase', lineHeight: 1.5 }}>
            Available<br />for work
          </span>
        </motion.div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: 'var(--border)', position: 'relative', zIndex: 1 }} />

      {/* Giant name */}
      <div className="hero-name-wrap" style={{ overflow: 'hidden', padding: '0 20px', position: 'relative', zIndex: 1 }}>
        <motion.h1
          style={{ y, opacity }}
          initial={{ y: '120%' }}
          animate={{ y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="hero-name"
        >
          Shameem
        </motion.h1>
      </div>

      {/* Bottom bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="hero-bottom-bar"
        style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '18px 40px', borderTop: '1px solid var(--border)',
          position: 'relative', zIndex: 1,
        }}
      >
        <span style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--grey)', animation: 'pulse 2s ease-in-out infinite' }}>
          Scroll to explore ↓
        </span>
        <div className="hero-roles" style={{ display: 'flex', gap: 12, alignItems: 'center', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--grey)' }}>
          <span>UX/UI Designer</span>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
          <span>Digital Nomad</span>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
          <span>AI Researcher</span>
        </div>
      </motion.div>

      <style>{`
        .hero-gradient-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(-45deg, #080808, #111118, #080808, #0d0820, #080808, #0a0f1a);
          background-size: 400% 400%;
          animation: gradientShift 14s ease infinite;
          z-index: 0;
        }
        @keyframes gradientShift {
          0%   { background-position: 0% 50% }
          50%  { background-position: 100% 50% }
          100% { background-position: 0% 50% }
        }
        .hero-name {
          font-family: var(--font-display);
          font-size: clamp(100px, 18vw, 260px);
          font-weight: 800;
          line-height: 0.88;
          letter-spacing: -0.04em;
          white-space: nowrap;
          color: var(--white);
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @media (max-width: 600px) {
          .hero-name { font-size: clamp(36px, 10.9vw, 80px) !important; white-space: nowrap; }
          .hero-top-row { padding: 32px 20px 24px !important; flex-wrap: wrap; gap: 20px; }
          .hero-bottom-bar { flex-direction: column !important; align-items: flex-start !important; gap: 6px !important; padding: 14px 20px !important; }
          .hero-roles { font-size: 10px !important; letter-spacing: 0.06em !important; gap: 8px !important; }
          .hero-roles span { white-space: nowrap; }
          .hero-top-row { flex: 0 !important; padding-bottom: 32px !important; }
        }
      `}</style>
    </section>
  )
}
