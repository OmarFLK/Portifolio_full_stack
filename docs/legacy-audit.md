# Auditoria do portfólio legado

Data da auditoria: 25/07/2026

Snapshot de referência: commit `966f808` (`Atualiza currículos com estágio em IA e automação`)

Branch encontrada: `feat/react-vite-portfolio-redesign`

## Escopo e método

Esta auditoria registra o legado anterior à reconstrução em React + Vite. Foram inspecionados o HTML, a folha de estilos, o JavaScript, o manifesto e lockfile do npm, os assets locais, os dois currículos atualmente usados pelo site e a configuração Git/deploy disponível no repositório.

Os dois arquivos antigos que já apareciam como removidos no working tree — `Curriculo_Omar_ENG.pdf` e `Curriculo_Omar_PTBR.pdf` — não foram abertos, restaurados ou alterados. Os links externos abaixo foram inventariados a partir do código e dos PDFs; a presença de uma URL nesta lista não é uma afirmação de que o destino continua online.

## Resumo executivo

O legado é uma página estática única, feita com HTML, CSS e JavaScript puro. Ela tem conteúdo relevante e reaproveitável — apresentação, formação, certificados, idiomas, cinco projetos, quatro experiências, links sociais e currículos — mas não tem arquitetura React, TypeScript, build, testes, lint, roteamento ou um processo de deploy documentado.

A experiência visual é inteiramente aquática: fundo azul, grid animado, bolhas, desfoque de “água” e glassmorphism. Essa camada deve ser substituída por completo conforme o briefing. O principal ativo a preservar é o conteúdo, não a implementação visual.

Os maiores riscos são:

- divergência entre o conteúdo do site e o conteúdo mais recente dos currículos;
- perda ou quebra de links e mídia durante a migração;
- custo alto dos vídeos locais e das animações contínuas;
- acessibilidade insuficiente, especialmente navegação por teclado e redução de movimento;
- ausência de configuração reproduzível de build/deploy;
- `node_modules` versionado, ausência de `.gitignore` e um gitlink quebrado;
- working tree já iniciado com duas remoções de PDFs antigos que precisam continuar preservadas.

## Estado do repositório e publicação

| Item                                  | Estado encontrado                                                                                |
| ------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Controle de versão                    | Git                                                                                              |
| Remote                                | `origin` → `https://github.com/OmarFLK/Portifolio_full_stack.git`                                |
| Commit-base                           | `966f808`                                                                                        |
| Branch de trabalho                    | `feat/react-vite-portfolio-redesign`                                                             |
| Branch principal local/remota         | `main` e `origin/main` no mesmo commit-base                                                      |
| Branch remota adicional               | `origin/master` aponta para o commit antigo `355c440`                                            |
| Alterações preexistentes              | `D Curriculo_Omar_ENG.pdf` e `D Curriculo_Omar_PTBR.pdf`                                         |
| Gerenciador de pacotes                | npm, identificado por `package-lock.json` v3                                                     |
| Aplicação legada                      | Arquivos estáticos servidos diretamente, sem etapa de build                                      |
| URL apresentada pelo próprio site     | `https://fullstackdevomar.vercel.app`                                                            |
| Configuração de deploy no repositório | Nenhuma configuração de Vercel, Netlify, GitHub Pages, Firebase, Render ou Cloudflare encontrada |
| CI/CD                                 | Não existe diretório `.github` nem workflow                                                      |
| Domínio customizado                   | Não há `CNAME`                                                                                   |

O link `fullstackdevomar.vercel.app` indica que existe ou existiu uma publicação na Vercel, mas o repositório não contém `vercel.json`, instruções de build ou outra evidência suficiente para determinar as configurações do projeto no painel da Vercel. A migração para Vite exigirá confirmar build command, output directory e branch de produção fora do repositório antes de trocar a publicação.

### Higiene do Git

