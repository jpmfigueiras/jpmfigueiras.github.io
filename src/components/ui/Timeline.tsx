import { useRef } from 'react'
import type { TimelineEntry } from '../../i18n/types'
import { gsap, useGSAP } from '../../lib/gsap'

interface TimelineProps {
  entries: TimelineEntry[]
  /** Shows a vertical rail that fills with colour as you scroll. */
  rail?: boolean
}

export function Timeline({ entries, rail }: TimelineProps) {
  const ref = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!rail) return
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.to(fillRef.current, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top 70%', end: 'bottom 60%', scrub: 0.5 },
      })
    })
  })

  return (
    <div ref={ref} className="relative grid">
      {rail && (
        <div aria-hidden="true" className="absolute top-2 bottom-2 left-[5px] w-0.5 bg-line sm:left-40">
          <div ref={fillRef} className="absolute inset-0 origin-top scale-y-0 bg-linear-to-b from-accent to-signal" />
        </div>
      )}

      {entries.map((entry, i) => (
        <div
          key={i}
          className="reveal relative grid gap-x-11 gap-y-1.5 py-[22px] pl-7 before:absolute before:top-[26px] before:left-0 before:size-3 before:rounded-full before:border-2 before:border-accent before:bg-bg sm:grid-cols-[160px_minmax(0,1fr)] sm:pl-0 sm:before:top-[30px] sm:before:left-[155px]"
        >
          <span className="pt-1 font-mono text-[13px] text-muted tabular-nums">{entry.when}</span>
          <div className="grid gap-1 pl-1">
            <h3>{entry.title}</h3>
            <span className="text-[15px] font-medium text-accent-text">{entry.org}</span>
            {entry.desc && <p className="mt-1 max-w-[62ch] text-muted">{entry.desc}</p>}
            {entry.stamp && (
              <span className="mt-2.5 inline-block w-fit -rotate-2 rounded-sm border-[1.5px] border-signal px-[9px] py-[3px] font-mono text-[11px] tracking-[.08em] text-signal uppercase">
                {entry.stamp}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
