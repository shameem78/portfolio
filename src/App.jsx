import { ReactLenis } from 'lenis/react'
import BlobCursor from './components/BlobCursor'
import Nav from './components/Nav'
import PanelIndicator from './components/PanelIndicator'
import HorizontalScroll from './components/HorizontalScroll'
import HeroPanel from './components/HeroPanel'
import Work from './components/Work'
import Services from './components/Services'
import About from './components/About'
import Contact from './components/Contact'

const panels = [
  { id: 'hero', label: 'Home', Component: HeroPanel },
  { id: 'work', label: 'Work', Component: Work },
  { id: 'services', label: 'Services', Component: Services },
  { id: 'about', label: 'About', Component: About },
  { id: 'contact', label: 'Contact', Component: Contact },
]

export default function App() {
  return (
    <ReactLenis root options={{ lerp: 0.08, smoothWheel: true }}>
      <a href="#hero" className="skip-link">Skip to content</a>
      <BlobCursor />
      <Nav panels={panels} />
      <PanelIndicator panels={panels} />
      <main>
        <HorizontalScroll panels={panels} />
      </main>
    </ReactLenis>
  )
}
