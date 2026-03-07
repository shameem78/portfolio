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
    <section id="process" style={{ padding: '100px 40px', borderTop: '1px solid var(--border)' }}>
      <SectionLabel left="© PROCESS プロセス" center="(WDX® — 04)" right="HOW I WORK" />

      <div>
        {steps.map(({ num, title, desc }, i) => (
          <motion.div
            key={num}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ background: 'rgba(255,255,255,0.02)' }}
            style={{
              display: 'grid', gridTemplateColumns: '80px 1fr auto',
              alignItems: 'center', gap: 40, padding: '36px 0',
              borderBottom: '1px solid var(--border)',
              ...(i === 0 ? { borderTop: '1px solid var(--border)' } : {}),
              cursor: 'default',
            }}
            className="process-item"
          >
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', color: 'var(--grey)' }}>
              {num}
            </span>
            <div>
              <motion.h3
                style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,3vw,40px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 8 }}
                whileHover={{ color: 'var(--accent)' }}
              >
                {title}
              </motion.h3>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--grey)', maxWidth: 460 }}>{desc}</p>
            </div>
            <motion.span
              style={{ fontSize: 28, color: 'var(--grey)' }}
              whileHover={{ color: 'var(--accent)', x: 6 }}
              transition={{ duration: 0.2 }}
            >
              {i === steps.length - 1 ? '↗' : '→'}
            </motion.span>
          </motion.div>
        ))}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .process-item { grid-template-columns: 60px 1fr auto !important; gap: 20px !important; }
        }
        @media (max-width: 600px) {
          .process-item { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
