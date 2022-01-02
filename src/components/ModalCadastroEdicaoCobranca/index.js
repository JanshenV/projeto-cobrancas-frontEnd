import "./styles.css"
import icone_cobranca from "../../assets/components/ModalCobrancaCadastro/icone_cobranca.svg"
import icone_fechar_cobranca from "../../assets/components/ModalCobrancaCadastro/icone_fechar_cobranca.svg";
import icone_checkbox from '../../assets/components/ModalCobrancaCadastro/icone_checkbox.svg';
import icone_blank_checkbox from '../../assets/components/ModalCobrancaCadastro/icone_blank_checkbox.svg';
import useGlobal from "../../hook/useGlobal";
import { useEffect, useState } from "react";
import {
    cadastrar_Cobranca,
    editar_Cobranca,
    buscar_Dados_Cobrancas,
    buscar_Dados_Clientes
} from "../../services/ApiClient";
import {
    validaDadosCobrancas,
} from "../../utils/validaDadosCobrancas";
import { formataData } from '../../utils/formataData';

export default function ModalCobrancaCadastroEdicao() {
    const {
        setMostrarModalAddCobranca,
        mostrarModalAddCobranca,
        setMostrarModalEdicaoCobranca,
        mostrarModalEdicaoCobranca,
        setParametroSlice,
        setCadastroEdicaoExclusaoSucesso,
        setMensagemSucesso,
        token,
        atualCliente, setAtualCliente,
        atualCobranca, setAtualCobranca,
        todosClientes,
    } = useGlobal();

    useEffect(() => {
        async function fetch_Dados_Atualizados() {
            const atualClienteAtualizado = todosClientes.find(cliente => cliente.id === atualCliente.id);
            await setAtualCliente(atualClienteAtualizado);
          
            if (atualCobranca) {
                const {lista_Cobrancas} = await buscar_Dados_Cobrancas(token);
                const atualCobrancaAtualizada = await lista_Cobrancas.find(cobranca => cobranca.id === atualCobranca.id);
                await setAtualCobranca(atualCobrancaAtualizada);
            };  
        };
        fetch_Dados_Atualizados();
    }, [ModalCobrancaCadastroEdicao, token]);

    
    let cliente = {}
    let status = mostrarModalEdicaoCobranca ? atualCobranca.status : '';
    if (mostrarModalEdicaoCobranca) {
        [cliente] = todosClientes.filter(cliente => cliente.id === atualCobranca.cliente_id);
        if (atualCobranca.status === 'vencida') {
         status = 'pendente';
        }
    }

    const [dadosCobranca, setDadosCobranca] = useState({
        cliente_id: atualCliente.id,
        cliente: mostrarModalEdicaoCobranca ? cliente.nome : atualCliente.nome,
        cobranca_id: mostrarModalEdicaoCobranca ? atualCobranca.id : '',
        descricao: mostrarModalEdicaoCobranca ? atualCobranca.descricao : '',
        vencimento: mostrarModalEdicaoCobranca ? formataData(atualCobranca.vencimento) : '',
        valor: mostrarModalEdicaoCobranca ? atualCobranca.valor / 100 : '',
        status: mostrarModalEdicaoCobranca ? status : ''
    });

    const [erroDadosCobranca, setErroDadosCobranca] = useState({
        erroDescricao: false,
        erroVencimento: false,
        erroValor: false,
        erroStatus: false
    });

    function limparInputs() {
        setDadosCobranca({
            id: '',
            cliente: '',
            descricao: '',
            vencimento: '',
            valor: '',
            status: ''
        });
    };

    async function handleSubmit() {
        const parametrosParaValidarDados = {
            dadosCobranca,
            erroDadosCobranca,
            setErroDadosCobranca
        }
        const notDadosInvalidos = validaDadosCobrancas(parametrosParaValidarDados);
        if (!notDadosInvalidos) return
        const dataFormatada = formataData(dadosCobranca.vencimento, true);
        const parametrosParaCadastroEdicaoCobranca = {
            token,
            dadosCobranca: { ...dadosCobranca, vencimento: dataFormatada },
            setMostrarModalAddCobranca,
            setMostrarModalEdicaoCobranca,
            limparInputs,
            setMensagemSucesso,
            setCadastroEdicaoExclusaoSucesso
        };

        if (mostrarModalAddCobranca) {
            await cadastrar_Cobranca(parametrosParaCadastroEdicaoCobranca);
        };
        if (mostrarModalEdicaoCobranca) {
            await editar_Cobranca(parametrosParaCadastroEdicaoCobranca);
        };
        const atualClienteAtualizado = todosClientes.find(cliente => cliente.id === atualCliente.id);
        await setAtualCliente(atualClienteAtualizado);
        await setParametroSlice(0);
        window.location.reload(true);
    };


    return (
        <div className='backgorund_card_cobranca_modal'>
            <div className='card_cobranca_modal'>
                <div className='titulo_cobranca'>
                    <img
                        src={icone_cobranca}
                        alt='icone cobrança' />
                    <h3>{mostrarModalAddCobranca ? 'Cadastro de Cobrança' : 'Edição de cobrança'}</h3>
                    <img
                        onClick={() => {
                            limparInputs();
                            setMostrarModalAddCobranca(false);
                            setMostrarModalEdicaoCobranca(false);
                        }}
                        src={icone_fechar_cobranca}
                        alt='fechar'
                        className='icone_fechar'
                        style={{
                            cursor: "pointer"
                        }} />
                </div>
                <div className='container_cobranca_input_nome'>
                    <label htmlFor='cobranca_input_nome_cadastro'>
                        Nome*
                        <p className="cobranca_input_nome_cadastro">
                            {dadosCobranca.cliente}
                        </p>
                    </label>
                </div>

                <div className='container_cobranca_input_descricao'>
                    <label htmlFor='cobranca_input_descricao_cadastro'>Descrição*</label>
                    <input
                        id="cobranca_input_descricao_cadastro"
                        className={` 
                            ${erroDadosCobranca.erroDescricao ? 'border-red ' : ''}
                            cobranca_input_descricao_cadastro`
                        }
                        placeholder='Digite a descrição'
                        value={dadosCobranca.descricao}
                        onChange={(event) => {
                            setDadosCobranca({
                                ...dadosCobranca, descricao: event.target.value
                            });
                            setErroDadosCobranca({
                                ...erroDadosCobranca, erroDescricao: false
                            });
                        }}
                    />
                    {erroDadosCobranca.erroDescricao &&
                        <p className="msg-input">Este campo deve ser preenchido</p>
                    }
                </div>

                <div className='containers_cobranca_vencimento_valor'>
                    <div className='container_cobranca_input_vencimento'>
                        <label
                            htmlFor='cobranca_input_vencimento_cadastro'>
                            Vencimento*</label>
                        <input
                            id="cobranca_input_vencimento_cadastro"
                            type="date"
                            className={` ${erroDadosCobranca.erroVencimento ? 'border-red ' : ''}
                                cobranca_input_vencimento_cadastro`
                            }
                            placeholder='Data de Vencimento'
                            value={dadosCobranca.vencimento}
                            onChange={(event) => {
                                setDadosCobranca({
                                    ...dadosCobranca,
                                    vencimento: event.target.value
                                });
                                setErroDadosCobranca({
                                    ...erroDadosCobranca, erroVencimento: false
                                });
                            }}
                        />
                    </div>

                    <div className='container_cobranca_input_valor'>
                        <label
                            htmlFor='cobranca_input_valor_cadastro'>
                            Valor*</label>
                        <input
                            id="cobranca_input_valor_cadastro"
                            type="number"
                            className={` 
                                ${erroDadosCobranca.erroValor ? 'border-red ' : ''}
                                cobranca_input_valor_cadastro`
                            }
                            placeholder='Valor'
                            value={dadosCobranca.valor}
                            onChange={(event) => {
                                setDadosCobranca({
                                    ...dadosCobranca, valor: event.target.value
                                });
                                setErroDadosCobranca({
                                    ...erroDadosCobranca, erroValor: false
                                });
                            }}
                        />
                        <p className="simbolo-dinheiro">R$</p>
                    </div>
                </div>

                <div className="div-erro-vencimento-valor">
                    <div>
                        {erroDadosCobranca.erroVencimento &&
                            <p className="msg-input">Este campo deve ser preenchido</p>
                        }
                    </div>
                    <div>
                        {erroDadosCobranca.erroValor &&
                            <p className="msg-input">Este campo deve ser preenchido</p>
                        }
                    </div>
                </div>

                <div className='container_cobranca_buttons_status'>
                    <span> Status*</span>
                    <div
                        className={`
                            ${erroDadosCobranca.erroStatus ? 'border-red ' : ''}
                            cobranca_button_status`
                        }
                        onClick={() => {
                            setDadosCobranca({
                                ...dadosCobranca,
                                status: 'paga'
                            });
                            setErroDadosCobranca({
                                ...erroDadosCobranca, erroStatus: false
                            });
                        }}>
                        <img
                            src={dadosCobranca.status === 'paga' ? icone_checkbox : icone_blank_checkbox}
                            alt='checkbox'
                        />
                        <span>Cobrança Paga</span>
                    </div>

                    <div
                        className={`
                            ${erroDadosCobranca.erroStatus ? 'border-red ' : ''}
                            cobranca_button_status`
                        }
                        onClick={() => {
                            setDadosCobranca({
                                ...dadosCobranca,
                                status: 'pendente'
                            });
                            setErroDadosCobranca({
                                ...erroDadosCobranca, erroStatus: false
                            });
                        }}>
                        <img
                            src={dadosCobranca.status === 'pendente' ?
                                icone_checkbox : icone_blank_checkbox}
                            alt='checkbox'
                        />
                        <span> Cobrança Pendente</span>
                    </div>
                    {erroDadosCobranca.erroStatus &&
                        <p className="msg-input">Selecione o status da cobrança</p>
                    }
                </div>

                <div className='container_cobranca_buttons_confirmar'>
                    <div
                        className='cobranca_button_cancelar'
                        onClick={() => {
                            limparInputs();
                            setMostrarModalAddCobranca(false);
                            setMostrarModalEdicaoCobranca(false);
                        }}>
                        <span> Cancelar</span>
                    </div>

                    <div
                        className='cobranca_button_confirmar'
                        onClick={() => {
                            handleSubmit();
                        }}>
                        <span> Aplicar</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

