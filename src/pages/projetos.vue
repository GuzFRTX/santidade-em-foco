<template>
  <PageWrapper>
    <main class="projects-page" aria-labelledby="projects-title">
      <section class="projects-page__hero">
        <h1 id="projects-title" ref="titleRef" class="projects-page__title">Projetos</h1>
      </section>

      <ProjectsPhotoCarousel :projects="projects" />
      <ProjectsFilmSection :videos="videos" />

      <section class="projects-page__cta" aria-labelledby="projects-budget-title">
        <h2 id="projects-budget-title">Sua hist&oacute;ria tamb&eacute;m merece ser contada.</h2>
        <Button to="/orcamento" variant="solid">Ver or&ccedil;amento</Button>
      </section>
    </main>
  </PageWrapper>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import { useHead, useNuxtApp } from '#app';
import PageWrapper from '~/components/layout/PageWrapper/PageWrapper.vue';
import ProjectsFilmSection from '~/components/sections/projects/ProjectsFilmSection/ProjectsFilmSection.vue';
import ProjectsPhotoCarousel from '~/components/sections/projects/ProjectsPhotoCarousel/ProjectsPhotoCarousel.vue';
import Button from '~/components/ui/Button/Button.vue';
import { projects } from '~/data/projects';
import { videos } from '~/data/videos';

const titleRef = ref<HTMLElement | null>(null);
let ctx: { revert: () => void } | null = null;

onMounted(async () => {
  await nextTick();

  if (!titleRef.value || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const { $gsap } = useNuxtApp();

  ctx = $gsap.context(() => {
    $gsap.fromTo(
      titleRef.value,
      { autoAlpha: 0, y: 24 },
      { autoAlpha: 1, y: 0, duration: 0.72, ease: 'power3.out' }
    );
  }, titleRef.value);
});

onBeforeUnmount(() => {
  ctx?.revert();
});

useHead({
  title: 'Projetos'
});
</script>

<style scoped>
.projects-page {
  min-height: 100svh;
  width: min(100% - 64px, 1320px);
  margin: 0 auto;
  padding: 132px 0 0;
}

.projects-page__hero {
  display: grid;
  min-height: clamp(180px, 24vw, 320px);
  align-items: end;
}

.projects-page__title {
  margin: 0 0 68px;
  color: var(--text);
  font-family: var(--font-display);
  font-size: clamp(58px, 8vw, 124px);
  font-weight: 500;
  line-height: 0.86;
}

.projects-page__cta {
  display: grid;
  justify-items: center;
  gap: 28px;
  margin-top: clamp(96px, 12vw, 168px);
  padding: clamp(84px, 10vw, 132px) 0 112px;
  border-top: 1px solid color-mix(in srgb, var(--text) 18%, transparent);
  text-align: center;
}

.projects-page__cta h2 {
  max-width: 760px;
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(40px, 5.5vw, 76px);
  font-weight: 400;
  line-height: 0.94;
}

@media (max-width: 720px) {
  .projects-page {
    width: min(100% - 28px, 1320px);
    padding-top: 96px;
  }

  .projects-page__hero {
    min-height: 150px;
  }

  .projects-page__title {
    margin-bottom: 46px;
    font-size: clamp(48px, 18vw, 76px);
  }

  .projects-page__cta {
    gap: 22px;
    margin-top: 88px;
    padding: 72px 0 76px;
  }

  .projects-page__cta h2 {
    max-width: 10ch;
    font-size: clamp(36px, 12vw, 52px);
  }
}
</style>
