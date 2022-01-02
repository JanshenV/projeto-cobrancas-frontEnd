import './styles.css'
import hidePassword from '../../assets/pages/Login/hidePassword.svg';
import showPassword from '../../assets/pages/Login/showPassword.svg';
import { useState } from 'react'
import {
  useHistory
} from 'react-router-dom'
import useGlobal from '../../hook/useGlobal'
import { Conexao_Login } from '../../services/ApiClient'

function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erroSenha, setErroSenha] = useState(false)
  const [erroEmail, setErroEmail] = useState(false)
  const [dadosFetch, setDadosFetch] = useState('')
  const [showSenha, setShowSenha] = useState(false)
  const { setToken } = useGlobal()
  const history = useHistory();

  function handleClick() {
 
    if (!email && !senha) {
      setErroEmail(true)
      setErroSenha( true)
      return
    } 

    if (!senha) {
        setErroSenha(true);
        return
    }

    if (!email) {
      setErroEmail(true);
      return
    }
    
    Conexao_Login(email, senha, setToken, history, setDadosFetch) 
  }

  function handleSubmit(e) {
    e.preventDefault()
    return
  }

  return (
    <div className="container-login">
      <div className="login-left">
        <h1>Gerencie todos os pagamentos da sua empresa em um só lugar.</h1>
      </div>
      <div className="login-right">
        <h1>Faça seu login!</h1>
        <div className="box-erros">
          <p>{dadosFetch}</p>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="email">Email *</label>
          <input
            type="text"
            placeholder="Digite seu email"
            name="email"
            id="email"
            value={email}
            onChange={e => { 
              setEmail(e.target.value);
              setErroEmail(false);
              setDadosFetch('')
            }}
          />
          {erroEmail && 
            <p className="msg-input">Este campo deve ser preenchido</p>
          }
          <div className="senha-login">
            <label htmlFor="senha">Senha *</label>
            <span>Esqueceu a senha?</span>
          </div>
          <div className="div-senha-login">
            <input
              type={showSenha ? 'text' : 'password'}
              placeholder={showSenha ? "Digite sua senha" : "••••••••"}
              name="senha"
              id="senha"
              value={senha}
              onChange={e => {
                setSenha(e.target.value);
                setErroSenha(false);
                setDadosFetch('')
              }}
            />
            {erroSenha && 
              <p className="msg-input">Este campo deve ser preenchido</p>
            }
            <button
              className="btn-senha-login"
              onClick={() => {
                setShowSenha(!showSenha);
              }}>
              <img
                src={showSenha ?
                  hidePassword
                  :
                  showPassword
                }
                alt={showSenha ?
                  'showPassword'
                  :
                  'hidePassword'
                }
              />
            </button>
          </div>

        </form>
        <button className="btn-entrar_login" onClick={handleClick}>
          Entrar
        </button>
        <div className="semconta">
          <p>Ainda não possui uma conta?</p>
          <span
            onClick={() => history.push('/cadastrodados')}> Cadastre-se</span>
        </div>
      </div>
    </div>
  );
};

export default Login;