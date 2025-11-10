---
type: "manual"
---

# 🧱 TLI — Project Rules

## 🧩 1. Core Technologies

The **TLI (TorchLight Infinite Frontend)** project is built using the following technology stack:

- **Next.js 15** — Core framework for SSR/SSG and routing.
- **React 19** — Base library for UI and state management.
- **Node.js 24** — Runtime environment for backend scripts.
- **Tailwind CSS 4.1** — Utility-first CSS framework for responsive design.

---

## 📱 2. Design & Responsiveness

- **Mobile First:**  
  All layouts and components must be designed primarily for **mobile devices** (up to 768px), scaling up using Tailwind breakpoints.
- Maintain **visual consistency** across all screen sizes and supported languages.
- Avoid overly complex media queries — always use Tailwind’s default breakpoints when possible.

---

## 🧠 3. Domain-Driven Design (DDD)

The project must follow **Domain-Driven Design** principles to ensure modularity, clarity, and scalability.

### Recommended folder structure:

src/
├─ app/ # Next.js routes and entry points
├─ core/ # Core domain logic (Entities, Value Objects, Services)
├─ infra/ # Integrations (APIs, persistence, external libraries)
├─ ui/ # Reusable visual components (atoms, molecules, organisms)
├─ modules/ # Feature domains (User, Payment, etc.)
├─ i18n/ # Internationalization (en, pt, ru)
├─ hooks/ # Custom React hooks
├─ utils/ # Helpers and pure functions
└─ config/ # Environment and global configuration

### DDD guidelines:

- Each **domain module** must include its own layers (`domain`, `application`, `infra`, `ui`).
- Avoid direct cross-dependencies between domains.
- Use **Value Objects** to encapsulate domain rules (e.g., Email, Currency).
- Domain communication should occur through **explicit interfaces** or **application services**.

---

## 🌍 4. Internationalization (i18n)

The project must natively support the following languages:

- 🇺🇸 **English (en)**
- 🇧🇷 **Portuguese (pt)**
- 🇷🇺 **Russian (ru)**

### Implementation rules:

- Use **Next.js built-in i18n routing** (`next.config.js` → `i18n`).
- Centralize translation files in:

src/i18n/
├─ en/
├─ pt/
└─ ru/

- UI text must **never be hardcoded** — always reference translation keys.
- The **default language** is English, with automatic fallback behavior.

---

## 🧭 5. Code & Standards

- Enforce **ESLint + Prettier** configuration for Next.js/React 19.
- Use **TypeScript** with strict type checking.
- Prefer **absolute imports** (`@/modules/user/domain/User`).
- React components must be **functional components with Hooks**.
- Avoid `any`, **magic numbers**, and **duplicate logic**.
- Each component must be **self-contained and reusable**.

---

## ⚙️ 6. Performance & SEO

- Always optimize images using `next/image`.
- Configure **metadata and OpenGraph** on all public routes.
- Use **lazy loading** and **dynamic imports** when possible.
- Monitor **Core Web Vitals** via Google Lighthouse.

---

## 🧰 7. Commits & Versioning

- Follow **Conventional Commits** format:
  feat: add user authentication
  fix: correct payment validation
  refactor: improve i18n loader

  - Maintain short, descriptive branch names:
    feat/user-login
    fix/payment-validation
    refactor/i18n-loader

## 🧑‍💻 8. Development Guidelines

- Code must be **simple, modular, and readable**.
- Follow **Kent C. Dodds’ principles** of component design:
- Keep components **small and focused**.
- Favor **composition over inheritance**.
- Ensure testability and clear boundaries.
- Prioritize **clarity over cleverness** — the next developer should immediately understand your intent.
