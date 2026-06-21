<template>
  <section class="final-frame" aria-labelledby="final-frame-title">
    <div class="final-frame__content">
      <p id="final-frame-title" class="eyebrow">Frame final</p>
      <div class="final-frame__actions">
        <Button to="/projetos" variant="solid">Ver projetos</Button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Button from '~/components/ui/Button/Button.vue';
</script>

<style scoped>
.final-frame {
  position: relative;
  min-height: 58dvh;
  display: grid;
  place-items: center;
  overflow: hidden;
  padding: 72px 48px;
}

.final-frame__content {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  width: min(100%, 520px);
  text-align: center;
}

.final-frame__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 18px;
}

@media (max-width: 760px) {
  .final-frame {
    min-height: 48dvh;
    padding: 72px 22px;
  }
}
</style>
