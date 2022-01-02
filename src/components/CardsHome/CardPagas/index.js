import "./styles.css";
import useGlobal from "../../../hook/useGlobal";
import { useHistory } from "react-router-dom";

export default function CardPagas() {
    const {
        listaCobrancasPagas
    } = useGlobal();
    const quantidade_Pagas = listaCobrancasPagas.lista_Cobrancas.length;
    const lista_Pagas = listaCobrancasPagas.lista_Cobrancas;

    const history = useHistory();

    return (
        <div className='card_pagas'>
            <div className='titulo_pagas'>
                <span>Cobranças pagas</span>
                <div className='quantidade_pagas'>
                    <p>{quantidade_Pagas}</p>
                </div>
            </div>
            <div className='cabecalho_pagas'>
                <span>Cliente</span>
                <span>ID da cob.</span>
                <span>Valor</span>
            </div>
            {lista_Pagas && lista_Pagas.slice(0, 4).map(cobranca => (
                <div key={cobranca.id} className='cliente_pagas'>
                    <span>{lista_Pagas.length > 0 ? cobranca.dados_Clientes[0].nome : '-'}</span>
                    <span>{lista_Pagas.length > 0 ? cobranca.id : '-'}</span>
                    <span>{lista_Pagas.length > 0 ? (cobranca.valor / 100).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : '-'}</span>
                </div>
            ))}
            <div
                className='btn_pagas'
                onClick={() => history.replace('/cobrancaspagas')}
            >Ver todos</div>
        </div>
    )
}