import { en } from './locales/en'
import { pt } from './locales/pt'
import type { Language, Translation } from './types'

export const translations: Record<Language, Translation> = { en, pt }
export type { Language, Translation } from './types'
