import './styles.css'
import bolinhaConcluida from '../../../assets/components/CardProgresso/bolinhaConcluida.svg'
import linha from '../../../assets/components/CardProgresso/linhaVerdeVertical.svg'

function CardProgressoSucesso() {
    return (
        <div className='container-progresso_sucesso'>
            <div className='icones-progresso_sucesso'>
                <img src={bolinhaConcluida} alt='pageAnterior' />
                <img src={linha} alt='linha' />
                <img src={bolinhaConcluida} alt='pageAnterior' />
                <img src={linha} alt='linha' />
                <img src={bolinhaConcluida} alt='pageAnterior' />
            </div>
            <div className='descricao-progresso_sucesso'>
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

export default CardProgressoSucesso