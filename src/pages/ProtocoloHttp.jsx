import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import BackButton from "../components/BackButton";
import httpCycleImage from "../assets/images/http-cycle-diagram.svg";
import httpStatusImage from "../assets/images/http-status-map.svg";

const CONTENT = {
  pt: {
    back: "Voltar para Disciplinas",
    title: "Protocolo HTTP: Verbos e Status Codes",
    subtitle:
      "Disciplina prática para entender como cliente e servidor se comunicam, quais verbos usar e como interpretar respostas HTTP.",
    introTitle: "Introdução",
    intro:
      "HTTP é o protocolo que sustenta a comunicação entre aplicações web. Dominar seu fluxo, verbos e códigos de retorno é essencial para construir APIs confiáveis, depurar integrações e responder rapidamente a incidentes em produção.",
    objectiveTitle: "Objetivos da disciplina",
    objectiveSubtitle:
      "Resultados esperados ao concluir esta disciplina: domínio conceitual, leitura técnica de respostas e capacidade de diagnóstico em cenários reais.",
    objectives: [
      "Compreender o ciclo completo de requisição e resposta, da camada cliente até a aplicação.",
      "Selecionar corretamente os verbos HTTP conforme intenção da operação (leitura, criação, atualização e remoção).",
      "Interpretar status codes por classe e por cenário real, diferenciando erros de cliente e de servidor.",
      "Aplicar boas práticas de diagnóstico usando headers, payload, contexto de negócio e checkpoints do fluxo.",
    ],
    flowTitle: "Fluxo HTTP em 6 passos",
    flowSubtitle:
      "Visão macro do caminho de uma chamada HTTP, desde o cliente até o retorno para a interface.",
    flow: [
      "Cliente (browser/app) envia requisição para uma URL.",
      "A requisição leva método (GET, POST...), headers, parâmetros e, quando necessário, body.",
      "Servidor recebe, valida autenticação/autorização e processa a regra de negócio.",
      "Servidor consulta/atualiza dados (banco, serviços externos, cache etc.).",
      "Servidor devolve resposta com status code, headers e body.",
      "Cliente interpreta status/body e atualiza a interface para o usuário.",
    ],
    laneTitle: "Diagrama por trilhas (Request e Response)",
    laneSubtitle:
      "Separação visual para entender com clareza o que acontece no envio da requisição e no retorno da resposta.",
    requestLane: {
      title: "Trilha da requisição (Client -> Server)",
      steps: [
        "Usuário executa uma ação (clique, envio de formulário, chamada de API).",
        "Cliente monta requisição HTTP com método, URL, headers e body (quando houver).",
        "Camada de borda recebe a requisição (DNS/TLS, CDN/WAF/Load Balancer).",
        "Gateway/roteador envia para o endpoint correto na aplicação.",
      ],
    },
    responseLane: {
      title: "Trilha da resposta (Server -> Client)",
      steps: [
        "Aplicação valida payload, autenticação/autorização e regras de negócio.",
        "Camada de domínio processa e consulta recursos (banco, cache, serviços externos).",
        "Servidor monta resposta HTTP com status code, headers e body padronizado.",
        "Cliente interpreta o retorno e atualiza interface, estado e tratamento de erro.",
      ],
    },
    decisionTitle: "Decisão de status code no servidor",
    decisionSubtitle:
      "Depois do processamento, o servidor escolhe a classe de resposta conforme o resultado da validação e da execução.",
    checkpointsTitle: "Checkpoints do fluxo (onde normalmente falha)",
    checkpointsSubtitle:
      "Pontos de verificação para depuração rápida: o que validar em cada etapa e quais classes de erro observar.",
    checkpoints: [
      {
        stage: "Borda (DNS/TLS/CDN/WAF)",
        ok: "200/3xx quando a rota é alcançada.",
        fail: "4xx em bloqueios de segurança (ex.: 403).",
      },
      {
        stage: "Entrada e validação",
        ok: "Payload válido segue processamento.",
        fail: "400 (formato inválido), 422 (regra de validação).",
      },
      {
        stage: "Autenticação e autorização",
        ok: "Token/permissão corretos liberam acesso.",
        fail: "401 (não autenticado), 403 (sem permissão).",
      },
      {
        stage: "Regra de negócio",
        ok: "Executa operação com sucesso (2xx).",
        fail: "404 (recurso não encontrado), 409 (conflito de estado).",
      },
      {
        stage: "Infra/dependências",
        ok: "Integrações respondem dentro do esperado.",
        fail: "5xx (falha interna, timeout, upstream indisponível).",
      },
    ],
    practicalTitle: "Exemplo prático completo",
    practicalSubtitle:
      "Cenário: atualização de perfil com PATCH. Observe request e response no mesmo fluxo.",
    requestLabel: "Request",
    responseLabel: "Response",
    requestExample:
      "PATCH /api/usuarios/42 HTTP/1.1\nHost: api.meusistema.com\nAuthorization: Bearer <token>\nContent-Type: application/json\n\n{\n  \"nome\": \"Erico Borgonove\",\n  \"telefone\": \"+55 (92) 98255-3114\"\n}",
    responseExample:
      "HTTP/1.1 200 OK\nContent-Type: application/json\n\n{\n  \"id\": 42,\n  \"nome\": \"Erico Borgonove\",\n  \"telefone\": \"+55 (92) 98255-3114\",\n  \"updatedAt\": \"2026-02-21T15:40:00Z\"\n}",
    verbsTitle: "Verbos HTTP principais",
    verbsSubtitle:
      "Resumo operacional dos métodos mais usados, incluindo segurança, idempotência e respostas típicas.",
    verbs: [
      {
        method: "GET",
        safe: "Sim",
        idempotent: "Sim",
        body: "Normalmente não",
        use: "Buscar recurso(s)",
        examples: "200, 304, 404",
      },
      {
        method: "POST",
        safe: "Não",
        idempotent: "Não",
        body: "Sim",
        use: "Criar recurso ou acionar ação",
        examples: "201, 202, 400, 409",
      },
      {
        method: "PUT",
        safe: "Não",
        idempotent: "Sim",
        body: "Sim",
        use: "Substituir recurso completo",
        examples: "200, 204, 400, 404",
      },
      {
        method: "PATCH",
        safe: "Não",
        idempotent: "Depende",
        body: "Sim",
        use: "Atualização parcial",
        examples: "200, 204, 400, 422",
      },
      {
        method: "DELETE",
        safe: "Não",
        idempotent: "Sim",
        body: "Opcional",
        use: "Remover recurso",
        examples: "204, 404, 409",
      },
      {
        method: "HEAD",
        safe: "Sim",
        idempotent: "Sim",
        body: "Não",
        use: "Buscar metadados sem body",
        examples: "200, 304, 404",
      },
      {
        method: "OPTIONS",
        safe: "Sim",
        idempotent: "Sim",
        body: "Não",
        use: "Descobrir métodos permitidos/CORS",
        examples: "200, 204",
      },
    ],
    statusTitle: "Ilustração dos grupos de status code",
    statusSubtitle:
      "Visual inspirado na ideia de agrupamento por classe (1xx a 5xx): cada faixa indica um tipo de resposta.",
    statusGroups: [
      {
        range: "1xx",
        name: "Informacional",
        tone: "bg-sky-500/15 border-sky-400/40 text-sky-200",
        desc: "A requisição foi recebida e o processamento vai continuar.",
        examples: "100 Continue, 101 Switching Protocols",
      },
      {
        range: "2xx",
        name: "Sucesso",
        tone: "bg-emerald-500/15 border-emerald-400/40 text-emerald-200",
        desc: "Operação executada com sucesso.",
        examples: "200 OK, 201 Created, 204 No Content",
      },
      {
        range: "3xx",
        name: "Redirecionamento",
        tone: "bg-amber-500/15 border-amber-400/40 text-amber-100",
        desc: "É preciso redirecionar para outro local/recurso.",
        examples: "301 Moved Permanently, 302 Found, 304 Not Modified",
      },
      {
        range: "4xx",
        name: "Erro do cliente",
        tone: "bg-orange-500/15 border-orange-400/40 text-orange-100",
        desc: "A requisição está inválida ou sem permissão suficiente.",
        examples: "400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict, 422 Unprocessable Entity",
      },
      {
        range: "5xx",
        name: "Erro do servidor",
        tone: "bg-rose-500/15 border-rose-400/40 text-rose-100",
        desc: "Falha interna no servidor ou dependência externa.",
        examples: "500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable",
      },
    ],
    troubleshootingTitle: "Principais erros HTTP e como resolver",
    troubleshootingSubtitle:
      "Guia rápido dos códigos mais frequentes em navegação e APIs, com causa provável e ação imediata.",
    troubleshooting: [
      {
        code: "401 Unauthorized",
        meaning: "Falta autenticação válida para acessar o recurso.",
        causes: "Token ausente/expirado, sessão inválida, credencial incorreta.",
        actions: [
          "Validar se o token está sendo enviado no header Authorization.",
          "Renovar sessão/login e repetir a requisição.",
          "Checar relógio do servidor e expiração do JWT.",
        ],
      },
      {
        code: "403 Forbidden",
        meaning: "Servidor entendeu a requisição, mas negou acesso.",
        causes: "Permissões insuficientes, regra de ACL/WAF, diretório protegido.",
        actions: [
          "Revisar papéis/permissões do usuário.",
          "Inspecionar regras de firewall/WAF e bloqueios por IP.",
          "Checar permissões de arquivo/pasta e políticas de acesso.",
        ],
      },
      {
        code: "404 Not Found",
        meaning: "Rota/recurso não existe ou foi movido.",
        causes: "URL incorreta, rota removida, link quebrado, migração sem redirect.",
        actions: [
          "Conferir endpoint e parâmetros da URL.",
          "Criar redirecionamento 301 para páginas antigas quando aplicável.",
          "Mapear links internos quebrados e corrigir navegação.",
        ],
      },
      {
        code: "405 Method Not Allowed",
        meaning: "Endpoint existe, mas não aceita o método enviado.",
        causes: "Uso de método incorreto (ex.: GET em rota POST).",
        actions: [
          "Confirmar verbo esperado na documentação da API.",
          "Ajustar cliente e rota para o mesmo método HTTP.",
          "Retornar header Allow para facilitar diagnóstico.",
        ],
      },
      {
        code: "429 Too Many Requests",
        meaning: "Limite de requisições excedido (rate limit).",
        causes: "Burst de tráfego, loop no cliente, ausência de retry controlado.",
        actions: [
          "Aplicar backoff exponencial e respeitar Retry-After.",
          "Adicionar cache e debounce no cliente.",
          "Revisar política de rate limit por chave/IP.",
        ],
      },
      {
        code: "500 Internal Server Error",
        meaning: "Falha interna na aplicação/servidor.",
        causes: "Exceções não tratadas, erro de configuração, timeout, memória.",
        actions: [
          "Analisar logs e stack trace para causa raiz.",
          "Validar .htaccess/configuração e dependências da aplicação.",
          "Monitorar uso de memória/CPU e ajustar limites.",
        ],
      },
      {
        code: "502 Bad Gateway",
        meaning: "Gateway/proxy recebeu resposta inválida do upstream.",
        causes: "Falha de comunicação entre proxy e serviço de origem.",
        actions: [
          "Testar saúde do serviço upstream diretamente.",
          "Revisar timeout e keep-alive no proxy/reverse proxy.",
          "Checar disponibilidade de rede entre as camadas.",
        ],
      },
      {
        code: "503 Service Unavailable",
        meaning: "Serviço indisponível temporariamente.",
        causes: "Manutenção, sobrecarga, limite de recursos no servidor.",
        actions: [
          "Confirmar janelas de manutenção e fila de requisições.",
          "Escalar horizontal/verticalmente quando houver pico.",
          "Retornar Retry-After e página de indisponibilidade amigável.",
        ],
      },
    ],
    seoTitle: "Impacto em SEO e experiência do usuário",
    seoSubtitle:
      "Como códigos HTTP afetam rastreamento, indexação, confiança do usuário e qualidade da navegação.",
    seoItems: [
      "Muitos 404 aumentam taxa de rejeição e prejudicam rastreamento de páginas importantes.",
      "Use 301 em mudanças permanentes de URL para preservar autoridade e evitar conteúdo duplicado.",
      "Evite soft 404: página com conteúdo de erro deve retornar status de erro real.",
      "Monitore logs e Search Console para corrigir erros antes de impactar indexação.",
    ],
    statusCatalogTitle: "Catálogo completo de status HTTP",
    statusCatalogSubtitle:
      "Componente em formato de acordeão (accordion): abra cada grupo para ver todos os status codes e seus significados.",
  },
  en: {
    back: "Back to Subjects",
    title: "HTTP Protocol: Verbs and Status Codes",
    subtitle:
      "Practical subject to understand client-server communication, which HTTP verbs to use, and how to interpret HTTP responses.",
    introTitle: "Introduction",
    intro:
      "HTTP is the protocol behind communication between web applications. Mastering its flow, verbs, and response codes is essential to build reliable APIs, debug integrations, and respond quickly to production incidents.",
    objectiveTitle: "Subject goals",
    objectiveSubtitle:
      "Expected outcomes after finishing this subject: conceptual mastery, technical response reading, and real-world troubleshooting capability.",
    objectives: [
      "Understand the full request/response lifecycle from client layer to application layer.",
      "Choose HTTP verbs correctly based on operation intent (read, create, update, delete).",
      "Interpret status codes by class and by real scenario, distinguishing client and server issues.",
      "Apply debugging best practices using headers, payload, business context, and flow checkpoints.",
    ],
    flowTitle: "HTTP flow in 6 steps",
    flowSubtitle:
      "High-level view of an HTTP call path, from client request to UI update.",
    flow: [
      "Client (browser/app) sends a request to a URL.",
      "The request carries method (GET, POST...), headers, params and, when needed, body.",
      "Server receives it, validates authentication/authorization and processes business rules.",
      "Server reads/updates data (database, external services, cache, etc.).",
      "Server returns a response with status code, headers and body.",
      "Client interprets status/body and updates the UI for the user.",
    ],
    laneTitle: "Two-lane diagram (Request and Response)",
    laneSubtitle:
      "Visual split to make clear what happens when the request is sent and when the response comes back.",
    requestLane: {
      title: "Request lane (Client -> Server)",
      steps: [
        "User performs an action (click, form submit, API call).",
        "Client builds HTTP request with method, URL, headers and body (when needed).",
        "Edge layer receives it (DNS/TLS, CDN/WAF/Load Balancer).",
        "Gateway/router forwards to the correct application endpoint.",
      ],
    },
    responseLane: {
      title: "Response lane (Server -> Client)",
      steps: [
        "Application validates payload, authentication/authorization, and business rules.",
        "Domain layer processes and queries resources (database, cache, external services).",
        "Server builds HTTP response with status code, headers and standardized body.",
        "Client interprets response and updates UI, state, and error handling.",
      ],
    },
    decisionTitle: "Status code decision on server side",
    decisionSubtitle:
      "After processing, the server selects the response class based on validation and execution result.",
    checkpointsTitle: "Flow checkpoints (where failures usually happen)",
    checkpointsSubtitle:
      "Fast-debug checkpoints: what to validate at each stage and which error classes to watch.",
    checkpoints: [
      {
        stage: "Edge (DNS/TLS/CDN/WAF)",
        ok: "200/3xx when route is reachable.",
        fail: "4xx on security blocks (e.g., 403).",
      },
      {
        stage: "Input and validation",
        ok: "Valid payload continues processing.",
        fail: "400 (invalid format), 422 (validation rules).",
      },
      {
        stage: "Authentication and authorization",
        ok: "Valid token/permissions allow access.",
        fail: "401 (unauthenticated), 403 (forbidden).",
      },
      {
        stage: "Business rules",
        ok: "Operation completes successfully (2xx).",
        fail: "404 (resource not found), 409 (state conflict).",
      },
      {
        stage: "Infra/dependencies",
        ok: "Integrations answer as expected.",
        fail: "5xx (internal failure, timeout, upstream unavailable).",
      },
    ],
    practicalTitle: "Complete practical example",
    practicalSubtitle:
      "Scenario: profile update with PATCH. See request and response in the same flow.",
    requestLabel: "Request",
    responseLabel: "Response",
    requestExample:
      "PATCH /api/users/42 HTTP/1.1\nHost: api.mysystem.com\nAuthorization: Bearer <token>\nContent-Type: application/json\n\n{\n  \"name\": \"Erico Borgonove\",\n  \"phone\": \"+55 (92) 98255-3114\"\n}",
    responseExample:
      "HTTP/1.1 200 OK\nContent-Type: application/json\n\n{\n  \"id\": 42,\n  \"name\": \"Erico Borgonove\",\n  \"phone\": \"+55 (92) 98255-3114\",\n  \"updatedAt\": \"2026-02-21T15:40:00Z\"\n}",
    verbsTitle: "Main HTTP verbs",
    verbsSubtitle:
      "Operational summary of common methods, including safety, idempotency, and typical responses.",
    verbs: [
      {
        method: "GET",
        safe: "Yes",
        idempotent: "Yes",
        body: "Usually no",
        use: "Read resource(s)",
        examples: "200, 304, 404",
      },
      {
        method: "POST",
        safe: "No",
        idempotent: "No",
        body: "Yes",
        use: "Create resource or trigger action",
        examples: "201, 202, 400, 409",
      },
      {
        method: "PUT",
        safe: "No",
        idempotent: "Yes",
        body: "Yes",
        use: "Replace full resource",
        examples: "200, 204, 400, 404",
      },
      {
        method: "PATCH",
        safe: "No",
        idempotent: "Depends",
        body: "Yes",
        use: "Partial update",
        examples: "200, 204, 400, 422",
      },
      {
        method: "DELETE",
        safe: "No",
        idempotent: "Yes",
        body: "Optional",
        use: "Delete resource",
        examples: "204, 404, 409",
      },
      {
        method: "HEAD",
        safe: "Yes",
        idempotent: "Yes",
        body: "No",
        use: "Read metadata without body",
        examples: "200, 304, 404",
      },
      {
        method: "OPTIONS",
        safe: "Yes",
        idempotent: "Yes",
        body: "No",
        use: "Discover allowed methods/CORS",
        examples: "200, 204",
      },
    ],
    statusTitle: "Status code groups illustration",
    statusSubtitle:
      "Visual inspired by class grouping (1xx to 5xx): each range represents a response category.",
    statusGroups: [
      {
        range: "1xx",
        name: "Informational",
        tone: "bg-sky-500/15 border-sky-400/40 text-sky-200",
        desc: "The request was received and processing continues.",
        examples: "100 Continue, 101 Switching Protocols",
      },
      {
        range: "2xx",
        name: "Success",
        tone: "bg-emerald-500/15 border-emerald-400/40 text-emerald-200",
        desc: "Operation completed successfully.",
        examples: "200 OK, 201 Created, 204 No Content",
      },
      {
        range: "3xx",
        name: "Redirection",
        tone: "bg-amber-500/15 border-amber-400/40 text-amber-100",
        desc: "The client must redirect to another location/resource.",
        examples: "301 Moved Permanently, 302 Found, 304 Not Modified",
      },
      {
        range: "4xx",
        name: "Client error",
        tone: "bg-orange-500/15 border-orange-400/40 text-orange-100",
        desc: "The request is invalid or lacks enough permissions.",
        examples: "400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict, 422 Unprocessable Entity",
      },
      {
        range: "5xx",
        name: "Server error",
        tone: "bg-rose-500/15 border-rose-400/40 text-rose-100",
        desc: "Internal server failure or upstream dependency error.",
        examples: "500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable",
      },
    ],
    troubleshootingTitle: "Main HTTP errors and how to fix",
    troubleshootingSubtitle:
      "Quick guide for frequent browser/API errors with likely cause and immediate action.",
    troubleshooting: [
      {
        code: "401 Unauthorized",
        meaning: "Missing valid authentication for this resource.",
        causes: "Missing/expired token, invalid session, wrong credentials.",
        actions: [
          "Ensure Authorization header is being sent.",
          "Renew session/login and retry request.",
          "Check server clock and JWT expiration.",
        ],
      },
      {
        code: "403 Forbidden",
        meaning: "Server understood request but denied access.",
        causes: "Insufficient permissions, ACL/WAF rule, protected directory.",
        actions: [
          "Review user roles and permissions.",
          "Inspect firewall/WAF rules and IP blocks.",
          "Check file/folder permissions and access policies.",
        ],
      },
      {
        code: "404 Not Found",
        meaning: "Route/resource does not exist or was moved.",
        causes: "Wrong URL, removed route, broken link, migration without redirect.",
        actions: [
          "Verify endpoint and URL parameters.",
          "Create 301 redirects for legacy pages when needed.",
          "Map broken internal links and fix navigation.",
        ],
      },
      {
        code: "405 Method Not Allowed",
        meaning: "Endpoint exists but does not accept this method.",
        causes: "Wrong method usage (e.g., GET on POST route).",
        actions: [
          "Confirm expected verb in API docs.",
          "Align client method and server route.",
          "Return Allow header to improve diagnosis.",
        ],
      },
      {
        code: "429 Too Many Requests",
        meaning: "Rate limit exceeded.",
        causes: "Traffic burst, client loop, no controlled retries.",
        actions: [
          "Apply exponential backoff and respect Retry-After.",
          "Add cache and debounce on client side.",
          "Review rate-limit policy by key/IP.",
        ],
      },
      {
        code: "500 Internal Server Error",
        meaning: "Internal failure in app/server.",
        causes: "Unhandled exceptions, bad config, timeout, memory limits.",
        actions: [
          "Inspect logs and stack trace for root cause.",
          "Validate .htaccess/config and application dependencies.",
          "Monitor memory/CPU and tune resource limits.",
        ],
      },
      {
        code: "502 Bad Gateway",
        meaning: "Gateway/proxy got invalid upstream response.",
        causes: "Communication failure between proxy and origin service.",
        actions: [
          "Test upstream service health directly.",
          "Review timeout and keep-alive in reverse proxy.",
          "Check network availability between layers.",
        ],
      },
      {
        code: "503 Service Unavailable",
        meaning: "Service temporarily unavailable.",
        causes: "Maintenance, overload, server resource exhaustion.",
        actions: [
          "Confirm maintenance windows and request queue conditions.",
          "Scale horizontally/vertically during traffic spikes.",
          "Return Retry-After and a friendly maintenance page.",
        ],
      },
    ],
    seoTitle: "SEO and user-experience impact",
    seoSubtitle:
      "How HTTP statuses affect crawling, indexing, user trust, and navigation quality.",
    seoItems: [
      "High 404 rates increase bounce and hurt crawling of important URLs.",
      "Use 301 for permanent URL changes to preserve authority and avoid duplicate content.",
      "Avoid soft 404s: error-like pages should return real error statuses.",
      "Monitor logs and Search Console to fix errors before indexing impact.",
    ],
    statusCatalogTitle: "Complete HTTP status catalog",
    statusCatalogSubtitle:
      "Accordion component: open each group to see all status codes and their meanings.",
  },
};

