# Relatório de migração

Data da reconstrução-base: 25/07/2026

Revisão cirúrgica: 25/07/2026

Origem: portfólio estático em HTML, CSS e JavaScript.

Destino: React 19 + Vite 8 + TypeScript 5.9.

Branch de trabalho atual: `feat/fix-scroll-star-and-results`.

## Resultado da reconstrução

O portfólio foi reconstruído como uma aplicação React de página única, com conteúdo trilíngue tipado, CSS modular, componentes semânticos, testes automatizados, assets públicos organizados e build de produção.

A mudança substitui a linguagem aquática anterior por **Signal / Selected Work**, uma direção editorial em amarelo-sinal, preto-tinta, branco-papel e cinzas. Motion e 3D passaram a ser melhorias progressivas: a leitura, os links e a composição principal não dependem deles.

## Antes e depois

| Área       | Legado                                           | Nova arquitetura                                                    |
| ---------- | ------------------------------------------------ | ------------------------------------------------------------------- |
| Entrada    | HTML monolítico                                  | `index.html` mínimo + `src/main.tsx`                                |
| UI         | DOM estático                                     | componentes React                                                   |
| Conteúdo   | duplicado entre HTML e dicionários JS            | `src/data/portfolio.ts` tipado                                      |
| Idiomas    | mutação de `innerHTML`                           | Context API e render React PT/EN/ES                                 |
| Estilos    | uma folha global extensa                         | reset, tokens, tipografia, globals e CSS Modules                    |
| Motion     | loader, bolhas e efeitos contínuos               | GSAP com scope, reduced motion e cleanup                            |
| 3D         | dependência não utilizada                        | ilha Three.js lazy-loaded e condicionada                            |
| Scroll     | listeners e blur a cada evento                   | nativo por padrão; Lenis opcional no desktop                        |
| Projetos   | cards repetidos, embeds/autoplay e placeholder   | cinco composições reais, links honestos e vídeo sob demanda         |
| Resultados | não existia capítulo de impacto navegável        | seção `#resultados` tipada, trilíngue e semanticamente independente |
| Qualidade  | sem lint, types ou testes                        | ESLint, TypeScript, Vitest e Playwright                             |
| Deploy     | arquivos estáticos sem configuração reproduzível | build `dist` + fallback SPA para Vercel                             |

## Conteúdo preservado e seleção atual

- nome, posicionamento profissional e contatos;
- formação no Senac Aclimação e Instituto Mauá de Tecnologia;
- certificações e níveis de idioma;
- seleção atual de cinco projetos:
  - Verithaz — IA Investigativa;
  - Vira Price;
  - Automação de Enriquecimento de Leads;
  - EduCore — Gestão Acadêmica;
  - OpenSource Lab;
- links GitHub, demonstração, YouTube, Behance e Drive disponíveis;
- resultados documentados de aproximadamente R$ 70 mil economizados em gastos com IA, 15% de ganho em eficiência operacional e semanas de trabalho manual poupadas;
- experiências da Mauá Júnior e São Judas Technologies;
- currículos PT-BR e EN;
- vídeos originais mantidos como assets públicos; OpenSource Lab e EduCore permanecem na seleção atual;
- alternância PT/EN/ES com persistência em `localStorage`.

## Conteúdo atualizado

A experiência autônoma desatualizada foi substituída pela experiência mais recente:

**Estágio em IA e Automação — OneBox - DNE**

O conteúdo registra trabalho com serviços AWS, Java, Python, FastAPI, APIs REST, MySQL, PostgreSQL, manutenção do sistema e correção de bugs. As três versões linguísticas derivam da mesma estrutura tipada.

A copy geral também foi retrabalhada em PT, EN e ES para soar mais direta, curiosa e prática. O conteúdo evita abstrações corporativas, descreve o processo de perguntar, rascunhar, construir e testar e mantém a mesma personalidade nos três idiomas.

### Seleção atual de projetos

- **Verithaz:** IA investigativa que divide notícias em afirmações, revisa as fontes relacionadas e procura indícios de campanha ou manipulação. As estratégias da dialética erística descritas por Arthur Schopenhauer são uma lente crítica; o produto não promete um veredito automático.
- **Vira Price:** startup para gerenciamento de listas de fornecedores por lojistas.
- **Automação de Enriquecimento de Leads**, **EduCore** e **OpenSource Lab** completam a seleção.

Sistema de Reservas para Restaurantes e FinCore não fazem parte da seleção editorial atual. Seus registros históricos não são reescritos por esta revisão; o arquivo `finexp.mp4`, ainda presente em `public/`, permanece apenas como asset legado.

### Novo capítulo de Resultados

`#resultados` entra depois de Projetos e antes de Experiência. A seção usa três artigos semânticos e dados centralizados em `resultMetrics`:

