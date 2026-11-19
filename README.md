# Borgonove.Tech — Laboratório de Tecnologia, Ensino e Prática

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![Status](https://img.shields.io/badge/Status-Em%20evolu%C3%A7%C3%A3o-06B6D4)
![Licença](https://img.shields.io/badge/Licen%C3%A7a-Uso%20Educacional-0EA5E9)

> Este projeto foi criado para apoiar aulas, prática guiada e construção de portfólio real.
> A proposta é simples: **aprender fazendo**, com conteúdo técnico aplicado ao mercado.

---

## O que você encontra aqui

- Página institucional da Borgonove.Tech
- Seção de **Disciplinas** com trilhas de estudo
- Disciplina de **Algoritmos** com listas extensas de exercícios
- Disciplina de **Git e GitHub** (do zero ao push/pull)
- Área de **Utilidades** com ferramentas práticas
- Modo claro/escuro
- Layout responsivo (desktop + mobile)

---

## Para alunos: como usar este repositório

1. Clone o projeto
2. Rode localmente
3. Navegue pelas disciplinas e utilidades
4. Escolha um tema para praticar
5. Faça suas melhorias e publique seu próprio repositório

Esse fluxo é ideal para treinar:
- versionamento com Git
- organização de projeto front-end
- publicação contínua
- evolução incremental de produto

---

## Stack do projeto

- **React**
- **Vite**
- **React Router**
- **Tailwind CSS**
- JavaScript (ESM)

---

## Como executar localmente

```bash
npm install
npm run dev
```

Para as APIs PHP locais, em outro terminal:

```bash
npm run dev:api
```

O Vite encaminha `/api` para `127.0.0.1:8080`. Para blog e administração, copie `public/api/db-config.php.example` para `public/api/db-config.php` e preencha os dados do seu MySQL. O arquivo final com credenciais é ignorado pelo Git. Sem esses dados, a conexão com o banco não funciona; não use credenciais fictícias em produção.

Verificação dos componentes e regressões de interface:

```bash
npm test
npx playwright install chromium
npm run test:browser
```

Os testes de navegador cobrem os cortes mobile da revisão, os temas claro/escuro, validação da calculadora, teclado, foco e fechamento do modal. Não gravam dados no backend.

Build de produção:

```bash
npm run build
npm run preview
```

---

## Rotas principais

Laboratório visual dos componentes compartilhados: `/laboratorio-ui` (catálogo, conteúdo e formulário).

Os padrões de apresentação ficam em `src/components/ui/Patterns.jsx` e `patterns.css`. Execute `npm test` para verificar os contratos dos componentes.

O seletor PT/EN também cobre aulas, exercícios e materiais estáticos. O catálogo inglês fica em `src/locales/en/content.json` e é carregado sob demanda. Para conteúdo novo, use `useContentTranslation` e mantenha comandos, datasets e nomes de arquivos intactos. As orientações completas estão em `docs/idiomas-pt-en.md`.

- `/` — Home
- `/disciplinas` — Lista de disciplinas
- `/disciplinas/algoritmos` — Listas de exercícios de algoritmos
- `/disciplinas/git-github` — Trilha prática de Git e GitHub
- `/utilidades` — Ferramentas de apoio
- `/contato` — Página de contato

---

## Deploy automático (GitHub -> cPanel HostGator)

O projeto já possui workflow de deploy via GitHub Actions.

Arquivos importantes:
- `.github/workflows/deploy-cpanel-hostgator.yml`
- `docs/deploy_github_actions_cpanel_ssh_key.txt`
- `public/.htaccess`

Resumo do fluxo:
1. Push na `main`
2. GitHub Actions faz build
3. Envia `dist` para `public_html` (ou pasta configurada)

---

## Estrutura resumida

```text
src/
  components/
  data/
  layout/
  pages/
public/
  .htaccess
.github/workflows/
docs/
```

---

## Boas práticas para contribuição (alunos e colaboradores)

- Commits curtos e objetivos (`feat`, `fix`, `refactor`)
- Evite misturar muitas mudanças no mesmo commit
- Sempre testar localmente antes do push
- Priorize clareza de código e nomes sem ambiguidade

Exemplo de ciclo recomendado:

```bash
git checkout -b feature/minha-melhoria
git add .
git commit -m "feat: adiciona melhoria X"
git push -u origin feature/minha-melhoria
```

---

## Próximos passos sugeridos para estudo

1. Completar a trilha de Git e GitHub
2. Resolver listas de Algoritmos em ordem crescente
3. Criar uma nova utilidade e integrar ao menu
4. Publicar versão própria com deploy automático

---

## Autor

**Erico Borgonove**

- LinkedIn: https://www.linkedin.com/in/ericoborgonove/
- GitHub: https://github.com/EricoBorgonove
- Lattes: http://lattes.cnpq.br/5737380193383374
- YouTube: https://www.youtube.com/@erico.borgonove

---

Se você é aluno: escolha uma melhoria pequena, implemente bem e publique.
Constância + prática real = evolução técnica de verdade.
