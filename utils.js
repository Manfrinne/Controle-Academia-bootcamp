module.exports = {
  // Date function for age
age: function age(timestamp) {
  const today = new Date()
  const birthDate = new Date(timestamp)

  let age = today.getFullYear() - birthDate.getFullYear()
  const month = today.getMonth() - birthDate.getMonth()

  if (month < 0 || month == 0 && today.getDate() < birthDate.getDate()) {
      age = age - 1
  }

  return age
},

// função para resolver o erro
// na página de editar dados
date: function(timestamp) {
  const date = new Date(timestamp)

  const year = date.getUTCFullYear()

  // '+ 1' porque o 'getUTCMonth()' retorna
  // um valor de 0 a 11
  const month = `0${date.getUTCMonth() + 1}`.slice(-2)

  const day = `0${date.getUTCDate()}`.slice(-2)

  // return yyyy-mm-dd
  return (`${year}-${month}-${day}`)
}

}