- Não existe `.gitignore`.
- O snapshot rastreia 2.096 caminhos, dos quais 2.079 estão dentro de `node_modules`.
- O pack Git tem aproximadamente 39,8 MiB; a árvore `node_modules` instalada ocupava aproximadamente 219 MiB no disco durante a inspeção.
- Há uma entrada `Portifolio_full_stack` com modo Git `160000`, apontando para o commit `5e7b4e6`, mas não há `.gitmodules`. Trata-se de um gitlink sem configuração de submódulo utilizável; o diretório aparece vazio no working tree.
- `main` e `master` remotas coexistem em históricos diferentes. A automação de deploy deve usar uma branch explicitamente definida.

## Estrutura atual

```text
/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── assets/
│   ├── icons/
│   │   ├── github.png
│   │   ├── linkedin.png
│   │   ├── sites_img.png
│   │   └── whatsapp.png
│   └── videos/
│       ├── eduexp.mp4
│       ├── finexp.mp4
│       └── opensourceexp.mp4
├── Curriculo_OmarSaliba_PT-BR.pdf
├── Curriculo_OmarSaliba_ENG.pdf
├── package.json
├── package-lock.json
├── node_modules/                 # versionado no legado
└── Portifolio_full_stack         # gitlink sem .gitmodules
```

Não foram encontrados:

- fontes locais;
- fotografias ou imagens de projeto além dos ícones;
- modelos 3D, texturas WebGL ou shaders;
- arquivos React/JSX/TS/TSX;
- configuração Vite;
- rotas reais;
- API ou back-end;
- formulário de contato;
- analytics;
- service worker ou PWA;
- testes;
- lint/formatter configurados;
- README ou documentação de execução/deploy;
- `robots.txt`, sitemap ou manifesto web.

## Arquitetura e dependências

### HTML

`index.html` contém toda a estrutura, o conteúdo padrão em português, CSS inline do loader e JavaScript inline do efeito de digitação. A navegação é feita somente por âncoras para seções da mesma página.

### CSS

`css/style.css` concentra todo o layout, responsividade, glassmorphism, grid, bolhas, barras de idioma, cards e animações. Há breakpoints em `768px` e `480px`, sem estratégia específica para telas muito grandes, tablets em landscape ou preferências de movimento.

### JavaScript

`js/main.js` contém:

- todos os dicionários de tradução em português, espanhol e inglês;
- troca de idioma e persistência em `localStorage`;
- menu hamburger;
- estado visual do header durante scroll;
- revelação por `IntersectionObserver`;
- criação aleatória de 24 bolhas;
- ajuste de `backdrop-filter` no scroll.

### npm

O `package.json` legado declara apenas:

- `motion` `^12.29.2`;
- `three` `^0.182.0`.

Nenhuma das duas dependências é importada pelo HTML ou JavaScript atual. O manifesto não possui `name`, `version`, `private`, `type`, scripts de desenvolvimento/build/teste ou engines. O `package-lock.json` usa o nome `OpenSource Lab`, enquanto o `package.json` não define nome.

## Conteúdo e seções existentes

### Loader

- Título digitado: `Omar Saliba` / `Portifolio`.
- Subtítulo digitado: `Dev FullStack`.
- Tela preta em fullscreen.
- O script a remove após 5 segundos; o CSS também define um fade com início após 6 segundos, criando duas regras de encerramento incompatíveis.

### Header e navegação

- Marca textual: `Omar Saliba`.
- Links internos: Sobre, Formação, PowerBI/Artigos, Projetos e Experiência.
- Seletor de idioma: português, espanhol e inglês.
- Menu hamburger em viewport de até 768px.

### Sobre / hero

O conteúdo apresenta Omar Saliba como profissional de tecnologia, formado no Ensino Médio Técnico em TI pelo Senac Aclimação, atualmente cursando Inteligência Artificial e Ciência de Dados no Instituto Mauá de Tecnologia, com certificações em Python para Ciência de Dados e Power BI e atuação declarada em desenvolvimento full stack.

O texto-base em português afirma “experiência em três projetos completos”, mas a grade atual exibe cinco projetos preenchidos. Essa quantidade deve ser reconciliada, não propagada automaticamente.

### Currículos

- Download PT-BR: `Curriculo_OmarSaliba_PT-BR.pdf`.
- Download em inglês: `Curriculo_OmarSaliba_ENG.pdf`.

