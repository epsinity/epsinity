import { motion } from 'framer-motion'
import { useMediaQuery } from '../hooks/useResponsive'

const FOUNDER_BIO = [
  'Has two decades of deep expertise in Computational Fluid Dynamics (CFD) and engineering simulation. M.Tech in Fluids & Thermal Engineering from IIT-Guwahati. Venkat built his career solving some of the most complex fluid dynamics challenges across industries and developed intelligent automations for CFD/CAE processes.',
  'Before co-founding Epsinity, Venkat worked at ESI-Group (Now Keysight) for 17.5 years in the CFD team. As a freelancer he collaborated with machine learning teams to build AI-driven CFD models.',
  'At Epsinity, Venkat channels this rare combination of simulation depth, automation expertise, and AI fluency into building smarter engineering solutions — where physics-based modeling meets the power of modern data science.',
]

export default function About() {
  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <section id="about" style={{
      background: 'var(--bg)', color: 'var(--white)',
      padding: isMobile ? '5rem 1.5rem' : '8rem 2.5rem',
      borderTop: '1px solid var(--rule)', overflow: 'hidden',
    }}>
      <div style={{ maxWidth: 1220, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '0.9fr 1.1fr',
          gap: isMobile ? '3rem' : '4.5rem',
          alignItems: 'start',
        }}>

          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="tag" style={{ marginBottom: '2rem' }}>About</div>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontWeight: 700,
              fontSize: 'clamp(2.7rem, 5vw, 5.7rem)',
              lineHeight: 0.9, textTransform: 'uppercase',
              color: 'var(--white)', maxWidth: 620, marginBottom: '2rem',
            }}>
              Bridging Physics &amp; Reality
            </h2>
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.82rem',
              lineHeight: 1.9, color: 'var(--dim)', maxWidth: 560,
            }}>
              We bridge the critical gap between complex physical phenomena and operational
              reality. Combining decades of technical expertise in CFD and CAE, Epsinity
              delivers simulation software solutions that empower automotive and aerospace
              leaders to achieve peak technical efficiency and innovation.
            </p>
          </motion.div>

          {/* Right: founders panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'relative',
              border: '1px solid var(--rule)', background: 'var(--bg2)', overflow: 'hidden',
              padding: '2.5rem',
            }}
          >
            {/* grid overlay */}
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage:
                'linear-gradient(90deg, rgba(29,60,102,0.05) 1px, transparent 1px), linear-gradient(rgba(29,60,102,0.05) 1px, transparent 1px)',
              backgroundSize: '56px 56px',
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
                letterSpacing: '0.16em', textTransform: 'uppercase',
                color: 'var(--muted)', marginBottom: '2rem',
              }}>
                [ Co-Founder & Managing Director ]
              </div>

              {/* ── Founder 1: Venkata Ramana Eaga ── */}
              <motion.div
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.45 }}
              >
                {/* Name + role card */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '1.2rem',
                  padding: '1.1rem 1.3rem',
                  border: '1px solid var(--rule2)', background: 'var(--surface)',
                }}>
                  <div style={{
                    width: 46, height: 46, borderRadius: '50%', flexShrink: 0,
                    background: 'var(--bg)', border: '1px solid var(--rule2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-display)', fontWeight: 700,
                    fontSize: '0.9rem', color: 'var(--accent)',
                  }}>
                    VR
                  </div>
                  <div>
                    <div style={{
                      fontFamily: 'var(--font-display)', fontWeight: 600,
                      fontSize: '1.05rem', color: 'var(--white)', marginBottom: '0.2rem',
                    }}>
                      Venkata Ramana Eaga
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
                      letterSpacing: '0.1em', color: 'var(--muted)', textTransform: 'uppercase',
                    }}>
                      Co-Founder & Managing Director
                    </div>
                  </div>
                </div>

                {/* Bio paragraphs */}
                <div style={{ marginTop: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                  {FOUNDER_BIO.map((para, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.55 + i * 0.1 }}
                      style={{
                        fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
                        lineHeight: 1.85, color: 'var(--dim)',
                      }}
                    >
                      {para}
                    </motion.p>
                  ))}
                </div>
              </motion.div>

              {/* divider */}
              <div style={{ borderTop: '1px solid var(--rule)', margin: '2rem 0' }} />

              {/* ── Founder 2: Coming Soon ── */}
              <motion.div
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.6 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '1.2rem',
                  padding: '1.1rem 1.3rem',
                  border: '1px solid var(--rule2)', background: 'var(--surface)',
                }}
              >
                <div style={{
                  width: 46, height: 46, borderRadius: '50%', flexShrink: 0,
                  background: 'var(--bg)', border: '1px solid var(--rule2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-display)', fontWeight: 700,
                  fontSize: '1rem', color: 'var(--accent)',
                }}>
                  E
                </div>
                <div>
                  <div style={{
                    fontFamily: 'var(--font-display)', fontWeight: 600,
                    fontSize: '1.05rem', color: 'var(--white)', marginBottom: '0.2rem',
                  }}>
                    Coming Soon
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
                    letterSpacing: '0.1em', color: 'var(--muted)', textTransform: 'uppercase',
                  }}>
                    Co-Founder & CTO
                  </div>
                </div>
              </motion.div>

              <div style={{
                marginTop: '2rem',
                fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
                letterSpacing: '0.16em', textTransform: 'uppercase',
                color: 'var(--accent)', textAlign: 'right',
              }}>
                Engineering truth
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
