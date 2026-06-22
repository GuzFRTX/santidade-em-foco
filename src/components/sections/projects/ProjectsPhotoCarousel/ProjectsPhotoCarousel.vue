<template>
  <section ref="rootRef" class="photo-gallery" aria-labelledby="photo-gallery-title">
    <div class="photo-gallery__header">
      <p class="photo-gallery__eyebrow">01 &mdash; Fotografias</p>
      <h2 id="photo-gallery-title">Fotografias selecionadas.</h2>
    </div>

    <div class="photo-gallery__shell">
      <div ref="trackRef" class="photo-gallery__track" aria-label="Galeria horizontal de fotografias">
        <article
          v-for="(item, index) in galleryItems"
          :key="`${item.projectId}-${item.image}`"
          class="photo-gallery__item"
          :class="`photo-gallery__item--${index % 3}`"
        >
          <img :src="item.image" :alt="item.alt" loading="lazy" decoding="async" />
          <div class="photo-gallery__caption">
            <span>{{ String(index + 1).padStart(2, '0') }}</span>
            <p>{{ item.text }}</p>
          </div>
        </article>
      </div>

      <div class="photo-gallery__controls" aria-label="Controles da galeria">
        <button type="button" aria-label="Imagem anterior" @click="scrollGallery('previous')">
          Anterior
        </button>
        <button type="button" aria-label="Próxima imagem" @click="scrollGallery('next')">
          Próxima
        </button>
      </div>
    </div>

    <p class="photo-gallery__hint">{{ totalNumber }} imagens &middot; arraste para explorar</p>
  </section>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import { useNuxtApp } from '#app';
import type { Project } from '~/types/project';

const props = defineProps<{
  projects: Project[];
}>();

const rootRef = ref<HTMLElement | null>(null);
const trackRef = ref<HTMLElement | null>(null);
const prefersReducedMotion = ref(false);
let ctx: { revert: () => void } | null = null;

const galleryItems = computed(() =>
  props.projects.flatMap((project) =>
    project.photos.map((photo) => ({
      projectId: project.id,
      image: photo.src,
      alt: photo.alt,
      text: project.title
    }))
  )
);

const totalNumber = computed(() => String(galleryItems.value.length).padStart(2, '0'));

function scrollGallery(direction: 'previous' | 'next') {
  const track = trackRef.value;

  if (!track) {
    return;
  }

  const firstItem = track.querySelector<HTMLElement>('.photo-gallery__item');
  const distance = firstItem ? firstItem.offsetWidth + 18 : track.clientWidth * 0.82;

  track.scrollBy({
    left: direction === 'next' ? distance : -distance,
    behavior: prefersReducedMotion.value ? 'auto' : 'smooth'
  });
}

onMounted(async () => {
  await nextTick();

  prefersReducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const track = trackRef.value;
  if (track) {
    track.scrollLeft = 0;
  }

  if (!rootRef.value || prefersReducedMotion.value) {
    return;
  }

  const { $gsap } = useNuxtApp();

  ctx = $gsap.context(() => {
    $gsap.fromTo(
      ['.photo-gallery__header', '.photo-gallery__shell', '.photo-gallery__hint'],
      { y: 28 },
      { y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out' }
    );
  }, rootRef.value);
});

onBeforeUnmount(() => {
  ctx?.revert();
});
</script>

<style scoped>
.photo-gallery {
  display: grid;
  gap: 26px;
  padding: 10px 0 clamp(76px, 9vw, 104px);
  color: var(--text);
}

.photo-gallery__header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 24px;
}

.photo-gallery__eyebrow,
.photo-gallery__hint {
  margin: 0;
  color: var(--accent);
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}

.photo-gallery__header h2 {
  max-width: 560px;
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(36px, 5.2vw, 72px);
  font-weight: 500;
  line-height: 0.92;
  text-align: right;
}

.photo-gallery__shell {
  position: relative;
  box-sizing: border-box;
  width: 100vw;
  margin: 8px calc(50% - 50vw) 0;
  padding: 0 max(32px, calc((100vw - 1320px) / 2)) 28px;
  border-block: 1px solid rgba(58, 48, 39, 0.1);
  background: rgba(58, 48, 39, 0.018);
}

.photo-gallery__track {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: clamp(260px, 30vw, 430px);
  gap: clamp(14px, 2vw, 24px);
  overflow-x: auto;
  overflow-y: hidden;
  padding: clamp(24px, 4vw, 48px) 0 clamp(22px, 4vw, 42px);
  scroll-padding-inline: max(32px, calc((100vw - 1320px) / 2));
  scroll-behavior: smooth;
  scroll-snap-stop: normal;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
}

.photo-gallery__track::-webkit-scrollbar {
  display: none;
}

.photo-gallery__item {
  position: relative;
  display: grid;
  align-content: end;
  overflow: hidden;
  aspect-ratio: 4 / 5;
  min-height: 360px;
  scroll-snap-align: start;
  background: rgba(58, 48, 39, 0.08);
  transform: translateZ(0);
}

.photo-gallery__item--1 {
  aspect-ratio: 3 / 4;
  margin-top: clamp(18px, 3vw, 42px);
}

.photo-gallery__item--2 {
  aspect-ratio: 5 / 6;
}

.photo-gallery__item img {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 520ms cubic-bezier(0.16, 1, 0.3, 1), filter 520ms cubic-bezier(0.16, 1, 0.3, 1);
}

.photo-gallery__item:hover img {
  filter: saturate(0.95) contrast(1.03);
  transform: scale(1.035);
}

.photo-gallery__caption {
  position: relative;
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 18px;
  background: linear-gradient(180deg, rgba(58, 48, 39, 0), rgba(58, 48, 39, 0.78));
  color: #efe7da;
}

.photo-gallery__caption span,
.photo-gallery__caption p {
  margin: 0;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.photo-gallery__controls {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.photo-gallery__controls button {
  min-height: 40px;
  padding: 0 16px;
  border: 1px solid rgba(58, 48, 39, 0.18);
  background: transparent;
  color: var(--text);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 220ms ease, color 220ms ease, transform 220ms ease;
}

.photo-gallery__controls button:hover {
  background: var(--text);
  color: var(--bg);
}

.photo-gallery__controls button:active {
  transform: translateY(1px);
}

.photo-gallery__hint {
  justify-self: end;
  color: rgba(var(--text-rgb), 0.5);
}

@media (max-width: 760px) {
  .photo-gallery {
    gap: 20px;
    padding-bottom: 78px;
  }

  .photo-gallery__header {
    display: grid;
    gap: 14px;
  }

  .photo-gallery__header h2 {
    max-width: 10ch;
    font-size: clamp(38px, 12.5vw, 58px);
    text-align: left;
  }

  .photo-gallery__shell {
    margin-inline: calc(50% - 50vw);
    padding-inline: 14px;
    margin-top: 2px;
  }

  .photo-gallery__track {
    grid-auto-columns: minmax(230px, 74vw);
    gap: 14px;
    padding-block: 22px 28px;
  }

  .photo-gallery__item {
    min-height: 340px;
  }

  .photo-gallery__item--1 {
    margin-top: 0;
  }

  .photo-gallery__controls {
    justify-content: flex-start;
  }

  .photo-gallery__controls button {
    flex: 1;
  }

  .photo-gallery__hint {
    justify-self: start;
  }
}

@media (prefers-reduced-motion: reduce) {
  .photo-gallery__track {
    scroll-behavior: auto;
  }

  .photo-gallery__item img {
    transition: none;
  }
}
</style>
