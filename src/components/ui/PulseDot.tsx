import { cn } from '../../lib/cn'

const tones = {
  ok: 'bg-ok after:border-ok',
  signal: 'bg-signal after:border-signal',
}

/** Small dot with a pulsing ring (status indicators). */
export function PulseDot({ tone = 'ok' }: { tone?: keyof typeof tones }) {
  return (
    <span
      className={cn(
        'relative size-2 shrink-0 rounded-full after:absolute after:-inset-1 after:animate-ring after:rounded-full after:border-2 after:opacity-50 motion-reduce:after:animate-none',
        tones[tone],
      )}
    />
  )
}
