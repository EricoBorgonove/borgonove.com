import json
import math
import time
from pathlib import Path
from deep_translator import GoogleTranslator

ROOT = Path(__file__).resolve().parents[1]
ALG_PATH = ROOT / 'src' / 'data' / 'algoritmos-listas.json'
MOD_PATH = ROOT / 'src' / 'data' / 'modelagens-listas.json'

BATCH_SIZE = 25
RETRIES = 4
PAUSE_BETWEEN_BATCHES = 0.25


def load_json(path: Path):
    with path.open('r', encoding='utf-8') as f:
        return json.load(f)


def save_json(path: Path, data):
    with path.open('w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write('\n')


def chunked(items, size):
    for i in range(0, len(items), size):
        yield items[i:i + size]


def translate_unique_texts(texts):
    translator = GoogleTranslator(source='pt', target='en')
    unique = list(dict.fromkeys([t for t in texts if isinstance(t, str) and t.strip()]))
    result = {}

    total_batches = math.ceil(len(unique) / BATCH_SIZE) if unique else 0
    for idx, batch in enumerate(chunked(unique, BATCH_SIZE), start=1):
        translated = None
        for attempt in range(1, RETRIES + 1):
            try:
                translated = translator.translate_batch(batch)
                if translated and len(translated) == len(batch):
                    break
            except Exception:
                translated = None
            time.sleep(0.8 * attempt)

        if not translated or len(translated) != len(batch):
            # fallback per item
            translated = []
            for text in batch:
                translated_text = text
                for attempt in range(1, RETRIES + 1):
                    try:
                        translated_text = translator.translate(text)
                        break
                    except Exception:
                        time.sleep(0.8 * attempt)
                translated.append(translated_text)

        for src, dst in zip(batch, translated):
            result[src] = dst if isinstance(dst, str) and dst.strip() else src

        print(f'batch {idx}/{total_batches} done')
        time.sleep(PAUSE_BETWEEN_BATCHES)

    return result


def main():
    algoritmos = load_json(ALG_PATH)
    modelagens = load_json(MOD_PATH)

    texts = []
    for lista in algoritmos:
        texts.append(lista.get('tipo', ''))
        texts.append(lista.get('titulo', ''))
        for q in lista.get('questoes', []):
            texts.append(q.get('texto', ''))

    for item in modelagens:
        texts.append(item.get('titulo', ''))
        texts.append(item.get('descricao', ''))

    mapping = translate_unique_texts(texts)

    for lista in algoritmos:
        lista['tipo_en'] = mapping.get(lista.get('tipo', ''), lista.get('tipo', ''))
        lista['titulo_en'] = mapping.get(lista.get('titulo', ''), lista.get('titulo', ''))
        for q in lista.get('questoes', []):
            q['texto_en'] = mapping.get(q.get('texto', ''), q.get('texto', ''))

    for item in modelagens:
        item['titulo_en'] = mapping.get(item.get('titulo', ''), item.get('titulo', ''))
        item['descricao_en'] = mapping.get(item.get('descricao', ''), item.get('descricao', ''))

    save_json(ALG_PATH, algoritmos)
    save_json(MOD_PATH, modelagens)

    print('done')


if __name__ == '__main__':
    main()
