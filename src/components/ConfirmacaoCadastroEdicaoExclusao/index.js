import close from '../../assets/components/ConfirmacaoClienteCadastrado/closeEditUser.svg';
import icon_sucesso from '../../assets/components/ConfirmacaoClienteCadastrado/icon_sucesso.svg';
import icon_erro from '../../assets/components/ConfirmacaoClienteCadastrado/icon_erro.svg';
import './styles.css';
import useGlobal from '../../hook/useGlobal';

const ConfirmacaoClienteCadastrado = () => {
    const {
        setCadastroEdicaoExclusaoSucesso,
        mensagemSucesso,
        respostaExluirCobranca
    } = useGlobal();

    return (
        <div className={`container-confirmacao 
            ${respostaExluirCobranca ? 'color-erro' : ''} `
        }>
            <div className="div-icon-sucesso-erro">
                <img className="icon-sucesso-erro" 
                    src={mensagemSucesso ? icon_sucesso : icon_erro} 
                    alt={mensagemSucesso ?"icon_sucesso":"icon_erro"} 
                />
            </div>
            <h3>
                {mensagemSucesso}
                {respostaExluirCobranca}
            </h3>
            <img
                style={{cursor:'pointer'}}
                onClick={() => setCadastroEdicaoExclusaoSucesso(false)}
                className="img-close"
                src={close}
                alt="fechar"
            />
        </div>
    )
}

export default ConfirmacaoClienteCadastrado;