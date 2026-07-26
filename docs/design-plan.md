# Plano de design — Portfolio Omar Saliba

## Decisão de direção

Nome de trabalho: **SIGNAL / SELECTED WORK**.

O redesign adota a tese **Liquid Editorial Y2K / Creative Software Collage**, mas a traduz para uma linguagem própria baseada em **amarelo-sinal, preto-tinta, branco-papel e cinzas gráficos**. Magenta, rosa, roxo e ciano deixam de ser a assinatura. O amarelo não entra como “cor alegre” genérica: ele representa seleção, energia, aviso, execução, realce de código e uma ideia que saiu do rascunho e passou a funcionar.

A composição deve parecer uma revista técnica sendo manipulada dentro de um software criativo:

- estrutura editorial rigorosa no centro;
- ferramentas, cursores, medições e objetos nos gutters;
- papel, grão e rabiscos como camada humana;
- janelas de sistema como recipientes de informação curta;
- um objeto-estrela procedural em 3D progressivo, com poster SVG como baseline;
- movimento que explica seleção, progresso e relação entre blocos;
- nenhuma reminiscência do tema aquático legado.

O resultado não é uma colagem aleatória de tendências. Tudo pertence ao mesmo sistema semântico:

- **preto** = base, código, precisão;
- **papel** = narrativa e leitura;
- **amarelo** = sinal, seleção e ação;
- **cinza/cromo** = interface, matéria e profundidade;
- **bounding box** = trabalho em construção;
- **rabisco** = raciocínio e autoria;
- **papel rasgado** = mudança de capítulo;
- **janela de sistema** = dado objetivo;
- **estrela** = curiosidade, experimentação e entrega.

## Teses

### Tese visual

**“Engenharia em modo de edição.”**

Uma página editorial de alto contraste em que projetos, experiências e conhecimentos aparecem como peças selecionadas, anotadas e organizadas por alguém que constrói software. A superfície é tátil e imperfeita; a hierarquia e o grid são precisos.

Os liquid gradients deixam de sugerir água. Eles devem parecer **metal aquecido, tinta gráfica e luz amarela difusa**, compostos por amarelo, âmbar, grafite, prata e papel. O tratamento usa blobs recortados, máscaras e granulação; nunca uma onda azul de fundo.

### Tese narrativa

A navegação conta uma progressão simples:

1. **Sinal** — quem é Omar e qual direção profissional busca;
2. **Contexto** — IA, dados, automação e engenharia de software;
3. **Provas** — projetos reais e seus artefatos;
4. **Trajetória** — experiências e responsabilidades;
5. **Ferramentas** — capacidades, tecnologias e formas de trabalhar;
6. **Formação** — educação, certificações e idiomas;
7. **Laboratório** — Power BI, artigos, Behance e experimentos existentes;
8. **Contato** — meios reais de conversar e acessar os currículos.

O conteúdo deve vir dos arquivos existentes no repositório. Não serão criadas métricas, cargos, datas, clientes, depoimentos ou resultados inexistentes. Conflitos entre o HTML legado e os currículos atualizados devem ser resolvidos a favor da fonte mais recente, com revisão humana antes da publicação.

### Tese de interação

**“Selecionar, inspecionar, avançar.”**

Ao rolar, o visitante sente que uma composição está sendo montada: títulos ganham handles, anotações são traçadas, recortes entram em registro e a estrela muda de quadro. O movimento dá contexto e conduz o olhar; não interrompe o scroll nativo nem transforma toda ação em espetáculo.

Princípios:

- resposta direta em 120–260 ms para controles;
- entradas editoriais em 420–700 ms;
- scroll-linked somente para elementos espaciais;
- no máximo dois sistemas de scrub simultâneos;
- texto nunca depende de animação para ser lido;
- nenhum autoplay de rotação decorativa infinita;
- hover melhora a leitura, mas nunca revela conteúdo exclusivo;
- `prefers-reduced-motion`, `Save-Data` e dispositivos móveis recebem uma composição completa e estática.

## Fontes de direção

Os screenshots enviados orientam a linguagem de bounding boxes, handles, liquid gradients, rabiscos, iOS/macOS cues, papel rasgado, grão e tipografia condensada. Eles são referência de princípios, não assets para copiar.

