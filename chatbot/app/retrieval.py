"""Small, inspectable local BM25 RAG index. No external embedding service."""
from collections import Counter
from dataclasses import dataclass
from pathlib import Path
import hashlib
import json
import math
import re
import unicodedata
import logging

STOP = set('a o as os e de da do das dos em um uma uns umas para por com no na nos nas ao aos que qual quais como ele ela dele dela eu meu minha voce voces um sobre the a an of to in is are was what which how his he she can does and or with for me tell about el la los las del de en un una es son su sus que como'.split())
def normalize(value: str) -> str:
    return ''.join(c for c in unicodedata.normalize('NFD', value.lower()) if unicodedata.category(c) != 'Mn')

def tokens(value: str) -> list[str]:
    return [t for t in re.findall(r'[a-z0-9]+', normalize(value)) if t not in STOP]

ALIASES = [
    {'ia', 'ai', 'artificial', 'llm', 'inteligencia'},
    {'aws', 'cloud', 'nuvem', 'infraestrutura'},
    {'estagio', 'internship', 'onebox', 'dne'},
    {'projeto', 'projetos', 'projects', 'project', 'portfolio'},
    {'resultado', 'resultados', 'results', 'impacto', 'impact', 'metricas'},
    {'remoto', 'remote', 'hibrido', 'hybrid', 'vagas', 'roles'},
    {'treinou', 'treinamento', 'trained', 'training', 'finetuning', 'qlora'},
    {'idiomas', 'languages', 'ingles', 'english', 'espanhol', 'spanish'},
    {'query', 'queries', 'consulta', 'consultas', 'sql'},
    {'contato', 'contact', 'email', 'contratar', 'hiring'},
    {'formacao', 'education', 'faculdade', 'graduacao', 'degree'},
    {'habilidade', 'habilidades', 'competencia', 'competencias', 'tecnica', 'tecnicas', 'tecnicos', 'conhecimentos', 'domina', 'sabe', 'skills', 'skill', 'stack', 'ferramentas', 'tools', 'tecnologias', 'tech', 'technical'},
]

@dataclass(frozen=True)
class Document:
    id: str
    title: dict[str, str]
    url: str
    content: dict[str, str]
    tags: list[str]
    restricted: bool = False

class KnowledgeIndex:
    def __init__(self, directory: Path, database_url: str = ''):
        raw = b''
        self.documents: list[Document] = []
        records = []
        for path in sorted(directory.glob('*.json')):
            data = path.read_bytes()
            raw += data
            records.extend(json.loads(data)['documents'])
        self.store = 'bundled'
        if database_url:
            try:
                from .knowledge_store import load_snapshot
                # Defaults are materialized exactly as they are for snapshot export.
                from dataclasses import asdict
                expected = [asdict(Document(**item)) for item in records]
                records = load_snapshot(database_url, expected)
                self.store = 'neon'
            except Exception:
                logging.getLogger('omaria.knowledge').warning('Remote knowledge unavailable; using verified bundled documents.')
        for item in records:
            doc = Document(**item)
            if any(d.id == doc.id for d in self.documents):
                raise ValueError(f'Duplicate knowledge id: {doc.id}')
            if not re.fullmatch(r'/#[A-Za-z0-9_-]+|/Curriculo_[\w.-]+\.pdf|https://github\.com/OmarFLK/[^\s]+', doc.url):
                raise ValueError('Only approved knowledge links are accepted')
            self.documents.append(doc)
        if not self.documents: raise ValueError('Knowledge base is empty')
        self.version = hashlib.sha256(raw).hexdigest()[:12]
        self.counts = [Counter(tokens(' '.join(d.title.values()) + ' ' + ' '.join(d.content.values()) + ' ' + (' '.join(d.tags) + ' ') * 3)) for d in self.documents]
        self.lengths = [sum(c.values()) for c in self.counts]
        self.average = sum(self.lengths) / len(self.lengths)
        self.frequency = Counter(term for c in self.counts for term in c)

    def search(self, question: str, history: list[dict] | None = None, include_compensation=False, limit=7) -> list[Document]:
        current = set(tokens(question))
        expanded = set(current)
        for group in ALIASES:
            if current & group: expanded |= group
        previous = next((m['content'] for m in reversed(history or []) if m['role'] == 'user'), '')
        # Follow-up terms provide context, never facts. Current question dominates.
        past = set(tokens(previous)) if len(current) < 8 else set()
        scores = []
        for doc, counts, length in zip(self.documents, self.counts, self.lengths):
            if doc.restricted and not include_compensation: continue
            score = 0.0
            for term in expanded | past:
                f = counts[term]
                if not f: continue
                idf = math.log(1 + (len(self.documents) - self.frequency[term] + .5) / (self.frequency[term] + .5))
                weight = 1 if term in current else .28 if term in expanded else .12
                score += weight * idf * f * 2.2 / (f + 1.2 * (.25 + .75 * length / self.average))
            name_tokens = set(tokens(' '.join(doc.title.values()) + ' ' + ' '.join(doc.tags)))
            score += len(current & name_tokens) * .25
            q = normalize(question)
            if 'login' in q and doc.id == 'result-onebox-login': score += 12
            if 'rag' in current and doc.id in ['project-maua-ia', 'project-pendi']: score += 4
            if any(v in q for v in ['estoque', 'inventory', 'avenida']) and doc.id in ['result-avenida-inventory', 'project-avenida-tintas']: score += 8
            if any(v in q for v in ['tech hub', 'techhub']) and doc.id == 'project-tech-hub': score += 12
            if any(v in q for v in ['precific', 'pricing', 'calculadora']) and doc.id == 'project-pricing': score += 12
            if any(v in q for v in ['trein', 'trained', 'qlora', 'fine-tun']) and doc.id in ['engineering-approach', 'project-maua-ia']: score += 7
            if current & {'quem', 'who', 'resumo', 'resuma', 'summary', 'perfil', 'profile'} and doc.id == 'profile': score += 8
            if current & {'projetos', 'projects'} and doc.id.startswith('project-'): score += 5
            if current & {'habilidade', 'habilidades', 'competencias', 'skills', 'stack', 'tecnologias', 'ferramentas', 'technical'} and doc.id.startswith('skill-'): score += 10
            if current & {'resultados', 'results', 'impacto', 'impact'} and doc.id.startswith('result-'): score += 5
            if current & {'salario', 'bolsa', 'salary', 'pretensao', 'remuneracao', 'beneficios', 'vr'} and include_compensation and doc.restricted: score += 15
            if score > .4: scores.append((score, doc))
        return [doc for _, doc in sorted(scores, key=lambda item: item[0], reverse=True)[:limit]]

    def conversation_context(self, question: str, history: list[dict] | None = None, include_compensation=False) -> list[Document]:
        # The public factbook is only ~10k characters. Ranking guides attention;
        # the remaining public documents prevent lexical misses from hiding facts.
        ranked = self.search(question, history, include_compensation=include_compensation)
        seen = {doc.id for doc in ranked}
        return ranked + [doc for doc in self.documents if doc.id not in seen and (not doc.restricted or include_compensation)]
