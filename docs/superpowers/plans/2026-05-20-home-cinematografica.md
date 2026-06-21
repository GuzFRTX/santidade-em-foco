# Home Cinematografica Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the home page around `lhermefilms` as a cinematic Video Text experience with horizontal project previews, horizontal timeline, manifesto pause, and final frame CTA.

**Architecture:** Keep the existing Nuxt/Vue component structure and replace the current home section sequence with focused cinematic sections. Use existing data from `src/data/projects.ts` and `src/data/timeline.ts`, with GSAP client-only animations that degrade cleanly under reduced motion and mobile constraints.

**Tech Stack:** Nuxt 3, Vue 3, TypeScript, CSS scoped components, GSAP ScrollTrigger, Lenis, Vitest, Vue Test Utils.

---

## File Structure

- Modify `src/pages/index.vue`: reorder home sections to match the approved spec.
- Modify `src/components/ui/VideoText/VideoText.vue`: turn basic text styling into reusable video-mask text component.
- Modify `src/components/sections/home/HeroVideoTextSection/HeroVideoTextSection.vue`: render `lhermefilms` as full-screen Video Text hero.
- Create `src/components/sections/home/HorizontalProjectsPreviewSection/HorizontalProjectsPreviewSection.vue`: section wrapper and GSAP horizontal scroll logic.
- Create `src/components/sections/home/HorizontalProjectsPreviewSection/ProjectPreviewFrame.vue`: one project preview frame.
- Create `src/components/sections/home/HorizontalProjectsPreviewSection/index.ts`: export section component.
- Modify `src/components/sections/home/VisualStatementSection/VisualStatementSection.vue`: convert current statement into short manifesto pause.
- Create `src/components/sections/home/HorizontalTimelineSection/HorizontalTimelineSection.vue`: timeline wrapper and GSAP right-to-left motion.
- Create `src/components/sections/home/HorizontalTimelineSection/TimelineFrame.vue`: one timeline frame.
- Create `src/components/sections/home/HorizontalTimelineSection/index.ts`: export section component.
- Create `src/components/sections/home/FinalFrameCTASection/FinalFrameCTASection.vue`: final cinematic frame with CTAs.
- Create `src/components/sections/home/FinalFrameCTASection/index.ts`: export final section.
- Add `tests/homeCinematicData.test.ts`: verify section data helpers and featured project filtering.
- Add `tests/videoText.test.ts`: verify VideoText renders configured text/video attributes.

---

### Task 1: Add Home Data Tests

**Files:**
- Create: `tests/homeCinematicData.test.ts`

- [ ] **Step 1: Write failing tests for featured project and timeline assumptions**

```ts
import { describe, expect, it } from 'vitest';
import { projects } from '~/data/projects';
import { timeline } from '~/data/timeline';

describe('cinematic home data', () => {
  it('has featured projects with covers for the horizontal preview', () => {
    const featuredProjects = projects.filter((project) => project.featured);

    expect(featuredProjects.length).toBeGreaterThanOrEqual(3);
    expect(
      featuredProjects.every((project) => Boolean(project.id && project.title && project.categoryLabel && project.cover))
    ).toBe(true);
  });

  it('has timeline entries for the horizontal timeline', () => {
    expect(timeline.length).toBeGreaterThanOrEqual(3);
    expect(timeline.every((item) => Boolean(item.year && item.title && item.text))).toBe(true);
  });
});
```

- [ ] **Step 2: Run tests and verify pass/fail state**

Run: `npm run test -- tests/homeCinematicData.test.ts`

Expected: PASS if current data is complete. If it fails, fix only `src/data/projects.ts` or `src/data/timeline.ts` missing fields with real existing content before continuing.

- [ ] **Step 3: Commit**

```bash
git add tests/homeCinematicData.test.ts src/data/projects.ts src/data/timeline.ts
git commit -m "test: cover cinematic home data"
```

---

### Task 2: Implement Real VideoText Component

