# Experiência minimalista dos vídeos de projetos

## Mídias

O carrossel usará exclusivamente os quatro MP4 novos colocados em `public/videos/Projetos`: Catarina, Allan e Juliane, casamento de 11-10-25 e João e Fê. O Allan novo substituirá a versão antiga menor e receberá nome canônico sem espaço antes da extensão.

Todos os arquivos já foram inspecionados: contêiner MP4, vídeo H.264 em `yuv420p`, áudio AAC e resolução 3840×2160. A implementação ainda confirmará reprodução real em navegador.

## Posters consistentes

Cada capa será gerada diretamente de seu próprio vídeo com FFmpeg, usando um frame em 20% da duração para evitar aberturas pretas. Os quatro posters ficarão em uma pasta dedicada e `src/data/videos.ts` apontará cada projeto ao poster correspondente.

## Interface

A capa mostrará somente poster real e botão play centralizado. Não terá título, categoria, data, gradiente textual ou outra informação escrita.

O modal mostrará somente vídeo com controles nativos e botão fechar por ícone. O título visível será removido. Nomes continuarão em `aria-label` para navegação acessível sem adicionar texto visual.

Contador, barra de progresso e setas abaixo da capa permanecem. Cabeçalho da seção também permanece porque não faz parte da capa ou do modal.

## Verificação

Testes devem exigir quatro vídeos MP4 existentes, quatro posters existentes e ausência de texto customizado em capa e modal. FFprobe validará codecs e imagens; Edge reproduzirá os quatro arquivos com `video.error === null`, `readyState >= 2` e avanço de `currentTime`. QA visual será feito em desktop e mobile.
