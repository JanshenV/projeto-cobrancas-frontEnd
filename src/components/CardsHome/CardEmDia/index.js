import "./styles.css";
import clienteEmDia from "../../../assets/pages/Home/clienteEmDia.svg";
import useGlobal from "../../../hook/useGlobal";
import { useHistory } from 'react-router-dom';

export default function CardEmDia() {
    const {
        listaEmDia
    } = useGlobal();

    const history = useHistory();

    return (
        <div className='card_emDia'>
            <div className='titulo_emDia'>
                <span><img src={clienteEmDia} alt='cliente em dia' /> Clientes em dia</span>
                <div className='quantidade_emDia'>
                    <p>{listaEmDia.length}</p>
                </div>
            </div>
            <div className='cabecalho_emDia'>
                <span>Cliente</span>
                <span>ID do clie.</span>
                <span>CPF</span>
            </div>
            {listaEmDia.length > 0 && listaEmDia.slice(0, 4).map(cliente => (
                <div key={cliente.id} className='controle-clientes_emDia'>
                    <span>{listaEmDia.length > 0 ? cliente.nome : '-'}</span>
                    <span>{listaEmDia.length > 0 ? cliente.id : '-'}</span>
                    <span>{listaEmDia.length > 0 ? cliente.cpf : '-'}</span>
                </div>
            ))}
            <div
                className='btn-controle-clientes_emDia'
                onClick={() => history.replace('/clientesemdia')}
            >Ver todos</div>
        </div>
    )
}