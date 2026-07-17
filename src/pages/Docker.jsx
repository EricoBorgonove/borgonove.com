import { useTranslation } from "react-i18next";
import BackButton from "../components/BackButton";
import CodeBlock from "../components/CodeBlock";

const COMMAND_SECTIONS_PT = [
  {
    title: "1. Instalar Docker no Ubuntu pelo repositório oficial",
    description:
      "Fluxo recomendado para Ubuntu: remove pacotes conflitantes, adiciona a chave GPG oficial, cadastra o repositório da Docker e instala Engine, CLI, Buildx e Compose.",
    commands: [
      {
        command:
          "sudo apt remove docker.io docker-compose docker-compose-v2 docker-doc podman-docker containerd runc",
        explanation:
          "Remove versões antigas ou pacotes não oficiais que podem entrar em conflito com a instalação oficial.",
        example: "Execute antes de instalar, mesmo que o apt informe que alguns pacotes não existem.",
      },
      {
        command: "sudo apt update",
        explanation: "Atualiza o índice de pacotes do Ubuntu.",
        example: "Use sempre antes de instalar dependências novas.",
      },
      {
        command: "sudo apt install ca-certificates curl",
        explanation:
          "Instala ferramentas necessárias para baixar a chave de assinatura e acessar repositórios HTTPS.",
        example: "Sem esses pacotes, o apt pode falhar ao validar o repositório da Docker.",
      },
      {
        command: "sudo install -m 0755 -d /etc/apt/keyrings",
        explanation: "Cria a pasta segura onde a chave GPG da Docker será armazenada.",
        example: "O modo 0755 permite leitura do sistema e escrita administrativa.",
      },
      {
        command:
          "sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc",
        explanation: "Baixa a chave GPG oficial usada para verificar os pacotes Docker.",
        example: "Se esse comando falhar, verifique internet, DNS ou proxy.",
      },
      {
        command: "sudo chmod a+r /etc/apt/keyrings/docker.asc",
        explanation: "Permite que o apt leia a chave durante a verificação dos pacotes.",
        example: "Sem essa permissão, o apt pode acusar repositório não assinado.",
      },
      {
        command:
          'echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo ${UBUNTU_CODENAME:-$VERSION_CODENAME}) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null',
        explanation:
          "Adiciona o repositório estável da Docker conforme arquitetura e codinome da sua versão do Ubuntu.",
        example: "Em Ubuntu 24.04, o codinome normalmente será noble.",
      },
      {
        command: "sudo apt update",
        explanation: "Atualiza novamente o índice, agora incluindo o repositório da Docker.",
        example: "Depois disso, o apt passa a encontrar docker-ce e plugins oficiais.",
      },
      {
        command:
          "sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin",
        explanation:
          "Instala Docker Engine, cliente de linha de comando, runtime containerd, Buildx e Docker Compose v2.",
        example: "Esse é o pacote completo para desenvolvimento local e uso em servidor.",
      },
      {
        command: "sudo systemctl status docker",
        explanation: "Mostra se o serviço Docker está ativo no Ubuntu.",
        example: "Procure por active (running).",
      },
      {
        command: "sudo systemctl start docker",
        explanation: "Inicia o serviço Docker manualmente.",
        example: "Use se o status mostrar que o serviço está parado.",
      },
      {
        command: "sudo systemctl enable docker",
        explanation: "Configura o Docker para iniciar automaticamente com o sistema.",
        example: "Útil em servidores e máquinas de laboratório.",
      },
      {
        command: "sudo docker run hello-world",
        explanation: "Baixa e executa uma imagem de teste oficial para validar a instalação.",
        example: "Se aparecer a mensagem de sucesso, Engine, rede e pull de imagens estão funcionando.",
      },
      {
        command: "sudo usermod -aG docker $USER",
        explanation:
          "Adiciona seu usuário ao grupo docker para rodar comandos sem sudo.",
        example: "Depois desse comando, saia e entre novamente na sessão.",
      },
      {
        command: "newgrp docker",
        explanation: "Ativa o grupo docker na sessão atual sem precisar reiniciar o computador.",
        example: "Depois rode docker ps sem sudo para testar.",
      },
    ],
  },
  {
    title: "2. Instalar Docker no macOS",
    description:
      "No Mac, o caminho principal é Docker Desktop. Ele inclui Engine, CLI, Compose, Kubernetes opcional e interface gráfica.",
    commands: [
      {
        command: "brew install --cask docker",
        explanation:
          "Instala o Docker Desktop via Homebrew Cask, caso você use Homebrew.",
        example: "Depois da instalação, abra o app Docker para iniciar o serviço.",
      },
      {
        command: "open -a Docker",
        explanation: "Abre o Docker Desktop pelo terminal.",
        example: "Use após instalar para carregar a VM Linux interna do Docker Desktop.",
      },
      {
        command: "sudo hdiutil attach Docker.dmg",
        explanation:
          "Monta o instalador DMG baixado manualmente do site oficial da Docker.",
        example: "Use quando preferir instalar via linha de comando sem Homebrew.",
      },
      {
        command: "sudo /Volumes/Docker/Docker.app/Contents/MacOS/install",
        explanation: "Executa o instalador do Docker Desktop a partir do volume montado.",
        example: "O processo pode demorar alguns minutos por validações do macOS.",
      },
      {
        command: "sudo hdiutil detach /Volumes/Docker",
        explanation: "Desmonta o volume do instalador após a instalação.",
        example: "Execute quando a instalação terminar.",
      },
      {
        command: "docker version",
        explanation: "Confirma se cliente e servidor Docker estão disponíveis.",
        example: "Se mostrar erro de daemon, abra o Docker Desktop e aguarde ficar pronto.",
      },
      {
        command: "docker run hello-world",
        explanation: "Executa o teste básico de funcionamento no macOS.",
        example: "Valida pull de imagem, execução de container e comunicação com o Engine.",
      },
    ],
  },
  {
    title: "3. Docker Desktop no Ubuntu: instalação e configuração",
    description:
      "Além do Docker Engine, o Ubuntu também pode usar Docker Desktop. Ele roda uma VM própria, oferece interface gráfica, integra Compose, mostra containers/imagens/volumes visualmente e usa o contexto desktop-linux.",
    commands: [
      {
        command: "sudo apt install gnome-terminal",
        explanation:
          "Instala o terminal do GNOME, exigido pela Docker quando você usa ambientes gráficos que não são GNOME.",
        example:
          "Use em KDE, XFCE, Cinnamon ou outras interfaces caso o Docker Desktop precise abrir terminal integrado.",
      },
      {
        command:
          "curl -L -o docker-desktop-amd64.deb https://desktop.docker.com/linux/main/amd64/docker-desktop-amd64.deb",
        explanation:
          "Baixa o pacote DEB do Docker Desktop para Ubuntu diretamente pelo terminal.",
        example:
          "Também é possível baixar pelo navegador na página oficial e executar o apt sobre o arquivo baixado.",
      },
      {
        command: "sudo apt update",
        explanation:
          "Atualiza a lista de pacotes antes de instalar o arquivo DEB e resolver dependências.",
        example:
          "Execute na mesma pasta onde está o arquivo docker-desktop-amd64.deb.",
      },
      {
        command: "sudo apt install ./docker-desktop-amd64.deb",
        explanation:
          "Instala o Docker Desktop a partir do pacote local e configura componentes auxiliares automaticamente.",
        example:
          "Se aparecer um aviso sobre download unsandboxed como root, a documentação informa que ele pode ser ignorado.",
      },
      {
        command: "systemctl --user start docker-desktop",
        explanation:
          "Inicia o Docker Desktop para o usuário atual pelo terminal.",
        example:
          "Alternativamente, abra Docker Desktop pelo menu de aplicativos do Ubuntu.",
      },
      {
        command: "systemctl --user enable docker-desktop",
        explanation:
          "Configura o Docker Desktop para iniciar automaticamente quando você entrar na sessão do Ubuntu.",
        example:
          "Use se você trabalha com Docker todos os dias e quer evitar iniciar manualmente.",
      },
      {
        command: "systemctl --user stop docker-desktop",
        explanation:
          "Encerra o Docker Desktop do usuário atual.",
        example:
          "Use quando quiser liberar memória, CPU ou encerrar a VM interna do Desktop.",
      },
      {
        command: "docker context ls",
        explanation:
          "Lista os contextos disponíveis e mostra se o terminal está apontando para Docker Engine local ou Docker Desktop.",
        example:
          "Depois que o Desktop inicia no Linux, normalmente aparece o contexto desktop-linux.",
      },
      {
        command: "docker context use desktop-linux",
        explanation:
          "Faz o terminal usar o ambiente do Docker Desktop no Linux.",
        example:
          "Use quando quiser ver no terminal os mesmos containers/imagens que aparecem no Docker Desktop.",
      },
      {
        command: "docker context use default",
        explanation:
          "Volta o terminal para o Docker Engine local instalado diretamente no Ubuntu.",
        example:
          "Use se você instalou Docker Engine e Docker Desktop no mesmo Ubuntu e quer alternar entre eles.",
      },
      {
        command: "docker compose version",
        explanation:
          "Confirma se o Compose v2 instalado pelo Docker Desktop está disponível no terminal.",
        example:
          "A resposta deve aparecer como Docker Compose version v2.x.x.",
      },
      {
        command: "docker run --rm hello-world",
        explanation:
          "Valida se o Docker Desktop consegue baixar imagem, criar container, executar e remover ao final.",
        example:
          "O --rm remove o container de teste automaticamente depois da execução.",
      },
    ],
  },
  {
    title: "4. Docker Desktop no macOS: instalação e configuração",
    description:
      "No macOS, Docker Desktop é o caminho padrão. Ele cria uma VM Linux interna, oferece dashboard, integra CLI/Compose, permite ajustar CPU, memória, disco, compartilhamento de arquivos e recursos como Kubernetes.",
    commands: [
      {
        command: "softwareupdate --install-rosetta",
        explanation:
          "Instala o Rosetta 2 em Macs Apple Silicon quando alguma dependência Intel ainda for necessária.",
        example:
          "Execute apenas em Mac com chip Apple Silicon se o macOS ou Docker solicitar compatibilidade com Intel.",
      },
      {
        command: "brew install --cask docker",
        explanation:
          "Instala o Docker Desktop usando Homebrew, uma forma simples e reproduzível para ambientes de desenvolvimento.",
        example:
          "Depois da instalação, o aplicativo Docker fica disponível na pasta Applications.",
      },
      {
        command: "open -a Docker",
        explanation:
          "Abre o Docker Desktop e inicia a VM Linux interna usada para rodar containers no macOS.",
        example:
          "Na primeira abertura, aceite os termos e conclua a configuração inicial solicitada pela interface.",
      },
      {
        command: "sudo hdiutil attach Docker.dmg",
        explanation:
          "Monta o instalador DMG caso você tenha baixado o Docker Desktop manualmente pelo site.",
        example:
          "Use este caminho quando não quiser instalar via Homebrew.",
      },
      {
        command: "sudo /Volumes/Docker/Docker.app/Contents/MacOS/install --accept-license",
        explanation:
          "Instala o Docker Desktop via linha de comando aceitando a licença no fluxo automatizado.",
        example:
          "Útil para laboratório, provisionamento ou instalação padronizada em várias máquinas.",
      },
      {
        command: "sudo hdiutil detach /Volumes/Docker",
        explanation:
          "Desmonta o instalador DMG depois que a instalação terminou.",
        example:
          "Execute para limpar o volume temporário do instalador.",
      },
      {
        command: "docker --version",
        explanation:
          "Confirma se o comando docker está acessível no terminal do macOS.",
        example:
          "Se o comando não existir, verifique a configuração de symlink/binários no Docker Desktop.",
      },
      {
        command: "docker compose version",
        explanation:
          "Confirma se o Docker Compose v2 está disponível junto com Docker Desktop.",
        example:
          "Use para validar projetos com compose.yaml.",
      },
      {
        command: "docker context ls",
        explanation:
          "Mostra o contexto ativo no macOS e ajuda a diagnosticar para qual Docker o terminal está apontando.",
        example:
          "Em uso comum no macOS, o Docker Desktop deve estar como ambiente ativo.",
      },
      {
        command: "docker run --rm -p 8080:80 nginx",
        explanation:
          "Executa nginx no Docker Desktop, publica a porta 80 do container na porta 8080 do Mac e remove o container ao finalizar.",
        example:
          "Abra http://localhost:8080 para confirmar que container, rede e porta funcionaram.",
      },
      {
        command: "docker login",
        explanation:
          "Conecta o Docker Desktop à sua conta Docker Hub para baixar imagens com menos limitação e publicar imagens próprias.",
        example:
          "Após login, o Desktop também mostra sua conta na interface gráfica.",
      },
    ],
  },
  {
    title: "5. Comandos de diagnóstico e informações",
    description: "Use estes comandos para confirmar versão, estado do daemon e recursos disponíveis.",
    commands: [
      {
        command: "docker --version",
        explanation: "Mostra a versão do cliente Docker instalada.",
        example: "docker --version",
      },
      {
        command: "docker version",
        explanation: "Mostra versões do cliente e do servidor Docker.",
        example: "Útil para descobrir se o daemon está acessível.",
      },
      {
        command: "docker info",
        explanation: "Exibe detalhes do ambiente: storage driver, CPUs, memória, imagens, containers e plugins.",
        example: "docker info",
      },
      {
        command: "docker context ls",
        explanation: "Lista contextos Docker disponíveis.",
        example: "Use para alternar entre Docker Desktop, servidores remotos ou ambientes cloud.",
      },
      {
        command: "docker context use default",
        explanation: "Seleciona o contexto padrão.",
        example: "Corrige casos em que o terminal aponta para um contexto remoto errado.",
      },
      {
        command: "docker system df",
        explanation: "Mostra quanto espaço imagens, containers, volumes e cache ocupam.",
        example: "Bom antes de limpar o ambiente.",
      },
      {
        command: "docker events",
        explanation: "Acompanha eventos do Docker em tempo real.",
        example: "Abra em um terminal e, em outro, rode ou pare containers para observar eventos.",
      },
    ],
  },
  {
    title: "6. Imagens Docker",
    description:
      "Imagens são os pacotes imutáveis que servem de base para criar containers.",
    commands: [
      {
        command: "docker pull nginx",
        explanation: "Baixa a imagem nginx do Docker Hub.",
        example: "docker pull nginx:latest",
      },
      {
        command: "docker images",
        explanation: "Lista imagens locais.",
        example: "Veja repository, tag, image id, data de criação e tamanho.",
      },
      {
        command: "docker image ls",
        explanation: "Forma moderna equivalente para listar imagens.",
        example: "docker image ls",
      },
      {
        command: "docker image inspect nginx",
        explanation: "Mostra metadados detalhados da imagem em JSON.",
        example: "docker image inspect nginx:latest",
      },
      {
        command: "docker tag nginx meu-nginx:1.0",
        explanation: "Cria uma nova tag local para uma imagem existente.",
        example: "Use antes de publicar uma imagem com nome próprio.",
      },
      {
        command: "docker rmi meu-nginx:1.0",
        explanation: "Remove uma imagem local pelo nome ou ID.",
        example: "Se houver container usando a imagem, remova o container antes.",
      },
      {
        command: "docker image prune",
        explanation: "Remove imagens não utilizadas.",
        example: "Use para liberar espaço com segurança moderada.",
      },
      {
        command: "docker search postgres",
        explanation: "Pesquisa imagens no Docker Hub pelo terminal.",
        example: "docker search redis",
      },
      {
        command: "docker history nginx",
        explanation: "Mostra as camadas de uma imagem.",
        example: "Útil para entender tamanho e passos de build.",
      },
    ],
  },
  {
    title: "7. Containers: criar, executar, parar e remover",
    description:
      "Containers são processos isolados criados a partir de imagens.",
    commands: [
      {
        command: "docker run nginx",
        explanation: "Cria e executa um container a partir da imagem nginx.",
        example: "Se a imagem não existir localmente, o Docker baixa automaticamente.",
      },
      {
        command: "docker run --name web -d -p 8080:80 nginx",
        explanation:
          "Executa nginx em segundo plano, nomeia o container como web e publica a porta 80 do container na 8080 da máquina.",
        example: "Acesse http://localhost:8080 no navegador.",
      },
      {
        command: "docker ps",
        explanation: "Lista containers em execução.",
        example: "docker ps",
      },
      {
        command: "docker ps -a",
        explanation: "Lista containers em execução e parados.",
        example: "Use para encontrar containers finalizados.",
      },
      {
        command: "docker stop web",
        explanation: "Para um container em execução de forma controlada.",
        example: "docker stop web",
      },
      {
        command: "docker start web",
        explanation: "Inicia um container parado.",
        example: "docker start web",
      },
      {
        command: "docker restart web",
        explanation: "Reinicia um container.",
        example: "Útil depois de mudar variáveis externas ou recuperar serviço travado.",
      },
      {
        command: "docker rm web",
        explanation: "Remove um container parado.",
        example: "Pare antes com docker stop web.",
      },
      {
        command: "docker rm -f web",
        explanation: "Força a parada e remoção do container.",
        example: "Use em laboratório quando não precisar preservar o processo.",
      },
      {
        command: "docker rename web site",
        explanation: "Renomeia um container.",
        example: "docker rename web nginx-local",
      },
      {
        command: "docker stats",
        explanation: "Mostra uso de CPU, memória, rede e disco em tempo real.",
        example: "Use para identificar containers pesados.",
      },
      {
        command: "docker top web",
        explanation: "Lista processos dentro do container.",
        example: "docker top web",
      },
    ],
  },
  {
    title: "8. Entrar, copiar arquivos, logs e debug",
    description: "Comandos essenciais para investigar containers durante desenvolvimento e suporte.",
    commands: [
      {
        command: "docker logs web",
        explanation: "Mostra logs do container.",
        example: "docker logs --tail 50 web",
      },
      {
        command: "docker logs -f web",
        explanation: "Acompanha logs em tempo real.",
        example: "Use durante testes de API ou inicialização de serviços.",
      },
      {
        command: "docker exec -it web bash",
        explanation: "Abre um shell bash dentro do container em execução.",
        example: "Se bash não existir, tente sh.",
      },
      {
        command: "docker exec -it web sh",
        explanation: "Abre um shell sh dentro do container.",
        example: "Funciona bem em imagens minimalistas como alpine.",
      },
      {
        command: "docker cp ./index.html web:/usr/share/nginx/html/index.html",
        explanation: "Copia arquivo da máquina host para dentro do container.",
        example: "Atualiza a página servida pelo nginx.",
      },
      {
        command: "docker cp web:/etc/nginx/nginx.conf ./nginx.conf",
        explanation: "Copia arquivo de dentro do container para a máquina host.",
        example: "Use para estudar configurações internas.",
      },
      {
        command: "docker inspect web",
        explanation: "Exibe configuração completa do container em JSON.",
        example: "Procure IP, mounts, env, ports e network settings.",
      },
      {
        command: "docker port web",
        explanation: "Mostra mapeamentos de portas do container.",
        example: "docker port web",
      },
    ],
  },
  {
    title: "9. Variáveis, portas e volumes",
    description:
      "Esses comandos conectam container ao mundo externo: configuração, persistência e acesso via rede.",
    commands: [
      {
        command: "docker run --name mysql -e MYSQL_ROOT_PASSWORD=123456 -d mysql:8",
        explanation: "Cria MySQL com variável de ambiente para senha root.",
        example: "Variáveis são comuns em bancos, APIs e serviços configuráveis.",
      },
      {
        command: "docker run --env-file .env minha-api",
        explanation: "Carrega variáveis de ambiente a partir de um arquivo .env.",
        example: "Evita comandos enormes com muitas opções -e.",
      },
      {
        command: "docker run -p 3000:3000 minha-api",
        explanation: "Mapeia porta da máquina host para porta do container.",
        example: "host:container, então 3000:3000 expõe a API em localhost:3000.",
      },
      {
        command: "docker volume create dados_mysql",
        explanation: "Cria um volume gerenciado pelo Docker.",
        example: "Volumes preservam dados mesmo quando o container é removido.",
      },
      {
        command:
          "docker run --name mysql -e MYSQL_ROOT_PASSWORD=123456 -v dados_mysql:/var/lib/mysql -d mysql:8",
        explanation: "Executa MySQL persistindo dados no volume dados_mysql.",
        example: "Remover o container não apaga o banco salvo no volume.",
      },
      {
        command: "docker volume ls",
        explanation: "Lista volumes Docker.",
        example: "docker volume ls",
      },
      {
        command: "docker volume inspect dados_mysql",
        explanation: "Mostra detalhes e caminho físico do volume.",
        example: "docker volume inspect dados_mysql",
      },
      {
        command: "docker volume rm dados_mysql",
        explanation: "Remove um volume não utilizado.",
        example: "Cuidado: isso apaga dados persistidos.",
      },
      {
        command: "docker run -v $(pwd):/app -w /app node:22 npm test",
        explanation:
          "Monta a pasta atual em /app, define diretório de trabalho e executa testes com Node dentro do container.",
        example: "Excelente para rodar ferramentas sem instalar Node localmente.",
      },
    ],
  },
  {
    title: "10. Redes Docker",
    description:
      "Redes permitem que containers se comuniquem por nome, sem depender de IP fixo.",
    commands: [
      {
        command: "docker network ls",
        explanation: "Lista redes Docker.",
        example: "Você verá redes como bridge, host e none.",
      },
      {
        command: "docker network create app-net",
        explanation: "Cria uma rede bridge personalizada.",
        example: "Containers na mesma rede podem se acessar pelo nome.",
      },
      {
        command:
          "docker run --name db --network app-net -e POSTGRES_PASSWORD=123456 -d postgres:16",
        explanation: "Executa PostgreSQL conectado à rede app-net.",
        example: "Outro container na app-net acessa o banco pelo host db.",
      },
      {
        command: "docker network connect app-net web",
        explanation: "Conecta um container existente a uma rede.",
        example: "docker network connect app-net web",
      },
      {
        command: "docker network disconnect app-net web",
        explanation: "Desconecta um container de uma rede.",
        example: "docker network disconnect app-net web",
      },
      {
        command: "docker network inspect app-net",
        explanation: "Mostra containers conectados, sub-rede e configurações da rede.",
        example: "Use para depurar comunicação entre serviços.",
      },
      {
        command: "docker network rm app-net",
        explanation: "Remove uma rede sem containers conectados.",
        example: "Pare ou desconecte containers antes.",
      },
    ],
  },
  {
    title: "11. Dockerfile e build de imagens",
    description:
      "Dockerfile descreve como construir uma imagem própria para sua aplicação.",
    commands: [
      {
        command: "docker build -t minha-api:1.0 .",
        explanation: "Constrói uma imagem usando o Dockerfile da pasta atual.",
        example: "A tag minha-api:1.0 facilita rodar e versionar a imagem.",
      },
      {
        command: "docker build --no-cache -t minha-api:1.0 .",
        explanation: "Constrói ignorando cache de camadas.",
        example: "Use quando suspeitar de dependências antigas em cache.",
      },
      {
        command: "docker build -f Dockerfile.prod -t minha-api:prod .",
        explanation: "Constrói usando um arquivo Dockerfile específico.",
        example: "Útil quando há Dockerfile.dev e Dockerfile.prod.",
      },
      {
        command: "docker run --rm minha-api:1.0",
        explanation: "Executa a imagem e remove o container automaticamente ao terminar.",
        example: "Bom para scripts, testes e jobs rápidos.",
      },
      {
        command: "docker login",
        explanation: "Autentica em um registry como Docker Hub.",
        example: "Necessário antes de fazer push para repositórios privados.",
      },
      {
        command: "docker tag minha-api:1.0 usuario/minha-api:1.0",
        explanation: "Prepara a imagem com nome do repositório remoto.",
        example: "Troque usuario pelo seu usuário no Docker Hub.",
      },
      {
        command: "docker push usuario/minha-api:1.0",
        explanation: "Envia a imagem para o registry.",
        example: "Depois outra máquina pode usar docker pull usuario/minha-api:1.0.",
      },
      {
        command: "docker buildx ls",
        explanation: "Lista builders disponíveis para builds avançados.",
        example: "Buildx vem no pacote oficial instalado no Ubuntu e Docker Desktop.",
      },
      {
        command: "docker buildx build --platform linux/amd64,linux/arm64 -t usuario/minha-api:1.0 --push .",
        explanation: "Constrói imagem multi-arquitetura e publica no registry.",
        example: "Útil para rodar em servidores x86 e Macs Apple Silicon.",
      },
    ],
  },
  {
    title: "12. Docker Compose",
    description:
      "Compose orquestra múltiplos containers com um arquivo compose.yaml.",
    commands: [
      {
        command: "docker compose version",
        explanation: "Confirma a instalação do Docker Compose v2.",
        example: "No Compose v2 o comando é docker compose, sem hífen.",
      },
      {
        command: "docker compose up",
        explanation: "Cria e inicia serviços definidos no compose.yaml.",
        example: "Use na pasta onde está o compose.yaml.",
      },
      {
        command: "docker compose up -d",
        explanation: "Inicia os serviços em segundo plano.",
        example: "docker compose up -d",
      },
      {
        command: "docker compose ps",
        explanation: "Lista serviços do projeto Compose.",
        example: "docker compose ps",
      },
      {
        command: "docker compose logs -f",
        explanation: "Acompanha logs de todos os serviços em tempo real.",
        example: "docker compose logs -f api",
      },
      {
        command: "docker compose exec api sh",
        explanation: "Entra em um serviço em execução.",
        example: "Troque api pelo nome do serviço no compose.yaml.",
      },
      {
        command: "docker compose down",
        explanation: "Para e remove containers e rede do projeto.",
        example: "Volumes nomeados não são removidos por padrão.",
      },
      {
        command: "docker compose down -v",
        explanation: "Para o projeto e remove volumes associados.",
        example: "Cuidado: apaga dados de bancos usados no Compose.",
      },
      {
        command: "docker compose build",
        explanation: "Constrói imagens dos serviços que possuem build.",
        example: "Use depois de mudar Dockerfile ou dependências.",
      },
      {
        command: "docker compose pull",
        explanation: "Baixa versões mais recentes das imagens dos serviços.",
        example: "docker compose pull",
      },
      {
        command: "docker compose restart",
        explanation: "Reinicia serviços do projeto.",
        example: "docker compose restart api",
      },
    ],
  },
  {
    title: "13. Limpeza, manutenção e remoção",
    description:
      "Comandos para liberar espaço e desmontar ambientes. Leia os exemplos antes de executar em produção.",
    commands: [
      {
        command: "docker container prune",
        explanation: "Remove containers parados.",
        example: "Seguro quando você não precisa preservar containers finalizados.",
      },
      {
        command: "docker image prune",
        explanation: "Remove imagens dangling, sem tag.",
        example: "docker image prune",
      },
      {
        command: "docker image prune -a",
        explanation: "Remove imagens não usadas por containers.",
        example: "Mais agressivo: pode exigir novo download depois.",
      },
      {
        command: "docker volume prune",
        explanation: "Remove volumes não utilizados.",
        example: "Cuidado com dados de bancos.",
      },
      {
        command: "docker network prune",
        explanation: "Remove redes não utilizadas.",
        example: "docker network prune",
      },
      {
        command: "docker system prune",
        explanation: "Remove containers parados, redes não usadas, imagens dangling e cache.",
        example: "Boa limpeza geral de laboratório.",
      },
      {
        command: "docker system prune -a --volumes",
        explanation: "Limpeza máxima: remove imagens não usadas e volumes não usados.",
        example: "Use apenas quando tiver certeza de que pode perder dados locais.",
      },
      {
        command: "sudo apt purge docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin",
        explanation: "Remove pacotes Docker do Ubuntu.",
        example: "Não remove automaticamente dados em /var/lib/docker.",
      },
      {
        command: "sudo rm -rf /var/lib/docker /var/lib/containerd",
        explanation: "Remove dados locais do Docker Engine no Ubuntu.",
        example: "Ação destrutiva: apaga imagens, containers e volumes.",
      },
    ],
  },
];

