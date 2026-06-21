# Project Video Playback Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Tornar os três vídeos de projetos reproduzíveis em navegadores e remover textos visíveis somente das capas.

**Architecture:** Inspecionar mídias AVI locais e remuxar os streams H.264/AAC existentes para MP4 com FFmpeg portátil, sem recompressão. Validar cada saída antes de excluir sua origem e atualizar a camada de dados; simplificar a capa sem alterar modal, navegação ou rótulos acessíveis.

**Tech Stack:** Nuxt 3, Vue 3, Vitest, FFmpeg, Playwright/Chromium

---

### Task 1: Criar regressões para formato e capa limpa

**Files:**
- Modify: `tests/projectsFilmCarousel.test.ts`
- Modify: `tests/publicAssets.test.ts`

- [ ] **Step 1: Atualizar teste da capa para rejeitar metadata visível**

No primeiro teste de `tests/projectsFilmCarousel.test.ts`, preservar validação do estágio e substituir expectativas de categoria, data e título por:

```ts
expect(wrapper.find('.film-carousel__metadata').exists()).toBe(false);
expect(wrapper.find('.film-carousel__category').exists()).toBe(false);
expect(wrapper.find('.film-carousel__date').exists()).toBe(false);
expect(wrapper.find('.film-carousel__title').exists()).toBe(false);
expect(wrapper.get('.film-carousel__play').attributes('aria-label')).toBe('Assistir Salt Air');
```

Nos testes de navegação, substituir leituras de `.film-carousel__title` pelo rótulo do botão play:

```ts
expect(wrapper.get('.film-carousel__play').attributes('aria-label')).toBe('Assistir Quiet Earth');
```

e, ao voltar:

```ts
expect(wrapper.get('.film-carousel__play').attributes('aria-label')).toBe('Assistir Salt Air');
```

- [ ] **Step 2: Exigir MP4 local e proibir AVI nos dados públicos**

Adicionar em `tests/publicAssets.test.ts`:

```ts
it('uses browser-compatible MP4 sources for project videos', () => {
  const videoSource = readFileSync(join(process.cwd(), 'src/data/videos.ts'), 'utf8');
  const sources = [...videoSource.matchAll(/src:\s*'([^']+)'/g)].map((match) => match[1]);

  expect(sources).toHaveLength(3);
  expect(sources.every((source) => source.endsWith('.mp4'))).toBe(true);
  expect(sources.some((source) => source.endsWith('.avi'))).toBe(false);

  for (const source of sources) {
    expect(existsSync(join(process.cwd(), 'public', decodeURIComponent(source)))).toBe(true);
  }
});
```

- [ ] **Step 3: Rodar testes e confirmar RED**

Run: `npm test -- tests/projectsFilmCarousel.test.ts tests/publicAssets.test.ts`

Expected: FAIL porque metadata ainda aparece e fontes ainda terminam em `.avi`.

### Task 2: Baixar FFmpeg portátil e converter mídias com segurança

**Files:**
- Create: `public/videos/Projetos/1 ANO CATARINA 24-11-25.mp4`
- Create: `public/videos/Projetos/CASAMENTO  ALLAN & JULIANE 25-1025.mp4`
- Create: `public/videos/Projetos/CASAMENTO JOÃO E FE.mp4`
- Delete after validation: `public/videos/Projetos/1 ANO CATARINA 24-11-25.avi`
- Delete after validation: `public/videos/Projetos/CASAMENTO  ALLAN & JULIANE 25-1025.avi`
- Delete after validation: `public/videos/Projetos/CASAMENTO JOÃO E FE.avi`

- [ ] **Step 1: Baixar e extrair build portátil fora do repositório**

Run in PowerShell:

```powershell
$archive = Join-Path $env:TEMP 'ffmpeg-release-essentials.zip'
$ffmpegRoot = Join-Path $env:TEMP 'codex-ffmpeg-project-videos'
Invoke-WebRequest -Uri 'https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-essentials.zip' -OutFile $archive
if ((Get-Item -LiteralPath $archive).Length -le 0) { throw 'FFmpeg archive is empty' }
Remove-Item -LiteralPath $ffmpegRoot -Recurse -Force -ErrorAction SilentlyContinue
Expand-Archive -LiteralPath $archive -DestinationPath $ffmpegRoot -Force
$ffmpeg = (Get-ChildItem -LiteralPath $ffmpegRoot -Filter 'ffmpeg.exe' -Recurse | Select-Object -First 1).FullName
$ffprobe = (Get-ChildItem -LiteralPath $ffmpegRoot -Filter 'ffprobe.exe' -Recurse | Select-Object -First 1).FullName
if (-not $ffmpeg -or -not $ffprobe) { throw 'FFmpeg executables not found' }
& $ffmpeg -version
```

Expected: versão FFmpeg impressa; nenhum arquivo de ferramenta criado no repositório.

- [ ] **Step 2: Inspecionar três origens antes da conversão**

```powershell
Get-ChildItem -LiteralPath 'public/videos/Projetos' -Filter '*.avi' | ForEach-Object {
  & $ffprobe -v error -show_entries 'format=filename,duration:stream=codec_type,codec_name,width,height' -of json $_.FullName
  if ($LASTEXITCODE -ne 0) { throw "ffprobe failed for $($_.FullName)" }
}
```

Expected: três documentos JSON válidos, cada um com stream de vídeo.

- [ ] **Step 3: Remuxar cada origem H.264/AAC para MP4 sem perda**

