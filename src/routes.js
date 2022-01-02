import Login from './pages/Login'
import Home from './pages/Home'
import CadastroUsuarioDados from './pages/CadastroUsuario/CadastroUsuarioDados'
import CadastroUsuarioSenha from './pages/CadastroUsuario/CadastroUsuarioSenha'
import CadastroUsuarioSucesso from './pages/CadastroUsuario/CadastroUsuarioSucesso'
import Clientes from './pages/Clientes'
import DetalhesCliente from './pages/Clientes/DetalhesCliente'
import ClientesInadimplentes from './pages/Clientes/ClientesInadimplentes'
import ClientesEmDia from './pages/Clientes/ClientesEmDia'
import Cobrancas from './pages/Cobrancas'
import CobrancasVencidas from './pages/Cobrancas/CobrancasVencidas'
import CobrancasPendentes from './pages/Cobrancas/CobrancasPendentes'
import CobrancasPagas from './pages/Cobrancas/CobrancasPagas'
import { GlobalProvider } from './context/GlobalContext'
import useGlobal from './hook/useGlobal'
import {
  Redirect as Redirecionar,
  Route as Rota,
  BrowserRouter as Roteador,
  useLocation
} from 'react-router-dom'
import { validar_Token } from './services/ApiClient';

function RotasProtegidas({ children }) {
  const { token,
    expirationToken, setExpirationToken,
    setDadosUsuario,
    botaoEditarSair,
    useEffect,
    atualCliente} = useGlobal();

  const { pathname } = useLocation();

  useEffect(() => {
    validar_Token(token, setDadosUsuario, setExpirationToken);
  }, [token, botaoEditarSair]);

  return (
    <Rota
      render={() => {
        if (expirationToken === 'jwt expired' ||
          expirationToken === 'jwt malformed' ||
          expirationToken === 'Acesso negado' ||
          expirationToken === 'invalid signature' ||
          expirationToken === 'Usuário não encontrado.' ||
          !token) {

          if (pathname !== '/cadastrodados' ||
            pathname !== '/' ||
            pathname !== '/cadastrosenha' ||
            pathname !== '/cadastrosucesso') {
            return (<Redirecionar to="/" />);
          };
        };
          
        if (token.length !== undefined) {
          if (pathname === '/cadastrodados' ||
            pathname === '/cadastrosenha' ||
            pathname === '/cadastrosucesso' ||
            pathname === '/') {
            return (<Redirecionar to="/home" />);
          };
        };

        if (pathname === '/detalhescliente' && !atualCliente ) return (<Redirecionar to="/home" />);
    
        return (children);
      }}
    />
  );
};

export default function Routes() {
  return (
    <GlobalProvider>
      <Roteador>
        <Rota path='/' exact component={Login} />
        <Rota path='/cadastrodados' exact component={CadastroUsuarioDados} />
        <Rota path='/cadastrosucesso' exact component={CadastroUsuarioSucesso} />
        <Rota path='/cadastrosenha' exact component={CadastroUsuarioSenha} />
        <RotasProtegidas>
          <Rota path='/home' exact component={Home} />
          <Rota path='/clientes' exact component={Clientes} />
          <Rota path='/detalhescliente' exact component={DetalhesCliente} />
          <Rota path='/clientesinadimplentes' exact component={ClientesInadimplentes} />
          <Rota path='/clientesemdia' exact component={ClientesEmDia} />
          <Rota path='/cobrancas' exact component={Cobrancas} />
          <Rota path='/cobrancasvencidas' exact component={CobrancasVencidas} />
          <Rota path='/cobrancaspendentes' exact component={CobrancasPendentes} />
          <Rota path='/cobrancaspagas' exact component={CobrancasPagas} />
        </RotasProtegidas>
      </Roteador>
    </GlobalProvider>
  );
}
