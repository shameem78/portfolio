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
    <div style={{
      width: '100%', height: '100%', padding: '70px 60px 40px',
      display: 'flex', flexDirection: 'column', background: 'var(--bg-2)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.15em', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
          // About
        </span>
      </div>

      {/* Main content — two columns */}
      <div style={{ display: 'flex', gap: 48, flex: 1, minHeight: 0 }}>
        {/* Left — ID Card */}
        <div className="about-blob-card" style={{
          flex: '0 0 280px', position: 'relative', borderRadius: 12,
          border: '1px solid var(--border)', background: 'var(--bg-card)',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', overflow: 'hidden', padding: 32,
        }}>
          {/* Corner marks */}
          {['top:12px;left:12px', 'top:12px;right:12px', 'bottom:12px;left:12px', 'bottom:12px;right:12px'].map((pos, i) => {
            const s = pos.split(';').reduce((a, p) => { const [k, v] = p.split(':'); a[k] = v; return a }, {})
            return (
              <div key={i} style={{
                position: 'absolute', ...s, width: 12, height: 12,
                borderColor: 'var(--lime)', borderStyle: 'solid', borderWidth: 0,
                ...(i === 0 ? { borderTopWidth: 1, borderLeftWidth: 1 } : {}),
                ...(i === 1 ? { borderTopWidth: 1, borderRightWidth: 1 } : {}),
                ...(i === 2 ? { borderBottomWidth: 1, borderLeftWidth: 1 } : {}),
                ...(i === 3 ? { borderBottomWidth: 1, borderRightWidth: 1 } : {}),
                opacity: 0.5,
              }} />
            )
          })}

          {/* Scan line */}
          <motion.div
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute', left: 0, right: 0, height: 1,
              background: 'linear-gradient(90deg, transparent, var(--magenta), transparent)', opacity: 0.3,
            }}
          />

          {/* Grid overlay */}
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.03,
            backgroundImage: 'linear-gradient(var(--text-dim) 1px, transparent 1px), linear-gradient(90deg, var(--text-dim) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }} />

          {/* Large S */}
          <div style={{
            fontSize: 120, fontFamily: 'var(--font-display)', color: 'transparent',
            WebkitTextStroke: '1px var(--magenta)', opacity: 0.3, lineHeight: 1,
            position: 'relative', zIndex: 1,
          }}>
            S
          </div>

          <div style={{ textAlign: 'center', position: 'relative', zIndex: 1, marginTop: 16 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em' }}>
              SHAMEEM <span style={{ color: 'var(--magenta)' }}>·</span> K
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-muted)', marginTop: 4, letterSpacing: '0.12em' }}>
              UX DESIGNER · AI RESEARCHER
            </div>
          </div>

          {/* Floating dots */}
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
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p style={{ fontSize: 18, lineHeight: 1.8, fontWeight: 300, color: 'var(--text-muted)', marginBottom: 24 }}>
            Crafting <strong style={{ color: 'var(--magenta)', fontWeight: 600 }}>human-centered digital experiences</strong> with
            a sharp eye for usability and aesthetics. I bridge the gap between intelligent systems and seamless interfaces.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
            {tags.map((tag) => (
              <span key={tag} style={{
                fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em',
                padding: '6px 14px', borderRadius: 20, textTransform: 'uppercase',
                border: '1px solid var(--border)', color: 'var(--text-muted)',
                transition: 'border-color 0.3s, color 0.3s',
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
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16,
        marginTop: 28, paddingTop: 24, borderTop: '1px solid var(--border)',
      }}>
        {stats.map(({ value, suffix, label }) => (
          <div key={label} style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: 42, lineHeight: 1,
              color: 'var(--text)',
            }}>
              <Counter to={value} suffix={suffix} />
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.14em', color: 'var(--text-dim)', marginTop: 6, textTransform: 'uppercase' }}>
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* Tools marquee */}
      <div style={{ overflow: 'hidden', marginTop: 20 }}>
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
    </div>
  )
}
