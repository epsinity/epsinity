import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMediaQuery } from '../hooks/useResponsive'

gsap.registerPlugin(ScrollTrigger)

const rows = [
  {
    id: '01',
    title: 'CAE Consultation',
    subtitle: 'Optimize your engineering designs with expert finite element and fluid simulation guidance.',
    action: 'Get Consultation',
    actionType: 'contact',
    imgUrl: '/images/service-2.jpg',
  },
  {
    id: '02',
    title: 'OpenFOAM Training',
    subtitle: 'Accelerate your CFD mastery with hands-on OpenFOAM training from industry specialists.',
    action: 'View Course',
    actionType: 'course',
    imgUrl: '/images/service-3.jpg',
  },
  {
    id: '03',
    title: 'FDS Training',
    subtitle: 'Fire & smoke analysis — master evacuation simulations and safety engineering workflows.',
    action: 'View Course',
    actionType: 'course',
    imgUrl: '/images/service-3.jpg',
  },
  {
    id: '04',
    title: 'Automation Demo',
    subtitle: 'Streamline your simulation workflow with custom automation tools and scripting pipelines.',
    action: 'Get Consultation',
    actionType: 'contact',
    imgUrl: '/images/service-1.jpg',
  },
]

// Dial geometry — mirrors the Solutions dial
const DIAL_W = 210, DIAL_H = 158
const PIVOT = { x: 188, y: 18 }
const RADIUS = 150
const SPAN = [110, 178]
const dotAngle = (i, n) => SPAN[0] + (SPAN[1] - SPAN[0]) * (i / (n - 1))
const polar = (deg, r = RADIUS) => {
  const rad = (deg * Math.PI) / 180
  return { x: PIVOT.x + r * Math.cos(rad), y: PIVOT.y + r * Math.sin(rad) }
}

