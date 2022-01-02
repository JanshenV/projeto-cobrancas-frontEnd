import './styles.css';
import setaContainer from '../../assets/components/ButonEditarSair/setaContainer.svg';
import botaoEditar from '../../assets/components/ButonEditarSair/botaoEditar.svg';
import botaoSair from '../../assets/components/ButonEditarSair/botaoSair.svg';
import useGlobal from '../../hook/useGlobal';
import { useHistory } from 'react-router';

export default function ButtonEditarSair() {
    const {
        setModalEditarUsuario,
        setBotaoEditarSair,
        setToken,
        setExpirationToken
    } = useGlobal();
    const history = useHistory();
    return (
        <div className='ajuste-seta'>
            <img
                className='ajuste-seta_img'
                src={setaContainer}
                alt='seta' />
            <div className='container-button'>
                <img
                    onClick={() => {
                        setModalEditarUsuario(true);
                        setBotaoEditarSair(false);
                    }}
                    src={botaoEditar}
                    alt='editar' />
                <img
                    onClick={() => {
                        setToken('');
                        setExpirationToken('');
                        history.push('/');
                        setBotaoEditarSair(false);
                    }}
                    src={botaoSair}
                    alt='sair' />
            </div>
        </div>
    );
};