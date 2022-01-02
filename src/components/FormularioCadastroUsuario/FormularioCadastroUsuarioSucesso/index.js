import './styles.css'
import icone from '../../../assets/components/FormularioCadastroUsuario/Ellipse8.svg'
import icon from '../../../assets/components/FormularioCadastroUsuario/Icon.svg'

function FormularioCadastroSucesso() {

    return (
        <div className='quadro-sucesso'>
            <div className="circulo">
                <img
                    src={icone}
                    alt='icone check' />
                <img
                    src={icon}
                    className='icone-central'
                    alt='icone check' />
            </div>
            <h2>Cadastro realizado com sucesso!</h2>
        </div>
    );
};

export default FormularioCadastroSucesso