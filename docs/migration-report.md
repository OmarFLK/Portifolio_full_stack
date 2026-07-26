# Relatório de migração

Data: 25/07/2026

Origem: portfólio estático em HTML, CSS e JavaScript.

Destino: React 19 + Vite 8 + TypeScript 5.9.

Branch de trabalho: `feat/react-vite-portfolio-redesign`.

## Resultado da reconstrução

O portfólio foi reconstruído como uma aplicação React de página única, com conteúdo trilíngue tipado, CSS modular, componentes semânticos, testes automatizados, assets públicos organizados e build de produção.

A mudança substitui a linguagem aquática anterior por **Signal / Selected Work**, uma direção editorial em amarelo-sinal, preto-tinta, branco-papel e cinzas. Motion e 3D passaram a ser melhorias progressivas: a leitura, os links e a composição principal não dependem deles.

## Antes e depois

| Área      | Legado                                           | Nova arquitetura                                            |
| --------- | ------------------------------------------------ | ----------------------------------------------------------- |
| Entrada   | HTML monolítico                                  | `index.html` mínimo + `src/main.tsx`                        |
| UI        | DOM estático                                     | componentes React                                           |
| Conteúdo  | duplicado entre HTML e dicionários JS            | `src/data/portfolio.ts` tipado                              |
| Idiomas   | mutação de `innerHTML`                           | Context API e render React PT/EN/ES                         |
| Estilos   | uma folha global extensa                         | reset, tokens, tipografia, globals e CSS Modules            |
| Motion    | loader, bolhas e efeitos contínuos               | GSAP com scope, reduced motion e cleanup                    |
| 3D        | dependência não utilizada                        | ilha Three.js lazy-loaded e condicionada                    |
| Scroll    | listeners e blur a cada evento                   | nativo por padrão; Lenis opcional no desktop                |
| Projetos  | cards repetidos, embeds/autoplay e placeholder   | cinco composições reais, links honestos e vídeo sob demanda |
| Qualidade | sem lint, types ou testes                        | ESLint, TypeScript, Vitest e Playwright                     |
| Deploy    | arquivos estáticos sem configuração reproduzível | build `dist` + fallback SPA para Vercel                     |

## Conteúdo preservado

- nome, posicionamento profissional e contatos;
- formação no Senac Aclimação e Instituto Mauá de Tecnologia;
- certificações e níveis de idioma;
- cinco projetos reais:
  - Automação de Enriquecimento de Leads;
  - Sistema de Reservas para Restaurantes;
  - OpenSource Lab;
  - EduCore;
  - FinCore;
- links GitHub, demonstração, YouTube, Behance e Drive disponíveis;
- experiências da Mauá Júnior e São Judas Technologies;
- currículos PT-BR e EN;
- vídeos originais de OpenSource Lab, EduCore e FinCore;
- alternância PT/EN/ES com persistência em `localStorage`.

## Conteúdo atualizado

A experiência autônoma desatualizada foi substituída pela experiência mais recente:

**Estágio em IA e Automação — OneBox - DNE**

O conteúdo registra trabalho com serviços AWS, Java, Python, FastAPI, APIs REST, MySQL, PostgreSQL, manutenção do sistema e correção de bugs. As três versões linguísticas derivam da mesma estrutura tipada.

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
- `src/app/App.tsx` organiza landmarks, seções, dividers, GSAP e enhancements desktop.

### Dados

`src/data/portfolio.ts` é a fonte única para:

- copy de interface;
- projetos e seus links;
- experiências e tecnologias;
- capacidades;
- formação;
- certificações;
- idiomas;
- redes e contato.

### UI

- `components/layout`: header, navegação, menu mobile e locale;
- `components/ui`: heading, bounding box, estrela SVG, papel rasgado, rabisco e system notice;
- `components/projects`: dialog nativo e montagem sob demanda de MP4;
- `sections`: hero, sobre, projetos, experiência, capacidades, formação, laboratório, contato e footer.

### Motion e 3D

- `App.tsx`: shell sem imports de runtime de motion;
- `DesktopEnhancements.tsx`: capability gate e imports lazy de EditorialMotion, Lenis e cena;
- `EditorialMotion.tsx`: GSAP/`@gsap/react`/ScrollTrigger para hero, reveals, SVG e recorte líquido, apenas no desktop elegível;
- `DesktopStarScene.tsx`: Three.js imperativo, event-driven e com cleanup completo;
- `useHeavyVisuals.ts`: observa viewport, pointer, hover e preferência de movimento;
- `utils/heavyVisuals.ts`: regra pura e testável do gate.
- `utils/scroll.ts`: clamp, mapeamento e interpolação consumidos pela cena e cobertos por testes.

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

