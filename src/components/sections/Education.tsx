import { useLanguage } from '../../context/LanguageContext'
import type { CardEntry } from '../../i18n/types'
import { Label } from '../ui/Label'
import { Section } from '../ui/Section'
import { SectionHeader } from '../ui/SectionHeader'
import { Timeline } from '../ui/Timeline'

function Card({ label, title, desc }: CardEntry) {
  return (
    <div className="reveal grid content-start gap-2 rounded-[14px] border border-line bg-surface p-[22px]">
      <Label>{label}</Label>
      <h3 className="text-lg">{title}</h3>
      <p className="text-[15px] leading-normal text-muted">{desc}</p>
    </div>
  )
}

export function Education() {
  const { t } = useLanguage()

  return (
    <Section id="education" flushTop>
      <SectionHeader label={t.education.label} title={t.education.title} />
      <Timeline entries={t.education.entries} />
      <div className="mt-10 grid gap-4 xs:grid-cols-2 xl:grid-cols-4">
        {t.education.cards.map((card) => (
          <Card key={card.title} {...card} />
        ))}
      </div>
    </Section>
  )
}
