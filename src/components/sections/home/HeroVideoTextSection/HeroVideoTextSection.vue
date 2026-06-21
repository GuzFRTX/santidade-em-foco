<template>
  <section class="hero-section" aria-labelledby="home-hero-title">
    <video
      class="hero-section__background-video"
      src="/videos/Home/CASAMENTO-GABRIEL-_-BEATRIZ-13-06-26.webm"
      autoplay
      muted
      loop
      playsinline
      preload="auto"
      aria-hidden="true"
    />
    <div class="hero-section__inner">
      <h1 id="home-hero-title" class="hero-section__title">santidade em foco</h1>
    </div>
    <HeroScrollIndicator class="hero-section__indicator" />
  </section>
</template>

<script setup lang="ts">
import HeroScrollIndicator from './HeroScrollIndicator.vue';
</script>

<style scoped>
.hero-section {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 100svh;
  overflow: hidden;
  padding: 0;
  isolation: isolate;
  background: #100d0a;
}

.hero-section::before,
.hero-section::after {
  position: absolute;
  inset: 0;
  z-index: -1;
  content: "";
  pointer-events: none;
}

.hero-section::before {
  background:
    radial-gradient(circle at 50% 44%, rgba(16, 13, 10, 0) 0%, rgba(16, 13, 10, 0.04) 44%, rgba(16, 13, 10, 0.46) 100%),
    linear-gradient(180deg, rgba(16, 13, 10, 0.22) 0%, rgba(16, 13, 10, 0.02) 38%, rgba(16, 13, 10, 0.52) 100%);
}

.hero-section::after {
  background: linear-gradient(90deg, rgba(16, 13, 10, 0.34) 0%, rgba(16, 13, 10, 0) 28%, rgba(16, 13, 10, 0) 72%, rgba(16, 13, 10, 0.3) 100%);
}

.hero-section__background-video {
  position: absolute;
  inset: 0;
  z-index: -2;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0.98) contrast(1.04) brightness(0.94);
}

.hero-section__inner {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 100%;
  min-height: 100svh;
  margin: 0;
  text-align: center;
}

.hero-section__title {
  max-width: min(94vw, 1240px);
  margin: 0;
  color: rgba(247, 239, 226, 0.9);
  font-family: var(--font-display);
  font-size: clamp(48px, 8.8vw, 138px);
  font-weight: 400;
  letter-spacing: 0;
  line-height: 0.9;
  text-align: center;
  text-transform: none;
  text-shadow: 0 18px 58px rgba(0, 0, 0, 0.48);
}

.hero-section__indicator {
  position: absolute;
  z-index: 1;
  bottom: 34px;
  inset-inline: 0;
  display: grid;
  place-items: center;
}

@media (max-width: 760px) {
  .hero-section {
    min-height: 100svh;
  }

  .hero-section__title {
    max-width: min(92vw, 620px);
    font-size: clamp(48px, 20vw, 98px);
  }

  .hero-section__indicator {
    bottom: 26px;
  }
}
</style>