**Files:**
- Modify: `src/components/ui/VideoText/VideoText.vue`
- Create: `tests/videoText.test.ts`

- [ ] **Step 1: Write failing component test**

```ts
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import VideoText from '~/components/ui/VideoText/VideoText.vue';

describe('VideoText', () => {
  it('renders masked text with a video source', () => {
    const wrapper = mount(VideoText, {
      props: {
        text: 'lhermefilms',
        src: '/videos/hero/lhermefilms.mp4',
        poster: '/images/FORMATURA CEFET - TURMA MECANICA 2025/LHERME FILMS_326_resultado.avif'
      }
    });

    expect(wrapper.text()).toContain('lhermefilms');
    expect(wrapper.find('video').attributes('src')).toBe('/videos/hero/lhermefilms.mp4');
    expect(wrapper.find('video').attributes('poster')).toBe(
      '/images/FORMATURA CEFET - TURMA MECANICA 2025/LHERME FILMS_326_resultado.avif'
    );
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- tests/videoText.test.ts`

Expected: FAIL because `VideoText` does not accept `text`, `src`, or `poster` props yet.

- [ ] **Step 3: Replace `VideoText.vue` implementation**

```vue
<template>
  <span class="video-text" :aria-label="text">
    <video
      class="video-text__media"
      :src="src"
      :poster="poster"
      autoplay
      muted
      loop
      playsinline
      aria-hidden="true"
    />
    <span class="video-text__label">{{ text }}</span>
  </span>
</template>

<script setup lang="ts">
defineProps<{
  text: string;
  src: string;
  poster?: string;
}>();
</script>

<style scoped>
.video-text {
  position: relative;
  display: inline-grid;
  color: var(--accent);
  font-family: var(--font-display);
  font-size: clamp(74px, 18vw, 248px);
  font-weight: 500;
  letter-spacing: -0.07em;
  line-height: 0.78;
  text-transform: lowercase;
}

.video-text__media {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.78;
  pointer-events: none;
  -webkit-mask-image: linear-gradient(#000, #000);
  mask-image: linear-gradient(#000, #000);
}

.video-text__label {
  position: relative;
  color: transparent;
  background: linear-gradient(90deg, var(--white), var(--accent));
  -webkit-background-clip: text;
  background-clip: text;
  mix-blend-mode: screen;
}

@supports (-webkit-text-fill-color: transparent) {
  .video-text__label {
    -webkit-text-fill-color: transparent;
  }
}

@media (prefers-reduced-motion: reduce) {
  .video-text__media {
    display: none;
  }

  .video-text__label {
    color: var(--accent);
    -webkit-text-fill-color: var(--accent);
  }
}
</style>
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- tests/videoText.test.ts`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/VideoText/VideoText.vue tests/videoText.test.ts
git commit -m "feat: add cinematic video text"
```

---

### Task 3: Rebuild Hero Around `lhermefilms`

**Files:**
- Modify: `src/components/sections/home/HeroVideoTextSection/HeroVideoTextSection.vue`

- [ ] **Step 1: Replace hero template and script**

```vue
<template>
  <section class="hero-section" aria-labelledby="home-hero-title">
    <div class="hero-section__inner">
      <p class="hero-section__eyebrow">Fotografia e video</p>
      <h1 id="home-hero-title" class="hero-section__title">
        <VideoText
          text="lhermefilms"
          src="/videos/hero/lhermefilms.mp4"
          poster="/images/FORMATURA CEFET - TURMA MECANICA 2025/LHERME FILMS_326_resultado.avif"
        />
      </h1>
      <p class="hero-section__copy">
        Coberturas em foto e video com ritmo, detalhe e presenca.
      </p>
    </div>
    <HeroScrollIndicator class="hero-section__indicator" />
  </section>
</template>

