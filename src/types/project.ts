import type { Photo } from './photo';

export type ProjectCategory = 'batizado' | 'cha' | 'formatura' | 'video';

export interface Project {
  id: string;
  title: string;
  date: string;
  category: ProjectCategory;
  categoryLabel: string;
  location: string;
  summary: string;
  cover: string;
  photos: Photo[];
  featured?: boolean;
}

export interface ProjectCategoryFilter {
  id: ProjectCategory | 'all';
  label: string;
}
