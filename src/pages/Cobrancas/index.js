import "./styles.css";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import logoTituloCobrancas from "../../assets/pages/Cobrancas/logoTituloCobrancas.svg";
import lupa from "../../assets/pages/Cobrancas/lupa.svg";
import iconFiltro from "../../assets/pages/Cobrancas/iconFiltroClientes.svg";
import EditUser from '../../components/EditUser/index';
import useGlobal from "../../hook/useGlobal";
import CardTabelaCobrancas from "../../components/CardTabelaCobrancas";
import { buscar_Dados_Cobrancas, buscar_Dados_Clientes } from "../../services/ApiClient";
import ModalExcluirCobranca from '../../components/modalExcluirCobranca';
import ModalCobrancaCadastroEdicao from "../../components/ModalCadastroEdicaoCobranca";
import ConfirmacaoCadastroEdicaoExclusao from '../../components/ConfirmacaoCadastroEdicaoExclusao';

export default function Cobrancas() {
  const {
    modalEditarUsuario,
    token,
    setTodasCobrancas,
    mostrarModalAddCobranca,
    mostrarModalEdicaoCobranca,
    mostarModalExcluirCobranca,
    useEffect,
    cadastroEdicaoExclusaoSucesso,
    todasCobrancasPerduram,
    setTodasCobrancasPerduram,
    setParametroSlice,
    setTodosClientes,
    mensagemSucesso,

  } = useGlobal();

  useEffect(() => {
    async function cobrancas_Fetch() {
      const { lista_Cobrancas } = await buscar_Dados_Cobrancas(token);
      await setTodasCobrancas(lista_Cobrancas);
      await setTodasCobrancasPerduram(lista_Cobrancas);
    };
    cobrancas_Fetch();
  }, [mostrarModalAddCobranca, mostrarModalEdicaoCobranca, mostarModalExcluirCobranca, Cobrancas]);

  useEffect(() => {
    async function clientes_Fetch() {
      const {lista_Clientes} = await buscar_Dados_Clientes(token);
      await setTodosClientes(lista_Clientes);
    };
    clientes_Fetch();
  }, [mensagemSucesso, token, Cobrancas]);

  

  async function pesquisa_Cobranca(event) {
    const itemPesquisa = event.target.value;

    if (itemPesquisa.length === 0 || itemPesquisa === '') {
      const { lista_Cobrancas } = await buscar_Dados_Cobrancas(token);
      await setTodasCobrancas(lista_Cobrancas);
    };

    if (itemPesquisa.length === 1) {
      const cobranca_Find = todasCobrancasPerduram.find(cobranca => String(cobranca.id) === itemPesquisa);
      if (cobranca_Find) {
        await setParametroSlice(0);
        return await setTodasCobrancas([cobranca_Find]);
      };
      return await setTodasCobrancas(todasCobrancasPerduram);
    };
    const cobranca_Por_Pesquisa = todasCobrancasPerduram.filter(cobranca => {
      return cobranca.dados_Clientes[0].nome.toLowerCase().includes(itemPesquisa.toLowerCase()) ||
        String(cobranca.id).includes(itemPesquisa) ||
        cobranca.status.toLowerCase().includes(itemPesquisa.toLowerCase());

    });

    return await setTodasCobrancas(cobranca_Por_Pesquisa);
  };

  return (
    <div className="container-cobrancas">
      <Sidebar />
      {modalEditarUsuario && <EditUser />}
      <div className="body-cobrancas">
        <Header />
        <div className="barra-pesquisa_cobrancas">
          <div className="logo-title_cobrancas">
            <img src={logoTituloCobrancas} alt="logo cobranças" />
            <span>Cobranças</span>
          </div>
          <div className="pesquisa_cobrancas">
            <img src={iconFiltro} alt="filtro" />
            <div className="div-lupa_cobrancas">
              <input
                className="input-pesquisa_cobrancas"
                placeholder="Pesquisa"
                onChange={(event) => {
                  pesquisa_Cobranca(event);
                }}
              />
              <img
                className="lupa_cobrancas"
                src={lupa}
                alt="lupa" />
            </div>
            {mostrarModalEdicaoCobranca && <ModalCobrancaCadastroEdicao />}
            {cadastroEdicaoExclusaoSucesso && <ConfirmacaoCadastroEdicaoExclusao />}
          </div>
        </div>
        <CardTabelaCobrancas />
      </div>
      {mostarModalExcluirCobranca.mostrar && <ModalExcluirCobranca />}
    </div>
  )
}
