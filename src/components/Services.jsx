import { motion } from 'framer-motion'
import SectionLabel from './SectionLabel'
import FadeUp from './FadeUp'

const services = [
  {
    num: '01', title: 'UX / UI\nDesign',
    desc: 'End-to-end product design — from wireframes and user flows to polished, pixel-perfect interfaces that convert and delight.',
    items: ['User Research & Personas', 'Wireframing & Prototyping', 'Design Systems', 'Usability Testing'],
  },
  {
    num: '02', title: 'AI\nResearch',
    desc: 'Exploring the frontier of artificial intelligence — studying how intelligent systems can enhance human lives and design decisions.',
    items: ['LLM Applications', 'AI-Assisted Design', 'Prompt Engineering', 'Research & Insights'],
  },
  {
    num: '03', title: 'Dropshipping\n& E-Commerce',
    desc: 'Building and scaling profitable online stores — from product sourcing and store design to conversion optimization and growth.',
    items: ['Store Design & Branding', 'Product Research', 'Conversion Optimization', 'Marketing Funnels'],
  },
]

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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, border: '1px solid var(--border)' }} className="services-grid">
        {services.map(({ num, title, desc, items }, i) => (
          <motion.div
            key={num}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ background: 'rgba(255,255,255,0.03)' }}
            style={{ padding: '48px 36px', border: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}
          >
            {/* accent top bar */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'var(--accent)', transformOrigin: 'left' }}
            />

            <div style={{ fontSize: 11, letterSpacing: '0.15em', color: 'var(--grey)', marginBottom: 32 }}>{num}</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3vw,42px)', fontWeight: 700, lineHeight: 1, letterSpacing: '-0.03em', marginBottom: 24, whiteSpace: 'pre-line' }}>
              {title}
            </h3>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--grey)', marginBottom: 28, fontWeight: 300 }}>{desc}</p>
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
          </motion.div>
        ))}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
