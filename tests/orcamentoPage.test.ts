import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const page = () => readFileSync(join(process.cwd(), 'src/pages/orcamento.vue'), 'utf8');

describe('budget page', () => {
  it('stays free of header and navigation inside the shared transition boundary', () => {
    const content = page();

    expect(content).not.toContain('layout: false');
    expect(content).not.toMatch(/<header\b/i);
    expect(content).not.toMatch(/<nav\b/i);
    expect(content).not.toContain('Header');
  });

  it('presents all packages with Brazilian prices grouped by category', () => {
    const content = page();

    expect(content).toContain('04 / OR&Ccedil;AMENTO');
    expect(content).toContain('Batizados');
    expect(content).toContain('Casamentos');
    expect(content).toContain('Cobertura Fotogr\\u00e1fica');
    expect(content).toContain('Filme Cinematogr\\u00e1fico');
    expect(content).toContain('Plano Bronze');
    expect(content).toContain('Plano Silver');
    expect(content).toContain('Plano Gold');
    expect(content).toContain('Plano Diamond');
    expect(content).toContain('R$ 550,00');
    expect(content).toContain('R$ 850,00');
    expect(content).toContain('R$ 3.900,00');
    expect(content).toContain('R$ 5.000,00');
    expect(content).toContain('R$ 5.700,00');
    expect(content).toContain('R$ 6.540,00');
  });

  it('keeps one final WhatsApp call to action', () => {
    const content = page();

    expect(content).toContain('Pronto para eternizar o seu momento?');
    expect(content).toContain('Falar no WhatsApp');
    expect(content.match(/Falar no WhatsApp/g)).toHaveLength(1);
  });
});
