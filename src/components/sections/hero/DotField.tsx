import { useEffect, useRef } from 'react'

/**
 * Grid of dots behind the hero. Dots near the cursor grow and take the accent/signal colours;
 * without a mouse, the highlight drifts on a slow orbit. Fills its positioned parent.
 */
export function DotField() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const host = canvas?.parentElement
    const ctx = canvas?.getContext('2d')
    if (!canvas || !host || !ctx) return

    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const colors = { base: '#888', a: '#ff6b1a', b: '#c25bff' }
    const pos = { x: 0, y: 0 }
    let mouse: { x: number; y: number } | null = null
    let width = 0
    let height = 0
    let gap = 26
    let time = 0
    let frame = 0
    let visible = true

    const readColors = () => {
      const cs = getComputedStyle(document.documentElement)
      colors.base = cs.getPropertyValue('--muted').trim() || colors.base
      colors.a = cs.getPropertyValue('--accent').trim() || colors.a
      colors.b = cs.getPropertyValue('--signal').trim() || colors.b
    }

    const draw = () => {
      time += 0.008
      const target = mouse ?? {
        x: width * (0.68 + Math.cos(time) * 0.18),
        y: height * (0.45 + Math.sin(time * 1.3) * 0.25),
      }
      pos.x += (target.x - pos.x) * 0.08
      pos.y += (target.y - pos.y) * 0.08

      ctx.clearRect(0, 0, width, height)
      const radius = Math.max(160, Math.min(width, height) * 0.32)
      for (let y = gap / 2; y < height; y += gap) {
        for (let x = gap / 2; x < width; x += gap) {
          const d = Math.hypot(x - pos.x, y - pos.y)
          const k = Math.max(0, 1 - d / radius) ** 2
          const wave = 0.5 + 0.5 * Math.sin(x * 0.02 + y * 0.015 + time * 3)
          ctx.globalAlpha = 0.16 + wave * 0.06 + k * 0.8
          ctx.fillStyle = k > 0.02 ? (x < pos.x ? colors.a : colors.b) : colors.base
          ctx.beginPath()
          ctx.arc(x, y, 1 + k * 2.6, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      ctx.globalAlpha = 1
    }

    const loop = () => {
      draw()
      frame = requestAnimationFrame(loop)
    }
    const start = () => {
      if (!still && visible && !frame) frame = requestAnimationFrame(loop)
    }
    const stop = () => {
      cancelAnimationFrame(frame)
      frame = 0
    }

    const resize = () => {
      const r = host.getBoundingClientRect()
      width = r.width
      height = r.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      gap = width < 600 ? 22 : 26
      if (still) draw() // resizing clears the canvas
    }

    const onMove = (e: MouseEvent) => {
      const r = host.getBoundingClientRect()
      mouse = { x: e.clientX - r.left, y: e.clientY - r.top }
    }
    const onLeave = () => {
      mouse = null
    }

    // Theme changes swap the CSS colour variables.
    const themeObserver = new MutationObserver(() => {
      readColors()
      if (still) draw()
    })
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    const sizeObserver = new ResizeObserver(resize)
    sizeObserver.observe(host)

    // Don't burn CPU while the hero is off screen.
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
      else stop()
    })
    visibilityObserver.observe(host)

    host.addEventListener('mousemove', onMove)
    host.addEventListener('mouseleave', onLeave)

    readColors()
    resize()
    pos.x = width * 0.7
    pos.y = height * 0.45
    draw()
    start()

    return () => {
      stop()
      themeObserver.disconnect()
      sizeObserver.disconnect()
      visibilityObserver.disconnect()
      host.removeEventListener('mousemove', onMove)
      host.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-20 size-full [mask-image:radial-gradient(ellipse_80%_75%_at_60%_45%,#000_40%,transparent_100%)]"
    />
  )
}
