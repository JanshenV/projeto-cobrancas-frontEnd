import './styles.css'
import FormularioCadastroSenha from '../../../components/FormularioCadastroUsuario/FormularioCadastroUsuarioSenha'
import CardProgressoSenha from '../../../components/CardProgresso/CardProgressoSenha'
import retangulo_rodape from '../../../assets/pages/CadastroUsuario/retangulo_rodape.svg'
import retangulo_rodape_claro from '../../../assets/pages/CadastroUsuario/retangulo_rodape_claro.svg'


function StatusRodape() {
    return (
        <div className='cadastro-senha_rodape'>
            <img src={retangulo_rodape_claro} alt='barra progresso' />
            <img src={retangulo_rodape} alt='barra progresso' />
            <img src={retangulo_rodape_claro} alt='barra progresso' />
        </div>
    )
}

function CadastroUsuarioSenha() {

    return (
        <div className="container-cadastro_senha">
            <div className='cadastro-senha_left'>
                <CardProgressoSenha />
            </div>
            <div className='cadastro-senha_rigth'>
                <div className='form-rodape_dados'>
                    <FormularioCadastroSenha />
                    <div>
                        <StatusRodape />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CadastroUsuarioSenha