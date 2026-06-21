# Intro “GUZ” Size Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Increase only the “GUZ” brand credit on the initial loading screen from `0.96rem` to `1.06rem` while preserving its secondary visual hierarchy.

**Architecture:** Keep the existing `ExperienceIntro.vue` markup and scoped styles. Add one declaration to the selector already dedicated to the `span` wrapping “GUZ”, protected by a focused source-contract test.

**Tech Stack:** Nuxt 3, Vue 3 scoped CSS, Vitest

---

### Task 1: Increase the intro “GUZ” credit

**Files:**
- Create: `tests/introGuzSize.test.ts`
- Modify: `src/components/ExperienceIntro.vue:325`

- [ ] **Step 1: Write the failing test**

```ts
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const source = readFileSync(
  join(process.cwd(), 'src/components/ExperienceIntro.vue'),
  'utf8',
);

describe('intro GUZ size', () => {
  it('increases only the GUZ brand credit', () => {
    expect(source).toMatch(
      /\.experience-intro__message small span\s*\{[^}]*font-size:\s*1\.06rem;/s,
    );
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/introGuzSize.test.ts`

Expected: FAIL because `.experience-intro__message small span` still declares `font-size: 0.96rem`, not `1.06rem`.

- [ ] **Step 3: Add the approved font size**

Update the existing selector in `src/components/ExperienceIntro.vue`:

```css
.experience-intro__message small span {
  font-family: var(--font-brand);
  font-size: 1.06rem;
  font-weight: 400;
}
```

- [ ] **Step 4: Run focused and full verification**

Run: `npm test -- tests/introGuzSize.test.ts`

Expected: PASS.

Run: `npm test`

Expected: all tests PASS.

Run: `npm run typecheck`

Expected: exit code 0.

- [ ] **Step 5: Commit implementation**

```bash
git add -- tests/introGuzSize.test.ts src/components/ExperienceIntro.vue
git commit -m "style: enlarge intro GUZ credit"
```
