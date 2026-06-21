# Photography Portfolio Website

Portfolio fotografico de Guilherme Ribeiro reconstruido em Nuxt 3, Vue 3 e TypeScript.

## Scripts

```bash
npm install
npm run dev
npm test
npm run build
```

## Estrutura

- `src/pages`: rotas Nuxt (`/`, `/projetos`, `/contato`)
- `src/layouts`: casca global com header, footer e textura visual
- `src/components`: layout, secoes, galeria, animacao e UI
- `src/data`: conteudo real do portfolio
- `src/composables`: filtros, lightbox, Lenis, GSAP e formulario
- `src/styles`: CSS global, animacoes e Lenis
- `public/images` e `public/videos`: midia servida por URL publica

## Identidade

A reconstrucao preserva paleta e fonte do projeto anterior:

- Fundo: `#0c0b09`
- Texto: `#978f86`
- Acento: `#b8aa96`
- Branco: `#fdfaf6`
- Fontes: `Bodoni Moda` e `Manrope`

## Nota de midia

As imagens e videos originais nao estavam no workspace local. Os caminhos foram mantidos em `src/data` apontando para `/images/...` e `/videos/...`; coloque os arquivos correspondentes em `public/images` e `public/videos`.
