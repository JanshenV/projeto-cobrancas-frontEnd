import './styles.css'
import bolinhaAtual from '../../../assets/components/CardProgresso/bolinhaAtual.svg'
import bolinhaProxima from '../../../assets/components/CardProgresso/bolinhaProxima.svg'
import linha from '../../../assets/components/CardProgresso/linhaVerdeVertical.svg'

function CardProgressoDados() {
    return (
        <div className='container-progresso_dados'>
            <div className='icones-progresso_dados'>
                <img src={bolinhaAtual} alt='pageAtual' />
                <img src={linha} alt='linha' />
                <img src={bolinhaProxima} alt='pagePróxima' />
                <img src={linha} alt='linha' />
                <img src={bolinhaProxima} alt='pagePróxima' />
            </div>
            <div className='descricao-progresso_dados'>
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

export default CardProgressoDados