from pathlib import Path
import pytest
from app.retrieval import KnowledgeIndex

@pytest.fixture
def index(): return KnowledgeIndex(Path(__file__).resolve().parents[1] / 'knowledge')

@pytest.mark.parametrize('question,expected', [
 ('Quem é o Omar?', 'profile'),
 ('Resuma o perfil profissional', 'profile'),
 ('Quais projetos de IA ele tem?', 'project-maua-ia'),
 ('Me conte sobre o Pendi', 'project-pendi'),
 ('Ele ganhou algum hackathon?', 'project-pendi'),
 ('Qual projeto usa Gemma e DuckDB?', 'project-maua-ia'),
 ('Ele já treinou o QLoRA?', 'project-maua-ia'),
 ('O fine-tuning já foi concluído?', 'engineering-approach'),
 ('Qual o status do Tech Hub?', 'project-tech-hub'),
 ('Como funciona a calculadora de precificação?', 'project-pricing'),
 ('Qual a experiência com SQL no login?', 'result-onebox-login'),
 ('De quanto foi a redução do tempo de login?', 'result-onebox-login'),
 ('Quais melhorias no estoque da Avenida Tintas?', 'result-avenida-inventory'),
 ('Quais resultados ele entregou?', 'result-onebox-login'),
 ('Como foi a automação de leads?', 'result-efficiency'),
 ('Quais idiomas ele fala?', 'languages'),
 ('Qual é o nível de inglês?', 'languages'),
 ('Onde estudou e qual a formação?', 'education'),
 ('Ele conhece AWS e cloud?', 'skill-delivery'),
 ('Como posso entrar em contato?', 'contact'),
 ('Quais vagas e modalidades de trabalho ele busca?', 'career-preferences'),
 ('Ele aceita trabalho remoto ou híbrido?', 'career-preferences'),
 ('Qual sua experiência com Python e FastAPI?', 'experience-onebox'),
 ('Tell me about his AI projects', 'project-maua-ia'),
 ('Which languages does he speak?', 'languages'),
 ('What roles is he looking for?', 'career-preferences'),
 ('How did he improve login performance?', 'result-onebox-login'),
 ('¿Qué proyectos de IA tiene?', 'project-maua-ia'),
 ('¿Tiene experiencia en AWS?', 'skill-delivery'),
 ('¿Busca trabajo remoto?', 'career-preferences'),
 ('quais habilidades tecnicas dele', 'skill-ai'),
 ('Quais são as competências técnicas?', 'skill-backend'),
 ('What are his technical skills?', 'skill-data'),
 ('Me conta a stack que ele domina', 'skill-delivery'),
])
def test_retrieval(index, question, expected):
    assert expected in [d.id for d in index.search(question)], question

def test_compensation_is_excluded_by_default(index):
    assert all(not d.restricted for d in index.search('salário bolsa estágio junior VR'))
    assert 'approved-compensation' in [d.id for d in index.search('salário bolsa estágio', include_compensation=True)]

def test_followup_uses_previous_user_question(index):
    history = [{'role':'user','content':'Me fale do MAUA IA com Gemma e DuckDB'},{'role':'assistant','content':'Resposta anterior não é fonte.'}]
    assert 'project-maua-ia' in [d.id for d in index.search('E como funciona isso?', history)]

def test_unknown_topic_has_no_matches(index):
    assert index.search('Receita de bolo de chocolate') == []

def test_index_is_stable_and_has_no_credentials(index):
    assert len(index.documents) >= 28
    assert len(index.version) == 12
    for doc in index.documents:
        assert 'baro_' not in str(doc)
        assert 'BARO_API_KEY' not in str(doc)

def test_complete_context_prevents_lexical_misses(index):
    docs=index.conversation_context('O que ele manja e onde pode contribuir?')
    assert {'profile','skill-ai','skill-data','skill-backend','skill-delivery'} <= {d.id for d in docs}
    assert all(not d.restricted for d in docs)
    assert len({d.id for d in docs})==len(docs)
