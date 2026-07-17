from faker import Faker
import random
from datetime import datetime

fake = Faker("pt_BR")

# ---------------------------------------------------------
# CPF válido
# ---------------------------------------------------------
def gerar_cpf_real():
    from random import randint
    n = [randint(0, 9) for _ in range(9)]
    s = sum([(n[i] * (10 - i)) for i in range(9)])
    d1 = ((s * 10) % 11) % 10
    s = sum([(n[i] * (11 - i)) for i in range(9)]) + d1 * 2
    d2 = ((s * 10) % 11) % 10
    return "%d%d%d.%d%d%d.%d%d%d-%d%d" % (*n, d1, d2)

# ---------------------------------------------------------
# Quantidades
# ---------------------------------------------------------
TOTAL_CLIENTES   = 10000
TOTAL_VETS       = 1000
TOTAL_ANIMAIS    = 50000
TOTAL_CONSULTAS  = 200000
TOTAL_VACINAS    = 120
TOTAL_PRODUTOS   = 800
TOTAL_VENDAS     = 80000
TOTAL_ITENS      = 200000

dump = []

# ---------------------------------------------------------
# ENDEREÇOS – cidades reais
# ---------------------------------------------------------
cidades = [
    ("Manaus", "AM"), ("Belém", "PA"), ("Boa Vista", "RR"), ("Porto Velho", "RO"),
    ("Salvador", "BA"), ("Fortaleza", "CE"), ("Recife", "PE"), ("Natal", "RN"),
    ("São Paulo", "SP"), ("Rio de Janeiro", "RJ"), ("Curitiba", "PR"),
    ("Florianópolis", "SC"), ("Porto Alegre", "RS"), ("Belo Horizonte", "MG"),
    ("Brasília", "DF")
]

def endereco_real():
    rua = fake.street_name()
    numero = random.randint(1, 2000)
    bairro = fake.bairro()
    cidade, uf = random.choice(cidades)
    e = f"{rua}, {numero} - {bairro}, {cidade}/{uf}"
    return e.replace("'", "''")

# ---------------------------------------------------------
# RAÇAS REAIS
# ---------------------------------------------------------
racas_cachorro = [
    "Labrador", "Golden Retriever", "Poodle", "Bulldog", "Pastor Alemão",
    "Shih-Tzu", "Husky Siberiano", "Beagle", "Rottweiler", "SRD"
]

racas_gato = [
    "Siamês", "Persa", "Maine Coon", "Angorá", "Sphynx", "British Shorthair",
    "Bengal", "SRD"
]

racas_ave = ["Calopsita", "Periquito", "Papagaio", "Cacatua", "Canário"]

def raca_por_especie(especie):
    if especie == "Cachorro":
        return random.choice(racas_cachorro)
    if especie == "Gato":
        return random.choice(racas_gato)
    return random.choice(racas_ave)

# ---------------------------------------------------------
# SAZONALIDADE
# ---------------------------------------------------------
def nascimento_sazonal():
    ano = random.randint(2010, 2023)
    mes = random.choices(
        [1,2,3,4,5,6,7,8,9,10,11,12],
        [12,12,12,10,10,8,6,6,5,5,5,4]
    )[0]
    dia = random.randint(1, 28)
    return datetime(ano, mes, dia).date()

def consulta_sazonal():
    meses = [1,2,3,9,10,11,12,4,5,6,7,8]
    pesos = [12,12,12,10,10,10,10,6,6,5,5,5]
    mes = random.choices(meses, pesos)[0]
    ano = random.choice([2023, 2024])
    dia = random.randint(1, 28)
    hora = random.choices([8,9,10,11,14,15,16,17,18],
                          [10,10,10,10,8,8,8,6,4])[0]
    minuto = random.randint(0, 59)
    return datetime(ano, mes, dia, hora, minuto)

def venda_data_sazonal():
    meses = [1,2,3,9,10,11,12,4,5,6,7,8]
    pesos = [11,11,11,10,10,10,10,7,7,6,6,6]
    mes = random.choices(meses, pesos)[0]
    ano = random.choice([2023, 2024])
    dia = random.randint(1, 28)
    hora = random.choices([9,10,11,14,15,16,19,20],
                          [10,10,10,10,10,10,6,4])[0]
    minuto = random.randint(0, 59)
    return datetime(ano, mes, dia, hora, minuto)

