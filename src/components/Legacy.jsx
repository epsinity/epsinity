import { motion } from 'framer-motion'

const bridgeSteps = ['Define', 'Discretize', 'Converge', 'Validate']

export default function Legacy() {
  return (
    <section id="legacy" style={{
      background: 'var(--bg)',
      color: 'var(--white)',
      padding: '8rem 2.5rem',
      borderTop: '1px solid var(--rule)',
      overflow: 'hidden',
    }}>
      <div style={{ maxWidth: 1220, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '0.9fr 1.1fr',
          gap: '4.5rem',
          alignItems: 'center',
        }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="tag" style={{ marginBottom: '2rem' }}>04 - OUR LEGACY</div>

            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(2.7rem, 5vw, 5.7rem)',
              lineHeight: 0.9,
              textTransform: 'uppercase',
              color: 'var(--white)',
              maxWidth: 620,
              marginBottom: '2rem',
            }}>
              Precision at the Limit of Physics
            </h2>

            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.82rem',
              lineHeight: 1.9,
              color: 'var(--dim)',
              maxWidth: 560,
            }}>
              Every physical truth lives at a threshold — the point where
              mathematics and reality become indistinguishable. We converge on it,
              resolving complexity from the smallest mesh cell to the full-scale
              system, for leaders in automotive, aerospace, and energy.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'relative',
              minHeight: 470,
              border: '1px solid var(--rule)',
              background: 'var(--bg2)',
              overflow: 'hidden',
            }}
          >
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'linear-gradient(90deg, rgba(200,216,240,0.035) 1px, transparent 1px), linear-gradient(rgba(200,216,240,0.035) 1px, transparent 1px)',
              backgroundSize: '56px 56px',
            }} />

            <div style={{
              position: 'absolute',
              left: '2rem',
              top: '2rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.58rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
            }}>
              Infinite physical space
            </div>

            <div style={{
              position: 'absolute',
              right: '2rem',
              bottom: '2rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.58rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              textAlign: 'right',
            }}>
              Engineering truth
            </div>

            <svg viewBox="0 0 760 470" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
              <defs>
                <linearGradient id="legacyBridge" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="rgba(131,146,173,0.18)" />
                  <stop offset="48%" stopColor="rgba(238,242,249,0.86)" />
                  <stop offset="100%" stopColor="rgba(205,221,244,0.2)" />
                </linearGradient>
              </defs>

              <motion.path
                d="M110 135 C250 80 325 185 380 235 C445 295 520 390 650 330"
                fill="none"
                stroke="url(#legacyBridge)"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              />

              <motion.path
                d="M110 335 C250 390 325 285 380 235 C445 175 520 80 650 140"
                fill="none"
                stroke="rgba(205,221,244,0.2)"
                strokeWidth="1.4"
                strokeDasharray="8 10"
                animate={{ strokeDashoffset: [0, -54] }}
                transition={{ repeat: Infinity, duration: 5, ease: 'linear' }}
              />

              {[0, 1, 2, 3].map(i => (
                <motion.circle
                  key={i}
                  cx={110 + i * 180}
                  cy={i % 2 === 0 ? 135 + i * 34 : 335 - i * 34}
                  r="5"
                  fill="rgba(238,242,249,0.82)"
                  animate={{ scale: [0.8, 1.35, 0.8], opacity: [0.35, 1, 0.35] }}
                  transition={{ repeat: Infinity, duration: 2.6, delay: i * 0.28, ease: 'easeInOut' }}
                />
              ))}
            </svg>

            <div style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: 170,
              height: 170,
              border: '1px solid rgba(205,221,244,0.2)',
              borderRadius: '50%',
              boxShadow: '0 0 80px rgba(205,221,244,0.08)',
            }} />

            <div style={{
              position: 'absolute',
              left: '50%',
              bottom: '3.2rem',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '0.6rem',
            }}>
              {bridgeSteps.map((step, i) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.45 + i * 0.08 }}
                  style={{
                    padding: '0.55rem 0.7rem',
                    border: '1px solid var(--rule2)',
                    background: 'rgba(5,7,12,0.58)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.56rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: i === bridgeSteps.length - 1 ? 'var(--accent)' : 'var(--muted)',
                  }}
                >
                  {step}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
