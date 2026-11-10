import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { Container } from './Container'

interface SectionProps {
  id?: string
  /** Removes top padding when the previous section already provides the spacing. */
  flushTop?: boolean
  children: ReactNode
}

export function Section({ id, flushTop, children }: SectionProps) {
  return (
    <section id={id} className={cn('gutter py-[clamp(64px,9vw,120px)]', flushTop && 'pt-0!')}>
      <Container>{children}</Container>
    </section>
  )
}
