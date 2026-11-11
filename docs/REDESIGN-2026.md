# Redesign — novembro de 2026

Versão validada pelo Omar, com envio à main autorizado em 11/11/2026 para publicação pela integração existente com a Vercel.

Paleta fornecida: fundo #100D10, cards #1B1519, bordas #40303A, títulos #F8F3F4, texto #BDB0B6, ação #DF1236, hover #AE1231 e links #FF798B. Branco no botão principal.

Hick e hierarquia: quatro entradas de menu, uma ação principal na abertura, seis projetos em grade. Proximidade e região comum: contribuição, resultado, stack e links no mesmo card. Fitts: controles de 44 px, teclado e Escape no menu. Entradas GSAP e órbita decorativa respeitam movimento reduzido; o objeto 3D itinerante saiu da composição. A órbita OS / AI / DATA / CLOUD foi preservada nos refinamentos.

## Fontes

Currículo fornecido: Curriculo_Omar_Saliba.pdf. README fornecido: README (2).md. O PDF novo está no download principal e também no endereço PT-BR antigo por compatibilidade.

READMEs públicos conferidos pelo conector GitHub em 11/11/2026:

- [Perfil](https://github.com/OmarFLK/OmarFLK)
- [MAUA IA](https://github.com/OmarFLK/MAUA_IA): RAG, Gemma 3 27B, consultas validadas, dez tabelas; QLoRA preparado, ainda não executado.
- [Pendi](https://github.com/OmarFLK/hackaton_gamifica-o): demo publicada, conversas por perfil e dados fictícios. Vitória em equipe registrada no currículo e perfil.
- [SEMOB](https://github.com/OmarFLK/Projeto_Integrador_SEMOB): Flutter/Dart, dois bancos, 91.108 registros; ponte de IA depende de contrato para produção.
- [Prospecção](https://github.com/OmarFLK/script_automa-o_planilha_python): Selenium e planilhas. Três dias para cerca de uma hora e mais de 600 leads são resultados do currículo.
- [Estatística e AED](https://github.com/OmarFLK/atividade01_ICD203): Python/R, tratamento de dados e avaliação de pesquisas.
- [Calculadora de precificação](https://github.com/OmarFLK/calculadoraPrecificacaoMJR): MVP funcional em React/TypeScript, Flask e PostgreSQL, memória de cálculo, base histórica por mediana e assistente de IA. Incluída como sexto projeto.

Avenida Tintas vem do currículo: sistema em produção, implementação integral e manutenção da infraestrutura. Nenhum link privado foi exposto. Tech Hub foi incluído a pedido do Omar como quinto projeto, com planejamento definido, implementação pendente e stack prevista de agentes, RAG, AWS e CI/CD; o card aponta para seu repositório público.

Os números antigos de economia com IA e eficiência foram substituídos pelos resultados documentados nas fontes novas. O download em todos os idiomas identifica o currículo em português.

Novos resultados fornecidos diretamente pelo Omar: o ERP da Avenida Tintas reduziu a leitura integral do estoque de 1 dia e meio para cerca de 2 horas. O resultado de login pertence ao estágio na OneBox/DNE: análise e otimização de queries SQL reduziu 55 para 15 segundos. Redução no tempo: `(55 - 15) / 55 * 100 = 72,727…%`, exibida como 72,7%. Não foi calculada porcentagem do ERP, pois a duração em horas de um dia de trabalho não foi especificada.

## Faixa e interações

45 logos locais e símbolos para RAG, fine-tuning, embeddings, agentes e SQL/ETL. Faixa entre os links sociais e as instituições, com duas sequências de largura idêntica e deslocamento linear de 50% para repetir sem salto. Pausa explícita e alternativa estática com movimento reduzido. Fontes e licenças: `public/assets/logos/SOURCES.md`. Botões e monograma do cabeçalho ganharam gradiente carmim; cards e links receberam respostas discretas ao hover. Títulos reduzidos a Sobre e Experiência nos três idiomas.

## Validação

Refinamentos de identidade e navegação: marca fornecida em `Logo S com círculo marfim perfeito.png`, preservada em `public/assets/brand/omar-saliba-logo.png`. Versões de exibição e ícones em 32, 180, 192 e 512 px, com favicon SVG autossuficiente. Marca aplicada ao cabeçalho, centro da órbita, rodapé e cabeçalho da página OmarIA. A animação da órbita mantém os mesmos movimentos e tempos.

No mobile, OneBox/DNE, Mauá Júnior e IMT ocupam linhas separadas. Somente a seção ativa recebe sublinhado no desktop ou preenchimento no menu mobile; hover e foco não simulam outro item ativo. A compensação das âncoras fica em `scroll-margin-top` das seções, evitando o salto de foco causado pela aplicação simultânea de `scroll-padding-top` no documento. A seção no menu mobile é determinada pela posição atual, sem prioridade ao hash de um clique antigo.

Build, Vitest e Playwright. Capturas em artifacts/redesign/ (ignorado no Git).

Prévia: `npm run dev -- --host 127.0.0.1 --port 5173`.
