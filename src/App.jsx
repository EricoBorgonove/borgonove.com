import { BrowserRouter, Route, Routes } from "react-router-dom";
import RequireAdmin from "./components/RequireAdmin";
import ScrollToTop from "./components/ScrollToTop";
import MainLayout from "./layout/MainLayout";
import AdminArea from "./pages/AdminArea";
import AdminBlog from "./pages/AdminBlog";
import AdminLogin from "./pages/AdminLogin";
import AdminTechPlayDisciplina from "./pages/AdminTechPlayDisciplina";
import AdminTechPlayDisciplinas from "./pages/AdminTechPlayDisciplinas";
import Algoritmos from "./pages/Algoritmos";
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
import GitGithub from "./pages/GitGithub";
import GeradorQrCode from "./pages/GeradorQrCode";
import GeradorSenhas from "./pages/GeradorSenhas";
import Home from "./pages/Home";
import Imc from "./pages/Imc";
import MockSqlJson from "./pages/MockSqlJson";
import ModelagemDados from "./pages/ModelagemDados";
import NotFound from "./pages/NotFound";
import Pomodoro from "./pages/Pomodoro";
import Roadmaps from "./pages/Roadmaps";
import RoadmapCiberseguranca from "./pages/RoadmapCiberseguranca";
import RoadmapGitGithub from "./pages/RoadmapGitGithub";
import RoadmapJavaScript from "./pages/RoadmapJavaScript";
import RoadmapLogicaProgramacao from "./pages/RoadmapLogicaProgramacao";
import RoadmapPhp from "./pages/RoadmapPhp";
import ProtocoloHttp from "./pages/ProtocoloHttp";
import SorteioInstagram from "./pages/SorteioInstagram";
import SorteioNumeros from "./pages/SorteioNumeros";
import SorteioTimes from "./pages/SorteioTimes";
import TestadorRegex from "./pages/TestadorRegex";
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
          <Route path="/disciplinas/algoritmos" element={<Algoritmos />} />
          <Route path="/disciplinas/analise-dados" element={<AnaliseDados />} />
          <Route path="/disciplinas/analise-dados/:listaSlug" element={<AnaliseDadosLista />} />
          <Route path="/disciplinas/arquitetura-software" element={<ArquiteturaSoftwareAulas />} />
          <Route path="/disciplinas/arquitetura-software/:aulaSlug" element={<ArquiteturaSoftwareAulas />} />
          <Route path="/disciplinas/arquitetura-software-techplay" element={<ArquiteturaSoftware />} />
          <Route path="/disciplinas/arquitetura-software-techplay/:temaSlug" element={<ArquiteturaSoftware />} />
          <Route path="/disciplinas/git-github" element={<GitGithub />} />
          <Route path="/disciplinas/modelagem-dados" element={<ModelagemDados />} />
          <Route path="/disciplinas/protocolo-http" element={<ProtocoloHttp />} />
          <Route path="/contato/*" element={<Contato />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
