const fs = require('fs')
const data = require('./data.json')

// create
exports.post = function(req, res) {

    const keys = Object.keys(req.body)

    for (key of keys) {
        // req.body.key == ""
        // key ==> todos dados introduzidos no input
        if (req.body[key] == "") {
            return res.send('Please, fill in all fields.')
        }
    }

    // timestamp
    req.body.birth = Date.parse(req.body.birth)
    req.body.created_at = Date.now()
    req.body.id = Number(data.instructors.length + 1)

    data.instructors.push(req.body)

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) {return res.send("Write file error!")}

        return res.redirect("/instructors")
    })

    // return res.send(req.body)
}