const DOCKERFILE_EXAMPLE = `FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]`;

const COMPOSE_EXAMPLE = `services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgres://postgres:123456@db:5432/app
    depends_on:
      - db

  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: 123456
      POSTGRES_DB: app
    volumes:
      - dados_postgres:/var/lib/postgresql/data

volumes:
  dados_postgres:`;

const DOCKER_CONCEPTS = [
  {
    title: "Imagem",
    description:
      "É o pacote pronto da aplicação ou serviço. Pense nela como um molde: contém sistema base, dependências, arquivos e comando de inicialização.",
  },
  {
    title: "Container",
    description:
      "É uma execução isolada de uma imagem. A imagem é o molde; o container é o processo rodando a partir desse molde.",
  },
  {
    title: "Volume",
    description:
      "É a forma mais segura de preservar dados fora do ciclo de vida do container. Se o container for removido, o volume pode continuar existindo.",
  },
  {
    title: "Rede",
    description:
      "É o espaço de comunicação entre containers. Em uma rede personalizada, serviços conseguem conversar usando nomes, como db, api ou redis.",
  },
  {
    title: "Compose",
    description:
      "É o arquivo de orquestração local. Ele descreve vários serviços, portas, variáveis, volumes e dependências em um único lugar.",
  },
];

const DOCKERFILE_NOTES = [
  "`FROM node:22-alpine` escolhe a imagem base. Tudo será construído em cima de um Linux leve com Node.js.",
  "`WORKDIR /app` define a pasta principal dentro da imagem; os comandos seguintes passam a rodar nesse diretório.",
  "`COPY package*.json ./` copia primeiro os arquivos de dependências para aproveitar cache no build.",
  "`RUN npm ci` instala dependências de forma reproduzível, usando o lockfile.",
  "`COPY . .` copia o restante do projeto para dentro da imagem.",
  "`EXPOSE 3000` documenta a porta usada pela aplicação. A publicação real acontece no docker run ou no Compose.",
  "`CMD [...]` define o comando padrão executado quando o container inicia.",
];

