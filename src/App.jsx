import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Intro from './components/Intro'
import Solutions from './components/Solutions'
import Expertise from './components/Expertise'
import Portfolio from './components/Portfolio'
import Legacy from './components/Legacy'
import Contact from './components/Contact'

export default function App() {
  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <Intro />
        <Solutions />
        <Expertise />
        <Portfolio />
        <Legacy />
        <Contact />
      </main>
    </>
  )
}
