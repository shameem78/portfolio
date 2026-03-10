import { ReactLenis } from 'lenis/react'
import BlobCursor    from './components/BlobCursor'
import Nav           from './components/Nav'
import Hero          from './components/Hero'
import Work          from './components/Work'
import Ticker        from './components/Ticker'
import Services      from './components/Services'
import Process       from './components/Process'
import Testimonials  from './components/Testimonials'
import About         from './components/About'
import Contact       from './components/Contact'
import Footer        from './components/Footer'

export default function App() {
  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true }}>
      <a href="#home" className="skip-link">Skip to content</a>
      <BlobCursor />
      <Nav />
      <main>
        <Hero />
        <Work />
        <Ticker />
        <Services />
        <Process />
        <Testimonials />
        <About />
        <Contact />
      </main>
      <Footer />
    </ReactLenis>
  )
}
