import { motion } from 'framer-motion'

const rows = [
  { id: '01', domain: 'Automation Demo', subtitle: 'Streamline Your Workflow', detail: '45 min | $150', action: 'Details', x: '24%', y: '42%' },
  { id: '02', domain: 'CAE Consultation', subtitle: 'Optimize Your Engineering Designs', detail: '1 hr 30 min | $350', action: 'Details', x: '50%', y: '28%' },
  { id: '03', domain: 'CFD Training', subtitle: 'Accelerate Your CFD Mastery', detail: 'Ended | $200', action: 'View Course', x: '76%', y: '42%' },
]

const software = ['Automation Demo', 'CAE Consultation', 'CFD Training']

function ExpertiseNode({ r, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.45, delay: 0.35 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{
        y: -8,
        scale: 1.04,
        borderColor: 'var(--accent)',
        boxShadow: '0 0 34px rgba(120,150,200,0.18)',
      }}
      data-hover
      style={{
        position: 'relative',
        width: '100%',
        padding: '2rem 1.8rem 1.8rem',
        border: '1px solid var(--rule2)',
        background: 'var(--surface)',
        cursor: 'pointer',
        overflow: 'hidden',
      }}
    >
      <motion.div
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: 2,
          background: 'var(--accent)',
          transformOrigin: 'left',
        }}
      />
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '0.55rem',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.55rem',
        color: 'var(--muted)',
        letterSpacing: '0.12em',
      }}>
        <span>{r.id}</span>
        <span>{r.action}</span>
      </div>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: '1.6rem',
        lineHeight: 1.02,
        color: 'var(--white)',
        textTransform: 'uppercase',
      }}>
        {r.domain}
      </div>
      <div style={{
        marginTop: '0.55rem',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.55rem',
        lineHeight: 1.5,
        color: 'var(--muted)',
      }}>
        {r.subtitle}
      </div>
      <div style={{
        marginTop: '0.75rem',
        paddingTop: '0.65rem',
        borderTop: '1px solid var(--rule)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.55rem',
        color: 'var(--accent)',
      }}>
        {r.detail}
      </div>
    </motion.div>
  )
}

function ExpertiseField() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '1.5rem',
      marginBottom: '5rem',
    }}>
      {rows.map((r, i) => <ExpertiseNode key={r.id} r={r} i={i} />)}
    </div>
  )
}

export default function Expertise() {
  return (
    <section id="expertise" className="light" style={{ padding: '8rem 2.5rem', background: 'var(--bg)', borderTop: '1px solid var(--rule)', position: 'relative' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 0.78fr',
        gap: '5rem',
        alignItems: 'end',
        marginBottom: '4rem',
      }}>
        <div>
          <div className="tag" style={{ marginBottom: '1.4rem' }}>02 - EXPERTISE</div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(2.8rem, 5.6vw, 6.4rem)',
            textTransform: 'uppercase',
            lineHeight: 0.92,
            letterSpacing: '0.01em',
            color: 'var(--white)',
          }}>
            Precision at Every Scale
          </h2>
        </div>
        <div>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.76rem',
            lineHeight: 1.9,
            color: 'var(--dim)',
            maxWidth: 460,
            marginBottom: '1.5rem',
          }}>
            From a single mesh cell to a full-scale system — our simulations
            converge on truth, resolving complexity that spans orders of
            magnitude across aerospace, automotive, and energy.
          </p>
          <div style={{ display: 'flex', gap: '2.5rem', borderTop: '1px solid var(--rule)', paddingTop: '1.2rem' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.6rem', color: 'var(--white)' }}>ISO 9001</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--muted)', letterSpacing: '0.1em' }}>:2015 WORKFLOWS</div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.6rem', color: 'var(--white)' }}>AS9100D</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--muted)', letterSpacing: '0.1em' }}>QUALIFIED PROCESS</div>
            </div>
          </div>
        </div>
      </div>

      <ExpertiseField />

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '2rem', alignItems: 'start', borderTop: '1px solid var(--rule)', paddingTop: '2rem' }}>
        <div className="tag">SERVICE TYPES</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
          {software.map((s, i) => (
            <motion.span key={s}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -5, color: 'var(--white)', borderColor: 'var(--accent)', backgroundColor: 'rgba(205,221,244,0.08)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.66rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                padding: '8px 16px',
                border: '1px solid var(--rule2)',
                color: 'var(--dim)',
                background: 'var(--surface)',
              }}
            >
              {s}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  )
}
