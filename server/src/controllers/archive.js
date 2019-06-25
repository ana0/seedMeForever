const db = require('../connections/sqlite')
const uploadPath = require('../config/env').uploadPath
const { saveArchive } = require('../lib/archive')

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
    if (err) return res.status(500).json({ err: err.message })
    if (!animal) return res.status(404).json({ err: 'No such animal' })
    res.sendFile(process.cwd() + '/uploads/' + animal.filename, function (err) {
      if (err) {
        console.log(err);
        res.status(err.status).end();
      }
    })
  })
}

const readArchive = (req, res)  => {
  db.get(`SELECT id, name, filename, scientificName FROM archive WHERE id == ${req.params.id}`, function(err, animal) {
    if (err) throw err;
    res.status(200).json(animal)
  })
}

const createArchive = async (req, res) => {
  return saveArchive(req, res)
  .then((msg) => res.status(200).json({ msg }))
  .catch(err => res.status(400).json({ err: err.message }))
}

module.exports = {
  randArchive,
  readFile,
  readArchive,
  createArchive
}