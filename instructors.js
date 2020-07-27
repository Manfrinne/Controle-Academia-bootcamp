const fs = require('fs')
const data = require('./data.json')
const {age, date} = require('./utils')
// {age} com as chaves é para
// desestruturação do objeto

// create input "create page"
exports.post = function(req, res) {

  // Validação dos dados
  const keys = Object.keys(req.body)
  for (key of keys) {
      // req.body.key == ""
      // key ==> todos dados introduzidos no input
      if (req.body[key] == "") { // gerando array para separar objetos
          return res.send('Please, fill in all fields.')
      }
  }

  // Desestruturação de objetos
  let { avatar_url, birth, name, services, gender } = req.body

  // timestamp
  birth = Date.parse(req.body.birth)
  const created_at = Date.now()

  // criar uma variável para identificar um objeto isoladamente
  const id = Number(data.instructors.length + 1)

  // o método ".push" não deixa um novo objeto subscrever o objeto existente
  data.instructors.push({
      id,
      avatar_url,
      name,
      birth,
      gender,
      services,
      created_at,
  })

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {

      // Esse condicional é só para nossa aplicação não cair caso, por algum
      // motivo, o arquivo 'data.json' não puder ser criado
      if (err) {return res.send("Write file error!")}

      return res.redirect("/instructors")
  })

  // return res.send(req.body)
}

// function show data.json
exports.show = function(req, res) {

    // com toda essa estrutura eu consigo isolar os dados de
    // um instrutor específico.
    const {id} = req.params // routes.get('/instructors/:id', instructors.show)

    const foundInstructor = data.instructors.find(function(instructor) {
        return instructor.id == id
    })

    if (!foundInstructor) return res.send("Instructor not found!")

    const instructor = {
        ...foundInstructor, // spread operator
        age: age(foundInstructor.birth),
        services: foundInstructor.services.split(","),
        created_at: new Intl.DateTimeFormat('pt-BR').format(foundInstructor.created_at),
    }

    return res.render("instructors/show", {instructor})
}

// função para editar dados do instrutor
exports.edit = function(req, res) {
  const {id} = req.params // routes.get('/instructors/:id', instructors.show)

  // variável para isolar um objeto específico do meu "data.json"
  const foundInstructor = data.instructors.find(function(instructor) {
      return instructor.id == id
  })

  if (!foundInstructor) return res.send("Instructor not found!")


  const instructor = {
    ...foundInstructor,
    birth: date(foundInstructor.birth)
}

  return res.render("instructors/edit", {instructor})
}
