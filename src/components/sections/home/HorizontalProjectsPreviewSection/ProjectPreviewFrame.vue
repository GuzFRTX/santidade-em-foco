<template>
  <article class="project-preview-frame">
    <NuxtLink class="project-preview-frame__media" to="/projetos">
      <img :src="photo.src" :alt="photo.alt" loading="lazy" />
    </NuxtLink>
  </article>
</template>

<script setup lang="ts">
import type { Photo } from '~/types/photo';

defineProps<{
  photo: Photo;
}>();
</script>

<style scoped>
.project-preview-frame {
  display: block;
  width: min(56vw, 520px);
  flex: 0 0 auto;
}

.project-preview-frame:nth-child(even) {
  width: min(48vw, 420px);
}

.project-preview-frame__media {
  display: block;
  height: min(58vh, 540px);
  overflow: hidden;
  border: 1px solid rgba(var(--text-rgb), 0.08);
  border-radius: 12px;
  background: var(--surface);
  box-shadow: 0 18px 42px rgba(var(--text-rgb), 0.14);
}

.project-preview-frame__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.02);
}

@media (max-width: 760px) {
  .project-preview-frame,
  .project-preview-frame:nth-child(even) {
    width: clamp(248px, 78vw, 430px);
  }

  .project-preview-frame__media {
    height: 62vh;
  }
}

@media (min-width: 761px) and (max-width: 1024px) {
  .project-preview-frame,
  .project-preview-frame:nth-child(even) {
    width: clamp(360px, 48vw, 520px);
  }

  .project-preview-frame__media {
    height: min(58vh, 520px);
  }
}

@media (max-width: 1024px) {
  .project-preview-frame {
    scroll-snap-align: center;
  }
}
</style>
