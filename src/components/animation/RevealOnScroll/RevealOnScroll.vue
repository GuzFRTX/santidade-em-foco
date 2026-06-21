<template>
  <div ref="target" class="reveal-on-scroll">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

const target = ref<HTMLElement | null>(null);
let observer: IntersectionObserver | null = null;

onMounted(() => {
  if (!target.value) {
    return;
  }

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) {
        target.value?.classList.add('is-visible');
        observer?.disconnect();
      }
    },
    { threshold: 0.22 }
  );

  observer.observe(target.value);
});

onBeforeUnmount(() => {
  observer?.disconnect();
});
</script>

<style scoped>
.reveal-on-scroll {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
