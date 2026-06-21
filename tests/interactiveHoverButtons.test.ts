import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const projectFile = (path: string) => readFileSync(join(process.cwd(), path), 'utf8');

describe('interactive hover buttons', () => {
  it('uses the shared interactive hover button for visible calls to action', () => {
    const intro = projectFile('src/components/ExperienceIntro.vue');
    const budgetPage = projectFile('src/pages/orcamento.vue');
    const projectsPage = projectFile('src/pages/projetos.vue');

    expect(intro).toContain('InteractiveHoverButton');
    expect(budgetPage).toContain('<Button :href="site.whatsapp"');
    expect(projectsPage).toContain('<Button to="/orcamento" variant="solid">');
  });

  it('keeps solid link labels visible at rest', () => {
    const button = projectFile(
      'src/components/ui/interactive-hover-button/InteractiveHoverButton.vue'
    );

    expect(button).toContain('interactive-hover-button--solid');
    expect(button).toMatch(
      /\.interactive-hover-button--solid\s*\{[^}]*color:\s*var\(--bg\);/s
    );
  });
});
