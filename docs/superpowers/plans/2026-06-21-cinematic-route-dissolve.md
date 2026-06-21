# Cinematic Route Dissolve Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a GSAP cinematic dissolve only between Home, Projetos, and Orçamento while leaving the intro and Contato untouched.

**Architecture:** A pure utility owns the eligible-route allowlist. One client-safe composable supplies JavaScript transition hooks to `NuxtPage`, captures source/destination routes in a router guard, coordinates GSAP and Lenis, and cancels stale animations. A grid stage overlays outgoing and incoming page roots without adding a loader or transition overlay.

**Tech Stack:** Nuxt 3, Vue 3 transitions, TypeScript, GSAP 3, Lenis, Vitest, Playwright

---

### Task 1: Define eligible route pairs

**Files:**
- Create: `src/utils/cinematicRouteTransition.ts`
- Create: `tests/cinematicRouteTransition.test.ts`

- [ ] **Step 1: Write the failing route-scope test**

```ts
import { describe, expect, it } from 'vitest';
import {
  CINEMATIC_ROUTE_PATHS,
  shouldUseCinematicRouteTransition,
} from '~/utils/cinematicRouteTransition';

describe('cinematic route transition scope', () => {
  it('contains only home, projects, and budget', () => {
    expect(CINEMATIC_ROUTE_PATHS).toEqual(['/', '/projetos', '/orcamento']);
  });

  it.each([
    ['/', '/projetos'],
    ['/projetos', '/'],
    ['/projetos', '/orcamento'],
    ['/orcamento', '/projetos'],
    ['/', '/orcamento'],
    ['/orcamento', '/'],
    ['/projetos/', '/orcamento/'],
  ])('enables dissolve from %s to %s', (from, to) => {
    expect(shouldUseCinematicRouteTransition(from, to)).toBe(true);
  });

  it.each([
    ['/', '/'],
    ['/projetos', '/projetos'],
    ['/', '/contato'],
    ['/contato', '/'],
    ['/contato', '/orcamento'],
    ['/orcamento', '/contato'],
    ['', '/projetos'],
    ['/unknown', '/projetos'],
  ])('skips dissolve from %s to %s', (from, to) => {
    expect(shouldUseCinematicRouteTransition(from, to)).toBe(false);
  });
});
```

- [ ] **Step 2: Run test and confirm RED**

Run: `npm test -- tests/cinematicRouteTransition.test.ts`

Expected: FAIL because `~/utils/cinematicRouteTransition` does not exist.

- [ ] **Step 3: Implement normalized allowlist matching**

```ts
export const CINEMATIC_ROUTE_PATHS = ['/', '/projetos', '/orcamento'] as const;

const cinematicRoutePathSet = new Set<string>(CINEMATIC_ROUTE_PATHS);

function normalizePath(path: string) {
  if (!path) {
    return '';
  }

  if (path === '/') {
    return path;
  }

  return path.replace(/\/+$/, '');
}

export function shouldUseCinematicRouteTransition(fromPath: string, toPath: string) {
  const from = normalizePath(fromPath);
  const to = normalizePath(toPath);

  return from !== to && cinematicRoutePathSet.has(from) && cinematicRoutePathSet.has(to);
}
```

- [ ] **Step 4: Run test and confirm GREEN**

Run: `npm test -- tests/cinematicRouteTransition.test.ts`

Expected: 1 file PASS.

- [ ] **Step 5: Commit route scope**

```bash
git add -- src/utils/cinematicRouteTransition.ts tests/cinematicRouteTransition.test.ts
git commit -m "feat: define cinematic transition routes"
```

### Task 2: Build GSAP and Lenis transition lifecycle

**Files:**
- Create: `src/composables/useCinematicPageTransition.ts`
- Create: `tests/cinematicPageTransitionIntegration.test.ts`

- [ ] **Step 1: Write the failing lifecycle contract test**

