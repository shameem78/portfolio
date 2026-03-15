export default function SectionLabel({ left, center, right }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      marginBottom: 72, borderBottom: '1px solid var(--border)', paddingBottom: 16 }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.2em',
        textTransform: 'uppercase', color: 'var(--text-muted)' }}>{left}</span>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.2em',
        textTransform: 'uppercase', color: 'var(--accent)', opacity: 0.7 }}>{center}</span>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.2em',
        textTransform: 'uppercase', color: 'var(--text-muted)' }}>{right}</span>
    </div>
  )
}
