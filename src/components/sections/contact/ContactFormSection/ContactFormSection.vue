<template>
  <section class="contact-form-section">
    <Container>
      <form class="contact-form" @submit.prevent="submit">
        <SectionTitle
          eyebrow="Briefing rápido"
          text="Preencha os pontos principais. O envio abre uma conversa no WhatsApp com a mensagem pronta."
        >
          Conte o essencial da cobertura.
        </SectionTitle>

        <div class="contact-form__fields">
          <label>
            <span>Nome</span>
            <input v-model="fields.name" type="text" autocomplete="name" />
            <small v-if="errors.name">{{ errors.name }}</small>
          </label>

          <label>
            <span>E-mail</span>
            <input v-model="fields.email" type="email" autocomplete="email" />
            <small v-if="errors.email">{{ errors.email }}</small>
          </label>

          <label>
            <span>Tipo de evento</span>
            <select v-model="fields.eventType">
              <option value="">Selecionar</option>
              <option v-for="event in events" :key="event" :value="event">{{ event }}</option>
            </select>
          </label>

          <label class="contact-form__message">
            <span>Mensagem</span>
            <textarea v-model="fields.message" rows="6" />
            <small v-if="errors.message">{{ errors.message }}</small>
          </label>

          <Button class="contact-form__submit" type="submit" variant="solid">Enviar pelo WhatsApp</Button>
        </div>
      </form>
    </Container>
  </section>
</template>

<script setup lang="ts">
import Container from '~/components/ui/Container/Container.vue';
import SectionTitle from '~/components/ui/SectionTitle/SectionTitle.vue';
import Button from '~/components/ui/Button/Button.vue';
import { events } from '~/data/events';
import { useContactForm } from '~/composables/useContactForm';

const { fields, errors, whatsappUrl, validate } = useContactForm();

function submit() {
  if (validate()) {
    window.open(whatsappUrl.value, '_blank', 'noopener,noreferrer');
  }
}
</script>

<style scoped>
.contact-form-section {
  padding: 80px 48px 128px;
}

.contact-form {
  display: grid;
  grid-template-columns: minmax(280px, 0.8fr) minmax(320px, 1fr);
  gap: 52px;
  border-top: 1px solid var(--border);
  padding-top: 38px;
}

.contact-form__fields {
  display: grid;
  gap: 18px;
}

.contact-form label {
  display: grid;
  gap: 8px;
}

.contact-form span {
  color: var(--accent);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.contact-form input,
.contact-form select,
.contact-form textarea {
  width: 100%;
  border: 1px solid var(--border);
  border-radius: 0;
  background: var(--surface);
  color: var(--text);
  padding: 14px 16px;
  outline: none;
}

.contact-form input:focus,
.contact-form select:focus,
.contact-form textarea:focus {
  border-color: var(--accent);
  background: var(--white-soft);
}

.contact-form textarea {
  resize: vertical;
}

.contact-form small {
  color: var(--accent);
  font-size: 12px;
}

.contact-form__message {
  grid-column: 1 / -1;
}

.contact-form__submit {
  justify-self: start;
}

@media (max-width: 860px) {
  .contact-form-section {
    padding: 72px 24px;
  }

  .contact-form {
    grid-template-columns: 1fr;
  }
}
</style>
