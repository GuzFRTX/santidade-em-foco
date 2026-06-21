import { useNuxtApp } from '#app';

export function useGsapContext() {
  const nuxtApp = useNuxtApp();
  return {
    gsap: nuxtApp.$gsap,
    ScrollTrigger: nuxtApp.$ScrollTrigger
  };
}
