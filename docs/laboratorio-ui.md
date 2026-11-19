# Laboratório UI — proposta inicial

## Diagnóstico

O MainLayout já compartilha Navbar, Footer, CookieBanner e fundo. A variação está no corpo das telas: containers, títulos, cards e formulários são definidos diretamente nas páginas.

Exemplos observados:

- Disciplinas: max-w-5xl, cards p-8, grid gap-8 e título com ícone.
- Python: max-w-6xl, cards p-6, grid gap-5, título com categoria e botão de retorno.
- BuscaCep: campos, validação e resultados implementados na própria página.
- index.css: tema claro depende também de seletores de classes utilitárias usadas nas páginas.

## Primeira etapa

Validar componentes em /laboratorio-ui e três composições: /catalogo, /conteudo e /formulario. Preservar a identidade atual e o MainLayout. A proposta inicial foi ampliada e aplicada às páginas na branch refactor/padroniza-componentes-site.

Em vez de copiar um template por tela ou substituir tudo por uma biblioteca externa, a proposta usa componentes locais com estilos centralizados. Isso permite validar progressivamente sem adicionar dependências.

## Contratos propostos

- PageTemplate: largura de 1152px, margens responsivas, breadcrumb, categoria, h1, descrição e ações.
- Section e Panel: agrupamento semântico, hierarquia e superfície.
- CardGrid e ContentCard: catálogo responsivo, ação única por card e estado indisponível sem link.
- Button e Badge: ações principal/secundária e metadados.
- Field: label associado ao input, ajuda, obrigatoriedade e erro acessível.
- Notice e EmptyState: feedback e ausência de dados.

Os componentes ficam em src/components/ui/Patterns.jsx. Cores, espaçamentos e breakpoints ficam em patterns.css, com variáveis próprias para os temas claro e escuro. Os textos do laboratório estão em português; internacionalização fica para a adoção nas telas reais.

## Roteiro de validação

1. Abrir a galeria e navegar pelos três exemplos.
2. Conferir larguras de celular e desktop e trocar o tema pelo menu existente.
3. Navegar por links, botões e campos com Tab; conferir o foco visível.
4. Enviar o formulário vazio, preencher o nome e enviar novamente; testar Limpar.
5. Conferir títulos longos, card indisponível, mensagens e estado vazio.

A migração inclui PageHeader, PageDescription, PageTitle, Input, Textarea, Select, Table e TableContainer. PageTemplate oferece larguras default, wide e landing. Panel aceita as para preservar article, form, details, nav, li e links; layout="plain" preserva o fluxo existente. Button com variant="custom" mantém os estilos de controles especializados. Componentes de domínio como CodeBlock e ArchitectureTopicDiagram continuam responsáveis pelo seu conteúdo.

Novas telas devem partir de PageTemplate e dos componentes compartilhados, em vez de copiar containers e classes de aparência. Catálogos devem usar CardGrid/ContentCard e informar headingAs="h2" quando os cards forem filhos diretos do título principal; categorias com h2 usam o h3 padrão. Alterações de cor, largura e espaçamento comuns ficam em patterns.css.

Verificação: npm test, npm run lint e npm run build. Detalhes de cobertura e limites estão no plano de padronização em docs/superpowers/plans/2026-11-18-padronizacao-site.md.
