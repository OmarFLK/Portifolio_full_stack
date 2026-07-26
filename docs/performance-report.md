# Relatório de performance

Data do snapshot-base: 25/07/2026

Atualização documental: 25/07/2026

Escopo do snapshot-base: build React + Vite, isolamento da ilha desktop, Lighthouse e validação automatizada antes da seção de Resultados e da nova coreografia da estrela.

Importante: Lighthouse fornece métricas laboratoriais, não Web Vitals de campo. INP, FPS e memória em hardware representativo não são inferidos destes resultados.

Os números abaixo permanecem como baseline reproduzível anterior de 25/07, não como medição da revisão cirúrgica feita mais tarde no mesmo dia. A seção `#resultados`, a animação de suas métricas e a cena Three.js reescrita alteram CSS e chunks dinâmicos; por isso, build, suíte integral e Lighthouse precisam de um novo snapshot antes do fechamento.

## Resumo

No snapshot-base, o JavaScript inicial somava **250,07 kB bruto / 79,55 kB gzip**, abaixo do budget de **170 kB gzip**. O caminho inicial continha apenas `index`, ícones e o runtime do bundler.

GSAP, `@gsap/react`, ScrollTrigger, Lenis e Three.js permanecem fora do caminho inicial. No baseline, pertenciam a uma ilha desktop dinâmica de aproximadamente **192,87 kB gzip**, liberada somente pelo capability gate.

Clientes abaixo de 1280 px, touch primário, `Save-Data`, hardware com pouca memória, WebGL indisponível ou `prefers-reduced-motion: reduce` permanecem na composição estática e não devem solicitar EditorialMotion/GSAP, ScrollTrigger, Lenis, DesktopStarScene ou Three.js.

Os vídeos locais somam aproximadamente **25,5 MiB**, mas não fazem parte da carga inicial: o elemento `<video>` só é montado após abertura explícita do dialog do projeto.

## Budgets

| Área                            |   Budget | Snapshot-base de 25/07                | Estado naquele snapshot                |
| ------------------------------- | -------: | ------------------------------------- | -------------------------------------- |
| JavaScript inicial, gzip        | ≤ 170 kB | 79,55 kB                              | dentro, margem de 90,45 kB             |
| Motion + smooth scroll, gzip    |  ≤ 80 kB | 50,75 kB dinâmicos                    | dentro e ausente do caminho compacto   |
| Fontes WOFF2 ativas             | ≤ 140 kB | 70,92 kB                              | dentro                                 |
| LCP desktop                     |  ≤ 2,5 s | 0,7 s                                 | dentro                                 |
| LCP mobile, mediana de 3 runs   |  ≤ 2,5 s | 2,12 s                                | dentro                                 |
| CLS desktop / mobile            |    ≤ 0,1 | 0,036 / 0,007                         | dentro                                 |
| INP                             | ≤ 200 ms | não medido                            | requer dado de campo ou instrumentação |
| Requests desktop-only em mobile |        0 | confirmado pela suíte Playwright-base | aprovado                               |
| Vídeos na carga inicial         |        0 | montados somente após interação       | aprovado                               |

O budget de motion/scroll inclui `EditorialMotion` (`0,44 kB gzip`), `motion` com GSAP/ScrollTrigger (`44,98 kB gzip`) e `desktop-scroll` com Lenis (`5,33 kB gzip`). Os três são dinâmicos e protegidos pelo mesmo gate.

## Resultado do build-base

### JavaScript

| Chunk              | Forma de carga             |     Bruto |      Gzip |
| ------------------ | -------------------------- | --------: | --------: |
| `index`            | inicial                    | 237,89 kB |  74,52 kB |
| `icons`            | inicial                    |  11,96 kB |   4,84 kB |
| `rolldown-runtime` | inicial                    |   0,22 kB |   0,19 kB |
| `EditorialMotion`  | dinâmica, desktop elegível |   0,82 kB |   0,44 kB |
| `motion`           | dinâmica, desktop elegível | 114,22 kB |  44,98 kB |
| `desktop-scroll`   | dinâmica, desktop elegível |  18,37 kB |   5,33 kB |
| `DesktopStarScene` | dinâmica, desktop elegível |   3,50 kB |   1,76 kB |
| `desktop-3d`       | dinâmica, desktop elegível | 554,75 kB | 140,12 kB |

Totais derivados:

- JavaScript inicial: **250,07 kB bruto / 79,55 kB gzip**;
- JavaScript dinâmico da ilha desktop: **691,66 kB bruto / 192,63 kB gzip**;
- CSS dinâmico da cena: **0,39 kB bruto / 0,24 kB gzip**;
- ilha desktop completa: **692,05 kB bruto / 192,87 kB gzip**;
- caminho inicial + ilha completa: aproximadamente **942,12 kB bruto / 272,42 kB gzip**.

