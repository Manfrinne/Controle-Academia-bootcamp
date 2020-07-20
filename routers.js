const express = require('express')
const routes = express.Router()
const instructors = require('./instructors')

routes.get('/', function(req, res) {
    return res.redirect("/instructors")
}) 

routes.get('/instructors', function(req, res) {
    return res.render("instructors/index")
}) 

routes.get('/instructors/create', function(req, res) {
    return res.render("instructors/create")
}) 

routes.get('/instructors/:id', instructors.show)

// req.query => para enviar no modo .get
// req.body => para enviar no modo .post
routes.post('/instructors', instructors.post)

routes.get('/members', function(req, res) {
    return res.send("members")
}) 

module.exports = routes


// Date function for age
function age(timestamp) {
    const today = new Date()
    const birthDate = new Date(timestamp)

    let age = today.getFullYear() - birthDate.getFullYear()
    const month = today.getMonth() - birthDate.getMonth()

    if (month < 0 || month == 0 && today.getDate() < birthDate.getDate()) {
        age = age - 1
    }

    return age
}
