import './styles.css';
import seta from "../../assets/components/Header/setaEditarSair.svg";
import ButtonEditarSair from "../../components/ButtonEditarSair";
import useGlobal from "../../hook/useGlobal";

import { useLocation, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Header() {
    const location = useLocation();
    const history = useHistory();
    const {
        botaoEditarSair,
        setBotaoEditarSair,
        dadosUsuario } = useGlobal();
    const [nomeUsuario, setNomeUsuario] = useState('');
    const [letrasNome, setLetrasNome] = useState('');
    let nomeEditado = '';
    let letrasPerfil = '';


    function editarNomeUsuario() {
        const nomeRegistro = dadosUsuario.nome;
        const nomeSemEspacos = String(nomeRegistro).trim();
        let nomeSeparadoDoSobrenome = '';
        nomeEditado = nomeSeparadoDoSobrenome[0];
        if (nomeSemEspacos.includes(' ')) {
            nomeSeparadoDoSobrenome = nomeRegistro.split(' ');
            nomeEditado = nomeSeparadoDoSobrenome[0];
        } else {
            nomeEditado = nomeSemEspacos;
        };
        setNomeUsuario(nomeEditado);
    };

    function primeirasLetrasNomeUsuario() {
        letrasPerfil = String(dadosUsuario.nome).slice(0, 2).toUpperCase();
        setLetrasNome(letrasPerfil);
    };

    useEffect(() => {
        editarNomeUsuario();
        primeirasLetrasNomeUsuario();
    }, [dadosUsuario]);

    function handlePage() {
        if (location.pathname.includes('cliente')) {
            history.replace('/clientes');
        }
        if (location.pathname.includes('cobranca')) {
            history.replace('/cobrancas');
        }
    }

    return (
        <div className='container-header'>
            <div className={location.pathname.includes('home') ? 'container-title' : 'container-title_clientes_cobrancas'}>
                <span
                    className={location.pathname.includes('home') ? 'title-home' : 'title-clientes_cobrancas'}
                    style={location.pathname.includes('detalhescliente')
                        || location.pathname.includes('clientesinadimplentes')
                        || location.pathname.includes('clientesemdia')
                        || location.pathname.includes('cobrancasvencidas')
                        || location.pathname.includes('cobrancaspendentes')
                        || location.pathname.includes('cobrancaspagas')
                        ? { cursor: 'pointer' } : { cursor: 'initial' }}
                    onClick={handlePage}
                >
                    {location.pathname.includes('home') && 'Resumo das cobranças'}
                    {location.pathname.includes('cliente') && 'Clientes'}
                    {location.pathname.includes('cobrancas') && 'Cobranças'}
                </span>
                {location.pathname.includes('detalhescliente') &&
                    <span
                        className='title-clientes_cobrancas'
                        style={{ color: '#3F3F55' }}
                    >{'>'} Detalhes do cliente
                    </span>}
                {location.pathname.includes('clientesinadimplentes') &&
                    <span
                        className='title-clientes_cobrancas'
                        style={{ color: '#3F3F55' }}
                    >{'>'} Inadimplentes
                    </span>}
                {location.pathname.includes('clientesemdia') &&
                    <span
                        className='title-clientes_cobrancas'
                        style={{ color: '#3F3F55' }}
                    >{'>'} Em Dia
                    </span>}
                {location.pathname.includes('cobrancasvencidas') &&
                    <span
                        className='title-clientes_cobrancas'
                        style={{ color: '#3F3F55' }}
                    >{'>'} Vencidas
                    </span>}
                {location.pathname.includes('cobrancaspendentes') &&
                    <span
                        className='title-clientes_cobrancas'
                        style={{ color: '#3F3F55' }}
                    >{'>'} Pendentes
                    </span>}
                {location.pathname.includes('cobrancaspagas') &&
                    <span
                        className='title-clientes_cobrancas'
                        style={{ color: '#3F3F55' }}
                    >{'>'} Pagas
                    </span>}
            </div>
            <div className='dados-usuario'>
                <div className='icon-perfil'>
                    <span>{letrasNome}</span>
                </div>
                <span className='nome-usuario'>{nomeUsuario}</span>
                <div className='editar-sair_usuario'>
                    <img
                        src={seta}
                        alt='editar ou sair'
                        onClick={() => setBotaoEditarSair(!botaoEditarSair)}
                    />
                    {botaoEditarSair && <ButtonEditarSair />}
                </div>
            </div>
        </div>
    )
}