<script setup lang="ts">
import VideoText from '~/components/ui/VideoText/VideoText.vue';
import HeroScrollIndicator from './HeroScrollIndicator.vue';
</script>
```

- [ ] **Step 2: Replace hero scoped CSS**

```css
.hero-section {
  position: relative;
  display: grid;
  align-items: center;
  min-height: 100dvh;
  overflow: hidden;
  padding: 108px 40px 72px;
}

.hero-section::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 66% 24%, rgba(184, 170, 150, 0.18), transparent 34rem),
    linear-gradient(180deg, rgba(8, 8, 6, 0), var(--bg-deep));
  pointer-events: none;
}

.hero-section__inner {
  position: relative;
  z-index: 1;
  width: min(100%, 1480px);
  margin: 0 auto;
}

.hero-section__eyebrow {
  margin: 0 0 22px;
  color: var(--accent);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}

.hero-section__title {
  margin: 0;
}

.hero-section__copy {
  max-width: 440px;
  margin: 30px 0 0 auto;
  color: var(--muted);
  font-size: 16px;
  line-height: 1.7;
  text-align: right;
}

.hero-section__indicator {
  position: absolute;
  bottom: 34px;
  left: 48px;
}

@media (max-width: 760px) {
  .hero-section {
    padding: 96px 22px 64px;
  }

  .hero-section__copy {
    margin-left: 0;
    text-align: left;
  }

  .hero-section__indicator {
    left: 22px;
  }
}
```

- [ ] **Step 3: Run typecheck**

Run: `npm run typecheck`

Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/home/HeroVideoTextSection/HeroVideoTextSection.vue
git commit -m "feat: rebuild cinematic home hero"
```

---

### Task 4: Add Horizontal Project Preview Section

**Files:**
- Create: `src/components/sections/home/HorizontalProjectsPreviewSection/HorizontalProjectsPreviewSection.vue`
- Create: `src/components/sections/home/HorizontalProjectsPreviewSection/ProjectPreviewFrame.vue`
- Create: `src/components/sections/home/HorizontalProjectsPreviewSection/index.ts`

- [ ] **Step 1: Create `ProjectPreviewFrame.vue`**

```vue
<template>
  <article class="project-preview-frame">
    <NuxtLink class="project-preview-frame__media" to="/projetos">
      <img :src="project.cover" :alt="project.title" loading="lazy" />
    </NuxtLink>
    <div class="project-preview-frame__copy">
      <p>{{ project.categoryLabel }}</p>
      <h3>{{ project.title }}</h3>
      <NuxtLink to="/projetos">Ver projeto</NuxtLink>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Project } from '~/types/project';

defineProps<{
  project: Project;
}>();
</script>

<style scoped>
.project-preview-frame {
  display: grid;
  grid-template-columns: minmax(280px, 0.8fr) minmax(220px, 0.35fr);
  align-items: end;
  width: min(82vw, 980px);
  min-height: 62vh;
  gap: 28px;
  flex: 0 0 auto;
}

.project-preview-frame:nth-child(even) {
  grid-template-columns: minmax(220px, 0.35fr) minmax(280px, 0.8fr);
}

.project-preview-frame:nth-child(even) .project-preview-frame__media {
  order: 2;
}

.project-preview-frame__media {
  display: block;
  height: min(62vh, 620px);
  overflow: hidden;
  border: 1px solid var(--border-soft);
}

.project-preview-frame__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.02);
}

.project-preview-frame__copy {
  padding-bottom: 42px;
}

.project-preview-frame__copy p {
  margin: 0 0 14px;
  color: var(--accent);
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.project-preview-frame__copy h3 {
  margin: 0 0 22px;
  color: var(--white);
  font-family: var(--font-display);
  font-size: clamp(42px, 7vw, 92px);
  font-weight: 500;
  line-height: 0.9;
}

.project-preview-frame__copy a {
  color: var(--accent);
  font-size: 13px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

@media (max-width: 760px) {
  .project-preview-frame,
  .project-preview-frame:nth-child(even) {
    grid-template-columns: 1fr;
    width: 100%;
    min-height: auto;
  }

  .project-preview-frame:nth-child(even) .project-preview-frame__media {
    order: 0;
  }

  .project-preview-frame__media {
    height: 62vh;
  }

  .project-preview-frame__copy {
    padding-bottom: 0;
  }
}
</style>
```

