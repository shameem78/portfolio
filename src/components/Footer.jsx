export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)', padding: '32px 40px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    }} className="footer">
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em' }}>
        Shameem®
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, fontSize: 11, color: 'var(--grey)', letterSpacing: '0.05em' }}>
        <span>© {new Date().getFullYear()} All rights reserved.</span>
        <span>UX/UI Designer · AI Researcher · E-Commerce</span>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .footer { flex-direction: column !important; gap: 12px !important; align-items: flex-start !important; padding: 24px !important; }
        }
      `}</style>
    </footer>
  )
}
