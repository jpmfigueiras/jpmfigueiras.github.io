import { useLanguage } from '../../context/LanguageContext'
import { site } from '../../data/site'
import { Container } from '../ui/Container'

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="gutter bg-bg text-muted">
      <Container className="flex flex-wrap justify-between gap-2 pt-[22px] pb-9 text-[13px]">
        <span>
          © {new Date().getFullYear()} {site.name}
        </span>
        <span>{t.footer.off}</span>
      </Container>
    </footer>
  )
}
