import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { featuredGalleryPhotos, galleryPhotos } from '~/data/galleryPhotos';
import { timeline } from '~/data/timeline';

const projectFile = (path: string) => readFileSync(join(process.cwd(), path), 'utf8');

describe('cinematic home data', () => {
  it('has loose gallery photos for the horizontal preview', () => {
    expect(galleryPhotos.length).toBeGreaterThanOrEqual(12);
    expect(featuredGalleryPhotos.length).toBeGreaterThanOrEqual(6);
    expect(featuredGalleryPhotos.every((photo) => photo.src.startsWith('/images/') && photo.alt)).toBe(true);
  });

  it('has timeline entries for the horizontal timeline', () => {
    expect(timeline.length).toBeGreaterThanOrEqual(3);
    expect(timeline.every((item) => Boolean(item.year && item.title && item.text))).toBe(true);
  });

  it('uses the home video as the opening background with a cinematic vignette', () => {
    const hero = projectFile('src/components/sections/home/HeroVideoTextSection/HeroVideoTextSection.vue');

    expect(hero).toContain('class="hero-section__background-video"');
    expect(hero).toContain('src="/videos/Home/CASAMENTO-GABRIEL-_-BEATRIZ-13-06-26.webm"');
    expect(hero).not.toContain('CRISMA%20SAO%20RAFAEL%202026.mp4');
    expect(hero).toContain('muted');
    expect(hero).toContain('playsinline');
    expect(hero).toContain('santidade em foco');
    expect(hero).toContain('.hero-section::before');
    expect(hero).toContain('.hero-section::after');
    expect(hero).toContain('radial-gradient');
    expect(hero).toContain('linear-gradient');
    expect(hero).toContain('font-family: var(--font-display)');
    expect(hero).not.toContain('VideoText');
    expect(hero).not.toContain('hero-section__video-text');
  });
});
