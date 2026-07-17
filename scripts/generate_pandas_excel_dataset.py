from datetime import datetime, timedelta
from pathlib import Path
from random import Random
from zipfile import ZIP_DEFLATED, ZipFile
from xml.sax.saxutils import escape


OUTPUT = Path("public/datasets/python-pandas/dataset_analytics_empresa.xlsx")
rng = Random(42)


def col_name(index):
    name = ""
    while index:
        index, remainder = divmod(index - 1, 26)
        name = chr(65 + remainder) + name
    return name


def xml_cell(value, row_index, column_index):
    ref = f"{col_name(column_index)}{row_index}"
    if value is None:
        return f'<c r="{ref}"/>'
    if isinstance(value, (int, float)) and not isinstance(value, bool):
        return f'<c r="{ref}"><v>{value}</v></c>'
    return f'<c r="{ref}" t="inlineStr"><is><t>{escape(str(value))}</t></is></c>'


def worksheet_xml(headers, rows):
    xml_rows = []
    all_rows = [headers, *rows]
    for row_index, row in enumerate(all_rows, start=1):
        cells = "".join(xml_cell(value, row_index, column_index) for column_index, value in enumerate(row, start=1))
        xml_rows.append(f'<row r="{row_index}">{cells}</row>')
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">'
        f'<sheetData>{"".join(xml_rows)}</sheetData>'
        "</worksheet>"
    )


def random_date(start, days):
    return (start + timedelta(days=rng.randint(0, days))).strftime("%Y-%m-%d")


def maybe_dirty(value, empty_chance=0.0, variants=None):
    if rng.random() < empty_chance:
        return None
    if variants and rng.random() < 0.02:
        return rng.choice(variants)
    return value


def build_clientes():
    headers = [
        "id_cliente",
        "nome",
        "idade",
        "genero",
        "cidade",
        "estado",
        "data_cadastro",
        "renda_estimada",
        "score_credito",
    ]
    cidades_estados = [
        ("Manaus", "AM"),
        ("Belém", "PA"),
        ("São Paulo", "SP"),
        ("Rio", "RJ"),
        ("Recife", "PE"),
    ]
    rows = []
    for item_id in range(1, 1201):
        cidade, estado = rng.choice(cidades_estados)
        rows.append(
            [
                item_id,
                f"Cliente_{item_id}",
                maybe_dirty(rng.randint(18, 70), 0.015),
                maybe_dirty(rng.choice(["M", "F"]), 0.01, ["m", "f", "Não informado"]),
                maybe_dirty(cidade, 0.01),
                maybe_dirty(estado, 0.01, [estado.lower()]),
                random_date(datetime(2022, 1, 1), 1000),
                maybe_dirty(rng.randint(1500, 15000), 0.015),
                maybe_dirty(rng.randint(300, 900), 0.01),
            ]
        )
    return headers, rows


def build_produtos():
    headers = ["id_produto", "nome_produto", "categoria", "custo", "preco", "margem"]
    rows = []
    for item_id in range(1, 1201):
        custo = round(rng.uniform(20, 500), 2)
        preco = round(custo * rng.uniform(1.2, 2.5), 2)
        rows.append(
            [
                item_id,
                f"Produto_{item_id}",
                maybe_dirty(rng.choice(["Tech", "Casa", "Moda", "Serviço"]), 0.01, ["tech", "servico"]),
                custo,
                maybe_dirty(preco, 0.01),
                round(preco - custo, 2),
            ]
        )
    return headers, rows


def build_vendas(produtos):
    headers = [
        "id_venda",
        "data_venda",
        "id_cliente",
        "id_produto",
        "quantidade",
        "valor_unitario",
        "desconto",
        "valor_total",
    ]
    preco_por_produto = {row[0]: row[4] for row in produtos if row[4] is not None}
    rows = []
    for item_id in range(1, 2001):
        id_produto = rng.randint(1, 1200)
        quantidade = rng.randint(1, 10)
        desconto = rng.choice([0, 5, 10, 15, 20, None])
        valor_unitario = preco_por_produto.get(id_produto, round(rng.uniform(50, 800), 2))
        desconto_calculo = 0 if desconto is None else desconto
        valor_total = round(quantidade * valor_unitario * (1 - desconto_calculo / 100), 2)
        rows.append(
            [
                item_id,
                random_date(datetime(2023, 1, 1), 365),
                rng.randint(1, 1200),
                id_produto,
                quantidade,
                valor_unitario,
                desconto,
                valor_total,
            ]
        )
    rows.append(rows[-1][:])
    rows[-1][0] = rows[-2][0]
    return headers, rows


