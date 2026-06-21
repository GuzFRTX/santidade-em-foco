import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import VideoText from '~/components/ui/video-text/VideoText.vue';

const getMaskId = (wrapper: ReturnType<typeof mount>) => {
  const maskId = wrapper.find('mask').attributes('id');

  expect(maskId).toBeTruthy();

  return maskId;
};

describe('VideoText', () => {
  it('renders masked text with a video source', () => {
    const wrapper = mount(VideoText, {
      props: {
        src: '/videos/hero/lhermefilms.mp4'
      },
      slots: {
        default: 'lhermefilms'
      }
    });

    expect(wrapper.text()).toContain('lhermefilms');
    const video = wrapper.find('video');
    const source = wrapper.find('source');

    expect(video.attributes('autoplay')).toBeDefined();
    expect(video.attributes('muted')).toBeDefined();
    expect(video.attributes('loop')).toBeDefined();
    expect(source.attributes('src')).toBe('/videos/hero/lhermefilms.mp4');
    const maskId = getMaskId(wrapper);

    expect(wrapper.find('mask text').text()).toBe('lhermefilms');
    expect(wrapper.find('foreignObject').attributes('mask')).toBe(`url(#${maskId})`);
    expect(wrapper.find('foreignObject video').exists()).toBe(true);
  });

  it('keeps mask ids stable across independent mounts', () => {
    const first = mount(VideoText, {
      props: {
        src: '/videos/hero/lhermefilms.mp4'
      },
      slots: {
        default: 'lhermefilms'
      }
    });
    const second = mount(VideoText, {
      props: {
        src: '/videos/hero/lhermefilms.mp4'
      },
      slots: {
        default: 'lhermefilms'
      }
    });

    expect(getMaskId(second)).toBe(getMaskId(first));
  });

  it('links each foreignObject to its own mask when multiple instances are mounted together', () => {
    const wrapper = mount({
      components: { VideoText },
      template: `
        <div>
          <VideoText src="/videos/hero/lhermefilms.mp4">lhermefilms</VideoText>
          <VideoText src="/videos/hero/weddings.mp4">weddings</VideoText>
        </div>
      `
    });

    const masks = wrapper.findAll('mask');
    const foreignObjects = wrapper.findAll('foreignObject');
    const maskIds = masks.map((mask) => mask.attributes('id'));

    expect(maskIds).toHaveLength(2);
    expect(new Set(maskIds).size).toBe(2);
    expect(foreignObjects.map((foreignObject) => foreignObject.attributes('mask'))).toEqual(
      maskIds.map((maskId) => `url(#${maskId})`)
    );
  });
});
