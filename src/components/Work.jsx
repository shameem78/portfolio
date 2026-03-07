import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionLabel from './SectionLabel'
import FadeUp from './FadeUp'

const projects = [
  { num: '01', title: 'Mobile App Redesign',    tag: 'UX / UI',     large: true,  bg: 'linear-gradient(135deg,#1a1a2e 0%,#16213e 40%,#0f3460 100%)' },
  { num: '02', title: 'AI Dashboard Interface', tag: 'AI RESEARCH',  large: false, bg: 'linear-gradient(135deg,#0d0d0d 0%,#1a0a2e 40%,#2d1b69 100%)' },
  { num: '03', title: 'E-Commerce Store',        tag: 'E-COMMERCE',  large: false, bg: 'linear-gradient(135deg,#0a1628 0%,#1e3a5f 50%,#2196f3 100%)' },
  { num: '04', title: 'UX Research Study',       tag: 'UX RESEARCH', large: true,  bg: 'linear-gradient(135deg,#111 0%,#1a1a1a 40%,#2a2a2a 100%)' },
]

function WorkCard({ num, title, tag, large, bg }) {
  const [hovered, setHovered] = useState(false)
  const scrollToContact = (e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }

  return (
    <motion.a
      href="#contact"
      onClick={scrollToContact}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{ display: 'block', position: 'relative', overflow: 'hidden', cursor: 'none' }}
    >
      <div style={{
        width: '100%', aspectRatio: large ? '16/11' : '16/10',
        background: bg, position: 'relative', overflow: 'hidden',
      }}>
        <motion.div
          animate={{ scale: hovered ? 1.04 : 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: '100%', height: '100%', background: bg }}
        />

        {/* Tag badge */}
        <div style={{
          position: 'absolute', top: 16, left: 16, fontSize: 10,
          letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--grey)',
          background: 'rgba(0,0,0,0.5)', padding: '5px 12px', borderRadius: 999,
          border: '1px solid var(--border)', backdropFilter: 'blur(8px)', zIndex: 2,
        }}>
          {tag}
        </div>

        {/* Hover label */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute', bottom: 20, right: 20, fontSize: 12,
            letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--white)',
            background: 'rgba(0,0,0,0.6)', padding: '8px 16px', borderRadius: 999,
            border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', zIndex: 3,
          }}
        >
          View Project →
        </motion.div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0 8px', borderBottom: '1px solid var(--border)' }}>
        <motion.span
          animate={{ color: hovered ? 'var(--accent)' : 'var(--white)' }}
          style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em' }}
        >
          {title}
        </motion.span>
        <span style={{ fontSize: 11, color: 'var(--grey)', letterSpacing: '0.1em' }}>({num})</span>
      </div>
    </motion.a>
  )
}

export default function Work() {
  return (
    <section id="work" style={{ padding: '100px 40px', borderTop: '1px solid var(--border)' }}>
      <SectionLabel left="© FEATURED WORK プロジェクト" center="(WDX® — 03)" right="SELECTED PROJECTS" />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'end', marginBottom: 80 }} className="work-heading-wrap">
        <FadeUp>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(60px,10vw,140px)', fontWeight: 800, lineHeight: 0.9, letterSpacing: '-0.04em' }}>
            Featured<br />
            <em style={{ fontStyle: 'italic', color: 'transparent', WebkitTextStroke: '1px var(--white)' }}>Work</em>
          </h2>
        </FadeUp>
        <FadeUp delay={0.1} style={{ maxWidth: 440, paddingBottom: 10 }}>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--grey)', fontWeight: 300, marginBottom: 0 }}>
            Every project is a chance to merge design thinking with intelligent technology — creating bold digital products built with intent, speed, and visual clarity.
          </p>
          <motion.a
            href="#contact"
            onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
            whileHover={{ background: 'var(--white)', color: 'var(--black)', scale: 1.03 }}
            style={{
              display: 'inline-block', marginTop: 28, border: '1px solid var(--accent)',
              borderRadius: 999, padding: '14px 32px', fontSize: 12, fontWeight: 600,
              letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--white)',
              cursor: 'none', transition: 'background 0.3s, color 0.3s',
              background: 'var(--accent)',
            }}
          >
            HIRE ME
          </motion.a>
        </FadeUp>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 2 }} className="work-grid">
        {projects.map(p => <WorkCard key={p.num} {...p} />)}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .work-heading-wrap { grid-template-columns: 1fr !important; }
          .work-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .work-heading-wrap { margin-bottom: 40px !important; }
          .work-grid { gap: 16px !important; }
        }
      `}</style>
    </section>
  )
}
