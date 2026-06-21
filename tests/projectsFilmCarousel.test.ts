import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { mount, type VueWrapper } from '@vue/test-utils';
import ProjectsFilmCarousel from '../src/components/sections/projects/ProjectsFilmSection/ProjectsFilmCarousel.vue';
import type { VideoProject } from '../src/types/video';

const videos: VideoProject[] = [
  {
    id: 'salt-air',
    title: 'Salt Air',
    date: '2025',
    src: '/films/salt-air.mp4',
    thumbnail: '/images/salt-air.jpg',
    thumbnailAlt: 'A figure walking beside the sea',
    categoryLabel: 'Editorial',
  },
  {
    id: 'quiet-earth',
    title: 'Quiet Earth',
    date: '2024',
    src: '/films/quiet-earth.mp4',
    thumbnail: '/images/quiet-earth.jpg',
    thumbnailAlt: 'Sunlight crossing a field',
    categoryLabel: 'Documentary',
  },
  {
    id: 'after-rain',
    title: 'After Rain',
    date: '2023',
    src: '/films/after-rain.mp4',
    thumbnail: '/images/after-rain.jpg',
    thumbnailAlt: 'A wet city street at dusk',
    categoryLabel: 'Portrait',
  },
];

const mounted: VueWrapper[] = [];

function mountCarousel(items = videos) {
  const wrapper = mount(ProjectsFilmCarousel, {
    attachTo: document.body,
    props: { videos: items },
  });

  mounted.push(wrapper);
  return wrapper;
}

describe('ProjectsFilmCarousel', () => {
  beforeEach(() => {
    vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => undefined);
  });

  afterEach(() => {
    mounted.splice(0).forEach((wrapper) => wrapper.unmount());
    document.body.innerHTML = '';
    vi.restoreAllMocks();
  });

  it('renders exactly one active stage without visible project metadata', () => {
    const wrapper = mountCarousel();

    expect(wrapper.get('[role="region"]').attributes('aria-label')).toBe('Carrossel de filmes');
    expect(wrapper.findAll('.film-carousel__stage')).toHaveLength(1);
    expect(wrapper.find('.film-carousel__metadata').exists()).toBe(false);
    expect(wrapper.find('.film-carousel__category').exists()).toBe(false);
    expect(wrapper.find('.film-carousel__date').exists()).toBe(false);
    expect(wrapper.find('.film-carousel__title').exists()).toBe(false);
    expect(wrapper.get('.film-carousel__play').attributes('aria-label')).toBe('Assistir Salt Air');
  });

  it('provides circular controls labelled with their destinations and updates status', async () => {
    const wrapper = mountCarousel();
    const previous = wrapper.get('.film-carousel__control--previous');
    const next = wrapper.get('.film-carousel__control--next');

    expect(wrapper.get('.film-carousel__status').findAll('.film-carousel__control')).toHaveLength(2);
    expect(wrapper.get('.film-carousel__viewport').find('.film-carousel__control').exists()).toBe(false);
    expect(previous.attributes('aria-label')).toBe('Filme anterior: After Rain');
    expect(next.attributes('aria-label')).toBe('Próximo filme: Quiet Earth');
    expect(wrapper.get('.film-carousel__counter').text()).toBe('01 / 03');
    expect(wrapper.get('.film-carousel__progress').attributes('aria-label')).toBe('Posição do filme');

    await next.trigger('click');

    expect(wrapper.get('.film-carousel__play').attributes('aria-label')).toBe('Assistir Quiet Earth');
    expect(wrapper.get('.film-carousel__counter').text()).toBe('02 / 03');
    expect(wrapper.get('.film-carousel__progress').attributes('aria-valuenow')).toBe('2');

    await wrapper.get('.film-carousel__control--previous').trigger('click');
    expect(wrapper.get('.film-carousel__play').attributes('aria-label')).toBe('Assistir Salt Air');
  });

  it('navigates with ArrowLeft and ArrowRight while the carousel region is focused', async () => {
    const wrapper = mountCarousel();
    const region = wrapper.get('[role="region"]');

    expect(region.attributes('tabindex')).toBe('0');
    await region.trigger('keydown', { key: 'ArrowRight' });
    expect(wrapper.get('.film-carousel__play').attributes('aria-label')).toBe('Assistir Quiet Earth');

    await region.trigger('keydown', { key: 'ArrowLeft' });
    expect(wrapper.get('.film-carousel__play').attributes('aria-label')).toBe('Assistir Salt Air');
  });

  it('opens the active film in a modal and pauses it before the close button removes it', async () => {
    const wrapper = mountCarousel();
    await wrapper.get('.film-carousel__play').trigger('click');

    let dialogExistedWhenPaused = false;
    vi.mocked(HTMLMediaElement.prototype.pause).mockImplementation(() => {
      dialogExistedWhenPaused = Boolean(document.body.querySelector('[role="dialog"]'));
    });

    const dialog = document.body.querySelector<HTMLElement>('[role="dialog"]');
    const video = dialog?.querySelector<HTMLVideoElement>('video');
    const close = dialog?.querySelector<HTMLButtonElement>('.film-carousel__modal-close');

    expect(dialog?.getAttribute('aria-modal')).toBe('true');
    expect(video?.getAttribute('src')).toBe('/films/salt-air.mp4');
    expect(video?.getAttribute('poster')).toBe('/images/salt-air.jpg');
    expect(video?.hasAttribute('controls')).toBe(true);
    expect(video?.hasAttribute('playsinline')).toBe(true);
    expect(video?.getAttribute('preload')).toBe('metadata');
    expect(close?.getAttribute('aria-label')).toBe('Fechar filme');
    expect(dialog?.getAttribute('aria-label')).toBe('Assistir Salt Air');
    expect(dialog?.hasAttribute('aria-labelledby')).toBe(false);
    expect(dialog?.querySelector('.film-carousel__modal-title')).toBeNull();

    close?.click();
    await wrapper.vm.$nextTick();

    expect(HTMLMediaElement.prototype.pause).toHaveBeenCalledOnce();
    expect(dialogExistedWhenPaused).toBe(true);
    expect(document.body.querySelector('[role="dialog"]')).toBeNull();
  });

  it('closes the modal with Escape', async () => {
    const wrapper = mountCarousel();
    await wrapper.get('.film-carousel__play').trigger('click');

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await wrapper.vm.$nextTick();

    expect(HTMLMediaElement.prototype.pause).toHaveBeenCalledOnce();
    expect(document.body.querySelector('[role="dialog"]')).toBeNull();
  });

  it('renders no stage and is not focusable for an empty list', () => {
    const wrapper = mountCarousel([]);

    expect(wrapper.find('.film-carousel__stage').exists()).toBe(false);
    expect(wrapper.attributes('tabindex')).toBeUndefined();
  });

  it('hides previous and next controls for a single film', () => {
    const wrapper = mountCarousel([videos[0]]);

    expect(wrapper.find('.film-carousel__stage').exists()).toBe(true);
    expect(wrapper.find('.film-carousel__control--previous').exists()).toBe(false);
    expect(wrapper.find('.film-carousel__control--next').exists()).toBe(false);
  });
});
