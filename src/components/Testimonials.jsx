import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import SectionLabel from './SectionLabel'
import FadeUp from './FadeUp'

const testimonials = [
  { quote: "Shameem delivered an exceptional UX redesign that increased our conversion rate by 38%. His eye for detail and deep understanding of user behaviour made all the difference.", name: 'Alex Carter', role: 'CEO, NovaTech', initials: 'AC', accent: '#00f5d4' },
  { quote: "Working with Shameem was a seamless experience. He took our vague AI dashboard concept and turned it into a polished, intuitive product our users love.", name: 'Priya Mehta', role: 'Product Lead, Spansult', initials: 'PM', accent: '#7c3aed' },
  { quote: "Shameem's e-commerce expertise is second to none. He rebuilt our Shopify store from the ground up — sales doubled within the first quarter.", name: 'James Whitfield', role: 'Founder, UrbanCart', initials: 'JW', accent: '#00f5d4' },
]

function TestiCard({ quote, name, role, initials, accent, animationProps }) {
  const cardRef = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect(); if (!rect) return
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <motion.div ref={cardRef} onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}
      {...animationProps}
      style={{ position: 'relative', overflow: 'hidden',
        border: `1px solid ${visible ? accent + '25' : 'var(--border)'}`,
        borderRadius: 8, padding: '36px 28px',
        display: 'flex', flexDirection: 'column',
        background: 'var(--bg-card)', cursor: 'none',
        transition: 'border-color 0.3s' }}>

      {/* Spotlight */}
      <div style={{ position: 'absolute', inset: 0, borderRadius: 8, pointerEvents: 'none',
        opacity: visible ? 1 : 0, transition: 'opacity 0.4s',
        background: `radial-gradient(350px circle at ${pos.x}px ${pos.y}px, ${accent}12, transparent 65%)` }} />

      {/* Top scan line */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
        opacity: visible ? 0.6 : 0, transition: 'opacity 0.3s',
        boxShadow: `0 0 10px ${accent}` }} />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Stars */}
        <div style={{ display: 'flex', gap: 3, marginBottom: 20 }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill={accent} xmlns="http://www.w3.org/2000/svg"
              style={{ filter: `drop-shadow(0 0 4px ${accent})` }}>
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          ))}
        </div>

        <p style={{ fontSize: 14, lineHeight: 1.8, fontWeight: 300, color: 'var(--text-muted)',
          flex: 1, marginBottom: 24 }}>"{quote}"</p>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14,
          borderTop: '1px solid var(--border)', paddingTop: 18 }}>
          <div style={{ width: 38, height: 38, borderRadius: 4,
            background: `${accent}15`, border: `1px solid ${accent}40`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700,
            color: accent, flexShrink: 0 }}>
            {initials}
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', fontFamily: 'var(--font-body)' }}>{name}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: 3 }}>{role}</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Testimonials() {
  return (
    <section id="testimonials" style={{ padding: '120px 60px', borderTop: '1px solid var(--border)', background: 'var(--bg)' }}>
      <SectionLabel left="© TESTIMONIALS" center="[ 05 ]" right="CLIENT FEEDBACK" />
      <FadeUp>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(52px,9vw,120px)',
          fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 0.9, marginBottom: 60,
          textTransform: 'uppercase', color: 'var(--text)' }}>
          What Clients<br /><span style={{ color: 'var(--accent)', textShadow: '0 0 30px rgba(0,245,212,0.4)' }}>Say</span>
        </h2>
      </FadeUp>
      <div className="testimonials-grid">
        {testimonials.map(({ quote, name, role, initials, accent }, i) => (
          <TestiCard key={name} quote={quote} name={name} role={role} initials={initials} accent={accent}
            animationProps={{
              initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 },
              viewport: { once: true, margin: '-40px' },
              transition: { duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }
            }} />
        ))}
      </div>
      <style>{`
        .testimonials-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
        @media (max-width:900px){.testimonials-grid{grid-template-columns:1fr 1fr !important}}
        @media (max-width:600px){.testimonials-grid{grid-template-columns:1fr !important}}
      `}</style>
    </section>
  )
}
