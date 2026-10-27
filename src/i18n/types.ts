import type { ReactNode } from 'react'
import type { ProjectId } from '../data/projects'

export type Language = 'en' | 'pt'

export interface TimelineEntry {
  when: string
  title: string
  org: string
  desc?: string
  stamp?: string
}

export interface CardEntry {
  label: string
  title: string
  desc: string
}

export interface ProjectText {
  stat: string
  title: string
  desc: string
  bullets?: ReactNode[]
}

export interface Translation {
  nav: { about: string; work: string; experience: string; contact: string; language: string; theme: string; main: string }
  hero: { status: string; lines: [string, string, string]; lede: ReactNode; ctaWork: string; ctaContact: string }
  about: { label: string; title: string; paragraphs: string[]; facts: [string, string, string]; portraitAlt: string }
  stack: {
    label: string
    title: string
    layer: string
    theme: string
    auth: string
    infra: string
    tag: string
    caption: string
    tableLabel: string
  }
  work: { label: string; title: string; projects: Record<ProjectId, ProjectText> }
  experience: { label: string; title: string; entries: TimelineEntry[] }
  education: { label: string; title: string; entries: TimelineEntry[]; cards: CardEntry[] }
  contact: { label: string; title: string; sub: string; copy: string; copied: string }
  footer: { off: string }
}
