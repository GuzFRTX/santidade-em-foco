# Projects Video Carousel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace scattered project-film cards with one circular, accessible carousel that matches the portfolio palette and approved minimalist cinematic design.

**Architecture:** Keep `ProjectsFilmSection.vue` responsible for section framing and entrance animation. Move carousel state into a small composable and interactive stage/modal rendering into `ProjectsFilmCarousel.vue`, allowing behavior to be tested without Nuxt runtime mocks.

**Tech Stack:** Nuxt 3, Vue 3 Composition API, TypeScript, Vitest, Vue Test Utils, scoped CSS, existing GSAP plugin.

---

## File map

- Create `src/composables/useCircularCarousel.ts`: bounded circular index, next/previous navigation, touch threshold.
- Create `src/components/sections/projects/ProjectsFilmSection/ProjectsFilmCarousel.vue`: active film stage, controls, keyboard/touch support, modal playback.
- Modify `src/components/sections/projects/ProjectsFilmSection/ProjectsFilmSection.vue`: approved section frame, palette, typography and child integration.
- Create `tests/circularCarousel.test.ts`: unit coverage for navigation and edge cases.
- Create `tests/projectsFilmCarousel.test.ts`: component behavior and accessibility coverage.
- Create `tests/projectsFilmSectionDesign.test.ts`: stable design-contract checks for project tokens and approved geometry.

### Task 1: Circular carousel state

**Files:**
- Create: `tests/circularCarousel.test.ts`
- Create: `src/composables/useCircularCarousel.ts`

- [ ] **Step 1: Write failing state tests**

```ts
import { describe, expect, it } from 'vitest';
import { useCircularCarousel } from '~/composables/useCircularCarousel';

describe('useCircularCarousel', () => {
  it('wraps next and previous navigation', () => {
    const carousel = useCircularCarousel(() => 3);
    carousel.previous();
    expect(carousel.activeIndex.value).toBe(2);
    carousel.next();
    expect(carousel.activeIndex.value).toBe(0);
  });

  it('stays at zero for empty and single-item lists', () => {
    const empty = useCircularCarousel(() => 0);
    const single = useCircularCarousel(() => 1);
    empty.next();
    single.previous();
    expect(empty.activeIndex.value).toBe(0);
    expect(single.activeIndex.value).toBe(0);
  });

  it('changes slide only after a deliberate horizontal swipe', () => {
    const carousel = useCircularCarousel(() => 3);
    carousel.startSwipe(180);
    carousel.endSwipe(110);
    expect(carousel.activeIndex.value).toBe(1);
    carousel.startSwipe(110);
    carousel.endSwipe(150);
    expect(carousel.activeIndex.value).toBe(1);
    carousel.startSwipe(110);
    carousel.endSwipe(180);
    expect(carousel.activeIndex.value).toBe(0);
  });
});
```

- [ ] **Step 2: Run test and confirm RED**

Run: `npm.cmd test -- tests/circularCarousel.test.ts`

Expected: FAIL because `~/composables/useCircularCarousel` does not exist.

- [ ] **Step 3: Implement minimal composable**

```ts
import { ref } from 'vue';

const SWIPE_THRESHOLD = 48;

export function useCircularCarousel(getLength: () => number) {
  const activeIndex = ref(0);
  const swipeStartX = ref<number | null>(null);

  function normalize(index: number) {
    const length = getLength();
    return length > 0 ? (index + length) % length : 0;
  }

  function next() {
    activeIndex.value = normalize(activeIndex.value + 1);
  }

  function previous() {
    activeIndex.value = normalize(activeIndex.value - 1);
  }

  function startSwipe(clientX: number) {
    swipeStartX.value = clientX;
  }

  function endSwipe(clientX: number) {
    if (swipeStartX.value === null) return;
    const distance = clientX - swipeStartX.value;
    swipeStartX.value = null;
    if (distance <= -SWIPE_THRESHOLD) next();
    if (distance >= SWIPE_THRESHOLD) previous();
  }

  return { activeIndex, next, previous, startSwipe, endSwipe };
}
```

- [ ] **Step 4: Run test and confirm GREEN**

