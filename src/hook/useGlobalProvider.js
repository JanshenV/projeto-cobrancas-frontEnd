import { useState, useEffect } from 'react'
import { useLocalStorage } from 'react-use'

export default function useGlobalProvider() {
    const [token, setToken] = useLocalStorage('token', {});
    const [expirationToken, setExpirationToken] = useState('');
    const [botaoEditarSair, setBotaoEditarSair] = useState(false);
    const [cadastroEdicaoExclusaoSucesso, setCadastroEdicaoExclusaoSucesso] = useState(false);
    const [mensagemSucesso, setMensagemSucesso] = useState(false);
    const [mensagemApiErroEmail, setMensagemApiErroEmail] = useState('');
    const [mensagemApiErroCpf, setMensagemApiErroCpf] = useState('');
    const [mensagemApiErroTelefone, setMensagemApiErroTelefone] = useState('');

    const [confirmEdicaoUsuario, setConfirmEdicaoUsuario] = useState(false)
    const [dadosUsuario, setDadosUsuario] = useState({})
    const [modalEditarUsuario, setModalEditarUsuario] = useState(false)
    const [dadosCadastrar, setDadosCadastrar] = useState({
        nome: '',
        email: '',
        senha: ''
    })

    const [modalEditarCliente, setModalEditarCliente] = useState(false);
    const [mostrarModalAddEditarCliente, setMostrarModalAddEditarCliente] = useState(false);
    const [modalAddCliente, setModalAddCliente] = useState(false);
    const [todosClientes, setTodosClientes] = useState([]);
    const [todosClientesPerduram, setTodosClientesPerduram] = useState([]);
    const [clienteSelecionado, setClienteSelecionado] = useState({});
    const [listaInadimplentes, setListaInadimplentes] = useState([]);
    const [listaInadimplentesPerduram, setListaInadimplentesPerduram] = useState([]);
    const [listaEmDia, setListaEmDia] = useState([]);
    const [listaEmDiaPerduram, setListaEmDiaPerduram] = useState([]);
    const [atualCliente, setAtualCliente] = useLocalStorage('atual_Cliente', '');
    const [atualCobranca, setAtualCobranca] = useState();
    const [dadosCliente, setDadosCliente] = useState({
        nome: '',
        email: '',
        cpf: '',
        telefone: '',
        logradouro: '',
        complemento: '',
        cep: '',
        bairo: '',
        cidade: '',
        estado: ''
    });

    const [parametroSlice, setParametroSlice] = useState(0);
    const [todasCobrancas, setTodasCobrancas] = useState([]);
    const [todasCobrancasPerduram, setTodasCobrancasPerduram] = useState([]);
    const [listaCobrancasPagas, setListaCobrancasPagas] = useState({
        lista_Cobrancas: '',
        valor_Total: ''
    });
    const [cobrancasPagasPerduram, setCobrancasPagasPerduram] = useState([]);


    const [listaCobrancasPendentes, setListaCobrancasPendentes] = useState({
        lista_Cobrancas: '',
        valor_Total: ''
    });
    const [cobrancasPendentesPerduram, setCobrancasPendentesPerduram] = useState([]);

    const [listaCobrancasVencidas, setListaCobrancasVencidas] = useState({
        lista_Cobrancas: '',
        valor_Total: ''
    });
    const [cobrancasVencidasPerduram, setCobrancasVencidasPerduram] = useState([]);


    const [mostrarModalAddCobranca, setMostrarModalAddCobranca] = useState(false);
    const [mostrarModalEdicaoCobranca, setMostrarModalEdicaoCobranca] = useState(false);
    const [mostarModalExcluirCobranca, setMostarModalExcluirCobranca] = useState({
        id: '',
        mostrar: false
    });
    const [respostaExluirCobranca, setRespostaExcluirCobranca] = useState('');

    const [openDetalheCobranca, setOpenDetalheCobranca] = useState(false)
    const [dadosCobranca, setDadosCobranca] = useState({
        nome: '',
        descricao: '',
        vencimento: '',
        valor: '',
        id: '',
        status: ''
    })

    return {
        token,

        setToken,
        useState,
        useEffect,

        modalEditarUsuario,
        setModalEditarUsuario,

        botaoEditarSair,
        setBotaoEditarSair,

        modalAddCliente,
        setModalAddCliente,

        dadosUsuario,
        setDadosUsuario,

        dadosCadastrar,
        setDadosCadastrar,

        confirmEdicaoUsuario,
        setConfirmEdicaoUsuario,

        dadosCliente,
        setDadosCliente,

        listaInadimplentes,
        setListaInadimplentes,

        listaEmDia,
        setListaEmDia,

        mensagemApiErroEmail,
        setMensagemApiErroEmail,

        mensagemApiErroCpf,
        setMensagemApiErroCpf,

        mensagemApiErroTelefone,
        setMensagemApiErroTelefone,

        cadastroEdicaoExclusaoSucesso,
        setCadastroEdicaoExclusaoSucesso,

        modalEditarCliente,
        setModalEditarCliente,

        mostrarModalAddEditarCliente,
        setMostrarModalAddEditarCliente,

        mensagemSucesso,
        setMensagemSucesso,

        todosClientes,
        setTodosClientes,

        todosClientesPerduram,
        setTodosClientesPerduram,

        todasCobrancas,
        setTodasCobrancas,

        todasCobrancasPerduram,
        setTodasCobrancasPerduram,

        listaCobrancasPagas,
        setListaCobrancasPagas,

        listaCobrancasPendentes,
        setListaCobrancasPendentes,

        listaCobrancasVencidas,
        setListaCobrancasVencidas,

        mostrarModalAddCobranca,
        setMostrarModalAddCobranca,

        clienteSelecionado,
        setClienteSelecionado,

        atualCliente,
        setAtualCliente,

        mostrarModalEdicaoCobranca,
        setMostrarModalEdicaoCobranca,

        atualCobranca,
        setAtualCobranca,

        mostarModalExcluirCobranca,
        setMostarModalExcluirCobranca,

        respostaExluirCobranca,
        setRespostaExcluirCobranca,

        openDetalheCobranca,
        setOpenDetalheCobranca,

        dadosCobranca,
        setDadosCobranca,

        parametroSlice,
        setParametroSlice,

        listaInadimplentesPerduram,
        setListaInadimplentesPerduram,

        listaEmDiaPerduram,
        setListaEmDiaPerduram,

        expirationToken,
        setExpirationToken,

        cobrancasVencidasPerduram,
        setCobrancasVencidasPerduram,

        cobrancasPagasPerduram,
        setCobrancasPagasPerduram,

        cobrancasPendentesPerduram,
        setCobrancasPendentesPerduram
    };
};