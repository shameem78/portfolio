import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

const projects = [
  { num: '01', title: 'Creative Agency Website', tag: 'UX DESIGN', problem: 'Outdated brand presence with low engagement', stack: ['Figma', 'Framer', 'GSAP'], result: '+64% conversion rate', accent: 'var(--magenta)' },
  { num: '02', title: 'AI Dashboard Interface', tag: 'AI RESEARCH', problem: 'Complex AI data with no clear visual hierarchy', stack: ['React', 'Figma', 'Claude AI'], result: '40% less cognitive load', accent: 'var(--violet)' },
  { num: '03', title: 'E-Commerce Store', tag: 'E-COMMERCE', problem: 'Poor product discovery and checkout friction', stack: ['Shopify', 'Figma', 'Hotjar'], result: '2x revenue in 3 months', accent: 'var(--magenta)' },
  { num: '04', title: 'LLM Chat Interface', tag: 'UX RESEARCH', problem: 'Users struggled with prompt crafting', stack: ['React', 'Python', 'Claude AI'], result: '55% task completion lift', accent: 'var(--violet)' },
]

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      className="work-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'relative', overflow: 'hidden', borderRadius: 8,
        border: `1px solid ${hovered ? project.accent + '30' : 'var(--border)'}`,
        background: 'var(--bg-card)', cursor: 'none',
        transition: 'border-color 0.3s',
      }}
    >
      <div style={{
        aspectRatio: '16/10', background: 'var(--bg-2)', position: 'relative', overflow: 'hidden',
      }}>
        <span style={{
          position: 'absolute', top: 10, left: 10, zIndex: 2,
          fontFamily: 'var(--font-mono)', fontSize: 'clamp(7px, 1.5vw, 9px)', letterSpacing: '0.14em',
          padding: '4px 10px', borderRadius: 4,
          border: `1px solid ${project.accent}50`, color: project.accent,
          background: `${project.accent}10`, textTransform: 'uppercase',
        }}>
          {project.tag}
        </span>

        {hovered && (
          <motion.div
            initial={{ top: '0%' }}
            animate={{ top: '100%' }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute', left: 0, right: 0, height: 1,
              background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
              opacity: 0.6, zIndex: 1,
            }}
          />
        )}
      </div>

      <div style={{ padding: 'clamp(10px, 2vw, 16px)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
          <h3 style={{ fontSize: 'clamp(12px, 2vw, 14px)', fontWeight: 600, color: 'var(--text)' }}>{project.title}</h3>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(8px, 1.2vw, 10px)', color: 'var(--text-dim)' }}>({project.num})</span>
        </div>
        <p style={{ fontSize: 'clamp(9px, 1.5vw, 11px)', color: 'var(--text-muted)', marginBottom: 10, fontWeight: 300 }}>{project.problem}</p>
        <div className="card-meta" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 6 }}>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            {project.stack.map((t) => (
              <span key={t} style={{
                fontFamily: 'var(--font-mono)', fontSize: 'clamp(6px, 1vw, 8px)', letterSpacing: '0.1em',
                padding: '2px 6px', borderRadius: 3, border: '1px solid var(--border)',
                color: 'var(--text-dim)', textTransform: 'uppercase',
              }}>
                {t}
              </span>
            ))}
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(8px, 1.2vw, 10px)', color: project.accent, fontWeight: 700 }}>
            {project.result}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default function Work() {
  return (
    <div className="work-panel" style={{
      width: '100%', height: '100%',
      padding: 'clamp(60px, 10vh, 70px) clamp(20px, 5vw, 60px) clamp(20px, 4vh, 40px)',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      background: 'var(--bg)', position: 'relative',
    }}>
      <div style={{ marginBottom: 'clamp(16px, 3vh, 32px)' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.15em', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
          // Selected Projects
        </span>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 8vw, 90px)',
          fontWeight: 400, lineHeight: 0.95, marginTop: 8,
        }}>
          Featured <span style={{ color: 'var(--magenta)', textShadow: '0 0 30px var(--magenta-glow)' }}>Work</span>
        </h2>
      </div>

      <div className="work-grid" style={{
        display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 'clamp(8px, 1.5vw, 16px)', flex: 1, maxHeight: 'calc(100vh - 220px)',
      }}>
        {projects.map((p, i) => (
          <ProjectCard key={p.num} project={p} index={i} />
        ))}
      </div>

      <style>{`
        @media (max-width: 600px) {
          .work-grid { grid-template-columns: 1fr !important; max-height: none !important; }
          .work-panel { height: auto !important; min-height: 100vh; }
        }
      `}</style>
    </div>
  )
}
