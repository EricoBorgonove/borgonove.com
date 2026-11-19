import { Button, Input, PageDescription, PageHeader, PageTemplate, PageTitle, Panel } from "../components/ui/Patterns";
import { useState } from "react";
import BackButton from "../components/BackButton";
import CodeBlock from "../components/CodeBlock";

const PASSWORD = "estaciona";

const solutionCode = `from datetime import datetime
from math import ceil


class Veiculo:
    def __init__(self, placa, modelo, tipo):
        self.placa = placa.upper()
        self.modelo = modelo
        self.tipo = tipo
        self.horario_entrada = datetime.now()

    def calcular_tempo_permanencia(self):
        horario_saida = datetime.now()
        diferenca = horario_saida - self.horario_entrada
        segundos = diferenca.total_seconds()
        horas = ceil(segundos / 3600)

        return max(1, horas)

    def __str__(self):
        entrada_formatada = self.horario_entrada.strftime(
            "%d/%m/%Y às %H:%M:%S"
        )

        return (
            f"Placa: {self.placa}\\n"
            f"Modelo: {self.modelo}\\n"
            f"Tipo: {self.tipo}\\n"
            f"Entrada: {entrada_formatada}"
        )


class Estacionamento:
    def __init__(self, nome, capacidade, valor_hora):
        self.nome = nome
        self.capacidade = capacidade
        self.valor_hora = valor_hora
        self.veiculos = {}

    def quantidade_ocupada(self):
        return len(self.veiculos)

    def vagas_disponiveis(self):
        return self.capacidade - self.quantidade_ocupada()

    def estacionamento_lotado(self):
        return self.quantidade_ocupada() >= self.capacidade

    def veiculo_esta_estacionado(self, placa):
        return placa.upper() in self.veiculos

    def registrar_entrada(self, placa, modelo, tipo):
        placa = placa.upper()

        if self.estacionamento_lotado():
            print("\\nNão existem vagas disponíveis.")
            return

        if self.veiculo_esta_estacionado(placa):
            print("\\nJá existe um veículo com essa placa.")
            return

        veiculo = Veiculo(placa=placa, modelo=modelo, tipo=tipo)
        self.veiculos[placa] = veiculo

        print("\\nEntrada registrada com sucesso.")
        print(f"Vagas disponíveis: {self.vagas_disponiveis()}")

    def listar_veiculos(self):
        if not self.veiculos:
            print("\\nNão há veículos estacionados.")
            return

        print(f"\\nVEÍCULOS NO {self.nome.upper()}")
        print("=" * 40)

        for numero, veiculo in enumerate(self.veiculos.values(), start=1):
            print(f"\\nVeículo {numero}")
            print(veiculo)
            print("-" * 40)

        print(f"\\nTotal de veículos: {self.quantidade_ocupada()}")
        print(f"Vagas disponíveis: {self.vagas_disponiveis()}")

    def pesquisar_veiculo(self, placa):
        placa = placa.upper()
        veiculo = self.veiculos.get(placa)

        if veiculo is None:
            print("\\nVeículo não encontrado.")
            return

        print("\\nVEÍCULO ENCONTRADO")
        print("=" * 40)
        print(veiculo)

    def registrar_saida(self, placa):
        placa = placa.upper()
        veiculo = self.veiculos.get(placa)

        if veiculo is None:
            print("\\nVeículo não encontrado.")
            return

        horas = veiculo.calcular_tempo_permanencia()
        valor_total = horas * self.valor_hora
        horario_saida = datetime.now()

        print("\\nCOMPROVANTE DE SAÍDA")
        print("=" * 40)
        print(f"Placa: {veiculo.placa}")
        print(f"Modelo: {veiculo.modelo}")
        print("Entrada:", veiculo.horario_entrada.strftime("%d/%m/%Y às %H:%M:%S"))
        print("Saída:", horario_saida.strftime("%d/%m/%Y às %H:%M:%S"))
        print(f"Tempo cobrado: {horas} hora(s)")
        print(f"Valor por hora: R$ {self.valor_hora:.2f}")
        print(f"Total a pagar: R$ {valor_total:.2f}")

        del self.veiculos[placa]

        print("\\nSaída registrada com sucesso.")
        print(f"Vagas disponíveis: {self.vagas_disponiveis()}")

    def mostrar_situacao(self):
        print("\\nSITUAÇÃO DO ESTACIONAMENTO")
        print("=" * 40)
        print(f"Nome: {self.nome}")
        print(f"Capacidade: {self.capacidade}")
        print(f"Vagas ocupadas: {self.quantidade_ocupada()}")
        print(f"Vagas disponíveis: {self.vagas_disponiveis()}")
        print(f"Valor por hora: R$ {self.valor_hora:.2f}")

        if self.estacionamento_lotado():
            print("Situação: lotado")
        else:
            print("Situação: existem vagas disponíveis")


def solicitar_placa():
    while True:
        placa = input("Digite a placa do veículo: ").strip().upper()

        if placa:
            return placa

        print("A placa não pode ficar vazia.")


def solicitar_tipo():
    tipos = {
        "1": "Carro",
        "2": "Motocicleta",
        "3": "Caminhonete",
        "4": "Outro",
    }

    while True:
        print("\\nTipo do veículo:")
        print("1. Carro")
        print("2. Motocicleta")
        print("3. Caminhonete")
        print("4. Outro")

        opcao = input("Escolha uma opção: ").strip()

        if opcao in tipos:
            return tipos[opcao]

        print("Opção inválida.")


def mostrar_menu():
    print("\\n" + "=" * 45)
    print("       SISTEMA DE ESTACIONAMENTO")
    print("=" * 45)
    print("1. Registrar entrada")
    print("2. Registrar saída")
    print("3. Listar veículos")
    print("4. Pesquisar veículo")
    print("5. Mostrar vagas disponíveis")
    print("6. Mostrar situação do estacionamento")
    print("0. Encerrar")
    print("=" * 45)


def executar_sistema():
    estacionamento = Estacionamento(
        nome="Estacionamento Central",
        capacidade=10,
        valor_hora=8.00,
    )

    while True:
        mostrar_menu()
        opcao = input("Escolha uma opção: ").strip()

        if opcao == "1":
            print("\\nREGISTRO DE ENTRADA")
            placa = solicitar_placa()
            modelo = input("Digite o modelo do veículo: ").strip()
            tipo = solicitar_tipo()

            if not modelo:
                print("O modelo não pode ficar vazio.")
                continue

            estacionamento.registrar_entrada(placa=placa, modelo=modelo, tipo=tipo)

        elif opcao == "2":
            print("\\nREGISTRO DE SAÍDA")
            placa = solicitar_placa()
            estacionamento.registrar_saida(placa)

        elif opcao == "3":
            estacionamento.listar_veiculos()

        elif opcao == "4":
            print("\\nPESQUISA DE VEÍCULO")
            placa = solicitar_placa()
            estacionamento.pesquisar_veiculo(placa)

        elif opcao == "5":
            print("\\nVagas disponíveis:", estacionamento.vagas_disponiveis())

        elif opcao == "6":
            estacionamento.mostrar_situacao()

        elif opcao == "0":
            print("\\nSistema encerrado.")
            break

        else:
            print("\\nOpção inválida. Tente novamente.")


if __name__ == "__main__":
    executar_sistema()`;

