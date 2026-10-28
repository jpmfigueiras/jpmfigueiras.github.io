import { useRef } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { facts } from '../../data/site'
import { gsap, useGSAP } from '../../lib/gsap'
import { cn } from '../../lib/cn'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { Counter } from '../ui/Counter'
import { ArrowRightIcon } from '../ui/icons'
import { PulseDot } from '../ui/PulseDot'
import { DotField } from './hero/DotField'
import { HeroPortrait } from './hero/HeroPortrait'

/** Hero + short about: headline, intro, facts and CTAs on the left, cutout portrait on the right. */
export function Hero() {
  const { t } = useLanguage()
  const ref = useRef<HTMLElement>(null)
  const [lead, ...paragraphs] = t.about.paragraphs

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Intro
        gsap
          .timeline({ defaults: { ease: 'power4.out' } })
          .from('.hero-line', { yPercent: 105, duration: 1.1, stagger: 0.1 })
          .from('.hero-fade', { y: 24, opacity: 0, duration: 0.8, stagger: 0.08 }, '-=.75')
          .from('.hero-orb', { scale: 0, opacity: 0, duration: 1.6, ease: 'expo.out' }, 0.1)
          .from('.hero-ring', { scale: 0.6, opacity: 0, duration: 1.4, stagger: 0.12, ease: 'expo.out', svgOrigin: '200 200' }, 0.2)
          .from('.hero-cutout', { y: 80, opacity: 0, duration: 1.4, ease: 'expo.out' }, 0.3)

        // Ambient motion
        gsap.to('.hero-orb', { rotate: 360, duration: 18, repeat: -1, ease: 'none' })
        gsap.to('.hero-orb', { scale: 1.08, duration: 3.5, yoyo: true, repeat: -1, ease: 'sine.inOut' })
        gsap.to('.hero-ring-1', { rotate: 360, duration: 40, repeat: -1, ease: 'none', svgOrigin: '200 200' })
        gsap.to('.hero-ring-2', { rotate: -360, duration: 26, repeat: -1, ease: 'none', svgOrigin: '200 200' })

        // Scroll parallax
        const scrub = { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true }
        gsap.to('.hero-text', { yPercent: -4, ease: 'none', scrollTrigger: scrub })
        gsap.to('.hero-visual', { yPercent: -8, ease: 'none', scrollTrigger: { ...scrub } })
      })

      // Mouse parallax: photo drifts with the cursor, orb moves the other way.
      mm.add('(prefers-reduced-motion: no-preference) and (pointer: fine)', () => {
        const section = ref.current
        const visual = section?.querySelector('.hero-visual')
        if (!section || !visual) return
        const cutoutX = gsap.quickTo('.hero-cutout', 'x', { duration: 0.8, ease: 'power3.out' })
        const orbX = gsap.quickTo('.hero-orb', 'x', { duration: 1.2, ease: 'power3.out' })
        const orbY = gsap.quickTo('.hero-orb', 'y', { duration: 1.2, ease: 'power3.out' })
        const onMove = (e: MouseEvent) => {
          const r = visual.getBoundingClientRect()
          const dx = (e.clientX - (r.left + r.width / 2)) / window.innerWidth
          const dy = (e.clientY - (r.top + r.height / 2)) / window.innerHeight
          cutoutX(dx * 14)
          orbX(dx * -40)
          orbY(dy * -30)
        }
        section.addEventListener('mousemove', onMove)
        return () => section.removeEventListener('mousemove', onMove)
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className="gutter relative isolate pt-[clamp(48px,7vw,96px)] pb-[clamp(48px,6vw,80px)]">
      <DotField />
      {/* Background glow blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[6%] right-[4%] -z-10 aspect-square w-[min(520px,70vw)] rounded-full bg-blob-a blur-[70px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 -z-10 aspect-square w-[min(420px,60vw)] rounded-full bg-blob-b blur-[70px]"
      />

      <Container className="grid items-center gap-x-16 gap-y-12 min-[901px]:grid-cols-[minmax(0,1.3fr)_minmax(0,.85fr)] min-[901px]:items-start">
        <div className="hero-text min-w-0">
          <span className="hero-fade inline-flex items-center gap-2.5 rounded-full border border-line bg-surface py-1.5 pr-3.5 pl-3 font-mono text-[13px] text-muted">
            <PulseDot />
            <span>{t.hero.status}</span>
          </span>

          <h1 className="mt-6 font-display wdth-122 text-[clamp(40px,6vw,86px)] leading-[.92] font-black tracking-[-.035em]">
            {t.hero.lines.map((line, i) => (
              <span key={i} className="block overflow-hidden pb-[.04em]">
                <span className={cn('hero-line block', i === 2 && 'inline-block text-gradient')}>{line}</span>
              </span>
            ))}
          </h1>

          <div className="mt-7 grid max-w-[60ch] gap-3.5">
            <p className="hero-fade text-[clamp(18px,1.7vw,21px)] leading-normal font-medium text-fg">{lead}</p>
            {paragraphs.map((paragraph, i) => (
              <p key={i} className="hero-fade text-[16.5px] text-muted">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="hero-fade mt-7 grid grid-cols-3 border-t border-line">
            {facts.map((fact, i) => (
              <div key={i} className="grid gap-1 pt-5 pr-5 max-[420px]:pr-2.5">
                <Counter
                  value={fact.value}
                  suffix={fact.suffix}
                  className="font-display wdth-120 text-[clamp(34px,4vw,48px)] leading-none font-black text-accent tabular-nums [text-shadow:var(--glow)]"
                />
                <span className="text-sm leading-[1.4] text-muted">{t.about.facts[i]}</span>
              </div>
            ))}
          </div>

          <div className="hero-fade mt-[30px] flex flex-wrap gap-3">
            <Button href="#work" variant="primary">
              <span>{t.hero.ctaWork}</span>
              <ArrowRightIcon />
            </Button>
            <Button href="#contact">{t.hero.ctaContact}</Button>
          </div>
        </div>

        <HeroPortrait />
      </Container>
    </section>
  )
}
