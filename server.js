const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./routers')
const server = express()

// .use é um 'MIDDLEWARE'
server.use(express.urlencoded({ extended: true })) // Essa linha vai fazer o
// 'express' entender meu "req.body". Com o "req.body" eu envio os dados
// introduzidos pela tag 'input' na minha "create page" para o back-end.
// O método POST foi determinado na tag 'form' com a propriedade 'method= post'

server.use(express.static('./public/'))
server.use(routes)

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true,
})

server.listen(8080, function() {
    console.log("Hacking the Planet!")
})
