import { site } from '../../data/site'
import { cn } from '../../lib/cn'
import { GitHubIcon, LinkedInIcon } from './icons'

const links = [
  { href: site.links.linkedin, label: 'LinkedIn', Icon: LinkedInIcon },
  { href: site.links.github, label: 'GitHub', Icon: GitHubIcon },
]

/** Round icon links to LinkedIn and GitHub. */
export function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={cn('flex gap-3', className)}>
      {links.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener"
          aria-label={label}
          title={label}
          className="grid size-11 place-items-center rounded-full border border-line bg-glass text-fg backdrop-blur-md transition-[color,border-color,box-shadow] duration-250 hover:border-accent hover:text-accent-text hover:shadow-glow"
        >
          <Icon className="size-[18px]" />
        </a>
      ))}
    </div>
  )
}
