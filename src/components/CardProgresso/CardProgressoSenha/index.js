import './styles.css'
import bolinhaAtual from '../../../assets/components/CardProgresso/bolinhaAtual.svg'
import bolinhaProxima from '../../../assets/components/CardProgresso/bolinhaProxima.svg'
import bolinhaConcluida from '../../../assets/components/CardProgresso/bolinhaConcluida.svg'
import linha from '../../../assets/components/CardProgresso/linhaVerdeVertical.svg'

function CardProgressoSenha() {
    return (
        <div className='container-progresso_senha'>
            <div className='icones-progresso_senha'>
                <img src={bolinhaConcluida} alt='pageAnterior' />
                <img src={linha} alt='linha' />
                <img src={bolinhaAtual} alt='pageAtual' />
                <img src={linha} alt='linha' />
                <img src={bolinhaProxima} alt='pagePróxima' />
            </div>
            <div className='descricao-progresso_senha'>
                <h2>Cadastre-se</h2>
                <p>Por favor, escreva seu nome e e-mail</p>
                <h2>Escolha uma senha</h2>
                <p>Escolha uma senha segura</p>
                <h2>Cadastro realizado com sucesso</h2>
                <p>E-mail e senha cadastrados com sucesso</p>
            </div>
        </div>
    )
}

export default CardProgressoSenha