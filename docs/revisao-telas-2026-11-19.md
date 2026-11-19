# Revisão das telas — 19/11/2026

Branch revisada: `refactor/padroniza-componentes-site`, commit `355ec39`.

Conclusão: os componentes compartilhados estão aplicados, mas ainda há falhas funcionais, cortes no celular e pendências de acessibilidade. A aprovação integral do site não é recomendada antes das correções abaixo.

**Atualização após os ajustes solicitados:** os itens de interface 1 a 6 abaixo foram corrigidos. O texto original foi mantido como histórico do diagnóstico. O item 7 continua pendente da configuração real de MySQL. A aplicação agora inclui 10 testes unitários e 13 testes de navegador aprovados, executáveis com `npm test` e `npm run test:browser`. Os nomes acessíveis das regiões roláveis acompanham a troca entre português e inglês.

| Item original | Ajuste aplicado | Verificação |
|---|---|---|
| Cortes mobile | Itens de grid podem encolher sem expandir a página; rolagem restrita aos blocos de código/tabelas | Sete páginas, larguras 320/390/1440, temas claro/escuro |
| Calculadora | Validação de números finitos, períodos inteiros de 1 a 1200 e resultado finito | Cálculos originais preservados; frações e limites inválidos não derrubam a tela |
| Modal de flags | Componente Dialog nativo, altura limitada, rolagem, foco, Escape e clique fora | 320×568 nos dois temas, fechamento e retorno de foco; contraste do conteúdo validado |
| Teclado nas regiões roláveis | ScrollRegion atribui foco e nome quando o conteúdo realmente ultrapassa o container | Auditoria das seis páginas apontadas sem violações WCAG A/AA detectadas |
| Contraste dos rótulos | Texto slate-400 substitui slate-500 nos rótulos de validade | Auditoria de contraste aprovada |
| Landmarks | Colunas internas usam div, mantendo um único main do layout | Verificação de main único nas páginas afetadas e rotas públicas |
| Backend real | Script npm run dev:api e instruções de configuração adicionados ao README | Sessão PHP acessível; banco ainda depende de credenciais/configuração do usuário |

As correções de interface não substituem a validação do banco, autenticação real, gravação de posts e entrega de e-mail.

## Cobertura e limites

- 74 amostras de rotas em quatro combinações: 390px e 1440px, temas claro e escuro — 296 verificações de renderização. Nenhum pageerror nos estados iniciais dessas verificações.
- Os dois padrões de rota restantes foram abertos separadamente: detalhe administrativo de disciplina com sessão simulada e alias `/disciplinas/postgresql/tabelas/tipos-de-dados`. Assim, os 76 padrões declarados no App têm ao menos uma amostra de navegação. Rotas administrativas sem sessão redirecionam ao login; isso não valida sua tela protegida.
- Quatro telas administrativas verificadas com sessão/posts simulados, em 390px e 1440px. Não houve login real, criação/edição de dados ou envio de e-mail.
- Blog dinâmico: a rota foi testada em estado de erro com um slug de teste; um artigo real com dados persistidos não foi validado porque o banco está sem configuração local.
- Auditoria automatizada WCAG A/AA no conteúdo principal das 74 amostras em desktop/tema escuro. Contraste adicional no tema claro em Disciplinas, Utilidades, Contato, Bancos Temporais e formulário do laboratório.
- Medição adicional de elementos cortados no celular em todas as 74 amostras, nos dois temas. Capturas e inspeção dirigida dos problemas encontrados.
- Sete dos nove cenários de interação passaram; os dois reprovados estão detalhados abaixo. Os sete testes de contrato de `npm test` passaram; os nove arquivos PHP passaram por `php -l`.
- Não foram testadas todas as combinações de entradas, cada item de todas as listas de exercícios, todos os módulos internos e todos os navegadores. Ausência de erro automatizado não equivale a aprovação visual/funcional completa.

## 1. Alta — conteúdo cortado em quatro telas no celular

Em 390px, conteúdo e botões ultrapassam a largura disponível, nos dois temas:

| Tela | Evidência | Origem a revisar |
|---|---|---|
| Python Pandas | Article de aproximadamente 607px; texto e botão Copiar ficam fora da tela | `src/pages/PythonPandas.jsx:254` |
| Exercícios-base | Colunas de código com mais de 607px; há colunas medidas acima de 843px | `src/pages/PythonPandasExerciciosBase.jsx:186` |
| Seaborn | Cards CSV/Excel/JSON extrapolam o painel; botão Copiar ultrapassa o viewport | `src/pages/PythonSeaborn.jsx:214` |
| Bancos Temporais | Main interno medido em 672px em uma tela de 390px | `src/pages/PostgresqlBancosTemporais.jsx:453` |

O `overflow-x-hidden` de `src/layout/MainLayout.jsx:7` esconde o excesso, portanto verificar somente `document.scrollWidth` não detecta esses cortes. Os itens de grid com `min-width:auto` e conteúdo de código longo precisam ser limitados à coluna, com rolagem restrita aos blocos de código/tabelas. Esse diagnóstico foi confirmado pela geometria e pelas capturas, não apenas pela ausência/presença de barra de rolagem.

Evidências: `/tmp/new-site-review-2026-11-19/clipping.json`, `clipping-parents.json`, `clipped-python-pandas.png` e `clipped-bancos-temporais.png`.

