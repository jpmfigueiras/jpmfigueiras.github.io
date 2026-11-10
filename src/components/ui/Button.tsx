import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { useMagnetic } from '../../hooks/useMagnetic'
import { cn } from '../../lib/cn'

type Variant = 'primary' | 'outline'
/** `vivid` is for buttons placed on the orange/purple gradient (contact section). */
type Tone = 'default' | 'vivid'

interface CommonProps {
  variant?: Variant
  tone?: Tone
  magnetic?: boolean
  className?: string
  children: ReactNode
}

type LinkProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
type NativeButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }

const base =
  'inline-flex items-center gap-2.5 rounded-full border px-[22px] py-[13px] font-body text-[15px] font-semibold no-underline cursor-pointer transition-colors duration-250 [&_svg]:size-4'

const styles: Record<Tone, Record<Variant, string>> = {
  default: {
    outline: 'border-fg bg-transparent text-fg hover:bg-fg hover:text-bg',
    primary: 'border-accent bg-accent text-accent-ink shadow-glow hover:border-fg hover:bg-fg hover:text-bg',
  },
  vivid: {
    outline: 'border-on-vivid bg-transparent text-on-vivid hover:bg-on-vivid hover:text-ink',
    primary: 'border-on-vivid bg-on-vivid text-ink hover:bg-transparent hover:text-on-vivid',
  },
}

export function Button(props: LinkProps | NativeButtonProps) {
  const { variant = 'outline', tone = 'default', magnetic = true, className, children, ...rest } = props
  const ref = useMagnetic<HTMLAnchorElement & HTMLButtonElement>()
  const classes = cn(base, styles[tone][variant], className)
  const magneticRef = magnetic ? ref : undefined

  if (rest.href !== undefined) {
    return (
      <a ref={magneticRef} className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    )
  }
  return (
    <button
      ref={magneticRef}
      type="button"
      className={classes}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  )
}
