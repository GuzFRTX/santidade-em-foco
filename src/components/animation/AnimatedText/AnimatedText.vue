<template>
  <span class="animated-text"><slot /></span>
</template>

<style scoped>
.animated-text {
  display: inline-block;
  animation: fadeUp 0.8s ease both;
}
</style>
