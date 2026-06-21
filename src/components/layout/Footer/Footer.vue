<template>
  <footer class="site-footer">
    <span>© 2026 {{ site.name }}</span>
    <FooterLinks />
    <span>{{ site.location }}</span>
  </footer>
</template>

<script setup lang="ts">
import { site } from '~/data/site';
import FooterLinks from './FooterLinks.vue';
</script>

<style scoped>
.site-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 34px 48px;
  color: var(--muted);
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

@media (max-width: 760px) {
  .site-footer {
    align-items: flex-start;
    flex-direction: column;
    padding: 30px 22px;
  }
}
</style>
