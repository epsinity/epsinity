import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const LINKS = [
  { label: 'Home',      id: 'intro' },
  { label: 'Portfolio', id: 'portfolio' },
  { label: 'Services',  id: 'services' },
  { label: 'About',     id: 'about' },
  { label: 'Contact',   id: 'contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        height: 60,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 2.5rem',
        borderBottom: `1px solid ${scrolled ? 'var(--rule)' : 'transparent'}`,
        background: scrolled ? 'rgba(242,245,249,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        transition: 'background 0.4s, border-color 0.4s',
      }}
    >
      {/* logo */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{ display: 'flex', alignItems: 'center', lineHeight: 0, padding: 0 }}
      >
        <img
          src="/logo.svg"
          alt="Epsinity"
          style={{ height: 36, width: 'auto' }}
        />
      </button>

      {/* nav links */}
      <nav style={{ display:'flex', gap:'2rem', alignItems:'center' }}>
        {LINKS.map(({ label, id }) => (
          <button
            key={id}
            data-hover
            onClick={() => go(id)}
            style={{ fontFamily:'var(--font-mono)', fontSize:'0.62rem', letterSpacing:'0.16em', textTransform:'uppercase', color:'var(--dim)', transition:'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--white)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--dim)'}
          >
            {label}
          </button>
        ))}
      </nav>
    </motion.header>
  )
}
