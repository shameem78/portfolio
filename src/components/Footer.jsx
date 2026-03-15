const socials = [
  { label: 'Email',    href: 'mailto:hello@shameem.design' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/shameem' },
  { label: 'Dribbble', href: 'https://dribbble.com/shameem' },
]

export default function Footer() {
  return (
    <footer style={{ background: '#04040a', borderTop: '1px solid var(--border)',
      padding: '32px 48px', display: 'grid', gridTemplateColumns: '1fr auto 1fr',
      alignItems: 'center', gap: 24 }} className="footer">
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 800,
        letterSpacing: '0.05em', color: 'var(--text)', textTransform: 'uppercase' }}>
        Shameem<span style={{ color: 'var(--accent)' }}>.</span>
      </div>

      <div style={{ display: 'flex', gap: 32 }}>
        {socials.map(({ label, href }) => (
          <a key={label} href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
            style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.16em',
              textTransform: 'uppercase', color: 'var(--text-muted)', transition: 'color 0.2s', cursor: 'none' }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.textShadow = '0 0 8px var(--accent)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.textShadow = 'none' }}>
            {label}
          </a>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 20 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
          © {new Date().getFullYear()} All rights reserved.
        </span>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 3,
            padding: '5px 12px', fontFamily: 'var(--font-mono)', fontSize: 9,
            letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)',
            cursor: 'none', transition: 'border-color 0.2s, color 0.2s',
            display: 'flex', alignItems: 'center', gap: 5 }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderColor = 'var(--accent)' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border)' }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
          Top
        </button>
      </div>

      <style>{`
        @media (max-width:900px){
          .footer{grid-template-columns:1fr 1fr !important;padding:24px !important}
          .footer>div:nth-child(2){grid-column:1/-1;order:3;gap:20px !important}
        }
        @media (max-width:600px){.footer{grid-template-columns:1fr !important;gap:14px !important}.footer>div:nth-child(3){justify-content:flex-start !important}}
        @media (pointer:coarse){.footer a,.footer button{cursor:pointer !important}}
      `}</style>
    </footer>
  )
}
