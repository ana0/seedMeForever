const db = require('../connections/sqlite')

const randAnimal = (req, res)  => {
  db.get('SELECT * FROM animals WHERE archiveId IS NULL ORDER BY RANDOM() LIMIT 1;', function(err, result) {
  	if (err) return res.status(404).json({ err: err.message })
    res.status(200).json(result)
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
  updateAnimals,
  deleteAnimals
}