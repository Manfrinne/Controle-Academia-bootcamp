const fs = require('fs')
const data = require('../data.json')
const {age, date} = require('../utils')
// {age} com as chaves é para
// desestruturação do objeto

exports.index = function(req, res) {
  return res.render("members/index", {members: data.members})
}

// função para exibir dados contidos em data.json
exports.show = function(req, res) {

  // com essa estrutura eu consigo isolar os dados de
  // um instrutor específico.
  const {id} = req.params // routes.get('/members/:id', members.show)

  const foundMember = data.members.find(function(member) {
      return member.id == id
  })

  if (!foundMember) return res.send("Member not found!")

  const member = {
      ...foundMember, // spread operator
      birth: date(foundMember.birth).birthDay
  }

  return res.render("members/show", {member})
}

exports.create = function(req, res) {
  return res.render("members/create")
}

// função para enviar dados do input para o arquivo data.json
exports.post = function(req, res) {

  // Validação dos dados
  const keys = Object.keys(req.body)
  for (key of keys) {
      // req.body.key == ""
      // key ==> todos dados introduzidos no input
      if (req.body[key] == "") { // gerando array para separar objetos e
        // garantir validação
          return res.send('Please, fill in all fields.')
      }
  }

  // // Desestruturação de objetos
  // let { avatar_url, birth, name, email, gender, blood, weight, height } = req.body

  // timestamp
  birth = Date.parse(req.body.birth)

  // criar uma variável para identificar um objeto isoladamente
  let id = 1
  const lastMember = Number[data.members.length - 1]

  if (lastMember) {
    id = lastMember.id + 1
  }


  // o método ".push" não deixa um novo objeto subscrever os objeto existente
  data.members.push({
    ...req.body,
    id,
    birth
  })

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {

      // Esse condicional é só para nossa aplicação não cair caso, por algum
      // motivo, o arquivo 'data.json' não puder ser criado
      if (err) {return res.send("Write file error!")}

      return res.redirect(`members/${id}`)
  })

  // return res.send(req.body)
}

// função para editar dados do instrutor
exports.edit = function(req, res) {
  const {id} = req.params

  // variável para isolar um objeto específico do meu "data.json"
  const foundMember = data.members.find(function(member) {
      return member.id == id
  })

  if (!foundMember) return res.send("Member not found!")


  const member = {
    ...foundMember,
    birth: date(foundMember.birth).iso
}

  return res.render("members/edit", {member})
}

// função para atualizar dados do instrutor
exports.put = function(req, res){
  const {id} = req.body

  // variável para isolar um objeto específico do meu "data.json"
  const foundMember = data.members.find(function(member, foundIndex) {
    if (id == member.id) {
      index = foundIndex
      return true
    }
  })

  if (!foundMember) return res.send("Member not found!")

  const member = {
    ...foundMember,
    ...req.body,
    birth: Date.parse(req.body.birth),
    id: Number(req.body.id)
  }

  data.members[index] = member

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
    if(err) return res.send("Edit error!")

    return res.redirect(`members/${id}`)
  })

}

// função para deletar dados de um instrutor
exports.delete = function(req, res) {
  const {id} = req.body

  // Tudo que retornar TRUE será colocado dentro do array 'filteredMembers'.
  const filteredMembers = data.members.filter(function(member){
    return member.id != id // 'id' não pode ser deletado agora
  })

  data.members = filteredMembers

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
    if(err) return res.send("Delete error!")

    return res.redirect(`members`)
    })
}
