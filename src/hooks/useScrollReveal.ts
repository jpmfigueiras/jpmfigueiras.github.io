import type { RefObject } from 'react'
import { gsap, useGSAP } from '../lib/gsap'

/** Fades/slides in every `.reveal` element inside `scope` when it scrolls into view. */
export function useScrollReveal(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
          // Content stays readable (opacity .25) before triggering.
          gsap.from(el, {
            y: 48,
            opacity: 0.25,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          })
        })
      })
    },
    { scope },
  )
}
