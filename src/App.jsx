import { BrowserRouter, Route, Routes } from "react-router-dom";
import RequireAdmin from "./components/RequireAdmin";
import ScrollToTop from "./components/ScrollToTop";
import MainLayout from "./layout/MainLayout";
import AdminArea from "./pages/AdminArea";
import AdminBlog from "./pages/AdminBlog";
import AdminLogin from "./pages/AdminLogin";
import AdminTechPlayDisciplina from "./pages/AdminTechPlayDisciplina";
import AdminTechPlayDisciplinas from "./pages/AdminTechPlayDisciplinas";
import Afd from "./pages/Afd";
import Algoritmos from "./pages/Algoritmos";
import AlgoritmosLinguagemNatural from "./pages/AlgoritmosLinguagemNatural";
import AnaliseDados from "./pages/AnaliseDados";
import AnaliseDadosLista from "./pages/AnaliseDadosLista";
import ArquiteturaSoftware from "./pages/ArquiteturaSoftware";
import ArquiteturaSoftwareAulas from "./pages/ArquiteturaSoftwareAulas";
import AvisoPrivacidade from "./pages/AvisoPrivacidade";
import BuscaCep from "./pages/BuscaCep";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import CalculadoraJuros from "./pages/CalculadoraJuros";
import ComparadorTextos from "./pages/ComparadorTextos";
import Contato from "./pages/Contato";
import ConversorDataHora from "./pages/ConversorDataHora";
import Disciplinas from "./pages/Disciplinas";
import Docker from "./pages/Docker";
import Esbmc from "./pages/Esbmc";
import EsbmcInstalacao from "./pages/EsbmcInstalacao";
import EsbmcTabelasComandos from "./pages/EsbmcTabelasComandos";
import GitGithub from "./pages/GitGithub";
import GeradorQrCode from "./pages/GeradorQrCode";
import GeradorSenhas from "./pages/GeradorSenhas";
import Home from "./pages/Home";
import Imc from "./pages/Imc";
import MockSqlJson from "./pages/MockSqlJson";
import ModelagemDados from "./pages/ModelagemDados";
import NotFound from "./pages/NotFound";
import Pomodoro from "./pages/Pomodoro";
import Postgresql from "./pages/Postgresql";
import PostgresqlBancosTemporais from "./pages/PostgresqlBancosTemporais";
import PostgresqlExercicioBlocos from "./pages/PostgresqlExercicioBlocos";
import PostgresqlExercicioLista from "./pages/PostgresqlExercicioLista";
import PostgresqlExercicios from "./pages/PostgresqlExercicios";
import PostgresqlTabelaDetalhe from "./pages/PostgresqlTabelaDetalhe";
import PostgresqlTabelas from "./pages/PostgresqlTabelas";
import PostgresqlTopico from "./pages/PostgresqlTopico";
import PythonMatplotlib from "./pages/PythonMatplotlib";
import PythonPandasCsvExcel from "./pages/PythonPandasCsvExcel";
import PythonPandasExercicioPratico from "./pages/PythonPandasExercicioPratico";
import PythonPandasExerciciosBase from "./pages/PythonPandasExerciciosBase";
import PythonPandasExercicios from "./pages/PythonPandasExercicios";
import PythonPandasExerciciosLinks from "./pages/PythonPandasExerciciosLinks";
import PythonPandasProva from "./pages/PythonPandasProva";
import PythonPandas from "./pages/PythonPandas";
import PythonPandasTabelas from "./pages/PythonPandasTabelas";
import PythonSeaborn from "./pages/PythonSeaborn";
import Roadmaps from "./pages/Roadmaps";
import RoadmapCiberseguranca from "./pages/RoadmapCiberseguranca";
import RoadmapGitGithub from "./pages/RoadmapGitGithub";
import RoadmapJavaScript from "./pages/RoadmapJavaScript";
import RoadmapLogicaProgramacao from "./pages/RoadmapLogicaProgramacao";
import RoadmapPhp from "./pages/RoadmapPhp";
import RoadmapPythonPandas from "./pages/RoadmapPythonPandas";
import ProtocoloHttp from "./pages/ProtocoloHttp";
import SorteioInstagram from "./pages/SorteioInstagram";
import SorteioNumeros from "./pages/SorteioNumeros";
import SorteioTimes from "./pages/SorteioTimes";
import TestadorRegex from "./pages/TestadorRegex";
import TailwindCss from "./pages/TailwindCss";
import TailwindCssTabelas from "./pages/TailwindCssTabelas";
import TimerProva from "./pages/TimerProva";
import Utilidades from "./pages/Utilidades";
import ValidadorCpfCnpj from "./pages/ValidadorCpfCnpj";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <RequireAdmin>
                <AdminArea />
              </RequireAdmin>
            }
          />
          <Route
            path="/admin/techplay/disciplinas"
            element={
              <RequireAdmin>
                <AdminTechPlayDisciplinas />
              </RequireAdmin>
            }
          />
          <Route
            path="/admin/techplay/disciplinas/:disciplinaSlug"
            element={
              <RequireAdmin>
                <AdminTechPlayDisciplina />
              </RequireAdmin>
            }
          />
          <Route
            path="/admin/blog"
            element={
              <RequireAdmin>
                <AdminBlog />
              </RequireAdmin>
            }
          />
          <Route path="/aviso-de-privacidade" element={<AvisoPrivacidade />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/roadmaps" element={<Roadmaps />} />
          <Route path="/roadmaps/ciberseguranca" element={<RoadmapCiberseguranca />} />
          <Route path="/roadmaps/git-github" element={<RoadmapGitGithub />} />
          <Route path="/roadmaps/javascript" element={<RoadmapJavaScript />} />
          <Route path="/roadmaps/logica-programacao" element={<RoadmapLogicaProgramacao />} />
          <Route path="/roadmaps/php" element={<RoadmapPhp />} />
          <Route path="/roadmaps/python-pandas" element={<RoadmapPythonPandas />} />
          <Route path="/utilidades" element={<Utilidades />} />
          <Route path="/utilidades/busca-cep" element={<BuscaCep />} />
          <Route path="/utilidades/calculadora-juros" element={<CalculadoraJuros />} />
          <Route path="/utilidades/comparador-textos" element={<ComparadorTextos />} />
          <Route path="/utilidades/conversor-data-hora" element={<ConversorDataHora />} />
          <Route path="/utilidades/gerador-qrcode" element={<GeradorQrCode />} />
          <Route path="/utilidades/gerador-senhas" element={<GeradorSenhas />} />
          <Route path="/utilidades/imc" element={<Imc />} />
          <Route path="/utilidades/mock-sql-json" element={<MockSqlJson />} />
          <Route path="/utilidades/pomodoro" element={<Pomodoro />} />
          <Route path="/utilidades/sorteio-times" element={<SorteioTimes />} />
          <Route path="/utilidades/sorteio-instagram" element={<SorteioInstagram />} />
          <Route path="/utilidades/sorteio-numeros" element={<SorteioNumeros />} />
          <Route path="/utilidades/testador-regex" element={<TestadorRegex />} />
          <Route path="/utilidades/timer-prova" element={<TimerProva />} />
          <Route path="/utilidades/validador-cpf-cnpj" element={<ValidadorCpfCnpj />} />
          <Route path="/disciplinas" element={<Disciplinas />} />
          <Route path="/disciplinas/afd" element={<Afd />} />
          <Route path="/disciplinas/algoritmos" element={<Algoritmos />} />
          <Route path="/disciplinas/algoritmos/linguagem-natural" element={<AlgoritmosLinguagemNatural />} />
          <Route path="/disciplinas/analise-dados" element={<AnaliseDados />} />
          <Route path="/disciplinas/analise-dados/:listaSlug" element={<AnaliseDadosLista />} />
          <Route path="/disciplinas/arquitetura-software" element={<ArquiteturaSoftwareAulas />} />
          <Route path="/disciplinas/arquitetura-software/:aulaSlug" element={<ArquiteturaSoftwareAulas />} />
          <Route path="/disciplinas/arquitetura-software-techplay" element={<ArquiteturaSoftware />} />
          <Route path="/disciplinas/arquitetura-software-techplay/:temaSlug" element={<ArquiteturaSoftware />} />
          <Route path="/disciplinas/docker" element={<Docker />} />
          <Route path="/disciplinas/esbmc" element={<Esbmc />} />
          <Route path="/disciplinas/esbmc/instalacao" element={<EsbmcInstalacao />} />
          <Route path="/disciplinas/esbmc/tabelas-comandos" element={<EsbmcTabelasComandos />} />
          <Route path="/disciplinas/git-github" element={<GitGithub />} />
          <Route path="/disciplinas/modelagem-dados" element={<ModelagemDados />} />
          <Route path="/disciplinas/postgresql" element={<Postgresql />} />
          <Route path="/disciplinas/postgresql/bancos-temporais" element={<PostgresqlBancosTemporais />} />
          <Route path="/disciplinas/postgresql/exercicios" element={<PostgresqlExercicios />} />
          <Route path="/disciplinas/postgresql/exercicios/:listSlug" element={<PostgresqlExercicioBlocos />} />
          <Route path="/disciplinas/postgresql/exercicios/:listSlug/:exerciseSlug" element={<PostgresqlExercicioLista />} />
          <Route path="/disciplinas/postgresql/material-apoio" element={<PostgresqlTabelas />} />
          <Route path="/disciplinas/postgresql/material-apoio/:tableSlug" element={<PostgresqlTabelaDetalhe />} />
          <Route path="/disciplinas/postgresql/tabelas" element={<PostgresqlTabelas />} />
          <Route path="/disciplinas/postgresql/tabelas/:tableSlug" element={<PostgresqlTabelaDetalhe />} />
          <Route path="/disciplinas/postgresql/:topicSlug" element={<PostgresqlTopico />} />
          <Route path="/disciplinas/protocolo-http" element={<ProtocoloHttp />} />
          <Route path="/disciplinas/python-pandas/listas-exercicios" element={<PythonPandasExerciciosLinks />} />
          <Route path="/disciplinas/python-pandas/listas-exercicios/:exerciseSlug" element={<PythonPandasExercicioPratico />} />
          <Route path="/disciplinas/python-pandas/prova" element={<PythonPandasProva />} />
          <Route path="/disciplinas/python-pandas/exercicios-base" element={<PythonPandasExerciciosBase />} />
          <Route path="/disciplinas/python-pandas/exercicios" element={<PythonPandasExercicios />} />
          <Route path="/disciplinas/python-pandas/matplotlib" element={<PythonMatplotlib />} />
          <Route path="/disciplinas/python-pandas/seaborn" element={<PythonSeaborn />} />
          <Route path="/disciplinas/python-pandas" element={<PythonPandas />} />
          <Route path="/disciplinas/python-pandas/csv-excel" element={<PythonPandasCsvExcel />} />
          <Route path="/disciplinas/python-pandas/tabelas" element={<PythonPandasTabelas />} />
          <Route path="/disciplinas/tailwind-css" element={<TailwindCss />} />
          <Route path="/disciplinas/tailwind-css/tabelas" element={<TailwindCssTabelas />} />
          <Route path="/contato/*" element={<Contato />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
