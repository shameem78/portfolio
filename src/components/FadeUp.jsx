import { motion } from 'framer-motion'
export default function FadeUp({ children, delay = 0, style }) {
  return (
    <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      style={style}>
      {children}
    </motion.div>
  )
}