O total desktop não representa a carga de mobile/tablet/reduced motion. Também não equivale automaticamente ao custo de parse e execução em todos os dispositivos.

### CSS

| Artefato               | Forma de carga             |    Bruto |     Gzip |
| ---------------------- | -------------------------- | -------: | -------: |
| CSS principal          | inicial                    | 69,31 kB | 14,28 kB |
| `DesktopStarScene.css` | dinâmica, desktop elegível |  0,39 kB |  0,24 kB |

O CSS concentra tokens, reset, tipografia, composição responsiva e módulos dos componentes. Não existe runtime CSS-in-JS.

### Fontes

| Arquivo/família ativa               | Formato |      Tamanho |
| ----------------------------------- | ------- | -----------: |
| Bricolage Grotesque Variable, Latin | WOFF2   |     41,34 kB |
| IBM Plex Mono 400, Latin            | WOFF2   |     14,70 kB |
| IBM Plex Mono 500, Latin            | WOFF2   |     14,88 kB |
| Total                               | WOFF2   | **70,92 kB** |

As fontes são empacotadas localmente por Fontsource, sem dependência de CDN.

## Lighthouse do baseline

Os relatórios completos foram gerados localmente nestes caminhos (o diretório `artifacts/` é ignorado no Git):

- `artifacts/lighthouse-desktop.json`;
- `artifacts/lighthouse-mobile.json`.

### Amostras finais arquivadas

| Perfil                | Performance | Acessibilidade | Best Practices | SEO |   FCP |   LCP |   CLS |   TBT |
| --------------------- | ----------: | -------------: | -------------: | --: | ----: | ----: | ----: | ----: |
| Desktop               |         100 |            100 |            100 | 100 | 0,6 s | 0,7 s | 0,036 | 10 ms |
| Mobile, amostra final |          97 |            100 |            100 | 100 | 2,0 s | 2,1 s | 0,007 | 30 ms |

### Estabilidade mobile

Três amostras mobile produziram scores de Performance **96, 97 e 98**. A mediana foi:

| Métrica mobile, mediana | Resultado |
| ----------------------- | --------: |
| Performance             |        97 |
| FCP                     |    1,97 s |
| LCP                     |    2,12 s |
| CLS                     |     0,007 |
| TBT                     |      7 ms |

Naquele snapshot, desktop atingiu 100 nas quatro categorias. Mobile manteve acessibilidade, boas práticas e SEO em 100 e estabilizou Performance em 97. A mediana de LCP ficou 0,38 s abaixo do budget. A medição não deve ser atribuída automaticamente à revisão cirúrgica posterior.

Lighthouse não mede INP de campo neste snapshot. TBT ajuda a localizar custo de main thread, mas não deve ser apresentado como substituto de INP.

## Separação do caminho compacto

O hook `useHeavyVisuals` inicia desativado e libera a ilha somente quando todas estas condições são verdadeiras:

```text
innerWidth >= 1280
pointer: fine
hover: hover
prefers-reduced-motion: no-preference
Save-Data = false
deviceMemory ausente ou >= 4
WebGL/WebGL2 disponível sem major performance caveat
```

Quando o gate falha:

- `EditorialMotion` não é importado;
- GSAP, `@gsap/react` e ScrollTrigger não são solicitados;
- `desktop-scroll`/Lenis não são solicitados;
- `DesktopStarScene` e `desktop-3d` não são solicitados;
- não é criada a cena Three.js nem mantido um contexto WebGL de renderização;
- estrelas SVG estáticas no Hero e em Resultados mantêm a composição;
- as entradas editoriais permanecem no estado final legível;
- o scroll permanece nativo.

Essa separação é feita por `import()` e `React.lazy`, não por `display: none`.

## Evidência Playwright

O snapshot-base executou seis projetos:

- 320×720;
- 375×812;
- 390×844;
- 768×1024;
- 1440×900;
- 1920×1080.

Resultado histórico: **48 testes, 40 aprovados, 8 ignorados intencionalmente por viewport e 0 falhas**.

Os cenários de rede rejeitam requests que correspondam a `EditorialMotion`, `motion`, `desktop-scroll`, `lenis`, `DesktopStarScene`, `desktop-3d` ou `three` em clientes compactos e reduced motion. Os oito skips pertencem a cenários deliberadamente restritos aos viewports onde fazem sentido; não são falhas.

Screenshots completos dos seis viewports foram gerados localmente em `artifacts/`, diretório ignorado no Git.

A suíte atual adiciona 1024×768 e 1366×768, além de:

- acesso direto, scrollspy e `aria-current` para `#resultados`;
- copy e métricas em PT/EN/ES;
- labels acessíveis para `≈ R$ 70 mil`, `+15%` e “Semanas”;
- limite dimensional de 300 px no Hero e 230 px nos demais pontos;
- opacidade zero em Projetos e ausência de interseção com `data-star-protected`;
- desmontagem/remontagem da ilha ao redimensionar 1440 → 1024 → 1366;
- 64 screenshots seccionais previstos em oito larguras e oito posições.

