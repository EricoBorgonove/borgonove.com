import pandas as pd
import numpy as np
from pathlib import Path

# ============================================================
# CONFIGURACOES INICIAIS
# ============================================================

np.random.seed(42)

# Quantidade total de registros
N = 2_000_000

# Pasta onde os arquivos serao salvos
PASTA_SAIDA = Path("datasets_pix")
PASTA_SAIDA.mkdir(exist_ok=True)

ARQUIVO_COMPLETO = PASTA_SAIDA / "dataset_transacoes_pix_fraude_2M.csv"
ARQUIVO_AMOSTRA = PASTA_SAIDA / "amostra_transacoes_pix_fraude_10000.csv"
ARQUIVO_DICIONARIO = PASTA_SAIDA / "dicionario_dataset_transacoes_pix_fraude.md"

print("Iniciando geracao do dataset...")


# ============================================================
# LISTAS DE CATEGORIAS
# ============================================================

estados = np.array([
    "AM", "AC", "RO", "RR", "PA", "AP", "TO",
    "MA", "PI", "CE", "RN", "PB", "PE", "AL", "SE", "BA",
    "MT", "MS", "GO", "DF",
    "MG", "SP", "RJ", "ES",
    "PR", "SC", "RS"
])

canais = np.array([
    "app_mobile",
    "internet_banking",
    "caixa_eletronico",
    "agencia",
    "api_empresa"
])

tipos_chave_pix = np.array([
    "cpf",
    "cnpj",
    "email",
    "telefone",
    "chave_aleatoria"
])

bancos = np.array([
    "Banco Aurora",
    "Banco Norte",
    "Banco Centralizado",
    "Banco Digital Max",
    "Banco Popular",
    "Banco Uniao",
    "Banco Amazonia Pay",
    "Banco Solucoes"
])

categorias = np.array([
    "alimentacao",
    "transporte",
    "educacao",
    "saude",
    "compras_online",
    "servicos",
    "transferencia_pessoal",
    "pagamento_empresa",
    "lazer",
    "investimentos"
])

dispositivos = np.array([
    "android",
    "ios",
    "windows",
    "macos",
    "linux",
    "desconhecido"
])

status_transacao = np.array([
    "aprovada",
    "recusada",
    "em_analise",
    "cancelada"
])


# ============================================================
# GERACAO DOS DADOS BASICOS
# ============================================================

transacao_id = np.arange(1, N + 1)

cliente_id = np.random.randint(10000, 999999, size=N)

estado_origem = np.random.choice(estados, size=N)
estado_destino = np.random.choice(estados, size=N)

canal = np.random.choice(
    canais,
    size=N,
    p=[0.62, 0.22, 0.05, 0.03, 0.08]
)

tipo_chave_pix = np.random.choice(
    tipos_chave_pix,
    size=N,
    p=[0.34, 0.12, 0.16, 0.21, 0.17]
)

banco_origem = np.random.choice(bancos, size=N)
banco_destino = np.random.choice(bancos, size=N)

categoria = np.random.choice(
    categorias,
    size=N,
    p=[0.12, 0.10, 0.07, 0.08, 0.16, 0.10, 0.17, 0.08, 0.07, 0.05]
)

dispositivo = np.random.choice(
    dispositivos,
    size=N,
    p=[0.48, 0.32, 0.08, 0.05, 0.02, 0.05]
)


# ============================================================
# GERACAO DE DATA E HORA
# ============================================================

data_inicio = pd.Timestamp("2025-01-01 00:00:00")
data_fim = pd.Timestamp("2026-04-30 23:59:59")

intervalo_segundos = int((data_fim - data_inicio).total_seconds())

data_hora = data_inicio + pd.to_timedelta(
    np.random.randint(0, intervalo_segundos, size=N),
    unit="s"
)

horas = pd.Series(data_hora).dt.hour.to_numpy()

periodo_dia = np.where(
    (horas >= 5) & (horas < 12),
    "manha",
    np.where(
        (horas >= 12) & (horas < 18),
        "tarde",
        np.where(
            (horas >= 18) & (horas < 23),
            "noite",
            "madrugada"
        )
    )
)


# ============================================================
# VARIAVEIS NUMERICAS
# ============================================================