```powershell
& $ffmpeg -y -i 'public/videos/Projetos/1 ANO CATARINA 24-11-25.avi' -map '0:v:0' -map '0:a?' -c copy -movflags +faststart 'public/videos/Projetos/1 ANO CATARINA 24-11-25.mp4'
if ($LASTEXITCODE -ne 0) { throw 'Catarina conversion failed' }

& $ffmpeg -y -i 'public/videos/Projetos/CASAMENTO  ALLAN & JULIANE 25-1025.avi' -map '0:v:0' -map '0:a?' -c copy -movflags +faststart 'public/videos/Projetos/CASAMENTO  ALLAN & JULIANE 25-1025.mp4'
if ($LASTEXITCODE -ne 0) { throw 'Allan and Juliane conversion failed' }

& $ffmpeg -y -i 'public/videos/Projetos/CASAMENTO JOÃO E FE.avi' -map '0:v:0' -map '0:a?' -c copy -movflags +faststart 'public/videos/Projetos/CASAMENTO JOÃO E FE.mp4'
if ($LASTEXITCODE -ne 0) { throw 'Joao and Fe conversion failed' }
```

Expected: três comandos terminam com exit code `0`.

- [ ] **Step 4: Validar todas as saídas antes de apagar origens**

```powershell
$outputs = @(
  'public/videos/Projetos/1 ANO CATARINA 24-11-25.mp4',
  'public/videos/Projetos/CASAMENTO  ALLAN & JULIANE 25-1025.mp4',
  'public/videos/Projetos/CASAMENTO JOÃO E FE.mp4'
)

foreach ($output in $outputs) {
  if (-not (Test-Path -LiteralPath $output)) { throw "Missing output: $output" }
  if ((Get-Item -LiteralPath $output).Length -le 0) { throw "Empty output: $output" }
  $probe = & $ffprobe -v error -select_streams v:0 -show_entries 'stream=codec_name,pix_fmt' -of 'default=noprint_wrappers=1' $output
  if ($LASTEXITCODE -ne 0 -or $probe -notmatch 'codec_name=h264' -or $probe -notmatch 'pix_fmt=yuv420p') {
    throw "Invalid browser video stream: $output"
  }
}
```

Expected: três saídas existentes com `codec_name=h264` e `pix_fmt=yuv420p`.

- [ ] **Step 5: Remover AVI somente após validação total**

```powershell
Remove-Item -LiteralPath @(
  'public/videos/Projetos/1 ANO CATARINA 24-11-25.avi',
  'public/videos/Projetos/CASAMENTO  ALLAN & JULIANE 25-1025.avi',
  'public/videos/Projetos/CASAMENTO JOÃO E FE.avi'
)
```

Expected: nenhum `.avi` restante em `public/videos/Projetos`.

### Task 3: Atualizar dados e remover textos da capa

**Files:**
- Modify: `src/data/videos.ts`
- Modify: `src/components/sections/projects/ProjectsFilmSection/ProjectsFilmCarousel.vue`

- [ ] **Step 1: Trocar URLs AVI por MP4**

Usar exatamente:

```ts
src: '/videos/Projetos/1%20ANO%20CATARINA%2024-11-25.mp4',
src: '/videos/Projetos/CASAMENTO%20%20ALLAN%20%26%20JULIANE%2025-1025.mp4',
src: '/videos/Projetos/CASAMENTO%20JO%C3%83O%20E%20FE.mp4',
```

- [ ] **Step 2: Remover metadata visível da capa**

Substituir conteúdo de `.film-carousel__overlay` por:

```vue
<div class="film-carousel__overlay">
  <button
    class="film-carousel__play"
    type="button"
    :aria-label="`Assistir ${activeVideo.title}`"
    @click="openModal"
  >
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 5.5 18 12 8 18.5Z" fill="currentColor" />
    </svg>
  </button>
</div>
```

Em `.film-carousel__overlay`, trocar `justify-content: space-between` por `justify-content: flex-end`. Remover regras exclusivas de `.film-carousel__metadata`, `.film-carousel__eyebrow`, `.film-carousel__category`, `.film-carousel__date` e `.film-carousel__title`. Preservar `.film-carousel__modal-title`.

- [ ] **Step 3: Rodar testes focados e confirmar GREEN**

Run: `npm test -- tests/projectsFilmCarousel.test.ts tests/publicAssets.test.ts`

Expected: PASS.

### Task 4: Verificação completa e navegador real

**Files:**
- No production file changes expected

- [ ] **Step 1: Rodar validações do projeto**

Run: `npm test`

Expected: 15 arquivos e 45 testes passando.

Run: `npm run typecheck`

Expected: exit code `0`.

Run: `npm run build`

Expected: build concluído sem erro.

- [ ] **Step 2: Validar reprodução dos três vídeos no Chromium**

Iniciar `npm run dev -- --port 3003`, abrir `http://127.0.0.1:3003/projetos` com Playwright, navegar por todos os itens e, para cada um: abrir modal, clicar play, aguardar até 3 segundos e verificar `video.error === null`, `video.readyState >= 2` e `video.currentTime > 0`. Fechar modal antes de avançar ao próximo.

Expected: três vídeos avançam no tempo sem `MediaError`.

- [ ] **Step 3: Validar capa desktop e mobile**

Capturar página em `1440x900` e `390x844`. Confirmar ausência de título, categoria e data sobre as três capas; botão play e título do modal continuam visíveis.

- [ ] **Step 4: Commitar correção**

```bash
git add -- src/data/videos.ts src/components/sections/projects/ProjectsFilmSection/ProjectsFilmCarousel.vue tests/projectsFilmCarousel.test.ts tests/publicAssets.test.ts public/videos/Projetos
git commit -m "fix: make project videos browser compatible"
```
