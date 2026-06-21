import { defineNuxtConfig } from 'nuxt/config';
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2025-01-15',
  srcDir: 'src',
  dir: {
    public: '../public'
  },
  css: ['~/styles/globals.css', '~/styles/animations.css', '~/styles/lenis.css'],
  components: [
    {
      path: '~/components',
      pathPrefix: true,
      extensions: ['vue']
    }
  ],
  app: {
    head: {
      htmlAttrs: { lang: 'pt-BR' },
      titleTemplate: '%s - Guilherme Ribeiro',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Portfolio fotografico de Guilherme Ribeiro com projetos, coberturas, videos e contato.'
        }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600&display=swap'
        }
      ]
    }
  },
  typescript: {
    strict: true,
    typeCheck: true
  },
  experimental: {
    appManifest: false
  },
  sourcemap: false,
  vite: {
    plugins: [tailwindcss()]
  }
});
