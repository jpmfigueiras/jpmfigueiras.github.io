import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { site } from '../../data/site'
import { copyText } from '../../services/clipboard'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { Label } from '../ui/Label'

export function Contact() {
  const { t } = useLanguage()
  const mailRef = useRef<HTMLSpanElement>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 1600)
    return () => clearTimeout(timer)
  }, [copied])

  const handleCopy = async () => {
    if (await copyText(site.email, mailRef.current)) setCopied(true)
  }

  return (
    <section id="contact" className="gutter bg-linear-135 from-signal to-accent text-on-vivid">
      <Container className="grid gap-8 py-[clamp(72px,10vw,130px)]">
        <Label className="text-on-vivid opacity-65">{t.contact.label}</Label>
        <h2 className="reveal text-[clamp(40px,8vw,104px)] leading-[.95] text-on-vivid">{t.contact.title}</h2>
        <p className="reveal max-w-[56ch] text-lg opacity-80">{t.contact.sub}</p>

        <div className="reveal flex flex-wrap items-center gap-3">
          <span ref={mailRef} className="font-mono text-[clamp(16px,2.2vw,22px)] wrap-anywhere select-all">
            {site.email}
          </span>
          <Button tone="vivid" onClick={handleCopy}>
            {copied ? t.contact.copied : t.contact.copy}
          </Button>
        </div>

        <div className="reveal flex flex-wrap gap-3">
          <Button href={site.links.linkedin} target="_blank" rel="noopener" variant="primary" tone="vivid">
            LinkedIn
          </Button>
          <Button href={site.links.github} target="_blank" rel="noopener" tone="vivid">
            GitHub
          </Button>
        </div>
      </Container>
    </section>
  )
}
