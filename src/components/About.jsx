import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const tags = ['Product Design', 'AI/ML', 'E-Commerce', 'Figma', 'React', 'Python']

const stats = [
  { value: 40, suffix: '+', label: 'Projects' },
  { value: 5, suffix: '+', label: 'Years' },
  { value: 20, suffix: '+', label: 'Clients' },
  { value: 3, suffix: '', label: 'Domains' },
]

const tools = ['Figma', 'React', 'Claude AI', 'Shopify', 'Framer', 'Python', 'GSAP', 'Next.js']
const toolsDoubled = [...tools, ...tools]

function Counter({ to, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1200
    const step = Math.ceil(to / (duration / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= to) { setCount(to); clearInterval(timer) }
      else setCount(start)
    }, 16)
    return () => clearInterval(timer)
  }, [inView, to])

  return <span ref={ref}>{count}{suffix}</span>
}

export default function About() {
  return (
    <div className="about-panel" style={{
      width: '100%', height: '100%',
      padding: 'clamp(60px, 10vh, 70px) clamp(20px, 5vw, 60px) clamp(20px, 4vh, 40px)',
      display: 'flex', flexDirection: 'column', background: 'var(--bg-2)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ marginBottom: 'clamp(16px, 3vh, 28px)' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.15em', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
          // About
        </span>
      </div>

      {/* Main content — two columns */}
      <div className="about-main" style={{ display: 'flex', gap: 'clamp(24px, 4vw, 48px)', flex: 1, minHeight: 0 }}>
        {/* Left — ID Card */}
        <div className="about-blob-card about-card" style={{
          flex: '0 0 clamp(180px, 30vw, 280px)', position: 'relative', borderRadius: 12,
          border: '1px solid var(--border)', background: 'var(--bg-card)',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', overflow: 'hidden', padding: 'clamp(20px, 3vw, 32px)',
        }}>
          {/* Corner marks */}
          {[{ top: 12, left: 12, bt: 1, bl: 1 }, { top: 12, right: 12, bt: 1, br: 1 }, { bottom: 12, left: 12, bb: 1, bl: 1 }, { bottom: 12, right: 12, bb: 1, br: 1 }].map((c, i) => (
            <div key={i} style={{
              position: 'absolute', width: 12, height: 12,
              ...(c.top !== undefined ? { top: c.top } : {}),
              ...(c.bottom !== undefined ? { bottom: c.bottom } : {}),
              ...(c.left !== undefined ? { left: c.left } : {}),
              ...(c.right !== undefined ? { right: c.right } : {}),
              borderTop: c.bt ? '1px solid var(--lime)' : 'none',
              borderBottom: c.bb ? '1px solid var(--lime)' : 'none',
              borderLeft: c.bl ? '1px solid var(--lime)' : 'none',
              borderRight: c.br ? '1px solid var(--lime)' : 'none',
              opacity: 0.5,
            }} />
          ))}

          <motion.div
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute', left: 0, right: 0, height: 1,
              background: 'linear-gradient(90deg, transparent, var(--magenta), transparent)', opacity: 0.3,
            }}
          />

          <div style={{
            position: 'absolute', inset: 0, opacity: 0.03,
            backgroundImage: 'linear-gradient(var(--text-dim) 1px, transparent 1px), linear-gradient(90deg, var(--text-dim) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }} />

          <div style={{
            fontSize: 'clamp(60px, 12vw, 120px)', fontFamily: 'var(--font-display)', color: 'transparent',
            WebkitTextStroke: '1px var(--magenta)', opacity: 0.3, lineHeight: 1,
            position: 'relative', zIndex: 1,
          }}>
            S
          </div>

          <div style={{ textAlign: 'center', position: 'relative', zIndex: 1, marginTop: 12 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(10px, 1.5vw, 12px)', fontWeight: 700, letterSpacing: '0.1em' }}>
              SHAMEEM <span style={{ color: 'var(--magenta)' }}>·</span> K
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(7px, 1vw, 9px)', color: 'var(--text-muted)', marginTop: 4, letterSpacing: '0.12em' }}>
              UX DESIGNER · AI RESEARCHER
            </div>
          </div>

          <motion.div
            animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{ position: 'absolute', top: '25%', right: -4, width: 8, height: 8, borderRadius: '50%', background: 'var(--magenta)', opacity: 0.6 }}
          />
          <motion.div
            animate={{ y: [4, -4, 4] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ position: 'absolute', bottom: '30%', left: -4, width: 6, height: 6, borderRadius: '50%', background: 'var(--violet)', opacity: 0.5 }}
          />
        </div>

        {/* Right — Bio + Tags */}
        <div className="about-bio" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p style={{ fontSize: 'clamp(14px, 2.5vw, 18px)', lineHeight: 1.8, fontWeight: 300, color: 'var(--text-muted)', marginBottom: 20 }}>
            Crafting <strong style={{ color: 'var(--magenta)', fontWeight: 600 }}>human-centered digital experiences</strong> with
            a sharp eye for usability and aesthetics. I bridge the gap between intelligent systems and seamless interfaces.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
            {tags.map((tag) => (
              <span key={tag} style={{
                fontFamily: 'var(--font-mono)', fontSize: 'clamp(8px, 1.2vw, 10px)', letterSpacing: '0.1em',
                padding: '5px 12px', borderRadius: 20, textTransform: 'uppercase',
                border: '1px solid var(--border)', color: 'var(--text-muted)',
              }}>
                {tag}
              </span>
            ))}
          </div>

          <a href="#contact" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em',
            color: 'var(--magenta)', textTransform: 'uppercase',
          }}>
            Get in touch
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>

      {/* Stats */}
      <div className="about-stats" style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'clamp(8px, 2vw, 16px)',
        marginTop: 'clamp(16px, 3vh, 28px)', paddingTop: 'clamp(12px, 2vh, 24px)', borderTop: '1px solid var(--border)',
      }}>
        {stats.map(({ value, suffix, label }) => (
          <div key={label} style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 6vw, 42px)', lineHeight: 1,
              color: 'var(--text)',
            }}>
              <Counter to={value} suffix={suffix} />
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(7px, 1vw, 9px)', letterSpacing: '0.14em', color: 'var(--text-dim)', marginTop: 4, textTransform: 'uppercase' }}>
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* Tools marquee */}
      <div style={{ overflow: 'hidden', marginTop: 'clamp(12px, 2vh, 20px)' }}>
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{ display: 'inline-flex', gap: 40, whiteSpace: 'nowrap' }}
        >
          {toolsDoubled.map((t, i) => (
            <span key={i} style={{
              fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.15em',
              color: 'var(--text-dim)', textTransform: 'uppercase',
            }}>
              {t}
            </span>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .about-panel { height: auto !important; min-height: 100vh; }
          .about-main { flex-direction: column !important; }
          .about-card { flex: none !important; width: 100% !important; height: 200px !important; }
          .about-stats { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  )
}
