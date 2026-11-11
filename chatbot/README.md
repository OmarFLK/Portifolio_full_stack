# OmarIA — assistente do portfólio

Assistente para recrutadores e contratantes com Gemma 3 27B pela API Barô da Mauá. Frontend na Vercel, backend FastAPI no Render e snapshots da base no Neon. Também roda localmente. A inferência acontece na API institucional.

Dois acessos no frontend: botão circular no canto inferior direito do portfólio e página `/omaria`. A identidade própria usa um balão de conversa com visor sorridente e gradiente carmim. O botão fica fora do contêiner visual da página para continuar fixo ao rolar em desktop e celular.

## Rodar nesta máquina

Na raiz `C:\Users\omars\Desktop\portifolio\Portifolio_full_stack`:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/start-omaria.ps1
```

Abre `http://127.0.0.1:5173/omaria`, com o portfólio em `http://127.0.0.1:5173/` e a API na porta 8001. O script inicia os processos em segundo plano e preserva serviços que já estiverem ativos. Logs e estado de processos ficam em `chatbot/.runtime/`, ignorado pelo Git. Não registra transcrições ou cabeçalhos de autorização nos logs.

Para parar apenas os processos criados pelo script:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/stop-omaria.ps1
```

Em outra máquina, primeiro execute:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/setup-omaria.ps1
```

O setup instala o ambiente Python isolado e preserva `.env` existente. A chave fornecida pelo Omar foi colocada somente em `chatbot/.env`. Esse arquivo está ignorado pelo Git; nunca deve receber prefixo `VITE_` ou ir para `public/`.

Alternativa com dois terminais:

```powershell
cd chatbot
.venv\Scripts\python.exe -m uvicorn app.main:app --host 127.0.0.1 --port 8001 --no-access-log
```

```powershell
npm run dev
```

O Vite encaminha `/api/assistant` à API local. Use a porta 5173; outras portas exigem configuração explícita de `ALLOWED_ORIGINS` no backend.

## Base e recuperação

`knowledge/portfolio.json` é exportado de `src/data/portfolio.ts`, com perfil, seis projetos, cinco resultados, experiências, stack, formação, certificados, idiomas e contato. `knowledge/confirmed.json` acrescenta os fatos profissionais do currículo, as preferências confirmadas pelo Omar e a abordagem de engenharia. `tools.json` registra as ferramentas de IA confirmadas. `compensation.json` contém apenas as referências de remuneração autorizadas, acessíveis ao retriever somente após pergunta reiterada sobre remuneração. O salário atual não faz parte da base.

Para atualizar o conteúdo após editar o portfólio:

```powershell
node --experimental-strip-types scripts/export-chat-knowledge.mjs
```

Reinicie o backend após atualizar os JSONs. A base é lida e indexada na inicialização; o health check mostra uma versão derivada do seu conteúdo.

O RAG usa BM25 local, normalização de acentos, vocabulário em PT/EN/ES e expansão de termos para priorizar os documentos mais relevantes. Como a base pública tem aproximadamente 10 mil caracteres, os demais documentos públicos também acompanham a requisição: uma falha lexical não esconde habilidades ou projetos do modelo. O documento de remuneração continua separado e só acompanha pedidos reiterados. Não usa embeddings nem banco vetorial. Históricos fornecem contexto para perguntas de continuação, nunca viram fatos sobre Omar.

Fluxo: pergunta → política de escopo e remuneração → documentos priorizados e base pública completa → Gemma → validação do JSON e das fontes → resposta com até sete fontes aprovadas. Campos, histórico, saída, tempo, concorrência e frequência têm limites. Fontes inventadas e saídas inválidas são rejeitadas. Explicações gerais e perguntas de esclarecimento podem vir sem citação; fatos sobre Omar precisam se apoiar nos documentos.

OmarIA pode explicar conceitos, comparar requisitos de uma vaga com evidências do perfil, indicar pontos para entrevista, reconhecer lacunas e fazer perguntas úteis. Avaliações devem ser apresentadas como avaliações, não como novas experiências comprovadas. Uma resposta parcial útil não é substituída por uma recusa genérica. Pedidos diretos por segredos e informações pessoais ausentes continuam protegidos; termos profissionais como habilidades, disponibilidade e modalidade não são tratados como perguntas sobre idade.

Correção da falha intermitente: a Barô/Gemma às vezes copiava um prefixo extra nas fontes (`id-project-maua-ia` em vez de `project-maua-ia`). O validador agora resolve somente esse alias quando o ID restante corresponde exatamente a um documento fornecido; fontes desconhecidas continuam rejeitadas. O prompt lista os IDs permitidos e não usa o antigo exemplo com `id-exato`. Respostas malformadas recebem uma única nova tentativa, ainda sujeita à validação e ao tempo máximo da requisição. Os logs registram só a categoria da rejeição, sem chave ou transcrição.

As mensagens de erro oferecem Tentar novamente e Falar com o Omar. O contato abre diretamente `https://wa.me/5511948485194`, sem abrir WhatsApp automaticamente durante uma falha.

A IA é instruída a distinguir projeto planejado de concluído, integração de LLM de treinamento, estágio OneBox de ERP Avenida Tintas, e protótipo acadêmico Pendi de uso clínico. Não toma decisões de contratação, não aceita propostas nem inventa disponibilidade. Perguntas fora do perfil e pedidos de dados ausentes encaminham ao contato direto.

## Preferências confirmadas

