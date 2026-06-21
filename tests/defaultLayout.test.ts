import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const projectFile = (path: string) => readFileSync(join(process.cwd(), path), 'utf8');

describe('default layout chrome', () => {
  it('keeps the cinematic site shell headerless', () => {
    const layout = projectFile('src/layouts/default.vue');

    expect(layout).not.toContain('<Header');
    expect(layout).toContain('<Footer v-if="!isBudgetPage" />');
    expect(layout).not.toContain("components/layout/Header/Header.vue");
  });

  it('keeps budget chrome hidden inside the persistent default layout', () => {
    const budgetPage = projectFile('src/pages/orcamento.vue');
    const layout = projectFile('src/layouts/default.vue');

    expect(budgetPage).not.toContain('layout: false');
    expect(budgetPage).not.toContain('<Header');
    expect(layout).toContain('isBudgetPage');
    expect(layout).toContain('v-if="!isBudgetPage"');
  });
});
