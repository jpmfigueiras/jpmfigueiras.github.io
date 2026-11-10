import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

export function Label({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn('font-mono text-xs uppercase tracking-[.1em] text-muted', className)}>{children}</span>
}
