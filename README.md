# PT. Selatox Bio Pharma — Global Website

Enterprise-grade Next.js 15 (App Router) + React 19 foundation for the Selatox biotech platform.

## Stack

- **Framework:** Next.js 15+ (App Router), React 19
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS + CSS Modules (section-level encapsulation)
- **Typography:** Geist Sans (heading/body), Geist Mono (technical/UI)
- **Icons:** Lucide React
- **Architecture:** Feature-based modular directory

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000); you will be redirected to `/en/home`.

## Scripts

| Command | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run init:selatox` | Ensure directory structure exists |

## i18n

- **Locales:** English (`en`), Indonesian (`id`)
- **URLs:** `/en/home`, `/id/home`, `/en/about`, etc.
- **Default:** Root `/` redirects to `/en/home`

## Brand tokens

Defined in `tailwind.config.ts` and `src/styles/globals.css`:

- `innovation-blue`: #4490E4
- `safety-green`: #50B137
- `selatox-dark`: #2E222E
- `selatox-light`: #F5F5F5

Swiss-style spacing and glassmorphism shadows/blur are available as utilities and CSS variables.

## Directory overview

See [DIRECTORY_TREE.md](./DIRECTORY_TREE.md) for the full structure. Homepage sections live under `app/[locale]/home/(sections)/` with paired `[name].tsx` and `[name].module.css` files.

## SEO & metadata

Default metadata is set in `app/layout.tsx` for "PT. Selatox Bio Pharma Global Website." Override per route as needed.
