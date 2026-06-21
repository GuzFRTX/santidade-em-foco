<template>
  <ExperienceIntro />
  <NuxtLayout>
    <div class="cinematic-route-stage">
      <NuxtPage :transition="cinematicPageTransition" />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import ExperienceIntro from '~/components/ExperienceIntro.vue';
import { useCinematicPageTransition } from '~/composables/useCinematicPageTransition';

const cinematicPageTransition = useCinematicPageTransition();
</script>
