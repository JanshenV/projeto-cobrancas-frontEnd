import "./styles.css";
import logoTituloClientes from "../../assets/components/modalCadastroCliente/logoTituloClientes.svg";
import useGlobal from '../../hook/useGlobal';
import close from '../../assets/components/modalCadastroCliente/closeEditUser.svg';
import { useState, useEffect } from "react";
import InputMasck from 'react-input-mask';
import { ValidaRetornoDaApi } from '../../utils/validaRetornoDaApiClienteUsuario'
import { validaDadosCliente } from "../../utils/validaDadosCliente";
import { cadastrar_editar_cliente, via_cep } from "../../services/ApiClient";

export default function ModalCadastroEdicaoCliente() {
    const {
        modalAddCliente, setModalAddCliente,
        dadosCliente, setDadosCliente,
        mensagemApiErroEmail, setMensagemApiErroEmail,
        mensagemApiErroCpf, setMensagemApiErroCpf,
        mensagemApiErroTelefone, setMensagemApiErroTelefone,
        modalEditarCliente, setModalEditarCliente,
        setCadastroEdicaoExclusaoSucesso,
        setMensagemSucesso,
        token,
        clienteSelecionado, setClienteSelecionado,
        setAtualCliente, atualCliente
    } = useGlobal();

    const [erroDados, setErroDados] = useState({
        erroNome: false,
        erroEmail: false,
        erroSenhas: false,
        erroCpf: false,
        erroTelefone: false,
        erroCpfInvalido: false,
        erroTelefoneInvalido: false,
    });

    const handleClose = () => {
        setModalEditarCliente(false);
        setModalAddCliente(false);
        setDadosCliente({
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
    };

    useEffect(() => {
        function Dados_Cliente() {
            const {
                id,
                nome,
                email,
                cpf,
                telefone,
                logradouro,
                complemento,
                cep,
                bairro,
                cidade,
                estado
            } = atualCliente;

            setDadosCliente({
                ...dadosCliente,
                id: id,
                nome: modalEditarCliente ? nome : '',
                email: modalEditarCliente ? email : '',
                cpf: modalEditarCliente ? cpf : '',
                telefone: modalEditarCliente ? telefone : '',
                logradouro: modalEditarCliente ? logradouro : '',
                complemento: modalEditarCliente ? complemento : '',
                cep: modalEditarCliente ? cep : '',
                bairro: modalEditarCliente ? bairro : '',
                cidade: modalEditarCliente ? cidade : '',
                estado: modalEditarCliente ? estado : ''
            });

            setErroDados({
                ...erroDados,
                erroNome: false,
                erroEmail: false,
            });
        };

        Dados_Cliente();
    }, [modalEditarCliente]);


    function handleViaCep(e) {
        setDadosCliente({ ...dadosCliente, cep: e.target.value });
        const cep = e.target.value.replace(/\D/g, '');
        via_cep(cep, setDadosCliente, dadosCliente);
    }

    function handleCadastrarCliente() {
        const parametrosParaValidarDados = {
            erroDados,
            setErroDados,
            dadosCliente
        }
        const notDadosInvalidos = validaDadosCliente(parametrosParaValidarDados);
        if (!notDadosInvalidos) return

        const setEstadosRetornoApi = {
            setMensagemApiErroTelefone,
            setMensagemApiErroCpf,
            setMensagemApiErroEmail,
        }

        const parametrosParaCadastroEdicaoCliente = {
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
        }

        cadastrar_editar_cliente(parametrosParaCadastroEdicaoCliente);

        setErroDados({
            ...erroDados,
            erroTelefone: false,
            erroCpf: false,
            erroNome: false,
            erroEmail: false,
            erroSenhas: false
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        return
    };

    return (
        <div className={modalAddCliente || modalEditarCliente ? "bgModal" : 'hidden'}>
            <div className="modal-cadastro">
                <div className='header-modal'>
                    <div className='header-left'>
                        <span className='title-modal'>
                            <img className='logo-header-modal'
                                src={logoTituloClientes}
                                alt='logo clientes'
                            />
                            {modalEditarCliente ? 'Editar Cliente' : 'Cadastro do Cliente'}
                        </span>
                    </div>

                    <button
                        className='close-modal'
                        onClick={() => handleClose()}
                    >
                        <img src={close} alt="close" />
                    </button>
                </div>
                <form onSubmit={handleSubmit}
                    className="modal-info">
                    <label
                        name='nome'>
                        <h3 className='name-input'>Nome*</h3>

                        <input
                            type="text"
                            className={`
                                ${erroDados.erroNome ? 'border-red' : ''}
                                input-modal`
                            }
                            placeholder='Digite o nome'
                            value={dadosCliente.nome}
                            onChange={(e) => {
                                setDadosCliente({ ...dadosCliente, nome: e.target.value })
                                setErroDados({ ...erroDados, erroNome: false })
                            }}
                        />
                        {erroDados.erroNome &&
                            <p className='msg-input'>
                                Este campo deve ser preenchido
                            </p>
                        }
                    </label>

                    <label name='E-mail'>
                        <h3 className='name-input'>E-mail*</h3>

                        <input
                            type="email"
                            className={`input-modal
                                ${erroDados.erroEmail ? 'border-red' : ''}
                                ${mensagemApiErroEmail ? 'border-red' : ''}`
                            }
                            placeholder='Digite o e-mail'
                            value={dadosCliente.email}
                            onChange={(e) => {
                                setDadosCliente({ ...dadosCliente, email: e.target.value.toLowerCase() })
                                setErroDados({ ...erroDados, erroEmail: false })
                                setMensagemApiErroEmail(false)
                            }}
                        />
                        {erroDados.erroEmail &&
                            <p className='msg-input'>
                                Este campo deve ser preenchido
                            </p>
                        }
                        {mensagemApiErroEmail &&
                            <p className='msg-input'>
                                {mensagemApiErroEmail}
                            </p>
                        }
                    </label>
                    <div className='dupla'>
                        <label name='cpf'>
                            <h3 className='name-input'>CPF:*</h3>
                            <InputMasck
                                mask="999.999.999-99"
                                readOnly={modalEditarCliente}
                                type="text"
                                className={`input-modal
                                    ${erroDados.erroCpf ? 'border-red' : ''}
                                    ${modalEditarCliente ? 'tira-foco-input' : ''}`
                                }
                                placeholder='Digite o CPF'
                                value={dadosCliente.cpf}
                                onChange={(e) => {
                                    setDadosCliente({ ...dadosCliente, cpf: e.target.value.replace(/\D/g, '') })
                                    setErroDados({ ...erroDados, erroCpf: false, erroCpfInvalido: false })
                                    setMensagemApiErroCpf(false)
                                }}
                            />
                            {erroDados.erroCpf &&
                                <p className='msg-input'>
                                    Este campo deve ser preenchido
                                </p>
                            }
                            {erroDados.erroCpfInvalido &&
                                <p className='msg-input'>
                                    CPF Invalido
                                </p>
                            }
                            {mensagemApiErroCpf &&
                                <p className='msg-input'>
                                    {mensagemApiErroCpf}
                                </p>
                            }
                        </label>
                        <label name='telefone'>
                            <h3 className='name-input'>Telefone:*</h3>
                            <InputMasck
                                mask={
                                    dadosCliente.telefone[2] < 6?
                                    "(99) 9999-9999"
                                    :
                                    "(99) 99999-9999"
                                }
                                type="text"
                                className={`input-modal
                                    ${erroDados.erroTelefone ? 'border-red' : ''}
                                    ${mensagemApiErroTelefone ? 'border-red' : ''}`
                                }
                                placeholder='Digite o telefone'
                                value={dadosCliente.telefone}
                                onChange={(e) => {
                                    setDadosCliente({
                                        ...dadosCliente, telefone: e.target.value.replace(/\D/g, '')
                                    })
                                    setErroDados({ ...erroDados, erroTelefone: false, erroTelefoneInvalido: false })
                                    setMensagemApiErroTelefone(false)
                                }} />
                            {erroDados.erroTelefone &&
                                <p className='msg-input'>
                                    Este campo deve ser preenchido
                                </p>
                            }
                            {erroDados.erroTelefoneInvalido &&
                                <p className='msg-input'>
                                    Telefone Invalido
                                </p>
                            }
                            {mensagemApiErroTelefone &&
                                <p className='msg-input'>
                                    {mensagemApiErroTelefone}
                                </p>
                            }
                        </label>
                    </div>
                    <label name='endereco'>
                        <h3 className='name-input'>Endereço</h3>
                        <input
                            type="text"
                            className='input-modal'
                            placeholder='Digite o endereço'
                            value={dadosCliente.logradouro}
                            onChange={(e) => setDadosCliente({
                                ...dadosCliente, logradouro: e.target.value
                            })}
                        />
                    </label>
                    <label name='complemento'>
                        <h3 className='name-input'>Complemento</h3>
                        <input
                            type="text"
                            className='input-modal'
                            placeholder='Digite o complemento'
                            value={dadosCliente.complemento}
                            onChange={(e) => setDadosCliente({
                                ...dadosCliente, complemento: e.target.value
                            })}
                        />
                    </label>
                    <div className='dupla'>
                        <label name='cep'>
                            <h3 className='name-input'>CEP:</h3>
                            <InputMasck
                                mask="99999-999"
                                type="text"
                                className='input-modal'
                                placeholder='Digite o CEP'
                                value={dadosCliente.cep}
                                onChange={handleViaCep}
                            />
                        </label>
                        <label name='bairro'>
                            <h3 className='name-input'>Bairro:</h3>
                            <input type="text"
                                className='input-modal'
                                placeholder='Digite o bairro'
                                value={dadosCliente.bairro}
                                onChange={(e) => setDadosCliente({
                                    ...dadosCliente, bairro: e.target.value
                                })}
                            />
                        </label>
                    </div>
                    <div className='dupla'>
                        <label className="cidade" name='cidade'>
                            <h3 className='name-input'>Cidade</h3>
                            <input type="text"
                                className='input-modal'
                                placeholder='Digite a cidade'
                                value={dadosCliente.cidade}
                                onChange={(e) => setDadosCliente({
                                    ...dadosCliente, cidade: e.target.value
                                })}
                            />
                        </label>
                        <label className="uf" name='uf'>
                            <h3 className='name-input'>UF</h3>
                            <input
                                type="text"
                                className='input-modal'
                                placeholder='Digite a UF'
                                value={dadosCliente.estado}
                                onChange={(e) => setDadosCliente({
                                    ...dadosCliente, estado: e.target.value
                                })}
                            />
                        </label>
                    </div>
                </form>
                <div className='btn-modal'>
                    <button
                        onClick={() => handleClose()}
                        className='btn-cancelar'
                    >Cancelar</button>
                    <button
                        onClick={() => {
                            handleCadastrarCliente()
                        }}
                        className='btn-aplicar'
                    >Aplicar</button>
                </div>
            </div>
        </div>
    );
}