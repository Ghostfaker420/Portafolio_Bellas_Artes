# AGENTS.md — Portafolio Arte Urbano

## Active project

**`Portafolio_Summoner-main/`** is the working project.  
**`Respaldo/`** is a backup — do not edit it.  
Git root is `Portafolio_Bellas_Artes/`. All paths below are relative to `Portafolio_Summoner-main/`.

## Commands (run inside `Portafolio_Summoner-main/`)

```sh
npm run dev      # Vite dev server on port 5501
npm run build    # Production build to dist/
npm run preview  # Preview production build
```

No tests, no linter, no typechecker. No pre-commit hooks.

## Architecture

- **Single entry**: `index.html` → `css/main.css` + `js/app.js` (ES module, `<script type="module">`)
- **`package.json`**: `"type": "module"` (ESM project)
- **Vite config**: code-splits `vendor` chunk (three.js + panolens ~672 KB) from app code
- **Google Fonts** loaded via `<link media="print" onload="...">`: Rampart One, Poppins, Permanent Marker, Rubik Dirt
- **Font Awesome 6.0.0** via CDN (`cdnjs.cloudflare.com`)
- **Site**: static portfolio served from `dist/` after build

## Section order (nav order)

`#inicio` → `#sobre-mi` → `#curriculum` → `#proyectos` → `#galeria` → `#contacto`

Each `section[id]` must be unique. Move or resequence sections by editing `index.html`.

## Gallery tabs

6 collections, each a `.gallery-collection` with matching `id`:
`autorretratos`, `animaciones`, `carteles`, `personajes`, `ilustraciones`, `letras`

Tab buttons use `data-collection="{id}"`. Only one collection visible at a time (`.active` class).

## Data locations

- **Projects & 360° tours** → hardcoded in `js/app.js` (arrays `projects` and `tours`)
- **Stickers** → `images/Stickers Tanda 1/` and `images/Stickers Tanda 2/`
- **Images**: `images/` with subdirs per category (e.g. `Aurorretratos/`, `Carteles/`, `Animaciones/`, etc.)

## Gotchas

- Old CSS (18 files) and JS (5 files) still on disk but **not loaded** in `index.html`. Delete them after confirming `main.css` / `app.js` cover everything.
- PANOLENS bundles an internal old Three.js — vendor chunk is always ~672 KB regardless of tree-shaking.
- `Respaldo/` contains a stale snapshot of old code; ignore for edits.
- Adding new sections requires adding the `<section id="...">` in `index.html` AND linking it in the nav.
- No SSR, no framework — pure vanilla HTML/CSS/JS served by Vite as static files.
