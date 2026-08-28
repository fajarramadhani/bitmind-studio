# BITMIND STUDIO

Web & Digital Product Studio

## Project Overview

BITMIND STUDIO is the official website foundation for an independent web and digital product studio based in Indonesia.

Primary tagline:

> We design and build digital experiences that work.

The project is being built as a scalable studio website that can grow into a digital product company platform.

## Brand Positioning

BITMIND STUDIO combines three core ideas:

- **BIT** — technology, digital, software, internet
- **MIND** — ideas, creativity, strategy, design thinking, problem solving
- **STUDIO** — a place where ideas are designed, built, and turned into digital experiences

Positioning:

> **BITMIND STUDIO — Web & Digital Product Studio**

## Technology Stack

- Next.js 16
- App Router
- TypeScript
- Tailwind CSS 4
- ESLint
- Prettier
- Lucide React
- Framer Motion

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Folder Architecture

```text
src/
├── app/
├── components/
│   ├── layout/
│   ├── navigation/
│   ├── sections/
│   ├── shared/
│   └── ui/
├── data/
├── lib/
├── types/
└── utils/

public/
├── brand/
├── products/
└── projects/
```

## Routing

Available routes:

- `/`
- `/work`
- `/work/[slug]`
- `/services`
- `/products`
- `/products/[slug]`
- `/about`
- `/contact`
- `/admin/login`
- `/admin`
- `/admin/projects`
- `/admin/projects/new`
- `/admin/projects/[id]/edit`
- `/admin/products`
- `/admin/products/new`
- `/admin/products/[id]/edit`

## Current Development Phase

**Phase 5 — CMS, Project & Product Management**

Current CMS work includes:

- Supabase SSR client architecture and auth Proxy
- Admin-only login, dashboard, Projects, Products, and media management
- Draft, published, and archived content states
- Private Storage buckets with signed public media URLs
- Local and Supabase content repository modes
- Database migration and idempotent seed content

## Current Status

```text
Homepage                         Complete
Portfolio & Case Studies         Complete
Services & Conversion UI         Complete
Brand Integration                Complete
Responsive Refinement            Complete
CMS / Supabase Source Layer      In Development
Inquiry Backend                  Planned
Production Deployment            Next
```

The CMS source architecture is implemented and builds in local content mode.
Remote Supabase migration, seed, Storage, admin account, and authenticated CRUD
verification still require project credentials and setup.

## Content Source

Development can explicitly use local source data:

```text
CONTENT_SOURCE=local
```

CMS deployments use:

```text
CONTENT_SOURCE=supabase
```

Production requires an explicit content source. It never silently falls back after
a database configuration failure. See `.env.example` and
[`docs/supabase-setup.md`](docs/supabase-setup.md).

## Branch Workflow

Current safe workflow for content/CMS changes:

```text
dev         -> integration and verification branch
main        -> production-ready branch
production  -> deploy only from approved main
```

Recommended sequence:

1. Make and verify changes on `dev`
2. Re-run `npm run test`, `npm run lint`, and `npm run build`
3. Verify Supabase/runtime behavior if the change touches CMS data
4. Merge `dev` into `main` only after approval
5. Deploy production only from the approved `main` state

## Supabase Architecture

```text
src/lib/supabase/     Browser, server, service-role, and Proxy clients
src/lib/content/      Public repository functions and database mappers
src/lib/admin/        Admin queries and server validation
supabase/migrations/  Reproducible CMS schema, RLS, and Storage policies
supabase/seed.sql     Idempotent migration of existing public content
```

## Brand Assets

Official and generated brand assets are stored in:

```text
public/brand/
```

Usage and color guidance is documented in [`docs/brand.md`](docs/brand.md).

## Notes

Phase 5 changes the content source and adds a functional admin architecture without
redesigning the established public experience.

It does **not** include:

- inquiry/contact backend
- ecommerce
- remote Supabase deployment verification
- production deployment
