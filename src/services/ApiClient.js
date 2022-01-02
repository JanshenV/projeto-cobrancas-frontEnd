const BASE_URL = 'https://back-integral-m05-desafio.herokuapp.com/';

async function validar_Token(token, setDadosUsuario, setExpirationToken) {
    try {
        const pedido_Fetch = await fetch(`${BASE_URL}perfil`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: token
            }
        });

        const resposta_Fetch = await pedido_Fetch.json();
        await setDadosUsuario(resposta_Fetch);
        await setExpirationToken(resposta_Fetch.message);
    } catch ({ message }) {
        console.log(message)
    };
};

async function Conexao_Login(email, senha, setToken, history, setDadosFetch) {
    try {
        const dados_Para_Login = {
            email,
            senha
        }
        const pedido_Fetch = await fetch(`${BASE_URL}login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados_Para_Login)
        })

        const { token, message } = await pedido_Fetch.json()
        if (token) {
            await setToken(token);
            history.push('/home');
        };

        const mensagemErro = message[0].toUpperCase() + message.substr(1)
        await setDadosFetch(mensagemErro)
    } catch ({ message }) {
        console.log(message)
    };
};

async function buscar_Dados_Usuario(dadosCadastrar, setEmailExistente, history) {
    try {
        const pedido_Fetch = await fetch(`${BASE_URL}usuarios`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const resposta_Fetch = await pedido_Fetch.json();

        const emailExistente = resposta_Fetch.find(item => item.email === dadosCadastrar.email);

        if (emailExistente) {
            return await setEmailExistente(true);
        } else {
            await setEmailExistente(false);
        };

        history.push('/cadastrosenha');
    } catch ({ message }) {
        console.log(message);
    };
};

async function cadastrar_Usuario(dadosCadastrar, limpaImputs, history) {
    try {
        const pedido_Fetch = await fetch(`${BASE_URL}usuarios`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosCadastrar)
        });
        if (pedido_Fetch.status !== 201) {
            return console.log(pedido_Fetch)
        };

        limpaImputs();
        history.push('/cadastrosucesso');
    } catch (error) {
        console.log(error);
    };
};

async function editar_Usuario(
    token,
    novosDados,
    setConfirmEdicaoUsuario,
    setModalEditarUsuario,
    setMensagemApiErroTelefone,
    setMensagemApiErroCpf,
    setMensagemApiErroEmail,
    setMensagemApiErroSenha,
    ValidaRetornoDaApi
) {
    try {
        const pedido_Fetch = await fetch(`${BASE_URL}usuarios`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
            },
            body: JSON.stringify(novosDados),
        });

        const { message } = await pedido_Fetch.json();
        const { status } = pedido_Fetch;

        if (status === 200) {
            setConfirmEdicaoUsuario(true);
            setTimeout(() => {
                setConfirmEdicaoUsuario(false);
                setModalEditarUsuario(false);
            }, 2000);

        } else {
            const setEstadosRetornoApi = {
                setMensagemApiErroTelefone,
                setMensagemApiErroCpf,
                setMensagemApiErroEmail,
                setMensagemApiErroSenha
            }
            ValidaRetornoDaApi(message, setEstadosRetornoApi);
        }

    } catch ({ message }) {
        console.log(message);
    };
};

async function cadastrar_editar_cliente(parametrosParaCadastroEdicaoCliente) {

    const {
        token,
        dadosCliente,
        atualCliente,
        setAtualCliente,
        modalEditarCliente,
        setMensagemSucesso,
        setEstadosRetornoApi,
        handleClose,
        setCadastroEdicaoExclusaoSucesso,
        setModalAddCliente,
        setModalEditarCliente,
        ValidaRetornoDaApi
    } = parametrosParaCadastroEdicaoCliente;

    const { id } = dadosCliente;

    try {
        const URL = 'https://back-integral-m05-desafio.herokuapp.com/';
        const Fetch_Cadastrar = `clientes`;
        const Fetch_Editar = `clientes/${id}`;

        const pedido_Fetch = await fetch(`${URL}${modalEditarCliente ? Fetch_Editar : Fetch_Cadastrar}`, {
            method: modalEditarCliente ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
            },
            body: JSON.stringify(dadosCliente)
        });
        const { message } = await pedido_Fetch.json();
        const { status } = pedido_Fetch;

        if (status === 200) {
            setAtualCliente({
                ...atualCliente,
                nome: dadosCliente.nome,
                email: dadosCliente.email,
                cpf: dadosCliente.cpf,
                telefone: dadosCliente.telefone,
                endereco: dadosCliente.endereco,
                complemento: dadosCliente.complemento,
                cep: dadosCliente.cep,
                bairro: dadosCliente.bairro,
                cidade: dadosCliente.cidade,
                uf: dadosCliente.uf
            });
        };

        if (status === 201 || status === 200) {
            setMensagemSucesso(message)
            handleClose()
            setCadastroEdicaoExclusaoSucesso(true);
            setTimeout(() => {
                setCadastroEdicaoExclusaoSucesso(false);
                setModalAddCliente(false);
                setModalEditarCliente(false);
            }, 3000);

        } else {
            ValidaRetornoDaApi(message, setEstadosRetornoApi);
        };

    } catch ({ message }) {
        return console.log(message);
    };
}

async function buscar_Dados_Clientes(
    token
) {
    try {
        const pedido_Fetch = await fetch(`${BASE_URL}clientes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: token
            }
        });
        const {
            lista_Clientes,
            lista_Clientes_EmDia,
            lista_Clientes_Inadimplentes
        } = await pedido_Fetch.json();

        return {
            lista_Clientes,
            lista_Clientes_EmDia,
            lista_Clientes_Inadimplentes
        };
    } catch ({ message }) {
        return console.log(message);
    };
};

