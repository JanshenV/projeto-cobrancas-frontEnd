const validaDadosUsuario = (parametrosParaValidarDados) => {
    const {
        novosDados,
        erroNovosDados,
        setErroNovosDados,
        confirmarNovaSenha
    } = parametrosParaValidarDados;

    const { 
        nome, 
        email, 
        cpf, 
        telefone, 
        senha 
    } = novosDados;

    const cpfInvalido = cpf && cpf.length < 11;
    const telefoneInvalido = telefone && telefone.length < 11;
    const notConfirmarNovaSenha = senha && !confirmarNovaSenha;
    const notNovaSenha = confirmarNovaSenha && !senha;
    const senhasDiferentes = (senha && confirmarNovaSenha) && (senha !== confirmarNovaSenha)

    const erroInputs = [
        !nome? 'erroNome' : '',
        !email?'erroEmail' : '',
        cpfInvalido? 'erroCpf':'',
        telefoneInvalido? 'erroTelefone' : '',
        notConfirmarNovaSenha? 'erroConfirmarSenha':'',
        notNovaSenha? 'erroSenha':'',
        senhasDiferentes? 'erroSenhas':''
    ]

    const condicaoParaSetErroInputs = erroInputs.find(erro => erro !== '');

    if (condicaoParaSetErroInputs) {
        erroInputs.map(erro => erroNovosDados[erro] = true);
        setErroNovosDados({...erroNovosDados});
        return
    }
    return true;
}

export { validaDadosUsuario };