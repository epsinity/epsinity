import { useState } from 'react'
import { motion } from 'framer-motion'

const rows = [
  {
    id: '01',
    title: 'CAE Consultation',
    subtitle: 'Optimize your engineering designs',
    action: 'Contact',
    actionType: 'contact',
    imgUrl: '/images/service-2.jpg',
  },
  {
    id: '02',
    title: 'OpenFOAM Training',
    subtitle: 'Accelerate your CFD mastery',
    action: 'View Course',
    actionType: 'course',
    imgUrl: '/images/service-3.jpg',
  },
  {
    id: '03',
    title: 'FDS Training',
    subtitle: 'Fire & smoke analysis',
    action: 'View Course',
    actionType: 'course',
    imgUrl: null,
  },
  {
    id: '04',
    title: 'Automation Demo',
    subtitle: 'Streamline your workflow',
    action: 'Contact',
    actionType: 'contact',
    imgUrl: '/images/service-1.jpg',
  },
]

function ServiceNode({ r, i }) {
  const [imgError, setImgError] = useState(false)

  const handleAction = () => {
    if (r.actionType === 'contact') {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.45, delay: 0.35 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, scale: 1.02, borderColor: 'var(--accent)', boxShadow: '0 0 34px rgba(29,60,102,0.12)' }}
      data-hover
      style={{
        position: 'relative', width: '100%',
        border: '1px solid var(--rule2)',
        background: 'var(--surface)',
        cursor: 'pointer', overflow: 'hidden',
      }}
    >
      {/* top accent bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute', left: 0, right: 0, top: 0,
          height: 2, background: 'var(--accent)', transformOrigin: 'left',
        }}
      />

      {/* service image */}
      {r.imgUrl && !imgError ? (
        <div style={{ height: 160, overflow: 'hidden' }}>
          <img
            src={r.imgUrl}
            alt={r.title}
            onError={() => setImgError(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
      ) : (
        <div style={{
          height: 160,
          background: 'linear-gradient(135deg, var(--bg2), var(--rule))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: '2.5rem', color: 'var(--accent)', opacity: 0.25,
            textTransform: 'uppercase', letterSpacing: '0.06em',
          }}>
            {r.title.split(' ')[0]}
          </span>
        </div>
      )}

      {/* content */}
      <div style={{ padding: '1.4rem 1.6rem 1.6rem' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', marginBottom: '0.45rem',
          fontFamily: 'var(--font-mono)', fontSize: '0.55rem',
          color: 'var(--muted)', letterSpacing: '0.12em',
        }}>
          <span>{r.id}</span>
          <button
            onClick={handleAction}
            style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.55rem',
              letterSpacing: '0.12em', color: 'var(--accent)',
              textTransform: 'uppercase', cursor: 'pointer',
              background: 'none', border: 'none', padding: 0,
            }}
          >
            {r.action}
          </button>
        </div>
        <div style={{
          fontFamily: 'var(--font-display)', fontWeight: 700,
          fontSize: '1.5rem', lineHeight: 1.02,
          color: 'var(--white)', textTransform: 'uppercase',
        }}>
          {r.title}
        </div>
        <div style={{
          marginTop: '0.45rem',
          fontFamily: 'var(--font-mono)', fontSize: '0.55rem',
          lineHeight: 1.5, color: 'var(--muted)',
        }}>
          {r.subtitle}
        </div>
      </div>
    </motion.div>
  )
}

export default function Services() {
  return (
    <section id="services" style={{
      padding: '8rem 2.5rem',
      background: 'var(--bg2)',
      borderTop: '1px solid var(--rule)',
      position: 'relative',
    }}>
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 0.78fr',
        gap: '5rem', alignItems: 'end', marginBottom: '4rem',
      }}>
        <div>
          <div className="tag" style={{ marginBottom: '1.4rem' }}>Services</div>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: 'clamp(2.8rem, 5.6vw, 6.4rem)',
            textTransform: 'uppercase', lineHeight: 0.92,
            letterSpacing: '0.01em', color: 'var(--white)',
          }}>
            What We Offer
          </h2>
        </div>
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.76rem',
          lineHeight: 1.9, color: 'var(--dim)', maxWidth: 460,
        }}>
          From finite element stress analysis to fire & smoke evacuation simulations —
          our services converge on truth at every engineering scale.
        </p>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem',
      }}>
        {rows.map((r, i) => <ServiceNode key={r.id} r={r} i={i} />)}
      </div>
    </section>
  )
}