const COMPOSE_NOTES = [
  "`services` agrupa os containers do projeto. Neste exemplo existem api e db.",
  "`build: .` manda construir a imagem da API usando o Dockerfile da pasta atual.",
  "`ports` publica a porta do container na máquina. O formato é maquina:container.",
  "`environment` injeta configurações, como URL do banco, sem alterar o código-fonte.",
  "`depends_on` inicia o serviço db antes da api, mas não substitui uma checagem real de prontidão do banco.",
  "`image: postgres:16` usa uma imagem pronta do PostgreSQL.",
  "`volumes` preserva os dados do banco fora do container.",
];

const DESKTOP_SETTINGS = [
  {
    title: "General",
    description:
      "Ative Start Docker Desktop when you sign in se quiser que o ambiente esteja pronto ao iniciar a sessão. Também é aqui que você ajusta tema, dashboard inicial e preferências gerais.",
  },
  {
    title: "Resources",
    description:
      "Defina limite de CPU, memória, swap e disco da VM usada pelo Docker Desktop. Em máquinas com 8 GB de RAM, comece conservador: 2 CPUs e 2 a 4 GB de memória costumam ser suficientes para estudo.",
  },
  {
    title: "File sharing",
    description:
      "No macOS e Linux, confira quais pastas do host podem ser montadas em containers. Se um volume com caminho local falhar, normalmente a pasta não está compartilhada ou não tem permissão.",
  },
  {
    title: "Docker Engine",
    description:
      "Área avançada para editar configurações do daemon em JSON. Use com cuidado; uma vírgula errada pode impedir o Engine de reiniciar.",
  },
  {
    title: "Builders",
    description:
      "Gerencia builders do Buildx. É útil para builds multi-arquitetura, cache avançado e imagens que precisam rodar em amd64 e arm64.",
  },
  {
    title: "Kubernetes",
    description:
      "Pode ser ativado quando a disciplina avançar para orquestração. Para Docker básico, mantenha desligado para economizar recursos.",
  },
  {
    title: "Software updates",
    description:
      "Controle busca automática de atualizações e atualização de componentes como Docker CLI, Compose e Scout.",
  },
  {
    title: "Proxies",
    description:
      "Configure proxy quando a rede da faculdade ou empresa exige saída HTTP/HTTPS autenticada. Sem isso, pull de imagens pode falhar.",
  },
];

