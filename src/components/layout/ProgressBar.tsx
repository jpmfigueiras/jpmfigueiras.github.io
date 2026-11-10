import { useRef } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'

/** Thin bar at the top that fills as the page scrolls. */
export function ProgressBar() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.to(ref.current, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } })
    })
  })

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fixed inset-x-0 top-[env(safe-area-inset-top,0px)] z-70 h-0.5 origin-left scale-x-0 bg-accent"
    />
  )
}
