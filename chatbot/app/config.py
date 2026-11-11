from dataclasses import dataclass
from pathlib import Path
import os
from dotenv import load_dotenv

ROOT = Path(__file__).resolve().parents[1]

@dataclass(frozen=True)
class Settings:
    api_key: str = ''
    database_url: str = ''
    base_url: str = 'https://ia.maua.br/api/v1'
    model: str = 'google/gemma-3-27b'
    allowed_origins: tuple[str, ...] = ('http://localhost:5173', 'http://127.0.0.1:5173')
    rate_limit: int = 12
    global_limit: int = 100
    daily_limit: int = 500
    timeout: float = 60
    knowledge_dir: Path = ROOT / 'knowledge'

    @classmethod
    def from_env(cls):
        load_dotenv(ROOT / '.env', override=False)
        return cls(
            api_key=os.getenv('BARO_API_KEY', '').strip(),
            database_url=os.getenv('DATABASE_URL', '').strip(),
            base_url=os.getenv('BARO_BASE_URL', cls.base_url).rstrip('/'),
            model=os.getenv('BARO_MODEL', cls.model),
            allowed_origins=tuple(v.strip() for v in os.getenv('ALLOWED_ORIGINS', 'http://localhost:5173,http://127.0.0.1:5173').split(',') if v.strip()),
            rate_limit=max(1, int(os.getenv('CHAT_RATE_LIMIT', '12'))),
            global_limit=max(1, int(os.getenv('CHAT_GLOBAL_LIMIT', '100'))),
            daily_limit=max(1, int(os.getenv('CHAT_DAILY_LIMIT', '500'))),
            timeout=max(5, min(120, float(os.getenv('BARO_TIMEOUT_SECONDS', '60')))),
        )
