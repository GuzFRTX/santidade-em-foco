# Correção de overflow do título mobile em Projetos

## Objetivo

Eliminar o overflow horizontal de 25–26 px observado na rota `/projetos` em celulares de 360 px e 390 px, preservando integralmente o layout de tablets e desktops.

## Causa confirmada

Dentro do breakpoint `@media (max-width: 760px)`, o título “Fotografias selecionadas.” usa `font-size: clamp(38px, 14vw, 58px)`. Com a fonte `CC Fat`, a palavra “selecionadas” excede a caixa do título e aumenta a largura do documento.

## Solução aprovada

Alterar somente a escala tipográfica do título dentro do breakpoint mobile. A nova escala deve manter o título legível e expressivo, mas fazer a palavra mais longa caber em viewports a partir de 360 px. Nenhuma regra fora de `@media (max-width: 760px)` será modificada.

## Testes

- Adicionar regressão automatizada para exigir a escala mobile segura.
- Confirmar a falha antes da implementação e aprovação depois dela.
- Verificar no Chromium em 360×800 e 390×844 que `documentElement.scrollWidth === clientWidth` na rota `/projetos`.
- Revalidar tablets em 768×1024 e 820×1180 para confirmar ausência de alteração.
- Rodar suíte Vitest, typecheck e build.

## Fora de escopo

- Mudanças no carrossel de fotografias.
- Mudanças em outras rotas.
- Mudanças visuais para tablets ou desktops.