Os dois PDFs são de uma página, produzidos no Canva e possuem camada de texto extraível. Eles incluem dados de contato, resumo, experiências, projetos, certificações, idiomas, cursos e habilidades.

Ambos já contêm a experiência mais recente:

- PT-BR: **Estagiário em IA e Automação — OneBox - DNE | Atual**;
- inglês: **AI & Automation Intern — OneBox - DNE | Current**;
- atividades citadas: soluções de IA e automação com serviços AWS, APIs REST com Java/Python/FastAPI, manutenção, correção de bugs e integração com MySQL/PostgreSQL.

Pontos de atenção dos PDFs:

- o texto extraído de boa parte do layout apresenta espaçamento entre praticamente todos os caracteres, o que pode reduzir a qualidade de leitura por ATS e tecnologias assistivas;
- algumas URLs quebram no meio da palavra durante a extração;
- o PDF em inglês conserva a linha de especialidades do topo em português;
- o metadado `/Title` do PDF em inglês é `Curriculo_OmarSaliba_PT-BR`;
- os PDFs citam conteúdos que não coincidem integralmente com o site, detalhados em “Conflitos de fonte”.

### Redes e contato

O hero oferece três links:

- GitHub;
- WhatsApp;
- LinkedIn.

Não há seção formal de contato, formulário ou link de e-mail no HTML. Os PDFs contêm telefone, e-mail, LinkedIn, GitHub e localização.

### Formação

- Ensino Médio Técnico em TI no Senac Aclimação, concluído em 2024.
- Graduação em andamento em Inteligência Artificial e Ciência de Dados no Instituto Mauá de Tecnologia.

### Informações adicionais e certificados no site

- Alura: Python, HTML/CSS e Git/GitHub; o texto diz “2 cursos”, embora enumere três grupos.
- IMT — Python para Ciência de Dados.
- IMT — Power BI Básico.
- IBM — Web Development Fundamentals.
- IBM — Introduction to Cloud Computing.
- ALR — Excel Intermediário/Avançado.
- ALR — HTML e CSS.
- ALR — Python.
- ALR — Git/GitHub.
- EMED — Melhor Apresentação Gráfica.
- EMED — Originalidade de Criação.

Os PDFs ainda citam `USP/MBX — Introdução ao Python e Machine Learning`, que não aparece no site. A lista final precisa ser validada a partir de uma fonte única.

### Idiomas

| Idioma    | Nível exibido                           |
| --------- | --------------------------------------- |
| Português | Nativo                                  |
| Espanhol  | B2                                      |
| Inglês    | A2–B1 no gráfico; B1 no texto adicional |
| Árabe     | A1                                      |

Os rótulos são traduzidos nos três idiomas. Os níveis numéricos permanecem iguais.

### Power BI / Artigos

- Texto declara trabalhos no Behance e artigos no Google Drive.
- O próprio texto chama os links de temporários e diz que serão substituídos.
- Não há preview, case study, artigo incorporado ou dashboard Power BI no site.

### Projetos

| Projeto                                | Descrição/tecnologias declaradas                                                                 | Mídia               | Destinos                             |
| -------------------------------------- | ------------------------------------------------------------------------------------------------ | ------------------- | ------------------------------------ |
| Automação de Enriquecimento de Leads   | Automação em Python para enriquecer planilhas Excel com informações públicas via LinkedIn/Google | YouTube incorporado | GitHub; sem site                     |
| Sistema de Reservas para Restaurantes  | Python, FastAPI, React, PostgreSQL, TailwindCSS e JWT                                            | YouTube incorporado | GitHub e Vercel                      |
| OpenSource Lab — Portfólio Open Source | Hub de projetos e soluções open source                                                           | `opensourceexp.mp4` | Repositório deste portfólio e Vercel |
| EduCore — Sistema de Gestão Acadêmica  | HTML, CSS, JavaScript, Node.js e MongoDB                                                         | `eduexp.mp4`        | GitHub e vídeo no YouTube            |
| FinCore — Plataforma Financeira        | HTML, CSS e JavaScript                                                                           | `finexp.mp4`        | GitHub e vídeo no YouTube            |
| Projeto 06                             | Card-placeholder, sem projeto real                                                               | Placeholder CSS     | Links “Adicionar” desabilitados      |

