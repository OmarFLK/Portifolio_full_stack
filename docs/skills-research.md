# Pesquisa dos repositórios de skills

> Snapshot de pesquisa: 25 de julho de 2026.
>
> Estado: análise de `README`, `SKILL.md`, estrutura e licença. Nenhuma skill, plugin, CLI, MCP, dependência ou repositório foi instalado/clonado.

## Conclusão

Não vale despejar todos os repositórios no projeto. Eles se sobrepõem, às vezes usam regras contraditórias e alguns foram escritos para Claude, não para Codex. A melhor estratégia é extrair um conjunto pequeno e rastreável de princípios para futuras skills locais.

Prioridade recomendada:

1. **Fontes-base:** Anthropic Frontend Design, GSAP Skills oficial, Motion Design Skill da LottieFiles e Emil Kowalski.
2. **Fontes estruturadas:** UI UX Pro Max e Design DNA, com adaptação de caminhos/scripts e separação clara entre observado e inferido.
3. **Fontes de auditoria/orquestração:** gstack e Genjutsu, aproveitando rubricas e etapas, sem instalar seus runtimes.
4. **Consulta cautelosa:** OpenClaw derivative e CloudAI-X Three.js Skills.
5. **Fora do escopo:** App Store Screenshots.

## Critério de compatibilidade Codex

- **Nativa/documentada:** o projeto upstream cita Codex ou o diretório/formato de skills do Codex.
- **Adaptável:** o conteúdo de `SKILL.md` é portátil, mas comandos, caminhos, ferramentas ou convenções são específicos de Claude.
- **Não comprovada:** não há suporte Codex documentado ou há inconsistências que impedem recomendar execução direta.

Compatibilidade não significa autorização para instalar nem garantia de qualidade. Todo script de uma skill deve ser lido antes de ser executado; toda API técnica deve ser confirmada na documentação oficial da biblioteca.

## Avaliação por repositório

### 1. UI UX Pro Max

- **Fonte:** [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)
- **Foco:** base pesquisável de estilos, paletas, pares tipográficos, regras de UX, tipos de produto e orientações por stack.
- **Compatibilidade Codex:** **nativa/documentada**. O README inclui inicialização para Codex.
- **Uso adaptado:** usar a base como ferramenta de exploração e checklist; converter a seleção final em tokens e decisões explícitas do portfólio.
- **Limitações:** o `SKILL.md` encontrado usa variáveis/caminhos de plugin Claude em alguns fluxos; requer adaptação para um diretório local do projeto. A busca depende de Python. A edição gratuita e ofertas premium têm escopos diferentes.
- **Licença:** [MIT](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/main/LICENSE).
- **Comando executado:** nenhum.

Não aceitar a primeira combinação retornada como design final. A paleta amarela/preta/branca, o conteúdo real e a legibilidade têm precedência sobre a base genérica.

### 2. Anthropic Frontend Design

