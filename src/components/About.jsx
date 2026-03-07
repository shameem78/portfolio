import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionLabel from './SectionLabel'
import FadeUp from './FadeUp'

const tags = ['UX/UI Design', 'AI Research', 'Dropshipping', 'Product Strategy', 'Interaction Design', 'E-Commerce']
const stats = [
  { num: 40, suffix: '+', label: 'Projects Completed' },
  { num: 5,  suffix: '+', label: 'Years Experience' },
  { num: 20, suffix: '+', label: 'Happy Clients' },
  { num: 3,  suffix: '',  label: 'Domains of Expertise' },
]
const tools = ['Figma', 'Framer', 'Notion', 'Webflow', 'Shopify', 'ChatGPT', 'Claude', 'Midjourney', 'React']

function Counter({ target, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1800
    const startTime = performance.now()
    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(ease * target))
      if (progress < 1) requestAnimationFrame(step)
      else setCount(target)
    }
    requestAnimationFrame(step)
  }, [inView, target])

  return (
    <span ref={ref} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(52px,6vw,80px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, color: 'var(--white)' }}>
      {count}<span style={{ color: 'var(--accent)' }}>{suffix}</span>
    </span>
  )
}

export default function About() {
  const doubled = [...tools, ...tools]

  return (
    <section id="about" style={{ padding: '100px 40px', borderTop: '1px solid var(--border)' }}>
      <SectionLabel left="© ABOUT ミー" center="(WDX® — 01)" right="UX / AI / E-COMMERCE" />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }} className="about-inner">
        {/* Photo */}
        <FadeUp>
          <div style={{
            width: '100%', aspectRatio: '3/4', background: '#111',
            border: '1px solid var(--border)', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            color: 'var(--grey)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase',
            maxWidth: 420,
          }}>
            Your Photo
          </div>
        </FadeUp>

        {/* Content */}
        <div style={{ paddingTop: 20 }}>
          <FadeUp>
            <p style={{ fontSize: 'clamp(18px,2.2vw,26px)', lineHeight: 1.55, fontWeight: 300, marginBottom: 36 }}>
              Crafting <strong style={{ fontWeight: 600 }}>human-centered digital experiences</strong> with a sharp eye for usability and aesthetics. I bridge the gap between intelligent systems and seamless interfaces — building products that feel as good as they perform.
            </p>
          </FadeUp>
          <FadeUp delay={0.1} style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 8 }}>
            {tags.map(tag => (
              <motion.span
                key={tag}
                whileHover={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
                style={{
                  border: '1px solid var(--border)', borderRadius: 999,
                  padding: '7px 18px', fontSize: 11, letterSpacing: '0.08em',
                  textTransform: 'uppercase', color: 'var(--grey)', cursor: 'none',
                  transition: 'border-color 0.2s, color 0.2s',
                }}
              >
                {tag}
              </motion.span>
            ))}
          </FadeUp>
          <FadeUp delay={0.15}>
            <motion.a
              href="#contact"
              whileHover={{ background: 'var(--white)', color: 'var(--black)', scale: 1.03 }}
              onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
              style={{
                display: 'inline-block', border: '1px solid var(--accent)', borderRadius: 999,
                padding: '14px 32px', fontSize: 12, fontWeight: 600, letterSpacing: '0.15em',
                textTransform: 'uppercase', color: 'var(--white)', marginTop: 36,
                cursor: 'none', transition: 'background 0.3s, color 0.3s',
                background: 'var(--accent)',
              }}
            >
              CONTACT
            </motion.a>
          </FadeUp>
        </div>
      </div>

      {/* Stats — 2×2 grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', borderTop: '1px solid var(--border)', borderLeft: '1px solid var(--border)', marginTop: 80 }} className="stats-row">
        {stats.map(({ num, suffix, label }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="stat-item"
            style={{
              padding: '56px 40px',
              borderRight: '1px solid var(--border)',
              borderBottom: '1px solid var(--border)',
              display: 'flex', flexDirection: 'column', gap: 8,
            }}
          >
            <Counter target={num} suffix={suffix} />
            <span style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--grey)', marginTop: 4 }}>
              {label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Tools marquee */}
      <div style={{ overflow: 'hidden', padding: '28px 0', borderTop: '1px solid var(--border)', whiteSpace: 'nowrap' }}>
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 18, ease: 'linear', repeat: Infinity }}
          style={{ display: 'inline-flex', gap: 24, willChange: 'transform' }}
        >
          {doubled.map((t, i) => (
            <span key={i} style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,3vw,32px)',
              fontWeight: 800, letterSpacing: '-0.02em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.15)', marginRight: 8,
            }}>
              {t} <span style={{ color: 'rgba(255,255,255,0.08)', marginRight: 8 }}>—</span>
            </span>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-inner { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
        @media (max-width: 600px) {
          .stat-item { padding: 36px 20px !important; }
        }
      `}</style>
    </section>
  )
}