## 2. Alta — calculadora de juros pode derrubar a tela

Arquivo: `src/pages/CalculadoraJuros.jsx:53` e `:74`.

Reprodução: abrir `/utilidades/calculadora-juros`, preencher capital 1000, taxa 2 e quantidade de períodos 0.5. A validação permite o valor, mas o laço que começa em 1 não gera linhas; a leitura de `final.montante` lança `Cannot read properties of undefined (reading 'montante')` e a tela perde o conteúdo.

Recomendação: validar períodos inteiros/finitos dentro de limites definidos e proteger o cálculo contra resultado vazio. É uma falha preexistente: o mesmo trecho foi confirmado em `main`, não foi introduzido pela migração dos componentes.

## 3. Média — modal de flags sem suporte adequado a celular/teclado

Arquivo: `src/pages/TestadorRegex.jsx:544`.

- Em 320×568, a janela vai de aproximadamente -84px a 652px; o topo/fechar fica fora do viewport, sem rolagem própria.
- Escape não fecha a janela.
- Não há `role="dialog"`, nome acessível associado ou gerenciamento do foco; após abrir, o foco permanece no botão de ajuda atrás do overlay.

Recomendação: componente de diálogo compartilhado com altura máxima, rolagem interna, fechamento por Escape, foco inicial e restauração/contenção do foco. Evidência: `regex-modal-320.png` na pasta da revisão. A ausência de semântica/Escape também existia no código de `main`.

## 4. Média — regiões roláveis sem acesso explícito por teclado

Arquivos centrais: `src/components/CodeBlock.jsx:47` e `src/components/ui/Patterns.jsx:83`.

A auditoria identificou 26 ocorrências de `scrollable-region-focusable` em seis telas: Docker, Bancos Temporais, Protocolo HTTP, Exercícios-base, Seaborn e Python Pandas. São blocos de código/tabelas/diagramas roláveis que não têm foco explícito ou conteúdo focável. O diagnóstico automático destaca a navegação por teclado no Safari; não foi executado teste manual nesse navegador.

Recomendação: tornar regiões que realmente precisam rolar acessíveis por teclado, com indicação de foco e nome/contexto adequados, sem criar paradas de Tab desnecessárias em todos os containers.

## 5. Média — contraste insuficiente em rótulos de Bancos Temporais

Arquivo: `src/pages/PostgresqlBancosTemporais.jsx:176`.

Três rótulos de validade no tema escuro usam `text-slate-500` sobre `bg-slate-900`. A auditoria mediu contraste de 3,75:1 para texto de 12px, abaixo do limite de 4,5:1 verificado pela regra. Os cinco cenários adicionais de contraste no tema claro não apresentaram violações automáticas dessa regra.

Recomendação: aumentar o contraste dos rótulos sem depender apenas de cor para transmitir o estado.

## 6. Média — landmarks main aninhados

O MainLayout já possui o `<main>` da aplicação, mas há outro em:

- `src/pages/Esbmc.jsx:750`;
- `src/pages/EsbmcInstalacao.jsx:513`;
- `src/pages/PostgresqlBancosTemporais.jsx:453`.

Recomendação: manter um único landmark principal e usar section/div para as colunas internas. Essa estrutura também existia antes da refatoração.

## 7. Bloqueio de ambiente — backend real incompleto

O servidor PHP estava desligado. Foi iniciado localmente em `127.0.0.1:8080`, usando `public` como raiz, para testar as consultas de leitura pelo proxy do Vite.

- `/api/admin/session.php`: HTTP 200 com sessão não autenticada.
- `/api/blog/posts.php`: HTTP 500, `BLOG_LISTAGEM_ERRO`.
- Diagnóstico direto de conexão: `DB_CONFIG_INCOMPLETA`. O arquivo local `public/api/db-config.php` não está presente e a configuração efetiva não contém os dados mínimos necessários.
- O contato não foi enviado; entrega de e-mail e autenticação real permanecem sem validação.

Nenhuma credencial foi criada, nenhum post foi gravado e nenhum serviço externo recebeu mensagem. A configuração do banco e os fluxos de escrita precisam ser validados em ambiente autorizado com dados de teste.

## Cenários de interação aprovados

- Menu mobile abre e navega para Disciplinas.
- Juros compostos e simples com capital 1000, taxa 2 e 12 períodos retornam 1268.24 e 1240.00.
- CPF de dígitos repetidos é rejeitado.
- Gerador de senhas respeita 16 caracteres e avisa quando todas as categorias são desmarcadas.
- IMC gera histórico e permite limpar a tabela.
- Idioma troca o título do catálogo e suas ações.
- Tema alterna sem recarregar a página.

Nos estados auditados não houve imagens locais quebradas; os downloads locais extraídos dos links encontrados existem no diretório public. Isso não valida serviços externos nem URLs armazenadas em um banco ainda indisponível.

## Estado da entrega

Esta etapa é uma revisão: o código do site não foi alterado nem publicado. Os resultados brutos e capturas estão em `/tmp/new-site-review-2026-11-19/`. A ordem recomendada de correção é: cortes mobile, exceção da calculadora, diálogo de flags, teclado/contraste/landmarks, depois validação do backend real.
