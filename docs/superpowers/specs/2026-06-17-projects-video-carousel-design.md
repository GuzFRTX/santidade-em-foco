# Carrossel de vídeos da página Projetos

## Objetivo

Reunir todos os filmes da página Projetos em uma única seção, evitando vídeos dispersos. A seção deve parecer parte natural do portfólio: minimalista, cinematográfica e fiel à paleta quente já usada no projeto.

## Direção visual aprovada

- Manter fundo e superfícies baseados nos tokens existentes: `--bg`, `--surface`, `--text`, `--muted`, `--border` e `--shadow`.
- Usar `CC Fat` (`--font-display`) no título da seção e no nome do filme.
- Usar fonte corporal existente (`--font-body`) em rótulos, contador e metadados.
- Exibir um único vídeo por vez em frame 16:9 dominante.
- Aplicar moldura arredondada de 24 px e sombra suave compatível com `--shadow`.
- Usar botão central de reprodução circular e setas circulares para navegação.
- Mostrar título, categoria e ano dentro da área inferior do frame, sobre gradiente discreto.
- Mostrar contador `01 / 03`, indicador de progresso e total de filmes sem ornamentação adicional.
- Evitar bloco escuro desconectado, contraste excessivo ou cores novas. A seção deve continuar visualmente o fundo areia da página.

## Estrutura

`ProjectsFilmSection.vue` continua sendo a única seção de filmes em `projetos.vue` e recebe `VideoProject[]` por propriedade.

A seção terá:

1. Cabeçalho com marcador `02 — Filmes`, título e contador.
2. Palco com apenas o vídeo ativo.
3. Metadados do vídeo ativo sobre o frame.
4. Controles anterior/próximo e progresso.
5. Reprodução no modal já existente, preservando pausa ao fechar e fechamento por `Escape`.

## Comportamento do carrossel

- Índice inicial: primeiro vídeo.
- Próximo no último item volta ao primeiro; anterior no primeiro volta ao último.
- Setas esquerda/direita do teclado navegam quando o modal não está aberto.
- Gestos horizontais no celular trocam o item quando o deslocamento ultrapassa limite seguro.
- Troca visual usa fade curto com leve deslocamento horizontal.
- Com `prefers-reduced-motion`, troca ocorre sem animação perceptível.
- Ao trocar item, qualquer reprodução anterior deve permanecer parada; vídeo só toca dentro do modal após ação explícita.
- Lista vazia não renderiza palco nem controles quebrados.
- Lista com um item oculta navegação e progresso interativo.

## Acessibilidade

- Região recebe nome por `aria-labelledby`.
- Botões usam `aria-label` com ação e título do destino.
- Estado atual é anunciado por texto de contador acessível.
- Foco visível segue cores do projeto.
- Modal mantém `role="dialog"`, `aria-modal="true"`, fechamento por botão e `Escape`.
- Imagem de capa mantém texto alternativo definido em `VideoProject`.

## Responsividade

- Desktop: cabeçalho amplo, frame 16:9 e controles alinhados à direita.
- Mobile: título reduzido, frame preservado, metadados com quebra segura e controles grandes o bastante para toque.
- Nenhum conteúdo causa rolagem horizontal na página.

## Testes e validação

- Teste de componente para renderização de apenas um vídeo por vez.
- Testes de navegação anterior/próximo, incluindo retorno circular.
- Teste de contador e metadados após troca.
- Testes para zero e um vídeo.
- Teste de fechamento do modal e pausa do vídeo.
- Teste de navegação por teclado e comportamento com movimento reduzido.
- Execução da suíte Vitest, typecheck e build.
- Verificação visual desktop e mobile para paleta, fonte, bordas, foco, overflow e transições.

## Fora de escopo

- Alterar arquivos dos vídeos ou seus metadados.
- Criar autoplay com áudio.
- Adicionar biblioteca externa de carrossel.
- Redesenhar galeria de fotografias ou outras seções da página Projetos.
