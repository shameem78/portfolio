import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'

const links = ['About', 'Services', 'Work', 'Contact']

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Track active section with IntersectionObserver
  useEffect(() => {
    const sectionIds = ['home', 'about', 'services', 'work', 'contact']
    const observers = []

    sectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { threshold: 0.25, rootMargin: '-80px 0px 0px 0px' }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [])

  const handleLink = (e, href) => {
    e.preventDefault()
    setOpen(false)
    document.body.style.overflow = ''
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  const toggleMenu = () => {
    const next = !open
    setOpen(next)
    document.body.style.overflow = next ? 'hidden' : ''
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
        alignItems: 'center',
        padding: '20px 40px',
        borderBottom: '1px solid var(--border)',
        background: scrolled ? 'rgba(8,8,8,0.97)' : 'rgba(8,8,8,0.9)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        transition: 'background 0.3s',
      }}
    >
      {/* Logo */}
      <a
        href="#home"
        onClick={e => handleLink(e, '#home')}
        aria-label="Shameem – back to top"
        style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em', cursor: 'none' }}
      >
        Shameem®
      </a>

      {/* Desktop links */}
      <ul style={{ display: 'flex', gap: 28, justifyContent: 'center', listStyle: 'none' }}>
        {links.map(link => {
          const isActive = active === link.toLowerCase()
          return (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                onClick={(e) => handleLink(e, `#${link.toLowerCase()}`)}
                style={{
                  fontSize: 13,
                  color: isActive ? 'var(--white)' : 'var(--grey)',
                  letterSpacing: '0.03em',
                  transition: 'color 0.2s',
                  cursor: 'none',
                  paddingBottom: 3,
                  borderBottom: isActive ? '1px solid var(--accent)' : '1px solid transparent',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--white)' }}
                onMouseLeave={e => { e.currentTarget.style.color = isActive ? 'var(--white)' : 'var(--grey)' }}
              >
                {link}
              </a>
            </li>
          )
        })}
      </ul>

      {/* Meta */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
        <span style={{ fontSize: 12, color: 'var(--grey)' }}>
          Based in <strong style={{ color: 'var(--white)' }}>India 🇮🇳</strong>
        </span>
        <span style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--grey)' }}>
          UX/UI · AI Research · E-Commerce
        </span>
      </div>

      {/* Mobile toggle */}
      <button
        onClick={toggleMenu}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        style={{
          display: 'none', background: 'none', border: 'none',
          cursor: 'pointer', padding: 8, zIndex: 200, position: 'relative',
        }}
        className="nav-toggle"
      >
        <span style={{
          display: 'block', width: 24, height: 1, background: 'var(--white)',
          transition: 'transform 0.3s',
          transform: open ? 'translateY(4px) rotate(45deg)' : 'none',
          marginBottom: 6,
        }} />
        <span style={{
          display: 'block', width: 24, height: 1, background: 'var(--white)',
          transition: 'transform 0.3s',
          transform: open ? 'translateY(-3px) rotate(-45deg)' : 'none',
        }} />
      </button>

      {/* Mobile overlay — rendered via portal so Framer Motion's transform on <nav>
          doesn't create a stacking context that clips position:fixed children */}
      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                background: 'rgba(8,8,8,0.98)', backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                display: 'flex', flexDirection: 'column', justifyContent: 'center',
                alignItems: 'center', gap: 32, zIndex: 200,
              }}
            >
              {links.map((link, i) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={(e) => handleLink(e, `#${link.toLowerCase()}`)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                  style={{
                    fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800,
                    letterSpacing: '-0.03em',
                    color: active === link.toLowerCase() ? 'var(--accent)' : 'var(--white)',
                    cursor: 'none',
                  }}
                >
                  {link}
                </motion.a>
              ))}

              {/* Close button */}
              <motion.button
                onClick={toggleMenu}
                aria-label="Close menu"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + links.length * 0.06 }}
                style={{
                  marginTop: 16, background: 'none', border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '50%', width: 48, height: 48, cursor: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--grey)',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <line x1="1" y1="1" x2="15" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="15" y1="1" x2="1" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      <style>{`
        @media (max-width: 900px) {
          nav { grid-template-columns: 1fr auto !important; padding: 16px 24px !important; }
          nav ul { display: none !important; }
          nav > div:nth-child(3) { display: none !important; }
          .nav-toggle { display: flex !important; flex-direction: column; }
        }
      `}</style>
    </motion.nav>
  )
}
