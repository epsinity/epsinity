import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMediaQuery } from '../hooks/useResponsive'

gsap.registerPlugin(ScrollTrigger)

const SOLUTIONS = [
  {
    id: '01', code: 'CFD',
    title: 'Computational\nFluid Dynamics',
    desc: 'High-fidelity fluid simulation resolving behavior from the laminar boundary layer to fully turbulent regimes at any Reynolds number.',
    specs: ['Turbulence Modeling', 'Multiphase Flow', 'Conjugate Heat Transfer'],
  },
  {
    id: '02', code: 'FEA',
    title: 'Finite Element\nAnalysis',
    desc: 'Structural analysis at the resolution of individual load paths — predicting fatigue, failure, and dynamic response with exactitude.',
    specs: ['Static & Dynamic FEA', 'Fatigue Life', 'Crash Simulation'],
  },
  {
    id: '03', code: 'TM',
    title: 'Thermal\nManagement',
    desc: 'Thermal simulation tracking heat down to the component level — ensuring every system operates within its precise thermal envelope.',
    specs: ['Electronics Cooling', 'HVAC Optimization', 'PCB Thermal Analysis'],
  },
  {
    id: '04', code: 'AERO',
    title: 'Aerodynamic\nOptimization',
    desc: 'Aerodynamic convergence on the ideal form — drag reduced to the theoretical minimum, lift maximized at every flight condition.',
    specs: ['External Aero CFD', 'Drag Reduction', 'Wind Tunnel Correlation'],
  },
]

// Circular dial selector — node positions: 0=top, 1=right, 2=bottom, 3=left
// Sector gauge — pivot at top-right, arc sweeping down-left
const DIAL_W = 210, DIAL_H = 158
const PIVOT = { x: 188, y: 18 }
const RADIUS = 150
const SPAN = [110, 178]              // arc angle range (deg)
const dotAngle = (i, n) => SPAN[0] + (SPAN[1] - SPAN[0]) * (i / (n - 1))
const polar = (deg, r = RADIUS) => {
  const rad = (deg * Math.PI) / 180
  return { x: PIVOT.x + r * Math.cos(rad), y: PIVOT.y + r * Math.sin(rad) }
}

