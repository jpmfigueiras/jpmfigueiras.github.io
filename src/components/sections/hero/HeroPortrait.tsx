import { useLanguage } from '../../../context/LanguageContext'
import { site } from '../../../data/site'
import { PulseDot } from '../../ui/PulseDot'
import { SocialLinks } from '../../ui/SocialLinks'

/**
 * Cutout photo over a blurred rotating orb and two dashed rings, with social links below.
 * Class names prefixed with `hero-` are animation hooks used by Hero.tsx.
 */
export function HeroPortrait() {
  const { t } = useLanguage()

  return (
    <div className="min-w-0 max-[900px]:-order-1 min-[901px]:mt-[clamp(24px,4vw,56px)]">
      {/* Photo and links move together in the scroll parallax. */}
      <div className="hero-visual ml-auto w-full max-w-[480px] max-[900px]:mx-auto max-[900px]:max-w-[300px] max-[420px]:max-w-[250px]">
        <div className="relative aspect-[640/897]">
          <div
            aria-hidden="true"
            className="hero-orb absolute top-[42%] left-1/2 aspect-square w-[92%] max-w-full -translate-1/2 rounded-full bg-[conic-gradient(from_0deg,var(--accent),var(--signal),#ff2e88,var(--accent))] opacity-38 blur-[46px] dark:opacity-55"
          />
          <svg
            viewBox="0 0 400 400"
            aria-hidden="true"
            className="absolute top-[42%] left-1/2 w-[108%] max-w-none -translate-1/2 overflow-visible"
          >
            <circle
              className="hero-ring hero-ring-1 stroke-signal opacity-70"
              cx="200"
              cy="200"
              r="188"
              fill="none"
              strokeWidth="1.2"
              strokeDasharray="2 10"
            />
            <circle
              className="hero-ring hero-ring-2 stroke-accent opacity-85"
              cx="200"
              cy="200"
              r="150"
              fill="none"
              strokeWidth="1.5"
              strokeDasharray="60 18 4 18"
            />
          </svg>
          <img
            src={site.cutout}
            alt={t.about.portraitAlt}
            width={640}
            height={897}
            className="hero-cutout relative block h-auto w-full drop-shadow-[0_20px_40px_rgba(0,0,0,.25)] [mask-image:linear-gradient(to_bottom,#000_72%,transparent_98%)]"
          />

          <span className="hero-fade absolute bottom-[22%] -left-2.5 z-2 inline-flex items-center gap-2.5 rounded-full border border-line bg-glass px-3.5 py-2 font-mono text-[12.5px] text-fg backdrop-blur-md max-[900px]:bottom-[6%] max-[900px]:left-1/2 max-[900px]:-translate-x-1/2 max-[900px]:whitespace-nowrap">
            <PulseDot tone="signal" />
            <span>{t.hero.tag}</span>
          </span>
        </div>

        <SocialLinks className="hero-fade relative z-2 mt-4 justify-center" />
      </div>
    </div>
  )
}