Existem chaves de tradução não utilizadas para `Projeto 05` e para rótulos de “assistir vídeo”.

### Experiência exibida no site

1. Assistente de Suporte Técnico e Atendimento ao Cliente.
2. Consultor Tecnológico na Mauá Júnior, marcado como cargo atual.
3. Trainee na Mauá Júnior, com formação multidisciplinar.
4. Programador autônomo Júnior.

O HTML não apresenta empresa/data para o primeiro e o quarto item. As traduções cobrem PT, ES e EN.

### Footer

Texto simples de direitos reservados: `© Omar Saliba — Todos os direitos reservados`, traduzido nos três idiomas. Não há ano, navegação secundária, contatos, política de privacidade ou informação de versão.

## Funcionalidades existentes

| Funcionalidade         | Implementação atual                                       |
| ---------------------- | --------------------------------------------------------- |
| Intro digitada         | JavaScript inline com `setTimeout`                        |
| Navegação              | Links de hash na mesma página                             |
| Header fixo            | Glassmorphism e mudança de opacidade após 10 px de scroll |
| Menu mobile            | Classes `.active` em um `div` hamburger e no menu         |
| Idiomas                | Dicionário client-side PT/ES/EN                           |
| Persistência de idioma | `localStorage` em `portfolio-language`                    |
| Revelação de seções    | `IntersectionObserver`, registrado após 5 segundos        |
| Background             | Grid CSS animado                                          |
| Bolhas                 | 24 `span`s gerados aleatoriamente por JavaScript          |
| Distorção              | `backdrop-filter` atualizado em todo evento de scroll     |
| Gráfico de idiomas     | Barras CSS animadas com percentuais visuais               |
| Currículos             | Download direto dos dois PDFs                             |
| Projetos               | Três vídeos MP4 locais e dois iframes YouTube             |
| Links externos         | Redes sociais, projetos, Behance, Drive, YouTube e Vercel |

Não existem formulários, envio de mensagem, banco de dados, autenticação, CMS, analytics ou chamadas a APIs próprias.

## Links externos inventariados

### Perfil, redes e recursos

- `https://github.com/OmarFLK`
- `https://wa.me/5511948485194`
- `https://www.linkedin.com/in/omar-saliba-28b870230/`
- `https://www.behance.net/flokuz`
- `https://drive.google.com/drive/folders/1CNYAGPPW9hi4tpLE_kTS-E526aJl8nvN?usp=sharing`

### Projetos e publicação

- `https://github.com/OmarFLK/script_automa-o_planilha_python`
- `https://github.com/OmarFLK/sistemaReservaRestaurantes`
- `https://sistema-reserva-restaurantes.vercel.app`
- `https://github.com/OmarFLK/Portifolio_full_stack`
- `https://fullstackdevomar.vercel.app`
- `https://github.com/OmarFLK/Projeto_Poliedro_OFABA`
- `https://youtu.be/K9OxcgAbmo8`
- `https://github.com/OmarFLK/FinCore.git`
- `https://youtu.be/UhHdgLxBPW4`

### Vídeos incorporados

- `https://www.youtube.com/embed/m5FC2Qysmaw`
- `https://www.youtube.com/embed/mqfGfd3WbR8`

### Links adicionais encontrados nos PDFs

- `https://github.com/OmarFLK/portifolio` é citado como “Professional Portfolio”, enquanto o site e o remote Git atual usam `Portifolio_full_stack`.
- Os PDFs também repetem GitHub, LinkedIn e links dos projetos. Algumas URLs são fragmentadas pela camada de texto do PDF.

Todos os links com `target="_blank"` no HTML estão sem `rel="noopener noreferrer"`. Navegadores modernos normalmente isolam `_blank`, mas a proteção e a intenção devem ser explícitas.

## Assets reutilizáveis

### Ícones

