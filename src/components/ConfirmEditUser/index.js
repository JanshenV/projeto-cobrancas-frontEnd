import './styles.css';
import Circulo from '../../assets/components/ConfirmEditUser/CirculoConfirmCadastro.svg';
import Visto from '../../assets/components/ConfirmEditUser/VistoConfirmCadastro.svg';

function ConfirmEditUser({ condicao }) {

    return (
        <div
            className={
                `conteiner-confirm 
                 background-${condicao ? 'silver' : 'white'}`
            }
        >
            <img
                className="conteiner-confirm-circulo"
                src={Circulo}
                alt="Circulo"
            />
            <img
                className="conteiner-confirm-visto"
                src={Visto}
                alt="Visto"
            />

            <h1>
                {`Cadastro ${condicao ? 'realizado' : 'Alterado'} com sucesso!`}
            </h1>

        </div>

    )
}

export default ConfirmEditUser;