function getCommandTeachingNotes(command) {
  if (command.startsWith("sudo apt remove")) {
    return [
      "Comece por ele quando a máquina já teve Docker instalado por apt, snap, Podman ou pacotes antigos.",
      "A ideia é evitar que binários diferentes tentem controlar o mesmo runtime de containers.",
      "Se o apt disser que algum pacote não foi encontrado, isso é normal; significa apenas que ele não estava instalado.",
    ];
  }

  if (command === "sudo apt update") {
    return [
      "Este comando não atualiza programas; ele atualiza a lista de pacotes conhecidos pelo Ubuntu.",
      "Depois de adicionar o repositório da Docker, rode novamente para o apt reconhecer os pacotes novos.",
    ];
  }

  if (command === "sudo apt install gnome-terminal") {
    return [
      "Esse requisito aparece principalmente em ambientes gráficos Linux diferentes do GNOME.",
      "Sem ele, alguns recursos do Docker Desktop que abrem terminal pela interface podem não funcionar corretamente.",
    ];
  }

  if (command.startsWith("sudo apt install ca-certificates curl")) {
    return [
      "O pacote ca-certificates permite validar conexões HTTPS confiáveis.",
      "O curl será usado para baixar a chave GPG oficial da Docker pelo terminal.",
    ];
  }

  if (command.includes("/etc/apt/keyrings")) {
    return [
      "A pasta keyrings separa chaves de repositórios externos de forma mais organizada e segura.",
      "O apt usará essa chave para confirmar que os pacotes baixados realmente vieram da Docker.",
    ];
  }

  if (command.startsWith("echo \"deb")) {
    return [
      "`dpkg --print-architecture` detecta se seu sistema é amd64, arm64 ou outra arquitetura compatível.",
      "`/etc/os-release` fornece o codinome do Ubuntu, como noble ou jammy.",
      "O arquivo docker.list é o que ensina ao apt onde buscar os pacotes oficiais da Docker.",
    ];
  }

  if (command.startsWith("sudo apt install docker-ce")) {
    return [
      "`docker-ce` é o Docker Engine Community Edition, o serviço que executa containers.",
      "`docker-ce-cli` é o cliente que você usa no terminal com o comando docker.",
      "`docker-compose-plugin` adiciona o comando docker compose, usado para projetos com vários serviços.",
    ];
  }

  if (command.startsWith("sudo systemctl")) {
    return [
      "No Ubuntu, o Docker roda como um serviço do systemd chamado docker.",
      "`status` consulta, `start` inicia agora e `enable` configura inicialização automática junto com o sistema.",
    ];
  }

  if (command.includes("hello-world")) {
    return [
      "Esse teste baixa uma imagem pequena, cria um container, executa uma mensagem e finaliza.",
      "Se funcionar, você validou quatro partes ao mesmo tempo: CLI, daemon, rede e execução de containers.",
    ];
  }

  if (command.startsWith("sudo usermod")) {
    return [
      "Sem isso, usuários comuns precisam de sudo para falar com o daemon Docker.",
      "O grupo docker tem privilégios altos; adicione apenas usuários confiáveis.",
    ];
  }

  if (command === "newgrp docker") {
    return [
      "Grupos de usuário normalmente só são recarregados após logout/login.",
      "O newgrp antecipa essa atualização para a sessão atual do terminal.",
    ];
  }

  if (command.startsWith("brew install")) {
    return [
      "Este é o caminho mais rápido no macOS quando o Homebrew já está instalado.",
      "O pacote instalado é o Docker Desktop, não apenas uma CLI isolada.",
    ];
  }

  if (command === "open -a Docker") {
    return [
      "No macOS, o Engine roda por trás do Docker Desktop em uma VM Linux.",
      "Abrir o app é necessário para o daemon ficar disponível ao terminal.",
    ];
  }

  if (command.startsWith("curl -L -o docker-desktop")) {
    return [
      "O arquivo .deb é o instalador do Docker Desktop no Ubuntu.",
      "Em aula, prefira também mostrar o download pelo site oficial para o aluno reconhecer a origem do pacote.",
    ];
  }

  if (command.startsWith("sudo apt install ./docker-desktop")) {
    return [
      "O prefixo ./ informa ao apt que o pacote está na pasta atual, não em um repositório remoto.",
      "Durante a instalação, o Docker Desktop também prepara integrações de CLI e componentes auxiliares.",
    ];
  }

  if (command.startsWith("systemctl --user")) {
    return [
      "`--user` significa que o serviço pertence à sessão do usuário, não ao sistema inteiro.",
      "Isso combina com o Docker Desktop, que é uma aplicação de usuário com VM própria.",
    ];
  }

  if (command.includes("desktop-linux")) {
    return [
      "No Linux, Docker Desktop usa uma VM e um contexto próprio chamado desktop-linux.",
      "Containers criados no contexto default do Engine local não aparecem automaticamente no contexto desktop-linux.",
    ];
  }

  if (command === "softwareupdate --install-rosetta") {
    return [
      "Rosetta traduz binários Intel para Macs Apple Silicon quando algum componente ainda depende disso.",
      "Nem todo Mac precisa desse passo; use quando o instalador ou a política do laboratório solicitar.",
    ];
  }

  if (command.includes("--accept-license")) {
    return [
      "Esse modo é voltado para instalação automatizada e laboratórios.",
      "Para uso individual, instalar pelo arrastar-e-soltar ou Homebrew costuma ser mais simples.",
    ];
  }

  if (command.includes("hdiutil")) {
    return [
      "hdiutil é a ferramenta do macOS para montar e desmontar imagens .dmg.",
      "Use esse fluxo quando a instalação foi baixada manualmente do site da Docker.",
    ];
  }

  if (command === "docker --version" || command === "docker version") {
    return [
      "`docker --version` confirma apenas o cliente instalado.",
      "`docker version` consulta cliente e servidor; se o servidor não responder, o daemon não está ativo.",
    ];
  }

  if (command === "docker info") {
    return [
      "É um raio-x do ambiente Docker: runtime, storage driver, quantidade de containers, imagens e recursos.",
      "Quando algo parece estranho, este comando ajuda a saber qual ambiente você está usando.",
    ];
  }

  if (command.startsWith("docker context")) {
    return [
      "Contextos permitem alternar o alvo do comando docker.",
      "Você pode apontar para Docker Desktop, um servidor remoto ou outro ambiente sem mudar todos os comandos.",
    ];
  }

  if (command === "docker system df") {
    return [
      "Mostra consumo de disco separado por imagens, containers, volumes e cache de build.",
      "Use antes de limpar para entender onde o espaço está sendo gasto.",
    ];
  }

  if (command === "docker events") {
    return [
      "Funciona como um monitor ao vivo das ações do Docker.",
      "Ajuda a entender quando containers iniciam, param, morrem, conectam redes ou disparam eventos internos.",
    ];
  }

  if (command.startsWith("docker pull")) {
    return [
      "Baixa uma imagem para sua máquina sem executar container.",
      "É útil para preparar ambiente antecipadamente ou garantir que a imagem existe localmente.",
    ];
  }

  if (command === "docker images" || command === "docker image ls") {
    return [
      "Lista os moldes disponíveis localmente para criar containers.",
      "A coluna tag diferencia versões, como latest, 1.0, 16 ou alpine.",
    ];
  }

  if (command.startsWith("docker image inspect")) {
    return [
      "Mostra dados técnicos que normalmente não aparecem na listagem simples.",
      "É útil para descobrir variáveis, arquitetura, camadas, entrypoint e configuração padrão.",
    ];
  }

  if (command.startsWith("docker tag")) {
    return [
      "Tag não duplica a imagem; ela cria outro nome apontando para o mesmo conteúdo.",
      "Use tags para versionar builds e preparar nomes compatíveis com registries.",
    ];
  }

  if (command.startsWith("docker rmi")) {
    return [
      "Remove apenas a imagem local, não a imagem remota no Docker Hub.",
      "Se algum container depende dela, o Docker bloqueará a remoção para evitar inconsistência.",
    ];
  }

  if (command.includes("prune")) {
    return [
      "Prune significa limpar recursos que o Docker considera sem uso ativo.",
      "Leia a confirmação antes de aceitar, principalmente quando envolver volumes.",
    ];
  }

  if (command.startsWith("docker search")) {
    return [
      "Ajuda a encontrar imagens públicas pelo terminal.",
      "Mesmo assim, para produção, confira a página da imagem, mantenedor, tags e instruções oficiais.",
    ];
  }

  if (command.startsWith("docker history")) {
    return [
      "Mostra como a imagem foi montada em camadas.",
      "É útil para investigar por que uma imagem ficou grande ou quais comandos entraram no build.",
    ];
  }

  if (command.startsWith("docker run")) {
    return [
      "`docker run` combina várias etapas: procura a imagem, baixa se necessário, cria o container e inicia o processo.",
      "`--name` dá um nome fixo, `-d` roda em segundo plano, `-p` publica portas, `-e` injeta variáveis e `-v` monta volumes.",
    ];
  }

  if (command === "docker ps" || command === "docker ps -a") {
    return [
      "`docker ps` mostra o que está rodando agora.",
      "`docker ps -a` mostra também containers parados, úteis para consultar logs ou remover sobras de testes.",
    ];
  }

  if (command.startsWith("docker stop")) {
    return [
      "Envia um sinal de parada controlada para o processo principal do container.",
      "É melhor que remover à força quando você quer dar chance para a aplicação finalizar corretamente.",
    ];
  }

  if (command.startsWith("docker start") || command.startsWith("docker restart")) {
    return [
      "`start` reutiliza um container existente com a mesma configuração.",
      "`restart` faz parada e início em sequência, útil em serviços que travaram ou precisam recarregar.",
    ];
  }

  if (command.startsWith("docker rm")) {
    return [
      "Remove o container, mas não necessariamente volumes nomeados usados por ele.",
      "A opção -f força a remoção mesmo se o container estiver rodando.",
    ];
  }

  if (command.startsWith("docker rename")) {
    return [
      "Renomear ajuda quando um container foi criado com nome ruim ou automático.",
      "O nome novo passa a ser usado em comandos como logs, exec, stop e inspect.",
    ];
  }

  if (command === "docker stats" || command.startsWith("docker top")) {
    return [
      "`stats` mostra consumo de recursos em tempo real.",
      "`top` mostra os processos internos do container, parecido com ps no Linux.",
    ];
  }

  if (command.startsWith("docker logs")) {
    return [
      "Mostra a saída padrão e a saída de erro do processo principal do container.",
      "Use `--tail` para limitar quantidade e `-f` para acompanhar novos logs chegando.",
    ];
  }

  if (command.startsWith("docker exec")) {
    return [
      "Executa um comando dentro de um container que já está rodando.",
      "`-it` deixa a sessão interativa, permitindo digitar comandos como se estivesse dentro da máquina.",
    ];
  }

  if (command.startsWith("docker cp")) {
    return [
      "Copia arquivos entre host e container sem precisar rebuildar a imagem.",
      "É ótimo para inspeção e testes rápidos, mas mudanças manuais dentro do container não devem substituir um Dockerfile bem feito.",
    ];
  }

  if (command.startsWith("docker inspect")) {
    return [
      "É uma das ferramentas mais importantes de depuração.",
      "Use quando precisar descobrir portas, variáveis, volumes montados, redes, IP interno ou comando de inicialização.",
    ];
  }

  if (command.startsWith("docker port")) {
    return [
      "Traduz o mapeamento entre porta interna do container e porta externa da máquina.",
      "Ajuda quando você esqueceu qual porta foi publicada no host.",
    ];
  }

  if (command.startsWith("docker volume")) {
    return [
      "Volumes ficam sob controle do Docker e são ideais para dados persistentes.",
      "Antes de remover volumes, confirme se não há banco de dados ou arquivos importantes ali.",
    ];
  }

  if (command.startsWith("docker network")) {
    return [
      "Redes personalizadas dão DNS interno aos containers.",
      "Na prática, um serviço chamado db pode ser acessado por outro container usando o host db.",
    ];
  }

  if (command.startsWith("docker buildx")) {
    return [
      "Buildx é o construtor moderno do Docker, usado para cache avançado e imagens multi-arquitetura.",
      "É especialmente útil quando a mesma imagem precisa rodar em amd64 e arm64.",
    ];
  }

  if (command.startsWith("docker build")) {
    return [
      "Lê o Dockerfile e transforma suas instruções em uma imagem versionável.",
      "O ponto final `.` indica que o contexto de build é a pasta atual.",
    ];
  }

  if (command === "docker login" || command.startsWith("docker push")) {
    return [
      "Registries guardam imagens para distribuição entre máquinas, servidores e pipelines.",
      "Faça login antes de enviar imagens privadas ou publicar no seu usuário/organização.",
    ];
  }

  if (command.startsWith("docker compose")) {
    return [
      "Compose executa comandos no contexto de um projeto descrito em compose.yaml.",
      "Use quando a aplicação depende de vários serviços, como API, banco, cache e filas.",
    ];
  }

  if (command.startsWith("sudo apt purge") || command.startsWith("sudo rm -rf")) {
    return [
      "Esses comandos são para desinstalação ou reset completo no Ubuntu.",
      "O `rm -rf` é destrutivo: apaga imagens, containers e volumes locais do Engine.",
    ];
  }

  return [
    "Leia o comando da esquerda para a direita: primeiro vem o recurso Docker, depois a ação e por fim opções ou nomes.",
    "Antes de executar em produção, teste em ambiente local e confirme se há dados persistentes envolvidos.",
  ];
}

