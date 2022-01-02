import { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import closeEdit from '../../assets/components/EditUser/closeEditUser.svg';
import hidePassword from '../../assets/components/EditUser/hidePassword.svg';
import showPassword from '../../assets/components/EditUser/showPassword.svg';
import useGlobal from '../../hook/useGlobal';
import './styles.css';
import ConfirmEditUser from '../ConfirmEditUser/index';
import { ValidaRetornoDaApi } from '../../utils/validaRetornoDaApiClienteUsuario';
import { validaDadosUsuario } from '../../utils/validaDadosUsuario';
import { editar_Usuario } from '../../services/ApiClient';

const EditUser = () => {
    const [erroNovosDados, setErroNovosDados] = useState({
        erroNome: false,
        erroEmail: false,
        erroCpf: false,
        erroTelefone: false,
        erroSenhas: false,
        erroSenha: false,
        erroConfirmarSenha: false
    });
    const [novosDados, setNovosDados] = useState({
        nome: '',
        email: '',
        cpf: '',
        telefone: '',
        senha: ''
    });
    const [confirmarNovaSenha, setConfirmarNovaSenha] = useState('');
    const [mensagemApiErroSenha, setMensagemApiErroSenha] = useState('');
    const [showNovaSenha, setShowNovaSenha] = useState(false);
    const [showNovaSenhaConfirmar, setShowNovaSenhaConfirmar] = useState(false);

    const { setModalEditarUsuario,
        token,
        dadosUsuario,
        confirmEdicaoUsuario,
        setConfirmEdicaoUsuario,
        mensagemApiErroEmail,
        setMensagemApiErroEmail,
        mensagemApiErroCpf,
        setMensagemApiErroCpf,
        setMensagemApiErroTelefone } = useGlobal();

    useEffect(() => {
        function Dados_Usuario() {
            const {
                nome,
                email,
                cpf,
                telefone } = dadosUsuario;

            setNovosDados({
                ...novosDados,
                nome: nome,
                email: email,
                cpf: cpf ? cpf : '',
                telefone: telefone ? telefone : ''
            });

            setErroNovosDados({
                ...erroNovosDados,
                erroNome: false,
                erroEmail: false,
            });
        };
        Dados_Usuario();
    }, [token]);

    const hadleSubmit = (e) => {
        e.preventDefault();
        return;
    };

    const handleAtualizarUsuario = async () => {

        setErroNovosDados({ ...erroNovosDados, erroSenhas: false });

        const parametrosParaValidarDados = {
            novosDados,
            setNovosDados,
            erroNovosDados,
            setErroNovosDados,
            confirmarNovaSenha
        }

        const notDadosInvalidos = validaDadosUsuario(parametrosParaValidarDados);
        if (!notDadosInvalidos) return;

        editar_Usuario(
            token,
            novosDados,
            setConfirmEdicaoUsuario,
            setModalEditarUsuario,
            setMensagemApiErroTelefone,
            setMensagemApiErroCpf,
            setMensagemApiErroEmail,
            setMensagemApiErroSenha,
            ValidaRetornoDaApi
        )
    };

    return (
        <div className="container-edit-user">

            {confirmEdicaoUsuario && <ConfirmEditUser />}

            {!confirmEdicaoUsuario &&
                <form
                    onSubmit={hadleSubmit}
                    className="card-edit-user"
                >
                    <h1>Edite seu cadastro</h1>

                    <img
                        onClick={() => {
                            setModalEditarUsuario(false);
                        }}
                        className="close-edit-user"
                        src={closeEdit}
                        alt="close"
                    />

                    <div className="div-email-nome">
                        <div>
                            <label htmlFor="nome">Nome*</label>
                            <input
                                className={
                                    erroNovosDados.erroNome ? 'border-red' : ''
                                }
                                id="nome"
                                type="text"
                                name={novosDados.nome}
                                value={novosDados.nome}
                                placeholder="Digite seu nome"
                                onChange={(e) => {
                                    setNovosDados({ ...novosDados, nome: e.target.value });
                                    setErroNovosDados({
                                        ...erroNovosDados,
                                        erroNome: false,
                                    });
                                }}
                            />
                            {erroNovosDados.erroNome &&
                                <p className="mensagem-erro">
                                    Este campo deve ser preenchido
                                </p>
                            }
                        </div>

                        <div>
                            <label htmlFor="email">E-mail*</label>
                            <input
                                className={
                                    erroNovosDados.erroEmail ? 'border-red' : '' ||
                                        mensagemApiErroEmail ? 'border-red' : ''
                                }
                                id="email"
                                type="text"
                                name={novosDados.email}
                                value={novosDados.email}
                                placeholder="Digite seu e-mail"
                                onChange={(e) => {

                                    setNovosDados({ ...novosDados, email: e.target.value });
                                    setMensagemApiErroEmail('');
                                    setErroNovosDados({ ...erroNovosDados, erroEmail: false, });
                                    setMensagemApiErroEmail(false);
                                }}
                            />
                            {erroNovosDados.erroEmail &&
                                <p className="mensagem-erro">
                                    Este campo deve ser preenchido
                                </p>
                            }
                            {mensagemApiErroEmail &&
                                <p className="mensagem-erro">
                                    {mensagemApiErroEmail}
                                </p>
                            }

                        </div>
                    </div>

                    <div className="div-cpf-telefone">
                        <div>
                            <label htmlFor="cpf">CPF</label>
                            <InputMask
                                className={
                                    erroNovosDados.erroCpf ? 'border-red' : '' ||
                                        mensagemApiErroCpf ? 'border-red' : ''
                                }
                                mask="999.999.999-99"
                                id="cpf"
                                type="text"
                                name={novosDados.cpf}
                                value={novosDados.cpf}
                                placeholder="Digite seu CPF"
                                onChange={(e) => {
                                    setNovosDados({ ...novosDados, cpf: e.target.value.replace(/\D/g, '') });
                                    setErroNovosDados({ ...erroNovosDados, erroCpf: false });
                                    setMensagemApiErroCpf(false);
                                }}
                            />
                        </div>

                        <div>
                            <label htmlFor="telefone">Telefone</label>
                            <InputMask
                                className={
                                    erroNovosDados.erroTelefone ? 'border-red' : ''
                                }
                                mask={novosDados.telefone[2] < 6?
                                    "(99) 9999-9999"
                                    :
                                    "(99) 99999-9999"
                                }
                                id="telefone"
                                type="text"
                                name={novosDados.telefone}
                                value={novosDados.telefone}
                                placeholder="Digite seu Telefone"
                                onChange={(e) => {
                                    setNovosDados({ ...novosDados, telefone: e.target.value.replace(/\D/g, '') });
                                    setErroNovosDados({ ...erroNovosDados, erroTelefone: false });
                                    setMensagemApiErroTelefone(false);
                                }}
                            />
                        </div>
                    </div>

                    <div className="div-erro-cpf-telefone">
                        <div>
                            <p className={erroNovosDados.erroCpf ? "mensagem-erro" : 'hidden-erro'}>
                                CPF inválido
                            </p>

                            {mensagemApiErroCpf &&
                                <p className="mensagem-erro">
                                    {mensagemApiErroCpf}
                                </p>
                            }
                        </div>
                        <div>
                            <p className={erroNovosDados.erroTelefone ? "mensagem-erro" : 'hidden-erro'}>
                                Telefone inválido
                            </p>
                        </div>
                    </div>

                    <div className="div-senhas">
                        <div>
                            <label htmlFor="nova-senha">Nova senha</label>
                            <input
                                className={
                                    mensagemApiErroSenha ? 'border-red' : ''||
                                    erroNovosDados.erroSenha? 'border-red' : ''
                                }
                                id="nova-senha"
                                type={showNovaSenha ? "text" : "password"}
                                value={novosDados.senha}
                                name={novosDados.senha}
                                placeholder={showNovaSenha ? "Digite sua senha" : "••••••••"}
                                onChange={(e) => {
                                    setNovosDados({ ...novosDados, senha: e.target.value });
                                    setMensagemApiErroSenha('');
                                    setErroNovosDados({ ...erroNovosDados, 
                                        erroSenhas: false, 
                                        erroSenha: false,
                                        erroConfirmarSenha: false

                                    });
                                }}
                            />
                            <button
                                onClick={() => {
                                    setShowNovaSenha(!showNovaSenha);
                                }}>
                                <img
                                    src={showNovaSenha ?
                                        hidePassword
                                        :
                                        showPassword
                                    }
                                    alt={showNovaSenha ?
                                        'showPassword'
                                        :
                                        'hidePassword'
                                    }
                                />
                            </button>
                            {erroNovosDados.erroSenha &&
                                <p className="mensagem-erro">
                                    Este campo deve ser preenchido
                                </p>
                            }
                        </div>

                        <div>

                            <label htmlFor="confirmar-senha">Confirmar senha</label>
                            <input
                                className={
                                    erroNovosDados.erroSenhas ? 'border-red' : '' ||
                                    mensagemApiErroSenha ? 'border-red' : '' ||
                                    erroNovosDados.erroConfirmarSenha? 'border-red' : ''
                                }
                                id="confirmar-senha"
                                type={showNovaSenhaConfirmar ?
                                    "text" : "password"
                                }
                                value={confirmarNovaSenha}
                                name={confirmarNovaSenha}
                                placeholder={showNovaSenhaConfirmar ? "Confirme sua senha" : "••••••••"}
                                onChange={(e) => {
                                    setConfirmarNovaSenha(e.target.value);
                                    setMensagemApiErroSenha('');
                                    setErroNovosDados({
                                        ...erroNovosDados,
                                        erroSenhas: false,
                                        erroSenha:false,
                                        erroConfirmarSenha: false
                                    });
                                }}
                            />

                            <button
                                onClick={() => {
                                    setShowNovaSenhaConfirmar(!showNovaSenhaConfirmar);
                                }}>
                                <img
                                    src={showNovaSenhaConfirmar ?
                                        hidePassword
                                        :
                                        showPassword
                                    }

                                    alt={showNovaSenhaConfirmar ?
                                        'showPassword'
                                        :
                                        'hidePassword'
                                    }
                                />
                            </button>

                            {erroNovosDados.erroSenhas &&
                                <p className="mensagem-erro">
                                    As senhas não coincidem
                                </p>
                            }

                            {mensagemApiErroSenha &&
                                <p className="mensagem-erro">
                                    {mensagemApiErroSenha}
                                </p>
                            }
                            {erroNovosDados.erroConfirmarSenha &&
                                <p className="mensagem-erro">
                                    Este campo deve ser preenchido
                                </p>
                            }
                        </div>
                    </div>

                    <button
                        className="button-aplicar"
                        onClick={handleAtualizarUsuario}
                    >
                        Aplicar
                    </button>
                </form>}
        </div>
    )
}

export default EditUser;