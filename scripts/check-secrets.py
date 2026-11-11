"""Scan Git candidates/staging/history without printing secret values."""
import argparse
from pathlib import Path
import re
import subprocess

ROOT = Path(__file__).resolve().parents[1]
PATTERNS = [
    re.compile(rb'baro_[A-Za-z0-9_-]{24,}'),
    re.compile(rb'(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{36,}'),
    re.compile(rb'github_pat_[A-Za-z0-9_]{60,}'),
    re.compile(rb'AKIA[A-Z0-9]{16}'),
    re.compile(rb'npg_[A-Za-z0-9]{12,}'),
    re.compile(rb'-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----'),
]
for env_path in [ROOT / '.env', ROOT / '.env.local', ROOT / 'chatbot/.env']:
    if not env_path.exists(): continue
    for line in env_path.read_text(encoding='utf-8-sig').splitlines():
        name, _, value = line.partition('=')
        value = value.strip().strip('\"\'')
        if re.search(r'(API_KEY|TOKEN|SECRET|PASSWORD|DATABASE_URL)$', name.strip()) and len(value) >= 16:
            PATTERNS.append(re.compile(re.escape(value.encode())))


def git(*args):
    return subprocess.check_output(['git', *args], cwd=ROOT)


def sensitive(data):
    return any(pattern.search(data) for pattern in PATTERNS)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--staged', action='store_true')
    parser.add_argument('--history', action='store_true')
    args = parser.parse_args()
    failures, count = [], 0
    if args.history:
        objects = git('rev-list', '--objects', '--all').splitlines()
        with subprocess.Popen(['git', 'cat-file', '--batch'], cwd=ROOT, stdin=subprocess.PIPE, stdout=subprocess.PIPE) as process:
            for entry in objects:
                oid, _, name = entry.partition(b' ')
                process.stdin.write(oid + b'\n')
                process.stdin.flush()
                header = process.stdout.readline().split()
                if len(header) != 3: raise RuntimeError('Cannot inspect Git object')
                data = process.stdout.read(int(header[2]))
                process.stdout.read(1)
                if header[1] == b'blob':
                    count += 1
                    if sensitive(data): failures.append(name.decode(errors='replace') or oid.decode())
            process.stdin.close()
            if process.wait() != 0: raise RuntimeError('Git object inspection failed')
    else:
        listing = git('ls-files', '-z', '--cached', *([] if args.staged else ['--others', '--exclude-standard']))
        for raw_path in set(listing.split(b'\0')) - {b''}:
            path = raw_path.decode('utf-8')
            if args.staged:
                data = git('show', f':{path}')
            else:
                file = ROOT / path
                if not file.is_file(): continue
                data = file.read_bytes()
            count += 1
            if sensitive(data): failures.append(path)
    if failures:
        print('FAIL: possible secrets in ' + ', '.join(sorted(set(failures))))
        raise SystemExit(1)
    print(f'PASS: {count} files/objects checked; no detected credentials.')


if __name__ == '__main__': main()