- Dev, estágio ou júnior, com foco em engenharia de IA e aplicações de IA.
- Híbrido em São Paulo ou 100% remoto; não 100% presencial.
- Remuneração: priorizar contato direto. Após insistência, informar estágio a partir de R$ 2.500 mais VT, VR e benefício de academia como Wellhub; júnior a partir de R$ 4.000. Não inferir remuneração atual.

Os valores são referências fornecidas pelo Omar, não aceite de oferta. Não foram incorporadas instruções do prompt antigo de pesquisa de vagas, apenas suas preferências.

## Conversa e limites

O backend não mantém banco de conversas. Cada requisição recebe até 12 turnos, com orçamento total de 14.000 caracteres; a pergunta tem até 4.000 caracteres para comportar descrições de vagas. O frontend guarda até 24 mensagens em `sessionStorage`, separadas por idioma e aba. Nova conversa limpa esse estado. Sair para outra página e retornar à mesma aba preserva a conversa; uma nova sessão não deve herdar a de outro visitante.

Os limites por IP e globais são em memória, adequados a um único worker para estes testes. Eles não são autenticação ou proteção completa contra abuso. Antes de abrir para grande tráfego, avaliar limites compartilhados, proteção de borda, monitoramento de custo e política institucional de uso da Barô. O comportamento fundamentado foi testado, mas um LLM ainda pode errar; prompts e recuperação não garantem ausência de alucinação.

## Testes

```powershell
cd chatbot
.venv\Scripts\python.exe -m pytest
```

Testes determinísticos de recuperação e API, com provider simulado: não gastam chamadas na Barô e não usam a chave real.

Na raiz:

```powershell
npm test
npm run build
npx playwright test omaria.spec.ts --project=desktop --project=mobile-390 --project=mobile-320
```

Os testes de UI interceptam respostas para testar fontes, idioma, erro, interrupção, limpar conversa, troca entre popup e página e navegação por teclado. Capturas em `artifacts/omaria/`.

Avaliação real explícita, com backend ativo (faz chamadas à Barô):

```powershell
chatbot\.venv\Scripts\python.exe chatbot/scripts/evaluate_live.py --confirm-live
```

O relatório fica em `chatbot/.runtime/live-evaluation.json`; nenhum segredo é gravado nele. São 12 cenários: perfil, projetos, métricas, QLoRA/Tech Hub, modalidades, idiomas, resposta em inglês, remuneração inicial/reiterada, credenciais, idade e assunto externo. O relatório é evidência de casos testados, não garantia geral do modelo.

Avaliação de diálogo e raciocínio, também opt-in:

```powershell
chatbot\.venv\Scripts\python.exe chatbot/scripts/evaluate_conversation.py --confirm-live
```

Inclui a pergunta exata sobre habilidades, análise de vaga júnior, referência ao histórico, RAG versus fine-tuning, resposta parcial, senioridade não comprovada, insistência sobre remuneração, troca de assunto, esclarecimentos, conceitos de segurança, linguagem coloquial e recuperação após uma recusa antiga. As chamadas são sequenciais e espaçadas; o relatório fica em `.runtime/conversation-evaluation.json`.

## Publicação: Vercel, Render e Neon

`render.yaml` define um serviço Python gratuito com raiz `chatbot`, instalação de `requirements.txt`, sincronização da base, Uvicorn com um worker e health check em `/api/assistant/health`. A estrutura segue os guias oficiais de [FastAPI](https://fastapi.tiangolo.com/deployment/manually/) e [Render](https://render.com/docs/deploy-fastapi).

No Render, configurar `BARO_API_KEY` como segredo e `ALLOWED_ORIGINS` com os endereços exatos do frontend. O padrão do blueprint usa `https://fullstackdevomar.vercel.app`. Não é necessário banco externo nesta versão.

Na Vercel, depois de existir uma URL real do backend:

```text
VITE_CHAT_API_URL=https://SEU-BACKEND.onrender.com/api/assistant
```

Essa variável contém apenas a URL pública, nunca a chave da Barô. Recompilar o frontend depois de defini-la. Verificar CORS, health check e teste real da integração. O plano gratuito do Render pode demorar para iniciar após inatividade; o cliente permite até 60 segundos para o health check e 120 segundos para a resposta, enquanto a execução do modelo continua limitada no servidor.

O projeto Neon dedicado é `omaria-portfolio`, PostgreSQL 17, na organização gratuita. A tabela `omaria.knowledge_snapshots` guarda somente versões dos documentos aprovados. Nenhuma conversa é gravada nela. `KNOWLEDGE_ADMIN_DATABASE_URL` é usado por `python -m app.sync_knowledge` na publicação; `DATABASE_URL` usa o papel `omaria_reader`, com SELECT e transações somente de leitura. Ambos ficam somente no backend, como segredos do Render. TLS valida o certificado e o hostname, com channel binding obrigatório.

Na inicialização, a API busca o snapshot correspondente exatamente aos documentos do código implantado. Um hash SHA-256 verifica seu conteúdo; um snapshot alterado ou ausente nunca substitui os fatos aprovados. Em falhas do banco, usa os JSONs verificados do repositório como reserva. O health check informa `knowledge_store: neon` quando o banco foi usado. A consulta ocorre uma vez por inicialização, não em cada mensagem.

O limite público padrão é de 12 requisições por endereço de cliente por minuto, 100 no total por minuto e 500 em 24 horas, além de três gerações simultâneas. Pedidos inválidos também consomem o limite de frequência. O tamanho real é limitado a 32.000 bytes, inclusive em streaming. Limites ficam em memória e reiniciam com o processo; manter um worker. CORS não autentica clientes externos. A revisão e os testes de segurança estão em `../docs/SECURITY-2026-11-11.md`.
