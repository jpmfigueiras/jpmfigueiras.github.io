# Joel Figueiras — personal website

Personal site built with React, TypeScript, Vite and Tailwind CSS v4. Animations with GSAP.

Live at **https://jpmfigueiras.github.io**

## Run locally

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in dist/
npm run preview   # serve the production build
```

## Structure

```
src/
├── pages/            # Page components (Home)
├── components/
│   ├── layout/       # Header, Footer, ProgressBar
│   ├── sections/     # Hero, About, Architecture, Work, Experience, Education, Contact
│   └── ui/           # Reusable pieces: Button, Section, Timeline, Counter, toggles…
├── context/          # Theme (light/dark) and language (EN/PT) providers
├── i18n/             # Typed translations (locales/en.tsx, locales/pt.tsx)
├── data/             # Non-translated content: links, tech stack, projects, architecture
├── services/         # Browser helpers: storage, clipboard
├── hooks/            # Animation and media-query hooks
└── lib/              # GSAP setup, class-name helper
```

## Editing content

- **Text** lives in `src/i18n/locales/`. Both files share the `Translation` type, so a missing Portuguese key is a type error.
- **Links, tags and numbers** live in `src/data/`.
- **Colours** are CSS variables in `src/index.css` (light in `:root`, dark in `[data-theme='dark']`), exposed to Tailwind as `bg-surface`, `text-accent`, etc.

## Deploy

Every push to `main` builds the site and publishes it to GitHub Pages via `.github/workflows/deploy.yml`.