async function buscar_Dados_Cobrancas(
    token

) {
    try {
        const pedido_Fetch = await fetch(`${BASE_URL}cobrancas`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: token
            }
        });
        const {
            lista_Cobrancas,
            cobrancas_Pagas,
            cobrancas_Pendentes,
            cobrancas_Vencidas
        } = await pedido_Fetch.json();

        return {
            lista_Cobrancas,
            cobrancas_Pagas,
            cobrancas_Pendentes,
            cobrancas_Vencidas
        };
    } catch ({ message }) {
        return console.log(message);
    };
};

async function cadastrar_Cobranca(parametrosParaCadastroCobranca) {
    const {
        token,
        dadosCobranca,
        setMostrarModalAddCobranca,
        limparInputs,
        setMensagemSucesso,
        setCadastroEdicaoExclusaoSucesso
    } = parametrosParaCadastroCobranca;

    try {
        const pedido_Fetch = await fetch(`${BASE_URL}cobrancas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
            },
            body: JSON.stringify(dadosCobranca)
        });
        const resposta_Fetch = await pedido_Fetch.json();
        if (pedido_Fetch.status !== 201) {
            return console.log(pedido_Fetch);
        };
        setMostrarModalAddCobranca(false);
        setMensagemSucesso(resposta_Fetch.message);
        setCadastroEdicaoExclusaoSucesso(true);
        setTimeout(() => {
            setCadastroEdicaoExclusaoSucesso(false);
        }, 3000)
        limparInputs();

    } catch ({ message }) {
        console.log(message)
    };
};

async function editar_Cobranca(parametrosParaEdicaoCobranca) {
    const {
        token,
        dadosCobranca,
        setMostrarModalEdicaoCobranca,
        limparInputs,
        setMensagemSucesso,
        setCadastroEdicaoExclusaoSucesso
    } = parametrosParaEdicaoCobranca;

    const { cobranca_id } = dadosCobranca;

    try {
        const pedido_Fetch = await fetch(`${BASE_URL}cobrancas/${cobranca_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
            },
            body: JSON.stringify(dadosCobranca)
        });
        const { dados, message } = await pedido_Fetch.json();
        if (pedido_Fetch.status !== 200) {
            return console.log(pedido_Fetch);
        };
        setMostrarModalEdicaoCobranca(false);
        setMensagemSucesso(message);
        setCadastroEdicaoExclusaoSucesso(true);
        setTimeout(() => {
            setCadastroEdicaoExclusaoSucesso(false);
        }, 3000)
        limparInputs();

    } catch ({ message }) {
        console.log(message)
    };
};

async function excluir_Cobranca(
    token,
    id,
    setRespostaExcluirCobranca,
    setCadastroEdicaoExclusaoSucesso,
    setMensagemSucesso,
    handleLimpar
) {
    try {
        const pedido_Fetch = await fetch(`${BASE_URL}cobrancas/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
            }
        });
        const resposta_Fetch = await pedido_Fetch.json();
        if (pedido_Fetch.status !== 200) {
            setMensagemSucesso('');
            handleLimpar();
            setRespostaExcluirCobranca(resposta_Fetch.message);
            setCadastroEdicaoExclusaoSucesso(true);
            setTimeout(() => {
                setCadastroEdicaoExclusaoSucesso(false);
                setRespostaExcluirCobranca('');
            }, 3000)
            return
        };
        handleLimpar();
        setMensagemSucesso(resposta_Fetch.message);
        setCadastroEdicaoExclusaoSucesso(true);
        setTimeout(() => {
            setCadastroEdicaoExclusaoSucesso(false);
        }, 3000)
        return resposta_Fetch;
    } catch ({ message }) {
        return console.log(message)
    };
};


async function via_cep(cep, setDadosCliente, dadosCliente) {

    try {
        if (cep.length < 8) return

        const pedido_Fetch = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const resposta_Fetch = await pedido_Fetch.json();
        const {
            logradouro,
            bairro,
            localidade,
            uf,
            erro
        } = resposta_Fetch;

        if (erro) {
            return;
        } else {
            setDadosCliente({
                ...dadosCliente,
                logradouro: logradouro,
                cep: cep,
                bairro: bairro,
                cidade: localidade,
                estado: uf,
            });
        }
    } catch ({ message }) {
        console.log(message)
    }
}

export {
    validar_Token,
    Conexao_Login,
    buscar_Dados_Usuario,
    cadastrar_Usuario,
    editar_Usuario,
    cadastrar_editar_cliente,
    buscar_Dados_Clientes,
    buscar_Dados_Cobrancas,
    cadastrar_Cobranca,
    editar_Cobranca,
    excluir_Cobranca,
    via_cep
};