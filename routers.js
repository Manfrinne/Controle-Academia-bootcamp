const express = require('express')
const routes = express.Router()
const instructors = require('./instructors')

routes.get('/', function(req, res) {
  return res.redirect("/instructors")
})

routes.get('/instructors', instructors.index)

routes.get('/instructors/create', function(req, res) {
  return res.render("instructors/create")
})

routes.get('/instructors/:id', instructors.show)

routes.get('/instructors/:id/edit', instructors.edit)

// req.query => para enviar no modo .get
// req.body => para enviar no modo .post
routes.post("/instructors", instructors.post)

routes.put("/instructors", instructors.put)

routes.delete("/instructors", instructors.delete)

routes.get('/members', function(req, res) {
  return res.send("members")
})

module.exports = routes

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// ### HTTP VERBS => Regras de comunicação do protocolo HTTP ###
// GET : Receber RESOURCE, ex.: '/instructors'
// POST : Criar novo RESOURCE com dados enviados
// PUT : Atualizar RESOURCE
// DELETE : Deletar RESOURCE
// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