# ---------------------------------------------------------
# EPIDEMIOLOGIA
# ---------------------------------------------------------
disease_base = {
    "Cachorro": {
        "_default": [
            ("Dermatite alérgica à picada de pulga", 14),
            ("Otite externa", 10),
            ("Gastroenterite aguda", 9),
            ("Doença periodontal", 8),
            ("Infecção respiratória", 5),
            ("Artrite/Artrose", 5),
            ("Check-up clínico", 6),
            ("Vacinação de rotina", 7)
        ],
        "Labrador": [("Displasia coxofemoral", 12), ("Obesidade", 10)],
        "Golden Retriever": [("Dermatite atópica", 10)],
        "Shih-Tzu": [("Problemas oculares", 10)],
        "Bulldog": [("Síndrome braquicefálica", 12)]
    },
    "Gato": {
        "_default": [
            ("DTUIF", 12),
            ("Doença renal crônica", 9),
            ("Doença periodontal felina", 8),
            ("Vômitos e diarreia", 7),
            ("Rinotraqueíte", 7),
            ("Check-up clínico", 6),
            ("Vacinação de rotina", 7)
        ],
        "Persa": [("Doença renal policística", 10)],
        "Siamês": [("Doenças respiratórias", 8)],
        "Maine Coon": [("Cardiomiopatia hipertrófica", 10)]
    },
    "Ave": {
        "_default": [
            ("Hipovitaminose A", 10),
            ("Problemas de muda de penas", 9),
            ("Intoxicação alimentar", 7),
            ("Respiratória crônica", 6),
            ("Check-up de rotina", 8)
        ]
    }
}

def escolher_doenca(especie, raca, data):
    base = list(disease_base[especie]["_default"])
    if raca in disease_base[especie]:
        base += disease_base[especie][raca]

    mes = data.month
    ajustada = []
    for nome, peso in base:
        p = float(peso)
        if mes in (1,2,3,9,10,11,12):
            if "Dermatite" in nome or "Otite" in nome or "Gastro" in nome:
                p *= 1.8
        if mes in (6,7,8):
            if "Respirat" in nome or "Rinotra" in nome:
                p *= 2.0
        ajustada.append((nome, p))

    nomes = [n for n,_ in ajustada]
    pesos = [p for _,p in ajustada]
    return random.choices(nomes, pesos)[0]

# ---------------------------------------------------------
# ESTRUTURAS AUX
# ---------------------------------------------------------
animal_info = {}
client_species_count = {}

product_group = {}
product_price = {}
group_to_products = {"cao": [], "gato": [], "ave": [], "geral": []}

vendas = []
vendas_itens_inserts = []

# ---------------------------------------------------------
# CLIENTES
# ---------------------------------------------------------
for _ in range(TOTAL_CLIENTES):
    nome = fake.name()
    nome_sql = nome.replace("'", "''")
    cpf = gerar_cpf_real()
    tel = fake.phone_number()
    tel_sql = tel.replace("'", "")
    email = fake.email().replace("'", "''")
    end = endereco_real()

    dump.append(
        f"INSERT INTO clientes (nome, cpf, telefone, email, endereco) "
        f"VALUES ('{nome_sql}', '{cpf}', '{tel_sql}', '{email}', '{end}');"
    )

# ---------------------------------------------------------
# VETERINÁRIOS
# ---------------------------------------------------------
esps = ["Clínica Geral", "Dermatologia", "Cirurgia", "Ortopedia"]

for i in range(1, TOTAL_VETS + 1):
    nm = fake.name().replace("'", "''")
    nome = f"Dr. {nm}"
    crmv = f"CRMV-AM-{i:06d}"
    tel = fake.phone_number().replace("'", "")
    esp = random.choice(esps)

    dump.append(
        f"INSERT INTO veterinarios (nome, crmv, telefone, especialidade) "
        f"VALUES ('{nome}', '{crmv}', '{tel}', '{esp}');"
    )

# ---------------------------------------------------------
# VACINAS
# ---------------------------------------------------------
vacinas_reais = [
    "Raiva", "V10", "V8", "Gripe Canina", "Bordetella", "Giárdia",
    "Parvovirose", "Coronavirose", "Hepatite Infecciosa",
    "Panleucopenia", "Calicivirose", "Rinotraqueíte", "Leucemia Felina"
]

for i in range(TOTAL_VACINAS):
    nome = f"{random.choice(vacinas_reais)} {i}"
    nome_sql = nome.replace("'", "''")
    desc = fake.sentence().replace("'", "''")
    dump.append(
        f"INSERT INTO vacinas (nome, descricao) "
        f"VALUES ('{nome_sql}', '{desc}');"
    )

# ---------------------------------------------------------
# PRODUTOS
# ---------------------------------------------------------
produtos_base = [
    ("Ração Premium", "geral"),
    ("Ração Super Premium", "geral"),
    ("Ração para Cães", "cao"),
    ("Ração para Gatos", "gato"),
    ("Mistura para Aves", "ave"),
    ("Antipulgas Cães", "cao"),
    ("Antipulgas Gatos", "gato"),
    ("Antiparasitário", "geral"),
    ("Shampoo Cães", "cao"),
    ("Shampoo Gatos", "gato"),
    ("Areia Sanitária", "gato"),
    ("Suplemento", "geral"),
    ("Petisco Cães", "cao"),
    ("Petisco Gatos", "gato"),
    ("Brinquedo", "geral"),
    ("Coleira", "geral"),
    ("Coleira Anti-pulgas", "cao"),
    ("Antibiótico", "geral"),
    ("Anti-inflamatório", "geral")
]

