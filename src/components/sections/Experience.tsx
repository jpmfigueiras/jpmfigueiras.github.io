import { useLanguage } from '../../context/LanguageContext'
import { Section } from '../ui/Section'
import { SectionHeader } from '../ui/SectionHeader'
import { Timeline } from '../ui/Timeline'

export function Experience() {
  const { t } = useLanguage()

  return (
    <Section id="experience" flushTop>
      <SectionHeader label={t.experience.label} title={t.experience.title} />
      <Timeline entries={t.experience.entries} rail />
    </Section>
  )
}
