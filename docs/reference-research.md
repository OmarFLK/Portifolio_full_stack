# Pesquisa de referências técnicas e visuais

> Snapshot de pesquisa: 25 de julho de 2026.
>
> Escopo: referências do briefing para a reconstrução do portfólio em React + Vite.
> Estado: pesquisa somente. Nenhuma dependência, skill, MCP, template ou asset externo foi instalado ou copiado.

## Decisão resumida

A combinação mais coerente para este projeto é:

1. **React + Vite** como base;
2. **CSS e GSAP** para a linguagem de movimento principal;
3. **`@gsap/react`** para ciclo de vida e limpeza das animações React;
4. **ScrollTrigger** apenas nas sequências realmente guiadas por scroll;
5. **Lenis** como melhoria progressiva, mantido somente se teclado, touch, âncoras, foco e `prefers-reduced-motion` continuarem corretos;
6. **Three.js** em uma ou poucas cenas-assinatura, carregadas sob demanda e com fallback estático;
7. **React Three Fiber/Drei** somente se a cena 3D crescer o bastante para justificar mais duas dependências;
8. **21st.dev** como fonte de padrões/componentes para revisão e adaptação, não como direção de arte;
9. **Anime.js** apenas como alternativa mais enxuta ao GSAP em responsabilidades isoladas — não como segundo motor concorrente na mesma interação.

No snapshot do `package.json` consultado durante esta pesquisa, React, Vite, GSAP, `@gsap/react`, Lenis e Three.js já estavam declarados; React Three Fiber, Drei e Anime.js não estavam. Isso favorece trabalhar primeiro com o que já existe e só ampliar o stack quando houver uma necessidade concreta.

## Direção visual: Studio Freight, sem clonagem

### O que as fontes mostram

