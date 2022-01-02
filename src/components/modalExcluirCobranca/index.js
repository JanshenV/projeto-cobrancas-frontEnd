import './style.css'
import btnClose from '../../assets/components/modalExcluirCobranca/closeEditUser.svg'
import atencao from '../../assets/components/modalExcluirCobranca/atencao.svg';
import useGlobal from '../../hook/useGlobal';
import {
  excluir_Cobranca,
  buscar_Dados_Clientes,
  buscar_Dados_Cobrancas
} from '../../services/ApiClient';

export default function ModalExcluirCobranca() {
  const {
    mostarModalExcluirCobranca, setMostarModalExcluirCobranca,
    token,
    setRespostaExcluirCobranca,
    setCadastroEdicaoExclusaoSucesso,
    setMensagemSucesso, setAtualCliente,
    atualCliente,useEffect,
    todosClientes, setTodosClientes
  } = useGlobal();

  function handleLimpar() {
    setMostarModalExcluirCobranca({
      id: '',
      mostrar: false
    });
  };

  useEffect(() => {
    async function clientes_Fetch() {
      const { lista_Clientes } = await buscar_Dados_Clientes(token);
      await setTodosClientes(lista_Clientes);
    };

    clientes_Fetch();
  }, [ModalExcluirCobranca]);

  async function handleExcluir() {

    await excluir_Cobranca(
      token,
      mostarModalExcluirCobranca.id,
      setRespostaExcluirCobranca,
      setCadastroEdicaoExclusaoSucesso,
      setMensagemSucesso,
      handleLimpar
    );
    const cobranca_Exclusao = todosClientes.find(cliente => cliente.id === atualCliente.id);
    setAtualCliente(cobranca_Exclusao);
  };


  return (
    <div className="containerModalExcluirCobranca">
      <div className="confirmarExcluirCobranca">
        <img
          className="btnFechar"
          src={btnClose}
          style={{ 'cursor': 'pointer' }}
          onClick={() => handleLimpar()}
          alt="" />

        <div className="vetor">
          <img src={atencao} alt="" />
        </div>
        <span>Tem certeza que deseja excluir esta cobrança?</span>
        <div className="btnConfirmar">
          <button
            className="btnNao"
            style={{'cursor': 'pointer'}}
            onClick={() => handleLimpar()}
          >
            Não</button>
          <button
            className="btnSim"
            style={{'cursor': 'pointer'}}
            onClick={() => handleExcluir()}
          >Sim</button>
        </div>
      </div>
    </div>
  );
}
