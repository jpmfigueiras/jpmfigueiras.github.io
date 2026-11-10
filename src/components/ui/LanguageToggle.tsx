import { useLanguage } from '../../context/LanguageContext'
import { useReducedMotion } from '../../hooks/useMediaQuery'
import type { Language } from '../../i18n'
import { gsap } from '../../lib/gsap'
import { cn } from '../../lib/cn'

const LANGUAGES: Language[] = ['en', 'pt']

export function LanguageToggle() {
  const { lang, setLang, t } = useLanguage()
  const reduceMotion = useReducedMotion()

  const change = (next: Language) => {
    if (next === lang) return
    if (reduceMotion) return setLang(next)
    // Fade the page out, swap the text, fade back in.
    gsap.to('main, footer', {
      opacity: 0,
      duration: 0.18,
      onComplete: () => {
        setLang(next)
        gsap.to('main, footer', { opacity: 1, duration: 0.3 })
      },
    })
  }

  return (
    <div
      role="group"
      aria-label={t.nav.language}
      className="inline-flex shrink-0 items-center gap-0.5"
    >
      {LANGUAGES.map((code) => (
        <button
          key={code}
          type="button"
          aria-pressed={lang === code}
          onClick={() => change(code)}
          className={cn(
            'cursor-pointer rounded-full border-0 px-2.5 py-1.5 font-mono text-[11.5px] leading-none font-medium uppercase tracking-[.06em] transition-colors focus-visible:outline-accent',
            lang === code
              ? 'bg-surface-2 text-fg shadow-[inset_0_0_0_1px_var(--line-2)]'
              : 'bg-transparent text-muted hover:text-fg',
          )}
        >
          {code}
        </button>
      ))}
    </div>
  )
}
