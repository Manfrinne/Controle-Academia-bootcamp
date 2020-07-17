const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./routers')
const server = express()

// .use é um 'MIDDLEWARE'
server.use(express.urlencoded({ extended: true }))
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
