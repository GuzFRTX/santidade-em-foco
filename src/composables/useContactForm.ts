import { computed, ref } from 'vue';

export interface ContactFormFields {
  name: string;
  email: string;
  eventType: string;
  message: string;
}

type ContactFormErrors = Partial<Record<keyof ContactFormFields, string>>;

const initialFields: ContactFormFields = {
  name: '',
  email: '',
  eventType: '',
  message: ''
};

export function useContactForm() {
  const fields = ref<ContactFormFields>({ ...initialFields });
  const errors = ref<ContactFormErrors>({});

  const whatsappUrl = computed(() => {
    const message = [
      `Nome: ${fields.value.name}`,
      `E-mail: ${fields.value.email}`,
      `Tipo de evento: ${fields.value.eventType || 'Nao informado'}`,
      `Mensagem: ${fields.value.message}`
    ].join('\n');

    return `https://wa.me/5521994740673?text=${encodeURIComponent(message)}`;
  });

  function validate() {
    const nextErrors: ContactFormErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!fields.value.name.trim()) {
      nextErrors.name = 'Informe seu nome.';
    }

    if (!emailPattern.test(fields.value.email.trim())) {
      nextErrors.email = 'Informe um e-mail valido.';
    }

    if (!fields.value.message.trim()) {
      nextErrors.message = 'Conte um pouco sobre o projeto.';
    }

    errors.value = nextErrors;
    return Object.keys(nextErrors).length === 0;
  }

  function reset() {
    fields.value = { ...initialFields };
    errors.value = {};
  }

  return {
    fields,
    errors,
    whatsappUrl,
    validate,
    reset
  };
}
