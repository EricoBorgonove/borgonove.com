import { Button, PageTemplate, PageTitle, Panel, Table, TableContainer } from "../components/ui/Patterns";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";
import CodeBlock from "../components/CodeBlock";

const modules = [
  {
    id: "introducao",
    eyebrow: "Módulo 1",
    title: "Introdução",
    summary:
      "Neste módulo, o estudante compreende o papel do ESBMC como instrumento de apoio à verificação formal de programas.",
    sections: [
      {
        title: "O que é o ESBMC?",
        paragraphs: [
          "O ESBMC, sigla para Efficient SMT-Based Context-Bounded Model Checker, é um verificador formal utilizado na análise de programas, especialmente em C e C++. Seu uso é indicado quando se deseja investigar falhas que podem não aparecer em uma execução comum, como violações de assertivas, erros de ponteiros, estouro aritmético, vazamento de memória, acesso indevido a vetores e problemas em programas concorrentes.",
          "Nesta disciplina, o ESBMC será tratado como uma ferramenta de apoio à análise técnica de código. O foco não é apenas executar um programa e observar uma saída, mas verificar se determinadas propriedades de segurança são respeitadas dentro de um limite de análise.",
          "No contexto do projeto acadêmico, a ferramenta foi utilizada para comparar fragmentos de código original e corrigido. Essa comparação permite demonstrar, com base em evidência formal, se uma falha continua presente ou se foi removida pela correção proposta.",
          "A documentação oficial descreve o ESBMC como um verificador de modelos baseado em SMT, isto é, Satisfiability Modulo Theories. Na prática, isso significa que o programa é transformado em uma representação lógica e analisado por solucionadores capazes de encontrar violações de propriedades.",
          "O conteúdo desta disciplina é baseado no repositório oficial do ESBMC no GitHub: https://github.com/esbmc/esbmc.",
        ],
      },
      {
        title: "Aplicação no trabalho acadêmico",
        bullets: [
          "Verificar o fragmento original e registrar formalmente a presença de uma falha.",
          "Verificar o fragmento corrigido e observar se a violação deixa de ser detectada.",
          "Comparar o comportamento das duas versões com base em propriedades formais.",
          "Interpretar o contraexemplo apresentado pela ferramenta quando a verificação falha.",
        ],
      },
    ],
  },
  {
    id: "verificacao-formal",
    eyebrow: "Módulo 2",
    title: "O que é verificação formal?",
    summary:
      "Este módulo diferencia teste tradicional de verificação formal e mostra por que a análise simbólica é útil em programas com múltiplos caminhos de execução.",
    sections: [
      {
        title: "Diferença entre teste e verificação formal",
        paragraphs: [
          "A verificação formal é uma técnica da Ciência da Computação voltada a analisar se um sistema satisfaz propriedades definidas previamente. Essas propriedades podem estar relacionadas à segurança de memória, validade de valores, ausência de estouro aritmético ou coerência lógica do algoritmo.",
          "O teste tradicional executa o programa com entradas concretas. Se o caso de erro não estiver entre as entradas testadas, a falha pode passar despercebida. A verificação formal, por outro lado, busca raciocinar sobre caminhos possíveis de execução.",
          "Essa diferença é central para a disciplina: testar mostra o comportamento observado em cenários escolhidos; verificar formalmente busca identificar se existe algum cenário, dentro do limite analisado, capaz de violar uma propriedade.",
        ],
        code: {
          language: "c",
          label: "Teste tradicional que funciona",
          value: "int x = 10;\nint y = 2;\nint z = x / y;",
        },
      },
      {
        title: "O problema escondido",
        paragraphs: [
          "O exemplo acima funciona normalmente quando y vale 2. Entretanto, se em outro ponto do programa y puder assumir o valor zero, a divisão se torna inválida.",
          "O objetivo pedagógico aqui é perceber que a ausência de erro em uma execução não significa ausência de erro no programa. O ESBMC ajuda a investigar essa diferença ao analisar possibilidades de execução de forma simbólica.",
        ],
        code: {
          language: "c",
          label: "Caminho problemático",
          value: "int x = 10;\nint y = 0;\nint z = x / y; // divisão por zero",
        },
      },
      {
        title: "Onde a verificação formal é especialmente relevante",
        bullets: [
          "sistemas embarcados",
          "sistemas críticos",
          "softwares de segurança",
          "programas concorrentes",
          "aplicações com ponteiros e alocação dinâmica",
          "validação acadêmica de algoritmos",
          "comparação entre versões de código",
          "identificação de falhas sutis que testes simples podem não revelar",
        ],
      },
    ],
  },
  {
    id: "model-checking",
    eyebrow: "Módulo 3",
    title: "O que é Model Checking?",
    summary:
      "Neste módulo, o programa passa a ser entendido como um modelo lógico sobre o qual propriedades podem ser verificadas.",
    sections: [
      {
        title: "Programa como modelo lógico",
        paragraphs: [
          "Model Checking, ou verificação de modelos, é a técnica que permite analisar estados possíveis de um sistema e verificar se propriedades esperadas são respeitadas.",
          "Para isso, o programa deixa de ser visto apenas como uma sequência de comandos executados pelo processador e passa a ser representado como um modelo lógico. A ferramenta verifica esse modelo em busca de uma violação.",
          "As propriedades podem representar limites de valores, validade de ponteiros, ausência de acesso inválido à memória, ausência de estouro aritmético ou regras próprias do algoritmo analisado.",
        ],
      },
      {
        title: "Assertivas como propriedades",
        paragraphs: [
          "Uma forma simples de declarar propriedades no código é por meio de assertivas. A assertiva registra uma condição que deve ser verdadeira naquele ponto da execução.",
          "O ESBMC verifica se existe algum caminho em que essa condição possa ser falsa. Quando isso ocorre, a ferramenta apresenta um contraexemplo, isto é, uma sequência de estados que explica como a violação pode acontecer.",
        ],
        code: {
          language: "c",
          label: "Exemplo de propriedade",
          value: "#include <assert.h>\n\nint main() {\n  int x = -1;\n  assert(x >= 0);\n  return 0;\n}",
        },
      },
    ],
  },
  {
    id: "bounded",
    eyebrow: "Módulo 4",
    title: "O que é Bounded Model Checking?",
    summary:
      "Este módulo apresenta a ideia de limite de verificação, necessária para analisar programas reais com laços, chamadas e múltiplos caminhos.",
    sections: [
      {
        title: "Por que a análise precisa de limites?",
        paragraphs: [
          "O ESBMC utiliza Bounded Model Checking, ou verificação de modelo limitada. A ideia é analisar o programa até um limite finito, configurado de acordo com o objetivo da verificação.",
          "Esse limite pode envolver número de iterações de laços, profundidade da execução, quantidade de chamadas de função, número de trocas de contexto em programas concorrentes ou tamanho simbólico da análise.",
          "A limitação é necessária porque programas reais podem ter infinitos caminhos de execução. Sem um limite, um laço infinito ou uma combinação muito grande de estados tornaria a verificação impraticável.",
        ],
        code: {
          language: "c",
          label: "Laço infinito",
          value: "while (1) {\n  // execução infinita\n}",
        },
      },
      {
        title: "Como o BMC decide se há erro?",
        paragraphs: [
          "No Bounded Model Checking, a verificação é convertida em uma fórmula lógica. Se a fórmula for satisfatível, existe um caminho de execução que viola a propriedade analisada.",
          "Se a fórmula for insatisfatível dentro do limite configurado, a propriedade é considerada verificada para aquele escopo. Em um texto acadêmico, essa ressalva é importante: o resultado deve sempre ser interpretado junto com os limites adotados.",
        ],
      },
      {
        title: "Limites comuns na prática",
        bullets: [
          "número de iterações de laços",
          "profundidade da execução",
          "quantidade de chamadas de função",
          "número de trocas de contexto em programas concorrentes",
          "tamanho simbólico da análise",
        ],
      },
    ],
  },
  {
    id: "smt",
    eyebrow: "Módulo 5",
    title: "O papel do SMT no ESBMC",
    summary:
      "Este módulo explica por que o ESBMC utiliza solucionadores SMT para raciocinar sobre inteiros, arrays, ponteiros, memória e expressões booleanas.",
    sections: [
      {
        title: "Satisfiability Modulo Theories",
        paragraphs: [
          "SMT significa Satisfiability Modulo Theories. Trata-se de uma área da lógica computacional dedicada a verificar se fórmulas são satisfatíveis considerando teorias específicas.",
          "Essas teorias permitem representar operações comuns em programas reais, como aritmética, vetores de bits, arrays, ponteiros, memória e operações booleanas.",
          "No ESBMC, o código analisado é convertido em uma representação lógica. Essa representação é enviada a um solucionador SMT, que procura determinar se existe uma execução capaz de violar a propriedade em análise.",
        ],
      },
      {
        title: "Teorias consideradas",
        bullets: [
          "aritmética de inteiros",
          "aritmética de ponto flutuante",
          "vetores de bits",
          "arrays",
          "ponteiros",
          "estruturas de memória",
          "operações booleanas",
          "relações matemáticas",
        ],
      },
      {
        title: "Opções citadas na documentação",
        paragraphs: [
          "A documentação oficial informa que o ESBMC permite selecionar solver, propriedade e estratégia de verificação. Em exemplos da própria documentação, aparecem verificações com opções como --floatbv, --k-induction e --memory-leak-check.",
        ],
        code: {
          language: "bash",
          label: "Exemplos de opções",
          value: "esbmc arquivo.c --floatbv\nesbmc arquivo.c --k-induction\nesbmc arquivo.c --memory-leak-check",
        },
      },
    ],
  },
  {
    id: "erros",
    eyebrow: "Módulo 6",
    title: "Principais tipos de erro detectáveis",
    summary:
      "Este módulo organiza os principais erros que podem ser investigados com o ESBMC em programas C/C++.",
    sections: [],
  },
  {
    id: "saida",
    eyebrow: "Módulo 7",
    title: "Estrutura da saída do ESBMC",
    summary:
      "Este módulo ensina a ler o resultado da verificação e a interpretar mensagens de sucesso, falha e contraexemplo.",
    sections: [
      {
        title: "Informações apresentadas na saída",
        paragraphs: [
          "A saída do ESBMC normalmente apresenta informações sobre o início da verificação, propriedades verificadas, desenrolamento de laços, geração de condições de verificação, simplificação das condições, uso do solver SMT, resultado final e contraexemplo, caso exista erro.",
          "Quando o programa é considerado seguro dentro dos limites analisados, a saída pode indicar algo equivalente a VERIFICATION SUCCESSFUL. Quando há erro, a saída pode indicar VERIFICATION FAILED e, em seguida, apresentar um contraexemplo.",
        ],
        bullets: [
          "início da verificação",
          "propriedades verificadas",
          "desenrolamento de laços",
          "geração de condições de verificação",
          "simplificação das condições",
          "uso do solver SMT",
          "resultado final",
          "contraexemplo, caso exista erro",
        ],
        code: {
          language: "text",
          label: "Resultados possíveis",
          value: "VERIFICATION SUCCESSFUL\n\nVERIFICATION FAILED",
        },
      },
      {
        title: "Importância do contraexemplo",
        paragraphs: [
          "O contraexemplo é uma das partes mais importantes, pois mostra uma sequência lógica de estados que leva ao erro.",
          "Isso ajuda o desenvolvedor ou pesquisador a compreender exatamente por que o código falhou. Em um trabalho acadêmico, esse contraexemplo pode ser usado para justificar a existência da falha e comparar o comportamento antes e depois da correção.",
        ],
      },
    ],
  },
  {
    id: "exemplos-praticos",
    eyebrow: "Módulo 10",
    title: "Exemplos práticos",
    summary:
      "Neste módulo, os conceitos são aplicados em pequenos programas, comparando falhas e correções verificáveis pelo ESBMC.",
    sections: [],
  },
  {
    id: "comparacao-original-corrigido",
    eyebrow: "Módulo 16",
    title: "Comparação entre código original e código corrigido",
    summary:
      "Este módulo apresenta uma forma adequada de documentar, em trabalho acadêmico, a diferença entre a versão com erro e a versão corrigida.",
    sections: [
      {
        title: "Comparação técnica",
        paragraphs: [
          "Em um relatório técnico ou artigo acadêmico, a comparação entre o fragmento original e o fragmento corrigido deve mostrar mais do que uma mudança de código. Ela precisa deixar claro qual propriedade foi violada, como a correção altera o comportamento e qual foi o resultado observado na verificação.",
        ],
        table: {
          headers: ["Aspecto analisado", "Fragmento original", "Fragmento corrigido"],
          rows: [
            ["Segurança de memória", "Pode apresentar falha", "Falha removida"],
            ["Assertivas", "Podem ser violadas", "São satisfeitas"],
            ["Acesso a vetor", "Pode acessar índice inválido", "Utiliza índice válido"],
            ["Alocação dinâmica", "Pode usar memória após free", "Usa e libera corretamente"],
            ["Resultado no ESBMC", "VERIFICATION FAILED", "VERIFICATION SUCCESSFUL"],
            ["Interpretação", "Existe caminho de execução inseguro", "Não foi detectada violação no limite analisado"],
          ],
        },
      },
      {
        title: "Interpretação acadêmica",
        paragraphs: [
          "A tabela permite sustentar a argumentação de que a versão corrigida não apenas executa sem falhar em um teste simples, mas também deixa de apresentar a violação formal detectada no fragmento original.",
          "Ao escrever a análise, é importante usar uma formulação cuidadosa: o resultado VERIFICATION SUCCESSFUL indica que nenhuma violação foi detectada dentro dos limites configurados para a verificação.",
        ],
      },
    ],
  },
  {
    id: "teste-tradicional-vs-esbmc",
    eyebrow: "Módulo 17",
    title: "Diferença entre teste tradicional e ESBMC",
    summary:
      "Este módulo diferencia duas práticas complementares: testar o comportamento observado e verificar propriedades formais.",
    sections: [
      {
        title: "Comparação de abordagem",
        table: {
          headers: ["Critério", "Teste tradicional", "ESBMC"],
          rows: [
            ["Forma de análise", "Executa entradas específicas", "Analisa caminhos simbolicamente"],
            ["Cobertura", "Depende dos casos de teste", "Pode explorar múltiplos caminhos"],
            ["Resultado", "Passou/falhou para entradas concretas", "Prova ou contraexemplo dentro de limites"],
            ["Erros sutis", "Podem passar despercebidos", "Podem ser detectados formalmente"],
            ["Uso acadêmico", "Demonstra comportamento prático", "Demonstra segurança lógica/formal"],
            ["Limitação", "Não cobre todos os casos", "Depende dos limites configurados"],
          ],
        },
      },
      {
        title: "Papel complementar",
        paragraphs: [
          "O teste tradicional continua sendo indispensável para validar comportamento funcional, integração e cenários reais de uso.",
          "O ESBMC acrescenta outra camada de análise. Ele é especialmente útil quando o objetivo é demonstrar rigor técnico, explicar a origem de uma falha e justificar formalmente a correção proposta.",
        ],
      },
    ],
  },
  {
    id: "esbmc-c-cpp",
    eyebrow: "Módulo 18",
    title: "ESBMC e C/C++",
    summary:
      "Este módulo relaciona o ESBMC ao ecossistema C/C++, no qual erros de memória e ponteiros têm impacto direto na segurança do programa.",
    sections: [
      {
        title: "Por que C e C++ são relevantes para o ESBMC?",
        paragraphs: [
          "O ESBMC possui forte relação com as linguagens C e C++. Essa relação é natural, pois essas linguagens permitem operações de baixo nível e dão ao programador grande controle sobre memória, representação de dados e fluxo de execução.",
          "Esse controle é uma das razões pelas quais C e C++ são tão usados em sistemas operacionais, compiladores, sistemas embarcados e aplicações de alto desempenho. Ao mesmo tempo, ele aumenta a responsabilidade do programador.",
          "Um índice incorreto, um ponteiro inválido ou uma liberação de memória mal posicionada pode gerar comportamento indefinido, falhas de segurança ou erros difíceis de reproduzir. Por isso, a verificação formal é especialmente relevante nesse ecossistema.",
        ],
        bullets: [
          "manipulação direta de memória",
          "ponteiros",
          "alocação dinâmica",
          "casts",
          "arrays",
          "structs",
          "unions",
          "operações bit a bit",
          "concorrência com threads",
        ],
      },
      {
        title: "Suporte informado pela página oficial",
        paragraphs: [
          "A página oficial atual do ESBMC informa que a ferramenta busca suportar recursos da linguagem C até a versão C14 e detectar erros simulando um prefixo finito da execução do programa com entradas possíveis.",
        ],
      },
    ],
  },
  {
    id: "esbmc-cpp-moderno",
    eyebrow: "Módulo 19",
    title: "ESBMC e C++ moderno",
    summary:
      "Este módulo mostra que o suporte a C++ é parte da evolução da ferramenta e envolve desafios próprios da linguagem moderna.",
    sections: [
      {
        title: "Evolução do suporte a C++",
        paragraphs: [
          "O suporte a C++ é um tema importante na evolução do ESBMC porque a linguagem possui recursos que tornam a verificação mais complexa, como orientação a objetos, exceções, gerenciamento de memória e bibliotecas padronizadas.",
          "Um artigo sobre o ESBMC v7.6 destaca melhorias relacionadas ao uso de Clang AST para ampliar a verificação de programas C++.",
          "Entre os pontos citados estão tratamento de exceções, gerenciamento de memória, vazamentos, ponteiros pendentes, desalocação duplicada e modelos operacionais para STL.",
          "Para a disciplina, a principal conclusão é que o ESBMC deve ser entendido como um projeto em evolução, não como uma ferramenta congelada em uma única versão ou restrita a exemplos simples.",
        ],
      },
    ],
  },
  {
    id: "programas-concorrentes",
    eyebrow: "Módulo 20",
    title: "ESBMC e programas concorrentes",
    summary:
      "Este módulo discute falhas que surgem em programas com múltiplas threads e dependem da ordem de execução.",
    sections: [
      {
        title: "Por que concorrência é difícil?",
        paragraphs: [
          "Um dos diferenciais do ESBMC é a possibilidade de verificar programas concorrentes. Nesse tipo de programa, o erro pode não aparecer em todas as execuções, pois depende da ordem em que as threads são escalonadas.",
          "O exemplo conceitual abaixo mostra uma variável compartilhada sendo incrementada. Se duas threads executarem contador++ ao mesmo tempo, pode ocorrer corrida de dados. O resultado final pode ser inconsistente, mesmo que o programa pareça funcionar em algumas execuções.",
        ],
        code: {
          language: "c",
          label: "Exemplo conceitual",
          value:
            "int contador = 0;\n\nvoid *incrementar(void *arg) {\n  contador++;\n  return NULL;\n}",
        },
      },
      {
        title: "Context-bounded model checking",
        paragraphs: [
          "O ESBMC utiliza o conceito de context-bounded model checking, isto é, verificação limitada por trocas de contexto. Isso permite investigar comportamentos concorrentes dentro de um limite definido.",
          "Fontes oficiais descrevem o uso do ESBMC para verificar software com variáveis compartilhadas, locks, deadlock, data race e violações de atomicidade.",
        ],
      },
    ],
  },
  {
    id: "ferramentas-relacionadas",
    eyebrow: "Módulo 21",
    title: "ESBMC, CBMC e outras ferramentas",
    summary:
      "Este módulo situa o ESBMC no ecossistema de verificadores de modelos e ferramentas relacionadas.",
    sections: [
      {
        title: "Relação histórica com o CBMC",
        paragraphs: [
          "O ESBMC possui relação histórica com o CBMC, uma das ferramentas mais conhecidas de bounded model checking para C e C++.",
          "O repositório oficial do ESBMC menciona diferenças em relação ao CBMC e informa que o ESBMC surgiu como fork do CBMC v2.9, seguindo depois uma evolução própria.",
          "Para fins acadêmicos, essa relação ajuda a situar o ESBMC dentro de uma família de ferramentas voltadas à verificação de programas, cada uma com estratégias, representações internas e escopos específicos.",
        ],
      },
      {
        title: "Comparação acadêmica",
        table: {
          headers: ["Ferramenta", "Característica geral"],
          rows: [
            ["CBMC", "Tradicional bounded model checker para C/C++"],
            ["ESBMC", "Verificador SMT-based, com foco em eficiência, concorrência e múltiplas propriedades"],
            ["LLBMC", "Usa representação intermediária de compilador"],
            ["ESBMC-GPU", "Extensão voltada à verificação de programas CUDA/GPU"],
          ],
        },
      },
      {
        title: "Extensões especializadas",
        paragraphs: [
          "A literatura também registra extensões como o ESBMC-GPU, voltado à verificação de programas CUDA, incluindo condições como data race, acesso fora de limites, ponteiros e assertivas.",
        ],
      },
    ],
  },
  {
    id: "escopo-oficial",
    eyebrow: "Módulo 22",
    title: "Escopo oficial da ferramenta",
    summary:
      "Este módulo complementa a disciplina com recursos citados no README oficial do ESBMC.",
    sections: [
      {
        title: "Linguagens e frontends suportados",
        paragraphs: [
          "Embora esta disciplina trabalhe principalmente com C e C++, o README oficial informa que o ESBMC também verifica programas em CUDA, CHERI, Kotlin, Python, Rust e Solidity.",
          "A documentação também descreve os frontends usados pela ferramenta: Clang para C/C++/CHERI/CUDA; Soot/Jimple para Java/Kotlin; parser do CPython 3.10 para Python; e frontend próprio para Solidity.",
        ],
        bullets: [
          "C e C++",
          "CUDA",
          "CHERI",
          "Kotlin",
          "Python",
          "Rust",
          "Solidity",
        ],
      },
      {
        title: "Solvers citados no README",
        paragraphs: [
          "O ESBMC trabalha com solucionadores SMT. O README oficial lista suporte a Z3, Bitwuzla, Boolector, MathSAT, CVC4, CVC5 e Yices, além de possibilidade de comunicação via formato SMT-LIB interativo.",
        ],
        bullets: [
          "Z3",
          "Bitwuzla",
          "Boolector",
          "MathSAT",
          "CVC4",
          "CVC5",
          "Yices",
          "SMT-LIB interativo",
        ],
      },
      {
        title: "Observação sobre Python",
        paragraphs: [
          "O README destaca o ESBMC-Python como um frontend para verificar programas Python com anotações de tipo. Entre os erros citados estão divisão por zero, erro de indexação, overflow aritmético e assertivas definidas pelo usuário.",
          "Como o foco desta disciplina é C/C++, essa informação deve ser tratada como expansão de escopo da ferramenta, não como eixo principal da aula.",
        ],
      },
    ],
  },
];

