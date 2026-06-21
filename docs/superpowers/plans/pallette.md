# Ajuste Global de Paleta de Cores do Projeto

Quero alterar a paleta de cores atual do projeto inteiro para uma estética mais voltada ao **bege**, mantendo um visual **minimalista, editorial, elegante e premium**.

A mudança deve ser aplicada de forma global, afetando todas as páginas, componentes e estados visuais do site, não apenas a página de projetos.

## Paleta atual

Atualmente o projeto usa esta paleta:

```css
:root {
  --bg: #0c0b09;
  --bg-deep: #080806;
  --surface: #141210;
  --surface-2: #1b1815;
  --text: #978f86;
  --muted: #7f786f;
  --accent: #b8aa96;
  --white: #fdfaf6;
  --border: rgba(151, 143, 134, 0.28);
  --border-soft: rgba(151, 143, 134, 0.14);
  --shadow: 0 28px 70px rgba(0, 0, 0, 0.28);
}
```

Essa paleta está bonita, mas está muito puxada para um visual **dark warm / marrom escuro**. Quero transformar a identidade visual do projeto em algo mais **bege, claro, editorial e sofisticado**.

## Nova paleta global desejada

Substituir a paleta atual por esta:

```css
:root {
  --bg: #efe7da;
  --bg-deep: #ded2c1;

  --surface: #f8f2e8;
  --surface-2: #eadfce;

  --text: #3a3027;
  --muted: #75695d;

  --accent: #a78963;
  --white: #fffaf2;

  --border: rgba(58, 48, 39, 0.18);
  --border-soft: rgba(58, 48, 39, 0.08);

  --shadow: 0 28px 70px rgba(58, 48, 39, 0.16);
}
```

## Direção visual global

A nova estética do projeto inteiro deve parecer:

* Bege editorial;
* Minimalista;
* Sofisticada;
* Leve;
* Premium;
* Boa para fotografia, projetos e portfólio;
* Com bastante respiro visual;
* Sem parecer amarelada demais;
* Sem parecer genérica ou “template comum”.

A interface inteira deve ficar coerente com essa nova identidade visual, mantendo uma aparência refinada, limpa e visualmente confortável.

## Papel de cada variável

Usar as variáveis da seguinte forma:

```css
--bg: fundo geral das páginas;
--bg-deep: áreas mais profundas, rodapé, seções alternadas ou blocos de contraste;

--surface: cards, menus, headers, painéis, modais, blocos e caixas;
--surface-2: hover, cards secundários, detalhes e estados ativos;

--text: títulos e textos principais;
--muted: legendas, datas, categorias, descrições e textos secundários;

--accent: links, botões, linhas, detalhes de hover, elementos interativos e destaques;
--white: brilho pontual, texto sobre imagem escura ou highlights;

--border: bordas mais visíveis;
--border-soft: bordas sutis;
--shadow: sombras suaves e elegantes;
```

## Aplicação global

Aplicar a nova paleta de forma consistente em todo o projeto, incluindo:

```css
body {
  background: var(--bg);
  color: var(--text);
}

header,
nav,
footer,
section,
.card,
.panel,
.modal,
.project-card,
.project-info {
  background: var(--surface);
  border-color: var(--border-soft);
}

.card,
.panel,
.modal,
.project-card {
  box-shadow: var(--shadow);
}

.card:hover,
.project-card:hover,
.interactive:hover {
  background: var(--surface-2);
  border-color: var(--border);
}

h1,
h2,
h3,
h4,
.logo,
.title,
.project-title {
  color: var(--text);
}

p,
.subtitle,
.description,
.meta,
.project-meta,
.project-description,
small {
  color: var(--muted);
}

a,
button,
.highlight,
.accent,
.project-link {
  color: var(--accent);
}
```

## Componentes e áreas que precisam ser revisados

Ao aplicar a nova paleta, revisar especialmente:

* Header;
* Navbar;
* Footer;
* Hero;
* Botões;
* Links;
* Cards;
* Modais;
* Painéis;
* Seções alternadas;
* Página de projetos;
* Overlays de imagem;
* Textos secundários;
* Estados de hover;
* Estados ativos;
* Bordas;
* Sombras;
* Elementos decorativos;
* Qualquer gradiente antigo baseado na paleta escura.

## Página de projetos

A página de projetos ainda deve manter a ideia de uma galeria minimalista com grid masonry.

As fotos/projetos devem continuar sendo o elemento principal. A interface deve permanecer discreta, com pouco HUD e sem filtros visíveis.

As informações das fotos/projetos devem aparecer principalmente no hover das imagens.

## Overlay das imagens no hover

Como a página de projetos usa imagens, as informações no hover precisam continuar legíveis.

Usar um overlay escuro quente, mas suave, para garantir contraste em cima das fotos:

```css
.project-overlay {
  background: linear-gradient(
    to top,
    rgba(58, 48, 39, 0.72),
    rgba(58, 48, 39, 0.22),
    transparent
  );
  color: var(--white);
}

.project-overlay .meta,
.project-overlay .project-meta,
.project-overlay .project-description {
  color: rgba(255, 250, 242, 0.72);
}
```

## Cuidados importantes

Não quero apenas trocar os HEX de forma mecânica. Quero que a mudança faça sentido visualmente no projeto inteiro.

Ao implementar:

* Aplicar a nova paleta globalmente;
* Verificar se o contraste dos textos continua bom em todas as páginas;
* Evitar textos muito claros em fundo claro;
* Evitar bege amarelado demais;
* Evitar sombras muito pesadas;
* Remover ou ajustar gradientes antigos que ainda pareçam dark/warm;
* Manter a interface minimalista;
* Manter um visual elegante e premium;
* Manter as fotos/projetos como protagonistas na página de projetos;
* Ajustar hover, bordas, overlays e textos secundários para combinar com a nova paleta;
* Não adicionar filtros, categorias visíveis ou elementos extras de HUD na página de projetos;
* Não alterar estrutura, layout ou comportamento além do necessário para aplicar a nova direção visual;
* Não transformar a página de projetos em home;
* Garantir consistência visual entre todas as páginas.

## Resultado esperado

Quero que o projeto inteiro tenha uma estética de:

**beige gallery / editorial portfolio**

O resultado final deve parecer mais claro, refinado e elegante do que a versão atual, mantendo uma identidade visual coesa em todas as páginas e componentes.
