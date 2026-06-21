# Complete Project Photo Carousel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Show all 33 project photographs in numeric order and make the projects carousel begin flush on its first image with smooth, accessible horizontal movement.

**Architecture:** Keep `projects.ts` as the explicit editorial source of project photos and preserve the existing project boundaries. Adjust only the horizontal track behavior in `ProjectsPhotoCarousel.vue`; data tests cover completeness/order, while a focused source-level design test protects CSS and reduced-motion behavior without coupling to GSAP.

**Tech Stack:** Nuxt 3, Vue 3 Composition API, TypeScript, scoped CSS, Vitest

---

## File map

- Modify `src/data/projects.ts`: explicit, numerically ordered photo lists for both projects.
- Create `tests/projectPhotoCarouselData.test.ts`: completeness, ordering, and poster-exclusion contract.
- Modify `tests/projectPhotoLabels.test.ts`: preserve label contract with expanded project size.
- Modify `src/components/sections/projects/ProjectsPhotoCarousel/ProjectsPhotoCarousel.vue`: initial alignment, smooth controls, and reduced-motion fallback.
- Create `tests/projectsPhotoCarouselDesign.test.ts`: focused carousel behavior/style contract.

### Task 1: Complete and order project photo data

**Files:**
- Create: `tests/projectPhotoCarouselData.test.ts`
- Modify: `src/data/projects.ts`
- Modify: `tests/projectPhotoLabels.test.ts`

- [ ] **Step 1: Write failing data test**

```ts
import { describe, expect, it } from 'vitest';
import { projects } from '~/data/projects';

describe('project photo carousel data', () => {
  it('contains every direct project photograph in editorial and numeric order', () => {
    const sources = projects.flatMap((project) => project.photos.map((photo) => photo.src));

    expect(sources).toHaveLength(33);
    expect(sources).toEqual([
      '/images/Projetos/SANTIDADEEMFOCO-076.avif',
      '/images/Projetos/SANTIDADEEMFOCO-086.avif',
      '/images/Projetos/SANTIDADEEMFOCO-087.avif',
      '/images/Projetos/SANTIDADEEMFOCO-088.avif',
      '/images/Projetos/SANTIDADEEMFOCO-089.avif',
      '/images/Projetos/SANTIDADEEMFOCO-095.avif',
      '/images/Projetos/SANTIDADEEMFOCO-098.avif',
      '/images/Projetos/SANTIDADEEMFOCO-109.avif',
      '/images/Projetos/SANTIDADEEMFOCO-111.avif',
      '/images/Projetos/SANTIDADEEMFOCO-114.avif',
      '/images/Projetos/@LHERME_FILMS_11.avif',
      '/images/Projetos/@LHERME_FILMS_18.avif',
      '/images/Projetos/@LHERME_FILMS_28.avif',
      '/images/Projetos/@LHERME_FILMS_29.avif',
      '/images/Projetos/@LHERME_FILMS_33.avif',
      '/images/Projetos/@LHERME_FILMS_37.avif',
      '/images/Projetos/@LHERME_FILMS_46.avif',
      '/images/Projetos/@LHERME_FILMS_57.avif',
      '/images/Projetos/@LHERME_FILMS_65.avif',
      '/images/Projetos/@LHERME_FILMS_66.avif',
      '/images/Projetos/@LHERME_FILMS_67.avif',
      '/images/Projetos/@LHERME_FILMS_68.avif',
      '/images/Projetos/@LHERME_FILMS_86.avif',
      '/images/Projetos/@LHERME_FILMS_89.avif',
      '/images/Projetos/@OFOTOGRAFOMISSIONARIO_24.JPG',
      '/images/Projetos/@OFOTOGRAFOMISSIONARIO_48.JPG',
      '/images/Projetos/@OFOTOGRAFOMISSIONARIO_70.JPG',
      '/images/Projetos/@OFOTOGRAFOMISSIONARIO_74.JPG',
      '/images/Projetos/@OFOTOGRAFOMISSIONARIO_82.JPG',
      '/images/Projetos/@OFOTOGRAFOMISSIONARIO_96.JPG',
      '/images/Projetos/@OFOTOGRAFOMISSIONARIO_106.JPG',
      '/images/Projetos/@OFOTOGRAFOMISSIONARIO_123.JPG',
      '/images/Projetos/@OFOTOGRAFOMISSIONARIO_150.JPG',
    ]);
    expect(sources.some((source) => source.includes('poster'))).toBe(false);
  });
});
```

