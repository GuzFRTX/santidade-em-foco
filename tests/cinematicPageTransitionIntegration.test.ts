import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const projectFile = (path: string) => readFileSync(join(process.cwd(), path), 'utf8');

describe('cinematic page transition integration', () => {
  it('implements the approved GSAP motion and Lenis lifecycle', () => {
    const source = projectFile('src/composables/useCinematicPageTransition.ts');

    expect(source).toContain('shouldUseCinematicRouteTransition(from.path, to.path)');
    expect(source).toContain('$lenis.stop()');
    expect(source).toContain('$lenis.start()');
    expect(source).toContain("filter: 'blur(10px)'");
    expect(source).toContain("filter: 'blur(8px)'");
    expect(source).toContain('scale: 1.015');
    expect(source).toContain('y: 15');
    expect(source).toContain('duration: 0.52');
    expect(source).toContain('duration: 0.76');
    expect(source).toContain('delay: 0.17');
    expect(source).toContain("matchMedia('(prefers-reduced-motion: reduce)')");
    expect(source).toContain("clearProps: 'opacity,filter,transform,transformOrigin,willChange,zIndex'");
    expect(source).toContain('leaveTween?.kill()');
    expect(source).toContain('enterTween?.kill()');
  });

  it('connects transition only to NuxtPage and leaves intro outside', () => {
    const app = projectFile('src/app.vue');

    expect(app).toContain('<ExperienceIntro />');
    expect(app).toContain(':transition="cinematicPageTransition"');
    expect(app).toContain('class="cinematic-route-stage"');
    expect(app).toContain('useCinematicPageTransition()');
    expect(app.indexOf('<ExperienceIntro />')).toBeLessThan(app.indexOf('<NuxtLayout>'));
  });

  it('overlays route roots and uses the warm beige document fallback', () => {
    const globals = projectFile('src/styles/globals.css');

    expect(globals).toMatch(/html\s*\{[^}]*background:\s*#efe7da;/s);
    expect(globals).toContain('.cinematic-route-stage');
    expect(globals).toContain('display: grid');
    expect(globals).toContain('.cinematic-route-stage > *');
    expect(globals).toContain('grid-area: 1 / 1');
  });

  it('keeps all eligible routes inside one persistent layout boundary', () => {
    const budgetPage = projectFile('src/pages/orcamento.vue');
    const layout = projectFile('src/layouts/default.vue');

    expect(budgetPage).not.toContain('layout: false');
    expect(layout).toContain("route.path === '/orcamento'");
    expect(layout).toContain('v-if="!isBudgetPage"');
  });
});
