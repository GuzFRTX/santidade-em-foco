<template>
  <div class="scroll-indicator" aria-hidden="true">
    <span />
    <small>Scroll</small>
  </div>
</template>

<style scoped>
.scroll-indicator {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--muted);
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.scroll-indicator span {
  width: 44px;
  height: 1px;
  background: var(--border);
}
</style>