export default function Docker() {
  const { i18n } = useTranslation();
  const isEn = i18n.resolvedLanguage?.startsWith("en");
  const sections = COMMAND_SECTIONS_PT;
  const txt = isEn
    ? {
        back: "Back to subjects",
        title: "Docker",
        subtitle:
          "Practical discipline to install Docker on Ubuntu and macOS, run containers, build images, use Compose, networks, volumes, logs, and maintenance commands.",
        goalTitle: "Subject goal",
        goal:
          "By the end, you should be able to install Docker, validate the environment, containerize an application, run support services, inspect failures, persist data, and clean local resources safely.",
        officialDocs: "Official documentation",
        docsText:
          "Installation commands were checked against Docker's official documentation. Use these links when you need the latest platform-specific details.",
        ubuntuDocs: "Ubuntu installation",
        macDocs: "macOS installation",
        desktopUbuntuDocs: "Desktop on Ubuntu",
        settingsDocs: "Desktop settings",
        command: "Command",
        explanation: "Explanation",
        example: "Example",
        guidedReading: "Guided reading",
        fundamentalsTitle: "Docker in 5 key ideas",
        desktopSettingsTitle: "Docker Desktop configuration after installation",
        desktopSettingsText:
          "After installing, open Docker Desktop > Settings and review these points before starting practical work.",
        dockerfileNotesTitle: "Line-by-line reading",
        dockerfileTitle: "Dockerfile example",
        composeTitle: "Compose example",
      }
    : {
        back: "Voltar para Disciplinas",
        title: "Docker",
        subtitle:
          "Disciplina prática para instalar Docker no Ubuntu e macOS, executar containers, criar imagens, usar Compose, redes, volumes, logs e comandos de manutenção.",
        goalTitle: "Objetivo da disciplina",
        goal:
          "Ao final, você deverá conseguir instalar Docker, validar o ambiente, containerizar uma aplicação, executar serviços de apoio, investigar falhas, persistir dados e limpar recursos locais com segurança.",
        officialDocs: "Documentação oficial",
        docsText:
          "Os comandos de instalação foram conferidos na documentação oficial da Docker. Use estes links quando precisar validar detalhes atualizados de cada plataforma.",
        ubuntuDocs: "Instalação no Ubuntu",
        macDocs: "Instalação no macOS",
        desktopUbuntuDocs: "Desktop no Ubuntu",
        settingsDocs: "Configurações do Desktop",
        command: "Comando",
        explanation: "Explicação",
        example: "Exemplo",
        guidedReading: "Leitura guiada",
        fundamentalsTitle: "Docker em 5 ideias-chave",
        desktopSettingsTitle: "Configuração do Docker Desktop após instalar",
        desktopSettingsText:
          "Depois de instalar, abra Docker Desktop > Settings e revise estes pontos antes de começar a prática.",
        dockerfileNotesTitle: "Leitura linha por linha",
        dockerfileTitle: "Exemplo de Dockerfile",
        composeTitle: "Exemplo de Compose",
      };

  return (
    <section className="min-h-[70vh] px-6 py-24 max-w-6xl mx-auto">
      <div className="mb-8">
        <BackButton fallbackTo="/disciplinas" className="text-sm text-cyan-300 hover:text-cyan-200 inline-flex items-center gap-2">
          {txt.back}
        </BackButton>
      </div>

      <h1 className="text-4xl md:text-5xl font-black mb-4 flex items-center gap-3">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-9 w-9 text-cyan-300">
          <path
            fill="currentColor"
            d="M13 5h3v3h-3V5Zm-4 0h3v3H9V5ZM5 9h3v3H5V9Zm4 0h3v3H9V9Zm4 0h3v3h-3V9Zm4 0h3v3h-3V9ZM1 13h21.6c-.5 1.6-1.5 3-2.9 4.1-1.8 1.4-4.2 2.2-7.1 2.2H8.1C4.4 19.3 1.7 17 1 13Zm3.2-8h3v3h-3V5Z"
          />
        </svg>
        <span>{txt.title}</span>
      </h1>
      <p className="text-slate-400 text-lg mb-8">{txt.subtitle}</p>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr] mb-8">
        <div className="glass rounded-2xl p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-cyan-300 mb-3">{txt.goalTitle}</h2>
          <p className="text-sm text-slate-300 leading-relaxed">{txt.goal}</p>
        </div>

        <div className="glass rounded-2xl p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-cyan-300 mb-3">{txt.officialDocs}</h2>
          <p className="text-sm text-slate-300 leading-relaxed mb-4">{txt.docsText}</p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://docs.docker.com/engine/install/ubuntu/"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-cyan-400/30 px-4 py-2 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-500/10"
            >
              {txt.ubuntuDocs}
            </a>
            <a
              href="https://docs.docker.com/desktop/setup/install/linux/ubuntu/"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-cyan-400/30 px-4 py-2 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-500/10"
            >
              {txt.desktopUbuntuDocs}
            </a>
            <a
              href="https://docs.docker.com/installation/mac/"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-cyan-400/30 px-4 py-2 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-500/10"
            >
              {txt.macDocs}
            </a>
            <a
              href="https://docs.docker.com/desktop/settings-and-maintenance/settings/"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-cyan-400/30 px-4 py-2 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-500/10"
            >
              {txt.settingsDocs}
            </a>
          </div>
        </div>
      </div>

      <div className="glass rounded-2xl p-6 md:p-8 mb-8">
        <h2 className="text-2xl font-semibold text-cyan-300 mb-5">{txt.fundamentalsTitle}</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {DOCKER_CONCEPTS.map((concept) => (
            <article key={concept.title} className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
              <h3 className="text-sm font-semibold text-white mb-2">{concept.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{concept.description}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="glass rounded-2xl p-6 md:p-8 mb-8">
        <h2 className="text-2xl font-semibold text-cyan-300 mb-3">{txt.desktopSettingsTitle}</h2>
        <p className="text-sm text-slate-300 leading-relaxed mb-5">{txt.desktopSettingsText}</p>
        <div className="grid gap-4 md:grid-cols-2">
          {DESKTOP_SETTINGS.map((setting) => (
            <article key={setting.title} className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
              <h3 className="text-sm font-semibold text-white mb-2">{setting.title}</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{setting.description}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mb-8">
        <div className="glass rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-cyan-300 mb-4">{txt.dockerfileTitle}</h2>
          <CodeBlock language="dockerfile" label="Dockerfile">
            {DOCKERFILE_EXAMPLE}
          </CodeBlock>
          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-slate-500">
            {txt.dockerfileNotesTitle}
          </p>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            {DOCKERFILE_NOTES.map((note) => (
              <li key={note} className="leading-relaxed">
                {note}
              </li>
            ))}
          </ul>
        </div>
        <div className="glass rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-cyan-300 mb-4">{txt.composeTitle}</h2>
          <CodeBlock language="yaml" label="compose.yaml">
            {COMPOSE_EXAMPLE}
          </CodeBlock>
          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-slate-500">
            {txt.dockerfileNotesTitle}
          </p>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            {COMPOSE_NOTES.map((note) => (
              <li key={note} className="leading-relaxed">
                {note}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="space-y-5">
        {sections.map((section) => (
          <details key={section.title} className="glass rounded-2xl p-6">
            <summary className="cursor-pointer text-lg font-semibold text-cyan-300">
              {section.title}
            </summary>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed">{section.description}</p>

            <div className="mt-5 space-y-4">
              {section.commands.map((item) => (
                <article key={item.command} className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2">{txt.command}</p>
                  <CodeBlock language="bash">{item.command}</CodeBlock>
                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-1">
                        {txt.explanation}
                      </p>
                      <p className="text-sm text-slate-300 leading-relaxed">{item.explanation}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-1">
                        {txt.example}
                      </p>
                      <p className="text-sm text-slate-300 leading-relaxed">{item.example}</p>
                    </div>
                  </div>
                  <div className="mt-4 rounded-2xl border border-cyan-400/10 bg-cyan-500/5 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/80 mb-3">
                      {txt.guidedReading}
                    </p>
                    <ul className="space-y-2 text-sm text-slate-300">
                      {getCommandTeachingNotes(item.command).map((note) => (
                        <li key={note} className="leading-relaxed">
                          {note}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
