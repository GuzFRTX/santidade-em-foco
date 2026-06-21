# Cinematic Route Dissolve Design

## Goal

Add cinematic page dissolves only when navigating between Home (`/`), Projetos (`/projetos`), and Orçamento (`/orcamento`). Keep the initial `ExperienceIntro` loading screen and Contato (`/contato`) entirely outside this transition.

## Architecture

Define one global Nuxt page transition at the `NuxtPage` boundary. A small route allowlist decides whether both source and destination belong to the three eligible routes. Eligible navigation runs GSAP lifecycle hooks; every other navigation completes immediately without animation.

Keep transition state and animation ownership centralized so individual pages need no duplicated hooks. The implementation must be client-safe, SSR-safe, and able to cancel an active timeline before starting another navigation.

## Motion

- Leave: `520ms`, opacity `1` to `0`, blur `0px` to `10px`, scale `1` to `1.015`.
- Enter: begin after approximately `170ms`, then animate for `760ms`; opacity `0` to `1`, blur `8px` to `0px`, scale `1.015` to `1`, and y `15px` to `0`.
- Use smooth cinematic easing and a short overlap between outgoing and incoming pages.
- Do not add loaders, curtains, flashes, logos, or transition overlays.

## Runtime Behavior

- Pause Lenis while an eligible transition runs and resume it after completion or cancellation.
- Kill stale GSAP animations during rapid navigation and clear transition-owned inline properties afterward.
- With `prefers-reduced-motion: reduce`, complete navigation immediately with no blur or transform animation.
- Set the document fallback background to Warm Beige `#efe7da` to prevent white flashes.
- Initial page load does not run the route dissolve. `ExperienceIntro` keeps its existing independent behavior.

## Scope

Eligible route pairs are any navigation where both sides are in this set:

- `/`
- `/projetos`
- `/orcamento`

Navigation to or from `/contato`, unknown routes, redirects outside the set, and the intro loading screen do not use the dissolve.

## Verification

- Add focused tests for the route allowlist and transition contract.
- Run the complete test suite, Nuxt typecheck, and production build.
- Browser-test all three eligible routes, including direct links, rapid clicks, browser Back/Forward, and reduced motion.
- Confirm `/contato` and the initial intro remain unchanged and unanimated by the route transition.
