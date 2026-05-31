import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

const wordVar = {
  hidden: { clipPath: 'inset(0 0 100% 0)', y: '55%' },
  visible: { clipPath: 'inset(-45% -22% -45% -22%)', y: '0%' },
}

function HeroWord({ word, baseColor, fontWeight, fontSize, transition }) {
  const [hover, setHover] = useState(false)
  const [pos, setPos] = useState({ x: 50, y: 50 })
  const spanRef = useRef(null)

  const handleMouseMove = (e) => {
    const rect = spanRef.current?.getBoundingClientRect()
    if (!rect) return
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  return (
    <motion.span
      ref={spanRef}
      variants={wordVar}
      transition={transition}
      data-hover
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative', display: 'inline-block', cursor: 'none',
        fontFamily: 'var(--font-display)', fontWeight,
        fontSize, lineHeight: 0.9, letterSpacing: '0.02em', textTransform: 'uppercase',
      }}
    >
      <span aria-hidden style={{
        position: 'absolute',
        left: `${pos.x}%`, top: `${pos.y}%`,
        transform: 'translate(-50%, -50%)',
        zIndex: 0, pointerEvents: 'none',
      }}>
        <motion.span
          animate={{ opacity: hover ? 1 : 0 }}
          transition={{ duration: 0.15 }}
          style={{
            display: 'block',
            width: '3.8em', height: '2.4em',
            background: 'radial-gradient(closest-side, rgba(29,60,102,0.15), rgba(29,60,102,0.05) 55%, transparent 78%)',
            filter: 'blur(18px)',
            borderRadius: '50%',
          }}
        />
      </span>
      <span style={{
        position: 'relative', zIndex: 1, display: 'inline-block',
        ...(hover ? {
          backgroundImage: `radial-gradient(circle at ${pos.x}% ${pos.y}%, var(--accent) 0%, var(--accent) 14%, ${baseColor} 40%)`,
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          color: 'transparent',
        } : { color: baseColor }),
      }}>
        {word}
      </span>
    </motion.span>
  )
}

export default function Intro() {
  return (
    <section id="intro" style={{
      position: 'relative', width: '100vw', height: '100vh',
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
      padding: '80px 2.5rem 3.5rem', overflow: 'hidden',
    }}>

      {/* ── Convergence SVG background ── */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice"
          style={{ position: 'absolute', width: '100%', height: '100%' }}>
          <circle cx={830} cy={220} r={2.5} fill="rgba(29,60,102,0.7)" />
          <line x1={816} y1={220} x2={844} y2={220} stroke="rgba(29,60,102,0.4)" strokeWidth={0.8} />
          <line x1={830} y1={206} x2={830} y2={234} stroke="rgba(29,60,102,0.4)" strokeWidth={0.8} />
          {[32, 72, 126, 194, 278, 380, 504, 650, 820].map((r, i) => (
            <circle key={i} cx={830} cy={220} r={r} fill="none"
              stroke={`rgba(29,60,102,${Math.max(0.015, 0.18 - i * 0.018)})`}
              strokeWidth={i < 2 ? 0.9 : 0.5}
              strokeDasharray={i === 3 || i === 6 ? '6 14' : 'none'}
            />
          ))}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
            const rad = (deg * Math.PI) / 180
            return (
              <line key={deg}
                x1={830 + 32 * Math.cos(rad)} y1={220 + 32 * Math.sin(rad)}
                x2={830 + 820 * Math.cos(rad)} y2={220 + 820 * Math.sin(rad)}
                stroke="rgba(29,60,102,0.04)" strokeWidth={0.5}
              />
            )
          })}
        </svg>
      </div>

      {/* ── Hero image: right panel, single left-edge fade ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          width: '55%',
          height: '100%',
          overflow: 'hidden',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      >
        <img
          src="/images/hero.png"
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center center',
            display: 'block',
          }}
        />
        {/* Left-edge fade — blends image into the text column */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, var(--bg) 0%, var(--bg) 6%, rgba(232,236,243,0.75) 20%, transparent 42%)',
          pointerEvents: 'none',
        }} />
      </motion.div>

      {/* ── Corner reticles ── */}
      {[
        { top: 72, left: 40 },
        { top: 72, right: 40 },
        { bottom: 40, left: 40 },
        { bottom: 40, right: 40 },
      ].map((pos, i) => (
        <motion.div key={i}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 2 + i * 0.1, duration: 0.6 }}
          style={{
            position: 'absolute', ...pos, width: 18, height: 18,
            borderTop:    i < 2  ? '1px solid rgba(29,60,102,0.3)' : 'none',
            borderBottom: i >= 2 ? '1px solid rgba(29,60,102,0.3)' : 'none',
            borderLeft:   i % 2 === 0 ? '1px solid rgba(29,60,102,0.3)' : 'none',
            borderRight:  i % 2 === 1 ? '1px solid rgba(29,60,102,0.3)' : 'none',
          }}
        />
      ))}

      {/* ── Main headline (left half, bottom-anchored) ── */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '50%' }}>
        <motion.div
          initial="hidden" animate="visible"
          transition={{ staggerChildren: 0.11, delayChildren: 0.35 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35em', overflow: 'visible', lineHeight: 1 }}
        >
          {['ENGINEERING', 'PRECISION'].map(w => (
            <HeroWord key={w} word={w}
              baseColor="var(--white)" fontWeight={700}
              fontSize="clamp(2.4rem, 5.8vw, 7rem)"
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            />
          ))}
        </motion.div>

        <motion.div
          initial="hidden" animate="visible"
          transition={{ staggerChildren: 0.08, delayChildren: 0.7 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3em', overflow: 'visible', lineHeight: 1, marginTop: '0.05em' }}
        >
          {['THROUGH', 'CFD', '&', 'CAE', 'SIMULATION'].map((w, i) => (
            <HeroWord key={i} word={w}
              baseColor="var(--muted)" fontWeight={300}
              fontSize="clamp(1.3rem, 3.6vw, 4rem)"
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            />
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            marginTop: '1.1rem',
            fontFamily: 'var(--font-mono)', fontSize: '0.78rem',
            lineHeight: 1.75, color: 'var(--muted)', fontStyle: 'italic',
            maxWidth: 460,
          }}
        >
          Where the smallest computational cell resolves the largest physical truth.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            marginTop: '0.6rem',
            fontFamily: 'var(--font-mono)', fontSize: '0.76rem',
            lineHeight: 1.9, color: 'var(--dim)', maxWidth: 460,
          }}
        >
          We empower automotive, aerospace, and energy industries with advanced
          computational software consultancy — enhancing operational efficiency and
          driving technical innovation worldwide.
        </motion.p>
      </div>

      {/* ── Bottom strip: CTA + scroll hint ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          marginTop: '1.6rem', paddingTop: '1rem',
          borderTop: '1px solid var(--rule)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          position: 'relative', zIndex: 2,
        }}
      >
        <div />
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            data-hover
            style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
              letterSpacing: '0.2em', textTransform: 'uppercase',
              padding: '12px 32px', border: '1px solid var(--accent)',
              color: 'var(--accent)', background: 'transparent',
              transition: 'background 0.2s, color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--accent)' }}
          >
            Get Consultation
          </button>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              style={{ width: 1, height: 28, background: 'var(--muted)' }}
            />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.15em', color: 'var(--muted)' }}>
              SCROLL
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