- `≈ R$ 70 mil` economizados em gastos com IA;
- `+15%` de eficiência operacional;
- semanas de trabalho manual poupadas.

O terceiro resultado permanece deliberadamente sem número: não havia quantidade documentada para sustentar uma precisão maior. Os valores visuais animados são ocultos de tecnologia assistiva; cada artigo mantém um label localizado completo e estático.

## O que foi substituído

- tema aquático, bolhas, ondas, azul dominante e distorção de água;
- loader bloqueante de cinco segundos;
- glassmorphism repetitivo;
- conteúdo invisível aguardando uma animação tardia;
- menu mobile não semântico;
- mutação de strings por `innerHTML`;
- barras de idioma com aparência de precisão não explicada;
- card “Projeto 06” sem conteúdo real;
- autoplay e montagem inicial dos vídeos locais;
- iframes de terceiros como mídia inicial;
- ícones raster como interface principal;
- dependências declaradas sem uso;
- ausência de scripts de build, lint, types e testes.

A limpeza física foi concluída:

- `css/style.css` e `js/main.js` legados foram removidos;
- os PNGs antigos `github.png`, `linkedin.png`, `sites_img.png` e `whatsapp.png` foram removidos;
- os três MP4s e os dois PDFs foram preservados;
- `node_modules` foi removido do índice Git em commit separado, sem apagar a instalação local.

## Arquitetura atual

### Shell e locale

- `src/main.tsx` carrega fontes, CSS base, provider de locale e aplicação.
- `src/app/LocaleContext.tsx` persiste PT/EN/ES, atualiza `document.lang` e o título.
- `src/app/App.tsx` organiza landmarks, seções, dividers e o ponto de montagem dos enhancements desktop.

### Dados

`src/data/portfolio.ts` é a fonte única para:

- copy de interface;
- projetos e seus links;
- experiências e tecnologias;
- capacidades;
- formação;
- certificações;
- idiomas;
- resultados e seus labels acessíveis;
- redes e contato.

### UI

- `components/layout`: header, navegação, menu mobile e locale;
- `components/ui`: heading, bounding box, estrela SVG, papel rasgado, rabisco e system notice;
- `components/projects`: dialog nativo e montagem sob demanda de MP4;
- `sections`: hero, sobre, projetos, resultados, experiência, capacidades, formação, laboratório, contato e footer.

### Motion e 3D

- `App.tsx`: shell sem imports de runtime de motion;
- `DesktopEnhancements.tsx`: capability gate e imports lazy de EditorialMotion, Lenis e cena;
- `EditorialMotion.tsx`: GSAP/`@gsap/react`/ScrollTrigger para hero, reveals, SVG, recorte líquido e entrada/contadores de Resultados, apenas no desktop elegível;
- `DesktopStarScene.tsx`: Three.js imperativo, event-driven, guiado por waypoints semânticos e com cleanup completo;
- `useHeavyVisuals.ts`: observa viewport, pointer, hover e preferência de movimento; o ambiente também considera `Save-Data`, memória e WebGL;
- `utils/heavyVisuals.ts`: regra pura e testável do gate, incluindo detecção de suporte WebGL.
- `utils/scroll.ts`: fornece o `clamp` consumido pela cena e mantém utilitários cobertos por testes.

### CSS

- `reset.css`: normalização;
- `tokens.css`: cores, tipografia, espaços, motion e superfícies;
- `typography.css`: hierarquia fluida;
- `globals.css`: baseline, foco, skip link e preferências;
- CSS Modules: layout local de app, header, gráficos, seções, dialog, enhancements e cena.

## Dependências e justificativa

### Produção

| Dependência          | Decisão                          |
| -------------------- | -------------------------------- |
| React / React DOM    | base de composição e estado      |
| GSAP / `@gsap/react` | timeline e cleanup no React      |
| Lenis                | smooth scroll isolado e opcional |
| Three.js             | cena-assinatura sem R3F/Drei     |
| Lucide React         | ícones SVG consistentes          |
| Fontsource           | fontes self-hosted               |

Não foram adicionados Anime.js, React Three Fiber, Drei, Lottie ou bibliotecas de componentes genéricas. O projeto mantém um proprietário de movimento por elemento e evita abstrações sem necessidade.

### Desenvolvimento

- Vite e plugin React;
- TypeScript e tipos;
- ESLint flat config;
- Prettier;
- Vitest, jsdom e Testing Library;
- Playwright.

## Desktop

Em clientes elegíveis, a composição recebe:

