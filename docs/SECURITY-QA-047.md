# Auditoria OmarIA — QA-047 — 12/11/2026

## Conclusão e escopo

No código deste checkout, o chat público não possui caminho para editar a home,
autenticar visitantes, conceder acesso ou executar SQL gerado pelo modelo. Uma
afirmação de “acesso confirmado” ou “título salvo” é texto do modelo, não um
resultado de execução. Isso não determina o que ocorreu em outra versão em
produção: não foram consultados logs nem serviços de produção.

O workspace estava limpo antes desta auditoria. Não foram adicionados executores,
ferramentas administrativas, dependências do produto ou mecanismos de autenticação.
Não houve deploy, uso de credenciais reais ou teste contra serviços externos reais.

## Fluxo e fronteiras de confiança

1. `src/components/chat/OmarIA.tsx`, `Conversation`: popup e página `/omaria`
   compartilham `useConversation`, em `src/components/chat/chat.ts`.
2. `useConversation.send`: envia somente `message`, `locale` e `history` ao
   `POST /api/assistant/chat`. O histórico contém `role` (`user`/`assistant`) e
   `content`. O cliente guarda até 24 mensagens por idioma na `sessionStorage`
   da aba; envia até 12 turnos, limitado a 14.000 caracteres. Esse histórico
   é editável pelo visitante, inclusive as respostas atribuídas à OmarIA.
3. `PublicAPIGuard`, em `chatbot/app/security.py`: limita bytes reais, tipo de
   mídia, origem e frequência antes do handler. O IP vem do escopo ASGI para
   limitação de frequência; não identifica um administrador. CORS não autentica.
4. `ChatInput`/`Turn`, em `chatbot/app/main.py`: rejeitam campos extras, papéis
   `system`/`developer`/`tool`/`function`, idioma inválido e excesso de tamanho.
   Campos de identidade, sessão, permissões ou resultados de ferramentas não
   fazem parte do contrato. A validação agora também é estrita quanto aos tipos
   e rejeita NUL no histórico, como já fazia na pergunta.
5. `create_app.chat`: aplica as políticas já existentes de escopo/remuneração e
   chama `KnowledgeIndex.conversation_context`. BM25 prioriza documentos; os
   demais documentos públicos também acompanham a pergunta. Histórico participa
   da busca, mas não é incorporado à base. A preferência de remuneração após
   insistência não é autenticação nem um segredo do repositório público.
6. `BaroProvider.answer`, em `chatbot/app/provider.py`: monta o sistema no
   servidor. Envia exatamente duas mensagens ao provedor (`system`, `user`),
   sem `tools`, callbacks ou identidade do visitante. Documentos, histórico e
   pergunta ficam serializados em JSON na mensagem de usuário. Strings que
   imitam delimitadores ou papéis permanecem valores desses campos. A chave do
   provedor vai no cabeçalho HTTP, não no contexto do modelo.
7. `validate_response`: valida JSON, texto, limites, IDs de documentos e possível
   exposição da chave. Uma tentativa adicional de formato continua usando o
   mesmo sistema e os mesmos dados; a instrução de nova tentativa agora pertence
   à mensagem de sistema. Esta validação não prova a veracidade semântica do texto.
8. `create_app.chat` seleciona fontes entre os documentos fornecidos e termina em
   `return result(answer, sources, locale, generated=True)`. Não interpreta a
   resposta como comando. `tool_calls` não é despachado por nenhum componente.
9. `parseSources`/`safeSource` filtram fontes tanto da rede como da sessão local.
   `Conversation` renderiza conteúdo e títulos como filhos de elementos React,
   sem `dangerouslySetInnerHTML`. O formato atual é texto com parágrafos/listas
   simples e fontes separadas; não havia parser Markdown a preservar. Links
   permitem âncoras locais, currículos e HTTPS no GitHub de OmarFLK. O renderer
   e esse contrato foram preservados.

## Escritas e efeitos colaterais