for prod_id in range(1, TOTAL_PRODUTOS + 1):
    base_nome, base_grupo = random.choice(produtos_base)
    nome = f"{base_nome} {prod_id}"
    nome_sql = nome.replace("'", "''")
    desc = fake.sentence().replace("'", "''")
    preco = round(random.uniform(10, 450), 2)
    est = random.randint(1, 500)

    product_group[prod_id] = base_grupo
    product_price[prod_id] = preco
    group_to_products[base_grupo].append(prod_id)

    dump.append(
        f"INSERT INTO produtos (nome, descricao, preco, estoque) "
        f"VALUES ('{nome_sql}', '{desc}', {preco}, {est});"
    )

# ---------------------------------------------------------
# ANIMAIS
# ---------------------------------------------------------
especies = ["Cachorro", "Gato", "Ave"]

for aid in range(1, TOTAL_ANIMAIS + 1):
    nome = fake.first_name()
    nome_sql = nome.replace("'", "''")
    cliente = random.randint(1, TOTAL_CLIENTES)
    especie = random.choice(especies)
    raca = raca_por_especie(especie)
    raca_sql = raca.replace("'", "''")
    sexo = random.choice(["Macho", "Fêmea"])
    nasc = nascimento_sazonal()
    porte = random.choice(["Pequeno", "Médio", "Grande"])

    animal_info[aid] = (especie, raca, cliente)

    if cliente not in client_species_count:
        client_species_count[cliente] = {}
    client_species_count[cliente][especie] = client_species_count[cliente].get(especie, 0) + 1

    dump.append(
        f"INSERT INTO animais (cliente_id, nome, especie, raca, sexo, data_nascimento, porte) "
        f"VALUES ({cliente}, '{nome_sql}', '{especie}', '{raca_sql}', '{sexo}', '{nasc}', '{porte}');"
    )

# ---------------------------------------------------------
# CONSULTAS
# ---------------------------------------------------------
for _ in range(TOTAL_CONSULTAS):
    aid = random.randint(1, TOTAL_ANIMAIS)
    especie, raca, _clid = animal_info[aid]
    raca_sql = raca.replace("'", "''")

    vet = random.randint(1, TOTAL_VETS)
    data = consulta_sazonal()
    doenca = escolher_doenca(especie, raca, data)
    motivo = f"Sintomas compatíveis com {doenca.lower()}."
    diag = f"{doenca} em acompanhamento clínico."

    motivo_sql = motivo.replace("'", "''")
    diag_sql = diag.replace("'", "''")

    dump.append(
        f"INSERT INTO consultas (animal_id, veterinario_id, data_consulta, motivo, diagnostico) "
        f"VALUES ({aid}, {vet}, '{data}', '{motivo_sql}', '{diag_sql}');"
    )

# ---------------------------------------------------------
# VENDAS
# ---------------------------------------------------------
def grupo_por_especie(especie):
    if especie == "Cachorro":
        return ["cao", "geral"]
    if especie == "Gato":
        return ["gato", "geral"]
    if especie == "Ave":
        return ["ave", "geral"]
    return ["geral"]

for vid in range(1, TOTAL_VENDAS + 1):
    cliente_id = random.randint(1, TOTAL_CLIENTES)
    especie_dom = "geral"
    if cliente_id in client_species_count:
        especie_dom = max(client_species_count[cliente_id].items(),
                           key=lambda x: x[1])[0]
    data = venda_data_sazonal()

    vendas.append({
        "id": vid,
        "cliente_id": cliente_id,
        "data": data,
        "especie_dom": especie_dom,
        "total": 0.0
    })

# ---------------------------------------------------------
# ITENS DE VENDA
# ---------------------------------------------------------
for _ in range(TOTAL_ITENS):
    v = random.choice(vendas)
    grupos = grupo_por_especie(v["especie_dom"])
    possiveis = []
    for g in grupos:
        possiveis.extend(group_to_products[g])
    if not possiveis:
        possiveis = list(product_group.keys())

    pid = random.choice(possiveis)
    qtd = random.randint(1, 5)
    preco = product_price[pid]
    subtotal = qtd * preco
    v["total"] += subtotal

    vendas_itens_inserts.append(
        f"INSERT INTO vendas_itens (venda_id, produto_id, quantidade, preco_unitario) "
        f"VALUES ({v['id']}, {pid}, {qtd}, {preco});"
    )

# ---------------------------------------------------------
# INSERIR VENDAS
# ---------------------------------------------------------
for v in vendas:
    total = round(v["total"], 2)
    dump.append(
        f"INSERT INTO vendas (cliente_id, data_venda, total) "
        f"VALUES ({v['cliente_id']}, '{v['data']}', {total});"
    )

dump.extend(vendas_itens_inserts)

# ---------------------------------------------------------
# SALVAR
# ---------------------------------------------------------
with open("dump_vet_clinic_epidemiologico.sql", "w", encoding="utf-8") as f:
    f.write("\n".join(dump))
