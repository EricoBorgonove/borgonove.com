# Português e inglês — cobertura do conteúdo

## Inventário e implementação

A inspeção inicial identificou 18 páginas sem seleção de idioma: AFD, Algoritmos em Linguagem Natural, ESBMC e seus guias, PostgreSQL e suas páginas de tópicos, exercícios, bancos temporais e materiais, Python, Estacionamento, Seaborn, Prova Pandas e Laboratório UI. Também havia textos isolados em páginas que já usavam i18next.

O conteúdo estático agora usa português como texto de origem e um catálogo inglês em `src/locales/en/content.json`, com 8.297 entradas. Foram reaproveitados pares existentes, geradas traduções automáticas para os textos ausentes e revisados os rótulos/termos principais. A verificação automatizada de cobertura não equivale a uma revisão editorial de cada parágrafo técnico.

`useContentTranslation()` acompanha o idioma do i18next. Seu método `text` traduz textos de apresentação nos pontos de renderização; não modifica objetos de domínio, rotas, IDs, dados informados pelo usuário ou os arquivos que servem de dataset. A busca do material PostgreSQL usa o texto no idioma exibido, mantendo intactos os exemplos copiados.

Para mensagens que ficam guardadas em estado, o método `message` também reconhece o texto criado antes da troca de idioma. Não deve ser aplicado a nomes, comentários ou conteúdo arbitrário informado por usuários.

O catálogo inglês é carregado como um módulo estático separado, somente quando necessário. O português não carrega esse arquivo. A interface preserva os componentes e campos montados durante o carregamento e oferece recarregamento explícito se o arquivo não puder ser obtido. Não há chamada a serviço de tradução durante a navegação do visitante.

Os dois diagramas SVG de HTTP têm versões PT e EN; métodos, cabeçalhos e códigos HTTP canônicos permanecem preservados. A página 404 estática também respeita `site-language`, com o idioma do navegador como fallback.

## Manutenção

- Para texto editorial estático, usar `const { text: uiText } = useContentTranslation()` e envolver apenas os valores exibidos: `uiText("Material de apoio")`.
- Acrescentar o par correspondente ao catálogo inglês. O português fica no texto original; não é necessário duplicar o catálogo inteiro.
- Interpolação: `uiText("Questão {{0}}", [numero])`. Manter os marcadores nas traduções e preservar os valores fornecidos pelo usuário.
- Para mensagens de estado, usar `const { message: uiMessage } = useContentTranslation()`.
- Continuar usando os recursos PT/EN de `common.json` para a interface comum. Os testes conferem a paridade de chaves.
- Não traduzir strings de código, comandos, valores de campos, nomes de arquivos, URLs ou identificadores de dataset. Um texto como “Show only the Produto column” preserva `Produto` por ser o nome real da coluna usada no exercício.
- Títulos e corpos de posts continuam usando os campos `*_pt` e `*_en` cadastrados no backend. Esta entrega não cria traduções de posts no banco nem substitui sua configuração MySQL.

## Verificação

Executar `npm test`, `npm run lint`, `npm run build` e `npm run test:browser`.

A auditoria em inglês percorreu 74 amostras de rotas. A única ocorrência final identificada como português fora dos blocos de código foi `Produto`, um identificador de coluna que deve ser preservado. Para conteúdo protegido, a prova Pandas foi verificada em um contexto de teste com a autorização local da prova; a validação real de usuários e posts MySQL continua dependendo do backend configurado.

Os testes de navegador incluem cabeçalhos PT/EN, troca de idioma sem perder o formulário, preservação dos exemplos SQL, busca em inglês, carregamento sob demanda, recuperação de falha, diagramas localizados, 404, mensagens de erro após a troca de idioma e layout inglês no celular.

A revisão independente acrescentou regressões para preservar resultados e grupos de regex, nomes de equipes e conteúdo editorial dos campos explícitos do backend. A busca de tópicos PostgreSQL também considera as descrições localizadas. Resultados numéricos e de datas permanecem intactos; no histórico de IMC apenas os rótulos de apresentação acompanham o idioma atual.
