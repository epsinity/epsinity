import { useRef } from 'react'
import { motion } from 'framer-motion'

const projects = [
  {
    num: '01',
    title: 'CFD for HVAC Optimization',
    sector: 'Industrial',
    discipline: 'CFD',
    focus: 'Climate Control',
    visual: 'radial-gradient(circle at 24% 28%, rgba(205,221,244,0.28), transparent 22%), linear-gradient(135deg, #101724 0%, #05070c 58%, #172030 100%)',
  },
  {
    num: '02',
    title: 'Aerospace CFD Analysis',
    sector: 'Aerospace',
    discipline: 'CFD',
    focus: 'Fuel Efficiency',
    visual: 'radial-gradient(ellipse at 68% 34%, rgba(205,221,244,0.24), transparent 28%), linear-gradient(145deg, #0c111b 0%, #151d2b 52%, #05070c 100%)',
  },
  {
    num: '03',
    title: 'Oil & Gas Flow Simulation',
    sector: 'Energy',
    discipline: 'CFD',
    focus: 'Flow Assurance',
    visual: 'linear-gradient(120deg, rgba(205,221,244,0.18), transparent 28%), radial-gradient(circle at 72% 72%, rgba(93,107,136,0.42), transparent 30%), #080c13',
  },
  {
    num: '04',
    title: 'Automotive Thermal Management',
    sector: 'Automotive',
    discipline: 'CAE',
    focus: 'Battery Life',
    visual: 'radial-gradient(circle at 38% 68%, rgba(205,221,244,0.22), transparent 24%), linear-gradient(160deg, #151b27 0%, #05070c 70%)',
  },
  {
    num: '05',
    title: 'Manufacturing Process Automation',
    sector: 'Manufacturing',
    discipline: 'AUTO',
    focus: 'Quality Control',
    visual: 'linear-gradient(90deg, rgba(205,221,244,0.14), transparent 18%, rgba(205,221,244,0.1) 52%, transparent 72%), #0b1018',
  },
  {
    num: '06',
    title: 'CAE Stress Analysis for Automotive Components',
    sector: 'Automotive',
    discipline: 'CAE',
    focus: 'Structural Integrity',
    visual: 'radial-gradient(circle at 78% 24%, rgba(205,221,244,0.2), transparent 24%), linear-gradient(140deg, #05070c 0%, #121a27 100%)',
  },
]

function ScanVisual({ project }) {
  return (
    <div style={{
      position: 'relative',
      height: 310,
      background: project.visual,
      borderBottom: '1px solid var(--rule)',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage:
          'linear-gradient(90deg, rgba(238,242,249,0.07) 1px, transparent 1px), linear-gradient(rgba(238,242,249,0.07) 1px, transparent 1px)',
        backgroundSize: '46px 46px',
        maskImage: 'linear-gradient(to bottom, black, transparent 85%)',
      }} />
      <div style={{
        position: 'absolute',
        left: '12%',
        right: '12%',
        top: '24%',
        height: '46%',
        border: '1px solid rgba(238,242,249,0.34)',
        transform: 'skewX(-12deg)',
      }} />
      <div style={{
        position: 'absolute',
        left: '18%',
        right: '18%',
        top: '36%',
        height: 1,
        background: 'rgba(238,242,249,0.45)',
        transform: 'rotate(-8deg)',
      }} />
      <div style={{
        position: 'absolute',
        right: '1.2rem',
        bottom: '1rem',
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(5rem, 10vw, 9rem)',
        lineHeight: 0.8,
        fontWeight: 700,
        color: 'rgba(238,242,249,0.08)',
      }}>
        {project.discipline}
      </div>
    </div>
  )
}

function CaseCard({ project, i }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
      data-hover
      style={{
        minWidth: 'min(76vw, 620px)',
        background: 'var(--bg2)',
        border: '1px solid var(--rule)',
        overflow: 'hidden',
        cursor: 'grab',
      }}
    >
      <ScanVisual project={project} />
      <div style={{ padding: '1.6rem 1.8rem 1.8rem' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '1.5rem',
          marginBottom: '1.2rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.58rem',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--muted)',
        }}>
          <span>{project.sector}</span>
          <span>{project.focus}</span>
        </div>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 3.5vw, 3.9rem)',
          lineHeight: 0.95,
          textTransform: 'uppercase',
          color: 'var(--white)',
          maxWidth: 520,
        }}>
          {project.title}
        </h3>
        <div style={{
          marginTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid var(--rule)',
          paddingTop: '1rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.62rem',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--accent)',
        }}>
          <span>Case {project.num}</span>
          <span>View Study</span>
        </div>
      </div>
    </motion.article>
  )
}

export default function Portfolio() {
  const railRef = useRef(null)
  const scroll = dir => railRef.current?.scrollBy({ left: dir * 660, behavior: 'smooth' })

  return (
    <section id="portfolio" style={{ padding: '8rem 0 9rem', background: 'var(--bg)', borderTop: '1px solid var(--rule)', overflow: 'hidden' }}>
      <div style={{ padding: '0 2.5rem', display: 'grid', gridTemplateColumns: '1fr 0.8fr', gap: '4rem', alignItems: 'end', marginBottom: '3.5rem' }}>
        <div>
          <div className="tag" style={{ marginBottom: '1.4rem' }}>03 - CASE STUDIES</div>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: 'clamp(3rem, 6vw, 7rem)',
            textTransform: 'uppercase', lineHeight: 0.9, color: 'var(--white)',
            maxWidth: 760,
          }}>
            Precision<br />applied at scale
          </h2>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.8rem' }}>
          {[-1, 1].map(dir => (
            <button
              key={dir}
              onClick={() => scroll(dir)}
              data-hover
              aria-label={dir < 0 ? 'Previous case study' : 'Next case study'}
              style={{
                width: 54,
                height: 54,
                border: '1px solid var(--rule2)',
                color: 'var(--white)',
                fontFamily: 'var(--font-display)',
                fontSize: '1.6rem',
                transition: 'background 0.2s, color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--white)'; e.currentTarget.style.color = 'var(--bg)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--white)' }}
            >
              {dir < 0 ? '<' : '>'}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={railRef}
        style={{
          display: 'flex',
          gap: '1rem',
          overflowX: 'auto',
          padding: '0 2.5rem 1rem',
          scrollSnapType: 'x proximity',
          scrollbarWidth: 'none',
        }}
      >
        {projects.map((project, i) => (
          <div key={project.num} style={{ scrollSnapAlign: 'start' }}>
            <CaseCard project={project} i={i} />
          </div>
        ))}
      </div>
    </section>
  )
}
