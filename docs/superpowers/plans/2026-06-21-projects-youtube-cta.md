# Projects YouTube CTA Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a YouTube CTA at the end of the film section and give the budget CTA its own editorial closing copy.

**Architecture:** Reuse the shared `Button` component in both existing owners: film-related CTA stays inside `ProjectsFilmSection`, while budget CTA stays in `projetos.vue`. Extend current source-reading Vitest tests to lock copy, destinations, external-link security, and section order.

**Tech Stack:** Nuxt 3, Vue 3, scoped CSS, GSAP, Vitest, Playwright CLI

---

## File map

- Modify `src/components/sections/projects/ProjectsFilmSection/ProjectsFilmSection.vue`: render and style YouTube CTA; include it in existing reveal animation.
- Modify `src/pages/projetos.vue`: add closing copy above existing budget button and refine CTA spacing.
- Modify `tests/projectsFilmSectionDesign.test.ts`: protect YouTube copy, shared button, destination, and external-link security.
- Modify `tests/projectsBudgetCta.test.ts`: protect budget copy and ordering after film section.
- Modify `src/components/ui/interactive-hover-button/InteractiveHoverButton.vue`: keep solid link labels visible at rest against global link color inheritance.
- Modify `tests/interactiveHoverButtons.test.ts`: protect resting solid-link contrast.

### Task 1: Define CTA behavior with failing tests

**Files:**
- Modify: `tests/projectsFilmSectionDesign.test.ts`
- Modify: `tests/projectsBudgetCta.test.ts`

- [ ] **Step 1: Add YouTube CTA test**

Append inside `describe('projects film section design', ...)`:

```ts
it('closes films with a secure YouTube CTA using the shared button', () => {
  expect(source).toContain("import Button from '~/components/ui/Button/Button.vue'");
  expect(source).toContain('Mais hist&oacute;rias em movimento esperam por voc&ecirc;.');
  expect(source).toContain('href="https://www.youtube.com/@lhermefilms"');
  expect(source).toContain('target="_blank"');
  expect(source).toContain('rel="noopener noreferrer"');
  expect(source).toContain('variant="solid"');
  expect(source).toContain('Ver no YouTube');
});
```

Remove the obsolete assertion below from `tests/projectsBudgetCta.test.ts`, because the film section now owns the shared YouTube button:

```ts
expect(filmSection).not.toContain("import Button from '~/components/ui/Button/Button.vue'");
```

- [ ] **Step 2: Extend budget CTA test**

Add these assertions to the first test in `tests/projectsBudgetCta.test.ts`:

```ts
expect(page).toContain('Sua hist&oacute;ria tamb&eacute;m merece ser contada.');
expect(page.indexOf('<ProjectsFilmSection')).toBeLessThan(page.indexOf('class="projects-page__cta"'));
```

- [ ] **Step 3: Run focused tests and verify RED**

Run:

```powershell
npm.cmd test -- tests/projectsFilmSectionDesign.test.ts tests/projectsBudgetCta.test.ts
```

Expected: FAIL because both new CTA texts and YouTube link are absent.

### Task 2: Add YouTube ending to film section

**Files:**
- Modify: `src/components/sections/projects/ProjectsFilmSection/ProjectsFilmSection.vue`
- Test: `tests/projectsFilmSectionDesign.test.ts`

- [ ] **Step 1: Render CTA below carousel**

Add after `<ProjectsFilmCarousel :videos="videos" />`:

```vue
<div class="film-section__cta">
  <p>Mais hist&oacute;rias em movimento esperam por voc&ecirc;.</p>
  <Button
    href="https://www.youtube.com/@lhermefilms"
    target="_blank"
    rel="noopener noreferrer"
    variant="solid"
  >
    Ver no YouTube
  </Button>
</div>
```

Import:

```ts
import Button from '~/components/ui/Button/Button.vue';
```

Include `.film-section__cta` in existing GSAP target array:

```ts
['.film-section__copy', '.film-carousel', '.film-section__cta']
```

- [ ] **Step 2: Style CTA**

Add scoped styles:

