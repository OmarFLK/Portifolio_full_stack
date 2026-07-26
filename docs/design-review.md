# Revisão de design — SIGNAL / SELECTED WORK

Revisão cirúrgica: 25 de julho de 2026.

## Veredito

**Status da implementação:** a nova seção de Resultados, a copy PT/EN/ES e a coreografia semântica da estrela estão presentes no código.

**Status do gate final:** em validação. A suíte integral, os novos screenshots seccionais e um novo snapshot de bundle/Lighthouse ainda precisam ser fechados para esta revisão.

O score **9,3/10** registrado em 25/07/2026 pertence ao baseline anterior. Ele continua documentado abaixo como referência histórica, mas não é transferido automaticamente para o estado atual.

O redesign mantém a tese “Engenharia em modo de edição”. A identidade continua editorial, técnica, tátil e reconhecível: Ink/Paper/Signal, artefatos em CSS/SVG, ledger de experiência, cinco projetos com composições distintas e uma recomposição específica para mobile. A nova seção `#resultados` acrescenta impacto sem virar um bloco genérico de KPIs.

O gate único começa em 1280 px e controla EditorialMotion/GSAP, ScrollTrigger, Lenis e Three.js. Ele agora também exige suporte WebGL real. Mobile, tablet compacto, `Save-Data`, hardware restrito, WebGL indisponível e reduced motion preservam a composição estática completa sem baixar a ilha pesada.

## Escopo e evidências

O baseline de 25/07 foi auditado sobre os seguintes artefatos locais (o diretório `artifacts/` é ignorado no Git):

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
- implementação do baseline em `src/`;
- configuração e artefatos do build.

Resultados automatizados daquele baseline:

- Vitest: **15/15**;
- Playwright: **48 testes — 40 aprovados, 8 skips intencionais por viewport e 0 falhas**;
- Lighthouse desktop: **100/100/100/100**;
- Lighthouse mobile final: **97/100/100/100**;
- três amostras mobile: Performance 96/97/98, mediana 97;
- build de produção: **aprovado**.

Esses screenshots e números comprovam o baseline, não a revisão atual. Para o novo estado, a suíte está configurada com dez viewports (320, 375, 390, 768, 1024, 1280, 1366, 1440, 1600 e 1920 px) e evidências seccionais nas seis larguras obrigatórias, mais 1280 e 1600 px para validar as fronteiras da estrela. Ainda falta registrar a execução completa e revisar os novos arquivos em `artifacts/star-results/`.

INP de campo, FPS, memória, leitor de tela e zoom continuam medições complementares.

## Matriz GStack do baseline

As notas abaixo foram fechadas antes da seção de Resultados e da nova trajetória da estrela. Servem como régua de comparação; uma nova nota só deve ser publicada depois do gate atual.

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

Resultados entra logo depois dos projetos como um painel técnico assimétrico, com grid de baixa opacidade, handles, tipografia de impacto e três provas. A escala editorial dá mais peso a `≈ R$ 70 mil`, preserva `+15%` e trata “Semanas” como texto deliberadamente não quantificado.

### Mobile e tablet

A recomposição compacta atual preserva uma direção própria, ainda pendente das novas evidências seccionais:

- o wordmark vira barra compacta;
- nome, proposição, CTAs e status preservam a ordem;
- a estrela SVG entra no fluxo sem significado essencial;
- Resultados mantém os três artigos, labels acessíveis e valores finais sem depender de contador;
- o bounding box abandona medidas pequenas;
- projetos exibem contexto e ações antes da mídia;
- experiência, formação e capacidades empilham sem perder relações;
- nenhum título principal é truncado;
- as regras responsivas evitam overflow horizontal em 320, 375, 390 ou 768 px; a matriz final ainda precisa reconfirmar isso depois da nova seção.

## Reauditoria técnica

### Gate 1280/1279 — implementado; regressão final pendente

- `src/utils/heavyVisuals.ts`: habilita apenas em `width >= 1280` e com contexto WebGL/WebGL2 disponível;
- os testes unitários cobrem 1280/1279 e o caso sem WebGL;
- CSS: corte coerente em `79.999rem`;
- `DesktopEnhancements.tsx`: EditorialMotion, Lenis e DesktopStarScene só são importados depois do gate;
- a suíte E2E mantém as asserções que rejeitam `EditorialMotion`, `motion`, `desktop-scroll`, `lenis`, `DesktopStarScene`, `desktop-3d` e `three` em clientes compactos e reduced motion; execução integral da revisão pendente.

### Motion lazy — implementado; revisão visual pendente

GSAP, `@gsap/react` e ScrollTrigger vivem em `src/components/motion/EditorialMotion.tsx`, montado com `React.lazy`.

- A01–A04 e a animação de Resultados existem apenas no desktop elegível;
- tablet, mobile e reduced motion mantêm o estado estático completo;
- `App.tsx` não importa runtime de motion;
- Lenis compartilha o mesmo gate e ticker GSAP;
- cleanup permanece ligado ao ciclo de vida React.