- [ ] **Step 2: Run test and verify RED**

Run: `npm test -- tests/projectPhotoCarouselData.test.ts`

Expected: FAIL because current data contains 10 photos instead of 33.

- [ ] **Step 3: Expand explicit project photo arrays**

In `src/data/projects.ts`, keep existing metadata unchanged. Replace only both `photos` arrays so first project contains all 10 `SANTIDADEEMFOCO-*` files in numeric order. Make second project contain all 14 `@LHERME_FILMS_*` files followed by all 9 `@OFOTOGRAFOMISSIONARIO_*` files in numeric order. Use sequential alt text within each project:

```ts
photos: santidadeFiles.map((fileName, index) => ({
  src: `/images/Projetos/${fileName}`,
  alt: `Santidade em foco - fotografia ${index + 1}`,
}))
```

Define focused file-name constants above `projects`:

```ts
const santidadeFiles = [
  'SANTIDADEEMFOCO-076.avif',
  'SANTIDADEEMFOCO-086.avif',
  'SANTIDADEEMFOCO-087.avif',
  'SANTIDADEEMFOCO-088.avif',
  'SANTIDADEEMFOCO-089.avif',
  'SANTIDADEEMFOCO-095.avif',
  'SANTIDADEEMFOCO-098.avif',
  'SANTIDADEEMFOCO-109.avif',
  'SANTIDADEEMFOCO-111.avif',
  'SANTIDADEEMFOCO-114.avif',
];

const santidadeEditorialFiles = [
  '@LHERME_FILMS_11.avif', '@LHERME_FILMS_18.avif', '@LHERME_FILMS_28.avif',
  '@LHERME_FILMS_29.avif', '@LHERME_FILMS_33.avif', '@LHERME_FILMS_37.avif',
  '@LHERME_FILMS_46.avif', '@LHERME_FILMS_57.avif', '@LHERME_FILMS_65.avif',
  '@LHERME_FILMS_66.avif', '@LHERME_FILMS_67.avif', '@LHERME_FILMS_68.avif',
  '@LHERME_FILMS_86.avif', '@LHERME_FILMS_89.avif',
  '@OFOTOGRAFOMISSIONARIO_24.JPG', '@OFOTOGRAFOMISSIONARIO_48.JPG',
  '@OFOTOGRAFOMISSIONARIO_70.JPG', '@OFOTOGRAFOMISSIONARIO_74.JPG',
  '@OFOTOGRAFOMISSIONARIO_82.JPG', '@OFOTOGRAFOMISSIONARIO_96.JPG',
  '@OFOTOGRAFOMISSIONARIO_106.JPG', '@OFOTOGRAFOMISSIONARIO_123.JPG',
  '@OFOTOGRAFOMISSIONARIO_150.JPG',
];
```

Map `santidadeEditorialFiles` with alt prefix `Santidade em Foco` exactly, preserving the capitalization expected by `tests/projectPhotoLabels.test.ts`.

Update the existing count assertion in `tests/projectPhotoLabels.test.ts` while leaving its title and alt-prefix assertions intact:

```ts
expect(project?.photos).toHaveLength(23);
```

- [ ] **Step 4: Run focused data tests and verify GREEN**

Run: `npm test -- tests/projectPhotoCarouselData.test.ts tests/projectPhotoLabels.test.ts tests/publicAssets.test.ts`

Expected: all focused tests PASS.

- [ ] **Step 5: Commit data change**

```bash
git add -- tests/projectPhotoCarouselData.test.ts tests/projectPhotoLabels.test.ts src/data/projects.ts
git commit -m "feat: include all project photographs"
```

### Task 2: Align and smooth the carousel track

