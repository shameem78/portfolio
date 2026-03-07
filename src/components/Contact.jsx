import { motion } from 'framer-motion'
import SectionLabel from './SectionLabel'
import FadeUp from './FadeUp'

const details = [
  { label: 'Email',         value: 'hello@shameem.design',    href: 'mailto:hello@shameem.design' },
  { label: 'LinkedIn',      value: 'linkedin.com/in/shameem', href: 'https://linkedin.com/in/shameem' },
  { label: 'Dribbble',      value: 'dribbble.com/shameem',    href: 'https://dribbble.com/shameem' },
  { label: 'Available for', value: 'Freelance · Full-time · Consulting', href: null },
]

function MagneticButton({ children, href, style }) {
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    e.currentTarget.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.04)`
  }
  const handleMouseLeave = (e) => { e.currentTarget.style.transform = '' }

  return (
    <motion.a
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ background: 'var(--white)', color: 'var(--black)', borderColor: 'var(--white)' }}
      style={{
        display: 'inline-block', border: '1px solid var(--accent)', borderRadius: 999,
        padding: '18px 48px', fontSize: 14, fontWeight: 600, letterSpacing: '0.15em',
        textTransform: 'uppercase', color: 'var(--white)', cursor: 'none',
        transition: 'background 0.3s, color 0.3s',
        background: 'var(--accent)',
        ...style,
      }}
    >
      {children}
    </motion.a>
  )
}

export default function Contact() {
  return (
    <section id="contact" style={{ padding: '100px 40px', borderTop: '1px solid var(--border)' }}>
      <SectionLabel left="© CONTACT コンタクト" center="(WDX® — 06)" right="GET IN TOUCH" />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start', marginBottom: 80 }} className="contact-inner">
        <FadeUp>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(60px,10vw,130px)', fontWeight: 800, lineHeight: 0.9, letterSpacing: '-0.04em' }}>
            Let's<br />
            <em style={{ fontStyle: 'italic', color: 'transparent', WebkitTextStroke: '1px var(--white)' }}>Work</em><br />
            Together.
          </h2>
        </FadeUp>

        <div style={{ paddingTop: 10 }}>
          {details.map(({ label, value, href }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="contact-detail-row"
              style={{
                padding: '24px 0', borderBottom: '1px solid var(--border)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                ...(i === 0 ? { borderTop: '1px solid var(--border)' } : {}),
              }}
            >
              <span style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--grey)' }}>
                {label}
              </span>
              {href ? (
                <motion.a
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  whileHover={{ color: 'var(--accent)' }}
                  className="contact-detail-value"
                  style={{ fontSize: 14, color: 'var(--white)', cursor: 'none', transition: 'color 0.2s' }}
                >
                  {value}
                </motion.a>
              ) : (
                <span className="contact-detail-value" style={{ fontSize: 14, color: 'var(--white)' }}>{value}</span>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <FadeUp style={{ textAlign: 'center', paddingTop: 20 }}>
        <MagneticButton href="mailto:hello@shameem.design">START A PROJECT →</MagneticButton>
      </FadeUp>

      <style>{`
        @media (max-width: 900px) {
          .contact-inner { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
        @media (max-width: 600px) {
          .contact-inner h2 { font-size: clamp(36px, 12vw, 80px) !important; }
          .contact-detail-row { padding: 16px 0 !important; flex-wrap: wrap; gap: 4px; }
          .contact-detail-value { font-size: 12px !important; word-break: break-all; text-align: right; }
        }
        @media (pointer: coarse) {
          .contact-inner a { cursor: pointer !important; }
        }
      `}</style>
    </section>
  )
}
