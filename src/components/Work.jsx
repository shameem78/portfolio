import { useState, useRef, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import SectionLabel from './SectionLabel'
import FadeUp from './FadeUp'

const projects = [
  { num: '01', title: 'Creative Agency Website', tag: 'UX DESIGN',   img: '/project01.png',  bg: 'linear-gradient(135deg,#1a1a2e 0%,#16213e 40%,#0f3460 100%)', align: 'left',  width: '62%' },
  { num: '02', title: 'AI Dashboard Interface',  tag: 'AI RESEARCH', img: '/project02.webp', bg: 'linear-gradient(135deg,#0d0d0d 0%,#1a0a2e 40%,#2d1b69 100%)', align: 'right', width: '52%' },
  { num: '03', title: 'E-Commerce Store',         tag: 'E-COMMERCE',  img: '/project03.webp', bg: 'linear-gradient(135deg,#0a1628 0%,#1e3a5f 50%,#2196f3 100%)', align: 'left',  width: '56%' },
  { num: '04', title: 'UX Research Study',        tag: 'UX RESEARCH', img: '/project04.png',  bg: 'linear-gradient(135deg,#111 0%,#1a1a1a 40%,#2a2a2a 100%)',  align: 'right', width: '58%' },
]

function WorkCard({ num, title, tag, bg, img, align, width }) {
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 180, damping: 20, mass: 0.5 })
  const y = useSpring(rawY, { stiffness: 180, damping: 20, mass: 0.5 })
  const scrollToContact = (e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }

  const lastMouse = useRef({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    lastMouse.current = { x: e.clientX, y: e.clientY }
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    rawX.set(e.clientX - rect.left)
    rawY.set(e.clientY - rect.top)
  }

  useEffect(() => {
    const onScroll = () => {
      if (!hovered) return
      const rect = cardRef.current?.getBoundingClientRect()
      if (!rect) return
      rawX.set(lastMouse.current.x - rect.left)
      rawY.set(lastMouse.current.y - rect.top)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [hovered, rawX, rawY])

  return (
    <motion.a
      href="#contact"
      onClick={scrollToContact}
      onMouseEnter={(e) => {
        setHovered(true)
        const rect = cardRef.current?.getBoundingClientRect()
        if (rect) {
          const px = e.clientX - rect.left
          const py = e.clientY - rect.top
          rawX.jump(px); rawY.jump(py)
          x.jump(px);    y.jump(py)
        }
      }}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="work-card"
      style={{
        display: 'block', cursor: 'none',
        alignSelf: align === 'left' ? 'flex-start' : 'flex-end',
        width,
      }}
    >
      {/* Image */}
      <div
        ref={cardRef}
        style={{
          width: '100%', aspectRatio: '4/3',
          background: bg, position: 'relative', overflow: 'hidden',
          borderRadius: 16,
        }}
      >
        <motion.div
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: '100%', height: '100%', borderRadius: 16,
            backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center',
          }}
        />

        {/* Dark overlay on hover */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute', inset: 0, borderRadius: 16,
            background: 'rgba(0,0,0,0.35)', zIndex: 1,
          }}
        />

        {/* Cursor-follow VIEW badge — mix-blend-mode:difference inverts image beneath */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.7 }}
          transition={{ opacity: { duration: 0.2 }, scale: { duration: 0.2 } }}
          style={{
            position: 'absolute', top: 0, left: 0,
            x, y,
            translateX: '-50%', translateY: '-50%',
            background: 'var(--white)', color: 'var(--black)',
            fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 800,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            padding: '14px 28px', borderRadius: 999, zIndex: 4,
            whiteSpace: 'nowrap', pointerEvents: 'none',
            mixBlendMode: 'difference',
          }}
        >
          VIEW →
        </motion.div>

        {/* Tag badge */}
        <div style={{
          position: 'absolute', top: 16, left: 16, fontSize: 10,
          letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--grey)',
          background: 'rgba(0,0,0,0.55)', padding: '5px 12px', borderRadius: 999,
          border: '1px solid var(--border)', backdropFilter: 'blur(8px)', zIndex: 3,
        }}>
          {tag}
        </div>
      </div>

      {/* Meta */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0 10px' }}>
        <motion.span
          animate={{ color: hovered ? 'var(--accent)' : 'var(--white)' }}
          style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em' }}
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

      <div style={{ display: 'flex', flexDirection: 'column', gap: 60 }} className="work-grid">
        {projects.map(p => <WorkCard key={p.num} {...p} />)}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .work-heading-wrap { grid-template-columns: 1fr !important; }
          .work-card { width: 80% !important; }
        }
        @media (max-width: 600px) {
          .work-heading-wrap { margin-bottom: 40px !important; }
          .work-card { width: 100% !important; align-self: stretch !important; }
          .work-grid { gap: 32px !important; }
        }
      `}</style>
    </section>
  )
}
