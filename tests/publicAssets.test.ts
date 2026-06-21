import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { galleryPhotos, homePreviewPhotos } from '~/data/galleryPhotos';
import { projects } from '~/data/projects';
import { videos } from '~/data/videos';

const publicAsset = (src: string) => decodeURIComponent(src.split('?')[0]);
const existsInPublic = (src: string) => existsSync(join(process.cwd(), 'public', publicAsset(src)));
const sourceFiles = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      return sourceFiles(fullPath);
    }

    return /\.(ts|vue)$/.test(entry.name) ? [fullPath] : [];
  });

describe('public media references', () => {
  it('points image data to existing public files', () => {
    const imageSources = [
      ...homePreviewPhotos.map((photo) => photo.src),
      ...galleryPhotos.map((photo) => photo.src),
      ...projects.flatMap((project) => [project.cover, ...project.photos.map((photo) => photo.src)]),
      ...videos.map((video) => video.thumbnail)
    ];

    expect(imageSources.filter((src) => !existsInPublic(src))).toEqual([]);
  });

  it('points video data to existing public files', () => {
    expect(videos.map((video) => video.src).filter((src) => !existsInPublic(src))).toEqual([]);
  });

  it('uses browser-compatible MP4 sources for project videos', () => {
    const videoSource = readFileSync(join(process.cwd(), 'src/data/videos.ts'), 'utf8');
    const sources = [...videoSource.matchAll(/src:\s*'([^']+)'/g)].map((match) => match[1]);

    expect(sources).toHaveLength(4);
    expect(sources.every((source) => source.endsWith('.mp4'))).toBe(true);
    expect(sources.some((source) => source.endsWith('.avi'))).toBe(false);
    expect(videos).toHaveLength(4);
    expect(
      videos.every((video) => video.thumbnail.startsWith('/images/Projetos/video-posters/'))
    ).toBe(true);

    for (const source of sources) {
      expect(existsSync(join(process.cwd(), 'public', decodeURIComponent(source)))).toBe(true);
    }
  });

  it('keeps home and projects videos in their dedicated public folders', () => {
    const homeHero = readFileSync(
      join(process.cwd(), 'src/components/sections/home/HeroVideoTextSection/HeroVideoTextSection.vue'),
      'utf8'
    );

    expect(homeHero).toContain('/videos/Home/');
    expect(homeHero).not.toContain('/videos/Projetos/');
    expect(videos.map((video) => video.src).every((src) => src.startsWith('/videos/Projetos/'))).toBe(true);
  });

  it('points direct source media references to existing public files', () => {
    const directSources = sourceFiles(join(process.cwd(), 'src')).flatMap((filePath) => {
      const content = readFileSync(filePath, 'utf8');

      return [...content.matchAll(/["'`]((?:\/images|\/videos)\/[^"'`]+)["'`]/g)]
        .map((match) => match[1])
        .filter((src) => !src.includes('${'));
    });

    expect(directSources.filter((src) => !existsInPublic(src))).toEqual([]);
  });
});
