import { useLanguage } from '../../context/LanguageContext'
import { useTheme } from '../../context/ThemeContext'
import { MoonIcon, SunIcon } from './icons'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const { t } = useLanguage()
  const Icon = theme === 'dark' ? MoonIcon : SunIcon

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={t.nav.theme}
      aria-pressed={theme === 'dark'}
      className="grid size-[34px] shrink-0 cursor-pointer place-items-center rounded-full border-0 bg-transparent text-fg transition-colors hover:bg-surface-2 focus-visible:outline-accent"
    >
      <Icon className="size-[17px]" />
    </button>
  )
}
