# Project Initialization & Boilerplate — AI Agent Prompt

Use this prompt with an AI coding agent (e.g. Cursor, Windsurf) to scaffold or align a **PT. Selatox Bio Pharma** Next.js codebase.

---

## Prompt body

Act as a Senior Software Architect. Scaffold (or align) a modern, high-performance Next.js codebase for **PT. Selatox Bio Pharma** with the following specifications. Goal: a rock-solid, SOTD-compliant foundation that follows the architectural constraints and branding of the Selatox global project.

### 1. PROJECT CORE STACK (Most Updated)

- **Framework:** Next.js 15+ (App Router) with React 19.
- **Language:** TypeScript (strict mode enabled).
- **Styling:** Tailwind CSS + CSS Modules for section-level encapsulation.
- **Typography:** Geist Sans (heading/body) & Geist Mono (technical/UI).
- **Icons:** Lucide React (minimalist biotech-style icons).
- **Architecture:** Feature-based modular directory.

### 2. DIRECTORY STRUCTURE CONSTRAINTS

Use these paths:

- `app/[locale]/home/(sections)/`: Homepage section modules. Each section MUST have a `[name].tsx` and a `[name].module.css`.
- `src/components/`: Reusable global UI (Buttons, Inputs, Modals) and layout (Navbar, Footer).
- `src/lib/`: Utility functions and shared logic (e.g. i18n, utils).
- `src/hooks/`: Custom React hooks.
- `src/styles/`: Global CSS and Tailwind-related setup.
- `public/assets/`: Branding assets, logos, and the Selatox symbol.

### 3. BRANDING & THEME CONFIGURATION

In `tailwind.config.ts` and `src/styles/globals.css`:

- **Colors:**
  - `innovation-blue`: #4490E4
  - `safety-green`: #50B137
  - `selatox-dark`: #2E222E
  - `selatox-light`: #F5F5F5
- **Design tokens:** Swiss-style spacing scale (e.g. 4px base) and a shadows/blur system for glassmorphism.

### 4. FUNCTIONAL BOILERPLATE REQUIREMENTS

- **Multilingual routing:** Middleware for English (EN) and Indonesian (ID) URL patterns (e.g. `/en/home`, `/id/home`). Redirect root `/` to default locale home.
- **Responsive layout:** Root layout with html/body; locale layout with a high-end Navbar (glassmorphism) and modular Footer.
- **Metadata:** SEO-ready default metadata for "PT. Selatox Bio Pharma Global Website."

### 5. EXECUTION

Generate or update: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `postcss.config.mjs`, `src/styles/globals.css`, `middleware.ts`, `app/layout.tsx`, `app/[locale]/layout.tsx`, homepage with at least one section in `app/[locale]/home/(sections)/` (with paired `.tsx` and `.module.css`), Navbar and Footer components (with their `.module.css`), and a directory tree document. Ensure code is clean, documented, and follows enterprise-grade standards for biotech platforms.

---

*This prompt was used to generate the initial Selatox project in this repository.*
