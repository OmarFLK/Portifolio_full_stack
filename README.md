# Omar Saliba — Signal / Selected Work

Portfólio trilíngue de Omar Saliba, reconstruído em React, Vite e TypeScript para apresentar projetos, experiência, formação e contato nas áreas de inteligência artificial, automação, dados e engenharia de software.

O projeto migra o portfólio estático anterior para uma aplicação componentizada, testável e com build reproduzível. A interface mantém todo o conteúdo principal em HTML semântico e trata movimento, smooth scroll e 3D como melhorias progressivas.

## Conceito visual

O conceito **Signal / Selected Work** parte da ideia de “engenharia em modo de edição”: uma publicação técnica sendo organizada dentro de uma ferramenta criativa.

- preto-tinta e branco-papel formam a estrutura;
- amarelo-sinal marca seleção, ação e execução;
- cinzas e âmbar criam matéria, profundidade e hierarquia;
- bounding boxes, handles, rabiscos, papel rasgado e painéis de sistema funcionam como vocabulário editorial;
- o gradiente líquido é tratado como metal aquecido ou tinta gráfica, sem retomar o tema aquático anterior;
- os cinco projetos reais recebem composições próprias, em vez de uma grade de cards idênticos.

A narrativa segue oito capítulos: sinal, contexto, provas, trajetória, ferramentas, base, laboratório e contato. A direção detalhada está em [docs/design-plan.md](docs/design-plan.md), os tokens em [docs/design-dna.json](docs/design-dna.json) e as regras de movimento em [docs/animation-map.md](docs/animation-map.md).

## Stack e decisões

| Tecnologia                          | Papel                                | Por que está aqui                                                             |
| ----------------------------------- | ------------------------------------ | ----------------------------------------------------------------------------- |
| React 19                            | composição da interface e estado     | seções reutilizáveis, locale, menu e mídia sob demanda                        |
| Vite 8                              | desenvolvimento e build              | HMR rápido, assets com hash e code splitting                                  |
| TypeScript 5.9                      | modelo de dados e segurança de tipos | mantém projetos, experiências e traduções consistentes                        |
| CSS Modules + custom properties     | layout e identidade visual           | escopo local sem runtime e liberdade para masks, grids e media queries        |
| GSAP + `@gsap/react`                | entradas editoriais e ScrollTrigger  | ilha lazy exclusiva de desktop elegível, com scope e cleanup                  |
| Lenis                               | smooth scroll opcional               | carregado apenas em desktop elegível; scroll nativo continua sendo o fallback |
| Three.js                            | estrela 3D decorativa                | ilha visual carregada dinamicamente, sem conteúdo essencial no canvas         |
| Lucide React                        | ícones de interface                  | SVGs consistentes e semanticamente controláveis                               |
| Bricolage Grotesque + IBM Plex Mono | display/corpo e metadados            | fontes self-hosted, com identidade editorial e sem dependência de CDN         |
| Vitest + Testing Library            | testes unitários e de componentes    | valida regras de capability gate, utilitários e shell da aplicação            |
| Playwright                          | smoke tests em múltiplos viewports   | cobre navegação, locale, overflow e isolamento dos chunks desktop             |

React Three Fiber, Drei, Anime.js e Lottie não foram adicionados: o Three.js direto atende a cena atual, GSAP já é o proprietário do movimento coordenado e uma segunda camada de abstração aumentaria o custo sem benefício concreto.

## Conteúdo preservado

- cinco projetos reais, com links e estados de disponibilidade honestos;
- experiência atualizada de estágio em IA e automação na OneBox - DNE;
- AWS, Java, Python, FastAPI, APIs REST, MySQL, PostgreSQL, manutenção e correção de bugs;
- experiências da Mauá Júnior e São Judas Technologies;
- formação, certificações e idiomas;
- versões em português, inglês e espanhol;
- GitHub, LinkedIn, WhatsApp, Behance, Drive e e-mail;
- currículos PT-BR e EN;
- vídeos locais de OpenSource Lab, EduCore e FinCore, agora montados somente após interação.

A fonte central do conteúdo do site é [src/data/portfolio.ts](src/data/portfolio.ts).

## Estrutura

