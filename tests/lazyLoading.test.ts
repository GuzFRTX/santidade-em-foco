import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const projectFile = (path: string) =>
  readFileSync(join(process.cwd(), path), 'utf8');

describe('lazy loading setup', () => {
  it('loads below-the-fold home sections as async components', () => {
    const page = projectFile('src/pages/index.vue');

    expect(page).toContain("import { defineAsyncComponent } from 'vue'");
    expect(page).toMatch(/const HorizontalProjectsPreviewSection = defineAsyncComponent/);
    expect(page).toMatch(/const VisualStatementSection = defineAsyncComponent/);
    expect(page).toMatch(/const HorizontalTimelineSection = defineAsyncComponent/);
    expect(page).toMatch(/const FinalFrameCTASection = defineAsyncComponent/);
  });

  it('loads non-critical contact components lazily', () => {
    const contactPage = projectFile('src/pages/contato.vue');

    expect(contactPage).toMatch(/const ContactOptionsSection = defineAsyncComponent/);
    expect(contactPage).toMatch(/const ContactFormSection = defineAsyncComponent/);
  });

  it('marks non-critical media for efficient browser loading', () => {
    const contactHero = projectFile('src/components/sections/contact/ContactHeroSection/ContactHeroSection.vue');
    const heroBackground = projectFile('src/components/sections/home/HeroVideoTextSection/HeroBackgroundVideo.vue');

    expect(contactHero).toContain('loading="lazy"');
    expect(contactHero).toContain('decoding="async"');
    expect(heroBackground).not.toContain('loading="eager"');
    expect(heroBackground).toContain('loading="lazy"');
    expect(heroBackground).toContain('decoding="async"');
  });
});
