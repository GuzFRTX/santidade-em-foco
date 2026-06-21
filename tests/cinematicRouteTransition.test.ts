import { describe, expect, it } from 'vitest';
import {
  CINEMATIC_ROUTE_PATHS,
  shouldUseCinematicRouteTransition,
} from '~/utils/cinematicRouteTransition';

describe('cinematic route transition scope', () => {
  it('contains only home, projects, and budget', () => {
    expect(CINEMATIC_ROUTE_PATHS).toEqual(['/', '/projetos', '/orcamento']);
  });

  it.each([
    ['/', '/projetos'],
    ['/projetos', '/'],
    ['/projetos', '/orcamento'],
    ['/orcamento', '/projetos'],
    ['/', '/orcamento'],
    ['/orcamento', '/'],
    ['/projetos/', '/orcamento/'],
  ])('enables dissolve from %s to %s', (from, to) => {
    expect(shouldUseCinematicRouteTransition(from, to)).toBe(true);
  });

  it.each([
    ['/', '/'],
    ['/projetos', '/projetos'],
    ['/', '/contato'],
    ['/contato', '/'],
    ['/contato', '/orcamento'],
    ['/orcamento', '/contato'],
    ['', '/projetos'],
    ['/unknown', '/projetos'],
  ])('skips dissolve from %s to %s', (from, to) => {
    expect(shouldUseCinematicRouteTransition(from, to)).toBe(false);
  });
});
