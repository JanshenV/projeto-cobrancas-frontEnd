import './styles.css';

import iconInHome from '../../assets/components/Sidebar/homeRosa.svg';
import iconHome from '../../assets/components/Sidebar/homecinza.svg';
import iconInClientes from '../../assets/components/Sidebar/clientesRosa.svg';
import iconClientes from '../../assets/components/Sidebar/clientesCinza.svg';
import iconCobrancas from '../../assets/components/Sidebar/cobrancasCinza.svg';
import iconInCobrancas from '../../assets/components/Sidebar/cobrancasRosa.svg';

import { useHistory, useLocation } from 'react-router-dom';
import useGlobal from '../../hook/useGlobal';

function Sidebar() {
  const location = useLocation();
  const history = useHistory();
  const { setParametroSlice } = useGlobal();

  return (
    <div className="sidebar-container">
      <div
        onClick={() => {
          history.replace('/home');
          setParametroSlice(0);
        }}
        className={location.pathname.includes('home') ? 'sidebar-pageIn' : 'sidebar-page'}
      >
        {location.pathname.includes('home') ? <img src={iconInHome} alt='home' /> : <img src={iconHome} alt='home' />}
        <span>Home</span>
      </div>
      <div
        onClick={() => {
          history.replace('/clientes');
          setParametroSlice(0);
        }}
        className={location.pathname.includes('clientes') ? 'sidebar-pageIn' : 'sidebar-page'}
      >
        {location.pathname.includes('clientes') ? <img src={iconInClientes} alt='home' /> : <img src={iconClientes} alt='clientes' />}
        <span>Clientes</span>
      </div>
      <div
        onClick={() => {
          history.replace('/cobrancas');
          setParametroSlice(0);
        }}
        className={location.pathname.includes('cobrancas') ? 'sidebar-pageIn' : 'sidebar-page'}>
        {location.pathname.includes('cobrancas') ? <img src={iconInCobrancas} alt='cobranças' /> : <img src={iconCobrancas} alt='cobranças' />}
        <span>Cobranças</span>
      </div>
    </div>
  )
}

export default Sidebar;
