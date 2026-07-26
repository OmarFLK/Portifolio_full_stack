# Mapa de animações

## Tese e limites

O movimento deve fazer a página parecer uma composição editorial sendo selecionada, inspecionada e organizada dentro de uma ferramenta criativa. Cada animação precisa cumprir pelo menos uma função: orientar foco, explicar relação espacial, confirmar uma ação ou marcar a mudança de capítulo.

Limites globais:

- scroll nativo é o baseline;
- no máximo dois scrubs simultâneos;
- no máximo uma animação ambiente contínua;
- nenhuma rotação infinita da estrela;
- nenhuma textura animada a 60 FPS;
- nenhuma atualização de React state por frame;
- nenhum pin no tablet/mobile;
- nenhum EditorialMotion, GSAP, ScrollTrigger, Lenis, WebGL ou Three.js no mobile/tablet compacto;
- todo estado inicial deve continuar legível sem JavaScript;
- reduced motion apresenta o estado final imediatamente.

## Tokens

| Token       |                            Valor | Uso                               |
| ----------- | -------------------------------: | --------------------------------- |
| `instant`   |                           120 ms | foco, pressed e correções visuais |
| `micro`     |                           180 ms | underline, ícone, handle e hover  |
| `control`   |                           260 ms | menu, botão e painel pequeno      |
| `reveal`    |                           420 ms | item editorial isolado            |
| `section`   |                           700 ms | heading + mídia de seção          |
| `hero`      |                           900 ms | composição inicial                |
| `ambient`   |                             16 s | deriva única do liquid gradient   |
| `snap`      | `cubic-bezier(0.22, 1, 0.36, 1)` | controles e handles               |
| `editorial` |  `cubic-bezier(0.16, 1, 0.3, 1)` | entradas grandes                  |
| `system`    | `cubic-bezier(0.2, 0.8, 0.2, 1)` | painéis e menu                    |
| `standard`  |   `cubic-bezier(0.4, 0, 0.2, 1)` | transições comuns                 |

## Matriz de animações