### Estrela semântica — implementada; evidência final pendente

- canvas quadrado de 190–230 px, com escala do Hero abaixo de 300 px;
- waypoints derivados de seções e projetos reais, não de frações uniformes da página;
- estrela oculta em Projetos, painel de métricas, Ferramentas, Laboratório e footer;
- slots laterais só aparecem se o gutter comportar objeto, respiro e padding;
- entre 1280 e 1599 px, a presença se concentra no Hero e no slot de Resultados;
- posters locais permanecem no Hero e em Resultados até o primeiro frame válido e voltam a aparecer quando a cena fica indisponível;
- a interação por ponteiro foi removida para reduzir ruído e manter a estrela como fio narrativo.

### Performance — baseline aprovado; revisão atual pendente

Build de 25/07:

- JS inicial: **250,07 kB bruto / 79,55 kB gzip**;
- CSS inicial: **69,31 kB bruto / 14,28 kB gzip**;
- ilha desktop adicional: aproximadamente **192,87 kB gzip**;
- total com todos os enhancements: aproximadamente **272,42 kB gzip**.

Lighthouse de 25/07:

| Perfil                | Performance | Acessibilidade | Best Practices | SEO |    FCP |    LCP |   CLS |   TBT |
| --------------------- | ----------: | -------------: | -------------: | --: | -----: | -----: | ----: | ----: |
| Desktop               |         100 |            100 |            100 | 100 |  0,6 s |  0,7 s | 0,036 | 10 ms |
| Mobile, amostra final |          97 |            100 |            100 | 100 |  2,0 s |  2,1 s | 0,007 | 30 ms |
| Mobile, mediana de 3  |          97 |              — |              — |   — | 1,97 s | 2,12 s | 0,007 |  7 ms |

Esses valores não devem ser apresentados como medição da nova seção ou da cena reescrita. O próximo fechamento precisa repetir build e Lighthouse, preservando os mesmos budgets.

### Legado — limpeza aprovada

- `css/style.css` e `js/main.js` removidos;
- PNGs antigos de GitHub, LinkedIn, site e WhatsApp removidos;
- três MP4s e dois PDFs preservados;
- `node_modules` removido do índice Git em commit separado, com instalação local preservada.
- hook `useReducedMotion` sem consumidores removido; utilitários de scroll agora alimentam a cena e permanecem cobertos por testes.

## Gate da revisão atual

| Item                                               | Estado                                                                             |
| -------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `#resultados` após Projetos e antes de Experiência | **Implementado**                                                                   |
| Menu, hash direto, scrollspy e `aria-current`      | **Implementado; execução E2E final pendente**                                      |
| Copy orgânica e consistente em PT/EN/ES            | **Implementada; revisão humana por pessoa fluente recomendada**                    |
| Métricas sem valor inventado                       | **Implementado:** `≈ R$ 70 mil`, `+15%` e “Semanas” sem quantidade                 |
| Waypoints semânticos e ausência em áreas densas    | **Implementado; screenshots e asserções integrais pendentes**                      |
| Fallback Hero/Resultados e gate sem WebGL          | **Implementado; cenário manual de context loss ainda recomendado**                 |
| Mobile/tablet sem motion, Lenis ou Three           | **Proteção implementada; regressão de Network pendente no estado final**           |
| Reduced motion completo                            | **Proteção implementada; regressão final pendente**                                |
| Screenshots seccionais em oito larguras            | **PENDENTE QA:** 64 evidências em `artifacts/star-results/`                        |
| Lint, types e formatação                           | **APROVADOS**                                                                      |
| Build, unit e matriz E2E                           | **PENDENTE FECHAMENTO:** registrar apenas o último run, depois de todos os ajustes |
| Bundle e Lighthouse                                | **PENDENTE NOVO SNAPSHOT:** números de 25/07 são somente baseline                  |
| Leitor de tela, zoom 200%, INP, FPS e memória      | **PENDENTE QA COMPLEMENTAR**                                                       |

## Melhorias não bloqueantes

1. Uniformizar transições de 120–180 ms em alguns CTAs.
2. Revisar labels informativos abaixo de 11 px.
3. Medir INP, FPS, memória e long tasks em hardware representativo.
4. Testar leitor de tela e zoom a 200%.
5. Verificar requests reais dos subsets de fonte antes de otimizar.
6. Gerar posters e transcodes leves para os MP4s.
7. Recalcular a rubrica GStack somente depois de revisar as evidências da nova estrela e de Resultados.

## Conclusão

A revisão cirúrgica preserva o sistema visual aprovado e corrige dois pontos estruturais: o impacto ganhou um capítulo navegável e a estrela deixou de percorrer a página como uma camada global indiferente ao conteúdo. O código está alinhado à direção pretendida, mas o veredito final depende do fechamento das evidências listadas acima. Até lá, **9,3/10** permanece apenas como score histórico do baseline.
