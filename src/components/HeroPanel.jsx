import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&'
function useScramble(text, delay = 400) {
  const [display, setDisplay] = useState('')
  useEffect(() => {
    let frame, timeout
    const run = () => {
      let iteration = 0
      const maxIterations = text.length
      const interval = () => {
        setDisplay(
          text.split('').map((ch, i) =>
            i < iteration ? ch : CHARS[Math.floor(Math.random() * CHARS.length)]
          ).join('')
        )
        iteration += 0.5
        if (iteration <= maxIterations) frame = requestAnimationFrame(interval)
      }
      interval()
    }
    timeout = setTimeout(run, delay)
    return () => { clearTimeout(timeout); cancelAnimationFrame(frame) }
  }, [text, delay])
  return display
}

const roles = [
  { label: 'UX/UI Designer', color: 'var(--magenta)' },
  { label: 'AI Researcher', color: 'var(--lime)' },
  { label: 'E-Commerce', color: 'var(--violet)' },
]

export default function HeroPanel() {
  const name = useScramble('SHAMEEM', 600)
  const containerRef = useRef(null)

  return (
    <div ref={containerRef} style={{
      width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
      justifyContent: 'space-between', padding: '80px 60px 40px',
      background: 'var(--bg)', position: 'relative', overflow: 'hidden',
    }}>
      {/* Grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.04,
        backgroundImage:
          'linear-gradient(var(--text-dim) 1px, transparent 1px), linear-gradient(90deg, var(--text-dim) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }} />

      {/* Glow orbs */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', top: '-10%', left: '-5%', width: '50vw', height: '50vh',
          borderRadius: '50%', background: 'radial-gradient(circle, var(--magenta-glow), transparent 70%)',
          filter: 'blur(60px)', pointerEvents: 'none',
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        style={{
          position: 'absolute', bottom: '-10%', right: '-5%', width: '45vw', height: '45vh',
          borderRadius: '50%', background: 'radial-gradient(circle, var(--violet-glow), transparent 70%)',
          filter: 'blur(60px)', pointerEvents: 'none',
        }}
      />

      {/* Top row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
        <div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.15em', color: 'var(--magenta)' }}>
            // 001 — PORTFOLIO
          </span>
          <p style={{ fontSize: 16, fontWeight: 300, color: 'var(--text-muted)', marginTop: 12, lineHeight: 1.7, maxWidth: 280 }}>
            Designing Experiences,<br />Researching Intelligence,<br />Building Commerce.
          </p>
        </div>

        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{
            width: 100, height: 100, borderRadius: '50%',
            border: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.1em',
            color: 'var(--text-muted)', textTransform: 'uppercase',
          }}
        >
          <span style={{ transform: 'rotate(0deg)' }}>Available for work</span>
        </motion.div>
      </div>

      {/* Name — massive */}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <h1 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(80px, 20vw, 260px)',
          fontWeight: 400, letterSpacing: '0.02em', lineHeight: 0.9,
          background: 'linear-gradient(135deg, var(--magenta), var(--violet))',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          {name || 'SHAMEEM'}
        </h1>
      </div>

      {/* Bottom row */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        position: 'relative', zIndex: 1,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.15em', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
            Scroll to explore
          </span>
          <motion.span
            animate={{ x: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ color: 'var(--magenta)', fontSize: 14 }}
          >
            →
          </motion.span>
        </div>

        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          {roles.map(({ label, color }) => (
            <span key={label} style={{
              fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: 'var(--text-muted)',
              padding: '6px 14px', border: `1px solid ${color}30`,
              borderRadius: 20, background: `${color}08`,
            }}>
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
