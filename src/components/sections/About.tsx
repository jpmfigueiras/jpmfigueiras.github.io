import { useLanguage } from '../../context/LanguageContext'
import { facts, site } from '../../data/site'
import { Counter } from '../ui/Counter'
import { Section } from '../ui/Section'
import { SectionHeader } from '../ui/SectionHeader'

export function About() {
  const { t } = useLanguage()
  const [intro, ...rest] = t.about.paragraphs

  return (
    <Section id="about">
      <SectionHeader label={t.about.label} title={t.about.title} />
      <div className="grid gap-x-10 gap-y-8 lg:grid-cols-[220px_minmax(0,1fr)]">
        <div className="reveal max-w-[260px] self-start rounded-[18px] bg-linear-150 from-accent to-signal p-[3px] shadow-glow lg:max-w-full">
          <img
            src={site.portrait}
            alt={t.about.portraitAlt}
            width={640}
            height={800}
            className="block aspect-[4/5] h-auto w-full rounded-[15px] object-cover"
          />
        </div>

        <div className="grid max-w-[64ch] gap-5 text-[clamp(17px,1.5vw,19px)]">
          <p className="reveal text-[clamp(21px,2.2vw,27px)] leading-[1.4] font-medium text-fg">{intro}</p>
          {rest.map((paragraph, i) => (
            <p key={i} className="reveal text-muted">
              {paragraph}
            </p>
          ))}

          <div className="reveal mt-3 grid grid-cols-3 border-t border-line">
            {facts.map((fact, i) => (
              <div key={i} className="grid gap-1 pt-5 pr-5">
                <Counter
                  value={fact.value}
                  suffix={fact.suffix}
                  className="font-display wdth-120 text-[clamp(34px,4vw,48px)] leading-none font-black text-accent tabular-nums [text-shadow:var(--glow)]"
                />
                <span className="text-sm leading-[1.4] text-muted">{t.about.facts[i]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
