# Minimal Project Videos Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Usar os quatro vídeos novos com posters correspondentes e remover todo texto visível de capa e modal.

**Architecture:** Normalizar o Allan novo no caminho canônico, gerar posters em 20% da duração com FFmpeg e atualizar dados para quatro itens. Capa terá poster + play; modal terá vídeo + fechar, mantendo nomes apenas em ARIA.

**Tech Stack:** Nuxt 3, Vue 3, Vitest, FFmpeg, Playwright/Edge

---

### Task 1: RED — quatro mídias e modal sem título

**Files:**
- Modify: `tests/publicAssets.test.ts`
- Modify: `tests/projectsFilmCarousel.test.ts`

- [ ] Exigir `videos` com tamanho 4, fontes MP4 e thumbnails em `/images/Projetos/video-posters/`.
- [ ] No teste do modal, exigir `aria-label="Assistir Salt Air"`, ausência de `aria-labelledby` e ausência de `.film-carousel__modal-title`.
- [ ] Rodar `npm test -- tests/publicAssets.test.ts tests/projectsFilmCarousel.test.ts`; esperar falha por lista com 3 itens e título existente.

### Task 2: Normalizar mídia e gerar posters

**Files:**
- Replace: `public/videos/Projetos/CASAMENTO  ALLAN & JULIANE 25-1025.mp4`
- Delete: `public/videos/Projetos/CASAMENTO  ALLAN & JULIANE 25-1025 .mp4`
- Create: `public/images/Projetos/video-posters/um-ano-catarina.jpg`
- Create: `public/images/Projetos/video-posters/casamento-allan-juliane.jpg`
- Create: `public/images/Projetos/video-posters/casamento-11-10-25.jpg`
- Create: `public/images/Projetos/video-posters/casamento-joao-fe.jpg`

- [ ] Confirmar que Allan novo mede `953607306` bytes e substituir arquivo canônico antigo.
- [ ] Obter duração de cada MP4 com ffprobe, calcular 20% e extrair um JPEG 1920px com `ffmpeg -ss <tempo> -i <vídeo> -frames:v 1 -vf scale=1920:-2 -q:v 2 <poster>`.
- [ ] Validar quatro posters JPEG não vazios com ffprobe.

### Task 3: GREEN — dados e interface minimalista

**Files:**
- Modify: `src/data/videos.ts`
- Modify: `src/components/sections/projects/ProjectsFilmSection/ProjectsFilmCarousel.vue`

- [ ] Atualizar quatro itens: Catarina, Allan e Juliane, Casamento 11-10-25 e João e Fê; usar posters dedicados.
- [ ] Centralizar play na capa e remover gradiente da overlay.
- [ ] Remover `<h2 class="film-carousel__modal-title">`; trocar `aria-labelledby` por `:aria-label="`Assistir ${activeVideo.title}`"`.
- [ ] Posicionar botão fechar no canto superior direito do modal sem depender do título.
- [ ] Rodar testes focados; esperar PASS.

### Task 4: Verificação

**Files:**
- No production changes expected

- [ ] Rodar `npm test`, `npm run typecheck` e `npm run build`; esperar exit code 0.
- [ ] No Edge, abrir quatro itens, executar play, aguardar 3s e exigir `error === null`, `readyState >= 2`, `currentTime > 0`.
- [ ] Verificar desktop/mobile: capas sem texto e poster correspondente; modal sem título visível.
- [ ] Commitar com `git commit -m "feat: minimize project video experience"`.
