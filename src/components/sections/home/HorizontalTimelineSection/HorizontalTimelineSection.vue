<template>
  <section ref="sectionRef" class="horizontal-timeline" aria-labelledby="timeline-title">
    <div class="horizontal-timeline__heading">
      <p class="eyebrow">Linha do tempo</p>
      <h2 id="timeline-title">Do primeiro olhar ao filme completo.</h2>
    </div>
    <div class="horizontal-timeline__line" aria-hidden="true">
      <span ref="lineFillRef" />
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
const lineFillRef = ref<HTMLElement | null>(null);
let ctx: { revert: () => void } | null = null;
let cleanupCallbacks: Array<() => void> = [];

onMounted(async () => {
  await nextTick();

  const section = sectionRef.value;
  const track = trackRef.value;
  const lineFill = lineFillRef.value;
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
    const frames = Array.from(section.querySelectorAll<HTMLElement>('.timeline-frame'));

    ctx = $gsap.context(() => {
      if (lineFill) {
        $gsap.fromTo(
          lineFill,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top 72%',
              end: 'bottom 46%',
              scrub: true
            }
          }
        );
      }

      frames.forEach((frame) => {
        $gsap.fromTo(
          frame,
          {
            y: prefersReducedMotion ? 0 : 34
          },
          {
            y: 0,
            duration: 0.78,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: frame,
              start: 'top 82%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    }, section);

    $ScrollTrigger.refresh();
    return;
  }

  if (shouldUseStaticLayout) {
    return;
  }

  ctx = $gsap.context(() => {
    $gsap.to(track, {
      x: () => -Math.max(track.scrollWidth - section.clientWidth + 64, 0),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${Math.max(track.scrollWidth - section.clientWidth + 64, section.clientWidth * 0.72)}`,
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
.horizontal-timeline {
  position: relative;
  overflow: hidden;
  min-height: 100dvh;
  padding: clamp(34px, 5dvh, 54px) 0 clamp(28px, 5dvh, 48px);
}

.horizontal-timeline__heading {
  width: min(100% - 48px, 1320px);
  margin: 0 auto clamp(20px, 3dvh, 30px);
}

.horizontal-timeline__heading h2 {
  max-width: 840px;
  margin: 0;
  color: var(--text);
  font-family: var(--font-display);
  font-size: clamp(36px, 5dvh, 66px);
  font-weight: 500;
  line-height: 0.95;
}

.horizontal-timeline__track {
  display: flex;
  width: max-content;
  padding: 0 8vw;
  will-change: transform;
}

.horizontal-timeline__line {
  display: none;
}

@media (max-width: 760px), (prefers-reduced-motion: reduce) {
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

@media (min-width: 761px) and (max-width: 1024px) {
  .horizontal-timeline {
    min-height: auto;
    padding: 86px 48px 78px;
  }

  .horizontal-timeline__heading {
    width: 100%;
    margin-bottom: 52px;
  }
}

@media (max-width: 1024px) {
  .horizontal-timeline {
    overflow: hidden;
  }

  .horizontal-timeline__track {
    position: relative;
    display: grid;
    width: min(100%, 720px);
    padding: 0 0 0 clamp(24px, 5vw, 44px);
  }

  .horizontal-timeline__line {
    position: absolute;
    top: 238px;
    bottom: 72px;
    left: clamp(22px, 6vw, 52px);
    display: block;
    width: 1px;
    overflow: hidden;
    background: var(--border-soft);
  }

  .horizontal-timeline__line span {
    display: block;
    width: 100%;
    height: 100%;
    transform-origin: top;
    background: linear-gradient(180deg, var(--accent), var(--accent-muted));
  }
}

@media (max-width: 760px) {
  .horizontal-timeline__heading h2 {
    font-size: clamp(36px, 12vw, 60px);
  }

  .horizontal-timeline__line {
    top: 220px;
    bottom: 64px;
  }
}
</style>
