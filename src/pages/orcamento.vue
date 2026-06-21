<template>
  <main class="budget-page">
    <section class="budget-hero" aria-labelledby="budget-title">
      <p class="budget-marker">04 / OR&Ccedil;AMENTO</p>
      <h1 id="budget-title" class="budget-title">Or&ccedil;amento</h1>
      <div class="budget-hero__copy">
        <p>
          Valores fixos para registrar momentos &uacute;nicos com cuidado, sensibilidade e uma
          est&eacute;tica atemporal.
        </p>
        <p>
          Batizados e casamentos com entregas pensadas para preservar emo&ccedil;&atilde;o, detalhes e
          mem&oacute;ria.
        </p>
      </div>
    </section>

    <section
      v-for="section in packageSections"
      :key="section.title"
      class="budget-section"
      :aria-labelledby="section.id"
    >
      <div class="budget-section__heading">
        <h2 :id="section.id">{{ section.title }}</h2>
        <span aria-hidden="true" />
        <small aria-hidden="true">&#10022;</small>
      </div>

      <div class="budget-packages">
        <article v-for="item in section.items" :key="item.name" class="budget-card">
          <div class="budget-card__topline">
            <div>
              <h3>{{ item.name }}</h3>
              <p class="budget-card__subtitle">{{ item.subtitle }}</p>
            </div>
            <strong>{{ item.price }}</strong>
          </div>
          <p class="budget-card__description">{{ item.description }}</p>
          <p class="budget-card__includes">{{ item.includes }}</p>
        </article>
      </div>
    </section>

    <section class="budget-cta" aria-labelledby="budget-cta-title">
      <p class="budget-marker">Disponibilidade</p>
      <h2 id="budget-cta-title">Pronto para eternizar o seu momento?</h2>
      <p>
        Consulte a disponibilidade da sua data e receba uma orienta&ccedil;&atilde;o personalizada para o seu
        evento.
      </p>
      <Button :href="site.whatsapp" target="_blank" rel="noopener noreferrer" variant="solid">
        Falar no WhatsApp
      </Button>
    </section>

    <p class="budget-note">
      Os valores podem variar conforme deslocamento, data, local e necessidades espec&iacute;ficas.
    </p>
  </main>
</template>

<script setup lang="ts">
import { useHead } from '#imports';
import Button from '~/components/ui/Button/Button.vue';
import { site } from '~/data/site';

const packageSections = [
  {
    id: 'batizados',
    title: 'Batizados',
    items: [
      {
        name: 'Cobertura Fotogr\u00e1fica',
        subtitle: 'Registro Afetivo',
        description:
          'Registro delicado da cerim\u00f4nia, dos detalhes e dos momentos em fam\u00edlia.',
        includes:
          'Cerim\u00f4nia \u00b7 Fam\u00edlia \u00b7 Fotos espont\u00e2neas \u00b7 Tratamento refinado \u00b7 Galeria digital',
        price: 'R$ 550,00'
      },
      {
        name: 'Filme Cinematogr\u00e1fico',
        subtitle: 'Mem\u00f3ria em Movimento',
        description:
          'Filme sens\u00edvel para reviver o batizado com emo\u00e7\u00e3o, leveza e cuidado cinematogr\u00e1fico.',
        includes:
          'Filmagem \u00b7 Detalhes \u00b7 Emo\u00e7\u00f5es \u00b7 Edi\u00e7\u00e3o cinematogr\u00e1fica \u00b7 Entrega digital',
        price: 'R$ 850,00'
      }
    ]
  },
  {
    id: 'casamentos',
    title: 'Casamentos',
    items: [
      {
        name: 'Plano Bronze',
        subtitle: 'Fotografia Essencial',
        description:
          'Registro fotogr\u00e1fico completo do casamento, com making of da noiva, cerim\u00f4nia e festa.',
        includes:
          '2 fot\u00f3grafos \u00b7 Making of noiva \u00b7 Fotos ilimitadas \u00b7 8h30 \u00b7 Galeria digital',
        price: 'R$ 3.900,00'
      },
      {
        name: 'Plano Silver',
        subtitle: 'Fotografia Completa',
        description:
          'Cobertura fotogr\u00e1fica mais completa, contemplando os preparativos dos noivos e a narrativa do dia.',
        includes:
          '2 fot\u00f3grafos \u00b7 Making of noiva/noivo \u00b7 8h30 \u00b7 Tratamento refinado \u00b7 Galeria digital',
        price: 'R$ 5.000,00'
      },
      {
        name: 'Plano Gold',
        subtitle: 'Foto & Filme',
        description:
          'Cobertura em fotografia e filmagem para registrar o casamento em imagem e movimento.',
        includes:
          '2 fot\u00f3grafos \u00b7 1 cinegrafista \u00b7 Foto e v\u00eddeo \u00b7 Making of noiva \u00b7 8h30',
        price: 'R$ 5.700,00'
      },
      {
        name: 'Plano Diamond',
        subtitle: 'Experi\u00eancia Completa',
        description:
          'A experi\u00eancia mais completa, com fotografia, filmagem, drone e equipe ampliada para registrar cada detalhe.',
        includes:
          'Drone \u00b7 2 fot\u00f3grafos \u00b7 2 cinegrafistas \u00b7 Auxiliar \u00b7 Making of noiva/noivo \u00b7 8h30',
        price: 'R$ 6.540,00'
      }
    ]
  }
];

useHead({
  title: 'Or\u00e7amento'
});
</script>

