export const arquiteturaSoftwareAulas = [
  {
    slug: "introducao-e-fundamentos",
    order: 1,
    title: "Introdução e Fundamentos da Arquitetura de Software",
    summary:
      "A aula de abertura define o que é arquitetura de software, por que ela importa, qual é o papel do arquiteto e como atributos como escalabilidade, latência e elasticidade entram nas decisões estruturais.",
    explanation:
      "O ponto de partida da disciplina precisa ser conceitual. Antes de discutir estilos e padrões, o aluno precisa entender que arquitetura é a estrutura fundamental do sistema e que ela existe para organizar complexidade. Arquitetura define componentes, relações, limites e impacto em atributos de qualidade. Ela também introduz a ideia de que escalar não é apenas crescer em hardware, mas manter desempenho e estabilidade sob aumento de carga.",
    importance:
      "Essa aula é o alicerce da disciplina porque prepara o vocabulário mínimo para todo o restante: componentes, interação, escalabilidade, latência, elasticidade e papel do arquiteto.",
    keyPoints: [
      "Arquitetura de software é uma decisão estrutural, não apenas uma representação visual do sistema.",
      "O arquiteto atua como ponte entre necessidades do negócio e decisões técnicas de longo prazo.",
      "Escalabilidade envolve capacidade de crescer mantendo comportamento previsível.",
      "Latência e elasticidade ajudam a entender desempenho em cenários de demanda variável.",
    ],
    decisions: [
      "Definir fronteiras iniciais entre componentes do sistema.",
      "Estabelecer quais atributos de qualidade terão prioridade no projeto.",
      "Relacionar crescimento esperado do produto com escolhas estruturais desde o início.",
      "Evitar que a equipe comece a implementação sem visão arquitetural mínima.",
    ],
    practicalExample:
      "Em um portal acadêmico com muitos acessos em período de matrícula, a arquitetura precisa considerar desde cedo distribuição de carga, redução de latência e comportamento durante picos.",
    watchouts: [
      "Tratar arquitetura como algo para ser pensado apenas depois do código pronto.",
      "Focar só em funcionalidade e ignorar desempenho, disponibilidade e crescimento.",
      "Confundir escalabilidade com simples aumento de recursos de uma única máquina.",
    ],
    diagram: {
      eyebrow: "Visão inicial",
      title: "A disciplina começa da relação entre conceito, crescimento e operação",
      description:
        "A arquitetura aparece aqui como ponte entre intenção do sistema, estrutura técnica e capacidade real de escala.",
      columns: [
        {
          title: "Conceito",
          tone: "cyan",
          items: ["Estrutura", "Componentes", "Interações", "Responsabilidades"],
        },
        {
          title: "Qualidade",
          tone: "emerald",
          items: ["Escalabilidade", "Latência", "Elasticidade", "Disponibilidade"],
        },
        {
          title: "Papel do arquiteto",
          tone: "amber",
          items: ["Visão de negócio", "Escolhas técnicas", "Risco", "Evolução"],
        },
      ],
      footer:
        "Sem essa base, os próximos padrões viram nomes soltos, não instrumentos reais de decisão.",
    },
  },
  {
    slug: "arquitetura-design-implementacao",
    order: 2,
    title: "Arquitetura, Design e Implementação",
    summary:
      "Esta aula separa os níveis de abstração do software e mostra por que arquitetura, design e implementação não são sinônimos, embora dependam uns dos outros.",
    explanation:
      "Arquitetura responde ao desenho macro do sistema, design detalha os componentes internos e implementação transforma essas definições em software executável. Essa distinção evita decisões tomadas no nível errado. A aula também trabalha o impacto da estratégia de implantação, da integração contínua e da necessidade de pensar entrega e operação desde cedo.",
    importance:
      "Essa aula amadurece a disciplina porque impede uma confusão muito comum: achar que arquitetura é apenas código bem organizado. Na verdade, ela vem antes e orienta o restante.",
    keyPoints: [
      "Arquitetura trabalha o nível alto do sistema; design detalha; implementação executa.",
      "Boa implantação depende de decisões tomadas ainda durante o desenho do sistema.",
      "Simplicidade, modularidade e abstração são princípios que reduzem custo futuro.",
      "Baixo acoplamento facilita mudanças e reversões com menor impacto.",
    ],
    decisions: [
      "Separar o que é escolha estrutural do que é detalhe de implementação.",
      "Planejar estratégia de deploy e rollback como parte do sistema.",
      "Adotar modularidade para reduzir dependências indevidas.",
      "Evitar decisões prematuras de código que comprometam a arquitetura.",
    ],
    practicalExample:
      "Em um sistema de e-commerce, a decisão de dividir catálogo, checkout e pagamento é arquitetural; o desenho de classes do carrinho é de design; e o código final da API é implementação.",
    watchouts: [
      "Misturar regra estrutural com detalhe de framework.",
      "Ignorar entrega e operação até o final do projeto.",
      "Criar design excessivamente complexo sem ganho claro para o sistema.",
    ],
    diagram: {
      eyebrow: "Níveis de abstração",
      title: "Arquitetura orienta, design detalha, implementação concretiza",
      description:
        "A aula organiza o processo de construção em níveis para que cada tipo de decisão aconteça no momento correto.",
      columns: [
        {
          title: "Arquitetura",
          tone: "cyan",
          items: ["Estrutura macro", "Padrões", "Qualidade", "Direção"],
        },
        {
          title: "Design",
          tone: "emerald",
          items: ["Módulos", "Interfaces", "Fluxos", "Detalhamento"],
        },
        {
          title: "Implementação",
          tone: "amber",
          items: ["Código", "Testes", "Deploy", "Operação"],
        },
      ],
      footer:
        "Quando esses níveis se confundem, o projeto perde clareza, previsibilidade e governança técnica.",
    },
  },
  {
    slug: "impacto-dos-fundamentos",
    order: 3,
    title: "Impacto dos Fundamentos e Papel do Arquiteto",
    summary:
      "A terceira aula mostra visões arquiteturais, documentação, padrões, atribuições do arquiteto e o impacto real da arquitetura no negócio.",
    explanation:
      "A disciplina avança da introdução para a consequência prática dos fundamentos: múltiplas visões do sistema, documentação como preservação de conhecimento, habilidades do arquiteto e relação entre arquitetura, custo, receita e competitividade. Também aparece a ideia de evolução arquitetural por refatoração, migração e modernização.",
    importance:
      "Aqui a disciplina deixa de ser apenas conceitual e passa a mostrar que arquitetura muda a capacidade da empresa de evoluir software com segurança e velocidade.",
    keyPoints: [
      "Arquitetura precisa ser lida por múltiplas visões: lógica, física, execução e desenvolvimento.",
      "Documentação preserva decisões e ajuda alinhamento entre equipes.",
      "O arquiteto precisa entender domínio, tecnologia e viabilidade.",
      "Arquitetura ruim gera custo invisível que aparece na manutenção e na operação.",
    ],
    decisions: [
      "Escolher como documentar o sistema para públicos diferentes.",
      "Definir responsabilidades do arquiteto além do desenho técnico puro.",
      "Relacionar evolução técnica a objetivos de negócio.",
      "Planejar refatoração e modernização como parte da vida do sistema.",
    ],
    practicalExample:
      "Num sistema legado corporativo, uma documentação mínima de visões arquiteturais já reduz retrabalho porque permite entender onde estão regras críticas, integrações e gargalos antes de alterar o sistema.",
    watchouts: [
      "Depender só da memória das pessoas para manter conhecimento arquitetural.",
      "Separar arquitetura e negócio como se fossem mundos independentes.",
      "Adiar modernização até que o sistema esteja quase inviável de manter.",
    ],
    diagram: {
      eyebrow: "Visões e impacto",
      title: "Arquitetura conecta documentação, decisão e resultado de negócio",
      description:
        "A aula mostra que decisões estruturais só ganham valor quando são compreendidas, registradas e conectadas ao impacto real do sistema.",
      columns: [
        {
          title: "Visões",
          tone: "cyan",
          items: ["Lógica", "Física", "Execução", "Desenvolvimento"],
        },
        {
          title: "Governança",
          tone: "emerald",
          items: ["Documentação", "Decisão", "Papel do arquiteto", "Evolução"],
        },
        {
          title: "Negócio",
          tone: "amber",
          items: ["Custo", "Receita", "Competitividade", "Sustentação"],
        },
      ],
      footer:
        "A arquitetura só cumpre seu papel quando deixa de ser abstrata e passa a orientar decisões do produto e da operação.",
    },
  },
  {
    slug: "configuracoes-e-padroes",
    order: 4,
    title: "Configurações e Padrões Arquiteturais",
    summary:
      "A quarta aula percorre monolito, cliente-servidor, camadas, SOA, microservices, eventos, MVC, MVVM, broker, P2P e alta disponibilidade.",
    explanation:
      "Esse é o bloco mais comparativo da disciplina. A aula organiza o que é configuração arquitetural, o que é padrão arquitetural e como cada escolha muda acoplamento, escalabilidade, distribuição, resiliência e manutenção. É aqui que a disciplina realmente dá repertório técnico para leitura de cenários reais.",
    importance:
      "Sem esse repertório, o aluno não consegue justificar escolhas. Esta aula entrega vocabulário comparativo e noção de trade-offs entre abordagens clássicas e distribuídas.",
    keyPoints: [
      "Configuração arquitetural define a forma geral do sistema.",
      "Padrões arquiteturais oferecem soluções reutilizáveis para problemas recorrentes.",
      "Não existe padrão universalmente melhor; o contexto decide.",
      "Alta disponibilidade e distribuição exigem padrões próprios de tolerância a falhas.",
    ],
    decisions: [
      "Comparar estruturas monolíticas e distribuídas com base em contexto.",
      "Escolher padrões estruturais e distribuídos conforme responsabilidade e risco.",
      "Avaliar custo operacional de soluções mais complexas.",
      "Relacionar estilo arquitetural à natureza do domínio e da equipe.",
    ],
    practicalExample:
      "Um sistema institucional simples pode funcionar muito bem em camadas, enquanto uma plataforma de alto volume com integração intensa pode exigir padrões de broker, balanceamento e serviços especializados.",
    watchouts: [
      "Tratar padrões como checklist de moda.",
      "Usar soluções distribuídas sem necessidade operacional real.",
      "Escolher microservices sem dominar modularização primeiro.",
    ],
    diagram: {
      eyebrow: "Mapa de comparação",
      title: "A aula central organiza repertório de estilos e padrões",
      description:
        "O aluno deixa de decorar nomes e passa a enxergar critérios para comparar estruturas, responsabilidades e impactos operacionais.",
      columns: [
        {
          title: "Estruturas base",
          tone: "cyan",
          items: ["Monolito", "Cliente-servidor", "Camadas", "SOA"],
        },
        {
          title: "Padrões e distribuição",
          tone: "emerald",
          items: ["MVC", "MVVM", "Broker", "Eventos"],
        },
        {
          title: "Resiliência e escala",
          tone: "amber",
          items: ["Circuit Breaker", "Load Balancer", "P2P", "Alta disponibilidade"],
        },
      ],
      footer:
        "Essa aula funciona como eixo de comparação para boa parte das decisões arquiteturais da disciplina.",
    },
  },
  {
    slug: "arquiteturas-hibridas",
    order: 5,
    title: "Arquiteturas Híbridas e Modernização",
    summary:
      "A quinta aula mostra como organizações combinam monólitos, microservices, cloud, on-premise, containers, gateways, mensageria e práticas de governança.",
    explanation:
      "A realidade corporativa raramente é 'tudo monolito' ou 'tudo microservice'. Muitas organizações precisam coexistir com legado, requisitos regulatórios, limites de custo e metas de modernização gradual. A arquitetura híbrida surge como resposta pragmática, apoiada por padrões como Strangler Fig, Anti-Corruption Layer, BFF, observabilidade e automação operacional.",
    importance:
      "Essa aula aproxima a disciplina do mundo real. A maior parte das empresas trabalha com transição, não com recomeço do zero.",
    keyPoints: [
      "Arquitetura híbrida combina abordagens em vez de apostar em substituição total imediata.",
      "Containers, gateways e mensageria sustentam essa convivência técnica.",
      "Governança e observabilidade se tornam ainda mais críticas em cenários híbridos.",
      "Modernizar bem é diferente de apenas quebrar um monólito em serviços.",
    ],
    decisions: [
      "Definir o que permanece legado e o que pode ser modernizado primeiro.",
      "Escolher padrões de transição que protejam domínio e integração.",
      "Padronizar monitoramento, segurança e deploy em ambientes heterogêneos.",
      "Balancear custo, risco e velocidade de transformação.",
    ],
    practicalExample:
      "Uma instituição financeira pode manter core transacional em ambiente controlado enquanto expõe novos canais digitais e analytics na nuvem, usando camadas de integração e proteção de domínio.",
    watchouts: [
      "Chamar de híbrido um ambiente simplesmente desorganizado.",
      "Migrar sem governança de APIs, observabilidade e contratos.",
      "Ignorar dependências do legado ao planejar modernização.",
    ],
    diagram: {
      eyebrow: "Transição arquitetural",
      title: "Modernizar é combinar convivência, proteção e evolução gradual",
      description:
        "A arquitetura híbrida aparece como caminho pragmático para transformar sistemas sem comprometer operações críticas.",
      columns: [
        {
          title: "Legado",
          tone: "cyan",
          items: ["Monólito", "Core", "Dados críticos", "Regras antigas"],
        },
        {
          title: "Camada híbrida",
          tone: "emerald",
          items: ["Gateway", "Mensageria", "ACL", "Containers"],
        },
        {
          title: "Evolução",
          tone: "amber",
          items: ["Cloud", "Serviços novos", "Observabilidade", "Escala seletiva"],
        },
      ],
      footer:
        "A força da arquitetura híbrida está em permitir mudança com continuidade, não ruptura irresponsável.",
    },
  },
  {
    slug: "como-escolher-arquitetura",
    order: 6,
    title: "Como Escolher a Arquitetura Ideal",
    summary:
      "A sexta aula transforma repertório em decisão, propondo análise de cenários, justificativa técnica e defesa da arquitetura escolhida.",
    explanation:
      "Depois de conhecer os estilos, esta aula pergunta o que realmente importa: como justificar uma escolha. Ela trabalha atividade, critérios de avaliação, adequação ao caso de uso e análise de arquiteturas tradicionais, distribuídas, orientadas a dados, nuvem, edge, IA e computação avançada. É o momento em que o aluno precisa argumentar, não apenas repetir definições.",
    importance:
      "Escolher arquitetura é uma das tarefas mais importantes da disciplina. Essa aula desenvolve maturidade de análise e evita respostas baseadas em preferência pessoal ou hype tecnológico.",
    keyPoints: [
      "A arquitetura precisa ser escolhida a partir do contexto do sistema.",
      "Trade-offs técnicos devem ser justificados com critérios claros.",
      "Nem toda boa arquitetura para um cenário serve para outro.",
      "A argumentação técnica é parte da competência arquitetural.",
    ],
    decisions: [
      "Relacionar domínio, volume, latência e equipe à escolha arquitetural.",
      "Avaliar clareza, adequação e capacidade de defesa da solução.",
      "Explorar arquiteturas tradicionais, distribuídas e emergentes sem dogmatismo.",
      "Tratar o estudo de caso como instrumento de decisão concreta.",
    ],
    practicalExample:
      "Um sistema de telemedicina com vídeo em tempo real, dados sensíveis e alta disponibilidade pede uma justificativa muito diferente da usada para um portal institucional informativo.",
    watchouts: [
      "Escolher arquitetura pelo nome mais moderno.",
      "Ignorar contexto operacional e maturidade do time.",
      "Defender uma solução sem conectar benefícios, limites e risco.",
    ],
    diagram: {
      eyebrow: "Processo de escolha",
      title: "Escolher arquitetura exige cenário, critérios e defesa técnica",
      description:
        "A aula converte repertório em processo decisório, forçando comparação, adequação e argumentação.",
      columns: [
        {
          title: "Cenário",
          tone: "cyan",
          items: ["Domínio", "Usuários", "Risco", "Restrições"],
        },
        {
          title: "Análise",
          tone: "emerald",
          items: ["Trade-offs", "Critérios", "Capacidade da equipe", "Qualidade"],
        },
        {
          title: "Escolha",
          tone: "amber",
          items: ["Justificativa", "Caso de uso", "Defesa", "Avaliação"],
        },
      ],
      footer:
        "A disciplina ganha maturidade quando o aluno passa de catálogo de padrões para decisão contextual fundamentada.",
    },
  },
  {
    slug: "requisitos-nao-funcionais",
    order: 7,
    title: "Requisitos Não Funcionais e seu Impacto na Arquitetura",
    summary:
      "A sétima aula fecha a trilha-base mostrando que desempenho, segurança, disponibilidade, portabilidade e manutenibilidade moldam decisões arquiteturais desde o início.",
    explanation:
      "Requisitos não funcionais não são detalhe de homologação. Eles determinam as decisões mais difíceis de reverter: se o sistema será distribuído, como será protegido, como escalará, como será observado e como suportará mudanças futuras. A aula também trabalha um estudo de caso e propõe atividade prática de proposta arquitetural orientada por NFRs.",
    importance:
      "Essa aula fecha muito bem a disciplina-base porque traduz todos os conceitos anteriores em critérios concretos de qualidade e validação arquitetural.",
    keyPoints: [
      "Requisitos não funcionais atravessam todas as camadas do sistema.",
      "Ignorá-los cedo aumenta retrabalho e risco de fracasso do projeto.",
      "Desempenho, segurança e disponibilidade costumam entrar em tensão e exigem trade-offs.",
      "Arquitetura precisa prever meios de validar se esses requisitos estão sendo atendidos.",
    ],
    decisions: [
      "Identificar NFRs prioritários antes de consolidar a estrutura do sistema.",
      "Definir métricas e testes para validar qualidades esperadas.",
      "Traduzir exigências de negócio em decisões arquiteturais mensuráveis.",
      "Balancear segurança, desempenho, custo e facilidade de evolução.",
    ],
    practicalExample:
      "Num e-commerce de alta escala, metas de latência, disponibilidade e segurança de pagamento conduzem decisões como cache, autoescalonamento, tokenização e blue-green deployment.",
    watchouts: [
      "Tratar requisito não funcional como detalhe que será resolvido depois.",
      "Não definir métricas nem cenários de validação.",
      "Escolher tecnologia antes de entender o atributo de qualidade prioritário.",
    ],
    diagram: {
      eyebrow: "Arquitetura guiada por qualidade",
      title: "NFRs não complementam a arquitetura: eles a dirigem",
      description:
        "A aula final da trilha-base mostra que qualidade esperada precisa virar estrutura, política e validação do sistema.",
      columns: [
        {
          title: "Requisitos",
          tone: "cyan",
          items: ["Desempenho", "Segurança", "Disponibilidade", "Portabilidade"],
        },
        {
          title: "Arquitetura",
          tone: "emerald",
          items: ["Padrões", "Topologia", "Proteção", "Escalabilidade"],
        },
        {
          title: "Validação",
          tone: "amber",
          items: ["Métricas", "Testes", "Monitoramento", "Ajustes"],
        },
      ],
      footer:
        "Essa aula fecha a base conceitual com um critério central: boa arquitetura precisa ser validável em atributos de qualidade.",
    },
  },
];

export function getArquiteturaSoftwareAula(slug) {
  return arquiteturaSoftwareAulas.find((item) => item.slug === slug) || null;
}
