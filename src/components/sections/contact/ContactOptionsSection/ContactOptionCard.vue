<template>
  <a class="contact-option-card" :href="option.href" target="_blank" rel="noopener noreferrer">
    <span>{{ option.label }}</span>
    <strong>{{ option.value }}</strong>
  </a>
</template>

<script setup lang="ts">
defineProps<{
  option: {
    label: string;
    value: string;
    href: string;
  };
}>();
</script>

<style scoped>
.contact-option-card {
  display: grid;
  gap: 10px;
  border-top: 1px solid var(--border);
  padding: 20px 0;
}

.contact-option-card span {
  color: var(--accent);
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.contact-option-card strong {
  color: var(--text);
  font-size: clamp(18px, 3vw, 28px);
  font-weight: 400;
  line-height: 1.2;
  word-break: break-word;
}

.contact-option-card:hover strong {
  color: var(--accent);
}
</style>
