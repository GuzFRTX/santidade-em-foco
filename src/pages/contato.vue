<template>
  <PageWrapper>
    <ContactHeroSection />
    <ContactOptionsSection />
    <ContactFormSection />
  </PageWrapper>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { useHead } from '#app';
import PageWrapper from '~/components/layout/PageWrapper/PageWrapper.vue';
import ContactHeroSection from '~/components/sections/contact/ContactHeroSection/ContactHeroSection.vue';

const ContactOptionsSection = defineAsyncComponent(
  () => import('~/components/sections/contact/ContactOptionsSection/ContactOptionsSection.vue')
);
const ContactFormSection = defineAsyncComponent(
  () => import('~/components/sections/contact/ContactFormSection/ContactFormSection.vue')
);

useHead({
  title: 'Contato'
});
</script>
