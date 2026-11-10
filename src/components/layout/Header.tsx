import { useLayoutEffect, useRef, useState } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { site } from '../../data/site'
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsap'
import { cn } from '../../lib/cn'
import { LanguageToggle } from '../ui/LanguageToggle'
import { ThemeToggle } from '../ui/ThemeToggle'

/** Sections tracked by the scrollspy. The hero (#top) has no active link. */
const SPY_SECTIONS = ['work', 'experience', 'contact'] as const
type SectionId = (typeof SPY_SECTIONS)[number]

const initials = site.name
  .split(' ')
  .map((word) => word[0])
  .join('')

/** Floating capsule navbar with a scrollspy pill behind the active link. */
export function Header() {
  const { t, lang } = useLanguage()
  const ref = useRef<HTMLElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const pillRef = useRef<HTMLLIElement>(null)
  const [active, setActive] = useState<SectionId | null>(null)

  const links: { href: string; id: SectionId | null; label: string }[] = [
    { href: '#top', id: null, label: t.nav.about },
    { href: '#work', id: 'work', label: t.nav.work },
    { href: '#experience', id: 'experience', label: t.nav.experience },
    { href: '#contact', id: 'contact', label: t.nav.contact },
  ]

  const { contextSafe } = useGSAP(
    () => {
      // Entrance, in sync with the hero intro.
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.nav-capsule', { y: -30, opacity: 0, duration: 1, ease: 'expo.out' })

        // Hide on scroll down, show on scroll up. play() hides, reverse() shows.
        // Uses yPercent so it doesn't fight the entrance tween (which uses y).
        const hide = gsap.to('.nav-capsule', {
          yPercent: -140,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.inOut',
          paused: true,
        })

        // Only react after scrolling TOLERANCE px in the same direction, so small jitters don't toggle it.
        const TOLERANCE = 24
        let last = 0
        let turn = 0 // scroll position where the direction last changed
        let dir = 0
        ScrollTrigger.create({
          start: 0,
          end: 'max',
          onUpdate: (self) => {
            const y = self.scroll()
            const step = Math.sign(y - last)
            if (step !== 0 && step !== dir) {
              dir = step
              turn = last
            }
            last = y

            if (y < 80) hide.reverse()
            else if (dir === 1 && y - turn > TOLERANCE) hide.play()
            else if (dir === -1 && turn - y > TOLERANCE) hide.reverse()
          },
        })

        // Keyboard users tabbing into a hidden navbar should see it.
        const capsule = ref.current?.querySelector('.nav-capsule')
        const show = () => hide.reverse()
        capsule?.addEventListener('focusin', show)
        return () => capsule?.removeEventListener('focusin', show)
      })

      // Scrollspy: a section is active while it crosses the middle of the viewport.
      SPY_SECTIONS.forEach((id) => {
        const section = document.getElementById(id)
        if (!section) return
        ScrollTrigger.create({
          trigger: section,
          start: 'top 50%',
          end: 'bottom 50%',
          // Only clear the active section if it is still ours (neighbours toggle at the same time).
          onToggle: (self) => setActive((current) => (self.isActive ? id : current === id ? null : current)),
        })
      })
    },
    { scope: ref },
  )

  // Move the pill behind the active link. Re-measure on resize and language change (link widths change).
  useLayoutEffect(() => {
    const list = listRef.current
    const pill = pillRef.current
    if (!list || !pill) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const place = contextSafe((animate: boolean) => {
      const link = active ? list.querySelector<HTMLElement>(`[data-section="${active}"]`) : null
      if (!link) {
        if (animate && !reduceMotion) gsap.to(pill, { opacity: 0, duration: 0.3, overwrite: true })
        else gsap.set(pill, { opacity: 0, overwrite: true })
        return
      }
      const target = { x: link.offsetLeft, width: link.offsetWidth }
      // Coming back from hidden: jump into place and just fade in, instead of sliding from the left.
      if (gsap.getProperty(pill, 'opacity') === 0) gsap.set(pill, target)
      if (animate && !reduceMotion) {
        gsap.to(pill, { ...target, opacity: 1, duration: 0.45, ease: 'power3.out', overwrite: true })
      } else {
        gsap.set(pill, { ...target, opacity: 1, overwrite: true })
      }
    })

    place(true)

    // ResizeObserver fires once on observe; skip it so it doesn't cut the animation above.
    let first = true
    const observer = new ResizeObserver(() => {
      if (first) {
        first = false
        return
      }
      place(false)
    })
    observer.observe(list)
    return () => observer.disconnect()
  }, [active, lang, contextSafe])

  return (
    <header
      ref={ref}
      className="pointer-events-none fixed inset-x-0 top-[calc(env(safe-area-inset-top,0px)+14px)] z-50 flex justify-center"
    >
      <nav
        aria-label={t.nav.main}
        className="nav-capsule pointer-events-auto flex max-w-[calc(100%-32px)] items-center gap-1.5 rounded-full border border-line-2 bg-glass p-1.5 shadow-[0_8px_30px_rgba(0,0,0,.12)] backdrop-blur-[16px] backdrop-saturate-[1.4]"
      >
        <a
          href="#top"
          aria-label={site.name}
          className="grid size-[34px] shrink-0 place-items-center rounded-full bg-fg font-display text-[13px] font-extrabold text-bg no-underline focus-visible:outline-accent"
        >
          {initials}
        </a>

        <ul ref={listRef} className="relative m-0 flex list-none items-center p-0 max-[720px]:hidden">
          <li
            ref={pillRef}
            aria-hidden="true"
            className="absolute top-0 left-0 z-0 h-full rounded-full border border-line-2 bg-surface-2 opacity-0"
          />
          {links.map((link) => {
            const isActive = link.id !== null && link.id === active
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  data-section={link.id ?? undefined}
                  aria-current={isActive ? 'location' : undefined}
                  className={cn(
                    'relative z-1 block rounded-full px-3.5 py-[7px] text-sm leading-[1.4] font-medium whitespace-nowrap no-underline transition-colors hover:text-fg focus-visible:outline-accent',
                    isActive ? 'text-fg' : 'text-muted',
                  )}
                >
                  {link.label}
                </a>
              </li>
            )
          })}
        </ul>

        <span aria-hidden="true" className="h-5 w-px shrink-0 bg-line-2 max-[720px]:hidden" />

        <LanguageToggle />
        <ThemeToggle />
      </nav>
    </header>
  )
}