const requirements = [
  "Cadastrar a entrada de um veículo",
  "Registrar a placa, o modelo e o tipo do veículo",
  "Armazenar automaticamente a data e a hora de entrada",
  "Impedir entrada de veículo com placa já cadastrada",
  "Impedir novas entradas quando o estacionamento estiver lotado",
  "Listar todos os veículos estacionados",
  "Pesquisar um veículo pela placa",
  "Registrar a saída de um veículo",
  "Calcular o tempo de permanência",
  "Calcular o valor a pagar",
  "Mostrar a quantidade de vagas disponíveis",
  "Encerrar o programa por meio de um menu",
];

const rules = [
  "O estacionamento possui 10 vagas",
  "O valor cobrado é de R$ 8,00 por hora",
  "Qualquer período iniciado será considerado uma hora completa",
  "O valor mínimo cobrado será correspondente a uma hora",
  "A placa deve ser armazenada com letras maiúsculas",
  "O veículo somente poderá sair se estiver cadastrado no estacionamento",
];

const concepts = [
  "classes e objetos",
  "atributos",
  "métodos",
  "construtores",
  "dicionários",
  "estruturas condicionais",
  "estruturas de repetição",
  "funções",
  "datas e horários",
  "validação de dados",
  "método especial __str__",
  "menu interativo",
];

