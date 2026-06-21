import { describe, expect, it } from 'vitest';
import { useContactForm } from '~/composables/useContactForm';

describe('useContactForm', () => {
  it('rejects empty required fields', () => {
    const form = useContactForm();

    const result = form.validate();

    expect(result).toBe(false);
    expect(form.errors.value.name).toBe('Informe seu nome.');
    expect(form.errors.value.email).toBe('Informe um e-mail valido.');
    expect(form.errors.value.message).toBe('Conte um pouco sobre o projeto.');
  });

  it('builds whatsapp link for valid data', () => {
    const form = useContactForm();
    form.fields.value = {
      name: 'Guilherme',
      email: 'guilherme@example.com',
      eventType: 'Batizado',
      message: 'Quero uma cobertura em julho.'
    };

    expect(form.validate()).toBe(true);
    expect(form.whatsappUrl.value).toContain('https://wa.me/5521994740673');
    expect(decodeURIComponent(form.whatsappUrl.value)).toContain('Quero uma cobertura em julho.');
  });
});
