import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const services = [
  {
    num: '01', title: 'UX/UI\nDesign', accent: 'var(--magenta)',
    desc: 'End-to-end product design — from wireframes and user flows to polished, pixel-perfect interfaces.',
    items: ['User Research & Personas', 'Wireframing & Prototyping', 'Visual Design Systems', 'Usability Testing'],
  },
  {
    num: '02', title: 'AI\nResearch', accent: 'var(--violet)',
    desc: 'Exploring the intersection of AI and human experience — building tools that augment intelligence.',
    items: ['LLM Application Design', 'Prompt Engineering', 'AI-Powered Workflows', 'Research & Analysis'],
  },
  {
    num: '03', title: 'E-Commerce\nStrategy', accent: 'var(--lime)',
    desc: 'Revenue-driven store builds with conversion-optimized design and data-backed merchandising.',
    items: ['Shopify Development', 'Conversion Optimization', 'Product Strategy', 'Dropshipping Setup'],
  },
]

const steps = [
  { num: '01', title: 'Discover', desc: 'Deep research into users, market, and pain points' },
  { num: '02', title: 'Define', desc: 'Synthesizing insights into clear problem statements' },
  { num: '03', title: 'Design', desc: 'Rapid prototyping and iterative visual design' },
  { num: '04', title: 'Deliver', desc: 'Shipping polished, production-ready solutions' },
]

function ServiceCard({ service }) {
  const ref = useRef(null)
  const [hovered, setHovered] = useState(false)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const rx = useSpring(rotateX, { stiffness: 200, damping: 20 })
  const ry = useSpring(rotateY, { stiffness: 200, damping: 20 })

  const handleMove = (e) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const cx = e.clientX - rect.left - rect.width / 2
    const cy = e.clientY - rect.top - rect.height / 2
    rotateX.set((-cy / rect.height) * 8)
    rotateY.set((cx / rect.width) * 8)
  }

  const handleLeave = () => {
    rotateX.set(0); rotateY.set(0)
    setHovered(false)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      style={{
        rotateX: rx, rotateY: ry, transformPerspective: 800,
        position: 'relative', overflow: 'hidden', borderRadius: 8,
        border: `1px solid ${hovered ? service.accent + '25' : 'var(--border)'}`,
        padding: 'clamp(16px, 3vw, 24px)', background: 'var(--bg-card)', cursor: 'none',
        transition: 'border-color 0.3s',
      }}
    >
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 1,
          background: service.accent, transformOrigin: 'left',
          boxShadow: `0 0 10px ${service.accent}`,
        }}
      />

      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: service.accent }}>{service.num}</span>
      <h3 style={{
        fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 4vw, 28px)', lineHeight: 1.1,
        marginTop: 8, marginBottom: 10, whiteSpace: 'pre-line',
      }}>
        {service.title}
      </h3>
      <p style={{ fontSize: 'clamp(11px, 1.5vw, 12px)', color: 'var(--text-muted)', lineHeight: 1.7, fontWeight: 300, marginBottom: 14 }}>
        {service.desc}
      </p>
      {service.items.map((item) => (
        <div key={item} style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '5px 0', borderBottom: '1px solid var(--border)',
          fontSize: 'clamp(10px, 1.4vw, 11px)', color: 'var(--text-muted)', fontWeight: 400,
        }}>
          <span style={{ width: 4, height: 4, borderRadius: '50%', background: service.accent, flexShrink: 0 }} />
          {item}
        </div>
      ))}
    </motion.div>
  )
}

export default function Services() {
  const [hoveredStep, setHoveredStep] = useState(null)

  return (
    <div className="services-panel" style={{
      width: '100%', height: '100%',
      padding: 'clamp(60px, 10vh, 70px) clamp(20px, 5vw, 60px) clamp(20px, 4vh, 40px)',
      display: 'flex', flexDirection: 'column', background: 'var(--bg-2)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ marginBottom: 'clamp(16px, 3vh, 28px)' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.15em', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
          // What I Do
        </span>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 7vw, 80px)',
          fontWeight: 400, lineHeight: 0.95, marginTop: 8,
        }}>
          What I <span style={{ color: 'var(--lime)', textShadow: '0 0 30px var(--lime-glow)' }}>Bring</span>
        </h2>
      </div>

      <div className="services-split" style={{ display: 'flex', gap: 'clamp(16px, 3vw, 32px)', flex: 1, minHeight: 0 }}>
        <div className="services-cards" style={{ flex: '0 0 55%', display: 'flex', flexDirection: 'column', gap: 12, overflow: 'auto' }}>
          {services.map((s) => (
            <ServiceCard key={s.num} service={s} />
          ))}
        </div>

        <div className="services-process" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
          <h3 style={{
            fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.15em',
            color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: 24,
          }}>
            // Process
          </h3>

          <div className="process-line" style={{
            position: 'absolute', left: 18, top: 60, bottom: 40,
            width: 1, background: 'linear-gradient(to bottom, var(--violet), var(--violet-glow), transparent)',
          }} />

          {steps.map((step, i) => (
            <div
              key={step.num}
              onMouseEnter={() => setHoveredStep(i)}
              onMouseLeave={() => setHoveredStep(null)}
              style={{
                display: 'flex', gap: 16, alignItems: 'flex-start',
                padding: 'clamp(10px, 2vh, 18px) clamp(8px, 2vw, 16px)', marginLeft: 4, borderRadius: 6,
                background: hoveredStep === i ? 'rgba(255,255,255,0.02)' : 'transparent',
                transition: 'background 0.3s', cursor: 'none',
              }}
            >
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700,
                color: 'var(--violet)', width: 28, flexShrink: 0,
                textShadow: hoveredStep === i ? '0 0 8px var(--violet)' : 'none',
                transition: 'text-shadow 0.3s',
              }}>
                {step.num}
              </span>
              <div>
                <h4 style={{
                  fontSize: 'clamp(13px, 2vw, 16px)', fontWeight: 600, marginBottom: 4,
                  color: hoveredStep === i ? 'var(--violet)' : 'var(--text)',
                  transition: 'color 0.3s',
                }}>
                  {step.title}
                </h4>
                <p style={{ fontSize: 'clamp(10px, 1.5vw, 12px)', color: 'var(--text-muted)', fontWeight: 300, lineHeight: 1.6 }}>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .services-panel { height: auto !important; min-height: 100vh; }
          .services-split { flex-direction: column !important; }
          .services-cards { flex: 1 !important; }
          .services-process { margin-top: 16px; }
          .process-line { display: none !important; }
        }
      `}</style>
    </div>
  )
}