| Arquivo         | Dimensões |  Tamanho | Avaliação                                                    |
| --------------- | --------: | -------: | ------------------------------------------------------------ |
| `github.png`    |   512×512 |  6.026 B | Semântico e reutilizável; preferir SVG otimizado no redesign |
| `linkedin.png`  |   600×601 | 37.750 B | Semântico; resolução excessiva para exibição a 22 px         |
| `sites_img.png` |   980×980 | 68.716 B | Genérico para links de site; resolução excessiva             |
| `whatsapp.png`  |   512×512 |  8.944 B | Semântico e reutilizável; preferir SVG otimizado             |

Os quatro PNGs somam aproximadamente 118,6 KiB, mas são renderizados a apenas 22 px ou 16 px. As funções semânticas podem ser preservadas; os arquivos devem ser substituídos por vetores consistentes e com licença verificada.

### Vídeos

| Arquivo             | Resolução / FPS  | Duração |      Tamanho |
| ------------------- | ---------------- | ------: | -----------: |
| `eduexp.mp4`        | 1280×720, 30 fps |    1:31 | 14.842.860 B |
| `finexp.mp4`        | 1280×720, 24 fps |    0:34 |  5.976.711 B |
| `opensourceexp.mp4` | 1280×720, 30 fps |    0:13 |  5.923.158 B |

Os vídeos locais somam 25,5 MiB. Eles são evidências valiosas dos projetos e devem ser preservados como fontes originais, mas não servidos dessa forma na primeira carga. O redesign deve gerar versões otimizadas, posters e carregamento sob demanda.

### Currículos

- `Curriculo_OmarSaliba_PT-BR.pdf`: 104.704 B.
- `Curriculo_OmarSaliba_ENG.pdf`: 120.017 B.

São assets de produção e devem continuar disponíveis por URLs estáveis. Não renomear sem manter compatibilidade ou atualizar todos os consumidores.

### Conteúdo reutilizável

- biografia e posicionamento profissional, após conciliação com os PDFs;
- formação, certificados e idiomas;
- títulos, descrições, tecnologias e URLs dos projetos;
- experiências profissionais;
- traduções PT/ES/EN como base editorial;
- nomes e funções das redes sociais;
- iniciais `OM` como possível elemento de marca, sem obrigação de preservar o favicon atual.

## Problemas técnicos

### Críticos/altos

- Não há React, Vite ou TypeScript; a migração é uma reconstrução, não uma simples refatoração.
- Não há build, scripts npm, teste, lint, verificação de tipos ou documentação de execução.
- `node_modules` está versionado e não existe `.gitignore`.
- Há um gitlink `Portifolio_full_stack` sem `.gitmodules`.
- O deploy não é reproduzível a partir dos arquivos presentes.
- Conteúdo fica duplicado entre HTML, três dicionários JavaScript e dois PDFs, favorecendo divergência.
- O site continua exibindo “Programador autônomo Júnior”, enquanto os currículos mais recentes exibem “Estagiário em IA e Automação — OneBox - DNE”.
- Os dois PDFs antigos já estavam marcados para remoção antes da migração; operações Git amplas podem restaurá-los ou incluí-los acidentalmente.

### Médios

- O loader mistura CSS e JavaScript inline com o restante da aplicação, dificultando CSP, manutenção e testes.
- O JavaScript consulta elementos globais e adiciona listeners sem proteção consistente contra elementos ausentes; pequenas mudanças de markup podem interromper o arquivo inteiro.
- A tradução de trechos ricos usa `innerHTML`. Hoje as strings são locais e controladas, mas o acoplamento aumenta o risco se o conteúdo vier de CMS/API.
- Há chaves de tradução mortas e conteúdo padrão duplicado.
- Duas definições posteriores de `.glass-header` dependem da ordem da cascata.
- Existem keyframes não utilizados (`waterMove` e `float`).
- O favicon é um SVG inline dentro de data URI multilinha, com Arial hard-coded e markup pouco robusto.
- Não há fallback visual/textual para falha dos vídeos e iframes.
- Não há política de privacidade para embeds de terceiros nem variante `youtube-nocookie.com`.

## Problemas de UI

