# Home cinematografica - design spec

## Objetivo

Direcionar a home do portfolio `lhermefilms` para uma experiencia cinematografica, editorial e premium. A pagina deve parecer uma narrativa visual, nao uma landing page comum.

## Resultado esperado

Ao entrar na home, a marca `lhermefilms` aparece como elemento principal da tela, em texto gigante preenchido por video. No scroll, o usuario atravessa pre-vias dos projetos em movimento horizontal, depois uma linha do tempo do fotografo tambem em leitura horizontal, e termina em um frame final cinematografico com chamada para projetos.

## Sequencia da Home

### 1. Hero Video Text

- Texto principal: `lhermefilms`.
- O texto ocupa a maior parte da primeira dobra.
- O video deve preencher o interior das letras, seguindo o comportamento visual do Video Text da Inspira UI.
- A tela deve ter pouco texto auxiliar. Se houver, deve ser curto e funcional.
- O fundo deve permanecer escuro/neutro, mantendo a marca como foco.
- O scroll inicial deve sugerir continuidade, sem transformar o hero em landing page explicativa.

### 2. Projetos em movimento horizontal

- Apos o hero, pre-vias dos projetos realizados aparecem em scroll horizontal.
- Os blocos devem entrar alternando lados: alguns pela esquerda, outros pela direita.
- Cada pre-via deve usar conteudo real de `src/data/projects.ts`.
- Cada bloco deve mostrar, no minimo:
  - imagem/capa do projeto;
  - titulo;
  - categoria;
  - chamada curta para ver mais.
- O movimento deve ser cinematografico e fluido, mas nao pode impedir leitura ou clique.
- A secao deve funcionar como ponte para `/projetos`.

### 3. Manifesto curto de respiro

- Entre projetos e timeline, incluir uma frase curta de manifesto visual.
- Funcao: desacelerar a pagina antes da linha do tempo.
- Texto deve ser autoral e concreto, sem linguagem generica.
- Exemplo de intencao: fotografia e video como ritmo, detalhe e presenca.

### 4. Timeline horizontal

- Timeline mostra marcos da trajetoria do fotografo.
- Conteudo vem de `src/data/timeline.ts`.
- Movimento principal: direita para esquerda.
- A leitura deve lembrar uma tira editorial ou sequencia de frames.
- Poucos marcos, bastante espaco, texto curto.
- Em mobile, a timeline deve virar leitura vertical ou swipe simples, sem overflow quebrado.

### 5. Frame final cinematografico

- Encerramento da home em uma imagem ou video grande.
- Deve parecer ultimo frame de um filme.
- CTA principal: `Ver projetos`.
- CTA secundario discreto: `Entrar em contato`.
- Final deve reforcar a sensacao premium, sem formulario completo na home.

## Arquitetura de componentes

Componentes principais sugeridos:

- `HeroVideoTextSection`: hero com `lhermefilms` e video dentro do texto.
- `HorizontalProjectsPreviewSection`: scroll horizontal dos projetos.
- `VisualManifestoSection`: frase curta de respiro.
- `HorizontalTimelineSection`: timeline direita para esquerda.
- `FinalFrameCTASection`: frame final com CTA para projetos e contato.

Componentes auxiliares:

- `ProjectPreviewCard`: card/bloco visual para cada projeto.
- `TimelineFrame`: item individual da timeline.
- `VideoText`: componente base inspirado no asset da Inspira UI.

## Dados

Usar dados existentes:

- Projetos: `src/data/projects.ts`.
- Timeline: `src/data/timeline.ts`.
- Videos/imagens: `public/images` e `public/videos`.

Se algum asset de video estiver ausente, o componente deve ter fallback visual com imagem/capa real do projeto.

## Movimento

Usar:

- Lenis para scroll fluido global.
- GSAP e ScrollTrigger para sequencias horizontais e entrada dos blocos.

Regras:

- Animar `transform` e `opacity`, evitando animar `width`, `height`, `top` ou `left`.
- Respeitar `prefers-reduced-motion`.
- Manter cleanup das animacoes em componentes Vue.
- Nao bloquear navegacao por teclado ou cliques durante scroll.

## Direcao visual

- Premium.
- Editorial.
- Escuro/neutro.
- Fotos e videos grandes.
- Pouco texto.
- Ritmo cinematografico.
- Tipografia com contraste entre marca grande e textos curtos.

A home deve se afastar de padrao de portfolio em grade comum. A primeira impressao deve ser marca + movimento + atmosfera.

## Responsividade

- Desktop: experiencia horizontal ampla e cinematografica.
- Tablet: manter scroll horizontal quando seguro, com cards maiores e menos simultaneos.
- Mobile: priorizar legibilidade e controle; converter sequencias horizontais para stack, swipe ou scroll vertical guiado.
- Evitar overflow lateral acidental.

## Acessibilidade e performance

- Imagens com `alt` real.
- Videos com fallback/poster.
- CTAs com texto claro.
- Contraste suficiente no fundo escuro.
- Lazy load para midia fora da primeira dobra.
- Assets pesados devem ter poster e compressao adequada.
- A pagina precisa funcionar sem animacao para usuarios com reducao de movimento.

## Fora de escopo desta fase

- Recriar a pagina `/projetos` inteira.
- Criar `/projetos/[slug]`.
- Refazer identidade completa.
- Adicionar formulario completo na home.

## Criterios de aceite

- Primeira dobra mostra `lhermefilms` gigante com video dentro do texto.
- Scroll revela projetos horizontalmente com conteudo real.
- Timeline aparece em leitura horizontal da direita para esquerda.
- Home termina com frame final cinematografico e CTA para projetos.
- Mobile nao tem overflow lateral quebrado.
- `prefers-reduced-motion` tem experiencia funcional.
- Build e testes existentes continuam passando apos implementacao.
