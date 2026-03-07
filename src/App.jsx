import BlobCursor    from './components/BlobCursor'
import Nav           from './components/Nav'
import Hero          from './components/Hero'
import FluidGlass    from './components/FluidGlass'
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
    <>
      <a href="#home" className="skip-link">Skip to content</a>
      <BlobCursor />
      <Nav />
      <main>
        <Hero />
        <div style={{ height: '600px', position: 'relative', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <FluidGlass
            mode="lens"
            lensProps={{
              scale: 0.25,
              ior: 1.15,
              thickness: 5,
              chromaticAberration: 0.1,
              anisotropy: 0.01,
            }}
          />
        </div>
        <Work />
        <Ticker />
        <Services />
        <Process />
        <Testimonials />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
