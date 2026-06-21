<template>
  <InteractiveHoverButton
    :to="to"
    :href="href"
    :target="target"
    :rel="rel"
    :variant="variant"
    :type="type"
  >
    <slot />
  </InteractiveHoverButton>
</template>

<script setup lang="ts">
import InteractiveHoverButton from '~/components/ui/interactive-hover-button/InteractiveHoverButton.vue';

withDefaults(
  defineProps<{
    to?: string;
    href?: string;
    target?: string;
    rel?: string;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'line' | 'solid' | 'ghost';
  }>(),
  {
    type: 'button',
    variant: 'line'
  }
);
</script>
