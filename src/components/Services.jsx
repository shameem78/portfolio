import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import SectionLabel from './SectionLabel'
import FadeUp from './FadeUp'

const services = [
  {
    num: '01', title: 'UX / UI\nDesign',
    desc: 'End-to-end product design — from wireframes and user flows to polished, pixel-perfect interfaces that convert and delight.',
    items: ['User Research & Personas', 'Wireframing & Prototyping', 'Design Systems', 'Usability Testing'],
    accentColor: 'var(--accent)',
    spotlightColor: 'rgba(79,110,247,0.14)',
  },
  {
    num: '02', title: 'AI\nResearch',
    desc: 'Exploring the frontier of artificial intelligence — studying how intelligent systems can enhance human lives and design decisions.',
    items: ['LLM Applications', 'AI-Assisted Design', 'Prompt Engineering', 'Research & Insights'],
    accentColor: 'var(--highlight)',
    spotlightColor: 'rgba(34,197,94,0.11)',
  },
  {
    num: '03', title: 'Dropshipping\n& E-Commerce',
    desc: 'Building and scaling profitable online stores — from product sourcing and store design to conversion optimization and growth.',
    items: ['Store Design & Branding', 'Product Research', 'Conversion Optimization', 'Marketing Funnels'],
    accentColor: 'var(--accent)',
    spotlightColor: 'rgba(79,110,247,0.14)',
  },
]

function BentoCard({ num, title, desc, items, accentColor, spotlightColor, delay }) {
  const cardRef     = useRef(null)
  const spotRef     = useRef(null)
  const glareRef    = useRef(null)
  const [hovered, setHovered] = useState(false)

  // Framer Motion spring values for smooth tilt
  const rotX = useMotionValue(0)
  const rotY = useMotionValue(0)
  const springX = useSpring(rotX, { stiffness: 280, damping: 22 })
  const springY = useSpring(rotY, { stiffness: 280, damping: 22 })

  const onMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return

    const cx = e.clientX - rect.left
    const cy = e.clientY - rect.top
    const pctX = (cx / rect.width  - 0.5) * 2   // -1 → 1
    const pctY = (cy / rect.height - 0.5) * 2   // -1 → 1

    // Tilt: max ±8°
    rotX.set(pctY * -8)
    rotY.set(pctX *  8)

    // Update spotlight + glare directly — no re-render
    if (spotRef.current) {
      spotRef.current.style.background =
        `radial-gradient(380px circle at ${cx}px ${cy}px, ${spotlightColor}, transparent 70%)`
    }
    if (glareRef.current) {
      glareRef.current.style.background =
        `radial-gradient(160px circle at ${cx}px ${cy}px, rgba(255,255,255,0.055), transparent 65%)`
    }
  }

  const onMouseLeave = () => {
    rotX.set(0)
    rotY.set(0)
    setHovered(false)
    if (spotRef.current)  spotRef.current.style.background  = 'none'
    if (glareRef.current) glareRef.current.style.background = 'none'
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
      style={{
        padding: '48px 36px',
        border: '1px solid var(--border)',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'none',
        willChange: 'transform',
        // 3-D tilt via Framer Motion springs
        rotateX: springX,
        rotateY: springY,
        transformPerspective: 900,
      }}
    >
      {/* ── Accent colour spotlight ── */}
      <div
        ref={spotRef}
        style={{
          position: 'absolute', inset: 0,
          pointerEvents: 'none', zIndex: 0,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.35s ease',
          borderRadius: 'inherit',
        }}
      />

      {/* ── White glare ── */}
      <div
        ref={glareRef}
        style={{
          position: 'absolute', inset: 0,
          pointerEvents: 'none', zIndex: 0,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.35s ease',
          borderRadius: 'inherit',
        }}
      />

      {/* ── Sliding accent top bar ── */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: 2, background: accentColor,
          transformOrigin: 'left', zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* ── Card content ── */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ fontSize: 11, letterSpacing: '0.15em', color: 'var(--grey)', marginBottom: 32 }}>
          {num}
        </div>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(28px,3vw,42px)',
          fontWeight: 700, lineHeight: 1,
          letterSpacing: '-0.03em',
          marginBottom: 24, whiteSpace: 'pre-line',
        }}>
          {title}
        </h3>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--grey)', marginBottom: 28, fontWeight: 300 }}>
          {desc}
        </p>
        <ul>
          {items.map(item => (
            <li key={item} style={{
              fontSize: 12, color: 'var(--grey)', letterSpacing: '0.05em',
              padding: '10px 0', borderBottom: '1px solid var(--border)',
            }}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

export default function Services() {
  return (
    <section id="services" style={{ padding: '100px 40px', borderTop: '1px solid var(--border)' }}>
      <SectionLabel left="© SERVICES サービス" center="(WDX® — 02)" right="WHAT I DO" />

      <FadeUp style={{ marginBottom: 80 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(60px,10vw,140px)', fontWeight: 800, lineHeight: 0.9, letterSpacing: '-0.04em' }}>
          What I<br />
          <em style={{ fontStyle: 'italic', color: 'transparent', WebkitTextStroke: '1px var(--white)' }}>Bring</em>
        </h2>
      </FadeUp>

      <div
        className="services-grid"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, border: '1px solid var(--border)' }}
      >
        {services.map(({ num, title, desc, items, accentColor, spotlightColor }, i) => (
          <BentoCard
            key={num}
            num={num}
            title={title}
            desc={desc}
            items={items}
            accentColor={accentColor}
            spotlightColor={spotlightColor}
            delay={i * 0.1}
          />
        ))}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .services-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .services-grid > div { padding: 32px 20px !important; }
        }
      `}</style>
    </section>
  )
}
