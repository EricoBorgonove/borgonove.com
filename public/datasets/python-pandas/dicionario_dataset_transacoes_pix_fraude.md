# Dicionário de Dados — Dataset Transações Pix e Fraude 2M

## Tema
Base sintética de transações Pix para análise exploratória, visualização com Seaborn e identificação de padrões suspeitos.

## Quantidade de registros
2.000.000 linhas.

## Arquivos
- `dataset_transacoes_pix_fraude_2M.csv`: dataset completo.
- `amostra_transacoes_pix_fraude_10000.csv`: amostra menor para testes rápidos.
- `aula_seaborn_transacoes_pix_base.py`: código inicial para Jupyter/Anaconda.

## Colunas
| Coluna | Descrição |
|---|---|
| transacao_id | Identificador único da transação |
| cliente_id | Identificador fictício do cliente |
| data_hora | Data e hora da transação |
| estado_origem | UF de origem |
| estado_destino | UF de destino |
| canal | Canal usado na transação |
| tipo_chave_pix | Tipo de chave Pix |
| banco_origem | Instituição de origem |
| banco_destino | Instituição de destino |
| categoria | Categoria da transação |
| dispositivo | Dispositivo utilizado |
| periodo_dia | Período do dia |
| valor_transacao | Valor movimentado |
| taxa_operacao | Taxa simulada da operação |
| tempo_processamento_ms | Tempo de processamento em milissegundos |
| cliente_idade | Idade simulada do cliente |
| tempo_conta_meses | Tempo de conta em meses |
| qtd_transacoes_24h | Quantidade de transações nas últimas 24h |
| saldo_antes | Saldo antes da operação |
| saldo_depois | Saldo depois da operação |
| score_fraude | Escore sintético de risco, de 0 a 100 |
| transacao_suspeita | 1 para suspeita, 0 para não suspeita |
| status_transacao | Status final da transação |

## Ideias de gráficos
1. Quantidade de transações por canal.
2. Distribuição do valor das transações.
3. Boxplot do valor por canal.
4. Violinplot do score de fraude por dispositivo.
5. Heatmap de correlação entre variáveis numéricas.
6. Quantidade de transações suspeitas por período do dia.
7. Média do valor por categoria.
8. Taxa de suspeita por banco de origem.
9. Dispersão entre valor da transação e score de fraude.
10. Dispersão entre tempo de conta e score de fraude.
11. Série temporal de transações por mês.
12. Heatmap entre hora e dia da semana.
13. Ranking dos estados com maior volume financeiro.
14. Comparação entre status da transação e score de fraude.
15. Análise de outliers nos valores de transação.
