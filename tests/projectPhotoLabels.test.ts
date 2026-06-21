import { describe, expect, it } from 'vitest';
import { projects } from '~/data/projects';

describe('project photo labels', () => {
  it('labels every former Lherme Films photo as Santidade em Foco', () => {
    const project = projects.find((item) => item.id === 'lherme-films');

    expect(project?.title).toBe('Santidade em Foco');
    expect(project?.photos).toHaveLength(23);
    expect(project?.photos.every((photo) => photo.alt.startsWith('Santidade em Foco -'))).toBe(true);
  });
});
