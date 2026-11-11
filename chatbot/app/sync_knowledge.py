"""Publish a trusted snapshot during deployment; never called by a chat request."""
from dataclasses import asdict
import os
from .config import Settings
from .knowledge_store import save_snapshot
from .retrieval import KnowledgeIndex


def main():
    settings = Settings.from_env()
    url = os.getenv('KNOWLEDGE_ADMIN_DATABASE_URL', '').strip()
    if not url:
        print('Knowledge sync skipped: using bundled documents.')
        return
    index = KnowledgeIndex(settings.knowledge_dir)
    try:
        version = save_snapshot(url, [asdict(doc) for doc in index.documents])
    except Exception:
        # Database exceptions can contain passwords or connection strings.
        raise SystemExit('Knowledge sync failed; database error details withheld.') from None
    print(f'Knowledge snapshot published: {version[:12]} ({len(index.documents)} documents).')


if __name__ == '__main__': main()
