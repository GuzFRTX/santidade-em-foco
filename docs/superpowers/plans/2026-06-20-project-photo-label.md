# Project Photo Label Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace every visible and accessible `Lherme Films` label on the corresponding project photos with `Santidade em Foco`.

**Architecture:** Keep image assets and carousel rendering unchanged. Update project metadata at its single source of truth in `src/data/projects.ts`, protected by a focused Vitest regression test.

**Tech Stack:** Nuxt 3, TypeScript, Vitest

---

### Task 1: Update project photo labels

**Files:**
- Create: `tests/projectPhotoLabels.test.ts`
- Modify: `src/data/projects.ts`

- [ ] **Step 1: Write failing regression test**

```ts
import { describe, expect, it } from 'vitest';
import { projects } from '~/data/projects';

describe('project photo labels', () => {
  it('labels every former Lherme Films photo as Santidade em Foco', () => {
    const project = projects.find((item) => item.id === 'lherme-films');

    expect(project?.title).toBe('Santidade em Foco');
    expect(project?.photos).toHaveLength(5);
    expect(project?.photos.every((photo) => photo.alt.startsWith('Santidade em Foco -'))).toBe(true);
  });
});
```

- [ ] **Step 2: Confirm test fails before implementation**

Run: `npm.cmd test -- tests/projectPhotoLabels.test.ts`

Expected: FAIL because project title and photo alternative text still use `Lherme Films`.

- [ ] **Step 3: Update metadata**

In `src/data/projects.ts`, keep project ID and image paths unchanged. Change only:

```ts
title: 'Santidade em Foco',
```

Then replace each of five `Lherme Films - ...` alternative texts with matching `Santidade em Foco - ...` text.

- [ ] **Step 4: Run focused test**

Run: `npm.cmd test -- tests/projectPhotoLabels.test.ts`

Expected: PASS, one test passing.

- [ ] **Step 5: Run full verification**

Run: `npm.cmd test`

Expected: PASS, complete test suite passing.

Run: `npm.cmd run typecheck`

Expected: exit code 0 with no TypeScript errors.

- [ ] **Step 6: Commit implementation**

```bash
git add -- tests/projectPhotoLabels.test.ts src/data/projects.ts
git commit -m "fix: update project photo labels"
```

