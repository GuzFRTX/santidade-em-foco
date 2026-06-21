import type { TransitionProps } from 'vue';
import type { gsap } from 'gsap';
import { onBeforeUnmount, onMounted } from 'vue';
import { useNuxtApp, useRouter } from '#app';
import { shouldUseCinematicRouteTransition } from '~/utils/cinematicRouteTransition';

type TransitionDone = () => void;

export function useCinematicPageTransition(): TransitionProps {
  const { $gsap, $lenis } = useNuxtApp();
  const router = useRouter();

  let enabled = false;
  let navigationId = 0;
  let removeGuard: (() => void) | undefined;
  let leaveTween: gsap.core.Tween | null = null;
  let enterTween: gsap.core.Tween | null = null;
  let leaveElement: Element | null = null;
  let enterElement: Element | null = null;
  let leaveDone: TransitionDone | null = null;
  let enterDone: TransitionDone | null = null;

  const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const clearElement = (element: Element | null) => {
    if (!element) {
      return;
    }

    $gsap.set(element, {
      clearProps: 'opacity,filter,transform,transformOrigin,willChange,zIndex',
    });
  };

  const releasePendingHooks = () => {
    const pendingLeaveDone = leaveDone;
    const pendingEnterDone = enterDone;

    leaveDone = null;
    enterDone = null;
    pendingLeaveDone?.();
    pendingEnterDone?.();
  };

  const cancelActiveTransition = () => {
    leaveTween?.kill();
    enterTween?.kill();
    leaveTween = null;
    enterTween = null;
    clearElement(leaveElement);
    clearElement(enterElement);
    leaveElement = null;
    enterElement = null;
    releasePendingHooks();
    $lenis.start();
  };

  const finishImmediately = (element: Element, done: TransitionDone) => {
    clearElement(element);
    done();
  };

  onMounted(() => {
    removeGuard = router.beforeEach((to, from) => {
      cancelActiveTransition();
      navigationId += 1;
      enabled = shouldUseCinematicRouteTransition(from.path, to.path);

      if (enabled) {
        $lenis.stop();
      }

      return true;
    });
  });

  onBeforeUnmount(() => {
    removeGuard?.();
    cancelActiveTransition();
  });

  return {
    css: false,
    onBeforeLeave(element) {
      if (!enabled || prefersReducedMotion()) {
        return;
      }

      $gsap.set(element, {
        transformOrigin: 'center center',
        willChange: 'opacity, transform, filter',
        zIndex: 2,
      });
    },
    onLeave(element, done) {
      if (!enabled || prefersReducedMotion()) {
        finishImmediately(element, done);
        return;
      }

      const currentNavigationId = navigationId;
      leaveElement = element;
      leaveDone = done;
      leaveTween = $gsap.to(element, {
        opacity: 0,
        filter: 'blur(10px)',
        scale: 1.015,
        duration: 0.52,
        ease: 'power2.inOut',
        onComplete: () => {
          if (currentNavigationId !== navigationId) {
            return;
          }

          leaveTween = null;
          leaveDone = null;
          clearElement(element);
          leaveElement = null;
          done();
        },
      });
    },
    onBeforeEnter(element) {
      if (!enabled || prefersReducedMotion()) {
        clearElement(element);
        return;
      }

      $gsap.set(element, {
        opacity: 0,
        filter: 'blur(8px)',
        scale: 1.015,
        y: 15,
        transformOrigin: 'center center',
        willChange: 'opacity, transform, filter',
        zIndex: 1,
      });
    },
    onEnter(element, done) {
      if (!enabled || prefersReducedMotion()) {
        finishImmediately(element, done);
        $lenis.start();
        enabled = false;
        return;
      }

      const currentNavigationId = navigationId;
      enterElement = element;
      enterDone = done;
      enterTween = $gsap.to(element, {
        opacity: 1,
        filter: 'blur(0px)',
        scale: 1,
        y: 0,
        duration: 0.76,
        delay: 0.17,
        ease: 'power4.out',
        onComplete: () => {
          if (currentNavigationId !== navigationId) {
            return;
          }

          enterTween = null;
          enterDone = null;
          clearElement(element);
          enterElement = null;
          $lenis.start();
          enabled = false;
          done();
        },
      });
    },
    onLeaveCancelled(element) {
      cancelActiveTransition();
      clearElement(element);
    },
    onEnterCancelled(element) {
      cancelActiveTransition();
      clearElement(element);
    },
    onAfterLeave(element) {
      clearElement(element);
    },
    onAfterEnter(element) {
      clearElement(element);
      $lenis.start();
      enabled = false;
    },
  };
}
