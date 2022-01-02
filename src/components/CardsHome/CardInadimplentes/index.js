import "./styles.css";
import inadimplente from "../../../assets/pages/Home/clienteInadimplente.svg";
import useGlobal from "../../../hook/useGlobal";
import { useHistory } from 'react-router-dom';

export default function CardInadimplentes() {
    const {
        listaInadimplentes
    } = useGlobal();

    const history = useHistory();

    return (
        <div className='card_inadimplentes'>
            <div className='titulo_inadimplentes'>
                <span><img src={inadimplente} alt='cliente inadimplente' /> Clientes Inadimplentes</span>
                <div className='quantidade_inadimplentes'>
                    <p>{listaInadimplentes.length}</p>
                </div>
            </div>
            <div className='cabecalho_inadimplentes'>
                <span>Cliente</span>
                <span>ID do clie.</span>
                <span>CPF</span>
            </div>
            {listaInadimplentes.length > 0 && listaInadimplentes.slice(0, 4).map(cliente => (
                <div key={cliente.id} className='controle-clientes_inadimplentes'>
                    <span>{listaInadimplentes.length > 0 ? cliente.nome : '-'}</span>
                    <span>{listaInadimplentes.length > 0 ? cliente.id : '-'}</span>
                    <span>{listaInadimplentes.length > 0 ? cliente.cpf : '-'}</span>
                </div>
            ))}
            <div
                className='btn-controle-clientes_inadimplentes'
                onClick={() => history.replace('/clientesinadimplentes')}
            >Ver todos</div>
        </div>
    )
}