| ID  | Elemento                   | Gatilho                                 | Início → fim                                           | Duração / easing                      | Desktop elegível                                 | Tablet                   | Mobile                              | Reduced motion                     | Custo esperado                 | Biblioteca                         |
| --- | -------------------------- | --------------------------------------- | ------------------------------------------------------ | ------------------------------------- | ------------------------------------------------ | ------------------------ | ----------------------------------- | ---------------------------------- | ------------------------------ | ---------------------------------- |
| A01 | composição do Hero         | montagem de `EditorialMotion`           | `translateY(28px)` → posição final, em grupos          | 720 ms, `power3.out`, stagger 80 ms   | completa após import lazy                        | estado estático completo | estado estático completo            | estado final; módulo não importa   | baixo; transform               | EditorialMotion + GSAP + `useGSAP` |
| A02 | blocos editoriais marcados | bloco cruza 88% da viewport             | `translateY(34px)` → posição final                     | 680 ms, `power3.out`, uma vez         | completa após import lazy                        | estado estático completo | estado estático completo            | estado final; módulo não importa   | baixo; transform               | EditorialMotion + ScrollTrigger    |
| A03 | liquid signal do Hero      | scroll do Hero, apenas desktop elegível | `yPercent: 0` → 12 e rotação → -5°                     | scrub 0.6, linear                     | ativo após import lazy                           | estático                 | estático                            | estático; módulo não importa       | baixo; transform               | EditorialMotion + ScrollTrigger    |
| A04 | scribble do Sobre          | path cruza 90%                          | `stroke-dashoffset` total → 0                          | 800 ms, `power2.out`, uma vez         | desenha após import lazy                         | stroke final estático    | stroke final estático               | stroke final; módulo não importa   | baixo; SVG                     | EditorialMotion + ScrollTrigger    |
| A05 | links e CTAs               | hover/focus/pressed                     | cor, fundo, underline, sombra e deslocamento de 1–3 px | 120–260 ms                            | hover/focus                                      | focus/pressed            | pressed                             | instantâneo ou sem deslocamento    | mínimo                         | CSS                                |
| A06 | menu mobile                | clique/Enter/Space, Escape e resize     | painel sólido abre/fecha; foco entra e retorna         | 180–260 ms                            | não aplicável                                    | compacto                 | painel de tela inteira, trap de Tab | transição removida                 | baixo                          | React + CSS                        |
| A07 | estrela 3D                 | capability gate + waypoints semânticos  | posição, rotação, escala e opacidade mudam por seção   | scrub 0.4; render agrupado por RAF    | Hero/Resultados; gutters seguros em telas largas | poster SVG               | poster SVG; nenhum import 3D        | poster SVG                         | alto, isolado e sob demanda    | Three.js + GSAP/ScrollTrigger      |
| A08 | saída/fallback da estrela  | próximo waypoint oculto ou gate falso   | deslocamento scroll-linked → fade → pose oculta        | movimento em 62% da saída; fade final | Hero e Resultados preservados                    | posters locais           | posters locais no fluxo             | sem movimento                      | baixo                          | GSAP + React lazy + CSS            |
| A09 | smooth scroll              | capability gate                         | scroll nativo recebe interpolação leve                 | `lerp: 0.11`; ticker único            | Lenis + GSAP                                     | desativado               | desativado                          | desativado                         | médio, progressivo             | Lenis                              |
| A10 | vídeo de projeto           | clique explícito / fechar               | diálogo nativo monta/desmonta a fonte MP4              | resposta imediata                     | modal                                            | modal                    | modal                               | igual                              | mídia só sob demanda           | React + `<dialog>`                 |
| A11 | troca de idioma            | botão PT/EN/ES                          | conteúdo tipado troca diretamente, sem animar layout   | imediata                              | igual                                            | igual                    | igual                               | igual                              | baixo                          | React                              |
| A12 | foco de teclado            | `:focus-visible`                        | anel duplo Ink + Signal aparece                        | até 120 ms                            | igual                                            | igual                    | igual                               | igual                              | mínimo                         | CSS                                |
| A13 | métricas de Resultados     | seção/valores cruzam 72–84% da viewport | cards entram; 70 e 15 contam uma vez; linha é revelada | 720–900 ms, `power2/3`; uma vez       | após import lazy                                 | valores finais estáticos | valores finais e labels completos   | valores finais; módulo não importa | baixo; transform/opacity/texto | EditorialMotion + ScrollTrigger    |

## Estrela 3D progressiva

### Geometria e reprodução

- estrela de cinco pontas criada por `THREE.Shape` + `ExtrudeGeometry`;
- `src/utils/scroll.ts` fornece o `clamp` usado para manter o canvas dentro da viewport;
- material `MeshPhysicalMaterial` com amarelo-sinal, metalness, roughness e clearcoat;
- luz hemisférica, direcional branca e point light âmbar;
- posters SVG autorais ficam nos slots do Hero e de Resultados antes do WebGL;
- `React.lazy` importa o módulo de cena somente quando o gate aprova;
- o canvas é quadrado, com base responsiva entre 190 e 230 px; a escala do Hero chega a 1,12 e permanece abaixo de 300 px;
- a timeline usa a posição real das seções, não uma divisão uniforme do `scrollHeight`;
- um RAF apenas agrupa atualizações da timeline, resize e retorno de visibilidade; não existe loop contínuo;
- canvas redimensionado por `ResizeObserver` e evento de resize; mudanças de altura do `main`, inclusive após troca de idioma, recompõem os waypoints;
- `devicePixelRatio` limitado a 1.5;
- `visibilitychange` impede render quando a aba está oculta;
- cleanup cancela RAF, listeners e observer, descarta geometrias/materiais/renderer e perde o contexto;
- falha de criação/importação ou `webglcontextlost` remove o estado “ready” e mantém/restaura os posters.

