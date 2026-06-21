import type { Project } from '~/types/project';

const santidadeFiles = [
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

const santidadeEditorialFiles = [
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
  '@OFOTOGRAFOMISSIONARIO_24.JPG',
  '@OFOTOGRAFOMISSIONARIO_48.JPG',
  '@OFOTOGRAFOMISSIONARIO_70.JPG',
  '@OFOTOGRAFOMISSIONARIO_74.JPG',
  '@OFOTOGRAFOMISSIONARIO_82.JPG',
  '@OFOTOGRAFOMISSIONARIO_96.JPG',
  '@OFOTOGRAFOMISSIONARIO_106.JPG',
  '@OFOTOGRAFOMISSIONARIO_123.JPG',
  '@OFOTOGRAFOMISSIONARIO_150.JPG'
];

export const projects: Project[] = [
  {
    id: 'santidade-em-foco',
    title: 'Santidade em foco',
    date: '2026',
    category: 'batizado',
    categoryLabel: 'Evento religioso',
    location: 'Rio de Janeiro',
    summary:
      'Registro fotográfico de celebrações religiosas com atenção aos gestos, à luz e à narrativa de cada encontro.',
    cover: '/images/Projetos/SANTIDADEEMFOCO-076.avif',
    featured: true,
    photos: santidadeFiles.map((fileName, index) => ({
      src: `/images/Projetos/${fileName}`,
      alt: `Santidade em foco - fotografia ${index + 1}`
    }))
  },
  {
    id: 'lherme-films',
    title: 'Santidade em Foco',
    date: '2026',
    category: 'formatura',
    categoryLabel: 'Editorial',
    location: 'Rio de Janeiro',
    summary:
      'Ensaio visual com composição editorial, movimento e contraste para destacar atmosfera e presença.',
    cover: '/images/Projetos/@LHERME_FILMS_11.avif',
    featured: true,
    photos: santidadeEditorialFiles.map((fileName, index) => ({
      src: `/images/Projetos/${fileName}`,
      alt: `Santidade em Foco - fotografia ${index + 1}`
    }))
  }
];
