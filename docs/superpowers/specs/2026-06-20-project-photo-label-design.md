# Troca de identificação das fotos do projeto

## Objetivo

Substituir o texto visível `Lherme Films` por `Santidade em Foco` nas legendas das cinco fotos correspondentes na página de projetos.

## Implementação

- Alterar o título do projeto `lherme-films` em `src/data/projects.ts`.
- Atualizar os cinco textos alternativos desse projeto para usar `Santidade em Foco`.
- Preservar identificador, imagens, nomes de arquivos, ordem, layout e demais metadados.

## Fluxo de dados

`ProjectsPhotoCarousel` continuará recebendo os projetos e exibirá o título atualizado em cada legenda. Nenhuma mudança será necessária no componente.

## Verificação

- Confirmar ausência de `Lherme Films` no conteúdo exibido e nos textos alternativos do projeto.
- Executar testes relevantes do projeto.

