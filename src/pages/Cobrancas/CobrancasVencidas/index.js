
import iconFiltro from "../../../assets/pages/Cobrancas/iconFiltroClientes.svg";
import logoTituloCobrancas from "../../../assets/pages/Cobrancas/logoTituloCobrancas.svg";
import lupa from "../../../assets/pages/Cobrancas/lupa.svg";
import CardCobrancasVencidas from "../../../components/CardCobrancasVencidas";
import ConfirmacaoCadastroEdicaoExclusao from '../../../components/ConfirmacaoCadastroEdicaoExclusao';
import EditUser from '../../../components/EditUser/index';
import Header from "../../../components/Header";
import ModalCobrancaCadastroEdicao from "../../../components/ModalCadastroEdicaoCobranca";
import ModalExcluirCobranca from '../../../components/modalExcluirCobranca';
import Sidebar from "../../../components/Sidebar";
import useGlobal from "../../../hook/useGlobal";
import { buscar_Dados_Cobrancas } from "../../../services/ApiClient";
import "./styles.css";

export default function CobrancasVencidas() {

  const {
    modalEditarUsuario,
    token,
    listaCobrancasVencidas, setListaCobrancasVencidas,
    mostrarModalEdicaoCobranca, mostarModalExcluirCobranca,
    cadastroEdicaoExclusaoSucesso,
    cobrancasVencidasPerduram,
    setParametroSlice, 
  } = useGlobal();

  async function pesquisa_Cobranca(event) {
    const itemPesquisa = event.target.value;

    if (itemPesquisa.length === 0 || itemPesquisa === '') {
      const { cobrancas_Vencidas } = await buscar_Dados_Cobrancas(token);
      const itensCobrancasVencidas = cobrancas_Vencidas.cobrancas_Vencidas;
      return await setListaCobrancasVencidas({
        ...listaCobrancasVencidas,
        lista_Cobrancas: itensCobrancasVencidas
      });
  
    };

    if (itemPesquisa.length === 1) {
      const cobranca_Find = cobrancasVencidasPerduram.find(cobranca => String(cobranca.id) === itemPesquisa);

      if (cobranca_Find) {
        await setParametroSlice(0);
        return await setListaCobrancasVencidas({
          ...listaCobrancasVencidas,
          lista_Cobrancas: cobranca_Find
        });
      };

      return setListaCobrancasVencidas({
        ...listaCobrancasVencidas,
        lista_Cobrancas: cobrancasVencidasPerduram
      });
    };

    const cobranca_Por_Pesquisa = cobrancasVencidasPerduram.filter(cobranca => {
      return cobranca.dados_Clientes[0].nome.toLowerCase().includes(itemPesquisa.toLowerCase()) ||
        String(cobranca.id).includes(itemPesquisa) ||
        cobranca.status.toLowerCase().includes(itemPesquisa.toLowerCase());
    });


    await setListaCobrancasVencidas({
      ...listaCobrancasVencidas,
      lista_Cobrancas: [...cobranca_Por_Pesquisa]
  
    });
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
        <CardCobrancasVencidas />
      </div>
      {mostarModalExcluirCobranca.mostrar && <ModalExcluirCobranca />}
    </div>
  )
}
