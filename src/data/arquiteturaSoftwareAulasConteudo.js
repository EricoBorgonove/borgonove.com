export const arquiteturaSoftwareAulasConteudo = {
  "introducao-e-fundamentos": {
    sections: [
      {
        title: "1. O que realmente significa arquitetura de software",
        paragraphs: [
          "Arquitetura de software nao deve ser entendida como um diagrama bonito ou como uma escolha de framework. Ela representa a organizacao estrutural do sistema, isto e, como os blocos principais se relacionam, quais responsabilidades cada parte assume e quais restricoes orientam a evolucao do produto.",
          "Quando um sistema cresce sem essa visao, surgem sintomas conhecidos: regras espalhadas, dificuldade de manutencao, dependencia excessiva entre modulos e mudancas cada vez mais caras. A arquitetura entra justamente para reduzir esse caos e dar direcao tecnica para o time.",
        ],
        bullets: [
          "Define os principais componentes do sistema.",
          "Determina como esses componentes se comunicam.",
          "Protege qualidades como desempenho, seguranca e manutenibilidade.",
          "Ajuda a equipe a tomar decisoes com coerencia ao longo do tempo.",
        ],
      },
      {
        title: "2. Papel do arquiteto e responsabilidade tecnica",
        paragraphs: [
          "O arquiteto de software nao e apenas a pessoa que desenha caixas e setas. Ele precisa entender o negocio, antecipar riscos, avaliar o impacto de decisoes tecnologicas e orientar a equipe para que a implementacao continue alinhada com a estrutura desejada.",
          "Isso exige equilibrio. Uma arquitetura excessivamente sofisticada pode travar o projeto. Uma arquitetura simplista demais pode nao sustentar o crescimento do sistema. O papel do arquiteto e navegar entre esses extremos e decidir com base em contexto, nao em preferencia pessoal.",
        ],
        bullets: [
          "Traduz necessidades do negocio em decisoes estruturais.",
          "Avalia risco tecnico e custo de manutencao futura.",
          "Ajuda a escolher prioridades entre simplicidade, escala e resiliencia.",
          "Mantem alinhamento entre visao arquitetural e implementacao real.",
        ],
      },
      {
        title: "3. Escalabilidade, latencia e elasticidade",
        paragraphs: [
          "A aula inicial tambem precisa apresentar tres conceitos que costumam ser confundidos. Escalabilidade e a capacidade de crescer sem degradar o comportamento esperado. Latencia e o tempo de resposta percebido na interacao com o sistema. Elasticidade e a capacidade de ajustar recursos dinamicamente conforme a carga aumenta ou diminui.",
          "Esses conceitos sao fundamentais porque mostram que arquitetura nao se limita a organizacao interna do codigo. Ela tambem define como o sistema vai reagir a picos, gargalos, aumento de usuarios e restricoes de infraestrutura.",
        ],
        bullets: [
          "Escalabilidade vertical aumenta recursos da mesma maquina.",
          "Escalabilidade horizontal distribui carga entre varias instancias.",
          "Latencia baixa melhora experiencia do usuario e percepcao de qualidade.",
          "Elasticidade e muito importante em ambientes de nuvem e demanda variavel.",
        ],
      },
    ],
    activity: {
      title: "Atividade da aula",
      description:
        "Escolha um sistema conhecido, como uma loja virtual, rede social ou sistema academico, e responda: quais sao os principais blocos desse sistema, quais qualidades ele precisa proteger e que tipo de crescimento voce esperaria dele nos proximos dois anos?",
    },
    questions: [
      "Por que arquitetura deve ser pensada antes de a complexidade explodir?",
      "Qual a diferenca entre organizar codigo e definir arquitetura?",
      "Quando um sistema pode parecer funcionar bem hoje, mas estar arquiteturalmente fragil para o futuro?",
    ],
    takeaway:
      "Ao final desta aula, o aluno deve entender que arquitetura e uma disciplina de organizacao e decisao, nao apenas uma representacao visual do sistema.",
  },
  "arquitetura-design-implementacao": {
    sections: [
      {
        title: "1. Tres niveis diferentes de decisao",
        paragraphs: [
          "Arquitetura, design e implementacao fazem parte do mesmo processo, mas operam em niveis diferentes. Arquitetura lida com estrutura de alto nivel, fronteiras e atributos de qualidade. Design detalha modulos, interfaces, fluxos e organizacao interna. Implementacao transforma tudo isso em software executavel.",
          "Separar esses niveis evita erros recorrentes, como escolher tecnologia antes de entender o problema, ou detalhar classes e endpoints antes mesmo de decidir a forma estrutural do sistema.",
        ],
        bullets: [
          "Arquitetura responde ao que o sistema precisa sustentar.",
          "Design responde a como cada parte sera modelada internamente.",
          "Implementacao responde a como isso se torna software real.",
          "Misturar os tres niveis gera retrabalho e perda de clareza.",
        ],
      },
      {
        title: "2. Principios que sustentam um bom desenho",
        paragraphs: [
          "A aula precisa trabalhar principios que servem de ponte entre arquitetura e design. Simplicidade e o criterio que impede o sistema de acumular complexidade sem necessidade. Modularidade divide o problema em partes administraveis. Abstracao separa o essencial do acidental. Baixo acoplamento protege a capacidade de mudanca.",
          "Esses principios nao sao enfeites teoricos. Eles explicam por que alguns sistemas envelhecem bem e outros se tornam refens de cada pequena alteracao.",
        ],
        bullets: [
          "Simplicidade reduz custo cognitivo.",
          "Modularidade facilita divisao de responsabilidades.",
          "Abstracao ajuda a pensar no que importa em cada nivel.",
          "Baixo acoplamento limita propagacao de impacto.",
        ],
      },
      {
        title: "3. Implantacao e operacao precisam entrar cedo",
        paragraphs: [
          "Uma das partes mais valiosas dessa aula e mostrar que deploy nao pode ser um pensamento tardio. Estrategia de implantacao, rollback, testes automatizados e integracao continua precisam ser considerados ainda no desenho da solucao.",
          "Se a arquitetura ignora operacao, qualquer atualizacao vira risco. E por isso que sistemas modernos aproximam desenvolvimento, entrega e observabilidade desde o inicio do projeto.",
        ],
        bullets: [
          "CI/CD reduz risco operacional quando bem aplicado.",
          "Planejar rollback e tao importante quanto planejar rollout.",
          "Arquitetura ruim aparece com forca em janelas de implantacao.",
          "Operacao e parte da vida do sistema, nao da fase final.",
        ],
      },
    ],
    activity: {
      title: "Atividade da aula",
      description:
        "Pegue um sistema simples, como cadastro de alunos ou controle de estoque, e descreva uma decisao arquitetural, uma decisao de design e uma decisao de implementacao. Explique por que elas nao sao a mesma coisa.",
    },
    questions: [
      "Que tipo de problema nasce quando o time pula da ideia direto para o codigo?",
      "Por que uma estrategia de implantacao tambem faz parte da arquitetura?",
      "Em que momento um detalhe de implementacao pode comprometer uma boa decisao estrutural?",
    ],
    takeaway:
      "Ao final desta aula, o aluno deve conseguir separar escolha estrutural, detalhamento de componentes e codificacao concreta.",
  },
  "impacto-dos-fundamentos": {
    sections: [
      {
        title: "1. Arquitetura precisa ser enxergada por mais de uma visao",
        paragraphs: [
          "Sistemas complexos nao podem ser explicados por um unico diagrama. A mesma solucao precisa ser entendida pela visao logica, pela visao fisica, pela visao de execucao e pela visao de desenvolvimento. Cada uma responde a uma pergunta diferente sobre o sistema.",
          "A visao logica organiza modulos e responsabilidades. A visao fisica mostra implantacao e infraestrutura. A visao de execucao mostra processos, comunicacao e comportamento em runtime. A visao de desenvolvimento ajuda a entender organizacao do codigo e da evolucao tecnica.",
        ],
        bullets: [
          "Nenhuma visao sozinha da conta da complexidade total.",
          "Stakeholders diferentes precisam de recortes diferentes.",
          "Visoes bem definidas melhoram comunicacao tecnica.",
          "Elas tambem reduzem interpretacoes erradas do sistema.",
        ],
      },
      {
        title: "2. Documentacao como preservacao de conhecimento",
        paragraphs: [
          "Sem documentacao, a arquitetura vira dependencia da memoria das pessoas. Isso fragiliza o projeto, especialmente quando ha rotatividade de equipe ou manutencao de longo prazo. Documentar nao significa escrever tudo; significa registrar o que e essencial para compreensao e decisao.",
          "Diagramas, descricoes textuais, decisoes arquiteturais e modelos como C4 ajudam a construir um mapa vivo do sistema. O objetivo nao e burocracia, mas continuidade tecnica.",
        ],
        bullets: [
          "Documentacao boa orienta desenvolvimento e manutencao.",
          "Ela reduz dependencia de conhecimento informal.",
          "Precisa ser clara, atualizavel e alinhada ao sistema real.",
          "Serve tanto para onboard quanto para modernizacao futura.",
        ],
      },
      {
        title: "3. Impacto no negocio e evolucao da arquitetura",
        paragraphs: [
          "Uma arquitetura mal pensada gera lentidao de entrega, falhas operacionais, dificuldade de mudanca e custo elevado de manutencao. Em contrapartida, uma arquitetura coerente melhora previsibilidade, reduz retrabalho e sustenta crescimento do produto.",
          "Por isso a aula tambem mostra que arquitetura evolui. Refatoracao, migracao e modernizacao fazem parte da vida do sistema e devem ser tratadas como movimentos planejados, nao como reacao desesperada a um colapso tecnico.",
        ],
        bullets: [
          "Arquitetura afeta custo, receita e competitividade.",
          "Modernizacao e parte da estrategia, nao um evento isolado.",
          "Evolucao exige leitura do estado atual e visao de futuro.",
          "O arquiteto participa dessa traducao entre tecnologia e negocio.",
        ],
      },
    ],
    activity: {
      title: "Atividade da aula",
      description:
        "Escolha um sistema legado que voce conheca e descreva quais visoes arquiteturais seriam mais importantes para entende-lo antes de qualquer mudanca significativa.",
    },
    questions: [
      "Por que a mesma arquitetura precisa de multiplas visoes?",
      "Como a falta de documentacao afeta o custo de manutencao?",
      "Quando modernizacao deixa de ser opcional e passa a ser necessidade de sobrevivencia tecnica?",
    ],
    takeaway:
      "Ao final desta aula, o aluno deve perceber que arquitetura nao e apenas estrutura interna: ela influencia comunicacao, governanca e competitividade do software.",
  },
  "configuracoes-e-padroes": {
    sections: [
      {
        title: "1. Configuracoes arquiteturais e forma geral do sistema",
        paragraphs: [
          "Uma configuracao arquitetural define como o sistema e organizado no seu desenho macro. Monolito, cliente-servidor, camadas, SOA e microservices nao sao apenas nomes: sao formas diferentes de distribuir responsabilidade, coordenar comunicacao e lidar com crescimento.",
          "A aula precisa deixar claro que cada configuracao traz vantagens e limites. Um monolito pode ser excelente para comeco rapido e controle de complexidade operacional. Microservices podem ser valiosos quando ha necessidade real de autonomia e escala seletiva.",
        ],
        bullets: [
          "A configuracao e o formato estrutural de alto nivel.",
          "Ela altera deploy, manutencao, escalabilidade e resiliência.",
          "A escolha depende do contexto do sistema e da equipe.",
          "Nao existe configuracao universalmente superior.",
        ],
      },
      {
        title: "2. Padrões como solucoes reutilizaveis",
        paragraphs: [
          "Enquanto configuracoes definem a forma macro, padroes arquiteturais e estruturais oferecem respostas repetiveis para problemas recorrentes. MVC, MVVM, Broker, Pipes and Filters, Circuit Breaker e Load Balancer sao exemplos de padroes que ajudam a resolver desafios especificos.",
          "O aluno precisa entender que padrao nao e receita pronta. Ele so faz sentido quando resolve um problema real e conversa com a estrutura geral da solucao.",
        ],
        bullets: [
          "Padroes reduzem improvisacao em problemas recorrentes.",
          "Eles devem ser escolhidos por adequacao, nao por fama.",
          "Um mesmo sistema pode combinar varios padroes.",
          "Padrao sem problema real vira complexidade gratuita.",
        ],
      },
      {
        title: "3. Distribuicao, resiliencia e alta disponibilidade",
        paragraphs: [
          "A aula tambem deve mostrar que, ao sair de arquiteturas mais simples, entram em cena novas preocupacoes: distribuicao de carga, falhas em cascata, mensageria, consistencia e recuperacao automatica. Aqui aparecem padroes mais operacionais e distribuídos.",
          "Esse bloco ajuda a amadurecer a visao do aluno, porque mostra que arquitetura nao pode ser escolhida apenas pela organizacao do codigo; ela tambem precisa sustentar operacao real.",
        ],
        bullets: [
          "Broker desacopla comunicacao assíncrona.",
          "Circuit Breaker protege contra propagacao de falhas.",
          "Load Balancer distribui trafego entre instancias.",
          "Alta disponibilidade exige eliminar pontos unicos de falha.",
        ],
      },
    ],
    activity: {
      title: "Atividade da aula",
      description:
        "Monte uma tabela comparando monolito, camadas, microservices e arquitetura orientada a eventos para um mesmo problema: uma plataforma de vendas online com picos sazonais.",
    },
    questions: [
      "Qual a diferenca entre configuracao e padrao arquitetural?",
      "Quando um padrao melhora a arquitetura e quando apenas complica?",
      "Por que solucoes distribuidas exigem maturidade operacional maior?",
    ],
    takeaway:
      "Ao final desta aula, o aluno deve conseguir comparar estilos e padroes sem cair na armadilha de escolher por hype tecnologico.",
  },
  "arquiteturas-hibridas": {
    sections: [
      {
        title: "1. Por que arquiteturas hibridas existem",
        paragraphs: [
          "No mundo real, sistemas nao sao reescritos por completo toda vez que uma nova abordagem fica popular. Empresas acumulam legado, restricoes regulatorias, dependencias criticas e investimentos ja feitos. A arquitetura hibrida nasce dessa realidade.",
          "Ela permite combinar componentes antigos e novos de forma controlada, criando uma transicao progressiva em vez de uma substituicao abrupta e arriscada.",
        ],
        bullets: [
          "Modernizacao costuma ser gradual, nao total.",
          "Legado e contexto de negocio precisam ser respeitados.",
          "Hibridizacao busca equilibrio entre estabilidade e evolucao.",
          "Arquitetura hibrida e sinal de pragmatismo, nao de fraqueza tecnica.",
        ],
      },
      {
        title: "2. Padrões de transicao e protecao do dominio",
        paragraphs: [
          "Para modernizar bem, nao basta subir servicos novos. E preciso controlar a forma como o legado conversa com o novo. Padroes como Strangler Fig ajudam a migrar gradualmente. Anti-Corruption Layer protege o novo dominio da contaminacao semantica do sistema antigo. BFF adapta experiencia para diferentes canais de acesso.",
          "Esses padroes mostram que modernizar nao e so decompor tecnicamente, mas preservar sentido de negocio enquanto a estrutura evolui.",
        ],
        bullets: [
          "Strangler Fig ajuda substituicao incremental.",
          "ACL protege modelos novos contra dependencias antigas.",
          "BFF organiza adaptacao por canal ou interface.",
          "Transicao precisa de fronteiras claras entre velho e novo.",
        ],
      },
      {
        title: "3. Operacao, observabilidade e governanca em ambientes mistos",
        paragraphs: [
          "Quanto mais heterogeneo o ambiente, mais importante fica a governanca. Kubernetes, gateways, mensageria, logs centralizados e tracing distribuem responsabilidade operacional pelo sistema. Sem isso, a arquitetura hibrida vira um territorio opaco.",
          "A aula precisa deixar claro que observabilidade nao e detalhe de infraestrutura. Ela e parte da capacidade de sustentar a convivência entre componentes diferentes.",
        ],
        bullets: [
          "Ambientes hibridos exigem monitoramento unificado.",
          "APIs e contratos precisam de governanca forte.",
          "Seguranca e padronizacao ganham ainda mais relevancia.",
          "Modernizacao sem observabilidade costuma falhar silenciosamente.",
        ],
      },
    ],
    activity: {
      title: "Atividade da aula",
      description:
        "Desenhe uma estrategia de modernizacao gradual para um sistema legado de matricula academica, indicando o que ficaria no legado, o que seria migrado primeiro e quais camadas de protecao seriam necessarias.",
    },
    questions: [
      "Por que nem toda empresa pode substituir um sistema inteiro de uma vez?",
      "Como proteger o novo dominio de conceitos ruins do legado?",
      "Qual o papel da observabilidade na convivencia entre antigo e novo?",
    ],
    takeaway:
      "Ao final desta aula, o aluno deve entender que arquiteturas hibridas sao ferramentas de transicao consciente, nao apenas mistura improvisada de tecnologias.",
  },
  "como-escolher-arquitetura": {
    sections: [
      {
        title: "1. Escolha arquitetural comeca pelo problema, nao pela tecnologia",
        paragraphs: [
          "A aula precisa ensinar que arquitetura nao e uma escolha de prateleira. Ela nasce da leitura do contexto: dominio, escala esperada, criticidade, latencia toleravel, regulacao, capacidade da equipe e custo de operacao.",
          "Quando o time pula essa etapa e escolhe pela moda, a arquitetura deixa de ser resposta para o problema e vira fonte de novos problemas.",
        ],
        bullets: [
          "Toda boa escolha comeca com leitura de contexto.",
          "Requisito funcional sozinho nao basta para decidir.",
          "Negocio, risco e capacidade do time importam tanto quanto tecnologia.",
          "Escolher sem criterio leva a solucoes mal ajustadas ao problema.",
        ],
      },
      {
        title: "2. Comparar alternativas e explicitar trade-offs",
        paragraphs: [
          "Uma aula de decisao arquitetural precisa obrigar comparacao. Cada alternativa traz custo, beneficio, limite e dependencias. Monolito pode entregar mais rapido. Microservices podem facilitar autonomia e escala. Event-driven pode desacoplar, mas exige maior maturidade operacional. Serverless pode simplificar operacao, mas trazer lock-in e restricoes.",
          "A competencia aqui nao e decorar vantagens, mas justificar por que uma opcao atende melhor um determinado cenario.",
        ],
        bullets: [
          "Toda escolha implica abrir mao de alguma coisa.",
          "Trade-off explicito e sinal de maturidade tecnica.",
          "O melhor desenho para um sistema pode ser ruim para outro.",
          "Comparacao ajuda a evitar decisoes emocionais ou imitativas.",
        ],
      },
      {
        title: "3. Defesa tecnica e estudo de caso",
        paragraphs: [
          "A aula ganha forca quando o aluno precisa defender a arquitetura escolhida. Isso transforma repertorio em argumento. Em vez de repetir definicoes, ele precisa sustentar a decisao com criterios como desempenho, seguranca, simplicidade, custo e evolucao futura.",
          "Esse exercicio tambem aproxima a disciplina da pratica profissional, onde arquitetura precisa ser explicada para times, gestores e stakeholders diversos.",
        ],
        bullets: [
          "Justificar e parte da decisao arquitetural.",
          "O estudo de caso ajuda a tornar a analise concreta.",
          "Clareza tecnica importa tanto quanto conhecimento conceitual.",
          "Boa arquitetura tambem precisa ser defendida e comunicada.",
        ],
      },
    ],
    activity: {
      title: "Atividade da aula",
      description:
        "Escolha um dos seguintes cenarios: plataforma de streaming, sistema de telemedicina ou marketplace. Compare ao menos duas arquiteturas possiveis e defenda a que voce considera mais adequada.",
    },
    questions: [
      "Qual o perigo de escolher arquitetura por hype?",
      "Por que a mesma arquitetura pode ser excelente em um cenario e ruim em outro?",
      "Como a capacidade do time influencia a escolha arquitetural?",
    ],
    takeaway:
      "Ao final desta aula, o aluno deve conseguir argumentar tecnicamente sobre uma escolha arquitetural em vez de apenas listar opcoes.",
  },
  "requisitos-nao-funcionais": {
    sections: [
      {
        title: "1. Requisitos nao funcionais moldam a estrutura do sistema",
        paragraphs: [
          "Requisitos nao funcionais dizem como o sistema precisa se comportar. Eles definem metas de desempenho, seguranca, disponibilidade, confiabilidade, manutenibilidade e portabilidade. Diferente dos funcionais, costumam atravessar todas as camadas do software.",
          "A arquitetura precisa nascer olhando para esses atributos, porque depois que o sistema esta consolidado, mudar sua capacidade de resposta, sua estrategia de seguranca ou sua topologia de disponibilidade custa muito mais caro.",
        ],
        bullets: [
          "NFRs influenciam decisoes arquiteturais profundas.",
          "Eles costumam ser mais dificeis de corrigir tardiamente.",
          "Atravessam toda a solucao, nao apenas um modulo isolado.",
          "Precisam ser transformados em criterios tecnicos concretos.",
        ],
      },
      {
        title: "2. Qualidade exige trade-offs conscientes",
        paragraphs: [
          "Desempenho, seguranca e disponibilidade nem sempre apontam na mesma direcao. Aumentar protecao pode adicionar latencia. Garantir consistencia forte pode reduzir disponibilidade em certos cenarios distribuidos. Melhorar portabilidade pode reduzir aproveitamento de otimização especifica da plataforma.",
          "Por isso a aula precisa trabalhar maturidade de escolha. Boa arquitetura nao e a que promete tudo ao mesmo tempo, mas a que sabe priorizar o que o sistema realmente precisa sustentar.",
        ],
        bullets: [
          "NFRs frequentemente entram em tensao entre si.",
          "Arquitetura boa explicita prioridade e impacto.",
          "Nao existe qualidade maxima simultanea em todos os eixos.",
          "Trade-off consciente e melhor do que promessa irreal.",
        ],
      },
      {
        title: "3. Validacao arquitetural e obrigatoria",
        paragraphs: [
          "Nao basta dizer que o sistema sera rapido, seguro ou disponivel. E preciso validar isso com testes de carga, metricas, observabilidade, cenarios de falha e criterios de aceitacao. Quando a arquitetura nao define como a qualidade sera medida, ela vira apenas discurso.",
          "A aula final da trilha-base fecha o ciclo exatamente aqui: boa arquitetura precisa ser verificavel. Qualidade arquitetural nao se presume; se demonstra.",
        ],
        bullets: [
          "Definir metrica e parte da arquitetura.",
          "Testes nao funcionais precisam ser planejados.",
          "Observabilidade ajuda a validar comportamento real.",
          "Arquitetura madura transforma expectativa de qualidade em evidencia.",
        ],
      },
    ],
    activity: {
      title: "Atividade da aula",
      description:
        "Escolha um sistema critico, como e-commerce, sistema hospitalar ou app bancario, e defina tres requisitos nao funcionais prioritarios. Depois explique quais decisoes arquiteturais seriam necessarias para sustentalos e como voce validaria isso.",
    },
    questions: [
      "Por que requisitos nao funcionais costumam ser mais caros de corrigir tardiamente?",
      "Como um sistema pode ser funcionalmente correto e ainda assim falhar como produto?",
      "Que diferenca existe entre dizer que o sistema e seguro e provar que ele atende a esse requisito?",
    ],
    takeaway:
      "Ao final desta aula, o aluno deve enxergar requisitos nao funcionais como motores da arquitetura, e nao como anexos do projeto.",
  },
};

export function getArquiteturaSoftwareAulaConteudo(slug) {
  return arquiteturaSoftwareAulasConteudo[slug] || null;
}
