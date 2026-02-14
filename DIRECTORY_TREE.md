# PT. Selatox Bio Pharma — Directory Structure

SOTD-compliant, feature-based modular layout for the global website.

```
Selatox/
├── app/
│   ├── layout.tsx                    # Root layout (html, body, fonts, globals)
│   ├── page.tsx                      # Root redirect → /[locale]/home
│   └── [locale]/
│       ├── layout.tsx                # Locale shell: Navbar, main, Footer
│       ├── home/
│       │   ├── page.tsx              # Home page composition
│       │   └── (sections)/
│       │       ├── Hero.tsx
│       │       ├── Hero.module.css
│       │       ├── Cta.tsx
│       │       └── Cta.module.css
│       ├── about/page.tsx
│       ├── products/page.tsx
│       └── contact/page.tsx
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Navbar.module.css
│   │   │   ├── Footer.tsx
│   │   │   ├── Footer.module.css
│   │   │   └── LangSetter.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       └── Button.module.css
│   ├── lib/
│   │   ├── i18n.ts
│   │   └── utils.ts
│   ├── hooks/
│   │   └── useMediaQuery.ts
│   └── styles/
│       └── globals.css
├── public/
│   └── assets/                       # Branding, logos, Selatox symbol
├── scripts/
│   └── init-selatox.js
├── middleware.ts                     # EN/ID locale routing
├── tailwind.config.ts
├── postcss.config.mjs
├── tsconfig.json
├── next.config.ts
└── package.json
```

## Conventions

- **Homepage sections:** Each section under `app/[locale]/home/(sections)/` has a `[name].tsx` and `[name].module.css`.
- **Global UI:** Reusable components live in `src/components/` (layout + ui).
- **Styling:** Tailwind + CSS Modules for section-level encapsulation.
- **i18n:** Locale prefix in URL (`/en/home`, `/id/home`); middleware redirects `/` to default locale.
