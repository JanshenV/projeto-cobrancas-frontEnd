import "./styles.css";
import useGlobal from "../../../hook/useGlobal";
import { useHistory } from "react-router-dom";

export default function CardVencidas() {
    const {
        listaCobrancasVencidas
    } = useGlobal();
    const quantidade_Vencidas = listaCobrancasVencidas.lista_Cobrancas.length;
    const lista_Vencidas = listaCobrancasVencidas.lista_Cobrancas;

    const history = useHistory();

    return (
        <div className='card_vencidas'>
            <div className='titulo_vencidas'>
                <span>Cobranças Vencidas</span>
                <div className='quantidade_vencidas'>
                    <p>{quantidade_Vencidas}</p>
                </div>
            </div>
            <div className='cabecalho_vencidas'>
                <span>Cliente</span>
                <span>ID da cob.</span>
                <span>Valor</span>
            </div>
            {lista_Vencidas && lista_Vencidas.slice(0, 4).map(cobranca => (
                <div key={cobranca.id} className='cliente_vencidas'>
                    <span>{lista_Vencidas.length > 0 ? cobranca.dados_Clientes[0].nome : '-'}</span>
                    <span>{lista_Vencidas.length > 0 ? cobranca.id : '-'}</span>
                    <span>{lista_Vencidas.length > 0 ? (cobranca.valor / 100).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : '-'}</span>
                </div>
            ))}
            <div
                className='btn_vencidas'
                onClick={() => history.replace('/cobrancasvencidas')}
            >Ver todos</div>
        </div>
    );
}