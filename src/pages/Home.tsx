import { useEffect, useRef } from 'react'
import { About } from '../components/sections/About'
import { Architecture } from '../components/sections/Architecture'
import { Contact } from '../components/sections/Contact'
import { Education } from '../components/sections/Education'
import { Experience } from '../components/sections/Experience'
import { Hero } from '../components/sections/Hero'
import { Marquee } from '../components/sections/Marquee'
import { Work } from '../components/sections/Work'
import { useLanguage } from '../context/LanguageContext'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { ScrollTrigger } from '../lib/gsap'

export function Home() {
  const ref = useRef<HTMLElement>(null)
  const { lang } = useLanguage()

  useScrollReveal(ref)

  // Text length changes between languages, so scroll trigger positions must be recalculated.
  useEffect(() => {
    ScrollTrigger.refresh()
  }, [lang])

  return (
    <main id="top" ref={ref}>
      <Hero />
      <Marquee />
      <About />
      <Architecture />
      <Work />
      <Experience />
      <Education />
      <Contact />
    </main>
  )
}
