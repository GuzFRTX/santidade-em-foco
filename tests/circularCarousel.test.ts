import { describe, expect, it } from 'vitest';
import { useCircularCarousel } from '~/composables/useCircularCarousel';

describe('useCircularCarousel', () => {
  it('wraps next and previous navigation', () => {
    const carousel = useCircularCarousel(() => 3);

    carousel.previous();
    expect(carousel.activeIndex.value).toBe(2);

    carousel.next();
    expect(carousel.activeIndex.value).toBe(0);
  });

  it('stays at zero for empty and single-item lists', () => {
    const empty = useCircularCarousel(() => 0);
    const single = useCircularCarousel(() => 1);

    empty.next();
    empty.previous();
    single.next();
    single.previous();

    expect(empty.activeIndex.value).toBe(0);
    expect(single.activeIndex.value).toBe(0);
  });

  it('changes slide only after a deliberate horizontal swipe', () => {
    const carousel = useCircularCarousel(() => 3);

    carousel.startSwipe(180);
    carousel.endSwipe(110);
    expect(carousel.activeIndex.value).toBe(1);

    carousel.startSwipe(110);
    carousel.endSwipe(150);
    expect(carousel.activeIndex.value).toBe(1);

    carousel.startSwipe(110);
    carousel.endSwipe(180);
    expect(carousel.activeIndex.value).toBe(0);
  });

  it('uses a 48px inclusive swipe threshold', () => {
    const carousel = useCircularCarousel(() => 3);

    carousel.startSwipe(100);
    carousel.endSwipe(53);
    expect(carousel.activeIndex.value).toBe(0);

    carousel.startSwipe(100);
    carousel.endSwipe(52);
    expect(carousel.activeIndex.value).toBe(1);
  });

  it('ignores swipe endings without a matching start', () => {
    const carousel = useCircularCarousel(() => 3);

    carousel.endSwipe(0);

    expect(carousel.activeIndex.value).toBe(0);
  });
});
