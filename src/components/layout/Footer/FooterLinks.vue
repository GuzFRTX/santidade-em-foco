<template>
  <div class="footer-links">
    <a :href="site.instagram" target="_blank" rel="noopener noreferrer">Instagram</a>
    <a :href="site.youtube" target="_blank" rel="noopener noreferrer">YouTube</a>
    <a :href="site.whatsapp" target="_blank" rel="noopener noreferrer">WhatsApp</a>
  </div>
</template>

<script setup lang="ts">
import { site } from '~/data/site';
</script>

<style scoped>
.footer-links {
  display: flex;
  gap: 18px;
  flex-wrap: wrap;
}

.footer-links a {
  color: var(--muted);
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition: color 0.22s ease;
}

.footer-links a:hover {
  color: var(--accent);
}
</style>
