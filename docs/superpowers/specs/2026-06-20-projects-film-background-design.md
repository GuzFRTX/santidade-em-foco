# Fundo contínuo na seção de filmes

## Problema

A seção de filmes da página de projetos define `background: var(--bg)` e um gradiente radial próprio. Essas camadas cobrem o fundo global contínuo renderizado pelo `body` e criam uma mudança visual entre seções.

## Design aprovado

Remover somente `background` e `background-image` de `.film-section`. A seção continuará full bleed e manterá espaçamento, tipografia, cor, carrossel e responsividade atuais, mas ficará transparente para revelar o mesmo fundo global usado pelo restante da página.

## Verificação

Adicionar regressão automatizada que exige ausência de pintura de fundo em `.film-section`. Rodar o teste focado, suíte completa e build. Fazer inspeção visual da página de projetos em desktop e mobile, confirmando ausência de corte no fundo.
