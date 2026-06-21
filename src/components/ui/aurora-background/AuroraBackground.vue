<script setup lang="ts">
import { cn } from "@inspira-ui/plugins";
import { computed } from "vue";

interface AuroraBackgroundProps {
  radialGradient?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<AuroraBackgroundProps>(), {
  radialGradient: true,
});

const styles = computed(() => {
  return {
    "--aurora":
      "repeating-linear-gradient(100deg,var(--bg-deep)_8%,var(--surface-2)_14%,var(--white-soft)_19%,var(--accent-soft)_24%,var(--bg-deep)_30%)",
    "--dark-gradient":
      "repeating-linear-gradient(100deg,var(--text)_0%,var(--text)_7%,transparent_10%,transparent_12%,var(--text)_16%)",
    "--white-gradient":
      "repeating-linear-gradient(100deg,var(--white-soft)_0%,var(--white-soft)_7%,transparent_10%,transparent_12%,var(--white-soft)_16%)",

    "--blue-300": "var(--surface)",
    "--blue-400": "var(--surface-2)",
    "--blue-500": "var(--bg-deep)",
    "--indigo-300": "var(--bg)",
    "--violet-200": "var(--surface)",
    "--black": "var(--text)",
    "--white": "var(--white-soft)",
    "--transparent": "transparent",
    "--animate-aurora": "aurora 60s linear infinite",
  };
});
</script>

<template>
  <main>
    <div
      v-bind="props"
      :class="
        cn(
          `transition-bg relative flex h-screen flex-col items-center justify-center bg-[var(--bg)] text-[var(--text)]`,
          props.class,
        )
      "
    >
      <div
        :style="styles"
        class="absolute inset-0 overflow-hidden"
      >
        <div
          :class="
            cn(
              `after:animate-aurora pointer-events-none absolute -inset-2.5 [background-image:var(--white-gradient),var(--aurora)] bg-size-[300%,200%] bg-position-[50%_50%,50%_50%] opacity-60 blur-[8px] filter will-change-transform [--aurora:repeating-linear-gradient(100deg,var(--bg-deep)_8%,var(--surface-2)_14%,var(--white-soft)_19%,var(--accent-soft)_24%,var(--bg-deep)_30%)] [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)] [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] after:bg-size-[200%,100%] after:bg-fixed after:mix-blend-multiply after:content-['']`,
              props.radialGradient &&
                `mask-[radial-gradient(ellipse_at_100%_0%,var(--text)_10%,var(--transparent)_70%)]`,
            )
          "
        />
      </div>
      <slot />
    </div>
  </main>
</template>
