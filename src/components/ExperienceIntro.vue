<template>
  <section
    v-if="isVisible"
    ref="introRef"
    class="experience-intro"
    aria-label="Introdução Santidade em Foco"
  >
    <div ref="contentRef" class="experience-intro__content">
      <div ref="logoRef" class="experience-intro__logo" v-html="svgMarkup" />

      <div ref="messageRef" class="experience-intro__message">
        <p>
          Um olhar sensível sobre histórias,<br />
          afetos e momentos que permanecem.
        </p>
        <small>Experiência digital por <span>GUZ</span>.</small>
        <InteractiveHoverButton
          ref="startButtonRef"
          class="experience-intro__start"
          type="button"
          variant="solid"
          aria-label="Começar experiência"
          :disabled="isLeaving"
          @click="startExperience"
        >
          Start
        </InteractiveHoverButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import { useNuxtApp } from '#app';
import InteractiveHoverButton from '~/components/ui/interactive-hover-button/InteractiveHoverButton.vue';
import type { gsap } from 'gsap';

const isVisible = ref(true);
const isLeaving = ref(false);
const svgMarkup = ref('');
const introRef = ref<HTMLElement | null>(null);
const contentRef = ref<HTMLElement | null>(null);
const logoRef = ref<HTMLElement | null>(null);
const messageRef = ref<HTMLElement | null>(null);
const startButtonRef = ref<InstanceType<typeof InteractiveHoverButton> | null>(null);
let introTimeline: gsap.core.Timeline | null = null;
let exitTimeline: gsap.core.Timeline | null = null;

function lockScroll() {
  document.body.classList.add('is-loading');
}

function unlockScroll() {
  document.body.classList.remove('is-loading');
}

function waitForWindowLoad() {
  if (document.readyState === 'complete') {
    return Promise.resolve();
  }

  return new Promise<void>((resolve) => {
    window.addEventListener('load', () => resolve(), { once: true });
  });
}

function waitForVideo(video: HTMLVideoElement) {
  if (video.readyState >= 2) {
    return Promise.resolve();
  }

  return new Promise<void>((resolve) => {
    const finish = () => resolve();

    video.addEventListener('loadeddata', finish, { once: true });
    video.addEventListener('error', finish, { once: true });
    window.setTimeout(finish, 2400);
  });
}

function waitForImage(image: HTMLImageElement) {
  if (image.complete && image.naturalWidth > 0) {
    return Promise.resolve();
  }

  return Promise.race([
    image.decode().catch(() => undefined),
    new Promise<void>((resolve) => {
      window.setTimeout(resolve, 2400);
    })
  ]);
}

async function waitForHomeAssets() {
  await waitForWindowLoad();
  await document.fonts?.ready.catch(() => undefined);

  const intro = introRef.value;
  const images = Array.from(document.images).filter((image) => !intro?.contains(image));
  const videos = Array.from(document.querySelectorAll<HTMLVideoElement>('video')).filter(
    (video) => !intro?.contains(video)
  );

  await Promise.all([
    ...images.map(waitForImage),
    ...videos.map(waitForVideo)
  ]);
}

async function startExperience() {
  if (isLeaving.value || !introRef.value || !contentRef.value) {
    return;
  }

  isLeaving.value = true;
  const { $gsap } = useNuxtApp();
  introTimeline?.kill();

  exitTimeline = $gsap.timeline({
    defaults: { ease: 'power3.inOut' },
    onComplete: () => {
      unlockScroll();
      isVisible.value = false;
    }
  });

  exitTimeline
    .to(contentRef.value, {
      autoAlpha: 0,
      y: -18,
      filter: 'blur(10px)',
      duration: 0.55
    })
    .to(
      introRef.value,
      {
        yPercent: -100,
        duration: 0.95
      },
      '-=0.18'
    );
}