### Capability gate

A cena, `EditorialMotion` com GSAP/ScrollTrigger e o Lenis só são importados quando todas as condições forem verdadeiras:

- largura ≥ 1280 px;
- `pointer: fine`;
- `hover: hover`;
- `prefers-reduced-motion: no-preference`;
- `Save-Data` ausente ou falso;
- contexto WebGL/WebGL2 disponível sem `failIfMajorPerformanceCaveat`;
- `deviceMemory` ausente ou ≥4 GB, quando disponível.

Não usar `display: none` como estratégia mobile: o import e os requests não devem acontecer.

### Mapeamento narrativo

| Waypoint semântico           | Modo                     | Regra de presença                                                                  |
| ---------------------------- | ------------------------ | ---------------------------------------------------------------------------------- |
| `#hero`                      | abertura à direita       | visível em desktop elegível; escala máxima da sequência                            |
| `#about`                     | gutter direito           | somente a partir de 1600 px e se houver estrela + 32 px de respiro fora do texto   |
| `#projects` + cinco projetos | oculto                   | Verithaz, Vira Price, Enriquecimento, EduCore e OpenSource Lab permanecem sem cena |
| `#resultados`                | slot reservado à direita | reaparece sobre o anchor decorativo, sem ocupar o painel de métricas               |
| painel de métricas           | oculto                   | desaparece antes de cruzar números e descrições                                    |
| `#experience`                | gutter direito           | somente a partir de 1700 px e com espaço seguro                                    |
| `#skills`                    | oculto                   | opacidade zero                                                                     |
| `#education`                 | gutter esquerdo          | somente a partir de 1800 px e com espaço seguro                                    |
| `#laboratory`                | oculto                   | opacidade zero                                                                     |
| `#contact`                   | gutter direito           | somente a partir de 1800 px e com espaço seguro                                    |
| `footer`                     | oculto                   | encerra a sequência sem ornamento persistente                                      |

Cada gutter é resolvido a partir do bounding box de um elemento `data-star-safe`. Se a largura livre não comportar o objeto, 32 px de distância do conteúdo e 16 px de borda, a opacidade é forçada a zero. Em cada refresh, o candidato também é comparado com todos os descendentes `data-star-protected` na posição documental do waypoint; qualquer interseção expande a zona proibida em 32 px e oculta a cena.

Na saída de um waypoint visível, a estrela não some imediatamente. Primeiro percorre um deslocamento vertical curto, limitado a 64–96 px e ligado diretamente ao progresso do scroll; rotação e escala acompanham esse trecho linear, que ocupa 62% da transição. O fade acontece nos 38% finais. Só depois a pose oculta é aplicada. Na entrada seguinte, o canvas é posicionado ainda transparente e então revelado, evitando qualquer travessia pela coluna de leitura.

Entre 1280 e 1599 px, a estrela dinâmica fica essencialmente no Hero e no slot de Resultados. Viewports maiores liberam waypoints laterais de forma progressiva. Não há resposta ao ponteiro: a peça conduz a narrativa pelo scroll sem disputar atenção com o cursor.

### Resultados

- os três artigos entram em stagger uma única vez;
- somente os valores documentados `70` e `15` recebem contagem visual;
- “Semanas / Weeks / Semanas” permanece textual, sem número fabricado;
- os valores animados são `aria-hidden`; labels completos e localizados permanecem estáticos para tecnologia assistiva;
- em tablet, mobile, reduced motion ou falha do enhancement, valores e linha já aparecem no estado final.

## Lenis

Lenis faz parte somente da ilha desktop elegível e não roda no mobile. Sua permanência deve ser reavaliada com uma comparação objetiva contra o scroll nativo.

Condições:

