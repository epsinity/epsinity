import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Intro from './components/Intro'
import Solutions from './components/Solutions'
import Portfolio from './components/Portfolio'
import Services from './components/Services'
import About from './components/About'
import Contact from './components/Contact'

export default function App() {
  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <Intro />
        <Solutions />
        <Portfolio />
        <Services />
        <About />
        <Contact />
      </main>
    </>
  )
}
