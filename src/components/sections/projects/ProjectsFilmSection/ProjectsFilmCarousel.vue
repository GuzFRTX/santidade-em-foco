<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue';
import { useCircularCarousel } from '../../../../composables/useCircularCarousel';
import type { VideoProject } from '../../../../types/video';

const props = defineProps<{
  videos: VideoProject[];
}>();

const { activeIndex, next, previous, startSwipe, endSwipe } = useCircularCarousel(
  () => props.videos.length,
);

const isModalOpen = ref(false);
const modalVideo = ref<HTMLVideoElement | null>(null);
const hasVideos = computed(() => props.videos.length > 0);
const hasMultipleVideos = computed(() => props.videos.length > 1);
const activeVideo = computed(() => props.videos[activeIndex.value]);
const previousVideo = computed(
  () => props.videos[(activeIndex.value - 1 + props.videos.length) % props.videos.length],
);
const nextVideo = computed(
  () => props.videos[(activeIndex.value + 1) % props.videos.length],
);
const progress = computed(() =>
  props.videos.length ? ((activeIndex.value + 1) / props.videos.length) * 100 : 0,
);
const counter = computed(
  () => `${String(activeIndex.value + 1).padStart(2, '0')} / ${String(props.videos.length).padStart(2, '0')}`,
);

watch(
  () => props.videos.length,
  (length) => {
    if (!length || activeIndex.value >= length) activeIndex.value = 0;
    if (!length) closeModal();
  },
);

watch(isModalOpen, (open) => {
  if (open) document.addEventListener('keydown', onDocumentKeydown);
  else document.removeEventListener('keydown', onDocumentKeydown);
});

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onDocumentKeydown);
  modalVideo.value?.pause();
});

function onRegionKeydown(event: KeyboardEvent) {
  if (event.key === 'ArrowLeft') {
    event.preventDefault();
    previous();
  }

  if (event.key === 'ArrowRight') {
    event.preventDefault();
    next();
  }
}

function onDocumentKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') closeModal();
}

function onTouchStart(event: TouchEvent) {
  const touch = event.touches[0];
  if (touch) startSwipe(touch.clientX);
}

function onTouchEnd(event: TouchEvent) {
  const touch = event.changedTouches[0];
  if (touch) endSwipe(touch.clientX);
}

function openModal() {
  if (activeVideo.value) isModalOpen.value = true;
}

function closeModal() {
  if (!isModalOpen.value) return;
  modalVideo.value?.pause();
  isModalOpen.value = false;
}
</script>

<template>
  <div
    class="film-carousel"
    role="region"
    aria-label="Carrossel de filmes"
    :tabindex="hasVideos ? 0 : undefined"
    @keydown="onRegionKeydown"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <div v-if="hasVideos && activeVideo" class="film-carousel__viewport">
      <Transition name="film-stage" mode="out-in">
        <article :key="activeVideo.id" class="film-carousel__stage">
          <img
            class="film-carousel__poster"
            :src="activeVideo.thumbnail"
            :alt="activeVideo.thumbnailAlt"
          >
          <div class="film-carousel__overlay">
            <button
              class="film-carousel__play"
              type="button"
              :aria-label="`Assistir ${activeVideo.title}`"
              @click="openModal"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 5.5 18 12 8 18.5Z" fill="currentColor" />
              </svg>
            </button>
          </div>
        </article>
      </Transition>

    </div>

    <div v-if="hasVideos" class="film-carousel__status">
      <p class="film-carousel__counter" aria-live="polite" aria-atomic="true">
        {{ counter }}
      </p>
      <div
        class="film-carousel__progress"
        role="progressbar"
        aria-label="Posição do filme"
        :aria-valuemin="1"
        :aria-valuemax="videos.length"
        :aria-valuenow="activeIndex + 1"
      >
        <span class="film-carousel__progress-value" :style="{ width: `${progress}%` }" />
      </div>

      <div v-if="hasMultipleVideos" class="film-carousel__controls">
        <button
          class="film-carousel__control film-carousel__control--previous"
          type="button"
          :aria-label="`Filme anterior: ${previousVideo.title}`"
          @click="previous"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m14.5 5-7 7 7 7" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" />
          </svg>
        </button>

        <button
          class="film-carousel__control film-carousel__control--next"
          type="button"
          :aria-label="`Próximo filme: ${nextVideo.title}`"
          @click="next"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m9.5 5 7 7-7 7" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" />
          </svg>
        </button>
      </div>
    </div>

    <Teleport to="body">
      <div
        v-if="isModalOpen && activeVideo"
        class="film-carousel__modal"
        role="dialog"
        aria-modal="true"
        :aria-label="`Assistir ${activeVideo.title}`"
        @click.self="closeModal"
      >
        <div class="film-carousel__modal-content">
          <button
            class="film-carousel__modal-close"
            type="button"
            aria-label="Fechar filme"
            @click="closeModal"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m6 6 12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.8" />
            </svg>
          </button>
          <video
            ref="modalVideo"
            class="film-carousel__video"
            :src="activeVideo.src"
            :poster="activeVideo.thumbnail"
            controls
            playsinline
            preload="metadata"
          />
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.film-carousel {
  width: 100%;
  color: var(--text);
  outline: none;
}

