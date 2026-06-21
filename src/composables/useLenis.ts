import { useNuxtApp } from '#app';

export function useLenis() {
  return useNuxtApp().$lenis;
}
