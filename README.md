# Joel Figueiras — personal website

Static site: HTML + CSS + vanilla JS, animations with GSAP (loaded from CDN).

## Structure
- `index.html` — page markup, English text
- `assets/css/style.css` — design tokens (light/dark) and styles
- `assets/js/i18n.js` — Portuguese translations (`data-i18n` keys)
- `assets/js/main.js` — theme toggle, language toggle, GSAP animations
- `assets/img/joel.jpg` — portrait

## Run locally
Open the folder in VS Code and use the **Live Server** extension (right-click `index.html` → Open with Live Server).

## Adding text
1. Add `data-i18n="section.key"` to the element in `index.html` (English text inside).
2. Add the same key with the Portuguese text in `assets/js/i18n.js`.
