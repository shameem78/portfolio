import BlobCursor from './components/BlobCursor'
import Nav       from './components/Nav'
import Hero      from './components/Hero'
import About     from './components/About'
import Services  from './components/Services'
import Work      from './components/Work'
import Ticker    from './components/Ticker'
import Process   from './components/Process'
import Contact   from './components/Contact'
import Footer    from './components/Footer'

export default function App() {
  return (
    <>
      <a href="#home" className="skip-link">Skip to content</a>
      <BlobCursor />
      <Nav />
      <main>
        <Hero />
        <About />
        <Services />
        <Work />
        <Ticker />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
