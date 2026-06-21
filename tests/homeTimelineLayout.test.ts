import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const projectFile = (path: string) => readFileSync(join(process.cwd(), path), 'utf8');

describe('home timeline layout', () => {
  it('uses one vertical timeline line in stacked layouts', () => {
    const timelineSection = projectFile(
      'src/components/sections/home/HorizontalTimelineSection/HorizontalTimelineSection.vue'
    );
    const timelineFrame = projectFile(
      'src/components/sections/home/HorizontalTimelineSection/TimelineFrame.vue'
    );

    expect(timelineSection).toContain('.horizontal-timeline__line');
    expect(timelineFrame).toMatch(/@media \(max-width: 1024px\)[\s\S]*border-left:\s*0/);
  });
});
