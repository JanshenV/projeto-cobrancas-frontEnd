import "./styles.css";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import logoTituloClientes from "../../../assets/pages/Clientes/logoTituloClientes.svg";
import ModalCadastroEdicaoCliente from '../../../components/ModalCadastroEdicaoCliente';
import useGlobal from "../../../hook/useGlobal";
import CardDadosCliente from "../../../components/CardDadosCliente";
import CardCobrancasCliente from "../../../components/CardCobrancasCliente";
import ModalCobrancaCadastroEdicao from '../../../components/ModalCadastroEdicaoCobranca';
import ConfirmacaoCadastroEdicaoExclusao from '../../../components/ConfirmacaoCadastroEdicaoExclusao';
import ModalExcluirCobranca from '../../../components/modalExcluirCobranca';
import EditUser from '../../../components/EditUser/index';

export default function DetalhesCliente() {
    const {
        modalEditarCliente,
        modalEditarUsuario,
        mostrarModalAddCobranca,
        mostrarModalEdicaoCobranca,
        atualCliente,
        cadastroEdicaoExclusaoSucesso,
        mostarModalExcluirCobranca
    } = useGlobal();

    return (
        <div className='container-dados_clientes'>
            <Sidebar />
            <div className='body-dados_clientes'>
                {modalEditarUsuario && <EditUser />}
                <Header />
                <div className='div-dados_clientes'>
                    <div className='title-dados_clientes'>
                        <img src={logoTituloClientes} alt='logo clientes' />
                        <span>{atualCliente.nome}</span>
                    </div>
                    <CardDadosCliente />
                    <CardCobrancasCliente />
                </div>
                {modalEditarCliente && <ModalCadastroEdicaoCliente />}
                {mostrarModalAddCobranca && <ModalCobrancaCadastroEdicao />}
                {mostrarModalEdicaoCobranca && <ModalCobrancaCadastroEdicao />}
                {cadastroEdicaoExclusaoSucesso && < ConfirmacaoCadastroEdicaoExclusao />}
                {mostarModalExcluirCobranca.mostrar && <ModalExcluirCobranca />}
            </div>
        </div>
    );
}
