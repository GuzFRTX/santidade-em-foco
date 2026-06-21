import { describe, expect, it } from 'vitest';
import { projects } from '~/data/projects';

describe('project photo carousel data', () => {
  it('contains every direct project photograph in editorial and numeric order', () => {
    const sources = projects.flatMap((project) => project.photos.map((photo) => photo.src));

    expect(sources).toHaveLength(33);
    expect(sources).toEqual([
      '/images/Projetos/SANTIDADEEMFOCO-076.avif',
      '/images/Projetos/SANTIDADEEMFOCO-086.avif',
      '/images/Projetos/SANTIDADEEMFOCO-087.avif',
      '/images/Projetos/SANTIDADEEMFOCO-088.avif',
      '/images/Projetos/SANTIDADEEMFOCO-089.avif',
      '/images/Projetos/SANTIDADEEMFOCO-095.avif',
      '/images/Projetos/SANTIDADEEMFOCO-098.avif',
      '/images/Projetos/SANTIDADEEMFOCO-109.avif',
      '/images/Projetos/SANTIDADEEMFOCO-111.avif',
      '/images/Projetos/SANTIDADEEMFOCO-114.avif',
      '/images/Projetos/@LHERME_FILMS_11.avif',
      '/images/Projetos/@LHERME_FILMS_18.avif',
      '/images/Projetos/@LHERME_FILMS_28.avif',
      '/images/Projetos/@LHERME_FILMS_29.avif',
      '/images/Projetos/@LHERME_FILMS_33.avif',
      '/images/Projetos/@LHERME_FILMS_37.avif',
      '/images/Projetos/@LHERME_FILMS_46.avif',
      '/images/Projetos/@LHERME_FILMS_57.avif',
      '/images/Projetos/@LHERME_FILMS_65.avif',
      '/images/Projetos/@LHERME_FILMS_66.avif',
      '/images/Projetos/@LHERME_FILMS_67.avif',
      '/images/Projetos/@LHERME_FILMS_68.avif',
      '/images/Projetos/@LHERME_FILMS_86.avif',
      '/images/Projetos/@LHERME_FILMS_89.avif',
      '/images/Projetos/@OFOTOGRAFOMISSIONARIO_24.JPG',
      '/images/Projetos/@OFOTOGRAFOMISSIONARIO_48.JPG',
      '/images/Projetos/@OFOTOGRAFOMISSIONARIO_70.JPG',
      '/images/Projetos/@OFOTOGRAFOMISSIONARIO_74.JPG',
      '/images/Projetos/@OFOTOGRAFOMISSIONARIO_82.JPG',
      '/images/Projetos/@OFOTOGRAFOMISSIONARIO_96.JPG',
      '/images/Projetos/@OFOTOGRAFOMISSIONARIO_106.JPG',
      '/images/Projetos/@OFOTOGRAFOMISSIONARIO_123.JPG',
      '/images/Projetos/@OFOTOGRAFOMISSIONARIO_150.JPG',
    ]);
    expect(sources.some((source) => source.includes('poster'))).toBe(false);
  });
});