const STATUS_CATALOG = [
  {
    group: "1xx",
    labelPt: "1xx — Informacional",
    labelEn: "1xx — Informational",
    tone: "border-sky-700/50 bg-sky-900/10",
    items: [
      { code: "100", name: "Continue", pt: "Cliente pode continuar enviando o corpo da requisição.", en: "Client may continue sending request body." },
      { code: "101", name: "Switching Protocols", pt: "Servidor aceitou trocar de protocolo.", en: "Server accepted protocol switch." },
      { code: "102", name: "Processing", pt: "Servidor está processando, sem resposta final ainda.", en: "Server is processing; no final response yet." },
      { code: "103", name: "Early Hints", pt: "Servidor envia dicas antecipadas de recursos.", en: "Server sends early hints for resources." },
    ],
  },
  {
    group: "2xx",
    labelPt: "2xx — Sucesso",
    labelEn: "2xx — Success",
    tone: "border-emerald-700/50 bg-emerald-900/10",
    items: [
      { code: "200", name: "OK", pt: "Requisição concluída com sucesso.", en: "Request completed successfully." },
      { code: "201", name: "Created", pt: "Recurso criado com sucesso.", en: "Resource created successfully." },
      { code: "202", name: "Accepted", pt: "Requisição aceita para processamento posterior.", en: "Request accepted for later processing." },
      { code: "203", name: "Non-Authoritative Information", pt: "Resposta modificada por proxy/intermediário.", en: "Response modified by intermediary." },
      { code: "204", name: "No Content", pt: "Sucesso sem conteúdo no corpo.", en: "Success with no response body." },
      { code: "205", name: "Reset Content", pt: "Cliente deve resetar a visualização/formulário.", en: "Client should reset view/form." },
      { code: "206", name: "Partial Content", pt: "Retorno parcial (requisições de faixa/range).", en: "Partial response for range requests." },
      { code: "207", name: "Multi-Status", pt: "Múltiplos status na mesma resposta.", en: "Multiple statuses in a single response." },
      { code: "208", name: "Already Reported", pt: "Elemento já reportado anteriormente.", en: "Element already reported before." },
      { code: "226", name: "IM Used", pt: "Servidor aplicou transformação incremental.", en: "Server applied instance-manipulation result." },
    ],
  },
  {
    group: "3xx",
    labelPt: "3xx — Redirecionamento",
    labelEn: "3xx — Redirection",
    tone: "border-amber-700/50 bg-amber-900/10",
    items: [
      { code: "300", name: "Multiple Choices", pt: "Vários destinos possíveis para o recurso.", en: "Multiple possible representations/targets." },
      { code: "301", name: "Moved Permanently", pt: "Recurso movido permanentemente.", en: "Resource permanently moved." },
      { code: "302", name: "Found", pt: "Redirecionamento temporário.", en: "Temporary redirection." },
      { code: "303", name: "See Other", pt: "Consultar outro recurso via GET.", en: "See another resource via GET." },
      { code: "304", name: "Not Modified", pt: "Sem alteração; usar cache.", en: "Not changed; use cached version." },
      { code: "305", name: "Use Proxy", pt: "Acesso somente via proxy (obsoleto).", en: "Access through proxy (deprecated)." },
      { code: "307", name: "Temporary Redirect", pt: "Redirecionamento temporário preservando método.", en: "Temporary redirect preserving method." },
      { code: "308", name: "Permanent Redirect", pt: "Redirecionamento permanente preservando método.", en: "Permanent redirect preserving method." },
    ],
  },
  {
    group: "4xx",
    labelPt: "4xx — Erro do Cliente",
    labelEn: "4xx — Client Error",
    tone: "border-orange-700/50 bg-orange-900/10",
    items: [
      { code: "400", name: "Bad Request", pt: "Requisição inválida ou malformada.", en: "Invalid or malformed request." },
      { code: "401", name: "Unauthorized", pt: "Autenticação necessária/inválida.", en: "Authentication required/invalid." },
      { code: "402", name: "Payment Required", pt: "Reservado para uso futuro.", en: "Reserved for future use." },
      { code: "403", name: "Forbidden", pt: "Acesso negado mesmo com autenticação.", en: "Access denied despite authentication." },
      { code: "404", name: "Not Found", pt: "Recurso não encontrado.", en: "Resource not found." },
      { code: "405", name: "Method Not Allowed", pt: "Método HTTP não permitido na rota.", en: "HTTP method not allowed on route." },
      { code: "406", name: "Not Acceptable", pt: "Formato solicitado não disponível.", en: "Requested representation not available." },
      { code: "407", name: "Proxy Authentication Required", pt: "Proxy exige autenticação.", en: "Proxy authentication required." },
      { code: "408", name: "Request Timeout", pt: "Tempo limite da requisição excedido.", en: "Request timed out." },
      { code: "409", name: "Conflict", pt: "Conflito de estado/recurso.", en: "State/resource conflict." },
      { code: "410", name: "Gone", pt: "Recurso removido definitivamente.", en: "Resource permanently removed." },
      { code: "411", name: "Length Required", pt: "Content-Length obrigatório.", en: "Content-Length header required." },
      { code: "412", name: "Precondition Failed", pt: "Pré-condição da requisição falhou.", en: "Request precondition failed." },
      { code: "413", name: "Payload Too Large", pt: "Corpo da requisição muito grande.", en: "Request payload too large." },
      { code: "414", name: "URI Too Long", pt: "URL maior que o permitido.", en: "Request URI too long." },
      { code: "415", name: "Unsupported Media Type", pt: "Tipo de mídia não suportado.", en: "Media type not supported." },
      { code: "416", name: "Range Not Satisfiable", pt: "Faixa solicitada inválida.", en: "Requested range not satisfiable." },
      { code: "417", name: "Expectation Failed", pt: "Expectativa do header Expect falhou.", en: "Expect header requirement failed." },
      { code: "418", name: "I'm a teapot", pt: "Código humorístico da RFC.", en: "RFC easter-egg status code." },
      { code: "421", name: "Misdirected Request", pt: "Requisição enviada para servidor errado.", en: "Request sent to wrong server." },
      { code: "422", name: "Unprocessable Entity", pt: "Semântica inválida no payload.", en: "Semantic validation failed." },
      { code: "423", name: "Locked", pt: "Recurso está bloqueado.", en: "Resource is locked." },
      { code: "424", name: "Failed Dependency", pt: "Dependência anterior falhou.", en: "Previous dependency failed." },
      { code: "425", name: "Too Early", pt: "Servidor não quer processar cedo demais.", en: "Server unwilling to risk early processing." },
      { code: "426", name: "Upgrade Required", pt: "Cliente deve atualizar protocolo.", en: "Client must upgrade protocol." },
      { code: "428", name: "Precondition Required", pt: "Pré-condição obrigatória para executar.", en: "Request must be conditional." },
      { code: "429", name: "Too Many Requests", pt: "Limite de requisições excedido.", en: "Rate limit exceeded." },
      { code: "431", name: "Request Header Fields Too Large", pt: "Headers muito grandes.", en: "Header fields too large." },
      { code: "451", name: "Unavailable For Legal Reasons", pt: "Conteúdo indisponível por motivo legal.", en: "Unavailable due to legal reasons." },
    ],
  },
  {
    group: "5xx",
    labelPt: "5xx — Erro do Servidor",
    labelEn: "5xx — Server Error",
    tone: "border-rose-700/50 bg-rose-900/10",
    items: [
      { code: "500", name: "Internal Server Error", pt: "Erro interno genérico no servidor.", en: "Generic internal server error." },
      { code: "501", name: "Not Implemented", pt: "Funcionalidade/método não implementado.", en: "Method/functionality not implemented." },
      { code: "502", name: "Bad Gateway", pt: "Resposta inválida do upstream.", en: "Invalid response from upstream." },
      { code: "503", name: "Service Unavailable", pt: "Serviço temporariamente indisponível.", en: "Service temporarily unavailable." },
      { code: "504", name: "Gateway Timeout", pt: "Tempo limite no upstream.", en: "Upstream timeout reached." },
      { code: "505", name: "HTTP Version Not Supported", pt: "Versão HTTP não suportada.", en: "HTTP version not supported." },
      { code: "506", name: "Variant Also Negotiates", pt: "Erro de negociação de conteúdo.", en: "Content negotiation configuration error." },
      { code: "507", name: "Insufficient Storage", pt: "Armazenamento insuficiente no servidor.", en: "Insufficient server storage." },
      { code: "508", name: "Loop Detected", pt: "Loop detectado no processamento.", en: "Server detected processing loop." },
      { code: "510", name: "Not Extended", pt: "Extensões necessárias não informadas.", en: "Further extensions required." },
      { code: "511", name: "Network Authentication Required", pt: "Autenticação de rede exigida.", en: "Network authentication required." },
    ],
  },
];