```ts
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const projectFile = (path: string) => readFileSync(join(process.cwd(), path), 'utf8');

describe('cinematic page transition integration', () => {
  it('implements the approved GSAP motion and Lenis lifecycle', () => {
    const source = projectFile('src/composables/useCinematicPageTransition.ts');

    expect(source).toContain('shouldUseCinematicRouteTransition(from.path, to.path)');
    expect(source).toContain('$lenis.stop()');
    expect(source).toContain('$lenis.start()');
    expect(source).toContain("filter: 'blur(10px)'");
    expect(source).toContain("filter: 'blur(8px)'");
    expect(source).toContain('scale: 1.015');
    expect(source).toContain('y: 15');
    expect(source).toContain('duration: 0.52');
    expect(source).toContain('duration: 0.76');
    expect(source).toContain('delay: 0.17');
    expect(source).toContain("matchMedia('(prefers-reduced-motion: reduce)')");
    expect(source).toContain("clearProps: 'opacity,filter,transform,transformOrigin,willChange,zIndex'");
    expect(source).toContain('leaveTween?.kill()');
    expect(source).toContain('enterTween?.kill()');
  });
});
```

- [ ] **Step 2: Run test and confirm RED**

Run: `npm test -- tests/cinematicPageTransitionIntegration.test.ts`

Expected: FAIL because `src/composables/useCinematicPageTransition.ts` does not exist.

- [ ] **Step 3: Implement transition composable**

```ts
import type { TransitionProps } from 'vue';
import type { gsap } from 'gsap';
import { onBeforeUnmount, onMounted } from 'vue';
import { useNuxtApp, useRouter } from '#app';
import { shouldUseCinematicRouteTransition } from '~/utils/cinematicRouteTransition';

type TransitionDone = () => void;

const CLEAR_PROPS = 'opacity,filter,transform,transformOrigin,willChange,zIndex';

export function useCinematicPageTransition(): TransitionProps {
  const { $gsap, $lenis } = useNuxtApp();
  const router = useRouter();

  let enabled = false;
  let navigationId = 0;
  let removeGuard: (() => void) | undefined;
  let leaveTween: gsap.core.Tween | null = null;
  let enterTween: gsap.core.Tween | null = null;
  let leaveElement: Element | null = null;
  let enterElement: Element | null = null;
  let leaveDone: TransitionDone | null = null;
  let enterDone: TransitionDone | null = null;

  const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const clearElement = (element: Element | null) => {
    if (!element) {
      return;
    }

    $gsap.set(element, { clearProps: CLEAR_PROPS });
  };

  const releasePendingHooks = () => {
    const pendingLeaveDone = leaveDone;
    const pendingEnterDone = enterDone;

    leaveDone = null;
    enterDone = null;
    pendingLeaveDone?.();
    pendingEnterDone?.();
  };

  const cancelActiveTransition = () => {
    leaveTween?.kill();
    enterTween?.kill();
    leaveTween = null;
    enterTween = null;
    clearElement(leaveElement);
    clearElement(enterElement);
    leaveElement = null;
    enterElement = null;
    releasePendingHooks();
    $lenis.start();
  };

  const finishImmediately = (element: Element, done: TransitionDone) => {
    clearElement(element);
    done();
  };

  onMounted(() => {
    removeGuard = router.beforeEach((to, from) => {
      cancelActiveTransition();
      navigationId += 1;
      enabled = shouldUseCinematicRouteTransition(from.path, to.path);

      if (enabled) {
        $lenis.stop();
      }

      return true;
    });
  });

  onBeforeUnmount(() => {
    removeGuard?.();
    cancelActiveTransition();
  });

  return {
    css: false,
    onBeforeLeave(element) {
      if (!enabled || prefersReducedMotion()) {
        return;
      }

      $gsap.set(element, {
        transformOrigin: 'center center',
        willChange: 'opacity, transform, filter',
        zIndex: 2,
      });
    },
    onLeave(element, done) {
      if (!enabled || prefersReducedMotion()) {
        finishImmediately(element, done);
        return;
      }

      const currentNavigationId = navigationId;
      leaveElement = element;
      leaveDone = done;
      leaveTween = $gsap.to(element, {
        opacity: 0,
        filter: 'blur(10px)',
        scale: 1.015,
        duration: 0.52,
        ease: 'power2.inOut',
        onComplete: () => {
          if (currentNavigationId !== navigationId) {
            return;
          }

          leaveTween = null;
          leaveDone = null;
          clearElement(element);
          leaveElement = null;
          done();
        },
      });
    },
    onBeforeEnter(element) {
      if (!enabled || prefersReducedMotion()) {
        clearElement(element);
        return;
      }

      $gsap.set(element, {
        opacity: 0,
        filter: 'blur(8px)',
        scale: 1.015,
        y: 15,
        transformOrigin: 'center center',
        willChange: 'opacity, transform, filter',
        zIndex: 1,
      });
    },
    onEnter(element, done) {
      if (!enabled || prefersReducedMotion()) {
        finishImmediately(element, done);
        $lenis.start();
        enabled = false;
        return;
      }

      const currentNavigationId = navigationId;
      enterElement = element;
      enterDone = done;
      enterTween = $gsap.to(element, {
        opacity: 1,
        filter: 'blur(0px)',
        scale: 1,
        y: 0,
        duration: 0.76,
        delay: 0.17,
        ease: 'power4.out',
        onComplete: () => {
          if (currentNavigationId !== navigationId) {
            return;
          }

          enterTween = null;
          enterDone = null;
          clearElement(element);
          enterElement = null;
          $lenis.start();
          enabled = false;
          done();
        },
      });
    },
    onLeaveCancelled(element) {
      cancelActiveTransition();
      clearElement(element);
    },
    onEnterCancelled(element) {
      cancelActiveTransition();
      clearElement(element);
    },
    onAfterLeave(element) {
      clearElement(element);
    },
    onAfterEnter(element) {
      clearElement(element);
      $lenis.start();
      enabled = false;
    },
  };
}
```

