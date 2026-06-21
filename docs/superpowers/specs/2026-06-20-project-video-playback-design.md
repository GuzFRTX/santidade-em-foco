# Reprodução dos vídeos de projetos

## Problema

Os três projetos usam arquivos AVI no elemento HTML `<video>`. Navegadores modernos não oferecem suporte confiável ao contêiner e aos codecs AVI, então o modal abre mas a reprodução falha.

## Design aprovado

Baixar uma distribuição portátil do FFmpeg para uso temporário e inspecionar os arquivos de origem. Converter cada AVI para MP4 com vídeo H.264, pixel format `yuv420p`, áudio AAC e metadado `faststart`. Atualizar `src/data/videos.ts` para apontar aos MP4 codificados por URL e remover os AVI substituídos depois que as três conversões forem validadas.

Na capa do carrossel, remover categoria, data e título visíveis. Manter botão play, título no modal e rótulos acessíveis que identificam cada vídeo.

## Falhas e segurança

Conversão será feita um arquivo por vez. Cada saída deverá existir, ter tamanho maior que zero e passar pela inspeção do FFmpeg antes que seu AVI correspondente seja removido. Se uma conversão falhar, preservar a origem e interromper o processo.

## Verificação

Adicionar testes regressivos que rejeitam fontes AVI, exigem fontes MP4 existentes e garantem ausência de metadata visível na capa. Rodar testes focados, suíte completa, typecheck e build. Em navegador real, abrir cada item, iniciar reprodução e confirmar avanço de `currentTime`; também verificar capa sem textos em desktop e mobile.
