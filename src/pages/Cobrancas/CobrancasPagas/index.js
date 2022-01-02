import iconFiltro from "../../../assets/pages/Cobrancas/iconFiltroClientes.svg";
import logoTituloCobrancas from "../../../assets/pages/Cobrancas/logoTituloCobrancas.svg";
import lupa from "../../../assets/pages/Cobrancas/lupa.svg";
import CardCobrancasPagas from "../../../components/CardCobrancasPagas";
import ConfirmacaoCadastroEdicaoExclusao from '../../../components/ConfirmacaoCadastroEdicaoExclusao';
import EditUser from '../../../components/EditUser/index';
import Header from "../../../components/Header";
import ModalCobrancaCadastroEdicao from "../../../components/ModalCadastroEdicaoCobranca";
import ModalExcluirCobranca from '../../../components/modalExcluirCobranca';
import Sidebar from "../../../components/Sidebar";
import useGlobal from "../../../hook/useGlobal";
import { buscar_Dados_Cobrancas } from "../../../services/ApiClient";
import "./styles.css";

export default function CobrancasPagas() {

  const {
    modalEditarUsuario,
    token,
    mostrarModalEdicaoCobranca,
    mostarModalExcluirCobranca,
    cadastroEdicaoExclusaoSucesso,
    setListaCobrancasPagas,
    listaCobrancasPagas,
    cobrancasPagasPerduram,
    setParametroSlice
  } = useGlobal();

  async function pesquisa_Cobranca(event) {
    const itemPesquisa = event.target.value;

    if (itemPesquisa.length === 0 || itemPesquisa === '') {
      const { cobrancas_Pagas } = await buscar_Dados_Cobrancas(token);
      const itensCobrancasPagas = cobrancas_Pagas.cobrancas_Pagas;
      return await setListaCobrancasPagas({
        ...listaCobrancasPagas,
        lista_Cobrancas: itensCobrancasPagas
      });
  
    };

    if (itemPesquisa.length === 1) {
      const cobranca_Find = cobrancasPagasPerduram.find(cobranca => String(cobranca.id) === itemPesquisa);

      if (cobranca_Find) {
        await setParametroSlice(0);
        return await setListaCobrancasPagas({
          ...listaCobrancasPagas,
          lista_Cobrancas: cobranca_Find
        });
      };

      return setListaCobrancasPagas({
        ...listaCobrancasPagas,
        lista_Cobrancas: cobrancasPagasPerduram
      });
    };

    const cobranca_Por_Pesquisa = cobrancasPagasPerduram.filter(cobranca => {
      return cobranca.dados_Clientes[0].nome.toLowerCase().includes(itemPesquisa.toLowerCase()) ||
        String(cobranca.id).includes(itemPesquisa) ||
        cobranca.status.toLowerCase().includes(itemPesquisa.toLowerCase());
    });


    await setListaCobrancasPagas({
      ...listaCobrancasPagas,
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
        <CardCobrancasPagas />
      </div>
      {mostarModalExcluirCobranca.mostrar && <ModalExcluirCobranca />}
    </div>
  );
}
