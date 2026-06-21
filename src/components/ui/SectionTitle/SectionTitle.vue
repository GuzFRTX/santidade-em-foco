<template>
  <header class="section-title">
    <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
    <h2 class="section-title__heading">
      <slot />
    </h2>
    <p v-if="text" class="section-title__text">{{ text }}</p>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  eyebrow?: string;
  text?: string;
}>();
</script>

<style scoped>
.section-title {
  display: grid;
  gap: 18px;
  max-width: 760px;
}

.section-title__heading {
  margin: 0;
  color: var(--text);
  font-family: var(--font-display);
  font-size: clamp(38px, 5vw, 76px);
  font-weight: 500;
  letter-spacing: -0.02em;
  line-height: 0.95;
}

.section-title__text {
  margin: 0;
  max-width: 56ch;
  color: var(--muted);
  font-size: 15px;
  font-weight: 300;
  line-height: 1.8;
}
</style>
