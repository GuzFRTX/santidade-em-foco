import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const projectFile = (path: string) => readFileSync(join(process.cwd(), path), 'utf8');

describe('projects page editorial structure', () => {
  it('links projects visitors to the budget page with the shared button style', () => {
    const page = projectFile('src/pages/projetos.vue');

    expect(page).toContain("import Button from '~/components/ui/Button/Button.vue'");
    expect(page).toContain('<Button to="/orcamento" variant="solid">');
    expect(page).toContain('Ver or&ccedil;amento');
    expect(page).toContain('Sua hist&oacute;ria tamb&eacute;m merece ser contada.');
    expect(page.indexOf('<ProjectsFilmSection')).toBeLessThan(
      page.indexOf('class="projects-page__cta"')
    );
  });

  it('uses the editorial carousel and film section instead of the old masonry grid', () => {
    const page = projectFile('src/pages/projetos.vue');

    expect(page).toContain('ProjectsPhotoCarousel');
    expect(page).toContain('ProjectsFilmSection');
    expect(page).toContain(':projects="projects"');
    expect(page).toContain(':videos="videos"');
    expect(page).not.toContain('ProjectsMasonryGrid');
    expect(page).not.toContain('galleryPhotos');
  });

  it('keeps films separate from the photo carousel data source', () => {
    const carousel = projectFile('src/components/sections/projects/ProjectsPhotoCarousel/ProjectsPhotoCarousel.vue');
    const filmSection = projectFile('src/components/sections/projects/ProjectsFilmSection/ProjectsFilmSection.vue');
    const filmCarousel = projectFile('src/components/sections/projects/ProjectsFilmSection/ProjectsFilmCarousel.vue');
    const videos = projectFile('src/data/videos.ts');

    expect(carousel).toContain('props.projects.flatMap');
    expect(carousel).toContain('scroll-snap-type');
    expect(carousel).toContain('scrollGallery');
    expect(carousel).not.toContain('videos');
    expect(filmSection).toContain('<ProjectsFilmCarousel :videos="videos" />');
    expect(filmCarousel).toContain('preload="metadata"');
    expect(filmCarousel).toContain(':poster="activeVideo.thumbnail"');
    expect(filmCarousel).toContain("event.key === 'Escape'");
    expect(videos).toContain('thumbnail:');
    expect(videos).toContain('thumbnailAlt:');
  });

  it('keeps the single film stage focused on the video frame without a repeated play CTA below', () => {
    const filmSection = projectFile('src/components/sections/projects/ProjectsFilmSection/ProjectsFilmSection.vue');
    const filmCarousel = projectFile('src/components/sections/projects/ProjectsFilmSection/ProjectsFilmCarousel.vue');

    expect(filmCarousel).toContain('class="film-carousel__play"');
    expect(filmCarousel).toContain('class="film-carousel__stage"');
    expect(filmSection).not.toContain('v-for="video in videos"');
    expect(filmSection).not.toContain('film-section__details');
    expect(filmCarousel).not.toContain('Ver filme');
  });
});