O site da [Studio Freight](https://studiofreight.com/work/studio-freight) orienta o uso de espaço, ritmo editorial, artefatos laterais e uma linguagem gráfica com narrativa própria. A adaptação aqui evita qualquer cópia de marca, ilustração, asset ou transição proprietária.

[Lenis](https://www.lenis.dev/) e [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) são referências para sincronização de scroll e motion. Lenis é opcional e condicionado a benefício mensurável; ScrollTrigger não autoriza scroll-jacking, pins longos ou uma página que só funcione animada.

## Arquitetura de informação

### 1. Cabeçalho

- wordmark “OMAR / SELECTED WORK”;
- links âncora para Trabalho, Experiência, Sobre e Contato;
- seletor de idioma PT/EN/ES preservando o comportamento atual;
- indicador curto de disponibilidade apenas se houver informação verdadeira;
- botão de contato com texto explícito, sem ícone isolado.

No desktop o cabeçalho é uma faixa editorial fina. No mobile, uma barra compacta com menu em painel sólido; não usar hamburger flutuante de glassmorphism.

### 2. Hero — “Sinal”

- nome;
- direção profissional em uma frase curta baseada no conteúdo real;
- linha de áreas: IA, automação, dados e desenvolvimento;
- CTA primário para projetos;
- CTA secundário para contato;
- downloads dos currículos PT-BR e EN;
- estrela 3D progressiva no gutter;
- um único título com bounding box;
- um status card de sistema com informação objetiva.

O texto é a primeira camada visual. A estrela nunca cruza o parágrafo nem se torna o “produto”.

### 3. Sobre — “Contexto”

- apresentação existente, reescrita apenas para clareza;
- formação técnica e graduação atual;
- interesses profissionais;
- links sociais reais;
- colagem leve com recorte de papel e anotação manual.

### 4. Projetos em destaque — “Provas”

Preservar e revisar os projetos encontrados:

- Automação de Enriquecimento de Leads;
- Sistema de Reservas para Restaurantes;
- OpenSource Lab;
- EduCore;
- FinCore.

Não manter cards vazios ou “Projeto 06”. Cada projeto real recebe:

- índice;
- título;
- resumo;
- tecnologias confirmadas;
- mídia existente;
- link GitHub quando existente;
- link de demonstração quando existente;
- estado honesto de indisponibilidade quando necessário.

O primeiro projeto pode ocupar uma composição editorial ampla. Os demais alternam texto e mídia, sem uma grade de seis cards idênticos.

### 5. Experiência — “Trajetória”

- linha vertical de registro, não uma timeline corporativa genérica;
- cargos, organizações e descrições confirmados;
- OneBox/DNE e demais experiências devem refletir a versão mais recente do currículo;
- cada item recebe período somente se a fonte indicar;
- tecnologias entram como nota marginal, não como dezenas de pills.

### 6. Capacidades — “Ferramentas”

Agrupar tecnologias existentes por função, não por logo:

- IA e automação;
- back-end e APIs;
- dados e bancos;
- front-end;
- cloud e entrega.

Os grupos devem ser derivados do conteúdo confirmado. Um diagrama editorial pode substituir a “nuvem de badges”.

### 7. Formação — “Base”

- Instituto Mauá de Tecnologia;
- Senac Aclimação;
- certificações existentes;
- idiomas e níveis existentes.

As barras de idioma não devem sugerir precisão falsa. Preferir rótulos textuais (Nativo, B2, A2–B1, A1) com uma escala visual discreta e acessível.

### 8. Laboratório / Power BI / Artigos

- Behance;
- pasta de artigos no Drive;
- experimentos e mídia que já existirem;
- nenhum conteúdo “em breve” sem utilidade.

### 9. Contato

- frase de fechamento;
- e-mail somente se confirmado no repositório/currículo;
- GitHub, LinkedIn e WhatsApp existentes;
- downloads de currículo;
- painel autoral inspirado em notificação de sistema, sem copiar interface Apple.

### 10. Footer

- nome;
- ano dinâmico;
- direitos;
- atalho para o topo;
- nota de construção curta, se fizer sentido;
- nenhum footer corporativo em quatro colunas.

## Estratégia de layout

### Grid-base

- shell máximo: `1600px`;
- coluna de leitura: `min(860px, calc(100vw - 48px))`;
- grid desktop: 12 colunas;
- conteúdo central: 6–8 colunas, conforme seção;
- gutters laterais: espaço de arte, nunca de conteúdo essencial;
- baseline de espaçamento: 4 px;
- seções com ritmo variável: 96, 128 ou 160 px, não o mesmo padding repetido.

### Desktop — 1280 px ou mais

- coluna editorial central entre 780 e 900 px;
- gutters com estrela, medidores, recortes e janelas pequenas;
- hero com altura mínima entre 760 e 900 px, sem forçar `100vh` em telas baixas;
- projetos alternam `7/5`, `5/7` e faixa total;
- nenhum trecho pinned; a estrela responde ao progresso total sem reter o visitante;
- elementos laterais podem ultrapassar o container, mas ficam dentro de `overflow: clip`;
- nenhuma informação indispensável além da largura central;
- alvo de teste: 1440×900 e 1920×1080.

### Tablet — 768 a 1279 px

- grid de 8 colunas;
- coluna de leitura de 6–8 colunas;
- estrela vira poster SVG estático em tablets, sem runtime WebGL;
- gutters menores; objetos decorativos migram para faixas entre seções;
- projetos ficam em uma coluna com mídia de proporção controlada;
- cabeçalho reduz a quantidade de links visíveis;
- evitar painéis sobrepostos e qualquer pin;
- alvo de teste: 768×1024 e 1024×1366.

### Mobile — 320 a 767 px

Mobile é outra composição, não desktop comprimido:

- uma coluna;
- gutter externo de 16 px em 320–375 px e 20 px em 390–430 px;
- tipografia fluida sem palavras cortadas;
- hero com `min-height: 100svh` e respeito a `safe-area-inset-*`;
- estrela em SVG/AVIF estática, já integrada à colagem;
- sem EditorialMotion/GSAP, ScrollTrigger, Three.js, WebGL, sequência de frames, Lenis, parallax ou pin;
- projeto em blocos verticais com ordem texto → mídia → links;
- painéis de sistema no fluxo, não flutuando sobre o conteúdo;
- papel rasgado vira divisor horizontal leve;
- bounding box usa quatro handles, sem etiquetas de medida muito pequenas;
- navegação por toque, alvos mínimos de 44×44 px;
- nenhuma ação depende de hover;
- imagens com `width` e `height`, `loading="lazy"` fora do primeiro viewport;
- `overflow-x: clip`, mas correção da causa de qualquer overflow;
- alvos de teste: 320, 360, 375, 390 e 430 px.

## Sistema tipográfico

### Família

- **Display e texto:** Bricolage Grotesque Variable, eixo de peso 200–800, SIL OFL 1.1;
- **Mono:** IBM Plex Mono, pesos 400/500, SIL OFL 1.1.

As fontes são instaladas por `@fontsource`, servidas localmente e usam `font-display: swap`. A mesma família variável assume display e leitura, reduzindo arquivos sem perder contraste: peso, escala, caixa e espaçamento distinguem os papéis. O subset latino é o caminho efetivamente carregado para PT/EN/ES.

### Papéis tipográficos

- display XXL: Bricolage Grotesque 760, `clamp(4.2rem, 12vw, 11.5rem)`, line-height 0.82;
- display XL: Bricolage Grotesque 680, `clamp(3.25rem, 8vw, 7.75rem)`, line-height 0.86;
- título de projeto: Bricolage Grotesque 700, `clamp(2rem, 4vw, 4.5rem)`, line-height 0.96;
- lead: Bricolage Grotesque 430, `clamp(1.2rem, 1.4vw + 0.9rem, 1.75rem)`, line-height 1.35;
- corpo: Bricolage Grotesque 430, `clamp(1rem, 0.3vw + 0.94rem, 1.125rem)`, line-height 1.58;
- label: IBM Plex Mono 500, 11–13 px, uppercase, tracking 0.08em;
- nota técnica: IBM Plex Mono 400, 12–14 px, line-height 1.45.

Regras:

- evitar parágrafos centralizados;
- limitar texto corrido a 62–72 caracteres;
- amarelo nunca é cor de texto longo em fundo claro;
- itálico somente em uma palavra editorial ou citação curta;
- labels mono não podem carregar informação principal em 10 px;
- títulos condensados precisam de alternativa de quebra manual por idioma.

## Paleta e superfícies

Paleta principal:

- Ink `#0A0A08`;
- Near Black `#141412`;
- Graphite `#24241F`;
- Gray 700 `#45453F`;
- Gray 500 `#77776E`;
- Gray 300 `#B8B8AE`;
- Paper `#F4F1E8`;
- White `#FFFDF7`;
- Signal Yellow `#FFD400`;
- Amber `#FFB800`;
- Pale Yellow `#FFF1A6`;
- Focus Black `#000000`.

Aplicação:

- 50–60% preto/grafite;
- 25–35% papel/branco;
- 8–15% amarelo/âmbar;
- cinzas para hierarquia, linha e chrome;
- nenhum magenta dominante;
- não usar roxo, azul ou ciano como “escape” para um gradiente genérico.

Combinações seguras:

- Ink em Paper;
- Paper em Ink;
- Ink em Signal Yellow;
- Signal Yellow em Ink para texto grande, ícone ou linha;
- Gray 700 em Paper para texto secundário, após validação de contraste.

Combinações proibidas:

- branco em amarelo;
- amarelo para corpo em branco;
- cinza médio pequeno em fundo preto;
- gradiente atrás de parágrafo sem superfície sólida;
- toda seção com fundo amarelo.

## Elementos gráficos

### Liquid gradient reinterpretado

- aparência: metal aquecido/tinta luminosa, não água;
- cores: `#FFD400`, `#FFB800`, `#FFF1A6`, `#77776E`, `#24241F`;
- construção: 3–5 radial gradients pré-compostos, máscara irregular e grain estático;
- aplicação: um recorte no Hero, fundo de uma mídia de projeto e fecho de Contato;
- movimento: deslocamento de `transform` e `background-position` muito lento;
- nunca cobrir a página inteira;
- nunca usar `feTurbulence` animado em tela cheia.

### Bounding boxes

`BoundingBoxFrame` terá:

- linha de 1 px;
- quatro handles de 8 px; handles intermediários apenas no desktop;
- etiqueta mono opcional;
- dimensões opcionais;
- cursor decorativo opcional;
- variantes ink, paper e signal;
- estado `selected` somente quando houver seleção visual real;
- `aria-hidden` e `pointer-events: none` quando decorativo.

Uso máximo recomendado: hero, um projeto em destaque e um estado selecionado por vez.

### iOS/macOS cues

Componentes autorais:

- `SystemNotice` para disponibilidade ou contato;
- `InspectorPanel` para tecnologias de um projeto;
- `ContextActions` para links reais;
- `WindowPreview` para mídia;
- `StatusMeter` para idioma ou progresso editorial.

Eles usam chrome neutro, window dots monocromáticos, blur moderado e sombra precisa. Não copiar nomenclatura, ícones, proporções ou assets proprietários da Apple. Elementos que parecem controles devem ser controles de verdade; painéis decorativos não recebem affordance falsa.

### Scribbles

Pacote pequeno de SVGs autorais:

- seta curta;
- círculo imperfeito;
- sublinhado duplo;
- estrela de quatro pontas;
- três motion lines;
- marca de revisão.

Traço de 1.5–2.5 px, `currentColor`, `vector-effect="non-scaling-stroke"`. Usar no máximo dois rabiscos por viewport. Somente 2 ou 3 instâncias em toda a página recebem desenho por `stroke-dashoffset`.

### Torn paper

- divisor SVG/mask repetível de 12–24 KB;
- variantes Paper sobre Ink, Ink sobre Paper e Signal sobre Ink;
- textura monocromática para aceitar `currentColor`/mask;
- uma borda rasgada por grande mudança de capítulo;
- não usar em todo card;
- preservar um recorte limpo na área de texto.

### Estrela 3D progressiva

A auditoria confirmou que o repositório não possuía sequência de frames, GLB ou fonte 3D reutilizável. Para entregar um resultado funcional imediatamente sem fabricar 60–120 imagens pesadas, a implementação final usa:

1. estrela procedural de cinco pontas com `ExtrudeGeometry`;
2. material físico metálico amarelo, clearcoat e luzes branca/âmbar;
3. Three.js direto, sem React Three Fiber ou Drei;
4. importação dinâmica apenas após o capability gate;
5. renderer orientado por eventos: renderiza em scroll, resize, pointer e retorno da aba, sem loop infinito;
6. `devicePixelRatio` limitado a 1.5 e descarte explícito de geometria, materiais, renderer e contexto;
7. poster SVG cromado como baseline, fallback de erro, tablet, mobile, Save-Data e reduced motion.

O canvas é fixo no gutter direito, não recebe eventos e mapeia o progresso total do documento para posição Y, rotação XYZ, escala e luz. Ele nunca cruza a coluna de leitura. O chunk Three.js fica separado e não é solicitado pelo caminho mobile; a decisão pode ser reavaliada no futuro se uma sequência offline medida ficar menor que o chunk dinâmico.

## Componentes propostos

- `AppShell`;
- `SiteHeader`;
- `MobileNavigation`;
- `LanguageSwitcher`;
- `Hero`;
- `SectionIndex`;
- `SectionHeading`;
- `ProjectFeature`;
- `ProjectListItem`;
- `ProjectMedia`;
- `ExperienceLedger`;
- `CapabilityDiagram`;
- `EducationRecord`;
- `LabLinks`;
- `ContactCTA`;
- `SiteFooter`;
- `BoundingBoxFrame`;
- `SystemNotice`;
- `InspectorPanel`;
- `WindowPreview`;
- `StatusMeter`;
- `TornPaperDivider`;
- `Scribble`;
- `LiquidSignalBackdrop`;
- `NoiseOverlay`;
- `DesktopStarScene`;
- `StarPoster`.

Não criar componente para cada `div`. Gráficos decorativos devem receber dados simples ou variantes limitadas, não uma API de design system superabstrata.

## Estratégia CSS e implementação visual

Escolha: **CSS Modules + CSS custom properties + quatro folhas globais pequenas** (`reset`, `tokens`, `typography`, `globals`).

Justificativa:

- a identidade depende de masks, pseudo-elementos, media queries, selectors de reduced motion e layout editorial específico;
- CSS Modules mantém escopo próximo ao componente sem adicionar runtime;
- custom properties mantêm DNA e theming de superfícies;
- evita misturar Tailwind, CSS inline, styled-components e arquivos globais gigantes;
- componentes adaptados de qualquer referência devem ser reescritos dentro deste sistema.

## Sistema de movimento

Bibliotecas:

- GSAP + `@gsap/react` para timelines editoriais e ScrollTrigger, dentro de `EditorialMotion` lazy;
- CSS transitions/keyframes para controles e microinterações;
- Lenis somente como progressive enhancement em desktop elegível;
- nenhuma necessidade inicial de Anime.js;
- Three.js direto apenas no módulo desktop isolado;
- SVG estático como experiência padrão e fallback.

Regras:

- `EditorialMotion`, GSAP, ScrollTrigger, Lenis e Three.js compartilham o capability gate ≥1280 px;
- `useGSAP` com scope na raiz da aplicação;
- `contextSafe` em callbacks;
- limpeza automática de timelines e ScrollTriggers;
- nenhum import de EditorialMotion/GSAP/ScrollTrigger em tablet, mobile ou reduced motion;
- cálculo de progresso fora de React state;
- RAF somente para agrupar eventos que realmente pedem novo frame;
- `ResizeObserver` para redimensionar o canvas;
- `devicePixelRatio` máximo de 1.5 no canvas;
- pin ausente por padrão; qualquer pin aprovado deve ser curto e removido no tablet/mobile;
- Lenis desativado em reduced motion, `Save-Data`, touch primário e hardware fraco;
- links de hash, teclado, Home/End/Page Up/Page Down e scroll restoration continuam nativos.

O mapa detalhado está em `docs/animation-map.md`.

## Performance

Orçamentos iniciais:

- JS inicial próprio + React, gzip: alvo ≤ 170 KB;
- chunk GSAP/scroll: alvo ≤ 80 KB gzip, lazy e exclusivo do desktop elegível;
- nenhuma dependência GSAP/ScrollTrigger/Lenis/Three/R3F no bundle mobile ou no caminho padrão;
- poster SVG: inline, sem request de mídia;
- chunk Three.js desktop: isolado e solicitado somente após o capability gate;
- cada textura repetível: ≤ 32 KB;
- fontes WOFF2 usadas no primeiro viewport: ≤ 140 KB total;
- LCP: ≤ 2.5 s;
- CLS: < 0.1;
- INP: < 200 ms.

Estratégia:

- conteúdo e poster SVG renderizam antes do WebGL;
- dynamic import de `EditorialMotion`, GSAP/ScrollTrigger, Lenis e Three.js somente no desktop elegível;
- renderização event-driven, sem RAF contínuo;
- não renderizar enquanto `document.hidden`;
- destruir contexto e recursos no unmount ou quando o gate deixa de ser atendido;
- AVIF/WebP com fallback e dimensões declaradas;
- `content-visibility: auto` em seções longas, validando foco e anchors;
- noise como textura estática, não filtro recalculado;
- sem blur grande em várias camadas;
- animações limitadas a `transform`, `opacity`, clip/mask já rasterizada;
- respeitar `navigator.connection.saveData` quando disponível.

## Acessibilidade

- landmarks semânticos: `header`, `nav`, `main`, `section`, `footer`;
- um único `h1`, hierarquia de títulos sequencial;
- skip link visível ao foco;
- foco de 3 px com contraste duplo (`Signal Yellow` + `Ink`);
- links sempre reconhecíveis por texto, sublinhado ou tratamento persistente;
- targets mínimos de 44×44 px;
- todos os vídeos com título; sem autoplay sonoro;
- texto de projeto permanece no DOM fora de canvas;
- canvas/estrela, textura, handles e rabiscos decorativos com `aria-hidden="true"`;
- nenhum controle falso inspirado em iOS/macOS;
- estado ativo indicado por texto/forma, não só por amarelo;
- alt text contextual para mídia de projeto;
- seletor de idioma operável por teclado e com rótulo explícito;
- mensagens de formulário/ação em região viva somente se houver interação real;
- contraste WCAG AA: 4.5:1 para corpo e 3:1 para texto grande;
- zoom a 200% sem perda de conteúdo;
- reflow a 320 CSS px;
- `prefers-reduced-motion: reduce` remove scrub, parallax, pin, desenho de stroke e smooth scroll, mostrando todos os estados finais.

## Riscos e mitigação

| Risco                                      | Impacto                   | Mitigação                                                                        |
| ------------------------------------------ | ------------------------- | -------------------------------------------------------------------------------- |
| Amarelo dominar e cansar                   | leitura agressiva         | limitar a 8–15% da superfície e alternar Ink/Paper                               |
| Colagem virar ruído                        | hierarquia perdida        | conteúdo central rígido, dois adornos por viewport e checklist de remoção        |
| Cues de sistema parecerem controles falsos | confusão                  | affordance somente em elementos interativos; decoração sem hover/cursor          |
| Chunk Three.js pesado                      | rede e memória no desktop | poster primeiro, chunk separado, capability gate estrito e nenhum request mobile |
| Fontes condensadas quebrarem idiomas       | overflow                  | quebras editoriais por locale, `clamp`, testes PT/EN/ES                          |
| Grain reduzir legibilidade                 | contraste e fadiga        | não aplicar sobre texto; opacidade máxima definida em tokens                     |
| ScrollTrigger duplicar no StrictMode       | bugs                      | `useGSAP`, scope, cleanup e testes de remount                                    |
| Lenis afetar acessibilidade                | navegação ruim            | progressive enhancement estrito e scroll nativo como baseline                    |
| Conteúdo legado divergir do currículo      | informação incorreta      | inventário tipado e validação contra a fonte mais recente                        |
| “AI slop” reaparecer                       | identidade genérica       | auditoria específica de pills, cards repetidos, glow, glass e gradiente roxo     |

## GStack inicial

Esta avaliação mede o legado atual como ponto de partida e define a barra do redesign. Nenhum alvo fica abaixo de 8. A revisão deve ser repetida sobre screenshots reais após a implementação.

| Dimensão            | Base observada /10 | Diagnóstico                                       | Ação obrigatória                                                           | Alvo |
| ------------------- | -----------------: | ------------------------------------------------- | -------------------------------------------------------------------------- | ---: |
| Hierarquia          |                5.0 | seções e cards têm peso semelhante                | hero claro, projetos em ritmos diferentes, índices editoriais              |  9.0 |
| Tipografia          |                4.0 | sistema atual genérico e escala limitada          | Bricolage Grotesque + IBM Plex Mono, escala e largura de leitura definidas |  9.0 |
| Paleta              |                3.5 | azul aquático domina                              | sistema Ink/Paper/Signal com uso percentual e contraste                    |  9.2 |
| Composição          |                4.5 | grid previsível e centrado                        | coluna editorial + gutters + alternância de projetos                       |  8.8 |
| Clareza             |                6.0 | conteúdo existe, mas é denso e pouco priorizado   | narrativa Sinal → Provas → Trajetória e copy enxuta                        |  9.0 |
| Originalidade       |                4.0 | estética aquática comum                           | software collage autoral, amarelo-sinal e artefatos próprios               |  9.2 |
| Consistência        |                5.0 | componentes e detalhes competem                   | tokens, variantes limitadas e regras de densidade                          |  9.0 |
| Responsividade      |                5.5 | versão responsiva é adaptação do mesmo layout     | composições desktop/tablet/mobile explícitas                               |  8.8 |
| Mobile              |                5.0 | pouco tratamento específico                       | fluxo próprio, sem 3D, touch e safe areas                                  |  9.0 |
| Acessibilidade      |                5.5 | sem sistema completo de foco/reduced motion       | baseline semântico, AA, teclado e motion alternativo                       |  9.0 |
| Microinterações     |                4.5 | feedback limitado e sem linguagem única           | tokens 120–260 ms e estados claros                                         |  8.7 |
| Motion design       |                4.0 | loader longo, bolhas e scroll decorativo          | motion com função, mapa e orçamento de simultaneidade                      |  9.0 |
| Performance         |                5.5 | scripts globais e efeitos de scroll sem orçamento | progressive enhancement, chunks e budgets mensuráveis                      |  8.8 |
| Personalidade       |                5.0 | conteúdo pessoal, apresentação genérica           | tese “Engenharia em modo de edição” consistente                            |  9.3 |
| Ausência de AI slop |                5.0 | cards e glass seguem padrões comuns               | assimetria controlada, menos pills/glow, auditoria visual                  |  9.2 |

### Gate para aprovação ≥ 8

Antes de considerar a direção pronta:

1. gerar screenshots em 320×720, 375×812, 390×844, 768×1024, 1440×900 e 1920×1080;
2. validar que cada viewport possui um foco dominante;
3. remover qualquer ornamento que não comunique seleção, processo ou autoria;
4. verificar que o amarelo não excede aproximadamente 15% da área percebida;
5. validar que projetos não repetem o mesmo template;
6. comprovar via Network que mobile/tablet/reduced motion não baixam `EditorialMotion`, `motion`, `desktop-scroll`, Lenis, `DesktopStarScene`, `desktop-3d` nem Three.js;
7. testar reduced motion com todos os conteúdos visíveis;
8. testar teclado, foco, zoom e 320 px;
9. medir bundle, LCP, CLS e INP;
10. repetir a matriz GStack e corrigir qualquer nota abaixo de 8 antes do aceite.

## Critérios visuais de rejeição

Rejeitar a implementação se houver:

- tema aquático, bolhas ou ondas;
- azul/ciano, magenta ou roxo como cor dominante;
- glow neon genérico;
- gradiente roxo-azul;
- card SaaS repetido;
- excesso de pills;
- excesso de glassmorphism;
- texto centralizado em blocos longos;
- borda arredondada igual em tudo;
- estrela parecendo emoji;
- iOS/macOS copiado literalmente;
- rabiscos infantis ou em toda seção;
- ruído sobre texto;
- cursor customizado que substitui o nativo;
- loader obrigatório longo;
- autoplay contínuo de objetos;
- WebGL ou sequência no mobile;
- conteúdo essencial fora do DOM;
- títulos cortados em PT, EN ou ES.
