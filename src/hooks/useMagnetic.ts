import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'

/** Element follows the mouse slightly while hovered (mouse only, respects reduced motion). */
export function useMagnetic<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useGSAP(() => {
    const el = ref.current
    if (!el) return
    const mm = gsap.matchMedia()
    mm.add('(pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' })
      const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' })
      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect()
        xTo((e.clientX - r.left - r.width / 2) * 0.3)
        yTo((e.clientY - r.top - r.height / 2) * 0.4)
      }
      const onLeave = () => {
        xTo(0)
        yTo(0)
      }
      el.addEventListener('mousemove', onMove)
      el.addEventListener('mouseleave', onLeave)
      return () => {
        el.removeEventListener('mousemove', onMove)
        el.removeEventListener('mouseleave', onLeave)
      }
    })
  })

  return ref
}