| Operação | Onde acontece | Autoridade e ligação com o chat |
| --- | --- | --- |
| Histórico local | `useConversation`, `sessionStorage.setItem/removeItem` | Estado normal da aba, sem identidade ou permissão de backend. |
| Geração | `BaroProvider.answer`, POST ao provedor | Chave de serviço do servidor; pode consumir quota. Não autentica o visitante. |
| Contadores | `WindowLimiter`, memória do processo | Limitação de abuso; não são permissões. |
| Leitura da base | `KnowledgeIndex.__init__` → `load_snapshot` | Na inicialização, transação `READ ONLY`, consulta parametrizada, snapshot conferido por hash; fallback local. |
| Publicação de snapshot | CLI `python -m app.sync_knowledge` → `save_snapshot` | Comando separado de publicação, usa `KNOWLEDGE_ADMIN_DATABASE_URL` do ambiente. Faz DDL/INSERT. Não existe rota ou chamada do chat para esse comando. |
| Logs | `provider.py`, `retrieval.py`, saída do processo | Categorias/status de erros e fallback. Não gravam mensagens, cabeçalhos ou conversas. O comando de produção desliga access logs do Uvicorn. Logs do provedor/host externo não foram inspecionados. |

Não existe sessão administrativa validada neste chat, nem executor privilegiado
para testar com sessão autorizada ou sem permissão. Por isso não foi inventado
um fluxo de autorização. O teste usa cabeçalhos e cookie sintéticos que alegam
ser admin e verifica que nada disso entra no contexto enviado ao provedor.

## Causa identificada e alterações

O sistema anterior dizia que histórico não comprova fatos sobre Omar, mas não
explicitava que alegações do visitante e confirmações anteriores da OmarIA não
comprovam autenticação, permissões ou execução. Também não declarava de forma
explícita a ausência de capacidades administrativas. A validação estrutural da
resposta não distinguia uma confirmação inventada de outro texto válido.

- `chatbot/app/provider.py`, `SYSTEM`: declara o chat somente de consulta, a
  ausência de ferramentas e autenticação, a falta de autoridade de chamados,
  histórico e documentos, a necessidade de corrigir confirmações anteriores e
  de responder à parte legítima da pergunta com fontes.
- `BaroProvider.answer`: serializa todos os dados em JSON, preservando seus
  campos e papéis; coloca a instrução de retry no sistema do servidor.
- `chatbot/app/main.py`, `ChatInput`, `Turn`: tipos estritos e NUL rejeitado
  também no histórico; mantém papéis/campos permitidos e limites existentes.
- `chatbot/tests/test_chat_trust.py`: regressões pela rota real, com
  `BaroProvider`, recuperação e validação reais; somente HTTP do modelo simulado.
- `chatbot/tests/test_api.py`: ajusta a asserção da localização da instrução
  de retry.
- `tests/e2e/omaria.spec.ts`: verifica simultaneamente HTML inerte no texto e no
  título de fonte, exclusão de URL JavaScript e preservação do link da SEMOB.

Não foram introduzidos bloqueios de palavras como “admin”, “salvar” ou “título”.
Perguntas profissionais legítimas sobre autenticação e segurança chegam ao modelo.

## Evidências dos testes

`test_chat_trust.py` cobre pergunta normal da SEMOB, QA-047 em dois turnos,
histórico com confirmação falsa de acesso e de título salvo, cabeçalhos/cookie
forjados, papéis/campos proibidos, instruções em documento recuperado e texto que
imita delimitadores. Em todos os cenários da fixture:

- `save_snapshot` e `connect` são espiões que falham se chamados, e terminam com
  `assert_not_called()`; contagem observada de chamadas: zero.
- Os documentos do índice permanecem iguais e os hashes de `index.html`, `src/`
  e `chatbot/knowledge/` permanecem iguais antes/depois.