```css
.film-section__cta {
  display: grid;
  justify-items: center;
  gap: 22px;
  max-width: 620px;
  margin: clamp(8px, 2vw, 24px) auto 0;
  text-align: center;
}

.film-section__cta p {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(28px, 3.4vw, 48px);
  font-weight: 400;
  line-height: 0.98;
}
```

Inside current mobile media query add:

```css
.film-section__cta {
  gap: 18px;
  max-width: 18rem;
}

.film-section__cta p {
  font-size: clamp(28px, 10vw, 40px);
}
```

- [ ] **Step 3: Run film test and verify GREEN**

Run:

```powershell
npm.cmd test -- tests/projectsFilmSectionDesign.test.ts
```

Expected: PASS.

### Task 3: Strengthen budget closing block

**Files:**
- Modify: `src/pages/projetos.vue`
- Test: `tests/projectsBudgetCta.test.ts`

- [ ] **Step 1: Add editorial budget copy**

Replace current CTA block with:

```vue
<section class="projects-page__cta" aria-labelledby="projects-budget-title">
  <h2 id="projects-budget-title">Sua hist&oacute;ria tamb&eacute;m merece ser contada.</h2>
  <Button to="/orcamento" variant="solid">Ver or&ccedil;amento</Button>
</section>
```

- [ ] **Step 2: Style independent closing section**

Replace `.projects-page__cta` rules with:

```css
.projects-page__cta {
  display: grid;
  justify-items: center;
  gap: 28px;
  margin-top: clamp(96px, 12vw, 168px);
  padding: clamp(84px, 10vw, 132px) 0 112px;
  border-top: 1px solid color-mix(in srgb, var(--text) 18%, transparent);
  text-align: center;
}

.projects-page__cta h2 {
  max-width: 760px;
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(40px, 5.5vw, 76px);
  font-weight: 400;
  line-height: 0.94;
}
```

Replace mobile CTA rules with:

```css
.projects-page__cta {
  gap: 22px;
  margin-top: 88px;
  padding: 72px 0 76px;
}

.projects-page__cta h2 {
  max-width: 10ch;
  font-size: clamp(36px, 12vw, 52px);
}
```

- [ ] **Step 3: Run budget test and verify GREEN**

Run:

```powershell
npm.cmd test -- tests/projectsBudgetCta.test.ts
```

Expected: PASS.

### Task 4: Preserve solid-button contrast

**Files:**
- Modify: `src/components/ui/interactive-hover-button/InteractiveHoverButton.vue`
- Modify: `tests/interactiveHoverButtons.test.ts`

- [ ] **Step 1: Add regression test and verify RED**

Require a stable `interactive-hover-button--solid` class and CSS rule setting `color: var(--bg)`. Run `npm.cmd test -- tests/interactiveHoverButtons.test.ts`; expect failure before implementation.

- [ ] **Step 2: Add stable solid class and CSS color**

Append `interactive-hover-button--solid` to the solid variant classes and add:

```css
.interactive-hover-button--solid {
  color: var(--bg);
}
```

- [ ] **Step 3: Verify GREEN**

Run `npm.cmd test -- tests/interactiveHoverButtons.test.ts`; expect PASS.

### Task 5: Verify complete result

**Files:**
- Verify: all files above

- [ ] **Step 1: Run automated checks**

Run:

```powershell
npm.cmd test
npm.cmd run typecheck
npm.cmd run build
```

Expected: 70+ tests pass; typecheck and build exit 0.

- [ ] **Step 2: Verify browser behavior**

Open `/projetos` in Playwright at 1440×900 and 390×844. Confirm:

```text
Film carousel → YouTube copy/button → separated budget copy/button → footer
```

Click YouTube CTA and verify new tab URL starts with `https://www.youtube.com/@lhermefilms`. Confirm no console errors and both buttons remain visible without horizontal overflow.

- [ ] **Step 3: Review working tree**

Run:

```powershell
git diff --check
git status --short
git diff -- src/components/sections/projects/ProjectsFilmSection/ProjectsFilmSection.vue src/pages/projetos.vue tests/projectsFilmSectionDesign.test.ts tests/projectsBudgetCta.test.ts
```

Expected: only planned files plus pre-existing unrelated files; no whitespace errors.
