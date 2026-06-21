<template>
  <figure class="parallax-image">
    <img :src="src" :alt="alt" loading="lazy" decoding="async" />
  </figure>
</template>

<script setup lang="ts">
defineProps<{
  src: string;
  alt: string;
}>();
</script>

<style scoped>
.parallax-image {
  margin: 0;
  overflow: hidden;
  border: 1px solid var(--border-soft);
  border-radius: 18px;
  background: var(--surface);
}

.parallax-image img {
  width: 100%;
  height: 100%;
  min-height: 420px;
  object-fit: cover;
  filter: saturate(0.86) contrast(1.05);
  animation: imageFloat 13s ease-in-out infinite;
}
</style>