const STATUS_GUIDES = {
  "401": {
    pt: {
      causes: "Token ausente/expirado, sessão inválida ou credenciais incorretas.",
      actions: [
        "Enviar Authorization corretamente (Bearer token ou método esperado).",
        "Renovar sessão/login e repetir a requisição.",
        "Validar tempo de expiração e relógio do servidor.",
      ],
    },
    en: {
      causes: "Missing/expired token, invalid session, or wrong credentials.",
      actions: [
        "Send Authorization correctly (Bearer token or expected method).",
        "Renew session/login and retry the request.",
        "Validate token expiration and server clock.",
      ],
    },
  },
  "403": {
    pt: {
      causes: "Usuário autenticado sem permissão, ACL/WAF bloqueando ou recurso protegido.",
      actions: [
        "Revisar papéis/permissões e políticas de acesso.",
        "Checar bloqueios de firewall/WAF por rota, IP ou agente.",
        "Validar permissões de arquivo/pasta no servidor.",
      ],
    },
    en: {
      causes: "Authenticated user lacks permission, ACL/WAF block, or protected resource.",
      actions: [
        "Review roles/permissions and access policies.",
        "Check firewall/WAF blocks by route, IP, or user agent.",
        "Validate server file/folder permissions.",
      ],
    },
  },
  "404": {
    pt: {
      causes: "URL incorreta, rota removida, link quebrado ou recurso inexistente.",
      actions: [
        "Conferir endpoint, parâmetros e versão da API.",
        "Criar redirecionamento 301 para URLs antigas quando necessário.",
        "Corrigir links internos e monitorar logs de 404.",
      ],
    },
    en: {
      causes: "Wrong URL, removed route, broken link, or missing resource.",
      actions: [
        "Check endpoint, params, and API version.",
        "Create 301 redirects for legacy URLs when needed.",
        "Fix internal links and monitor 404 logs.",
      ],
    },
  },
  "405": {
    pt: {
      causes: "Método HTTP incompatível com a rota (ex.: GET em endpoint POST).",
      actions: [
        "Comparar método enviado com documentação da API.",
        "Ajustar cliente e rota para o mesmo verbo.",
        "Retornar header Allow para facilitar diagnóstico.",
      ],
    },
    en: {
      causes: "HTTP method does not match route contract (e.g., GET on POST endpoint).",
      actions: [
        "Compare sent method with API documentation.",
        "Align client method and server route.",
        "Return Allow header to improve diagnosis.",
      ],
    },
  },
  "409": {
    pt: {
      causes: "Conflito de estado: recurso já existe, versão desatualizada ou concorrência.",
      actions: [
        "Revalidar estado atual do recurso antes de gravar.",
        "Aplicar controle de versão/ETag/If-Match em atualização concorrente.",
        "Ajustar regra de negócio para lidar com duplicidade.",
      ],
    },
    en: {
      causes: "State conflict: already-existing resource, stale version, or concurrency issue.",
      actions: [
        "Re-check current resource state before writing.",
        "Use version control/ETag/If-Match for concurrent updates.",
        "Adjust business rules to handle duplicates.",
      ],
    },
  },
  "422": {
    pt: {
      causes: "Payload com semântica inválida (campos ausentes/formato/regra).",
      actions: [
        "Validar schema no cliente e no servidor.",
        "Retornar mensagens de validação por campo.",
        "Padronizar contrato de erro para facilitar correção no front-end.",
      ],
    },
    en: {
      causes: "Payload semantics invalid (missing fields/format/rules).",
      actions: [
        "Validate schema on both client and server.",
        "Return field-level validation messages.",
        "Standardize error contract for easier front-end correction.",
      ],
    },
  },
  "429": {
    pt: {
      causes: "Rate limit excedido por excesso de requisições em curto período.",
      actions: [
        "Aplicar backoff exponencial e respeitar Retry-After.",
        "Adicionar debounce/cache para reduzir chamadas repetidas.",
        "Revisar limites por usuário/IP/chave de API.",
      ],
    },
    en: {
      causes: "Rate limit exceeded due to too many requests in a short interval.",
      actions: [
        "Apply exponential backoff and respect Retry-After.",
        "Add debounce/cache to reduce repeated calls.",
        "Review limits per user/IP/API key.",
      ],
    },
  },
  "500": {
    pt: {
      causes: "Exceção não tratada, falha de configuração ou erro inesperado na aplicação.",
      actions: [
        "Inspecionar logs/stack trace para causa raiz.",
        "Verificar variáveis de ambiente e dependências.",
        "Adicionar tratamento de erro e observabilidade.",
      ],
    },
    en: {
      causes: "Unhandled exception, config failure, or unexpected app error.",
      actions: [
        "Inspect logs/stack trace for root cause.",
        "Verify environment variables and dependencies.",
        "Add error handling and observability.",
      ],
    },
  },
  "502": {
    pt: {
      causes: "Proxy/gateway recebeu resposta inválida do serviço de origem.",
      actions: [
        "Testar saúde do upstream diretamente.",
        "Revisar timeout/keep-alive no proxy reverso.",
        "Checar conectividade de rede entre camadas.",
      ],
    },
    en: {
      causes: "Proxy/gateway received invalid response from origin service.",
      actions: [
        "Test upstream health directly.",
        "Review timeout/keep-alive in reverse proxy.",
        "Check network connectivity between layers.",
      ],
    },
  },
  "503": {
    pt: {
      causes: "Serviço indisponível por manutenção, sobrecarga ou recurso esgotado.",
      actions: [
        "Confirmar janela de manutenção e capacidade atual.",
        "Escalar infraestrutura para pico de carga.",
        "Retornar Retry-After e fallback amigável ao usuário.",
      ],
    },
    en: {
      causes: "Service unavailable due to maintenance, overload, or exhausted resources.",
      actions: [
        "Confirm maintenance window and current capacity.",
        "Scale infrastructure for traffic spikes.",
        "Return Retry-After and a user-friendly fallback page.",
      ],
    },
  },
};

