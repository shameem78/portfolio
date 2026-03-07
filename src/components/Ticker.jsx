import { motion } from 'framer-motion'

const items = ['UX/UI Design','◆','AI Research','◆','E-Commerce','◆','Product Design','◆','Interaction Design','◆','LLM Applications','◆','Dropshipping','◆','Visual Design','◆']
const doubled = [...items, ...items]

export default function Ticker() {
  return (
    <div style={{
      borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)',
      overflow: 'hidden', padding: '20px 0', whiteSpace: 'nowrap', background: 'var(--black)',
    }} aria-hidden="true">
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 20, ease: 'linear', repeat: Infinity }}
        style={{ display: 'inline-flex', gap: 28, willChange: 'transform' }}
      >
        {doubled.map((item, i) => (
          <span key={i} style={{
            fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase',
            color: item === '◆' ? 'var(--accent)' : 'var(--grey)',
          }}>
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