const practicalExamples = [
  {
    title: "10. Exemplo prático 1: violação de assertiva",
    codeTitle: "Código com erro",
    code:
      "#include <assert.h>\n\nint main() {\n  int idade = -5;\n\n  assert(idade >= 0);\n\n  return 0;\n}",
    analysis:
      "A variável idade recebe valor negativo. A assertiva exige que a idade seja maior ou igual a zero. Como a condição é falsa, o ESBMC deve identificar violação da propriedade.",
    objective:
      "Verificar se o ESBMC detecta corretamente uma inconsistência lógica representada por uma assertiva falsa.",
    expected: "VERIFICATION FAILED",
  },
  {
    title: "11. Exemplo prático 2: correção da assertiva",
    codeTitle: "Código corrigido",
    code:
      "#include <assert.h>\n\nint main() {\n  int idade = 5;\n\n  assert(idade >= 0);\n\n  return 0;\n}",
    analysis: "Agora a variável idade possui valor positivo. A assertiva é satisfeita.",
    objective:
      "Demonstrar que, após a correção do valor atribuído à variável, a propriedade lógica passa a ser satisfeita.",
    expected: "VERIFICATION SUCCESSFUL",
  },
  {
    title: "12. Exemplo prático 3: acesso indevido a vetor",
    codeTitle: "Código com erro",
    code:
      "int main() {\n  int numeros[3] = {10, 20, 30};\n\n  int valor = numeros[4];\n\n  return 0;\n}",
    analysis:
      "O vetor numeros possui três posições válidas: 0, 1 e 2. O acesso à posição 4 viola os limites do array.",
    objective:
      "Verificar a capacidade do ESBMC de detectar acesso fora dos limites de um vetor.",
    expected: "VERIFICATION FAILED",
  },
  {
    title: "13. Exemplo prático 4: vetor corrigido",
    codeTitle: "Código corrigido",
    code:
      "int main() {\n  int numeros[3] = {10, 20, 30};\n\n  int valor = numeros[2];\n\n  return 0;\n}",
    analysis: "O acesso ocorre dentro do intervalo válido do vetor.",
    objective: "Demonstrar que a correção do índice elimina a violação de memória.",
    expected: "VERIFICATION SUCCESSFUL",
  },
  {
    title: "14. Exemplo prático 5: uso após free",
    codeTitle: "Código com erro",
    code:
      "#include <stdlib.h>\n\nint main() {\n  int *p = malloc(sizeof(int));\n\n  free(p);\n\n  *p = 10;\n\n  return 0;\n}",
    analysis:
      "Após a chamada de free(p), a memória apontada por p não deve mais ser utilizada. A linha *p = 10; representa uso de memória já liberada.",
    objective: "Verificar se o ESBMC identifica erro de manipulação dinâmica de memória.",
    expected: "VERIFICATION FAILED",
  },
  {
    title: "15. Exemplo prático 6: uso correto de memória dinâmica",
    codeTitle: "Código corrigido",
    code:
      "#include <stdlib.h>\n\nint main() {\n  int *p = malloc(sizeof(int));\n\n  *p = 10;\n\n  free(p);\n\n  return 0;\n}",
    analysis:
      "A memória é utilizada antes de ser liberada. Depois de free(p), não há novo acesso ao ponteiro.",
    objective:
      "Demonstrar a forma correta de uso de memória dinâmica, evitando o erro de use-after-free.",
    expected: "VERIFICATION SUCCESSFUL",
  },
];

