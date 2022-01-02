import './styles.css'
import { useState } from "react";
import { useHistory } from 'react-router-dom';
import useGlobal from '../../../hook/useGlobal';
import hidePassword from '../../../assets/components/FormularioCadastroUsuario/hidePassword.svg';
import showPassword from '../../../assets/components/FormularioCadastroUsuario/showPassword.svg';
import { cadastrar_Usuario } from '../../../services/ApiClient'

function FormularioCadastroSenha() {
    const { dadosCadastrar, setDadosCadastrar } = useGlobal();
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const history = useHistory();
    const [erroSenhas, setErroSenhas] = useState(false);
    const [erroSenha, setErroSenha] = useState(false)
    const [erroConfirmarSenha, setErroConfirmarSenha] = useState(false)
    const [erroTamanhoSenha, setErroTamanhoSenha] = useState(false)
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);



    function limpaImputs() {
        setDadosCadastrar({
            nome: '',
            email: '',
            senha: ''
        });
    };

    async function handleSubmit() {
        setErroConfirmarSenha(false);
        setErroSenha(false);
        setErroSenhas(false);
        setErroTamanhoSenha(false);
        
        if (!confirmarSenha && !dadosCadastrar.senha) {
            setErroConfirmarSenha(true);
            setErroSenha(true);
            return
        }
        if (dadosCadastrar.senha.length < 6) {
            setErroTamanhoSenha(true);
            return
        }

        if (dadosCadastrar.senha.length < 6 && !confirmarSenha) {
            setErroTamanhoSenha(true);
            setConfirmarSenha(true);
            return
        }

        if (dadosCadastrar.senha !== confirmarSenha ) {
            setErroSenhas(true);
            return
        }

        if (!confirmarSenha) {
            setErroConfirmarSenha(true);
            return
        }

        if (!dadosCadastrar.senha) {
            setErroSenha(true);
            return
        }


        cadastrar_Usuario(dadosCadastrar, limpaImputs, history);
    };

    return (
        <div className='container-form_senha'
        >
            <h2>Escolha uma senha</h2>
            <div className='input-form_senha'>
                <div>
                    <label htmlFor="senha">Senha*</label>
                    <input
                        id="senha"
                        className={
                            erroSenha || 
                            erroTamanhoSenha? "border-red":""
                        }
                        type={mostrarSenha ? 'text' : 'password'}
                        placeholder={mostrarSenha ? "Digite sua senha" : "••••••••"}
                        value={dadosCadastrar.senha}
                        onChange={(event) => {
                            setDadosCadastrar({ ...dadosCadastrar, senha: event.target.value });
                            setErroSenhas(false);
                            setErroSenha(false);
                            setErroTamanhoSenha(false);
                        }}
                    ></input>
                    {erroSenha && <p>Este campo deve ser preenchido</p>}
                    {erroTamanhoSenha && <p>Senha deve ter no mínimo 6 carateres</p>}
                    <button
                        onClick={() => {
                            setMostrarSenha(!mostrarSenha);
                        }}>
                        <img
                            src={mostrarSenha ?
                                hidePassword
                                :
                                showPassword
                            }
                            alt={mostrarSenha ?
                                'showPassword'
                                :
                                'hidePassword'
                            }
                        />
                    </button>
                </div>
                <div>
                    <label htmlFor='rsenha'>Repita a senha* </label>
                    <input
                        id='rsenha'
                        className={
                            erroSenhas || 
                            erroConfirmarSenha? "border-red":""
                        }
                        type={mostrarConfirmarSenha ? 'text' : 'password'}
                        placeholder={mostrarConfirmarSenha ? "Confirme sua senha" : "••••••••"}
                        value={confirmarSenha}
                        onChange={(event) => {
                            setConfirmarSenha(event.target.value);
                            setErroConfirmarSenha(false);
                            setErroSenhas(false);
                        }}
                    ></input>
                    {erroSenhas && <p>As senhas não coincidem</p>}
                    {erroConfirmarSenha && <p>Este campo deve ser preenchido</p>}
                    <button
                        onClick={() => {
                            setMostrarConfirmarSenha(!mostrarConfirmarSenha);
                        }}>
                        <img
                            src={mostrarConfirmarSenha ?
                                hidePassword
                                :
                                showPassword
                            }

                            alt={mostrarConfirmarSenha ?
                                'showPassword'
                                :
                                'hidePassword'
                            }
                        />
                    </button>
                </div>
            </div>
            <button
                className="btn-continuar_senha"
                onClick={() => {
                    handleSubmit();
                }}
            >Continuar</button>
            <div className='entradaLogin_senha'>
                <p>Já possui uma conta? Faça seu</p>
                <span
                    onClick={() => {
                        history.push('/');
                        limpaImputs();
                    }}>Login</span>
            </div>
        </div >



    );
}

export default FormularioCadastroSenha