# CTAs finais da página de projetos

## Objetivo

Fechar a seção de filmes com um convite para o canal do YouTube e transformar o CTA de orçamento em um encerramento editorial separado e mais contextualizado.

## Estrutura aprovada

### Encerramento da seção de filmes

Após o carrossel de vídeos, dentro de `ProjectsFilmSection`, adicionar um bloco centralizado com:

- texto: “Mais histórias em movimento esperam por você.”;
- botão sólido: “Ver no YouTube”;
- destino: `https://www.youtube.com/@lhermefilms`;
- abertura em nova aba com `target="_blank"` e `rel="noopener noreferrer"`.

O botão reutiliza o componente `Button` existente. O bloco integra a animação de entrada da seção e mantém espaçamento editorial em desktop e mobile.

### Encerramento da página

Manter o CTA de orçamento depois da seção de filmes, visualmente separado do CTA do YouTube. Adicionar antes do botão:

- texto: “Sua história também merece ser contada.”;
- botão existente: “Ver orçamento”;
- destino interno existente: `/orcamento`.

O bloco permanece centralizado e ganha espaçamento suficiente para funcionar como encerramento independente da página.

## Responsividade e acessibilidade

- Textos e botões devem permanecer legíveis e centralizados em telas pequenas.
- O link externo deve manter proteção contra acesso ao contexto da aba original.
- Não adicionar animações novas; apenas incluir o CTA do YouTube na animação GSAP já usada pela seção.

## Validação

- Teste automatizado confirma textos, destinos e atributos de segurança.
- Suíte completa, typecheck e build devem passar.
- Verificação em navegador real confirma hierarquia, separação e responsividade em desktop e mobile.

## Fora de escopo

Não alterar carrossel, vídeos, modal, conteúdo de projetos, cabeçalho ou rodapé.