- [ ] **Step 4: Run lifecycle contract and typecheck**

Run: `npm test -- tests/cinematicPageTransitionIntegration.test.ts`

Expected: 1 file PASS.

Run: `npm run typecheck`

Expected: exit code 0.

- [ ] **Step 5: Commit transition lifecycle**

```bash
git add -- src/composables/useCinematicPageTransition.ts tests/cinematicPageTransitionIntegration.test.ts
git commit -m "feat: add cinematic page transition lifecycle"
```

### Task 3: Connect NuxtPage without touching intro

**Files:**
- Modify: `src/app.vue`
- Modify: `tests/cinematicPageTransitionIntegration.test.ts`

- [ ] **Step 1: Extend integration test for app boundary**

Add this test to `tests/cinematicPageTransitionIntegration.test.ts`:

```ts
  it('connects transition only to NuxtPage and leaves intro outside', () => {
    const app = projectFile('src/app.vue');

    expect(app).toContain('<ExperienceIntro />');
    expect(app).toContain(':transition="cinematicPageTransition"');
    expect(app).toContain('class="cinematic-route-stage"');
    expect(app).toContain('useCinematicPageTransition()');
    expect(app.indexOf('<ExperienceIntro />')).toBeLessThan(app.indexOf('<NuxtLayout>'));
  });
```

- [ ] **Step 2: Run test and confirm RED**

Run: `npm test -- tests/cinematicPageTransitionIntegration.test.ts`

Expected: FAIL because `src/app.vue` does not connect the transition.

- [ ] **Step 3: Connect transition stage in app.vue**

Replace `src/app.vue` with:

```vue
<template>
  <ExperienceIntro />
  <NuxtLayout>
    <div class="cinematic-route-stage">
      <NuxtPage :transition="cinematicPageTransition" />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import ExperienceIntro from '~/components/ExperienceIntro.vue';
import { useCinematicPageTransition } from '~/composables/useCinematicPageTransition';

const cinematicPageTransition = useCinematicPageTransition();
</script>
```

- [ ] **Step 4: Run integration test and typecheck**

Run: `npm test -- tests/cinematicPageTransitionIntegration.test.ts`