**Files:**
- Create: `tests/projectsPhotoCarouselDesign.test.ts`
- Modify: `src/components/sections/projects/ProjectsPhotoCarousel/ProjectsPhotoCarousel.vue`

- [ ] **Step 1: Write failing design test**

```ts
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const source = readFileSync(
  join(process.cwd(), 'src/components/sections/projects/ProjectsPhotoCarousel/ProjectsPhotoCarousel.vue'),
  'utf8',
);

describe('projects photo carousel design', () => {
  it('starts at the first image and aligns every snap point to the content edge', () => {
    expect(source).toContain('track.scrollLeft = 0');
    expect(source).toContain('scroll-snap-align: start');
    expect(source).not.toContain('scroll-snap-align: center');
  });

  it('uses smooth controls while respecting reduced motion', () => {
    expect(source).toContain("behavior: prefersReducedMotion.value ? 'auto' : 'smooth'");
    expect(source).toContain('scroll-behavior: smooth');
    expect(source).toContain('@media (prefers-reduced-motion: reduce)');
    expect(source).toContain('scroll-behavior: auto');
  });
});
```

- [ ] **Step 2: Run test and verify RED**

Run: `npm test -- tests/projectsPhotoCarouselDesign.test.ts`

Expected: FAIL because snap alignment is currently centered and no reduced-motion scroll behavior exists.

- [ ] **Step 3: Implement initial alignment and motion preference**

In the component script, add state beside the element refs:

```ts
const prefersReducedMotion = ref(false);
```

Change `scrollGallery` options to:

```ts
track.scrollBy({
  left: direction === 'next' ? distance : -distance,
  behavior: prefersReducedMotion.value ? 'auto' : 'smooth',
});
```

At the beginning of `onMounted`, after `await nextTick()`, initialize the track and preference before the GSAP guard:

```ts
prefersReducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const track = trackRef.value;
if (track) {
  track.scrollLeft = 0;
}

if (!rootRef.value || prefersReducedMotion.value) {
  return;
}
```

Replace the existing guard that calls `matchMedia` inline.

- [ ] **Step 4: Implement smooth, start-aligned CSS**

In `.photo-gallery__track`, add:

```css
scroll-behavior: smooth;
scroll-snap-stop: normal;
```

In `.photo-gallery__item`, change:

```css
scroll-snap-align: start;
```

Append this media query after existing responsive rules:

```css
@media (prefers-reduced-motion: reduce) {
  .photo-gallery__track {
    scroll-behavior: auto;
  }

  .photo-gallery__item img {
    transition: none;
  }
}
```

- [ ] **Step 5: Run focused carousel test and verify GREEN**

Run: `npm test -- tests/projectsPhotoCarouselDesign.test.ts`

Expected: PASS.

- [ ] **Step 6: Commit carousel behavior**

```bash
git add -- tests/projectsPhotoCarouselDesign.test.ts src/components/sections/projects/ProjectsPhotoCarousel/ProjectsPhotoCarousel.vue
git commit -m "feat: align and smooth project photo carousel"
```

### Task 3: Full verification and visual QA

**Files:**
- Verify only; no source file expected.

- [ ] **Step 1: Run complete automated verification**

Run: `npm test`

Expected: all tests PASS with no unhandled errors.

- [ ] **Step 2: Run typecheck**

Run: `npm run typecheck`

Expected: command exits 0 with no TypeScript errors.

- [ ] **Step 3: Run production build**

Run: `npm run build`

Expected: Nuxt build exits 0.

- [ ] **Step 4: Verify desktop and mobile in a real browser**

Run dev server with `npm run dev`, then inspect `/projetos` at 1440×900 and 390×844. Confirm:

- first visible card is `SANTIDADEEMFOCO-076.avif`;
- first card left edge matches page content margin;
- counter reads `33 imagens`;
- next/previous buttons move one card smoothly;
- trackpad/touch drag settles cleanly at a start-aligned card;
- no video poster appears;
- reduced-motion emulation removes smooth scrolling.

- [ ] **Step 5: Check worktree scope**

Run: `git status --short`

Expected: only intended implementation/test files or generated artifacts explicitly ignored by Git; no unrelated source changes.
