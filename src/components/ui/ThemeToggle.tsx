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
      className="grid size-9 cursor-pointer place-items-center rounded-full border border-line bg-surface text-fg"
    >
      <Icon className="size-[17px]" />
    </button>
  )
}
