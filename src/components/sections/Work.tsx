import { useLanguage } from '../../context/LanguageContext'
import { projects, type Project } from '../../data/projects'
import type { ProjectText } from '../../i18n/types'
import { Counter } from '../ui/Counter'
import { Label } from '../ui/Label'
import { Section } from '../ui/Section'
import { SectionHeader } from '../ui/SectionHeader'
import { TagList } from '../ui/Tag'

const statClass =
  'font-display wdth-120 text-[clamp(44px,5vw,64px)] leading-[.95] font-black text-accent tabular-nums [text-shadow:var(--glow)]'

function ProjectCard({ project, text }: { project: Project; text: ProjectText }) {
  return (
    <article className="reveal grid gap-x-10 gap-y-5 rounded-[18px] border border-line bg-surface p-[clamp(24px,3.4vw,44px)] transition-[border-color,box-shadow] duration-300 hover:border-accent hover:shadow-glow md:grid-cols-[200px_minmax(0,1fr)]">
      <div className="grid content-start gap-1.5">
        {typeof project.stat === 'string' ? (
          <span className={statClass}>{project.stat}</span>
        ) : (
          <Counter value={project.stat.value} suffix={project.stat.suffix} className={statClass} />
        )}
        <Label>{text.stat}</Label>
      </div>

      <div className="grid min-w-0 gap-3.5">
        <h3>{text.title}</h3>
        <p className="max-w-[64ch] text-muted">{text.desc}</p>
        {text.bullets && (
          <ul className="m-0 grid list-none gap-2.5 p-0">
            {text.bullets.map((bullet, i) => (
              <li
                key={i}
                className="relative max-w-[70ch] pl-[22px] before:absolute before:top-[.72em] before:left-0 before:h-0.5 before:w-2.5 before:bg-accent"
              >
                {bullet}
              </li>
            ))}
          </ul>
        )}
        <TagList tags={project.tags} />
      </div>
    </article>
  )
}

export function Work() {
  const { t } = useLanguage()

  return (
    <Section id="work" flushTop>
      <SectionHeader label={t.work.label} title={t.work.title} />
      <div className="grid gap-5">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} text={t.work.projects[project.id]} />
        ))}
      </div>
    </Section>
  )
}