function Dial({ solutions, activeIdx, setActiveIdx }) {
  const active = solutions[activeIdx]
  const n = solutions.length
  const a0 = polar(SPAN[0]), a1 = polar(SPAN[1])

  return (
    <div style={{ position: 'absolute', top: '1.4rem', right: '1.4rem', width: DIAL_W, height: DIAL_H, zIndex: 12 }}>
      <svg viewBox={`0 0 ${DIAL_W} ${DIAL_H}`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        {/* arc track */}
        <path d={`M ${a0.x} ${a0.y} A ${RADIUS} ${RADIUS} 0 0 1 ${a1.x} ${a1.y}`}
          fill="none" stroke="var(--rule2)" strokeWidth="1" />
        {/* graduated ticks */}
        {Array.from({ length: 22 }, (_, i) => {
          const deg = SPAN[0] + ((SPAN[1] - SPAN[0]) / 21) * i
          const big = i % 7 === 0
          const p1 = polar(deg, RADIUS - 2)
          const p2 = polar(deg, RADIUS + (big ? 7 : 3))
          return <line key={i} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
            stroke={big ? 'var(--muted)' : 'var(--rule2)'} strokeWidth={big ? 0.9 : 0.5} />
        })}
        {/* pivot hub */}
        <circle cx={PIVOT.x} cy={PIVOT.y} r="3" fill="var(--accent)" />
        <circle cx={PIVOT.x} cy={PIVOT.y} r="7" fill="none" stroke="var(--rule2)" strokeWidth="0.6" />
      </svg>

      {/* needle (CSS rotate around pivot) */}
      <motion.div
        animate={{ rotate: dotAngle(activeIdx, n) }}
        transition={{ type: 'spring', stiffness: 70, damping: 13 }}
        style={{
          position: 'absolute', left: PIVOT.x, top: PIVOT.y,
          width: RADIUS - 12, height: 2, transformOrigin: 'left center',
          background: 'linear-gradient(to right, var(--accent), rgba(205,221,244,0.06))',
        }}
      />

      {/* readout — bottom-right, clear of the sweep */}
      <div style={{ position: 'absolute', right: 2, bottom: 0, textAlign: 'right', pointerEvents: 'none' }}>
        <AnimatePresence mode="wait">
          <motion.div key={active.code}
            initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.28 }}
            style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.4rem', color: 'var(--white)', letterSpacing: '0.03em', lineHeight: 1 }}
          >
            {active.code}
          </motion.div>
        </AnimatePresence>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.46rem', letterSpacing: '0.16em', color: 'var(--muted)', marginTop: 3 }}>
          {String(activeIdx + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
        </div>
      </div>

      {/* clickable dots along the arc */}
      {solutions.map((sol, i) => {
        const isActive = i === activeIdx
        const d = polar(dotAngle(i, n))
        return (
          <button key={sol.id} onClick={() => setActiveIdx(i)} title={sol.code}
            style={{
              position: 'absolute', left: d.x, top: d.y, transform: 'translate(-50%, -50%)',
              background: 'none', border: 'none', cursor: 'pointer', zIndex: 5, padding: 6, lineHeight: 0,
            }}
          >
            <motion.span
              animate={{ scale: isActive ? 1.5 : 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 18 }}
              style={{
                width: 8, height: 8, borderRadius: '50%', display: 'block',
                background: isActive ? 'var(--accent)' : 'var(--bg)',
                border: `1px solid ${isActive ? 'var(--accent)' : 'var(--muted)'}`,
                boxShadow: isActive ? '0 0 12px rgba(205,221,244,0.5)' : 'none',
              }}
            />
            <span style={{
              position: 'absolute', right: '100%', top: '50%', transform: 'translateY(-50%)', marginRight: 6,
              fontFamily: 'var(--font-mono)', fontSize: '0.46rem', letterSpacing: '0.1em', whiteSpace: 'nowrap',
              color: isActive ? 'var(--white)' : 'var(--muted)',
            }}>
              {sol.code}
            </span>
          </button>
        )
      })}
    </div>
  )
}

function SolutionPanel({ sol, isMobile }) {
  return (
    <motion.div
      key={sol.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: isMobile ? '2rem 1.5rem' : 'clamp(3rem, 4.5vw, 5.5rem) clamp(2.5rem, 4vw, 5.5rem)',
        background: 'var(--bg2)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ghost code watermark */}
      <div style={{
        position: 'absolute',
        right: '-0.04em',
        bottom: '-0.1em',
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 'clamp(8rem, 15vw, 19rem)',
        lineHeight: 0.8,
        color: 'rgba(29,60,102,0.06)',
        pointerEvents: 'none',
        userSelect: 'none',
      }}>
        {sol.code}
      </div>

      {/* Corner brackets */}
      {[
        { top: 0, left: 0, borderTop: '1px solid rgba(29,60,102,0.18)', borderLeft: '1px solid rgba(29,60,102,0.18)' },
        { top: 0, right: 0, borderTop: '1px solid rgba(29,60,102,0.18)', borderRight: '1px solid rgba(29,60,102,0.18)' },
        { bottom: 0, left: 0, borderBottom: '1px solid rgba(29,60,102,0.18)', borderLeft: '1px solid rgba(29,60,102,0.18)' },
        { bottom: 0, right: 0, borderBottom: '1px solid rgba(29,60,102,0.18)', borderRight: '1px solid rgba(29,60,102,0.18)' },
      ].map((s, i) => (
        <div key={i} style={{ position: 'absolute', width: 16, height: 16, ...s }} />
      ))}

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2.5rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.55rem',
          letterSpacing: '0.18em',
          color: 'var(--muted)',
        }}>
          <span>[ SOL.{sol.id} ]</span>
        </div>

        <motion.h2
          initial={{ clipPath: 'inset(0 0 100% 0)', y: '8%' }}
          animate={{ clipPath: 'inset(0 0 0% 0)', y: '0%' }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(3rem, 5.5vw, 7rem)',
            lineHeight: 0.9,
            textTransform: 'uppercase',
            whiteSpace: 'pre-line',
            color: 'var(--white)',
            marginBottom: '2rem',
            overflow: 'hidden',
          }}
        >
          {sol.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.22, duration: 0.45 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.78rem',
            lineHeight: 1.95,
            color: 'var(--dim)',
            maxWidth: 500,
          }}
        >
          {sol.desc}
        </motion.p>
      </div>

      {/* Specs */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {sol.specs.map((s, i) => (
          <motion.div
            key={s}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.08, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              borderTop: '1px solid var(--rule)',
              paddingTop: '0.85rem',
              paddingBottom: '0.85rem',
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(0.95rem, 1.35vw, 1.4rem)',
              color: 'var(--dim)',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <span style={{
              width: 4, height: 4,
              background: 'var(--accent)',
              opacity: 0.65,
              flexShrink: 0,
              display: 'inline-block',
            }} />
            {s}
          </motion.div>
        ))}
        <div style={{ borderTop: '1px solid var(--rule)' }} />
      </div>
    </motion.div>
  )
}

