import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Lenis from 'lenis'
import './index.css'
import App from './App.jsx'

// ── Lenis smooth scrolling ──────────────────────────────
// Use module-level vars so HMR hot-reloads don't stack up
// extra RAF loops or duplicate createRoot calls.
let lenisInstance
let rafId

function startLenis() {
  if (lenisInstance) lenisInstance.destroy()
  if (rafId) cancelAnimationFrame(rafId)
  lenisInstance = new Lenis({ lerp: 0.1, smoothWheel: true })
  const raf = (time) => {
    lenisInstance.raf(time)
    rafId = requestAnimationFrame(raf)
  }
  rafId = requestAnimationFrame(raf)
}

startLenis()

// Clean up on HMR dispose so old Lenis instances don't pile up
if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    lenisInstance?.destroy()
    cancelAnimationFrame(rafId)
  })
}

// ── React root — singleton to avoid duplicate createRoot warning ──
const rootEl = document.getElementById('root')
if (!rootEl._reactRoot) {
  rootEl._reactRoot = createRoot(rootEl)
}
rootEl._reactRoot.render(
  <StrictMode>
    <App />
  </StrictMode>,
)
