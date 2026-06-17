import { motion } from 'framer-motion'
import { useMediaQuery } from '../hooks/useResponsive'

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
          alignItems: 'center',
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

          {/* Right: founders panel styled like the original Legacy card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'relative', minHeight: 400,
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
                color: 'var(--muted)', marginBottom: '2.5rem',
              }}>
                [ Co-Founder & Managing Director ]
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                {[
                  { initial: 'E', name: 'Coming Soon', role: 'Co-Founder & CEO' },
                  { initial: 'E', name: 'Coming Soon', role: 'Co-Founder & CTO' },
                ].map((founder, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: 0.45 + i * 0.1 }}
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
                      {founder.initial}
                    </div>
                    <div>
                      <div style={{
                        fontFamily: 'var(--font-display)', fontWeight: 600,
                        fontSize: '1.05rem', color: 'var(--white)', marginBottom: '0.2rem',
                      }}>
                        {founder.name}
                      </div>
                      <div style={{
                        fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
                        letterSpacing: '0.1em', color: 'var(--muted)', textTransform: 'uppercase',
                      }}>
                        {founder.role}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* corner labels like the Legacy section */}
              <div style={{
                position: 'absolute', bottom: '-1.5rem', right: 0,
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