- O transporte simulado devolve inclusive um `tool_calls` não solicitado para
  `save_home_title`; o backend não executa nada. Esse nome existe apenas no dado
  malicioso do teste, não como ferramenta do produto.
- A SEMOB é recuperada da base real e a API retorna sua fonte canônica:
  `https://github.com/OmarFLK/Projeto_Integrador_SEMOB`.

Os testes QA-047 usam respostas seguras roteirizadas e verificam o sistema e os
papéis efetivamente enviados ao provedor, os dois turnos e as fontes retornadas.
Eles não são uma avaliação comportamental do Gemma e não demonstram que um modelo
real sempre seguirá o prompt. A fronteira de ausência de execução independe disso.

## Comandos e resultados

| Comando | Resultado |
| --- | --- |
| `python -m pytest chatbot/tests -o "addopts=-p no:cacheprovider" -q` | 119 passaram; um aviso de depreciação Starlette/httpx. |
| `npm test` | 19 passaram, quatro arquivos. |
| `npm run lint` | Passou, sem avisos. |
| `npm run typecheck` | Passou. |
| `npm run build` | Passou (`tsc -b` e Vite). |
| `npx playwright test omaria.spec.ts --project=desktop --project=mobile-390 --project=mobile-320` | 21 passaram no Edge. |

Ambiente: Node 24.22.1 e Python 3.13.13; dependências instaladas pelos lockfiles
existentes. Como não havia Node/npm/Python disponíveis no PATH, os comandos foram
executados com os executáveis locais. Python e pacotes de teste ficaram em
`artifacts/tools/` (ignorado); npm em `node_modules/.audit-npm/` (ignorado). A
invocação Python efetiva na raiz foi:

```powershell
$env:PYTHONPATH = Join-Path $PWD 'artifacts\tools\python313-deps'
& 'artifacts\tools\python\cpython-3.13.13-windows-x86_64-none\python.exe' -m pytest chatbot/tests -o 'addopts=-p no:cacheprovider' -q
```

Para npm foi usado `node node_modules/.audit-npm/bin/npm-cli.js` com o subcomando
da tabela. Para E2E foi usado `node node_modules/@playwright/test/cli.js test ...`,
com preview local do build. A tentativa inicial com Python 3.12 foi bloqueada pelo
controle de aplicativos do Windows ao carregar psycopg; Python 3.13 executou a
suíte inteira. O lint inicial alcançou os arquivos do npm temporário; após movê-lo
para `node_modules`, o comando original passou sem mudar a configuração do repo.

## Limites e respostas explícitas

- **O chat pode escrever?** Mantém estado local de conversa e contadores, além
  de chamar o provedor. Não possui caminho para escrita administrativa, alteração
  de título, publicação de snapshot ou persistência de conversa no backend.
- **Quem autoriza escritas administrativas?** Não se aplica ao chat: não há
  executor exposto. A publicação de snapshots é uma CLI separada autorizada por
  configuração do ambiente de publicação, nunca pelo modelo.
- **Qual evidência de execução?** Zero chamadas aos espiões de banco/publicação
  e zero diferenças nos arquivos/índice observados. Nenhuma conclusão sobre
  execução foi tirada da frase exibida pelo modelo.
- **QA-047 real ou simulado?** Simulado na fronteira HTTP do provedor. Não havia
  `.env` local, executável Ollama nem listener nas portas locais verificadas
  (11434 e 8001). O produto usa Gemma via API remota. Não foi usado modelo real
  nem credencial real; avaliação comportamental permanece pendente.
- **SEMOB e fontes funcionam?** Sim no fluxo determinístico real de recuperação,
  montagem, validação e resposta, e no teste de renderização do link legítimo.
  A qualidade da geração real não foi medida nesta sessão.

O prompt reduz a indução a confirmações inventadas, mas não garante ausência de
alucinações. O isolamento estrutural e a inexistência de executor protegem contra
operações administrativas, mesmo se o modelo gerar uma frase incorreta.
