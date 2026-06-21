<template>
  <section ref="sectionRef" class="horizontal-projects" aria-labelledby="horizontal-projects-title">
    <div class="horizontal-projects__header">
      <p class="eyebrow">Projetos realizados</p>
      <h2 id="horizontal-projects-title">Histórias já registradas.</h2>
    </div>
    <div ref="trackRef" class="horizontal-projects__track">
      <ProjectPreviewFrame v-for="photo in featuredPhotos" :key="photo.src" :photo="photo" />
      <ProjectPreviewFrame
        v-for="photo in featuredPhotos"
        :key="`mobile-loop-${photo.src}`"
        class="horizontal-projects__loop-card"
        :photo="photo"
        aria-hidden="true"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import { useNuxtApp } from '#app';
import { featuredGalleryPhotos } from '~/data/galleryPhotos';
import ProjectPreviewFrame from './ProjectPreviewFrame.vue';

const featuredPhotos = featuredGalleryPhotos;
const sectionRef = ref<HTMLElement | null>(null);
const trackRef = ref<HTMLElement | null>(null);
let ctx: { revert: () => void } | null = null;
let cleanupCallbacks: Array<() => void> = [];

onMounted(async () => {
  await nextTick();

  const section = sectionRef.value;
  const track = trackRef.value;
  const isMobileOrTablet = window.matchMedia('(max-width: 1024px)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const shouldUseStaticLayout =
    isMobileOrTablet ||
    prefersReducedMotion;

  if (!section || !track) {
    return;
  }

  const { $gsap, $ScrollTrigger, $lenis } = useNuxtApp();
  const syncScrollTrigger = () => $ScrollTrigger.update();
  $lenis.on('scroll', syncScrollTrigger);
  cleanupCallbacks.push(() => $lenis.off('scroll', syncScrollTrigger));

  if (isMobileOrTablet) {
    const loopDistance = track.scrollWidth / 2;

    ctx = $gsap.context(() => {
      $gsap.fromTo(
        track,
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 78%',
            once: true
          }
        }
      );

      if (!prefersReducedMotion && loopDistance > section.clientWidth) {
        const loopTween = $gsap.to(track, {
          x: -loopDistance,
          duration: Math.max(loopDistance / 42, 18),
          ease: 'none',
          repeat: -1
        });

        const pauseLoop = () => loopTween.pause();
        const playLoop = () => loopTween.play();

        section.addEventListener('pointerenter', pauseLoop);
        section.addEventListener('pointerleave', playLoop);
        section.addEventListener('touchstart', pauseLoop, { passive: true });
        section.addEventListener('touchend', playLoop, { passive: true });
        cleanupCallbacks.push(() => {
          section.removeEventListener('pointerenter', pauseLoop);
          section.removeEventListener('pointerleave', playLoop);
          section.removeEventListener('touchstart', pauseLoop);
          section.removeEventListener('touchend', playLoop);
        });
      }
    }, section);

    $ScrollTrigger.refresh();
    return;
  }

  if (shouldUseStaticLayout) {
    return;
  }

  ctx = $gsap.context(() => {
    $gsap.to(track, {
      x: () => -Math.max(track.scrollWidth - section.clientWidth + 40, 0),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${Math.max(track.scrollWidth - section.clientWidth + 40, section.clientWidth * 0.72)}`,
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
  cleanupCallbacks.forEach((cleanup) => cleanup());
  cleanupCallbacks = [];
});
</script>

<style scoped>
.horizontal-projects {
  position: relative;
  overflow: hidden;
  min-height: 88dvh;
  padding: 54px 0 48px;
}

.horizontal-projects__header {
  width: min(100% - 48px, 1320px);
  margin: 0 auto 30px;
}

.horizontal-projects__header h2 {
  max-width: 760px;
  margin: 0;
  color: var(--text);
  font-family: var(--font-display);
  font-size: clamp(40px, 6vw, 78px);
  font-weight: 500;
  line-height: 0.9;
}

.horizontal-projects__track {
  display: flex;
  align-items: center;
  gap: 3vw;
  width: max-content;
  padding: 0 8vw 0 48px;
  will-change: transform;
}

@media (max-width: 760px), (prefers-reduced-motion: reduce) {
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

.horizontal-projects__loop-card {
  display: none;
}

@media (min-width: 761px) and (max-width: 1024px) {
  .horizontal-projects {
    min-height: auto;
    padding: 86px 0 74px;
  }

  .horizontal-projects__header {
    width: min(100% - 48px, 1320px);
    margin-bottom: 34px;
  }
}

@media (max-width: 1024px) {
  .horizontal-projects {
    overflow: hidden;
  }

  .horizontal-projects__track {
    display: flex;
    align-items: stretch;
    width: max-content;
    gap: clamp(14px, 4vw, 28px);
    padding: 0 clamp(22px, 5vw, 48px);
    touch-action: pan-y;
  }

  .horizontal-projects__loop-card {
    display: block;
  }
}

@media (max-width: 760px) {
  .horizontal-projects__header h2 {
    font-size: clamp(38px, 13vw, 62px);
  }
}

@media (max-width: 1024px) and (prefers-reduced-motion: reduce) {
  .horizontal-projects {
    overflow: auto hidden;
  }

  .horizontal-projects__track {
    scroll-snap-type: x mandatory;
  }
}
</style>
