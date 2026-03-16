import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const links = [
  { id: 'work', label: 'Work' },
  { id: 'services', label: 'Services' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

export default function Nav({ panels }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activePanel, setActivePanel] = useState(0)

  useEffect(() => {
    const handler = (e) => setActivePanel(e.detail.index)
    window.addEventListener('panelchange', handler)
    return () => window.removeEventListener('panelchange', handler)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToPanel = useCallback((panelId) => {
    setOpen(false)
    const panelIndex = panels.findIndex((p) => p.id === panelId)
    if (panelIndex < 0) return

    const st = ScrollTrigger.getById('horizontal-main')
    if (st) {
      const targetProgress = panelIndex / (panels.length - 1)
      const targetScroll = st.start + targetProgress * (st.end - st.start)
      gsap.to(window, { scrollTo: { y: targetScroll }, duration: 1.2, ease: 'power2.inOut' })
    } else {
      // Mobile fallback
      document.getElementById(panelId)?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [panels])

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault()
        const next = Math.min(activePanel + 1, panels.length - 1)
        scrollToPanel(panels[next].id)
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        const prev = Math.max(activePanel - 1, 0)
        scrollToPanel(panels[prev].id)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activePanel, panels, scrollToPanel])

  const activePanelId = panels[activePanel]?.id

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        padding: '0 48px', height: 64,
        display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center',
        background: scrolled ? 'rgba(10,10,15,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'background 0.35s, backdrop-filter 0.35s, border-color 0.35s',
      }}>
        {/* Logo */}
        <button
          onClick={() => scrollToPanel('hero')}
          style={{
            fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 400,
            letterSpacing: '0.06em', color: 'var(--text)', textAlign: 'left',
          }}
        >
          SHAMEEM<span style={{ color: 'var(--magenta)' }}>.</span>
        </button>

        {/* Center links — desktop */}
        <div style={{ display: 'flex', gap: 36 }} className="nav-links-desktop">
          {links.map(({ id, label }) => {
            const isActive = activePanelId === id
            return (
              <button
                key={id}
                onClick={() => scrollToPanel(id)}
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: isActive ? 'var(--magenta)' : 'var(--text-muted)',
                  textShadow: isActive ? '0 0 10px var(--magenta-glow)' : 'none',
                  transition: 'color 0.3s, text-shadow 0.3s',
                }}
              >
                {label}
              </button>
            )
          })}
        </div>

        {/* Right — Hire Me + Burger */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 20 }}>
          <button
            onClick={() => scrollToPanel('contact')}
            className="nav-hire-btn"
            style={{
              fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              padding: '8px 20px', borderRadius: 4,
              border: '1px solid var(--magenta)', color: 'var(--magenta)',
              background: 'transparent',
              transition: 'background 0.3s, color 0.3s, box-shadow 0.3s',
            }}
            onMouseEnter={(e) => { e.target.style.background = 'var(--magenta)'; e.target.style.color = 'var(--bg)'; e.target.style.boxShadow = '0 0 20px var(--magenta-glow)' }}
            onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--magenta)'; e.target.style.boxShadow = 'none' }}
          >
            Hire Me
          </button>

          {/* Burger — mobile */}
          <button
            className="nav-burger"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            style={{
              display: 'none',
              width: 32, height: 24, position: 'relative',
            }}
          >
            <span style={{ position: 'absolute', left: 0, width: 32, height: 2, background: 'var(--text)', borderRadius: 1, top: open ? 11 : 2, transform: open ? 'rotate(45deg)' : 'none', transition: 'all 0.3s' }} />
            <span style={{ position: 'absolute', left: 0, width: 32, height: 2, background: 'var(--text)', borderRadius: 1, top: 11, opacity: open ? 0 : 1, transition: 'opacity 0.2s' }} />
            <span style={{ position: 'absolute', left: 0, width: 32, height: 2, background: 'var(--text)', borderRadius: 1, top: open ? 11 : 20, transform: open ? 'rotate(-45deg)' : 'none', transition: 'all 0.3s' }} />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 199,
              background: 'rgba(10,10,15,0.97)', backdropFilter: 'blur(20px)',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', gap: 32,
            }}
          >
            {links.map(({ id, label }, i) => (
              <motion.button
                key={id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => scrollToPanel(id)}
                style={{
                  cursor: 'pointer',
                  fontFamily: 'var(--font-display)', fontSize: 48,
                  color: activePanelId === id ? 'var(--magenta)' : 'var(--text)',
                  letterSpacing: '0.05em',
                }}
              >
                {label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          nav { grid-template-columns: 1fr auto !important; padding: 0 20px !important; }
          .nav-links-desktop { display: none !important; }
          .nav-hire-btn { display: none !important; }
          .nav-burger { display: block !important; }
        }
      `}</style>
    </>
  )
}
