import { motion } from 'framer-motion'
import SectionLabel from './SectionLabel'
import FadeUp from './FadeUp'

const testimonials = [
  {
    quote: "Shameem delivered an exceptional UX redesign that increased our conversion rate by 38%. His eye for detail and deep understanding of user behaviour made all the difference.",
    name: 'Alex Carter',
    role: 'CEO, NovaTech',
    initials: 'AC',
  },
  {
    quote: "Working with Shameem was a seamless experience. He took our vague AI dashboard concept and turned it into a polished, intuitive product our users love.",
    name: 'Priya Mehta',
    role: 'Product Lead, Spansult',
    initials: 'PM',
  },
  {
    quote: "Shameem's e-commerce expertise is second to none. He rebuilt our Shopify store from the ground up — sales doubled within the first quarter.",
    name: 'James Whitfield',
    role: 'Founder, UrbanCart',
    initials: 'JW',
  },
]

function Stars() {
  return (
    <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="var(--accent)" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section id="testimonials" style={{ padding: '100px 40px', borderTop: '1px solid var(--border)' }}>
      <SectionLabel left="© TESTIMONIALS 評価" center="(WDX® — 04)" right="CLIENT FEEDBACK" />

      <FadeUp>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(36px,5vw,64px)',
          fontWeight: 800, letterSpacing: '-0.03em',
          lineHeight: 1.05, marginBottom: 60, marginTop: 48,
        }}>
          What Clients<br /><em style={{ fontStyle: 'italic', fontWeight: 800 }}>Say</em>
        </h2>
      </FadeUp>

      <div className="testimonials-grid">
        {testimonials.map(({ quote, name, role, initials }, i) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            style={{
              border: '1px solid var(--border)',
              borderRadius: 16,
              padding: '36px 32px',
              display: 'flex',
              flexDirection: 'column',
              gap: 0,
              background: 'rgba(248,250,252,0.02)',
              cursor: 'none',
            }}
          >
            <Stars />
            <p style={{
              fontSize: 'clamp(15px,1.3vw,17px)',
              lineHeight: 1.7,
              fontWeight: 300,
              color: 'var(--white)',
              flex: 1,
              marginBottom: 28,
            }}>
              "{quote}"
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: 14, borderTop: '1px solid var(--border)', paddingTop: 20 }}>
              <div style={{
                width: 40, height: 40, borderRadius: '50%',
                background: 'var(--accent)', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 700, letterSpacing: '0.04em',
                color: 'var(--white)', flexShrink: 0,
              }}>
                {initials}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--white)' }}>{name}</div>
                <div style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--grey)', marginTop: 2 }}>{role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <style>{`
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        @media (max-width: 900px) {
          .testimonials-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .testimonials-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
