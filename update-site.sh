#!/usr/bin/env bash
set -euo pipefail
python3 - <<'PY'
from pathlib import Path

for p in list(Path('.').glob('*.html')) + [Path('script.js')]:
    if not p.exists():
        continue
    text = p.read_text(encoding='utf-8')
    text = text.replace('hello@minifoxlabs.com', 'support@minifoxlabs.com')
    text = text.replace('nic.ua.uk@gmail.com', 'support@minifoxlabs.com')
    text = text.replace('minifoxlabs@gmail.com', 'support@minifoxlabs.com')
    text = text.replace('https://nicua.github.io/work-time-tracker-privacy/', 'https://minifoxlabs.com/privacy.html')
    text = text.replace('https://nicua.github.io/mini-fox-labs-site/', 'https://minifoxlabs.com/')
    p.write_text(text, encoding='utf-8')
PY
