# Project structure (after refactor)

This document describes the folder layout and where key files live. **Behavior is unchanged**; only organization and imports were updated.

## Path alias

- **`@/`** → **`src/`** (configured in `tsconfig.app.json` and `vite.config.ts`). Use `@/components/...`, `@/pages/...`, `@/assets/...`, etc.

---

## Folder tree

```
src/
├── App.tsx
├── App.css
├── main.tsx
├── index.css
├── assets/                 # Images, static files
├── components/
│   ├── layout/             # App shell
│   │   ├── Layout.tsx
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   └── ScrollToTop.tsx
│   ├── modals/
│   │   └── ContactModal.tsx
│   ├── ui/                 # Reusable UI (Button, Card)
│   ├── home/               # Home-page sections
│   ├── about/              # About-page sections
│   ├── careers/
│   └── partners/
├── config/
│   └── api.ts
├── constants/              # Shared constants (placeholder)
│   └── index.ts
├── hooks/                  # Custom hooks (placeholder)
│   └── index.ts
├── pages/                  # Route-level screens (unchanged)
│   ├── Home.tsx
│   ├── About.tsx
│   ├── Partner.tsx
│   ├── ForMFDs.tsx
│   ├── TheNiveshPlatform.tsx
│   ├── NiveshTeams.tsx
│   ├── NISMCertificationExam.tsx
│   ├── blog/
│   ├── footer/ (goals/, quicklinks/)
│   ├── legal/
│   ├── nfo/
│   ├── partner/
│   ├── partners/
│   └── products/
├── services/
│   └── api.ts
├── types/                  # Shared types (placeholder)
│   └── index.ts
└── utils/                  # Pure helpers (placeholder)
    └── index.ts
```

---

## Where things moved

| Previous location | New location |
|-------------------|--------------|
| `src/components/Layout.tsx` | `src/components/layout/Layout.tsx` |
| `src/components/Navigation.tsx` | `src/components/layout/Navigation.tsx` |
| `src/components/Footer.tsx` | `src/components/layout/Footer.tsx` |
| `src/components/ScrollToTop.tsx` | `src/components/layout/ScrollToTop.tsx` |
| `src/components/ContactModal.tsx` | `src/components/modals/ContactModal.tsx` |

**Imports updated:**

- **App.tsx**: `Layout` and `ScrollToTop` from `@/components/layout/...`
- **All product pages** (e.g. MutualFunds, Bond, PMS): `ContactModal` from `@/components/modals/ContactModal`
- **Layout.tsx**: still uses `./Navigation` and `./Footer` (relative inside `layout/`)
- **Footer.tsx**: asset imports use `@/assets/...`

---

## Conventions

- **Components**: Group by role — `layout/`, `modals/`, `ui/`, and feature folders (`home/`, `about/`, etc.).
- **Pages**: One file per route; subfolders by domain (blog, footer, legal, nfo, partner, partners, products).
- **Config**: Environment and API config in `config/`.
- **Services**: API and external calls in `services/`.
- **Placeholders**: `hooks/`, `utils/`, `constants/`, `types/` have `index.ts` for future shared code.

---

*Refactor: structure and imports only; no changes to UI, routing, or business logic.*