function Dial({ items, activeIdx, setActiveIdx }) {
  const active = items[activeIdx]
  const n = items.length
  const a0 = polar(SPAN[0]), a1 = polar(SPAN[1])

  return (
    <div style={{ position: 'absolute', top: '1.4rem', right: '1.4rem', width: DIAL_W, height: DIAL_H, zIndex: 12 }}>
      <svg viewBox={`0 0 ${DIAL_W} ${DIAL_H}`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <path d={`M ${a0.x} ${a0.y} A ${RADIUS} ${RADIUS} 0 0 1 ${a1.x} ${a1.y}`}
          fill="none" stroke="var(--rule2)" strokeWidth="1" />
        {Array.from({ length: 22 }, (_, i) => {
          const deg = SPAN[0] + ((SPAN[1] - SPAN[0]) / 21) * i
          const big = i % 7 === 0
          const p1 = polar(deg, RADIUS - 2)
          const p2 = polar(deg, RADIUS + (big ? 7 : 3))
          return <line key={i} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
            stroke={big ? 'var(--muted)' : 'var(--rule2)'} strokeWidth={big ? 0.9 : 0.5} />
        })}
        <circle cx={PIVOT.x} cy={PIVOT.y} r="3" fill="var(--accent)" />
        <circle cx={PIVOT.x} cy={PIVOT.y} r="7" fill="none" stroke="var(--rule2)" strokeWidth="0.6" />
      </svg>

      <motion.div
        animate={{ rotate: dotAngle(activeIdx, n) }}
        transition={{ type: 'spring', stiffness: 70, damping: 13 }}
        style={{
          position: 'absolute', left: PIVOT.x, top: PIVOT.y,
          width: RADIUS - 12, height: 2, transformOrigin: 'left center',
          background: 'linear-gradient(to right, var(--accent), rgba(205,221,244,0.06))',
        }}
      />

      <div style={{ position: 'absolute', right: 2, bottom: 0, textAlign: 'right', pointerEvents: 'none' }}>
        <AnimatePresence mode="wait">
          <motion.div key={active.id}
            initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.28 }}
            style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.4rem', color: 'var(--white)', letterSpacing: '0.03em', lineHeight: 1 }}
          >
            {active.id}
          </motion.div>
        </AnimatePresence>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.46rem', letterSpacing: '0.16em', color: 'var(--muted)', marginTop: 3 }}>
          {String(activeIdx + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
        </div>
      </div>

      {items.map((item, i) => {
        const isActive = i === activeIdx
        const d = polar(dotAngle(i, n))
        return (
          <button key={item.id} onClick={() => setActiveIdx(i)} title={item.title}
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
          </button>
        )
      })}
    </div>
  )
}

function ServicePanel({ item, isMobile }) {
  const [imgError, setImgError] = useState(false)

  const handleAction = () => {
    if (item.actionType === 'contact') {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        background: 'var(--bg2)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Corner brackets */}
      {[
        { top: 0, left: 0, borderTop: '1px solid rgba(29,60,102,0.18)', borderLeft: '1px solid rgba(29,60,102,0.18)' },
        { top: 0, right: 0, borderTop: '1px solid rgba(29,60,102,0.18)', borderRight: '1px solid rgba(29,60,102,0.18)' },
        { bottom: 0, left: 0, borderBottom: '1px solid rgba(29,60,102,0.18)', borderLeft: '1px solid rgba(29,60,102,0.18)' },
        { bottom: 0, right: 0, borderBottom: '1px solid rgba(29,60,102,0.18)', borderRight: '1px solid rgba(29,60,102,0.18)' },
      ].map((s, i) => (
        <div key={i} style={{ position: 'absolute', width: 16, height: 16, ...s }} />
      ))}

      {/* Image column */}
      {!isMobile && (
        <div style={{ width: '45%', flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
          {item.imgUrl && !imgError ? (
            <img
              src={item.imgUrl}
              alt={item.title}
              onError={() => setImgError(true)}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          ) : (
            <div style={{
              width: '100%', height: '100%',
              background: 'linear-gradient(135deg, var(--bg), var(--rule))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{
                fontFamily: 'var(--font-display)', fontWeight: 700,
                fontSize: '4rem', color: 'var(--accent)', opacity: 0.15,
                textTransform: 'uppercase', letterSpacing: '0.06em',
              }}>
                {item.id}
              </span>
            </div>
          )}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to right, transparent 70%, var(--bg2) 100%)',
            pointerEvents: 'none',
          }} />
        </div>
      )}

      {/* Content column */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: isMobile ? '2rem 1.5rem' : 'clamp(3rem, 4.5vw, 5.5rem) clamp(2.5rem, 4vw, 5rem)',
        position: 'relative', zIndex: 1,
      }}>
        {/* Ghost watermark */}
        {!isMobile && (
          <div style={{
            position: 'absolute', right: '-0.04em', bottom: '-0.1em',
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: 'clamp(8rem, 15vw, 19rem)', lineHeight: 0.8,
            color: 'rgba(29,60,102,0.05)', pointerEvents: 'none', userSelect: 'none',
          }}>
            {item.id}
          </div>
        )}

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: isMobile ? '0.7rem' : '0.55rem',
            letterSpacing: '0.18em', color: 'var(--muted)', marginBottom: isMobile ? '1.2rem' : '2.5rem',
          }}>
            [ SVC.{item.id} ]
          </div>

          <motion.h2
            initial={{ clipPath: 'inset(0 0 100% 0)', y: '8%' }}
            animate={{ clipPath: 'inset(0 0 0% 0)', y: '0%' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-display)', fontWeight: 700,
              fontSize: isMobile ? 'clamp(2.2rem, 10vw, 3.5rem)' : 'clamp(2.5rem, 4.5vw, 5.5rem)',
              lineHeight: 0.92, textTransform: 'uppercase',
              color: 'var(--white)', marginBottom: isMobile ? '1.2rem' : '1.8rem',
              overflow: 'hidden',
            }}
          >
            {item.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.22, duration: 0.45 }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: isMobile ? '0.88rem' : '0.78rem',
              lineHeight: 1.85, color: 'var(--dim)', maxWidth: 460,
            }}
          >
            {item.subtitle}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'relative', zIndex: 1 }}
        >
          <div style={{ borderTop: '1px solid var(--rule)', paddingTop: '1.5rem' }}>
            <button
              onClick={handleAction}
              data-hover
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
                letterSpacing: '0.2em', textTransform: 'uppercase',
                padding: '12px 28px', border: '1px solid var(--accent)',
                color: '#fff', background: 'var(--accent)',
                cursor: 'pointer', transition: 'background 0.2s, color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--accent)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = '#fff' }}
            >
              {item.action}
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function Services() {
  const sectionRef = useRef(null)
  const stRef = useRef(null)
  const lastIdx = useRef(0)
  const [activeIdx, setActiveIdx] = useState(0)
  const n = rows.length
  const isMobile = useMediaQuery('(max-width: 768px)')

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

    const t1 = setTimeout(() => ScrollTrigger.refresh(), 250)
    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)

    return () => {
      clearTimeout(t1)
      window.removeEventListener('load', onLoad)
      ctx.revert()
    }
  }, [n])

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
      id="services"
      ref={sectionRef}
      style={{
        width: '100vw',
        height: '100svh',
        background: 'var(--bg2)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        borderTop: '1px solid var(--rule)',
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
        background: 'var(--bg2)',
        flexShrink: 0,
      }}>
        <span>WHAT WE OFFER</span>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          {rows.map((_, i) => (
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
        {!isMobile && <span>SERVICES / {String(activeIdx + 1).padStart(2, '0')} OF {rows.length}</span>}
        {isMobile && <span>{String(activeIdx + 1).padStart(2, '0')} / {rows.length}</span>}
      </div>

      {/* Body */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <AnimatePresence mode="wait">
          <ServicePanel key={activeIdx} item={rows[activeIdx]} isMobile={isMobile} />
        </AnimatePresence>

        {!isMobile && <Dial items={rows} activeIdx={activeIdx} setActiveIdx={goTo} />}
      </div>
    </section>
  )
}