- Identidade aquática genérica e dominante, explicitamente incompatível com a nova direção.
- Arial/Helvetica como tipografia global, sem sistema tipográfico ou personalidade.
- Azul é praticamente a única cor; hierarquia depende de variações muito próximas da mesma tonalidade.
- Cards, botões e superfícies repetem o mesmo glassmorphism, produzindo pouca diferenciação entre tipos de conteúdo.
- Textos longos ficam concentrados em grandes blocos, especialmente formação e experiências.
- O hero não apresenta prova visual de projetos acima da dobra.
- A grade inclui um card-placeholder visível, que reduz a percepção de acabamento.
- Os cards de projeto não apresentam tags ou uma leitura rápida consistente das tecnologias.
- Os vídeos usam enquadramento fixo de `220px` sem poster ou direção de arte por projeto.
- Há inconsistências de escrita e nomenclatura: `Portifolio`, `DeV.`, `Dev FullStack`, `Data Science - I.A.`, `PowerBI`, além de variações entre site e PDFs.
- No breakpoint de até 480 px, `.btn-group` é colocado em coluna, mas uma regra posterior devolve `.resource-buttons` para linha; a cascata torna o comportamento mobile menos previsível.

## Problemas de UX

- Uma intro bloqueia o conteúdo por 5 segundos em toda visita, sem opção de pular.
- As seções começam com `opacity: 0` e só são observadas após os mesmos 5 segundos; erro ou ausência de JavaScript pode deixar o conteúdo invisível.
- A navegação por hash não define `scroll-margin-top`, podendo posicionar títulos sob o header fixo.
- O menu mobile não fecha ao selecionar um link normal; ele é fechado apenas após escolher idioma.
- Não há destaque da seção atual, indicador de progresso ou retorno rápido ao topo.
- Os links de EduCore e FinCore são rotulados como “Site”, mas apontam para vídeos no YouTube.
- O card sem projeto usa links “Adicionar” com `href="#"`; isso parece uma função quebrada para visitantes.
- A opção `aria-disabled` não desativa semanticamente os anchors para teclado.
- Vídeos locais e YouTube iniciam automaticamente, sem controle oferecido pelo layout.
- Abrir redes e projetos em nova aba não é comunicado.
- A seção “PowerBI / Artigos” avisa ao visitante que os links são temporários.
- Não há contato por e-mail no site nem chamada clara para contratação/conversa.
- A seleção de idioma não cria URLs compartilháveis; recarregar em outro dispositivo sempre começa em português.

## Problemas de performance

- Três vídeos locais em autoplay podem transferir até 25,5 MiB, além de dois players do YouTube.
- Os MP4 não possuem `poster`, `preload="none"` ou lazy loading controlado por interseção.
- Os embeds YouTube adicionam JavaScript, conexões e custo de terceiros mesmo sendo carregados com `loading="lazy"`.
- Um overlay fullscreen aplica `backdrop-filter`; o valor é atualizado em todo evento de scroll sem `requestAnimationFrame` ou throttling.
- O grid anima indefinidamente e 24 bolhas também mantêm animações contínuas.
- Glassmorphism usa vários `backdrop-filter` e sombras grandes simultaneamente.
- O loader atrasa artificialmente LCP e interação útil.
- Ícones raster são muito maiores que o tamanho de renderização.
- Não há pipeline de compressão, hashing, code splitting ou budget de assets.
- `node_modules` versionado aumenta clone, diff, deploy context e risco de cache inválido.

## Problemas de acessibilidade

- Não existe link “pular para o conteúdo”.
- Não há elemento `<main>` nem `<nav>`; o menu usa `div`.
- O hamburger é um `div`, sem função de botão, foco por teclado, nome acessível ou `aria-expanded`.
- O seletor de idioma remove o outline (`outline: 0`) e não define um estado `:focus-visible` substituto.
- O listbox de idiomas não implementa navegação por setas, Home/End ou gerenciamento de foco esperado.
- Não há estilos de foco visíveis globais para links e controles.
- Existem dois `h1` no DOM: o loader e o hero.
- As barras de idioma são apenas visuais; não usam `progress`, `meter`, `aria-valuenow` ou descrição equivalente.
- Vídeos locais não têm título acessível, controles, legendas, transcrição ou fallback textual.
- Ícones dentro dos links de projeto não possuem `alt`; leitores podem anunciar o nome do arquivo.
- Conteúdo animado não respeita `prefers-reduced-motion`.
- Autoplay, parallax/desfoque no scroll, bolhas, grid e barras podem afetar pessoas sensíveis a movimento.
- O loader não anuncia progresso e não permite bypass.
- Textos com opacidade reduzida e azul sobre superfícies translúcidas precisam de teste formal de contraste; não há evidência de auditoria WCAG.
- Os links “desabilitados” continuam semanticamente anchors focáveis com `href="#"`.
- Sem JavaScript, o conteúdo com `.reveal` permanece visualmente escondido.

