const socials = [
  { label: 'Email',    href: 'mailto:hello@shameem.design' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/shameem' },
  { label: 'Dribbble', href: 'https://dribbble.com/shameem' },
]

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)', padding: '28px 40px',
      display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 24,
    }} className="footer">
      {/* Left — brand */}
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em' }}>
        Shameem®
      </div>

      {/* Center — social links */}
      <div style={{ display: 'flex', gap: 32 }}>
        {socials.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
            style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--grey)', transition: 'color 0.2s', cursor: 'none' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--white)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--grey)'}
          >
            {label}
          </a>
        ))}
      </div>

      {/* Right — copyright + back to top */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 24 }}>
        <span style={{ fontSize: 11, color: 'var(--grey)', letterSpacing: '0.05em' }}>
          © {new Date().getFullYear()} All rights reserved.
        </span>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 999, padding: '6px 14px', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--grey)', cursor: 'none', transition: 'border-color 0.2s, color 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--white)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--grey)'; e.currentTarget.style.borderColor = 'var(--border)' }}
        >
          ↑ Top
        </button>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer { grid-template-columns: 1fr 1fr !important; padding: 24px !important; }
          .footer > div:nth-child(2) { grid-column: 1 / -1; order: 3; gap: 20px !important; }
        }
        @media (max-width: 600px) {
          .footer { grid-template-columns: 1fr !important; gap: 16px !important; }
          .footer > div:nth-child(3) { justify-content: flex-start !important; }
        }
        @media (pointer: coarse) {
          .footer a, .footer button { cursor: pointer !important; }
        }
      `}</style>
    </footer>
  )
}
