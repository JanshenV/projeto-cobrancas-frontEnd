import './styles.css'
import FormularioCadastroSucesso from '../../../components/FormularioCadastroUsuario/FormularioCadastroUsuarioSucesso'
import CardProgressoSucesso from '../../../components/CardProgresso/CardProgressoSucesso'
import retangulo_rodape from '../../../assets/pages/CadastroUsuario/retangulo_rodape.svg'
import retangulo_rodape_claro from '../../../assets/pages/CadastroUsuario/retangulo_rodape_claro.svg'
import { useHistory } from 'react-router-dom';

function StatusRodape() {

    return (
        <div className='cadastro-dados_rodape'>
            <img src={retangulo_rodape_claro} alt='barra progresso' />
            <img src={retangulo_rodape_claro} alt='barra progresso' />
            <img src={retangulo_rodape} alt='barra progresso' />
        </div>
    )
}

function CadastroUsuarioSucesso() {
    const history = useHistory();

    return (
        <div className="container-cadastro_sucesso">
            <div className='cadastro-sucesso_left'>
                <CardProgressoSucesso />
            </div>
            <div className='cadastro-sucesso_rigth'>
                <div className='form-rodape_sucesso'>
                    <FormularioCadastroSucesso />
                    <button className='btn-irLogin_sucesso' onClick={() => { history.push('/') }}>Ir para login</button>
                    <div>
                        <StatusRodape />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CadastroUsuarioSucesso