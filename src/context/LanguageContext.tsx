import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { storage } from '../services/storage'
import { translations, type Language, type Translation } from '../i18n'

interface LanguageContextValue {
  lang: Language
  setLang: (lang: Language) => void
  t: Translation
}

const STORAGE_KEY = 'jf-lang'
const LanguageContext = createContext<LanguageContextValue | null>(null)

function initialLanguage(): Language {
  const saved = storage.get(STORAGE_KEY)
  if (saved === 'en' || saved === 'pt') return saved
  return navigator.language.toLowerCase().startsWith('pt') ? 'pt' : 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(initialLanguage)

  useEffect(() => {
    document.documentElement.lang = lang
    storage.set(STORAGE_KEY, lang)
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider')
  return ctx
}