Run: `npm.cmd test -- tests/circularCarousel.test.ts`

Expected: 3 tests pass.

### Task 2: Interactive single-film stage

**Files:**
- Create: `tests/projectsFilmCarousel.test.ts`
- Create: `src/components/sections/projects/ProjectsFilmSection/ProjectsFilmCarousel.vue`

- [ ] **Step 1: Write failing component tests**

```ts
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import ProjectsFilmCarousel from '~/components/sections/projects/ProjectsFilmSection/ProjectsFilmCarousel.vue';
import type { VideoProject } from '~/types/video';

const videos: VideoProject[] = [
  { id: 'one', title: 'Filme um', date: '2025', src: '/one.mp4', thumbnail: '/one.jpg', thumbnailAlt: 'Capa um', categoryLabel: 'Casamento' },
  { id: 'two', title: 'Filme dois', date: '2026', src: '/two.mp4', thumbnail: '/two.jpg', thumbnailAlt: 'Capa dois', categoryLabel: 'Batizado' }
];

describe('ProjectsFilmCarousel', () => {
  it('renders one active film and cycles with controls', async () => {
    const wrapper = mount(ProjectsFilmCarousel, { props: { videos }, global: { stubs: { Teleport: true } } });
    expect(wrapper.text()).toContain('Filme um');
    expect(wrapper.findAll('.film-carousel__stage')).toHaveLength(1);
    await wrapper.get('[aria-label="Próximo filme: Filme dois"]').trigger('click');
    expect(wrapper.text()).toContain('Filme dois');
    expect(wrapper.text()).toContain('02 / 02');
  });

  it('supports keyboard navigation and circular return', async () => {
    const wrapper = mount(ProjectsFilmCarousel, { props: { videos } });
    await wrapper.get('.film-carousel').trigger('keydown', { key: 'ArrowLeft' });
    expect(wrapper.text()).toContain('Filme dois');
    await wrapper.get('.film-carousel').trigger('keydown', { key: 'ArrowRight' });
    expect(wrapper.text()).toContain('Filme um');
  });

  it('opens only the active film in the modal', async () => {
    const wrapper = mount(ProjectsFilmCarousel, { props: { videos }, global: { stubs: { Teleport: true } } });
    await wrapper.get('[aria-label="Assistir Filme um"]').trigger('click');
    expect(wrapper.get('.film-modal__video').attributes('src')).toBe('/one.mp4');
    await wrapper.get('[aria-label="Fechar filme"]').trigger('click');
    expect(wrapper.find('.film-modal').exists()).toBe(false);
  });

  it('renders safely for empty and single-item lists', () => {
    const empty = mount(ProjectsFilmCarousel, { props: { videos: [] } });
    const single = mount(ProjectsFilmCarousel, { props: { videos: [videos[0]] } });
    expect(empty.find('.film-carousel__stage').exists()).toBe(false);
    expect(single.find('.film-carousel__controls').exists()).toBe(false);
  });
});
```

- [ ] **Step 2: Run test and confirm RED**

Run: `npm.cmd test -- tests/projectsFilmCarousel.test.ts`

Expected: FAIL because `ProjectsFilmCarousel.vue` does not exist.

- [ ] **Step 3: Implement stage behavior**

Create `ProjectsFilmCarousel.vue` with these concrete bindings:

```vue
<script setup lang="ts">
import { computed, ref } from 'vue';
import { useCircularCarousel } from '~/composables/useCircularCarousel';
import type { VideoProject } from '~/types/video';

const props = defineProps<{ videos: VideoProject[] }>();
const activeVideo = ref<VideoProject | null>(null);
const videoRef = ref<HTMLVideoElement | null>(null);
const carousel = useCircularCarousel(() => props.videos.length);
const currentVideo = computed(() => props.videos[carousel.activeIndex.value] ?? null);
const counter = computed(() => `${String(carousel.activeIndex.value + 1).padStart(2, '0')} / ${String(props.videos.length).padStart(2, '0')}`);
const nextVideo = computed(() => props.videos[(carousel.activeIndex.value + 1) % props.videos.length]);
const previousVideo = computed(() => props.videos[(carousel.activeIndex.value - 1 + props.videos.length) % props.videos.length]);

function closeFilm() {
  videoRef.value?.pause();
  activeVideo.value = null;
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'ArrowLeft') carousel.previous();
  if (event.key === 'ArrowRight') carousel.next();
  if (event.key === 'Escape' && activeVideo.value) closeFilm();
}
</script>
```

