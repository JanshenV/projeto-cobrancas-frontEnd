import "./styles.css";
import useGlobal from "../../../hook/useGlobal";
import { useHistory } from "react-router-dom";

export default function CardPendentes() {
    const {
        listaCobrancasPendentes
    } = useGlobal();
    const quantidade_Pendentes = listaCobrancasPendentes.lista_Cobrancas.length;
    const lista_Pendentes = listaCobrancasPendentes.lista_Cobrancas;

    const history = useHistory();

    return (
        <div className='card_pendentes'>
            <div className='titulo_pendentes'>
                <span>Cobranças Pendentes</span>
                <div className='quantidade_pendentes'>
                    <p>{quantidade_Pendentes}</p>
                </div>
            </div>
            <div className='cabecalho_pendentes'>
                <span>Cliente</span>
                <span>ID da cob.</span>
                <span>Valor</span>
            </div>
            {lista_Pendentes && lista_Pendentes.slice(0, 4).map(cobranca => (
                <div key={cobranca.id} className='cliente_pendentes'>
                    <span>{lista_Pendentes.length > 0 ? cobranca.dados_Clientes[0].nome : '-'}</span>
                    <span>{lista_Pendentes.length > 0 ? cobranca.id : '-'}</span>
                    <span>{lista_Pendentes.length > 0 ? (cobranca.valor / 100).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : '-'}</span>
                </div>
            ))}
            <div
                className='btn_pendentes'
                onClick={() => history.replace('/cobrancaspendentes')}
            >Ver todos</div>
        </div>
    )
}