<script setup lang="ts">
import { cn } from "@inspira-ui/plugins";
import { computed, useId, useSlots } from "vue";

interface Props {
  src: string;
  class?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  preload?: "auto" | "metadata" | "none";
  fontSize?: string | number;
  fontWeight?: string | number;
  textAnchor?: string;
  dominantBaseline?: string;
  fontFamily?: string;
}

const props = withDefaults(defineProps<Props>(), {
  class: "",
  autoPlay: true,
  muted: true,
  loop: true,
  preload: "auto",
  fontSize: 20,
  fontWeight: "bold",
  textAnchor: "middle",
  dominantBaseline: "middle",
  fontFamily: "sans-serif",
});

const defaultSlot = useSlots().default;

const content = computed(
  () =>
    defaultSlot?.()
      .map((vnode) => String(vnode.children ?? ""))
      .join("") ?? "",
);

const maskId = useId();

const responsiveFontSize = computed(
  () => (typeof props.fontSize === "number" ? `${props.fontSize}vw` : props.fontSize),
);
</script>

<template>
  <div :class="cn(`relative size-full overflow-hidden`, props.class)">
    <svg
      class="absolute inset-0 size-full"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <mask
          :id="maskId"
          x="0"
          y="0"
          width="100%"
          height="100%"
          maskUnits="userSpaceOnUse"
          maskContentUnits="userSpaceOnUse"
        >
          <rect width="100%" height="100%" fill="black" />
          <text
            x="50%"
            y="50%"
            fill="white"
            :font-size="responsiveFontSize"
            :font-weight="fontWeight"
            :text-anchor="textAnchor"
            :dominant-baseline="dominantBaseline"
            :font-family="fontFamily"
          >
            {{ content }}
          </text>
        </mask>
      </defs>
      <foreignObject width="100%" height="100%" :mask="`url(#${maskId})`">
        <video
          xmlns="http://www.w3.org/1999/xhtml"
          class="size-full object-cover"
          :autoplay="autoPlay"
          :muted="muted"
          :loop="loop"
          :preload="preload"
        >
          <source :src="src" />
          Your browser does not support the video tag.
        </video>
      </foreignObject>
    </svg>
    <span class="sr-only">{{ content }}</span>
  </div>
</template>
