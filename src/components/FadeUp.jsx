import { motion } from 'framer-motion'

export default function FadeUp({ children, delay = 0, style = {}, as = 'div', ...props }) {
  const Tag = motion[as] || motion.div
  return (
    <Tag
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      style={style}
      {...props}
    >
      {children}
    </Tag>
  )
}