- **Fontes:** [anthropics/skills](https://github.com/anthropics/skills), [`frontend-design/SKILL.md`](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md)
- **Foco:** direção visual distinta, hierarquia, tipografia, estrutura editorial, movimento deliberado e crítica contra interfaces genéricas.
- **Compatibilidade Codex:** **adaptável**. O conteúdo é legível como Agent Skill, mas os fluxos de instalação e parte do vocabulário do repositório são voltados ao ecossistema Claude.
- **Uso adaptado:** definir uma tese visual antes do código, fazer uma primeira passada de tokens/layout/assinatura e uma segunda passada de implementação/auditoria.
- **Limitações:** instruções criativas são heurísticas, não requisitos absolutos; o briefing, acessibilidade e performance prevalecem.
- **Licença:** [Apache-2.0 no diretório da skill](https://github.com/anthropics/skills/blob/main/skills/frontend-design/LICENSE.txt).
- **Comando executado:** nenhum.

É a melhor fonte para impedir “AI slop”, desde que “ser diferente” não reduza clareza, foco, contraste ou responsividade.

### 3. OpenClaw / Anthropic Frontend Design derivada

- **Fonte solicitada:** [openclaw/skills — `qrucio/anthropic-frontend-design`](https://github.com/openclaw/skills/blob/main/skills/qrucio/anthropic-frontend-design/SKILL.md)
- **Foco:** variação “anti-slop” combinada a regras práticas de UI/UX.
- **Compatibilidade Codex:** **não comprovada**.
- **Uso adaptado:** aproveitar somente checklists úteis: tipografia intencional, paleta contextual, ícones vetoriais, contraste, foco, responsividade e redução de movimento.
- **Limitações:** a página GitHub indicada esteve instável/indisponível, embora o conteúdo bruto tenha sido localizado; ela chama script de busca cuja resolução no pacote isolado não ficou comprovada. É derivada de outras fontes e exige revisão de proveniência.
- **Licença:** o repositório declara MIT, mas conteúdo derivado pode manter obrigações próprias do upstream; preferir Anthropic e UI UX Pro Max originais.
- **Comando executado:** nenhum.

### 4. Emil Kowalski Skills

- **Fontes:** [emilkowalski/skills](https://github.com/emilkowalski/skills), [site da skill](https://emilkowal.ski/skill)
- **Foco:** engenharia de design, revisão de interface, vocabulário e oportunidades de animação, timing, easing e performance percebida.
- **Compatibilidade Codex:** **nativa/documentada** pelo formato Agent Skills e pelo instalador citado no README.
- **Uso adaptado:** checklist de “animar ou não”, transições curtas, entrada com ease-out, movimento com ease-in-out, loops lineares, transform/opacity e revisão “antes/depois”.
- **Limitações:** algumas recomendações são opiniões de design e algumas afirmações técnicas podem envelhecer; validar na biblioteca e nos navegadores atuais. Ações frequentes devem ter pouca ou nenhuma animação.
- **Licença:** [MIT](https://github.com/emilkowalski/skills/blob/main/LICENSE).
- **Comando executado:** nenhum.

### 5. App Store Screenshots

- **Fontes:** [ParthJadhav/app-store-screenshots](https://github.com/ParthJadhav/app-store-screenshots), [`SKILL.md`](https://github.com/ParthJadhav/app-store-screenshots/blob/main/skills/app-store-screenshots/SKILL.md)
- **Foco:** geração e exportação de screenshots de lojas de aplicativos por meio de um editor Next.js.
- **Compatibilidade Codex:** **nativa/documentada**.
- **Uso adaptado:** nenhum neste portfólio.
- **Limitações:** cria um projeto, instala dependências, inicia servidor e grava/exporta assets; é um workflow de alto impacto e específico para App Store/Google Play.
- **Licença:** [MIT](https://github.com/ParthJadhav/app-store-screenshots/blob/main/LICENSE).
- **Comando executado:** nenhum.

Recomendação: manter fora do repositório. Se houver um aplicativo a publicar no futuro, usar em workspace separado e com autorização explícita.

### 6. gstack / Plan Design Review

- **Fontes:** [garrytan/gstack](https://github.com/garrytan/gstack), [`plan-design-review/SKILL.md`](https://github.com/garrytan/gstack/blob/main/plan-design-review/SKILL.md)
- **Foco:** auditoria de plano e design por dimensões, nota de 0 a 10, definição do que seria nota 10 e ajuste do plano.
- **Compatibilidade Codex:** **nativa/documentada** no setup atual do projeto.
- **Uso adaptado:** aproveitar a rubrica: intencionalidade, hierarquia, tipografia, espaçamento, acessibilidade, responsividade, movimento e performance.
- **Limitações:** stack pesado, requisitos de Git/Bun/Node, scripts de configuração, update checks, telemetria/configuração local e várias ferramentas originalmente nomeadas para Claude. A skill isolada não deve ser copiada sem seu runtime e sem revisão.
- **Licença:** [MIT](https://github.com/garrytan/gstack/blob/main/LICENSE).
- **Comando executado:** nenhum.

As notas são instrumento de conversa, não verdade objetiva. Escolhas de gosto com impacto material devem continuar sob aprovação humana.

### 7. Design DNA

- **Fonte:** [zanwei/design-dna](https://github.com/zanwei/design-dna)
- **Foco:** extrair um schema de design, analisar referências e gerar uma interface a partir de tokens, tipografia, layout, componentes e efeitos.
- **Compatibilidade Codex:** **nativa/documentada** pelo formato Agent Skills.
- **Uso adaptado:** usar a estrutura de evidências para registrar o que foi observado nas imagens do briefing e converter isso em tokens próprios.
- **Limitações:** screenshot não prova fonte exata, easing, grid, código ou intenção do autor. Toda análise deve marcar campos como **observado**, **inferido** ou **decidido para o projeto**. Não copiar assets nem reproduzir identidade de terceiros.
- **Licença:** [MIT](https://github.com/zanwei/design-dna/blob/main/LICENSE).
- **Comando executado:** nenhum.

### 8. Motion Design Skill

- **Fontes:** [LottieFiles/motion-design-skill](https://github.com/LottieFiles/motion-design-skill), [`SKILL.md`](https://github.com/LottieFiles/motion-design-skill/blob/main/skills/motion-design/SKILL.md)
- **Foco:** princípios de movimento independentes de ferramenta, timing, easing, coreografia, personalidade e redução de movimento.
- **Compatibilidade Codex:** **nativa/documentada**.
- **Uso adaptado:** criar um orçamento de movimento por seção, uma hierarquia de tempos e uma variante reduzida antes da implementação.
- **Limitações:** prescrições como número fixo de camadas ou rejeição universal de um tipo de transição são heurísticas criativas, não leis. Não exige usar runtime Lottie.
- **Licença:** [MIT](https://github.com/LottieFiles/motion-design-skill/blob/main/LICENSE).
- **Comando executado:** nenhum.

### 9. Three.js Skills

- **Fonte:** [CloudAI-X/threejs-skills](https://github.com/CloudAI-X/threejs-skills)
- **Foco:** coleção de skills para fundamentos, interação, shaders, partículas, física, loaders, materiais e pós-processamento em Three.js.
- **Compatibilidade Codex:** **não comprovada**; a documentação é centrada em Claude.
- **Uso adaptado:** somente como índice de tópicos. Toda API precisa ser conferida nos [docs atuais do Three.js](https://threejs.org/docs/) e, se aplicável, nos docs do R3F.
- **Limitações:** o README afirma auditoria para “r160+”, o que não garante compatibilidade com a versão atual; instruções de instalação observadas apontavam para outro repositório, sinal de inconsistência. Não executar.
- **Licença:** o README afirma MIT, mas não foi localizado um arquivo `LICENSE` no caminho esperado durante esta pesquisa. Tratar a licença como **não confirmada** até esclarecimento do upstream.
- **Comando executado:** nenhum.

### 10. GSAP Skills oficial

- **Fonte:** [greensock/gsap-skills](https://github.com/greensock/gsap-skills)
- **Foco:** core, timelines, ScrollTrigger, plugins, utilitários, React, performance e integrações.
- **Compatibilidade Codex:** **nativa/documentada**; o README cita o diretório de skills do Codex.
- **Uso adaptado:** principal referência de implementação para GSAP, especialmente registro de plugins, `useGSAP`, `scope`, `contextSafe`, cleanup e ScrollTrigger.
- **Limitações:** a preferência do material por GSAP não deve decidir sozinha a arquitetura; CSS continua adequado para estados simples. Conferir a versão instalada.
- **Licença:** [skills em MIT](https://github.com/greensock/gsap-skills/blob/main/LICENSE). Isso não muda a licença do runtime GSAP, que é a [Standard “No Charge” License](https://gsap.com/community/standard-license/).
- **Comando executado:** nenhum.

### 11. Genjutsu

- **Fonte:** [AThevon/genjutsu](https://github.com/AThevon/genjutsu)
- **Foco:** orquestração criativa com pipelines `cast` e `paint`, tese de interação, design system, animação, Three/R3F, Canvas e auditoria.
- **Compatibilidade Codex:** **não documentada**. A instalação oficial é para Claude Code/claude.ai.
- **Uso adaptado:** aproveitar três ideias: definir uma tese visual e de interação; escolher subáreas conforme o stack real; executar uma auditoria final de movimento, acessibilidade, responsividade e performance.
- **Limitações:** plugin complexo, detecção de caminhos do runtime Claude, comandos específicos de Claude e sub-skills vendorizadas de várias fontes. Uma cópia parcial pode quebrar resolução de arquivos ou perder avisos de atribuição.
- **Licença:** [MIT](https://github.com/AThevon/genjutsu/blob/main/LICENSE), com créditos e proveniência de conteúdo vendorizado que devem ser preservados.
- **Comando executado:** nenhum.

## Matriz comparativa

| Fonte                     | Codex           | Melhor uso aqui        | Risco principal                     | Licença                       |
| ------------------------- | --------------- | ---------------------- | ----------------------------------- | ----------------------------- |
| UI UX Pro Max             | Nativa          | Exploração + checklist | Caminhos/scripts precisam adaptação | MIT                           |
| Anthropic Frontend Design | Adaptável       | Direção de arte        | Heurística virar dogma              | Apache-2.0 da skill           |
| OpenClaw derivative       | Não comprovada  | Consulta pontual       | Proveniência/script ausente         | MIT do repo; revisar upstream |
| Emil Kowalski             | Nativa          | Motion e revisão       | Opiniões/dados envelhecerem         | MIT                           |
| App Store Screenshots     | Nativa          | Fora do escopo         | Alto impacto e projeto paralelo     | MIT                           |
| gstack                    | Nativa          | Rubrica de auditoria   | Runtime pesado/efeitos laterais     | MIT                           |
| Design DNA                | Nativa          | Evidência e tokens     | Confundir inferência com fato       | MIT                           |
| Lottie Motion Design      | Nativa          | Orçamento de movimento | Regras absolutas                    | MIT                           |
| CloudAI-X Three.js        | Não comprovada  | Índice de assuntos     | APIs antigas, install inconsistente | Não confirmada                |
| GSAP Skills               | Nativa          | Implementação GSAP     | Confundir licença da skill/runtime  | MIT da skill                  |
| Genjutsu                  | Não documentada | Pipeline e auditoria   | Claude-only e dependências internas | MIT + avisos upstream         |

## Proposta para futuras skills locais

Se o projeto realmente precisar de uma pasta de skills, criar poucas skills pequenas e específicas, em vez de copiar todos os repositórios:

```text
skills/
├── portfolio-art-direction/
│   └── SKILL.md
├── portfolio-motion/
│   └── SKILL.md
├── portfolio-3d/
│   └── SKILL.md
└── portfolio-audit/
    └── SKILL.md
```

### `portfolio-art-direction`

- Paleta amarela, preta, branca e cinzas;
- tese editorial inspirada em referências, mas autoral;
- regras tipográficas;
- tokens e grid;
- distinção entre observado, inferido e decidido;
- proibição explícita de copiar identidade/assets de terceiros.

### `portfolio-motion`

- GSAP + `@gsap/react` como fonte principal;
- CSS para estados simples;
- um proprietário por animação;
- budget por seção;
- cleanup, teclado, touch e `prefers-reduced-motion`;
- integração Lenis/ScrollTrigger validada.

### `portfolio-3d`

- Three.js oficial como autoridade;
- cena isolada e lazy-loaded;
- limites de draw calls, texturas, DPR e pós-processamento;
- pause fora da viewport;
- fallback estático e ausência de conteúdo essencial no canvas.

### `portfolio-audit`

- hierarquia, contraste e foco;
- responsividade real;
- movimento e redução de movimento;
- performance e bundle;
- links, formulários e download dos currículos;
- checagem de licenças e atribuições.

Ao criar essas skills, registrar no próprio arquivo a origem de cada regra, preservar avisos das licenças aplicáveis e preferir paráfrase/adaptação a cópia integral.

## Ordem de autoridade e resolução de conflitos

1. briefing e decisões explícitas do projeto;
2. acessibilidade, segurança e funcionamento;
3. documentação oficial da biblioteca e versão instalada;
4. skill local do projeto;
5. skill oficial do fornecedor;
6. skill de terceiros;
7. preferência estética ou regra absoluta de um autor.

Exemplos:

- Se uma skill disser “sempre anime”, mas a ação é frequente ou o usuário prefere movimento reduzido, **não animar**.
- Se uma skill apresentar uma API diferente da documentação do Three.js/GSAP instalado, seguir a documentação oficial da versão.
- Se duas skills sugerirem motores diferentes para o mesmo elemento, escolher um só.
- Se uma referência visual conflitar com contraste, foco ou legibilidade, preservar a acessibilidade.

## Registro de comandos

Comandos de instalação, clonagem, inicialização, setup, MCP ou execução de qualquer skill: **nenhum**.

Os READMEs foram usados como documentação; instruções de instalação publicadas por eles não foram executadas nem reproduzidas aqui como ações realizadas. A única atividade local relacionada a esta pesquisa foi leitura/inventário do repositório e criação destes documentos.

## Fontes

- [UI UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)
- [Anthropic Skills / Frontend Design](https://github.com/anthropics/skills/tree/main/skills/frontend-design)
- [OpenClaw Skills](https://github.com/openclaw/skills)
- [Emil Kowalski Skills](https://github.com/emilkowalski/skills)
- [App Store Screenshots](https://github.com/ParthJadhav/app-store-screenshots)
- [gstack](https://github.com/garrytan/gstack)
- [Design DNA](https://github.com/zanwei/design-dna)
- [Motion Design Skill](https://github.com/LottieFiles/motion-design-skill)
- [Three.js Skills](https://github.com/CloudAI-X/threejs-skills)
- [GSAP Skills](https://github.com/greensock/gsap-skills)
- [Genjutsu](https://github.com/AThevon/genjutsu)
