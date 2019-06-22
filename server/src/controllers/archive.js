const db = require('../connections/sqlite')
const uploadPath = require('../config/env').uploadPath

const randArchive = (req, res)  => {
  db.get('SELECT COALESCE(MAX(id)+1, 0) AS count FROM archive', function(err, result) {
    if (err) throw err;
    console.log(result.count)
    const rand = Math.floor(Math.random() * (result.count - 1 + 1)) + 1;
    db.get(`SELECT id, name, scientificName, hash FROM archive WHERE id == ${rand}`, function(err, animal) {
      if (err) throw err;
      res.status(200).json(animal)
    })
  })
}

const readFile = (req, res) => {
  db.get(`SELECT id, name, filename, scientificName FROM archive WHERE id == ${req.params.id}`, function(err, animal) {
    if (err) throw err;
    console.log(animal)
    console.log(process.cwd() + 'uploads/' + animal.filename)
    res.sendFile(process.cwd() + '/uploads/' + animal.filename)
  })
}

module.exports = {
  randArchive,
  readFile
}