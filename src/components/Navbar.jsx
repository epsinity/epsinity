import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const LINKS = [
  { label: 'Home',       id: 'intro' },
  { label: 'Expertise',  id: 'expertise' },
  { label: 'Portfolio',  id: 'portfolio' },
  { label: 'Contact',    id: 'contact' },
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
        background: scrolled ? 'rgba(4,6,10,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        transition: 'background 0.4s, border-color 0.4s',
      }}
    >
      {/* logo */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.3em', color: 'var(--white)' }}
      >
        EPSINITY
      </button>

      {/* status chip */}
      <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', fontFamily:'var(--font-mono)', fontSize:'0.55rem', color:'var(--muted)', letterSpacing:'0.12em' }}>
        <span style={{ width:5, height:5, borderRadius:'50%', background:'rgba(200,240,200,0.7)', display:'inline-block' }} />
        SYS:OPERATIONAL
      </div>

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
        <a
          href="mailto:contact@epsinity.com"
          data-hover
          style={{
            fontFamily:'var(--font-mono)', fontSize:'0.6rem', letterSpacing:'0.16em',
            textTransform:'uppercase', padding:'7px 18px',
            border:'1px solid var(--muted)', color:'var(--dim)',
            transition:'border-color 0.2s, color 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor='var(--white)'; e.currentTarget.style.color='var(--white)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor='var(--muted)'; e.currentTarget.style.color='var(--dim)' }}
        >
          Book Demo
        </a>
      </nav>
    </motion.header>
  )
}
