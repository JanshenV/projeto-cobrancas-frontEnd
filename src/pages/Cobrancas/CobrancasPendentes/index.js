import "./styles.css";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import logoTituloCobrancas from "../../../assets/pages/Cobrancas/logoTituloCobrancas.svg";
import lupa from "../../../assets/pages/Cobrancas/lupa.svg";
import iconFiltro from "../../../assets/pages/Cobrancas/iconFiltroClientes.svg";
import EditUser from '../../../components/EditUser/index';
import useGlobal from "../../../hook/useGlobal";
import CardCobrancasPendentes from "../../../components/CardCobrancasPendentes";
import { useEffect } from "react";
import { buscar_Dados_Cobrancas } from "../../../services/ApiClient";
import ModalExcluirCobranca from '../../../components/modalExcluirCobranca';
import ModalCobrancaCadastroEdicao from "../../../components/ModalCadastroEdicaoCobranca";
import ConfirmacaoCadastroEdicaoExclusao from '../../../components/ConfirmacaoCadastroEdicaoExclusao';

export default function CobrancasPendentes() {
  const {
    modalEditarUsuario,
    token, mostrarModalEdicaoCobranca,
    mostarModalExcluirCobranca,
    cadastroEdicaoExclusaoSucesso,
    setListaCobrancasPendentes,
    cobrancasPendentesPerduram,
    listaCobrancasPendentes,
    setParametroSlice
  } = useGlobal();


  async function pesquisa_Cobranca(event) {
    const itemPesquisa = event.target.value;

    if (itemPesquisa.length === 0 || itemPesquisa === '') {
      const { cobrancas_Pendentes } = await buscar_Dados_Cobrancas(token);
      const itensCobrancasPendentes = cobrancas_Pendentes.cobrancas_Pendentes;
      return await setListaCobrancasPendentes({
        ...listaCobrancasPendentes,
        lista_Cobrancas: itensCobrancasPendentes
      });
  
    };

    if (itemPesquisa.length === 1) {
      const cobranca_Find = cobrancasPendentesPerduram.find(cobranca => String(cobranca.id) === itemPesquisa);

      if (cobranca_Find) {
        await setParametroSlice(0);
        return await setListaCobrancasPendentes({
          ...listaCobrancasPendentes,
          lista_Cobrancas: cobranca_Find
        });
      };

      return setListaCobrancasPendentes({
        ...listaCobrancasPendentes,
        lista_Cobrancas: cobrancasPendentesPerduram
      });
    };

    const cobranca_Por_Pesquisa = cobrancasPendentesPerduram.filter(cobranca => {
      return cobranca.dados_Clientes[0].nome.toLowerCase().includes(itemPesquisa.toLowerCase()) ||
        String(cobranca.id).includes(itemPesquisa) ||
        cobranca.status.toLowerCase().includes(itemPesquisa.toLowerCase());
    });


    await setListaCobrancasPendentes({
      ...listaCobrancasPendentes,
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
        <CardCobrancasPendentes />
      </div>
      {mostarModalExcluirCobranca.mostrar && <ModalExcluirCobranca />}
    </div>
  )
}
