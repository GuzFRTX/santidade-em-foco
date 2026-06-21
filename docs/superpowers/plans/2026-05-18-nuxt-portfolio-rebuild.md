# Nuxt Portfolio Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the static photography portfolio as an idiomatic Nuxt/Vue app while preserving the existing palette, typography, content, and editorial dark mood.

**Architecture:** Nuxt uses `srcDir` with route files in `src/pages`, shared shell in `src/layouts/default.vue`, client plugins for Lenis/GSAP, domain data in `src/data`, and focused Vue components under `src/components`. Behavioral logic lives in composables so filters, lightbox, media queries, and form state can be tested without browser-heavy setup.

**Tech Stack:** Nuxt 3, Vue 3, TypeScript, Vitest, GSAP, Lenis, CSS modules via global styles.

---

### Task 1: Testable Domain Logic

**Files:**
- Create: `tests/galleryFilters.test.ts`
- Create: `tests/lightbox.test.ts`
- Create: `tests/contactForm.test.ts`
- Create: `src/composables/useGalleryFilters.ts`
- Create: `src/composables/useLightbox.ts`
- Create: `src/composables/useContactForm.ts`
- Create: `src/types/project.ts`

- [ ] Write tests for filtering all projects, filtering by category, lightbox next/previous wraparound, and contact form validation.
- [ ] Run `npm test` and confirm tests fail because composables do not exist yet.
- [ ] Implement minimal composables and types.
- [ ] Run `npm test` and confirm tests pass.

### Task 2: Nuxt Structure

**Files:**
- Create: `src/app.vue`
- Create: `src/pages/index.vue`
- Create: `src/pages/projetos.vue`
- Create: `src/pages/contato.vue`
- Create: `src/layouts/default.vue`
- Create: `src/plugins/lenis.client.ts`
- Create: `src/plugins/gsap.client.ts`
- Create: `src/styles/globals.css`
- Create: `src/styles/animations.css`
- Create: `src/styles/lenis.css`

- [ ] Add Nuxt app shell and route files that assemble sections only.
- [ ] Add client-only plugins with cleanup-safe behavior.
- [ ] Add global palette, typography, dust texture, responsive layout, and reduced-motion rules.
- [ ] Run `npm run build`.

### Task 3: Data And Components

**Files:**
- Create data files under `src/data`.
- Create types under `src/types`.
- Create layout, section, gallery, animation, and UI components under `src/components`.

- [ ] Port all real strings, project metadata, video paths, contact links, and timeline content into typed data modules.
- [ ] Build Header, Footer, PageWrapper, buttons, badges, containers, section titles, animated text, reveal, parallax, masonry, lightbox, galleries, filters, videos, and CTAs.
- [ ] Keep missing assets as stable `/images/...` and `/videos/...` references for later placement in `public`.
- [ ] Run `npm test` and `npm run build`.

### Task 4: Cleanup

**Files:**
- Delete legacy `*.html`, `script.js`, `style.css`, and static helper files after Nuxt build exists.
- Keep `.gitignore` updated for ignored media and local brainstorm files.

- [ ] Remove old static entrypoints.
- [ ] Ensure `.superpowers/` is ignored.
- [ ] Run final `npm test` and `npm run build`.

