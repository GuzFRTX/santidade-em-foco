import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const source = readFileSync(
  join(process.cwd(), 'src/components/ExperienceIntro.vue'),
  'utf8',
);

describe('intro GUZ size', () => {
  it('increases only the GUZ brand credit', () => {
    expect(source).toMatch(
      /\.experience-intro__message small span\s*\{[^}]*font-size:\s*1\.06rem;/s,
    );
  });
});