export default function PythonEstacionamento() {
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    if (password.trim() === PASSWORD) {
      setUnlocked(true);
      setError(false);
      return;
    }

    setError(true);
  }

  return (
    <PageTemplate>
      <div className="mb-8">
        <BackButton
          fallbackTo="/disciplinas/python"
          className="text-sm text-cyan-300 hover:text-cyan-200 inline-flex items-center gap-2"
        >
          Voltar para Python
        </BackButton>
      </div>

      <PageHeader>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
          Programação Orientada a Objetos
        </p>
        <PageTitle className="mb-4">
          Sistema de Estacionamento
        </PageTitle>
        <PageDescription>
          Desenvolva, utilizando Python e Programação Orientada a Objetos, um sistema para controlar a entrada e a saída de veículos de um estacionamento.
        </PageDescription>
      </PageHeader>

      <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
        <Panel as="article" layout="plain">
          <h2 className="mb-4 text-2xl font-semibold text-cyan-300">Enunciado</h2>
          <p className="mb-6 leading-relaxed text-slate-300">
            O estacionamento possui uma quantidade limitada de vagas e cobra um valor por hora de permanência. O programa deverá permitir:
          </p>
          <ol className="grid gap-3 md:grid-cols-2">
            {requirements.map((item, index) => (
              <li key={item} className="rounded-xl border border-slate-800 bg-slate-950/50 p-4 text-sm text-slate-300">
                <span className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-cyan-300">
                  Requisito {String(index + 1).padStart(2, "0")}
                </span>
                {item}
              </li>
            ))}
          </ol>
        </Panel>

        <Panel as="aside" layout="plain">
          <h2 className="mb-4 text-xl font-semibold text-cyan-300">Regras</h2>
          <ul className="space-y-3 text-sm leading-relaxed text-slate-300">
            {rules.map((rule) => (
              <li key={rule} className="rounded-xl border border-cyan-400/20 bg-cyan-500/10 p-3">
                {rule}
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Panel as="div" layout="plain" className="mt-8">
        <h2 className="mb-4 text-2xl font-semibold text-cyan-300">Exemplo de cobrança</h2>
        <p className="mb-4 leading-relaxed text-slate-300">
          Um veículo permaneceu por 1 hora e 20 minutos. Como qualquer período iniciado é considerado uma hora completa, serão cobradas 2 horas:
        </p>
        <div className="rounded-xl border border-cyan-400/20 bg-cyan-500/10 p-5 text-2xl font-black text-cyan-100">
          2 × R$ 8,00 = R$ 16,00
        </div>
      </Panel>

      <Panel as="div" layout="plain" className="mt-8">
        <h2 className="mb-4 text-2xl font-semibold text-cyan-300">Resposta e explicação</h2>
        {!unlocked ? (
          <form onSubmit={handleSubmit} className="max-w-xl">
            <label htmlFor="senha-estacionamento" className="mb-2 block text-sm font-semibold text-cyan-100">
              Senha da resposta
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Input
                id="senha-estacionamento"
                type="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setError(false);
                }}
                className="min-h-11 flex-1 border text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-300"
                placeholder="Digite a senha"
                autoComplete="off"
              />
              <Button variant="secondary"
                type="submit"
                className="min-h-11 border border-cyan-400/30 text-cyan-100 transition hover:border-cyan-300"
              >
                Liberar
              </Button>
            </div>
            {error && (
              <p className="mt-3 text-sm font-semibold text-rose-300">
                Senha incorreta.
              </p>
            )}
          </form>
        ) : (
          <div className="space-y-8">
            <div>
              <h3 className="mb-4 text-xl font-semibold text-slate-100">Código sugerido</h3>
              <CodeBlock language="python" label="Python">
                {solutionCode}
              </CodeBlock>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <article className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5">
                <h3 className="mb-3 text-xl font-semibold text-cyan-100">Classe Veiculo</h3>
                <p className="text-sm leading-relaxed text-slate-300">
                  Representa cada veículo que entra no estacionamento. Ela guarda placa, modelo, tipo e horário de entrada. O horário é registrado automaticamente com <code className="text-cyan-200">datetime.now()</code>. O método <code className="text-cyan-200">calcular_tempo_permanencia()</code> usa <code className="text-cyan-200">ceil()</code> para arredondar a cobrança para cima.
                </p>
              </article>
              <article className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5">
                <h3 className="mb-3 text-xl font-semibold text-cyan-100">Classe Estacionamento</h3>
                <p className="text-sm leading-relaxed text-slate-300">
                  Controla capacidade, valor por hora, entradas, saídas, vagas disponíveis, listagem e pesquisa. Os veículos ficam em um dicionário, usando a placa como chave para facilitar a busca.
                </p>
              </article>
            </div>

            <div>
              <h3 className="mb-4 text-xl font-semibold text-slate-100">Fluxo da saída</h3>
              <ol className="grid gap-3 md:grid-cols-5">
                {["Pesquisa a placa", "Calcula o tempo", "Calcula o valor", "Mostra comprovante", "Remove o veículo"].map((step, index) => (
                  <li key={step} className="rounded-xl border border-slate-800 bg-slate-950/50 p-4 text-sm text-slate-300">
                    <span className="mb-2 block text-lg font-black text-cyan-200">{index + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h3 className="mb-4 text-xl font-semibold text-slate-100">Conceitos utilizados</h3>
              <div className="flex flex-wrap gap-2">
                {concepts.map((concept) => (
                  <span key={concept} className="rounded-lg border border-cyan-400/20 bg-cyan-500/10 px-3 py-2 text-sm text-cyan-100">
                    {concept}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-xl font-semibold text-slate-100">Exemplo de execução</h3>
              <CodeBlock language="text" label="Terminal">
                {`=============================================
       SISTEMA DE ESTACIONAMENTO
=============================================
1. Registrar entrada
2. Registrar saída
3. Listar veículos
4. Pesquisar veículo
5. Mostrar vagas disponíveis
6. Mostrar situação do estacionamento
0. Encerrar
=============================================
Escolha uma opção: 1

REGISTRO DE ENTRADA
Digite a placa do veículo: abc1d23
Digite o modelo do veículo: Corolla

Tipo do veículo:
1. Carro
2. Motocicleta
3. Caminhonete
4. Outro
Escolha uma opção: 1

Entrada registrada com sucesso.
Vagas disponíveis: 9`}
              </CodeBlock>
            </div>
          </div>
        )}
      </Panel>
    </PageTemplate>
  );
}
