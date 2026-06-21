import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const source = readFileSync(
  join(
    process.cwd(),
    'src/components/sections/projects/ProjectsPhotoCarousel/ProjectsPhotoCarousel.vue'
  ),
  'utf8'
);

describe('projects photo carousel design', () => {
  it('starts at the first image and aligns every snap point to the content edge', () => {
    expect(source).toContain('track.scrollLeft = 0');
    expect(source).toContain('scroll-snap-align: start');
    expect(source).not.toContain('scroll-snap-align: center');
  });

  it('uses smooth controls while respecting reduced motion', () => {
    expect(source).toContain("behavior: prefersReducedMotion.value ? 'auto' : 'smooth'");
    expect(source).toContain('scroll-behavior: smooth');
    expect(source).toContain('@media (prefers-reduced-motion: reduce)');
    expect(source).toContain('scroll-behavior: auto');
  });
});
