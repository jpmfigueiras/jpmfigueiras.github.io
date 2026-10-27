export type ProjectId = 'fanzone' | 'mobileLogistic' | 'trading'

export interface Project {
  id: ProjectId
  /** Big number on the left. A number counts up on scroll; a string is shown as-is. */
  stat: { value: number; suffix?: string } | string
  tags: string[]
}

export const projects: Project[] = [
  {
    id: 'fanzone',
    stat: { value: 10, suffix: '+' },
    tags: ['React', 'TanStack Query', 'Tailwind v4', 'Flask', 'MySQL', 'Redis', 'Azure'],
  },
  { id: 'mobileLogistic', stat: '0→1', tags: ['Kotlin', 'Android', 'C#', 'Microservices'] },
  { id: 'trading', stat: 'ATR', tags: ['Python', 'Data pipelines'] },
]
