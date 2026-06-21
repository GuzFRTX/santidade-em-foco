import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { describe, expect, it } from 'vitest';

const root = process.cwd();

const walk = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      return walk(fullPath);
    }

    return [fullPath];
  });

describe('redundancy cleanup guards', () => {
  it('keeps source and tests free of mojibake text', () => {
    const mojibake = new RegExp(
      `[${String.fromCharCode(0x00c3)}${String.fromCharCode(0x00c2)}${String.fromCharCode(0x00e2)}${String.fromCharCode(0xfffd)}]`
    );
    const files = [...walk(join(root, 'src')), ...walk(join(root, 'tests'))].filter((filePath) =>
      /\.(ts|vue)$/.test(filePath)
    );

    const offenders = files
      .filter((filePath) => mojibake.test(readFileSync(filePath, 'utf8')))
      .map((filePath) => relative(root, filePath));

    expect(offenders).toEqual([]);
  });

  it('keeps public images canonical without duplicate filenames', () => {
    const images = walk(join(root, 'public', 'images')).filter((filePath) =>
      /\.(avif|jpe?g|png|webp|svg)$/i.test(filePath)
    );
    const seen = new Map<string, string>();
    const duplicates: string[] = [];

    images.forEach((filePath) => {
      const fileName = filePath.split(/[\\/]/).at(-1) ?? filePath;
      const first = seen.get(fileName);

      if (first) {
        duplicates.push(`${relative(root, first)} <-> ${relative(root, filePath)}`);
        return;
      }

      seen.set(fileName, filePath);
    });

    expect(duplicates).toEqual([]);
  });

  it('does not keep legacy components and data from retired page versions', () => {
    const retiredPaths = [
      'src/components/gallery',
      'src/components/layout/Header',
      'src/components/sections/home/IntroVisualSection',
      'src/components/sections/home/ProjectsCTASection',
      'src/components/sections/home/ScrollPhotoStorySection',
      'src/components/sections/home/TimelineSection',
      'src/components/sections/projects/ContactCTASection',
      'src/components/sections/projects/EditorialProjectsSection',
      'src/components/sections/projects/ProjectGallerySection',
      'src/components/sections/projects/ProjectsFilterSection',
      'src/components/sections/projects/ProjectsHeroSection',
      'src/components/sections/projects/VideoSection',
      'src/components/ui/Badge',
      'src/components/ui/bending-gallery',
      'src/composables/useGalleryFilters.ts',
      'src/composables/useLightbox.ts',
      'src/data/categories.ts',
      'src/data/featuredPhotos.ts',
      'src/data/navigation.ts',
      'src/data/photoStory.ts',
      'src/types/navigation.ts'
    ];

    const existing = retiredPaths.filter((path) => existsSync(join(root, path)));

    expect(existing).toEqual([]);
  });
});