A [Studio Freight](https://studiofreight.com/) se apresenta como um estúdio que combina estratégia, design e tecnologia. No [case do próprio estúdio](https://studiofreight.com/work/studio-freight), a identidade é descrita como **“schematic surrealism”**: uma linguagem que atravessa desenho diagramático, abstração, formas simbólicas e uma composição editorial expressiva. A marca usa imagens e símbolos próprios; eles são referência de raciocínio, não material reutilizável.

A página da [Studio Freight no Awwwards](https://www.awwwards.com/studiofreight/) foi tratada somente como galeria de descoberta. A página não ofereceu conteúdo estável o bastante nesta pesquisa para confirmar notas, datas ou prêmios; portanto, este documento não faz afirmações sobre premiações.

### Tradução recomendada para o portfólio

- **Paleta:** preto e branco como estrutura, cinzas quentes como superfície e amarelo como sinal de ação, seleção e energia.
- **Tipografia:** títulos grandes, com presença editorial, combinados com texto funcional e uma camada monoespaçada para metadados.
- **Composição:** blocos amplos, números de seção, legendas curtas, linhas-guia, recortes e sobreposições controladas.
- **Imagem:** projetos tratados como “objetos editoriais”, com uma imagem dominante e informações técnicas legíveis.
- **Movimento:** entradas com intenção, mudanças de escala/posição e progressões de scroll que expliquem a hierarquia; evitar movimento ornamental contínuo.
- **Assinatura própria:** ilustração/esquema ligado a IA, automação, sistemas e cloud, em vez de copiar cavalo, chave, logotipo, imagens ou composição da Studio Freight.

Uma proposta inicial de tokens, a ser validada por contraste e pelos assets reais:

| Função              | Valor inicial |
| ------------------- | ------------: |
| Fundo principal     |     `#0A0A0A` |
| Superfície escura   |     `#171717` |
| Cinza estrutural    |     `#303030` |
| Texto secundário    |     `#A8A8A8` |
| Branco quente       |     `#F5F2E8` |
| Amarelo principal   |     `#FFD400` |
| Amarelo pressionado |     `#E6BE00` |

Esses valores não devem ser aceitos só por aparência. Estados de foco, texto sobre amarelo, textos secundários e controles precisam de contraste verificado; texto preto sobre o amarelo é a combinação inicial mais segura.

## Stack técnico

### React + Vite

| Item            | Avaliação                                                                                                                                                  |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fontes          | [React Learn](https://react.dev/learn), [Vite Guide](https://vite.dev/guide/)                                                                              |
| Papel           | Componentização, estado e composição da interface; servidor de desenvolvimento, HMR e build de produção                                                    |
| Compatibilidade | Natural para o repositório atual                                                                                                                           |
| Uso adaptado    | Componentes por seção, dados dos projetos separados da apresentação, lazy loading de módulos pesados                                                       |
| Limitações      | Não colocar efeitos imperativos no render; manter cleanup; não assumir versões por exemplos soltos — `package.json` e lockfile do projeto são a autoridade |
| Licença         | [React: MIT](https://github.com/facebook/react/blob/main/LICENSE); [Vite: MIT](https://github.com/vitejs/vite/blob/main/LICENSE)                           |

### Three.js

| Item            | Avaliação                                                                                                                                                                                    |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fontes          | [site](https://threejs.org/), [documentação](https://threejs.org/docs/), [guia de instalação](https://threejs.org/manual/en/installation.html), [GitHub](https://github.com/mrdoob/three.js) |
| Papel           | Cena 3D/WebGL ou WebGPU com identidade visual própria                                                                                                                                        |
| Compatibilidade | Pode ser usado diretamente em React por meio de um componente imperativo com `ref` e cleanup                                                                                                 |
| Uso adaptado    | Uma cena-assinatura no hero ou transição de projetos; import dinâmico; geometria, iluminação e texturas com orçamento explícito                                                              |
| Limitações      | Custo de GPU, memória, bateria e bundle; WebGLRenderer depende de WebGL 2 nas versões atuais; precisa de fallback para ausência de suporte, mobile fraco e redução de movimento              |
| Licença         | [MIT](https://github.com/mrdoob/three.js/blob/dev/LICENSE)                                                                                                                                   |

O guia oficial recomenda instalação por pacote e uso com um build tool como Vite. Addons são importados separadamente. Todos os imports de Three e addons devem vir da mesma versão; exemplos de outra release não devem ser copiados sem verificação.

### React Three Fiber

| Item            | Avaliação                                                                                                              |
| --------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Fontes          | [documentação](https://r3f.docs.pmnd.rs/), [GitHub](https://github.com/pmndrs/react-three-fiber)                       |
| Papel           | Renderer React declarativo para Three.js                                                                               |
| Compatibilidade | A documentação do projeto associa R3F v8 a React 18 e R3F v9 a React 19; a versão escolhida deve respeitar essa matriz |
| Uso adaptado    | Adotar se a cena exigir uma árvore de componentes 3D, estado React compartilhado ou reuso de objetos                   |
| Limitações      | Não reduz automaticamente o custo gráfico; adiciona abstração e exige domínio de Three.js                              |
| Licença         | [MIT](https://github.com/pmndrs/react-three-fiber/blob/master/LICENSE)                                                 |

### Drei

| Item            | Avaliação                                                                                       |
| --------------- | ----------------------------------------------------------------------------------------------- |
| Fontes          | [documentação](https://drei.docs.pmnd.rs/), [GitHub](https://github.com/pmndrs/drei)            |
| Papel           | Helpers e abstrações para React Three Fiber                                                     |
| Compatibilidade | Depende de R3F/Three compatíveis                                                                |
| Uso adaptado    | Importar apenas helpers que eliminem código real, como ambiente, controles ou carregamento      |
| Limitações      | Uma coleção grande de conveniências pode esconder custo e comportamento; não incluir por padrão |
| Licença         | [MIT](https://github.com/pmndrs/drei/blob/master/LICENSE)                                       |

### GSAP, `@gsap/react` e ScrollTrigger

| Item            | Avaliação                                                                                                                                                                                                                                   |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fontes          | [GSAP](https://gsap.com/), [documentação v3](https://gsap.com/docs/v3/), [GitHub](https://github.com/greensock/GSAP), [`@gsap/react`](https://github.com/greensock/react), [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) |
| Papel           | Timelines, sequenciamento, animações de entrada/saída e progressões ligadas ao scroll                                                                                                                                                       |
| Compatibilidade | Oficialmente agnóstico de framework; `useGSAP()` integra o ciclo de vida React e usa `gsap.context()` para cleanup                                                                                                                          |
| Uso adaptado    | Uma timeline por bloco narrativo, `scope` por componente e `contextSafe()` para callbacks tardios                                                                                                                                           |
| Limitações      | Efeitos sem cleanup duplicam em remount; muitos triggers elevam custo; pinning e scrub precisam de teste em mobile; registrar plugins explicitamente                                                                                        |
| Licença         | Runtime GSAP sob a [Standard “No Charge” License](https://gsap.com/community/standard-license/), não MIT; o repositório de skills oficial é MIT                                                                                             |

A licença padrão atual permite uso em sites, aplicativos e interfaces, inclusive uso comercial sem cobrança, e menciona código gerado por IA. Ela restringe produtos concorrentes de criação visual/no-code. Como é uma licença própria e sujeita a atualização, deve ser revisada antes de redistribuição, white-label ou mudança relevante do produto.

### Lenis

| Item            | Avaliação                                                                                                                                            |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fontes          | [site](https://www.lenis.dev/), [GitHub/README](https://github.com/darkroomengineering/lenis)                                                        |
| Papel           | Smooth scroll baseado em scroll nativo, com integração a animação/WebGL                                                                              |
| Compatibilidade | Possui adapter React e integração oficial documentada com ScrollTrigger                                                                              |
| Uso adaptado    | Instância única no shell da aplicação; desativar quando redução de movimento ou compatibilidade exigir                                               |
| Limitações      | Testar navegação por teclado, touch, âncoras, foco, overlays e scroll aninhado; evitar dois loops RAF; recursos de auto-toggle dependem do navegador |
| Licença         | [MIT](https://github.com/darkroomengineering/lenis/blob/main/LICENSE)                                                                                |

Na integração oficial com GSAP, Lenis avisa o ScrollTrigger a cada scroll e seu `raf` é acionado pelo ticker do GSAP, com conversão de segundos para milissegundos. Se essa integração for adotada, não se deve manter simultaneamente o `autoRaf` do Lenis.

### Anime.js

| Item            | Avaliação                                                                                                                          |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Fontes          | [site](https://animejs.com/), [documentação](https://animejs.com/documentation/), [GitHub](https://github.com/juliangarnier/anime) |
| Papel           | Motor modular para animações JavaScript, SVG, scroll observer e WAAPI                                                              |
| Compatibilidade | ESM e utilizável dentro de efeitos React com cleanup                                                                               |
| Uso adaptado    | Alternativa para um efeito pequeno e autocontido, caso GSAP não seja usado nessa área                                              |
| Limitações      | Não dividir a mesma timeline/elementos entre Anime.js e GSAP; confirmar API na documentação da versão instalada                    |
| Licença         | [MIT](https://github.com/juliangarnier/anime/blob/master/LICENSE.md)                                                               |

Como GSAP já estava declarado no projeto no snapshot pesquisado, Anime.js não traz benefício suficiente para ser adicionado apenas por variedade.

### 21st.dev e MCP

| Item                  | Avaliação                                                                                                                                                        |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fontes                | [21st.dev](https://21st.dev/), [MCP](https://21st.dev/mcp), [Help](https://help.21st.dev/), [Magic MCP legado](https://github.com/21st-dev/magic-mcp)            |
| Papel                 | Busca, geração, instalação e publicação de componentes React/Tailwind                                                                                            |
| Compatibilidade Codex | A página oficial do MCP e o README do proxy legado documentam Codex como cliente suportado                                                                       |
| Uso adaptado          | Pesquisar padrões de interação e aproveitar trechos só após revisão de acessibilidade, dependências, licença e ajuste ao design system                           |
| Limitações            | Serviço remoto, API key, créditos/quotas e dependência de rede; componentes podem ter qualidade e licença distintas; o proxy `magic-mcp` é legado                |
| Licença               | Não foi localizado um arquivo de licença no proxy legado durante esta pesquisa; verificar termos do serviço e a licença de cada componente antes de vendorizá-lo |

Nenhuma conexão MCP foi criada. O 21st.dev não deve decidir a direção de arte: componentes obtidos ali precisam ser reduzidos aos tokens, tipografia, espaçamento e linguagem de movimento deste portfólio.

## Integração recomendada

```text
React/Vite
├── CSS: layout, estados, hover/focus simples e fallback
├── GSAP + @gsap/react: timelines e entradas coordenadas
│   └── ScrollTrigger: somente narrativas realmente ligadas ao scroll
├── Lenis: camada opcional de suavização
└── Three.js: ilha 3D lazy-loaded
    └── R3F + Drei: apenas se a complexidade da ilha justificar
```

Regras práticas:

- Cada elemento deve ter **um proprietário de movimento**. Não animar a mesma propriedade simultaneamente com CSS, GSAP, Anime.js e Three.
- Usar `transform` e `opacity` nas transições frequentes; evitar layout thrashing.
- Toda animação ligada a componente precisa ser revertida no unmount.
- `prefers-reduced-motion` deve desligar smooth scroll, scrub, parallax e câmera contínua, mantendo conteúdo e navegação completos.
- A cena 3D deve ser carregada depois do conteúdo crítico, pausar fora da viewport e ter poster/fallback.
- Não esconder conteúdo essencial atrás de WebGL, hover ou uma timeline.
- Fazer validação real em desktop, mobile, teclado, touch e navegador sem aceleração gráfica adequada.

## Matriz de licença

| Tecnologia/referência   | Licença ou condição                             | Consequência                                                                                                          |
| ----------------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| React                   | MIT                                             | Permitido com preservação do aviso                                                                                    |
| Vite                    | MIT                                             | Permitido com preservação do aviso                                                                                    |
| Three.js                | MIT                                             | Permitido com preservação do aviso                                                                                    |
| React Three Fiber       | MIT                                             | Permitido com preservação do aviso                                                                                    |
| Drei                    | MIT                                             | Permitido com preservação do aviso                                                                                    |
| Lenis                   | MIT                                             | Permitido com preservação do aviso                                                                                    |
| Anime.js                | MIT                                             | Permitido com preservação do aviso                                                                                    |
| GSAP runtime            | Standard “No Charge” License                    | Uso web/comercial geralmente permitido; rever restrições antes de redistribuir ou criar ferramenta visual concorrente |
| 21st.dev                | Serviço e componentes com condições próprias    | Verificar termos e licença por item antes de copiar                                                                   |
| Studio Freight/Awwwards | Conteúdo visual protegido; referência editorial | Não copiar identidade, assets, fontes, logotipo ou layout de modo substancial                                         |

## Registro de comandos

Comandos de instalação, inicialização, clonagem, configuração de MCP ou execução de skills: **nenhum**.

Foram executadas apenas leituras locais para orientar a compatibilidade:

- inventário de arquivos com `rg --files`;
- leitura de `package.json`;
- inspeção do estado do worktree com `git status --short`;
- inspeção da existência da pasta `docs`.

Nenhum desses comandos alterou o repositório. As alterações observadas fora destes dois documentos já existiam ou pertencem a outras frentes de trabalho e não foram tocadas nesta pesquisa.

## Fontes principais

- [Studio Freight](https://studiofreight.com/)
- [Studio Freight — case próprio](https://studiofreight.com/work/studio-freight)
- [Awwwards — Studio Freight](https://www.awwwards.com/studiofreight/)
- [React](https://react.dev/learn)
- [Vite](https://vite.dev/guide/)
- [Three.js](https://threejs.org/docs/)
- [React Three Fiber](https://r3f.docs.pmnd.rs/)
- [Drei](https://drei.docs.pmnd.rs/)
- [GSAP](https://gsap.com/docs/v3/)
- [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [`@gsap/react`](https://github.com/greensock/react)
- [Lenis](https://github.com/darkroomengineering/lenis)
- [Anime.js](https://animejs.com/documentation/)
- [21st.dev MCP](https://21st.dev/mcp)
