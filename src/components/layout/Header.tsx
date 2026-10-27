import { useLanguage } from '../../context/LanguageContext'
import { site } from '../../data/site'
import { Container } from '../ui/Container'
import { LanguageToggle } from '../ui/LanguageToggle'
import { ThemeToggle } from '../ui/ThemeToggle'

export function Header() {
  const { t } = useLanguage()
  const [first, last] = site.name.split(' ')

  const links = [
    { href: '#about', label: t.nav.about },
    { href: '#work', label: t.nav.work },
    { href: '#experience', label: t.nav.experience },
    { href: '#contact', label: t.nav.contact },
  ]

  return (
    <header className="gutter sticky top-[env(safe-area-inset-top,0px)] z-50 border-b border-line bg-glass backdrop-blur-[14px]">
      <Container className="flex items-center justify-between gap-4 py-3.5">
        <a href="#top" className="font-display wdth-118 text-lg font-black tracking-[-.01em] text-fg no-underline">
          {first}
          <span className="text-accent-text">.</span>
          {last}
        </a>
        <nav aria-label={t.nav.main} className="flex items-center gap-2.5 md:gap-x-[26px] md:gap-y-[18px]">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hidden text-sm font-medium text-muted no-underline transition-colors hover:text-fg md:inline"
            >
              {link.label}
            </a>
          ))}
          <LanguageToggle />
          <ThemeToggle />
        </nav>
      </Container>
    </header>
  )
}