- estrela 3D em um canvas decorativo lateral;
- rotação e deslocamento derivados do scroll;
- resposta sutil ao ponteiro;
- Lenis integrado ao ticker GSAP;
- revelações editoriais e SVGs desenhados;
- DPR WebGL limitado a `1.5`;
- render somente por evento, sem animação infinita.

O conteúdo principal permanece no centro e não é renderizado no canvas.

## Mobile e tablet compacto

Mobile é uma composição própria:

- coluna única e gutters responsivos;
- menu sólido operável por teclado;
- estrela SVG estática;
- sem EditorialMotion, GSAP, ScrollTrigger, Three.js, WebGL ou Lenis;
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
- a estrela SVG permanece disponível;
- todo conteúdo continua na mesma ordem.

O mesmo fallback estático é usado para `Save-Data`, touch primário, ausência de hover, viewport abaixo de `1280px` e, quando disponível, `deviceMemory < 4`.

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

O snapshot mais recente registra:

- JS inicial: `250,07 kB bruto / 79,55 kB gzip`, composto por index, ícones e runtime;
- CSS principal: `69,31 kB bruto / 14,28 kB gzip`;
- fonts WOFF2 ativas: `70,92 kB`;
- EditorialMotion: `0,44 kB gzip`, dinâmico;
- GSAP/`@gsap-react`/ScrollTrigger: `44,98 kB gzip`, dinâmicos;
- Lenis: `5,33 kB gzip`, dinâmico;
- componente da cena: `1,76 kB gzip`, dinâmico;
- CSS da cena: `0,24 kB gzip`, dinâmico;
- Three.js: `140,12 kB gzip`, dinâmico e desktop-only.

A ilha desktop completa adiciona aproximadamente `192,87 kB gzip`; o total com todos os enhancements elegíveis é aproximadamente `272,42 kB gzip`.

Detalhes e budgets: [performance-report.md](performance-report.md).

O Lighthouse final registrou:

| Perfil                | Performance | Acessibilidade | Best Practices | SEO |   FCP |   LCP |   CLS |   TBT |
| --------------------- | ----------: | -------------: | -------------: | --: | ----: | ----: | ----: | ----: |
| Desktop               |         100 |            100 |            100 | 100 | 0,6 s | 0,7 s | 0,036 | 10 ms |
| Mobile, amostra final |          97 |            100 |            100 | 100 | 2,0 s | 2,1 s | 0,007 | 30 ms |

A mediana de três amostras mobile foi Performance 97, FCP 1,97 s, LCP 2,12 s, CLS 0,007 e TBT 7 ms.

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

Build, Lighthouse, Vitest, Playwright e screenshots possuem evidência final registrada.

| Verificação                                 | Estado                                                                                                          |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `npm run lint`                              | comando disponível; resultado não incluído neste snapshot documental                                            |
| `npm run typecheck`                         | comando disponível; resultado não incluído neste snapshot documental                                            |
| `npm run test`                              | **APROVADO: 15/15**                                                                                             |
| `npm run build` após os últimos ajustes     | **APROVADO:** bundle final registrado                                                                           |
| `npm run test:e2e` em todos os projetos     | **APROVADO:** 48 testes, 40 aprovados, 8 skips intencionais por viewport e 0 falhas                             |
| screenshots 320, 375, 390, 768, 1440 e 1920 | **GERADOS LOCALMENTE** em `artifacts/` (ignorado no Git)                                                        |
| teclado e leitor de tela                    | **PARCIAL:** fluxos de teclado cobertos; leitor de tela e zoom continuam QA manual                              |
| contraste e acessibilidade automatizada     | **APROVADO NO LIGHTHOUSE:** 100 em desktop e mobile; auditoria manual ainda recomendada                         |
| Lighthouse mobile/desktop                   | **APROVADO:** 100/100/100/100 desktop e 97/100/100/100 na amostra mobile final                                  |
| LCP e CLS                                   | **MEDIDOS:** desktop 0,7 s / 0,036; mediana mobile 2,12 s / 0,007                                               |
| INP                                         | **NÃO MEDIDO:** Lighthouse lab registrou TBT de 10 ms desktop, 30 ms na amostra mobile e 7 ms na mediana mobile |
| link checker externo                        | **PENDENTE QA**                                                                                                 |
| downloads e vídeos no deploy preview        | **PENDENTE PREVIEW**                                                                                            |
| deploy de produção                          | **NÃO EXECUTADO**                                                                                               |

## Riscos remanescentes

- a ilha desktop adiciona `192,87 kB gzip` quando o gate passa, incluindo `140,12 kB gzip` de Three.js;
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
- os cinco projetos e quatro experiências estiverem corretos nos três idiomas;
- vídeos continuarem estritamente sob demanda;
- o preview Vercel for aprovado antes de produção;
- o diff não incorporar deleções ou arquivos legados sem intenção explícita.
