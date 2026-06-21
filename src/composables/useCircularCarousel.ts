import { ref } from 'vue';

const SWIPE_THRESHOLD = 48;

export function useCircularCarousel(getLength: () => number) {
  const activeIndex = ref(0);
  const swipeStartX = ref<number | null>(null);

  function normalize(index: number) {
    const length = getLength();

    return length > 0 ? (index + length) % length : 0;
  }

  function next() {
    activeIndex.value = normalize(activeIndex.value + 1);
  }

  function previous() {
    activeIndex.value = normalize(activeIndex.value - 1);
  }

  function startSwipe(clientX: number) {
    swipeStartX.value = clientX;
  }

  function endSwipe(clientX: number) {
    if (swipeStartX.value === null) return;

    const distance = clientX - swipeStartX.value;
    swipeStartX.value = null;

    if (distance <= -SWIPE_THRESHOLD) next();
    if (distance >= SWIPE_THRESHOLD) previous();
  }

  return { activeIndex, next, previous, startSwipe, endSwipe };
}
