import { useRef } from 'react'
import { techStack } from '../../data/site'
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsap'

/** Infinite scrolling strip of technologies. Speeds up with scroll velocity and follows scroll direction. */
export function Marquee() {
  const track = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const loop = gsap.to(track.current, { xPercent: -50, ease: 'none', duration: 32, repeat: -1 })
      ScrollTrigger.create({
        onUpdate: (self) => {
          const boost = Math.min(Math.abs(self.getVelocity()) / 400, 4)
          const dir = self.direction === 1 ? 1 : -1
          gsap.to(loop, { timeScale: dir * (1 + boost), duration: 0.3, overwrite: true })
          gsap.to(loop, { timeScale: dir, duration: 1.2, delay: 0.3 })
        },
      })
    })
  })

  // The list is rendered twice so the -50% loop is seamless.
  const items = [...techStack, ...techStack]

  return (
    <div aria-hidden="true" className="overflow-hidden border-y border-line bg-surface py-[18px]">
      <div ref={track} className="flex w-max">
        {items.map((tech, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-11 px-[22px] font-display wdth-110 text-[clamp(20px,2.6vw,30px)] font-bold whitespace-nowrap text-muted after:size-[7px] after:rounded-full after:bg-signal after:content-['']"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  )
}
