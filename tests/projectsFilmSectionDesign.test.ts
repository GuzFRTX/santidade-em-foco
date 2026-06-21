import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const source = readFileSync(
  join(
    process.cwd(),
    'src/components/sections/projects/ProjectsFilmSection/ProjectsFilmSection.vue',
  ),
  'utf8',
);

describe('projects film section design', () => {
  it('renders one carousel instead of scattered video cards', () => {
    expect(source).toContain('<ProjectsFilmCarousel :videos="videos" />');
    expect(source).not.toContain('v-for="video in videos"');
    expect(source).not.toContain('film-section__card');
    expect(source).not.toContain('<Teleport');
  });

  it('keeps the section inside the project palette and typography', () => {
    expect(source).not.toContain('background: var(--bg)');
    expect(source).not.toContain('background-image:');
    expect(source).toContain('color: var(--text)');
    expect(source).toContain('font-family: var(--font-display)');
    expect(source).not.toContain('#3a3027');
    expect(source).not.toContain('#efe7da');
  });

  it('closes films with a secure YouTube CTA using the shared button', () => {
    expect(source).toContain("import Button from '~/components/ui/Button/Button.vue'");
    expect(source).toContain('Mais hist&oacute;rias em movimento esperam por voc&ecirc;.');
    expect(source).toContain('href="https://www.youtube.com/@lhermefilms"');
    expect(source).toContain('target="_blank"');
    expect(source).toContain('rel="noopener noreferrer"');
    expect(source).toContain('variant="solid"');
    expect(source).toContain('Ver no YouTube');
  });
});
