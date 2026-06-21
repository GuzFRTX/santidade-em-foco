<template>
  <section class="visual-statement section section--tight">
    <div class="visual-statement__inner">
      <p class="eyebrow">Manifesto visual</p>
      <h2>Ritmo, detalhe e presenca em cada registro.</h2>
    </div>
  </section>
</template>

<style scoped>
.visual-statement {
  padding-inline: 48px;
}

.visual-statement__inner {
  width: min(100%, 1120px);
  margin: 0 auto;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  padding: 82px 0;
}

.visual-statement__inner h2 {
  max-width: 980px;
  margin: 0;
  color: var(--text);
  font-family: var(--font-display);
  font-size: clamp(42px, 7vw, 104px);
  font-weight: 500;
  line-height: 0.95;
}

@media (max-width: 760px) {
  .visual-statement {
    padding-inline: 22px;
  }
}
</style>
