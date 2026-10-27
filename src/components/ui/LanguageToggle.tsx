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
      className="inline-flex rounded-full border border-line bg-surface p-[3px]"
    >
      {LANGUAGES.map((code) => (
        <button
          key={code}
          type="button"
          aria-pressed={lang === code}
          onClick={() => change(code)}
          className={cn(
            'cursor-pointer rounded-full border-0 px-[11px] py-[5px] font-mono text-xs font-medium uppercase tracking-[.06em]',
            lang === code ? 'bg-fg text-bg' : 'bg-transparent text-muted',
          )}
        >
          {code}
        </button>
      ))}
    </div>
  )
}
