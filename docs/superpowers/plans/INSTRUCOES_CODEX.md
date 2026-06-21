# Santidade em Foco — referência do dissolve cinematográfico

Use o arquivo `dissolve-cinematografico-demo.html` como referência visual e de movimento.

## Prompt para o Codex

Analise o arquivo `/docs/dissolve-cinematografico-demo.html` e implemente no projeto Santidade em Foco a mesma transição de páginas demonstrada nele.

Use especificamente o comportamento do dissolve cinematográfico:

- saída da página atual com fade-out, blur de 0px para 10px e scale de 1 para 1.015;
- entrada da próxima página com fade-in, blur de 8px para 0px, scale de 1.015 para 1 e y de 15px para 0;
- pequena sobreposição temporal entre a saída e a entrada;
- duração aproximada de 520ms para a saída e 760ms para a entrada;
- movimento suave, elegante e cinematográfico;
- sem loader, flash, cortina ou logo no meio da tela.

Adapte o efeito para a arquitetura real do projeto:

- Nuxt;
- TypeScript;
- GSAP;
- transição global de rotas;
- integração com Lenis;
- compatibilidade com SSR;
- suporte a `prefers-reduced-motion`;
- limpeza dos estilos inline ao final;
- proteção contra animações duplicadas em navegação rápida;
- fundo global em Warm Beige `#efe7da` para impedir flash branco.

Antes de editar, identifique a estrutura atual do projeto e possíveis animações ou transições já existentes.

Não copie a implementação em JavaScript puro literalmente. Reproduza o resultado visual usando GSAP e os hooks corretos de transição do Nuxt.

Depois:
- execute os testes, typecheck, lint ou build disponíveis;
- teste navegação entre pelo menos três rotas;
- teste voltar e avançar no navegador;
- liste os arquivos modificados;
- explique resumidamente a implementação.