- [ ] **Step 2: Create `HorizontalProjectsPreviewSection.vue`**

```vue
<template>
  <section ref="sectionRef" class="horizontal-projects" aria-labelledby="horizontal-projects-title">
    <div class="horizontal-projects__header">
      <p class="eyebrow">Projetos realizados</p>
      <h2 id="horizontal-projects-title">Pre-vias em movimento.</h2>
    </div>
    <div ref="trackRef" class="horizontal-projects__track">
      <ProjectPreviewFrame v-for="project in featuredProjects" :key="project.id" :project="project" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import { useNuxtApp } from '#app';
import { projects } from '~/data/projects';
import ProjectPreviewFrame from './ProjectPreviewFrame.vue';

const featuredProjects = computed(() => projects.filter((project) => project.featured));
const sectionRef = ref<HTMLElement | null>(null);
const trackRef = ref<HTMLElement | null>(null);
let ctx: { revert: () => void } | null = null;

onMounted(async () => {
  await nextTick();

  const section = sectionRef.value;
  const track = trackRef.value;
  if (!section || !track || window.matchMedia('(max-width: 760px)').matches) {
    return;
  }

  const { $gsap, $ScrollTrigger } = useNuxtApp();
  const distance = track.scrollWidth - section.clientWidth + 80;

  ctx = $gsap.context(() => {
    $gsap.to(track, {
      x: () => -Math.max(distance, 0),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${Math.max(distance, section.clientWidth)}`,
        scrub: true,
        pin: true,
        invalidateOnRefresh: true
      }
    });
  }, section);

  $ScrollTrigger.refresh();
});

onBeforeUnmount(() => {
  ctx?.revert();
});
</script>

<style scoped>
.horizontal-projects {
  position: relative;
  overflow: hidden;
  min-height: 100dvh;
  padding: 96px 0;
}

.horizontal-projects__header {
  width: min(100% - 48px, 1320px);
  margin: 0 auto 54px;
}

.horizontal-projects__header h2 {
  max-width: 760px;
  margin: 0;
  color: var(--white);
  font-family: var(--font-display);
  font-size: clamp(48px, 8vw, 112px);
  font-weight: 500;
  line-height: 0.9;
}

.horizontal-projects__track {
  display: flex;
  align-items: center;
  gap: 13vw;
  width: max-content;
  padding: 0 10vw 0 48px;
  will-change: transform;
}

@media (max-width: 760px) {
  .horizontal-projects {
    min-height: auto;
    padding: 72px 22px;
  }

  .horizontal-projects__header {
    width: 100%;
    margin-bottom: 40px;
  }

  .horizontal-projects__track {
    display: grid;
    width: 100%;
    gap: 44px;
    padding: 0;
  }
}
</style>
```

- [ ] **Step 3: Create `index.ts`**

```ts
export { default } from './HorizontalProjectsPreviewSection.vue';
```

- [ ] **Step 4: Run typecheck**

Run: `npm run typecheck`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/home/HorizontalProjectsPreviewSection
git commit -m "feat: add horizontal project previews"
```

---

### Task 5: Update Manifesto Pause

**Files:**
- Modify: `src/components/sections/home/VisualStatementSection/VisualStatementSection.vue`

- [ ] **Step 1: Replace copy with approved manifesto role**

Use this template shape if existing component differs:

