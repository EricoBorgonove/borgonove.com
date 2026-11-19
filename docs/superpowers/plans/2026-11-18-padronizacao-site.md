# Padronização do site — plano de implementação

**Objetivo:** aplicar os componentes do laboratório às telas existentes preservando conteúdo, rotas, traduções e comportamento.

**Arquitetura:** componentes de apresentação locais em src/components/ui; tokens globais para claro/escuro; componentes específicos de domínio permanecem nas páginas.

**Tecnologias:** React 19, React Router, Vite, Tailwind CSS.

**Referência:** docs/laboratorio-ui.md e pedido de migração integral na branch própria.

## Restrições

- Preservar alterações anteriores do laboratório e limpeza.
- Manter handlers, tipos de botão, refs, atributos ARIA, IDs e classes de estados interativos.
- Usar 1152px como largura padrão; variante ampla para dados e landing para Home.
- Não remover lógica de negócio ou conteúdo para simplificar a migração.

## Tarefas

- [x] Ampliar os contratos dos componentes para composição e atributos nativos; centralizar tokens e controles.
- [x] Migrar containers, títulos, superfícies e controles de todas as páginas e componentes de navegação/contato.
- [x] Migrar catálogos representativos para ContentCard; manter variações de domínio explícitas.
- [x] Verificar lint, build, renderização de rotas, formulários, responsividade e temas; registrar limitações reais.

## Pontos de revisão

- Botões de submit/reset e inputs checkbox/range não podem mudar de comportamento.
- Links e rotas parametrizadas devem preservar navegação e retornos de erro.
- Painéis flex e overlays devem preservar posicionamento.
- Tabelas devem continuar roláveis no celular.
- Tema claro e escuro devem funcionar fora e dentro dos containers.

## Decisões de execução

Executar diretamente na branch solicitada, preservando as alterações locais existentes. A migração mecânica usa análise de JSX para preservar expressões e handlers; catálogos são revisados manualmente.

## Registro de verificação

- Sete testes de contrato em tests/ui.test.mjs; executar com npm test.
- npm run lint e npm run build aprovados.
- Chromium: 96 rotas renderizadas sem pageerror; formulário vazio, preenchido e limpeza; validação de CEP vazio.
- Quatro telas administrativas renderizadas com sessão e posts simulados. Backend PHP/MySQL real não foi validado.
- 32 verificações de página/tema/largura: dark/light, 390px/1440px, sem overflow horizontal do documento nas páginas selecionadas.
- Revisão independente identificou e motivou correções de padding dos campos, hierarquia dos cards, tradução de ações e headers aninhados.
- Variações custom de botões preservam estados, tamanhos e cores de controles especializados; não substituem lógica de domínio.