O resultado integral da matriz atual e a inspeção desses screenshots ainda estão pendentes. A contagem histórica acima não substitui essa execução.

## Custo e comportamento do 3D

A cena Three.js é decorativa e não contém texto, links ou informação essencial. Ela:

- usa o `clamp` de `src/utils/scroll.ts` para conter o objeto na viewport;
- limita `devicePixelRatio` a `1.5`;
- mantém um canvas quadrado de 190–230 px e escala de Hero abaixo de 300 px;
- usa uma geometria extrudada mais fina, uma malha, edges e três luzes;
- resolve a timeline por waypoints semânticos de Hero, Sobre, Projetos, Resultados, Experiência, Ferramentas, Formação, Laboratório, Contato e footer;
- fica invisível em Projetos e outras zonas densas; gutters só são usados quando comportam objeto, 32 px de respiro e 16 px de padding;
- renderiza somente quando a timeline muda, há resize ou a aba volta a ficar visível;
- não mantém um RAF infinito;
- não renderiza com a aba oculta;
- remove observers, listeners, geometria, materiais, renderer e contexto no cleanup;
- preserva/restaura posters SVG locais se a importação, criação do renderer ou contexto WebGL falhar.

No snapshot-base, o chunk Three.js era maior do que todo o JavaScript inicial gzip. A decisão continua condicionada ao isolamento desktop-only; o tamanho atual do chunk deve ser recolhido no próximo build.

## Vídeos e mídia

| Vídeo               |                             Tamanho |
| ------------------- | ----------------------------------: |
| `eduexp.mp4`        |                        14.842.860 B |
| `finexp.mp4`        |                         5.976.711 B |
| `opensourceexp.mp4` |                         5.923.158 B |
| Total               | **26.742.729 B**, cerca de 25,5 MiB |

Estratégia atual:

- nenhum `<video>` local no DOM inicial;
- botão explícito abre um `dialog` nativo;
- o vídeo é montado somente com o dialog aberto;
- sem autoplay;
- `preload="metadata"` somente depois da interação;
- fechar o dialog desmonta o elemento e devolve foco ao acionador.

O próximo ganho relevante seria transcodificar os arquivos originais e fornecer posters leves, preservando os originais como fonte.

## Motion

`App.tsx` não importa GSAP. `DesktopEnhancements` monta `EditorialMotion` com `React.lazy` somente após o capability gate. O módulo então carrega GSAP, `@gsap/react` e ScrollTrigger.

Medidas de contenção:

- ausência total do runtime de motion em mobile, tablet compacto e reduced motion;
- timelines com scope da raiz da aplicação;
- cleanup pelo ciclo de vida de `useGSAP`;
- conteúdo parte de um estado final legível no CSS;
- propriedades principais limitadas a `transform` e `opacity`;
- Lenis usa o ticker GSAP, evitando um segundo loop independente;
- no máximo uma ilha 3D e um recorte líquido scroll-linked.
- os cards de Resultados entram uma vez; somente 70 e 15 recebem contador visual, enquanto labels acessíveis permanecem estáticos.

## Limitações e oportunidades

Ainda podem ser medidos:

- INP de campo ou instrumentado;
- long tasks durante interação real;
- uso de memória antes/depois da cena 3D;
- FPS em 1440×900 e 1920×1080;
- waterfall de fontes;
- comportamento sem aceleração gráfica.

Oportunidades priorizadas:

1. Gerar posters AVIF/WebP para os três vídeos.
2. Transcodificar MP4s para versões de apresentação menores.
3. Manter o teste de Network como proteção contra regressão de imports mobile.
4. Medir preload/cobertura das fontes e dos ícones.
5. Comparar desktop com e sem Lenis usando INP e experiência de teclado.
6. Reavaliar a ilha Three.js se o custo dinâmico crescer ou o ganho visual deixar de justificar o chunk.

## Estado da revisão atual

- build e tamanhos de bundle da revisão: **pendentes de snapshot final**;
- Lighthouse desktop/mobile da revisão: **não reexecutado neste relatório**;
- LCP e CLS atuais: **não medidos**; os valores acima são do baseline;
- Vitest e Playwright: **pendentes de registro do último run integral após todos os ajustes**;
- isolamento de motion/Lenis/Three em mobile, tablet, reduced motion e WebGL indisponível: **implementado; regressão integral pendente**;
- screenshots seccionais da estrela/Resultados: **pendentes de geração e inspeção final**;
- vídeos sob demanda: comportamento preservado no código; preview de deploy continua pendente.

INP, FPS e memória permanecem métricas complementares de campo/runtime; não são apresentados como resultados já medidos.