function getGenericGuide(group, isEn) {
  const generic = {
    "1xx": {
      pt: {
        causes: "Resposta intermediária de protocolo/negociação durante a comunicação.",
        actions: [
          "Confirmar comportamento esperado do cliente para respostas informacionais.",
          "Verificar handshake/protocolo (ex.: upgrade de conexão).",
          "Validar logs de proxy/gateway para sequência de respostas.",
        ],
      },
      en: {
        causes: "Intermediate protocol/negotiation response during communication.",
        actions: [
          "Confirm expected client behavior for informational responses.",
          "Verify handshake/protocol flow (e.g., connection upgrade).",
          "Inspect proxy/gateway logs for response sequence.",
        ],
      },
    },
    "2xx": {
      pt: {
        causes: "Operação concluída com sucesso (pode haver diferenças de retorno por endpoint).",
        actions: [
          "Conferir corpo retornado e contrato esperado pelo cliente.",
          "Padronizar respostas (200/201/204) por tipo de operação.",
          "Registrar métricas de sucesso para observabilidade.",
        ],
      },
      en: {
        causes: "Operation succeeded (response shape may vary by endpoint).",
        actions: [
          "Validate returned body against client contract.",
          "Standardize success responses (200/201/204) per operation type.",
          "Track success metrics for observability.",
        ],
      },
    },
    "3xx": {
      pt: {
        causes: "Política de redirecionamento, cache ou mudança de URL.",
        actions: [
          "Verificar cadeia de redirects e evitar loops.",
          "Usar 301 para mudança permanente e 302/307 para temporária.",
          "Conferir comportamento de cache (304) no cliente.",
        ],
      },
      en: {
        causes: "Redirection, cache policy, or URL migration behavior.",
        actions: [
          "Check redirect chain and avoid loops.",
          "Use 301 for permanent moves and 302/307 for temporary ones.",
          "Validate client cache behavior for 304 responses.",
        ],
      },
    },
    "4xx": {
      pt: {
        causes: "Problema no lado do cliente: formato, autenticação, permissão ou recurso.",
        actions: [
          "Validar payload/headers/params antes de enviar.",
          "Revisar autenticação e escopo de permissão.",
          "Padronizar mensagens de erro para facilitar correção no cliente.",
        ],
      },
      en: {
        causes: "Client-side issue: payload, auth, permission, or resource path.",
        actions: [
          "Validate payload/headers/params before sending.",
          "Review authentication and permission scope.",
          "Standardize error messages to speed up client-side fixes.",
        ],
      },
    },
    "5xx": {
      pt: {
        causes: "Falha no servidor/aplicação ou dependência de infraestrutura.",
        actions: [
          "Analisar logs e traces para causa raiz.",
          "Revisar saúde de banco, cache e serviços externos.",
          "Aplicar circuit breaker, timeout e fallback apropriados.",
        ],
      },
      en: {
        causes: "Server/app failure or infrastructure dependency issue.",
        actions: [
          "Analyze logs and traces for root cause.",
          "Check health of database, cache, and external services.",
          "Apply circuit breaker, timeout, and appropriate fallbacks.",
        ],
      },
    },
  };

  return isEn ? generic[group].en : generic[group].pt;
}

