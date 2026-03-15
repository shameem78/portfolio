import { useEffect } from 'react'
import { useLenis } from 'lenis/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default function GsapSetup() {
  useLenis(ScrollTrigger.update)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('#work h2', {
        y: -60, ease: 'none',
        scrollTrigger: { trigger: '#work', start: 'top bottom', end: 'center top', scrub: 1.5 },
      })
      gsap.to('.about-blob-card', {
        y: -40, ease: 'none',
        scrollTrigger: { trigger: '#about', start: 'top bottom', end: 'bottom top', scrub: 1 },
      })
      gsap.to('#contact h2', {
        x: -40, ease: 'none',
        scrollTrigger: { trigger: '#contact', start: 'top bottom', end: 'bottom top', scrub: 2 },
      })
    })
    const timer = setTimeout(() => ScrollTrigger.refresh(), 300)
    return () => { ctx.revert(); clearTimeout(timer) }
  }, [])
  return null
}
