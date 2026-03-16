import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

const testimonials = [
  { quote: "Shameem delivered an exceptional UX redesign that increased our conversion rate by 38%. His eye for detail and deep understanding of user behaviour made all the difference.", name: 'Alex Carter', role: 'CEO, NovaTech', initials: 'AC', accent: 'var(--magenta)' },
  { quote: "Working with Shameem was a seamless experience. He took our vague AI dashboard concept and turned it into a polished, intuitive product our users love.", name: 'Priya Mehta', role: 'Product Lead, Spansult', initials: 'PM', accent: 'var(--violet)' },
  { quote: "Shameem's e-commerce expertise is second to none. He rebuilt our Shopify store from the ground up — sales doubled within the first quarter.", name: 'James Whitfield', role: 'Founder, UrbanCart', initials: 'JW', accent: 'var(--lime)' },
]

const details = [
  { label: 'Email', value: 'hello@shameem.design' },
  { label: 'LinkedIn', value: 'linkedin.com/in/shameem' },
  { label: 'Dribbble', value: 'dribbble.com/shameem' },
]

function TestiCard({ t }) {
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const handleMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: 1, minWidth: 0, position: 'relative', overflow: 'hidden', borderRadius: 8,
        border: `1px solid ${hovered ? t.accent + '25' : 'var(--border)'}`,
        padding: 'clamp(14px, 2.5vw, 24px) clamp(12px, 2vw, 20px)', background: 'var(--bg-card)', cursor: 'none',
        display: 'flex', flexDirection: 'column', transition: 'border-color 0.3s',
      }}
    >
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 8, pointerEvents: 'none',
        opacity: hovered ? 1 : 0, transition: 'opacity 0.4s',
        background: `radial-gradient(300px circle at ${pos.x}px ${pos.y}px, ${t.accent}10, transparent 65%)`,
      }} />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', gap: 3, marginBottom: 10 }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} width="10" height="10" viewBox="0 0 24 24" fill={t.accent} style={{ filter: `drop-shadow(0 0 3px ${t.accent})` }}>
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>

        <p style={{ fontSize: 'clamp(10px, 1.5vw, 12px)', lineHeight: 1.7, fontWeight: 300, color: 'var(--text-muted)', flex: 1, marginBottom: 12 }}>
          &ldquo;{t.quote}&rdquo;
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, borderTop: '1px solid var(--border)', paddingTop: 10 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 4, flexShrink: 0,
            background: `${t.accent}12`, border: `1px solid ${t.accent}35`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-mono)', fontSize: 8, fontWeight: 700, color: t.accent,
          }}>
            {t.initials}
          </div>
          <div>
            <div style={{ fontSize: 'clamp(10px, 1.4vw, 12px)', fontWeight: 600 }}>{t.name}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(6px, 1vw, 8px)', letterSpacing: '0.12em', color: 'var(--text-muted)', marginTop: 1, textTransform: 'uppercase' }}>{t.role}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MagneticButton({ children }) {
  const ref = useRef(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const handleMove = (e) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    setOffset({
      x: (e.clientX - rect.left - rect.width / 2) * 0.3,
      y: (e.clientY - rect.top - rect.height / 2) * 0.3,
    })
  }

  return (
    <motion.a
      ref={ref}
      href="#contact"
      onMouseMove={handleMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      role="button"
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        gap: 10, padding: 'clamp(14px, 2.5vw, 18px) clamp(28px, 5vw, 48px)', borderRadius: 6,
        background: 'var(--magenta)', color: 'var(--bg)',
        fontFamily: 'var(--font-mono)', fontSize: 'clamp(10px, 1.5vw, 12px)', fontWeight: 700,
        letterSpacing: '0.12em', textTransform: 'uppercase',
        cursor: 'none',
        boxShadow: '0 0 30px var(--magenta-glow), 0 0 60px var(--magenta-glow)',
        textDecoration: 'none',
      }}
    >
      {children}
    </motion.a>
  )
}

export default function Contact() {
  return (
    <div className="contact-panel" style={{
      width: '100%', height: '100%',
      padding: 'clamp(60px, 10vh, 60px) clamp(20px, 5vw, 60px) clamp(16px, 3vh, 32px)',
      display: 'flex', flexDirection: 'column', background: 'var(--bg)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', bottom: '-20%', left: '30%', width: '40vw', height: '40vh',
        borderRadius: '50%', background: 'radial-gradient(circle, var(--magenta-glow), transparent 70%)',
        filter: 'blur(80px)', pointerEvents: 'none', opacity: 0.3,
      }} />

      {/* Testimonials */}
      <div style={{ marginBottom: 'clamp(12px, 2vh, 24px)' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.15em', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
          // Client Feedback
        </span>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 5vw, 60px)',
          fontWeight: 400, lineHeight: 0.95, marginTop: 8,
        }}>
          What Clients <span style={{ color: 'var(--violet)', textShadow: '0 0 20px var(--violet-glow)' }}>Say</span>
        </h2>
      </div>

      <div className="testi-row" style={{ display: 'flex', gap: 'clamp(8px, 1.5vw, 14px)', marginBottom: 'clamp(16px, 3vh, 32px)' }}>
        {testimonials.map((t) => (
          <TestiCard key={t.name} t={t} />
        ))}
      </div>

      <div style={{ height: 1, background: 'var(--border)', marginBottom: 'clamp(16px, 3vh, 32px)' }} />

      {/* Contact CTA */}
      <div className="contact-cta" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flex: 1 }}>
        <div>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 6vw, 72px)',
            fontWeight: 400, lineHeight: 0.95, marginBottom: 'clamp(12px, 2vh, 24px)',
          }}>
            Let's <span style={{ color: 'var(--magenta)', textShadow: '0 0 30px var(--magenta-glow)' }}>Work</span><br />Together.
          </h2>

          <div className="contact-details" style={{ display: 'flex', gap: 'clamp(16px, 4vw, 40px)', flexWrap: 'wrap' }}>
            {details.map(({ label, value }) => (
              <div key={label}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(7px, 1vw, 9px)', letterSpacing: '0.14em', color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: 4 }}>
                  {label}
                </div>
                <div style={{ fontSize: 'clamp(11px, 1.5vw, 13px)', color: 'var(--text-muted)', fontWeight: 400 }}>{value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="contact-btn-wrap">
          <MagneticButton>
            Start a Project
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </MagneticButton>
        </div>
      </div>

      {/* Footer line */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        paddingTop: 12, borderTop: '1px solid var(--border)', marginTop: 'auto',
      }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 16, letterSpacing: '0.05em' }}>
          SHAMEEM<span style={{ color: 'var(--magenta)' }}>.</span>
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(7px, 1vw, 9px)', color: 'var(--text-dim)', letterSpacing: '0.1em' }}>
          &copy; 2026 All rights reserved.
        </span>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .contact-panel { height: auto !important; min-height: 100vh; }
          .testi-row { flex-direction: column !important; }
          .contact-cta { flex-direction: column !important; align-items: flex-start !important; gap: 24px; }
          .contact-btn-wrap { width: 100%; text-align: center; }
          .contact-btn-wrap a { width: 100%; justify-content: center; }
        }
      `}</style>
    </div>
  )
}