onMounted(async () => {
  lockScroll();
  svgMarkup.value = await fetch('/santidade-em-foco-sf-loader.svg').then((response) =>
    response.text()
  );
  await nextTick();

  const { $gsap } = useNuxtApp();
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!introRef.value || !logoRef.value || !messageRef.value || !startButtonRef.value) {
    return;
  }

  const paths = Array.from(logoRef.value.querySelectorAll<SVGPathElement>('.sf-path'));

  paths.forEach((path) => {
    const length = path.getTotalLength();

    $gsap.set(path, {
      stroke: '#efe7da',
      fill: '#efe7da',
      strokeDasharray: length,
      strokeDashoffset: length,
      fillOpacity: 0
    });
  });

  $gsap.set(logoRef.value, {
    autoAlpha: 1
  });
  $gsap.set(messageRef.value.children, {
    autoAlpha: 0,
    y: 18
  });

  if (prefersReducedMotion) {
    $gsap.set(paths, {
      strokeDashoffset: 0,
      fillOpacity: 1
    });
    $gsap.set(logoRef.value, {
      y: -18,
      scale: 0.94
    });
    await waitForHomeAssets();
    $gsap.set(messageRef.value.children, {
      autoAlpha: 1,
      y: 0
    });
    return;
  }

  await new Promise<void>((resolve) => {
    introTimeline = $gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: resolve
    });
    introTimeline
      .to(paths, {
        strokeDashoffset: 0,
        duration: 1.8,
        stagger: 0.18,
        ease: 'power3.inOut'
      })
      .to(paths, {
        fillOpacity: 1,
        duration: 0.55,
        ease: 'power2.out'
      });
  });

  await waitForHomeAssets();

  if (isLeaving.value || !logoRef.value || !messageRef.value) {
    return;
  }

  introTimeline = $gsap.timeline({ defaults: { ease: 'power3.out' } });
  introTimeline
    .to(logoRef.value, {
      y: -22,
      scale: 0.92,
      duration: 0.75
    })
    .to(
      messageRef.value.children,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.68,
        stagger: 0.14
      },
      '-=0.28'
    )
    .call(() => {
      startButtonRef.value?.focus({ preventScroll: true });
    });
});

onBeforeUnmount(() => {
  introTimeline?.kill();
  exitTimeline?.kill();
  unlockScroll();
});
</script>

<style scoped>
.experience-intro {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  place-items: center;
  min-height: 100dvh;
  padding: clamp(1.5rem, 4vw, 3rem);
  overflow: hidden;
  background: #3a3027;
  color: #efe7da;
}

.experience-intro__content {
  position: relative;
  z-index: 1;
  display: grid;
  justify-items: center;
  width: min(100%, 820px);
  text-align: center;
}

.experience-intro__logo {
  display: block;
  width: clamp(10.5rem, 27vw, 22rem);
  max-width: 86vw;
  color: #efe7da;
  opacity: 0;
}

.experience-intro__logo :deep(.sf-monogram) {
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;
  filter: drop-shadow(0 18px 34px rgba(0, 0, 0, 0.12));
}

.experience-intro__logo :deep(.sf-path) {
  stroke: #efe7da;
  fill: #efe7da;
}

.experience-intro__message {
  display: grid;
  justify-items: center;
  gap: 1.22rem;
  margin-top: clamp(1.45rem, 3.4vw, 2.35rem);
}

.experience-intro__message > * {
  opacity: 0;
  transform: translateY(18px);
}

.experience-intro__message p {
  margin: 0;
  max-width: 44rem;
  color: #efe7da;
  font-size: clamp(1.22rem, 2.35vw, 1.68rem);
  font-weight: 300;
  line-height: 1.68;
}

.experience-intro__message small {
  color: rgba(239, 231, 218, 0.56);
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.experience-intro__message small span {
  font-family: var(--font-brand);
  font-size: 1.06rem;
  font-weight: 400;
}

.experience-intro__start {
  --accent: #efe7da;
  --bg: #3a3027;
  --text: #efe7da;
  --border: rgba(239, 231, 218, 0.28);
  min-height: 3.35rem;
  margin-top: 0.45rem;
  border-color: rgba(239, 231, 218, 0.28);
}

.experience-intro__start:focus-visible {
  outline: 2px solid #a78963;
  outline-offset: 4px;
}

.experience-intro__start:disabled {
  cursor: default;
  opacity: 0.72;
}

@media (max-width: 560px) {
  .experience-intro__logo {
    width: clamp(9rem, 48vw, 13rem);
  }

  .experience-intro__message {
    gap: 1rem;
  }

  .experience-intro__message p {
    font-size: 1.12rem;
  }
}
</style>
