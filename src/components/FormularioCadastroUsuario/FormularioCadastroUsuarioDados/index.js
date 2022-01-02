import './styles.css'
import useGlobal from '../../../hook/useGlobal';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { buscar_Dados_Usuario } from '../../../services/ApiClient'

function FormularioCadastroDados() {
    const { dadosCadastrar, setDadosCadastrar } = useGlobal();
    const regexEmail = /^[a-zA-Z0-9.]+@[a-z0-9]+\.[a-z]+/;
    const history = useHistory();
    const [emailDigitado, setEmailDigitado] = useState(false);
    const [emailValido, setEmailValido] = useState(false);
    const [nomeDigitado, setNomeDigitado] = useState(false);
    const [emailExistente, setEmailExistente] = useState(false);
    const [verificador, setVerificador] = useState(false);

    async function handleSubmit() {
        const emailInvalido = regexEmail.test(dadosCadastrar.email);

        if (!dadosCadastrar.nome && !dadosCadastrar.email) {
            setNomeDigitado(true);
            setEmailDigitado(true);
            return
        } 

        if (!dadosCadastrar.nome && !emailInvalido) {
            setNomeDigitado(true);
            setEmailValido(true);
            return
        }

        if (!dadosCadastrar.nome && emailExistente ) {
            setNomeDigitado(true);
            setEmailExistente(true);
            return
        }

        if (!dadosCadastrar.nome) {
            setNomeDigitado(true);
            return
        }

        if (!dadosCadastrar.email) {
            setEmailDigitado(true);
            setEmailValido(false);
            return
        }

        if (!emailInvalido) {
            if (!dadosCadastrar.email) return
            setEmailValido(true);
            setVerificador(true);
            return
        } 

        if (emailExistente ) {
            setEmailExistente(true);
            return
        }
       
        buscar_Dados_Usuario(dadosCadastrar, setEmailExistente, history);
    };

    return (
        <div
            className='container-form_dados'>
            <h2>Adicione seus dados</h2>

            <div className='input-form_dados'>
                <label htmlFor="name">Nome*</label>
                <input
                    id="name"
                    className={nomeDigitado?"border-red":""}
                    placeholder="Digite seu nome"
                    value={dadosCadastrar.nome}
                    onChange={ (e) => {
                            setDadosCadastrar({ ...dadosCadastrar, nome: e.target.value })
                            setNomeDigitado(false);
                        }                       
                    }
                ></input>
                {nomeDigitado && <p>Este campo deve ser preenchido</p>}
                <label htmlFor='e_mail'>E-mail* </label>
                <input
                    id='e_mail'
                    className={
                        emailDigitado || 
                        emailValido || 
                        emailExistente ? "border-red":""
                    }
                    placeholder="Digite seu e-mail"
                    value={dadosCadastrar.email}
                    onChange={(e) => {
                        setDadosCadastrar({ ...dadosCadastrar, email: e.target.value.toLowerCase()})
                        setEmailDigitado(false);
                        setEmailValido(false);
                        setEmailExistente(false);
                    }
                    }
                ></input>
                {emailDigitado && <p>Este campo deve ser preenchido</p>}
                {emailValido && <p>Email inválido.</p>}
                {emailExistente && <p>Email de usuário já cadastrado.</p>}
            </div>
            <button
                onClick={() => {
                    handleSubmit();
                }}
                className="btn-continuar_dados"
            >Continuar</button>
            <div className='entradaLogin_dados'>
                <p>Já possui uma conta? Faça seu</p>
                <span
                    onClick={() => {
                        history.push('/');
                    }}>Login</span>
            </div>
        </div>
    );
};

export default FormularioCadastroDados;