.film-carousel:focus-visible .film-carousel__viewport {
  outline: 2px solid var(--text);
  outline-offset: 4px;
}

.film-carousel__viewport {
  position: relative;
  overflow: visible;
  border-radius: 24px;
}

.film-carousel__stage {
  position: relative;
  overflow: hidden;
  aspect-ratio: 16 / 9;
  border: 1px solid var(--border);
  border-radius: 24px;
  background: var(--surface);
  box-shadow: var(--shadow);
}

.film-carousel__poster {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.film-carousel__overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background: transparent;
}

.film-carousel__counter {
  margin: 0;
  font-family: var(--font-body);
  color: var(--muted);
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.film-carousel__play,
.film-carousel__control,
.film-carousel__modal-close {
  display: grid;
  flex: 0 0 auto;
  place-items: center;
  border: 1px solid var(--border);
  border-radius: 50%;
  background: var(--surface);
  color: var(--text);
  cursor: pointer;
  transition: transform 350ms ease, background-color 350ms ease;
}

.film-carousel__play {
  width: clamp(56px, 7vw, 76px);
  height: clamp(56px, 7vw, 76px);
}

.film-carousel__play svg {
  width: 28px;
  height: 28px;
  margin-left: 3px;
}

.film-carousel__control {
  width: 48px;
  height: 48px;
}

.film-carousel__control svg,
.film-carousel__modal-close svg {
  width: 22px;
  height: 22px;
}

.film-carousel__play:hover,
.film-carousel__play:focus-visible {
  transform: scale(1.06);
}

.film-carousel__control:hover,
.film-carousel__control:focus-visible {
  transform: scale(1.06);
}

.film-carousel__play:focus-visible,
.film-carousel__control:focus-visible,
.film-carousel__modal-close:focus-visible {
  outline: 2px solid var(--text);
  outline-offset: 3px;
}

.film-carousel__status {
  display: grid;
  grid-template-columns: auto minmax(80px, 1fr) auto;
  align-items: center;
  gap: 16px;
  margin-top: 18px;
}

.film-carousel__controls {
  display: flex;
  gap: 10px;
}

.film-carousel__counter {
  min-width: 3.75rem;
  color: var(--text);
  font-variant-numeric: tabular-nums;
}

.film-carousel__progress {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 2px;
  background: var(--border);
}

.film-carousel__progress-value {
  position: absolute;
  inset: 0 auto 0 0;
  background: var(--text);
  transition: width 400ms ease;
}

.film-carousel__modal {
  position: fixed;
  z-index: 1000;
  inset: 0;
  display: grid;
  place-items: center;
  padding: clamp(16px, 4vw, 56px);
  background: var(--bg);
}

.film-carousel__modal-content {
  position: relative;
  width: min(100%, 1200px);
}

.film-carousel__modal-close {
  position: absolute;
  z-index: 1;
  top: 16px;
  right: 16px;
  width: 48px;
  height: 48px;
}

.film-carousel__video {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  border: 1px solid var(--border);
  border-radius: 24px;
  background: var(--surface);
  box-shadow: var(--shadow);
}

.film-stage-enter-active,
.film-stage-leave-active {
  transition: opacity 400ms ease, transform 400ms ease;
}

.film-stage-enter-from,
.film-stage-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

@media (max-width: 680px) {
  .film-carousel__overlay {
    gap: 12px;
    padding: 20px;
  }

  .film-carousel__control {
    width: 44px;
    height: 44px;
  }

  .film-carousel__play {
    width: 52px;
    height: 52px;
  }

  .film-carousel__status {
    gap: 10px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .film-stage-enter-active,
  .film-stage-leave-active,
  .film-carousel__play,
  .film-carousel__control,
  .film-carousel__modal-close,
  .film-carousel__progress-value {
    transition-duration: 0.01ms;
  }
}
</style>
