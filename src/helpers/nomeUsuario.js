// import useGlobal from '../hook/useGlobal';

// function editarNomeUsuario() {
//     const { dadosUsuario, setNomeUsuario } = useGlobal();
//     const nomeRegistro = String(dadosUsuario.nome);
//     const nomeSemEspacos = nomeRegistro.trim();
//     let nomeSeparadoDoSobrenome = '';
//     let nomeEditado = nomeSeparadoDoSobrenome[0];
//     if (nomeSemEspacos.includes(' ')) {
//         nomeSeparadoDoSobrenome = nomeRegistro.split(' ');
//         nomeEditado = nomeSeparadoDoSobrenome[0];
//     } else {
//         nomeEditado = nomeSemEspacos;
//     }
//     setNomeUsuario(nomeEditado);
// }
// editarNomeUsuario()