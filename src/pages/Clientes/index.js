import "./styles.css";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import logoTituloClientes from "../../assets/pages/Clientes/logoTituloClientes.svg";
import lupa from "../../assets/pages/Clientes/lupa.svg";
import iconFiltro from "../../assets/pages/Clientes/iconFiltroClientes.svg";
import ModalCadastroEdicaoCliente from "../../components/ModalCadastroEdicaoCliente";
import EditUser from '../../components/EditUser/index';
import useGlobal from "../../hook/useGlobal";
import ConfirmacaoCadastroEdicaoExclusao from "../../components/ConfirmacaoCadastroEdicaoExclusao/index"
import CardTabelaClientes from "../../components/CardTabelaClientes";
import ModalCobrancaCadastroEdicao from '../../components/ModalCadastroEdicaoCobranca';
// import CardNenhumResultado from "../../components/CardNenhumResultado";
import { buscar_Dados_Clientes, buscar_Dados_Cobrancas } from '../../services/ApiClient';

export default function Clientes() {
    const {
        modalEditarUsuario,
        cadastroEdicaoExclusaoSucesso,
        setModalAddCliente,
        mostrarModalAddCobranca,
        mostrarModalEdicaoCobranca,
        modalAddCliente,
        setTodosClientes,
        mensagemSucesso,
        token,
        setParametroSlice,
        todosClientesPerduram, setTodosClientesPerduram,
        mostarModalExcluirCobranca,
        setTodasCobrancas, setTodasCobrancasPerduram, useEffect
    } = useGlobal();

    useEffect(() => {
        async function cobrancas_Fetch() {
            const { lista_Cobrancas } = await buscar_Dados_Cobrancas(token);
            await setTodasCobrancas(lista_Cobrancas);
            await setTodasCobrancasPerduram(lista_Cobrancas);
          };

        async function clientes_Fetch() {
          const {lista_Clientes} = await buscar_Dados_Clientes(token);
            await setTodosClientes(lista_Clientes);
            await setTodosClientesPerduram(lista_Clientes);
        };
        clientes_Fetch();
        cobrancas_Fetch();
    }, [mostrarModalAddCobranca,
        mostrarModalEdicaoCobranca,
        mostarModalExcluirCobranca,
        mensagemSucesso,
        token,
        Clientes]);
    


    async function pesquisa_Cliente(event) {
        const itemPesquisa = event.target.value;

        if (itemPesquisa.length === 0 || itemPesquisa === '') {
            const { lista_Clientes } = await buscar_Dados_Clientes(token);
            return await setTodosClientes(lista_Clientes);
        };

        const cliente_Por_Pesquisa = todosClientesPerduram.filter(cliente => {
            return cliente.nome.toLowerCase().includes(itemPesquisa.toLowerCase()) ||
                cliente.email.toLowerCase().includes(itemPesquisa.toLowerCase()) ||
                cliente.cpf.toLowerCase().includes(itemPesquisa.toLowerCase());
        });

        await setParametroSlice(0);
        return await setTodosClientes(cliente_Por_Pesquisa);
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
                {<CardTabelaClientes />}
                {/* <CardNenhumResultado /> */}
                {modalAddCliente && <ModalCadastroEdicaoCliente />}
                {cadastroEdicaoExclusaoSucesso && <ConfirmacaoCadastroEdicaoExclusao />}
                {mostrarModalAddCobranca && <ModalCobrancaCadastroEdicao />}
                {mostrarModalEdicaoCobranca && <ModalCobrancaCadastroEdicao />}
            </div>
        </div>
    );
}
