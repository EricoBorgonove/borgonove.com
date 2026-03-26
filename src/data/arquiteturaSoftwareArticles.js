export const arquiteturaSoftwareArticles = [
  {
    slug: "alicerce-do-sistema",
    order: 1,
    title: "Arquitetura de Software: o Alicerce do Sistema",
    summary:
      "Arquitetura de software é a estrutura de alto nível que organiza componentes, responsabilidades, comunicação e atributos de qualidade de um sistema.",
    explanation:
      "Quando um sistema começa a crescer, decisões isoladas de código deixam de ser suficientes. A arquitetura passa a definir os limites entre módulos, como os dados circulam, quais partes podem evoluir separadamente e quais riscos técnicos precisam ser mitigados logo no início. É por isso que arquitetura não é enfeite documental: ela orienta o produto inteiro.",
    importance:
      "Esse tema é a porta de entrada da disciplina, porque sem essa base o restante vira lista de nomes. Antes de discutir microservices, segurança ou disponibilidade, é preciso entender que a arquitetura existe para organizar complexidade e proteger a evolução do sistema.",
    keyPoints: [
      "Arquitetura decide estrutura, responsabilidades e comunicação entre partes do sistema.",
      "Ela é influenciada por requisitos funcionais e, principalmente, não funcionais.",
      "Suas decisões costumam ser caras de reverter depois que o sistema já está em produção.",
      "Uma boa arquitetura melhora manutenção, previsibilidade e capacidade de crescimento.",
    ],
    decisions: [
      "Definir os principais blocos do sistema e o que cada um deve ou não deve fazer.",
      "Escolher estilos de comunicação entre módulos e serviços.",
      "Priorizar atributos como desempenho, segurança, escalabilidade ou simplicidade.",
      "Registrar decisões para que a equipe não dependa só de conhecimento informal.",
    ],
    practicalExample:
      "Em um e-commerce, a arquitetura precisa separar catálogo, pagamento, estoque, autenticação e observabilidade. Mesmo que tudo comece simples, essa separação evita que o projeto vire um bloco sem fronteiras claras.",
    watchouts: [
      "Confundir arquitetura com desenho de tela ou com diagrama bonito.",
      "Tomar decisões técnicas sem ligação com objetivos de negócio.",
      "Ignorar custo de manutenção futura em troca de velocidade imediata.",
    ],
    diagram: {
      eyebrow: "Diagrama conceitual",
      title: "Arquitetura como ponte entre negócio, sistema e operação",
      description:
        "A arquitetura traduz necessidades do negócio em decisões estruturais que sustentam desenvolvimento, operação e evolução.",
      columns: [
        {
          title: "Negócio",
          tone: "cyan",
          items: ["Objetivos", "Restrições", "Prioridades", "Riscos"],
        },
        {
          title: "Arquitetura",
          tone: "emerald",
          items: ["Componentes", "Integrações", "Padrões", "Qualidade"],
        },
        {
          title: "Sistema",
          tone: "amber",
          items: ["Código", "Dados", "Infra", "Operação"],
        },
      ],
      footer:
        "Sem essa camada intermediária, o sistema tende a crescer por impulso, não por decisão.",
    },
  },
  {
    slug: "monolito-vs-microservices",
    order: 2,
    title: "Monolito vs Microservices: A Grande Decisão Arquitetural",
    summary:
      "Monolito centraliza a aplicação em uma única unidade; microservices dividem o sistema em serviços menores e independentes.",
    explanation:
      "Essa comparação não deve ser tratada como moda. Monólitos são mais simples de desenvolver, testar e implantar no início. Já microservices oferecem independência de deploy, isolamento de falhas e escalabilidade granular, mas aumentam a complexidade operacional, observabilidade, segurança distribuída e governança de dados.",
    importance:
      "Quase toda equipe em crescimento enfrenta esse debate. A pergunta correta não é 'qual é mais moderno?', mas 'qual estrutura atende melhor o estágio, o domínio e a maturidade operacional da equipe?'.",
    keyPoints: [
      "Monólitos reduzem complexidade operacional inicial.",
      "Microservices elevam custo de integração, monitoramento e troubleshooting.",
      "A fronteira entre serviços precisa seguir domínio e responsabilidade, não organograma.",
      "Migrar cedo demais para microservices costuma gerar dor sem ganho real.",
    ],
    decisions: [
      "Avaliar tamanho do produto, autonomia de equipes e ritmo de deploy.",
      "Entender se a principal dor é acoplamento interno ou apenas falta de organização no código.",
      "Planejar observabilidade e contratos de integração antes de quebrar o sistema em serviços.",
      "Aceitar que monólito bem modularizado é, muitas vezes, a decisão correta por bastante tempo.",
    ],
    practicalExample:
      "Uma startup com um único produto e equipe pequena costuma ganhar mais com um monólito modular. Já um marketplace com várias frentes de negócio e alta taxa de mudança pode se beneficiar de serviços independentes para catálogo, pagamento, logística e antifraude.",
    watchouts: [
      "Quebrar um sistema em microservices antes de dominar modularidade.",
      "Criar serviços demais, cada um com responsabilidade confusa.",
      "Esquecer de custo de rede, consistência e tracing distribuído.",
    ],
    diagram: {
      eyebrow: "Comparação estrutural",
      title: "Um único bloco versus vários serviços especializados",
      description:
        "A escolha muda o modo de implantação, o isolamento de falhas, o acoplamento entre times e o custo de operação.",
      columns: [
        {
          title: "Monolito",
          tone: "cyan",
          items: ["Deploy único", "Base única", "Menos rede", "Mais simplicidade"],
        },
        {
          title: "Decisão",
          tone: "slate",
          items: ["Escala", "Equipe", "Domínio", "Operação"],
        },
        {
          title: "Microservices",
          tone: "emerald",
          items: ["Deploy independente", "Serviços autônomos", "Escala seletiva", "Mais governança"],
        },
      ],
      footer:
        "A maturidade do time e a natureza do produto pesam mais do que a tendência do mercado.",
    },
  },
  {
    slug: "arquitetura-em-camadas",
    order: 3,
    title: "Arquitetura em Camadas (Layered Architecture)",
    summary:
      "Organiza o sistema em camadas como apresentação, aplicação, domínio e infraestrutura, separando responsabilidades.",
    explanation:
      "A arquitetura em camadas existe para evitar mistura entre interface, regra de negócio e persistência. Ela traz previsibilidade estrutural, facilita manutenção e reduz espalhamento de regras de negócio em lugares inadequados. Não elimina acoplamento sozinha, mas fornece um ponto de partida claro para sistemas corporativos.",
    importance:
      "É uma das bases mais úteis para ensinar organização de sistemas e preparar a transição para modelos mais sofisticados como Hexagonal e Clean Architecture.",
    keyPoints: [
      "Cada camada deve ter uma responsabilidade dominante.",
      "A regra de negócio não deve depender diretamente de detalhes de interface.",
      "Essa arquitetura favorece manutenção e leitura do sistema.",
      "Camadas mal definidas viram apenas pastas com nomes bonitos.",
    ],
    decisions: [
      "Definir dependências permitidas entre camadas.",
      "Centralizar casos de uso e regras na camada adequada.",
      "Evitar acesso direto do frontend ao banco ou lógica duplicada em controllers.",
      "Padronizar entrada e saída de dados entre camadas.",
    ],
    practicalExample:
      "Em um sistema acadêmico, a tela de matrícula pertence à apresentação, o fluxo que valida pré-requisitos fica na camada de aplicação/domínio, e o acesso ao banco reside na infraestrutura.",
    watchouts: [
      "Service layer gigante concentrando tudo sem critério.",
      "Controllers fazendo validação de negócio profunda.",
      "Repositórios contendo regra de negócio que deveria estar no domínio.",
    ],
    diagram: {
      eyebrow: "Diagrama por camadas",
      title: "Cada camada responde por um tipo de responsabilidade",
      description:
        "O fluxo ideal desce em direção à infraestrutura, mas as regras mais valiosas permanecem protegidas no centro do sistema.",
      columns: [
        {
          title: "Apresentação",
          tone: "cyan",
          items: ["UI", "Controllers", "DTOs", "Validação inicial"],
        },
        {
          title: "Aplicação e Domínio",
          tone: "emerald",
          items: ["Casos de uso", "Regras", "Entidades", "Orquestração"],
        },
        {
          title: "Infraestrutura",
          tone: "amber",
          items: ["Banco", "Filas", "APIs externas", "Persistência"],
        },
      ],
      footer:
        "Separação útil não é a que parece limpa no diagrama, e sim a que reduz dependência errada no código real.",
    },
  },
  {
    slug: "arquitetura-hexagonal",
    order: 4,
    title: "Arquitetura Hexagonal (Ports and Adapters)",
    summary:
      "Protege o núcleo de negócio isolando regras internas de tecnologias externas por meio de portas e adaptadores.",
    explanation:
      "Na prática, a arquitetura hexagonal impede que o domínio seja engolido por framework, banco ou detalhe de transporte. O núcleo define contratos de entrada e saída; adaptadores concretizam esses contratos para HTTP, banco, mensageria ou qualquer outra interface. Isso facilita testes, troca tecnológica e clareza do que realmente é regra de negócio.",
    importance:
      "Esse tema é decisivo para ensinar desacoplamento real. Ele mostra que boa arquitetura não é só quebrar em camadas, mas controlar direção de dependência.",
    keyPoints: [
      "O domínio conhece contratos, não implementações externas.",
      "Banco, fila e HTTP devem ser detalhes plugáveis, não centro do sistema.",
      "A testabilidade melhora muito porque o núcleo pode ser exercitado sem infra real.",
      "Hexagonal exige disciplina de fronteiras, não apenas nomenclatura.",
    ],
    decisions: [
      "Quais portas de entrada e saída o domínio precisa expor.",
      "Quais adaptadores concretos implementam essas portas.",
      "Como impedir dependências invertidas vindas da infraestrutura.",
      "Como desenhar testes focados no comportamento do núcleo.",
    ],
    practicalExample:
      "Um caso de uso de cobrança pode depender de uma porta de pagamento. Hoje ela é implementada por Stripe; amanhã, por outro gateway. O núcleo não precisa mudar sua regra principal.",
    watchouts: [
      "Criar interfaces sem necessidade só para parecer sofisticado.",
      "Deixar framework atravessar o domínio por conveniência.",
      "Confundir hexagonal com excesso de camadas artificiais.",
    ],
    diagram: {
      eyebrow: "Diagrama de fronteiras",
      title: "O domínio no centro, a infraestrutura nas bordas",
      description:
        "O núcleo define contratos; adaptadores traduzem a comunicação com o mundo externo sem contaminar a regra de negócio.",
      columns: [
        {
          title: "Entradas",
          tone: "cyan",
          items: ["HTTP", "CLI", "Fila", "Jobs"],
        },
        {
          title: "Domínio",
          tone: "emerald",
          items: ["Portas", "Casos de uso", "Entidades", "Regras"],
        },
        {
          title: "Saídas",
          tone: "amber",
          items: ["Banco", "Gateway", "Cache", "Mensageria"],
        },
      ],
      footer:
        "A regra principal não deve conhecer detalhe de transporte, persistência ou vendor externo.",
    },
  },
  {
    slug: "clean-architecture",
    order: 5,
    title: "Clean Architecture na Prática",
    summary:
      "Organiza o sistema em círculos de dependência para manter regras de negócio independentes de framework, banco e interface.",
    explanation:
      "Clean Architecture aprofunda a lógica de isolamento. O centro contém entidades e casos de uso; as bordas lidam com entrega, persistência e frameworks. A regra principal é: dependências apontam para dentro. Isso torna o sistema menos refém de ferramentas e mais orientado à permanência do domínio.",
    importance:
      "É uma continuação natural da Hexagonal, mas com linguagem mais explícita sobre casos de uso, interface adapters e framework drivers. Ajuda a equipe a distinguir o que é coração do produto e o que é mecanismo de entrega.",
    keyPoints: [
      "As camadas internas não devem importar elementos das camadas externas.",
      "Casos de uso concentram regras de aplicação e orquestração.",
      "Framework é detalhe, não fundação conceitual do produto.",
      "Quanto mais estável é uma regra, mais próxima do centro ela deveria estar.",
    ],
    decisions: [
      "Separar entidades, use cases, adapters e frameworks.",
      "Definir boundaries claros de entrada e saída.",
      "Impedir vazamento de ORM, controller e detalhes de transporte para dentro do domínio.",
      "Equilibrar pureza arquitetural com pragmatismo do projeto.",
    ],
    practicalExample:
      "Num sistema de reservas, o caso de uso 'confirmar reserva' deve funcionar mesmo que a entrada venha de REST hoje e gRPC amanhã. O comportamento central não depende do canal.",
    watchouts: [
      "Transformar arquitetura em burocracia sem ganho real.",
      "Criar abstrações demais para sistemas pequenos e estáveis.",
      "Fingir independência enquanto o framework domina todas as decisões internas.",
    ],
    diagram: {
      eyebrow: "Diagrama de dependência",
      title: "A direção da dependência define a saúde da arquitetura",
      description:
        "Quanto mais para dentro, mais estável e estratégica é a regra; quanto mais para fora, mais volátil e tecnológica ela tende a ser.",
      columns: [
        {
          title: "Camadas externas",
          tone: "cyan",
          items: ["Framework", "UI", "DB", "Drivers"],
        },
        {
          title: "Adaptadores",
          tone: "amber",
          items: ["Presenters", "Gateways", "Controllers", "Mappers"],
        },
        {
          title: "Centro",
          tone: "emerald",
          items: ["Use cases", "Entidades", "Políticas", "Regras"],
        },
      ],
      footer:
        "O ganho real aparece quando mudanças externas deixam de redesenhar o núcleo do negócio.",
    },
  },
  {
    slug: "rest-vs-graphql",
    order: 6,
    title: "REST vs GraphQL: Impactos na Estrutura do Sistema",
    summary:
      "REST e GraphQL são estilos de exposição de dados com implicações diferentes em design de APIs, versionamento, caching e acoplamento entre cliente e servidor.",
    explanation:
      "REST organiza recursos e operações por endpoints. GraphQL concentra acesso em um esquema consultável, permitindo que o cliente peça exatamente os dados de que precisa. O ganho de flexibilidade do GraphQL vem com novas preocupações de segurança, profundidade de consulta, caching e observabilidade. REST costuma ser mais simples de operar e padronizar; GraphQL tende a brilhar quando há muitos consumidores com necessidades distintas.",
    importance:
      "A escolha entre essas abordagens afeta diretamente o desenho do backend, a modelagem de dados, a experiência do frontend e a capacidade de governança da API.",
    keyPoints: [
      "REST favorece simplicidade e alinhamento com semântica HTTP.",
      "GraphQL reduz overfetching e underfetching em interfaces complexas.",
      "Caching em REST costuma ser mais direto; em GraphQL exige mais estratégia.",
      "A governança do esquema é tão importante quanto a implementação.",
    ],
    decisions: [
      "Avaliar quantidade de consumidores e diversidade de consultas.",
      "Definir limites de consulta, autenticação e custo por request.",
      "Planejar versionamento, depreciação e observabilidade da API.",
      "Escolher onde a flexibilidade compensa a complexidade extra.",
    ],
    practicalExample:
      "Um painel administrativo com muitas telas e filtros pode ganhar produtividade com GraphQL. Já uma API pública simples e bem cacheável para parceiros costuma funcionar melhor em REST.",
    watchouts: [
      "Adotar GraphQL sem disciplina de schema e segurança.",
      "Criar REST inconsistente, com endpoints que não respeitam recursos e semântica HTTP.",
      "Misturar estilos sem critério nem estratégia de consumo.",
    ],
    diagram: {
      eyebrow: "Diagrama de API",
      title: "Duas formas de expor informação para clientes",
      description:
        "REST prioriza recursos e endpoints; GraphQL prioriza consulta flexível sobre um esquema central.",
      columns: [
        {
          title: "REST",
          tone: "cyan",
          items: ["Endpoints", "Recursos", "HTTP nativo", "Cache direto"],
        },
        {
          title: "Cliente",
          tone: "slate",
          items: ["Web", "Mobile", "Painel", "Integrações"],
        },
        {
          title: "GraphQL",
          tone: "emerald",
          items: ["Schema", "Resolvers", "Consulta flexível", "Seleção precisa"],
        },
      ],
      footer:
        "A melhor escolha depende do perfil de consumo e da capacidade de governar a interface.",
    },
  },
  {
    slug: "event-driven-architecture",
    order: 7,
    title: "Arquitetura Orientada a Eventos (Event-Driven Architecture)",
    summary:
      "Componentes publicam e consomem eventos, permitindo desacoplamento temporal e comunicação assíncrona.",
    explanation:
      "Em EDA, um serviço não precisa chamar outro de forma síncrona para disparar uma ação. Ele publica um evento, como 'pedido confirmado', e outros componentes reagem conforme suas próprias responsabilidades. Essa abordagem melhora desacoplamento e escalabilidade, mas exige atenção a idempotência, rastreamento, consistência eventual e tratamento de falhas em cadeia.",
    importance:
      "Esse tema é central para sistemas distribuídos modernos, integrações empresariais, processamento em tempo real e arquiteturas resilientes.",
    keyPoints: [
      "Eventos representam fatos que ocorreram no sistema.",
      "Produtor e consumidor podem evoluir com menos dependência direta.",
      "Consistência eventual vira parte do desenho arquitetural.",
      "Observabilidade passa a ser requisito estrutural, não luxo operacional.",
    ],
    decisions: [
      "Escolher entre broker, streaming ou fila conforme o caso.",
      "Definir contratos de evento e estratégia de versionamento.",
      "Planejar reprocessamento, idempotência e tratamento de duplicidade.",
      "Garantir rastreabilidade entre eventos e efeitos de negócio.",
    ],
    practicalExample:
      "Após um pagamento aprovado, o sistema pode publicar um evento que aciona estoque, faturamento, notificação e analytics sem criar chamadas síncronas em cascata.",
    watchouts: [
      "Transformar tudo em evento sem necessidade real.",
      "Publicar eventos mal nomeados ou sem contrato estável.",
      "Ignorar ordem, replay e comportamento em falhas parciais.",
    ],
    diagram: {
      eyebrow: "Diagrama assíncrono",
      title: "Produtores publicam fatos; consumidores reagem",
      description:
        "O broker desacopla temporalmente o sistema e distribui eventos para múltiplas responsabilidades.",
      columns: [
        {
          title: "Produtores",
          tone: "cyan",
          items: ["Pedidos", "Pagamentos", "Cadastro", "Estoque"],
        },
        {
          title: "Broker / Stream",
          tone: "amber",
          items: ["Tópicos", "Filas", "Entrega", "Replay"],
        },
        {
          title: "Consumidores",
          tone: "emerald",
          items: ["Notificação", "Analytics", "Faturamento", "Auditoria"],
        },
      ],
      footer:
        "Desacoplamento cresce, mas a complexidade de consistência e rastreamento cresce junto.",
    },
  },
  {
    slug: "serverless",
    order: 8,
    title: "Arquitetura Serverless",
    summary:
      "Executa funções sob demanda em plataformas de nuvem, reduzindo gestão direta de servidores e permitindo elasticidade automática.",
    explanation:
      "Serverless não significa ausência de servidores; significa que a infraestrutura operacional deixa de ser preocupação principal da equipe. Em vez de administrar hosts, a equipe se concentra em funções, eventos, integrações e custos por invocação. O modelo pode acelerar entrega e reduzir esforço operacional, mas introduz limites de tempo, cold starts, observabilidade específica e forte dependência da plataforma escolhida.",
    importance:
      "Esse tema mostra como decisões arquiteturais também dependem de modelo operacional e econômico, não apenas de organização de código.",
    keyPoints: [
      "Escalonamento ocorre automaticamente conforme demanda.",
      "Modelo de custo tende a acompanhar uso real.",
      "A arquitetura precisa considerar latência de inicialização e limites da plataforma.",
      "Eventos e integrações passam a ser parte natural do desenho.",
    ],
    decisions: [
      "Identificar fluxos adequados para execução sob demanda.",
      "Separar funções curtas de processos longos ou stateful.",
      "Planejar observabilidade, segurança e rollback em ambiente gerenciado.",
      "Avaliar lock-in do provedor e impacto no futuro da solução.",
    ],
    practicalExample:
      "Uma API de upload, processamento de imagem e envio de notificação é um bom candidato a serverless quando a demanda é variável e o tempo de execução é curto.",
    watchouts: [
      "Usar serverless para workloads inadequados, muito persistentes ou fortemente stateful.",
      "Subestimar custo em alto volume contínuo.",
      "Ignorar impacto de cold start em fluxos sensíveis a latência.",
    ],
    diagram: {
      eyebrow: "Diagrama de execução sob demanda",
      title: "Eventos acionam funções independentes na nuvem",
      description:
        "A lógica entra em execução apenas quando um gatilho ocorre, e a plataforma cuida da alocação de infraestrutura.",
      columns: [
        {
          title: "Gatilhos",
          tone: "cyan",
          items: ["HTTP", "Upload", "Cron", "Eventos"],
        },
        {
          title: "Funções",
          tone: "emerald",
          items: ["Processar", "Validar", "Transformar", "Notificar"],
        },
        {
          title: "Serviços gerenciados",
          tone: "amber",
          items: ["Storage", "Banco", "Fila", "Observabilidade"],
        },
      ],
      footer:
        "A simplicidade operacional cresce, mas a disciplina arquitetural sobre limites e dependências continua necessária.",
    },
  },
  {
    slug: "containers-e-orquestracao",
    order: 9,
    title: "Containers e Orquestração na Arquitetura Moderna",
    summary:
      "Containers empacotam aplicações com dependências; orquestradores coordenam execução, escalonamento, recuperação e distribuição.",
    explanation:
      "Containerização resolve portabilidade e consistência de ambiente. Orquestração resolve como essas unidades vão viver em escala real: rede, balanceamento, health checks, autoscaling, rollout e rollback. O valor arquitetural aqui é operacional: reduzir atrito entre desenvolvimento e produção e permitir que o sistema cresça com previsibilidade.",
    importance:
      "Não basta desenhar serviços; é preciso garantir que eles sejam implantados, observados e mantidos de forma coerente em ambientes reais.",
    keyPoints: [
      "Containers padronizam execução e empacotamento.",
      "Orquestradores automatizam ciclo de vida da aplicação distribuída.",
      "Escalabilidade depende tanto da arquitetura lógica quanto do modelo de operação.",
      "Segurança, secrets e networking não podem ser deixados para depois.",
    ],
    decisions: [
      "Definir como os serviços serão empacotados e configurados.",
      "Padronizar health checks, readiness e rollout.",
      "Separar stateful e stateless conforme comportamento do sistema.",
      "Planejar observabilidade e governança da plataforma.",
    ],
    practicalExample:
      "Uma plataforma de cursos com API, worker, fila e frontend se beneficia de containers para manter ambientes consistentes e de orquestração para escalar apenas os componentes mais demandados.",
    watchouts: [
      "Tratar container como sinônimo de boa arquitetura.",
      "Subir Kubernetes para uma necessidade que ainda é simples demais.",
      "Ignorar custos de operação, segurança e conhecimento de plataforma.",
    ],
    diagram: {
      eyebrow: "Diagrama operacional",
      title: "Containers empacotam; orquestração coordena",
      description:
        "O ganho aparece quando múltiplas unidades precisam ser mantidas disponíveis, atualizadas e observáveis sem intervenção manual constante.",
      columns: [
        {
          title: "Container",
          tone: "cyan",
          items: ["App", "Dependências", "Config", "Portabilidade"],
        },
        {
          title: "Orquestração",
          tone: "emerald",
          items: ["Escala", "Saúde", "Rede", "Rollout"],
        },
        {
          title: "Ambiente real",
          tone: "amber",
          items: ["Cluster", "Tráfego", "Falhas", "Observabilidade"],
        },
      ],
      footer:
        "Arquitetura moderna não separa desenho do sistema da estratégia de implantação.",
    },
  },
  {
    slug: "alta-disponibilidade",
    order: 10,
    title: "Arquitetura para Alta Disponibilidade",
    summary:
      "Alta disponibilidade busca manter o sistema operacional mesmo diante de falhas, por meio de redundância, balanceamento, failover e automação de recuperação.",
    explanation:
      "Alta disponibilidade não significa eliminar falhas; significa projetar o sistema para continuar útil quando elas acontecerem. Isso exige replicação, distribuição de carga, isolamento de componentes críticos, failover, monitoramento e uma estratégia de recuperação alinhada ao negócio. O custo sobe, então a decisão precisa ser consciente.",
    importance:
      "Esse tema liga arquitetura a continuidade operacional. Em muitos domínios, indisponibilidade significa perda de receita, reputação ou conformidade.",
    keyPoints: [
      "A disponibilidade depende de aplicação, dados, rede e operação.",
      "Redundância sem observabilidade não resolve o problema completo.",
      "Nem tudo precisa de 99,99%; o nível deve refletir impacto de negócio.",
      "MTTR e detecção rápida são tão importantes quanto prevenção.",
    ],
    decisions: [
      "Definir componentes críticos e tolerância de indisponibilidade.",
      "Escolher estratégias de replicação, balanceamento e failover.",
      "Automatizar recuperação e checagem de saúde.",
      "Testar falhas em vez de assumir que a redundância basta.",
    ],
    practicalExample:
      "Em uma fintech, a API de saldo e pagamento pode exigir múltiplas zonas, bancos replicados, filas redundantes e rotas de contingência para manter operação mesmo sob falhas parciais.",
    watchouts: [
      "Buscar alta disponibilidade sem medir custo e necessidade real.",
      "Depender de um único banco, fila ou gateway enquanto o resto é redundante.",
      "Nunca testar cenários de falha em ambiente controlado.",
    ],
    diagram: {
      eyebrow: "Diagrama de resiliência",
      title: "Eliminar ponto único de falha é um princípio central",
      description:
        "A disponibilidade cresce quando o sistema distribui carga, replica recursos críticos e automatiza recuperação.",
      columns: [
        {
          title: "Entrada",
          tone: "cyan",
          items: ["DNS", "WAF", "Load balancer", "Roteamento"],
        },
        {
          title: "Aplicação",
          tone: "emerald",
          items: ["Instância A", "Instância B", "Health check", "Auto-recovery"],
        },
        {
          title: "Dados",
          tone: "amber",
          items: ["Replica", "Backup", "Failover", "Persistência"],
        },
      ],
      footer:
        "Alta disponibilidade é uma propriedade emergente do sistema inteiro, não de um componente isolado.",
    },
  },
  {
    slug: "escalabilidade-vertical-horizontal",
    order: 11,
    title: "Escalabilidade: Vertical vs Horizontal",
    summary:
      "Escala vertical aumenta recursos de uma máquina; escala horizontal adiciona novas instâncias distribuindo a carga.",
    explanation:
      "Escalar verticalmente costuma ser mais simples e rápido, mas encontra limites físicos e pode concentrar risco em um único ponto. Escalar horizontalmente distribui o trabalho, melhora resiliência e permite crescimento mais elástico, porém exige balanceamento, consistência, coordenação e arquitetura preparada para distribuição.",
    importance:
      "Esse tema ajuda a mostrar que crescimento técnico não é apenas 'colocar mais máquina', e sim uma escolha estrutural com impacto em custo, confiabilidade e desenho do software.",
    keyPoints: [
      "Scale up é simples, mas limitado.",
      "Scale out pede mais engenharia e automação.",
      "Nem todo componente precisa escalar da mesma forma.",
      "Latência e estado influenciam a capacidade de distribuir carga.",
    ],
    decisions: [
      "Identificar gargalos reais antes de escalar.",
      "Separar componentes estateless dos stateful.",
      "Definir estratégia de balanceamento e persistência de sessão quando necessário.",
      "Tratar métricas de uso como base para escolha arquitetural.",
    ],
    practicalExample:
      "Um banco relacional pode ganhar fôlego inicial com mais CPU e RAM, mas o frontend e a camada de API tendem a escalar melhor horizontalmente com múltiplas instâncias atrás de um balanceador.",
    watchouts: [
      "Tentar resolver toda dor de performance só com hardware.",
      "Distribuir instâncias sem planejar cache, sessão e dados compartilhados.",
      "Escalar antes de entender a causa do gargalo.",
    ],
    diagram: {
      eyebrow: "Diagrama de crescimento",
      title: "Duas estratégias de escala com custos e limites diferentes",
      description:
        "A melhor abordagem depende do componente, do volume, do estado compartilhado e do custo operacional aceitável.",
      columns: [
        {
          title: "Vertical",
          tone: "cyan",
          items: ["Mais CPU", "Mais RAM", "Mais disco", "Mesma instância"],
        },
        {
          title: "Avaliação",
          tone: "slate",
          items: ["Custo", "Limite", "Risco", "Complexidade"],
        },
        {
          title: "Horizontal",
          tone: "emerald",
          items: ["Mais nós", "Balanceamento", "Resiliência", "Elasticidade"],
        },
      ],
      footer:
        "Arquitetura escalável é a que cresce sem colapsar qualidade, não a que apenas consome mais recurso.",
    },
  },
  {
    slug: "mvc-mvvm",
    order: 12,
    title: "Padrões Arquiteturais Clássicos (MVC, MVVM)",
    summary:
      "MVC e MVVM organizam responsabilidades entre dados, interface e coordenação da interação, melhorando separação de interesses.",
    explanation:
      "Esses padrões ajudaram a consolidar disciplina estrutural em aplicações com interface. MVC separa model, view e controller. MVVM cria uma camada intermediária voltada à ligação entre estado e interface reativa. Ambos tentam evitar mistura entre renderização, regras e eventos do usuário, mas funcionam melhor quando aplicados com clareza de responsabilidade.",
    importance:
      "Mesmo em stacks modernas, os princípios por trás desses padrões seguem relevantes para evitar UI inchada, lógica espalhada e baixa testabilidade.",
    keyPoints: [
      "Padrões clássicos ainda ajudam a entender organização de frontend e aplicações web.",
      "O ganho central é separação de responsabilidades.",
      "Eles não substituem arquitetura global do sistema, mas ajudam a estruturar partes dele.",
      "A escolha precisa dialogar com a stack e com o modelo de interação da interface.",
    ],
    decisions: [
      "Definir onde estado, eventos e regras de apresentação vivem.",
      "Evitar que a camada de interface concentre regras de negócio.",
      "Padronizar forma de comunicação entre componentes visuais e dados.",
      "Adaptar o padrão ao framework, sem forçar analogias ruins.",
    ],
    practicalExample:
      "Em um painel administrativo, a view mostra dados, o view model prepara estados e comandos, e as regras de negócio continuam em camadas apropriadas do backend.",
    watchouts: [
      "Colocar tudo no controller ou tudo no view model.",
      "Misturar regra de negócio com lógica puramente visual.",
      "Usar o nome do padrão sem respeitar a separação que ele exige.",
    ],
    diagram: {
      eyebrow: "Diagrama de responsabilidades",
      title: "Dados, interface e coordenação precisam de fronteiras claras",
      description:
        "Padrões clássicos organizam a interação entre o que o usuário vê, o estado da aplicação e a lógica de coordenação.",
      columns: [
        {
          title: "Model",
          tone: "emerald",
          items: ["Estado", "Dados", "Regras", "Consistência"],
        },
        {
          title: "Controller / ViewModel",
          tone: "cyan",
          items: ["Eventos", "Fluxo", "Comandos", "Adaptação"],
        },
        {
          title: "View",
          tone: "amber",
          items: ["Tela", "Renderização", "Interação", "Feedback"],
        },
      ],
      footer:
        "Quando as fronteiras quebram, a interface vira um acúmulo de decisões que ninguém quer manter.",
    },
  },
  {
    slug: "ddd",
    order: 13,
    title: "Domain-Driven Design (DDD)",
    summary:
      "DDD coloca o domínio do negócio no centro do sistema e busca alinhar linguagem, modelo e software às regras reais da organização.",
    explanation:
      "DDD não é apenas uma coleção de termos como entidade e agregado. A essência está em construir o software a partir de uma compreensão profunda do negócio, com linguagem ubíqua compartilhada entre equipe técnica e especialistas de domínio. Isso ajuda a definir limites melhores entre módulos, reduzir ambiguidade e projetar sistemas coerentes com a realidade empresarial.",
    importance:
      "Em sistemas complexos, a maior dificuldade muitas vezes não é tecnológica, mas semântica. DDD ajuda a atacar esse problema diretamente.",
    keyPoints: [
      "O modelo deve refletir o domínio, não a estrutura acidental do banco ou do framework.",
      "Bounded contexts evitam que um mesmo termo signifique coisas incompatíveis no sistema todo.",
      "Linguagem ubíqua melhora comunicação e reduz ruído entre negócio e tecnologia.",
      "DDD é especialmente valioso em domínios ricos e mutáveis.",
    ],
    decisions: [
      "Definir contextos delimitados com vocabulário próprio.",
      "Identificar entidades, value objects, agregados e eventos de domínio quando fizer sentido.",
      "Separar integrações entre contextos com contratos claros.",
      "Evitar modelo único universal que tenta representar tudo ao mesmo tempo.",
    ],
    practicalExample:
      "Em uma empresa de educação, 'matrícula', 'turma', 'aluno ativo' e 'trancamento' possuem significados específicos. O sistema precisa refletir essa semântica em vez de tratá-los como meros registros genéricos.",
    watchouts: [
      "Adotar vocabulário de DDD sem trabalho real de descoberta de domínio.",
      "Criar um único domínio gigantesco sem bounded contexts.",
      "Transformar DDD em burocracia conceitual para sistemas simples.",
    ],
    diagram: {
      eyebrow: "Diagrama de domínio",
      title: "O domínio precisa organizar a conversa e o software",
      description:
        "DDD aproxima especialistas do negócio e equipe técnica para formar modelos coerentes e contextos bem definidos.",
      columns: [
        {
          title: "Negócio",
          tone: "cyan",
          items: ["Termos", "Regras", "Eventos", "Exceções"],
        },
        {
          title: "Modelo de domínio",
          tone: "emerald",
          items: ["Entidades", "Agregados", "Value objects", "Linguagem ubíqua"],
        },
        {
          title: "Sistema",
          tone: "amber",
          items: ["Módulos", "Contextos", "Integrações", "Fluxos"],
        },
      ],
      footer:
        "Quando o modelo não conversa com o negócio, a arquitetura fica tecnicamente bonita e semanticamente errada.",
    },
  },
  {
    slug: "seguranca-da-informacao",
    order: 14,
    title: "Arquitetura e Segurança da Informação",
    summary:
      "Segurança precisa ser desenhada como parte da arquitetura, envolvendo autenticação, autorização, criptografia, segmentação e defesa em profundidade.",
    explanation:
      "Sistemas seguros não nascem de um middleware isolado. A arquitetura precisa considerar identidade, menor privilégio, proteção de dados em trânsito e repouso, segregação de responsabilidades, logs auditáveis, rotação de segredos e resposta a incidentes. Segurança é uma propriedade transversal que atravessa todos os componentes.",
    importance:
      "Esse tema impede a visão perigosa de que segurança é uma etapa de homologação. Em sistemas reais, ela molda a própria estrutura da solução.",
    keyPoints: [
      "Autenticação responde quem é o usuário; autorização responde o que ele pode fazer.",
      "Segurança em profundidade evita dependência de um único mecanismo.",
      "Arquitetura precisa proteger dados, acesso e superfície de ataque.",
      "Observabilidade e auditoria também são parte da defesa.",
    ],
    decisions: [
      "Definir modelo de identidade e controle de acesso.",
      "Separar zonas de confiança e limitar exposição de componentes.",
      "Padronizar gestão de segredos e criptografia.",
      "Projetar trilhas de auditoria e monitoramento de comportamento suspeito.",
    ],
    practicalExample:
      "Uma aplicação de saúde precisa separar dados clínicos, autenticação forte, trilhas de acesso, criptografia e políticas de autorização por papel para atender exigências regulatórias.",
    watchouts: [
      "Confiar apenas em proteção de borda e ignorar segurança interna.",
      "Guardar segredos no código ou em variáveis mal gerenciadas.",
      "Misturar permissões de negócio e permissões técnicas de forma caótica.",
    ],
    diagram: {
      eyebrow: "Diagrama de defesa em profundidade",
      title: "Segurança distribuída por múltiplas camadas",
      description:
        "A proteção real aparece quando identidade, rede, dados e observabilidade trabalham juntos em vez de depender de uma única barreira.",
      columns: [
        {
          title: "Acesso",
          tone: "cyan",
          items: ["Login", "MFA", "Sessão", "RBAC/ABAC"],
        },
        {
          title: "Proteção",
          tone: "emerald",
          items: ["Criptografia", "Segredos", "Validação", "Políticas"],
        },
        {
          title: "Resposta",
          tone: "amber",
          items: ["Logs", "Alertas", "Auditoria", "Rastreamento"],
        },
      ],
      footer:
        "Segurança madura nasce de arquitetura consciente, não de correção tardia de vulnerabilidades.",
    },
  },
  {
    slug: "cap",
    order: 15,
    title: "Sistemas Distribuídos e o Teorema CAP",
    summary:
      "CAP mostra que, diante de partições de rede, um sistema distribuído não consegue maximizar ao mesmo tempo consistência e disponibilidade.",
    explanation:
      "O teorema CAP não é uma tabela para decorar, e sim um instrumento para entender trade-offs inevitáveis. Em redes distribuídas, partições acontecem. Quando isso ocorre, o sistema precisa privilegiar consistência forte ou disponibilidade contínua. Isso afeta desenho de banco, fila, APIs, recuperação de falhas e comportamento esperado pelo negócio.",
    importance:
      "Esse tema ajuda a equipe a parar de prometer tudo ao mesmo tempo em sistemas distribuídos. Ele disciplina a conversa sobre escolhas reais.",
    keyPoints: [
      "Partição de rede não é hipótese remota; é condição arquitetural relevante.",
      "Disponibilidade e consistência forte entram em tensão quando há falhas de comunicação.",
      "A decisão depende do tipo de dado e do impacto de inconsistência temporária.",
      "CAP não resolve sozinho toda a arquitetura, mas organiza decisões críticas.",
    ],
    decisions: [
      "Mapear quais fluxos exigem consistência forte e quais suportam eventual consistency.",
      "Definir estratégia de leitura, escrita e reconciliação.",
      "Alinhar comportamento técnico com expectativa de negócio.",
      "Projetar experiência do usuário considerando atrasos e convergência.",
    ],
    practicalExample:
      "Um sistema bancário tende a priorizar consistência em saldos e liquidação; já contadores analíticos e dashboards podem tolerar atualização eventual para manter disponibilidade.",
    watchouts: [
      "Tratar eventual consistency como erro quando ela foi escolha deliberada.",
      "Prometer disponibilidade total e consistência forte irrestrita no mesmo cenário.",
      "Esquecer de explicar esses trade-offs para stakeholders não técnicos.",
    ],
    diagram: {
      eyebrow: "Diagrama de trade-off",
      title: "Quando a rede falha, a arquitetura precisa escolher prioridade",
      description:
        "O sistema distribuído precisa equilibrar consistência e disponibilidade sob a realidade de partições.",
      columns: [
        {
          title: "Consistência",
          tone: "emerald",
          items: ["Mesmo dado", "Confirmação", "Leitura confiável", "Menos divergência"],
        },
        {
          title: "Partição",
          tone: "slate",
          items: ["Rede instável", "Nó isolado", "Timeout", "Latência"],
        },
        {
          title: "Disponibilidade",
          tone: "cyan",
          items: ["Resposta contínua", "Serviço ativo", "Menos bloqueio", "Maior tolerância"],
        },
      ],
      footer:
        "Arquitetura madura trata CAP como decisão de produto e operação, não apenas como conceito teórico.",
    },
  },
  {
    slug: "c4-model",
    order: 16,
    title: "Documentação Arquitetural com C4 Model",
    summary:
      "O C4 Model organiza a documentação em níveis de abstração: contexto, containers, componentes e código.",
    explanation:
      "Muitos projetos sofrem porque a documentação existe demais em detalhe inútil e de menos na visão sistêmica. O C4 organiza a leitura da arquitetura para diferentes públicos: quem precisa entender o sistema no ecossistema, quem precisa ver containers, quem precisa navegar em componentes e quem precisa se aprofundar em código. Isso reduz ruído e melhora comunicação técnica.",
    importance:
      "Arquitetura não se sustenta sem comunicação. O C4 é um dos modelos mais úteis para documentar decisões sem cair em excesso ornamental.",
    keyPoints: [
      "Cada nível responde a uma pergunta diferente sobre o sistema.",
      "A documentação deve servir múltiplos públicos sem misturar tudo em um único diagrama.",
      "A clareza de nomenclatura é tão importante quanto a ferramenta usada.",
      "Documentação viva vale mais do que diagrama bonito e esquecido.",
    ],
    decisions: [
      "Definir o conjunto mínimo de diagramas realmente úteis.",
      "Padronizar nomes de containers, componentes e integrações.",
      "Atualizar documentação junto com evolução do sistema.",
      "Relacionar diagramas a ADRs e decisões relevantes do projeto.",
    ],
    practicalExample:
      "Uma plataforma educacional pode ter um diagrama de contexto mostrando alunos, professores, gateway de pagamento e serviços externos; depois um diagrama de containers detalhando frontend, API, fila e banco.",
    watchouts: [
      "Produzir C4 apenas como entrega estética sem manutenção.",
      "Misturar níveis de abstração no mesmo desenho.",
      "Documentar componentes inexistentes ou defasados.",
    ],
    diagram: {
      eyebrow: "Diagrama de documentação",
      title: "Quatro níveis para enxergar o mesmo sistema",
      description:
        "O C4 ajuda a conversar com públicos diferentes sem perder coerência entre visão macro e detalhe técnico.",
      columns: [
        {
          title: "Contexto",
          tone: "cyan",
          items: ["Sistema", "Atores", "Dependências", "Fronteiras"],
        },
        {
          title: "Containers",
          tone: "emerald",
          items: ["Web", "API", "Fila", "Banco"],
        },
        {
          title: "Componentes e Código",
          tone: "amber",
          items: ["Módulos", "Classes", "Responsabilidades", "Detalhes"],
        },
      ],
      footer:
        "A qualidade da documentação cresce quando cada diagrama responde a uma pergunta concreta.",
    },
  },
  {
    slug: "sistemas-legados",
    order: 17,
    title: "Recuperação de Arquitetura em Sistemas Legados",
    summary:
      "Recuperar arquitetura é entender a estrutura real de um sistema antigo quando a documentação está ausente, incompleta ou mentirosa.",
    explanation:
      "Sistemas legados raramente chegam com mapas claros. Muitas vezes a equipe precisa reconstruir a arquitetura a partir de código, dependências, logs, banco de dados, infraestrutura e comportamento em produção. O objetivo não é apenas desenhar o passado, mas identificar riscos, acoplamentos críticos e caminhos seguros de evolução.",
    importance:
      "Sem recuperar a arquitetura real, qualquer modernização vira aposta. Esse tema é fundamental para projetos de migração e manutenção em ambientes corporativos.",
    keyPoints: [
      "A arquitetura verdadeira costuma estar no código e na operação, não só na documentação antiga.",
      "Mapeamento de dependências ajuda a enxergar fronteiras ocultas.",
      "Logs, tráfego e banco também revelam estrutura do sistema.",
      "A recuperação serve à tomada de decisão, não ao arquivamento passivo.",
    ],
    decisions: [
      "Identificar módulos centrais, integrações e pontos críticos.",
      "Distinguir comportamento essencial de dívida técnica acidental.",
      "Priorizar o que precisa ser isolado antes de migrar.",
      "Documentar o que foi descoberto de modo útil para evolução.",
    ],
    practicalExample:
      "Ao modernizar um ERP antigo, a equipe pode descobrir que o módulo de faturamento depende diretamente de tabelas compartilhadas por estoque e financeiro. Essa descoberta muda completamente o plano de migração.",
    watchouts: [
      "Assumir que o diagrama antigo ainda representa o sistema.",
      "Mexer em componentes críticos sem compreender dependências reais.",
      "Tentar reescrever tudo antes de mapear pontos de acoplamento.",
    ],
    diagram: {
      eyebrow: "Diagrama de investigação",
      title: "Recuperar arquitetura é reconstruir a verdade do sistema",
      description:
        "Código, banco, logs e infraestrutura ajudam a descobrir os blocos reais e as dependências ocultas do legado.",
      columns: [
        {
          title: "Fontes",
          tone: "cyan",
          items: ["Código", "Banco", "Logs", "Deploy"],
        },
        {
          title: "Análise",
          tone: "emerald",
          items: ["Dependências", "Fronteiras", "Acoplamento", "Fluxos"],
        },
        {
          title: "Saída útil",
          tone: "amber",
          items: ["Mapa", "Riscos", "Prioridades", "Plano de evolução"],
        },
      ],
      footer:
        "Modernizar sem recuperar a arquitetura real costuma custar mais do que o tempo economizado no início.",
    },
  },
  {
    slug: "arquiteturas-auto-gerenciaveis",
    order: 18,
    title: "Arquiteturas Auto-Gerenciáveis",
    summary:
      "Sistemas auto-gerenciáveis monitoram, avaliam e ajustam seu comportamento para manter desempenho, disponibilidade e eficiência.",
    explanation:
      "Esse tipo de arquitetura incorpora loops de controle: observa métricas, detecta desvio, decide ação e aplica ajustes automaticamente. Isso aparece em autoescalonamento, circuit breaking, self-healing, roteamento adaptativo e otimização baseada em sinais operacionais. O objetivo é reduzir dependência de intervenção manual contínua em ambientes dinâmicos.",
    importance:
      "Em sistemas distribuídos modernos, a complexidade operacional exige mecanismos que reajam rápido a variações e falhas.",
    keyPoints: [
      "Observação, análise, decisão e ação formam o ciclo central.",
      "Automação sem governança pode amplificar problemas em vez de resolvê-los.",
      "Auto-gerenciamento depende de boas métricas e limites claros.",
      "Esse tema conecta arquitetura, observabilidade e operação.",
    ],
    decisions: [
      "Escolher sinais confiáveis para ativar ajustes automáticos.",
      "Definir limites seguros para escalonamento e recuperação.",
      "Separar automação corretiva de automação destrutiva.",
      "Registrar decisões automáticas para auditoria e debugging.",
    ],
    practicalExample:
      "Uma API com pico variável pode aumentar instâncias sob pressão, reduzir tráfego para dependências instáveis e acionar fallback automaticamente até o serviço downstream se recuperar.",
    watchouts: [
      "Automatizar sem entender causalidade real do problema.",
      "Criar autoescalonamento baseado em métrica ruim.",
      "Deixar loops de automação sem observabilidade ou rollback.",
    ],
    diagram: {
      eyebrow: "Diagrama de controle",
      title: "Observar, decidir e agir faz parte da arquitetura",
      description:
        "Arquiteturas auto-gerenciáveis tratam adaptação como competência do sistema, não só da equipe de operação.",
      columns: [
        {
          title: "Observação",
          tone: "cyan",
          items: ["Logs", "Métricas", "Traces", "Eventos"],
        },
        {
          title: "Decisão",
          tone: "emerald",
          items: ["Políticas", "Thresholds", "Análise", "Automação"],
        },
        {
          title: "Ação",
          tone: "amber",
          items: ["Escalar", "Isolar", "Redirecionar", "Recuperar"],
        },
      ],
      footer:
        "Automação só é inteligente quando opera dentro de regras claras e observáveis.",
    },
  },
  {
    slug: "metricas-arquiteturais",
    order: 19,
    title: "Métricas Arquiteturais: Coesão e Acoplamento",
    summary:
      "Métricas arquiteturais ajudam a avaliar qualidade estrutural, especialmente por meio de coesão interna e acoplamento entre módulos.",
    explanation:
      "Coesão mede o quanto os elementos de um módulo fazem sentido juntos. Acoplamento mede o quanto módulos dependem uns dos outros. Alta coesão e baixo acoplamento são objetivos clássicos porque favorecem compreensão, teste, mudança e isolamento de impacto. Essas métricas não substituem julgamento arquitetural, mas ajudam a enxergar deterioração estrutural antes de ela virar colapso.",
    importance:
      "Sem medida, a arquitetura vira opinião. Métricas permitem discutir estrutura de forma menos subjetiva.",
    keyPoints: [
      "Módulos coesos têm responsabilidade clara.",
      "Acoplamento excessivo propaga mudanças e aumenta fragilidade.",
      "Métricas devem ser interpretadas junto com contexto do domínio.",
      "O valor está em orientar refatoração e decisão, não apenas gerar relatório.",
    ],
    decisions: [
      "Mapear dependências entre módulos e contextos.",
      "Identificar pontos de mudança frequente e alto impacto cruzado.",
      "Redesenhar fronteiras quando responsabilidades estiverem mal agrupadas.",
      "Usar métricas como insumo de arquitetura evolutiva.",
    ],
    practicalExample:
      "Se alterar o módulo de cobrança quebra cadastro, relatório e notificações, provavelmente existe acoplamento estrutural acima do saudável.",
    watchouts: [
      "Perseguir números sem entender o modelo de negócio.",
      "Aceitar baixo acoplamento artificial com excesso de indireção.",
      "Ignorar que alguns módulos naturalmente concentram integração por papel arquitetural.",
    ],
    diagram: {
      eyebrow: "Diagrama de qualidade estrutural",
      title: "Boa arquitetura combina foco interno e independência externa",
      description:
        "Módulos saudáveis mantêm suas responsabilidades bem agrupadas e dependem do mínimo necessário para colaborar com o restante do sistema.",
      columns: [
        {
          title: "Coesão",
          tone: "emerald",
          items: ["Responsabilidade clara", "Mesmo propósito", "Baixa dispersão", "Leitura fácil"],
        },
        {
          title: "Avaliação",
          tone: "slate",
          items: ["Mudança", "Impacto", "Compreensão", "Teste"],
        },
        {
          title: "Acoplamento",
          tone: "cyan",
          items: ["Dependências", "Chamadas cruzadas", "Fragilidade", "Propagação"],
        },
      ],
      footer:
        "Estrutura ruim costuma aparecer primeiro como dificuldade de mudança e só depois como incidente grave.",
    },
  },
  {
    slug: "arquitetura-da-netflix",
    order: 20,
    title: "Estudo de Caso: Arquitetura da Netflix",
    summary:
      "A Netflix se tornou referência por combinar microservices, resiliência, automação, observabilidade e entrega contínua em escala global.",
    explanation:
      "O valor do caso Netflix não está em copiar sua arquitetura, e sim em entender por que ela precisou daquela arquitetura. A empresa opera em grande escala, com demanda global, alta criticidade de disponibilidade, experimentação constante e forte dependência de automação. Isso levou a decisões como decomposição em serviços, automação de recuperação, cultura de observabilidade e engenharia de caos.",
    importance:
      "Estudos de caso mostram que arquitetura é resposta contextual a problemas reais. Eles ajudam a sair do campo puramente teórico.",
    keyPoints: [
      "Escala global exige observabilidade e automação profundas.",
      "Resiliência não depende só de infra, mas de desenho dos serviços.",
      "Entrega contínua em alto volume pede forte padronização operacional.",
      "Nenhuma arquitetura de referência deve ser copiada fora de contexto.",
    ],
    decisions: [
      "Investir em automação e plataforma antes de multiplicar serviços.",
      "Desenhar para falhas como condição normal.",
      "Monitorar comportamento em produção com granularidade real.",
      "Escolher padrões que respondam ao contexto, não à fama do caso.",
    ],
    practicalExample:
      "A lição aplicável para uma empresa menor não é reproduzir toda a complexidade da Netflix, mas adotar princípios como observabilidade, isolamento de falhas e clareza de responsabilidade entre componentes.",
    watchouts: [
      "Usar Netflix como desculpa para superengenharia em projetos pequenos.",
      "Copiar arquitetura sem cultura, times e operação compatíveis.",
      "Confundir escala extrema com requisito padrão de qualquer produto.",
    ],
    diagram: {
      eyebrow: "Diagrama de caso real",
      title: "Escala global pede arquitetura, plataforma e cultura trabalhando juntas",
      description:
        "O caso Netflix mostra a combinação entre serviços, automação, observabilidade e resiliência como resposta a um contexto extremo de entrega contínua.",
      columns: [
        {
          title: "Produto global",
          tone: "cyan",
          items: ["Milhões de usuários", "Streaming", "Experimentação", "Picos"],
        },
        {
          title: "Capacidades",
          tone: "emerald",
          items: ["Microservices", "Observabilidade", "Automação", "Resiliência"],
        },
        {
          title: "Resultado",
          tone: "amber",
          items: ["Escala", "Disponibilidade", "Velocidade", "Evolução contínua"],
        },
      ],
      footer:
        "A maior lição não é a tecnologia isolada, e sim a coerência entre contexto, arquitetura e operação.",
    },
  },
];

export function getArquiteturaSoftwareArticle(slug) {
  return arquiteturaSoftwareArticles.find((item) => item.slug === slug) || null;
}
