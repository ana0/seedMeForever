const db = require('../connections/sqlite')
const uploadPath = require('../config/env').uploadPath
const { saveArchive } = require('../lib/archive')

const maxArchive = (req, res)  => {
  db.get('SELECT COALESCE(MAX(id), 0) AS count FROM archive WHERE approved = 1', function(err, result) {
    if (err) return res.status(404).json({ err: err.message })
    res.status(200).json(result.count)
  })
}

const randArchive = (req, res)  => {
  db.get('SELECT COALESCE(MAX(id), 0) AS count FROM archive WHERE approved == 1', function(err, result) {
    if (err) return res.status(404).json({ err: err.message })
    const rand = Math.floor(Math.random() * (result.count)) + 1;
    db.get(`SELECT id, name, scientificName, hash FROM archive WHERE id == ${rand}`, function(err, animal) {
      if (err) throw err;
      res.status(200).json(animal)
    })
  })
}

const readFile = (req, res) => {
  db.get(`SELECT id, name, filename, scientificName FROM archive WHERE id == ${req.params.id}`, function(err, animal) {
    if (err) return res.status(400).json({ err: err.message })
    if (!animal) return res.status(404).json({ err: 'No such animal' })
    res.sendFile(process.cwd() + '/uploads/' + animal.filename, function (err) {
      if (err) {
        res.status(err.status).end();
      }
    })
  })
}

const readArchive = (req, res)  => {
  if (req.params.id === undefined || req.params.id === null) {
    return res.status(400).json({ err: 'Invalid params' })
  }
  db.get(`SELECT id, name, filename, scientificName, hash FROM archive WHERE id == ${req.params.id}`, function(err, animal) {
    if (err) throw err;
    res.status(200).json(animal)
  })
}

const createArchive = async (req, res) => {
  return saveArchive(req, res)
  .then((msg) => res.status(200).json({ ...msg }))
  .catch(err => res.status(400).json({ err: err.message }))
}

module.exports = {
  maxArchive,
  randArchive,
  readFile,
  readArchive,
  createArchive
}