<style scoped>
.budget-page {
  position: relative;
  min-height: 100dvh;
  padding: clamp(4rem, 10vw, 8rem) clamp(1.35rem, 4vw, 3rem) 3rem;
  overflow: hidden;
  background:
    radial-gradient(circle at 72% 8%, rgba(var(--white-soft-rgb), 0.18), transparent 30rem),
    linear-gradient(180deg, var(--surface), var(--bg) 42%, var(--surface));
  color: var(--text);
  font-family: var(--font-body);
}

.budget-page::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  opacity: 0.018;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 190px;
}

.budget-hero,
.budget-section,
.budget-cta,
.budget-note {
  position: relative;
  z-index: 1;
  width: min(100%, 1120px);
  margin-inline: auto;
}

.budget-hero {
  min-height: min(68dvh, 680px);
  padding-bottom: clamp(4rem, 8vw, 7rem);
}

.budget-marker {
  margin: 0;
  color: var(--accent);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.budget-title {
  margin: 0;
  color: var(--text);
  font-family: var(--font-display);
  font-size: 8.4rem;
  font-weight: 400;
  line-height: 0.78;
}

.budget-hero__copy {
  display: grid;
  gap: 1.2rem;
  max-width: 32rem;
  margin: 3.3rem 0 0 auto;
  padding-bottom: 0.6rem;
}

.budget-hero__copy p,
.budget-cta p,
.budget-note {
  margin: 0;
  color: var(--muted);
  font-size: clamp(0.94rem, 1.5vw, 1rem);
  font-weight: 300;
  line-height: 1.85;
}

.budget-section {
  padding: clamp(3.6rem, 8vw, 6.5rem) 0;
  border-top: 1px solid var(--border-soft);
}

.budget-section__heading {
  display: grid;
  grid-template-columns: auto minmax(4rem, 1fr) auto;
  gap: 1rem;
  align-items: center;
  margin-bottom: clamp(1.4rem, 4vw, 2.4rem);
}

.budget-section__heading h2 {
  margin: 0;
  color: var(--text);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}

.budget-section__heading span {
  height: 1px;
  background: linear-gradient(90deg, var(--border), transparent);
}

.budget-section__heading small {
  color: var(--accent);
  font-size: 0.78rem;
}

.budget-packages {
  display: grid;
  gap: 0.8rem;
  min-width: 0;
}

.budget-card {
  min-width: 0;
  padding: clamp(1.4rem, 3.2vw, 2.2rem);
  border: 1px solid rgba(var(--bg-rgb), 0.14);
  border-radius: 8px;
  background: var(--accent-soft);
  box-shadow: 0 22px 54px rgba(var(--text-rgb), 0.24);
  color: var(--bg);
  transition:
    border-color 220ms ease,
    background 220ms ease,
    box-shadow 220ms ease,
    transform 220ms ease;
}

.budget-card:hover {
  transform: translateY(-2px);
  border-color: rgba(var(--bg-rgb), 0.28);
  background: #333333;
  box-shadow: 0 28px 64px rgba(var(--text-rgb), 0.3);
}

.budget-card__topline {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 1.5rem;
  align-items: start;
}

.budget-card h3,
.budget-cta h2 {
  margin: 0;
  font-family: var(--font-display);
  font-weight: 400;
}

.budget-card h3 {
  color: var(--bg);
}

.budget-cta h2 {
  color: var(--text);
}

.budget-card h3 {
  font-size: 3.25rem;
  line-height: 0.9;
  overflow-wrap: break-word;
}

.budget-card strong {
  color: var(--surface);
  font-family: var(--font-display);
  font-size: 2.4rem;
  font-weight: 400;
  line-height: 0.92;
  white-space: nowrap;
}

.budget-card__subtitle {
  margin: 0.8rem 0 0;
  color: rgba(var(--bg-rgb), 0.78);
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.budget-card__description {
  max-width: 44rem;
  margin: 1.25rem 0 0;
  color: rgba(var(--bg-rgb), 0.72);
  font-size: 0.98rem;
  font-weight: 300;
  line-height: 1.75;
}

.budget-card__includes {
  margin: 1.4rem 0 0;
  color: rgba(var(--bg-rgb), 0.82);
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  line-height: 1.75;
  text-transform: uppercase;
}

.budget-cta {
  display: grid;
  gap: 1.2rem;
  margin-top: clamp(3.5rem, 8vw, 6rem);
  padding: clamp(2rem, 5vw, 3.2rem) 0;
  border-top: 1px solid var(--border-soft);
  border-bottom: 1px solid var(--border-soft);
}

.budget-cta h2 {
  max-width: 46rem;
  font-size: 5.8rem;
  line-height: 0.86;
}

.budget-cta p {
  max-width: 38rem;
}

.budget-cta :deep(a) {
  justify-self: start;
  margin-top: 0.5rem;
}

.budget-note {
  padding-top: 1.4rem;
  font-size: 0.78rem;
}

@media (max-width: 820px) {
  .budget-hero {
    min-height: auto;
  }

  .budget-title {
    font-size: 4.9rem;
  }

  .budget-hero__copy {
    margin-left: 0;
  }

  .budget-card__topline {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .budget-card strong {
    justify-self: start;
  }
}

@media (max-width: 560px) {
  .budget-page {
    padding-inline: 1rem;
  }

  .budget-section__heading {
    gap: 0.75rem;
  }

  .budget-card {
    padding: 1.25rem;
  }

  .budget-card h3 {
    font-size: 2.35rem;
  }

  .budget-title {
    font-size: 3.35rem;
  }

  .budget-cta h2 {
    font-size: 3.4rem;
  }

  .budget-card__includes {
    letter-spacing: 0.06em;
    text-transform: none;
  }
}
</style>