def build_financeiro():
    headers = ["id_transacao", "data", "tipo", "categoria", "valor", "descricao"]
    rows = []
    for item_id in range(1, 1501):
        rows.append(
            [
                item_id,
                random_date(datetime(2023, 1, 1), 365),
                maybe_dirty(rng.choice(["Receita", "Despesa"]), 0.01, ["receita", "DESPESA"]),
                rng.choice(["Operacional", "Marketing", "RH", "Infra"]),
                maybe_dirty(round(rng.uniform(100, 10000), 2), 0.01),
                "Movimentação financeira",
            ]
        )
    return headers, rows


def build_marketing():
    headers = ["campanha", "canal", "investimento", "leads", "conversoes", "receita_gerada"]
    rows = []
    for item_id in range(1, 1001):
        conversoes = rng.randint(5, 100)
        rows.append(
            [
                f"Camp_{item_id}",
                maybe_dirty(rng.choice(["Google", "Instagram", "Facebook", "Email"]), 0.01, ["google", "E-mail"]),
                maybe_dirty(round(rng.uniform(500, 5000), 2), 0.01),
                rng.randint(50, 500),
                conversoes,
                round(conversoes * rng.uniform(50, 300), 2),
            ]
        )
    return headers, rows


def write_xlsx(sheets):
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    workbook_sheets = []
    workbook_rels = []
    overrides = [
        '<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>',
        '<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>',
    ]
    with ZipFile(OUTPUT, "w", ZIP_DEFLATED) as archive:
        archive.writestr(
            "_rels/.rels",
            '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
            '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
            '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>'
            "</Relationships>",
        )

        for index, (name, headers, rows) in enumerate(sheets, start=1):
            sheet_path = f"xl/worksheets/sheet{index}.xml"
            archive.writestr(sheet_path, worksheet_xml(headers, rows))
            workbook_sheets.append(f'<sheet name="{name}" sheetId="{index}" r:id="rId{index}"/>')
            workbook_rels.append(
                f'<Relationship Id="rId{index}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet{index}.xml"/>'
            )
            overrides.append(
                f'<Override PartName="/xl/worksheets/sheet{index}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>'
            )

        style_rid = len(sheets) + 1
        workbook_rels.append(
            f'<Relationship Id="rId{style_rid}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>'
        )
        archive.writestr(
            "xl/workbook.xml",
            '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
            '<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" '
            'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">'
            f'<sheets>{"".join(workbook_sheets)}</sheets></workbook>',
        )
        archive.writestr(
            "xl/_rels/workbook.xml.rels",
            '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
            '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
            f'{"".join(workbook_rels)}</Relationships>',
        )
        archive.writestr(
            "xl/styles.xml",
            '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
            '<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">'
            '<fonts count="1"><font><sz val="11"/><name val="Calibri"/></font></fonts>'
            '<fills count="1"><fill><patternFill patternType="none"/></fill></fills>'
            '<borders count="1"><border/></borders>'
            '<cellStyleXfs count="1"><xf/></cellStyleXfs><cellXfs count="1"><xf/></cellXfs>'
            "</styleSheet>",
        )
        content_types = (
            '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
            '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'
            '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>'
            '<Default Extension="xml" ContentType="application/xml"/>'
            f'{"".join(overrides)}</Types>'
        )
        archive.writestr("[Content_Types].xml", content_types)


def main():
    clientes_headers, clientes_rows = build_clientes()
    produtos_headers, produtos_rows = build_produtos()
    vendas_headers, vendas_rows = build_vendas(produtos_rows)
    financeiro_headers, financeiro_rows = build_financeiro()
    marketing_headers, marketing_rows = build_marketing()
    write_xlsx(
        [
            ("clientes", clientes_headers, clientes_rows),
            ("produtos", produtos_headers, produtos_rows),
            ("vendas", vendas_headers, vendas_rows),
            ("financeiro", financeiro_headers, financeiro_rows),
            ("marketing", marketing_headers, marketing_rows),
        ]
    )
    print(f"Generated {OUTPUT}")


if __name__ == "__main__":
    main()