```vue
<template>
  <section class="visual-statement section section--tight">
    <div class="visual-statement__inner">
      <p class="eyebrow">Manifesto visual</p>
      <h2>Ritmo, detalhe e presenca em cada registro.</h2>
    </div>
  </section>
</template>

<style scoped>
.visual-statement {
  padding-inline: 48px;
}

.visual-statement__inner {
  width: min(100%, 1120px);
  margin: 0 auto;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  padding: 82px 0;
}

.visual-statement__inner h2 {
  max-width: 980px;
  margin: 0;
  color: var(--white);
  font-family: var(--font-display);
  font-size: clamp(42px, 7vw, 104px);
  font-weight: 500;
  line-height: 0.95;
}

@media (max-width: 760px) {
  .visual-statement {
    padding-inline: 22px;
  }
}
</style>
```

- [ ] **Step 2: Run typecheck**

Run: `npm run typecheck`

Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/home/VisualStatementSection/VisualStatementSection.vue
git commit -m "feat: refine home manifesto pause"
```

---

### Task 6: Add Horizontal Timeline Section

**Files:**
- Create: `src/components/sections/home/HorizontalTimelineSection/HorizontalTimelineSection.vue`
- Create: `src/components/sections/home/HorizontalTimelineSection/TimelineFrame.vue`
- Create: `src/components/sections/home/HorizontalTimelineSection/index.ts`

- [ ] **Step 1: Create `TimelineFrame.vue`**

```vue
<template>
  <article class="timeline-frame">
    <p>{{ item.year }}</p>
    <h3>{{ item.title }}</h3>
    <span>{{ item.text }}</span>
  </article>
</template>

<script setup lang="ts">
import type { TimelineEntry } from '~/types/timeline';

defineProps<{
  item: TimelineEntry;
}>();
</script>

<style scoped>
.timeline-frame {
  width: min(72vw, 520px);
  min-height: 360px;
  flex: 0 0 auto;
  border-left: 1px solid var(--border);
  padding: 28px 34px;
}

.timeline-frame p {
  margin: 0 0 52px;
  color: var(--accent);
  font-size: 13px;
  letter-spacing: 0.18em;
}

.timeline-frame h3 {
  margin: 0 0 22px;
  color: var(--white);
  font-family: var(--font-display);
  font-size: clamp(42px, 6vw, 78px);
  font-weight: 500;
  line-height: 0.92;
}

.timeline-frame span {
  display: block;
  max-width: 34ch;
  color: var(--muted);
  font-size: 15px;
  line-height: 1.75;
}

@media (max-width: 760px) {
  .timeline-frame {
    width: 100%;
    min-height: auto;
    padding: 26px 0 34px 24px;
  }
}
</style>
```

- [ ] **Step 2: Create `HorizontalTimelineSection.vue`**

```vue
<template>
  <section ref="sectionRef" class="horizontal-timeline" aria-labelledby="timeline-title">
    <div class="horizontal-timeline__heading">
      <p class="eyebrow">Linha do tempo</p>
      <h2 id="timeline-title">Do primeiro olhar ao filme completo.</h2>
    </div>
    <div ref="trackRef" class="horizontal-timeline__track">
      <TimelineFrame v-for="item in timeline" :key="item.year" :item="item" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import { useNuxtApp } from '#app';
import { timeline } from '~/data/timeline';
import TimelineFrame from './TimelineFrame.vue';

const sectionRef = ref<HTMLElement | null>(null);
const trackRef = ref<HTMLElement | null>(null);
let ctx: { revert: () => void } | null = null;

