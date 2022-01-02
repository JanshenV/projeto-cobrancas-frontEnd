import "./styles.css";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import logoTituloClientes from "../../../assets/pages/Clientes/logoTituloClientes.svg";
import lupa from "../../../assets/pages/Clientes/lupa.svg";
import iconFiltro from "../../../assets/pages/Clientes/iconFiltroClientes.svg";
import ModalCadastroEdicaoCliente from "../../../components/ModalCadastroEdicaoCliente";
import EditUser from '../../../components/EditUser/index';
import useGlobal from "../../../hook/useGlobal";
import ConfirmacaoCadastroEdicaoExclusao from "../../../components/ConfirmacaoCadastroEdicaoExclusao/index"
import CardClientesEmDia from "../../../components/CardClientesEmDia";
import ModalCobrancaCadastroEdicao from '../../../components/ModalCadastroEdicaoCobranca';
// import CardNenhumResultado from "../../../components/CardNenhumResultado";
import { buscar_Dados_Clientes } from '../../../services/ApiClient';
import { useEffect } from 'react';

export default function ClientesEmDia() {
    const {
        modalEditarUsuario,
        cadastroEdicaoExclusaoSucesso,
        setModalAddCliente,
        mostrarModalAddCobranca,
        mostrarModalEdicaoCobranca,
        modalAddCliente,
        mensagemSucesso,
        token,
        setParametroSlice,
        setListaEmDia,
        listaEmDiaPerduram,
        setListaEmDiaPerduram,
    } = useGlobal();

    useEffect(() => {
        async function clientesEmDia_Fetch() {
            const { lista_Clientes_EmDia } = await buscar_Dados_Clientes(token);
            await setListaEmDia(lista_Clientes_EmDia);
            await setListaEmDiaPerduram(lista_Clientes_EmDia);
        };
        clientesEmDia_Fetch();
    }, [mensagemSucesso, token]);


    async function pesquisa_Cliente(event) {
        const itemPesquisa = event.target.value;
    
        if (itemPesquisa.length === 0 || itemPesquisa === '') {
            const { lista_Clientes_EmDia } = await buscar_Dados_Clientes(token);
            return await setListaEmDia(lista_Clientes_EmDia);
        };

        const cliente_Por_Pesquisa = listaEmDiaPerduram.filter(cliente => {
            return cliente.nome.toLowerCase().includes(itemPesquisa.toLowerCase()) ||
                cliente.email.toLowerCase().includes(itemPesquisa.toLowerCase()) ||
                cliente.cpf.toLowerCase().includes(itemPesquisa.toLowerCase());
        });
        await setParametroSlice(0);
        return setListaEmDia(cliente_Por_Pesquisa);
    };

    return (
        <div className='container-clientes'>
            <Sidebar />
            <div className='body-clientes'>
                {modalEditarUsuario && <EditUser />}
                <Header />
                <div className='barra-pesquisa'>
                    <div className='logo-title'>
                        <img src={logoTituloClientes} alt='logo clientes' />
                        <span>Clientes</span>
                    </div>
                    <div className='add-e-pesquisa'>
                        <button
                            className='addCliente'
                            onClick={() => setModalAddCliente(true)}
                        >+ Adicionar cliente</button>
                        <img src={iconFiltro} alt='filtro' />
                        <div className='div-lupa'>
                            <input
                                className='pesquisa'
                                placeholder='Pesquisa'
                                onChange={(event) => {
                                    pesquisa_Cliente(event)
                                }} />
                            <img
                                className='lupa'
                                src={lupa}
                                alt='lupa' />
                        </div>
                    </div>
                </div>
                <div className='tabela-lista_clientes'></div>
                {<CardClientesEmDia />}
                {/* <CardNenhumResultado /> */}
                {modalAddCliente && <ModalCadastroEdicaoCliente />}
                {cadastroEdicaoExclusaoSucesso && <ConfirmacaoCadastroEdicaoExclusao />}
                {mostrarModalAddCobranca && <ModalCobrancaCadastroEdicao />}
                {mostrarModalEdicaoCobranca && <ModalCobrancaCadastroEdicao />}
            </div>
        </div>
    );
}
