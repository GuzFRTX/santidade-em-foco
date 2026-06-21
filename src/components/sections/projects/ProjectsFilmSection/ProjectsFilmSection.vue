<template>
  <section ref="rootRef" class="film-section" aria-labelledby="film-section-title">
    <div class="film-section__inner">
      <header class="film-section__copy">
        <p class="film-section__eyebrow">02 &mdash; Filmes</p>
        <h2 id="film-section-title">Hist&oacute;rias em movimento.</h2>
      </header>

      <ProjectsFilmCarousel :videos="videos" />

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
    </div>
  </section>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import { useNuxtApp } from '#app';
import ProjectsFilmCarousel from './ProjectsFilmCarousel.vue';
import Button from '~/components/ui/Button/Button.vue';
import type { VideoProject } from '~/types/video';

defineProps<{
  videos: VideoProject[];
}>();

const rootRef = ref<HTMLElement | null>(null);
let ctx: { revert: () => void } | null = null;

onMounted(async () => {
  await nextTick();

  if (!rootRef.value || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const { $gsap } = useNuxtApp();

  ctx = $gsap.context(() => {
    $gsap.fromTo(
      ['.film-section__copy', '.film-carousel', '.film-section__cta'],
      { autoAlpha: 0, y: 28 },
      { autoAlpha: 1, y: 0, duration: 0.82, stagger: 0.12, ease: 'power3.out' },
    );
  }, rootRef.value);
});

onBeforeUnmount(() => {
  ctx?.revert();
});
</script>

<style scoped>
.film-section {
  box-sizing: border-box;
  width: 100vw;
  margin: 0 calc(50% - 50vw);
  color: var(--text);
}

.film-section__inner {
  display: grid;
  gap: clamp(32px, 5vw, 58px);
  width: min(100% - 64px, 1320px);
  margin: 0 auto;
  padding: clamp(82px, 10vw, 132px) 0;
}

.film-section__copy {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 32px;
}

.film-section__eyebrow {
  margin: 0;
  color: var(--text);
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}

.film-section__copy h2 {
  max-width: 620px;
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(42px, 6vw, 84px);
  font-weight: 400;
  line-height: 0.9;
  text-align: right;
}

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

@media (max-width: 760px) {
  .film-section__inner {
    width: min(100% - 28px, 1320px);
    padding: 78px 0;
  }

  .film-section__copy {
    display: grid;
    gap: 14px;
  }

  .film-section__copy h2 {
    max-width: 9ch;
    font-size: clamp(40px, 14vw, 62px);
    text-align: left;
  }

  .film-section__cta {
    gap: 18px;
    max-width: 18rem;
  }

  .film-section__cta p {
    font-size: clamp(28px, 10vw, 40px);
  }
}
</style>
