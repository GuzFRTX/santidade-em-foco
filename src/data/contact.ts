import { site } from './site';

export const contactOptions = [
  {
    label: 'E-mail',
    value: site.email,
    href: `mailto:${site.email}`
  },
  {
    label: 'Instagram',
    value: site.instagramLabel,
    href: site.instagram
  },
  {
    label: 'YouTube',
    value: site.youtubeLabel,
    href: site.youtube
  },
  {
    label: 'WhatsApp',
    value: site.whatsappLabel,
    href: site.whatsapp
  }
];
