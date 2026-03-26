#!/usr/bin/env python3
"""Generate English translation maps for roadmap pages.

Usage:
  python3 scripts/generate_roadmap_translation_maps.py
"""

from __future__ import annotations

import json
import os
import re
import time
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PAGES = {
    "src/pages/RoadmapCiberseguranca.jsx": "src/data/roadmap-ciber-en-map.json",
    "src/pages/RoadmapLogicaProgramacao.jsx": "src/data/roadmap-logic-en-map.json",
    "src/pages/RoadmapJavaScript.jsx": "src/data/roadmap-javascript-en-map.json",
}

ACCENTED_RE = re.compile(r"[ÁÀÂÃÉÊÍÓÔÕÚÇáàâãéêíóôõúç]")
SENTENCE_HINT_RE = re.compile(r"[\s,:;()\-—/]")
PATH_RE = re.compile(r"^(\.\.?/|/)")
SIMPLE_TOKEN_RE = re.compile(r"^[a-z0-9_-]+$")
PLAIN_EN_WORD_RE = re.compile(r"^[A-Za-z]{1,30}$")


def decode_js_literal(value: str) -> str:
    return (
        value.replace("\\\\", "\\")
        .replace('\\"', '"')
        .replace("\\'", "'")
        .replace("\\n", "\n")
        .replace("\\t", "\t")
        .replace("\\r", "\r")
    )


def should_keep(value: str) -> bool:
    text = value.strip()
    if len(text) < 3:
        return False
    if PATH_RE.match(text):
        return False
    if text.startswith("roadmapPages."):
        return False
    if text.startswith("http://") or text.startswith("https://"):
        return False
    if SIMPLE_TOKEN_RE.fullmatch(text):
        return False
    if PLAIN_EN_WORD_RE.fullmatch(text):
        return False
    return bool(ACCENTED_RE.search(text) or SENTENCE_HINT_RE.search(text))


def extract_candidate_strings(page_path: Path) -> list[str]:
    source = page_path.read_text(encoding="utf-8")
    pre_component = source.split("export default function", 1)[0]
    pre_component = "\n".join(
        line for line in pre_component.splitlines() if not line.strip().startswith("import ")
    )

    pattern = re.compile(r"\"((?:\\.|[^\"\\])*)\"|'((?:\\.|[^'\\])*)'")
    values: list[str] = []
    seen: set[str] = set()

    for match in pattern.finditer(pre_component):
        raw = match.group(1) if match.group(1) is not None else match.group(2)
        decoded = decode_js_literal(raw).strip()
        if not should_keep(decoded):
            continue
        if decoded in seen:
            continue
        seen.add(decoded)
        values.append(decoded)

    return values


def translate_text(text: str) -> str:
    encoded = urllib.parse.quote(text)
    url = (
        "https://translate.googleapis.com/translate_a/single"
        f"?client=gtx&sl=pt&tl=en&dt=t&q={encoded}"
    )
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": "Mozilla/5.0",
            "Accept": "application/json,text/plain,*/*",
        },
    )
    with urllib.request.urlopen(req, timeout=20) as resp:
        payload = resp.read().decode("utf-8")
    data = json.loads(payload)
    parts = data[0] if data and isinstance(data[0], list) else []
    translated = "".join(part[0] for part in parts if part and part[0])
    return translated.strip() if translated else text


def generate_map(strings: list[str]) -> dict[str, str]:
    output: dict[str, str] = {}
    for idx, original in enumerate(strings, start=1):
        translated = original
        for attempt in range(3):
            try:
                translated = translate_text(original)
                break
            except Exception:
                if attempt == 2:
                    translated = original
                time.sleep(0.8)
        output[original] = translated if translated else original
        if idx % 20 == 0 or idx == len(strings):
            print(f"Translated {idx}/{len(strings)}", flush=True)
        time.sleep(0.05)

    return output


def main() -> None:
    os.environ.setdefault("PYTHONUNBUFFERED", "1")
    for src, dst in PAGES.items():
        src_path = ROOT / src
        dst_path = ROOT / dst
        strings = extract_candidate_strings(src_path)
        print(f"\n{src_path.name}: {len(strings)} candidate strings", flush=True)
        translation_map = generate_map(strings)

        dst_path.write_text(
            json.dumps(translation_map, ensure_ascii=False, indent=2, sort_keys=True) + "\n",
            encoding="utf-8",
        )
        print(f"Saved: {dst_path.relative_to(ROOT)}", flush=True)


if __name__ == "__main__":
    main()
