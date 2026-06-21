# Santidade em Foco

> Um olhar sensível sobre histórias, afetos e momentos que permanecem.

**Santidade em Foco** é uma experiência digital criada para apresentar fotografia e vídeo de uma forma mais humana, contemplativa e emocional.

O projeto nasceu como um portfólio pessoal tradicional, mas foi completamente repensado. Em vez de apenas organizar trabalhos em páginas e galerias, a nova versão busca transmitir a atmosfera existente por trás de cada registro: a espera, os detalhes, a fé, os vínculos e tudo aquilo que transforma um momento comum em uma memória permanente.

Não é apenas um lugar para visualizar fotografias. É uma experiência construída para fazer cada história ser sentida.

---

## Sobre a refatoração

A primeira versão do projeto seguia uma estrutura mais próxima de um portfólio convencional, com foco direto na apresentação dos trabalhos.

Durante a refatoração, o site recebeu uma nova direção visual, narrativa e técnica. A navegação passou a ser pensada como uma sequência cinematográfica, conectando páginas, imagens, vídeos e textos de maneira mais fluida.

Entre as principais mudanças estão:

* nova identidade visual;
* experiência mais imersiva e contemplativa;
* transições cinematográficas entre páginas;
* reorganização completa dos projetos;
* separação entre experiências de fotografia e vídeo;
* carrosséis de imagens com navegação mais editorial;
* maior atenção ao ritmo, às pausas e ao movimento;
* estrutura preparada para diferentes tipos de cerimônias e histórias.

---

## Conceito

A proposta do Santidade em Foco parte da ideia de que fotografia não é apenas imagem.

Cada registro carrega uma intenção, uma história e uma emoção que não podem ser resumidas a uma galeria estática. Por isso, a interface procura respeitar o tempo de cada conteúdo, usando movimento, silêncio visual e composição para criar uma experiência mais próxima da sensibilidade presente no trabalho fotográfico.

A estética combina tons quentes, texturas suaves e uma direção minimalista, permitindo que as imagens permaneçam como o principal elemento da experiência.

---

## Experiência

O projeto foi desenvolvido com atenção especial a:

* narrativa visual;
* movimento suave;
* transições entre rotas;
* hierarquia tipográfica;
* valorização das fotografias;
* reprodução de vídeos;
* responsividade;
* fluidez durante a navegação;
* equilíbrio entre interface e conteúdo.

As animações não foram adicionadas apenas como efeito visual. Cada movimento existe para conduzir o olhar e reforçar a sensação de continuidade entre as histórias.

---

## Tecnologias

* [Nuxt](https://nuxt.com/)
* [Vue.js](https://vuejs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [GSAP](https://gsap.com/)
* [Lenis](https://lenis.darkroom.engineering/)
* CSS responsivo
* Git e GitHub
* Node.js
* PM2

---

## Estrutura do projeto

```text
santidade-em-foco/
├── public/
│   ├── images/
│   └── videos/
├── src/
│   ├── assets/
│   ├── components/
│   ├── composables/
│   ├── layouts/
│   ├── pages/
│   └── app.vue
├── nuxt.config.ts
├── package.json
└── README.md
```

A estrutura pode sofrer alterações conforme a evolução do projeto.

---

## Mídias do projeto

Alguns vídeos utilizados no site possuem arquivos muito grandes e, por esse motivo, não ficam armazenados diretamente neste repositório.

O GitHub mantém apenas a estrutura, o código e os arquivos necessários para o desenvolvimento. As mídias pesadas são adicionadas separadamente no ambiente de produção.

Estrutura esperada para os vídeos de projetos:

```text
public/
└── videos/
    └── Projetos/
        ├── video-01.mp4
        ├── video-02.mp4
        └── video-03.mp4
```

---

## Executando localmente

Clone o repositório:

```bash
git clone git@github.com:GuzFRTX/santidade-em-foco.git
```

Entre na pasta:

```bash
cd santidade-em-foco
```

Instale as dependências:

```bash
npm install
```

Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

O projeto estará disponível em:

```text
http://localhost:3000
```

---

## Build de produção

Gere a versão de produção:

```bash
npm run build
```

Execute o servidor:

```bash
node .output/server/index.mjs
```

Utilizando PM2:

```bash
pm2 start .output/server/index.mjs --name santidade-em-foco
pm2 save
```

---

## Atualizando o projeto no servidor

```bash
git pull
npm install
npm run build
pm2 restart santidade-em-foco
```

As mídias adicionadas diretamente no servidor não são removidas durante o `git pull`, pois suas pastas estão configuradas no `.gitignore`.

---

## Direção e desenvolvimento

Projeto idealizado, refatorado e desenvolvido por **Gustavo Freitas de Lemos — Guz**.

A construção do Santidade em Foco envolve desenvolvimento front-end, direção visual, experiência de navegação, animação e organização narrativa do conteúdo.

---

## Status

O projeto permanece em desenvolvimento e refinamento contínuo.

Novas histórias, experiências e melhorias visuais poderão ser adicionadas conforme o crescimento do Santidade em Foco.
