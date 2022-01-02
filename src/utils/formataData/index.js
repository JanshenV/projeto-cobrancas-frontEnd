const formataData = (data, condicaoFormato) => {
  const ano = data.slice(0, 4)
  const mes = data.slice(5, 7)
  const dia = data.slice(8, 10)

  return condicaoFormato ?
    `${dia}/${mes}/${ano}`
    :
    `${ano}-${mes}-${dia}`;
}

export { formataData }