- desktop elegível pelo mesmo gate da cena;
- `prefers-reduced-motion: no-preference`;
- `Save-Data` falso;
- nenhuma regressão em teclado, anchors ou scroll restoration;
- sensação mais estável no scroll editorial;
- nenhum aumento perceptível de INP;
- integração por um único RAF/ticker;
- destroy completo no unmount.

Se qualquer condição falhar, manter scroll nativo e o estado editorial estático; nem Lenis nem ScrollTrigger são importados. Não alterar scrollbar, não normalizar touch e não bloquear Home, End, Page Up ou Page Down.

## Reduced motion

Com `prefers-reduced-motion: reduce`:

- `EditorialMotion`, GSAP e ScrollTrigger não são importados;
- A01, A02, A03, A04 e A13 permanecem no estado final estático;
- A03 não deriva;
- A04 não desenha stroke;
- A07/A08 não importam Three.js e mostram poster estático;
- parallax, scrub e qualquer pin são removidos;
- Lenis não é criado;
- menus e controles podem usar transição de opacity de até 120 ms, desde que não cause movimento espacial;
- âncoras usam comportamento instantâneo;
- toda informação continua na mesma ordem e permanece visível.

O media query deve existir também no CSS para proteger a experiência antes da inicialização do JavaScript.

## Performance e instrumentação

Durante QA:

- contar ScrollTriggers ativos e garantir cleanup após remount;
- confirmar ausência de RAF contínuo na cena;
- inspecionar long tasks durante scroll;
- medir FPS em 1440×900 com CPU throttling;
- verificar Network em 320×720, 375×812, 390×844, 768×1024 e 1024×768: zero requests que correspondam a `EditorialMotion`, `motion`, `desktop-scroll`, `lenis`, `DesktopStarScene`, `desktop-3d` ou `three`;
- verificar Network em reduced motion: zero requests desses mesmos chunks;
- checar memória após ida e volta na página;
- registrar LCP e confirmar que os posters de Hero/Resultados antecedem o import 3D;
- manter transform/opacity como propriedades animadas principais;
- evitar blur animado, box-shadow animado e clip-path complexo em grandes superfícies.

O snapshot anterior executou 48 testes em seis projetos/viewports. A matriz atual passou a dez projetos — 320, 375, 390, 768, 1024, 1280, 1366, 1440, 1600 e 1920 px — e ganhou cenários específicos para Resultados, hash/scrollspy, tamanho/oclusão da estrela e resize em torno de 1280 px. A execução integral e as evidências seccionais desta revisão permanecem pendentes até o fechamento da branch.

## QA funcional do movimento

Checklist:

1. a página é completa com JavaScript desativado, exceto controles que dependam justificadamente dele;
2. não existe loader que impeça leitura;
3. a animação de Hero nunca reinicia ao trocar idioma;
4. voltar pelo histórico restaura o scroll sem salto;
5. links de hash pousam com o header compensado por `scroll-margin-top`;
6. foco não é movido por animações;
7. menu fecha com Escape e devolve foco ao acionador;
8. nenhum card muda de tamanho no hover;
9. estrela nunca cobre elementos `data-star-protected` em 1280, 1366, 1440, 1600 ou 1920 px;
10. redimensionamento recalcula a cena sem múltiplos loops;
11. aba oculta pausa qualquer trabalho;
12. mobile, tablet compacto e reduced motion não carregam runtimes de motion/Lenis/Three;
13. não há overflow horizontal em 320–1920 px;
14. a mesma função não é animada simultaneamente por CSS e GSAP;
15. nenhuma dimensão visual depende de um delay artificial para ficar utilizável;
16. `#resultados` funciona por acesso direto, scrollspy e teclado nos três idiomas;
17. a estrela permanece oculta em Projetos, no painel de métricas, em Ferramentas e no Laboratório;
18. gerar e inspecionar 64 screenshots seccionais: oito posições nas seis larguras obrigatórias e também em 1280 e 1600 px.
