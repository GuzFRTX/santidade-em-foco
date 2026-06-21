import type { Photo } from '~/types/photo';

const homeImageFiles = [
  '@LHERME_FILMS_11.avif',
  '@LHERME_FILMS_29.avif',
  '@OFOTOGRAFOMISSIONARIO_123.JPG',
  '@OFOTOGRAFOMISSIONARIO_48.JPG',
  'SANTIDADEEMFOCO-088.avif',
  'SANTIDADEEMFOCO-098.avif'
];

const projectImageFiles = [
  '@LHERME_FILMS_11.avif',
  '@LHERME_FILMS_18.avif',
  '@LHERME_FILMS_28.avif',
  '@LHERME_FILMS_29.avif',
  '@LHERME_FILMS_33.avif',
  '@LHERME_FILMS_37.avif',
  '@LHERME_FILMS_46.avif',
  '@LHERME_FILMS_57.avif',
  '@LHERME_FILMS_65.avif',
  '@LHERME_FILMS_66.avif',
  '@LHERME_FILMS_67.avif',
  '@LHERME_FILMS_68.avif',
  '@LHERME_FILMS_86.avif',
  '@LHERME_FILMS_89.avif',
  '@OFOTOGRAFOMISSIONARIO_106.JPG',
  '@OFOTOGRAFOMISSIONARIO_123.JPG',
  '@OFOTOGRAFOMISSIONARIO_150.JPG',
  '@OFOTOGRAFOMISSIONARIO_24.JPG',
  '@OFOTOGRAFOMISSIONARIO_48.JPG',
  '@OFOTOGRAFOMISSIONARIO_70.JPG',
  '@OFOTOGRAFOMISSIONARIO_74.JPG',
  '@OFOTOGRAFOMISSIONARIO_82.JPG',
  '@OFOTOGRAFOMISSIONARIO_96.JPG',
  'SANTIDADEEMFOCO-076.avif',
  'SANTIDADEEMFOCO-086.avif',
  'SANTIDADEEMFOCO-087.avif',
  'SANTIDADEEMFOCO-088.avif',
  'SANTIDADEEMFOCO-089.avif',
  'SANTIDADEEMFOCO-095.avif',
  'SANTIDADEEMFOCO-098.avif',
  'SANTIDADEEMFOCO-109.avif',
  'SANTIDADEEMFOCO-111.avif',
  'SANTIDADEEMFOCO-114.avif'
];

const createPhotos = (basePath: string, files: string[], altPrefix: string): Photo[] =>
  files.map((fileName, index) => ({
    src: `${basePath}/${fileName}`,
    alt: `${altPrefix} - fotografia ${index + 1}`,
    featured: true
  }));

export const homePreviewPhotos: Photo[] = createPhotos(
  '/images/Projetos',
  homeImageFiles,
  'Prévia de projeto'
);

export const galleryPhotos: Photo[] = createPhotos(
  '/images/Projetos',
  projectImageFiles,
  'Santidade em foco'
);

export const featuredGalleryPhotos = homePreviewPhotos;