- estrela 3D em canvas quadrado de 190–230 px, com escala do Hero abaixo de 300 px;
- rotação, deslocamento, escala e opacidade derivados de waypoints reais da página;
- presença concentrada no Hero e em Resultados entre 1280 e 1599 px;
- gutters adicionais liberados apenas em larguras maiores e quando existe respiro fora do conteúdo;
- opacidade zero em Projetos, painel de métricas, Ferramentas, Laboratório e footer;
- saída em duas etapas: deslocamento curto scroll-linked com rotação/escala, seguido de fade;
- Lenis integrado ao ticker GSAP;
- revelações editoriais e SVGs desenhados;
- DPR WebGL limitado a `1.5`;
- render somente por evento, sem animação infinita.

O conteúdo principal permanece no centro e não é renderizado no canvas. O movimento por ponteiro foi removido: a estrela funciona como fio narrativo do scroll e não como controle. Antes de desaparecer em uma área densa, ela ainda se desloca com o scroll; somente depois desse movimento entra o fade.

## Mobile e tablet compacto

Mobile é uma composição própria:

- coluna única e gutters responsivos;
- menu sólido operável por teclado;
- estrelas SVG estáticas no Hero e em Resultados;
- sem EditorialMotion, GSAP, ScrollTrigger, Three.js, canvas WebGL ou Lenis;
- sem pin e sem parallax da cena;
- painéis no fluxo;
- targets de toque;
- projetos em sequência vertical;
- vídeos montados somente após clique;
- correção de causa de overflow, com `overflow-x: clip` apenas como proteção.

O bloqueio de chunks acontece antes do import. Não se depende de esconder canvas com CSS.

## Reduced motion e restrições do cliente

Com `prefers-reduced-motion: reduce`:

- EditorialMotion, GSAP, ScrollTrigger, Lenis e Three.js não são importados;
- as timelines de entrada e scrub não são criadas;
- o scroll volta ao comportamento instantâneo do sistema;
- Lenis não é importado;
- a cena Three.js não é importada;
- as estrelas SVG de Hero e Resultados permanecem disponíveis;
- todo conteúdo continua na mesma ordem.

O mesmo fallback estático é usado para `Save-Data`, touch primário, ausência de hover, viewport abaixo de `1280px`, WebGL indisponível e, quando disponível, `deviceMemory < 4`.

## Acessibilidade implementada

- skip link;
- `<header>`, `<nav>`, `<main>`, seções, artigos e footer;
- um `h1` e títulos associados às seções;
- foco visível;
- labels localizados;
- menu com `aria-expanded`, `aria-controls`, Escape, ciclo de Tab e retorno de foco;
- seletor de idioma com `aria-pressed`;
- `dialog` nativo com título, descrição, cancelamento e retorno de foco;
- ícones decorativos com `aria-hidden`;
- canvas sem foco e oculto da árvore acessível;
- links externos com `rel="noreferrer"`;
- compensação do header em navegação por hash;
- scrollspy com `aria-current="location"`, incluindo `#resultados`;
- preferência de maior contraste;
- conteúdo essencial independente de motion/3D.

## Assets e caminhos públicos

```text
/Curriculo_OmarSaliba_PT-BR.pdf
/Curriculo_OmarSaliba_ENG.pdf
/assets/videos/opensourceexp.mp4
/assets/videos/eduexp.mp4
/assets/videos/finexp.mp4
```

Vite copia `public/` para a raiz de `dist/`. Renomear qualquer arquivo exige atualizar `src/data/portfolio.ts` ou os links das seções.

## Build e bundle

O snapshot de 25/07, anterior a Resultados e à reescrita da cena, registra:

- JS inicial: `250,07 kB bruto / 79,55 kB gzip`, composto por index, ícones e runtime;
- CSS principal: `69,31 kB bruto / 14,28 kB gzip`;
- fonts WOFF2 ativas: `70,92 kB`;
- EditorialMotion: `0,44 kB gzip`, dinâmico;
- GSAP/`@gsap-react`/ScrollTrigger: `44,98 kB gzip`, dinâmicos;
- Lenis: `5,33 kB gzip`, dinâmico;
- componente da cena: `1,76 kB gzip`, dinâmico;
- CSS da cena: `0,24 kB gzip`, dinâmico;
- Three.js: `140,12 kB gzip`, dinâmico e desktop-only.

A ilha desktop daquele snapshot adicionava aproximadamente `192,87 kB gzip`; o total com todos os enhancements elegíveis era aproximadamente `272,42 kB gzip`.

Esses valores são baseline histórico. A revisão atual altera CSS, `EditorialMotion` e `DesktopStarScene`; um novo build deve substituir os números antes de qualquer declaração de tamanho final.

Detalhes e budgets: [performance-report.md](performance-report.md).

O Lighthouse do mesmo baseline registrou:

| Perfil                | Performance | Acessibilidade | Best Practices | SEO |   FCP |   LCP |   CLS |   TBT |
| --------------------- | ----------: | -------------: | -------------: | --: | ----: | ----: | ----: | ----: |
| Desktop               |         100 |            100 |            100 | 100 | 0,6 s | 0,7 s | 0,036 | 10 ms |
| Mobile, amostra final |          97 |            100 |            100 | 100 | 2,0 s | 2,1 s | 0,007 | 30 ms |

