const fs = require('fs')
const data = require('./data.json')

// function show data.json
exports.show = function(req, res) {

    // routes.get('/instructors/:id', instructors.show)
    const {id} = req.params

    const foundInstructor = data.instructors.find(function(instructor) {
        return instructor.id == id
    })

    if (!foundInstructor) return res.send("Instructor not found!")

    const instructor = {
        ...foundInstructor, // spread operator
        age: "",
        services: foundInstructor.services.split(","),
        created_at: "",
    }

    return res.render("instructors/show", {instructor})
}

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
    const id = Number(data.instructors.length + 1)

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

        if (err) {return res.send("Write file error!")}
        // Esse condicional é só para a aplicação não cair caso, por algum motivo, o file 'data.json' não puder ser criado

        return res.redirect("/instructors")
    })

    // return res.send(req.body)
}

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
