import "./styles.css";
import setas from '../../assets/components/CardTabelaCobrancas/setasOrganizarLista.svg';
import editarCobranca from '../../assets/components/CardTabelaCobrancas/editarCobranca.svg';
import excluirCobranca from '../../assets/components/CardTabelaCobrancas/excluirCobranca.svg';
import useGlobal from "../../hook/useGlobal";
import { format } from 'date-fns';
import { useState, useEffect } from "react";
import { buscar_Dados_Cobrancas, buscar_Dados_Clientes } from '../../services/ApiClient';

import ModalDetalhesCobranca from '../modalDetalhesCobranca'


export default function CardCobrancasPendentes() {
    const {
        setMostrarModalEdicaoCobranca,
        setMostrarModalAddCobranca,
        setAtualCobranca,
        setMostarModalExcluirCobranca,
        openDetalheCobranca,
        setOpenDetalheCobranca,
        parametroSlice,
        setParametroSlice,
        setDadosCobranca,
        listaCobrancasPendentes,
        setListaCobrancasPendentes,
        token,
        setCobrancasPendentesPerduram,
        mostrarModalAddCobranca, mostrarModalEdicaoCobranca, mostarModalExcluirCobranca,
        setTodosClientes,
    } = useGlobal();


    useEffect(() => {
        async function cobrancas_Fetch() {
            const { cobrancas_Pendentes } = await buscar_Dados_Cobrancas(
                token,
                listaCobrancasPendentes);
            const itensCobrancasPendentes = cobrancas_Pendentes.cobrancas_Pendentes;
            const valorTotalPendentes = cobrancas_Pendentes.valor_Total_Pendentes;
            await setListaCobrancasPendentes({
                lista_Cobrancas: itensCobrancasPendentes,
                valor_Total: valorTotalPendentes
            });
            await setCobrancasPendentesPerduram([...itensCobrancasPendentes]);
        }
        cobrancas_Fetch();

        async function clientes_Fetch() {
            const {lista_Clientes} = await buscar_Dados_Clientes(token);
            await setTodosClientes(lista_Clientes);
        };
        clientes_Fetch();

    }, [ mostrarModalAddCobranca, mostrarModalEdicaoCobranca, mostarModalExcluirCobranca,]);


    const lista_Pendentes = listaCobrancasPendentes.lista_Cobrancas;
    const [crescente, setCrescente] = useState(true);
    const [ordenacaoSelecionada, setOrdenacaoSelecionada] = useState('');

    function handleOpenDetalheCobranca(cobranca) {
        setDadosCobranca({
            nome: cobranca.dados_Clientes[0].nome,
            descricao: cobranca.descricao,
            vencimento: cobranca.vencimento,
            valor: cobranca.valor,
            id: cobranca.id,
            status: cobranca.status
        })
        setOpenDetalheCobranca(true)
    }

    function ordenarClientes() {
        const arrayDeCobrancas = [...lista_Pendentes];
        const arrayDeCobrancasOrdenado = arrayDeCobrancas.sort((a, b) => {
            if (crescente) {
                return a.dados_Clientes[0].nome.localeCompare(b.dados_Clientes[0].nome);
            } else {
                return b.dados_Clientes[0].nome.localeCompare(a.dados_Clientes[0].nome);
            }
        });
        setListaCobrancasPendentes(arrayDeCobrancasOrdenado);
    }

    function ordenarId() {
        const arrayDeCobrancas = [...lista_Pendentes];
        const arrayDeCobrancasOrdenado = arrayDeCobrancas.sort((a, b) => {
            if (crescente) {
                return a.id - b.id;
            } else {
                return b.id - a.id;
            }
        });
        setListaCobrancasPendentes(arrayDeCobrancasOrdenado);
    }

    useEffect(() => {
        if (ordenacaoSelecionada === 'cliente') {
            ordenarClientes();
            return;
        }
        if (ordenacaoSelecionada === 'id') {
            ordenarId();
            return;
        }
    }, [crescente])

    return (
        <>
            <div className='container-card_tabela-cobrancas'>
                <div className='title-lista_tabela-cobrancas'>
                    <div className='espaco-lista_tabela-cobrancas'>
                        <img
                            src={setas}
                            alt='seta'
                            onClick={() => {
                                setOrdenacaoSelecionada('cliente')
                                setCrescente(!crescente)
                            }}
                        />
                        <span className='estilo-tituto-lista_tabela-cobrancas'>Cliente</span>
                    </div>
                    <div className='espaco-lista_tabela-cobrancas'>
                        <img
                            src={setas}
                            alt='seta'
                            onClick={() => {
                                setOrdenacaoSelecionada('id')
                                setCrescente(!crescente)
                            }}
                        />
                        <span className='estilo-tituto-lista_tabela-cobrancas'>ID Cob.</span>
                    </div>
                    <div className='espaco-lista_tabela-cobrancas'>
                        <span className='estilo-tituto-lista_tabela-cobrancas'>Valor</span>
                    </div>
                    <div className='espaco-lista_tabela-cobrancas'>
                        <span className='estilo-tituto-lista_tabela-cobrancas'>Data de venc.</span>
                    </div>
                    <div className='espaco-lista_tabela-cobrancas'>
                        <span className='estilo-tituto-lista_tabela-cobrancas'>Status</span>
                    </div>
                    <div className='espaco-lista_descricao_cobrancas'>
                        <span className='estilo-tituto-lista_tabela-cobrancas'>Descrição</span>
                    </div>
                    <div className='espaco-lista_editar-excluir_tabela-cobrancas'>
                    </div>
                </div>
                {lista_Pendentes && lista_Pendentes.slice(parametroSlice, parametroSlice + 10).map(cobranca => (
                    <div
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleOpenDetalheCobranca(cobranca)}
                        className='dados-lista_tabela-cobrancas'
                        key={cobranca.id}>
                        <div className='espaco-lista_tabela-cobrancas'>
                            <span className='estilo-texto_tabela-cobrancas'>{cobranca.dados_Clientes[0].nome}</span>
                        </div>
                        <div className='espaco-lista_tabela-cobrancas'>
                            <span className='estilo-texto_tabela-cobrancas'>{cobranca.id}</span>
                        </div>
                        <div className='espaco-lista_tabela-cobrancas'>
                            <span className='estilo-texto_tabela-cobrancas'>{(cobranca.valor / 100).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
                        </div>
                        <div className='espaco-lista_tabela-cobrancas'>
                            <span className='estilo-texto_tabela-cobrancas'>{format(new Date(cobranca.vencimento), 'dd/MM/yyyy')}</span>
                        </div>
                        <div className='espaco-lista_tabela-cobrancas'>
                            <span className={`estilo-texto_status-${cobranca.status}_tabela-cobrancas`}>{cobranca.status}</span>
                        </div>
                        <div className='espaco-lista_descricao_cobrancas'>
                            <span className='estilo-texto_tabela-cobrancas'>{cobranca.descricao}</span>
                        </div>
                        <div className='espaco-lista_editar-excluir_tabela-cobrancas'>
                            <img
                                src={editarCobranca}
                                alt='editar'
                                style={{ cursor: 'pointer' }}
                                onClick={(e) => {
                                    setAtualCobranca(cobranca);
                                    setMostrarModalEdicaoCobranca(true);
                                    setMostrarModalAddCobranca(false);
                                    e.stopPropagation();
                                }}
                            />
                            <img
                                src={excluirCobranca}
                                alt='excluir'
                                style={{ cursor: 'pointer' }}
                                onClick={(e) => {
                                    // excluir_Cobranca(token, cobranca.id);
                                    e.stopPropagation();
                                    setMostarModalExcluirCobranca({
                                        id: cobranca.id,
                                        mostrar: true
                                    })
                                }}
                            // onClick={() => setMostarModalExcluirCobranca(true)}
                            />
                        </div>
                    </div>
                ))}
                <div
                    className='paginacao-cobrancas'>
                    <div className='paginacao-cobrancas-esquerda'
                        onClick={() => {
                            if (parametroSlice <= 0) return;
                            setParametroSlice(parametroSlice - 10);
                        }}>
                        <h1>{'<<<<'}</h1>
                    </div>
                    <div className='paginacao-cobrancas-direita'
                        onClick={() => {
                            if (parametroSlice + 10 >= lista_Pendentes.length) return;
                            setParametroSlice(parametroSlice + 10);
                        }}>
                        <h1>{'>>>>'}</h1>
                    </div>
                </div>
            </div>
            {openDetalheCobranca && <ModalDetalhesCobranca />}
        </>
    );
}
