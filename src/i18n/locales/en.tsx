import type { Translation } from '../types'

export const en: Translation = {
  nav: {
    about: 'About',
    work: 'Work',
    experience: 'Experience',
    contact: 'Contact',
    language: 'Language',
    theme: 'Toggle dark mode',
    main: 'Main',
  },
  hero: {
    status: 'Available · Braga, PT · UTC+0',
    lines: ['I build', 'shared platforms.', 'Now I secure them.'],
    lede: (
      <>
        Full-stack developer with <strong>3 years as the sole web engineer</strong> of a sports-tech platform used by
        10+ football clubs. Currently doing an MSc in Cybersecurity, moving toward application security.
      </>
    ),
    ctaWork: 'See my work',
    ctaContact: 'Get in touch',
  },
  about: {
    label: 'About me',
    title: 'Methodical by trade, curious by nature.',
    paragraphs: [
      "I'm Joel, a full-stack developer from Braga, Portugal. I care about software that holds up under real traffic and real attackers.",
      "I came to software from an unusual place. For five years I inspected vehicles, where you follow the checklist and never approve what you haven't checked. I still work that way.",
      "Since then I've built an Android app from scratch, written C# microservices, and spent three years as the only web developer at PluggableAi, owning everything from the React front end to the Azure deployment. The part I enjoyed most was asking what could go wrong, so I'm now doing a master's in cybersecurity.",
      'Next, I want to work abroad with people who push me, grow into application security and, in time, security architecture.',
    ],
    facts: ['football clubs on my platform', 'years as sole web developer', 'years inspecting vehicles'],
    portraitAlt: 'Joel Figueiras',
  },
  stack: {
    label: 'Architecture',
    title: 'One codebase, many clubs, one boundary that matters.',
    layer: 'Layer',
    theme: 'theme tokens',
    auth: 'tenant-scoped auth',
    infra: 'shared · stateless · autoscaled',
    tag: 'Trust boundary',
    caption:
      'Each club gets its own branding and its own database schema while sharing one API and one autoscaled deployment. Every request has to prove which tenant it belongs to before it touches data.',
    tableLabel: 'Platform layers by tenant',
  },
  work: {
    label: 'Selected work',
    title: 'Things I built and shipped.',
    projects: {
      fanzone: {
        stat: 'clubs in production',
        title: 'FanZone — fan engagement platform',
        desc: 'Multi-tenant web app and back office for football clubs, including Portuguese clubs and CD Leganés. Fans follow live match events and vote for the Fan of the Match; clubs run everything from the back office.',
        bullets: [
          <>
            Designed a per-club design system from scratch: semantic colour roles as CSS custom properties with
            Tailwind v4 <code>@theme</code>, refactored across 30+ files.
          </>,
          'Migrated data fetching to TanStack Query with a central query layer, removing a class of stale-data and cache-invalidation bugs.',
          'Chose adaptive polling over WebSockets for live events, to fit a stateless, horizontally scaled Azure deployment.',
          'Made the server the single source of truth for event state and fixed timezone bugs with ISO 8601 offsets from the API.',
          "Built the bridge between the web app and the clubs' native mobile shells for in-app navigation.",
        ],
      },
      mobileLogistic: {
        stat: 'built from scratch',
        title: 'Mobile Logistic — Android app',
        desc: 'A logistics app for Android, written in Kotlin at Wave Solutions and piloted with client companies, backed by microservices I wrote in C#.',
      },
      trading: {
        stat: 'position sizing',
        title: 'Trading decision engine — side project',
        desc: 'A modular Python engine that supports trading decisions instead of trading on its own: pluggable data sources, indicators, weighted signal scoring and volatility-based position sizing.',
      },
    },
  },
  experience: {
    label: 'Experience',
    title: "Where I've worked.",
    entries: [
      {
        when: '2023 — 2026',
        title: 'Full-stack Web Developer',
        org: 'PluggableAi · sole web developer',
        desc: 'Owned the web platform end to end: front end, API, multi-schema database, Azure deployment and autoscaling. Applied OWASP practices to authentication and authorisation across tenants.',
      },
      {
        when: 'Before 2023',
        title: 'Software Developer',
        org: 'Wave Solutions',
        desc: 'Built the Mobile Logistic Android app in Kotlin and the C# microservices behind it.',
      },
      { when: 'Before 2023', title: 'Full-stack Developer (internship)', org: '4Dev' },
      {
        when: '2016 — 2021',
        title: 'Vehicle Inspector',
        org: 'CTIB Braga',
        desc: 'Five years of methodical inspection, where a missed defect has real consequences. The same habit I bring to code review and threat modelling.',
        stamp: 'Inspected · Approved',
      },
    ],
  },
  education: {
    label: 'Education & security',
    title: 'From building systems to defending them.',
    entries: [
      {
        when: '2025 — now',
        title: 'MSc Cybersecurity',
        org: 'Instituto Politécnico de Viana do Castelo',
        desc: 'Coursework includes designing an ISO 27001 information security management system. Thesis in preparation on the security of IoT and distributed infrastructure.',
      },
      {
        when: "Bachelor's",
        title: 'BSc Computer Systems Engineering',
        org: 'IPCA — Instituto Politécnico do Cávado e do Ave',
      },
    ],
    cards: [
      {
        label: 'Applied',
        title: 'Tenant isolation',
        desc: 'Auth, authorisation and data separation in a production multi-tenant system.',
      },
      {
        label: 'Training',
        title: 'Web app security',
        desc: 'PortSwigger Web Security Academy labs and web-focused TryHackMe rooms.',
      },
      { label: 'Certification', title: 'CompTIA Security+', desc: 'Preparing for the exam.' },
      {
        label: 'Direction',
        title: 'Security architecture',
        desc: 'Designing systems that are secure by structure, not by patch.',
      },
    ],
  },
  contact: {
    label: 'Contact',
    title: "Let's build something secure.",
    sub: 'Open to full-stack and AppSec-leaning roles in Dubai, Switzerland, the UK and across Europe.',
    copy: 'Copy email',
    copied: 'Copied ✓',
  },
  footer: { off: 'Off the keyboard: padel, boxing, swimming.' },
}