# Valor da transacao usando distribuicao assimetrica.
# Muitas transacoes pequenas e poucas muito altas.
valor_transacao = np.random.lognormal(
    mean=4.2,
    sigma=1.15,
    size=N
)

valor_transacao = np.clip(valor_transacao, 1, 50000).round(2)

# Taxa ficticia de operacao.
taxa_operacao = np.where(
    categoria == "pagamento_empresa",
    valor_transacao * np.random.uniform(0.001, 0.006, size=N),
    valor_transacao * np.random.uniform(0.0001, 0.002, size=N)
)

taxa_operacao = np.round(taxa_operacao, 2)

# Tempo de processamento.
tempo_processamento_ms = np.random.gamma(
    shape=2.2,
    scale=180,
    size=N
)

tempo_processamento_ms = np.clip(tempo_processamento_ms, 20, 5000).round(0).astype(int)

# Idade do cliente.
cliente_idade = np.random.normal(
    loc=38,
    scale=13,
    size=N
)

cliente_idade = np.clip(cliente_idade, 16, 90).round(0).astype(int)

# Tempo da conta em meses.
tempo_conta_meses = np.random.gamma(
    shape=3.5,
    scale=11,
    size=N
)

tempo_conta_meses = np.clip(tempo_conta_meses, 0, 240).round(0).astype(int)

# Quantidade de transacoes nas ultimas 24h.
qtd_transacoes_24h = np.random.poisson(
    lam=4,
    size=N
)

# Aumentando artificialmente transacoes em alguns casos suspeitos.
indices_movimentacao_alta = np.random.choice(
    np.arange(N),
    size=int(N * 0.04),
    replace=False
)

qtd_transacoes_24h[indices_movimentacao_alta] += np.random.randint(
    8,
    40,
    size=len(indices_movimentacao_alta)
)

# Saldo antes da transacao.
saldo_antes = np.random.lognormal(
    mean=7.4,
    sigma=1.05,
    size=N
)

saldo_antes = np.clip(saldo_antes, 0, 250000).round(2)

# Saldo depois.
saldo_depois = saldo_antes - valor_transacao
saldo_depois = np.round(saldo_depois, 2)


# ============================================================
# CRIACAO DE SCORE DE FRAUDE
# ============================================================

score_fraude = np.zeros(N)

# Transacoes altas aumentam o score.
score_fraude += np.where(valor_transacao > 5000, 18, 0)
score_fraude += np.where(valor_transacao > 15000, 20, 0)

# Madrugada aumenta risco.
score_fraude += np.where(periodo_dia == "madrugada", 12, 0)

# Dispositivo desconhecido aumenta risco.
score_fraude += np.where(dispositivo == "desconhecido", 18, 0)

# Muitas transacoes em 24h aumentam risco.
score_fraude += np.where(qtd_transacoes_24h > 15, 20, 0)
score_fraude += np.where(qtd_transacoes_24h > 30, 18, 0)

# Conta nova aumenta risco.
score_fraude += np.where(tempo_conta_meses < 3, 15, 0)

# Transacao maior que saldo aumenta risco.
score_fraude += np.where(saldo_depois < 0, 22, 0)

# API empresa com valor alto aumenta risco.
score_fraude += np.where(
    (canal == "api_empresa") & (valor_transacao > 10000),
    15,
    0
)

# Ruido aleatorio.
score_fraude += np.random.normal(8, 7, size=N)

score_fraude = np.clip(score_fraude, 0, 100).round(2)


# ============================================================
# CLASSIFICACAO DE TRANSACAO SUSPEITA
# ============================================================

transacao_suspeita = np.where(score_fraude >= 65, 1, 0)

status_final = np.where(
    score_fraude >= 80,
    np.random.choice(["recusada", "em_analise"], size=N, p=[0.65, 0.35]),
    np.where(
        score_fraude >= 65,
        np.random.choice(["aprovada", "em_analise", "recusada"], size=N, p=[0.50, 0.35, 0.15]),
        np.random.choice(["aprovada", "cancelada"], size=N, p=[0.96, 0.04])
    )
)


# ============================================================
# MONTAGEM DO DATAFRAME
# ============================================================