onMounted(async () => {
  await nextTick();

  const section = sectionRef.value;
  const track = trackRef.value;
  if (!section || !track || window.matchMedia('(max-width: 760px)').matches) {
    return;
  }

  const { $gsap, $ScrollTrigger } = useNuxtApp();
  const distance = track.scrollWidth - section.clientWidth + 120;

  ctx = $gsap.context(() => {
    $gsap.fromTo(
      track,
      { x: () => -Math.max(distance, 0) },
      {
        x: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${Math.max(distance, section.clientWidth)}`,
          scrub: true,
          pin: true,
          invalidateOnRefresh: true
        }
      }
    );
  }, section);

  $ScrollTrigger.refresh();
});

onBeforeUnmount(() => {
  ctx?.revert();
});
</script>

<style scoped>
.horizontal-timeline {
  position: relative;
  overflow: hidden;
  min-height: 100dvh;
  padding: 96px 0;
}

.horizontal-timeline__heading {
  width: min(100% - 48px, 1320px);
  margin: 0 auto 58px;
}

.horizontal-timeline__heading h2 {
  max-width: 840px;
  margin: 0;
  color: var(--white);
  font-family: var(--font-display);
  font-size: clamp(44px, 7vw, 98px);
  font-weight: 500;
  line-height: 0.95;
}

.horizontal-timeline__track {
  display: flex;
  width: max-content;
  padding: 0 12vw;
  will-change: transform;
}

@media (max-width: 760px) {
  .horizontal-timeline {
    min-height: auto;
    padding: 72px 22px;
  }

  .horizontal-timeline__heading {
    width: 100%;
    margin-bottom: 42px;
  }

  .horizontal-timeline__track {
    display: grid;
    width: 100%;
    padding: 0;
  }
}
</style>
```

- [ ] **Step 3: Create `index.ts`**

```ts
export { default } from './HorizontalTimelineSection.vue';
```

- [ ] **Step 4: Run typecheck**

Run: `npm run typecheck`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/home/HorizontalTimelineSection
git commit -m "feat: add horizontal home timeline"
```

---

### Task 7: Add Final Frame CTA

**Files:**
- Create: `src/components/sections/home/FinalFrameCTASection/FinalFrameCTASection.vue`
- Create: `src/components/sections/home/FinalFrameCTASection/index.ts`

- [ ] **Step 1: Create `FinalFrameCTASection.vue`**

```vue
<template>
  <section class="final-frame" aria-labelledby="final-frame-title">
    <img
      class="final-frame__image"
      src="/images/FORMATURA CEFET - TURMA MECANICA 2025/LHERME FILMS_206_resultado.avif"
      alt="Registro de formatura fotografado pela lhermefilms"
      loading="lazy"
    />
    <div class="final-frame__overlay" />
    <div class="final-frame__content">
      <p class="eyebrow">Frame final</p>
      <h2 id="final-frame-title">Veja a historia completa.</h2>
      <div class="final-frame__actions">
        <Button to="/projetos">Ver projetos</Button>
        <Button to="/contato" variant="ghost">Entrar em contato</Button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Button from '~/components/ui/Button/Button.vue';
</script>

<style scoped>
.final-frame {
  position: relative;
  min-height: 100dvh;
  display: grid;
  align-items: end;
  overflow: hidden;
  padding: 96px 48px;
}

.final-frame__image,
.final-frame__overlay {
  position: absolute;
  inset: 0;
}

.final-frame__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.final-frame__overlay {
  background:
    linear-gradient(90deg, rgba(8, 8, 6, 0.92), rgba(8, 8, 6, 0.32)),
    linear-gradient(180deg, transparent, var(--bg-deep));
}

.final-frame__content {
  position: relative;
  z-index: 1;
  width: min(100%, 980px);
}

.final-frame__content h2 {
  margin: 0;
  color: var(--white);
  font-family: var(--font-display);
  font-size: clamp(54px, 10vw, 138px);
  font-weight: 500;
  line-height: 0.9;
}

.final-frame__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 34px;
}

@media (max-width: 760px) {
  .final-frame {
    min-height: 82dvh;
    padding: 72px 22px;
  }
}
</style>
```

- [ ] **Step 2: Create `index.ts`**

```ts
export { default } from './FinalFrameCTASection.vue';
```

- [ ] **Step 3: Run typecheck**

Run: `npm run typecheck`

Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/home/FinalFrameCTASection
git commit -m "feat: add cinematic final frame"
```

---

### Task 8: Wire Home Page Sequence

**Files:**
- Modify: `src/pages/index.vue`

- [ ] **Step 1: Replace home imports and template**

```vue
<template>
  <PageWrapper>
    <HeroVideoTextSection />
    <HorizontalProjectsPreviewSection />
    <VisualStatementSection />
    <HorizontalTimelineSection />
    <FinalFrameCTASection />
  </PageWrapper>
</template>

<script setup lang="ts">
import { useHead } from '#app';
import PageWrapper from '~/components/layout/PageWrapper/PageWrapper.vue';
import HeroVideoTextSection from '~/components/sections/home/HeroVideoTextSection/HeroVideoTextSection.vue';
import HorizontalProjectsPreviewSection from '~/components/sections/home/HorizontalProjectsPreviewSection/HorizontalProjectsPreviewSection.vue';
import VisualStatementSection from '~/components/sections/home/VisualStatementSection/VisualStatementSection.vue';
import HorizontalTimelineSection from '~/components/sections/home/HorizontalTimelineSection/HorizontalTimelineSection.vue';
import FinalFrameCTASection from '~/components/sections/home/FinalFrameCTASection/FinalFrameCTASection.vue';

useHead({
  title: 'Portfolio'
});
</script>
```

- [ ] **Step 2: Run typecheck**

Run: `npm run typecheck`

Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.vue
git commit -m "feat: wire cinematic home sequence"
```

---

### Task 9: Full Verification

**Files:**
- Verify: all changed files

- [ ] **Step 1: Run unit tests**

Run: `npm test`

Expected: all Vitest tests pass.

- [ ] **Step 2: Run typecheck**

Run: `npm run typecheck`

Expected: Nuxt typecheck passes.

- [ ] **Step 3: Run production build**

Run: `npm run build`

Expected: Nuxt build completes without errors.

- [ ] **Step 4: Start dev server**

Run: `npm run dev -- --port 5173`

Expected: app available at `http://127.0.0.1:5173/`.

- [ ] **Step 5: Visual QA desktop**

Open `http://127.0.0.1:5173/` at `1440x900`.

Check:
- `lhermefilms` fills first viewport.
- Hero text has video or poster fallback visible.
- Project section scrolls horizontally on desktop.
- Timeline moves right-to-left on desktop.
- Final frame CTA is visible and readable.
- No text overlaps.

- [ ] **Step 6: Visual QA mobile**

Open `http://127.0.0.1:5173/` at `390x844`.

Check:
- No horizontal overflow.
- Project previews stack cleanly.
- Timeline is readable vertically.
- CTAs fit inside viewport.

- [ ] **Step 7: Reduced motion QA**

Enable `prefers-reduced-motion: reduce` in browser emulation.

Check:
- VideoText fallback remains readable.
- Horizontal sections remain readable without scroll animation dependency.

- [ ] **Step 8: Final commit**

```bash
git status --short
git add tests/homeCinematicData.test.ts
git add tests/videoText.test.ts
git add src/components/ui/VideoText/VideoText.vue
git add src/components/sections/home/HeroVideoTextSection/HeroVideoTextSection.vue
git add src/components/sections/home/HorizontalProjectsPreviewSection
git add src/components/sections/home/VisualStatementSection/VisualStatementSection.vue
git add src/components/sections/home/HorizontalTimelineSection
git add src/components/sections/home/FinalFrameCTASection
git add src/pages/index.vue
git commit -m "feat: implement cinematic home experience"
```

---

## Spec Coverage Review

- Hero Video Text: Tasks 2 and 3.
- Horizontal project previews: Task 4.
- Manifesto pause: Task 5.
- Horizontal right-to-left timeline: Task 6.
- Final cinematic frame CTA: Task 7.
- Home sequence wiring: Task 8.
- Data, motion, accessibility, performance, responsive acceptance criteria: Tasks 1 and 9.

## Execution Notes

- The repository already has unrelated dirty files. Do not revert them.
- Commit only files touched by each task.
- The current plan assumes `/videos/hero/lhermefilms.mp4` will exist or the poster fallback will carry the hero. If the asset is absent, keep the poster readable and add the video file later.
