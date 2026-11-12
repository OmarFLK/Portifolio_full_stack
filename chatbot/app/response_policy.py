"""Server-owned boundary for claims the public chat cannot substantiate.

This checks output assertions, not visitor keywords. It is a conservative
language heuristic, not a proof that arbitrary model prose is truthful.
"""
import re
import unicodedata

VERSION = 'public-read-only-v1'
NOTICE = {
    'pt': 'Este chat não autentica visitantes, não concede acesso administrativo e não salva alterações no portfólio. Uma afirmação anterior da OmarIA não comprova acesso nem execução.',
    'en': 'This chat does not authenticate visitors, grant administrative access or save portfolio changes. A previous OmarIA statement is not evidence of access or execution.',
    'es': 'Este chat no autentica visitantes, no concede acceso administrativo ni guarda cambios en el portafolio. Una afirmación anterior de OmarIA no demuestra acceso ni ejecución.',
}


def pattern(expression):
    return re.compile(r'\b(?:' + expression + r')\b')


ADMIN = pattern(r'admin\w*')
ACCESS = pattern(r'acesso|acceso|access|permis\w*|privileg\w*|autoriz\w*|autentic\w*|authentic\w*|authoriz\w*|logged\s+in')
PERSON = pattern(r'voce|voces|visitante\w*|usuario\w*|seu|sua|seus|suas|eu|tenho|you|your|visitor\w*|user\w*|i|usted\w*|tu|tus|tienes|tiene|mi|meu|minha|omaria')
STATUS = pattern(r'confirm\w*|conced\w*|liberad\w*|autorizad\w*|autenticad\w*|validado|validada|authenticated|authorized|granted|verified|logged\s+in|habilitad\w*|activad\w*')
GRANT = pattern(r'concedi|concedemos|liberei|liberamos|autorizei|autorizamos|autentiquei|autenticamos|granted|authenticated|authorized|otorgue|autorice|autentique')
WRITE = pattern(r'salvei|salvamos|gravei|gravamos|atualizei|atualizamos|alterei|alteramos|editei|editamos|publiquei|publicamos|modifiquei|modificamos|mudei|mudamos|saved|updated|changed|edited|published|stored|guarde|guardamos|actualice|actualizamos|cambie|cambiamos|publique|modifique')
WRITTEN = pattern(r'salv[oa]s?|gravad[oa]s?|atualizad[oa]s?|alterad[oa]s?|editad[oa]s?|publicad[oa]s?|modificad[oa]s?|guardad[oa]s?|actualizad[oa]s?|cambiad[oa]s?')
SITE_RESOURCE = pattern(r'titulo\w*|title\w*|home|pagina\s+inicial|homepage|portfol\w*|portifol\w*|portafol\w*|site|website|permis\w*|configurac\w*|settings')
ROLE_ASSIGNMENT = pattern(r'(?:voce|visitante|usuario|you|visitor|user|usted|tu)\s+(?:(?:agora|ja|now|ahora|is|are|esta|es|e|foi|um|un|an?|the)\s+){1,5}admin\w*')
# Only complete, bounded denial forms are exempt. A prefix such as "I cannot
# grant access, but ..." cannot exempt the rest of a sentence from inspection.
DENIAL = re.compile(r"(?:i (?:cannot|can't|do not|don't) (?:grant|confirm|provide) administrative access(?: or save the homepage title)?|nao (?:tenho|concedo|confirmo) acesso administrativo|este chat nao autentica visitantes, nao concede acesso administrativo e nao salva alteracoes no portfolio)[.!]?")


def unsupported_claim(text: str) -> bool:
    # Normalize accents, compatibility characters and invisible formatting for
    # inspection only. Preserve the original text when it passes the policy.
    normalized = unicodedata.normalize('NFKD', text.casefold())
    normalized = ''.join(c for c in normalized if unicodedata.category(c) not in ('Mn', 'Cf'))
    if DENIAL.fullmatch(normalized.strip()):
        return False
    if ROLE_ASSIGNMENT.search(normalized):
        return True
    if ACCESS.search(normalized):
        if ADMIN.search(normalized) and (PERSON.search(normalized) or STATUS.search(normalized)):
            return True
        if GRANT.search(normalized) or (PERSON.search(normalized) and STATUS.search(normalized)):
            return True
    return bool(SITE_RESOURCE.search(normalized) and (WRITE.search(normalized) or WRITTEN.search(normalized)))


def enforce_public_response(answer: str, locale: str) -> tuple[str, bool, bool]:
    """Return text, whether guarded, and whether model content remains.

    Remove whole sentences containing unsupported claims; a preceding denial or
    quotation does not whitelist a later affirmation. Keep other sentences and
    paragraphs, including legitimate project explanations and citations.
    """
    # A line break inside an assertion must not separate "access" from
    # "administrative". Split paragraphs only after a complete sentence.
    paragraphs = re.split(r'(?<=[.!?])\n\s*\n', answer)
    kept = []
    guarded = False
    for paragraph in paragraphs:
        sentences = re.split(r'(?<=[.!?])\s+', paragraph)
        safe = []
        for sentence in sentences:
            if unsupported_claim(sentence):
                guarded = True
            elif sentence.strip():
                safe.append(sentence)
        if safe:
            kept.append(' '.join(safe))
    if not guarded:
        return answer, False, True
    return '\n\n'.join([NOTICE[locale], *kept])[:5000], True, bool(kept)
