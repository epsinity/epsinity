import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useMediaQuery } from '../hooks/useResponsive'

export default function Cursor() {
  const isTouch = useMediaQuery('(pointer: coarse)')
  const [hovered, setHovered] = useState(false)
  const rx = useMotionValue(-100), ry = useMotionValue(-100)

  // dot tracks tightly; ring trails with a soft lag
  const dotX = useSpring(rx, { stiffness: 1400, damping: 60 })
  const dotY = useSpring(ry, { stiffness: 1400, damping: 60 })
  const ringX = useSpring(rx, { stiffness: 220, damping: 26 })
  const ringY = useSpring(ry, { stiffness: 220, damping: 26 })

  useEffect(() => {
    const onMove = (e) => { rx.set(e.clientX); ry.set(e.clientY) }
    const onOver = (e) => setHovered(!!e.target.closest('a,button,[data-hover]'))
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseover', onOver) }
  }, [rx, ry])

  if (isTouch) return null

  return (
    <>
      {/* trailing ring */}
      <motion.div
        style={{
          position: 'fixed', top: 0, left: 0,
          x: ringX, y: ringY, translateX: '-50%', translateY: '-50%',
          pointerEvents: 'none', zIndex: 9999, mixBlendMode: 'difference',
        }}
      >
        <motion.div
          animate={{ width: hovered ? 46 : 28, height: hovered ? 46 : 28, opacity: hovered ? 0.9 : 0.45 }}
          transition={{ type: 'spring', stiffness: 300, damping: 26 }}
          style={{ border: '1px solid #ffffff', borderRadius: '50%' }}
        />
      </motion.div>

      {/* precise center dot */}
      <motion.div
        style={{
          position: 'fixed', top: 0, left: 0,
          x: dotX, y: dotY, translateX: '-50%', translateY: '-50%',
          width: 4, height: 4, borderRadius: '50%', background: '#ffffff',
          pointerEvents: 'none', zIndex: 9999, mixBlendMode: 'difference',
        }}
      />
    </>
  )
}
