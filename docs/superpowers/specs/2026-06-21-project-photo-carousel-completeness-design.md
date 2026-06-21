# Carrossel completo de fotografias

## Objetivo

Fazer o carrossel de fotografias da página de projetos começar visualmente na primeira imagem, manter seu conteúdo alinhado à margem da página e exibir todas as 33 fotografias existentes diretamente em `public/images/Projetos`.

O arquivo `crisma-sao-rafael-poster.png` e as imagens da subpasta `video-posters` permanecem fora do carrossel por serem materiais dos vídeos.

## Conteúdo e ordem

- Manter os dois projetos fotográficos atuais e suas legendas.
- Incluir em cada projeto todas as fotografias correspondentes ao seu prefixo de arquivo.
- Ordenar numericamente as fotografias dentro de cada projeto.
- Preservar a ordem atual dos projetos.
- A primeira imagem exibida será `SANTIDADEEMFOCO-076.avif`, primeira foto do primeiro projeto.

## Comportamento do carrossel

- Iniciar explicitamente com deslocamento horizontal zero.
- Alinhar a primeira imagem e cada ponto de parada ao início da área de conteúdo.
- Usar rolagem suave em botões, arraste e trackpad, com snap horizontal para estabilizar cada parada.
- Evitar animação elástica ou movimento automático.
- Desativar suavização quando `prefers-reduced-motion: reduce` estiver ativo.
- Preservar controles, legendas, numeração e comportamento responsivo atuais.

## Estrutura

`src/data/projects.ts` continuará sendo a fonte de dados do componente. O componente `ProjectsPhotoCarousel.vue` continuará achatando as fotos dos projetos na ordem recebida, mas passará a controlar o alinhamento inicial e a suavização do trilho.

Nenhuma leitura dinâmica da pasta será adicionada: a lista explícita mantém ordem editorial, tipagem e comportamento previsível no build.

## Verificação

- Teste de dados confirma 33 fotografias, ordem inicial correta e ausência do pôster.
- Teste do componente confirma alinhamento inicial, snap no começo e respeito a movimento reduzido.
- Testes existentes, typecheck e build devem permanecer verdes.
- Verificação visual em desktop e mobile confirma primeira foto sem corte inicial e navegação suave.
