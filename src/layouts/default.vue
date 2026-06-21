<template>
  <div class="site-shell">
    <AuroraBackground v-if="!isBudgetPage" class="site-aurora" />
    <div v-if="!isBudgetPage" class="noise" aria-hidden="true" />
    <main class="page-main">
      <slot />
    </main>
    <Footer v-if="!isBudgetPage" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from '#app';
import AuroraBackground from '~/components/ui/aurora-background/AuroraBackground.vue';
import Footer from '~/components/layout/Footer/Footer.vue';

const route = useRoute();
const isBudgetPage = computed(() => route.path === '/orcamento');
</script>