Pontos positivos existentes: `lang="pt-br"` inicial, atualização dinâmica do atributo `lang`, títulos nos iframes, `aria-expanded` no seletor de idioma, `aria-selected` nas opções, `alt` nos ícones sociais e `loading="lazy"` nos dois iframes.

## Problemas de SEO

- Apenas `charset`, `viewport` e `<title>` estão presentes.
- Não há meta description, canonical, Open Graph, Twitter Cards, author, theme-color ou dados estruturados.
- Não há `robots.txt`, sitemap ou estratégia de indexação.
- Não há URLs próprias por idioma nem `hreflang`; espanhol e inglês só aparecem após JavaScript.
- Não existe semântica `<main>`, `<nav>`, `<article>` ou dados estruturados de `Person`/`CreativeWork`.
- O loader adiciona um segundo `h1`.
- O título e a apresentação usam grafia inconsistente, enfraquecendo termos de busca.
- Não há preview social de projetos ou imagem de compartilhamento.
- O favicon data URI não é uma solução robusta para todas as plataformas.
- Não há página 404, política de redirects ou documentação de base path.
- O conteúdo-base em português é indexável no HTML, mas a regra `.reveal` o deixa visualmente oculto até a execução tardia do JavaScript.

## Conflitos de fonte que exigem conciliação

Nenhum desses conflitos deve ser resolvido por suposição:

1. **Experiência atual:** site marca Mauá Júnior como cargo atual e exibe trabalho autônomo; PDFs também marcam Mauá Júnior como atual, mas acrescentam OneBox - DNE como atual e não apresentam a experiência autônoma no mesmo formato.
2. **Suporte técnico:** PDFs associam a experiência a São Judas Technologies e 01/2024; o site não mostra empresa ou data.
3. **Apresentação:** site se posiciona como desenvolvimento full stack; PDFs abrem com Ciência de Dados & IA, Python, Power BI, back-end, ETL, pipelines e SQL.
4. **Projetos:** hero diz três projetos completos; a grade contém cinco projetos preenchidos.
5. **Repositório do portfólio:** site usa `Portifolio_full_stack`; PDFs citam `portifolio`.
6. **Certificações/cursos:** site e PDFs não possuem exatamente a mesma lista.
7. **Inglês:** o texto adicional informa B1, enquanto o gráfico e os PDFs usam A2/B1.
8. **Currículo em inglês:** conteúdo traduzido parcialmente, com linha de especialidades e metadado de título ainda em português.
9. **Traduções:** o conteúdo PT possui detalhes mais extensos em algumas experiências do que ES/EN.

Recomendação: extrair uma única estrutura de dados revisada e aprovada, depois gerar as três línguas do site a partir dela. Os PDFs permanecem downloads independentes, mas precisam ser verificados contra a mesma fonte.

## O que preservar

- Nome e identidade pessoal de Omar Saliba.
- Formação e instituições existentes, sem adicionar datas ou resultados não documentados.
- Lista de certificados, depois da conciliação.
- Idiomas e níveis, depois da conciliação do inglês.
- Cinco projetos reais, suas descrições, tecnologias, vídeos e links.
- Experiências existentes e a nova experiência OneBox - DNE, depois de definir a cronologia/fonte oficial.
- Links de GitHub, LinkedIn, WhatsApp, Behance, Drive, Vercel e repositórios, após validação.
- Downloads dos currículos PT-BR e inglês com os nomes atuais ou redirects equivalentes.
- Tradução para português, espanhol e inglês.
- Vídeos originais como material-fonte, não como payload imediato.
- Informações de contato já publicadas, com revisão consciente de privacidade.
- A ideia de uma experiência com personalidade e movimento, mas não sua execução aquática.

