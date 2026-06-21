import Lenis from 'lenis';
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin(() => {
  const lenis = new Lenis({
    duration: 1.08,
    smoothWheel: true,
    wheelMultiplier: 0.9
  });

  let rafId = 0;
  const raf = (time: number) => {
    lenis.raf(time);
    rafId = requestAnimationFrame(raf);
  };

  rafId = requestAnimationFrame(raf);

  window.addEventListener('beforeunload', () => {
    cancelAnimationFrame(rafId);
    lenis.destroy();
  });

  return {
    provide: {
      lenis
    }
  };
});
