# Projects Film Background Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fazer a seção de filmes compartilhar o fundo contínuo da página de projetos.

**Architecture:** Manter o fundo global como única fonte visual. A seção de filmes não pintará fundo próprio; seus componentes, layout e comportamento permanecem inalterados.

**Tech Stack:** Nuxt 3, Vue 3 SFC, CSS, Vitest

---

### Task 1: Regressão e correção do fundo

**Files:**
- Modify: `tests/projectsFilmSectionDesign.test.ts`
- Modify: `src/components/sections/projects/ProjectsFilmSection/ProjectsFilmSection.vue`

- [ ] **Step 1: Escrever teste regressivo que exige fundo transparente**

Substituir as expectativas de fundo do teste `keeps the section inside the project palette and typography` por:

```ts
expect(source).not.toContain('background: var(--bg)');
expect(source).not.toContain('background-image:');
expect(source).toContain('color: var(--text)');
expect(source).toContain('font-family: var(--font-display)');
expect(source).not.toContain('#3a3027');
expect(source).not.toContain('#efe7da');
```

- [ ] **Step 2: Rodar teste e confirmar RED**

Run: `npm test -- tests/projectsFilmSectionDesign.test.ts`

Expected: FAIL porque `ProjectsFilmSection.vue` ainda contém `background: var(--bg)` e `background-image:`.

- [ ] **Step 3: Implementar correção mínima**

Em `.film-section`, remover somente:

```css
background: var(--bg);
background-image: radial-gradient(
  circle at 50% 0%,
  rgba(var(--white-soft-rgb), 0.24),
  rgba(var(--white-soft-rgb), 0) 42%
);
```

Preservar largura full bleed, margens, cor e todo restante do estilo.

- [ ] **Step 4: Confirmar GREEN e ausência de regressões**

Run: `npm test -- tests/projectsFilmSectionDesign.test.ts`

Expected: PASS.

Run: `npm test`

Expected: suíte completa PASS.

Run: `npm run typecheck`

Expected: typecheck PASS.

Run: `npm run build`

Expected: build concluído sem erro.

- [ ] **Step 5: Fazer QA visual**

Abrir `/projetos` em viewport desktop de `1440x900` e mobile de `390x844`. Confirmar que não existe troca ou corte de fundo ao entrar e sair da seção de filmes e que layout do carrossel permanece intacto.

- [ ] **Step 6: Commitar somente arquivos do conserto**

```bash
git add -- tests/projectsFilmSectionDesign.test.ts src/components/sections/projects/ProjectsFilmSection/ProjectsFilmSection.vue
git commit -m "fix: unify projects film background"
```
