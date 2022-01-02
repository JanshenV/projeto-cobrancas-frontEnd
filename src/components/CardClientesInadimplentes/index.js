import "./styles.css";
import setas from '../../assets/components/CardTabelaClientes/setasOrganizarLista.svg';
import adicionarCobranca from '../../assets/components/CardTabelaClientes/addCobranca.svg';
import useGlobal from "../../hook/useGlobal";
import { useHistory } from 'react-router';
import { useState, useEffect } from "react";

export default function CardClientesInadimplentes() {
    const {
        todosClientes,
        setMostrarModalAddCobranca,
        setMostrarModalEdicaoCobranca,
        setClienteSelecionado,
        setAtualCliente,
        parametroSlice,
        setParametroSlice,
        listaInadimplentes,
        setListaInadimplentes
    } = useGlobal();

    const history = useHistory();
    const [crescente, setCrescente] = useState(true);

    function ordenarClientes() {
        const arrayDeClientes = [...listaInadimplentes];
        const arrayDeClientesOrdenado = arrayDeClientes.sort((a, b) => {
            if (crescente) {
                return a.nome.localeCompare(b.nome);
            } else {
                return b.nome.localeCompare(a.nome);
            }
        });
        setListaInadimplentes(arrayDeClientesOrdenado);
    };
    useEffect(() => {
        ordenarClientes();
    }, [crescente])

    return (
        <div className='container-tabela-clientes'>
            <div className='title-lista_tabela-clientes'>
                <div className='espaco-lista_tabela-clientes'>
                    <img src={setas} alt='seta' onClick={() => setCrescente(!crescente)} />
                    <span className='estilo-tituto-lista_tabela-clientes'>Cliente</span>
                </div>
                <div className='espaco-lista_tabela-clientes'>
                    <span className='estilo-tituto-lista_tabela-clientes'>CPF</span>
                </div>
                <div className='espaco-lista_tabela-clientes'>
                    <span className='estilo-tituto-lista_tabela-clientes'>E-mail</span>
                </div>
                <div className='espaco-lista_tabela-clientes'>
                    <span className='estilo-tituto-lista_tabela-clientes'>Telefone</span>
                </div>
                <div className='espaco-lista_tabela-clientes'>
                    <span className='estilo-tituto-lista_tabela-clientes'>Status</span>
                </div>
                <div className='espaco-lista_tabela-clientes'>
                    <span className='estilo-tituto-lista_tabela-clientes'>Criar Cobrança</span>
                </div>
            </div>
            {listaInadimplentes.length > 0 && listaInadimplentes.slice(parametroSlice, parametroSlice + 10).map(cliente => (
                <div key={cliente.id} className='dados-lista_tabela-clientes'>
                    <div className='espaco-lista_tabela-clientes'>
                        <span
                            className='estilo-texto_tabela-clientes'
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                                setClienteSelecionado(cliente);
                                setAtualCliente(cliente)
                                history.replace('/detalhescliente');
                            }}
                        >{cliente.nome}</span>
                    </div>
                    <div className='espaco-lista_tabela-clientes'>
                        <span className='estilo-texto_tabela-clientes'>{cliente.cpf}</span>
                    </div>
                    <div className='espaco-lista_tabela-clientes'>
                        <span className='estilo-texto_tabela-clientes'>{cliente.email}</span>
                    </div>
                    <div className='espaco-lista_tabela-clientes'>
                        <span className='estilo-texto_tabela-clientes'>{cliente.telefone}</span>
                    </div>
                    <div className='espaco-lista_tabela-clientes'>
                        <span
                            className={cliente.status === 'inadimplente' ? 'estilo-texto_status-inadimplente' : 'estilo-texto_status-emDia'}
                        >{cliente.status === 'inadimplente' ? 'Inadimplente' : 'Em dia'}</span>
                    </div>
                    <div className='espaco-lista_tabela-clientes'>
                        <img
                            src={adicionarCobranca}
                            alt='editar'
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                                setAtualCliente(cliente);
                                setMostrarModalAddCobranca(true);
                                setMostrarModalEdicaoCobranca(false);
                            }}
                        />
                    </div>
                </div>

            ))}
            <div
                className='paginacao-clientes'>
                <div className='paginacao-clientes-esquerda'
                    onClick={() => {
                        if (parametroSlice <= 0) return;
                        setParametroSlice(parametroSlice - 10);
                    }}>
                    <h1>{'<<<<'}</h1>
                </div>
                <div className='paginacao-clientes-direita'
                    onClick={() => {
                        if (parametroSlice + 10 >= todosClientes.length) return;
                        setParametroSlice(parametroSlice + 10);
                    }}>
                    <h1>{'>>>>'}</h1>
                </div>
            </div>
        </div>
    );
}


