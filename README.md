# Birthday Card Website

One landscape birthday card per friend, each with its own art, message and
activity. Static site, hosted free on GitHub Pages.

```
https://<user>.github.io/Birthday-Card-Website/#/11        ← by person id
https://<user>.github.io/Birthday-Card-Website/#/vimean    ← slug also works
```

Hash routing is deliberate: GitHub Pages serves static files only, so `/11`
would 404. `#/11` never reaches the server.

---

## Adding a new person — 4 steps

**1. Data.** Add a row to `src/Utils/data/BirthdayCard.csv`, then:
```bash
node src/Utils/CSV-To-JSON.js
```
Ids are assigned in **submission order**, so appending a new person never
renumbers anyone. Check the new id in `Birthday.json`.

**2. Assets.** `src/assets/<id>/` — images plus an `index.js`:
```js
import hero from './hero.webp'
export default { hero }
```

**3. Card.** `src/cards/<id>/`
| File | Job |
|---|---|
| `index.jsx` | composes the card |
| `Scene.jsx` | the background artwork |
| `Message.jsx` | the note |
| `Activity.jsx` | the game/activity |

**4. Register** the id in `src/cards/index.js`.

Not registered? They still get a working `DefaultCard`.

---

## Structure

```
src/
├── assets/<id>/         per-person images (+ originals/)
├── components/          shared shell — reused by every card
│   ├── Background.jsx   background layer, draws Border on top
│   ├── Border.jsx       inner hairline + 4 corner brackets
│   ├── Button.jsx       action button + ButtonDock
│   ├── Interactive.jsx  the window that opens over a dimmed card
│   ├── Warning.jsx      portrait "turn your phone" gate
│   └── CardLayout.jsx   composes all of the above
├── games/               reusable, person-agnostic
│   └── CatchGame.jsx    props: art, items, goodScore, accent, labels
├── cards/               per-person cards + the registry
├── styles/app.css       Tailwind + design tokens + shared keyframes
└── Utils/               CSV -> JSON pipeline
```

`components/` and `games/` know nothing about any specific person. Everything
person-specific lives in `assets/<id>/` and `cards/<id>/`.

---

## Styling

Tailwind v4, via `@tailwindcss/vite`. **There are no per-component CSS files** —
everything is utilities. The one stylesheet, `src/styles/app.css`, holds:

- **Design tokens** in `@theme`. Add `--color-x` once and `bg-x` / `text-x` /
  `border-x` all work: `hachi`, `blush`, `ink`, `cream`, `basket`, `sky-top`,
  `sky-mid`, `sky-low`, `hill-back`, `hill-front`.
- **Shared animations**, also tokens: `animate-drift`, `animate-twinkle`,
  `animate-breathe`, `animate-bob`, `animate-float`, `animate-plus`,
  `animate-pop`, `animate-fade`, `animate-tip`, `animate-rise`,
  `animate-settle`.

A new card reuses those and normally needs no CSS at all. Per-card accent
colours are passed as a prop, so one theme never leaks into another.

---

## Run

```bash
npm install
npm run dev      # http://localhost:5173/Birthday-Card-Website/#/11
npm run build
```

`vite.config.js` sets `base: '/Birthday-Card-Website/'` — it must match the
repo name or every asset 404s on Pages.

---

## Assets

Imported from `src/assets/` (not `public/`), so Vite hashes and cache-busts
them, and a missing file is a build error instead of a silent 404 on a live
card. Ship `.webp`; `originals/` holds the full-size PNG masters.