df = pd.DataFrame({
    "transacao_id": transacao_id,
    "cliente_id": cliente_id,
    "data_hora": data_hora,
    "estado_origem": estado_origem,
    "estado_destino": estado_destino,
    "canal": canal,
    "tipo_chave_pix": tipo_chave_pix,
    "banco_origem": banco_origem,
    "banco_destino": banco_destino,
    "categoria": categoria,
    "dispositivo": dispositivo,
    "periodo_dia": periodo_dia,
    "valor_transacao": valor_transacao,
    "taxa_operacao": taxa_operacao,
    "tempo_processamento_ms": tempo_processamento_ms,
    "cliente_idade": cliente_idade,
    "tempo_conta_meses": tempo_conta_meses,
    "qtd_transacoes_24h": qtd_transacoes_24h,
    "saldo_antes": saldo_antes,
    "saldo_depois": saldo_depois,
    "score_fraude": score_fraude,
    "transacao_suspeita": transacao_suspeita,
    "status_transacao": status_final
})

print("Dataset criado em memoria.")
print(df.shape)
print(df.head())


# ============================================================
# SALVANDO OS ARQUIVOS
# ============================================================

df.to_csv(ARQUIVO_COMPLETO, index=False)

df.sample(10_000, random_state=42).to_csv(
    ARQUIVO_AMOSTRA,
    index=False
)

print("Arquivos CSV salvos com sucesso!")


# ============================================================
# DICIONARIO DE DADOS
# ============================================================

dicionario = """
# Dicionario de Dados - Dataset de Transacoes Pix e Fraude

## Tema

Base ficticia de transacoes Pix criada para aulas de Python, Pandas, Seaborn, analise exploratoria de dados e visualizacao.

## Quantidade de registros

2.000.000 de registros.

## Colunas

| Coluna | Descricao |
|---|---|
| transacao_id | Identificador unico da transacao |
| cliente_id | Identificador ficticio do cliente |
| data_hora | Data e hora da transacao |
| estado_origem | Estado de origem da transacao |
| estado_destino | Estado de destino da transacao |
| canal | Canal utilizado na transacao |
| tipo_chave_pix | Tipo de chave Pix utilizada |
| banco_origem | Banco de origem |
| banco_destino | Banco de destino |
| categoria | Categoria da transacao |
| dispositivo | Dispositivo utilizado |
| periodo_dia | Periodo do dia da transacao |
| valor_transacao | Valor da transacao em reais |
| taxa_operacao | Taxa ficticia da operacao |
| tempo_processamento_ms | Tempo de processamento em milissegundos |
| cliente_idade | Idade ficticia do cliente |
| tempo_conta_meses | Tempo de existencia da conta em meses |
| qtd_transacoes_24h | Quantidade de transacoes feitas pelo cliente nas ultimas 24h |
| saldo_antes | Saldo antes da transacao |
| saldo_depois | Saldo apos a transacao |
| score_fraude | Pontuacao ficticia de risco de fraude, de 0 a 100 |
| transacao_suspeita | 1 para suspeita e 0 para nao suspeita |
| status_transacao | Status final da transacao |

## Sugestoes de analise

1. Distribuicao dos valores das transacoes.
2. Quantidade de transacoes por canal.
3. Quantidade de transacoes por periodo do dia.
4. Media de valor por categoria.
5. Boxplot do valor da transacao por status.
6. Relacao entre valor da transacao e score de fraude.
7. Relacao entre quantidade de transacoes em 24h e score de fraude.
8. Comparacao entre transacoes suspeitas e nao suspeitas.
9. Mapa de calor de correlacao.
10. Evolucao temporal das transacoes.
"""

with open(ARQUIVO_DICIONARIO, "w", encoding="utf-8") as f:
    f.write(dicionario)

print("Dicionario de dados salvo com sucesso!")


# ============================================================
# MENSAGEM FINAL
# ============================================================

print()
print("Processo finalizado.")
print(f"Dataset completo salvo em: {ARQUIVO_COMPLETO}")
print(f"Amostra salva em: {ARQUIVO_AMOSTRA}")
print(f"Dicionario salvo em: {ARQUIVO_DICIONARIO}")
