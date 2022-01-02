import "./styles.css";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import cobrancaPaga from "../../assets/pages/Home/cobrancaPaga.svg";
import cobrancaVencida from "../../assets/pages/Home/cobrancaVencida.svg";
import cobrancaPendente from "../../assets/pages/Home/cobrancaPendente.svg";
import EditUser from '../../components/EditUser/index';
import CardVencidas from "../../components/CardsHome/CardVencidas";
import CardPendentes from "../../components/CardsHome/CardPendentes";
import CardPagas from "../../components/CardsHome/CardPagas";
import CardInadimplentes from "../../components/CardsHome/CardInadimplentes";
import useGlobal from "../../hook/useGlobal";
import { buscar_Dados_Clientes, buscar_Dados_Cobrancas } from "../../services/ApiClient";
import CardEmDia from "../../components/CardsHome/CardEmDia";

export default function Home() {
    const {
        useEffect,
        modalEditarUsuario,
        token,
        setTodosClientes,
        setTodosClientesPerduram,
        mostrarModalAddCobranca,
        mostrarModalEdicaoCobranca,
        mostarModalExcluirCobranca,
        listaCobrancasPagas,
        setListaCobrancasPagas,
        listaCobrancasPendentes,
        setListaCobrancasPendentes,
        listaCobrancasVencidas,
        setListaCobrancasVencidas,
        mensagemSucesso,
        setListaInadimplentes,
        setListaEmDia,
        setListaInadimplentesPerduram,
        setListaEmDiaPerduram
    } = useGlobal();


    useEffect(() => {
        async function todos_Clientes_Fetch() {
            const { lista_Clientes,
                lista_Clientes_EmDia,
                lista_Clientes_Inadimplentes } = await buscar_Dados_Clientes(token);
            
            await setTodosClientes(lista_Clientes);
            await setTodosClientesPerduram(lista_Clientes);

            if (lista_Clientes_Inadimplentes) {
                await setListaInadimplentes(lista_Clientes_Inadimplentes);
                await setListaInadimplentesPerduram(lista_Clientes_Inadimplentes);
            };

            if (lista_Clientes_EmDia) {
                await setListaEmDia(lista_Clientes_EmDia);
                await setListaEmDiaPerduram(lista_Clientes_EmDia);
            };
        };
        todos_Clientes_Fetch();
    }, [mensagemSucesso, token]);

    useEffect(() => {
        async function todas_Cobrancas_Fetch() {
            const {
                cobrancas_Pagas,
                cobrancas_Pendentes,
                cobrancas_Vencidas
            } = await buscar_Dados_Cobrancas(token);
            
            const itensCobrancasVencidas = cobrancas_Vencidas.cobrancas_Vencidas;
            const valorTotalVencidas = cobrancas_Vencidas.valor_Total_Vencidas;

            const itensCobrancasPendentes = cobrancas_Pendentes.cobrancas_Pendentes;
            const valorTotalPendentes = cobrancas_Pendentes.valor_Total_Pendentes;

            const itensCobrancasPagas = cobrancas_Pagas.cobrancas_Pagas;
            const valorTotalPagas = cobrancas_Pagas.valor_Total_Pagas;

            await setListaCobrancasVencidas({
                lista_Cobrancas: itensCobrancasVencidas,
                valor_Total: valorTotalVencidas
            });
            await setListaCobrancasPendentes({
                lista_Cobrancas: itensCobrancasPendentes,
                valor_Total: valorTotalPendentes
            });
            await setListaCobrancasPagas({
                lista_Cobrancas: itensCobrancasPagas,
                valor_Total: valorTotalPagas
            });
        };
        todas_Cobrancas_Fetch();
    }, [mostrarModalAddCobranca,
        mostrarModalEdicaoCobranca,
        mostarModalExcluirCobranca]);

    return (
        <div className='container-home'>
            <Sidebar />
            <div className='body-home'>
                {modalEditarUsuario && <EditUser />}
                <Header />
                <div className='cobrancas-home'>
                    <div className='titles-cobrancas'>
                        <div className='title-card-vencidas'>
                            <img src={cobrancaVencida} alt='cobrança vencida' />
                            <div className='valores'>
                                <span>Cobranças Vencidas</span>
                                <h3>{(listaCobrancasVencidas.valor_Total / 100).toLocaleString('pt-br',
                                    { style: 'currency', currency: 'BRL' })}</h3>
                            </div>
                        </div>
                        <div className='title-card-previstas'>
                            <img src={cobrancaPendente} alt='cobrança prevista' />
                            <div className='valores'>
                                <span>Cobranças Pendentes</span>
                                <h3>{(listaCobrancasPendentes.valor_Total / 100).toLocaleString('pt-br',
                                    { style: 'currency', currency: 'BRL' })}</h3>
                            </div>
                        </div>
                        <div className='title-card-pagas'>
                            <img src={cobrancaPaga} alt='cobrança paga' />
                            <div className='valores'>
                                <span>Cobranças Pagas</span>
                                <h3>{(listaCobrancasPagas.valor_Total / 100).toLocaleString('pt-br',
                                    { style: 'currency', currency: 'BRL' })}</h3>
                            </div>
                        </div>
                    </div>
                    <div className='controle-cobrancas'>
                        <CardVencidas />
                        <CardPendentes />
                        <CardPagas />
                    </div>
                </div>
                <div className='controle-clientes'>
                    <CardInadimplentes />
                    <CardEmDia />
                </div>
            </div>
        </div>
    )
}