Expected: 2 tests PASS.

Run: `npm run typecheck`

Expected: exit code 0.

- [ ] **Step 5: Commit Nuxt integration**

```bash
git add -- src/app.vue tests/cinematicPageTransitionIntegration.test.ts
git commit -m "feat: connect cinematic Nuxt page dissolve"
```

### Task 4: Add overlap stage and Warm Beige fallback

**Files:**
- Modify: `src/styles/globals.css`
- Modify: `tests/cinematicPageTransitionIntegration.test.ts`

- [ ] **Step 1: Extend integration test for transition CSS**

Add this test to `tests/cinematicPageTransitionIntegration.test.ts`:

```ts
  it('overlays route roots and uses the warm beige document fallback', () => {
    const globals = projectFile('src/styles/globals.css');

    expect(globals).toMatch(/html\s*\{[^}]*background:\s*#efe7da;/s);
    expect(globals).toContain('.cinematic-route-stage');
    expect(globals).toContain('display: grid');
    expect(globals).toContain('.cinematic-route-stage > *');
    expect(globals).toContain('grid-area: 1 / 1');
  });
```

- [ ] **Step 2: Run test and confirm RED**

Run: `npm test -- tests/cinematicPageTransitionIntegration.test.ts`

Expected: FAIL because the stage and Warm Beige fallback styles do not exist.

- [ ] **Step 3: Add fallback and overlap styles**

Change the existing `html` rule background and add the stage rules after `.page-main`:

```css
html {
  min-height: 100%;
  background: #efe7da;
  color: var(--text);
  -webkit-text-size-adjust: 100%;
}

.cinematic-route-stage {
  display: grid;
  min-height: 100dvh;
  isolation: isolate;
}

.cinematic-route-stage > * {
  grid-area: 1 / 1;
  min-width: 0;
}
```

- [ ] **Step 4: Run focused and complete checks**

Run: `npm test -- tests/cinematicRouteTransition.test.ts tests/cinematicPageTransitionIntegration.test.ts`

Expected: both files PASS.

Run: `npm test`

Expected: all tests PASS.

Run: `npm run typecheck`

Expected: exit code 0.

Run: `npm run build`

Expected: Nuxt production build exits 0.

- [ ] **Step 5: Commit stage styles**

```bash
git add -- src/styles/globals.css tests/cinematicPageTransitionIntegration.test.ts
git commit -m "style: support cinematic route overlap"
```

### Task 5: Browser verification

**Files:**
- Verify only; no production file changes expected.

- [ ] **Step 1: Start development server**

Run: `npm run dev`

Expected: Nuxt serves the application on the reported localhost port with no startup error.

- [ ] **Step 2: Verify eligible navigation**

Using Playwright, open `/`, complete the intro, then navigate through `/projetos`, `/orcamento`, and `/`. During each navigation, inspect the route-stage root styles and confirm outgoing blur/scale/fade plus incoming blur/scale/y/fade occur without white flash.

Expected: all eligible route pairs use the dissolve; final URL and visible page match each navigation target.

- [ ] **Step 3: Verify exclusions and history**

Using Playwright, navigate to and from `/contato`, use browser Back and Forward across the three eligible routes, and trigger rapid eligible navigation.

Expected: `/contato` changes immediately without dissolve; Back/Forward dissolves only for eligible pairs; rapid navigation finishes on the latest route with no stuck opacity, filter, transform, or stopped scrolling.

- [ ] **Step 4: Verify reduced motion and intro isolation**

Using Playwright with `reducedMotion: 'reduce'`, reload `/`, complete the intro, and navigate between all three eligible routes.

Expected: intro behavior remains independent; route changes complete without transition blur or transform; no console errors occur.

- [ ] **Step 5: Record final evidence**

Run: `git status --short`

Expected: only the user-provided untracked reference documents remain outside implementation commits:

```text
?? docs/dissolve-cinematografico-demo.html
?? docs/superpowers/plans/INSTRUCOES_CODEX.md
```
