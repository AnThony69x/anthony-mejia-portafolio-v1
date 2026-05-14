import { useEffect, useRef } from 'react'
import styles from './AmbientBackground.module.css'

const COUNT = 56

function initParticles(canvas) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return () => {}

  const particles = Array.from({ length: COUNT }, () => ({
    x: Math.random(),
    y: Math.random(),
    r: 0.3 + Math.random() * 1.2,
    vx: (Math.random() - 0.5) * 0.00035,
    vy: (Math.random() - 0.5) * 0.00035,
    a: 0.15 + Math.random() * 0.45,
  }))

  let raf = 0
  let stopped = false

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const w = window.innerWidth
    const h = window.innerHeight
    canvas.width = Math.floor(w * dpr)
    canvas.height = Math.floor(h * dpr)
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }

  const tick = () => {
    if (stopped) return
    const w = window.innerWidth
    const h = window.innerHeight
    ctx.clearRect(0, 0, w, h)
    ctx.fillStyle = 'rgba(148, 163, 184, 0.9)'
    for (const p of particles) {
      p.x += p.vx
      p.y += p.vy
      if (p.x < 0 || p.x > 1) p.vx *= -1
      if (p.y < 0 || p.y > 1) p.vy *= -1
      ctx.globalAlpha = p.a
      ctx.beginPath()
      ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.globalAlpha = 1
    raf = requestAnimationFrame(tick)
  }

  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  resize()
  window.addEventListener('resize', resize)

  if (!reduced) {
    raf = requestAnimationFrame(tick)
  } else {
    const w = window.innerWidth
    const h = window.innerHeight
    ctx.globalAlpha = 0.25
    ctx.fillStyle = 'rgba(148, 163, 184, 0.8)'
    for (const p of particles) {
      ctx.beginPath()
      ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.globalAlpha = 1
  }

  return () => {
    stopped = true
    cancelAnimationFrame(raf)
    window.removeEventListener('resize', resize)
  }
}

export default function AmbientBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    return initParticles(canvas)
  }, [])

  return (
    <div className={styles.wrap} aria-hidden="true">
      <div className={styles.gradient} />
      <div className={styles.grid} />
      <div className={styles.blobs} aria-hidden="true">
        <div className={styles.blob} />
        <div className={styles.blob} />
        <div className={styles.blob} />
      </div>
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.noise} />
    </div>
  )
}
