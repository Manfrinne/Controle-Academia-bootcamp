const fs = require('fs')
const data = require('./data.json')

// function show data
exports.show = function(req, res) {
    const {id} = req.params

    const foundInstructor = data.instructors.find(function(instructor) {
        return instructor.id == id
    }) 

    if (!foundInstructor) return res.send("Instructor not found!")

    const instructor = {
        ...foundInstructor,
        age: "",
        services: foundInstructor.services.split(","),
        created_at: "",
    }

    console.log(instructor.gender)

    return res.render("instructors/show", {instructor})
}

// create
exports.post = function(req, res) {

    // Validação dos dados
    const keys = Object.keys(req.body)
    for (key of keys) {
        // req.body.key == ""
        // key ==> todos dados introduzidos no input
        if (req.body[key] == "") {
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

        return res.redirect("/instructors")
    })

    // return res.send(req.body)
}