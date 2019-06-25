const db = require('../connections/sqlite')

const randAnimal = (req, res)  => {
  db.get('SELECT COALESCE(MAX(id)+1, 0) AS count FROM animals', function(err, result) {
  	if (err) throw err;
    const rand = Math.floor(Math.random() * (result.count - 1 + 1)) + 1;
    db.get(`SELECT id, name FROM animals WHERE id == ${rand}`, function(err, animal) {
      if (err) throw err;
      res.status(200).json(animal)
    })
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