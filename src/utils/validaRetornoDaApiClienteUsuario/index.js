
const ValidaRetornoDaApi = (mensagem, setEstadosRetornoApi) => {
  
    const {
        setMensagemApiErroTelefone,
        setMensagemApiErroCpf,
        setMensagemApiErroEmail,
        setMensagemApiErroSenha} = setEstadosRetornoApi;

    const mensagemErroArray = mensagem.split(' ');
    const filtroPalavraEmail = mensagemErroArray.filter(palavra => {
        return palavra === "Email" || palavra === "email";
    });
    const filtroPalavraCpf = mensagemErroArray.filter(palavra => {
        return palavra === "CPF" || palavra === "cpf";
    });
    const filtroPalavraTelefone = mensagemErroArray.filter(palavra => {
        return palavra === "Telefone" || palavra === "telefone";
    });
    const filtroPalavraSenha = mensagemErroArray.filter(palavra => {
        return palavra === "Senha" || palavra === "senha";
    });
    const mensagemFormatada = mensagem[0].toUpperCase() + mensagem.substr(1);

    if (filtroPalavraEmail.length > 0) {
        setMensagemApiErroEmail(mensagemFormatada);
        return;
    };
    if (filtroPalavraTelefone.length > 0) {
        setMensagemApiErroTelefone(mensagemFormatada);
        return;
    };

    if (filtroPalavraCpf.length > 0) {
        setMensagemApiErroCpf(mensagemFormatada);
        return;
    };

    if (filtroPalavraSenha.length > 0) {
        setMensagemApiErroSenha(mensagemFormatada);
        return;
    };
}


export {ValidaRetornoDaApi}
