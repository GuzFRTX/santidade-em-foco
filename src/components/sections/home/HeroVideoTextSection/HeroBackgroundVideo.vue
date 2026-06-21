<template>
  <div class="hero-media" aria-label="Projetos em destaque">
    <div class="hero-media__track">
      <figure
        v-for="photo in photos"
        :key="photo.src"
        class="hero-media__slide"
      >
        <img :src="photo.src" :alt="photo.alt" loading="lazy" decoding="async" />
      </figure>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Photo } from '~/types/photo';

defineProps<{
  photos: Photo[];
}>();
</script>

<style scoped>
.hero-media {
  position: relative;
  width: min(46vw, 680px);
  height: min(74dvh, 720px);
  overflow: hidden;
  border-radius: 18px;
}

.hero-media::before,
.hero-media::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
}

.hero-media::before {
  background: linear-gradient(180deg, var(--bg) 0%, rgba(var(--bg-rgb), 0) 18%, rgba(var(--bg-rgb), 0) 78%, var(--bg) 100%);
}

.hero-media::after {
  border: 1px solid var(--border-soft);
  border-radius: inherit;
}

.hero-media__track {
  display: grid;
  gap: 20px;
  animation: heroRail 22s cubic-bezier(0.16, 1, 0.3, 1) infinite;
}

.hero-media__slide {
  height: min(74dvh, 720px);
  margin: 0;
  overflow: hidden;
  border-radius: 18px;
  background: var(--surface);
}

.hero-media__slide img {
  width: 100%;
  height: 112%;
  object-fit: cover;
  filter: saturate(0.88) contrast(1.04);
}

@keyframes heroRail {
  0%,
  18% {
    transform: translateY(0);
  }

  25%,
  43% {
    transform: translateY(calc(-1 * (min(74dvh, 720px) + 20px)));
  }

  50%,
  68% {
    transform: translateY(calc(-2 * (min(74dvh, 720px) + 20px)));
  }

  75%,
  93% {
    transform: translateY(calc(-3 * (min(74dvh, 720px) + 20px)));
  }

  100% {
    transform: translateY(0);
  }
}

@media (max-width: 920px) {
  .hero-media {
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 10;
  }

  .hero-media__track {
    display: flex;
    height: 100%;
    animation: none;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
  }

  .hero-media__slide {
    flex: 0 0 100%;
    height: 100%;
    scroll-snap-align: start;
  }
}
</style>
