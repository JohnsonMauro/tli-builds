# TorchLight Infinite Frontend (TLI)

Frontend application built with Next.js 15, React 19, Node 24, TypeScript and Tailwind CSS 4.1. The project follows Domain-Driven Design (DDD) and provides internationalization (i18n) for English, Portuguese and Russian.

## Tech Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4.1
- Node.js 24

## Requirements

- Node.js 24+
- npm (or pnpm/yarn/bun) — team default is npm

## Getting Started

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Project Structure

```
src/
  app/                # Next.js App Router
  i18n/               # Internationalization resources
    en/
    pt/
    ru/
  modules/            # DDD modules (domain, application, infra, ui per module)
```

### DDD per-module layout (example)

```
src/modules/<feature>/
  domain/             # Entities, value objects, domain logic
  application/        # Use cases, orchestrators
  infra/              # API calls, repositories, integrations
  ui/                 # React components
```

## Conventions

- TypeScript everywhere
- Absolute imports with alias `@/*`
- Mobile-first with Tailwind (avoid custom CSS unless required)
- Prefer composition; move logic to hooks, keep UI focused
- Do not hardcode visible text in UI; use i18n keys under `src/i18n/*`

## Scripts

```bash
npm run dev     # start development server
npm run build   # build for production
npm run start   # start production server
npm run lint    # lint
```

## Internationalization (i18n)

- Languages: English (`en`), Portuguese (`pt`), Russian (`ru`)
- Add translation files per feature as needed

## Contributions

- Keep changes modular per DDD boundaries
- Do not introduce new libraries without approval
- Use English for code and comments; UI text via i18n
