import { motion } from 'framer-motion'
import SectionLabel from './SectionLabel'

const steps = [
  { num: '01', title: 'Discover', desc: 'Deep research into users, business goals, and the competitive landscape to uncover real opportunities.' },
  { num: '02', title: 'Define',   desc: 'Synthesizing insights into clear problem statements, personas, and strategic design direction.' },
  { num: '03', title: 'Design',   desc: 'Rapid prototyping, visual exploration, and high-fidelity interfaces built on solid design systems.' },
  { num: '04', title: 'Deliver',  desc: 'Shipping polished, developer-ready designs with thorough documentation and ongoing iteration.' },
]

export default function Process() {
  return (
    <section id="process" style={{ padding: '120px 60px', borderTop: '1px solid var(--border)', background: 'var(--bg-2)' }}>
      <SectionLabel left="© PROCESS" center="[ 04 ]" right="HOW I WORK" />
      <div>
        {steps.map(({ num, title, desc }, i) => (
          <motion.div key={num}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ background: 'rgba(0,245,212,0.03)' }}
            style={{ display: 'grid', gridTemplateColumns: '80px 1fr auto',
              alignItems: 'center', gap: 40, padding: '36px 20px',
              borderBottom: '1px solid var(--border)',
              ...(i === 0 ? { borderTop: '1px solid var(--border)' } : {}),
              cursor: 'default', borderRadius: 4 }}
            className="process-item">
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700,
              letterSpacing: '0.12em', color: 'var(--accent)',
              textShadow: '0 0 8px var(--accent)' }}>{num}</span>
            <div>
              <motion.h3
                style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px,2.8vw,40px)',
                  fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 8,
                  color: 'var(--text)', textTransform: 'uppercase' }}
                whileHover={{ color: 'var(--accent)' }}>
                {title}
              </motion.h3>
              <p style={{ fontSize: 13, lineHeight: 1.8, color: 'var(--text-muted)', maxWidth: 460 }}>{desc}</p>
            </div>
            <motion.span style={{ color: 'var(--text-dim)', display: 'flex', alignItems: 'center' }}
              whileHover={{ color: 'var(--accent)', x: 6 }}
              transition={{ duration: 0.2 }}>
              {i === steps.length - 1 ? (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
              ) : (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              )}
            </motion.span>
          </motion.div>
        ))}
      </div>
      <style>{`
        @media (max-width:900px){.process-item{grid-template-columns:60px 1fr auto !important;gap:20px !important}}
        @media (max-width:600px){.process-item{grid-template-columns:1fr !important;padding:24px 0 !important}}
      `}</style>
    </section>
  )
}
