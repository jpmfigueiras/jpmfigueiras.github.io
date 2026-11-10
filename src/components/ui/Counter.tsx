import { useRef, useState } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsap'

interface CounterProps {
  value: number
  suffix?: string
  className?: string
}

/** Shows the final value at rest and counts up from 0 the first time it scrolls into view. */
export function Counter({ value, suffix = '', className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(value)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const counter = { v: 0 }
      ScrollTrigger.create({
        trigger: ref.current,
        start: 'top 90%',
        once: true,
        onEnter: () => {
          gsap.fromTo(
            counter,
            { v: 0 },
            { v: value, duration: 1.4, ease: 'power2.out', onUpdate: () => setDisplay(Math.round(counter.v)) },
          )
        },
      })
    })
  })

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  )
}
