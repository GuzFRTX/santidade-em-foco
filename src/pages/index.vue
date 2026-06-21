<template>
  <PageWrapper>
    <HeroVideoTextSection />
    <HorizontalProjectsPreviewSection />
    <VisualStatementSection />
    <HorizontalTimelineSection />
    <FinalFrameCTASection />
  </PageWrapper>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { useHead } from '#app';
import PageWrapper from '~/components/layout/PageWrapper/PageWrapper.vue';
import HeroVideoTextSection from '~/components/sections/home/HeroVideoTextSection/HeroVideoTextSection.vue';

const HorizontalProjectsPreviewSection = defineAsyncComponent(
  () => import('~/components/sections/home/HorizontalProjectsPreviewSection/HorizontalProjectsPreviewSection.vue')
);
const VisualStatementSection = defineAsyncComponent(
  () => import('~/components/sections/home/VisualStatementSection/VisualStatementSection.vue')
);
const HorizontalTimelineSection = defineAsyncComponent(
  () => import('~/components/sections/home/HorizontalTimelineSection/HorizontalTimelineSection.vue')
);
const FinalFrameCTASection = defineAsyncComponent(
  () => import('~/components/sections/home/FinalFrameCTASection/FinalFrameCTASection.vue')
);

useHead({
  title: 'Portfolio'
});
</script>