A mediana de três amostras mobile foi Performance 97, FCP 1,97 s, LCP 2,12 s, CLS 0,007 e TBT 7 ms. Lighthouse ainda não foi reexecutado para a revisão cirúrgica posterior.

## Deploy

### Vercel

- install command: `npm install` ou `npm ci`;
- build command: `npm run build`;
- output directory: `dist`;
- Node.js: `>= 22.12.0`;
- framework: Vite;
- branch de produção: confirmar explicitamente no painel;
- fallback SPA: versionado em `vercel.json`;
- base path: raiz `/`;
- variáveis de ambiente: nenhuma obrigatória.

Antes de promover:

1. confirmar que `fullstackdevomar.vercel.app` é o projeto correto;
2. validar o preview da branch;
3. testar downloads dos dois PDFs;
4. abrir cada vídeo sob demanda;
5. verificar canonical, robots, sitemap e manifest;
6. conferir PT, EN e ES;
7. inspecionar Network mobile para ausência de chunks desktop;
8. só então associar/promover o domínio.

Nenhum deploy, push ou merge faz parte deste relatório.

### Host estático alternativo

1. executar `npm ci`;
2. executar `npm run build`;
3. publicar `dist/`;
4. reescrever rotas desconhecidas para `/index.html`;
5. preservar assets públicos na raiz;
6. servir arquivos com hash com cache longo e `index.html` com revalidação curta.

## Estado de validação

O baseline de 25/07 possui evidência arquivada. Para a revisão atual, considerar apenas o último run executado depois de todos os ajustes:

| Verificação                                         | Estado                                                                                 |
| --------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `npm run lint`                                      | **APROVADO**                                                                           |
| `npm run typecheck`                                 | **APROVADO**                                                                           |
| `npm run format:check`                              | **APROVADO**                                                                           |
| `npm run test`                                      | **PENDENTE REGISTRO FINAL:** a suíte foi ampliada; não reutilizar 15/15 do baseline    |
| `npm run build`                                     | **PENDENTE SNAPSHOT FINAL:** substituir os tamanhos históricos acima                   |
| `npm run test:e2e` em dez projetos                  | **PENDENTE EXECUÇÃO INTEGRAL**                                                         |
| hash/scrollspy/semântica de `#resultados`           | **IMPLEMENTADO; E2E FINAL PENDENTE**                                                   |
| tamanho, ocultação e ausência de overlap da estrela | **IMPLEMENTADO; E2E E REVISÃO VISUAL PENDENTES**                                       |
| 64 screenshots seccionais em oito larguras          | **PENDENTE QA** em `artifacts/star-results/`                                           |
| teclado e leitor de tela                            | **PARCIAL:** fluxos automatizados previstos; leitor de tela e zoom continuam QA manual |
| Lighthouse mobile/desktop da revisão                | **NÃO EXECUTADO:** valores anteriores são baseline                                     |
| LCP, CLS e INP atuais                               | **NÃO MEDIDOS**                                                                        |
| link checker externo                                | **PENDENTE QA**                                                                        |
| downloads e vídeos no deploy preview                | **PENDENTE PREVIEW**                                                                   |
| deploy de produção                                  | **NÃO EXECUTADO**                                                                      |

## Riscos remanescentes

- a ilha desktop adicionava `192,87 kB gzip` no baseline; o custo atual ainda precisa ser medido;
- os MP4 originais continuam grandes, apesar de serem on-demand;
- traduções e conteúdo devem ser revisados por uma pessoa fluente;
- URLs externas podem mudar independentemente do build;
- canonical e domínio precisam ser confirmados no ambiente Vercel;
- `main` e `master` remotas tinham históricos diferentes no snapshot do legado; a branch de deploy não pode ser presumida.

## Critério de conclusão

A migração pode ser considerada pronta para publicação quando:

- lint, types, unit, build e E2E passarem no estado final;
- não houver overflow entre 320 e 1920 px;
- mobile, tablet compacto e reduced motion não baixarem EditorialMotion/GSAP, Lenis ou Three;
- menu, locale, dialog, âncoras e currículos funcionarem por teclado;
- contraste e foco atenderem WCAG AA;
- Verithaz, Vira Price, Enriquecimento de Leads, EduCore e OpenSource Lab estiverem corretos nos três idiomas;
- os três resultados estiverem corretos e legíveis em PT, EN e ES, sem atribuir número às semanas poupadas;
- vídeos continuarem estritamente sob demanda;
- o preview Vercel for aprovado antes de produção;
- o diff não incorporar deleções ou arquivos legados sem intenção explícita.
