<template>
  <section class="section section--tight">
    <Container>
      <div class="contact-options">
        <SectionTitle eyebrow="Canais">Escolha o melhor caminho.</SectionTitle>
        <div class="contact-options__grid">
          <ContactOptionCard v-for="option in contactOptions" :key="option.href" :option="option" />
        </div>
      </div>
    </Container>
  </section>
</template>

<script setup lang="ts">
import Container from '~/components/ui/Container/Container.vue';
import SectionTitle from '~/components/ui/SectionTitle/SectionTitle.vue';
import { contactOptions } from '~/data/contact';
import ContactOptionCard from './ContactOptionCard.vue';
</script>

<style scoped>
.contact-options {
  display: grid;
  grid-template-columns: minmax(260px, 0.72fr) minmax(320px, 1fr);
  gap: 54px;
}

.contact-options__grid {
  display: grid;
  gap: 8px;
}

@media (max-width: 820px) {
  .contact-options {
    grid-template-columns: 1fr;
  }
}
</style>
