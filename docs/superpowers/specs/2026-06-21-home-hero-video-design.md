# Otimização do vídeo principal da home

## Objetivo

Substituir o vídeo antigo da abertura da home pelo casamento de Gabriel e Beatriz, preservando boa qualidade visual e reduzindo o custo de carregamento.

## Solução aprovada

- Reencodar o vídeo fornecido em WebM, resolução máxima de 1080p.
- Remover integralmente a faixa de áudio.
- Buscar um tamanho final entre 40 MB e 60 MB, ajustando a qualidade dentro desse intervalo sem alterar a proporção do vídeo.
- Manter o arquivo original durante a conversão e só substituí-lo depois que o resultado for validado.
- Atualizar `HeroVideoTextSection.vue` para usar o nome do arquivo otimizado.

## Comportamento da home

O vídeo continuará com autoplay, muted, loop, playsinline e preenchimento por `object-fit: cover`. A sobreposição, o título e os demais elementos da hero não serão alterados.

## Validação

- Confirmar por inspeção do arquivo que não existe faixa de áudio.
- Confirmar tamanho, resolução e codec do resultado.
- Executar os testes e o build de produção.
- Abrir a home em navegador real e verificar carregamento, autoplay e loop em viewport desktop e mobile.
- Confirmar que não restou referência ao vídeo removido.

## Fora de escopo

Não haverá mudança de layout, tipografia, textos, overlays ou vídeos da página de projetos.
