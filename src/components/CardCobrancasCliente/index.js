import "./styles.css";
import setas from '../../assets/components/CardCobrancasCliente/setasOrganizarLista.svg';
import editarCobranca from '../../assets/components/CardCobrancasCliente/editarCobranca.svg';
import excluirCobranca from '../../assets/components/CardCobrancasCliente/excluirCobranca.svg';
import useGlobal from "../../hook/useGlobal";
import { format } from 'date-fns';
import { useState, useEffect } from "react";
import { buscar_Dados_Clientes, buscar_Dados_Cobrancas } from '../../services/ApiClient';

export default function CardCobrancasCliente() {
    const {
        setMostrarModalAddCobranca,
        setMostrarModalEdicaoCobranca,
        atualCliente, setAtualCliente,
        setAtualCobranca,
        setMostarModalExcluirCobranca,
        setParametroSlice, parametroSlice,
        mensagemSucesso, token,
         atualCobranca,
        setTodasCobrancas, setTodosClientes
    } = useGlobal();

    useEffect(() => {
        async function fetch_Dados_Atualizados() {
            const { lista_Cobrancas } = await buscar_Dados_Cobrancas(token);
            const { lista_Clientes } = await buscar_Dados_Clientes(token)

            await setTodasCobrancas(lista_Cobrancas);
            await setTodosClientes(lista_Clientes);

            const atualClienteAtualizado = lista_Clientes.find(cliente => cliente.id === atualCliente.id);
            await setAtualCliente(atualClienteAtualizado);
          
            if (atualCobranca) {
                const atualCobrancaAtualizada = await lista_Cobrancas.find(cobranca => cobranca.id === atualCobranca.id);
                await setAtualCobranca(atualCobrancaAtualizada);
                window.location.reload(true);
            };
        };
        fetch_Dados_Atualizados();

    }, [mensagemSucesso, token, CardCobrancasCliente]);

    const [cobrancasOrdenadas, setCobrancasOrdenadas] = useState([...atualCliente.cobrancas]);
    const [crescente, setCrescente] = useState(true);
    const [ordenacaoSelecionada, setOrdenacaoSelecionada] = useState('');
    function ordenarDatas() {
        const arrayDeCobrancas = [...atualCliente.cobrancas];
        const arrayDeCobrancasOrdenado = arrayDeCobrancas.sort((a, b) => {
            if (crescente) {
                return (new Date(a.vencimento).getTime()) - (new Date(b.vencimento).getTime());
            } else {
                return (new Date(b.vencimento).getTime()) - (new Date(a.vencimento).getTime());
            }
        });
        setAtualCliente({
            ...atualCliente,
            cobrancas: arrayDeCobrancasOrdenado
        })
    }

    function ordenarId() {
        const arrayDeCobrancas = [...atualCliente.cobrancas];
        const arrayDeCobrancasOrdenado = arrayDeCobrancas.sort((a, b) => {
            if (crescente) {
                return a.id - b.id;
            } else {
                return b.id - a.id;
            }
        });
        setAtualCliente({
            ...atualCliente,
            cobrancas: arrayDeCobrancasOrdenado
        })
    }

    useEffect(() => {
        if (ordenacaoSelecionada === 'data') {
            ordenarDatas();
            return;
        }
        if (ordenacaoSelecionada === 'id') {
            ordenarId();
            return;
        };

    }, [crescente])

    return (
        <div className='container-card_cobrancas-clientes'>
            <div className='div-title_cobrancas-clientes'>
                <div>
                    <span className='title_cobrancas-clientes'>Cobranças do Cliente</span>
                </div>
                <button
                    className='btn-nova-cobranca'
                    onClick={() => {
                        setMostrarModalAddCobranca(true);
                        setMostrarModalEdicaoCobranca(false);
                    }}
                >+ Nova cobrança</button>
            </div>
            <div className='title-lista-cobrancas'>
                <div className='espaco-lista_cobrancas-clientes'>
                    <img
                        src={setas}
                        alt='seta'
                        onClick={() => {
                            setOrdenacaoSelecionada('id')
                            setCrescente(!crescente)
                        }}
                    />
                    <span className='estilo-tituto-lista'>ID Cob.</span>
                </div>
                <div className='espaco-lista_cobrancas-clientes'>
                    <img
                        src={setas}
                        alt='seta'
                        onClick={() => {
                            setOrdenacaoSelecionada('data')
                            setCrescente(!crescente)
                        }}
                    />
                    <span className='estilo-tituto-lista'>Data de venc.</span>
                </div>
                <div className='espaco-lista_cobrancas-clientes'>
                    <span className='estilo-tituto-lista'>Valor</span>
                </div>
                <div className='espaco-lista_cobrancas-clientes'>
                    <span className='estilo-tituto-lista'>Status</span>
                </div>
                <div className='espaco-lista_descricao_cobrancas'>
                    <span className='estilo-tituto-lista'>Descrição</span>
                </div>
                <div className='espaco-lista_cobrancas-clientes'>
                </div>
            </div>
            {atualCliente.cobrancas && atualCliente.cobrancas.slice(parametroSlice, parametroSlice + 5).map(cobranca => (
                <div key={cobranca.id} className='dados-lista-cobrancas'>
                    <div className='espaco-lista_cobrancas-clientes'>
                        <span className='estilo-texto-lista'>{cobranca.id}</span>
                    </div>
                    <div className='espaco-lista_cobrancas-clientes'>
                        <span className='estilo-texto-lista'>{format(new Date(cobranca.vencimento), 'dd/MM/yyyy')}</span>
                    </div>
                    <div className='espaco-lista_cobrancas-clientes'>
                        <span className='estilo-texto-lista'>{(cobranca.valor / 100).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
                    </div>
                    <div className='espaco-lista_cobrancas-clientes'>
                        <span className={`estilo-texto_status-${cobranca.status}`}>{cobranca.status}</span>
                    </div>
                    <div className='espaco-lista_descricao_cobrancas'>
                        <span className='estilo-texto-lista'>{cobranca.descricao}</span>
                    </div>
                    <div className='espaco-lista_editar-excluir'>
                        <img
                            src={editarCobranca}
                            alt='editar'
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                                setAtualCobranca(cobranca)
                                setMostrarModalEdicaoCobranca(true);
                                setMostrarModalAddCobranca(false);
                            }}
                        />
                        <img
                            src={excluirCobranca}
                            alt='excluir'
                            style={{ cursor: 'pointer' }}
                            onClick={() => setMostarModalExcluirCobranca({
                                id: cobranca.id,
                                mostrar: true
                            })}
                        />
                    </div>
                </div>
            ))}
            <div
                className='paginacao-cliente-cobrancas'>
                <div className='paginacao-cliente-cobrancas-esquerda'
                    onClick={() => {
                        if (parametroSlice <= 0) return;
                        setParametroSlice(parametroSlice - 5);
                    }}>
                    <h1>{'<<<<'}</h1>
                </div>
                <div className='paginacao-cliente-cobrancas-direita'
                    onClick={() => {
                        if (parametroSlice + 5 >= cobrancasOrdenadas.length) return;
                        setParametroSlice(parametroSlice + 5);
                    }}>
                    <h1>{'>>>>'}</h1>
                </div>
            </div>
        </div>
    );
}
