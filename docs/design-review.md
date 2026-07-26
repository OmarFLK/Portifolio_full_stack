# Revisão final de design — SIGNAL / SELECTED WORK

Data da auditoria: 25 de julho de 2026.

## Veredito

**Resultado visual e técnico: aprovado, 9,3/10.**

**Resultado do gate de implementação: aprovado, sem blockers abertos.**

O redesign concretiza a tese “Engenharia em modo de edição”. A identidade é editorial, técnica, tátil e reconhecível: Ink/Paper/Signal, artefatos em CSS/SVG, ledger de experiência, cinco projetos com composições distintas e uma recomposição específica para mobile.

O gate único começa em 1280 px e controla EditorialMotion/GSAP, ScrollTrigger, Lenis e Three.js. Mobile, tablet compacto e reduced motion preservam a composição estática completa sem baixar nenhum desses runtimes.

## Escopo e evidências

Auditoria feita sobre os seguintes artefatos locais (o diretório `artifacts/` é ignorado no Git):

- `artifacts/mobile-320-320x720-full.png` — 320 × 16691;
- `artifacts/mobile-375-375x812-full.png` — 375 × 16188;
- `artifacts/mobile-390-390x844-full.png` — 390 × 16276;
- `artifacts/tablet-768x1024-full.png` — 768 × 14365;
- `artifacts/desktop-1440x900-full.png` — 1440 × 15323;
- `artifacts/wide-1920x1080-full.png` — 1920 × 16649;
- `artifacts/lighthouse-desktop.json`;
- `artifacts/lighthouse-mobile.json`;
- `docs/design-plan.md`;
- `docs/design-dna.json`;
- `docs/animation-map.md`;
- implementação final em `src/`;
- configuração e artefatos do build.

Resultados automatizados:

- Vitest: **15/15**;
- Playwright: **48 testes — 40 aprovados, 8 skips intencionais por viewport e 0 falhas**;
- Lighthouse desktop: **100/100/100/100**;
- Lighthouse mobile final: **97/100/100/100**;
- três amostras mobile: Performance 96/97/98, mediana 97;
- build de produção: **aprovado**.

Screenshots comprovam composição, reflow e estado final. Lighthouse acrescenta evidência laboratorial de carregamento, estabilidade visual, acessibilidade, boas práticas e SEO. INP de campo, FPS, memória, leitor de tela e zoom continuam medições complementares.

## Matriz GStack final

| Dimensão            | Alvo inicial | Nota final | Evidência concreta                                                                                                                 |
| ------------------- | -----------: | ---------: | ---------------------------------------------------------------------------------------------------------------------------------- |
| Hierarquia          |          9,0 |    **9,5** | Hero → contexto → provas → trajetória → ferramentas → base → laboratório → contato forma uma leitura imediata nos seis viewports.  |
| Tipografia          |          9,0 |    **9,2** | Bricolage Grotesque cria voz forte; IBM Plex Mono separa metadados e ações. Títulos longos quebram sem corte até 320 px.           |
| Paleta              |          9,2 |    **9,7** | Preto, papel, branco, amarelo e cinzas operam como sistema semântico, sem azul/ciano, magenta ou roxo dominantes.                  |
| Composição          |          8,8 |    **9,4** | A coluna editorial permanece legível; gutters carregam arte não essencial; cada capítulo muda de gramática sem perder o sistema.   |
| Clareza             |          9,0 |    **9,2** | Conteúdo factual aparece em ordem simples, sem card vazio, métrica inventada ou mídia obrigatória.                                 |
| Originalidade       |          9,2 |    **9,7** | Scanner, ledger, terminal, ficha acadêmica e painel financeiro foram construídos especificamente para os cinco projetos.           |
| Consistência        |          9,0 |    **9,4** | Índices, mono labels, handles, rasgos, superfícies e capability gate seguem regras estáveis entre plano e runtime.                 |
| Responsividade      |          8,8 |    **9,2** | 320, 375, 390, 768, 1440 e 1920 apresentam reflow correto, foco dominante e ausência visual de overflow.                           |
| Mobile craft        |          9,0 |    **9,5** | Mobile é recomposição: estrela no fluxo, status não flutuante, projetos verticais, ledger compacto e contato com targets largos.   |
| Acessibilidade      |          9,0 |    **9,2** | Há um `h1`, landmarks, skip link, foco duplo, targets de 44 px, menu com Escape, `dialog` nativo e Lighthouse 100 nos dois perfis. |
| Microinterações     |          8,7 |    **8,4** | Header, locale, menu e dialog têm estados coerentes; alguns CTAs ainda podem uniformizar transições de 120–180 ms.                 |
| Motion design       |          9,0 |    **9,1** | EditorialMotion é lazy, tem scope/cleanup e existe apenas no desktop elegível; a estrela é event-driven e não usa RAF infinito.    |
| Performance         |          8,8 |    **9,0** | JS inicial de 79,55 kB gzip, motion/Lenis/Three ausentes do caminho compacto, Lighthouse 100 desktop e mediana 97 mobile.          |
| Personalidade       |          9,3 |    **9,8** | “Engenharia em modo de edição” aparece em cada capítulo e pertence ao conteúdo de Omar, não a uma biblioteca genérica.             |
| Ausência de AI slop |          9,2 |    **9,8** | Não há gradiente roxo, glow neon, glassmorphism em série, pills excessivas, grid SaaS repetido, emojis ou copy vazia.              |

Média simples: **9,3/10**.

Score final da rubrica GStack: **9,3/10**.

## Leitura visual

### Desktop

