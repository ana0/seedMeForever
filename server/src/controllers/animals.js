const db = require('../connections/sqlite')

const randAnimal = (req, res)  => {
  db.get('SELECT COALESCE(MAX(id)+1, 0) AS count FROM animals', function(err, result) {
  	if (err) throw err;
    console.log(result.count)
    const rand = Math.floor(Math.random() * (result.count - 1 + 1)) + 1;
    db.get(`SELECT id, name FROM animals WHERE id == ${rand}`, function(err, animal) {
      if (err) throw err;
      res.status(200).json(animal)
    })
  })
}

const readAnimal = (req, res)  => {
  db.get(`SELECT id, name, filename, scientificName FROM archive WHERE id == ${req.params.id}`, function(err, animal) {
    if (err) throw err;
    console.log(animal)
    res.status(200).json(animal)
  })
}

const createAnimal = (req, res) => {
  console.log('called create')
  console.log(req)
  if (!req.file) throw new Error('Must have animal file!')
  db.run("INSERT INTO archive(scientificName, name, filename) VALUES (?, ?, ?)",
    [req.body.scientificName, req.body.humanName, req.file.filename], function(err) {
      if (err) throw err;
      console.log(req.file)
      res.status(200).json('Uploaded animal file')
    })
}

const updateAnimals = (req, res)  => {
	res.status(200).json('Unimplemented Animals endpoint')
}

const deleteAnimals = (req, res)  => {
	res.status(200).json('Unimplemented Animals endpoint')
}

module.exports = {
  randAnimal,
  readAnimal,
  createAnimal,
  updateAnimals,
  deleteAnimals
}