export default function Solutions() {
  const sectionRef = useRef(null)
  const stRef = useRef(null)
  const lastIdx = useRef(0)
  const [activeIdx, setActiveIdx] = useState(0)
  const n = SOLUTIONS.length
  const isMobile = useMediaQuery('(max-width: 768px)')

  // scroll-driven navigation: pin the section and advance solutions on scroll
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      stRef.current = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${window.innerHeight * (n - 1)}`,
        pin: true,
        scrub: 0.5,
        invalidateOnRefresh: true,
        snap: {
          snapTo: Array.from({ length: n }, (_, i) => i / (n - 1)),
          duration: { min: 0.2, max: 0.5 },
          delay: 0.04,
          ease: 'power2.inOut',
        },
        onUpdate(self) {
          const idx = Math.min(Math.round(self.progress * (n - 1)), n - 1)
          if (idx !== lastIdx.current) {
            lastIdx.current = idx
            setActiveIdx(idx)
          }
        },
      })
    }, section)

    // refresh once layout/fonts settle (fixes pin-spacer sizing on first paint)
    const t1 = setTimeout(() => ScrollTrigger.refresh(), 250)
    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)

    return () => {
      clearTimeout(t1)
      window.removeEventListener('load', onLoad)
      ctx.revert()
    }
  }, [n])

  // click → scroll to that solution's position so dial + scroll stay in sync
  const goTo = (i) => {
    lastIdx.current = i
    setActiveIdx(i)
    const st = stRef.current
    if (st) {
      const y = st.start + (i / (n - 1)) * (st.end - st.start)
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <section
      id="solutions"
      ref={sectionRef}
      style={{
        width: '100vw',
        height: '100vh',
        background: 'var(--bg)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Top bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: isMobile ? '0.6rem 1.5rem' : '0.6rem 2.5rem',
        borderBottom: '1px solid var(--rule)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.58rem',
        letterSpacing: '0.14em',
        color: 'var(--muted)',
        background: 'var(--bg)',
        flexShrink: 0,
      }}>
        <span>[ 01 - SOLUTIONS ]</span>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          {SOLUTIONS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                width: i === activeIdx ? 20 : 6,
                height: 1,
                background: i === activeIdx ? 'var(--white)' : 'var(--muted)',
                transition: 'width 0.35s, background 0.35s',
                cursor: 'pointer',
                border: 'none',
                padding: 0,
              }}
            />
          ))}
        </div>
        {!isMobile && <span>SOL MATRIX / {String(activeIdx + 1).padStart(2, '0')} OF {SOLUTIONS.length}</span>}
        {isMobile && <span>{String(activeIdx + 1).padStart(2, '0')} / {SOLUTIONS.length}</span>}
      </div>

      {/* Body */}
      <div style={{
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* full-width active solution */}
        <AnimatePresence mode="wait">
          <SolutionPanel key={activeIdx} sol={SOLUTIONS[activeIdx]} isMobile={isMobile} />
        </AnimatePresence>

        {/* compact corner dial selector — hidden on mobile */}
        {!isMobile && <Dial solutions={SOLUTIONS} activeIdx={activeIdx} setActiveIdx={goTo} />}
      </div>
    </section>
  )
}