const errorExamples = [
  {
    title: "6.1 Violação de assertivas",
    description:
      "As assertivas são usadas para declarar propriedades que devem ser verdadeiras. Nesse caso, o ESBMC deve indicar falha, pois x vale -1, violando a condição x >= 0.",
    code: "#include <assert.h>\n\nint main() {\n  int x = -1;\n  assert(x >= 0);\n  return 0;\n}",
  },
  {
    title: "6.2 Estouro aritmético",
    description:
      "Ocorre quando uma operação ultrapassa o limite representável pelo tipo de dado. Em C, esse comportamento pode ser indefinido em determinados contextos. O ESBMC pode detectar esse tipo de problema dependendo das opções utilizadas.",
    code: "#include <limits.h>\n\nint main() {\n  int x = INT_MAX;\n  x = x + 1;\n  return 0;\n}",
  },
  {
    title: "6.3 Acesso fora dos limites de vetor",
    description:
      "Um dos erros mais comuns em C é acessar posições inválidas de arrays. O vetor possui índices válidos 0, 1 e 2. O acesso a v[5] é inválido.",
    code: "int main() {\n  int v[3] = {1, 2, 3};\n  int x = v[5];\n  return 0;\n}",
  },
  {
    title: "6.4 Ponteiro nulo",
    description:
      "Ocorre quando o programa tenta acessar uma posição de memória por meio de um ponteiro que aponta para NULL. Esse erro pode causar falha de segmentação em execução real.",
    code: "#include <stdlib.h>\n\nint main() {\n  int *p = NULL;\n  *p = 10;\n  return 0;\n}",
  },
  {
    title: "6.5 Uso após liberação de memória",
    description:
      "O erro conhecido como use-after-free ocorre quando o programa libera uma área de memória e depois tenta utilizá-la novamente. Esse tipo de falha é grave porque pode gerar comportamento indefinido, vulnerabilidades e inconsistências difíceis de diagnosticar.",
    code: "#include <stdlib.h>\n\nint main() {\n  int *p = malloc(sizeof(int));\n  free(p);\n  *p = 10;\n  return 0;\n}",
  },
  {
    title: "6.6 Vazamento de memória",
    description:
      "Ocorre quando há alocação dinâmica de memória sem posterior liberação. Como free(p) não foi chamado, a memória permanece alocada até o término do programa. O ESBMC possui opção específica para verificação de vazamento de memória.",
    code: "#include <stdlib.h>\n\nint main() {\n  int *p = malloc(sizeof(int));\n  return 0;\n}",
  },
  {
    title: "6.7 Double-free",
    description:
      "Ocorre quando o programa tenta liberar duas vezes a mesma região de memória dinâmica. O README oficial cita double-free de memória alocada com malloc como uma das falhas detectáveis.",
    code: "#include <stdlib.h>\n\nint main() {\n  int *p = malloc(sizeof(int));\n  free(p);\n  free(p);\n  return 0;\n}",
  },
  {
    title: "6.8 Operações de shift indefinidas",
    description:
      "O ESBMC também pode detectar comportamento indefinido em operações de deslocamento de bits. Esse tipo de erro é relevante em programas que manipulam bits diretamente.",
    code: "int main() {\n  int x = 1;\n  int y = x << 40;\n  return y;\n}",
  },
  {
    title: "6.9 NaN em ponto flutuante",
    description:
      "A documentação oficial cita verificação de NaN em operações de ponto flutuante. Esse caso é importante em programas numéricos que utilizam float ou double.",
    code: "#include <math.h>\n\nint main() {\n  double x = sqrt(-1.0);\n  return isnan(x);\n}",
  },
];

