"""Versioned knowledge snapshots. No visitor conversations or model writes."""
import hashlib
import json
import certifi
import psycopg
from psycopg.types.json import Jsonb


def fingerprint(documents):
    payload = json.dumps(documents, ensure_ascii=False, sort_keys=True, separators=(',', ':'))
    return hashlib.sha256(payload.encode()).hexdigest()


def connect(url):
    return psycopg.connect(
        url, sslmode='verify-full', sslrootcert=certifi.where(),
        channel_binding='require', connect_timeout=10,
        application_name='omaria-knowledge',
    )


def load_snapshot(url, expected_documents):
    expected = fingerprint(expected_documents)
    with connect(url) as connection:
        connection.execute('SET TRANSACTION READ ONLY')
        connection.execute("SET LOCAL statement_timeout = '5s'")
        row = connection.execute(
            'SELECT documents FROM omaria.knowledge_snapshots WHERE fingerprint = %s',
            (expected,),
        ).fetchone()
    if not row or not isinstance(row[0], list) or fingerprint(row[0]) != expected:
        raise ValueError('Missing or mismatched knowledge snapshot')
    return row[0]


def save_snapshot(url, documents):
    version = fingerprint(documents)
    with connect(url) as connection:
        connection.execute("SET LOCAL statement_timeout = '5s'")
        connection.execute('CREATE SCHEMA IF NOT EXISTS omaria')
        connection.execute('REVOKE ALL ON SCHEMA omaria FROM PUBLIC')
        connection.execute('''CREATE TABLE IF NOT EXISTS omaria.knowledge_snapshots (
            fingerprint text PRIMARY KEY,
            documents jsonb NOT NULL CHECK (jsonb_typeof(documents) = 'array'),
            created_at timestamptz NOT NULL DEFAULT now()
        )''')
        connection.execute(
            '''INSERT INTO omaria.knowledge_snapshots (fingerprint, documents)
               VALUES (%s, %s) ON CONFLICT (fingerprint) DO NOTHING''',
            (version, Jsonb(documents)),
        )
    return version
