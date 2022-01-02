const validaDadosCobrancas = (parametrosParaValidarDados) => {

const {  
  dadosCobranca, 
  erroDadosCobranca, 
  setErroDadosCobranca
} = parametrosParaValidarDados;
 
  const {
    descricao,
    vencimento,
    valor,
    status
  } = dadosCobranca;

  const erroVencimento = !vencimento || vencimento.includes('_');

  const erroInputs = [
    !descricao?'erroDescricao':'',
    erroVencimento?'erroVencimento':'',
    !valor?'erroValor':'',
    !status?'erroStatus':''
  ]
 
  const condicaoParaSetErroInputs = erroInputs.find(erro => erro !== '');

  if (condicaoParaSetErroInputs) {
      erroInputs.map(erro => erroDadosCobranca[erro] = true);
      setErroDadosCobranca({...erroDadosCobranca});
      return
  }
  return true;
}

export {validaDadosCobrancas };