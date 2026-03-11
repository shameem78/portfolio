import { useEffect } from 'react'
import { useLenis } from 'lenis/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function GsapSetup() {
  // ── Critical: keep ScrollTrigger in sync with Lenis' virtual scroll position
  useLenis(ScrollTrigger.update)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Hero name wrapper: drifts left as user scrolls past the hero ──────
      // Targets the plain div that wraps the motion.h1 (no FM conflict)
      gsap.to('.hero-name-wrap', {
        x: -140,
        ease: 'none',
        scrollTrigger: {
          trigger: '#home',
          start: 'top top',
          end: 'bottom top',
          scrub: 2,
        },
      })

      // ── Featured Work heading: slower upward parallax ─────────────────────
      gsap.to('#work h2', {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: '#work',
          start: 'top bottom',
          end: 'center top',
          scrub: 1.5,
        },
      })

      // ── About photo card: moves up slower than the section ────────────────
      gsap.to('.about-photo-card', {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: '#about',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })

      // ── Contact heading: letters drift left on scrub ──────────────────────
      gsap.to('#contact h2', {
        x: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: '#contact',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
      })

    })

    // Refresh after all components have painted
    const timer = setTimeout(() => ScrollTrigger.refresh(), 300)

    return () => {
      ctx.revert()
      clearTimeout(timer)
    }
  }, [])

  return null
}