Template requirements: one keyed `.film-carousel__stage`, poster image with approved alt text, `Assistir {title}` trigger, metadata overlay, live counter, progress width derived from `(activeIndex + 1) / videos.length`, conditional controls for lists longer than one, touch start/end handlers, and existing accessible modal markup. CSS requirements: `var(--bg)`, `var(--surface)`, `var(--text)`, `var(--muted)`, `var(--border)`, `var(--shadow)`, `var(--font-display)`, 24 px frame radius, circular play/arrows, 16:9 stage, short opacity/translate transition, reduced-motion override, and mobile controls at least 44 px.

- [ ] **Step 4: Run tests and confirm GREEN**

Run: `npm.cmd test -- tests/circularCarousel.test.ts tests/projectsFilmCarousel.test.ts`

Expected: 7 tests pass.

### Task 3: Integrate approved section design

**Files:**
- Create: `tests/projectsFilmSectionDesign.test.ts`
- Modify: `src/components/sections/projects/ProjectsFilmSection/ProjectsFilmSection.vue`

- [ ] **Step 1: Write failing design contract test**

```ts
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const source = readFileSync(join(process.cwd(), 'src/components/sections/projects/ProjectsFilmSection/ProjectsFilmSection.vue'), 'utf8');

describe('projects film section design', () => {
  it('uses one carousel and project design tokens', () => {
    expect(source).toContain('<ProjectsFilmCarousel :videos="videos" />');
    expect(source).not.toContain('v-for="video in videos"');
    expect(source).toContain('font-family: var(--font-display)');
    expect(source).toContain('background: var(--bg)');
    expect(source).toContain('color: var(--text)');
  });
});
```

- [ ] **Step 2: Run test and confirm RED**

Run: `npm.cmd test -- tests/projectsFilmSectionDesign.test.ts`

Expected: FAIL because current section loops over cards and uses a disconnected dark background.

- [ ] **Step 3: Replace cards with approved section shell**

Import and render `ProjectsFilmCarousel`, retain `videos: VideoProject[]`, keep the GSAP entrance scoped to `.film-section__copy` and `.film-carousel`, remove modal/card state from the section, and replace hard-coded dark palette with project tokens. Keep copy concise:

```vue
<div class="film-section__copy">
  <p class="film-section__eyebrow">02 &mdash; Filmes</p>
  <h2 id="film-section-title">Histórias em movimento.</h2>
</div>
<ProjectsFilmCarousel :videos="videos" />
```

Use full-width warm background continuity, `var(--font-display)` for heading, `var(--text)` for copy, and spacing aligned with `ProjectsPhotoCarousel`.

- [ ] **Step 4: Run focused tests and confirm GREEN**

Run: `npm.cmd test -- tests/circularCarousel.test.ts tests/projectsFilmCarousel.test.ts tests/projectsFilmSectionDesign.test.ts`

Expected: all focused tests pass.

### Task 4: Full verification and visual QA

**Files:**
- Modify only files above if verification exposes a defect.

- [ ] **Step 1: Run full automated verification**

Run: `npm.cmd test`

Expected: all test files pass.

Run: `npm.cmd run typecheck`

Expected: exit code 0.

Run: `npm.cmd run build`

Expected: Nuxt production build completes with exit code 0.

- [ ] **Step 2: Verify desktop and mobile in browser**

Run development server, open `/projetos` at 1440×900 and 390×844, then verify: exact project font, token-based warm palette, one visible film, 24 px rounded frame, rounded controls, circular navigation, modal playback, keyboard arrows, swipe, no horizontal overflow, visible focus, and reduced-motion behavior.

- [ ] **Step 3: Review final diff**

Run: `git diff -- src/composables/useCircularCarousel.ts src/components/sections/projects/ProjectsFilmSection tests`

Expected: only carousel feature files and tests changed; unrelated user changes remain untouched.
