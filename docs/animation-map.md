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

| ID  | Elemento                   | Gatilho                                 | Início → fim                                            | Duração / easing                        | Desktop elegível           | Tablet                   | Mobile                              | Reduced motion                   | Custo esperado              | Biblioteca                         |
| --- | -------------------------- | --------------------------------------- | ------------------------------------------------------- | --------------------------------------- | -------------------------- | ------------------------ | ----------------------------------- | -------------------------------- | --------------------------- | ---------------------------------- |
| A01 | composição do Hero         | montagem de `EditorialMotion`           | `translateY(28px)` → posição final, em grupos           | 720 ms, `power3.out`, stagger 80 ms     | completa após import lazy  | estado estático completo | estado estático completo            | estado final; módulo não importa | baixo; transform            | EditorialMotion + GSAP + `useGSAP` |
| A02 | blocos editoriais marcados | bloco cruza 88% da viewport             | `translateY(34px)` → posição final                      | 680 ms, `power3.out`, uma vez           | completa após import lazy  | estado estático completo | estado estático completo            | estado final; módulo não importa | baixo; transform            | EditorialMotion + ScrollTrigger    |
| A03 | liquid signal do Hero      | scroll do Hero, apenas desktop elegível | `yPercent: 0` → 12 e rotação → -5°                      | scrub 0.6, linear                       | ativo após import lazy     | estático                 | estático                            | estático; módulo não importa     | baixo; transform            | EditorialMotion + ScrollTrigger    |
| A04 | scribble do Sobre          | path cruza 90%                          | `stroke-dashoffset` total → 0                           | 800 ms, `power2.out`, uma vez           | desenha após import lazy   | stroke final estático    | stroke final estático               | stroke final; módulo não importa | baixo; SVG                  | EditorialMotion + ScrollTrigger    |
| A05 | links e CTAs               | hover/focus/pressed                     | cor, fundo, underline, sombra e deslocamento de 1–3 px  | 120–260 ms                              | hover/focus                | focus/pressed            | pressed                             | instantâneo ou sem deslocamento  | mínimo                      | CSS                                |
| A06 | menu mobile                | clique/Enter/Space, Escape e resize     | painel sólido abre/fecha; foco entra e retorna          | 180–260 ms                              | não aplicável              | compacto                 | painel de tela inteira, trap de Tab | transição removida               | baixo                       | React + CSS                        |
| A07 | estrela 3D                 | capability gate + scroll/resize/pointer | posição Y, rotação XYZ, escala e luz seguem progresso   | um RAF somente para agrupar cada evento | Three.js no gutter direito | poster SVG               | poster SVG; nenhum import 3D        | poster SVG                       | alto, isolado e sob demanda | Three.js direto                    |
| A08 | fallback da estrela        | antes do WebGL, falha ou gate falso     | poster SVG → canvas somente após primeiro render válido | 280 ms                                  | crossfade curto            | poster                   | poster integrado ao Hero            | sem crossfade                    | baixo                       | React lazy + CSS                   |
| A09 | smooth scroll              | capability gate                         | scroll nativo recebe interpolação leve                  | `lerp: 0.11`; ticker único              | Lenis + GSAP               | desativado               | desativado                          | desativado                       | médio, progressivo          | Lenis                              |
| A10 | vídeo de projeto           | clique explícito / fechar               | diálogo nativo monta/desmonta a fonte MP4               | resposta imediata                       | modal                      | modal                    | modal                               | igual                            | mídia só sob demanda        | React + `<dialog>`                 |
| A11 | troca de idioma            | botão PT/EN/ES                          | conteúdo tipado troca diretamente, sem animar layout    | imediata                                | igual                      | igual                    | igual                               | igual                            | baixo                       | React                              |
| A12 | foco de teclado            | `:focus-visible`                        | anel duplo Ink + Signal aparece                         | até 120 ms                              | igual                      | igual                    | igual                               | igual                            | mínimo                      | CSS                                |

## Estrela 3D progressiva

### Geometria e reprodução

- estrela de cinco pontas criada por `THREE.Shape` + `ExtrudeGeometry`;
- `src/utils/scroll.ts` fornece clamp, mapeamento e interpolação do progresso, com cobertura unitária;
- material `MeshPhysicalMaterial` com amarelo-sinal, metalness, roughness e clearcoat;
- luz hemisférica, direcional branca e point light âmbar;
- poster SVG autoral sempre disponível antes do WebGL;
- `React.lazy` importa o módulo de cena somente quando o gate aprova;
- um RAF apenas agrupa eventos de scroll, resize, pointer e visibility; não existe loop contínuo;
- canvas redimensionado por `ResizeObserver` e evento de resize;
- `devicePixelRatio` limitado a 1.5;
- `visibilitychange` impede render quando a aba está oculta;
- cleanup cancela RAF, listeners e observer, descarta geometrias/materiais/renderer e perde o contexto;
- falha de criação ou importação mantém o poster.

### Capability gate

A cena, `EditorialMotion` com GSAP/ScrollTrigger e o Lenis só são importados quando todas as condições forem verdadeiras:

- largura ≥ 1280 px;
- `pointer: fine`;
- `hover: hover`;
- `prefers-reduced-motion: no-preference`;
- `Save-Data` ausente ou falso;
- `deviceMemory` ausente ou ≥4 GB, quando disponível.

Não usar `display: none` como estratégia mobile: o import e os requests não devem acontecer.

### Mapeamento narrativo

| Progresso | Posição no gutter | Rotação                              |      Escala | Papel narrativo      |
| --------: | ----------------- | ------------------------------------ | ----------: | -------------------- |
|      0.00 | topo direito      | X 0.24 / Y -0.38 / Z 0               |        0.88 | curiosidade/sinal    |
|      0.50 | centro direito    | rotações interpoladas pelo progresso | 0.835–0.925 | trabalho em curso    |
|      1.00 | base direita      | X +0.68π / Y +1.05π / Z +2.2π        |        0.88 | entrega/encerramento |

O pointer altera levemente a rotação e a luz, sem transformar a peça em controle. O objeto permanece no gutter e nunca atravessa a coluna de leitura.

## Lenis

Lenis não faz parte do baseline e não roda no mobile. Pode ser ativado somente depois de uma comparação objetiva com scroll nativo.

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
- A01, A02, A03 e A04 permanecem no estado final estático;
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
- verificar Network em 320×720, 375×812, 390×844 e 768×1024: zero requests que correspondam a `EditorialMotion`, `motion`, `desktop-scroll`, `lenis`, `DesktopStarScene`, `desktop-3d` ou `three`;
- verificar Network em reduced motion: zero requests desses mesmos chunks;
- checar memória após ida e volta na página;
- registrar LCP e confirmar que o poster antecede o import 3D;
- manter transform/opacity como propriedades animadas principais;
- evitar blur animado, box-shadow animado e clip-path complexo em grandes superfícies.

Evidência final: a matriz Playwright executou 48 testes em seis projetos/viewports; 40 passaram, 8 foram ignorados intencionalmente por contexto de viewport e nenhum falhou. As asserções de rede incluem `EditorialMotion`/`motion`, Lenis e Three.js.

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
9. estrela nunca cobre texto em 1280, 1440, 1600 ou 1920 px;
10. redimensionamento recalcula a cena sem múltiplos loops;
11. aba oculta pausa qualquer trabalho;
12. mobile, tablet compacto e reduced motion não carregam runtimes de motion/Lenis/Three;
13. não há overflow horizontal em 320–1920 px;
14. a mesma função não é animada simultaneamente por CSS e GSAP;
15. nenhuma dimensão visual depende de um delay artificial para ficar utilizável.
