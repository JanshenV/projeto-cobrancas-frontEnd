import './style.css'
import pagina from '../../assets/components/modalDetalhesCobranca/pagina.svg'
import fechar from '../../assets/components/modalDetalhesCobranca/close-modal.svg'
import useGlobal from '../../hook/useGlobal'
import { format } from 'date-fns'

function ModalDetalhesCobranca() {
  const { dadosCobranca, setOpenDetalheCobranca } = useGlobal()

  return (
    <div className="containerModalDetalheCobranca">
      <div className="dadosDetalheCobranca">
        <div className="headerDetalheCobranca">
          <img
            className="closeBtn"
            src={fechar}
            style={{'cursor': 'pointer'}}
            alt=""
            onClick={() => setOpenDetalheCobranca(false)}
          />
          <img src={pagina} alt="icon-pagina" />
          <span>Detalhe da Cobrança</span>
        </div>

        <div className="bodyDetalheCobranca">
          <div className="camposDetalheCobranca">
            <p className="titleDetalheCobranca">Nome</p>
            <p className="textDetalheCobranca">{dadosCobranca.nome}</p>
          </div>
          <div className="camposDetalheCobranca">
            <p className="titleDetalheCobranca">Descrição</p>
            <p className="textDetalheCobranca">{dadosCobranca.descricao}</p>
          </div>
          <div className="campoGrupoDetalheCobranca">
            <div className="camposDetalheCobranca">
              <p className="titleDetalheCobranca">Vencimento</p>
              <p className="textDetalheCobranca">
                {format(new Date(dadosCobranca.vencimento), 'dd/MM/yyyy')}
              </p>
            </div>
            <div className="camposDetalheCobranca">
              <p className="titleDetalheCobranca">Valor</p>
              <p className="textDetalheCobranca">
                {(dadosCobranca.valor / 100).toLocaleString('pt-br', {
                  style: 'currency',
                  currency: 'BRL'
                })}
              </p>
            </div>
          </div>
          <div className="campoGrupoDetalheCobranca">
            <div className="camposDetalheCobranca">
              <p className="titleDetalheCobranca">ID cobranças</p>
              <p className="textDetalheCobranca">{dadosCobranca.id}</p>
            </div>
            <div className="camposDetalheCobranca">
              <p className="titleDetalheCobranca">Status</p>
              <p className={`${dadosCobranca.status} textDetalheCobranca`}>
                {dadosCobranca.status}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalDetalhesCobranca
