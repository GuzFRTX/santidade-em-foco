import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(ScrollTrigger);

  return {
    provide: {
      gsap,
      ScrollTrigger
    }
  };
});