```text
.
├── public/
│   ├── assets/videos/               # demonstrações locais, carregadas sob demanda
│   ├── Curriculo_OmarSaliba_*.pdf   # currículos públicos
│   ├── favicon.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   └── site.webmanifest
├── src/
│   ├── app/                         # shell e locale
│   ├── components/
│   │   ├── layout/                  # header, navegação e seletor de idioma
│   │   ├── motion/                  # enhancements condicionais de desktop
│   │   ├── projects/                # dialog de vídeo sob demanda
│   │   └── ui/                      # primitives gráficos autorais
│   ├── data/                        # conteúdo trilíngue tipado
│   ├── hooks/                       # preferências e capability gates
│   ├── sections/                    # seções narrativas do portfólio
│   ├── styles/                      # reset, tokens, tipografia e regras globais
│   ├── utils/                       # funções puras e testáveis
│   └── visuals/                     # ilha Three.js lazy-loaded
├── tests/e2e/                       # cenários Playwright
├── docs/                            # design, auditoria, pesquisa e relatórios
├── skills/signal-portfolio-review/ # skill local de auditoria
├── vite.config.ts
├── playwright.config.ts
├── vitest.config.ts
└── vercel.json
```

O CSS/JavaScript monolítico e os quatro PNGs de ícones do legado foram removidos. Os três MP4s e os dois PDFs permanecem como assets públicos. `node_modules` não faz parte do índice Git; a instalação local é reconstruída pelo lockfile.

## Requisitos

- Node.js `>= 22.12.0`
- npm compatível com o lockfile v3

Não há variáveis de ambiente obrigatórias.

## Instalação e execução

```bash
npm install
npm run dev
```

O Vite informa a URL local no terminal. Para testar o artefato de produção:

```bash
npm run build
npm run preview
```

## Validação

```bash
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:e2e
npm run format:check
```

Os testes end-to-end usam Microsoft Edge e iniciam `vite preview` em `http://127.0.0.1:4173`. Os seis projetos Playwright cobrem 320×720, 375×812, 390×844, 768×1024, 1440×900 e 1920×1080.

Resultado final:

- Vitest: **15/15**;
- Playwright: **48 testes — 40 aprovados, 8 ignorados intencionalmente por viewport e 0 falhas**;
- screenshots dos seis viewports gerados localmente em `artifacts/` (evidências de QA ignoradas no Git).

Consulte [docs/migration-report.md](docs/migration-report.md) para o estado de validação e [docs/performance-report.md](docs/performance-report.md) para os budgets e o snapshot do bundle.

## Acessibilidade

A implementação inclui:

- skip link e landmarks semânticos;
- um único `h1` e hierarquia de títulos por seção;
- navegação por âncoras com compensação do header;
- foco visível em alto contraste;
- menu mobile operável por teclado, fechamento com `Escape`, contenção de foco e retorno ao acionador;
- seletor PT/EN/ES com botões e `aria-pressed`;
- `dialog` nativo para vídeos, com retorno de foco;
- SVGs e canvas decorativos ocultos da árvore de acessibilidade;
- nenhuma informação essencial dependente de hover, cor, canvas ou animação;
- targets de toque e composição mobile específicos;
- suporte a `prefers-reduced-motion` e `prefers-contrast`.

O conteúdo da aplicação exige JavaScript, mas não fica deliberadamente invisível aguardando timelines: quando motion é reduzido ou uma melhoria falha, o estado estático permanece completo.

## Movimento e estratégia mobile

No desktop elegível, o componente lazy `EditorialMotion` importa GSAP, `@gsap/react` e ScrollTrigger para animar entradas de hero e seções, desenhar alguns SVGs e deslocar o recorte líquido. As animações usam `transform` e `opacity`, são limitadas pelo scope da aplicação e são revertidas no unmount.

EditorialMotion/GSAP, Lenis e Three.js compartilham o mesmo capability gate. Eles só podem ser importados quando todas estas condições são satisfeitas:

- viewport com pelo menos `1280px`;
- ponteiro fino e suporte real a hover;
- `prefers-reduced-motion: no-preference`;
- `Save-Data` desativado;
- memória de dispositivo ausente ou de pelo menos 4 GB.

No mobile, tablet compacto, touch primário, economia de dados ou movimento reduzido:

- `EditorialMotion`, GSAP, `@gsap/react` e ScrollTrigger não são solicitados;
- Lenis não é solicitado;
- Three.js e o componente da cena não são solicitados;
- não existe WebGL;
- uma estrela SVG estática mantém a composição;
- o scroll permanece nativo;
- projetos e painéis ficam no fluxo de leitura;
- vídeos só entram no DOM após clique explícito.

A estrela 3D usa renderização orientada a eventos — scroll, resize, pointer e retorno à aba — em vez de um loop infinito. O DPR é limitado a `1.5`, e geometria, materiais, listeners e contexto WebGL são liberados no cleanup.

## Performance

