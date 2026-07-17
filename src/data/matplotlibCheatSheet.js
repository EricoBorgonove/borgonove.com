export const matplotlibChartSections = [
  {
    id: "tipos-graficos",
    title: "Comandos de Criação de Gráficos (Tipos)",
    description: "Funções principais para gerar diferentes tipos de visualizações.",
    columns: [
      { key: "command", label: "Comando" },
      { key: "description", label: "Descrição" },
      { key: "example", label: "Exemplo" },
    ],
    items: [
      { command: "plt.plot()", description: "Gráfico de linha para tendências.", example: "plt.plot(x, y)" },
      { command: "plt.scatter()", description: "Gráfico de dispersão para correlação.", example: "plt.scatter(x, y)" },
      { command: "plt.bar()", description: "Gráfico de barras para comparação.", example: "plt.bar(categorias, valores)" },
      { command: "plt.hist()", description: "Histograma para distribuição de frequência.", example: "plt.hist(dados, bins=10)" },
      { command: "plt.pie()", description: "Gráfico de pizza para proporções.", example: "plt.pie(fatias, labels=nomes)" },
      { command: "plt.boxplot()", description: "Gráfico de caixa para estatística e outliers.", example: "plt.boxplot(dados)" },
      { command: "plt.stackplot()", description: "Gráfico de áreas empilhadas.", example: "plt.stackplot(x, y1, y2)" },
    ],
  },
  {
    id: "customizacao-estetica",
    title: "Comandos de Customização (Estética)",
    description: "Um gráfico sem rótulos não comunica nada. Use estes comandos para dar contexto.",
    columns: [
      { key: "command", label: "Comando" },
      { key: "description", label: "Descrição" },
      { key: "example", label: "Exemplo" },
    ],
    items: [
      { command: "plt.title()", description: "Define o título principal.", example: "plt.title('Vendas 2024')" },
      { command: "plt.xlabel()", description: "Nomeia o eixo X.", example: "plt.xlabel('Meses')" },
      { command: "plt.ylabel()", description: "Nomeia o eixo Y.", example: "plt.ylabel('R$ Faturamento')" },
      { command: "plt.legend()", description: "Exibe a legenda usando o label do plot.", example: "plt.legend(loc='best')" },
      { command: "plt.grid()", description: "Adiciona grades ao fundo.", example: "plt.grid(True, linestyle='--')" },
      { command: "plt.xlim() / ylim", description: "Define os limites dos eixos.", example: "plt.xlim(0, 100)" },
      { command: "plt.xticks()", description: "Customiza os marcadores do eixo X.", example: "plt.xticks(rotation=45)" },
    ],
  },
  {
    id: "estrutura-salvamento",
    title: "Comandos de Estrutura e Salvamento",
    description: "Comandos para gerenciar múltiplas janelas, organizar subplots e salvar seu trabalho.",
    columns: [
      { key: "command", label: "Comando" },
      { key: "description", label: "Descrição" },
      { key: "example", label: "Exemplo" },
    ],
    items: [
      { command: "plt.figure()", description: "Cria uma nova figura ou altera o tamanho.", example: "plt.figure(figsize=(10, 5))" },
      { command: "plt.subplot()", description: "Divide a figura em uma grade de gráficos.", example: "plt.subplot(rows, cols, index)" },
      { command: "plt.subplots()", description: "Forma moderna de criar Figure e Axes juntos.", example: "fig, ax = plt.subplots()" },
      { command: "plt.tight_layout()", description: "Ajusta automaticamente o espaçamento.", example: "plt.tight_layout()" },
      { command: "plt.savefig()", description: "Salva o gráfico em um arquivo.", example: "plt.savefig('grafico.png', dpi=300)" },
      { command: "plt.show()", description: "Exibe o gráfico na tela.", example: "plt.show()" },
    ],
  },
];

export const matplotlibCompleteExample = `import matplotlib.pyplot as plt
import pandas as pd

# 1. Preparando os dados
dados = {
    'Mes': ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
    'Vendas': [2500, 3200, 2800, 4100, 3900],
    'Metas': [2000, 3000, 3000, 4000, 4000]
}
df = pd.DataFrame(dados)

# 2. Criando a estrutura (OO Style - o jeito certo de fazer)
fig, ax = plt.subplots(figsize=(8, 5))

# 3. Plotando os dados
ax.plot(df['Mes'], df['Vendas'], marker='o', label='Vendas Reais', color='blue', linewidth=2)
ax.step(df['Mes'], df['Metas'], where='mid', label='Meta Mensal', color='red', linestyle='--')

# 4. Customização avançada
ax.set_title('Desempenho de Vendas vs Metas', fontsize=14, fontweight='bold')
ax.set_xlabel('Mês de 2026')
ax.set_ylabel('Faturamento (R$)')
ax.legend()
ax.grid(alpha=0.3)

# 5. Finalização
plt.tight_layout()
plt.show()`;
