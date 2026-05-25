import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

const wordVar = {
  hidden: { clipPath: 'inset(0 0 100% 0)', y: '55%' },
  // negative insets at rest → no clipping, so the paint splash can bleed out
  visible: { clipPath: 'inset(-45% -22% -45% -22%)', y: '0%' },
}

/* headline word with a cursor-local blue highlight */
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
      {/* cursor-following blue blob — outer span handles position, inner handles opacity */}
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
            background: 'radial-gradient(closest-side, rgba(70,130,240,0.7), rgba(70,130,240,0.2) 55%, transparent 78%)',
            filter: 'blur(18px)',
            borderRadius: '50%',
          }}
        />
      </span>
      {/* text — gradient clips to cursor area only */}
      <span
        style={{
          position: 'relative', zIndex: 1, display: 'inline-block',
          ...(hover ? {
            backgroundImage: `radial-gradient(circle at ${pos.x}% ${pos.y}%, #8fbaff 0%, #8fbaff 14%, ${baseColor} 40%)`,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'transparent',
          } : {
            color: baseColor,
          }),
        }}
      >
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
      padding: '0 2.5rem 4.5rem', overflow: 'hidden',
    }}>

      {/* Convergence field — focal point radiating outward */}
      <div style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}>
        <svg
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
          style={{ position: 'absolute', width: '100%', height: '100%' }}
        >
          {/* Focal point */}
          <circle cx={830} cy={220} r={2.5} fill="rgba(205,221,244,0.95)" />
          <line x1={816} y1={220} x2={844} y2={220} stroke="rgba(205,221,244,0.6)" strokeWidth={0.8} />
          <line x1={830} y1={206} x2={830} y2={234} stroke="rgba(205,221,244,0.6)" strokeWidth={0.8} />

          {/* Concentric rings expanding to infinity */}
          {[32, 72, 126, 194, 278, 380, 504, 650, 820].map((r, i) => (
            <circle
              key={i}
              cx={830} cy={220}
              r={r}
              fill="none"
              stroke={`rgba(205,221,244,${Math.max(0.012, 0.28 - i * 0.03)})`}
              strokeWidth={i < 2 ? 0.9 : 0.5}
              strokeDasharray={i === 3 || i === 6 ? '6 14' : 'none'}
            />
          ))}

          {/* Radial spokes */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
            const rad = (deg * Math.PI) / 180
            return (
              <line
                key={deg}
                x1={830 + 32 * Math.cos(rad)}
                y1={220 + 32 * Math.sin(rad)}
                x2={830 + 820 * Math.cos(rad)}
                y2={220 + 820 * Math.sin(rad)}
                stroke="rgba(205,221,244,0.02)"
                strokeWidth={0.5}
              />
            )
          })}
        </svg>
      </div>

      {/* animated corner reticles */}
      {[
        { top: 72, left: 40 },
        { top: 72, right: 40 },
        { bottom: 40, left: 40 },
        { bottom: 40, right: 40 },
      ].map((pos, i) => (
        <motion.div key={i}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 + i * 0.1, duration: 0.6 }}
          style={{
            position: 'absolute', ...pos,
            width: 18, height: 18,
            borderTop: i < 2 ? '1px solid rgba(200,216,240,0.45)' : 'none',
            borderBottom: i >= 2 ? '1px solid rgba(200,216,240,0.45)' : 'none',
            borderLeft: i % 2 === 0 ? '1px solid rgba(200,216,240,0.45)' : 'none',
            borderRight: i % 2 === 1 ? '1px solid rgba(200,216,240,0.45)' : 'none',
          }}
        />
      ))}

      {/* main headline */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          initial="hidden" animate="visible"
          transition={{ staggerChildren: 0.11, delayChildren: 0.35 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35em', overflow: 'visible', lineHeight: 1 }}
        >
          {['ENGINEERING', 'PRECISION'].map(w => (
            <HeroWord key={w} word={w}
              baseColor="var(--white)" fontWeight={700}
              fontSize="clamp(3rem, 7.8vw, 8.8rem)"
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
              fontSize="clamp(1.8rem, 5vw, 5.6rem)"
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            />
          ))}
        </motion.div>

        {/* lead subtext */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            marginTop: '1.8rem', maxWidth: 540,
            fontFamily: 'var(--font-mono)', fontSize: '0.82rem',
            lineHeight: 1.95, color: 'var(--dim)',
          }}
        >
          Where the smallest computational cell resolves the largest physical truth.
        </motion.p>
      </div>

      {/* bottom strip */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          marginTop: '2.5rem', paddingTop: '1.2rem',
          borderTop: '1px solid var(--rule)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          position: 'relative', zIndex: 2,
        }}
      >
        <div />

        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <a
            href="mailto:contact@epsinity.com"
            data-hover
            style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
              letterSpacing: '0.2em', textTransform: 'uppercase',
              padding: '12px 32px', border: '1px solid var(--dim)',
              color: 'var(--white)', display: 'inline-block', transition: 'background 0.2s, color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--white)'; e.currentTarget.style.color = 'var(--bg)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--white)' }}
          >
            Get Consultation
          </a>

          {/* scroll hint */}
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