O snapshot final do build registra apenas `79,55 kB gzip` de JavaScript inicial (`index`, ícones e runtime), dentro do budget de `170 kB gzip`. CSS principal: `14,28 kB gzip`. Toda a ilha desktop — EditorialMotion, GSAP, Lenis, cena e Three.js — é dinâmica e adiciona aproximadamente `192,87 kB gzip` somente quando o capability gate é aprovado.

As três demonstrações em MP4 somam aproximadamente `25,5 MiB`, mas não pertencem à carga inicial. O componente de mídia monta o `<video>` apenas dentro do dialog aberto, sem autoplay.

Lighthouse registrou `100/100/100/100` no desktop e `97/100/100/100` na amostra mobile final para Performance, Acessibilidade, Best Practices e SEO. A mediana de três amostras mobile foi Performance `97`, FCP `1,97 s`, LCP `2,12 s`, CLS `0,007` e TBT `7 ms`. Esses resultados são laboratoriais e não substituem INP ou Web Vitals de campo.

## Deploy

### Vercel

O repositório inclui [vercel.json](vercel.json) com fallback de SPA.

1. conecte o repositório na Vercel;
2. selecione a branch de produção explicitamente;
3. use Node.js `22.12` ou superior;
4. configure o build command como `npm run build`;
5. configure o output directory como `dist`;
6. não defina um base path, pois o site usa a raiz do domínio;
7. valide PDFs, vídeos, âncoras, canonical, sitemap e locale no preview antes de promover.

Nenhum deploy é executado por estes scripts. A URL canônica configurada é `https://fullstackdevomar.vercel.app/`; confirme que ela ainda corresponde ao projeto correto antes de publicar.

### Outro host estático

Execute `npm run build`, publique `dist/` e configure todas as rotas desconhecidas para servir `index.html`. Preserve os arquivos de `public/` na raiz final.

## Referências, créditos e licenças

As referências visuais foram usadas para extrair princípios, não para copiar identidade, assets ou layouts:

- [Studio Freight](https://studiofreight.com/) e seu [case próprio](https://studiofreight.com/work/studio-freight);
- [Awwwards — Studio Freight](https://www.awwwards.com/studiofreight/);
- screenshots enviados no briefing: bounding boxes, rabiscos, papel, texturas, motion design e linguagem de software criativo.

Referências técnicas principais:

- [React](https://react.dev/learn) e [Vite](https://vite.dev/guide/);
- [GSAP](https://gsap.com/docs/v3/), [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) e [`@gsap/react`](https://github.com/greensock/react);
- [Lenis](https://github.com/darkroomengineering/lenis);
- [Three.js](https://threejs.org/docs/).

Licenças das dependências de produção:

| Pacote                                   | Licença                      |
| ---------------------------------------- | ---------------------------- |
| React, React DOM, Vite, Three.js e Lenis | MIT                          |
| Lucide React                             | ISC                          |
| Bricolage Grotesque e IBM Plex Mono      | SIL Open Font License 1.1    |
| GSAP e `@gsap/react`                     | Standard “No Charge” License |

A licença do runtime GSAP não é MIT. Revise os [termos atuais da GreenSock](https://gsap.com/standard-license/) antes de redistribuir o projeto como produto white-label ou ferramenta concorrente de criação visual.

## Skills pesquisadas e adaptadas

Foi criada a skill local [skills/signal-portfolio-review/SKILL.md](skills/signal-portfolio-review/SKILL.md) para revisar aderência visual, conteúdo, acessibilidade, responsividade, motion, isolamento mobile e prontidão de produção.

Princípios foram pesquisados e adaptados de:

- Anthropic Frontend Design;
- UI UX Pro Max;
- Emil Kowalski Skills;
- Design DNA;
- LottieFiles Motion Design Skill;
- GSAP Skills oficial;
- gstack Plan Design Review;
- Genjutsu.

Esses repositórios não foram copiados em massa nem adicionados como runtime. 21st.dev MCP, Anime.js, R3F/Drei, App Store Screenshots e as coleções de Three.js skills também não foram instalados. A análise de compatibilidade, limitações e licenças está em [docs/skills-research.md](docs/skills-research.md).

## Relatórios

- [Auditoria do legado](docs/legacy-audit.md)
- [Plano de design](docs/design-plan.md)
- [Design DNA](docs/design-dna.json)
- [Mapa de animações](docs/animation-map.md)
- [Pesquisa de referências](docs/reference-research.md)
- [Pesquisa de skills](docs/skills-research.md)
- [Relatório de migração](docs/migration-report.md)
- [Relatório de performance](docs/performance-report.md)
