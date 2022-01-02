const validaDadosCliente = (parametrosParaValidaDados) => {
    const {
        erroDados,
        setErroDados,
        dadosCliente
    } = parametrosParaValidaDados;
    const {
        cpf,
        telefone,
        email,
        nome
    } = dadosCliente;

    const telefoneInvalido = telefone.length < 11;
    const cpfInvalido = cpf.length < 11;

    const erroInputs = [
        !nome ? 'erroNome' : '',
        !email ? 'erroEmail' : '',
        !cpf || cpfInvalido ? 'erroCpf' : '',
        !telefone || telefoneInvalido ? 'erroTelefone' : '',
    ];

    const condicaoParaSetErroInputs = erroInputs.find(erro => erro !== '');

    if (condicaoParaSetErroInputs) {
        erroInputs.map(erro => erroDados[erro] = true);
        setErroDados({ ...erroDados });
        return
    }
    return true;
}

export { validaDadosCliente }