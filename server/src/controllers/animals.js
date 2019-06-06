const db = require('../connections/sqlite')

const readAnimals = (req, res, admin)  => {
  res.status(200).json('Unimplemented Animals endpoint')
}

const createAnimals = (req, res) => {
  res.status(200).json('Unimplemented Animals endpoint')
}

const updateAnimals = (req, res)  => {
	res.status(200).json('Unimplemented Animals endpoint')
}

const deleteAnimals = (req, res)  => {
	res.status(200).json('Unimplemented Animals endpoint')
}

module.exports = {
  readAnimals,
  createAnimals,
  updateAnimals,
  deleteAnimals
}