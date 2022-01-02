import './styles.css';
import retangulo_rodape from '../../../assets/pages/CadastroUsuario/retangulo_rodape.svg'
import retangulo_rodape_claro from '../../../assets/pages/CadastroUsuario/retangulo_rodape_claro.svg';
import FormularioCadastroDados from '../../../components/FormularioCadastroUsuario/FormularioCadastroUsuarioDados'
import CardProgressoDados from '../../../components/CardProgresso/CardProgressoDados'



function StatusRodape() {
    return (
        <div className='cadastro-dados_rodape'>
            <img src={retangulo_rodape} alt='barra progresso' />
            <img src={retangulo_rodape_claro} alt='barra progresso' />
            <img src={retangulo_rodape_claro} alt='barra progresso' />
        </div>
    )
}

function CadastroUsuarioDados() {
    return (
        <div className="container-cadastro_dados">
            <div className='cadastro-dados_left'>
                <CardProgressoDados />
            </div>
            <div className='cadastro-dados_rigth'>
                <div className='form-rodape_dados'>
                    <FormularioCadastroDados />
                    <div>
                        <StatusRodape />
                    </div>

                </div>
            </div>


        </div>
    )
}

export default CadastroUsuarioDados