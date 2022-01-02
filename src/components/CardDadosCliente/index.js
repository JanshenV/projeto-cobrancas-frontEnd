import './styles.css'
import edit from '../../assets/components/CardDadosCliente/lapis.svg'
import useGlobal from "../../hook/useGlobal";

export default function CardDadosCliente() {
  const {
    setModalEditarCliente,
    atualCliente} = useGlobal();
  
  

  return (
    <div className="container-card_dados-clientes">
      <div className="dados-btn-editar">
        <div className="txt-dados">
          <span>Dados do cliente</span>
        </div>
        <div
          className="btn-editar"
          onClick={() => setModalEditarCliente(true)}
        >
          <img src={edit} alt="" />
          <button className="btn-editarcliente">Editar Cliente</button>
        </div>
      </div>
      <table className="table-dados-cliente">
        <thead>
          <tr>
            <th className="colum-title" id="email">
              E-mail
            </th>
            <th className="colum-title" id="telefone">
              Telefone
            </th>
            <th className="colum-title" id="cpf">
              CPF
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="line-items">{atualCliente.email}</td>
            <td className="line-items">{atualCliente.telefone}</td>
            <td className="line-items">{atualCliente.cpf}</td>
          </tr>
        </tbody>
      </table>
      <table className="table-endereco-cliente">
        <thead>
          <tr>
            <th className="colum-title" id="endereço">
              Endereço
            </th>
            <th className="colum-title" id="bairro">
              Bairro
            </th>
            <th className="colum-title" id="complemento">
              Complemento
            </th>
            <th className="colum-title" id="cep">
              CEP
            </th>
            <th className="colum-title" id="cidade">
              Cidade
            </th>
            <th className="colum-title" id="uf">
              UF
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="table-body">
            <td className="line-items">{atualCliente.logradouro ? atualCliente.logradouro : '-'}</td>
            <td className="line-items">{atualCliente.bairro ? atualCliente.bairro : '-'}</td>
            <td className="line-items">{atualCliente.complemento ? atualCliente.complemento : '-'}</td>
            <td className="line-items">{atualCliente.cep ? atualCliente.cep : '-'}</td>
            <td className="line-items">{atualCliente.cidade ? atualCliente.cidade : '-'}</td>
            <td className="line-items">{atualCliente.estado ? atualCliente.estado : '-'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
