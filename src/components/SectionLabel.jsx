export default function SectionLabel({ left, center, right }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)',
      padding: '10px 0', marginBottom: 80,
      fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--grey)',
    }} className="section-label">
      <span>{left}</span>
      <span className="section-label-center">{center}</span>
      <span className="section-label-right">{right}</span>
      <style>{`
        @media (max-width: 600px) {
          .section-label { margin-bottom: 40px !important; flex-wrap: wrap; gap: 4px; }
          .section-label-center { display: none !important; }
          .section-label-right { font-size: 9px; }
        }
      `}</style>
    </div>
  )
}
