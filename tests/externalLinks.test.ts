import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const projectFile = (path: string) => readFileSync(join(process.cwd(), path), 'utf8');

describe('external links', () => {
  it('uses noopener with every blank-target link', () => {
    const files = [
      'src/components/layout/Footer/FooterLinks.vue',
      'src/components/sections/contact/ContactOptionsSection/ContactOptionCard.vue',
      'src/pages/orcamento.vue'
    ];

    const unsafeLinks = files.flatMap((file) => {
      const content = projectFile(file);

      return [...content.matchAll(/<[^>]+target="_blank"[^>]*>/g)]
        .map(([tag]) => ({ file, tag }))
        .filter(({ tag }) => !/rel="[^"]*\bnoopener\b/.test(tag));
    });

    expect(unsafeLinks).toEqual([]);
  });
});
