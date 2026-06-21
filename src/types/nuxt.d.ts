import type Lenis from 'lenis';
import type { gsap } from 'gsap';
import type { ScrollTrigger } from 'gsap/ScrollTrigger';

declare module '#app' {
  interface NuxtApp {
    $lenis: Lenis;
    $gsap: typeof gsap;
    $ScrollTrigger: typeof ScrollTrigger;
  }
}

export {};
