<script lang="ts" setup>
import { cn } from "@inspira-ui/plugins";
import { computed, ref, useAttrs } from "vue";
import type { HTMLAttributes } from "vue";

defineOptions({
  inheritAttrs: false,
});

interface Props {
  text?: string;
  to?: string;
  href?: string;
  target?: string;
  rel?: string;
  type?: "button" | "submit" | "reset";
  variant?: "line" | "solid" | "ghost";
  class?: HTMLAttributes["class"];
}
const props = withDefaults(defineProps<Props>(), {
  text: "Button",
  type: "button",
  variant: "line",
});

const buttonRef = ref<HTMLButtonElement>();
const attrs = useAttrs();
const buttonClasses = computed(() =>
  cn(
    `group relative inline-flex min-h-11 w-auto cursor-pointer items-center justify-center overflow-hidden rounded-[4px] border px-6 py-0 text-center text-[11px] font-semibold uppercase tracking-[0.13em] transition-transform active:translate-y-px`,
    props.variant === "solid" &&
      "interactive-hover-button--solid border-[var(--accent)] bg-[var(--accent)] text-[var(--bg)]",
    props.variant === "ghost" &&
      "border-[var(--border)] bg-[var(--surface)] text-[var(--text)] shadow-[var(--shadow)]",
    props.variant === "line" &&
      "border-transparent border-b-current bg-transparent px-1 text-[var(--text)] hover:border-[var(--accent)]",
    props.class,
  ),
);

defineExpose({
  focus: (options?: FocusOptions) => buttonRef.value?.focus(options),
});
</script>

<template>
  <a
    v-if="href"
    v-bind="attrs"
    :href="href"
    :target="target"
    :rel="rel"
    :class="buttonClasses"
  >
    <div class="flex items-center justify-center gap-2 leading-none">
      <div
        class="size-2 scale-100 rounded-lg bg-[var(--accent)] transition-all duration-300 group-hover:scale-[100.8]"
      />
      <span
        class="inline-block whitespace-nowrap leading-none transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0"
      >
        <slot>{{ text }}</slot>
      </span>
    </div>

    <div
      class="absolute inset-0 z-10 flex translate-x-12 items-center justify-center gap-2 text-[var(--bg)] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
    >
      <span class="whitespace-nowrap leading-none"><slot>{{ text }}</slot></span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-arrow-right size-4 shrink-0"
      >
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    </div>
  </a>
  <NuxtLink
    v-else-if="to"
    v-bind="attrs"
    :to="to"
    :class="buttonClasses"
  >
    <div class="flex items-center justify-center gap-2 leading-none">
      <div
        class="size-2 scale-100 rounded-lg bg-[var(--accent)] transition-all duration-300 group-hover:scale-[100.8]"
      />
      <span
        class="inline-block whitespace-nowrap leading-none transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0"
      >
        <slot>{{ text }}</slot>
      </span>
    </div>

    <div
      class="absolute inset-0 z-10 flex translate-x-12 items-center justify-center gap-2 text-[var(--bg)] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
    >
      <span class="whitespace-nowrap leading-none"><slot>{{ text }}</slot></span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-arrow-right size-4 shrink-0"
      >
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    </div>
  </NuxtLink>
  <button
    v-else
    ref="buttonRef"
    v-bind="attrs"
    :class="buttonClasses"
    :type="type"
  >
    <div class="flex items-center justify-center gap-2 leading-none">
      <div
        class="size-2 scale-100 rounded-lg bg-[var(--accent)] transition-all duration-300 group-hover:scale-[100.8]"
      />
      <span
        class="inline-block whitespace-nowrap leading-none transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0"
      >
        <slot>{{ text }}</slot>
      </span>
    </div>

    <div
      class="absolute inset-0 z-10 flex translate-x-12 items-center justify-center gap-2 text-[var(--bg)] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
    >
      <span class="whitespace-nowrap leading-none"><slot>{{ text }}</slot></span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-arrow-right size-4 shrink-0"
      >
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    </div>
  </button>
</template>

<style>
.interactive-hover-button--solid {
  color: var(--bg);
}
</style>
