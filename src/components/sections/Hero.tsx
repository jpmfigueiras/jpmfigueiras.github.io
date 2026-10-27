import { useRef } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { gsap, useGSAP } from '../../lib/gsap'
import { cn } from '../../lib/cn'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { ArrowRightIcon } from '../ui/icons'

export function Hero() {
  const { t } = useLanguage()
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Intro: headline lines slide up, then the rest fades in.
        gsap
          .timeline({ defaults: { ease: 'power4.out' } })
          .from('.hero-line', { yPercent: 105, duration: 1.1, stagger: 0.1 })
          .from('.hero-fade', { y: 24, opacity: 0, duration: 0.8, stagger: 0.08 }, '-=.75')

        // Parallax on the headline.
        gsap.to('h1', {
          yPercent: -12,
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
        })
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className="gutter relative isolate pt-[clamp(56px,10vw,120px)] pb-[clamp(40px,6vw,72px)]">
      {/* Background glow blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[6%] right-[4%] -z-10 aspect-square w-[min(520px,70vw)] rounded-full bg-blob-a blur-[70px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 -z-10 aspect-square w-[min(420px,60vw)] rounded-full bg-blob-b blur-[70px]"
      />

      <Container>
        <span className="hero-fade inline-flex items-center gap-2.5 rounded-full border border-line bg-surface py-1.5 pr-3.5 pl-3 font-mono text-[13px] text-muted">
          <span className="relative size-2 rounded-full bg-ok after:absolute after:-inset-1 after:animate-ring after:rounded-full after:border-2 after:border-ok after:opacity-50 motion-reduce:after:animate-none" />
          <span>{t.hero.status}</span>
        </span>

        <h1 className="mt-7 font-display wdth-122 text-[clamp(44px,9.4vw,128px)] leading-[.92] font-black tracking-[-.035em]">
          {t.hero.lines.map((line, i) => (
            <span key={i} className="block overflow-hidden pb-[.04em]">
              <span className={cn('hero-line block', i === 2 && 'inline-block text-gradient')}>{line}</span>
            </span>
          ))}
        </h1>

        <div className="mt-[clamp(28px,4vw,48px)] grid items-end gap-x-12 gap-y-7 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <p className="hero-fade max-w-[54ch] text-[clamp(17px,1.6vw,20px)] text-muted [&_strong]:font-semibold [&_strong]:text-fg">
            {t.hero.lede}
          </p>
          <div className="hero-fade flex flex-wrap gap-3 md:justify-end">
            <Button href="#work" variant="primary">
              <span>{t.hero.ctaWork}</span>
              <ArrowRightIcon />
            </Button>
            <Button href="#contact">{t.hero.ctaContact}</Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
