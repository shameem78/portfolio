export default function SectionLabel({ left, center, right }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)',
      padding: '10px 0', marginBottom: 80,
      fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--grey)',
    }}>
      <span>{left}</span>
      <span>{center}</span>
      <span>{right}</span>
    </div>
  )
}