O Hero mantém o foco dominante. O liquid amarelo/cromo ocupa o gutter esquerdo, a estrela 3D fica no gutter direito e o título central permanece livre. O bounding box em “SOFTWARE” comunica seleção em vez de funcionar como borda decorativa genérica.

Os cinco projetos são o ponto mais forte: mudam proporção, lado, superfície, sombra e linguagem de arte sem parecer cinco produtos desconectados. O projeto de leads recebe o maior peso, conforme o plano.

### Mobile e tablet

Os quatro renders compactos comprovam uma direção própria:

- o wordmark vira barra compacta;
- nome, proposição, CTAs e status preservam a ordem;
- a estrela SVG entra no fluxo sem significado essencial;
- o bounding box abandona medidas pequenas;
- projetos exibem contexto e ações antes da mídia;
- experiência, formação e capacidades empilham sem perder relações;
- nenhum título principal é truncado;
- não há overflow horizontal observável em 320, 375, 390 ou 768 px.

## Reauditoria técnica

### Gate 1280/1279 — aprovado

- `src/utils/heavyVisuals.ts`: habilita apenas em `width >= 1280`;
- testes unitários: aprovam 1280 e rejeitam 1279;
- CSS: corte coerente em `79.999rem`;
- `DesktopEnhancements.tsx`: EditorialMotion, Lenis e DesktopStarScene só são importados depois do gate;
- E2E: clientes compactos e reduced motion rejeitam requests de `EditorialMotion`, `motion`, `desktop-scroll`, `lenis`, `DesktopStarScene`, `desktop-3d` e `three`.

### Motion lazy — aprovado

GSAP, `@gsap/react` e ScrollTrigger vivem em `src/components/motion/EditorialMotion.tsx`, montado com `React.lazy`.

- A01, A02, A03 e A04 existem apenas no desktop elegível;
- tablet, mobile e reduced motion mantêm o estado estático completo;
- `App.tsx` não importa runtime de motion;
- Lenis compartilha o mesmo gate e ticker GSAP;
- cleanup permanece ligado ao ciclo de vida React.

### Performance — aprovada

Build:

- JS inicial: **250,07 kB bruto / 79,55 kB gzip**;
- CSS inicial: **69,31 kB bruto / 14,28 kB gzip**;
- ilha desktop adicional: aproximadamente **192,87 kB gzip**;
- total com todos os enhancements: aproximadamente **272,42 kB gzip**.

Lighthouse:

| Perfil                | Performance | Acessibilidade | Best Practices | SEO |    FCP |    LCP |   CLS |   TBT |
| --------------------- | ----------: | -------------: | -------------: | --: | -----: | -----: | ----: | ----: |
| Desktop               |         100 |            100 |            100 | 100 |  0,6 s |  0,7 s | 0,036 | 10 ms |
| Mobile, amostra final |          97 |            100 |            100 | 100 |  2,0 s |  2,1 s | 0,007 | 30 ms |
| Mobile, mediana de 3  |          97 |              — |              — |   — | 1,97 s | 2,12 s | 0,007 |  7 ms |

A queda do TBT e o ganho da Performance mobile são coerentes com a remoção do runtime de motion do caminho inicial.

### Legado — limpeza aprovada

- `css/style.css` e `js/main.js` removidos;
- PNGs antigos de GitHub, LinkedIn, site e WhatsApp removidos;
- três MP4s e dois PDFs preservados;
- `node_modules` removido do índice Git em commit separado, com instalação local preservada.
- hook `useReducedMotion` sem consumidores removido; utilitários de scroll agora alimentam a cena e permanecem cobertos por testes.

## Gate final

| Item                                            | Estado                                                                             |
| ----------------------------------------------- | ---------------------------------------------------------------------------------- |
| Screenshots 320, 375, 390, 768, 1440 e 1920     | **Aprovado:** seis renders finais arquivados.                                      |
| Um foco dominante por viewport                  | **Aprovado** nos seis renders.                                                     |
| Ornamento comunica seleção, processo ou autoria | **Aprovado.**                                                                      |
| Projetos não repetem o mesmo template           | **Aprovado com destaque.**                                                         |
| Mobile/tablet sem motion, Lenis ou Three        | **Aprovado:** gate e E2E cobrem todos os chunks.                                   |
| Reduced motion completo                         | **Aprovado:** estado estático e zero requests dos runtimes pesados.                |
| Teclado, foco e 320 px                          | **Aprovado;** leitor de tela e zoom continuam complementares.                      |
| Bundle, LCP e CLS                               | **Aprovado.**                                                                      |
| Lighthouse                                      | **Aprovado:** 100 desktop e Performance mediana 97 mobile.                         |
| Testes e build                                  | **Aprovado:** 15/15 unit, 40 passes, 8 skips intencionais, 0 falhas e build final. |
| Nenhuma nota abaixo de 8                        | **Aprovado:** menor nota 8,4.                                                      |

## Melhorias não bloqueantes

1. Uniformizar transições de 120–180 ms em alguns CTAs.
2. Revisar labels informativos abaixo de 11 px.
3. Medir INP, FPS, memória e long tasks em hardware representativo.
4. Testar leitor de tela e zoom a 200%.
5. Verificar requests reais dos subsets de fonte antes de otimizar.
6. Gerar posters e transcodes leves para os MP4s.

## Conclusão

As divergências técnicas encontradas nas auditorias foram corrigidas e verificadas. O design está pronto do ponto de vista visual e funcional, com build, seis screenshots e relatórios Lighthouse gerados localmente, além de Vitest e Playwright aprovados. As medições complementares não alteram o score GStack final de **9,3/10**.