## O que substituir

- Todo o tema aquático: bolhas, distorção de água, paleta azul dominante e aparência marítima.
- Loader obrigatório de 5 segundos.
- Arquitetura monolítica HTML/CSS/JS.
- Dicionários e conteúdo duplicados dentro de `main.js`.
- Arial/Helvetica como tipografia principal.
- Cards repetitivos de glassmorphism.
- Ícones PNG superdimensionados por um sistema vetorial consistente.
- Autoplay e carregamento imediato dos MP4 por componentes de mídia otimizados.
- Menu hamburger não semântico.
- Barras de idioma puramente visuais.
- Placeholder de projeto publicado.
- Links para vídeo rotulados como “Site”.
- Favicon data URI por assets de favicon adequados.
- Dependências não utilizadas e `node_modules` versionado.
- Deploy implícito por configuração reproduzível e documentada.

## Riscos da migração

| Risco                                                 | Impacto    | Mitigação necessária                                                                 |
| ----------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------ |
| Perder fatos ou traduzir conteúdo divergente          | Alto       | Criar modelo de conteúdo único e revisar conflitos antes da publicação               |
| Incluir/restaurar PDFs antigos marcados `D`           | Alto       | Limitar staging por caminho e revisar `git diff --cached`                            |
| Quebrar downloads de currículo                        | Alto       | Preservar filenames públicos ou criar redirects                                      |
| Vite publicar em base path incorreto                  | Alto       | Confirmar domínio, branch, build command e `base` antes do deploy                    |
| Vercel continuar servindo a raiz estática antiga      | Alto       | Configurar `npm run build` e output `dist` explicitamente                            |
| Repositório inflado por `node_modules`                | Alto       | Adicionar `.gitignore` e remover apenas os caminhos rastreados com revisão cuidadosa |
| Gitlink sem `.gitmodules` contaminar a migração       | Médio/alto | Definir se deve ser removido; não tratá-lo como pasta comum                          |
| Links externos estarem obsoletos                      | Médio/alto | Executar link checker e validar manualmente destinos privados/Drive                  |
| Mídia elevar LCP, dados móveis e memória              | Alto       | Posters, formatos alternativos, lazy loading, pausa fora do viewport e budgets       |
| Motion/3D prejudicar mobile e acessibilidade          | Alto       | Progressive enhancement, fallback 2D e `prefers-reduced-motion`                      |
| Tradução client-side prejudicar SEO                   | Médio/alto | Definir estratégia de URLs/locales e metadados por idioma                            |
| Dependência de YouTube afetar privacidade/performance | Médio      | Consentimento ou facade, `youtube-nocookie`, poster e clique para carregar           |
| Licença de ícones/mídia não estar documentada         | Médio      | Verificar origem/licença antes de reutilizar ou substituir                           |
| Conteúdo do site e dos PDFs voltar a divergir         | Alto       | Checklist editorial e fonte única versionada                                         |
| `main`/`master` e branch de produção divergirem       | Alto       | Confirmar branch conectada ao host antes de merge/deploy                             |

## Critérios mínimos para considerar o legado preservado

- Todo fato pessoal publicado hoje está mapeado para uma fonte revisada.
- Nenhum projeto real ou link aprovado desaparece.
- Currículos PT-BR e EN continuam baixando.
- PT, ES e EN cobrem todas as seções, sem chaves ausentes.
- OneBox - DNE e demais experiências aparecem em cronologia validada.
- Vídeos continuam acessíveis sob demanda, com posters e alternativas textuais.
- A nova implementação funciona sem motion/WebGL e com JavaScript parcialmente indisponível.
- Navegação completa por teclado e redução de movimento são testadas.
- SEO e social preview existem por idioma.
- Build e deploy são reproduzíveis em ambiente limpo, sem `node_modules` versionado.
- Nenhuma das remoções preexistentes é incorporada sem revisão explícita.
