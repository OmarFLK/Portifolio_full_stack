# Relatório de performance

Data do snapshot: 25/07/2026

Escopo: build final React + Vite, isolamento da ilha desktop, Lighthouse e validação automatizada.

Importante: Lighthouse fornece métricas laboratoriais, não Web Vitals de campo. INP, FPS e memória em hardware representativo não são inferidos destes resultados.

## Resumo

O JavaScript inicial soma **250,07 kB bruto / 79,55 kB gzip**, abaixo do budget de **170 kB gzip**. O caminho inicial contém apenas `index`, ícones e o runtime do bundler.

GSAP, `@gsap/react`, ScrollTrigger, Lenis e Three.js foram removidos completamente do caminho inicial. Eles pertencem a uma ilha desktop dinâmica de aproximadamente **192,87 kB gzip**, liberada somente pelo capability gate.

Clientes abaixo de 1280 px, touch primário, `Save-Data`, hardware com pouca memória ou `prefers-reduced-motion: reduce` permanecem na composição estática e não solicitam EditorialMotion/GSAP, ScrollTrigger, Lenis, DesktopStarScene ou Three.js.

Os vídeos locais somam aproximadamente **25,5 MiB**, mas não fazem parte da carga inicial: o elemento `<video>` só é montado após abertura explícita do dialog do projeto.

## Budgets

| Área                            |   Budget | Resultado final                        | Estado                                 |
| ------------------------------- | -------: | -------------------------------------- | -------------------------------------- |
| JavaScript inicial, gzip        | ≤ 170 kB | 79,55 kB                               | dentro, margem de 90,45 kB             |
| Motion + smooth scroll, gzip    |  ≤ 80 kB | 50,75 kB dinâmicos                     | dentro e ausente do caminho compacto   |
| Fontes WOFF2 ativas             | ≤ 140 kB | 70,92 kB                               | dentro                                 |
| LCP desktop                     |  ≤ 2,5 s | 0,7 s                                  | dentro                                 |
| LCP mobile, mediana de 3 runs   |  ≤ 2,5 s | 2,12 s                                 | dentro                                 |
| CLS desktop / mobile            |    ≤ 0,1 | 0,036 / 0,007                          | dentro                                 |
| INP                             | ≤ 200 ms | não medido                             | requer dado de campo ou instrumentação |
| Requests desktop-only em mobile |        0 | confirmado pela suíte Playwright final | aprovado                               |
| Vídeos na carga inicial         |        0 | montados somente após interação        | aprovado                               |

O budget de motion/scroll inclui `EditorialMotion` (`0,44 kB gzip`), `motion` com GSAP/ScrollTrigger (`44,98 kB gzip`) e `desktop-scroll` com Lenis (`5,33 kB gzip`). Os três são dinâmicos e protegidos pelo mesmo gate.

## Resultado do build

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

## Lighthouse final

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

Desktop atinge 100 nas quatro categorias. Mobile mantém acessibilidade, boas práticas e SEO em 100 e estabiliza Performance em 97. A mediana de LCP fica 0,38 s abaixo do budget. A redução do TBT confirma o benefício de retirar toda a ilha de motion do caminho inicial.

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
```

Quando o gate falha:

- `EditorialMotion` não é importado;
- GSAP, `@gsap/react` e ScrollTrigger não são solicitados;
- `desktop-scroll`/Lenis não são solicitados;
- `DesktopStarScene` e `desktop-3d` não são solicitados;
- não é criado contexto WebGL;
- a estrela SVG estática mantém a composição;
- as entradas editoriais permanecem no estado final legível;
- o scroll permanece nativo.

Essa separação é feita por `import()` e `React.lazy`, não por `display: none`.

## Evidência Playwright

A suíte final executa seis projetos:

- 320×720;
- 375×812;
- 390×844;
- 768×1024;
- 1440×900;
- 1920×1080.

Resultado: **48 testes, 40 aprovados, 8 ignorados intencionalmente por viewport e 0 falhas**.

Os cenários de rede rejeitam requests que correspondam a `EditorialMotion`, `motion`, `desktop-scroll`, `lenis`, `DesktopStarScene`, `desktop-3d` ou `three` em clientes compactos e reduced motion. Os oito skips pertencem a cenários deliberadamente restritos aos viewports onde fazem sentido; não são falhas.

Screenshots completos dos seis viewports foram gerados localmente em `artifacts/`, diretório ignorado no Git.

## Custo e comportamento do 3D

A cena Three.js é decorativa e não contém texto, links ou informação essencial. Ela:

- usa `src/utils/scroll.ts` para clamp, mapeamento e interpolação do progresso, cobertos por testes unitários;
- limita `devicePixelRatio` a `1.5`;
- usa uma geometria extrudada, uma malha, edges e três luzes;
- renderiza somente quando há scroll, resize, pointer move ou retorno à aba;
- não mantém um RAF infinito;
- não renderiza com a aba oculta;
- remove observers, listeners, geometria, materiais, renderer e contexto no cleanup;
- preserva o poster SVG se a importação ou criação do WebGL falhar.

O chunk Three.js é maior do que todo o JavaScript inicial gzip. A decisão continua aceitável porque ele é estritamente desktop-only e progressivo.

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

## Estado final

- build: aprovado;
- JavaScript inicial: dentro do budget;
- Lighthouse desktop/mobile: aprovado;
- LCP e CLS laboratoriais: dentro dos budgets;
- Vitest: 15/15;
- Playwright: 40 aprovados, 8 skips intencionais e 0 falhas;
- isolamento de motion/Lenis/Three em mobile, tablet e reduced motion: aprovado;
- vídeos sob demanda: aprovado.

INP, FPS e memória permanecem métricas complementares de campo/runtime; não são apresentados como resultados já medidos.
