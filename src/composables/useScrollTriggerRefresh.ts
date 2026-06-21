import { nextTick, onMounted } from 'vue';
import { useGsapContext } from './useGsapContext';

export function useScrollTriggerRefresh() {
  const { ScrollTrigger } = useGsapContext();

  onMounted(async () => {
    await nextTick();
    ScrollTrigger?.refresh();
  });
}