function getStatusGuide(item, group, isEn) {
  const specific = STATUS_GUIDES[item.code]?.[isEn ? "en" : "pt"];
  if (specific) {
    return specific;
  }
  return getGenericGuide(group, isEn);
}

export default function ProtocoloHttp() {
  const { i18n } = useTranslation();
  const isEn = i18n.resolvedLanguage?.startsWith("en");
  const txt = isEn ? CONTENT.en : CONTENT.pt;

  return (
    <section className="min-h-[70vh] px-6 py-24 max-w-6xl mx-auto">
      <div className="mb-8">
        <BackButton fallbackTo="/disciplinas" className="text-sm text-cyan-300 hover:text-cyan-200 inline-flex items-center gap-2">
          {txt.back}
        </BackButton>
      </div>

      <h1 className="text-4xl md:text-5xl font-black mb-4 flex items-center gap-3">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8 text-cyan-300">
          <path
            fill="currentColor"
            d="M4 5a3 3 0 0 1 3-3h5v2H7a1 1 0 0 0-1 1v3h12V5a1 1 0 0 0-1-1h-5V2h5a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3h-2v2h2a3 3 0 0 1 3 3v1h-2v-1a1 1 0 0 0-1-1h-2v2h-2v-2h-4v2H8v-2H6a1 1 0 0 0-1 1v1H3v-1a3 3 0 0 1 3-3h2v-2H7a3 3 0 0 1-3-3V5Zm2 5a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1H6Zm4 3v2h4v-2h-4Z"
          />
        </svg>
        <span>{txt.title}</span>
      </h1>

      <p className="text-slate-400 text-lg mb-8">{txt.subtitle}</p>

      <div className="glass rounded-2xl p-6 md:p-8 mb-8">
        <h2 className="text-lg font-semibold text-cyan-300 mb-2">{txt.introTitle}</h2>
        <p className="text-sm text-slate-300 leading-relaxed text-justify">{txt.intro}</p>
      </div>

      <div className="glass rounded-2xl p-6 md:p-8 mb-8">
        <h2 className="text-lg font-semibold text-cyan-300 mb-3">{txt.objectiveTitle}</h2>
        <p className="text-sm text-slate-400 mb-4 text-justify">{txt.objectiveSubtitle}</p>
        <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside">
          {txt.objectives.map((objective) => (
            <li key={objective} className="text-justify">
              {objective}
            </li>
          ))}
        </ul>
      </div>

      <div className="glass rounded-2xl p-6 md:p-8 mb-8">
        <img
          src={httpCycleImage}
          alt={isEn ? "HTTP request and response cycle diagram" : "Diagrama do ciclo de requisição e resposta HTTP"}
          className="w-full rounded-xl border border-slate-700/80"
        />
      </div>

      <div className="glass rounded-2xl p-6 md:p-8 mb-8">
        <h2 className="text-xl font-semibold text-cyan-300 mb-4">{txt.flowTitle}</h2>
        <p className="text-sm text-slate-400 mb-5 text-justify">{txt.flowSubtitle}</p>
        <div className="flex flex-col md:flex-row md:items-stretch md:overflow-x-auto gap-2 md:gap-0">
          {txt.flow.map((item, index) => (
            <Fragment key={item}>
              <article className="min-w-[220px] md:w-[220px] bg-slate-900/40 rounded-xl border border-slate-800 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-cyan-300 mb-2">
                  {isEn ? `Step ${index + 1}` : `Passo ${index + 1}`}
                </p>
                <p className="text-sm text-slate-200 leading-relaxed text-justify">{item}</p>
              </article>

              {index < txt.flow.length - 1 && (
                <>
                  <div className="hidden md:flex items-center justify-center w-10 text-cyan-400/80">
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
                      <path fill="currentColor" d="M4 11h12.17l-3.58-3.59L14 6l6 6-6 6-1.41-1.41L16.17 13H4v-2Z" />
                    </svg>
                  </div>
                  <div className="md:hidden flex items-center justify-center py-1 text-cyan-400/80">
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                      <path fill="currentColor" d="M11 4h2v12.17l3.59-3.58L18 14l-6 6-6-6 1.41-1.41L11 16.17V4Z" />
                    </svg>
                  </div>
                </>
              )}
            </Fragment>
          ))}
        </div>
      </div>

      <div className="glass rounded-2xl p-6 md:p-8 mb-8">
        <h2 className="text-xl font-semibold text-cyan-300 mb-2">{txt.laneTitle}</h2>
        <p className="text-sm text-slate-400 mb-6">{txt.laneSubtitle}</p>
        <div className="grid lg:grid-cols-2 gap-5">
          <article className="rounded-2xl border border-cyan-700/40 bg-cyan-900/10 p-4">
            <h3 className="text-sm font-semibold text-cyan-200 mb-3">{txt.requestLane.title}</h3>
            <div className="space-y-2">
              {txt.requestLane.steps.map((step, index) => (
                <div key={step}>
                  <div className="rounded-xl border border-cyan-800/40 bg-slate-950/35 px-3 py-3 text-sm text-slate-200 text-justify">
                    <span className="text-cyan-300 font-semibold mr-2">{index + 1}.</span>
                    {step}
                  </div>
                  {index < txt.requestLane.steps.length - 1 && (
                    <div className="h-4 flex items-center justify-center text-cyan-400/70">
                      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
                        <path fill="currentColor" d="M11 4h2v12.17l3.59-3.58L18 14l-6 6-6-6 1.41-1.41L11 16.17V4Z" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-2xl border border-emerald-700/40 bg-emerald-900/10 p-4">
            <h3 className="text-sm font-semibold text-emerald-200 mb-3">{txt.responseLane.title}</h3>
            <div className="space-y-2">
              {txt.responseLane.steps.map((step, index) => (
                <div key={step}>
                  <div className="rounded-xl border border-emerald-800/40 bg-slate-950/35 px-3 py-3 text-sm text-slate-200 text-justify">
                    <span className="text-emerald-300 font-semibold mr-2">{index + 1}.</span>
                    {step}
                  </div>
                  {index < txt.responseLane.steps.length - 1 && (
                    <div className="h-4 flex items-center justify-center text-emerald-400/70">
                      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
                        <path fill="currentColor" d="M11 4h2v12.17l3.59-3.58L18 14l-6 6-6-6 1.41-1.41L11 16.17V4Z" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>

      <div className="glass rounded-2xl p-6 md:p-8 mb-8">
        <h2 className="text-xl font-semibold text-cyan-300 mb-2">{txt.decisionTitle}</h2>
        <p className="text-sm text-slate-400 mb-5">{txt.decisionSubtitle}</p>

        <div className="rounded-2xl border border-slate-700/80 bg-slate-950/30 p-4 md:p-6">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-center gap-2 md:gap-4">
            <div className="rounded-xl border border-cyan-700/40 bg-cyan-900/15 px-4 py-3 text-sm text-cyan-100 text-center">
              {isEn ? "Validate request" : "Validar requisição"}
            </div>
            <div className="text-cyan-400/80 self-center">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                <path fill="currentColor" d="M4 11h12.17l-3.58-3.59L14 6l6 6-6 6-1.41-1.41L16.17 13H4v-2Z" />
              </svg>
            </div>
            <div className="rounded-xl border border-violet-700/40 bg-violet-900/15 px-4 py-3 text-sm text-violet-100 text-center">
              {isEn ? "Process business rules" : "Processar regra de negócio"}
            </div>
            <div className="text-cyan-400/80 self-center">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                <path fill="currentColor" d="M4 11h12.17l-3.58-3.59L14 6l6 6-6 6-1.41-1.41L16.17 13H4v-2Z" />
              </svg>
            </div>
            <div className="rounded-xl border border-emerald-700/40 bg-emerald-900/15 px-4 py-3 text-sm text-emerald-100 text-center">
              {isEn ? "Return HTTP response" : "Retornar resposta HTTP"}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-3 mt-5">
            <article className="rounded-xl border border-emerald-700/40 bg-emerald-900/10 p-3">
              <p className="text-sm font-semibold text-emerald-300">2xx</p>
              <p className="text-xs text-slate-300 mt-1">{isEn ? "Success path" : "Caminho de sucesso"}</p>
            </article>
            <article className="rounded-xl border border-orange-700/40 bg-orange-900/10 p-3">
              <p className="text-sm font-semibold text-orange-300">4xx</p>
              <p className="text-xs text-slate-300 mt-1">{isEn ? "Client/request issue" : "Problema de cliente/requisição"}</p>
            </article>
            <article className="rounded-xl border border-rose-700/40 bg-rose-900/10 p-3">
              <p className="text-sm font-semibold text-rose-300">5xx</p>
              <p className="text-xs text-slate-300 mt-1">{isEn ? "Server/dependency issue" : "Problema interno/dependência"}</p>
            </article>
          </div>
        </div>
      </div>

      <div className="glass rounded-2xl p-6 md:p-8 mb-8">
        <h2 className="text-xl font-semibold text-cyan-300 mb-4">{txt.checkpointsTitle}</h2>
        <p className="text-sm text-slate-400 mb-5 text-justify">{txt.checkpointsSubtitle}</p>
        <div className="grid md:grid-cols-2 gap-4">
          {txt.checkpoints.map((checkpoint) => (
            <article key={checkpoint.stage} className="rounded-xl border border-slate-700/80 bg-slate-950/35 p-4">
              <h3 className="text-sm font-semibold text-cyan-200 mb-2">{checkpoint.stage}</h3>
              <p className="text-xs text-slate-200">
                <span className="text-emerald-300 font-semibold">OK:</span> {checkpoint.ok}
              </p>
              <p className="text-xs text-slate-200 mt-1">
                <span className="text-orange-300 font-semibold">{isEn ? "Fail:" : "Falha:"}</span> {checkpoint.fail}
              </p>
            </article>
          ))}
        </div>
      </div>

      <div className="glass rounded-2xl p-6 md:p-8 mb-8 overflow-x-auto">
        <h2 className="text-xl font-semibold text-cyan-300 mb-4">{txt.verbsTitle}</h2>
        <p className="text-sm text-slate-400 mb-5 text-justify">{txt.verbsSubtitle}</p>
        <table className="w-full min-w-[760px] text-sm">
          <thead>
            <tr className="text-left text-slate-200 border-b border-slate-700">
              <th className="py-2 pr-3">Method</th>
              <th className="py-2 pr-3">Safe</th>
              <th className="py-2 pr-3">Idempotent</th>
              <th className="py-2 pr-3">Body</th>
              <th className="py-2 pr-3">{isEn ? "Main use" : "Uso principal"}</th>
              <th className="py-2">{isEn ? "Common codes" : "Códigos comuns"}</th>
            </tr>
          </thead>
          <tbody>
            {txt.verbs.map((verb) => (
              <tr key={verb.method} className="border-b border-slate-800/80 text-slate-300">
                <td className="py-3 pr-3 font-semibold text-cyan-200">{verb.method}</td>
                <td className="py-3 pr-3">{verb.safe}</td>
                <td className="py-3 pr-3">{verb.idempotent}</td>
                <td className="py-3 pr-3">{verb.body}</td>
                <td className="py-3 pr-3">{verb.use}</td>
                <td className="py-3">{verb.examples}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="glass rounded-2xl p-6 md:p-8 mt-8">
        <h2 className="text-xl font-semibold text-cyan-300 mb-2">{txt.statusTitle}</h2>
        <p className="text-sm text-slate-400 mb-5">{txt.statusSubtitle}</p>
        <img
          src={httpStatusImage}
          alt={isEn ? "HTTP status code classes visual map" : "Mapa visual das classes de status code HTTP"}
          className="w-full rounded-xl border border-slate-700/80 mb-5"
        />
        <div className="grid md:grid-cols-5 gap-3 mb-6">
          {txt.statusGroups.map((group) => (
            <article
              key={group.range}
              className={`rounded-xl border p-4 ${group.tone}`}
            >
              <p className="text-2xl font-black">{group.range}</p>
              <h3 className="font-semibold mt-1">{group.name}</h3>
              <p className="text-xs mt-2 leading-relaxed text-justify">{group.desc}</p>
              <p className="text-[11px] mt-3 opacity-90">{group.examples}</p>
            </article>
          ))}
        </div>

        <h3 className="text-lg font-semibold text-cyan-300 mb-2">{txt.statusCatalogTitle}</h3>
        <p className="text-sm text-slate-400 mb-5">{txt.statusCatalogSubtitle}</p>

        <div className="space-y-3">
          {STATUS_CATALOG.map((catalog) => (
            <details key={catalog.group} className={`rounded-xl border ${catalog.tone} overflow-hidden`}>
              <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden px-4 py-3 flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold text-slate-100">
                    {isEn ? catalog.labelEn : catalog.labelPt}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {catalog.items.length} {isEn ? "status codes" : "status codes"}
                  </p>
                </div>
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 text-slate-300">
                  <path fill="currentColor" d="m12 14.6-6.3-6.3L7.1 6.9 12 11.8l4.9-4.9 1.4 1.4Z" />
                </svg>
              </summary>

              <div className="border-t border-slate-700/70 px-4 py-3 grid md:grid-cols-2 gap-2">
                {catalog.items.map((item) => (
                  <details key={item.code} className="rounded-lg border border-slate-700/70 bg-slate-950/45 overflow-hidden">
                    <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden px-3 py-2 flex items-center justify-between gap-2">
                      <span className="text-xs text-cyan-200 font-semibold">
                        {item.code} — {item.name}
                      </span>
                      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 text-slate-400">
                        <path fill="currentColor" d="m12 14.6-6.3-6.3L7.1 6.9 12 11.8l4.9-4.9 1.4 1.4Z" />
                      </svg>
                    </summary>

                    <div className="border-t border-slate-700/70 px-3 py-2">
                      <p className="text-xs text-slate-300 text-justify">
                        {isEn ? item.en : item.pt}
                      </p>

                      {(() => {
                        const guide = getStatusGuide(item, catalog.group, isEn);
                        return (
                          <>
                            <p className="text-xs text-slate-300 mt-2 text-justify">
                              <span className="font-semibold text-slate-100">
                                {isEn ? "Common causes:" : "Causas comuns:"}
                              </span>{" "}
                              {guide.causes}
                            </p>
                            <ul className="mt-2 space-y-1 list-disc list-inside">
                              {guide.actions.map((action) => (
                                <li key={action} className="text-xs text-slate-300 text-justify">
                                  {action}
                                </li>
                              ))}
                            </ul>
                          </>
                        );
                      })()}
                    </div>
                  </details>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>

      <div className="glass rounded-2xl p-6 md:p-8 mt-8">
        <h2 className="text-xl font-semibold text-cyan-300 mb-3">{txt.seoTitle}</h2>
        <p className="text-sm text-slate-400 mb-4 text-justify">{txt.seoSubtitle}</p>
        <ul className="space-y-2 list-disc list-inside">
          {txt.seoItems.map((item) => (
            <li key={item} className="text-sm text-slate-300 text-justify">
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="glass rounded-2xl p-6 md:p-8 mt-8">
        <h2 className="text-xl font-semibold text-cyan-300 mb-2">{txt.practicalTitle}</h2>
        <p className="text-sm text-slate-400 mb-5">{txt.practicalSubtitle}</p>
        <div className="grid lg:grid-cols-2 gap-4">
          <article className="rounded-xl border border-sky-700/40 bg-slate-950/40 p-4">
            <h3 className="text-sm font-semibold text-sky-300 mb-3">{txt.requestLabel}</h3>
            <pre className="text-xs leading-relaxed text-slate-200 whitespace-pre-wrap break-words overflow-x-auto">
              {txt.requestExample}
            </pre>
          </article>
          <article className="rounded-xl border border-emerald-700/40 bg-slate-950/40 p-4">
            <h3 className="text-sm font-semibold text-emerald-300 mb-3">{txt.responseLabel}</h3>
            <pre className="text-xs leading-relaxed text-slate-200 whitespace-pre-wrap break-words overflow-x-auto">
              {txt.responseExample}
            </pre>
          </article>
        </div>
      </div>
    </section>
  );
}