const concurrentErrors = [
  "corrida de dados",
  "deadlock",
  "violação de atomicidade",
  "uso incorreto de locks",
  "inconsistência por acesso simultâneo a variáveis compartilhadas",
];

const flow = [
  "Código C/C++",
  "Representação lógica",
  "Condições de verificação",
  "Solver SMT",
  "Resultado ou contraexemplo",
];

function Paragraphs({ items }) {
  return items?.map((paragraph) => (
    <p key={paragraph} className="text-slate-300 leading-relaxed text-justify mb-4">
      {paragraph}
    </p>
  ));
}

function BulletGrid({ items }) {
  return (
    <ul className="grid sm:grid-cols-2 gap-3">
      {items.map((item) => (
        <li key={item} className="rounded-xl border border-slate-700/70 bg-slate-950/30 px-4 py-3 text-sm text-slate-300">
          {item}
        </li>
      ))}
    </ul>
  );
}

function DataTable({ table }) {
  return (
    <TableContainer className="mt-5  rounded-2xl border border-slate-700/70">
      <Table className="min-w-full divide-y divide-slate-700/70 text-left text-sm">
        <thead className="bg-slate-950/50">
          <tr>
            {table.headers.map((header) => (
              <th key={header} scope="col" className="px-4 py-3 font-semibold text-cyan-200">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/80 bg-slate-950/20">
          {table.rows.map((row) => (
            <tr key={row.join("|")}>
              {row.map((cell, index) => (
                <td key={`${row[0]}-${cell}-${index}`} className="px-4 py-3 text-slate-300 align-top">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
}

export default function Esbmc() {
  const [activeModuleId, setActiveModuleId] = useState(modules[0].id);
  const activeModule = useMemo(
    () => modules.find((module) => module.id === activeModuleId) ?? modules[0],
    [activeModuleId]
  );

  return (
    <PageTemplate width="wide">
      <div className="mb-8">
        <BackButton fallbackTo="/disciplinas" className="text-sm text-cyan-300 hover:text-cyan-200 inline-flex items-center gap-2">
          Voltar para Disciplinas
        </BackButton>
      </div>

      <div className="grid lg:grid-cols-[1.08fr_0.92fr] gap-8 items-center mb-10">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-300 mb-3">
            Verificação formal de software
          </p>
          <PageTitle className="mb-5">ESBMC</PageTitle>
          <p className="text-xl md:text-2xl text-cyan-200 font-semibold mb-4">
            Efficient SMT-Based Context-Bounded Model Checker
          </p>
          <p className="text-slate-300 text-lg leading-relaxed text-justify max-w-3xl">
            Disciplina completa sobre verificação formal com ESBMC, organizada em módulos de estudo para preservar o conteúdo conceitual, exemplos em C e interpretação dos resultados.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/disciplinas/esbmc/instalacao"
              className="inline-flex items-center justify-center rounded-xl border border-emerald-300/40 bg-emerald-400/15 px-4 py-3 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-400/25"
            >
              Instalação Windows/Linux/macOS
            </Link>
            <Link
              to="/disciplinas/esbmc/tabelas-comandos"
              className="inline-flex items-center justify-center rounded-xl border border-cyan-300/40 bg-cyan-400/15 px-4 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/25"
            >
              Tabelas de comandos
            </Link>
          </div>
        </div>

        <Panel as="div" layout="plain">
          <p className="text-sm text-slate-400 mb-4">Fluxo conceitual</p>
          <div className="space-y-3">
            {flow.map((item, index) => (
              <div key={item} className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-400/10 text-sm font-bold text-cyan-100">
                  {index + 1}
                </span>
                <div className="flex-1 rounded-xl border border-slate-700/70 bg-slate-950/40 px-4 py-3 text-sm text-slate-200">
                  {item}
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="grid lg:grid-cols-[300px_1fr] gap-8 items-start">
        <Panel as="aside" layout="plain" className="lg:sticky lg:top-24">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-3">Módulos da disciplina</p>
          <div className="space-y-2">
            {modules.map((module) => {
              const isActive = activeModule.id === module.id;

              return (
                <Button variant="custom"
                  key={module.id}
                  type="button"
                  onClick={() => setActiveModuleId(module.id)}
                  className={`w-full rounded-xl border px-4 py-3 text-left transition ${
                    isActive
                      ? "border-cyan-300/60 bg-cyan-400/15 text-cyan-100"
                      : "border-slate-700/60 bg-slate-950/20 text-slate-300 hover:border-cyan-300/30 hover:bg-cyan-400/10"
                  }`}
                >
                  <span className="block text-[11px] uppercase tracking-[0.18em] text-slate-400">
                    {module.eyebrow}
                  </span>
                  <span className="mt-1 block text-sm font-semibold">{module.title}</span>
                </Button>
              );
            })}
          </div>
        </Panel>

        <main className="space-y-6">
          <Panel as="article" layout="plain">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300 mb-3">
              {activeModule.eyebrow}
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              {activeModule.title}
            </h2>
            <p className="text-slate-300 leading-relaxed text-justify text-lg">{activeModule.summary}</p>
          </Panel>

          {activeModule.id === "erros" ? (
            <div className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                {errorExamples.map((example) => (
                  <Panel as="article" layout="plain" key={example.title}>
                    <h3 className="text-lg font-semibold text-cyan-300 mb-2">{example.title}</h3>
                    <p className="text-sm text-slate-300 leading-relaxed text-justify mb-4">{example.description}</p>
                    <CodeBlock language="c" label="Código C">
                      {example.code}
                    </CodeBlock>
                  </Panel>
                ))}
              </div>
              <Panel as="article" layout="plain">
                <h3 className="text-xl font-bold text-cyan-300 mb-4">6.7 Erros em programas concorrentes</h3>
                <p className="text-slate-300 leading-relaxed text-justify mb-4">
                  O ESBMC também é relevante para programas com múltiplas threads. Fontes oficiais e acadêmicas descrevem o ESBMC como ferramenta voltada à verificação de programas single-threaded e multi-threaded.
                </p>
                <p className="text-slate-300 leading-relaxed text-justify mb-4">
                  Em programas concorrentes, a dificuldade está no fato de que diferentes ordens de execução entre threads podem produzir comportamentos distintos. Uma execução comum pode não revelar o problema, mas uma interleaving diferente pode levar a inconsistência.
                </p>
                <p className="text-slate-300 leading-relaxed text-justify mb-4">
                  Segundo o README oficial, programas concorrentes com pthread podem ser analisados explorando interleavings. Entre as propriedades citadas estão deadlock, data races, violações de atomicidade e ordem de aquisição de locks.
                </p>
                <BulletGrid items={concurrentErrors} />
              </Panel>
            </div>
          ) : activeModule.id === "exemplos-praticos" ? (
            <div className="space-y-5">
              {practicalExamples.map((example) => (
                <Panel as="article" layout="plain" key={example.title}>
                  <h3 className="text-xl font-bold text-cyan-300 mb-5">{example.title}</h3>
                  <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-5">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400 mb-3">
                        {example.codeTitle}
                      </p>
                      <CodeBlock language="c" label="Código C">
                        {example.code}
                      </CodeBlock>
                    </div>
                    <div className="space-y-4">
                      <div className="rounded-xl border border-slate-700/70 bg-slate-950/30 p-4">
                        <h4 className="text-sm font-semibold text-cyan-200 mb-2">Análise</h4>
                        <p className="text-sm text-slate-300 leading-relaxed text-justify">{example.analysis}</p>
                      </div>
                      <div className="rounded-xl border border-slate-700/70 bg-slate-950/30 p-4">
                        <h4 className="text-sm font-semibold text-cyan-200 mb-2">Objetivo do teste</h4>
                        <p className="text-sm text-slate-300 leading-relaxed text-justify">{example.objective}</p>
                      </div>
                      <div className="rounded-xl border border-emerald-300/30 bg-emerald-400/10 p-4">
                        <h4 className="text-sm font-semibold text-emerald-100 mb-2">Resultado esperado</h4>
                        <CodeBlock language="text" label="Saída esperada">
                          {example.expected}
                        </CodeBlock>
                      </div>
                    </div>
                  </div>
                </Panel>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {activeModule.sections.map((section) => (
                <Panel as="article" layout="plain" key={section.title}>
                  <h3 className="text-xl font-bold text-cyan-300 mb-4">{section.title}</h3>
                  <Paragraphs items={section.paragraphs} />
                  {section.bullets && <BulletGrid items={section.bullets} />}
                  {section.table && <DataTable table={section.table} />}
                  {section.code && (
                    <div className="mt-5">
                      <CodeBlock language={section.code.language} label={section.code.label}>
                        {section.code.value}
                      </CodeBlock>
                    </div>
                  )}
                </Panel>
              ))}
            </div>
          )}
        </main>
      </div>
    </PageTemplate>
  );
}
