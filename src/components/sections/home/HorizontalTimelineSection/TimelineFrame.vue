<template>
  <article class="timeline-frame" :class="{ 'timeline-frame--text-only': !item.image }">
    <div class="timeline-frame__copy">
      <p>{{ item.year }}</p>
      <h3>{{ item.title }}</h3>
      <span v-for="paragraph in item.text" :key="paragraph">{{ paragraph }}</span>
    </div>
    <figure v-if="item.image" class="timeline-frame__media">
      <img :src="item.image" :alt="item.imageAlt ?? ''" loading="eager" />
    </figure>
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
  display: grid;
  grid-template-columns: minmax(260px, 1fr) minmax(220px, 0.78fr);
  align-items: center;
  gap: clamp(20px, 3vw, 36px);
  width: min(84vw, 900px);
  height: min(600px, calc(100dvh - 218px));
  min-height: 420px;
  flex: 0 0 auto;
  border-left: 1px solid var(--border);
  padding: clamp(18px, 2.6dvh, 28px) clamp(22px, 2.8vw, 34px);
}

.timeline-frame__copy {
  display: grid;
  align-content: start;
  min-width: 0;
}

.timeline-frame:nth-child(even) .timeline-frame__copy {
  order: 2;
  margin-top: 0;
}

.timeline-frame--text-only {
  grid-template-columns: minmax(0, 660px);
  align-content: center;
}

.timeline-frame p {
  margin: 0 0 clamp(16px, 2.4dvh, 26px);
  color: var(--accent);
  font-size: 12px;
  letter-spacing: 0.18em;
}

.timeline-frame h3 {
  max-width: 13ch;
  margin: 0 0 clamp(16px, 2.2dvh, 22px);
  color: var(--text);
  font-family: var(--font-display);
  font-size: clamp(28px, 4.8dvh, 44px);
  font-weight: 500;
  line-height: 0.94;
}

.timeline-frame span {
  display: block;
  max-width: 54ch;
  color: var(--muted);
  font-size: clamp(12px, 1.45dvh, 14px);
  line-height: 1.52;
}

.timeline-frame span + span {
  margin-top: clamp(10px, 1.6dvh, 14px);
}

.timeline-frame__media {
  width: min(100%, 340px);
  justify-self: end;
  margin: 0;
  overflow: hidden;
  aspect-ratio: 4 / 5;
  background: var(--border-soft);
}

.timeline-frame:nth-child(even) .timeline-frame__media {
  justify-self: start;
  order: 1;
}

.timeline-frame__media img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0.92) contrast(1.03);
}

@media (max-width: 760px) {
  .timeline-frame {
    width: 100%;
    height: auto;
    min-height: auto;
    padding: 26px 0 34px 24px;
  }
}

@media (min-width: 761px) and (max-width: 1024px) {
  .timeline-frame {
    width: 100%;
    min-height: auto;
    padding: 30px 0 42px 34px;
  }
}

@media (max-width: 1024px) {
  .timeline-frame {
    grid-template-columns: 1fr;
    gap: 0;
    position: relative;
    height: auto;
    border-left: 0;
  }

  .timeline-frame::before {
    position: absolute;
    top: 34px;
    left: -5px;
    width: 9px;
    height: 9px;
    border: 1px solid var(--accent);
    border-radius: 999px;
    background: var(--bg);
    content: '';
  }

  .timeline-frame p {
    margin-bottom: 20px;
  }

  .timeline-frame h3 {
    max-width: 14ch;
    font-size: clamp(30px, 8vw, 48px);
  }

  .timeline-frame span {
    max-width: 42ch;
  }

  .timeline-frame:nth-child(even) .timeline-frame__copy {
    order: initial;
    margin-top: 0;
  }

  .timeline-frame__media,
  .timeline-frame:nth-child(even) .timeline-frame__media {
    order: initial;
    justify-self: start;
    width: min(100%, 440px);
    margin: 28px 0 0;
    aspect-ratio: 4 / 5;
  }
}
</style>
