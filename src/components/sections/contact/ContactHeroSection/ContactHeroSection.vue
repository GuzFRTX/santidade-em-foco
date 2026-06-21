<template>
  <section class="contact-hero">
    <div class="contact-hero__copy">
      <p class="eyebrow">Contato</p>
      <h1 class="display-title">Vamos falar sobre<br /><em>o seu projeto</em></h1>
      <p class="body-copy">
        Se voc&ecirc; quer or&ccedil;ar uma cobertura, ensaio ou desenvolver uma narrativa visual para o seu evento, este &eacute; o melhor ponto de partida para conversarmos.
      </p>
    </div>
    <figure class="contact-hero__image">
      <img :src="heroImage" alt="Sele&ccedil;&atilde;o de trabalhos de Guilherme Ribeiro" loading="lazy" decoding="async" />
      <figcaption>Projetos editoriais, eventos, retratos e narrativas visuais constru&iacute;das com aten&ccedil;&atilde;o ao detalhe.</figcaption>
    </figure>
  </section>
</template>

<script setup lang="ts">
const heroImage = '/images/Projetos/@OFOTOGRAFOMISSIONARIO_123.JPG';
</script>

<style scoped>
.contact-hero {
  display: grid;
  grid-template-columns: minmax(300px, 1.05fr) minmax(320px, 0.95fr);
  align-items: center;
  gap: 54px;
  min-height: 100dvh;
  padding: 122px 48px 72px;
}

.contact-hero__copy {
  max-width: 560px;
}

.contact-hero__image {
  position: relative;
  min-height: 520px;
  margin: 0;
  overflow: hidden;
  border: 1px solid var(--border-soft);
  background: var(--surface);
}

.contact-hero__image img {
  width: 100%;
  height: 100%;
  min-height: 520px;
  object-fit: cover;
  filter: saturate(0.86) contrast(1.05);
}

.contact-hero__image::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(var(--text-rgb), 0.68), rgba(var(--text-rgb), 0.08) 52%);
}

.contact-hero__image figcaption {
  position: absolute;
  right: 28px;
  bottom: 26px;
  left: 28px;
  z-index: 1;
  color: rgba(var(--white-soft-rgb), 0.82);
  font-size: 11px;
  line-height: 1.7;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

@media (max-width: 900px) {
  .contact-hero {
    grid-template-columns: 1fr;
    min-height: auto;
    padding: 112px 24px 64px;
  }
}
</style>
