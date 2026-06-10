import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

import { useMediaQuery } from '../hooks/useResponsive'

const inputStyle = {
  width: '100%',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid var(--rule2)',
  padding: '0.7rem 0',
  fontFamily: 'var(--font-mono)',
  fontSize: '0.8rem',
  color: 'var(--white)',
  letterSpacing: '0.02em',
  outline: 'none',
  transition: 'border-color 0.25s',
}

const labelStyle = {
  fontFamily: 'var(--font-mono)', fontSize: '0.55rem',
  letterSpacing: '0.16em', textTransform: 'uppercase',
  color: 'var(--muted)', marginBottom: '0.4rem', display: 'block',
}

function Field({ label, children }) {
  return (
    <div>
      <span style={labelStyle}>{label}</span>
      {children}
    </div>
  )
}

export default function Contact() {
  const ref = useRef()
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const isMobile = useMediaQuery('(max-width: 768px)')

  const [form, setForm] = useState({ first: '', last: '', email: '', mobile: '', type: '', desc: '' })
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    if (!form.type) return
    const subject = encodeURIComponent(`Consultation Request - ${form.type}`)
    const body = encodeURIComponent(
      `Name: ${form.first} ${form.last}\nBusiness Email: ${form.email}\nMobile: ${form.mobile}\nConsultation Type: ${form.type}\n\nProject Description:\n${form.desc}`
    )
    window.location.href = `mailto:contact@epsinity.com?subject=${subject}&body=${body}`
  }

  const focusBorder = e => { e.target.style.borderColor = 'var(--accent)' }
  const blurBorder  = e => { e.target.style.borderColor = 'var(--rule2)' }

  return (
    <section id="contact" style={{
      padding: isMobile ? '6rem 1.5rem 3rem' : '9rem 2.5rem 4rem',
      background: 'var(--bg)',
      borderTop: '1px solid var(--rule)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'relative', zIndex: 2 }} ref={ref}>
        <div className="tag" style={{ marginBottom: '2.5rem' }}>Contact</div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? '3rem' : '5rem',
          alignItems: 'start',
        }}>
          {/* left: heading + details */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'var(--font-display)', fontWeight: 700,
                fontSize: 'clamp(2.6rem, 5.5vw, 6rem)',
                lineHeight: 0.95, textTransform: 'uppercase',
                letterSpacing: '0.01em', color: 'var(--white)', marginBottom: '1.8rem',
              }}
            >
              Explain Your<br />Problem
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.25, duration: 0.6 }}
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', lineHeight: 1.95, color: 'var(--dim)', maxWidth: 460, marginBottom: '3.5rem' }}
            >
              Reach out to discuss your technical simulation requirements. Our consulting
              team is ready to assist with custom CFD and CAE inquiries and training sessions.
            </motion.p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div>
                <div style={labelStyle}>Technical Hub</div>
                <a href="mailto:contact@epsinity.com" data-hover
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '1.3rem', color: 'var(--white)', letterSpacing: '0.02em', transition: 'color 0.25s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--white)'}
                >
                  contact@epsinity.com
                </a>
              </div>
              <div style={{ display: 'flex', gap: '3.5rem' }}>
                <div>
                  <div style={labelStyle}>Consultation Availability</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--dim)', lineHeight: 1.7 }}>
                    Global Operations<br />Monday — Friday
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* right: form */}
          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--rule)',
              padding: isMobile ? '1.8rem 1.4rem' : '2.5rem',
              display: 'flex', flexDirection: 'column', gap: '1.8rem',
            }}
          >
            {/* First + Last Name */}
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1.5rem' }}>
              <Field label="First Name *">
                <input required value={form.first} onChange={set('first')} onFocus={focusBorder} onBlur={blurBorder} style={inputStyle} />
              </Field>
              <Field label="Last Name *">
                <input required value={form.last} onChange={set('last')} onFocus={focusBorder} onBlur={blurBorder} style={inputStyle} />
              </Field>
            </div>

            <Field label="Business Email *">
              <input required type="email" value={form.email} onChange={set('email')} onFocus={focusBorder} onBlur={blurBorder} style={inputStyle} />
            </Field>

            <Field label="Mobile Number">
              <input type="tel" value={form.mobile} onChange={set('mobile')}
                onFocus={focusBorder} onBlur={blurBorder}
                placeholder="+1 000 000 0000"
                style={inputStyle} />
            </Field>

            <Field label="Consultation Type *">
              <div style={{ position: 'relative' }}>
                <select
                  required
                  value={form.type}
                  onChange={set('type')}
                  onFocus={e => { focusBorder(e); setDropdownOpen(true) }}
                  onBlur={e => { blurBorder(e); setDropdownOpen(false) }}
                  style={{
                    ...inputStyle,
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    cursor: 'pointer',
                    paddingRight: '1.5rem',
                  }}
                >
                  <option value="" disabled style={{ background: 'var(--surface)' }}>Select...</option>
                  <option value="Consultancy" style={{ background: 'var(--surface)' }}>Consultancy</option>
                  <option value="Training" style={{ background: 'var(--surface)' }}>Training</option>
                </select>
                <motion.span
                  animate={{ rotate: dropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                  style={{
                    position: 'absolute', right: 4, top: '50%', translateY: '-50%',
                    pointerEvents: 'none', display: 'flex', alignItems: 'center',
                    color: 'var(--muted)',
                    transform: 'translateY(-50%)',
                  }}
                >
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden>
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.span>
              </div>
            </Field>

            <Field label="Project Description">
              <textarea value={form.desc} onChange={set('desc')} onFocus={focusBorder} onBlur={blurBorder}
                placeholder="Tell us about your engineering requirements..."
                rows={3}
                style={{ ...inputStyle, resize: 'none' }}
              />
            </Field>

            <button type="submit" data-hover
              style={{
                marginTop: '0.5rem', padding: '14px',
                fontFamily: 'var(--font-mono)', fontSize: '0.66rem',
                letterSpacing: '0.2em', textTransform: 'uppercase',
                border: '1px solid var(--accent)', color: 'var(--accent)',
                background: 'transparent', cursor: 'pointer',
                transition: 'background 0.22s, color 0.22s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = 'var(--surface)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--accent)' }}
            >
              Request Consultation
            </button>
          </motion.form>
        </div>
      </div>

      {/* footer */}
      <div style={{
        marginTop: '6rem', paddingTop: '1.4rem',
        borderTop: '1px solid var(--rule)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
        letterSpacing: '0.1em', color: 'var(--muted)',
        position: 'relative', zIndex: 2, flexWrap: 'wrap', gap: '1rem',
      }}>
        {!isMobile && <span>AUTOMOTIVE | AEROSPACE | ENERGY</span>}
        <span>Copyright 2026 EPSINITY — Simulation at the precision of physics.</span>
        <img src="/logo.svg" alt="Epsinity" style={{ height: 22, width: 'auto', opacity: 0.5 }} />
      </div>
    </section>
  )
}
