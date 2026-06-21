# Home Hero Video Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the missing home hero MP4 with a browser-compatible, silent 1080p WebM between 40 MB and 60 MB.

**Architecture:** Keep the video as a static public asset and point the existing hero `<video>` directly to it. Encode a temporary single-pass VP9 output at a calculated average bitrate sized around 50 MiB, inspect it before replacing the 528.8 MB source, and protect the source reference with the existing Vitest asset tests. Single-pass encoding is required because the installed FFmpeg 8.1.1/libvpx build does not produce usable first-pass statistics on this source.

**Tech Stack:** Nuxt 3, Vue 3, Vitest, FFmpeg/FFprobe, Playwright CLI

---

## File map

- Modify `tests/homeCinematicData.test.ts`: require the new silent WebM path and reject the retired MP4 path.
- Modify `src/components/sections/home/HeroVideoTextSection/HeroVideoTextSection.vue`: point the hero at the optimized WebM.
- Replace `public/videos/Home/CASAMENTO-GABRIEL-_-BEATRIZ-13-06-26.webm`: store the optimized silent VP9 result under the approved public URL.
- Delete `public/videos/Home/CRISMA SAO RAFAEL 2026.mp4`: retain the user's existing removal.

### Task 1: Prepare and inspect the encoder

- [ ] **Step 1: Confirm whether FFmpeg and FFprobe are available**

Run:

```powershell
Get-Command ffmpeg.exe,ffprobe.exe -ErrorAction SilentlyContinue | Select-Object Name,Source
```

Expected: both commands resolve. If neither resolves, run the exact installation command below and open a fresh PowerShell process:

```powershell
winget install --id Gyan.FFmpeg.Essentials --exact --accept-package-agreements --accept-source-agreements
```

- [ ] **Step 2: Inspect the supplied source**

Run:

```powershell
ffprobe -v error -show_entries format=duration,size -show_entries stream=index,codec_name,codec_type,width,height -of json "public/videos/Home/CASAMENTO-GABRIEL-_-BEATRIZ-13-06-26.webm"
```

Expected: valid JSON containing at least one video stream; record duration, resolution, codecs, and whether an audio stream exists.

### Task 2: Encode a silent 1080p WebM

- [ ] **Step 1: Calculate the target video bitrate for approximately 50 MiB**

Run:

```powershell
$input = 'public/videos/Home/CASAMENTO-GABRIEL-_-BEATRIZ-13-06-26.webm'
$duration = [double](ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 $input)
$bitrateKbps = [math]::Floor((50 * 8192 * 0.98) / $duration)
$bitrateKbps
```

Expected: a positive bitrate in kilobits per second.

- [ ] **Step 2: Encode VP9 without audio to a temporary file**

Run:

```powershell
$output = 'public/videos/Home/CASAMENTO-GABRIEL-_-BEATRIZ-13-06-26.optimized.webm'
ffmpeg -y -threads 16 -i $input -an -vf "scale=-2:1080:force_original_aspect_ratio=decrease" -c:v libvpx-vp9 -b:v "${bitrateKbps}k" -deadline good -cpu-used 2 -row-mt 1 -threads 16 $output
```

Expected: exit code 0 and a playable temporary WebM. The explicit input threads avoid abnormally slow VP9 decoding observed with this source.

- [ ] **Step 3: Verify technical constraints before replacing the source**

Run:

```powershell
ffprobe -v error -show_entries format=duration,size -show_entries stream=index,codec_name,codec_type,width,height -of json $output
[math]::Round((Get-Item $output).Length / 1MB, 1)
```

Expected: VP9 video, no audio stream, height no greater than 1080, and size from 40 MB through 60 MB.

- [ ] **Step 4: Replace the oversized source**

Run:

```powershell
Move-Item -LiteralPath $output -Destination $input -Force
```

Expected: the canonical WebM path now contains the verified optimized output and no temporary output remains.

### Task 3: Protect the new hero source with a failing test

- [ ] **Step 1: Update the existing assertion first**

In `tests/homeCinematicData.test.ts`, change the hero assertions to:

```ts
expect(hero).toContain('src="/videos/Home/CASAMENTO-GABRIEL-_-BEATRIZ-13-06-26.webm"');
expect(hero).not.toContain('CRISMA%20SAO%20RAFAEL%202026.mp4');
expect(hero).toContain('muted');
```

- [ ] **Step 2: Run the focused test and verify RED**

Run:

```powershell
npm.cmd test -- tests/homeCinematicData.test.ts
```

Expected: FAIL because the component still references `CRISMA SAO RAFAEL 2026.mp4`.

### Task 4: Switch the home to the optimized file

- [ ] **Step 1: Make the minimal source change**

In `src/components/sections/home/HeroVideoTextSection/HeroVideoTextSection.vue`, use:

```vue
src="/videos/Home/CASAMENTO-GABRIEL-_-BEATRIZ-13-06-26.webm"
```

Keep `autoplay`, `muted`, `loop`, `playsinline`, and all existing hero styles unchanged.

- [ ] **Step 2: Run the focused test and verify GREEN**

Run:

```powershell
npm.cmd test -- tests/homeCinematicData.test.ts
```

Expected: PASS.

- [ ] **Step 3: Run public asset tests**

Run:

```powershell
npm.cmd test -- tests/publicAssets.test.ts
```

Expected: PASS, proving the direct hero source resolves to a public file.

### Task 5: Verify the complete home experience

- [ ] **Step 1: Run the complete automated suite**

Run:

```powershell
npm.cmd test
npm.cmd run typecheck
npm.cmd run build
```

Expected: all tests pass and both typecheck and build exit with code 0.

- [ ] **Step 2: Start the production preview**

Run:

```powershell
Start-Process -FilePath 'npm.cmd' -ArgumentList 'run','preview','--','--port','4173' -WorkingDirectory (Get-Location) -WindowStyle Hidden
```

Expected: the home responds at `http://127.0.0.1:4173/`.

- [ ] **Step 3: Verify desktop and mobile in a real browser**

Using Playwright CLI, open the home at 1440x900 and 390x844. For each viewport, confirm the hero video has `readyState >= 2`, `paused === false`, `muted === true`, `loop === true`, `videoWidth > 0`, and no failed request for `/videos/Home/`.

Expected: the optimized film renders as the hero background and autoplays silently in both viewports without console or network errors.

- [ ] **Step 4: Review the final working tree**

Run:

```powershell
git status --short
git diff --check
git diff -- src/components/sections/home/HeroVideoTextSection/HeroVideoTextSection.vue tests/homeCinematicData.test.ts
```

Expected: only the intended source/test/video changes plus the user's unrelated pre-existing files; no whitespace errors.
